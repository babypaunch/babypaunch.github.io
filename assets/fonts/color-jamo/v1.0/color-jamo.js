/* Color Jamo text helpers. Requires koroman.browser.js (MIT; see LICENSE-Koroman.txt). */
(function (root) {
  'use strict';
  function romanize(text, options = {}) {
    if (typeof text !== 'string') throw new TypeError('text must be a string');
    const separator = options.syllableSeparator ?? '';
    if (!['', ' ', '_'].includes(separator)) throw new RangeError('Unsupported syllable separator');
    return text.replace(/[가-힣]+/g, word => root.koroman.romanize(word, { syllableSeparator: separator }));
  }
  function withPronunciation(text, options = {}) {
    if (typeof text !== 'string') throw new TypeError('text must be a string');
    return text.split(/\r?\n/).map(line => /[가-힣]/.test(line) ? `${line}\n${romanize(line, options)}` : line).join('\n');
  }
  root.ColorJamo = Object.freeze({ romanize, withPronunciation });
})(globalThis);
