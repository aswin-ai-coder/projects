# Flowboard — Simple Kanban Board

A polished, private, local-first Kanban board that stays approachable while covering the core patterns found in modern personal and project boards.

## Feature-complete scope

### Board and flow
- Multiple local boards
- Four-column starter workflow
- Create, rename and delete columns
- Per-column WIP limits with blocking when a limit is reached
- Drag-and-drop card movement
- Responsive desktop/mobile layout
- Compact or comfortable density
- Board statistics and activity history

### Cards and structured work
- Title and long description
- Priority: urgent, high, medium, low, none
- Start and due dates
- Assignee and avatar initials
- Labels/tags
- Checklists with progress
- Work type: Task, Bug, Feature, Chore, Idea, Milestone
- Estimate in minutes
- Project and milestone metadata
- Cycle/iteration metadata
- Prerequisite dependencies
- External blocked state and reason
- Related links
- Completed timestamps

### Modern views
- Native Kanban board
- Table view with searchable rows
- Calendar-style dated work view
- Timeline/roadmap view
- Dependency view
- Saved filter views
- Quick filtering by text, priority, label and due date
- Sorting by priority, due date, title or update time

### Bulk and automation
- Bulk card selection
- Bulk move
- Bulk priority updates
- Bulk label updates
- Local deterministic automation rules
- Trigger rules on card save or movement
- Conditions for Done, overdue, urgent and blocked work
- Actions to add labels, set priority or move cards
- Automation data remains private in browser storage

### Flow intelligence
- WIP count
- Throughput over the last seven days
- Median cycle-time estimate
- Oldest active work age
- Done ratio
- Blocked-work count
- Dependency health
- Existing board analytics and checklist completion
- WIP-limit health guidance

### Data and portability
- JSON backup/import
- Restore snapshot
- Advanced metadata stored separately from core board data
- CSV export with structured card metadata
- No account, backend, telemetry or external runtime dependency
- Offline service worker
- Installable PWA

### Power-user UX
- `N` — new card
- `/` — search
- `Ctrl/Cmd + K` — search
- `Ctrl/Cmd + Shift + P` — flow metrics
- `Ctrl/Cmd + Shift + B` — bulk operations
- `?` — keyboard shortcut help
- `Escape` — close active dialogs
- Print-friendly board
- Mobile-friendly advanced views

## Research basis

The scope was reviewed against current product patterns from GitHub Projects, Trello, Jira and Linear. GitHub Projects supports board/table/roadmap views, custom fields, filtering, sorting, grouping, charts, iterations and automation. Trello documents board filtering, table/calendar/timeline/dashboard views, custom fields, checklists, due/start dates, automation and dependency-oriented workflows. Jira documents WIP limits, quick filters, swimlanes, configurable card fields and flow metrics. Linear documents grouping, sub-grouping, custom views, cycles, display properties and dependency visualization.

Sources researched:
- GitHub Projects: https://docs.github.com/en/issues/planning-and-tracking-with-projects
- Trello search/filter/views: https://support.atlassian.com/trello/docs/search-filter-and-custom-views/
- Trello automation: https://support.atlassian.com/trello/docs/automation-overview/
- Trello dependencies: https://support.atlassian.com/trello/docs/creating-and-managing-task-dependencies/
- Jira Kanban: https://www.atlassian.com/software/jira/features/kanban-boards
- Linear board layout: https://linear.app/docs/board-layout

Flowboard intentionally keeps the implementation honest and local-first. It does **not** pretend to provide cloud collaboration, real-time multi-user presence, hosted AI, or live third-party integrations.

## Architecture

```text
Simple-Kanban-Board/
├── index.html
├── styles.css
├── app.js
├── advanced.js
├── manifest.webmanifest
├── sw.js
├── icon.svg
├── README.md
└── .github/workflows/simple-kanban-board.yml
```

No framework or build step is required.

## Validation

GitHub Actions validates JavaScript syntax for both application bundles and the service worker, manifest JSON, required files, PWA wiring and advanced product markers before deploying the folder to GitHub Pages.

## Deployment

Public path:

`https://aswin-ai-coder.github.io/projects/Simple-Kanban-Board/`
