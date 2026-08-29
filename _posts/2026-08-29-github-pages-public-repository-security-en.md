---
layout: post
locale: en
page_key: blog
title: Is it safe if search cannot see it? Auditing a public GitHub Pages site
description: How an SEO review led me to audit internal files, Git history, third-party requests, Cloudflare HSTS, and GitHub account security for a public GitHub Pages site.
category: Making
date: 2026-08-29 14:30:00 +0900
last_modified_at: 2026-08-29 14:50:00 +0900
permalink: /en/blog/github-pages-public-repository-security/
language_url: /blog/github-pages-public-repository-security/
alternate_ko: /blog/github-pages-public-repository-security/
alternate_en: /en/blog/github-pages-public-repository-security/
tags:
  - github-pages
  - seo
  - custom-domain
  - project-policies
  - ai-prompt
---

While reviewing SEO and checking which pages appeared in search results, one concern caught my attention.

Even files that never appeared on my site could be read by anyone if they were in a public GitHub repository.

Development instructions, work status, and research notes that visitors did not need to see were also inside the repository.

At first, I mistakenly thought adding them to `.gitignore` would solve the problem.

Properly separating the public boundary required checking `.gitignore`, Git tracking, and previous commits individually.

After organizing the internal files, I also reviewed the external services connected to each page and the HTTPS settings.

What started as a search visibility review eventually extended to the repository, privacy policy, transport security, and GitHub account security.

## I first separated two different public paths

A GitHub Pages project has two different public paths.

The first is the GitHub Pages website that visitors see.

The second is the public GitHub repository containing the website source.

A file excluded from the Jekyll build may not open through the website URL.

If that file was committed to Git, however, it can still be read through the GitHub repository or a `raw.githubusercontent.com` URL.

Being absent from search results and being inaccessible from outside are also different things.

`robots.txt`, sitemap exclusions, and `noindex` are requests for search engines, not security controls that make files private.

If someone who knows the address can open a file, it should be treated as public even when it does not appear in search results.

## What `.gitignore` actually solves

`.gitignore` prevents files that Git does not yet track from being added to a new commit.

A file that has already been committed remains tracked even if its name is later added to `.gitignore`.

Adding only the following rules therefore does not remove files that are already public.

```gitignore
# Local AI and internal working files
.local-ai/
.agents/
.codex/
AGENTS.private.md
_research/
```

Removing an already tracked file from the current branch requires `git rm --cached`.

```powershell
git rm --cached -- AGENTS.private.md
git rm -r --cached -- _research
```

The `--cached` option keeps the local file while removing it only from Git tracking.

The same path must then remain in `.gitignore` to prevent it from being added again in a later commit.

## Jekyll `exclude` was also necessary

`.gitignore` is a setting for Git.

Using `exclude` in `_config.yml` makes it explicit which files Jekyll should omit when it builds the local working directory.

```yaml
exclude:
  - AGENTS.private.md
  - _research
  - .agents
  - .codex
```

Files that were never committed are not sent to the GitHub Pages server.

Keeping both Git exclusions and Jekyll exclusions is safer when local builds and other deployment environments are also considered.

For this work, I kept the internal files available locally while excluding them from both Git and Jekyll.

## I first classified what should become private

Searching only for filenames containing `AI` can miss other internal material.

I therefore checked both the currently tracked files and every path that had appeared in previous commits.

```powershell
git ls-files
git log --all --name-only --pretty=format:
```

I also inspected hidden folders and root-level documents in the current working tree.

```powershell
Get-ChildItem -Force
git status --short --branch
```

The classification rule was whether a file was needed to run, deploy, test, or satisfy the licensing requirements of the web service.

Development instructions, design-tool settings, and research notes created while preparing posts were classified as internal working material.

Documentation explaining repository use, automated tests, and third-party license notices remained public because they were needed to maintain the web service.

Judging the purpose of each file mattered more than hiding as many files as possible.

Mistaking an open-source license notice for an internal file could create a different problem because that notice may need to remain public.

## I scanned separately for sensitive information

Internal documents and secrets are not the same thing.

A private work note may contain no password.

A normal-looking configuration file may still contain an API key or token.

I separately searched all tracked files for patterns like these.

