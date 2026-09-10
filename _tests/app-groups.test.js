const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Small DOM stand-ins exercise the shipped handlers without a browser dependency.
function element() {
  return {
    handlers: {},
    style: { removeProperty(key) { if (key === 'min-height') delete this.minHeight; } },
    classList: { add() {} },
    getBoundingClientRect: () => ({ x: 0, y: 0, height: 216 }),
    getAnimations: () => [],
    animate() { this.animated = true; },
    focus() { this.focused = true; },
    addEventListener(event, handler) { this.handlers[event] = handler; },
  };
}

for (const reducedMotion of [false, true]) {
  const groups = [9, 3].map((count) => {
    const group = element();
    group.entries = Array.from({ length: count }, () => {
      const entry = Object.assign(element(), { open: false, hidden: false });
      entry.title = element();
      entry.label = element();
      entry.close = element();
      entry.title.querySelector = () => entry.label;
      entry.querySelector = (selector) => selector === '.app-title' ? entry.title : entry.close;
      return entry;
    });
    group.querySelectorAll = () => group.entries;
    return group;
  });
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'app-groups.js'), 'utf8'), {
    document: { querySelectorAll: () => groups },
    window: { matchMedia: () => ({ matches: reducedMotion }) },
  });
  const selected = groups[0].entries[4];
  const event = { preventDefault() { this.prevented = true; } };
  selected.title.handlers.click(event);
  assert.equal(event.prevented, true);
  assert.equal(selected.open, true);
  assert.equal(groups[0].entries.filter((entry) => !entry.hidden).length, 1);
  assert.equal(groups[1].entries.every((entry) => !entry.hidden && !entry.open), true);
  assert.equal(Boolean(selected.label.animated), !reducedMotion);
  assert.equal(groups[0].style.minHeight, '216px');
  selected.close.handlers.click();
  assert.equal(selected.open, false);
  assert.equal(selected.title.focused, true);
  assert.equal(groups[0].entries.every((entry) => !entry.hidden), true);
  assert.equal(groups[0].style.minHeight, undefined);
  selected.title.handlers.click(event);
  selected.handlers.keydown({ ...event, key: 'Escape' });
  assert.equal(selected.open, false);
}

const appCount = (fs.readFileSync(path.join(__dirname, '..', '_data', 'ko.yml'), 'utf8').match(/^    - name:/gm) || []).length;
for (const route of ['index.html', 'en/index.html', 'design/index.html', 'en/design/index.html']) {
  const html = fs.readFileSync(path.join(__dirname, '..', '_site', route), 'utf8');
  assert.match(html, /data-app-group/);
  assert.equal((html.match(/class="app-entry"/g) || []).length, appCount);
  assert.equal((html.match(/data-app-group/g) || []).length, Math.ceil(appCount / 9));
  assert.match(html, /app-groups\.js/);
  assert.match(html, /https:\/\/play.google.com\/store\/apps\/details\?id=com.babypaunch.chordsketch/);
  assert.doesNotMatch(html, /\{\{|\{%/);
}
console.log('App groups: selection, isolation, close, Escape, focus, reduced motion and four routes passed.');
