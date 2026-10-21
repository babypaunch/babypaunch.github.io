const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const root = path.join(__dirname, '..', '_site');
const assets = path.join(root, 'assets/fonts/color-jamo/v1.0');
const manifest = fs.readFileSync(path.join(assets, 'SHA256SUMS.txt'), 'utf8').trim().split('\n');
assert.equal(manifest.length, 6);
for (const line of manifest) {
  const [hash, name] = line.trim().split(/\s+/);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(assets, name))).digest('hex'), hash, name);
}
assert.deepEqual(fs.readdirSync(assets).sort(), ['ColorJamoMonoSoftHumanist-v1.0.woff2', 'LICENSE-Koroman.txt', 'LICENSE.txt', 'SHA256SUMS.txt', 'color-jamo.css', 'color-jamo.js', 'koroman.browser.js'].sort());
const context = {};
for (const name of ['koroman.browser.js', 'color-jamo.js']) vm.runInNewContext(fs.readFileSync(path.join(assets, name), 'utf8'), context);
assert.equal(context.ColorJamo.romanize('국물, 국? 좋아!', {syllableSeparator:'_'}), 'gung_mul, guk? joa!');
assert.equal(context.ColorJamo.withPronunciation('국물\nHello'), '국물\ngungmul\nHello');
const policies = ['policies/color-jamo/license/index.html', 'en/policies/color-jamo/license/index.html'].map(name => fs.readFileSync(path.join(root, name),'utf8'));
for (const page of policies) {
  assert.ok(page.includes('2026-10-21'));
  assert.ok(page.includes('ColorJamo.withPronunciation'));
  assert.ok(page.includes('LICENSE-Koroman.txt'));
  assert.doesNotMatch(page, /<form\b|type="file"/);
}
assert.deepEqual(policies[0].match(/<h[23]>/g), policies[1].match(/<h[23]>/g));
for (const name of ['design/index.html','en/design/index.html']) {
  const page=fs.readFileSync(path.join(root,name),'utf8');
  assert.ok(page.includes('color-jamo-preview-label'));
  assert.ok(page.includes('color-jamo-contrast'));
  assert.ok(page.includes('color-jamo-black'));
}
console.log('Color Jamo public assets, library, bilingual policy and catalog OK');
