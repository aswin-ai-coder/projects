(() => {
'use strict';
const KEY='routinecraft:advanced:v1';
const $=s=>document.querySelector(s);
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}}
let adv=load();adv={notes:adv.notes||{},ratings:adv.ratings||{},snapshots:adv.snapshots||[]};
function save(){localStorage.setItem(KEY,JSON.stringify(adv))}
function rate(r){const runs=(window.Routinecraft?.state?.runs||[]).filter(x=>x.routineId===r.id&&x.status==='done');if(!runs.length)return 0;const vals=runs.slice(-12).map(x=>Math.min(1,(x.stepsCompleted||0)/Math.max(1,r.steps.length)));return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*100)}
function renderAdvanced(){const state=window.Routinecraft?.state;if(!state)return;const rs=state.routines.filter(r=>!r.archived);const weak=rs.filter(r=>rate(r)<60).sort((a,b)=>rate(a)-rate(b));const review=$('#weeklyReview');if(review&&weak.length){const existing=review.querySelector('.advanced-tip');if(!existing){const div=document.createElement('div');div.className='advanced-tip';div.innerHTML=`<hr><b>Routine health</b><p class="muted">${esc(weak[0].name)} is currently your lowest-consistency routine at ${rate(weak[0])}%. Consider shortening it or reducing its frequency.</p><button class="ghost" data-adv-edit="${weak[0].id}">Tune this routine</button>`;review.appendChild(div)}}document.querySelectorAll('[data-adv-edit]').forEach(b=>{b.onclick=()=>{const id=b.dataset.advEdit;document.querySelector('[data-edit="'+id+'"]')?.click()}})}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function snapshot(){const state=window.Routinecraft?.state;if(!state)return;adv.snapshots.unshift({at:new Date().toISOString(),data:state});adv.snapshots=adv.snapshots.slice(0,10);save();toastAdv('Snapshot saved locally')}
function toastAdv(m){const t=document.querySelector('#toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function exportAdvanced(){const state=window.Routinecraft?.state;if(!state)return;const payload={app:'Routinecraft',version:1,exportedAt:new Date().toISOString(),state,advanced:adv};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.download='routinecraft-full-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function inject(){const settings=document.querySelector('#settings .grid.two');if(settings&&!document.querySelector('#advancedPanel')){const article=document.createElement('article');article.className='card';article.id='advancedPanel';article.innerHTML='<h2>Advanced controls</h2><p class="muted">Keep restore points and inspect your routine system without sending data anywhere.</p><div class="button-row"><button id="snapshotBtn">Save snapshot</button><button id="advancedExport">Full backup</button></div><p class="muted" id="snapshotStatus"></p>';settings.appendChild(article);$('#snapshotBtn').onclick=snapshot;$('#advancedExport').onclick=exportAdvanced}const status=$('#snapshotStatus');if(status)status.textContent=`${adv.snapshots.length} local snapshot${adv.snapshots.length===1?'':'s'} retained`}
const oldRender=window.Routinecraft?.render;
if(oldRender){const original=oldRender;window.Routinecraft.render=()=>{original();setTimeout(()=>{inject();renderAdvanced()},0)}}
window.addEventListener('load',()=>setTimeout(()=>{inject();renderAdvanced()},150));
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='s'){e.preventDefault();snapshot()}});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();