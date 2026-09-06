# Monthflow — Monthly Planner

Monthflow is a modern, private, local-first monthly planning PWA. It is designed to answer the monthly question: **what outcomes matter, how much work can realistically fit, and how should the month adapt when reality changes?**

## Feature set

### Monthly planning
- Full month calendar board
- Previous/next/current month navigation
- Drag-and-drop task rescheduling
- Day workload indicators and overload warnings
- Daily capacity and monthly usable-capacity limits
- Configurable planning buffer
- Work-hour and peak-energy settings
- Optional weekend planning
- Automatic capacity-aware monthly planning
- Dependency-aware auto-planning
- Deadline-aware prioritization
- Backlog and carry-over work

### Tasks
- Duration and start time
- P1–P4 priority
- Energy level
- Deadline
- Notes
- Projects/areas
- Tags
- Goal linkage
- Task dependencies
- Daily, weekday, weekly and monthly recurrence
- Completion history
- Keyboard-first quick creation
- Natural-language quick capture for common date/duration/priority phrases

### Goals and outcomes
- Monthly outcome goals
- Target + unit
- Linked-task progress
- Goal completion percentage
- Goal-oriented monthly review

### Advanced planning tools
- Quick capture
- ICS calendar export
- CSV export
- JSON full-state backup/import
- Reusable monthly templates
- Apply latest template to another month
- Capacity/risk analytics
- Priority and project workload analytics
- Deadline radar
- Monthly review ritual with wins, blockers, changes and next focus

### Product quality
- Responsive desktop/tablet/mobile UI
- Light/dark/system theme
- Accessible status messages and semantic controls
- Persistent browser storage request
- Offline PWA service worker
- PWA install manifest and shortcuts
- No backend, account, telemetry, ads or external runtime dependency

## Privacy

All planner data is stored in the browser's `localStorage`. The app does not upload planner data. Browser storage is not an encrypted vault, and local-first storage does not automatically synchronize between devices. Use JSON export for portable backups.

## Architecture

The project is intentionally dependency-free: HTML + CSS + browser JavaScript. `app.js` owns planner state and rendering. `advanced.js` adds portable calendar/data tools and templates. `sw.js` provides offline caching. GitHub Actions performs syntax, manifest, required-file, wiring and feature-marker validation before deploying the folder to GitHub Pages.

## Research basis

The design incorporates current productivity patterns including monthly objectives/reviews, task duration, planned time, deadlines, recurrence, projects/tags, time blocking, focus goals, workload-aware scheduling, adaptive routines, analytics and natural-language planning. These patterns were cross-checked against current product documentation from Sunsama, Akiflow, Reclaim and Notion.

## Limitations by design

This is a static local-first application. It does not pretend to provide cloud accounts, multi-device synchronization, live external calendar synchronization or server-side AI. ICS/CSV/JSON are portable bridges that work without a backend.
