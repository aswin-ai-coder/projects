# Dayflow — Daily Planner

A polished, private, local-first daily planning PWA built as a standalone static app. It combines a task inbox, visual time blocking, Big 3 priorities, routines, habits, focus sessions and daily review without requiring an account or backend.

## Features

- Visual daily timeline from 6 AM–10 PM
- Quick capture with natural shortcuts such as `tomorrow`, `5pm`, `60m`, `#school`, and `!p1`
- Task priorities, duration, notes, tags and recurring tasks
- Big 3 daily priorities
- Unscheduled inbox for tasks that still need a time block
- Day navigation and 7-day weekly overview
- Drag-ready task blocks with edit/complete/focus actions
- Built-in focus timer with configurable session length
- Habits with daily/weekday/weekend schedules and streaks
- Reusable routines for repeated sequences
- Daily review with wins, learnings and tomorrow planning
- Search and task filters
- Light, dark and system themes
- Compact mode and responsive mobile layout
- Browser reminders while the app is open
- JSON export/import for portable backups
- Persistent-storage request in Settings
- Installable PWA with offline service worker
- No accounts, analytics, ads, cloud database or third-party runtime dependencies

## Privacy and storage

Dayflow stores planner data in browser `localStorage`. This is intentionally local-first: data does not automatically sync between browsers or devices. Use Export regularly if the data matters.

Browser storage is not a secure vault. Do not store passwords, authentication tokens, financial secrets or other sensitive credentials in the planner.

The service worker caches the application shell so the planner can continue to open offline after its first successful load.

## Project structure

```text
Daily-Planner/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── sw.js
├── icon.svg
└── README.md
```

## Validation

The GitHub Actions workflow checks JavaScript syntax, service-worker syntax, required files, manifest JSON, application wiring and feature markers before deploying the folder to GitHub Pages.

## Product decisions

The planner deliberately stays static and local-first. Cloud sync, accounts, collaborative calendars and AI scheduling would require a backend/service and a different privacy model, so they are not silently added to this standalone version.

## Deployment

The repository workflow deploys `Daily-Planner/` to GitHub Pages. The expected public path is:

`https://aswin-ai-coder.github.io/projects/Daily-Planner/`
