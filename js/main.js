/* CURSOR */
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();

/* NAV */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const burger=document.getElementById('burger'),mobileNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>mobileNav.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>mobileNav.classList.remove('open')));

/* PARTICLES */
(function(){
  const c=document.getElementById('particles');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,stars=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;}
  resize();
  window.addEventListener('resize',resize,{passive:true});
  for(let i=0;i<120;i++)stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,dx:(Math.random()-.5)*.2,dy:(Math.random()-.5)*.2,o:Math.random()*.5+.1});
  function draw(){ctx.clearRect(0,0,W,H);stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(245,184,0,${s.o})`;ctx.fill();s.x+=s.dx;s.y+=s.dy;if(s.x<0||s.x>W)s.dx*=-1;if(s.y<0||s.y>H)s.dy*=-1;});requestAnimationFrame(draw);}
  draw();
})();

/* SHOWREEL */
const playBtn=document.getElementById('playBtn'),vid=document.getElementById('showreelVideo');
playBtn.addEventListener('click',()=>{vid.play();playBtn.style.opacity='0';playBtn.style.pointerEvents='none';});
vid.addEventListener('click',()=>{vid.pause();playBtn.style.opacity='1';playBtn.style.pointerEvents='auto';});

/* PORTFOLIO TABS */
function switchTab(tab){
  document.querySelectorAll('.ptab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.pillar-panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+tab));
}
document.querySelectorAll('.ptab').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.tab)));

/* LIGHTBOX */
let lbItems=[],lbIdx=0;
function buildLbItems(){lbItems=Array.from(document.querySelectorAll('.pillar-panel.active .port-item'));}
function openLb(idx){buildLbItems();lbIdx=idx;renderLb();document.getElementById('lightbox').classList.add('open');document.body.style.overflow='hidden';}
function renderLb(){
  const item=lbItems[lbIdx];if(!item)return;
  const title=item.dataset.title||'',desc=item.dataset.desc||'',type=item.dataset.type||'';
  const img=item.querySelector('img');
  const lbM=document.getElementById('lbMedia');
  if(img){lbM.innerHTML=`<img src="${img.src}" alt="${title}" loading="lazy">`;}
  else{const icon=item.querySelector('.ph-icon')?.textContent||'✦';lbM.innerHTML=`<div style="width:600px;max-width:90vw;height:340px;background:var(--surface2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:3rem;">${icon}</div>`;}
  const clientName = item.dataset.client ? `<span style="color:var(--gold);">${item.dataset.client}</span> — ` : '';
  document.getElementById('lbInfo').innerHTML=`<h3>${title}</h3><p>${clientName}${type}${desc?' — '+desc:''}</p>`;
  document.getElementById('lbCounter').textContent=`${lbIdx+1} / ${lbItems.length}`;
}
function closeLb(){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}
document.getElementById('lbClose').addEventListener('click',closeLb);
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target===document.getElementById('lightbox'))closeLb();});
document.getElementById('lbPrev').addEventListener('click',()=>{lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;renderLb();});
document.getElementById('lbNext').addEventListener('click',()=>{lbIdx=(lbIdx+1)%lbItems.length;renderLb();});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('open'))return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;renderLb();}
  if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%lbItems.length;renderLb();}
});
document.querySelectorAll('.port-item').forEach(item=>{
  item.addEventListener('click',()=>{
    buildLbItems();
    const activeItems=Array.from(document.querySelectorAll('.pillar-panel.active .port-item'));
    const idx=activeItems.indexOf(item);
    if(idx>-1)openLb(idx);
  });
});

/* REVEAL */
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* FORM */
function handleForm(e){e.preventDefault();const msg=document.getElementById('formMsg');msg.style.display='block';e.target.reset();setTimeout(()=>{msg.style.display='none';},5000);}

/* PILLAR BADGE LINKS */
document.querySelectorAll('.pillar-badge').forEach(b=>{
  b.addEventListener('click',e=>{
    const map={animation:'animation',film:'film',branding:'branding',games:'games'};
    const t=map[b.dataset.p];
    if(t){e.preventDefault();switchTab(t);document.getElementById('portfolio').scrollIntoView({behavior:'smooth'});}
  });
});
