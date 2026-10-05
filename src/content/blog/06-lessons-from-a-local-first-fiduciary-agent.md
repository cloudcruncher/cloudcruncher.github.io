---
title: "Lessons from Building a Local-First Fiduciary Agent: Deterministic Maths, Grounded AI"
description: "What I learned building fiduciary-agent, a personal open-source finance harness that runs on-device: keep arithmetic out of the LLM, ground every answer, guard against injection, and choose boring storage."
pubDate: 2026-10-05
category: "Agentic AI"
tags: ["Agentic AI", "Local LLM", "Privacy", "Evaluation", "MCP", "Python"]
readTime: "5 min read"
featured: false
---

[fiduciary-agent](https://github.com/cloudcruncher/fiduciary-agent) is a personal open-source project, not a NatWest system. It is a local-first personal finance harness for Apple Silicon that reads UK bank data (via Open Banking providers such as TrueLayer, plus Wise), and answers questions using a local model. It is built on Python managed with `uv`, with FastAPI and Pydantic, and its README reports 136 passing tests. Here is what building it taught me about reliable AI systems.

---

## 1. Keep arithmetic out of the model

The harness follows a three-tier contract. The core rule: every calculation, such as liquid runway, tax-allowance traps, spending velocity and budget splits, runs through pure Python and never through an LLM. The model reasons about the results and explains them.

**Takeaway:** if a number matters, compute it deterministically and let the model narrate it.

## 2. Ground the answers, then judge them

Local reasoning runs through Ollama or LM Studio, with grounding guardrails checking answers against the underlying transactions and rules. A separate local model acts as an independent judge (`./f judge`), and there is an evaluation suite across six dimensions including grounding, invariants and latency targets, plus per-turn traces (tool latency, grounding score) for observability.

**Takeaway:** an agent without evaluation and tracing is a demo. Add both early.

## 3. Defend the prompt boundary

An agent that reads bank data and web content has an injection surface. The harness includes a prompt guard against injection and jailbreak attempts, and exposes its tools through an MCP gateway so the set of things the model can do is explicit.

**Takeaway:** decide the agent's allowed actions up front, and treat all external text as untrusted.

## 4. Make privacy a testable property

By default nothing leaves the machine: balances and transactions are not sent to cloud APIs, account numbers and sort codes are masked at ingestion, databases and credentials are git-ignored, and CI runs secret scanning. The README even gives a physical test: switch off Wi-Fi and ask a question; the copilot still answers, fully offline.

**Takeaway:** a privacy claim you can verify in airplane mode beats a policy document.

## 5. Choose the boring storage, and keep the seam

The project uses SQLite, and the README explains why: no daemon, near-zero idle memory (important when a local model is already using several gigabytes), and a single local file. All database access sits behind one storage module, so moving to DuckDB for analytical scans or PostgreSQL for a multi-user service would be a contained change.

**Takeaway:** pick the simplest store that fits today's constraints, and keep the interface narrow so you can change later.

---

Browse the code on [GitHub](https://github.com/cloudcruncher/fiduciary-agent).
