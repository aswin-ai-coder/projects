# Activity Logger

A standalone, local-first activity and time tracking PWA for personal use.

## Core experience

- Live timer with pause/resume and stop-and-review logging
- Manual activity capture with start/end time and duration
- Automatic duration calculation from start/end times
- Today dashboard with total, count, longest session and top category
- Month calendar with daily totals and entry counts
- Historical date navigation and 7/14/30-day timeline
- Reports for daily volume, category distribution, hourly rhythm, active-day average and peak hour
- Daily goals for all activity or a selected category
- Goal progress, remaining time and browser notifications when a goal is reached
- Favorites and quick-start activity presets
- Search across activity, context, tags and notes
- Category and active/archive filtering
- Edit, archive, restore and permanent deletion from archive
- CSV reporting export and complete JSON backup/restore
- Theme persistence, settings and local-storage usage visibility
- Keyboard shortcuts and responsive mobile UI
- Print-friendly reports
- Installable PWA with offline service worker

## Privacy model

Data stays in this browser's local storage. There is no account, server database, telemetry backend or cloud sync. JSON export is the portability mechanism.

Local browser storage is not a secure vault. Do not store passwords, authentication tokens or other secrets here.

## Technical boundary

This is intentionally a static GitHub Pages PWA. A web page cannot reliably read the operating system's active application/window or browser-wide activity. Therefore this project does **not** fake automatic OS tracking. True OS-level automatic tracking would require a separate browser-extension or native companion architecture.

Browser timers and notifications are also subject to normal page/browser lifecycle limits; the app does not claim guaranteed background execution after the page is closed.

## Architecture

- `index.html` — application shell and dialogs
- `activity.js` — standalone application state, timer, calendar, reports, goals and history
- `enhancements.js` — duration helpers, notification permission and keyboard/theme helpers
- `activity.css` — responsive light/dark UI
- `features.json` — product feature and field contract
- `manifest.webmanifest` — install metadata
- `sw.js` — offline asset cache
- `icon.svg` — application icon

No build step is required.

## Run

Open the GitHub Pages URL for `Activity-Logger/` or serve the folder from any static web server.
