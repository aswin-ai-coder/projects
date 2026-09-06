# Personal Task Manager

A privacy-friendly, responsive task manager that runs entirely in the browser. Tasks are persisted with `localStorage`, so no backend or account is required.

## Features

- Create, edit, complete, and delete tasks
- Priorities and categories
- Due dates and overdue detection
- Search, status, priority, and category filters
- Sort by due date, priority, or creation time
- Dashboard statistics
- Today / upcoming views
- Bulk complete and bulk delete
- Keyboard shortcuts
- Import/export JSON backups
- Responsive accessible UI
- Dark/light theme preference
- No external runtime dependencies

## Run

Open `index.html` in a modern browser. No build step or server is required.

## Data

Tasks and preferences are stored locally in the browser using `localStorage`. Use **Export** regularly if the data is important.

## Structure

- `index.html` — application shell
- `styles.css` — responsive UI and design system
- `app.js` — task state, persistence, filtering, rendering, import/export, and interactions
