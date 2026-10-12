import PocketBase from './pocketbase.es.mjs';

const localPreview = location.origin === 'http://127.0.0.1:8000';
const auth = new PocketBase(localPreview ? `${location.origin}/__aoj/auth` : 'https://auth.babypaunch.com');
if (localPreview) {
  // The configured desktop OAuth client accepts loopback redirects.
  const buildURL = auth.buildURL.bind(auth);
  auth.buildURL = (path) => path === '/api/oauth2-redirect'
    ? `${location.origin}/__aoj/oauth-callback` : buildURL(path);
}
const gateUrl = localPreview
  ? `${location.origin}/__aoj/gate/v1/programs/art-of-jigsaw/jigsaw/pieces`
  : 'https://gate.babypaunch.com/v1/programs/art-of-jigsaw/jigsaw/pieces';
const metUrl = localPreview
  ? `${location.origin}/__aoj/met`
  : 'https://collectionapi.metmuseum.org/public/collection/v1';
const metSearchUrl = localPreview
  ? `${metUrl}/search`
  : 'https://collectionapi.metmuseum.org/public/collection/v1.1/search';
const metImageUrl = (url) => localPreview
  ? `${metUrl}/image?url=${encodeURIComponent(url)}`
  : `https://gate.babypaunch.com/v1/programs/art-of-jigsaw/met/image?url=${encodeURIComponent(url)}`;
const signIn = document.getElementById('signin');
const photoPicker = document.getElementById('photo-picker');
const photoFile = document.getElementById('photo-file');
const status = document.getElementById('status');
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const directory = '/home/web_user/love/art-of-jigsaw';
let busy = false;
let signInReady = false;
let language = 'en';
const message = (english, korean) => language === 'ko' ? korean : english;

function syncLanguage() {
  const selected = read('language.txt')?.trim() === 'ko' ? 'ko' : 'en';
  if (selected === language) return;
  language = selected;
  document.documentElement.lang = language;
  signIn.textContent = message('Sign in with Google', 'Google로 로그인');
  photoPicker.textContent = message('Import My Photo', '내 사진 가져오기');
  document.getElementById('canvas').setAttribute('aria-label',
    message('Art Of Jigsaw game', 'Art Of Jigsaw 게임'));
}

fetch(`${auth.baseUrl}/api/collections/users/auth-methods`)
  .then((response) => { signInReady = response.ok; })
  .catch(() => { signInReady = false; });

function fs() { return window.Module?.FS; }
function path(name) { return `${directory}/${name}`; }
function read(name) {
  try { return decoder.decode(fs().readFile(path(name))); }
  catch { return null; }
}
function write(name, value) { fs().writeFile(path(name), typeof value === 'string' ? encoder.encode(value) : value); }
function remove(name) { try { fs().unlink(path(name)); } catch { /* already removed */ } }
function clean(value) { return String(value ?? '').replace(/[\t\r\n\x00-\x1f]/g, ' ').trim(); }
function result(kind, action, ok, extra = '') {
  write(`web-${kind}-result.tsv`, `${action}\t${ok ? 'ok' : 'fail'}\t${clean(extra)}`);
}
function showSignIn() { signIn.hidden = false; }
function hideSignIn() { signIn.hidden = true; }

