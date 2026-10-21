---
layout: post
locale: en
page_key: blog
title: I made anydocs just to open a text file
description: An Android app that started with files that would not open and grew to include Markdown previews, search and editing that preserves the original.
category: Making
date: 2026-10-21 18:39:00 +0900
last_modified_at: 2026-10-21 18:39:00 +0900
permalink: /en/blog/anydocs/
language_url: /blog/anydocs/
alternate_ko: /blog/anydocs/
alternate_en: /en/blog/anydocs/
tags:
  - android
  - product-design
  - google-play
---

Opening a single file on Android was often harder than I expected.

It was clearly a text file, yet finding an app to open it could be awkward, and sometimes having no file extension stopped me before I could even read it.

Whether it was a note, a log or a configuration file, I only needed to read the text inside.

So I made a small app for my own convenience.

I called it `anydocs`.

<p class="article-question">If a file contains text, why shouldn't I be able to open it regardless of its extension?</p>

## Opening files without extensions

anydocs is a text and Markdown reader for Android.

What matters is whether the contents are text, rather than the file's name.

It can display the source of files such as `.log`, `.json`, `.html`, `.js` and `.yaml`, as well as `.txt` files.

Files without extensions, including `README`, `LICENSE` and `Dockerfile`, can also be selected from inside the app.

**In simple terms: a file does not need to end in `.txt` for the app to read the text inside it.**

The app does not restrict opening files to a fixed list of extensions.

That does not mean it can turn non-text contents, such as photos or compressed files, into readable documents.

Despite having docs in its name, it is not a viewer for Word, Excel, PowerPoint, HWP or PDF files.

I started by keeping its scope focused on reading text comfortably.

## Pick a file and start reading

The folder-shaped open button brings up Android's file picker.

If the file manager supports it, you can also choose anydocs as the app to open a file or send one through another app's share menu.

If anydocs does not appear among the available apps, you can select the file from inside anydocs instead.

You can adjust small text and enable word wrap to fit long lines to the screen.

Turn wrapping off when you want to preserve the shape of lines in code or logs.

If an icon is unclear, press and hold it to see the function's name.

App guidance appears in Korean on phones set to Korean and defaults to English for other languages.

It does not translate the document's contents or its filename.

## Read Markdown as a document

You can read Markdown as source text or switch to a document view with distinct headings and lists.

**In simple terms: Markdown is a text document format that uses symbols to mark headings and emphasis.**

The Markdown button next to the filename displays headings, lists, quotes, tables, checklists and code blocks in a readable layout.

Press the same button again to return to the source and restore your reading position.

The conversion happens on the phone without sending the document over the internet.

Images appear as their descriptions rather than actual pictures, and the app does not execute HTML or JavaScript.

Web links open in an external browser when you tap them.

If a document is too large or complex to convert comfortably, you can still read its source text.

## Find what you need in a long document

Searching is faster than scrolling from beginning to end when a document is long.

Enter text to search the entire document, then use the arrows to move between previous and next matches.

Use the `Aa` button when you need a case-sensitive search.

Line numbers help distinguish the original lines, and the go-to-line button lets you enter a line number directly.

Even when wrapping makes one line look like several on screen, it keeps the same original line number.

Starting a search from the formatted Markdown view returns to the source to find the matching text.

Large text is read in pages, without putting the entire document on screen at once.

Searching all of a large file can still take time.

## When text looks wrong or JSON is one long line

If Korean text appears as unexpected symbols, you can try changing the encoding.

**In simple terms: encoding determines which characters stored data represents, so the right choice is necessary to read Korean text correctly.**

Automatic selection is the default, and you can choose `CP949` or `EUC-KR` manually for older Korean files when needed.

If the file has no encoding marker at the beginning, automatic selection defaults to `UTF-8`.

If JSON is packed into one long line, use the JSON formatting button.

**In simple terms: JSON stores names paired with values, and formatting adds line breaks and indentation to make that structure easier to read.**

You can switch back from the formatted view to the source.

Neither the Markdown preview nor JSON formatting changes the original file.

## Make it easier to return

Tap the star before the title to favorite a file you read often.

The recent-files list lets you reopen recent documents and favorites.

The app also remembers the reading position and encoding for each file.

While the app is visible, it reloads a file when the provider reports a change or its size or modification time changes.

Some apps do not provide that information, so I kept a refresh button for reloading manually.

If a file moves or its access permission expires, you must select it again even if it remains in the recent list.

## From reading to editing, while preserving the original

After building the reader, I added a way to edit and save short notes or parts of configuration files.

Saving an edited copy lets you choose a location and name in Android's file picker instead of overwriting the original.

The new file uses `UTF-8` and opens in the app after saving.

Editing is limited to roughly one million characters, while larger documents can use the existing reading features.

Editing is included in the `1.5.0` update that I developed and tested.

The project's latest release record documents submission of that update for review, and I have not verified its approval or public availability for this article.

The editing menu may therefore be absent from the version you have installed.

## Boundaries a document reader should keep

Once the app could open source code, I also thought about whether the code inside a document might run.

Opening a `.js` or `.html` file displays its contents as text without executing the file's code.

The Markdown view also blocks JavaScript execution and loading external images or resources.

**In simple terms: the app shows the instructions written in a document rather than following them.**

To avoid overwhelming the phone with large documents, conversion and JSON formatting have size and complexity limits, and temporary-file creation stops when storage space is too low.

I kept the source readable where possible even when those limits prevent a formatted view.

## Releasing it as a free app

anydocs is free, requires no account or subscription, and supports Android 8.0 or later.

Document contents are not uploaded to a developer server or included in advertising requests.

Temporary display files and settings such as recent files, favorites and reading positions stay on the device.

The app uses one bottom banner ad, and the privacy policy explains advertising and consent separately from document processing.

You can find the app on [Google Play](https://play.google.com/store/apps/details?id=com.babypaunch.anydocs) and read about its data handling in the [privacy policy](/en/policies/anydocs/privacy/).

I did not set out to support a large collection of document formats.

I started because I wanted to open a text file easily on my own phone.

I hope anydocs can be a small help to anyone who has run into the same problem.

<p class="article-summary"><strong>In one line:</strong> A text file that would not open because of its extension led me to build a small Android app that makes reading easier and saves edits separately from the original.</p>
