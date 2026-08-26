---
layout: post
locale: en
page_key: blog
title: I decided to keep every project's policies in one place
description: I connected babypaunch.com and organized policies by project for the things I will build next.
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

As each project appears, so do public documents such as privacy policies, terms, and account deletion instructions. A Chrome extension and a web service may also need different information.

I could build a separate policy site for every project, but I did not want to maintain the same contact and operator information in several places.

That led me to one question.

<p class="article-question">Could I manage the policies for everything I build in one place?</p>

## Using my website as a policy hub

I had just started managing `babypaunch.github.io` as my blog and project website. Adding a policy section there meant I would not need to create another site each time I made something new.

This does not mean applying one policy to every project. The website is a shared entrance, while each project's documents remain separate.

A small extension without accounts or payments may need only a privacy policy. A project with sign-in, server storage, or subscriptions may also need terms and data deletion instructions. Each project can include only the documents that match what it actually does.

Keeping them together makes their location and revision history easier to find. It does not remove the responsibility to update a policy when a feature changes. Because several projects share the same website, I also need to keep its domain and deployment healthy.

## Connecting a domain I own

The default GitHub Pages address was already enough to publish policies. But I wanted a stable address that I could repeatedly submit to places such as the Chrome Web Store and Google OAuth.

I bought `babypaunch.com` and connected it to GitHub Pages. The domain can remain the same even if I change hosting later, and every project can use one official address.

The Cloudflare DNS setup added four A records and one CNAME for `www`. At first, the similar-looking records made me wonder whether something had been entered several times by mistake. The four A records were the official GitHub Pages addresses, while the fifth record connected `www.babypaunch.com` as an alias.

HTTP started working first, while HTTPS had to wait for GitHub to issue a certificate. I learned that connecting a domain is not complete the moment the values are saved. DNS propagation and certificate issuance need time.

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

There is a tradeoff. Because every policy lives under one domain, a missed renewal or deployment problem could affect several projects at once. Central management is convenient, but it also makes maintaining this website more important.

For now, the hub contains the BabyPaunch website and Laftel Mania. When AI-Karaoke and future projects become public, their policies will join them in the same place.

<p class="article-summary"><strong>In one line:</strong> Instead of waiting for my projects to pile up, I made <code>babypaunch.com</code> the shared policy hub for everything I build next.</p>