function placeSignIn() {
  const canvas = document.getElementById('canvas');
  const bounds = canvas.getBoundingClientRect();
  const scale = Math.min(canvas.width / 1280, canvas.height / 850);
  const x = (canvas.width - 1280 * scale) / 2 + 105 * scale;
  const y = (canvas.height - 850 * scale) / 2 + 475 * scale;
  signIn.style.left = `${bounds.left + x * bounds.width / canvas.width}px`;
  signIn.style.top = `${bounds.top + y * bounds.height / canvas.height}px`;
  signIn.style.width = `${420 * scale * bounds.width / canvas.width}px`;
  signIn.style.height = `${62 * scale * bounds.height / canvas.height}px`;
}
new ResizeObserver(placeSignIn).observe(document.getElementById('canvas'));
function placePhotoPicker() {
  const bounds = document.getElementById('canvas').getBoundingClientRect();
  const canvas = document.getElementById('canvas');
  const position = read('web-photo-button.tsv')?.split('\t').map(Number);
  if (position?.length !== 4 || position.some((value) => !Number.isFinite(value))) {
    photoPicker.hidden = true;
    return;
  }
  const [x, y, width, height] = position;
  photoPicker.style.left = `${bounds.left + x * bounds.width / canvas.width}px`;
  photoPicker.style.top = `${bounds.top + y * bounds.height / canvas.height}px`;
  photoPicker.style.width = `${width * bounds.width / canvas.width}px`;
  photoPicker.style.height = `${height * bounds.height / canvas.height}px`;
  photoPicker.hidden = false;
}
photoPicker.addEventListener('click', () => { photoFile.click(); });
photoFile.addEventListener('change', async () => {
  const file = photoFile.files?.[0];
  photoFile.value = '';
  if (!file) return;
  try {
    write('photo-import.bin', new Uint8Array(await file.arrayBuffer()));
    write('photo-import-name.txt', file.name);
  } catch {
    write('photo-import-error.txt', 'Could not read the selected image.');
  }
});
let lastViewport = '';
let lastCanvasSize = '';
function syncViewport() {
  const canvas = document.getElementById('canvas');
  const canvasSize = `${canvas.width}x${canvas.height}`;
  if (canvasSize !== lastCanvasSize) {
    lastCanvasSize = canvasSize;
    placeSignIn();
  }
  const bounds = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.min(8192, Math.round(bounds.width)));
  const height = Math.max(1, Math.min(8192, Math.round(bounds.height)));
  const viewport = `${width}\t${height}`;
  if (viewport === lastViewport || !fs()?.analyzePath(directory).exists) return;
  write('web-viewport.tsv', viewport);
  lastViewport = viewport;
}
window.addEventListener('resize', () => { placeSignIn(); placePhotoPicker(); syncViewport(); });
setInterval(() => {
  syncLanguage();
  syncViewport();
  placePhotoPicker();
  if (read('web-home-request.txt')) {
    remove('web-home-request.txt');
    location.assign('/');
  }
}, 100);
placeSignIn();

signIn.addEventListener('click', async () => {
  if (!signInReady) {
    result('gate', 'login', false, 'Sign-in is unavailable from this address. Check the account connection.');
    status.textContent = message('Sign-in connection unavailable.', '로그인 연결을 사용할 수 없습니다.');
    return;
  }
  signIn.disabled = true;
  status.textContent = message('Opening Google sign-in…', 'Google 로그인을 여는 중…');
  try {
    await auth.collection('users').authWithOAuth2({ provider: localPreview ? 'google' : 'google_web' });
    write('web-token.txt', auth.authStore.token);
    result('gate', 'login', true);
    hideSignIn();
    status.textContent = '';
  } catch (error) {
    result('gate', 'login', false, error.message);
    status.textContent = message('Sign-in failed. Try again.', '로그인에 실패했습니다. 다시 시도하세요.');
  } finally { signIn.disabled = false; }
});

