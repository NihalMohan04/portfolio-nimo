---
title: "[Dummy] Building reliable LangGraph agents"
description: "Sample post: a few patterns that keep agent graphs predictable once they leave the demo stage."
date: 2026-10-20
tags: [ai, python, agents]
---

> This is a dummy post for layout testing. Replace or delete before going live.

Agents are easy to demo and hard to operate. Most of the pain comes from letting the model decide too much. These are the patterns I reach for first.

## 1. Make the graph explicit

Prefer a small set of well-named nodes over one giant "do everything" node. Each node should have one job and a typed input and output.

```python
from langgraph.graph import StateGraph, END

graph = StateGraph(AgentState)
graph.add_node("plan", plan)
graph.add_node("act", act)
graph.add_node("review", review)
graph.set_entry_point("plan")
graph.add_edge("plan", "act")
graph.add_conditional_edges("review", route, {"retry": "act", "done": END})
```

## 2. Bound every loop

Any cycle needs a hard cap. A retry counter in state is enough, and it turns a runaway cost into a clean failure.

## 3. Log state, not just text

Persist the full state at every step. When something goes wrong you want to replay the run, not guess at it.

- Checkpoint after each node
- Store tool inputs and outputs
- Keep the model and prompt version next to each run
