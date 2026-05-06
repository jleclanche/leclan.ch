---
name: fresh-eyes
description: Spawn context-free subagents to get unbiased "third-party" opinions on design and architectural decisions. Counters status-quo bias that builds up inside a long conversation. Use for refactor scope, API shape, naming systems, structural choices — not for tactical decisions where local context matters.
---

# Fresh Eyes

When you've been deep in a problem, you accumulate context that biases you toward the status quo. Extended thinking can't fix this — it deliberates inside the same context. A subagent that has never seen the existing code or this conversation can.

## When to use this

Reach for fresh eyes when:
- Designing or refactoring something with multiple viable shapes (API design, naming systems, module boundaries, data model choices)
- The user asks "what do you think?" on a structural choice
- You notice you're defending the current approach and can't tell whether that's reasoned or inertia
- A design feels off but you can't articulate why

Do **not** use this for:
- Tactical, local decisions (loop vs map, variable name, one-line fix) — context matters and you'll get generic advice
- Bug fixes or anything with a clear correct answer
- Tasks where the user has already decided and wants execution
- Cheap questions where the cost of a subagent isn't justified

## How to use it

### 1. Write the brief as if the agent has never seen this codebase

This is the whole point. Describe the **problem**, not the **current solution**. The moment you describe the existing approach, you've biased the agent toward affirming it.

**Bad brief** (leaks the answer):
> "We have an `OrderProcessor` class that's gotten huge. Should I split it into `OrderValidator`, `OrderPricer`, and `OrderFulfiller`?"

**Good brief** (problem-first):
> "An e-commerce checkout flow currently has one class handling validation, pricing, inventory, payment, and fulfillment routing — about 800 lines. The team finds it hard to test in isolation and changes in one area cause regressions in others. How would you structure this? Assume greenfield — don't worry about migration cost."

### 2. Spawn a `general-purpose` Agent and ask for a position, not a survey

Tell the agent explicitly:
- "I want your honest opinion in a vacuum."
- "Don't optimize for matching what I might already be doing."
- "Recommend one approach with reasoning. No 'it depends'."

You want a position you can argue with, not a balanced menu.

### 3. For high-stakes calls, triangulate

Spawn 2–3 agents with **different framings** of the same problem:
- One framed as **greenfield** ("if you were starting today")
- One framed around **change cost** ("what would be hardest to change later")
- One framed around **the team** ("what would be easiest for a new hire to understand")

Divergence between the agents is itself the signal — it means the choice is genuinely contested, not obvious. Convergence means the answer is probably right regardless of frame.

### 4. Synthesize, don't delegate

The subagents give you raw opinions formed without the context you have. **You** combine them with the constraints they don't know about (migration cost, team skills, deadlines, existing commitments) and present a recommendation to the user. Never paste an agent's output as your own conclusion without weighing it.

## Caveats

- **Garbage in, garbage out.** Whoever writes the brief picks what to include — that's where bias sneaks back in. Re-read your brief and ask "have I already proposed the answer here?"
- **Cost.** Each subagent burns tokens and adds latency. Reserve this for decisions worth a couple minutes and a few thousand tokens to get right. Don't use it as a default thinking step.
- **Not a substitute for understanding.** If you don't understand the problem yourself, you can't write a good brief and you can't synthesize the answers. Fresh eyes amplifies your judgment; it doesn't replace it.

## One-liner version

When you catch yourself defending the existing approach, ask: *what would someone say if they'd never seen this code?* If the answer matters, spawn an agent and find out.
