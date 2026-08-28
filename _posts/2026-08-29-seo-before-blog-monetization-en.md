---
layout: post
locale: en
page_key: blog
title: Want to make money from your blog? Get SEO right first
description: How I audited and improved the missing SEO foundations on my GitHub Pages site before trying to monetize a blog without paid ads or constant promotion.
category: Making
date: 2026-08-29 07:35:00 +0900
last_modified_at: 2026-08-29 07:44:00 +0900
permalink: /en/blog/seo-before-blog-monetization/
language_url: /blog/seo-before-blog-monetization/
alternate_ko: /blog/seo-before-blog-monetization/
alternate_en: /en/blog/seo-before-blog-monetization/
tags:
  - seo
  - github-pages
  - blog-monetization
  - search-console
---

After connecting a custom domain to GitHub Pages and publishing blog posts, I could also use GA4 and Search Console to see where visitors came from.

Once I had enough posts, I started thinking about placing an ad at the end of each article.

Before deciding where an ad should go, however, I needed a foundation that would help people discover my writing.

Adding ads would not generate revenue if hardly anyone arrived through search.

SEO matters even more when I do not plan to pay for ads or promote every post myself.

If I am not paying to bring people in, I need to give search engines accurate information so they can connect the right reader with the right article.

Then I felt as though I had missed something.

I checked whether I had reviewed and finished the SEO setup, and I had not.

Connecting the tools does not finish SEO automatically.

This time, I checked what my GitHub Pages site already had and what was still missing.

## If I want to make money from a blog, should SEO come before ads?

SEO is not a trick for forcing higher rankings.

SEO stands for `Search Engine Optimization`.

Search Console shows how my site appears in Google Search, while SEO is the work of helping search engines discover, understand, and show the site in relevant results.

The name can make it sound like a special technique for pushing rankings higher, but the foundation is much simpler.

A search engine needs to find the site, decide whether it may read the page, and understand the canonical address, title, description, language, and publication date.

A person looking at the result also needs enough information to decide whether the article is useful.

Search engines generally discover a page, fetch its content, store what they understand in an index, and then show relevant results for a query.

SEO reduces confusion and omissions in that process, and it cannot turn a poor article into a good one with a few meta tags.

On the other hand, a worthwhile article can still struggle to reach readers if its title is vague or a search crawler cannot find it.

## Why my site needed SEO

My site has both Korean and English pages, while the home, blog, music, policy, and contact pages all serve different purposes.

As the number of posts grows, I cannot leave search engines to guess the following details.

- Whether the Korean and English posts are translations of each other
- Which form of an address is the canonical version
- Which pages should appear in search and which documents should stay out
- When a post was first published and when it was actually updated
- Which title, description, and image should appear in search results and social previews

SEO is not only about increasing visitor numbers, because it also ensures that only intended content is public, Korean readers see Korean pages, and search results do not misrepresent the content.

For monetization, I also need to know which query led to which article and whether people read it before I can decide what content to improve ahead of adding ads.

Search traffic for a blog without paid ads or constant promotion is not a lucky visit that I simply wait for, but a visit earned by steadily publishing content that search engines can understand.

## The foundations that were already in place

The technical SEO on my site was not empty before this audit, because most of the foundation was already there.

<div class="data-cards">
  <section class="data-card">
    <h3>HTTPS and the canonical address</h3>
    <p>The site uses <code>https://babypaunch.com</code>, and visits to <code>www.babypaunch.com</code> permanently redirect to the canonical <code>babypaunch.com</code> domain.</p>
    <p>Every page has a <code>canonical</code> link that identifies its preferred address when tracking parameters or equivalent URLs appear.</p>
  </section>
  <section class="data-card">
    <h3>robots.txt and sitemap.xml</h3>
    <p><code>robots.txt</code> contains the crawler access rules and sitemap address, while <code>sitemap.xml</code> lists the pages and posts that search engines should inspect.</p>
    <p>I had also submitted this sitemap to Search Console.</p>
  </section>
  <section class="data-card">
    <h3>Page descriptions and indexing</h3>
    <p>Every page has a title and <code>meta description</code>, with <code>index,follow</code> for normal pages and <code>noindex,follow</code> for the 404 page that handles missing addresses.</p>
  </section>
  <section class="data-card">
    <h3>Connecting Korean and English</h3>
    <p>The Korean and English pages point to one another with <code>hreflang</code>, using <code>ko</code>, <code>en</code>, and the default <code>x-default</code> value to identify them as localized versions of the same content.</p>
  </section>
  <section class="data-card">
    <h3>Structured data</h3>
    <p>The home page provides <code>WebSite</code>, normal pages provide <code>WebPage</code>, and blog posts provide <code>BlogPosting</code> structured data with the title, description, language, publication date, author, and canonical address.</p>
    <p>Structured data explicitly describes a page's role so a search engine does not have to infer its meaning from the visual layout alone.</p>
  </section>
  <section class="data-card">
    <h3>Understandable HTML structure</h3>
    <p>Every page declares its document language, uses one <code>h1</code>, and follows an ordered heading hierarchy in the body.</p>
    <p>Images have alternative text and dimensions, while internal links point to addresses that actually exist.</p>
    <p>These accessibility basics also help search engines understand the document structure.</p>
  </section>
