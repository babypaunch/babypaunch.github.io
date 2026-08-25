const assert = require('node:assert/strict');
const { resolveTag } = require('../blog-tags');

const tags = ['all', 'app-making', 'vibe-coding'];
assert.equal(resolveTag('vibe-coding', tags), 'vibe-coding');
assert.equal(resolveTag('missing', tags), 'all');
assert.equal(resolveTag('', tags), 'all');

console.log('Blog tag filter tests passed.');
