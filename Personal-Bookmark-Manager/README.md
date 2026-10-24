# Pinboard — Personal Bookmark Manager

A responsive, local-first bookmark manager built with vanilla HTML, CSS and JavaScript. Static-site friendly; no server, account, API key, or build step.

## Features
- Save, edit, open, and organize links with title, URL, type, tags, notes, preview image URL, priority, favorite, and reading state.
- Collections, fast search across bookmark metadata, filters, and sorting.
- Grid and compact list layouts; bulk selection, favorite, mark read, and move to trash.
- Read-later queue, recently added, archive, and recoverable trash.
- Duplicate URL detection, with common tracking parameters removed for comparison.
- Library insights and most-saved domains.\n- Advanced command center with local reminders, passage highlights and annotations, saved searches, tag merging, CSV export, random rediscovery, and best-effort link diagnostics.\n- Browser bookmarklet helper and optional Chromium extension for context-menu/current-tab capture via an exportable queue.\n- Password-protected AES-GCM backups using PBKDF2; includes bookmarks, collections, highlights, and saved searches. The password is not stored.
- JSON backup/restore, CSV import, Netscape HTML bookmark import, and best-effort generic JSON import. Duplicate URLs are skipped.
- Light/dark theme, responsive mobile layout, keyboard shortcuts (/ and Ctrl/⌘+K), and installable offline PWA shell.
- Private by default: data stays in this browser's local storage. Export backups regularly; clearing browser site data removes local data.

## Run
Open index.html or serve this folder using any static web server. Service-worker caching requires HTTPS or localhost.

## GitHub Pages
Enable Pages for the repository's main branch and root. Suggested URL: https://aswin-ai-coder.github.io/projects/Personal-Bookmark-Manager/

## Privacy and limitations
This app stores bookmark metadata in this browser's local storage. It does not automatically crawl URLs, extract metadata, check link health, archive pages, or sync across devices. Preview images load only when supplied. Keep backup files private if they contain personal links.

Feature research reviewed Raindrop.io for collections, tags, search, highlights, reminders, import/export, duplicate/broken-link hygiene, and backups; Linkwarden for preservation, reading, annotation, and import/export; and current Linkwarden releases for keyboard search, themes, and mobile/offline priorities. The implementation is an independent local-first subset.\n\n## Advanced feature boundaries\n- Reminder schedules are local records displayed when you open the app; there are no push notifications while it is closed.\n- Browser link checks are best-effort because cross-origin restrictions often prevent reading remote status codes.\n- Full webpage/PDF archiving, reliable page extraction/full-text search, cloud sync, collaboration, public sharing, hosted APIs, and AI-based tagging require a backend or external services and are not represented as working local-only features.\n- The optional browser extension has a separate extension-storage queue. Export it as HTML and import it into the app to transfer links.