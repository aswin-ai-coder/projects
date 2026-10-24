# Gather — Link Collection Manager

A modern, responsive, local-first collection manager built with vanilla HTML, CSS and JavaScript. It runs as a static site with no server, account, API key, or build step.

## Features

- Create, edit, and organize links with title, URL, type, notes, tags, preview image, priority, favorite, and reading status.
- Hierarchical collections with nested folders, counts, and parent/child organization.
- Search across titles, URLs, notes, tags, domains, and collection names; filter by type, state, and tag.
- Sort by newest, oldest, title, domain, and priority; grid and list layouts.
- Favorites, read-later, recent links, archive, recoverable trash, duplicate URL warning, and bulk actions.
- Collection manager: rename, move between parents, merge, and delete without deleting saved links.
- Saved searches, tag merging, passage highlights and annotations, local reminders, random rediscovery, and library audit.
- JSON backup/restore, CSV import, Netscape browser bookmarks HTML import, best-effort generic JSON import, Markdown index export.
- Password-protected AES-GCM backup and restore with PBKDF2-SHA-256; includes links, collections, highlights, and saved searches.
- Optional bookmarklet, dark/light theme, responsive layout, keyboard shortcuts, installable PWA shell, and offline app shell.
- Browser data stays in local storage. Export backups regularly; clearing site data removes local data.

## Run and publish

Open `index.html` or serve the folder with a static web server. Service-worker caching and Web Crypto require HTTPS or localhost. If GitHub Pages is enabled for the repository, the intended path is:

`https://aswin-ai-coder.github.io/projects/Link-Collection-Manager/`

## Privacy and honest limits

- Reminders are local records shown in the app when opened; no background push notifications.
- Browser link checks are best-effort. Cross-origin restrictions often hide response status, so an unverifiable link is not necessarily broken.
- This static app does not claim automatic full-page/PDF archiving, full-text indexing of remote content, cloud sync, multi-user collaboration, public sharing, hosted AI tagging, or server-side metadata extraction. These require backend services or integrations.
- The optional bookmarklet opens the configured GitHub Pages URL with the URL/title prefilled. Adjust the URL in `tools.js` if publishing under a different account/path.
- Encrypted backups are only as safe as the password you choose and protect. The app never stores that password.

## Research basis

Feature planning referenced the official Raindrop.io product/help materials for collections, nested organization, tags, views, duplicate hygiene, highlights, reminders, bulk operations, and import/export; and Linkwarden documentation for hierarchical collections, tags, browser HTML imports, preservation, reader annotations, and portable backup formats. This implementation focuses on features that work honestly in a static local-first app.
