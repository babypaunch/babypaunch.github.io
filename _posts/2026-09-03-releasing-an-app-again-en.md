---
layout: post
locale: en
page_key: blog
title: Shall I release an app again?
description: From preparing an Android release to choosing free access, checking security and a real phone, and refining the app name and description after launch.
category: Making
date: 2026-09-03 14:55:20 +0900
last_modified_at: 2026-09-09 22:22:00 +0900
permalink: /en/blog/releasing-an-app-again/
language_url: /blog/releasing-an-app-again/
alternate_ko: /blog/releasing-an-app-again/
alternate_en: /en/blog/releasing-an-app-again/
tags:
  - android
  - google-play
  - ai-prompt
  - product-design
---

Returning to Google Play after a long break made app publishing look more demanding than app development itself.

Building an app bundle and preparing a description and images were not enough.

The privacy policy, Data safety, advertising, content rating, target age, and release countries also had to match the app's actual behaviour.

I had planned to include a payment feature, but a product-price error and real purchase testing were still unresolved.

I reconsidered whether the first release of a working app should wait for that payment feature.

<p class="article-question">Does a first release need to include every feature I have prepared?</p>

## I removed the unverified payment flow first

I originally planned to offer a one-month prepaid Pro pass in the music app I was releasing.

Pro users would use every chord-progression preset without ads.

Play Console kept failing to save the price, and I had not verified purchase, restoration, expiry, or refund behaviour.

Hiding only the payment button while keeping the preset locks would leave users unable to access features without knowing why.

I therefore disabled both the Pro entry point and the locks for the first version.

All 180 chord progressions across 14 genres became free, while the banner ad at the bottom remained.

This did not make the feature less complete but aligned what I had verified with what users could see.

## I rebuilt the release candidate

I raised the app version to `1.0.1 (2)` for the free-preset release.

I produced an AAB with upload signing, R8 code shrinking, resource shrinking, and a ReTrace mapping file.

**In simple terms: An AAB is the Android app package submitted to Google Play, R8 removes unnecessary code, and a ReTrace file makes errors from the shortened code readable again.**

Google Play reported a minimum Android API of 24, a target SDK of 36, and a new-install size of about 6.5 MB.

**In simple terms: The minimum API is the oldest Android version that can run the app, while the target SDK is the recent Android standard the app was built to follow.**

I reused the same AAB from the internal-test library in the production candidate.

I removed the older `1.0 (1)` and kept only `1.0.1 (2)`.

## I aligned the store listing with the real app

I used `코드 스케치` as the Korean app name and `Chord Sketch` as the English name.

I wrote separate short and full descriptions in Korean and English.

They described only the current features available without signing in: the chord wheel, piano keyboard, special chords, four-chord sketch, metronome, and all presets.

I removed the unavailable Pro benefits and payment copy while clearly mentioning the banner ad.

I also uploaded the app icon, feature graphic, and four real phone screenshots.

I excluded an older screenshot showing Pro locks because it no longer matched the free version.

The English listing reused the images from the default listing instead of uploading duplicate files.

## I answered policy questions from the actual SDKs

I declared that the app works without login and contains advertising.

I set the target age to 13 or older and declared that it was not a government, finance, or health app.

The content-rating questionnaire reported no violence, sexual content, gambling, drugs, fear, or user-generated content.

The resulting rating in South Korea was suitable for everyone.

The Data safety form included approximate location, diagnostics, app interactions, and device or other IDs that the Google Mobile Ads SDK may process.

**In simple terms: An SDK is a toolkit that adds a feature, so information handled by an advertising SDK belongs in the Data safety answers even when the app does not store it directly.**

I also completed the Android 13 advertising ID declaration from the real manifest and advertising SDK usage.

**In simple terms: A manifest is the document listing an app's permissions and basic settings, while an advertising ID is a resettable identifier used for ad delivery and measurement.**

I linked public pages for the privacy policy, support, and data deletion guidance.

## I prepared a worldwide release in Korean and English

The app interface and store description were available in Korean and English.

Because the app had no country-specific account, payment, or regional content, I selected all 176 available countries and regions.

I did not translate the listing into every language, so Google Play may use its default language handling in other language environments.

Selecting many regions mattered less than keeping the description and actual features consistent everywhere.

## The final blocker was the advertising ID

After I saved the production AAB, countries, listing, and policy answers, the publishing overview collected 12 changes.

The submission button remained disabled because one issue still required the Android 13 advertising ID declaration.

I checked the advertising SDK and manifest permission, then saved the usage and purposes, which removed the blocker.

**In simple terms: Play Console checks whether the app file and policy answers agree before submission and blocks the button when a required answer is missing.**

The Korean and English release notes mentioned first-release stability, usability improvements, and free access to every preset.

I then sent all 12 changes to Google Play for review.

After the quick automated checks finished, the status changed to `Changes in review`.

## Submission and release are not the same

