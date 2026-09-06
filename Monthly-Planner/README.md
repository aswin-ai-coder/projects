# Monthflow — Monthly Planner

Monthflow is a modern, private, local-first monthly planning PWA. It is designed around the full monthly loop: **set outcomes → capture work → estimate capacity → schedule realistically → adapt when plans change → review results → carry learning forward**.

## Complete feature set

### Monthly planning
- Full month calendar board with previous/next/current navigation
- Drag-and-drop task rescheduling
- Day workload indicators and overload warnings
- Daily capacity, monthly capacity and configurable planning buffer
- Work-hour window and peak-energy window
- Optional weekend planning
- Capacity-aware auto-scheduling
- Dependency-aware scheduling that avoids blocked tasks
- Deadline-aware prioritization
- Capacity rebalancing across the month
- Long-task splitting into focused sessions
- Unfinished-work carry-over to backlog
- Monthly health check for overload, blockers, deadlines and goal alignment

### Tasks
- Title, notes, start time and duration
- P1–P4 priority
- High/medium/low energy
- Deadline
- Projects/areas
- Tags
- Goal linkage
- Task dependencies
- Daily, weekday, weekly and monthly recurrence
- Completion state and completion timestamp
- Drag/drop movement
- Double-click editing
- Keyboard-first quick creation
- Deterministic natural-language smart capture for common dates, durations, priorities and energy

### Goals and outcomes
- Monthly outcome goals
- Target + unit
- Linked-task progress
- Goal completion percentage
- Goal-focused monthly review
- Goal alignment health signal

### Calendar and data portability
- ICS calendar export
- ICS calendar import
- CSV month export
- Full JSON state export/import from the core planner
- Reusable monthly templates
- Apply the latest saved template to a chosen starting date
- Restore points before advanced mutations

### Advanced planning controls
- Smart scheduling
- Capacity rebalancing
- Dependency checks
- Deadline protection
- Focus-session splitting
- Carry-over management
- Focus-time target
- Month health analysis
- Snapshot/restore
- Advanced Control Center
- Search shortcut `/`
- Command-center shortcut `Ctrl/⌘ K`
- New-task shortcut `N`

### Review and analytics
- Monthly review ritual
- Wins, blockers, changes and next-month focus
- Completion analytics
- Planned-vs-total work
- Capacity utilization
- Priority mix
- Project workload
- Deadline radar
- Overloaded-day detection
- Goal progress

### Product quality
- Responsive desktop/tablet/mobile UI
- Light/dark/system theme
- Semantic controls and live status messaging
- Persistent browser storage
- Offline PWA service worker including the advanced planner bundle
- Installable web app manifest
- No backend, account, telemetry, ads or external runtime dependency
- GitHub Actions syntax, manifest, required-file, wiring and feature-marker validation
- GitHub Pages deployment

## Privacy and limitations

All planner data stays in the browser's `localStorage`; the app does not upload planner data. Browser storage is not an encrypted vault and does not automatically synchronize between devices. JSON/CSV/ICS exports are the portable bridges. The smart planner is deliberately deterministic and explainable rather than pretending to be a server-side AI service.

## Architecture

The project is dependency-free HTML, CSS and browser JavaScript. `app.js` owns core planner state/rendering, `advanced.js` provides the advanced planning/data suite, `sw.js` provides offline caching, and GitHub Actions validates and deploys the folder.

## Research basis

The feature design was cross-checked against current productivity patterns from Sunsama, Akiflow and Reclaim: guided planning/reviews, realistic workload limits, planned time and duration, recurrence, priorities, projects/tags, time blocking, natural-language planning, focus goals, adaptive task scheduling, buffers, analytics and calendar workflows. The implementation keeps those patterns that can be delivered honestly in a static local-first app.

## Scope boundary

Monthflow does not claim live Google/Outlook calendar synchronization, multi-device cloud sync, accounts, team collaboration or a hosted AI agent. Those require external services and credentials; ICS/CSV/JSON provide real portable interoperability without fake integrations.
