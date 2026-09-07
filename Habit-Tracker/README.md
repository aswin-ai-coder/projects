# Habitflow — Personal Habit Tracker

A modern, private, local-first habit tracker designed for real routines rather than perfect streaks.

## Features

### Habit system
- Build good habits or reduce bad habits
- Daily, weekday, weekend, selected-day, weekly-target and interval schedules
- Targets with check-in, times, minutes, hours and pages units
- Areas, tags, notes, start/end dates and time-of-day preferences
- Per-habit reminder time with browser Notification support
- Archive/restore without deleting history
- Habit templates and quick natural-language capture

### Daily journal
- Today view with due habits
- One-tap completion and detailed check-ins
- Done, partial, skipped and missed states
- Backdated check-ins
- Notes per check-in
- Skips are explicit and are not silently treated as failure
- Focus action for the next unfinished habit

### Analytics
- Current and best streaks
- 7/30/90-day completion rates
- 90-day heatmap
- Weekly rhythm by weekday
- Habit leaderboard
- Area balance
- Habit detail view
- Smart recovery/consistency insights
- Explainable, deterministic calculations; no fake AI

### Routines
- Create habit stacks such as morning, study or evening routines
- Reorder-free lightweight routine groups with one-click completion

### Data & platform
- LocalStorage persistence
- JSON backup/import
- CSV check-in export
- Storage health panel
- Responsive desktop/mobile UI
- System/light/dark themes
- Installable PWA and offline cache
- Keyboard shortcuts: `N` new habit, `T` today, `A` analytics, `/` search, `Ctrl/Cmd+Shift+A` quick capture
- No account, backend or telemetry required

## Product design decisions

Habitflow intentionally separates **scheduled**, **completed**, **partial**, **skipped**, and **missed** states. This keeps a skipped day from automatically destroying a streak and makes the history more truthful.

Weekly-target habits use a weekly quota rather than pretending that a 3×/week habit is a daily habit. Progress calculations cap each week's contribution at the configured target.

The advanced insights are local and deterministic: they explain which habits are weakest/strongest recently and suggest a smaller recovery action instead of claiming machine-learning personalization.

## Research basis

The product model was informed by current habit-tracking patterns from Habitify, Habitica and broader 2026 habit-tracking feature research: flexible schedules, custom units, reminders, areas, streaks, heatmaps, progress views, weekly rhythm, bad-habit tracking, routines/stacks, and actionable analytics.

References:
- https://habitify.me/
- https://habitify.me/onboarding-instruction/create-new-habit
- https://feedback.habitify.me/changelog/all-new-progress-view-2
- https://feedback.habitify.me/changelog/habitify-web-and-desktop-270-new-habit-settings-with-ai-smart-fill
- https://translate.habitica.com/projects/habitica/overview/en/
- https://clickup.com/learn/topic/productivity/tools/habit-tracking/

## Honest scope boundary

No external health, wearable, location or social integrations are faked. The project is deliberately local-first and works without accounts or paid services. Browser reminders depend on browser permission/support and are not guaranteed after a browser is fully closed.

## Deployment

The folder is intended to be published as a static GitHub Pages project at:

`https://aswin-ai-coder.github.io/projects/Habit-Tracker/`

## License

This project is part of the personal software projects repository.