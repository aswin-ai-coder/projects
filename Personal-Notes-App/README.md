# Personal Notes

A modern, private, local-first notes workspace built as a zero-backend Progressive Web App. Notes stay in the browser's local storage; the app does not require an account, analytics service, or database.

## Features

- Markdown editor with formatting toolbar and live preview
- Autosave to local browser storage
- Full-text search across titles, content, and tags
- Folders and tags
- Favorites and pinned notes
- Daily notes / journal workflow
- Archive and trash with restore/permanent deletion
- Version history with up to 20 snapshots per note
- Wiki-links using `[[Note Title]]`
- Backlinks and outgoing-link discovery
- Keyboard shortcuts and command palette
- Focus mode and responsive mobile layout
- Light, dark, and system themes
- Adjustable editor font size and compact mode
- JSON backup import/export
- Current-note Markdown export
- Installable PWA with offline caching
- No server, login, tracking, or third-party runtime dependency

## Run

Open `index.html` from a local development server or deploy the folder to GitHub Pages or another HTTPS static host. A secure origin is required for normal PWA installation behavior.

## Data and privacy

The application stores notes and preferences in `localStorage` on the current browser/device. Export a JSON backup before clearing browser site data or moving to another device.

## Architecture

This is intentionally a small static application:

- `index.html` — accessible application shell and dialogs
- `styles.css` — responsive design system and themes
- `app.js` — note state, editor, search, links, history, import/export, settings
- `manifest.webmanifest` — PWA metadata and shortcuts
- `sw.js` — offline application shell cache
- `icon.svg` — app icon

No backend is required for the intended personal/local use case.

## Keyboard shortcuts

- `N` — new note
- `/` — focus search
- `Ctrl/Cmd + K` — command palette
- `Ctrl/Cmd + S` — save immediately
- `Ctrl/Cmd + Shift + P` — preview
- `Esc` — close dialogs

## Product decisions

The app focuses on private personal knowledge capture rather than team collaboration. Cloud sync, shared workspaces, accounts, and server-side search are intentionally out of scope because they would add infrastructure and privacy complexity without being necessary for a standalone personal notes product.
