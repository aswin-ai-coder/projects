# Activity Logger

A private, local-first activity and time logger designed for fast manual capture and useful personal time insights.

## Features

- Quick activity capture with date and start/end time
- Manual duration entry with automatic duration calculation from start/end time
- Categories, context, tags, notes, priority, favorites
- Completion and lightweight status workflow
- Live focus timer with saved sessions
- Daily, 7-day, and timeline summaries
- Category time breakdown and today's hourly distribution
- Daily goal tracking and current streak
- Search, filters, sorting, bulk complete/archive, duplicate
- Calendar, dashboard, and list-oriented workflows supported by the shared engine
- JSON backup/restore, CSV export, and printing
- Browser notification permission for timer/reminder UX
- Responsive accessible controls and keyboard-friendly actions
- Local-first browser storage; no account or server required

## Privacy

Data is stored in the browser's local storage for this static app. It is not synchronized between browsers or devices. Export backups regularly if the activity history matters to you. Browser storage should not be treated as a secure vault for passwords, authentication tokens, or other secrets.

## Design notes

The feature set follows current patterns from modern time/activity trackers: timer and manual entry, calendar/history views, categories/tags, favorites, reporting/trends, goals/alerts, and offline/local-first privacy. See the linked research in the engineering notes for the rationale.

## Run

Open `index.html` through the GitHub Pages site or another static web server. No build step is required.
