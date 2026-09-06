# Goalpath — Personal Goal Tracker

A modern, private, local-first personal goal system for turning intentions into measurable outcomes, action plans, supporting habits, milestones and regular reflection.

## Advanced feature-complete scope

### Goal foundations
- SMART, OKR, KPI and outcome goal types
- Numeric targets with current value, target value, unit and baseline/start value
- Start and target dates, priorities and status signals
- Parent goals and multi-level sub-goal rollups
- Areas of life and portfolio balance
- Tags and configurable review cadence
- Why-it-matters context, strategy, constraints and definition-of-done notes

### Outcome measurement
- Success measures / key results per goal
- Current and target values for each measure
- Milestones with due dates and completion state
- Check-ins with value, confidence, notes, wins and blockers
- Historical progress records
- Trend rate and pace estimation from check-in history
- Simple projection of time remaining at the observed pace
- Goal quality/completeness signal

### Action and behavior planning
- Goal-linked action plans
- One-time, daily and weekly action recurrence metadata
- Supporting habits kept distinct from outcome progress
- Habit logs and cadence/target tracking
- Risks, severity and mitigation plans
- Goal journal for context, lessons and small wins
- Focus-goal selection

### Portfolio intelligence
- Active/paused/completed goal portfolio
- At-risk and off-track queue
- Overdue detection
- Stale-goal detection when progress has not been updated recently
- Missing-measure detection
- Goal quality scoring
- Progress pace and projection indicators
- Area-of-life balance view
- Portfolio attention queue
- Dashboard metrics and progress history
- Weekly/monthly/quarterly review history

### Planning and review
- Lightweight weekly, monthly and quarterly reviews
- Wins, lessons, blockers and next-focus capture
- Reusable starter OKR template
- Local snapshots and restore
- JSON backup/import
- Advanced JSON backup
- CSV portfolio export
- Goal Studio for deep editing of measures, milestones, actions, habits, risks and journal entries
- Ctrl/Cmd+K shortcut for Goal Studio

### UX and platform
- Search and filtering
- P1–P4 prioritization
- Configurable focus limit
- Light/dark/system theme
- Responsive mobile layout
- Keyboard-friendly controls
- PWA installability
- Offline service-worker shell
- Local-first browser storage
- No account, backend, telemetry or external runtime dependency

## Product design principles

Goalpath combines current goal-management patterns: goal hierarchies, measurable success measures, progress rollups, regular status updates, historical activity, action plans, habits, milestones, risk tracking, dashboards, templates and review rituals. Modern goal products also emphasize pace lines, streak/history views, daily focus, action plans and reusable templates. Goalpath implements these patterns locally and deterministically rather than pretending to provide hosted AI or cloud collaboration.

The design intentionally separates **outcomes** from **supporting behavior**: a habit or action can support a goal without being falsely treated as the goal's numeric result.

## Privacy

Goal data is stored in the browser's local storage. JSON/CSV backup files are generated only when you explicitly export them. The application does not upload goal data to a backend.

## Architecture

- `index.html` — semantic application shell and dialogs
- `styles.css` — responsive visual system
- `app.js` — core goal CRUD, check-ins, reviews, dashboard and persistence
- `advanced.js` — Goal Studio, success measures, milestones, action plans, habits, risks, journal, trend/projection intelligence, portfolio analytics, advanced export and PWA registration
- `manifest.webmanifest` — install metadata
- `sw.js` — offline cache
- `icon.svg` — app icon
- `.github/workflows/personal-goal-tracker.yml` — syntax, wiring and GitHub Pages validation/deployment

## Honest scope boundary

This is a complete advanced local-first personal tracker. It does not fake live Google/Outlook synchronization, multi-device cloud synchronization, accounts, team permissions, external health-data integrations, shared accountability, or a hosted AI coach. Those require backend/auth/integration infrastructure beyond a static GitHub Pages application.

## Research basis

The deeper feature pass reviewed current goal products and platform guidance, including:

- Atlassian Goals: parent/sub-goals, success measures/KRs, metrics, status and score, monthly updates, activity history, linked work and customizable goal views.
- GoalsOnTrack: SMART goal structure, multi-level sub-goals, action plans, recurring tasks, habits, journals, templates, progress tracking and reports.
- Strides: target/average/project trackers, milestones, pace lines, streaks, success rates, progress reports, tags and daily focus.
- Coach.me: goal/habit check-ins, weekly targets, reminders and progress history.
- Notion Projects: tasks/subtasks, dependencies, progress bars and multiple database views.

References: Atlassian Goals documentation, GoalsOnTrack feature documentation, Strides product information, Coach.me support documentation and Notion Projects documentation.
