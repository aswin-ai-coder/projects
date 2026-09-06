const KEY = 'focus.tasks.v1';
const PREF_KEY = 'focus.prefs.v1';
const defaultCategories = ['Personal', 'Work', 'Study'];
const priorities = ['low', 'medium', 'high'];
let tasks = loadTasks();
let prefs = loadPrefs();
let currentView = 'all';
let selected = new Set();
let editingId = null;

const $ = id => document.getElementById(id);
const localToday = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

function normalizeTask(t) {
  if (!t || typeof t !== 'object' || !t.id || typeof t.title !== 'string' || !t.title.trim()) return null;
  const createdAt = Number(t.createdAt);
  const updatedAt = Number(t.updatedAt);
  return {
    id: String(t.id),
    title: t.title.trim().slice(0, 160),
    priority: priorities.includes(t.priority) ? t.priority : 'medium',
    due: isDate(t.due) ? t.due : '',
    category: typeof t.category === 'string' ? t.category.trim().slice(0, 30) : '',
    completed: Boolean(t.completed),
    createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
    updatedAt: Number.isFinite(updatedAt) ? updatedAt : Date.now()
  };
}

function loadTasks() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw.map(normalizeTask).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function loadPrefs() {
  try {
    const raw = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
    const categories = Array.isArray(raw.categories)
      ? [...new Set([...defaultCategories, ...raw.categories.map(String).map(s => s.trim()).filter(Boolean).slice(0, 47)])]
      : defaultCategories;
    return { categories, theme: raw.theme === 'dark' ? 'dark' : 'light' };
  } catch {
    return { categories: defaultCategories, theme: 'light' };
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
    localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
    return true;
  } catch {
    toast('Could not save changes in this browser');
    return false;
  }
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

function formatDate(value) {
  if (!isDate(value)) return '';
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function isOverdue(t) { return !t.completed && t.due && t.due < localToday(); }
function priorityRank(p) { return { high: 0, medium: 1, low: 2 }[p] ?? 1; }

function render() {
  renderNav();
  renderCategories();
  const search = $('search').value.trim().toLowerCase();
  const status = $('statusFilter').value;
  const priority = $('priorityFilter').value;
  const sort = $('sortBy').value;
  let visible = tasks.filter(t => {
    if (currentView === 'today' && t.due !== localToday()) return false;
    if (currentView === 'upcoming' && (!t.due || t.due <= localToday() || t.completed)) return false;
    if (currentView === 'completed' && !t.completed) return false;
    if (currentView.startsWith('cat:') && t.category !== currentView.slice(4)) return false;
    if (status === 'active' && t.completed) return false;
    if (status === 'completed' && !t.completed) return false;
    if (priority !== 'all' && t.priority !== priority) return false;
    return !search || (t.title + ' ' + (t.category || '')).toLowerCase().includes(search);
  });

  visible.sort((a, b) => {
    if (sort === 'priority') return priorityRank(a.priority) - priorityRank(b.priority) || b.createdAt - a.createdAt;
    if (sort === 'created') return b.createdAt - a.createdAt;
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (!a.due && !b.due) return b.createdAt - a.createdAt;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return a.due.localeCompare(b.due) || b.createdAt - a.createdAt;
  });

  $('taskList').innerHTML = visible.length
    ? visible.map(taskHTML).join('')
    : `<div class="empty"><strong>${emptyTitle()}</strong><span>${search ? 'Try a different search.' : 'Add a task above to get started.'}</span></div>`;

  const active = tasks.filter(t => !t.completed).length;
  const done = tasks.length - active;
  $('allCount').textContent = active;
  $('todayCount').textContent = tasks.filter(t => !t.completed && t.due === localToday()).length;
  $('completedCount').textContent = done;
  $('progressText').textContent = tasks.length ? `${done} of ${tasks.length} completed` : '0 tasks';
  $('progressBar').style.width = tasks.length ? `${done / tasks.length * 100}%` : '0%';
  $('selectedText').textContent = `${selected.size} selected`;
  $('bulkbar').classList.toggle('hidden', selected.size === 0);
}

function emptyTitle() {
  if (currentView === 'completed') return 'Nothing completed yet';
  if (currentView === 'today') return 'Nothing due today';
  if (currentView === 'upcoming') return 'No upcoming tasks';
  return 'No tasks found';
}

function taskHTML(t) {
  const checked = selected.has(t.id) ? 'checked' : '';
  const tags = [
    t.due ? `<span class="${isOverdue(t) ? 'overdue' : ''}">${isOverdue(t) ? 'Overdue · ' : ''}${formatDate(t.due)}</span>` : '',
    t.category ? `<span class="pill">${escapeHTML(t.category)}</span>` : '',
    `<span class="pill priority-${t.priority}">${t.priority}</span>`
  ].filter(Boolean).join('');
  return `<article class="task ${t.completed ? 'completed' : ''}" data-id="${escapeHTML(t.id)}"><input class="check select-check" type="checkbox" aria-label="Select ${escapeHTML(t.title)}" ${checked}><input class="check complete-check" type="checkbox" aria-label="Mark ${escapeHTML(t.title)} ${t.completed ? 'active' : 'complete'}" ${t.completed ? 'checked' : ''}><div><div class="task-title">${escapeHTML(t.title)}</div><div class="meta">${tags}</div></div><div class="task-actions"><button data-action="edit" title="Edit task">Edit</button><button data-action="delete" title="Delete task">Delete</button></div></article>`;
}

function renderNav() {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === currentView));
  const title = currentView === 'today' ? 'Today' : currentView === 'upcoming' ? 'Upcoming' : currentView === 'completed' ? 'Completed' : currentView.startsWith('cat:') ? currentView.slice(4) : 'Inbox';
  $('viewTitle').textContent = title;
  $('dateLabel').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

function renderCategories() {
  $('categoryNav').innerHTML = prefs.categories.map(c => `<button class="category-item ${currentView === 'cat:' + c ? 'active' : ''}" data-category="${escapeHTML(c)}"><span>${escapeHTML(c)}</span><span>${tasks.filter(t => t.category === c && !t.completed).length}</span></button>`).join('');
  const options = '<option value="">No category</option>' + prefs.categories.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
  $('taskCategory').innerHTML = options;
  $('editCategory').innerHTML = options;
}

function addTask(e) {
  e.preventDefault();
  const title = $('taskTitle').value.trim();
  if (!title) return;
  tasks.unshift({ id: uid(), title: title.slice(0, 160), priority: $('taskPriority').value, due: isDate($('taskDue').value) ? $('taskDue').value : '', category: $('taskCategory').value, completed: false, createdAt: Date.now(), updatedAt: Date.now() });
  if (!save()) return;
  e.target.reset();
  $('taskPriority').value = 'medium';
  render();
  toast('Task added');
}

function updateTask(id, patch) {
  const t = tasks.find(x => x.id === id);
  if (!t) return false;
  Object.assign(t, patch, { updatedAt: Date.now() });
  return save();
}

function openEditDialog(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  editingId = id;
  $('editTitle').value = t.title;
  $('editPriority').value = t.priority;
  $('editDue').value = t.due || '';
  $('editCategory').value = t.category || '';
  $('editDialog').showModal();
  $('editTitle').focus();
}

function saveEditedTask(e) {
  e.preventDefault();
  if (!editingId) return;
  const title = $('editTitle').value.trim();
  if (!title) return;
  const due = $('editDue').value;
  if (due && !isDate(due)) { toast('Please choose a valid due date'); return; }
  const saved = updateTask(editingId, { title: title.slice(0, 160), priority: $('editPriority').value, due, category: $('editCategory').value });
  if (!saved) return;
  $('editDialog').close();
  editingId = null;
  render();
  toast('Task updated');
}

function deleteTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t || !confirm(`Delete “${t.title}”?`)) return;
  tasks = tasks.filter(x => x.id !== id);
  selected.delete(id);
  if (save()) { render(); toast('Task deleted'); }
}

