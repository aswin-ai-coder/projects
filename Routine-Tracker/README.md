# Routinecraft — Routine Tracker

Routinecraft is a complete local-first routine planner and guided routine runner for people who want repeatable sequences rather than another generic task list.

## What is included

### Routine builder
- Ordered routines with editable steps
- Per-step duration, timer/checklist mode, notes and instructions
- Morning / afternoon / evening / any-time placement
- Daily, weekday, weekend, selected-day, weekly-target and interval schedules
- Start time and reminder metadata
- Areas and tags
- Pause/archive support
- Starter routines for morning reset, study launch, evening wind-down and weekly reset

### Guided routine runner
- Step-by-step execution
- Countdown timer with progress bar
- Pause/resume, back, skip and finish controls
- Checklist-mode steps
- Live step list and progress
- Run history with completion status, duration and completed-step count

### Planning & analytics
- Today dashboard with due/completed routines and total planned minutes
- Seven-day rhythm strip
- Weekly planner with scheduled routine cards
- 30-day activity heatmap
- Completion rates and streaks
- Routine leaderboard
- Weekly review guidance
- Duration and run-volume totals
- Routine-health guidance for low-consistency routines

### Data ownership
- LocalStorage only; no account or server required
- Full JSON backup/import
- CSV run-history export
- Local restore snapshots
- Advanced full-backup export
- Reset controls

### Platform
- Responsive desktop/mobile UI
- Light/dark/system themes
- PWA manifest and offline service worker
- Keyboard shortcut: Ctrl/Cmd+K opens Routine Studio; Ctrl/Cmd+Shift+S saves a local snapshot
- GitHub Pages deployment

## Product decisions from research

Modern routine products increasingly emphasize step-by-step execution, timers, flexible schedules, reminders, progress views and offline/privacy-first storage. Routinery highlights sequential timed execution, scheduling, reminders and progress analytics; RoutineFlow emphasizes drag-and-drop routine building, focus timers, heatmaps, local reminders and offline operation. The open-source Routine Tracker project also reinforces local/offline ownership and the value of measurable, repeatable routines. This project combines those useful patterns while keeping the implementation browser-local and dependency-free.

Sources reviewed:
- https://apps.apple.com/in/app/routine-planner-habit-tracker/id1450486923
- https://apps.apple.com/in/app/routineflow-guided-routines/id1639800794
- https://play.google.com/store/apps/details?id=com.rrtech.routineflow
- https://github.com/DanielRendox/RoutineTracker
- https://www.routinery.app/blog/best-routines-planner-apps

## Scope boundary

This is intentionally a private browser application. It does not pretend to provide server synchronization, native push notifications, shared accounts, cloud collaboration or calendar integrations. Reminder time is stored as routine metadata; browser notification scheduling varies by platform and is not represented as a fake guaranteed service.

## Deployment

GitHub Pages path: `https://aswin-ai-coder.github.io/projects/Routine-Tracker/`

The root repository workflow validates the application and publishes this folder to GitHub Pages.