async function gate(request) {
  const [action, cols, rows, iw, ih] = request.split('\t');
  if (action === 'login') { showSignIn(); return; }
  if (action === 'logout') {
    auth.authStore.clear();
    showSignIn();
    result('gate', action, true);
    return;
  }
  if (action === 'restore') {
    if (!auth.authStore.isValid) { showSignIn(); result('gate', action, false, ''); return; }
    try {
      const session = await auth.collection('users').authRefresh();
      write('web-token.txt', session.token);
      hideSignIn();
      result('gate', action, true);
    } catch {
      auth.authStore.clear();
      showSignIn();
      result('gate', action, false, '');
    }
    return;
  }
  if (action !== 'pieces') throw new Error('Unknown game request.');
  if (!auth.authStore.isValid) throw new Error('Session expired. Sign in again.');
  const body = { cols: Number(cols), rows: Number(rows), iw: Number(iw), ih: Number(ih) };
  if (![body.cols, body.rows, body.iw, body.ih].every(Number.isSafeInteger) ||
      body.cols * body.rows > 3000 || body.cols < 1 || body.rows < 1) {
    throw new Error('Invalid puzzle size.');
  }
  const response = await fetch(gateUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth.authStore.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (response.status === 401) { auth.authStore.clear(); showSignIn(); throw new Error('Session expired. Sign in again.'); }
  if (!response.ok) throw new Error(`Puzzle service returned ${response.status}.`);
  const payload = await response.json();
  if (!Array.isArray(payload.pieces) || payload.pieces.length !== body.cols * body.rows) {
    throw new Error('Puzzle service returned an invalid piece count.');
  }
  const lines = payload.pieces.map((piece) => {
    const fields = [piece.outlinePath, piece.horizontalPath, piece.verticalPath];
    if (typeof fields[0] !== 'string' || !fields[0] || fields.some((field) =>
      typeof field !== 'string' || /[\t\r\n]/.test(field))) throw new Error('Invalid puzzle path.');
    return fields.join('\t');
  });
  write('gate-pieces.tsv', lines.join('\n'));
  result('gate', action, true);
}

async function met(request) {
  const [action, argument] = request.split('\t');
  if (action === 'download') {
    const id = Number(argument);
    if (!Number.isSafeInteger(id) || id <= 0) throw new Error('Invalid artwork ID.');
    const itemResponse = await fetch(`${metUrl}/objects/${id}`);
    if (!itemResponse.ok) throw new Error(`The Met returned ${itemResponse.status}.`);
    const item = await itemResponse.json();
    if (item.objectID !== id || item.isPublicDomain !== true || !item.primaryImage) {
      throw new Error('Artwork is unavailable for download.');
    }
    const imageResponse = await fetch(metImageUrl(item.primaryImage));
    if (!imageResponse.ok) throw new Error('Artwork image could not be downloaded.');
    write(`library/met-${id}.jpg`, new Uint8Array(await imageResponse.arrayBuffer()));
    result('met', action, true, id);
    return;
  }
  if (action !== 'search') throw new Error('Unknown artwork request.');
  const offset = Number(argument);
  const query = (read('met-query.txt') || '').trim();
  const installed = new Set((read('met-fixed-ids.txt') || '').split(/\s+/));
  const entries = (read('library.tsv') || '').split('\n');
  for (const entry of entries) if (entry.startsWith('met\t')) installed.add(entry.split('\t')[1]);
  const lines = [];
  let next = offset;
  let total = 0;
  while (lines.length < 100 && next < 10000) {
    const params = new URLSearchParams({ hasImages: 'true', offset: String(next), limit: '100' });
    if (query) params.set('q', query); else params.set('isHighlight', 'true');
    const pageResponse = await fetch(`${metSearchUrl}?${params}`);
    if (!pageResponse.ok) throw new Error(`The Met returned ${pageResponse.status}.`);
    const page = await pageResponse.json();
    total = page.total || 0;
    if (!page.objectIDs?.length) break;
    for (const id of page.objectIDs) {
      next += 1;
      if (installed.has(String(id))) continue;
      try {
        const itemResponse = await fetch(`${metUrl}/objects/${id}`);
        if (!itemResponse.ok) continue;
        const item = await itemResponse.json();
        if (!item.isPublicDomain || !item.primaryImage || !item.primaryImageSmall) continue;
        const imageResponse = await fetch(metImageUrl(item.primaryImageSmall));
        if (!imageResponse.ok) continue;
        write(`cache/met-${id}.jpg`, new Uint8Array(await imageResponse.arrayBuffer()));
        lines.push([id, clean(item.title) || 'Untitled', clean(item.artistDisplayName) || '-'].join('\t'));
        installed.add(String(id));
      } catch { /* skip unavailable objects */ }
      if (lines.length >= 100) break;
    }
    if (next >= total) break;
  }
  write('met-results.tsv', lines.join('\n'));
  write('met-page.tsv', `${total}\t${next}`);
  result('met', action, true);
}

async function poll() {
  if (busy || !fs()) return;
  const kind = read('web-gate-request.tsv') ? 'gate' : read('web-met-request.tsv') ? 'met' : null;
  if (!kind) return;
  const request = read(`web-${kind}-request.tsv`);
  remove(`web-${kind}-request.tsv`);
  const action = request.split('\t')[0];
  busy = true;
  try { await (kind === 'gate' ? gate(request) : met(request)); }
  catch (error) { result(kind, action, false, error.message); }
  finally { busy = false; }
}

setInterval(poll, 100);
setInterval(() => {
  if (fs()?.syncfs) fs().syncfs(false, (error) => {
    if (error) console.error('Could not save browser game data.', error);
  });
}, 10000);
