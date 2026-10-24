# Moment — Countdown Manager

Moment is a responsive, local-first countdown app for holidays, exams, birthdays, launches, personal goals, trips and other dates worth looking forward to. It uses plain HTML, CSS and JavaScript: no framework, build process, account, API key or backend required.

## Features

- Live day/hour/minute/second countdowns, today's moments, passed milestones and date-not-set cards.
- Create, edit, duplicate and delete countdowns; optional date/time, notes, location or URL, category, color, favorites and highlights.
- Daily, weekly, monthly and yearly recurrence. Recurring countdowns roll forward to their next occurrence.
- Built-in collections plus custom collections, text search, filters, sorting, grid/list layout and a month calendar with event markers.
- Overview stats, next-seven-days preview, quick add, and responsive mobile layout.
- JSON backup/restore with merge-by-ID, CSV import/export, iCalendar (.ics) import/export and encrypted AES-GCM backup using PBKDF2-SHA-256 key derivation.
- Optional browser notifications while the app is open, dark/light theme, keyboard search shortcut (/), visible focus, reduced-motion support.
- Installable PWA and offline shell after the first successful load.
- Local activity log, data clearing safeguards, and no account or analytics.

## Run

Open index.html in a browser, or publish the Countdown-Manager folder with GitHub Pages. PWA/offline features and Web Crypto encryption work best on HTTPS or localhost.

Expected GitHub Pages URL when Pages is enabled: https://aswin-ai-coder.github.io/projects/Countdown-Manager/

## CSV format

The minimum required header columns are Title and Date (YYYY-MM-DD). Optional columns include Time, Collection (or Category), Color, Repeat, Favorite, Highlighted, Notes, and Link. Importing adds new items; it does not overwrite existing countdowns.

## Privacy and limitations

- Countdown data lives in this browser's local storage. It is not uploaded or synced to a server. Anyone with access to this browser profile may be able to view it.
- Exported files and backups may contain personal information; store them privately. Encrypted backup uses a passphrase you choose. If you lose that passphrase, the encrypted backup cannot be recovered.
- Notifications are checked while the app is open and visible; browser and operating-system behavior varies. A static GitHub Pages site cannot guarantee exact-time background delivery when the browser is closed.
- iCalendar import/export supports common event titles, dates/times, descriptions, URLs and simple daily/weekly/monthly/yearly recurrence. Complex time zones, exception dates and advanced recurrence rules may not round-trip exactly.
- Monthly recurrence follows JavaScript date arithmetic; dates near the end of a month can roll into the next month. The app is a personal countdown planner, not a synced calendar service.

## Validation

GitHub Actions checks JavaScript syntax and required project files on pushes and pull requests.
