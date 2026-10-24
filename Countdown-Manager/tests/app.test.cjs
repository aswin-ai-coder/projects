const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function boot() {
  const dom = new JSDOM(html, {
    url: 'https://moment.test/',
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window } = dom;
  window.setInterval = () => 1;
  window.clearInterval = () => {};
  window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  window.confirm = () => true;
  window.prompt = () => null;
  window.eval(app);
  return dom;
}

test('renders the app and creates a countdown that persists locally', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;

  assert.match(doc.title, /Moment.*Countdown Manager/);
  assert.ok(doc.querySelector('#countdownList'));
  assert.equal(doc.querySelectorAll('.countdown-card').length, 0);

  doc.querySelector('#addBtn').click();
  doc.querySelector('#eventTitle').value = 'Automated test milestone';
  doc.querySelector('#eventDate').value = '2099-06-15';
  doc.querySelector('#eventNotes').value = 'Saved by the browser test';
  doc.querySelector('#eventForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

  assert.equal(doc.querySelectorAll('.countdown-card').length, 1);
  assert.match(doc.querySelector('#countdownList').textContent, /Automated test milestone/);
  const stored = JSON.parse(window.localStorage.getItem('moment-countdowns-v1'));
  assert.equal(stored.length, 1);
  assert.equal(stored[0].title, 'Automated test milestone');
  assert.equal(stored[0].notes, 'Saved by the browser test');
  dom.window.close();
});

test('escapes user-provided markup and filters countdowns by search', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;

  doc.querySelector('#addBtn').click();
  doc.querySelector('#eventTitle').value = '<img src=x onerror=alert(1)> Safe title';
  doc.querySelector('#eventDate').value = '2099-06-15';
  doc.querySelector('#eventForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));

  assert.equal(doc.querySelectorAll('#countdownList img').length, 0);
  assert.match(doc.querySelector('#countdownList').textContent, /<img src=x onerror=alert\(1\)> Safe title/);

  const search = doc.querySelector('#search');
  search.value = 'not found';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(doc.querySelectorAll('.countdown-card').length, 0);
  assert.equal(doc.querySelector('#emptyState').hidden, false);
  dom.window.close();
});

test('imports a valid JSON backup by merging records and restores custom collections first', () => {
  const dom = boot();
  const { window } = dom;
  const doc = window.document;
  const backup = {
    categories: [{ id: 'custom-test', name: 'Test collection', color: 'mint' }],
    events: [{ id: 'event-test', title: 'Imported event', date: '2099-07-01', category: 'custom-test', repeat: 'none', reminder: 'none' }]
  };
  window.confirm = () => true;
  const file = new window.File([JSON.stringify(backup)], 'backup.json', { type: 'application/json' });
  Object.defineProperty(file, 'text', { value: async () => JSON.stringify(backup) });

  return (async () => {
    // Exercise the same file-input path a person uses in the app.
    const input = doc.querySelector('#fileInput');
    Object.defineProperty(input, 'files', { configurable: true, value: [file] });
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
    await new Promise(resolve => window.setTimeout(resolve, 20));
    const storedEvents = JSON.parse(window.localStorage.getItem('moment-countdowns-v1'));
    const storedCategories = JSON.parse(window.localStorage.getItem('moment-categories-v1'));
    assert.ok(storedEvents.some(event => event.title === 'Imported event' && event.category === 'custom-test'));
    assert.ok(storedCategories.some(category => category.id === 'custom-test'));
    dom.window.close();
  })();
});
