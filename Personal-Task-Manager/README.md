# Focus — Personal Task Manager

A modern, privacy-first personal task manager that runs entirely in the browser. No account or backend is required.

## Features

- Create, edit, duplicate, complete, reopen, and delete tasks
- Notes and multi-step subtasks
- Low / medium / high priorities
- Due dates and optional due times
- Overdue, Today, Upcoming, Completed, Inbox, and 14-day Calendar views
- Recurring tasks: daily, weekdays, weekly, monthly, yearly
- Optional in-browser reminder notifications
- Custom categories and tags
- Search across titles, notes, categories, and tags
- Status, priority, category, and tag filters
- Due-date, priority, recent, and title sorting
- Bulk completion and deletion
- Undo for destructive deletion/clear-completed actions
- Quick-add date/tag recognition (`tomorrow`, `today`, `YYYY-MM-DD`, `#tag`)
- Dark mode and compact mode support in the data model
- JSON backup export/import with validation and merge/replace behavior
- Keyboard shortcuts: `N` new task, `C` category, `Ctrl/Cmd+K` search
- Responsive accessible UI
- Installable PWA with offline caching
- No external runtime dependencies

## Data and privacy

Tasks and preferences are stored locally in the browser with `localStorage`. Nothing is sent to a server by the application. Export a backup if the data is important.

Reminder notifications are browser notifications and require permission. Because this is a static local-first app, reminder checking occurs while the app is open.

## Run

Open `index.html` in a modern browser, or serve the folder over HTTPS/localhost. GitHub Pages provides HTTPS and can install the app as a PWA.

## Backup

Use **Export** to save a JSON backup. **Import** can replace the current dataset or merge new task IDs into the existing dataset.

## Project structure

- `index.html` — application shell and task editor
- `styles.css` — responsive design system
- `app.js` — state, persistence, task logic, views, import/export, reminders
- `manifest.webmanifest` — PWA metadata
- `sw.js` — offline cache/service worker
- `icon.svg` — app icon

## Verification

The project is intentionally dependency-free. Recommended checks are:

```bash
node --check app.js
```

Then open the app in a browser and test add/edit/complete/delete, recurrence, subtasks, search/filtering, import/export, notifications, and offline/PWA behavior.
