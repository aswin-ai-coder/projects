const KEY = 'focus.tasks.v1';
const PREF_KEY = 'focus.prefs.v1';
const defaultCategories = ['Personal', 'Work', 'Study'];
let tasks = loadTasks();
let prefs = loadPrefs();
let currentView = 'all';
let selected = new Set();

const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().slice(0, 10);

function loadTasks(){try{return JSON.parse(localStorage.getItem(KEY)) || []}catch{return []}}
function loadPrefs(){try{return {...{categories:defaultCategories,theme:'light'},...JSON.parse(localStorage.getItem(PREF_KEY))}}catch{return {categories:defaultCategories,theme:'light'}}}
function save(){localStorage.setItem(KEY, JSON.stringify(tasks));localStorage.setItem(PREF_KEY, JSON.stringify(prefs));}
function uid(){return crypto.randomUUID ? crypto.randomUUID() : Date.now()+'-'+Math.random().toString(16).slice(2)}
function escapeHTML(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function formatDate(value){if(!value)return '';const d=new Date(value+'T00:00:00');return d.toLocaleDateString(undefined,{month:'short',day:'numeric'})}
function isOverdue(t){return !t.completed && t.due && t.due < today()}
function priorityRank(p){return {high:0,medium:1,low:2}[p] ?? 1}

function render(){
  renderNav(); renderCategories();
  const search = $('search').value.trim().toLowerCase();
  const status = $('statusFilter').value;
  const priority = $('priorityFilter').value;
  const sort = $('sortBy').value;
  let visible = tasks.filter(t=>{
    if(currentView==='today' && t.due!==today()) return false;
    if(currentView==='upcoming' && (!t.due || t.due<=today() || t.completed)) return false;
    if(currentView==='completed' && !t.completed) return false;
    if(currentView.startsWith('cat:') && t.category!==currentView.slice(4)) return false;
    if(status==='active' && t.completed)return false;
    if(status==='completed' && !t.completed)return false;
    if(priority!=='all' && t.priority!==priority)return false;
    return !search || (t.title+' '+(t.category||'')).toLowerCase().includes(search);
  });
  visible.sort((a,b)=>{
    if(sort==='priority')return priorityRank(a.priority)-priorityRank(b.priority);
    if(sort==='created')return b.createdAt-a.createdAt;
    if(sort==='title')return a.title.localeCompare(b.title);
    if(!a.due&&!b.due)return b.createdAt-a.createdAt;
    if(!a.due)return 1;if(!b.due)return -1;return a.due.localeCompare(b.due);
  });
  $('taskList').innerHTML = visible.length ? visible.map(taskHTML).join('') : `<div class="empty"><strong>${emptyTitle()}</strong><span>${search?'Try a different search.':'Add a task above to get started.'}</span></div>`;
  const active=tasks.filter(t=>!t.completed).length, done=tasks.length-active;
  $('allCount').textContent=active;$('todayCount').textContent=tasks.filter(t=>!t.completed&&t.due===today()).length;$('completedCount').textContent=done;
  $('progressText').textContent=tasks.length?`${done} of ${tasks.length} completed`:'0 tasks';$('progressBar').style.width=tasks.length?(done/tasks.length*100)+'%':'0%';
  $('selectedText').textContent=`${selected.size} selected`; $('bulkbar').classList.toggle('hidden',selected.size===0);
}
function emptyTitle(){return currentView==='completed'?'Nothing completed yet':currentView==='today'?'Nothing due today':currentView==='upcoming'?'No upcoming tasks':'No tasks found'}
function taskHTML(t){
  const checked=selected.has(t.id)?'checked':'';
  const tags=[t.due?`<span class="${isOverdue(t)?'overdue':''}">${isOverdue(t)?'Overdue · ':''}${formatDate(t.due)}</span>`:'',t.category?`<span class="pill">${escapeHTML(t.category)}</span>`:'',`<span class="pill priority-${t.priority}">${t.priority}</span>`].filter(Boolean).join('');
  return `<article class="task ${t.completed?'completed':''}" data-id="${t.id}"><input class="check select-check" type="checkbox" aria-label="Select ${escapeHTML(t.title)}" ${checked}><input class="check complete-check" type="checkbox" aria-label="Mark ${escapeHTML(t.title)} ${t.completed?'active':'complete'}" ${t.completed?'checked':''}><div><div class="task-title">${escapeHTML(t.title)}</div><div class="meta">${tags}</div></div><div class="task-actions"><button data-action="edit" title="Edit task">Edit</button><button data-action="delete" title="Delete task">Delete</button></div></article>`
}
function renderNav(){document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===currentView));const title=currentView==='today'?'Today':currentView==='upcoming'?'Upcoming':currentView==='completed'?'Completed':currentView.startsWith('cat:')?currentView.slice(4):'Inbox';$('viewTitle').textContent=title;$('dateLabel').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});}
function renderCategories(){
  $('categoryNav').innerHTML=prefs.categories.map(c=>`<button class="category-item ${currentView==='cat:'+c?'active':''}" data-category="${escapeHTML(c)}"><span>${escapeHTML(c)}</span><span>${tasks.filter(t=>t.category===c&&!t.completed).length}</span></button>`).join('');
  $('taskCategory').innerHTML='<option value="">No category</option>'+prefs.categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
}
function addTask(e){e.preventDefault();const title=$('taskTitle').value.trim();if(!title)return;tasks.unshift({id:uid(),title,priority:$('taskPriority').value,due:$('taskDue').value,category:$('taskCategory').value,completed:false,createdAt:Date.now(),updatedAt:Date.now()});save();e.target.reset();$('taskPriority').value='medium';render();toast('Task added')}
function updateTask(id,patch){const t=tasks.find(x=>x.id===id);if(!t)return;Object.assign(t,patch,{updatedAt:Date.now()});save();render()}
function editTask(id){const t=tasks.find(x=>x.id===id);if(!t)return;const title=prompt('Task title',t.title);if(title===null)return;const clean=title.trim();if(!clean){toast('Task title cannot be empty');return}const due=prompt('Due date (YYYY-MM-DD), leave blank for none',t.due||'');updateTask(id,{title:clean,due:due.trim()});toast('Task updated')}
function deleteTask(id){const t=tasks.find(x=>x.id===id);if(!t)return;if(!confirm(`Delete “${t.title}”?`))return;tasks=tasks.filter(x=>x.id!==id);selected.delete(id);save();render();toast('Task deleted')}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),1800)}
function exportData(){const data={version:1,exportedAt:new Date().toISOString(),tasks,categories:prefs.categories};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`focus-backup-${today()}.json`;a.click();URL.revokeObjectURL(a.href);toast('Backup exported')}
function importData(file){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!Array.isArray(data.tasks))throw Error('Invalid backup');if(!confirm(`Import ${data.tasks.length} tasks? This replaces current tasks.`))return;tasks=data.tasks.filter(t=>t&&t.id&&t.title).map(t=>({...t,completed:Boolean(t.completed),priority:['low','medium','high'].includes(t.priority)?t.priority:'medium'}));if(Array.isArray(data.categories))prefs.categories=[...new Set([...defaultCategories,...data.categories.map(String).filter(Boolean)])];save();selected.clear();render();toast('Backup imported')}catch{toast('Could not import that file')}};reader.readAsText(file)}

