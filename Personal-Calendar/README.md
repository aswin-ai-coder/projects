# Calm — Personal Calendar

A modern, private, local-first personal calendar built as a static Progressive Web App. It is designed for a single person who wants a capable calendar without an account, server, telemetry, or cloud dependency.

## Features

### Calendar experience
- Month, week, day and 30-day agenda views
- Today navigation and previous/next navigation
- Mini month navigator
- Configurable week start
- 12/24-hour time display
- Configurable visible day window
- Responsive mobile layout
- Print-friendly browser output

### Events
- Timed and all-day events
- Start/end times and duration
- Multi-calendar organization
- Calendar-specific colors
- Location, notes and attendee fields
- Search and filters
- Conflict detection
- Recurrence: daily, weekdays, weekly, every 2 weeks, monthly and yearly
- Recurrence end date
- Remove a single occurrence or an entire recurring series
- Event reminders
- Quick date controls
- Natural-language quick capture such as `Study tomorrow 4pm 90 mins`
- Drag events to another date/time in calendar views

### Planning tools
- Find free time for a chosen duration and working window
- Event templates
- Reusable calendar templates
- Upcoming agenda
- Conflict filter
- Event duplication through templates

### Calendar management
- Multiple personal calendars
- Show/hide calendars
- Calendar descriptions and colors
- JSON backup/import
- iCalendar `.ics` export/import
- RFC 5545-style `VEVENT`, `DTSTART`, `DTEND` and basic `RRULE` portability
- Local browser storage
- Reset data

### PWA and privacy
- Installable web app manifest
- Offline service worker cache
- PWA shortcuts
- Optional browser reminders while the app is open
- No backend
- No accounts
- No analytics or telemetry
- No runtime third-party dependencies

## Design basis

The feature set follows established calendar patterns: multiple color-coded calendars, recurring events, reminders, all-day events, agenda/day/week/month views, calendar portability and conflict/free-time awareness. Google Calendar documents separate calendars and repeating events; Outlook documents day/week/month views, reminders, recurrence, multiple/overlaid calendars and shared-calendar patterns; Apple Calendar documents multiple color-coded calendars, repeating events, alerts, locations, notes, import/export and multiple time zones. The app deliberately keeps its scope local-first instead of pretending to provide real-time collaboration or cloud synchronization.

The import/export model follows the iCalendar standard: RFC 5545 defines `VEVENT`, `DTSTART`, `DTEND`, recurrence rules and recurrence sets. The PWA architecture follows MDN guidance for manifests, service workers and offline operation.

## Architecture

- `index.html` — accessible application shell and dialogs
- `styles.css` — responsive UI, month/week/day/agenda layouts and dark mode
- `app.js` — calendar state, event engine, recurrence expansion, import/export, reminders and views
- `advanced.js` — natural-language capture and drag scheduling enhancements
- `manifest.webmanifest` — install metadata and shortcuts
- `sw.js` — offline cache and runtime fallback
- `icon.svg` — application icon
- `.github/workflows/personal-calendar.yml` — syntax/asset validation and GitHub Pages deployment

## Honest scope boundary

This static/local-first version does **not** claim to provide live Google/Outlook/iCloud sync, multi-device cloud synchronization, server push notifications, account authentication, online invitations, shared-calendar collaboration or hosted AI. Those capabilities require service-side identity, synchronization and/or provider APIs. Users can still exchange calendar data using standard `.ics` files.

## Keyboard shortcuts

- `Ctrl/Cmd + N` — new event
- `/` — focus search
- `M` — month view
- `W` — week view
- `D` — day view
- `A` — agenda view
- `Esc` — close dialogs

## Privacy

Calendar records are stored in browser `localStorage`. Exported files leave the browser only when the user explicitly exports or downloads them. Browser reminders are opt-in and are only scheduled by the app while the page is available; this project does not use a server push system.

## Research references

- Google Calendar Help — events, separate calendars and recurring events: https://support.google.com/calendar/answer/72143 and https://support.google.com/calendar/answer/37115
- Microsoft Support — Outlook Calendar, scheduling, multiple calendars and sharing: https://support.microsoft.com/en-us/outlook/calendar/introduction-to-the-outlook-calendar
- Apple Support — Calendar User Guide: https://support.apple.com/guide/calendar/welcome/mac
- RFC 5545 — iCalendar: https://datatracker.ietf.org/doc/html/rfc5545
- MDN — Progressive Web Apps and offline operation: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app and https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation
