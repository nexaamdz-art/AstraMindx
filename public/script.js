(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const html=document.documentElement,langBtn=$('#langSwitch'),menuBtn=$('#menuToggle'),nav=$('#mainNav');
let lang='en';
const words={en:['Think','Learn','Innovate'],ar:['فكّر','تعلّم','ابتكر']};
function setLang(n){lang=n;html.lang=n;html.dir=n==='ar'?'rtl':'ltr';
$$('[data-en][data-ar]').forEach(e=>e.innerHTML=e.dataset[n]);
$$('[data-placeholder-en]').forEach(e=>e.placeholder=n==='en'?e.dataset.placeholderEn:e.dataset.placeholderAr);
langBtn.textContent=n==='en'?'عربي':'English';wi=0;ci=0;del=false}
langBtn.onclick=()=>setLang(lang==='en'?'ar':'en');
menuBtn.onclick=()=>{const o=nav.classList.toggle('open');menuBtn.textContent=o?'×':'☰'};
$$('#mainNav a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menuBtn.textContent='☰'});
// letters
const h1=$('#title');h1.innerHTML=[...h1.textContent].map((c,i)=>`<span style="animation-delay:${.3+i*.07}s">${c}</span>`).join('');
// typing
let wi=0,ci=0,del=false;const typed=$('#typed');
(function type(){const w=words[lang][wi];typed.textContent=w.slice(0,ci);
if(!del&&ci===w.length){del=true;return setTimeout(type,1200)}
if(del&&ci===0){del=false;wi=(wi+1)%3}
ci+=del?-1:1;setTimeout(type,del?60:120)})();
// config
const cfg=window.ASTRAMIND_CONFIG||{};const em=$('#contactEmail');
if(em&&cfg.email){em.href='mailto:'+cfg.email;em.textContent=cfg.email}
$$('[data-social]').forEach(l=>{const d=cfg.social&&cfg.social[l.dataset.social];if(d)l.href=d;l.target='_blank';l.rel='noopener noreferrer'});
// reveal + counters + nav active
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
const b=e.target.querySelector('[data-count]');if(b)count(b);io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach(e=>io.observe(e));
function count(b){const to=+b.dataset.count,s=b.dataset.suffix||'';let t0=null;
const f=t=>{t0??=t;const p=Math.min((t-t0)/1800,1);b.textContent=Math.round(to*(1-Math.pow(1-p,4)))+s;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
const secs=$$('main section[id]');
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#mainNav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -50% 0px'}).observe&&secs.forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#mainNav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+s.id))}),{rootMargin:'-40% 0px -50% 0px'}).observe(s));
// progress + cursor
addEventListener('scroll',()=>{$('#progress').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});
const cur=$('#cursor');let mx=innerWidth/2,my=innerHeight/2;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px)`});
// tilt + glow
$$('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');
el.style.transform=`perspective(800px) rotateY(${(x-.5)*18}deg) rotateX(${(.5-y)*18}deg) scale(1.04)`});
el.addEventListener('pointerleave',()=>el.style.transform='')});
// magnetic + ripple
$$('.magnetic').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();
b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});
b.addEventListener('pointerleave',()=>b.style.translate='')});
document.addEventListener('click',e=>{const b=e.target.closest('.btn,.contact-button,.register-btn,.language');if(!b)return;
const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');sp.className='ripple';
sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),700)});
// parallax blobs
addEventListener('scroll',()=>{const y=scrollY;$$('.blob').forEach((b,i)=>b.style.marginTop=(y*(.08+i*.05))+'px')},{passive:true});
// constellation canvas
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,P=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(110,W/12|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.8+.4}))}
size();addEventListener('resize',size);
(function draw(){cx.clearRect(0,0,W,H);
for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<140){p.x+=dx/d*2;p.y+=dy/d*2}
cx.fillStyle='rgba(160,200,255,.8)';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill()}
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);
if(d<120){cx.strokeStyle=`rgba(91,140,255,${.25*(1-d/120)})`;cx.beginPath();cx.moveTo(P[i].x,P[i].y);cx.lineTo(P[j].x,P[j].y);cx.stroke()}}
for(const p of P){const d=Math.hypot(p.x-mx,p.y-my);if(d<170){cx.strokeStyle=`rgba(34,211,238,${.5*(1-d/170)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(mx,my);cx.stroke()}}
requestAnimationFrame(draw)})();
// form demo (local only)
const form=$('#membershipForm'),st=$('#formStatus');
if(form&&(location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname)))form.addEventListener('submit',e=>{e.preventDefault();
st.textContent=lang==='ar'?'تم حفظ طلب تجريبي فقط. اربط الموقع بخدمة نماذج لاستقباله فعلياً.':'Demo only. Connect a form service (e.g. Netlify) to receive real requests.';st.classList.add('is-success');form.reset()});
})();
