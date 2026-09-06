/* Focus v4 product hardening.
   Adds high-value productivity polish without adding a backend or changing the local-first model. */
(() => {
  'use strict';

  const DAYS = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  const pad2 = n => String(n).padStart(2, '0');
  const local = d => `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  const addDays = (value, count) => { const d = new Date(`${value}T12:00:00`); d.setDate(d.getDate()+count); return local(d); };
  const escape = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  // Preserve a user's preferred order when requested. Existing data remains fully compatible.
  tasks.forEach((t, i) => { if (!Number.isFinite(t.order)) t.order = i; });
  const originalSave = save;
  save = function() {
    tasks.forEach((t, i) => { if (!Number.isFinite(t.order)) t.order = i; });
    return originalSave();
  };

  // Add a modern "My order" option to the existing sort control.
  const sort = document.getElementById('sortBy');
  if (sort && ![...sort.options].some(o => o.value === 'manual')) {
    const option = document.createElement('option');
    option.value = 'manual';
    option.textContent = 'My order';
    sort.appendChild(option);
  }

  function orderTasks() {
    const list = document.getElementById('taskList');
    if (!list || currentView === 'calendar' || sort?.value !== 'manual') return;
    [...list.querySelectorAll('.task')]
      .sort((a,b) => (tasks.find(t => t.id === a.dataset.id)?.order ?? 0) - (tasks.find(t => t.id === b.dataset.id)?.order ?? 0))
      .forEach(el => list.appendChild(el));
  }

  const originalRender = render;
  render = function() {
    originalRender();
    orderTasks();
    updateBadge();
    decorateDraggableTasks();
  };

  function decorateDraggableTasks() {
    const list = document.getElementById('taskList');
    if (!list || currentView === 'calendar') return;
    list.querySelectorAll('.task').forEach(card => {
      card.draggable = true;
      card.classList.add('task-draggable');
      card.title = card.title || 'Drag to reorder when “My order” is selected';
    });
  }

  let dragId = null;
  document.addEventListener('dragstart', e => {
    const card = e.target.closest('.task');
    if (!card || sort?.value !== 'manual') return;
    dragId = card.dataset.id;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragId);
  });
  document.addEventListener('dragend', e => {
    e.target.closest('.task')?.classList.remove('dragging');
    dragId = null;
  });
  document.addEventListener('dragover', e => {
    if (!dragId || sort?.value !== 'manual') return;
    const target = e.target.closest('.task');
    if (target && target.dataset.id !== dragId) e.preventDefault();
  });
  document.addEventListener('drop', e => {
    if (!dragId || sort?.value !== 'manual') return;
    const target = e.target.closest('.task');
    if (!target || target.dataset.id === dragId) return;
    e.preventDefault();
    const dragged = tasks.find(t => t.id === dragId);
    const targetTask = tasks.find(t => t.id === target.dataset.id);
    if (!dragged || !targetTask) return;
    const targetOrder = targetTask.order ?? 0;
    const sourceOrder = dragged.order ?? 0;
    if (sourceOrder < targetOrder) tasks.forEach(t => { if (t.order > sourceOrder && t.order <= targetOrder) t.order--; });
    else tasks.forEach(t => { if (t.order >= targetOrder && t.order < sourceOrder) t.order++; });
    dragged.order = targetOrder;
    save();
    render();
    toast('Task order updated');
  });

  // Natural-language quick add: extend the existing parser with relative dates and recurring rules.
  const form = document.getElementById('taskForm');
  const titleInput = document.getElementById('taskTitle');
  if (form && titleInput) {
    form.addEventListener('submit', () => {
      const raw = titleInput.value.trim();
      let text = raw;
      let recurrence = null;
      const now = new Date();
      const base = local(now);

      let m = text.match(/\bin\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)\b/i);
      if (m) {
        const n = Math.max(1, Number(m[1]));
        const unit = m[2].toLowerCase();
        const date = unit.startsWith('week') ? addDays(base, n*7) : unit.startsWith('month') ? (() => { const d = new Date(`${base}T12:00:00`); d.setMonth(d.getMonth()+n); return local(d); })() : unit.startsWith('year') ? (() => { const d = new Date(`${base}T12:00:00`); d.setFullYear(d.getFullYear()+n); return local(d); })() : addDays(base,n);
        document.getElementById('taskDue').value = date;
        text = text.replace(m[0], '');
      }

      m = text.match(/\bnext\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i);
      if (m) {
        const wanted = DAYS.indexOf(m[1].toLowerCase());
        const diff = ((wanted - now.getDay()) + 7) % 7 || 7;
        document.getElementById('taskDue').value = addDays(base, diff);
        text = text.replace(m[0], '');
      }

      m = text.match(/\bevery\s+(weekday|weekdays)\b/i);
      if (m) { recurrence = {type:'weekdays'}; text = text.replace(m[0], ''); }
      else if ((m = text.match(/\bevery\s+(day|daily)\b/i))) { recurrence = {type:'daily'}; text = text.replace(m[0], ''); }
      else if ((m = text.match(/\bevery\s+(\d+)\s+(day|days|week|weeks|month|months|year|years)\b/i))) {
        const unitMap = {day:'days',days:'days',week:'weeks',weeks:'weeks',month:'months',months:'months',year:'years',years:'years'};
        recurrence = {type:'custom', every:Math.max(1,Number(m[1])), unit:unitMap[m[2].toLowerCase()]};
        text = text.replace(m[0], '');
      }
      else if ((m = text.match(/\bevery\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i))) {
        const wanted = DAYS.indexOf(m[1].toLowerCase());
        const diff = ((wanted - now.getDay()) + 7) % 7;
        document.getElementById('taskDue').value = addDays(base, diff);
        recurrence = {type:'weekly'};
        text = text.replace(m[0], '');
      }
      form.dataset.autorecurrence = recurrence ? JSON.stringify(recurrence) : '';
      titleInput.value = text.replace(/\s{2,}/g,' ').trim();
    }, true);

    form.addEventListener('submit', () => {
      const spec = form.dataset.autorecurrence;
      if (!spec || !tasks.length) return;
      try {
        const r = JSON.parse(spec), t = tasks[0];
        if (t && t.title) {
          t.recurrence = r.type;
          t.repeatEvery = r.every || 1;
          t.repeatUnit = r.unit || 'days';
          t.updatedAt = Date.now();
          save();
          form.dataset.autorecurrence = '';
          render();
        }
      } catch { form.dataset.autorecurrence = ''; }
    });
  }

  // Add a recurrence end date to the existing task editor.
  const repeat = document.getElementById('editRecurrence');
  if (repeat && !document.getElementById('editRecurrenceEnd')) {
    const wrap = document.createElement('div');
    wrap.innerHTML = '<label class="field-label" for="editRecurrenceEnd">Repeat until</label><input id="editRecurrenceEnd" type="date"><small class="muted">Leave empty to repeat indefinitely.</small>';
    repeat.closest('.field-grid')?.appendChild(wrap.firstElementChild);
    const input = document.getElementById('editRecurrenceEnd');
    input.closest('div')?.appendChild(input.nextElementSibling || document.createElement('span'));
  }

  const originalOpenEdit = openEdit;
  openEdit = function(id) {
    originalOpenEdit(id);
    const t = tasks.find(x => x.id === id);
    const input = document.getElementById('editRecurrenceEnd');
    if (input) input.value = t?.recurrenceEnd || '';
  };

  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const t = tasks.find(x => x.id === editingId);
      if (!t) return;
      const title = document.getElementById('editTitle').value.trim();
      if (!title) return;
      t.title = title.slice(0,160);
      t.notes = document.getElementById('editNotes').value.slice(0,4000);
      t.priority = document.getElementById('editPriority').value;
      t.due = isDate(document.getElementById('editDue').value) ? document.getElementById('editDue').value : '';
      t.dueTime = isTime(document.getElementById('editDueTime').value) ? document.getElementById('editDueTime').value : '';
      t.category = document.getElementById('editCategory').value;
      t.tags = [...new Set(document.getElementById('editTags').value.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean))].slice(0,15);
      t.recurrence = document.getElementById('editRecurrence').value;
      t.repeatEvery = Math.max(1, Math.min(99, Number(document.getElementById('editRepeatEvery').value)||1));
      t.repeatUnit = document.getElementById('editRepeatUnit').value;
      t.reminder = isTime(document.getElementById('editReminder').value) ? document.getElementById('editReminder').value : '';
      const end = document.getElementById('editRecurrenceEnd')?.value || '';
      t.recurrenceEnd = t.recurrence && isDate(end) ? end : '';
      t.updatedAt = Date.now();
      if (save()) { editDialog.close(); render(); toast('Task updated'); }
    }, true);
  }

  const originalNormalize = normalizeTask;
  normalizeTask = function(t) {
    const n = originalNormalize(t);
    if (!n) return n;
    n.recurrenceEnd = isDate(t?.recurrenceEnd) ? t.recurrenceEnd : '';
    n.order = Number.isFinite(Number(t?.order)) ? Number(t.order) : Number.MAX_SAFE_INTEGER;
    return n;
  };

  const originalComplete = completeTask;
  completeTask = function(id, checked=true) {
    const t = tasks.find(x => x.id === id);
    if (checked && t?.recurrence && t?.due && t.recurrenceEnd) {
      const next = nextRecurringDate(t);
      if (next && next > t.recurrenceEnd) {
        t.recurrence = '';
        t.recurrenceEnd = '';
      }
    }
    return originalComplete(id, checked);
  };

  // Keep the installed PWA icon useful: show the number of active tasks when the platform supports badges.
  function updateBadge() {
    if (!navigator.setAppBadge) return;
    const count = tasks.filter(t => !t.completed && !t.archived).length;
    navigator.setAppBadge(count).catch(() => {});
  }

  // Persist data when the page is backgrounded/closed and request persistent storage where supported.
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });
  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});

  // Keyboard shortcut help remains opt-in and does not override typing fields.
  const hint = document.querySelector('.quick-hint');
  if (hint && !hint.textContent.includes('My order')) {
    hint.insertAdjacentHTML('beforeend', ' · Drag tasks after selecting <code>My order</code>');
  }

  // Initial hardening pass after the base app has rendered.
  setTimeout(() => { updateBadge(); decorateDraggableTasks(); }, 0);
})();
