# Flowboard — Simple Kanban Board

A polished, private, local-first Kanban board designed to stay simple while still covering the features expected from a modern personal workflow board.

## Features

### Board and flow
- Multiple local boards
- Four-column starter workflow
- Create, rename, reorder-ready columns and delete columns
- Per-column WIP limits with blocking when a limit is reached
- Real drag-and-drop card movement
- Responsive desktop and mobile board layout
- Compact or comfortable card density

### Cards
- Title and long description
- Priority: urgent, high, medium, low, none
- Due dates with overdue/today indicators
- Assignee text with avatar initials
- Labels/tags
- Checklists with progress counts
- Column selection
- Edit, delete and quick-add

### Find and organize
- Full-text search across title, description, labels and assignee
- Priority, label and due-date filters
- Sort by priority, due date, title or last update
- Completed-card/archive view
- Activity history
- Board statistics

### Insights and workflow health
- Total cards and completed cards
- Overdue count
- Checklist completion rate
- Cards-by-column flow chart
- WIP-limit health check
- Activity log for meaningful board changes

### Data and privacy
- Local browser storage only
- JSON export/import backups
- Local restore snapshot before reset/template operations
- No account, backend, telemetry or external runtime dependency
- Offline service worker
- Installable PWA

### Power-user UX
- `N` — new card
- `/` — search
- `Ctrl/Cmd + K` — search
- `?` — keyboard shortcut help
- `Escape` — close active dialogs
- Print-friendly browser output

## Research basis

The product scope was shaped by current Kanban and project-board patterns. Modern boards commonly combine board/list views with custom fields, filtering, sorting, iterations, insights and automation; Trello emphasizes labels, due dates, attachments, checklists, custom fields, sorting and automation; GitHub Projects combines board views with custom fields, grouping, filtering, charts and workflow automation. citeturn0search0turn0search4turn0search5turn0search8

Flowboard deliberately keeps the implementation local-first and deterministic. It does not pretend to provide cloud collaboration, server-side AI, real-time multi-user presence, or external integrations.

## Architecture

```text
Simple-Kanban-Board/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── sw.js
├── icon.svg
├── README.md
└── .github/workflows/simple-kanban-board.yml
```

No framework or build step is required.

## Validation

The GitHub Actions workflow checks JavaScript syntax, manifest JSON, required files, PWA wiring and important product markers before deploying the folder to GitHub Pages.

## Deployment

Expected public path:

`https://aswin-ai-coder.github.io/projects/Simple-Kanban-Board/`
