---
layout: post
locale: en
page_key: blog
title: The more I used AI, the more I had to manage
description: How one web-capture tool led me to manage duplicated AI tools, usage evidence, and update state.
category: Making
date: 2026-09-14 12:35:00 +0900
last_modified_at: 2026-09-14 12:47:00 +0900
permalink: /en/blog/managing-ai-tools/
language_url: /blog/managing-ai-tools/
alternate_ko: /blog/managing-ai-tools/
alternate_en: /en/blog/managing-ai-tools/
tags:
  - ai-tools
  - ai-prompt
  - vibe-coding
---

It started with capturing web pages.

After building a web project, I repeatedly had to check its mobile, tablet, and PC layouts.

I was tired of explaining the same viewport sizes and checks, so I made a reusable set of instructions for Codex.

I thought checking the screen had just become a little easier.

Soon, however, a notice appeared saying that there were too many tool descriptions for the AI to read in full.

I had added one tool to reduce work, and now I had a new job managing those tools.

<p class="article-question">Will AI tools keep working the same way if I simply leave them installed?</p>

## The same tools were taking up several spaces

I first inspected the tools that were actually available.

Several entries had the same function but lived in different installation locations.

The AI checks which tools it can use before starting a task, so duplicate descriptions also occupy its working space.

I did not start deleting files blindly.

I kept one active path for each function and disabled only the overlapping paths.

**In simple terms: if identical screwdrivers were filling several slots, I kept one within easy reach and stored the rest.**

## I wanted evidence of use, not just an installation list

After clearing the duplicates, I wondered which tools I actually used.

Being installed and being useful are different facts.

I extended my existing tool catalogue to collect visible tool-use evidence from the work records I already had.

I did not build a new server or leave a program running to watch every action.

Reading recent records and producing a report only when needed was enough.

When no evidence appeared, the report said `use not confirmed` instead of `unused`.

A release-checking tool used once a month may matter more at the right moment than a convenience used every day.

## Usage counts were still not enough

A few days later, another problem became clear.

A tool that worked today was not guaranteed to stay identical after its next update.

I began recording its installed version and a value that could reveal whether its files had changed.

**In simple terms: I wrote down the model of each tool and a digital fingerprint that could show whether its contents had changed.**

I kept the change history in a private Git repository and stored the compressed archive needed for recovery in a separate backup.

Git was useful for finding what changed and when, while the backup was better for restoring real files on another PC.

Account tokens, login records, and personal paths were excluded from anything that could become a shareable record.

Even in a private repository, a secret committed once can be difficult to erase completely later.

## An automated check was not the final verdict

When I ran the automated checks, some tools were reported as missing.

Separate checks of the files and registrations showed that spaces in Windows paths had been misread.

Reinstalling them based only on that result could have changed a working setup.

## Using AI for longer required management rules

At first, I only wanted to make web capture easier.

That led to removing duplicate tool paths, checking usage evidence, and recording update state.

Having many tools was not the problem by itself.

The problem was not knowing why each one remained or when it had changed.

Before installing a new tool, I now check whether an existing one already covers the same job, and I record the current state before an update.

I do not automatically delete something because its count is zero, and I check both history and backup when a problem appears.

Giving more work to AI did not leave nothing for me to do.

My part shifted from repeating tasks to deciding how those tasks should be managed.

## #AI프롬프트제공

This prompt helps inspect duplicated AI tools, usage evidence, and update state without exposing private information.

Do not enter passwords, API keys, tokens, or personal information in the prompt.

<section class="article-ai-prompt" data-no-translation markdown="1">

```text
Inspect the Skills, Plugins, and MCP servers installed under [AI tool configuration folder].

Reuse any existing catalogue or management script first.
Find functions installed through more than one path.
Before deleting or disabling anything, report each source and the path currently in use.

Collect verifiable usage evidence from the preserved work records for the last [30] days.
Separate direct calls, estimated calls found in code, and records of instructions being read.
Label entries without evidence as 'use not confirmed' rather than 'unused'.

Create a record that lets me recheck each tool's installed version and whether its files changed.
Flag unpinned versions, but do not update or delete anything without my approval.

Exclude tokens, environment-variable values, login sessions, conversation text, and absolute user paths.
Propose separate roles for Git change history and a recovery backup.
Report inventory, automated checks, file checks, and real execution verification separately.
```

</section>

Official references: [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins), [How Skills work](https://developers.openai.com/plugins/concepts/skills).

<p class="article-summary"><strong>In one line:</strong> AI tools stay manageable when I check duplication and usage evidence, then record both their pre-update state and a practical recovery path.</p>
