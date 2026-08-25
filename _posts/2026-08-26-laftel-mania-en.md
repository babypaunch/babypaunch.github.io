---
layout: post
locale: en
page_key: blog
title: I built Laftel Mania to watch anime while coding
description: Playback shortcuts and a clear OSD for coding on one side of the screen and watching anime on the other.
category: Making
date: 2026-08-26 00:00:00 +0900
permalink: /en/blog/laftel-mania/
language_url: /blog/laftel-mania/
alternate_ko: /blog/laftel-mania/
alternate_en: /en/blog/laftel-mania/
---

I do most of my development on a single laptop.

Vibe coding creates short stretches of free time while the AI works. I do not want to get too absorbed in something else, because it is better to continue with the next task as soon as the current one finishes.

So I split the laptop screen. One third stays on the AI coding session, while the other two thirds are available for anime or another light task.

To keep track of development while watching, I wanted to avoid reaching for the mouse every few minutes. But changing playback speed on Laftel meant opening the player menu and selecting the speed again.

That left me with two questions.

1. Why could I not change Laftel's playback speed with keyboard shortcuts?
2. When I used a shortcut, could the new speed be easy to see?

I built the Laftel Mania Chrome extension to answer those two questions.

## Change speed without leaving the keyboard

`Shift + ,` slows playback by 0.25, and `Shift + .` makes it 0.25 faster. The available range is `0.25x` to `4.00x`.

There is no player menu to find. I can change the speed without taking my hands away from the keyboard or losing my place in the code.

The extension also remembers the last speed. When the next video opens, that value is applied automatically instead of making me choose it again.

## An OSD that makes the change obvious

A shortcut is fast, but it is hard to trust when there is no visible response. Laftel Mania therefore shows the current playback speed near the top of the video whenever it changes.

Values such as `1.25x` and `1.50x` appear immediately. The OSD stays visible for about 0.8 seconds and then fades away, so it confirms the change without covering the video for long.

I focused on three things:

- Make the value readable while watching the video
- Show the exact current speed
- Get out of the way quickly after confirmation

## A focus mode for the video

Laftel's surrounding interface can feel crowded when the player only has two thirds of a laptop screen. Pressing `Shift + M` dims the surrounding page and keeps the video in the center.

It does not reload or move the playing video, so playback can continue. Pressing `Shift + M` again restores the page. The `/` key opens a quick guide to every shortcut.

## One stored value: playback speed

Laftel Mania stores only the last playback speed. The value remains in the user's Chrome sync storage and is not sent to a separate developer server.

It does not collect login details, browsing history, anime viewing history, or page content. The [privacy policy](https://babypaunch.github.io/public-policies/laftel-mania/privacy.html) explains these boundaries.

Laftel Mania is an unofficial extension and is not made or approved by Laftel. The current version is `1.3.0`, and I am preparing it for a public Chrome Web Store release.

The idea was simple: watch anime comfortably without missing the moment when the AI finishes its work. Laftel Mania solves that small problem with playback shortcuts and an OSD that is easy to see.

**In one line:** If you vibe code and watch anime on one laptop, try Laftel Mania. I recommend watching at `1.5x`.
