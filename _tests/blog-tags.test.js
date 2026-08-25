const assert = require('node:assert/strict');
const { resolveTag, formatResultCount } = require('../blog-tags');

const tags = ['all', 'chrome-extension', 'vibe-coding'];
assert.equal(resolveTag('vibe-coding', tags), 'vibe-coding');
assert.equal(resolveTag('missing', tags), 'all');
assert.equal(resolveTag('', tags), 'all');
assert.equal(formatResultCount('글 {count}개 표시', 2), '글 2개 표시');
assert.equal(formatResultCount('Showing {count} posts', 1), 'Showing 1 posts');

console.log('Blog tag filter tests passed.');
