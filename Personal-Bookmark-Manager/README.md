# Pinboard — Personal Bookmark Manager

A modern, responsive, local-first bookmark library built with vanilla HTML, CSS, and JavaScript. It runs as a static site with no required account, backend, build step, or API key.

## Included features

### Capture and organize
- Save, edit, open, and categorize links with title, URL, content type, tags, notes, optional preview image, priority, favorite, reading state, and collection.
- Collections with rename, merge, and safe delete-to-Unsorted management.
- Optional Chromium Manifest V3 extension for current-tab and right-click capture, with a separate queue that can be exported as standard browser bookmarks HTML and imported.
- Browser bookmarklet helper that pre-fills the app's save form with the current page URL and title.

### Find and review
- Search bookmark metadata, filter by type/state/tag, and sort by date/title/domain.
- Advanced search operators: `tag:`, `domain:`, `type:`, `state:`, `collection:`, `before:`, `after:`, `favorite:true`, `priority:high`, and negation such as `!tag:later`.
- Command palette (Ctrl/⌘+K) for common actions.
- Grid/list layouts, bulk selection, bulk favorite/read/trash, and keyboard search shortcuts.
- Favorites, read-later, recently added, archive, and recoverable trash.
- Duplicate URL detection, library audit, missing-note/untagged/stale unread insights, most-saved domains, and random rediscovery.
- Saved searches, tag merge manager, passage highlights and annotations, and local reminders.

### Portability and privacy
- JSON backup/restore, CSV import/export, Netscape HTML bookmark import, best-effort generic JSON import, and Markdown library export.
- Password-protected AES-GCM encrypted backup and restore using PBKDF2-SHA-256 in the browser. Includes bookmarks, collections, highlights, and saved searches. The password is not stored.
- Light/dark theme, responsive layout, keyboard navigation, and installable offline PWA shell.
- Local-first storage: bookmark metadata is kept in this browser. Export backups regularly; clearing browser site data removes local data.

## Run and deploy
Open `index.html` or serve this folder with a static web server. Service-worker caching and Web Crypto require HTTPS or localhost. GitHub Pages URL, if Pages is enabled for this repository: https://aswin-ai-coder.github.io/projects/Personal-Bookmark-Manager/

## Deliberate limitations
- Local reminders are shown inside the app when opened; there are no push notifications while it is closed.
- Link health checks are best-effort because browser cross-origin rules often hide HTTP status. “Unverifiable” does not mean broken.
- The app does not claim automatic webpage/PDF preservation, full-page content extraction, reliable full-text indexing, cloud sync, cross-device synchronization, collaboration, public sharing, hosted APIs, or hosted AI tagging. Those require a backend or external services and should not be faked in a static local-only app.
- The optional browser extension stores its queue separately from the web app. Export it as HTML and import that file into Pinboard to transfer saved links.
- Encrypted backups protect data only while stored in the encrypted file; choose a strong unique password and keep it safe.

## Feature research
The feature set was benchmarked against official Raindrop.io and Linkwarden product/docs, including collections, tagging, search operators, highlights, annotations, reminders, duplicate hygiene, import/export, backups, browser capture, page preservation, reader experience, and keyboard-first workflows. This project independently implements the features feasible in a static local-first app and explicitly documents backend-dependent capabilities.
