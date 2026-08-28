---
layout: post
locale: en
page_key: blog
title: I wanted to know where people were coming from
description: I connected consent-based GA4 and Search Console to BabyPaunch and established a foundation for understanding traffic sources.
category: Making
date: 2026-08-28 00:00:00 +0900
last_modified_at: 2026-08-29 08:00:00 +0900
permalink: /en/blog/github-pages-analytics/
language_url: /blog/github-pages-analytics/
alternate_ko: /blog/github-pages-analytics/
alternate_en: /en/blog/github-pages-analytics/
tags:
  - web-analytics
  - ga4
  - search-console
  - github-pages
---

I had started publishing blog posts, but I still could not tell which ones people actually read.

Even if I shared a post on Instagram, Threads, Facebook, and X, I had no way to see which platform brought someone to the site. I also could not see the search terms people used to find it.

If I was going to keep writing, I wanted more than a page-view total.

I wanted to understand which subjects and traffic sources genuinely brought people in.

So I began with one question.

<p class="article-question">Can I check which posts work instead of guessing?</p>

## This work at a glance

<div class="data-cards">
  <section class="data-card"><h3>1. Google Analytics</h3><p><strong>What I did:</strong> Created a GA4 property and web stream</p><p><strong>Why I did it:</strong> To measure posts and traffic sources</p><p><strong>Result:</strong> Visitor analytics foundation established</p></section>
  <section class="data-card"><h3>2. My site</h3><p><strong>What I did:</strong> Connected the measurement code in the shared layout</p><p><strong>Why I did it:</strong> To apply the same analytics rules to every page</p><p><strong>Result:</strong> Measurement available across the site</p></section>
  <section class="data-card"><h3>3. My site</h3><p><strong>What I did:</strong> Built Korean and English consent UI and settings controls</p><p><strong>Why I did it:</strong> To run analytics according to each visitor's choice</p><p><strong>Result:</strong> GA4 not loaded before consent</p></section>
  <section class="data-card"><h3>4. My site</h3><p><strong>What I did:</strong> Updated the Korean and English privacy policies</p><p><strong>Why I did it:</strong> To explain analytics and how to decline</p><p><strong>Result:</strong> Analytics use disclosed</p></section>
  <section class="data-card"><h3>5. Google Analytics</h3><p><strong>What I did:</strong> Enabled enhanced measurement</p><p><strong>Why I did it:</strong> To check page views, scrolling, and outbound clicks</p><p><strong>Result:</strong> Key interactions measurable</p></section>
  <section class="data-card"><h3>6. Cloudflare</h3><p><strong>What I did:</strong> Added Google's verification TXT record</p><p><strong>Why I did it:</strong> To verify the Search Console domain property</p><p><strong>Result:</strong> Ownership of <code>babypaunch.com</code> verified</p></section>
  <section class="data-card"><h3>7. Search Console</h3><p><strong>What I did:</strong> Submitted the sitemap</p><p><strong>Why I did it:</strong> To provide public pages to Google</p><p><strong>Result:</strong> Submission succeeded and 27 pages discovered</p></section>
  <section class="data-card"><h3>8. GA4 and Search Console</h3><p><strong>What I did:</strong> Linked the two services</p><p><strong>Why I did it:</strong> To compare search traffic with site activity</p><p><strong>Result:</strong> Combined analysis foundation established</p></section>
  <section class="data-card"><h3>9. SNS publishing design</h3><p><strong>What I did:</strong> Added platform-specific UTM rules</p><p><strong>Why I did it:</strong> To distinguish traffic from four social platforms</p><p><strong>Result:</strong> Source-specific link rules prepared</p></section>
  <section class="data-card"><h3>10. My site</h3><p><strong>What I did:</strong> Ran the Jekyll build and quality checks</p><p><strong>Why I did it:</strong> To make sure the changes did not break the site</p><p><strong>Result:</strong> Checks for 25 pages passed</p></section>
</div>

## Measuring posts and traffic sources with GA4

I created a `BabyPaunch Website` property in Google Analytics 4 and a web stream for `https://babypaunch.com`. I connected the public measurement ID to the site.

I also enabled enhanced measurement. It now records page views, scrolling that indicates how far someone read, and clicks that lead to another website.

GitHub Pages is a static site without an application server of its own.

That is still enough.

Adding the analytics integration once to the shared Jekyll layout applies the same rules to the home, blog, music, and policy pages.

After deployment, I can open a real blog post and check the GA4 realtime report.

## Not loading analytics before consent

Analytics must not run before a visitor has made a choice.

On the first visit, an analytics consent modal appears in Korean or English. The Google Analytics script itself is not loaded until the visitor selects <strong>Allow analytics</strong>. Declining does not remove or limit any site feature.

The choice is stored in the browser's local storage. It can be changed later through <button class="footer-button" type="button" data-analytics-settings>Analytics settings</button> at the bottom of every page. A short confirmation appears after accepting or declining and disappears automatically after two seconds.

The modal is centred with a dimmed background. Keyboard focus stays inside it, and an important choice cannot be dismissed by clicking the background or pressing `Esc`.

Because the site now uses an analytics service, I updated both the Korean and English privacy policies at the same time. They explain what is measured, that declining does not affect the site, and where a visitor can change the choice. They also continue to state that Google AdSense advertising is not currently in use.

## Connecting search traffic through Search Console

GA4 shows what happens on the site.

Search Console shows how the site is discovered in Google Search.

I registered `babypaunch.com` as a domain property so that it covers the whole domain rather than one URL prefix. I did not grant Google access to the Cloudflare account for automatic verification. Instead, I added one Google verification TXT record directly to Cloudflare DNS.

