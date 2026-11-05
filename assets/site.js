/* LetoutAI: Match Wire. No dependencies. */
(()=>{
'use strict';
const d=document,w=window,html=d.documentElement;
const R=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DK=w.matchMedia('(min-width:1024px)');
const $=(s,r=d)=>r.querySelector(s),$$=(s,r=d)=>[...r.querySelectorAll(s)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const fmt=n=>Math.round(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/\b(Rs|Bed) (?=\d)/g,'$1&nbsp;');
const svg=(vb,p,c)=>`<svg viewBox="${vb}" aria-hidden="true"${c?` class="${c}"`:''}>${p}</svg>`;
const S2='fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
const IC={
back:'<path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z" fill="currentColor"/>',
vid:`<path d="M16 10.5V7.5a1.5 1.5 0 0 0-1.5-1.5h-10A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h10a1.5 1.5 0 0 0 1.5-1.5v-3l5 3.5V7z" ${S2}/>`,
call:`<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" ${S2}/>`,
more:'<circle cx="12" cy="5" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="19" r="1.8" fill="currentColor"/>',
emo:`<circle cx="12" cy="12" r="9" ${S2}/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" ${S2}/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/>`,
clip:`<path d="m16.5 6.5-8.1 8.1a2 2 0 0 0 2.8 2.8l8.1-8.1a4 4 0 0 0-5.6-5.6l-8.4 8.4a6 6 0 0 0 8.5 8.5l6-6" ${S2}/>`,
cam:`<path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" ${S2}/><circle cx="12" cy="13" r="3.5" ${S2}/>`,
mic:'<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
sys:'<path d="M1 10h2V7H1zm4 0h2V5H5zm4 0h2V3H9zm4 0h2V1h-2z" fill="currentColor"/><path d="M19 4.6a7 7 0 0 1 10 0M21 6.9a4 4 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="24" cy="9.2" r="1.1" fill="currentColor"/><rect x="32" y="1.5" width="10" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="33.6" y="3.1" width="6.2" height="4.8" rx="1" fill="currentColor"/>',
tk:'<path d="M11.07.65 4.9 7.6 2.2 5.07 1.1 6.24l3.86 3.6 7.28-8.14zM15.1.65 8.93 7.6l-.94-.88-1.1 1.17 2.1 1.96L16.27 1.7z"/>',
ok:'<circle cx="12" cy="12" r="11" fill="#2BB683"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
rp:'<path d="M10 7.5 5 12l5 4.5M5 12h9a5 5 0 0 1 5 5v1.5"/>',
pin:'<path d="M13 1C6.4 1 1 6.2 1 12.8 1 21.6 13 33 13 33s12-11.4 12-20.2C25 6.2 19.6 1 13 1z" fill="#E2513F" stroke="#fff" stroke-width="1.5"/><circle cx="13" cy="12.5" r="4.5" fill="#fff"/>'
};
const room=(wl,bd,bl)=>svg('0 0 160 100',`<rect width="160" height="100" fill="${wl}"/><rect y="70" width="160" height="30" fill="#C8AE86"/><path d="M0 70h160" stroke="#B39A72"/><rect x="104" y="14" width="40" height="34" rx="2" fill="#CFE9F2" stroke="#fff" stroke-width="3"/><path d="M124 14v34M104 31h40" stroke="#fff" stroke-width="2"/><path d="M104 48 84 70h52l8-22z" fill="#fff" opacity=".22"/><rect x="20" y="14" width="44" height="11" rx="2.5" fill="#fff" stroke="#D5DBD8"/><path d="M26 21.5h32" stroke="#C9D2CE"/><rect x="10" y="40" width="5" height="36" rx="2" fill="${bd}"/><rect x="10" y="56" width="78" height="20" rx="3" fill="${bd}"/><rect x="12" y="50" width="74" height="11" rx="3" fill="#fff"/><rect x="16" y="44" width="20" height="9" rx="3.5" fill="#F4EFE5"/><rect x="42" y="50" width="44" height="13" rx="2.5" fill="${bl}"/><rect x="128" y="58" width="22" height="18" rx="2" fill="#8C6E4E"/><path d="M130 64h18" stroke="#6E5338"/>`);

/* the two conversations: [kind, content, time, tapped button] */
const TH={
tenant:[
['o','Hi, PG for girls near Powai? Budget around 20k, joining 1 Dec','10:41'],
['i',"Hi, I'm Sally, the AI assistant for these PGs. Just you, or with a friend? And do you need a veg kitchen?",'10:41'],
['o','just me. veg preferred, ok with anything','10:42'],
['room',{n:'Hiranandani Gardens, Powai',p:'Rs 20,000/month, all-in',d:'Food, electricity, AC and upkeep included. 2-sharing, 2 beds left.',r:'House rules: girls only, veg kitchen, no overnight guests, one month notice.',ph:'Photo 2 Nov',c:['#EADFCB','#4F6F61','#8CC2AE']},'10:42'],
['room',{n:'Marol, near Metro',p:'Rs 15,000/month, all-in',d:'Food, electricity, AC and upkeep included. 3-sharing, 1 bed left.',r:'House rules: girls only, any food, one month notice.',ph:'Photo 1 Nov',c:['#DCE6E1','#6B5A49','#F2B866']},'10:42'],
['o','first one looks good. can I visit this weekend?','10:43'],
['btn',{t:'Pick a slot to see the bed at Hiranandani Gardens.',b:['Sat 11:00','Sun 16:00','Another time']},'10:43'],
['o','Sat 11:00','10:43',0],
['ok',{h:'Visit booked',t:'Saturday 11:00 at Hiranandani Gardens. The house manager meets you at the gate.'},'10:43'],
['loc',{n:'Hiranandani Gardens',a:'Powai, Mumbai 400076'},'10:43'],
['btn',{t:"I'll remind you Saturday morning. You pay nothing until you have seen the bed.",b:['Talk to the manager']},'10:44']
],
operator:[
['i',"New inquiry for Hiranandani Gardens: girls' flat, budget Rs 20,000, joining 1 Dec. I sent the room, price and house rules.",'10:40'],
['card',{h:'Approve this reply?',to:'To +91 98xxx xxx21',t:'Saturday 11:00 confirmed at Hiranandani Gardens. The house manager meets you at the gate.',b:['Approve','Edit','Hold']},'10:41'],
['o','Approve','10:42',0],
['i','Sent 10:42. Visit booked for Saturday 11:00.','10:42'],
['day','Saturday'],
['i','Visit done. Token received for Bed 3.','12:10'],
['doc',{n:'Agreement.pdf',s:'Signed by tenant'},'12:40'],
['ok',{h:'Bed filled',t:'Bed 3, Hiranandani Gardens: agreement signed, move-in 1 Dec.'},'12:41'],
['day','Sunday'],
['rep',{h:'Monthly report',s:'Hiranandani Gardens, October',l:[['Beds filled','6 of 8'],['Rent collected','Rs 1,20,000'],['Expenses','Rs 70,000'],['Net','Rs 50,000']]},'09:00']
]};
/* the operators page: one excerpt for each job Sally runs */
{const O=TH.operator;TH.ops=[O[0],O[5],O[6],['i','Saved against Bed 3, Hiranandani Gardens. I will send the renewal when it is due.','12:40'],['rep',{h:'Daily summary',s:'Hiranandani Gardens',l:[['Rent reminders sent to tenants'],['Visit reminder sent for Sat 11:00'],['Renewal notice sent for Bed 2']]},'20:00'],O[9]]}
const HEAD={tenant:'Today',operator:'Thursday'};

function el(m,prev){
const [k,v,t]=m,e=d.createElement('div');
if(k==='day'){e.className='wa-day';e.textContent=v;return e}
const side=k==='o'?'o':'i',ps=prev&&prev[0]!=='day'?(prev[0]==='o'?'o':'i'):'';
e.className='m '+side+(ps!==side?' tl':'');
const tm=`<span class="t">${t}${side==='o'?svg('0 0 16 11',IC.tk):''}</span>`;
if(k==='o'||k==='i')e.innerHTML=esc(v)+tm;
else if(k==='room'){e.classList.add('img');e.innerHTML=`<div class="pic">${room(...v.c)}<span class="ds">${v.ph}</span></div><div class="cap"><b>${esc(v.n)}</b><b>${esc(v.p)}</b>${esc(v.d)}<span class="ru">${esc(v.r)}</span>${tm}</div>`}
else if(k==='btn'||k==='card')e.innerHTML=(v.h?`<span class="card-h">${esc(v.h)}</span>`:'')+(v.to?`<span class="card-to">${esc(v.to)}</span>`:'')+esc(v.t)+tm+`<div class="rb">${v.b.map(b=>`<span>${svg('0 0 24 24',IC.rp)}${esc(b)}</span>`).join('')}</div>`;
else if(k==='ok')e.innerHTML=`<span class="ok-h">${svg('0 0 24 24',IC.ok)}${esc(v.h)}</span>${esc(v.t)}${tm}`;
else if(k==='loc'){e.classList.add('loc');e.innerHTML=`<div class="map">${svg('0 0 26 34',IC.pin)}</div><div class="cap"><b>${esc(v.n)}</b>${esc(v.a)}${tm}</div>`}
else if(k==='doc')e.innerHTML=`<div class="doc"><span class="pdf">PDF</span><span><b>${esc(v.n)}</b><small>${esc(v.s)}</small></span></div>${tm}`;
else if(k==='rep'){e.classList.add('rp');const tab=v.l.every(r=>r.length>1);e.innerHTML=`<span class="rep-h">${esc(v.h)}</span>${v.s?`<span class="rep-s">${esc(v.s)}</span>`:''}<span class="rep${tab?' tab':''}">${v.l.map(r=>r.length>1?`<span><span>${esc(r[0])}</span><b>${esc(r[1])}</b></span>`:`<span class="one">${svg('0 0 24 24',IC.ok)}${esc(r[0])}</span>`).join('')}</span>${tm}`}
return e;
}
function phone(box,p){
box.innerHTML=`<div class="screen"><div class="wa-sb"><span>10:41</span>${svg('0 0 44 11',IC.sys)}</div><div class="wa-hd">${svg('0 0 24 24',IC.back)}<span class="wa-av">S</span><span class="wa-who"><b>Sally</b><small>online</small></span>${svg('0 0 24 24',IC.vid,'ic')}${svg('0 0 24 24',IC.call,'ic')}${svg('0 0 24 24',IC.more,'ic')}</div><div class="wa-bd"><div class="wa-th"></div></div><div class="wa-in"><span class="wa-f">${svg('0 0 24 24',IC.emo)}<span>Message</span>${svg('0 0 24 24',IC.clip)}${svg('0 0 24 24',IC.cam)}</span><span class="wa-mic">${svg('0 0 24 24',IC.mic)}</span></div></div>`;
return {box,th:$('.wa-th',box),sub:$('.wa-who small',box),p,n:-2,run:0,done:false};
}
function head(P){P.th.innerHTML=`<div class="wa-day">${HEAD[P.p]}</div><div class="wa-e2e">This business uses a secure service from Meta to manage this chat.</div>`;P.n=-1;P.th.dataset.p=P.p}
function hl(P,i){$$('.hl',P.th).forEach(x=>x.classList.remove('hl'));const e=i>=0&&P.th.children[i+2];e&&e.classList.add('hl')}
function show(P,n,anim){
const L=TH[P.p];n=Math.min(n,L.length-1);
const ty=$('.ty',P.th);ty&&ty.remove();
const rs=P.n<-1||n<P.n||P.th.dataset.p!==P.p;if(rs)head(P);
for(let i=P.n+1;i<=n;i++){const e=el(L[i],L[i-1]);anim&&!rs&&e.classList.add("nw");P.th.appendChild(e);
if(L[i][3]!==undefined){const rb=$$('.rb',P.th).pop();rb&&rb.children[L[i][3]].classList.add('tap')}}
P.n=n;hl(P,-1);P.cb&&P.cb(n);
}
function typing(P,on){
const x=$('.ty',P.th);
if(on&&!x){const e=d.createElement('div'),L=TH[P.p],last=L[P.n];e.className='m i ty nw'+(!last||last[0]==='o'||last[0]==='day'?' tl':'');e.innerHTML='<i></i><i></i><i></i>';P.th.appendChild(e)}
if(!on&&x)x.remove();
P.sub.textContent=on?'typing…':'online';
}
async function play(P){
const id=++P.run,L=TH[P.p];P.done=false;typing(P,false);P.n=-2;show(P,-1);
for(let i=0;i<L.length;i++){
const k=L[i][0];
if(k==='o')await wait(i?560:420);
else if(k==='day')await wait(480);
else{await wait(240);if(id!==P.run)return;typing(P,true);await wait(k==='i'?620:760);if(id!==P.run)return;typing(P,false)}
if(id!==P.run)return;show(P,i,true);
}
P.done=true;
}
const plain=([k,v])=>typeof v==='string'?v:[v.h,v.to,v.n,v.p,v.d,v.r,v.t,v.a,v.s,v.l&&v.l.map(r=>r.join(': ')).join('. '),v.b&&('Buttons: '+v.b.join(', '))].filter(Boolean).join('. ');
function transcript(box,keys){
const s=d.createElement('div');s.className='sr-only';
s.innerHTML=keys.map(p=>`<p>${p==='tenant'?'Chat between a tenant and Sally':'Chat between an operator and Sally'}</p><ol>${TH[p].filter(m=>m[0]!=='day').map(m=>`<li>${m[0]==='o'?(p==='tenant'?'Tenant':'Operator'):'Sally'}: ${esc(plain(m))}</li>`).join('')}</ol>`).join('');
box.closest('.stage').appendChild(s);
}

/* ---------- page behaviour ---------- */
const IO=(cb,o)=>'IntersectionObserver' in w?new IntersectionObserver(cb,o):null;
const nav=$('.nav');
if(nav){const ns=()=>nav.classList.toggle('solid',scrollY>40);addEventListener('scroll',ns,{passive:true});ns()}

function seg(el,cb){
const bs=$$('button',el);
const set=(i,f)=>{bs.forEach((b,j)=>{b.setAttribute('aria-checked',j===i);b.tabIndex=j===i?0:-1});el.style.setProperty('--k',i);f&&bs[i].focus();cb(bs[i].dataset.p)};
bs.forEach((b,i)=>{b.addEventListener('click',()=>set(i));b.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(k){e.preventDefault();set((i+k+bs.length)%bs.length,1)}})});
}

/* chip lanes: demand meets supply at the phone (desktop only) */
function lanes(ph){
const L=$('.lanes');if(!L||R||!L.animate)return;
const mq=DK;
const D=['PG near Marol? 1 Dec','2 beds for girls, Powai','Veg kitchen? AC?','Can I visit Saturday?'],S=['Bed free in Marol, 1 Dec','2-sharing AC, Powai',"Girls' flat, veg kitchen",'Visit slots Sat and Sun'];
let k=1,tm=0,seen=true;
const mk=(ln,t)=>{const e=d.createElement('span');e.className='chip '+ln[0];e.textContent=t;$('.lane.'+ln,L).appendChild(e);return e};
const fly=(e,a,b,ms,ez,out)=>e.animate([{transform:`translate3d(${a|0}px,0,0)`,opacity:1},{transform:`translate3d(${b|0}px,0,0)`,opacity:out?0:1}],{duration:ms,easing:ez||'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
const IN='cubic-bezier(.64,0,.78,0)';
const cyc=()=>{
const lr=L.getBoundingClientRect(),q=ph.getBoundingClientRect(),W=lr.width,pl=q.left-lr.left,pr=q.right-lr.left,pc=(pl+pr)/2;
const a=mk('d',D[k]),b=mk('s',S[k]),aw=a.offsetWidth,bw=b.offsetWidth,ax=pl-aw-18,bx=Math.min(pr+18,W-bw*.6);
fly(a,-aw-24,ax,2700);fly(b,W+24,bx,2700);
setTimeout(()=>{a.classList.add('hit');b.classList.add('hit')},2450);
setTimeout(()=>{fly(a,ax,pc-aw/2,950,IN,1);fly(b,bx,pc-bw/2,950,IN,1)},3300);
setTimeout(()=>{a.remove();b.remove()},4400);
const x=mk('d2',D[(k+2)%4]),y=mk('s2',S[(k+3)%4]);
fly(x,-x.offsetWidth-24,W+24,8400,'linear').onfinish=()=>x.remove();
fly(y,W+24,-y.offsetWidth-24,9200,'linear').onfinish=()=>y.remove();
k=(k+1)%4;
};
const tick=()=>{cyc();tm=setTimeout(tick,6200)};
const run=()=>{const on=mq.matches&&seen&&!d.hidden;if(on&&!tm)tick();else if(!on&&tm){clearTimeout(tm);tm=0;$$('.chip',L).forEach(c=>c.remove())}};
const o=IO(([e])=>{seen=e.isIntersecting;run()});o&&o.observe(L);
mq.addEventListener&&mq.addEventListener('change',run);d.addEventListener('visibilitychange',run);run();
}

/* pointer depth: lanes, phone, foreground chips, light */
function depth(st){
if(R||!w.matchMedia('(pointer:fine)').matches)return;
const sky=$('.sky');let f=0,mx=.5,my=.5;
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX/innerWidth;my=e.clientY/innerHeight;
f||(f=requestAnimationFrame(()=>{f=0;const s=st.style,x=mx-.5,y=my-.5;s.setProperty('--px',x.toFixed(3));s.setProperty('--py',y.toFixed(3));s.setProperty('--ry',(x*8).toFixed(2)+'deg');s.setProperty('--rx',(-y*5).toFixed(2)+'deg');
if(sky){sky.style.setProperty('--x',(mx*100).toFixed(1)+'%');sky.style.setProperty('--y',(my*100).toFixed(1)+'%')}}))},{passive:true});
}

/* the story. 1024 and up: one pinned phone, the steps scrub it. Under 1024: the phone loops its replay
   and scrolls away, and each step card carries its own static excerpt of the chat. */
/* a static excerpt of a thread: the messages at the listed indexes; a tapped button stays marked */
function excerpt(c,L,xs){if(!L)return;xs.split(',').map(Number).forEach((i,j,a)=>{c.appendChild(el(L[i],j?L[a[j-1]]:null));const t=L[i][3];if(t!==undefined){const rb=$$('.rb',c).pop();rb&&rb.children[t]&&rb.children[t].classList.add('tap')}})}
$$('[data-th][data-x]').forEach(x=>{const c=$('.wa-th',x);c&&excerpt(c,TH[x.dataset.th],x.dataset.x)});

const story=$('.story');
if(story){
const box=$('.phone[data-thread]',story),P=phone(box,'tenant');transcript(box,['tenant','operator']);
$$('.step[data-x]',story).forEach(s=>{const c=$('.xc .wa-th',s);c&&excerpt(c,TH[s.parentNode.dataset.side],s.dataset.x)});
let act=-1,seen=true,so=null;
const vis=()=>$$('.steps:not([hidden]) .step',story),num=$('.stp b',story),tot=$('.stp span',story);
P.cb=n=>{if(!num)return;const u=vis().map(s=>+s.dataset.upto),k=u.findIndex(x=>x>=n);num.textContent=k<0?u.length:k+1;if(tot)tot.textContent=u.length};
const mark=i=>{const ss=vis();ss.forEach((x,j)=>{x.classList.toggle('on',j===i);x.classList.toggle('past',j<i)});const ol=ss[0]&&ss[0].parentNode,n=i>-1&&$('.n',ss[i]);ol&&ol.style.setProperty('--fill',n?Math.max(0,n.getBoundingClientRect().top-ol.getBoundingClientRect().top+.5).toFixed(1)+'px':'0px')};
const go=(i,anim)=>{const s=vis()[i];if(!s)return;act=i;P.run++;typing(P,false);mark(i);show(P,+s.dataset.upto,anim&&!R)};
const full=()=>{P.run++;typing(P,false);show(P,99)};
const loop=async()=>{for(;;){await play(P);if(!P.done)return;const r=P.run;await wait(3600);while(P.run===r&&!seen)await wait(700);if(P.run!==r||DK.matches)return}};
const run=()=>R?full():DK.matches?play(P):loop();
const vo=IO(([e])=>{seen=e.isIntersecting},{threshold:.2});vo&&vo.observe(box);
run();
const watch=()=>{so&&so.disconnect();so=null;if(!DK.matches)return;so=IO(es=>es.forEach(e=>{if(!e.isIntersecting)return;const i=vis().indexOf(e.target);if(i>-1&&i!==act)go(i,true)}),{rootMargin:'-42% 0px -50% 0px'});so&&$$('.step',story).forEach(s=>so.observe(s))};
watch();DK.addEventListener&&DK.addEventListener('change',()=>{watch();if(!DK.matches){act=-1;mark(-1);run()}});
$$('.step',story).forEach(s=>s.addEventListener('mouseenter',()=>{if(!DK.matches)return;const i=vis().indexOf(s);if(i<0)return;if(i!==act)go(i,true);hl(P,+s.dataset.upto)}));
const hero=$('.hero',story),ho=IO(([e])=>{if(e.isIntersecting&&act>-1){act=-1;mark(-1);full()}},{threshold:.6});
ho&&hero&&ho.observe(hero);
const sg=$('.seg',story);
sg&&seg(sg,p=>{const i=act;box.classList.add('fade');P.run++;setTimeout(()=>{P.p=p;typing(P,false);$$('[data-side]',story).forEach(x=>x.hidden=x.dataset.side!==p);box.classList.remove('fade');if(i>-1&&DK.matches){act=-1;go(Math.min(i,vis().length-1),false)}else{act=-1;mark(-1);run()}},R?0:300)});
lanes(box);depth(story);
}

/* sub-page phones play when seen; under 1024 they keep replaying */
$$('.phone[data-play]').forEach(box=>{const P=phone(box,box.dataset.play);transcript(box,[P.p]);
if(R){show(P,99);return}show(P,-1);
const go=async()=>{for(;;){await play(P);if(!P.done||DK.matches)return;await wait(3600)}};
const o=IO(([e])=>{if(e.isIntersecting){o.unobserve(box);go()}},{threshold:.35});o?o.observe(box):go()});

/* living sky: raw WebGL simplex aurora, CSS aurora as fallback */
const FS=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;uniform float t;
vec3 m3(vec3 x){return x-floor(x/289.)*289.;}
vec3 pm(vec3 x){return m3((x*34.+1.)*x);}
float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=i-floor(i/289.)*289.;
vec3 p=pm(pm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 a0=x-floor(x+.5);
m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
vec3 g=vec3(a0.x*x0.x+h.x*x0.y,a0.yz*x12.xz+h.yz*x12.yw);return 130.*dot(m,g);}
float fo(vec2 u,vec2 c,float a,float b){return 1.-smoothstep(a,b,distance(u,c));}
void main(){vec2 u=gl_FragCoord.xy/r;vec2 p=u*vec2(r.x/r.y,1.);float T=t*.045;
float a=sn(p*.9+vec2(T,-T*.5));float b=sn(p*1.4+vec2(-T*.7,T*.4)+a*.45);float s=sn(p*2.2+vec2(T*.3,T*.8));
float fa=smoothstep(-.25,.9,a)*fo(u,vec2(.18,.92),.05,1.15);
float fb=smoothstep(-.15,.95,b)*fo(u,vec2(.9,.6),.05,1.);
float fs=smoothstep(.3,.95,s)*fo(u,vec2(.6,.02),0.,.7);
vec3 c=vec3(.024,.071,.055)+vec3(.055,.486,.357)*fa*.6+vec3(.122,.541,.541)*fb*.42+vec3(.949,.639,.227)*fs*.2;
c+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;
gl_FragColor=vec4(c,1.);}`;
(()=>{
const s=$('.sky');if(!s)return;
const c=$('canvas',s);let seen=true,on=true,raf=0,g=null,ut=null;const t0=performance.now()-24e3;
const draw=t=>{raf=0;if(!on||!g)return;g.uniform1f(ut,(t-t0)/1e3);g.drawArrays(g.TRIANGLES,0,3);raf=requestAnimationFrame(draw)};
const set=()=>{on=seen&&!d.hidden;s.classList.toggle('off',!on);if(on&&g&&!raf)raf=requestAnimationFrame(draw)};
const o=IO(([e])=>{seen=e.isIntersecting;set()});o&&o.observe(s.parentNode);d.addEventListener('visibilitychange',set);
if(R||!c)return;
try{g=c.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'})}catch(e){g=null}
if(!g)return;
const sh=(t,src)=>{const x=g.createShader(t);g.shaderSource(x,src);g.compileShader(x);return g.getShaderParameter(x,g.COMPILE_STATUS)?x:null};
const v=sh(g.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'),f=sh(g.FRAGMENT_SHADER,FS),pg=g.createProgram();
if(!v||!f){g=null;return}
g.attachShader(pg,v);g.attachShader(pg,f);g.linkProgram(pg);if(!g.getProgramParameter(pg,g.LINK_STATUS)){g=null;return}
g.useProgram(pg);g.bindBuffer(g.ARRAY_BUFFER,g.createBuffer());g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),g.STATIC_DRAW);
const ap=g.getAttribLocation(pg,'p');g.enableVertexAttribArray(ap);g.vertexAttribPointer(ap,2,g.FLOAT,false,0,0);
const ur=g.getUniformLocation(pg,'r');ut=g.getUniformLocation(pg,'t');
const size=()=>{const k=Math.min(w.devicePixelRatio||1,2)*.5;c.width=Math.max(1,c.clientWidth*k|0);c.height=Math.max(1,c.clientHeight*k|0);g&&(g.viewport(0,0,c.width,c.height),g.uniform2f(ur,c.width,c.height))};
size();addEventListener('resize',size,{passive:true});
c.addEventListener('webglcontextlost',e=>{e.preventDefault();s.classList.remove('gl');g=null});
s.classList.add('gl');set();
})();

/* proof numerals count up once */
const cu=$$('[data-to]');
if(cu.length&&!R){const o=IO(es=>es.forEach(e=>{if(!e.isIntersecting)return;o.unobserve(e.target);const b=e.target,to=+b.dataset.to,t0=performance.now(),f=t=>{const k=Math.min(1,(t-t0)/1100);b.textContent=fmt(to*(1-Math.pow(1-k,5)));k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
if(o)cu.forEach(b=>{b.textContent='0';o.observe(b)})}

/* empty-bed calculator */
const rent=$('#rent'),days=$('#days');
if(rent&&days){const o=rent.closest('.calc'),ro=$('output[for=rent]',o),dd=$('output[for=days]',o);
const pc=i=>i.style.setProperty('--p',(i.value-i.min)/(i.max-i.min)*100+'%');
const up=()=>{const r=+rent.value,n=+days.value,l=r/30*n,s=Math.round(960000/r)/10;
ro.textContent='Rs '+fmt(r);dd.textContent=n+(n>1?' days':' day');
$('.math',o).textContent=`Rs ${fmt(r)} ÷ 30 × ${n} = Rs ${fmt(l)}`;$('.lost',o).textContent='Rs '+fmt(l);
$('.pay',o).textContent=`That is ${s} days of this bed\u2019s rent.`;pc(rent);pc(days)};
rent.addEventListener('input',up);days.addEventListener('input',up);up()}

/* faq */
$$('.qa button').forEach(b=>b.addEventListener('click',()=>{const q=b.closest('.qa'),op=!q.classList.contains('open');q.classList.toggle('open',op);b.setAttribute('aria-expanded',op)}));

/* approval card */
const AP={ok:['Sent 10:42','<path d="m5 12.5 4.2 4.2L19 7" '+S2+'/>'],edit:['Sally redrafts it for you','<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" '+S2+'/>'],hold:['On hold. Sally waits.','<path d="M9 5v14M15 5v14" '+S2+'/>']};
$$('.appr').forEach(c=>{const st=$('.appr-s span',c),rs=$('.appr-s button',c);
$$('.appr-a button',c).forEach(b=>b.addEventListener('click',()=>{const a=AP[b.dataset.a];c.dataset.state=b.dataset.a;c.classList.add('done');st.innerHTML=svg('0 0 24 24',a[1])+esc(a[0]);rs.focus()}));
rs.addEventListener('click',()=>{c.classList.remove('done');delete c.dataset.state;$('.appr-a button',c).focus()})});

/* reveals and coverage bars */
const rv=$$('.rv,.cov'),ro=IO(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.1});
rv.forEach(e=>ro?ro.observe(e):e.classList.add('in'));
})();
