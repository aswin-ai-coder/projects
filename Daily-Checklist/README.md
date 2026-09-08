# Daily Checklist

A beginner-friendly, local-first checklist app for repeating everyday processes without accounts or a backend.

## Features

- Today dashboard with completion ring
- Multiple named checklists
- One-tap completion, edit, notes and delete
- Today / All / Completed views
- Quick add with Enter
- Reusable checklist templates
- Reusable plans with daily, weekday, weekly and monthly recurrence metadata
- Run a saved plan into a fresh checklist
- Local completion history and simple activity statistics
- Checklist Intelligence with deterministic local insights
- Local restore points
- JSON backup/import
- CSV export
- Light/dark/system theme
- Responsive mobile-friendly interface
- PWA/offline caching
- Local-first/private browser storage
- No account, server, analytics or remote AI dependency

## Product direction

Research into current checklist products consistently points to reusable checklists, recurring schedules, templates, progress/history, reminders, subtasks, export/backup and offline/privacy as useful capabilities. Daily Checklist focuses on the reusable-process core while staying intentionally simple.

Research references include current Daily Checklist apps, repeatable-checklist products, Asana checklist patterns and open-source/local-first approaches. Examples reviewed include Google Play's Daily Checklist listings, Repeatable Checklists, CheckLoop, Asana Daily Checklist and related current productivity products.

## Honest scope

This browser project does not pretend to provide native push notifications, cloud sync, accounts, team collaboration, calendar synchronization or server-side AI. Recurrence is represented through reusable plans and can be run locally; native background alarms require a platform-specific app.

## Tech

Plain HTML, CSS and JavaScript. Data is stored in `localStorage`. The service worker caches the application shell for offline use.

## Deployment

Designed for GitHub Pages at:

`https://aswin-ai-coder.github.io/projects/Daily-Checklist/`
