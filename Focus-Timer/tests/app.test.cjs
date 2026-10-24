const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function boot() {
  const dom = new JSDOM(html, { url: 'https://still.test/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.setInterval = () => 1;
  window.clearInterval = () => {};
  window.setTimeout = () => 1;
  window.confirm = () => true;
  window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  window.navigator.serviceWorker = undefined;
  window.eval(app);
  return dom;
}

test('boots with a timer and starts and pauses without losing state', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  assert.match(doc.title, /Still.*Focus Timer/);
  assert.equal(doc.querySelector('#timeDisplay').textContent, '25:00');
  doc.querySelector('#startBtn').click();
  assert.equal(doc.querySelector('#startText').textContent, 'Pause');
  assert.ok(JSON.parse(window.localStorage.getItem('still-focus-v1')).running);
  doc.querySelector('#startBtn').click();
  assert.equal(doc.querySelector('#startText').textContent, 'Start focus');
  assert.equal(JSON.parse(window.localStorage.getItem('still-focus-v1')).running, false);
  dom.window.close();
});

test('creates tasks, sets the active focus, and tracks completion', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  doc.querySelector('#taskInput').value = 'Read chapter';
  doc.querySelector('#taskEstimate').value = '2';
  doc.querySelector('#taskForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.match(doc.querySelector('#taskList').textContent, /Read chapter/);
  const taskId = JSON.parse(window.localStorage.getItem('still-tasks-v1'))[0].id;
  doc.querySelector('[data-task-select="' + taskId + '"]').click();
  assert.equal(doc.querySelector('#activeTaskTitle').textContent, 'Read chapter');
  doc.querySelector('[data-task-toggle="' + taskId + '"]').checked = true;
  doc.querySelector('[data-task-toggle="' + taskId + '"]').dispatchEvent(new window.Event('change', { bubbles: true }));
  assert.equal(JSON.parse(window.localStorage.getItem('still-tasks-v1'))[0].completed, true);
  dom.window.close();
});

test('escapes task markup and persists custom timer settings', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  doc.querySelector('#taskInput').value = '<img src=x onerror=alert(1)> note';
  doc.querySelector('#taskForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(doc.querySelectorAll('#taskList img').length, 0);
  assert.match(doc.querySelector('#taskList').textContent, /<img src=x onerror=alert\(1\)> note/);
  doc.querySelector('#settingsOpen').click();
  doc.querySelector('#focusMinutes').value = '30';
  doc.querySelector('#settingsForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(JSON.parse(window.localStorage.getItem('still-settings-v1')).focus, 30);
  assert.equal(doc.querySelector('#timeDisplay').textContent, '30:00');
  dom.window.close();
});

test('shows backup import controls and accurately describes automatic session starts', () => {
  const dom = boot();
  const doc = dom.window.document;
  assert.ok(doc.querySelector('#importDataButton'));
  assert.ok(doc.querySelector('#importFile'));
  assert.match(doc.querySelector('label[for="autoBreaks"]')?.textContent || doc.querySelector('#autoBreaks').parentElement.textContent, /5 seconds/);
  assert.match(doc.querySelector('#autoFocus').parentElement.textContent, /5 seconds/);
  dom.window.close();
});

test('imports a validated backup after confirmation and restores settings and tasks', async () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  const backup = {
    format: 'still-focus-backup-v1',
    settings: { focus: 30, short: 5, long: 15, longEvery: 4, dailyGoal: 90, autoBreaks: false, autoFocus: false, soundAlerts: true, pauseHidden: false },
    tasks: [{ id: 'backup-task', title: 'Restored task', estimate: 2, sessionsDone: 1, completed: false, created: new Date().toISOString() }],
    history: [{ id: 'backup-session', type: 'focus', minutes: 25, taskTitle: 'Past work', at: new Date().toISOString() }],
    timer: { mode: 'focus', remaining: 1800, running: false, endAt: null, focusCycle: 0, session: 1, todayKey: new Date().toISOString().slice(0,10), todayMinutes: 0, todaySessions: 0 }
  };
  const file = { text: () => Promise.resolve(JSON.stringify(backup)) };
  Object.defineProperty(doc.querySelector('#importFile'), 'files', { configurable: true, value: [file] });
  doc.querySelector('#importFile').dispatchEvent(new window.Event('change', { bubbles: true }));
  await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
  assert.equal(JSON.parse(window.localStorage.getItem('still-settings-v1')).focus, 30);
  assert.equal(JSON.parse(window.localStorage.getItem('still-tasks-v1'))[0].title, 'Restored task');
  assert.equal(doc.querySelector('#timeDisplay').textContent, '30:00');
  dom.window.close();
});

test('rejects malformed backup data without replacing existing tasks', async () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  doc.querySelector('#taskInput').value = 'Keep this task';
  doc.querySelector('#taskForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  const file = { text: () => Promise.resolve(JSON.stringify({ format: 'wrong-format', tasks: [], history: [] })) };
  Object.defineProperty(doc.querySelector('#importFile'), 'files', { configurable: true, value: [file] });
  doc.querySelector('#importFile').dispatchEvent(new window.Event('change', { bubbles: true }));
  await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
  assert.equal(JSON.parse(window.localStorage.getItem('still-tasks-v1'))[0].title, 'Keep this task');
  assert.match(doc.querySelector('#toast').textContent, /valid Still Focus backup/i);
  dom.window.close();
});

test('task search filters the task list without deleting stored tasks', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  for (const title of ['Read science', 'Write notes']) {
    doc.querySelector('#taskInput').value = title;
    doc.querySelector('#taskForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  }
  doc.querySelector('#taskSearch').value = 'science';
  doc.querySelector('#taskSearch').dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.match(doc.querySelector('#taskList').textContent, /Read science/);
  assert.doesNotMatch(doc.querySelector('#taskList').textContent, /Write notes/);
  assert.equal(JSON.parse(window.localStorage.getItem('still-tasks-v1')).length, 2);
  dom.window.close();
});

test('notification and shortcut preferences are available and keyboard shortcuts can be disabled', () => {
  const dom = boot();
  const doc = dom.window.document;
  assert.ok(doc.querySelector('#enableNotifications'));
  assert.ok(doc.querySelector('#shortcutsEnabled'));
  doc.querySelector('#shortcutsEnabled').checked = false;
  doc.querySelector('#settingsOpen').click();
  doc.querySelector('#shortcutsEnabled').checked = false;
  doc.querySelector('#settingsForm').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  assert.equal(JSON.parse(dom.window.localStorage.getItem('still-settings-v1')).shortcuts, false);
  dom.window.close();
});
