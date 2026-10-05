---
title: "Lessons from Building an Open Lakehouse for Governed Data and AI Agents"
description: "What I learned building open-lakehouse, a personal open-source platform on Iceberg, Polaris, Trino and OPA: governance that follows the person, data that is fresh and trustworthy, and failures that are measured."
pubDate: 2026-10-05
category: "Data Engineering"
tags: ["Lakehouse", "Apache Iceberg", "Trino", "Governance", "CDC", "Chaos Testing"]
readTime: "6 min read"
featured: false
---

[open-lakehouse](https://github.com/cloudcruncher/open-lakehouse) is a personal open-source project, not a NatWest system. It is a production-shaped lakehouse that runs end to end on a laptop and in CI, built around one hard use case: an AI assistant listening to a bank colleague's live customer call and putting the right data and procedure on screen. The assistant is the demo; the platform is the point. These are the lessons I would reuse anywhere.

The stack is Postgres with Debezium CDC into Kafka, Iceberg tables on S3-compatible storage behind a Polaris REST catalog, Trino for queries, OPA for policy, Keycloak for SSO, Dagster for orchestration, and OpenLineage for lineage.

---

## 1. Governance should follow the human, even through an agent

Two independent layers do the work. **Polaris** decides which engine can touch which namespace and vends short-lived, table-scoped storage credentials, so engines hold no long-lived keys. **OPA** decides which person sees which rows and columns.

The key idea is that an AI agent should see no more than the person it serves. The assistant calls data through an MCP gateway using the colleague's own SSO token (an on-behalf-of exchange), so the same masks apply. An analyst's assistant cannot even identify a caller. Every lookup lands in a hash-chained, append-only audit log.

**Takeaway:** do not give agents a shared service account. Pass the user's identity through.

## 2. The model proposes, policy disposes

A model only labels what was said. Fixed code decides which governed tools run. The assistant never writes queries or picks customers, and every amount, date and ID on a card must appear in the evidence or the card is withheld.

**Takeaway:** keep the model out of anything that needs to be deterministic or auditable, and gate quality with evals in CI.

## 3. Treat data contracts as code

Contracts (ODCS) live in the repo. CI fails if a PII column's contract classification and its OPA mask disagree, and the end-to-end check fails if live tables drift from the contract.

**Takeaway:** a contract nobody enforces is documentation. Make the build break when reality and the contract disagree.

## 4. Fresh data and trustworthy data are different problems

- **CDC in about 10 seconds** from a source commit to visible for a colleague, through every governance layer, with deletes propagating. Exactly-once effect comes from at-least-once input plus idempotent writes.
- **Write-Audit-Publish** on Iceberg branches for batch, with the same row contract enforced per micro-batch in the stream. Violations are quarantined with reasons rather than silently dropped, and more than 1% bad rows in a batch halts publishing.
- **A single-writer lease** stops the stream and batch backfills from fighting over a table.
- **Dagster assets** carry the quality checks, a freshness policy, and retries with back-off and jitter. Data-quality halts are never retried.

**Takeaway:** quarantine and halt rules should be explicit and tested, not left to chance.

## 5. Measure how it fails

`make chaos` kills each of 11 components in turn. Security components fail closed: with no policy there is no data, and an unaudited access is never allowed. Query and agent paths fail fast with a clear message. During a Kafka outage reads keep working, freshness pauses, and the change made during the outage arrives afterwards with no loss. Recovery times in the README range from seconds to under half a minute.

Chaos testing found five real bugs, among them a fail-open false alarm, a 30-second hang, and a lease that expired when idle. Each is written up in the repo.

**Takeaway:** you only know a system fails safe if you break it on purpose and write down what happened.

---

The whole thing is checked by `make verify` (73 end-to-end assertions) and `make chaos`, locally and on every push in CI. Browse the code on [GitHub](https://github.com/cloudcruncher/open-lakehouse).
