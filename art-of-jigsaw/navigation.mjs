const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function pixelRatioFor(width, height, scale, deviceRatio) {
  return Math.max(1, Math.min(8, deviceRatio * scale,
    6144 / width, 6144 / height, Math.sqrt(12000000 / (width * height))));
}

export class Navigation {
  constructor(width, height, regionAt, scroll) {
    this.width = width;
    this.height = height;
    this.regionAt = regionAt;
    this.scroll = scroll;
    this.zoom = 1;
    this.panX = this.panY = 0;
    this.gesture = null;
  }

  normalized(x, y) {
    return { x: (x - this.width / 2 - this.panX) / (this.width * this.zoom) + .5,
      y: (y - this.height / 2 - this.panY) / (this.height * this.zoom) + .5 };
  }

  constrain() {
    this.panX = clamp(this.panX, -(this.zoom - 1) * this.width / 2, (this.zoom - 1) * this.width / 2);
    this.panY = clamp(this.panY, -(this.zoom - 1) * this.height / 2, (this.zoom - 1) * this.height / 2);
  }

  begin(points) {
    if (this.gesture || points.length < 2) return;
    const [a, b] = points;
    const regionA = this.regionAt(this.normalized(a.x, a.y));
    const regionB = this.regionAt(this.normalized(b.x, b.y));
    this.gesture = { a: a.id, b: b.id, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
      distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: this.zoom,
      panX: this.panX, panY: this.panY, kind: 'pending',
      region: regionA === regionB ? regionA :
        (regionA === 'board' || regionB === 'board' ? 'board' : regionA || regionB), dx: 0, dy: 0 };
  }

  move(points) {
    const g = this.gesture;
    if (!g) return;
    const a = points.find((p) => p.id === g.a), b = points.find((p) => p.id === g.b);
    if (!a || !b) return; // Do not hand a remaining finger back to piece input.
    const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    const movement = Math.hypot(x - g.x, y - g.y);
    const spread = Math.abs(distance - g.distance);
    if (g.kind !== 'zoom' && spread >= 8 && spread > movement) g.kind = 'zoom';
    else if (g.kind === 'pending' && movement >= 8) g.kind = g.region ? 'scroll' : 'blocked';
    if (g.kind === 'zoom' && g.distance > 0) {
      this.zoom = clamp(g.zoom * distance / g.distance, 1, 3);
      const factor = this.zoom / g.zoom;
      this.panX = g.panX + (1 - factor) * (g.x - this.width / 2 - g.panX);
      this.panY = g.panY + (1 - factor) * (g.y - this.height / 2 - g.panY);
      this.constrain();
    } else if (g.kind === 'scroll') {
      const dx = x - g.x, dy = y - g.y;
      this.scroll(g.region, (dx - g.dx) / (this.width * this.zoom),
        (dy - g.dy) / (this.height * this.zoom));
      g.dx = dx;
      g.dy = dy;
    }
  }

  end(points) { if (points.length === 0) this.gesture = null; }

  viewRect() {
    return { x: .5 - this.panX / (this.width * this.zoom) - .5 / this.zoom,
      y: .5 - this.panY / (this.height * this.zoom) - .5 / this.zoom,
      width: 1 / this.zoom, height: 1 / this.zoom };
  }

  locate(x, y) {
    this.panX = (.5 - x) * this.width * this.zoom;
    this.panY = (.5 - y) * this.height * this.zoom;
    this.constrain();
  }

  zoomAt(factor, x, y) {
    const point = this.normalized(x, y);
    this.zoom = clamp(this.zoom * factor, 1, 3);
    this.panX = x - this.width / 2 - (point.x - .5) * this.width * this.zoom;
    this.panY = y - this.height / 2 - (point.y - .5) * this.height * this.zoom;
    this.constrain();
  }

  reset() { this.zoom = 1; this.panX = this.panY = 0; }
}

