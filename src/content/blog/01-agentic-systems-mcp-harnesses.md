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

I lead the data engineering function for agentic AI projects in an enterprise innovation team at NatWest Group, taking work from proof of concept to production. My part is the data side: connecting agents to data sources and giving them trustworthy datasets and context. I build with AI coding tools: Kiro CLI at work, and Google Antigravity and Claude Code on my own projects. This post is about the general patterns that matter, not any one system.

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

## 4. Resilient Writers: Jitter and Batching

In a system of agent services, many small services write results at the same time. Agent microservices write to PostgreSQL, and every agentic run also passes through an **evaluation service** that records its results in Snowflake.

Two problems appear quickly:

- **Warehouse cost and churn**: a Snowflake warehouse that wakes for every single insert is slow and expensive.
- **Contention**: writers that all retry or flush at the same moment collide and make things worse.

The fix is to treat writes as a stream to be shaped, not as individual calls. The evaluation service collects the results of agent runs into **batches** and flushes them together, so one write covers many runs. **Jitter** (a small random delay) on flushes and retries spreads the load, so writers don't all hit the database at once and the warehouse isn't spun up for every insert. Here is a generic sketch of the pattern:

```python
import random
import threading
import time

class BatchedWriter:
    """Collect rows and flush them in one write, with jittered timing."""

    def __init__(self, write_batch, max_rows=500, interval=30.0, jitter=5.0):
        self.write_batch, self.max_rows = write_batch, max_rows
        self.interval, self.jitter = interval, jitter
        self.rows, self.lock = [], threading.Lock()
        threading.Thread(target=self._loop, daemon=True).start()

    def add(self, row):
        with self.lock:
            self.rows.append(row)
            full = len(self.rows) >= self.max_rows
        if full:
            self.flush()

    def flush(self, max_retries=5):
        with self.lock:
            batch, self.rows = self.rows, []
        for attempt in range(max_retries):
            try:
                if batch:
                    self.write_batch(batch)  # one insert for many agent runs
                return
            except TransientError:
                if attempt == max_retries - 1:
                    raise
                time.sleep(random.uniform(0, min(30, 2 ** attempt)))  # jittered back-off

    def _loop(self):
        while True:
            time.sleep(self.interval + random.uniform(0, self.jitter))  # jittered flush
            self.flush()
```

Pairing a writer like this with Snowflake CI/CD and automated tests for the data loaders took deployment issues to near zero for us.

---

## 5. Observability

You cannot manage what you do not measure. We built Splunk observability around agent execution, tool-call performance and decision quality, and used LLM-as-a-judge evaluation to monitor output quality over time. Retrieval pipelines get the same treatment: when answers are poor, the fix is usually in the data, so debug retrieval at the source.

The outcome in our case was a cut of over 90% in manual case-handling time, and an AI-assisted due-diligence capability supporting quality checks on 300+ commercial onboarding applications a day.

---

## A timeline: from data foundations to a reimagined complaints process

- **August 2025:** I joined an enterprise innovation team as the data engineer for agentic AI projects, starting with the foundations: connecting agents to enterprise data sources, data contracts and quality gates, and reusable MCP servers.
- **Through the year:** retrieval and context pipelines, a resilient Snowflake writer, Snowflake CI/CD with automated tests, and Splunk observability for agent execution and decision quality.
- **June:** the complaints investigation work was delivered, reimagining how complaints are handled with AI. NatWest has described the wider complaints programme publicly in [Transforming Complaints with GenAI](https://jobs.natwestgroup.com/posts/transforming-complaints-with-genai).

That public write-up describes where the process started: complaints were reviewed, categorised and assigned by hand, with information pulled together from several systems to write a response letter. It describes GenAI tools built in-house that draft the final response letter, which used to take hours and now takes minutes, and a tool that reads and categorises complaints as they are logged, at 88% accuracy and climbing. It also stresses that colleagues were involved in the design from day one and still review every letter, so the tools support people instead of replacing them.

My part was the data side: making sure agents could reach the right data, from trustworthy datasets, with the context needed to do the work well. That is the point of this whole post. In a process like complaints, the quality of the outcome depends on the quality of the data and context behind it.

---

*Interested in agent architectures or MCP servers? See my open-source work on [GitHub](https://github.com/cloudcruncher) or get in touch via [LinkedIn](https://linkedin.com/in/robinsaini).*
