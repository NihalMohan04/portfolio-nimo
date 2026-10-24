---
title: "[Dummy] Three async pitfalls in FastAPI services"
description: "Sample post: blocking calls, shared clients, and background tasks that quietly bite in production."
date: 2026-10-12
tags: [python, backend]
---

> This is a dummy post for layout testing. Replace or delete before going live.

Async Python is fast right up until one blocking call stalls the whole event loop.

## Blocking calls in async handlers

A synchronous database driver or `requests.get` inside an `async def` handler blocks every other request on that worker.

```python
@app.get("/report")
async def report():
    # bad: blocks the loop
    # data = requests.get(URL).json()
    async with httpx.AsyncClient() as client:
        data = (await client.get(URL)).json()
    return data
```

## One client per request

Creating an HTTP client or connection pool per request throws away connection reuse. Create it once in the lifespan handler and share it.

## Fire-and-forget tasks

`asyncio.create_task` without keeping a reference can let the task be garbage collected mid-run. Hold references, or use a proper queue.

| Symptom | Likely cause |
| --- | --- |
| Latency spikes under load | Blocking call in a handler |
| Too many open connections | Client created per request |
| Jobs silently missing | Unreferenced background task |
