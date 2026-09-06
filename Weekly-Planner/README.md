# Weekflow — Weekly Planner

A modern, local-first weekly planning PWA designed around outcomes, realistic capacity, adaptive scheduling and a deliberate weekly review loop.

## Feature set

### Planning
- 7-day visual weekly board
- Drag-and-drop day planning
- Weekly navigation and current-week shortcut
- Backlog / unscheduled capture
- Task duration, start time, priority, energy, deadline, notes and tags
- Daily Big 3
- Recurrence support
- Weekly objectives with task alignment and progress
- Capacity-aware workload bars and overload detection
- Auto-balance across the week
- Advanced smart planning using capacity, work hours, priority, urgency, energy and focus preferences
- Dependency-aware balancing for tasks that declare `dependsOn` relationships
- Carry unfinished work from the previous week
- Split long work into smaller sessions
- Preferred focus days and weekly focus-time goal
- Optional weekend planning

### Advanced data and interoperability
- Reusable weekly templates with capture and apply
- JSON export/import backups
- CSV task export
- iCalendar (ICS) export/import with task durations
- Natural-language task capture for common day, duration, priority, tag and context shortcuts
- Restore points with rollback to the latest saved state
- Persistent browser storage request

### Review and insight
- Weekly review ritual with wins, blockers and next-week focus
- Saved weekly reflections
- Objective completion analysis
- Completed-time and planned-time summaries
- Dependency-blocked work visibility
- Daily capacity risk report
- Priority mix
- Workload analytics

### UX and platform
- Modern responsive interface
- Light/dark/system themes
- Keyboard shortcuts: `N` for new task, `Ctrl/⌘ K` for backlog search, `P` for Control Center, `S` for smart planning
- Installable PWA
- Offline service worker caching
- No account, backend, telemetry or external runtime dependency

## Product principles

Weekflow deliberately combines the strongest patterns from modern planning tools without turning the planner into a rigid calendar. Weekly objectives define outcomes; tasks carry realistic duration and priority; capacity makes overload visible; smart planning proposes a workable distribution; review closes the loop.

The design research considered current patterns from Sunsama (weekly objectives, guided review/planning, carry-over work, workload management), Akiflow (planned time, duration, recurrence, natural-language planning and time blocking), Reclaim (adaptive focus time, habits and workload protection), and Notion-style calendar/timeline visualization. The implementation remains intentionally local-first and dependency-free.

## Privacy

All planner data is stored in browser `localStorage`. Nothing is uploaded by the app. Browser storage is not an encrypted vault, and data does not automatically sync across browsers or devices. Use JSON/CSV/ICS export for portable backups and interoperability.

## Deployment

The project is deployed from `Weekly-Planner/` through GitHub Pages using the repository workflow. The app is static and needs no server.

## Engineering

The GitHub Actions workflow syntax-checks the planner scripts, validates required assets and manifest JSON, checks feature wiring/markers, then publishes the static PWA to GitHub Pages. The service worker cache is versioned with the application bundle so new releases invalidate older cached assets.
