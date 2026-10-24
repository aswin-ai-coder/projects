# Daylight — Birthday Manager

A modern, responsive, local-first birthday organizer built with vanilla HTML, CSS and JavaScript. No build step, account, API key or backend required.

## Features
- Birthday profiles with name, nickname, birthday, optional birth year, relationship, group, color, notes and reminder preferences.
- Countdown and age calculations, yearly recurrence and leap-year handling (February 29 is observed on February 28 in non-leap years).
- Dashboard spotlight, birthdays within 30 days, this-month count and wishes marked sent this year.
- Overview, upcoming 60 days, today, everyone, month calendar and group views.
- Search, filters, sorting by date/name/month/age, grid/list layout, color-coded groups.
- CSV import/export, JSON backup/restore, iCalendar export with yearly recurring birthday events.
- Duplicate warning, local activity history, light/dark themes, responsive navigation, PWA/offline shell.
- Optional confirmation before exporting personal data and double-confirmed clear-data action.

## Run
Open `index.html` locally or publish this folder using GitHub Pages. PWA install/offline support needs HTTPS or localhost.

Expected Pages URL if enabled: https://aswin-ai-coder.github.io/projects/Birthday-Manager/

## CSV import
Use `Name` and `Birthday` in `YYYY-MM-DD` format, or `Name`, `Birthday month`, and `Birthday day`. Birth year, Nickname, Relationship and Notes are optional. Daylight JSON backups can be restored.

## Privacy and limitations
- Records stay in this browser's localStorage; they are not uploaded. Other users of the same browser profile may access them.
- CSV and JSON exports contain personal information; store them privately.
- `.ics` events repeat yearly. Calendar apps control their own notifications.
- Reminder preferences are stored locally. The app shows in-app reminders when opened; it does not run background notifications.
- No automatic phone, Google, Apple, Outlook or cloud sync.
- February 29 birthdays are observed on February 28 in non-leap years.
- This is a personal organizer, not a shared calendar or secure vault.