</div>

At first, robots.txt, the sitemap, canonical links, and structured data made the setup look complete, but checking the live site exposed several gaps.

What mattered was not whether a configuration file existed, but whether the public result matched the intent.

## Documents that did not belong in the sitemap

The sitemap was the first issue I needed to fix.

Alongside normal pages, the public sitemap contained the following addresses.

- `AGENTS.html`, which described working rules
- `SNAPSHOT.html`, which recorded project status
- `THIRD_PARTY_NOTICES.html`, which contained third-party notices
- A CSS address that was not a user-facing page

The first three documents returned HTTP `200`, carried indexing instructions, and even had self-referencing canonical links.

Documents needed to build the site had been mixed with pages that visitors might search for and read.

Jekyll can turn Markdown files into pages, and because the GitHub Pages build environment can differ slightly from a local build, files that do not appear locally may still reach the public output.

I added the internal documents to the exclusion list in `_config.yml` and filtered non-page addresses such as CSS from the sitemap.

After deployment, the sitemap went from 30 addresses to 26 user-facing addresses, and I verified that the three internal document URLs returned `404`.

## Localizing Korean page titles

The Korean page descriptions were in Korean, but some titles still matched the English versions, such as `Blog — BabyPaunch`, `Music — BabyPaunch`, and `Policies — BabyPaunch`.

Even when localized pages are connected with `hreflang`, the title shown in a search result should be immediately clear to the reader using that language.

I changed the Korean titles to clearly describe their roles as `블로그`, `음악`, `정책`, and `문의`, while the Korean home heading became `작지만, 꼼꼼하게 만듭니다`.

The existing English wording stayed unchanged.

## Preparing an image for shared links

Search SEO and social previews are not the same thing, but they meet in the real traffic journey when someone shares an article they found through search on social media or in a messenger.

Previously, only 4 of the 27 pages had a representative image and therefore output an `og:image` and Twitter image.

I created a shared 1200×630 image using the existing BabyPaunch logo and its cream, orange, and dark green colors.

A post uses its own representative image when it has one and falls back to the shared image when it does not.

Every page now provides a title, description, and sharing image together.

I also removed a template mistake that printed `twitter:card` twice on pages with a representative image.

## Separating publication and modification dates

The existing blog structured data only had `datePublished`, but I had started adding dated updates to already published posts.

Replacing the original publication date with an update date would not describe the article's history accurately.

I kept the original `date` and added `last_modified_at` only to posts whose content had actually changed.

The structured data now outputs `dateModified` and `article:modified_time`, while the sitemap's `lastmod` prefers the real modification date.

A modification date is not a value to change just to make a post look new, so it should record the real date only when the article changes meaningfully.

## Turning visual checks into automated checks

SEO settings can break again when a later post or template changes.

I added the following checks to the site's quality test.

- Every page title is unique
- `og:image` and the Twitter image each use one absolute URL
- The sharing image has alternative text
- `twitter:card` is not duplicated
- Blog structured data contains publication date, modification date, and image
- The sitemap excludes internal documents and CSS
- The shared image is a real 1200×630 PNG

I did not stop after the local Jekyll build passed, because I also checked the public home page, blog post, sitemap, and excluded document URLs after GitHub Pages finished deploying.

## Details people often miss when working on SEO

<div class="data-cards">
<section class="data-card" markdown="1">
### Having a sitemap is not enough

A sitemap can return HTTP `200` and still contain incorrect addresses.

The actual URL list needs to be checked for deleted pages, internal documents, duplicates, and files that do not belong in search.

</section>
<section class="data-card" markdown="1">
### robots.txt and noindex serve different purposes

robots.txt controls whether a search crawler may fetch a path.

`noindex` tells the search engine not to place that page in search results.

Blocking a page in robots.txt while expecting the crawler to read the page's `noindex` instruction may not work as intended.

</section>
<section class="data-card" markdown="1">
### A canonical link should not always point home

If every article points its canonical link to the home page, it effectively tells the search engine that every article is a duplicate of the home page.

An independent page normally uses its own canonical URL.

A different representative address should be chosen carefully only when genuine duplicate pages exist.

</section>
<section class="data-card" markdown="1">
### A language button does not create hreflang

