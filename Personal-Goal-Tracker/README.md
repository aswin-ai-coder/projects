# Goalpath — Personal Goal Tracker

A modern, private, local-first goal tracker for turning long-term intentions into measurable outcomes and regular reflection.

## Features

- Dashboard for active goals, average progress, due-soon goals and recent check-ins
- Goal library with search, status, area and priority filters
- SMART, OKR, KPI and outcome goal types
- Numeric progress with current value, target value and units
- Goal deadlines and on-track / at-risk / off-track / paused / completed status
- Parent goals and sub-goal rollups
- Areas of life for portfolio balance
- P1–P4 prioritization and configurable focus limit
- Check-ins with value updates, confidence, notes, wins and blockers
- Progress history chart
- Goal health signals for stale updates, overdue targets and missing metrics
- Lightweight weekly/monthly/quarterly reviews
- Review history for wins, lessons, blockers and next focus
- Searchable portfolio view
- Local snapshots and restore
- JSON backup/import
- CSV export
- Starter OKR template
- Keyboard shortcut: Ctrl/Cmd+K for the control center
- Responsive mobile UI
- Light/dark/system theme
- PWA installability and offline shell
- No account, server, telemetry or external runtime dependency

## Product design

Goalpath combines patterns found in modern goal systems: measurable success measures, parent/sub-goal hierarchies, status signals, progress rollups, activity/check-in history, filters, saved personal focus and recurring review rituals. The implementation is deliberately local-first and deterministic rather than pretending to provide hosted AI or cloud collaboration.

## Privacy

Goal data is stored in the browser's local storage. JSON backup files are generated only when you explicitly export them. The application does not upload goal data to a backend.

## Architecture

- `index.html` — semantic application shell and dialogs
- `styles.css` — responsive visual system
- `app.js` — state, goal CRUD, check-ins, reviews, dashboard and persistence
- `advanced.js` — health checks, starter template, PWA registration and advanced UI
- `manifest.webmanifest` — install metadata
- `sw.js` — offline cache
- `icon.svg` — app icon
- `.github/workflows/personal-goal-tracker.yml` — syntax, wiring and GitHub Pages validation/deployment

## Scope boundary

This is intentionally a complete local-first personal tracker. It does not fake live Google/Outlook sync, multi-device cloud synchronization, accounts, team permissions, or a hosted AI service. Those require backend/auth/integration infrastructure beyond a static GitHub Pages app.

## Research basis

The feature set was informed by current goal-management patterns including OKRs, success measures, progress rollups, status updates, activity history, filters, goal hierarchies, review rituals and personal offline-first goal tracking. Sources include Atlassian Goals, Notion OKR/project guidance and current personal OKR products.