```powershell
rg -n -i --hidden --glob '!.git/**' `
  '(api[_-]?key|client[_-]?secret|private[_-]?key|access[_-]?token|password\s*[:=]|bearer\s+[a-z0-9._-]+|-----BEGIN [A-Z ]*PRIVATE KEY-----)' `
  $(git ls-files)
```

No sensitive value matching a key or token pattern was found in the target files.

If an actual password, API key, token, or private key had been found, removing it from Git history would not have been enough.

The exposed value would need to be revoked and replaced because someone outside could already have copied it.

## I removed the files from the current branch first

I added the paths classified as private to `.gitignore`.

I then used `git rm --cached` to remove them from tracking on the current `main` branch.

```powershell
git rm --cached -- [internal document path]
git rm -r --cached -- [internal directory path]
```

Immediately afterward, I checked that the local files still existed.

```powershell
Test-Path -LiteralPath [internal document path]
git check-ignore -v [internal document path]
```

`Test-Path` confirmed that the local file had been preserved.

`git check-ignore` showed which `.gitignore` rule applied to the file.

After pushing the change as a normal commit, I also confirmed that the raw file URL on the current GitHub `main` branch returned `404`.

At this point, the internal files were no longer visible to someone casually browsing the repository.

Someone who knew the fixed SHA of an earlier commit could still open the old file.

## Why did the files still open in old commits?

Git does not store only the current version of a file.

Creating a new commit that deletes a file leaves the old file intact inside previous commits.

`.gitignore` and `git rm --cached` change future tracking but do not alter commits that already exist.

Removing a path from old history requires rebuilding every related commit as if that path had never existed.

This process is called rewriting Git history.

## I created a recovery copy before rewriting history

Rewriting history is a destructive operation that changes every commit ID.

I needed a way back if the wrong path was removed or a required file disappeared.

I created a complete Git bundle in a local backup directory outside the repository.

```powershell
git bundle create [backup file outside repository] --all
git bundle verify [backup file outside repository]
```

The backup file was not placed in the public repository.

The result of `git bundle verify` confirmed that the branches and complete history were included correctly.

## I removed the internal paths from every commit

`git filter-repo` was not installed in the current environment.

Rather than adding another tool, I used Git's included `filter-branch` command to remove the target paths from every commit.

```powershell
$env:FILTER_BRANCH_SQUELCH_WARNING = '1'

git filter-branch --force `
  --index-filter "git rm -r --cached --ignore-unmatch [internal paths]" `
  --prune-empty `
  -- main
```

`--index-filter` removes the target path from the Git index without checking out the working tree for each commit.

`--ignore-unmatch` keeps the operation running when a particular commit does not contain the target file.

`--prune-empty` removes commits that contain no remaining change after the internal files are deleted.

Afterward, I checked again that the internal paths never appeared in the rewritten `main` history.

```powershell
git log main --format='%H' -- [internal paths]
git rev-list main --objects
```

The first command checks whether any commits still relate to the target paths.

The second command lists every Git object and path reachable from the new `main` branch.

Neither check found an internal path.

## The force push included a safety check

A normal `git push` cannot update a remote branch after its history has been rewritten.

The existing remote history must be replaced with the new history, so a force push is required.

Instead of an unconditional `--force`, I used `--force-with-lease` so the push would proceed only if remote `main` still matched the commit checked before the work began.

```powershell
git push --force-with-lease=main:[previously verified remote commit] origin main
```

This method rejects the push if someone else updates remote `main` during the work.

All commit IDs change after a history rewrite, so another contributor cannot simply push from an existing clone.

On a shared repository, the rewrite should be scheduled in advance and contributors should be told to receive the new history or clone the repository again afterward.

After the force push succeeded, I confirmed that remote `main` and local `main` pointed to the same new commit.

```powershell
git ls-remote origin refs/heads/main
git status --short --branch
```

I also removed the original references and reflog entries created locally during the history rewrite.

The Git bundle stored outside the repository remained available if recovery became necessary.

## I also checked that the site still worked

Hiding the files would not finish the work if it broke the GitHub Pages site.

I rebuilt the site in a Jekyll `3.8` environment.

```powershell
docker run --rm `
  -v "${PWD}:/srv/jekyll" `
  -w /srv/jekyll `
  jekyll/jekyll:3.8 `
  jekyll build
