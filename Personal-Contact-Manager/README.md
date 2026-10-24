# Kindred — Personal Contact Manager

Modern, responsive, local-first address book using vanilla HTML/CSS/JavaScript. No build step, account, API key or backend.

## Features
- Contact profiles: names, nickname, company, job title, relationship, birthday, multiple labeled phones/emails, websites, address, notes, custom fields, tags, favorites, color, photo URL, follow-up date and note.
- Color-coded groups; contacts can belong to multiple groups.
- Live search across names, companies, contact methods, notes, tags, groups and custom fields.
- Sorting by name, company, creation/update date or upcoming birthday; filters for group, birthday, follow-up and tags.
- Views: all contacts, favorites, recent additions, upcoming birthdays, follow-ups, groups and trash.
- Click-to-call/email, map lookup, individual vCard export, grid/list layout, bulk group/delete.
- Duplicate review by shared phone/email. Merge combines phone/email values, tags, groups, custom fields, notes, favorites and follow-ups; extras go to trash.
- CSV import/export, vCard (.vcf) import/export, Kindred JSON backup/restore.
- Soft delete/restore, permanent-delete confirmation and local activity log.\n- Per-contact interaction timeline for calls, messages, emails, meetings, video calls and notes.\n- Contact-linked events with date/time, optional reminder timestamp, notes and completion tracking; upcoming agenda view.\n- Export upcoming plans as an iCalendar (.ics) file and export the full interaction/event timeline as CSV.\n- Timeline and event records are included in Kindred JSON backups.
- Light/dark theme, mobile navigation, keyboard shortcuts, accessible labels, installable PWA and offline shell after first successful load.

## Run
Open index.html in an editor or serve via GitHub Pages. PWA installation/offline caching needs HTTPS or localhost.
Expected Pages URL if enabled: https://aswin-ai-coder.github.io/projects/Personal-Contact-Manager/

## Privacy and limitations
- Data lives in this browser profile's localStorage and is not uploaded to a server. Anyone using the same unlocked browser profile may access it.
- JSON backup is not encrypted and contains personal data; store it privately. Browser storage can be cleared, so make backups.
- No automatic sync with Google Contacts, Apple Contacts, Outlook, phone address book, cloud services or other devices. Reminder timestamps are stored and shown in the app but do not trigger background notifications.
- CSV formats vary by provider; common column names are supported. Review imported data.
- Loading a remote profile image makes a network request to that host. Use only URLs you trust.
- This is a personal address book, not a shared CRM or secure vault.

Local keys: kindred-contacts:v1, kindred-groups:v1, kindred-profile:v1, kindred-audit:v1, kindred-interactions:v1, kindred-events:v1.\n\nReminder note: reminders are displayed inside the app; no background or operating-system notifications are sent.
GitHub Actions checks JavaScript syntax and required assets.
