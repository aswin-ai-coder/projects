const STORAGE_KEY = 'focus.tasks.v2';
const PREF_KEY = 'focus.prefs.v2';
const BACKUP_VERSION = 2;
const defaultCategories = ['Personal', 'Work', 'Study'];
const priorities = ['low', 'medium', 'high'];
const recurrenceOptions = ['', 'daily', 'weekdays', 'weekly', 'monthly', 'yearly'];

let tasks = loadTasks();
let prefs = loadPrefs();
let currentView = 'all';
let editingId = null;
let selected = new Set();
let undoState = null;
let undoTimer = null;

const $ = id => document.getElementById(id);
const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const shiftDate = (date, days) => { const d = new Date(`${date}T12:00:00`); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); };
const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(new Date(`${v}T00:00:00`).getTime());
const isTime = v => typeof v === 'string' && /^\d{2}:\d{2}$/.test(v);
const escapeHTML = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const formatDate = v => isDate(v) ? new Date(`${v}T00:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'}) : '';
const priorityRank = p => ({high:0,medium:1,low:2}[p] ?? 1);
const today = () => localToday();

function normalizeSubtask(s) {
  if (!s || typeof s !== 'object' || typeof s.title !== 'string' || !s.title.trim()) return null;
  return { id: String(s.id || uid()), title: s.title.trim().slice(0,120), completed: Boolean(s.completed) };
}
function normalizeTask(t) {
  if (!t || typeof t !== 'object' || !t.id || typeof t.title !== 'string' || !t.title.trim()) return null;
  const now = Date.now();
  const subtasks = Array.isArray(t.subtasks) ? t.subtasks.map(normalizeSubtask).filter(Boolean).slice(0,50) : [];
  const tags = Array.isArray(t.tags) ? [...new Set(t.tags.map(String).map(x=>x.trim().toLowerCase()).filter(Boolean).slice(0,12))] : [];
  return {
    id:String(t.id), title:t.title.trim().slice(0,160), notes:typeof t.notes==='string'?t.notes.slice(0,4000):'',
    priority:priorities.includes(t.priority)?t.priority:'medium', due:isDate(t.due)?t.due:'', dueTime:isTime(t.dueTime)?t.dueTime:'',
    category:typeof t.category==='string'?t.category.trim().slice(0,30):'', tags, subtasks,
    completed:Boolean(t.completed), archived:Boolean(t.archived), recurrence:recurrenceOptions.includes(t.recurrence)?t.recurrence:'',
    reminder:isTime(t.reminder)?t.reminder:'', createdAt:Number.isFinite(Number(t.createdAt))?Number(t.createdAt):now,
    updatedAt:Number.isFinite(Number(t.updatedAt))?Number(t.updatedAt):now, completedAt:Number.isFinite(Number(t.completedAt))?Number(t.completedAt):null
  };
}
function loadTasks() { try { const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||localStorage.getItem('focus.tasks.v1')||'[]'); return Array.isArray(raw)?raw.map(normalizeTask).filter(Boolean):[]; } catch { return []; } }
function loadPrefs() {
  try { const raw=JSON.parse(localStorage.getItem(PREF_KEY)||localStorage.getItem('focus.prefs.v1')||'{}'); const cats=Array.isArray(raw.categories)?raw.categories.map(String).map(s=>s.trim()).filter(Boolean):[]; return {categories:[...new Set([...defaultCategories,...cats])].slice(0,50),theme:raw.theme==='dark'?'dark':'light',compact:Boolean(raw.compact),notifications:raw.notifications!==false,sort:['due','priority','created','title'].includes(raw.sort)?raw.sort:'due'}; }
  catch { return {categories:defaultCategories,theme:'light',compact:false,notifications:true,sort:'due'}; }
}
function save() { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks)); localStorage.setItem(PREF_KEY,JSON.stringify(prefs)); return true; } catch { toast('Could not save changes in this browser'); return false; } }
function isOverdue(t) { return !t.completed&&!t.archived&&t.due&&t.due<today(); }
function isDueToday(t) { return !t.completed&&!t.archived&&t.due===today(); }
function isUpcoming(t) { return !t.completed&&!t.archived&&t.due&&t.due>today(); }
function nextRecurringDate(t) {
  if(!t.due||!t.recurrence)return '';
  if(t.recurrence==='daily')return shiftDate(t.due,1);
  if(t.recurrence==='weekdays'){let n=shiftDate(t.due,1);while([0,6].includes(new Date(`${n}T12:00:00`).getDay()))n=shiftDate(n,1);return n;}
  if(t.recurrence==='weekly')return shiftDate(t.due,7);
  if(t.recurrence==='monthly'){const x=new Date(`${t.due}T12:00:00`);x.setMonth(x.getMonth()+1);return x.toISOString().slice(0,10);}
  if(t.recurrence==='yearly'){const x=new Date(`${t.due}T12:00:00`);x.setFullYear(x.getFullYear()+1);return x.toISOString().slice(0,10);}
  return '';
}
function completeTask(id,checked=true){const t=tasks.find(x=>x.id===id);if(!t)return;if(checked&&t.recurrence&&t.due)tasks.unshift({...t,id:uid(),due:nextRecurringDate(t),completed:false,completedAt:null,createdAt:Date.now(),updatedAt:Date.now()});t.completed=checked;t.completedAt=checked?Date.now():null;t.updatedAt=Date.now();save();render();toast(checked?'Task completed':'Task reopened');checkReminders();}
function getVisibleTasks(){
  const search=$('search').value.trim().toLowerCase(),status=$('statusFilter').value,priority=$('priorityFilter').value,category=$('categoryFilter').value,tag=$('tagFilter').value,sort=$('sortBy').value;
  let list=tasks.filter(t=>{
    if(t.archived)return false;
    if(currentView==='today'&&!isDueToday(t))return false;
    if(currentView==='upcoming'&&!isUpcoming(t))return false;
    if(currentView==='overdue'&&!isOverdue(t))return false;
    if(currentView==='completed'&&!t.completed)return false;
    if(currentView==='calendar')return false;
    if(currentView.startsWith('cat:')&&t.category!==currentView.slice(4))return false;
    if(status==='active'&&t.completed)return false;if(status==='completed'&&!t.completed)return false;
    if(priority!=='all'&&t.priority!==priority)return false;if(category!=='all'&&t.category!==category)return false;if(tag!=='all'&&!t.tags.includes(tag))return false;
    const hay=[t.title,t.notes,t.category,t.tags.join(' ')].join(' ').toLowerCase();return !search||hay.includes(search);
  });
  list.sort((a,b)=>{if(sort==='priority')return priorityRank(a.priority)-priorityRank(b.priority)||b.createdAt-a.createdAt;if(sort==='created')return b.createdAt-a.createdAt;if(sort==='title')return a.title.localeCompare(b.title);if(!a.due&&!b.due)return b.createdAt-a.createdAt;if(!a.due)return 1;if(!b.due)return -1;return a.due.localeCompare(b.due)||(a.dueTime||'').localeCompare(b.dueTime||'')||b.createdAt-a.createdAt;});
  return list;
}
function taskHTML(t){const subDone=t.subtasks.filter(s=>s.completed).length,subTotal=t.subtasks.length;const tags=[t.due?`<span class="${isOverdue(t)?'overdue':''}">${isOverdue(t)?'Overdue · ':''}${formatDate(t.due)}${t.dueTime?' · '+escapeHTML(t.dueTime):''}</span>`:'',t.category?`<span class="pill">${escapeHTML(t.category)}</span>`:'',...t.tags.slice(0,3).map(tag=>`<span class="pill tag">#${escapeHTML(tag)}</span>`),t.recurrence?`<span class="pill repeat">↻ ${escapeHTML(t.recurrence)}</span>`:'',subTotal?`<span class="pill">✓ ${subDone}/${subTotal} steps</span>`:'',t.reminder?`<span class="pill">◷ ${escapeHTML(t.reminder)}</span>`:'',`<span class="pill priority-${t.priority}">${t.priority}</span>`].filter(Boolean).join('');return `<article class="task ${t.completed?'completed':''}" data-id="${escapeHTML(t.id)}"><input class="check select-check" type="checkbox" aria-label="Select ${escapeHTML(t.title)}" ${selected.has(t.id)?'checked':''}><input class="check complete-check" type="checkbox" aria-label="${t.completed?'Reopen':'Complete'} ${escapeHTML(t.title)}" ${t.completed?'checked':''}><div class="task-main"><button class="task-open" type="button" data-action="edit">${escapeHTML(t.title)}</button><div class="meta">${tags}</div>${t.notes?`<div class="task-notes">${escapeHTML(t.notes)}</div>`:''}</div><div class="task-actions"><button data-action="edit" title="Edit task">Edit</button><button data-action="duplicate" title="Duplicate task">Copy</button><button data-action="delete" title="Delete task">Delete</button></div></article>`;}
function render(){renderNav();renderCategories();renderFilters();$('taskList').innerHTML=currentView==='calendar'?renderCalendar():getVisibleTasks().length?getVisibleTasks().map(taskHTML).join(''):emptyHTML();const active=tasks.filter(t=>!t.completed&&!t.archived).length,done=tasks.filter(t=>t.completed&&!t.archived).length,total=tasks.filter(t=>!t.archived).length;$('allCount').textContent=active;$('todayCount').textContent=tasks.filter(isDueToday).length;$('overdueCount').textContent=tasks.filter(isOverdue).length;$('completedCount').textContent=done;$('progressText').textContent=total?`${done} of ${total} completed`:'0 tasks';$('progressBar').style.width=total?`${done/total*100}%`:'0%';$('selectedText').textContent=`${selected.size} selected`;$('bulkbar').classList.toggle('hidden',selected.size===0);$('clearCompleted').classList.toggle('hidden',done===0);document.body.classList.toggle('dark',prefs.theme==='dark');document.body.classList.toggle('compact',prefs.compact);$('themeBtn').textContent=prefs.theme==='dark'?'☀':'☾';$('installBtn').classList.toggle('hidden',!deferredInstallPrompt);}
function emptyHTML(){const map={completed:['Nothing completed yet','Completed tasks will appear here.'],today:['Nothing due today','Add a task or schedule one for today.'],upcoming:['No upcoming tasks','Schedule a future due date to see it here.'],overdue:['No overdue tasks','You are all caught up.'],all:['No tasks found','Add a task above to get started.']};const x=map[currentView]||map.all;return `<div class="empty"><div class="empty-icon">✓</div><strong>${x[0]}</strong><span>${x[1]}</span></div>`;}
function renderNav(){document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===currentView));const title={all:'Inbox',today:'Today',upcoming:'Upcoming',overdue:'Overdue',completed:'Completed',calendar:'Calendar'}[currentView]||(currentView.startsWith('cat:')?currentView.slice(4):'Inbox');$('viewTitle').textContent=title;$('dateLabel').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});}
function renderCategories(){$('categoryNav').innerHTML=prefs.categories.map(c=>`<button class="category-item ${currentView==='cat:'+c?'active':''}" data-category="${escapeHTML(c)}"><span>${escapeHTML(c)}</span><span>${tasks.filter(t=>t.category===c&&!t.completed&&!t.archived).length}</span></button>`).join('');const opts='<option value="">No category</option>'+prefs.categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');$('taskCategory').innerHTML=opts;$('editCategory').innerHTML=opts;}
function renderFilters(){const catOpts='<option value="all">All categories</option>'+prefs.categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');const tags=[...new Set(tasks.flatMap(t=>t.tags))].sort();$('categoryFilter').innerHTML=catOpts;$('tagFilter').innerHTML='<option value="all">All tags</option>'+tags.map(t=>`<option value="${escapeHTML(t)}">#${escapeHTML(t)}</option>`).join('');$('sortBy').value=prefs.sort;}
function renderCalendar(){let html='<div class="calendar-grid">';for(let i=0;i<14;i++){const d=shiftDate(today(),i),dayTasks=tasks.filter(t=>!t.archived&&t.due===d).sort((a,b)=>priorityRank(a.priority)-priorityRank(b.priority));html+=`<section class="day-column ${d===today()?'is-today':''}"><header><strong>${new Date(`${d}T12:00:00`).toLocaleDateString(undefined,{weekday:'short'})}</strong><span>${formatDate(d)}</span></header>${dayTasks.length?dayTasks.map(t=>`<button class="calendar-task ${t.completed?'done':''}" data-calendar-id="${escapeHTML(t.id)}"><span class="dot priority-${t.priority}"></span>${escapeHTML(t.title)}</button>`).join(''):'<small>No tasks</small>'}</section>`;}return html+'</div>';}
function openEdit(id){const t=tasks.find(x=>x.id===id);if(!t)return;editingId=id;$('editTitle').value=t.title;$('editNotes').value=t.notes;$('editPriority').value=t.priority;$('editDue').value=t.due;$('editDueTime').value=t.dueTime;$('editCategory').value=t.category;$('editTags').value=t.tags.join(', ');$('editRecurrence').value=t.recurrence;$('editReminder').value=t.reminder;renderSubtasks(t);$('editDialog').showModal();$('editTitle').focus();}
function renderSubtasks(t){$('subtaskList').innerHTML=t.subtasks.map(s=>`<label class="subtask-row"><input type="checkbox" data-subtask="${escapeHTML(s.id)}" ${s.completed?'checked':''}><span class="${s.completed?'done':''}">${escapeHTML(s.title)}</span><button type="button" data-remove-subtask="${escapeHTML(s.id)}">×</button></label>`).join('')||'<p class="muted">No steps yet.</p>';}
function saveEdited(e){e.preventDefault();const t=tasks.find(x=>x.id===editingId);if(!t)return;const title=$('editTitle').value.trim();if(!title)return;t.title=title.slice(0,160);t.notes=$('editNotes').value.slice(0,4000);t.priority=$('editPriority').value;t.due=isDate($('editDue').value)?$('editDue').value:'';t.dueTime=isTime($('editDueTime').value)?$('editDueTime').value:'';t.category=$('editCategory').value;t.tags=[...new Set($('editTags').value.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean))].slice(0,12);t.recurrence=$('editRecurrence').value;t.reminder=isTime($('editReminder').value)?$('editReminder').value:'';t.updatedAt=Date.now();if(save()){$('editDialog').close();editingId=null;render();toast('Task updated');}}
function addTask(e){e.preventDefault();const raw=$('taskTitle').value.trim();if(!raw)return;const parsed=parseQuickAdd(raw);const t={id:uid(),title:parsed.title.slice(0,160),notes:'',priority:$('taskPriority').value,due:isDate($('taskDue').value)?$('taskDue').value:(parsed.due||''),dueTime:'',category:$('taskCategory').value,tags:parsed.tags,subtasks:[],completed:false,archived:false,recurrence:'',reminder:'',createdAt:Date.now(),updatedAt:Date.now(),completedAt:null};tasks.unshift(t);if(save()){e.target.reset();$('taskPriority').value='medium';render();toast('Task added');$('taskTitle').focus();}}
function parseQuickAdd(text){let title=text,due='';const lower=text.toLowerCase();if(/\btomorrow\b/.test(lower)){due=shiftDate(today(),1);title=title.replace(/\btomorrow\b/i,'').trim();}else if(/\btoday\b/.test(lower)){due=today();title=title.replace(/\btoday\b/i,'').trim();}else{const m=lower.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);if(m&&isDate(m[0])){due=m[0];title=title.replace(m[0],'').trim();}}const tags=[...title.matchAll(/#([a-z0-9_-]+)/gi)].map(m=>m[1].toLowerCase());title=title.replace(/#[a-z0-9_-]+/gi,'').replace(/\s{2,}/g,' ').trim();return{title,due,tags};}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),1800);}
function deleteTask(id){const idx=tasks.findIndex(t=>t.id===id);if(idx<0)return;const t=tasks[idx];if(!confirm(`Delete “${t.title}”?`))return;undoState={tasks:tasks.slice(),message:`“${t.title}” deleted`};clearTimeout(undoTimer);tasks.splice(idx,1);selected.delete(id);if(save()){render();showUndo();}}
function showUndo(){const el=$('undo');el.classList.add('show');el.innerHTML=`<span>${escapeHTML(undoState.message)}</span><button type="button" id="undoBtn">Undo</button>`;$('undoBtn').onclick=()=>{if(undoState){tasks=undoState.tasks;undoState=null;save();render();el.classList.remove('show');toast('Restored');}};undoTimer=setTimeout(()=>{undoState=null;el.classList.remove('show')},5000);}
function duplicateTask(id){const t=tasks.find(x=>x.id===id);if(!t)return;tasks.unshift({...structuredClone(t),id:uid(),title:`${t.title} (copy)`,completed:false,completedAt:null,createdAt:Date.now(),updatedAt:Date.now()});if(save()){render();toast('Task duplicated');}}
function deleteSelected(){if(!selected.size)return;if(!confirm(`Delete ${selected.size} selected tasks?`))return;undoState={tasks:tasks.slice(),message:`${selected.size} tasks deleted`};tasks=tasks.filter(t=>!selected.has(t.id));selected.clear();if(save()){render();showUndo();}}
function completeSelected(){tasks.forEach(t=>{if(selected.has(t.id)&&!t.completed){t.completed=true;t.completedAt=Date.now();t.updatedAt=Date.now();}});selected.clear();if(save()){render();toast('Selected tasks completed');}}
function clearCompleted(){if(!confirm('Remove all completed tasks? This can be undone for a few seconds.'))return;undoState={tasks:tasks.slice(),message:'Completed tasks removed'};tasks=tasks.filter(t=>!t.completed);if(save()){render();showUndo();}}
function addSubtask(){if(!editingId)return;const t=tasks.find(x=>x.id===editingId),input=$('newSubtask'),title=input.value.trim();if(!title)return;t.subtasks.push({id:uid(),title:title.slice(0,120),completed:false});input.value='';renderSubtasks(t);t.updatedAt=Date.now();save();}
function handleSubtaskClick(e){const t=tasks.find(x=>x.id===editingId);if(!t)return;const remove=e.target.closest('[data-remove-subtask]');if(remove){t.subtasks=t.subtasks.filter(s=>s.id!==remove.dataset.removeSubtask);renderSubtasks(t);save();return;}if(e.target.matches('[data-subtask]')){const s=t.subtasks.find(x=>x.id===e.target.dataset.subtask);if(s)s.completed=e.target.checked;renderSubtasks(t);save();}}
function manageCategory(){const name=prompt('Category name');if(!name)return;const n=name.trim().slice(0,30);if(!n||prefs.categories.some(c=>c.toLowerCase()===n.toLowerCase()))return toast('Category already exists');prefs.categories.push(n);save();render();toast('Category created');}
function exportData(){const data={version:BACKUP_VERSION,app:'Focus',exportedAt:new Date().toISOString(),tasks,categories:prefs.categories,preferences:{theme:prefs.theme,compact:prefs.compact,notifications:prefs.notifications}};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=`focus-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),0);toast('Backup exported');}
function importData(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.tasks))throw new Error();const incoming=d.tasks.map(normalizeTask).filter(Boolean);const replace=confirm(`Import ${incoming.length} valid tasks. OK = replace current tasks; Cancel = merge without duplicate IDs.`);if(replace)tasks=incoming;else{const ids=new Set(tasks.map(t=>t.id));tasks=[...incoming.filter(t=>!ids.has(t.id)),...tasks];}if(Array.isArray(d.categories))prefs.categories=[...new Set([...defaultCategories,...d.categories.map(String).map(x=>x.trim()).filter(Boolean)])].slice(0,50);save();selected.clear();render();toast('Backup imported');}catch{toast('Invalid backup file');}};r.readAsText(file);}
async function requestNotifications(){if(!('Notification'in window)){toast('Notifications are not supported here');return;}const p=await Notification.requestPermission();prefs.notifications=p==='granted';save();render();toast(p==='granted'?'Reminders enabled':'Reminders disabled');}
function checkReminders(){if(!prefs.notifications||!('Notification'in window)||Notification.permission!=='granted')return;const now=new Date(),key=`${today()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;tasks.filter(t=>!t.completed&&!t.archived&&t.due===today()&&t.reminder).forEach(t=>{if(t.reminder===key.slice(11)){const k=`focus.reminded.${t.id}.${key}`;if(!sessionStorage.getItem(k)){new Notification('Focus reminder',{body:t.title});sessionStorage.setItem(k,'1');}}});}
function installPWA(){if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();deferredInstallPrompt.userChoice.then(()=>{deferredInstallPrompt=null;render();});}
let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;render();});
document.addEventListener('click',e=>{const nav=e.target.closest('.nav-item');if(nav){currentView=nav.dataset.view;selected.clear();render();return;}const cat=e.target.closest('[data-category]');if(cat){currentView='cat:'+cat.dataset.category;selected.clear();render();return;}const action=e.target.closest('[data-action]');if(action){const article=action.closest('.task');if(article){const id=article.dataset.id;if(action.dataset.action==='edit')openEdit(id);if(action.dataset.action==='delete')deleteTask(id);if(action.dataset.action==='duplicate')duplicateTask(id);}return;}const cal=e.target.closest('[data-calendar-id]');if(cal)openEdit(cal.dataset.calendarId);});
$('taskForm').addEventListener('submit',addTask);$('editForm').addEventListener('submit',saveEdited);$('addSubtaskBtn').addEventListener('click',addSubtask);$('newSubtask').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addSubtask();}});$('subtaskList').addEventListener('click',handleSubtaskClick);$('subtaskList').addEventListener('change',handleSubtaskClick);
$('taskList').addEventListener('change',e=>{const article=e.target.closest('.task');if(!article)return;const id=article.dataset.id;if(e.target.classList.contains('complete-check'))completeTask(id,e.target.checked);if(e.target.classList.contains('select-check')){e.target.checked?selected.add(id):selected.delete(id);render();}});
$('deleteSelected').addEventListener('click',deleteSelected);$('completeSelected').addEventListener('click',completeSelected);$('clearSelection').addEventListener('click',()=>{selected.clear();render();});$('clearCompleted').addEventListener('click',clearCompleted);$('exportBtn').addEventListener('click',exportData);$('importInput').addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value='';});$('themeBtn').addEventListener('click',()=>{prefs.theme=prefs.theme==='dark'?'light':'dark';save();render();});$('installBtn').addEventListener('click',installPWA);$('notifyBtn').addEventListener('click',requestNotifications);$('addCategoryBtn').addEventListener('click',manageCategory);
['search','statusFilter','priorityFilter','categoryFilter','tagFilter','sortBy'].forEach(id=>$(id).addEventListener('input',()=>{if(id==='sortBy'){prefs.sort=$(id).value;save();}render();}));$('editDialog').addEventListener('close',()=>editingId=null);
document.addEventListener('keydown',e=>{const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('search').focus();}if(!typing&&e.key.toLowerCase()==='n'){e.preventDefault();$('taskTitle').focus();}if(!typing&&e.key.toLowerCase()==='c'){e.preventDefault();manageCategory();}if(e.key==='Escape'&&!$('editDialog').open){selected.clear();render();}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));setInterval(checkReminders,30000);setTimeout(checkReminders,1000);render();
