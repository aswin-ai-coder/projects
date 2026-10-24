# Gather — Link Collection Manager

Gather is a modern, responsive, local-first bookmark and link knowledge manager. It runs as a static site using HTML, CSS, and vanilla JavaScript; no account, server, build step, or API key is required for core features.

## Main features
- Save, edit, and organize links with title, URL, type, notes, tags, preview image, priority, favorite, reading status, timestamps, and optional local reminders.
- Nested collections; safe rename, move, merge, and delete tools.
- Search and filter by metadata, type, status, and tag; sort by date, title, domain, and priority; grid/list modes; dark/light theme.
- Favorites, read-later, recently saved, archive, recoverable trash, duplicate warnings, bulk selection and actions.
- Saved searches, passage highlights and annotations, tag merging, random rediscovery, stale/unread audit, best-effort link checks.
- Smart collections that dynamically filter saved links, and user-triggered rules for tagging, priority, unread status, and favorites.
- Duplicate resolver that combines tags, notes, favorite/priority/reminder data and moves redundant records to trash.
- Insights for top domains, statuses, types, and tags.
- JSON backup, portable JSON export, CSV export, CSV import, Netscape browser-bookmark HTML import, best-effort generic JSON import, Markdown index export.
- Password-protected AES-GCM backup/restore using PBKDF2-SHA-256 (250,000 iterations). Passwords are never stored.
- Quick-save bookmarklet plus optional Chromium Manifest V3 extension for saving current tabs or context-menu links to a local queue and exporting standard bookmarks HTML.
- Installable PWA shell, offline app shell, responsive layout, keyboard shortcuts, and GitHub Actions syntax/file validation.

## Use
Open `index.html` or serve this folder from a static host. Intended GitHub Pages URL: `https://aswin-ai-coder.github.io/projects/Link-Collection-Manager/`.

Browser data lives in that browser profile's local storage. Export backups before clearing browser data or switching devices. Encrypted backup requires Web Crypto (HTTPS or localhost).

### Browser extension
See [browser-extension/README.md](browser-extension/README.md). The extension queue is separate from the app; export it as Netscape Bookmarks HTML, then import it into Gather. It does not upload links to a server.

## Privacy and technical boundaries
- Local reminders appear when Gather is opened; no background push notifications.
- Link checking is best-effort. Browsers hide most cross-origin response status codes, so “unverifiable” does not mean broken.
- This static app does not claim automatic full-page/PDF archival, remote full-text indexing, reliable metadata extraction from every website, cloud sync, multi-user collaboration, public sharing, server-side RSS fetching, OCR, or hosted/local-model AI. Those require additional services and are not represented as built-in.
- Rules run only when explicitly invoked; review changes and keep backups.
- The bookmarklet assumes the GitHub Pages path above; adjust it if publishing elsewhere.

## Research basis
Feature planning was cross-checked against official product documentation from Raindrop.io, Linkwarden, Karakeep, and Omnivore. Their collection hierarchy, tags, highlights, saved searches, duplicate hygiene, import/export, reminders, annotations, and browser capture patterns informed the feature set. Server-dependent features are explicitly listed as limitations.
