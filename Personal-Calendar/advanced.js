(() => {
  'use strict';
  const KEY='calm-calendar:v1';
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{calendars:[],events:[]}}catch{return {calendars:[],events:[]}}};
  const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
  const pad=n=>String(n).padStart(2,'0');
  const parseDate=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
  const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const mins=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
  const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
  function toast(msg){const t=document.querySelector('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2200)}
  function parseQuick(text){
    let raw=text.trim(), date=new Date(), allDay=false, start='09:00', end='10:00';
    if(/\btomorrow\b/i.test(raw)){date.setDate(date.getDate()+1);raw=raw.replace(/\btomorrow\b/i,'')}
    else if(/\btoday\b/i.test(raw))raw=raw.replace(/\btoday\b/i,'');
    else {const dm=raw.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);if(dm){date=new Date(Number(dm[1]),Number(dm[2])-1,Number(dm[3]));raw=raw.replace(dm[0],'')}}
    const tm=raw.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
    if(tm&&tm[0].length<10){let h=Number(tm[1]),m=Number(tm[2]||0),ap=(tm[3]||'').toLowerCase();if(ap==='pm'&&h<12)h+=12;if(ap==='am'&&h===12)h=0;start=`${pad(h)}:${pad(m)}`;const dur=raw.match(/\b(\d+)\s*(m|min|mins|h|hr|hrs|hour|hours)\b/i);let dmns=60;if(dur){dmns=/h|hr|hour/i.test(dur[2])?Number(dur[1])*60:Number(dur[1])}let total=h*60+m+dmns;end=`${pad(Math.floor(total/60)%24)}:${pad(total%60)}`;raw=raw.replace(tm[0],'').replace(dur?dur[0]:'','')}
    if(/\ball[- ]?day\b/i.test(raw)){allDay=true;raw=raw.replace(/\ball[- ]?day\b/i,'')}
    const title=raw.replace(/\s+/g,' ').trim()||'New event';
    return {title,date:iso(date),start,end,allDay};
  }
  function quickCapture(){const text=prompt('Quick add event — e.g. “Study tomorrow 4pm 90 mins”');if(!text)return;const q=parseQuick(text),s=load();const cal=s.calendars.find(c=>c.visible!==false)||s.calendars[0];s.events.push({id:uid(),title:q.title,date:q.date,start:q.allDay?'':q.start,end:q.allDay?'':q.end,allDay:q.allDay,calendarId:cal?.id||'personal',color:'auto',repeat:'none',repeatUntil:'',location:'',reminder:15,attendees:'',notes:'',exdates:[]});save(s);location.reload()}
  function addQuickButton(){const actions=document.querySelector('.top-actions');if(!actions||document.querySelector('#quickCaptureBtn'))return;const b=document.createElement('button');b.id='quickCaptureBtn';b.textContent='Quick add';b.title='Natural-language event capture';b.onclick=quickCapture;actions.insertBefore(b,actions.firstElementChild)}
  function enableDrag(){document.querySelectorAll('[data-event]').forEach(el=>{if(el.dataset.dragReady)return;el.dataset.dragReady='1';el.draggable=true;el.addEventListener('dragstart',e=>{const id=el.dataset.event.split('@')[0];e.dataTransfer.setData('text/plain',id)})});document.querySelectorAll('[data-date]').forEach(target=>{if(target.dataset.dropReady)return;target.dataset.dropReady='1';target.addEventListener('dragover',e=>e.preventDefault());target.addEventListener('drop',e=>{e.preventDefault();const id=e.dataTransfer.getData('text/plain');if(!id)return;const s=load(),ev=s.events.find(x=>x.id===id);if(!ev||ev.repeat&&ev.repeat!=='none'){toast('Recurring events are edited from their series.');return}const date=target.dataset.date;if(!date)return;ev.date=date;if(target.classList.contains('week-column')||target.classList.contains('day-column')){const rect=target.getBoundingClientRect(),y=e.clientY-rect.top,slot=Math.max(0,Math.round(y/15)*15);const start=420+slot;ev.start=`${pad(Math.floor(start/60))}:${pad(start%60)}`;const dur=ev.end?Math.max(15,mins(ev.end)-mins(ev.start||'00:00')):60;const finish=start+dur;ev.end=`${pad(Math.floor(finish/60)%24)}:${pad(finish%60)}`}save(s);location.reload()})})}
  const observer=new MutationObserver(()=>{addQuickButton();enableDrag()});
  addQuickButton();enableDrag();observer.observe(document.body,{childList:true,subtree:true});
})();
