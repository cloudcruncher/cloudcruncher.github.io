---
title: "Building Production Agentic Systems with MCP Servers & Antigravity Harnesses"
description: "Architectural insights on orchestrating enterprise agentic workflows, building reusable Model Context Protocol (MCP) servers, and achieving sub-second tool execution."
pubDate: 2026-09-18
category: "Agentic AI"
tags: ["Agentic AI", "Antigravity", "Claude Code", "MCP", "Python", "Observability"]
readTime: "7 min read"
featured: true
---

Building AI agents that work reliably in enterprise financial services is fundamentally a data engineering and systems reliability problem—not just a prompting exercise. 

Over the past year leading data engineering for agentic AI deployments at NatWest Group, our innovation team transitioned multi-agent workflows from experimental proofs-of-concept into hardened production systems. Along the way, we replaced bespoke point-to-point tool connectors with standardized **Model Context Protocol (MCP)** servers and integrated robust harness frameworks like Google Antigravity and Claude Code.

Here are the key engineering patterns we discovered.

---

## 1. Why Point-to-Point Tools Fail at Scale

In early agent prototypes, tools are often implemented as ad-hoc Python functions directly bound to an LLM runner. While simple for a demo, this quickly falls apart:
- **Duplicated Data Access Logic**: Each agent duplicates connection pools, credentials, and query parsing.
- **Fragile Context Bloat**: Returning uncurated database schemas or raw REST responses eats thousands of input tokens and triggers hallucinated parameters.
- **Security & Audit Blindspots**: Enterprise audit teams require strict provenance over what data an agent queried, who authorized it, and what parameters were passed.

```
[Agent Core] ──(Ad-hoc scripts)──> [Raw DB / API]  ❌ Fragile & Unaudited

[Agent Core] ──(JSON-RPC / MCP)──> [MCP Server] ──(Pydantic Contracts)──> [Enterprise Systems] ✅ Production
```

By decoupling agent reasoning from enterprise data layers using MCP servers, we created clean abstraction barriers.

---

## 2. Decoupled Tooling via Reusable MCP Servers

MCP (Model Context Protocol) standardizes how LLMs interact with external databases, APIs, and file systems. In our stack:

1. **Self-Documenting Schemas**: Tools expose strictly typed JSON schemas with concise descriptions. Tool definitions specify exact bounds, enum options, and validation rules.
2. **Deterministic Pre-computation**: Instead of letting the LLM compute aggregations or execute open-ended SQL, our MCP servers expose deterministic analytical tools (e.g. `query_counterparty_exposure`, `validate_onboarding_kyc`).
3. **Pydantic Data Contracts**: Tool inputs and outputs pass through Pydantic V2 models. If an agent supplies invalid parameters, the MCP layer returns deterministic validation errors that guide the LLM to self-correct on the next turn.

---

## 3. Sandboxing & The Antigravity Harness

When orchestrating agent loops, you need safety guarantees and deterministic state management. Agentic harnesses like **Google Antigravity** and **Claude Code** provide:

- **Isolated Execution Sandboxes**: Running tool actions in isolated environments with explicit file system and network guardrails.
- **Session Hydration & Response Caching**: Warmed connection pools and persistent session states cut tool latency by over 65%.
- **Resilient Microservices with Jittered Back-off**: When an agent writes back to Snowflake or PostgreSQL, transient lock contention is handled transparently using exponential back-off with full jitter.

---

## 4. Observability: Splunk Dashboards & LLM-as-a-Judge

You cannot manage what you do not measure. In production banking environments, we feed every agent interaction into Splunk:

- **Tool-Call Latency**: Breakdown of LLM inference time vs. MCP tool response time.
- **Decision Quality & Drift**: Running automated LLM-as-a-judge pipelines that sample 10% of completed cases and rate reasoning coherence, regulatory compliance, and grounding fidelity.
- **Token Efficiency**: Tracking token consumption per solved ticket to optimize prompt caching and reduce inference overhead.

The result? Our agentic investigation workflows cut manual commercial case-handling time by **over 90%**, supporting quality checks on 300+ applications every single day.

---

*Interested in exploring agentic architectures, MCP servers, or autonomous agent evaluation? Check out my open-source projects on [GitHub](https://github.com/cloudcruncher) or reach out via [LinkedIn](https://linkedin.com/in/robinsaini).*
