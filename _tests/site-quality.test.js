const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..', '_site');

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(target) : [target];
});

const htmlFiles = walk(siteRoot).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const label = path.relative(siteRoot, file);

  assert.match(html, /<html lang="(?:ko|en)">/, `${label}: page language`);
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${label}: one main landmark`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${label}: one h1`);
  assert.match(html, /class="skip-link" href="#main"/, `${label}: skip link`);
  assert.match(html, /data-analytics-settings/, `${label}: analytics settings control`);
  assert.match(html, /<meta name="description" content="[^"]+">/, `${label}: description`);
  assert.match(html, /<meta name="robots" content="[^"]+">/, `${label}: robots directive`);
  assert.doesNotMatch(html, /<table\b/, `${label}: use cards instead of tables`);
  assert.match(html, /<link rel="canonical" href="https:\/\/babypaunch\.com\//, `${label}: canonical`);
  for (const language of ['ko', 'en', 'x-default']) {
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="${language}"`), `${label}: ${language} alternate`);
  }

  const structuredData = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(structuredData, `${label}: structured data`);
  const schema = JSON.parse(structuredData[1]);
  assert.ok(['WebSite', 'WebPage', 'BlogPosting'].includes(schema['@type']), `${label}: schema type`);

  for (const image of html.match(/<img\b[^>]*>/g) || []) {
    assert.match(image, /\salt="[^"]*"/, `${label}: image alt`);
    assert.match(image, /\swidth="\d+"/, `${label}: image width`);
    assert.match(image, /\sheight="\d+"/, `${label}: image height`);
  }

  for (const frame of html.match(/<iframe\b[^>]*>/g) || []) {
    assert.match(frame, /\stitle="[^"]+"/, `${label}: iframe title`);
    assert.match(frame, /\sloading="lazy"/, `${label}: iframe lazy loading`);
  }

  for (const link of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) {
    assert.match(link, /\srel="[^"]*noopener[^"]*"/, `${label}: safe new-window link`);
  }

  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const url = match[1];
    if (!url) continue;
    const relative = url.replace(/^\//, '');
    const target = url === '/'
      ? path.join(siteRoot, 'index.html')
      : path.join(siteRoot, relative, url.endsWith('/') ? 'index.html' : '');
    assert.ok(fs.existsSync(target), `${label}: internal link ${url}`);
  }
}

const css = fs.readFileSync(path.join(siteRoot, 'styles.css'), 'utf8');
assert.match(css, /\.page-shell h1 \{[^}]*overflow-wrap: anywhere/, 'styles.css: long page titles wrap');
for (const preference of ['prefers-reduced-motion', 'prefers-contrast', 'forced-colors']) {
  assert.ok(css.includes(preference), `styles.css: ${preference}`);
}

const analyticsScript = fs.readFileSync(path.join(siteRoot, 'analytics-consent.js'), 'utf8');
assert.match(analyticsScript, /localStorage\.setItem\(storageKey, choice\)/, 'analytics: consent choice persists');
assert.match(analyticsScript, /analytics_storage: 'granted'/, 'analytics: granted only after consent');
assert.match(analyticsScript, /2000/, 'analytics: toast dismisses after two seconds');
assert.match(analyticsScript, /querySelectorAll\('\[data-analytics-settings\]'\)/, 'analytics: every settings control is connected');

for (const relative of [
  'blog/github-pages-analytics/index.html',
  'en/blog/github-pages-analytics/index.html',
  'policies/babypaunch/privacy/index.html',
  'en/policies/babypaunch/privacy/index.html',
]) {
  const html = fs.readFileSync(path.join(siteRoot, relative), 'utf8');
  assert.ok((html.match(/data-analytics-settings/g) || []).length >= 2, `${relative}: inline and footer analytics settings controls`);
}

const sitemap = fs.readFileSync(path.join(siteRoot, 'sitemap.xml'), 'utf8');
for (const url of [
  '/policies/babypaunch/accessibility/',
  '/en/policies/babypaunch/accessibility/',
  '/policies/babypaunch/privacy/',
  '/en/policies/babypaunch/privacy/',
  '/policies/laftel-mania/privacy/',
  '/en/policies/laftel-mania/privacy/',
  '/contact/',
  '/en/contact/',
  '/blog/github-pages-analytics/',
  '/en/blog/github-pages-analytics/',
]) {
  assert.ok(sitemap.includes(`https://babypaunch.com${url}`), `sitemap: ${url}`);
}

const policyData = fs.readFileSync(path.join(__dirname, '..', '_data', 'policies.yml'), 'utf8');
for (const project of ['babypaunch', 'laftel-mania']) {
  assert.ok(policyData.includes(`slug: ${project}`), `policies.yml: ${project}`);
}

for (const relative of [
  'policies/babypaunch/privacy/index.html',
  'en/policies/babypaunch/privacy/index.html',
  'policies/babypaunch/accessibility/index.html',
  'en/policies/babypaunch/accessibility/index.html',
  'policies/laftel-mania/privacy/index.html',
  'en/policies/laftel-mania/privacy/index.html',
]) {
  const html = fs.readFileSync(path.join(siteRoot, relative), 'utf8');
  assert.match(html, /(?:최초 시행일|최초 공개일|First effective|First published):/, `${relative}: first publication date`);
  assert.match(html, /(?:최종 개정일|최종 갱신일|Last revised|Last updated):/, `${relative}: latest revision date`);
  assert.match(html, /<h2>(?:개정 이력|변경 이력|Revision history)<\/h2>/, `${relative}: revision history`);
  assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/, `${relative}: machine-readable revision date`);
}

for (const [relative, required] of [
  ['policies/babypaunch/privacy/index.html', ['_ga', '이벤트 데이터 2개월', '사용자 데이터', '14개월', 'Google Signals', '국외 처리', 'Search Console', '정보 열람·삭제·처리정지']],
  ['en/policies/babypaunch/privacy/index.html', ['_ga', 'Event data for two months', '14 months', 'Google Signals', 'International processing', 'Search Console', 'access, delete, or restrict']],
]) {
  const html = fs.readFileSync(path.join(siteRoot, relative), 'utf8');
  for (const text of required) assert.ok(html.includes(text), `${relative}: ${text}`);
  assert.match(html, /class="data-cards/, `${relative}: policy data cards`);
}

console.log(`Site quality tests passed for ${htmlFiles.length} pages.`);