```

I reran the blog tag, Korean-English sentence mapping, and full-site quality checks.

```powershell
node _tests/blog-tags.test.js
node _tests/article-translation.test.js
node _tests/site-quality.test.js
```

All checks passed, and the public homepage and blog responded normally.

Both the website URL and the current GitHub `main` raw URL for each internal file returned `404`.

## A limitation remained after rewriting history

Disconnecting old commits from remote `main` does not make GitHub physically delete every previous object immediately.

A URL containing the exact SHA of an old commit may continue responding for some time.

A copy that someone already cloned or downloaded also cannot be recalled.

A sensitive-data incident that requires GitHub caches and unreachable objects to be removed early may also require GitHub Support's official removal process.

The safest approach is therefore to keep secrets out of public Git from the beginning.

Cleaning history afterward reduces exposure, but it cannot magically make information that was already public secret again.

## After hiding the internal files, I noticed external connections

Hiding internal files did not complete the website security and privacy review.

After defining the repository boundary, I checked which external services received a request when a page opened.

My site loaded its web font from Google Fonts.

This avoided storing font files in the repository and allowed browser caching, but Google could process an IP address, device and browser information, and request records while the page loaded.

YouTube and Spotify embeds could also load before a visitor pressed the play button.

I updated the Korean and English privacy policies to describe the external processing that may occur when Google Fonts and YouTube or Spotify embeds load.

I did not remove those external services.

I kept the features the site needed while describing what could happen when a page opened according to its actual behavior.

## I applied HSTS through Cloudflare in order

Having HTTPS and having HSTS configured are also different things.

HTTPS provides an encrypted connection, while HSTS is a separate response header that tells a browser to remember to use HTTPS from the beginning.

Jekyll files on GitHub Pages could not set this response header directly.

I applied it through Cloudflare, which manages the domain, in the following order.

### 1. I routed web traffic through Cloudflare

At first, the four A records for the apex domain and the `www` CNAME were all set to `DNS only`.

In that state, visitors bypass Cloudflare, so enabling HSTS in Cloudflare would not add the header to the public site's response.

I changed only the four apex A records and the `www` CNAME to `Proxied`.

The Google verification TXT record used by Search Console is not a web traffic record, so it remained `DNS only`.

### 2. I checked the certificate and origin connection first

After enabling the proxy, I confirmed that Cloudflare's SSL/TLS encryption mode was `Full`.

The Universal SSL certificate covering `*.babypaunch.com` and `babypaunch.com` was also `Active`.

HSTS can prevent browser access when HTTPS stops working, so it should never be enabled before checking the certificate.

### 3. I redirected HTTP requests to HTTPS

I enabled Cloudflare's `Always Use HTTPS` setting.

This setting redirects a request that arrives through `http://` to its `https://` address.

HSTS takes effect after a browser remembers the policy, so the first HTTP visit also needs a redirect to HTTPS.

### 4. I started HSTS with the recommended setting

I enabled HSTS and selected Cloudflare's recommended six-month maximum age.

The resulting response value is `max-age=15552000`.

I left `includeSubDomains` off.

That option requires every subdomain to support HTTPS, so it should be enabled only after confirming that even otherwise unused subdomains are ready.

I also left preload, which asks browser vendors to register the domain in their built-in HSTS lists, off.

Preload can take a long time to reverse, so I decided it did not need to be enabled from the beginning.

### 5. I verified the public responses, not just the dashboard

I did not stop after seeing `Status: On` in the settings screen.

I checked the HTTP and HTTPS responses for both the apex and `www` addresses.

```powershell
curl.exe -I http://babypaunch.com/
curl.exe -I https://babypaunch.com/
curl.exe -I http://www.babypaunch.com/
curl.exe -I https://www.babypaunch.com/
```

The HTTP addresses returned `301 Moved Permanently` to their HTTPS addresses.

The apex HTTPS address opened with `200 OK`.

The `www` HTTPS address redirected to the canonical apex domain.

Both HTTPS responses included the following HSTS header.

```http
Strict-Transport-Security: max-age=15552000
```

I also confirmed that the response server was Cloudflare and the DNS lookup now returned Cloudflare addresses.

Only after these checks could I say that the DNS proxy, HTTPS redirect, and HSTS header were reaching actual visitors together.

