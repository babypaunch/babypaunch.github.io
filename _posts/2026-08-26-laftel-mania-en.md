---
layout: post
locale: en
page_key: blog
title: I built Laftel Mania so I would not have to set playback speed again
description: How a small Chrome extension ran into input methods, iframes, and browser permissions.
category: Making
date: 2026-08-26 00:00:00 +0900
permalink: /en/blog/laftel-mania/
language_url: /blog/laftel-mania/
alternate_ko: /blog/laftel-mania/
alternate_en: /en/blog/laftel-mania/
---

Everyone has a playback speed they reach for. Choosing it again whenever the next video starts is a tiny inconvenience, but it happens often. Laftel Mania is a Chrome extension I built to remove that repetition.

The first goal was simple: remember the last playback speed and apply it to the next video. It now supports speeds from `0.25x` to `4.00x`, adjusted in 0.25 increments with `Shift + ,` and `Shift + .`. The selected value stays in Chrome sync storage and follows the next video.

## Keyboard input was more complicated than the visible character

Adding two shortcuts looked straightforward. With a Korean input method active, however, the browser can report the key as `Process`. Checking only the typed character meant that the same physical key sometimes stopped working.

The extension therefore checks the physical key `code` as well. Recognizing `Comma` and `Period` keeps the shortcuts in the same place regardless of the active input language. A small test using Node's built-in assertions preserves that behavior.

## From speed control to a viewing tool

Once speed memory worked, I also wanted a way to hide the surrounding interface for a moment. Pressing `Shift + M` now dims the page and keeps the video centered in a focus mode.

The mode does not move the video element or delete the existing DOM. It applies temporary CSS classes, so playback can continue while the page changes around it. The `/` shortcut opens a help dialog with a close button, outside-click dismissal, `Esc`, and keyboard focus cycling. Even a small tool should remain usable without a mouse.

## The difficult part was iframe permissions

The actual video is not always placed directly inside a `laftel.net` document. It may play inside an external HTTPS iframe. When the extension was limited to the Laftel domain, it could not reach the video element and speed control stopped working.

The current implementation declares HTTPS frames as injection candidates, then immediately checks whether the current frame or one of its ancestors belongs to `laftel.net`. It exits on unrelated pages. This makes the extension less dependent on one player provider, but it creates a trade-off: Chrome presents the permission as broad site access.

Before public release, I still want to test a narrower permission flow. One candidate is to identify the actual player origin from the Laftel page and ask the user to approve only that origin. It will replace the current approach only after the existing playback controls are proven to keep working.

## One value, no developer server

Laftel Mania stores one value: the last playback speed. It remains in the user's Chrome sync storage and is not sent to a developer server. The extension does not collect login information, browsing or viewing history, or page content.

The Ko-fi support link is optional and every feature remains free. The extension does not process payment information. Laftel Mania is an unofficial extension and is not made, approved, or endorsed by Laftel. The [privacy policy](https://babypaunch.github.io/public-policies/laftel-mania/privacy.html) documents these boundaries.

## What remains

Version `1.3.0` includes speed memory, physical-key shortcuts, focus mode, help, and regression checks. The next steps are a final test against real Laftel video playback and a decision on the permission model for Chrome Web Store review.

The feature I wanted for myself was small. It became more dependable each time it met a real edge of the browser: input methods, iframe boundaries, and permissions. That is the kind of tool I want BabyPaunch to make. Nothing grand, just one repeated annoyance removed properly.