A Korean and English switch on the screen does not guarantee that a search engine will understand the relationship between the two pages.

Both localized pages should point to each other, the addresses should exist, and their canonical links and language codes should be correct.

</section>
<section class="data-card" markdown="1">
### Titles and descriptions need localization

Translating the body while leaving the title and description unchanged can produce an awkward search result.

Every page title should be unique and briefly describe the actual content.

A description should tell readers what they will find before clicking instead of repeating phrases in an attempt to improve rankings.

Google may still show different wording based on the query and page content instead of the title or description I supplied.

</section>
<section class="data-card" markdown="1">
### Structured data does not guarantee search exposure

Adding valid `BlogPosting` data does not guarantee a special search result.

Structured data should match visible content and must not exaggerate information that the page does not show.

</section>
<section class="data-card" markdown="1">
### A modification date is not a deployment date

Changing a stylesheet or shared template does not make today the modification date of every article.

Changing only the date to make an article look new in search results should also be avoided.

</section>
<section class="data-card" markdown="1">
### Sharing images do not directly change rankings

Adding an Open Graph image does not immediately raise a Google ranking.

A consistent image can still help people recognize an article and decide whether to click when a link is shared instead of showing only a title.

</section>
<section class="data-card" markdown="1">
### Search Console numbers do not change immediately

Even with a valid sitemap after deployment, Google may need time to fetch it again and update the index.

An unchanged number immediately after deployment does not prove that the setup failed.

Submitting a site to Search Console also does not guarantee that every page will be indexed.

</section>
<section class="data-card" markdown="1">
### GA4 consent and search indexing are separate

My site does not load GA4 before a visitor gives consent.

That choice controls visitor analytics collection.

It is separate from a search crawler reading and indexing public HTML, so a low analytics consent rate does not block search exposure.

</section>
<section class="data-card" markdown="1">
### Answering a question matters more than repeating a keyword

Forcing the same search phrase into the title and body repeatedly is uncomfortable for readers too.

An article lasts longer when it clearly answers one question and presents real experience and verified facts in an understandable structure.

</section>
</div>

## How I plan to keep working on SEO

After the technical foundation is ready, improving actual articles matters more than adding more settings.

<div class="data-cards">
<section class="data-card" markdown="1">
### Add unique representative images gradually

The shared image prevents an empty preview.

Because every article covers a different subject, however, important posts will benefit from a unique image that reflects their content.

Instead of rushing to fill every article, I plan to start with the posts I actually share on social media.

</section>
<section class="data-card" markdown="1">
### Connect related articles naturally

When a new article needs background from an older one, I can link to it inside the explanatory sentence.

The link text should describe its destination instead of saying only `click here`.

Internal links help readers find the next useful article and tell search engines how posts relate to one another.

</section>
<section class="data-card" markdown="1">
### Compare impressions and clicks in Search Console

An article that never appears in search needs a different improvement from one that appears but receives no clicks.

When impressions are low, I can inspect the topic's relationship to queries, indexing status, and internal links.

When impressions are high but CTR is low, I can check whether the title and description reflect the search intent.

Instead of watching one ranking number, I plan to compare queries, pages, impressions, clicks, and CTR together.

</section>
<section class="data-card" markdown="1">
### Check real speed and usability

The goal is not a fast site only for search engines, but a site that does not make people wait.

I need to check image sizes, layout shifts, mobile reading, and click responses on real screens.

Before adding another library, it also suits my site to ask whether static HTML and small assets can solve the problem as they do now.

</section>
<section class="data-card" markdown="1">
### Add more structure only when there is enough content

With the current number of posts, the blog list, tags, and related links are enough.

When the archive becomes difficult to navigate, I can consider category hubs, Breadcrumb structured data, or an author page.

Adding SEO features before they are needed only creates more settings to maintain and more places for errors.

</section>
</div>

## What remains after the SEO work is still the writing

This work removed management documents that should not have been public and made the roles of the Korean and English pages clearer.

Shared links now include an image, while updates to existing articles can distinguish the original publication date from the real modification date.

These settings do not bring visitors automatically.

Writing verified answers to questions people actually have still comes first, while SEO clears the path so those articles can reach readers without confusing a search engine.

Wanting to make money from a blog may begin with adding ad code, but the real preparation begins with writing something worth finding and making sure a search engine can deliver it accurately.

<p class="article-summary"><strong>In one line:</strong> SEO is not a trick for forcing higher rankings, but the work of helping search engines accurately understand the addresses, languages, titles, descriptions, and history of the articles I choose to publish.</p>

## Sources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google guide to canonical URLs and duplicate consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google guide to localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google guide to building and submitting a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google guide to Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google guide to title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google guide to snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
