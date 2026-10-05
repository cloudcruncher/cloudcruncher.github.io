---
title: "Running a 1TB+/Month ESG Data Platform on Snowflake: What a Data Engineering Team Actually Does"
description: "Lessons from leading a team delivering a 50+ source climate and ESG platform on Snowflake: data contracts, incremental modelling, clustering and resilient ingestion."
pubDate: 2026-08-10
category: "Data Engineering"
tags: ["Snowflake", "PySpark", "dbt", "Data Contracts", "Lakehouse", "Airflow"]
readTime: "5 min read"
featured: true
---

ESG analytics is a hard data problem. The data comes from 50+ different providers (emissions reports, governance disclosures, third-party ratings), in formats that change without warning.

At NatWest Group I led the team of data engineers delivering the enterprise ESG data platform on Snowflake, processing 1TB+ of climate and ESG data a month for analytics and regulatory reporting. Optimising PySpark and dbt batch processing cut batch times by 40%, and automated monitoring and quality controls reduced data quality incidents by 30%.

This post covers the general practices behind that, which apply to most platforms of this kind.

---

## Where Batch Platforms Usually Hurt

1. **Schema drift**: a vendor changes a format and a downstream job fails mid-batch.
2. **Poorly matched storage layout**: queries that filter on a few common columns still scan far more data than they need.
3. **Recomputing history**: models that rebuild everything on each run when only new data changed.

---

## 1. Data Contracts at the Boundary

Push quality to the edge. Validate every incoming batch against a typed schema (we used Pydantic) before it lands in the warehouse. Records that fail go to a quarantine area with error details, so one bad file does not stall the pipeline, and data owners find out quickly. Automated monitoring on top of this is what brought incidents down.

---

## 2. Efficient Transformation: PySpark and dbt

Typical wins on a platform like this:

- **Incremental models**: process only new and changed records, with clear watermarks, instead of rebuilding history.
- **Right-sized Spark work**: tune the heavy PySpark steps and avoid unnecessary shuffles.
- **Tested macros and models**: automated CI testing for loaders and models, so breaking changes are caught before merge.

---

## 3. Snowflake Layout and Tuning

Match the physical layout to how the data is queried. In Snowflake that means choosing clustering keys for your main query patterns, using materialised views where they pay off, and checking query profiles for scans that prune poorly. For example:

```sql
-- Generic pattern: cluster on the columns most queries filter by
ALTER TABLE my_fact_table CLUSTER BY (reporting_period, entity_id);
```

---

## 4. Resilient Ingestion

With dozens of Airflow DAGs writing to one warehouse, occasional contention and rate limits are normal. Replace fixed retries with exponential back-off and jitter so retries spread out instead of colliding. Combined with Snowflake CI/CD, this made our loader deployments far more dependable.

---

## Key Takeaways

1. **Validate at the boundary**: contracts before the warehouse.
2. **Model incrementally**: do not recompute what has not changed.
3. **Lay data out for its main consumers**: clustering and views should follow query patterns.
4. **Treat pipelines as software**: CI/CD, automated tests and sensible retries turn brittle batch jobs into dependable platforms.
