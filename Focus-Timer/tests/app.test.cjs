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
