# Routinecraft — Routine Tracker

Routinecraft is a modern, private, local-first routine planner and guided routine runner for repeatable sequences rather than another generic task list.

## Product scope

### Routine builder
- Ordered routines with editable steps
- Per-step duration, timer/checklist mode, notes and instructions
- Morning / afternoon / evening / any-time placement
- Daily, weekday, weekend, selected-day, weekly-target and interval schedules
- Start time and reminder metadata
- Areas, tags, color and notes
- Pause/archive support
- Starter routines for morning reset, study launch, evening wind-down and weekly reset

### Guided routine runner
- Step-by-step execution
- Countdown timer with progress bar
- Pause/resume, back, skip and finish controls
- Checklist-mode steps
- Transition countdown
- Run history with completion status, duration and completed-step count
- Repeatable runs without overwriting history

### Planning & analytics
- Today dashboard with due/completed routines and planned minutes
- Seven-day rhythm strip and weekly planner
- 30-day activity heatmap
- Completion rates and streaks
- Routine leaderboard and weekly review
- Planned-vs-actual duration tracking
- Routine health and consistency guidance

### Advanced Routine Intelligence
- Health scoring based on consistency, duration accuracy and step-completion fidelity
- Adaptive-plan recommendations that suggest simplifying low-performing routines or splitting long routines
- Recovery-aware planning preference that keeps recommendations flexible rather than punishing misses
- Optional streak-protection preference for intentional skips
- Advanced run-history workspace with enriched CSV export
- Daily reflection/mood signal stored locally for pattern review
- Measurable routine goals with target runs and optional deadlines
- Local restore points with one-click restore
- Complete JSON backup containing core and advanced data
- Keyboard shortcut for local snapshots
- Privacy-safe, deterministic analytics; no remote AI or account required

### Data ownership
- LocalStorage only; no account or server required
- Full JSON backup/import
- Enriched CSV run-history export
- Local restore snapshots
- Reset controls

### Platform
- Responsive desktop/mobile UI
- Light/dark/system themes
- PWA manifest and offline service worker
- Keyboard shortcuts
- GitHub Pages deployment

## Deep research basis

The product was reviewed against current routine and visual-planning patterns. Routinery emphasizes step-by-step timed execution, flexible scheduling, reminders, progress analytics, location-aware starts, widgets, voice guidance and timer customization. Tiimo emphasizes visual timelines, flexible rescheduling, focus timers, AI-assisted task breakdown, mood/reflection and accessibility. Fabulous emphasizes guided routines, journeys, challenges and reflective coaching. Routinely emphasizes habit stacking, schedules, reminders, undo/skip behavior, streaks, period comparisons and heatmaps. RoutineFlow was also reviewed for guided routine construction, focus-oriented execution and visual progress patterns. These patterns informed the advanced feature set while keeping this implementation dependency-free and local-first.

Research reviewed:
- Routinery current product and update history
- Tiimo current planner, timer, calendar and AI-planning features
- Fabulous current routine/journey model
- Routinely current routine, analytics and privacy model
- RoutineFlow guided-routine patterns
- Open-source routine-tracking patterns from GitHub

The implementation deliberately does **not** pretend to provide cloud sync, accounts, native push delivery, calendar synchronization, smartwatch integrations or server-side AI. Browser APIs and local storage are used only where the platform can support them honestly.

## Completion status

Feature-complete for a browser-first routine tracker: routine creation, scheduling, guided execution, timers, planning, analytics, history, adaptive recommendations, goals, reflections, recovery preferences, backup/restore, portability, responsive UX and offline/local-first operation are implemented.

## Deployment

GitHub Pages path: `https://aswin-ai-coder.github.io/projects/Routine-Tracker/`

The root repository workflow validates JavaScript, required assets, manifest integrity, advanced product markers and placeholder scans before publishing this folder to GitHub Pages.
