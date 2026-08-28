const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const posts = path.join(root, '_posts');
const site = path.join(root, '_site');
const koreanPosts = fs.readdirSync(posts)
  .filter((file) => file.endsWith('.md') && !file.endsWith('-en.md'));

const frontMatterValue = (source, key) => {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match?.[1]?.trim();
};

const renderedPath = (permalink) => path.join(site, permalink.replace(/^\//, ''), 'index.html');
const articleBody = (html) => html.match(/<article class="article-body">([\s\S]*?)<\/article>/)?.[1] || '';
const semanticSequence = (html) => [...articleBody(html).matchAll(/<(h2|h3|h4|p|li|th|td|figcaption|summary)\b/g)]
  .map((match) => match[1]);

for (const koreanFile of koreanPosts) {
  const englishFile = koreanFile.replace(/\.md$/, '-en.md');
  assert.ok(fs.existsSync(path.join(posts, englishFile)), `${koreanFile}: English post exists`);

  const koreanSource = fs.readFileSync(path.join(posts, koreanFile), 'utf8');
  const englishSource = fs.readFileSync(path.join(posts, englishFile), 'utf8');
  const koreanPermalink = frontMatterValue(koreanSource, 'permalink');
  const englishPermalink = frontMatterValue(englishSource, 'permalink');
  const koreanHtml = fs.readFileSync(renderedPath(koreanPermalink), 'utf8');
  const englishHtml = fs.readFileSync(renderedPath(englishPermalink), 'utf8');

  assert.ok(koreanHtml.includes(`data-translation-url="${englishPermalink}"`), `${koreanFile}: translation target`);
  assert.ok(englishHtml.includes(`data-translation-url="${koreanPermalink}"`), `${englishFile}: translation target`);
  assert.match(koreanHtml, /article-translation\.js/, `${koreanFile}: translation script`);
  assert.match(englishHtml, /article-translation\.js/, `${englishFile}: translation script`);
  assert.deepEqual(
    semanticSequence(koreanHtml),
    semanticSequence(englishHtml),
    `${koreanFile}: Korean and English semantic blocks`,
  );
}

console.log(`Article translation tests passed for ${koreanPosts.length} post pairs.`);
