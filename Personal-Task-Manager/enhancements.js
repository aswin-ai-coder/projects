/* Focus v4 product hardening.
   High-value productivity polish for the local-first task manager. */
(() => {
  'use strict';
  const DAYS=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const RECUR_KEY='focus.recurrence.v1';
  const pad2=n=>String(n).padStart(2,'0');
  const local=d=>`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  const addDays=(value,count)=>{const d=new Date(`${value}T12:00:00`);d.setDate(d.getDate()+count);return local(d)};

  function loadRecurrenceMeta(){try{return JSON.parse(localStorage.getItem(RECUR_KEY)||'{}')}catch{return{}}}
  let recurrenceMeta=loadRecurrenceMeta();
  tasks.forEach((t,i)=>{if(!Number.isFinite(t.order))t.order=i;t.recurrenceEnd=recurrenceMeta[t.id]||''});

  const originalSave=save;
  save=function(){
    tasks.forEach((t,i)=>{if(!Number.isFinite(t.order))t.order=i});
    const result=originalSave();
    try{
      recurrenceMeta={};
      tasks.forEach(t=>{if(t.recurrenceEnd)recurrenceMeta[t.id]=t.recurrenceEnd});
      localStorage.setItem(RECUR_KEY,JSON.stringify(recurrenceMeta));
    }catch{}
    return result;
  };

  const sort=document.getElementById('sortBy');
  if(sort&&!([...sort.options].some(o=>o.value==='manual'))){const o=document.createElement('option');o.value='manual';o.textContent='My order';sort.appendChild(o)}
  function orderTasks(){const list=document.getElementById('taskList');if(!list||currentView==='calendar'||sort?.value!=='manual')return;[...list.querySelectorAll('.task')].sort((a,b)=>(tasks.find(t=>t.id===a.dataset.id)?.order??0)-(tasks.find(t=>t.id===b.dataset.id)?.order??0)).forEach(el=>list.appendChild(el))}
  const originalRender=render;
  render=function(){originalRender();orderTasks();updateBadge();decorateDraggableTasks()};
  function decorateDraggableTasks(){const list=document.getElementById('taskList');if(!list||currentView==='calendar')return;list.querySelectorAll('.task').forEach(card=>{card.draggable=sort?.value==='manual';card.classList.toggle('task-draggable',sort?.value==='manual')})}

  let dragId=null;
  document.addEventListener('dragstart',e=>{const card=e.target.closest('.task');if(!card||sort?.value!=='manual')return;dragId=card.dataset.id;card.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',dragId)});
  document.addEventListener('dragend',e=>{e.target.closest('.task')?.classList.remove('dragging');dragId=null});
  document.addEventListener('dragover',e=>{if(!dragId||sort?.value!=='manual')return;const target=e.target.closest('.task');if(target&&target.dataset.id!==dragId)e.preventDefault()});
  document.addEventListener('drop',e=>{
    if(!dragId||sort?.value!=='manual')return;
    const target=e.target.closest('.task');if(!target||target.dataset.id===dragId)return;e.preventDefault();
    const from=tasks.findIndex(t=>t.id===dragId),to=tasks.findIndex(t=>t.id===target.dataset.id);if(from<0||to<0)return;
    const [moved]=tasks.splice(from,1);tasks.splice(to,0,moved);tasks.forEach((t,i)=>t.order=i);save();render();toast('Task order updated')
  });

  // Extend Quick Add with relative dates and recurring rules while keeping the original parser intact.
  const form=document.getElementById('taskForm'),titleInput=document.getElementById('taskTitle');
  if(form&&titleInput){
    form.addEventListener('submit',()=>{
      const raw=titleInput.value.trim();let text=raw,recurrence=null;const now=new Date(),base=local(now);
      let m=text.match(/\bin\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)\b/i);
      if(m){const n=Math.max(1,Number(m[1])),unit=m[2].toLowerCase();let date;if(unit.startsWith('week'))date=addDays(base,n*7);else if(unit.startsWith('month')){const d=new Date(`${base}T12:00:00`);d.setMonth(d.getMonth()+n);date=local(d)}else if(unit.startsWith('year')){const d=new Date(`${base}T12:00:00`);d.setFullYear(d.getFullYear()+n);date=local(d)}else date=addDays(base,n);document.getElementById('taskDue').value=date;text=text.replace(m[0],'')}
      m=text.match(/\bnext\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i);
      if(m){const wanted=DAYS.indexOf(m[1].toLowerCase()),diff=((wanted-now.getDay())+7)%7||7;document.getElementById('taskDue').value=addDays(base,diff);text=text.replace(m[0],'')}
      m=text.match(/\bevery\s+(weekday|weekdays)\b/i);if(m){recurrence={type:'weekdays'};text=text.replace(m[0],'')}
      else if((m=text.match(/\bevery\s+(day|daily)\b/i))){recurrence={type:'daily'};text=text.replace(m[0],'')}
      else if((m=text.match(/\bevery\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)\b/i))){const units={day:'days',days:'days',week:'weeks',weeks:'weeks',month:'months',months:'months',year:'years',years:'years'};recurrence={type:'custom',every:Math.max(1,Number(m[1])),unit:units[m[2].toLowerCase()]};text=text.replace(m[0],'')}
      else if((m=text.match(/\bevery\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i))){const wanted=DAYS.indexOf(m[1].toLowerCase()),diff=((wanted-now.getDay())+7)%7;document.getElementById('taskDue').value=addDays(base,diff);recurrence={type:'weekly'};text=text.replace(m[0],'')}
      form.dataset.autorecurrence=recurrence?JSON.stringify(recurrence):'';titleInput.value=text.replace(/\s{2,}/g,' ').trim();
    },true);
    form.addEventListener('submit',()=>{const spec=form.dataset.autorecurrence;if(!spec||!tasks.length)return;try{const r=JSON.parse(spec),t=tasks[0];t.recurrence=r.type;t.repeatEvery=r.every||1;t.repeatUnit=r.unit||'days';t.updatedAt=Date.now();save();form.dataset.autorecurrence='';render()}catch{form.dataset.autorecurrence=''} });
  }

  // Recurrence end date is kept in a dedicated migration-safe metadata store so older task records remain compatible.
  const repeat=document.getElementById('editRecurrence');
  if(repeat&&!document.getElementById('editRecurrenceEnd')){
    const host=repeat.closest('.field-grid');
    if(host){const wrap=document.createElement('div');wrap.innerHTML='<label class="field-label" for="editRecurrenceEnd">Repeat until</label><input id="editRecurrenceEnd" type="date"><small class="muted">Leave empty for no end date.</small>';host.appendChild(wrap)}
  }
  const originalOpenEdit=openEdit;
  openEdit=function(id){originalOpenEdit(id);const input=document.getElementById('editRecurrenceEnd');if(input)input.value=tasks.find(x=>x.id===id)?.recurrenceEnd||''};
  const editForm=document.getElementById('editForm');
  if(editForm)editForm.addEventListener('submit',e=>{
    e.preventDefault();e.stopImmediatePropagation();const t=tasks.find(x=>x.id===editingId);if(!t)return;const title=document.getElementById('editTitle').value.trim();if(!title)return;
    t.title=title.slice(0,160);t.notes=document.getElementById('editNotes').value.slice(0,4000);t.priority=document.getElementById('editPriority').value;t.due=isDate(document.getElementById('editDue').value)?document.getElementById('editDue').value:'';t.dueTime=isTime(document.getElementById('editDueTime').value)?document.getElementById('editDueTime').value:'';t.category=document.getElementById('editCategory').value;t.tags=[...new Set(document.getElementById('editTags').value.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean))].slice(0,15);t.recurrence=document.getElementById('editRecurrence').value;t.repeatEvery=Math.max(1,Math.min(99,Number(document.getElementById('editRepeatEvery').value)||1));t.repeatUnit=document.getElementById('editRepeatUnit').value;t.reminder=isTime(document.getElementById('editReminder').value)?document.getElementById('editReminder').value:'';const end=document.getElementById('editRecurrenceEnd')?.value||'';t.recurrenceEnd=t.recurrence&&isDate(end)?end:'';t.updatedAt=Date.now();if(save()){editDialog.close();render();toast('Task updated')}
  },true);

  const originalComplete=completeTask;
  completeTask=function(id,checked=true){const t=tasks.find(x=>x.id===id);if(checked&&t?.recurrence&&t?.due&&t.recurrenceEnd){const next=nextRecurringDate(t);if(next&&next>t.recurrenceEnd){t.recurrence='';t.recurrenceEnd=''}}return originalComplete(id,checked)};

  function updateBadge(){if(!navigator.setAppBadge)return;navigator.setAppBadge(tasks.filter(t=>!t.completed&&!t.archived).length).catch(()=>{})}
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});
  if(navigator.storage?.persist)navigator.storage.persist().catch(()=>{});
  const hint=document.querySelector('.quick-hint');if(hint&&!hint.textContent.includes('My order'))hint.insertAdjacentHTML('beforeend',' · Drag tasks after selecting <code>My order</code>');
  setTimeout(()=>{updateBadge();decorateDraggableTasks()},0);
})();