After ownership was verified, I submitted `https://babypaunch.com/sitemap.xml`.

It briefly reported that it could not be fetched.

I checked that the public URL returned HTTP `200` and that the XML was valid, then checked again.

The status changed to <strong>Success</strong>, with 27 discovered pages.

Finally, I linked the Search Console domain property to the BabyPaunch GA4 web stream. Once enough data accumulates, I will be able to compare search queries, impressions and clicks, the first post a visitor reaches, and what they do on the site.

## Preparing SNS links to identify their source

The rule of using the same message on Instagram, Threads, Facebook, and X has not changed. I saw no reason to force four different messages when they all introduce the same post.

The link, however, will receive platform-specific UTM values.

```text
utm_source=instagram | threads | facebook | x
utm_medium=social
utm_campaign=<post slug>
utm_content=<publish run ID>
```

The visible message and destination post remain the same, but `utm_source` reveals which social platform brought the visit. When I promote the same post more than once, `utm_content` separates each publishing run.

I added this rule to the design document for the SNS publishing Chrome extension. The extension itself has not been implemented yet, so I am not presenting automatic UTM generation as a released feature.

## A measurement foundation made with free tools

There is no paid analytics service in this setup. It uses the free tiers of GitHub Pages, GA4, Search Console, and Cloudflare DNS.

Before deployment, I built the site with Jekyll `3.8` and passed quality checks for 25 pages. I tested blocking before consent, loading after consent, declining, reopening settings, and all four responsive boundary widths in a real browser.

The connections are new, so there is not enough data yet to claim that one post is the best. But I no longer have to rely only on intuition. As search and social traffic accumulate, I can choose future subjects based on what people actually read.

If I add Google AdSense later, the consent flow can grow from this foundation. I will add separate choices for advertising storage and personalised advertising, and update the privacy policies before enabling the ads.

<hr>

### <code>August 28, 2026</code> update: Where should I check the results later?

There is no need to move between many screens. For routine checks, GA4 and Search Console are enough. Only data from visitors who consent to analytics is included.

#### Use GA4 to see where visitors came from and what they read

Open <strong>Reports → Acquisition → Traffic acquisition</strong>, then change the table dimension to <strong>Session source / medium</strong>. This covers Instagram, Threads, Facebook, and X as well as Google Search, other search engines, referring websites, and direct visits.

Only three questions matter here.

- Where did the visit come from?
- Which post did the visitor reach?
- Which source produced stronger engaged sessions and average engagement time?

To inspect one post, add <strong>Page path and screen class</strong> as a secondary dimension or filter by its path.

Immediately after sharing a post, use <strong>Reports → Realtime</strong> only to confirm that collection works.

Use the Traffic acquisition report for longer-term decisions.

The [GA4 Traffic acquisition report guide](https://support.google.com/analytics/answer/12923437?co=GENIE.Platform%3DDesktop&hl=en) explains the menu and dimensions.

#### Use Search Console to see what people searched for

Open <strong>Performance → Search results</strong>, then use the <strong>Queries</strong> and <strong>Pages</strong> tabs.

- Impressions: how often a page appeared in Google Search
- Clicks: how often someone visited from a search result
- CTR: clicks divided by impressions
- Average position: the page's approximate position in search results

A post with many impressions but a low CTR is a candidate for a clearer title and description.

Selecting a query and then opening the Pages tab also shows which post that search led to.

The [Search Console performance report guide](https://support.google.com/webmasters/answer/10268906?hl=en) explains the report in detail.

I kept the review schedule simple.

- Immediately after SNS publishing: confirm collection in GA4 Realtime
- Once a week: review social visits and popular posts in GA4 Traffic acquisition
- Once a month: review queries, pages, and CTR in Search Console
- When an error notification appears: check page indexing and the sitemap in Search Console

<section class="article-ai-prompt" data-no-translation markdown="1">
## #AI프롬프트제공

Give the following prompt to an AI to configure and verify consent-based GA4, Search Console, and platform-specific UTM tracking on GitHub Pages using only free services.

Do not enter passwords, API keys, tokens, credential files, or visitors' personal information in the prompt.

```text
You are an analytics engineer auditing a privacy-first web analytics setup for GitHub Pages and Jekyll.

Using only free services, inspect my repository and public site, then check the following items and provide the smallest necessary implementation.

- Whether GA4 scripts and cookies stay unloaded before analytics consent
- An accessible UI for consent, refusal, and changing the choice later
- Korean and English notices and privacy policies matching actual collection
- GA4 page views, scrolling, and outbound link clicks collected after consent
- Search Console domain ownership, sitemap submission, and page discovery
- The connection between the GA4 and Search Console properties
- Distinct `utm_source` rules for Instagram, Threads, Facebook, and X
- Consistent naming for `utm_medium`, `utm_campaign`, and `utm_content`
- How to confirm collection immediately after deployment in GA4 Realtime
- How to compare traffic sources and landing posts in Traffic acquisition

Classify every item as `OK`, `Needs improvement`, or `Cannot verify`.

When proposing code, apply it once in the shared Jekyll layout and do not use native browser alert or confirm dialogs.

After making changes, verify pre-consent network requests, post-consent realtime collection, the mobile UI, public privacy policies, and the sitemap.

Site URL: [site URL]
GitHub repository: [repository path or URL]
GA4 measurement ID: [measurement ID]
Search Console property: [domain property]
Social campaign name: [utm_campaign value]
Supported languages: [for example, Korean and English]
```
</section>

<p class="article-summary"><strong>In one line:</strong> I went beyond publishing more posts and built a way to see which stories and traffic sources help while observing visitors' choices.</p>