export function installNavigation({ canvas, viewport, map, preview, marker, reset,
  read, write, ready, onChange, onFinish, eventWindow = window }) {
  const block = (event) => { event.preventDefault(); event.stopImmediatePropagation(); };
  function mode(value) {
    if (!ready()) return;
    write('web-input-mode.txt', value);
    write('web-cancel-touch.txt', '1');
  }
  const navigation = new Navigation(viewport.clientWidth, viewport.clientHeight, (point) => {
    for (const line of (read('web-regions.tsv') || '').trim().split('\n')) {
      const [name, ...numbers] = line.split('\t');
      const [x, y, width, height] = numbers.map(Number);
      if (point.x >= x && point.x < x + width && point.y >= y && point.y < y + height) return name;
    }
    return (read('web-regions.tsv') || '').includes('board\t') ? 'board' : null;
  }, (region, dx, dy) => {
    if (!ready()) return;
    const line = `${region}\t${dx.toFixed(8)}\t${dy.toFixed(8)}\n`;
    write('web-scroll.tsv', (read('web-scroll.tsv') || '') + line);
  });
  const points = (event) => Array.from(event.touches, (t) => ({ id: t.identifier, x: t.clientX, y: t.clientY }));
  let wheelFinish;
  function paint() {
    navigation.constrain();
    canvas.style.transform = `translate(${navigation.panX}px, ${navigation.panY}px) scale(${navigation.zoom})`;
    map.hidden = navigation.zoom <= 1.001;
    const view = navigation.viewRect();
    Object.assign(marker.style, { left: `${view.x * 100}%`, top: `${view.y * 100}%`,
      width: `${view.width * 100}%`, height: `${view.height * 100}%` });
    onChange(navigation);
  }
  eventWindow.addEventListener('touchstart', (event) => {
    if (map.contains(event.target)) { block(event); return; }
    if (!navigation.gesture && event.touches.length < 2) return;
    navigation.begin(points(event));
    mode('gesture');
    block(event);
  }, { passive: false, capture: true });
  eventWindow.addEventListener('wheel', (event) => {
    if (!event.ctrlKey || event.target !== canvas || !ready()) return;
    block(event);
    if (!Number.isFinite(event.deltaY) || event.deltaY === 0) return;
    navigation.zoomAt(Math.exp(-event.deltaY / 100), event.clientX, event.clientY);
    paint();
    clearTimeout(wheelFinish);
    wheelFinish = setTimeout(() => { wheelFinish = null; onFinish(navigation); }, 180);
  }, { passive: false, capture: true });
  eventWindow.addEventListener('touchmove', (event) => {
    if (map.contains(event.target)) { block(event); return; }
    if (!navigation.gesture) return;
    navigation.move(points(event));
    paint();
    block(event);
  }, { passive: false, capture: true });
  function end(event) {
    if (map.contains(event.target)) { block(event); return; }
    if (!navigation.gesture) return;
    navigation.end(points(event));
    if (!navigation.gesture) { mode('idle'); onFinish(navigation); }
    block(event);
  }
  eventWindow.addEventListener('touchend', end, { passive: false, capture: true });
  eventWindow.addEventListener('touchcancel', (event) => {
    if (navigation.gesture) end(event);
    else {
      mode('idle');
      if (ready()) write('web-abort-touch.txt', '1');
      block(event);
    }
  }, { passive: false, capture: true });
  let mapDrag = null;
  function mapPoint(event) {
    const rect = preview.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }
  preview.addEventListener('pointerdown', (event) => {
    if (mapDrag || navigation.gesture) return;
    block(event);
    const point = mapPoint(event), view = navigation.viewRect();
    const inside = point.x >= view.x && point.x <= view.x + view.width &&
      point.y >= view.y && point.y <= view.y + view.height;
    mapDrag = { id: event.pointerId, dx: inside ? point.x - view.x - view.width / 2 : 0,
      dy: inside ? point.y - view.y - view.height / 2 : 0 };
    preview.setPointerCapture(event.pointerId);
    mode('minimap');
    navigation.locate(point.x - mapDrag.dx, point.y - mapDrag.dy);
    paint();
  });
  preview.addEventListener('pointermove', (event) => {
    if (!mapDrag || mapDrag.id !== event.pointerId) return;
    block(event);
    const point = mapPoint(event);
    navigation.locate(point.x - mapDrag.dx, point.y - mapDrag.dy);
    paint();
  });
  function endMap(event) {
    if (!mapDrag || mapDrag.id !== event.pointerId) return;
    mapDrag = null;
    mode('idle');
  }
  preview.addEventListener('pointerup', endMap);
  preview.addEventListener('pointercancel', endMap);
  preview.addEventListener('lostpointercapture', endMap);
  preview.addEventListener('keydown', (event) => {
    const direction = { ArrowLeft: [-.05, 0], ArrowRight: [.05, 0], ArrowUp: [0, -.05], ArrowDown: [0, .05] }[event.key];
    if (!direction) return;
    block(event);
    const view = navigation.viewRect();
    navigation.locate(view.x + view.width / 2 + direction[0], view.y + view.height / 2 + direction[1]);
    paint();
  });
  reset.addEventListener('click', () => {
    navigation.end([]); mapDrag = null;
    mode('idle'); navigation.reset(); paint(); onFinish(navigation);
  });
  // Touch handlers above stop touch-generated clicks, so activate this control on pointerup too.
  reset.addEventListener('pointerup', (event) => {
    if (event.pointerType === 'touch') { block(event); reset.click(); }
  });
  eventWindow.addEventListener('blur', () => {
    if (!navigation.gesture && ready()) write('web-abort-touch.txt', '1');
    navigation.end([]); mapDrag = null; mode('idle'); onFinish(navigation);
  });
  return {
    navigation,
    resize() { navigation.width = viewport.clientWidth; navigation.height = viewport.clientHeight; paint(); },
    // Called from the pinned Emscripten postMainLoop hook while the WebGL frame is still available.
    preview() {
      if (map.hidden) return;
      const height = Math.max(1, Math.round(240 * navigation.height / navigation.width));
      if (preview.width !== 240 || preview.height !== height) { preview.width = 240; preview.height = height; }
      preview.getContext('2d').drawImage(canvas, 0, 0, preview.width, preview.height);
    },
  };
}
