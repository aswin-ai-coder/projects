(() => {
  'use strict';
  const DB='calm-calendar-attachments', STORE='files', META='calm-calendar:advanced:v2';
  const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
  const load=()=>{try{return JSON.parse(localStorage.getItem(META))||{events:{}}}catch{return {events:{}}}};
  const save=x=>localStorage.setItem(META,JSON.stringify(x));
  const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const bytes=n=>n<1024?`${n} B`:n<1048576?`${(n/1024).toFixed(1)} KB`:n<1073741824?`${(n/1048576).toFixed(1)} MB`:`${(n/1073741824).toFixed(1)} GB`;
  const toast=m=>{const t=document.querySelector('#toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._attachTimer);t._attachTimer=setTimeout(()=>t.classList.remove('show'),2200)};
  function db(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
  async function all(eventId){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>resolve(r.result.filter(x=>x.eventId===eventId));r.onerror=()=>reject(r.error)})}
  async function put(eventId,file){const d=await db(),id=uid();await new Promise((resolve,reject)=>{const tx=d.transaction(STORE,'readwrite');tx.objectStore(STORE).put({id,eventId,name:file.name,type:file.type,size:file.size,blob:file,createdAt:new Date().toISOString()});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});const m=load();m.events[eventId]={...(m.events[eventId]||{}),attachments:[...(m.events[eventId]?.attachments||[]),{id,name:file.name,type:file.type,size:file.size}]};save(m);toast('Attachment saved locally')}
  async function remove(id,eventId){const d=await db();await new Promise((resolve,reject)=>{const tx=d.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});const m=load();if(m.events[eventId])m.events[eventId].attachments=(m.events[eventId].attachments||[]).filter(x=>x.id!==id);save(m);toast('Attachment removed')}
  async function get(id){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction(STORE).objectStore(STORE).get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
  function download(f){const a=document.createElement('a');a.href=URL.createObjectURL(f.blob);a.download=f.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
  function inject(){
    const panel=document.querySelector('#advInspector'),form=panel?.querySelector('#advEventForm');if(!panel||!form||panel.querySelector('#calendarAttachments'))return;
    const title=panel.querySelector('h2')?.textContent||'';const state=(()=>{try{return JSON.parse(localStorage.getItem('calm-calendar:v1'))||{events:[]}}catch{return {events:[]}}})();
    const event=state.events.find(e=>e.title===title)||state.events.find(e=>e.title.startsWith(title+' ('))||null;if(!event)return;
    const section=document.createElement('div');section.id='calendarAttachments';section.className='adv-section';section.innerHTML=`<strong>Local attachments</strong><p class="adv-muted">Files stay in this browser's IndexedDB and are never uploaded.</p><input id="calendarAttachmentInput" type="file" multiple><div id="calendarAttachmentList" class="adv-list" style="margin-top:10px"></div>`;
    const actions=panel.querySelector('.adv-actions');actions?.before(section);const list=section.querySelector('#calendarAttachmentList');
    const render=async()=>{const files=await all(event.id);list.innerHTML=files.map(f=>`<div class="adv-list-item"><div class="grow"><strong>${esc(f.name)}</strong><small class="adv-muted">${bytes(f.size)}</small></div><button type="button" data-open-attachment="${esc(f.id)}">Open</button><button type="button" data-remove-attachment="${esc(f.id)}">Delete</button></div>`).join('')||'<p class="adv-muted">No attachments.</p>';list.querySelectorAll('[data-open-attachment]').forEach(b=>b.onclick=async()=>{const f=await get(b.dataset.openAttachment);if(f)download(f)});list.querySelectorAll('[data-remove-attachment]').forEach(b=>b.onclick=async()=>{await remove(b.dataset.removeAttachment,event.id);render()})};
    section.querySelector('#calendarAttachmentInput').onchange=async e=>{for(const f of [...e.target.files])await put(event.id,f);e.target.value='';render()};render();
  }
  const observer=new MutationObserver(inject);observer.observe(document.body,{childList:true,subtree:true});inject();
})();