function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

function exportData() {
  const data = { version: 1, exportedAt: new Date().toISOString(), tasks, categories: prefs.categories };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = `focus-backup-${localToday()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  toast('Backup exported');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data.tasks)) throw new Error('Invalid backup');
      const imported = data.tasks.map(normalizeTask).filter(Boolean);
      if (!confirm(`Import ${imported.length} valid tasks? This replaces current tasks.`)) return;
      tasks = imported;
      if (Array.isArray(data.categories)) {
        prefs.categories = [...new Set([...defaultCategories, ...data.categories.map(String).map(s => s.trim()).filter(Boolean).slice(0, 47)])];
      }
      if (save()) { selected.clear(); render(); toast('Backup imported'); }
    } catch {
      toast('Could not import that file');
    }
  };
  reader.onerror = () => toast('Could not read that file');
  reader.readAsText(file);
}

$('taskForm').addEventListener('submit', addTask);
$('exportBtn').addEventListener('click', exportData);
$('importInput').addEventListener('change', e => { if (e.target.files[0]) importData(e.target.files[0]); e.target.value = ''; });
$('themeBtn').addEventListener('click', () => { prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark'; applyTheme(); save(); });
['search', 'statusFilter', 'priorityFilter', 'sortBy'].forEach(id => $(id).addEventListener('input', render));
document.querySelectorAll('.nav-item').forEach(b => b.addEventListener('click', () => { currentView = b.dataset.view; selected.clear(); render(); }));
$('categoryNav').addEventListener('click', e => { const b = e.target.closest('[data-category]'); if (b) { currentView = 'cat:' + b.dataset.category; selected.clear(); render(); } });
$('taskList').addEventListener('click', e => { const article = e.target.closest('.task'); if (!article) return; const id = article.dataset.id; if (e.target.dataset.action === 'edit') openEditDialog(id); if (e.target.dataset.action === 'delete') deleteTask(id); });
$('taskList').addEventListener('change', e => { const article = e.target.closest('.task'); if (!article) return; const id = article.dataset.id; if (e.target.classList.contains('complete-check')) { if (updateTask(id, { completed: e.target.checked })) { render(); toast(e.target.checked ? 'Task completed' : 'Task reopened'); } } else if (e.target.classList.contains('select-check')) { e.target.checked ? selected.add(id) : selected.delete(id); render(); } });
$('completeSelected').addEventListener('click', () => { tasks.forEach(t => { if (selected.has(t.id)) t.completed = true; }); selected.clear(); if (save()) { render(); toast('Selected tasks completed'); } });
$('deleteSelected').addEventListener('click', () => { if (!selected.size || !confirm(`Delete ${selected.size} selected tasks?`)) return; tasks = tasks.filter(t => !selected.has(t.id)); selected.clear(); if (save()) { render(); toast('Selected tasks deleted'); } });
$('clearSelection').addEventListener('click', () => { selected.clear(); render(); });
$('addCategoryBtn').addEventListener('click', () => { $('categoryName').value = ''; $('categoryDialog').showModal(); $('categoryName').focus(); });
$('categoryForm').addEventListener('submit', e => { e.preventDefault(); const name = $('categoryName').value.trim(); if (!name) return; if (prefs.categories.some(c => c.toLowerCase() === name.toLowerCase())) { toast('Category already exists'); return; } prefs.categories.push(name.slice(0, 30)); if (save()) { $('categoryDialog').close(); render(); toast('Category created'); } });
$('editForm').addEventListener('submit', saveEditedTask);
$('editDialog').addEventListener('close', () => { editingId = null; });

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('search').focus(); }
  if (e.key === 'n' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'SELECT') { e.preventDefault(); $('taskTitle').focus(); }
  if (e.key === 'Escape' && !$('categoryDialog').open && !$('editDialog').open) { selected.clear(); render(); }
});

function applyTheme() { document.body.classList.toggle('dark', prefs.theme === 'dark'); $('themeBtn').textContent = prefs.theme === 'dark' ? '☀' : '☾'; }
applyTheme();
render();
