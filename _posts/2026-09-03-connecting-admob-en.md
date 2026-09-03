---
layout: post
locale: en
page_key: blog
title: Shall we connect AdMob?
description: I connected AdMob to an Android app and separated the roles of ad requests, UMP consent, app review, public store linking, and app-ads.txt.
category: Making
date: 2026-09-03 00:00:00 +0900
last_modified_at: 2026-09-03 15:06:40 +0900
permalink: /en/blog/connecting-admob/
language_url: /blog/connecting-admob/
alternate_ko: /blog/connecting-admob/
alternate_en: /en/blog/connecting-admob/
tags:
  - admob
  - android
  - google-play
---

I added a banner ad to the bottom of an Android app.

The Google Mobile Ads SDK initialized, and the screen had a place ready for the ad.

I installed the app on a real phone through Google Play internal testing instead of using a locally built APK.

The app opened normally, but no ad appeared.

There was not even an empty bar at the bottom, so I first suspected the ad container or safe-area calculation.

The screen was not the cause this time.

<p class="article-question">If the ad SDK runs but the AdMob banner stays invisible, where should I look first?</p>

## I separated the possible meanings of a missing ad

The result may look the same, but several different stages can make an ad disappear.

- The ad SDK may not have initialized.
- The app may not have sent a request because privacy consent was incomplete.
- The app may have sent a request that the server could not fill.
- The ad may have loaded behind another screen element.
- The AdMob account or app may not yet be allowed to serve ads.
- AdMob may not have found the linked public store listing.

Instead of deciding from the screen alone, I checked the code, Android logs, AdMob Console, and Google Play in order.

## Test ads and production ads are different

During development, an app should use the test ad units provided by Google.

Test ads remain separate from revenue ads and help developers avoid repeatedly interacting with their own production ads.

A release build needs a production AdMob app ID and banner ad unit ID.

I used test IDs in development and made the release build fail when the production IDs were missing.

Having production IDs does not mean that ad serving has been approved.

The IDs only decide which app and ad unit receive the request.

**In simple terms: An SDK is a toolkit that adds ad features, the app ID identifies the app, and the ad unit ID identifies the place where an ad appears.**

## Privacy consent comes before the ad request

An app should not request an ad immediately at startup when users may need to provide consent.

I updated consent information with the Google UMP SDK, handled any required form, and requested the ad only when `canRequestAds()` allowed it.

Users who do not need a consent form still pass through this flow before the ad-request stage.

An SDK initialization log was therefore not enough to prove that an ad request had been sent.

I needed separate checks for the UMP update, the `canRequestAds()` result, the request itself, and the success or failure callback.

**In simple terms: UMP asks the user for advertising consent, while `canRequestAds()` reports whether the app may request an ad now.**

## Why there was no empty ad area

I made the bottom container visible only after the ad loaded successfully.

When loading failed, the app removed both the container height and the space below the WebView.

This prevented an empty grey strip from replacing the ad.

The absence of anything at the bottom did not prove that the layout code had never run.

The app had handled the failed state exactly as intended.

## What the Android logs showed

I ran the Google Play internal-test build and inspected the ADB logs.

The app process ran normally without a crash or ANR.

The Google Mobile Ads SDK initialized and connected to the ad network.

The install source was `com.android.vending`, confirming that this was the Google Play build rather than a locally installed APK.

**In simple terms: ADB is a tool for reading a phone's runtime logs, while an ANR means that an app has frozen and stopped responding to input.**

SDK initialization still did not mean that an ad had arrived from the server.

The next place to check was AdMob Console.

## The real cause was AdMob readiness

The AdMob account was still going through approval.

The app showed states for review required, limited ad serving, and store listing required.

Its ad request count was also zero.

Changing the UI cannot suddenly produce a production ad in this state.

AdMob still needed to find the app in a public store and approve it for ad serving.

## Internal testing is not a public store listing

Only invited testers can access a Google Play internal-test app.

Even though Play can install it, it is not a public listing that appears in ordinary search results.

AdMob could not find the app by its Android application ID or internal-test URL.

Choosing an unrelated store just to continue would not have been a valid fix.

The correct app needs to be linked after its real Google Play listing becomes public.

I therefore submitted the production release for review first and will retry the AdMob link and app review after the listing appears.

The production release is currently under review and is not public yet.

**In simple terms: Only invited people can install an internal test, while a production release must go public before anyone can find the app in the store.**

## `app-ads.txt` is a separate step from approval

AdMob uses `app-ads.txt` at the root of the developer website to verify who is authorized to sell the app's ad inventory.

The address initially returned `404`.

After adding the record supplied by AdMob, I verified both `HTTP 200` and the exact file content.

A valid `app-ads.txt` file does not make ads appear immediately.

- Publishing `app-ads.txt` on the developer website
- Approval of the AdMob account
- Linking the AdMob app to a public store listing
- Review of the AdMob app
- Actual requests and responses for the ad unit

These five items are separate stages.

**In simple terms: `app-ads.txt` is a public verification file that tells advertising companies who is authorized to sell ads for the app.**

## The advertising ID declaration on Android 13

An app using the Google Mobile Ads SDK may receive the `com.google.android.gms.permission.AD_ID` permission through manifest merging.

Apps targeting Android 13 or later must also declare advertising ID usage in Play Console.

Just before production submission, Play Console blocked the release because this declaration was missing.

After checking the actual SDK usage and manifest permission, I declared that the app uses the advertising ID.

I selected analytics, advertising or marketing, and fraud prevention, security, and compliance as its purposes.

These answers must also agree with the Data safety form.

**In simple terms: An advertising ID is not the device's permanent serial number but a resettable identifier used for ad delivery and measurement.**

## Process summary

1. Confirm that an official Google test ad appears in the development build.
2. Confirm that the release build contains the production AdMob app ID and ad unit ID.
3. Confirm that `canRequestAds()` allows requests after UMP consent handling.
4. Inspect the ad request and success or failure callback in Android logs.
5. Check whether the app deliberately hides the container after an ad failure.
6. Check AdMob account approval, app review, and ad-serving limits.
7. Check whether the AdMob ad request count is increasing.
8. Confirm that the public Google Play listing is linked to the AdMob app.
9. Confirm that `app-ads.txt` loads correctly from its public address.
10. Confirm that Play Console advertising, Data safety, and advertising ID declarations match the SDK in the app.

The important part of this order is not starting with a screen change.

If no request left the app, the problem is not the banner layout, and if the account is restricted, app code alone cannot fix it.

I verified the banner position, failed-load cleanup, UMP consent order, and SDK execution in the Google Play build.

Production ad display still needs another check after the release becomes public and the AdMob store link and app review are complete.

Ad integration was not one line of code but one flow connecting the app, consent, store, account review, and publisher file.

<p class="article-summary"><strong>In one line:</strong> When an AdMob ad stays invisible, check test ads, post-consent requests, Android logs, AdMob approval and app review, the public store link, and <code>app-ads.txt</code> before changing the banner UI.</p>
