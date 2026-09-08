# Daily Checklist

A modern, beginner-friendly, local-first checklist workspace for everyday processes, recurring routines and repeatable workflows.

## Feature-complete scope

### Checklist workspace
- Today / All / Due / Completed views
- Global search across item text, notes and tags
- Sort by manual order, priority, due date or name
- Multiple named checklists
- Quick add with Enter
- One-tap completion and reopen
- Bulk select, complete, reset and delete
- Undo for destructive/reversible item changes
- Checklist rename/delete/create

### Item detail model
- Notes
- Priority P1–P4
- Due dates
- Daily / weekday / weekly / monthly recurrence
- Tags
- Nested step/subtask breakdowns
- Completion timestamps
- Repeat-on-completion generation

### Reusable processes
- Built-in starter templates
- Reusable plans
- Daily, weekday, weekly and monthly plan cadence metadata
- Run a plan into a fresh checklist
- Plan data kept separate from today's completion state

### Intelligence and history
- Completion percentage
- Due/overdue visibility
- Seven-day activity signal
- Active-day streak
- Local activity history
- Recent activity heatmap
- Sub-step completion statistics
- Deterministic local guidance

### Data ownership
- Complete JSON backup
- Standard JSON export/import
- Enriched CSV export
- Up to 12 local restore points
- No account required
- No server or analytics dependency
- Local browser storage
- PWA/offline shell
- Browser notification permission support where the browser provides it

### UX
- Responsive mobile/desktop layout
- Light/dark/system theme
- Keyboard shortcuts: `Ctrl/Cmd + K` search, `Ctrl/Cmd + Z` undo
- Accessible native form controls
- Minimal, fast plain HTML/CSS/JavaScript architecture

## Research basis

The feature set was reviewed against modern checklist/task-product patterns. Current references emphasize flexible recurrence, repeating templates, smart filters, tags, reminders, steps/subtasks, priorities, daily planning, history and repeatable workflows. citeturn0search11turn0search3turn0search15turn0search0

Daily Checklist intentionally implements the useful browser-native/local-first subset without pretending to have server features it cannot provide. Repeating templates and button-driven workflows are established patterns for reducing repetitive manual setup. citeturn0search0turn0search2turn0search9

## Honest platform boundary

This is a static GitHub Pages application. It does **not** claim cloud synchronization, accounts, team collaboration, calendar integrations, server-side AI, or guaranteed background/native push alarms. Browser notifications depend on user permission and browser capabilities.

## Tech

Plain HTML, CSS and JavaScript with `localStorage` and a service worker. No framework or backend is required.

## Deployment

`https://aswin-ai-coder.github.io/projects/Daily-Checklist/`
