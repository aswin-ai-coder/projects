# Pinboard — Personal Bookmark Manager

A responsive, local-first bookmark manager built with vanilla HTML, CSS and JavaScript. Static-site friendly; no server, account, API key, or build step.

## Features
- Save, edit, open, and organize links with title, URL, type, tags, notes, preview image URL, priority, favorite, and reading state.
- Collections, fast search across bookmark metadata, filters, and sorting.
- Grid and compact list layouts; bulk selection, favorite, mark read, and move to trash.
- Read-later queue, recently added, archive, and recoverable trash.
- Duplicate URL detection, with common tracking parameters removed for comparison.
- Library insights and most-saved domains.
- JSON backup/restore, CSV import, Netscape HTML bookmark import, and best-effort generic JSON import. Duplicate URLs are skipped.
- Light/dark theme, responsive mobile layout, keyboard shortcuts (/ and Ctrl/⌘+K), and installable offline PWA shell.
- Private by default: data stays in this browser's local storage. Export backups regularly; clearing browser site data removes local data.

## Run
Open index.html or serve this folder using any static web server. Service-worker caching requires HTTPS or localhost.

## GitHub Pages
Enable Pages for the repository's main branch and root. Suggested URL: https://aswin-ai-coder.github.io/projects/Personal-Bookmark-Manager/

## Privacy and limitations
This app stores bookmark metadata in this browser's local storage. It does not automatically crawl URLs, extract metadata, check link health, archive pages, or sync across devices. Preview images load only when supplied. Keep backup files private if they contain personal links.

Feature research reviewed public Raindrop.io documentation for collections, tags, filters, search, favorites, archive/trash, highlights, import/export, and duplicate/link hygiene. This implementation is an independent local-first subset.