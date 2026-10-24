# Remindful — Reminder Manager

A modern, responsive, local-first reminder app for tasks, routines, follow-ups and important things. Vanilla HTML/CSS/JavaScript, no build step, account, backend or API key.

## Features
- Quick capture and full reminder editor; notes, date/time, priorities, tags and custom lists.
- Daily, weekday, weekly, monthly and yearly recurring reminders.
- Complete/reopen, edit, duplicate, delete and snooze.
- Today, upcoming 30 days, all, completed, overdue and list-specific views.
- Search notes/tags/titles, filters, sorting, stats and weekly overview.
- JSON backup/restore, CSV import/export, iCalendar import/export with recurring rules and supported VALARM alarms.
- Local activity history and export.
- Dark/light theme, keyboard shortcuts, responsive layout, reduced-motion support and accessible labels.
- PWA shell and offline cache after first successful load.
- Data stays in this browser profile unless you export it.

## Run
Open index.html for core functionality. Service worker, PWA installation and browser notifications require HTTPS or localhost.

## Notification limitations
Permission is requested only after clicking Enable. The app checks reminders while open, focused or visible. A static GitHub Pages site has no server-side scheduler or push service, so it cannot guarantee delivery at an exact time when the browser/app is closed. Some browser/device notification features differ. This is documented intentionally rather than promising unreliable background alarms.

## Backups and import
Export JSON regularly and keep backup files private. Restoring replaces current reminders, lists, preferences and history after confirmation. CSV imports use a header row and common fields including title, notes, dueDate, dueTime, priority, list, repeat, lead, tags and completed. ICS import is best-effort for common VEVENT fields; unsupported properties are not preserved. Likely duplicates are skipped.

## Quality
GitHub Actions checks JavaScript syntax and required app files. This is not a substitute for interactive browser testing.

## Research
- MDN Notifications API: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
- MDN notification usage and permission best practices: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
- RFC 5545 iCalendar and VALARM format: https://www.rfc-editor.org/rfc/rfc5545.html
