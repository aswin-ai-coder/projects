# Focus — Personal Task Manager

Focus is a modern, privacy-first personal task manager that runs entirely in the browser. It is local-first, installable as a PWA, works offline, and needs no account or backend.

## Feature-complete scope

### Task capture and organization

- Create, edit, duplicate, complete, reopen, archive, restore, and delete tasks
- Notes and multi-step subtasks with progress counts
- Low / medium / high priorities
- Due dates and optional due times
- Categories and tags
- Inbox, Today, Upcoming, Overdue, Calendar, Completed, and Archived views
- Custom category creation, rename, and deletion
- Search across task titles, notes, steps, categories, and tags
- Status, priority, category, and tag filters
- Due-date, priority, recent, title, and manual-order sorting
- Drag-and-drop task ordering when **My order** is selected
- Bulk completion and deletion
- Undo for destructive deletion and clear-completed actions

### Scheduling and reminders

- Daily, weekday, weekly, monthly, yearly, and custom recurring tasks
- Optional recurrence end date
- Recurring series automatically creates the next occurrence when completed
- Quick-add recognition for today, tomorrow, next week, relative dates, ISO dates, times, tags, and priorities
- Optional browser reminder notifications
- Clear reminder limitation: browser reminders are checked while Focus is open; persistent background push requires a server/service that this private local-first app intentionally does not use

### Calendar and productivity UX

- Monthly calendar view with task density, priority indicators, and completed state
- Progress summary and completion bar
- Dark, light, and system themes
- Compact task rows
- Keyboard shortcuts for common actions
- Responsive desktop/mobile layout
- Accessible labels, native controls, visible focus behavior, and keyboard-operable workflows

### Data, privacy, and portability

- Local browser storage only
- No analytics, ads, tracking, account, or external runtime dependency
- JSON backup export/import
- Import validation with merge or replace behavior
- Safe handling of malformed local data and storage failures
- Attempts to request persistent browser storage where supported
- App icon badge for active-task count where the installed platform supports the Badging API

### PWA and offline support

- Web app manifest
- Standalone install experience
- Service-worker offline caching
- Cache versioning and stale-cache cleanup
- Install prompt support where the browser exposes it
- PWA shortcuts for Today and New task
- GitHub Pages compatible HTTPS deployment

## Privacy and storage

Tasks and preferences stay on the device in browser storage. Nothing is sent to a server by the application. Export a backup before clearing browser data or moving to another device.

The app deliberately remains local-first. Multi-device synchronization, accounts, collaboration, and cloud storage are outside the intended scope of this personal/private product and would add infrastructure without being necessary for the core use case.

## Run

Open the project through a local web server or GitHub Pages. For full PWA/service-worker behavior, use HTTPS or `localhost`; opening files directly with `file://` is not the intended deployment mode.

## Backup

Use **Export** to create a portable JSON backup. **Import** validates task records and lets you replace the current dataset or merge new task IDs into it.

## Project structure

- `index.html` — application shell, navigation, composer, dialogs, and task editor
- `styles.css` — responsive design system and themes
- `app.js` — core state, persistence, task logic, views, import/export, and reminders
- `enhancements.js` — final productivity hardening, smart quick-add extensions, manual ordering, recurrence metadata, and PWA polish
- `manifest.webmanifest` — PWA metadata and app shortcuts
- `sw.js` — versioned offline cache/service worker
- `icon.svg` — app icon

## Verification

The project is dependency-free. GitHub Actions validates JavaScript syntax, required files, the manifest JSON, and local asset references on pushes and pull requests.

For manual browser QA, verify the primary workflows: create/edit/complete/reopen/delete, notes/subtasks, recurrence and recurrence end dates, reminders, search/filter/sort/manual ordering, categories/tags, calendar, archive/restore, bulk actions/undo, import/export, theme, install/offline behavior, and responsive keyboard navigation.