$('taskForm').addEventListener('submit',addTask);$('exportBtn').addEventListener('click',exportData);$('importInput').addEventListener('change',e=>e.target.files[0]&&importData(e.target.files[0]));
$('themeBtn').addEventListener('click',()=>{prefs.theme=prefs.theme==='dark'?'light':'dark';applyTheme();save()});
['search','statusFilter','priorityFilter','sortBy'].forEach(id=>$(id).addEventListener('input',render));
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{currentView=b.dataset.view;selected.clear();render()}));
$('categoryNav').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){currentView='cat:'+b.dataset.category;selected.clear();render()}});
$('taskList').addEventListener('click',e=>{const article=e.target.closest('.task');if(!article)return;const id=article.dataset.id;if(e.target.dataset.action==='edit')editTask(id);if(e.target.dataset.action==='delete')deleteTask(id)});
$('taskList').addEventListener('change',e=>{const article=e.target.closest('.task');if(!article)return;const id=article.dataset.id;if(e.target.classList.contains('complete-check')){updateTask(id,{completed:e.target.checked})}else if(e.target.classList.contains('select-check')){e.target.checked?selected.add(id):selected.delete(id);render()}});
$('completeSelected').addEventListener('click',()=>{tasks.forEach(t=>{if(selected.has(t.id))t.completed=true});selected.clear();save();render();toast('Selected tasks completed')});
$('deleteSelected').addEventListener('click',()=>{if(!selected.size||!confirm(`Delete ${selected.size} selected tasks?`))return;tasks=tasks.filter(t=>!selected.has(t.id));selected.clear();save();render();toast('Selected tasks deleted')});
$('clearSelection').addEventListener('click',()=>{selected.clear();render()});
$('addCategoryBtn').addEventListener('click',()=>{$('categoryName').value='';$('categoryDialog').showModal();$('categoryName').focus()});
$('categoryForm').addEventListener('submit',e=>{e.preventDefault();const name=$('categoryName').value.trim();if(!name)return;if(prefs.categories.some(c=>c.toLowerCase()===name.toLowerCase())){toast('Category already exists');return}prefs.categories.push(name);save();$('categoryDialog').close();render();toast('Category created')});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('search').focus()}if(e.key==='n'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();$('taskTitle').focus()}if(e.key==='Escape'&&!$('categoryDialog').open){selected.clear();render()}});
function applyTheme(){document.body.classList.toggle('dark',prefs.theme==='dark');$('themeBtn').textContent=prefs.theme==='dark'?'☀':'☾'}
applyTheme();render();
