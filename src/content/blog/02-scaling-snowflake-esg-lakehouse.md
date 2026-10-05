---
title: "Building a 1TB+/Month ESG Data Platform on Snowflake: Medallion Layers, Data Guardian and Data Products"
description: "How a data engineering team built NatWest's 50+ source ESG and climate platform on Snowflake, Airflow and dbt, with contracts and data quality built in, third-party enrichment, and emissions products published to a data marketplace."
pubDate: 2026-08-10
category: "Data Engineering"
tags: ["Snowflake", "dbt", "Airflow", "Data Quality", "Data Contracts", "Data Products"]
readTime: "6 min read"
featured: true
---

ESG analytics is a hard data problem. The data comes from many different providers (emissions reports, governance disclosures, third-party ratings), in formats that change without warning, and it feeds analytics and regulatory reporting where trust matters.

At NatWest Group I led the team of data engineers delivering the ESG and climate data platform on Snowflake: 50+ internal and external sources and 1TB+ of data processed a month. Optimising PySpark and dbt batch processing cut batch times by 40%, and automated monitoring and quality controls reduced data quality incidents by 30%.

This post covers the approach, which applies to most platforms like this.

---

## 1. Layered, medallion-style design

The platform is built on Snowflake with **Airflow** for orchestration and **dbt** for transformation, organised in layers similar to a medallion architecture: raw data lands as received, is then cleaned and conformed, and is finally modelled into curated datasets for consumers. Keeping the layers separate means a problem in one source stays contained and can be traced.

## 2. A Data Guardian framework

Trust is the product, so we built a **Data Guardian** framework around the pipelines. Its job is to make sure data is only used once it has earned it:

- **Data contracts** that describe what each source should look like.
- **Data-quality checks** applied as data moves between layers.
- **Automated monitoring** so problems are found by the platform before they reach consumers.

This is what brought data quality incidents down by 30%.

## 3. Enriching with third-party data

The value of an ESG lakehouse comes from combining sources. Alongside internal data we ingested many third-party datasets to enrich it. Every new source went through the same contracts and quality checks, so adding a provider was a repeatable process, not a one-off project.

## 4. Publishing data products

The end goal was not tables but **products**. The platform publishes emissions data products to a data marketplace, so downstream teams can discover and use well-defined, quality-checked datasets without needing to understand the pipelines behind them.

## 5. Keeping batches fast

Typical wins on a platform like this are incremental dbt models that process only new and changed data, tuning the heavy PySpark steps, and checking Snowflake query behaviour. Together they gave the 40% reduction in batch times.

---

## The same idea in retail analytics

Earlier at NatWest, in the Retail Data & Analytics Decisioning team, the job was similar in spirit: building **customer, mortgage and deposit data marts** that give retail leadership trusted data for better decisions. Different domain, same principle. A good data mart is a tool that lets the business decide with confidence.

---

## Key takeaways

1. **Layer your data**, so problems stay contained and traceable.
2. **Build quality in**: contracts and checks as a framework, not an afterthought.
3. **Make new sources repeatable**, so enrichment scales.
4. **Ship data products**, not just tables.
5. **Design for the decision**: the best platforms are judged by the choices they enable.