At the first submission, the production release had been sent for review.

Google review and the actual store publication were the next steps still ahead.

Managed publishing is off, so approval will publish the changes automatically without another release button.

**In simple terms: Managed publishing pauses approved changes until the developer chooses the exact moment to make them public.**

After publication, I planned to link the store listing in AdMob and check the app review and production ad display.

At that point, I still left open the option of restoring Pro after payment testing.

Returning to app publishing was less about adding many features and more about making the code, description, screenshots, and policy answers describe the same app.

Removing one unverified feature made the boundary of the first version clearer.

<section class="article-ai-prompt" data-no-translation markdown="1">
## #AI프롬프트제공

Use this prompt to compare an Android release candidate with its store materials and identify what must be resolved before submission.

Do not include passwords, signing keys, API keys, tokens, or personal information in the prompt.

```text
You are a developer checking an Android app's readiness for a Google Play release.

Project: [project path or repository]
Release candidate: [app version and AAB path, or not yet built]
Feature scope: [features included in and excluded from this version]
Evidence: [store descriptions, screenshots, policy pages, available console screens]
Audience: [release track, countries/regions, and age groups]

Read the README, build settings, manifest, dependencies, and actual implementation first.
- Match applicationId, versionCode/versionName, minimum/target SDK, release signing settings, and the actual AAB
- Compare permissions and advertising, analytics, and billing SDKs with the privacy policy, Data safety answers, and advertising ID declaration
- Check that store descriptions and screenshots match the features in this release
- If billing exists, examine evidence for purchases, restoration, expiry, and refunds, and whether unverified features remain exposed
- If login or restricted features exist, check reviewer access instructions and the validity of support and data-deletion information

Verify submission requirements such as target SDK against current official Google documentation, and do not copy another app's age or Data safety answers.
Do not print signing keys or secrets, automatically remove unverified features, or finalize policy answers on the owner's behalf.

Group results into release blockers, recommended improvements, and unverified items.
Include evidence such as files or execution results and the next action for each item, separating code checks, Play Console checks, and device tests.
Do not describe a successful build as an upload, review approval, or completed publication.
Report findings and minimal proposed fixes first, then perform code changes, uploads, review submissions, and publication only within their respective requested scope and approval requirements.
```
</section>

<hr>

### <code>September 9, 2026</code> update: There was still work after launch

The first version went live on Google Play, and this time I checked a new version on my own phone before submitting an update.

I had expected the release button to be the finish, but using and searching for the app revealed more things to improve.

#### I chose to keep it free

I initially postponed paid features because payment testing was unfinished, but I have now chosen to offer every feature and preset for free with a banner ad at the bottom.

I wanted anyone to start listening to and combining chords immediately instead of waiting for a paid version.

I aligned the Korean and English store descriptions, privacy policies, and support information with that decision as well as the app itself.

#### I checked it again on my own phone

I connected my phone by USB, removed the old app, installed the new version, and tried it myself.

I confirmed that the app worked and an ad appeared at the bottom of the screen.

However, seeing an ad on my phone was separate from AdMob completing its review.

**In simple terms: AdMob supplies ads to apps, and seeing one ad does not mean every review step in its dashboard has finished.**

What I checked was a directly installed copy of the new version, while delivery of the update through Google Play remained something to verify after review.

#### I looked beyond the visible screen

Before submitting the update, I checked file importing, the web content inside the app, ad handling, and the libraries it used.

I fixed an issue that could let imported file content execute as code and added checks for file size and format.

I restricted what the app's embedded web content could access and replaced library versions with known vulnerabilities.

**In simple terms: A file should be read only as saved work, and its contents must not turn into instructions that the app executes.**

Passing these checks does not mean there will never be a security issue or another update, so I recorded the problems fixed and the scope actually checked.

#### People still needed to find the app

I searched for my app on Google Play, but it was harder to find than I expected.

I realised that the name `코드 스케치` alone might not immediately tell a new visitor that this was a music app.

I therefore submitted `코드 스케치 - 작곡 공부` as the Korean name and `Chord Sketch: Learn to Compose` as the English name.

The descriptions went beyond listing features to explain how to practise by listening to chords, checking their notes on the piano, and building a progression.

I added the same guidance and a [direct Google Play link](https://play.google.com/store/apps/details?id=com.babypaunch.chordsketch) to the [support page](/en/support/chord-sketch/).

Changing a name does not guarantee an immediate improvement in search ranking, but it can make the app's purpose clearer.

When I finished submitting the changes on September 9, `1.0.2 (3)` and the new Korean and English listings were in review together.

Adding the name and description changes restarted the ongoing review, and Google warned that the wait could become longer.

The next checks are whether the update and new name have gone live and what result AdMob returns from its separate review.

<p class="article-summary"><strong>In one line:</strong> Align the app's behaviour, description, and policies before release, then check the real phone experience and how clearly search results explain its purpose while recording submission and publication as separate milestones.</p>
