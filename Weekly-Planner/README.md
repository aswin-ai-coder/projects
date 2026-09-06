# Weekflow — Weekly Planner

A modern, local-first weekly planning PWA built for realistic workload planning rather than simply filling a calendar.

## Features

- 7-day visual planning board
- Drag tasks between days
- Weekly objectives with task alignment and progress
- Daily capacity limits and workload bars
- Automatic week balancing that respects capacity
- Task duration, start time, priority, energy, deadline, notes, tags and recurrence
- Big 3 per day
- Backlog / unscheduled capture
- Search and priority filtering
- Weekly review ritual with wins, blockers and next-week focus
- Weekly analytics: completed work, remaining hours, objective progress, capacity overloads and priority mix
- Reusable weekly templates
- JSON export/import backups
- Theme settings and persistent browser storage request
- Responsive mobile layout
- Installable PWA with offline service worker
- Keyboard shortcut: `N` for a new task; `Ctrl/⌘ K` opens backlog search
- No account, backend, telemetry or external dependency

## Product decisions

The planner intentionally keeps weekly planning outcome-focused. It does not require every future hour to be fixed in advance. Tasks can stay in the backlog until a day is chosen, while daily capacity makes overload visible and auto-balancing helps recover when a day becomes too full.

## Privacy

All planner data lives in browser `localStorage`. Nothing is uploaded by the app. Browser storage is not an encrypted vault, and data does not automatically sync across browsers or devices. Use Export regularly for portable backups.

## Deployment

The project is deployed from `Weekly-Planner/` through GitHub Pages using the repository workflow. The app is static and needs no server.

## Research basis

The design draws on current weekly-planning patterns such as guided weekly objectives and review, realistic workload thresholds, carry-over work, time blocking, task duration, priorities and recurrence. See Sunsama's weekly planning/review guidance and Akiflow's task planning/time-blocking documentation for the product patterns that informed the design.
