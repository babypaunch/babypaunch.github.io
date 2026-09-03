---
layout: post
locale: en
page_key: blog
title: Shall I release an app again?
description: I returned to Android app publishing, removed an unverified payment flow, and aligned the free features, store materials, and policy answers in one release candidate.
category: Making
date: 2026-09-03 14:55:20 +0900
last_modified_at: 2026-09-03 15:06:40 +0900
permalink: /en/blog/releasing-an-app-again/
language_url: /blog/releasing-an-app-again/
alternate_ko: /blog/releasing-an-app-again/
alternate_en: /en/blog/releasing-an-app-again/
tags:
  - android
  - google-play
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

The current state is production release review submitted.

Google review and the actual store publication are still pending.

Managed publishing is off, so approval will publish the changes automatically without another release button.

**In simple terms: Managed publishing pauses approved changes until the developer chooses the exact moment to make them public.**

After the app becomes public, I still need to link its store listing in AdMob and verify the app review and production ad display.

The Pro payment flow can return in a later version after the price and real purchase states are verified.

Returning to app publishing was less about adding many features and more about making the code, description, screenshots, and policy answers describe the same app.

Removing one unverified feature made the boundary of the first version clearer.

<p class="article-summary"><strong>In one line:</strong> For a first release, it is safer to exclude unverified features and submit only after the app's actual behaviour, store description, screenshots, and policy answers all describe the same feature scope.</p>
