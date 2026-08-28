---
layout: post
locale: en
page_key: blog
title: I decided to measure which posts actually bring people in
description: I connected consent-based GA4 and Search Console to BabyPaunch and built a free foundation for understanding posts and traffic sources.
category: Making
date: 2026-08-28 00:00:00 +0900
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

If I was going to keep writing, I wanted more than a page-view total. I wanted to understand which subjects and traffic sources genuinely brought people in.

So I began with one question.

<p class="article-question">Can I check which posts work instead of guessing?</p>

## Measuring posts and traffic sources with GA4

I created a `BabyPaunch Website` property in Google Analytics 4 and a web stream for `https://babypaunch.com`. I connected the public measurement ID to the site.

I also enabled enhanced measurement. It now records page views, scrolling that indicates how far someone read, and clicks that lead to another website.

GitHub Pages is a static site without an application server of its own. That is still enough. Adding the analytics integration once to the shared Jekyll layout applies the same rules to the home, blog, music, and policy pages.

After deployment, I can open a real blog post and check the GA4 realtime report.

## Not loading analytics before consent

Needing analytics did not mean it should run before a visitor had a choice.

On the first visit, an analytics consent modal appears in Korean or English. The Google Analytics script itself is not loaded until the visitor selects <strong>Allow analytics</strong>. Declining does not remove or limit any site feature.

The choice is stored in the browser's local storage. It can be changed later through <strong>Analytics settings</strong> at the bottom of every page. A short confirmation appears after accepting or declining and disappears automatically after two seconds.

The modal is centred with a dimmed background. Keyboard focus stays inside it, and an important choice cannot be dismissed by clicking the background or pressing `Esc`.

Because the site now uses an analytics service, I updated both the Korean and English privacy policies at the same time. They explain what is measured, that declining does not affect the site, and where a visitor can change the choice. They also continue to state that Google AdSense advertising is not currently in use.

## Connecting search traffic through Search Console

GA4 shows what happens on the site. Search Console shows how the site is discovered in Google Search.

I registered `babypaunch.com` as a domain property so that it covers the whole domain rather than one URL prefix. I did not grant Google access to the Cloudflare account for automatic verification. Instead, I added one Google verification TXT record directly to Cloudflare DNS.

After ownership was verified, I submitted `https://babypaunch.com/sitemap.xml`. It briefly reported that it could not be fetched. I checked that the public URL returned HTTP `200` and that the XML was valid, then checked again. The status changed to <strong>Success</strong>, with 27 discovered pages.

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

<p class="article-summary"><strong>In one line:</strong> I went beyond publishing more posts and built a way to see which stories and traffic sources help while observing visitors' choices.</p>
