# Dayflow — Daily Planner

A polished, private, local-first daily planning PWA built as a standalone static app. It combines task capture, visual time blocking, Big 3 priorities, habits, routines, focus sessions, daily review and advanced capacity-aware planning without an account or backend.

## Core features

- Visual daily timeline from 6 AM–10 PM
- Quick capture with natural shortcuts such as `tomorrow`, `5pm`, `60m`, `#school`, and `!p1`
- Task priorities, duration, notes, tags and recurring tasks
- Big 3 daily priorities
- Unscheduled inbox
- Day navigation and 7-day weekly overview
- Task editing, completion, deletion and focus actions
- Built-in focus timer
- Habits, schedules and streaks
- Reusable routines
- Daily review with wins, learnings and tomorrow planning
- Search, status/priority filters and sorting
- Light, dark and system themes
- Compact mode and responsive mobile layout
- Browser reminders while the app is open
- JSON export/import
- Persistent-storage request
- Installable PWA and offline service worker

## Advanced planning intelligence

The Control Center adds the deeper planning features found in modern time-blocking and daily-planning workflows:

- Capacity-aware daily workload meter
- Configurable work window and daily capacity
- Protected planning buffers
- Peak-energy and low-energy planning windows
- Priority/deadline-aware auto-planning
- Dependency-aware task blocking fields
- Energy level per task
- Deadline per task
- Location/context per task
- Eisenhower urgent/important matrix
- Goal tracking with task linkage
- Project tracking with task linkage
- Task splitting into smaller work blocks
- Carry overdue unfinished work forward
- Seven-day workload rebalance
- Tomorrow planning shortcut
- Reusable day templates
- Template application for repeated plans
- Seven-day capacity visualization
- Calendar `.ics` export
- Calendar `.ics` import
- Print-friendly daily plan
- Advanced task intelligence editor
- Mobile-friendly advanced control center
- Keyboard shortcut `Alt/Option + P` (or `Cmd + P` on supported keyboards) for planning intelligence

The auto-planner is deterministic and transparent rather than pretending to be an AI scheduler: it prioritizes deadlines and priority, uses energy preferences, respects the configured work window and buffers, and avoids placing tasks that are blocked by unfinished dependencies.

## Privacy and storage

Dayflow stores planner data in browser `localStorage`. This is intentionally local-first: data does not automatically sync between browsers or devices. Use Export regularly if the data matters.

Browser storage is not a secure vault. Do not store passwords, authentication tokens, financial secrets or other sensitive credentials in the planner.

The service worker caches the application shell so the planner can continue to open offline after its first successful load.

## Architecture

```text
Daily-Planner/
├── index.html
├── styles.css
├── app.js
├── advanced.js
├── manifest.webmanifest
├── sw.js
├── icon.svg
└── README.md
```

No backend or third-party runtime dependency is required. External calendar integration is deliberately file-based through ICS import/export so the static GitHub Pages deployment remains private and self-contained.

## Validation

The GitHub Actions workflow checks:

- JavaScript syntax for the core and advanced modules
- Service-worker syntax
- Required files
- Manifest JSON
- Script/offline wiring
- Advanced feature markers
- GitHub Pages deployment configuration

## Product decisions

The planner was designed around the complete planning loop: capture → prioritize → estimate → allocate capacity → time-block → focus → complete → review → carry forward/rebalance.

Cloud synchronization, accounts, collaborative calendars and server-side AI scheduling are intentionally not added to this standalone version because they would change the privacy and deployment model. The local deterministic scheduler provides advanced planning without requiring a server or sending planner data elsewhere.

## Deployment

The repository workflow deploys `Daily-Planner/` to GitHub Pages. The expected public path is:

`https://aswin-ai-coder.github.io/projects/Daily-Planner/`
