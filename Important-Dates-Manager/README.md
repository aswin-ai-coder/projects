# Daymark — Important Dates Manager

Daymark is a modern, responsive, local-first planner for anniversaries, milestones, appointments, deadlines, holidays, trips and personal events. Built with vanilla HTML, CSS and JavaScript; no build step, account, API key or backend required.

## Features
- Create, edit, view and delete important dates with title, date range, type, notes, location, link, color, category, priority and reminder preference.
- Recurrence: one-time, weekly, monthly and yearly dates; leap-day yearly dates are observed on February 28 in non-leap years.
- Countdown and views for overview, coming 60 days, today, calendar year, all dates and past dates.
- Search, type/category filters, important-only, overdue, recurring, next 7/30 days and sorting by date/title/recently added.
- Completion status tracked per occurrence for recurring events.
- Custom categories with colors, details view and local activity history.
- Export recurrence and supported VALARM reminders to iCalendar (.ics); CSV export; JSON backup/restore; CSV/JSON/iCalendar import with duplicate checks.
- Optional browser notifications when the app opens and a reminder is due (permission required); persistent notifications where supported.
- Light/dark themes, responsive layout, keyboard focus indicators, reduced-motion support, PWA installation and offline shell after first load.
- Export confirmation preference and double-confirmed clear-data action.

## Run
Open index.html or publish this folder with GitHub Pages. Install/offline support requires HTTPS or localhost.

Expected Pages URL if enabled: https://aswin-ai-coder.github.io/projects/Important-Dates-Manager/

## CSV import
Include a header row with Title and Date (YYYY-MM-DD). Optional columns: End date, Type, Recurrence, Category, Important, Color, Reminder enabled, Reminder days, Location, Notes, Link.

## Privacy and limitations
- Dates are stored in this browser's localStorage and are not uploaded. Anyone with access to the same browser profile may see them.
- CSV/JSON exports can contain personal details; store them privately.
- Reminder checks run when the app opens. Static browser hosting cannot guarantee scheduled background delivery while the app is closed. Calendar alarm behavior depends on the receiving calendar app.
- iCalendar import supports common DTSTART, SUMMARY, DESCRIPTION and simple yearly/monthly/weekly recurrence fields; complex calendar features may not be preserved.
- Multi-day events are stored as a date range; recurrence behavior for multi-day events may vary across calendar apps.
- No automatic cloud sync or direct Google/Apple/Outlook account integration.
- Daymark is a personal organizer, not a secure vault or shared calendar.

## Standards and design references
- iCalendar recurrence and alarm format: RFC 5545.
- Calendar event model and recurrence concepts: Google Calendar developer documentation.
- The interface uses responsive layouts, semantic controls, visible keyboard focus, and reduced-motion preferences.