## I separated GitHub account security from site security

GitHub 2FA is not a feature provided to site visitors but a control that protects the GitHub account managing the repository.

It is mainly used when signing into GitHub in a new browser or confirming security settings, and it does not request a code for every ordinary `git push` while the stored Git authentication on the current computer remains valid.

Before removing a PAT or replacing it with a more narrowly scoped fine-grained PAT, I need to confirm whether existing automation still uses that token.

Repository file visibility, external page requests, transport security, and GitHub account security are separate layers that need separate checks.

## I will separate the public boundary from the beginning

Before creating a new internal document, I now decide where it should be stored.

AI instructions, research material, and work records that are not required for the public site belong in an ignored path or a local working directory outside the repository from the beginning.

An internal file that must remain at the repository root for a tool should be listed in both `.gitignore` and Jekyll `exclude`.

Before committing, I check `git status` and `git diff --cached`.

```powershell
git status --short
git diff --cached --name-only
```

Checking `git ls-files` periodically helps detect when an unintended internal file first becomes tracked.

Sensitive values are not protected by `.gitignore` alone and belong in a dedicated location outside the repository or in environment variables from the beginning.

## The public boundary had to be reviewed in several layers

SEO was not only about improving search titles and descriptions.

Checking what search engines and visitors could actually reach also made me reconsider the boundary of the public repository.

`.gitignore` is only a starting point and does not automatically hide files that were already public or remove them from previous history.

Safely managing internal files requires separate checks of Git tracking, the Jekyll build, the current branch, previous commits, and external caches.

External requests made when a page opens, HTTPS response headers, and the account that manages the repository remain separate security checks.

If I enable HSTS `includeSubDomains` or preload later, I must first confirm again that every subdomain supports HTTPS.

<section class="article-ai-prompt" data-no-translation markdown="1">

## #AI프롬프트제공

Use this prompt to audit unintended file exposure and transport security on a public web service.

Fill in only the site address, repository or project path, and deployment details needed for your environment.

Do not enter actual passwords, API keys, tokens, private keys, or personal information.

```text
You are a technical reviewer auditing the security and information exposure of a public web service.

Using actual files, build output, public responses, and official documentation as evidence, audit the publicly accessible boundary and transport security of the environment below.

Fill in only the fields needed for your environment:
- Public site URL: [site URL]
- Repository URL or project path: [URL or path]
- Build and deployment environment: [static site generator, hosting, proxy, CDN, and so on]
- Additional paths or subdomains to inspect: [optional]

Audit checklist:
1. Distinguish the public website from the public repository or deployment source.
2. Check whether internal documents, work records, configuration, or build artifacts not required for operation and deployment can be accessed externally.
3. Distinguish currently tracked files from paths remaining in previous history, and determine whether ignore rules alone can solve each case.
4. Scan for patterns that may indicate passwords, API keys, tokens, private keys, or personal information, but report only the file location and data type without printing the actual value.
5. Identify third-party requests for fonts, analytics, embeds, and other services when a page loads, and compare the actual behavior with the privacy notice.
6. Verify the HTTP-to-HTTPS redirect, certificate validity, canonical-domain redirect, and HSTS response header against the public URLs.
7. Evaluate whether the HSTS max-age, includeSubDomains, and preload settings are safe for the current domain configuration.
8. Provide verification steps to confirm that key pages, language switching, mobile layouts, and builds still work after changes.

Output format:
- Start with a summary classified as safe, needs review, or risky.
- For each finding, provide evidence, impact, recommended action, and a verification method.
- Separate changes that need immediate attention from optional future hardening.
- Suggest only commands that can run in the stated environment and explain the purpose of each command.

Safety rules:
- Never print or copy the original value of a password, API key, token, private key, or personal information into the report.
- Do not automatically delete files, rewrite Git history, force-push, revoke credentials, or change DNS, proxy, or HSTS settings.
- Before any destructive action or change that could affect site availability, explain its impact and recovery method and wait for user approval.
- Do not treat a dashboard setting as proof of completion; verify the final result through public URLs and response headers.
```

</section>

<p class="article-summary"><strong>In one line:</strong> A public GitHub Pages repository needs separate checks for build output, Git history, external requests, HTTPS, and the managing account instead of relying on `.gitignore` alone.</p>
