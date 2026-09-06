const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const up = { hidden: true };
const down = { hidden: true };
const bounds = { startBottom: 400, endTop: 5000 };
const listeners = {};
let onResize;
const context = {
  document: {
    querySelector: (selector) => selector === '.article-navigation'
      ? { querySelector: (target) => target.includes('article-start') ? up : down }
      : { getBoundingClientRect: () => ({ bottom: 120 }) },
    getElementById: (id) => ({ getBoundingClientRect: () => id === 'article-start'
      ? { bottom: bounds.startBottom } : { top: bounds.endTop } }),
  },
  window: { innerHeight: 900, addEventListener: (event, callback) => { listeners[event] = callback; } },
  requestAnimationFrame: (callback) => callback(),
  ResizeObserver: class { constructor(callback) { onResize = callback; } observe() {} },
};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'article-navigation.js'), 'utf8'), context);
assert.deepEqual([up.hidden, down.hidden], [true, false], 'start: only down');
bounds.startBottom = 120;
listeners.scroll();
assert.deepEqual([up.hidden, down.hidden], [true, true], 'middle: neither arrow');
bounds.endTop = 900;
listeners.scroll();
assert.deepEqual([up.hidden, down.hidden], [false, true], 'end: only up');
context.window.innerHeight = 700;
listeners.resize();
assert.deepEqual([up.hidden, down.hidden], [true, true], 'viewport resize updates end visibility');
bounds.startBottom = 400;
onResize();
assert.deepEqual([up.hidden, down.hidden], [true, false], 'layout resize restores start state');
bounds.endTop = 600;
listeners.scroll();
assert.deepEqual([up.hidden, down.hidden], [true, false], 'short article never shows both arrows');
console.log('Article navigation state tests passed.');
