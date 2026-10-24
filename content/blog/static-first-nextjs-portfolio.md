---
title: "[Dummy] Why this portfolio is static-first"
description: "Sample post: the trade-offs behind keeping a personal site as plain files on a CDN."
date: 2026-10-05
tags: [nextjs, web]
---

> This is a dummy post for layout testing. Replace or delete before going live.

A personal site doesn't need a database. It needs to load instantly and be easy to edit.

## Content as files

All content lives in typed data files and markdown. Changing a paragraph is a pull request, and every change gets a preview deployment for free.

## What static buys you

1. Fast first paint, since pages are prebuilt HTML
2. Nothing to patch or monitor at runtime
3. Cheap, boring hosting

## What it costs

There is no admin UI and no scheduled publishing. For a handful of posts a year, that is a fair trade.

Read more in the [Next.js docs](https://nextjs.org/docs).
