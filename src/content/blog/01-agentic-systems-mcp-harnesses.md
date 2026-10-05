---
title: "Production Agentic Systems Are a Data Engineering Problem: MCP Servers, Contracts and Observability"
description: "What a data engineer actually does to take AI agents from proof of concept to production: reusable MCP servers, data contracts, resilient writers and observability."
pubDate: 2026-09-18
category: "Agentic AI"
tags: ["Agentic AI", "Kiro CLI", "MCP", "Data Contracts", "Python", "Observability"]
readTime: "5 min read"
featured: true
---

Building AI agents that work reliably in a regulated enterprise is mostly a data engineering and systems reliability problem, not a prompting exercise.

I lead the data engineering function for agentic AI projects in an enterprise innovation team at NatWest Group, taking work from proof of concept to production. Our team's coding harness is Kiro CLI. On my own projects I also use Google Antigravity and Claude Code. This post is about the general patterns that matter, not any one system.

---

## 1. Why Point-to-Point Tools Break Down

Early agent prototypes usually bind ad-hoc Python functions straight to an LLM runner. That is fine for a demo, but it breaks down quickly:

- **Duplicated data access logic**: every agent re-implements connections, credentials and query handling.
- **Context bloat**: returning raw schemas or full API responses wastes tokens and invites hallucinated parameters.
- **Audit blind spots**: compliance teams need to know what data an agent touched, on whose authority, and with what parameters.

```
[Agent] ──(ad-hoc scripts)──> [Raw DB / API]            fragile, unaudited

[Agent] ──(MCP)──> [MCP server] ──(contracts)──> [Enterprise systems]   reusable, auditable
```

---

## 2. Reusable MCP Servers

The Model Context Protocol (MCP) standardises how an agent reaches databases, APIs and files. Packaging data access as an MCP server means downstream agents consume it with no data-access code of their own, which cuts integration effort.

Good MCP tools tend to share a few traits:

1. **Typed, self-documenting schemas**: narrow inputs with clear descriptions, so the model has little room to guess.
2. **Deterministic work done in code**: aggregations and lookups run as tested functions, not as open-ended model-written queries.
3. **Validated inputs and outputs**: when an agent sends bad parameters, the server returns a clear validation error the model can correct on its next turn.

---

## 3. Data Contracts, Quality Gates and Audit Trails

Agent inputs need the same discipline as any regulated data feed:

- **Schema validation** (for example with Pydantic) at the boundary, before data reaches an agent or a warehouse.
- **Quality gates** that stop bad data early instead of letting it flow downstream.
- **Audit trails** recording what each agent saw and decided, so decisions can be reviewed later.

---

## 4. Resilient Writers

Agents write results back to databases such as Snowflake and PostgreSQL, often concurrently. Retrying immediately makes contention worse. A generic pattern is exponential back-off with jitter, so retries spread out instead of arriving together:

```python
import random
import time

def with_jitter(fn, max_retries=5, base=1.0, cap=30.0):
    for attempt in range(max_retries):
        try:
            return fn()
        except TransientError:
            if attempt == max_retries - 1:
                raise
            time.sleep(random.uniform(0, min(cap, base * 2 ** attempt)))
```

Pairing a writer like this with Snowflake CI/CD and automated tests for the data loaders took deployment issues to near zero for us.

---

## 5. Observability

You cannot manage what you do not measure. We built Splunk observability around agent execution, tool-call performance and decision quality, and used LLM-as-a-judge evaluation to monitor output quality over time. Retrieval pipelines get the same treatment: when answers are poor, the fix is usually in the data, so debug retrieval at the source.

The outcome in our case was a cut of over 90% in manual case-handling time, and an AI-assisted due-diligence capability supporting quality checks on 300+ commercial onboarding applications a day.

---

*Interested in agent architectures or MCP servers? See my open-source work on [GitHub](https://github.com/cloudcruncher) or get in touch via [LinkedIn](https://linkedin.com/in/robinsaini).*
