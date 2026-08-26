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
  assert.match(html, /<meta name="description" content="[^"]+">/, `${label}: description`);
  assert.match(html, /<meta name="robots" content="[^"]+">/, `${label}: robots directive`);
  assert.match(html, /<link rel="canonical" href="https:\/\/babypaunch\.com\//, `${label}: canonical`);
  for (const language of ['ko', 'en', 'x-default']) {
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="${language}"`), `${label}: ${language} alternate`);
  }

  const structuredData = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(structuredData, `${label}: structured data`);
  const schema = JSON.parse(structuredData[1]);
  assert.ok(['WebSite', 'WebPage', 'BlogPosting'].includes(schema['@type']), `${label}: schema type`);
  if (schema['@type'] === 'BlogPosting') assert.ok(schema.image, `${label}: post schema image`);

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
for (const preference of ['prefers-reduced-motion', 'prefers-contrast', 'forced-colors']) {
  assert.ok(css.includes(preference), `styles.css: ${preference}`);
}

const sitemap = fs.readFileSync(path.join(siteRoot, 'sitemap.xml'), 'utf8');
for (const url of ['/accessibility/', '/en/accessibility/', '/contact/', '/en/contact/']) {
  assert.ok(sitemap.includes(`https://babypaunch.com${url}`), `sitemap: ${url}`);
}

console.log(`Site quality tests passed for ${htmlFiles.length} pages.`);
