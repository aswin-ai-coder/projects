# Personal Task Manager

Focus is a privacy-friendly, responsive task manager that runs entirely in the browser. Tasks and preferences are persisted with `localStorage`, so no backend or account is required.

## Features

- Create, edit, complete, and delete tasks
- Full task editing for title, priority, due date, and category
- Priorities and custom categories
- Due dates with local-time Today / Upcoming views and overdue detection
- Search, status, priority, and category filters
- Sort by due date, priority, creation time, or title
- Dashboard completion statistics
- Bulk complete and bulk delete
- Keyboard shortcuts (`N` for a new task, `Ctrl/Cmd+K` for search)
- Import/export JSON backups with validation and normalization
- Responsive accessible UI
- Dark/light theme preference
- Defensive localStorage and file-error handling
- No external runtime dependencies

## Run

Open `index.html` in a modern browser. No build step or server is required.

## Data

Tasks and preferences are stored locally in the browser using `localStorage`. Use **Export** regularly if the data is important. Imported backups are validated and invalid task records are ignored.

## Development checks

GitHub Actions validates the JavaScript syntax, required project files, and local asset references on changes to this project. GitHub Pages deploys the contents of this folder from `main`.

## Structure

- `index.html` — application shell and task/category edit dialogs
- `styles.css` — responsive UI and design system
- `app.js` — task state, persistence, validation, filtering, rendering, import/export, and interactions
