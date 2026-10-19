export function pixelRatioFor(width, height, deviceRatio) {
  return Math.max(1, Math.min(8, deviceRatio, 6144 / width, 6144 / height,
    Math.sqrt(12000000 / (width * height))));
}

export class Navigation {
  constructor(width, height, regionAt, scroll) {
    Object.assign(this, { width, height, regionAt, scroll, gesture: null });
  }
  begin(points) {
    if (this.gesture || points.length < 2) return;
    const [a,b] = points;
    const ra = this.regionAt({x:a.x/this.width,y:a.y/this.height});
    const rb = this.regionAt({x:b.x/this.width,y:b.y/this.height});
    this.gesture = {a:a.id,b:b.id,x:(a.x+b.x)/2,y:(a.y+b.y)/2,
      distance:Math.hypot(a.x-b.x,a.y-b.y),kind:'pending',dx:0,dy:0,
      region:ra===rb ? ra : ra==='board'||rb==='board' ? 'board' : ra||rb};
  }
  move(points) {
    const g=this.gesture;
    if (!g || g.kind==='blocked') return;
    const a=points.find(p=>p.id===g.a),b=points.find(p=>p.id===g.b);
    if (!a || !b) return;
    const x=(a.x+b.x)/2,y=(a.y+b.y)/2;
    const movement=Math.hypot(x-g.x,y-g.y);
    const spread=Math.abs(Math.hypot(a.x-b.x,a.y-b.y)-g.distance);
    if (spread>=8 && spread>movement) g.kind='blocked';
    else if (g.kind==='pending' && movement>=8) g.kind=g.region ? 'scroll' : 'blocked';
    if (g.kind==='scroll') {
      const dx=x-g.x,dy=y-g.y;
      this.scroll(g.region,(dx-g.dx)/this.width,(dy-g.dy)/this.height);
      g.dx=dx;g.dy=dy;
    }
  }
  end(points) { if (!points.length) this.gesture=null; }
}

export function installNavigation({canvas,viewport,read,write,ready,eventWindow=window}) {
  const block=event=>{event.preventDefault();event.stopImmediatePropagation();};
  const mode=value=>{if (ready()) {write('web-input-mode.txt',value);write('web-cancel-touch.txt','1');}};
  const navigation=new Navigation(viewport.clientWidth,viewport.clientHeight,point=>{
    for (const line of (read('web-regions.tsv')||'').split('\n')) {
      const [name,...values]=line.split('\t');
      const [x,y,w,h]=values.map(Number);
      if (point.x>=x && point.x<x+w && point.y>=y && point.y<y+h) return name;
    }
    return null;
  },(region,dx,dy)=>{
    if (ready()) write('web-scroll.tsv',(read('web-scroll.tsv')||'')+`${region}\t${dx.toFixed(8)}\t${dy.toFixed(8)}\n`);
  });
  const points=event=>{
    const r=viewport.getBoundingClientRect();
    return Array.from(event.touches,t=>({id:t.identifier,x:t.clientX-r.left,y:t.clientY-r.top}));
  };
  eventWindow.addEventListener('touchstart',event=>{
    if (!navigation.gesture && (event.target!==canvas || event.touches.length<2)) return;
    navigation.begin(points(event));mode('gesture');block(event);
  },{passive:false,capture:true});
  eventWindow.addEventListener('touchmove',event=>{
    if (!navigation.gesture) return;
    navigation.move(points(event));block(event);
  },{passive:false,capture:true});
  eventWindow.addEventListener('touchend',event=>{
    if (!navigation.gesture) return;
    navigation.end(points(event));if (!navigation.gesture) mode('idle');block(event);
  },{passive:false,capture:true});
  const cancel=()=>{
    navigation.end([]);if (ready()) write('web-abort-touch.txt','1');mode('idle');
  };
  eventWindow.addEventListener('touchcancel',event=>{cancel();block(event);},{passive:false,capture:true});
  eventWindow.addEventListener('blur',cancel);
  eventWindow.addEventListener('wheel',event=>{
    if (event.ctrlKey && event.target===canvas) block(event);
  },{passive:false,capture:true});
  return {navigation,resize(){
    navigation.width=viewport.clientWidth;navigation.height=viewport.clientHeight;
    if (navigation.gesture) navigation.gesture.kind='blocked';
  }};
}
