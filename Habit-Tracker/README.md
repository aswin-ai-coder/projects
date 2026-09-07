# Habitflow — Personal Habit Tracker

A modern, private, local-first habit system designed around consistency, recovery, flexible schedules and useful reflection rather than perfect streaks.

## Feature-complete scope

### Habit engine
- Build habits or reduce habits
- Daily, weekdays, weekends, selected weekdays, weekly quota and every-N-days schedules
- Check-in, count, minutes, hours, pages and custom-style numeric targets
- Areas, tags, notes, start/end dates and time-of-day preferences
- Per-habit browser reminder time
- Archive/restore without deleting history
- Habit templates and quick capture
- Habit stacks / routines
- Backdated corrections

### Advanced Habit Studio
- Per-habit icon and color metadata
- Cue / trigger, minimum action and reward fields
- Optional skip-protects-streak policy
- Pause-until date
- Early-reminder preference
- Annual target
- Challenge start/end and numeric target
- Challenge notes / finish-line planning
- Automatic 7, 14, 30, 100 and 365-day milestones
- 90% consistency milestone
- Local habit reflections with mood and energy
- Full habit check-in history

### Daily tracking
- Today journal
- One-tap completion
- Detailed check-ins with value and notes
- Done, partial, skipped and missed states
- Gentle recovery language instead of guilt-oriented scoring
- Focus action for the next unfinished habit
- Mood capture for the day

### Analytics and intelligence
- Current streak and best streak
- Habit-strength score inspired by consistency-over-time models rather than streak-only scoring
- 7/30/90-day completion rates
- Momentum: recent performance versus baseline
- Rising and falling habit detection
- Weakest/recovery habit detection
- Strongest habit detection
- 90-day / 182-day visual history
- Weekly weekday rhythm
- Habit leaderboard
- Area balance
- Annual target progress
- Challenge progress
- Habit-level profile dashboard
- Portfolio-level deep insights
- Explainable deterministic calculations; no fake AI

### Deep Insights workspace
- Dedicated analytics navigation
- Per-habit profile selection
- Long-range calendar history
- Weekly review focus
- Recovery / momentum / trend guidance
- Habit-strength and consistency comparison

### Data ownership
- LocalStorage persistence
- Advanced JSON backup
- Existing JSON import
- CSV check-in export
- Local restore snapshots, retaining recent restore points
- Storage health information
- No account, backend, telemetry or advertising required

### UX / platform
- Responsive desktop and mobile UI
- System/light/dark themes
- Installable PWA
- Offline cache
- Browser reminders when permission and browser support are available
- Keyboard shortcuts
- Fast one-tap tracking
- Accessible labels and semantic controls

## Product principles

Habitflow separates **scheduled**, **completed**, **partial**, **skipped**, and **missed** states. A skip is explicit rather than silently becoming a success or failure. Advanced analytics can optionally treat a skip as streak-protecting, while the default remains conservative.

Weekly-target habits are measured against their weekly quota rather than pretending a 3×/week habit is a daily habit. Advanced strength scoring uses a decaying history so one missed day does not erase months of evidence.

The intelligence layer is deterministic and explainable. It does not claim to be machine learning, does not upload habit data, and does not manufacture recommendations from external personal data.

## Research basis

The 2026 feature pass reviewed current patterns from Habitify, Loop Habit Tracker, TickTick, Streaks and open-source habit trackers. The resulting scope covers the recurring patterns found across these products: flexible schedules, per-habit reminders, streaks, habit-strength/consistency scoring, heatmaps, long-range statistics, weekday patterns, bad-habit tracking, notes, mood/reflection, areas, habit stacks, finish lines, annual targets, challenges, skip handling, local-first privacy and exportability.

Research references:
- Habitify progress and bad-habit reporting: https://feedback.habitify.me/changelog/all-new-progress-view-2
- Habitify current progress controls: https://intercom.help/habitify-app/en/articles/11203360-view-the-progress-of-a-habit-on-website-desktop-app
- Habitify finish lines and yearly goals: https://feedback.habitify.me/changelog/habitify-web-and-desktop-280-upgraded-single-progress-view
- Habitify pause/reflection and current challenge direction: https://apps.apple.com/us/app/habitify-habit-tracker/id1111447047
- Loop flexible schedules, reminders, scoring and data export: https://github.com/isoron/uhabits
- Loop current app feature summary: https://play.google.com/store/apps/details/?hl=en-IN&id=org.isoron.uhabits
- TickTick reminders, recurring rules, habit statistics and shortcuts: https://ticktick.com/features
- Streaks current habit model, mood, notes, flexible schedules and privacy: https://apps.apple.com/in/app/streaks-track-reflect-improve/id6761472324
- Open-source local-first habit tracker patterns: https://github.com/FriesI23/mhabit
- Privacy-first PWA patterns: https://github.com/iNikAnn/DoHabit

## Honest scope boundary

External health/wearable integrations, location reminders, social accounts, shared challenges and native home-screen widgets are not faked. They require platform APIs or a backend and would conflict with this project's static, local-first GitHub Pages architecture. The implemented project instead provides local equivalents where the browser can support them.

Browser notifications depend on permission and browser behavior; a fully closed browser cannot be guaranteed to deliver a reminder.

## Deployment

`https://aswin-ai-coder.github.io/projects/Habit-Tracker/`

## License

This project is part of the personal software projects repository.