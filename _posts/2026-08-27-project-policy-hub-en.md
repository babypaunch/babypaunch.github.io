---
layout: post
locale: en
page_key: blog
title: I decided to keep every project's policies in one place
description: I connected a newly purchased domain to my GitHub Pages site and organized policies by project for the things I will build next.
category: Making
date: 2026-08-27 00:00:00 +0900
permalink: /en/blog/project-policy-hub/
language_url: /blog/project-policy-hub/
alternate_ko: /blog/project-policy-hub/
alternate_en: /en/blog/project-policy-hub/
tags:
  - project-policies
  - github-pages
  - custom-domain
---

I plan to keep making new projects.

As each project appears, so do the documents that need to be public.

```text
Privacy Policy, Terms of Service, Account Deletion Instructions, Data Deletion Instructions, Accessibility Statement
```

A Chrome extension and a web service may also need different information.

I could build a separate policy site for every project, but I did not want to maintain the same contact and operator information in several places.

That led me to one question.

<p class="article-question">What if I managed every project's policies in one place?</p>

## Using my website as a policy hub

I had just started managing `babypaunch.github.io` as my blog and project website. Adding a policy section there meant I would not need to create another site each time I made something new. (Best of all, it is free. How good is that?!)

This does not mean applying one policy to every project. The website is a shared entrance, while each project's documents remain separate.

A small project without accounts or payments may need only a privacy policy. A project with sign-in, server storage, or subscriptions may also need terms and data deletion instructions. Each project can include only the documents that match what it actually does.

Keeping them together makes their location and revision history easier to find. It does not remove the responsibility to update a policy when a feature changes. Because several projects share the same website, I also need to keep its domain and deployment healthy.

## Connecting a domain I own

The default GitHub Pages address was already enough to publish policies. But I wanted a stable address that I could repeatedly submit to places such as the Chrome Web Store and Google OAuth.

I bought `babypaunch.com` and connected it to GitHub Pages. Cloudflare felt inexpensive for the domain purchase. The domain can remain the same even if I change hosting later, and every project can use one official address.

Using the root domain and `www` address correctly with GitHub Pages required four A records and one CNAME in Cloudflare DNS.

The four A records connect `babypaunch.com` to the GitHub Pages servers. The CNAME connects `www.babypaunch.com` to the default GitHub Pages address. I left every record in DNS-only mode without the Cloudflare proxy.

HTTP started working first. HTTPS needed time for DNS propagation and certificate issuance, so I had to wait before I could verify it.

## Showing projects before document types

The first Policies page placed accessibility and privacy links in one list. That worked with only a few documents, but it would become unclear which policy belonged to which project as the list grew.

I reorganized the page into project cards.

```text
BabyPaunch Website
├─ Privacy Policy
└─ Accessibility

Laftel Mania
└─ Privacy Policy
```

The URLs now follow one rule.

```text
/policies/project/document/
/en/policies/project/document/
```

When a new project appears, I can add its information and the policies it needs. Korean and English pages use the same structure.

The main advantage is that the system can grow without turning into one long mixed list. If a project needs another document, it goes under that project. Visitors can choose a project first and see only the relevant policies.

There is a tradeoff. Because every policy lives under one domain, a missed renewal or deployment problem could affect several projects at once. Central management is convenient, but it also makes maintaining this website more important. (It is free, so I plan to use it for the rest of my life.)

For now, the hub contains the BabyPaunch website and Laftel Mania. Whenever I make a new project, I will add the policies it needs in the same place.

<p class="article-summary"><strong>In one line:</strong> Instead of waiting for my projects to pile up, I made my GitHub Pages site the shared policy hub for all of them.</p>
