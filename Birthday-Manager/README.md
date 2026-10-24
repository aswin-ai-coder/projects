# Daylight — Birthday Manager

A modern, responsive, local-first birthday organizer built with vanilla HTML, CSS and JavaScript. No build step, account, API key or backend required.

## Features
- Birthday profiles with name, nickname, birthday, optional birth year, relationship, group, color, notes, gift ideas and reminder preferences.
- Countdown and age calculations, yearly recurrence and leap-year handling (February 29 is observed on February 28 in non-leap years).
- Dashboard spotlight, birthdays within 30 days, this-month count and wishes marked sent this year.
- Quick birthday-message generator with copy-to-clipboard, plus gift-idea notes attached to each person.
- Overview, upcoming 60 days, today, everyone, month calendar and group views.
- Search, filters, sorting by date/name/month/age, grid/list layout, color-coded groups.
- CSV import/export (including re-importing month-name CSVs), JSON backup/restore that preserves groups, and iCalendar export with yearly recurring birthday events and supported calendar alarms.
- Duplicate warning, local activity history, light/dark themes, responsive navigation, PWA/offline shell.
- Optional browser notifications when the app is opened and a reminder is due (permission required; persistent notification display is used where supported), export confirmation, and double-confirmed clear-data action.
- Accessibility polish: visible keyboard focus, reduced-motion support, labeled form controls, responsive layouts and keyboard-operable native dialogs.

## Run
Open `index.html` locally or publish this folder using GitHub Pages. PWA install/offline support needs HTTPS or localhost.

Expected Pages URL if enabled: https://aswin-ai-coder.github.io/projects/Birthday-Manager/

## CSV import
Use `Name` and `Birthday` in `YYYY-MM-DD` format, or `Name`, `Birthday month`, and `Birthday day`. Birth year, Nickname, Relationship and Notes are optional. Daylight JSON backups can be restored.

## Privacy and limitations
- Records stay in this browser's localStorage; they are not uploaded. Other users of the same browser profile may access them.
- CSV and JSON exports contain personal information; store them privately.
- `.ics` events repeat yearly and include display alarms where enabled; alarm behavior depends on the calendar application. February 29 events use a leap-year recurrence rule.
- Reminder preferences are stored locally. In-app reminders and optional browser notifications are evaluated when the app opens; a static browser app cannot guarantee scheduled background delivery. Exported iCalendar alarms depend on support in the calendar app. Browser notifications are deduplicated per person and calendar year.
- No automatic phone, Google, Apple, Outlook or cloud sync.
- February 29 birthdays are observed on February 28 in non-leap years.
- Gift ideas and message drafts are convenience helpers, not sent automatically; always review and personalize messages.
- This is a personal organizer, not a shared calendar or secure vault.
