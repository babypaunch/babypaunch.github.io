---
layout: post
locale: en
page_key: blog
title: Building a Shared Backend for Echo Note
description: Separating a learning app while keeping one backend, with lessons about public access, content protection, and checking a deployed service.
category: Making
date: 2026-10-21 20:32:00 +0900
last_modified_at: 2026-10-21 20:32:00 +0900
permalink: /en/blog/echo-note-shared-backend/
language_url: /blog/echo-note-shared-backend/
alternate_ko: /blog/echo-note-shared-backend/
alternate_en: /en/blog/echo-note-shared-backend/
tags:
  - android
  - product-design
  - google-play
---

Echo Note did not start as a standalone app.

It began as a vocabulary learning feature inside study365, a project that brought several learning tools together.

As I refined the flow of reading words, listening to pronunciation, and reviewing them, I wanted to use this feature on its own.

So I moved the screens and learning features into the Echo Note project and separated it into an Android app.

That raised another question about whether separating the screens also meant creating another server.

<p class="article-question">Does every new app need its own server?</p>

## Separate apps, one shared server

Echo Note needed a server to manage learning content and provide information to the app.

Other learning apps I might build would probably need similar features.

A separate server for every app would also mean separate deployments, data management, and error checks.

For a project I manage alone, adding more things to operate was a burden alongside building the features.

I decided to keep the existing Rails server from study365 as a shared backend and connect Echo Note as an independent app.

**In simple terms: The apps are the shops people visit, while the backend is the warehouse and office those shops share.**

This lets me change each app's screens and user flow independently while keeping content management and server operations in one place.

Sharing also means a server problem can affect the connected apps, so the scope needs careful consideration.

## Keeping unfinished features private

The existing server still contained learning features under development besides Echo Note.

Sharing a server did not mean those features needed to be available to the public.

Removing a menu link alone does not stop someone from requesting its address directly.

I narrowed public access so the server would accept only the requests needed for the current service.

**In simple terms: Removing a room's name from a sign is only part of the job, because you also need to decide which doors people can enter.**

The admin screens require a separate access check, with public features distinguished from internal ones.

For future apps, I decided it would be better to review what they need before expanding public access.

## One less password to manage

I did not want to create another password just for the admin screens.

I used Google sign-in to verify identity while deciding admin access separately from a successful login.

Being able to sign in with a Google account should not make everyone an administrator.

During integration, login also failed because the return address did not match the deployment configuration.

That taught me that displaying a login button and completing a login in production are different things.

## Making words available while protecting the content

Downloading every word whenever the app opens would be inconvenient on a slow or interrupted connection.

Echo Note includes an initial learning dataset in the app and checks for updated content afterward.

Still, I did not want to bundle the original word file in an easily readable form.

The distributed content is encrypted, and the Android app follows the required protection steps to read it.

**In simple terms: The learning materials are already there, and the app handles unpacking them for use.**

This does not mean that content displayed on a screen can never be copied.

It is a way to reduce direct distribution of the original dataset and manage how the content is delivered.

## Checking installations and keeping learning data

The server does not automatically respond just because something requests information for the app.

On Android, Google Play Integrity provides signals about the installed app that the server uses to assess requests.

**In simple terms: Instead of trusting an app's claim to be official, the server gets evidence to help assess its distribution and state.**

How those results apply to features needs to fit the app's purpose and real installation conditions.

Adding checks should not prevent legitimate users from reaching their learning screen.

Content updates are verified before replacement, and a network or verification failure leaves the last verified data in place.

Adding protection and preserving someone's existing learning data had to be considered together.

## Why a running server was still unreachable

During the first deployment, the server process was running, but external requests were not reaching it correctly.

In the Docker and Kamal setup, the configuration forwarding external requests did not match the receiving side of the app.

After fixing that connection, I found that access restrictions were also blocking server health checks.

Starting the process, forwarding requests, and checking health are connected steps that each need verification.

When fixing these problems, I first checked where requests stopped instead of removing the restrictions altogether.

It was another reminder that settings outside the app's code can make even a small service unusable.

## Deployment success and actual usability

I did not consider the work finished when the deployment command completed.

I checked public responses, blocked requests, and the complete admin login flow separately.

Beyond server tests, I also needed to check whether an app installed through its real distribution channel could reach the first learning screen.

A locally installed app and one installed from Google Play can face different signing and installation checks.

Echo Note had not launched when I wrote the original draft, but it has since been published on Google Play.

After release, checking that app updates and server settings work together remains part of the job.

[View Echo Note on Google Play](https://play.google.com/store/apps/details?id=com.babypaunch.echonote)

[Read the Echo Note privacy policy](/en/policies/echo-note/privacy/)

## What separating one app clarified

This work became a process of defining the existing server's responsibilities and public access instead of creating another server.

The app people use can be independent while the operational features behind it remain shared.

Sharing should not mean exposing every feature, and a running server alone does not prove that the app is usable.

<p class="article-summary"><strong>In one line:</strong> A standalone app does not always need a separate server, but public access, permissions, and behavior in the distributed app each need verification.</p>
