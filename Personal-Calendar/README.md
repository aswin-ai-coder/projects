# Calm — Personal Calendar

A modern, private, local-first personal calendar built as a static Progressive Web App. It is designed for a single person who wants a capable calendar without an account, server, telemetry, or cloud dependency.

## Feature-complete local-first scope

### Calendar experience
- Month, week, day and 30-day agenda views
- Today navigation and previous/next navigation
- Mini month navigator
- Configurable week start
- 12/24-hour time display
- Configurable visible day window
- Responsive mobile layout
- Print-friendly browser output
- Keyboard-accessible controls and visible focus states

### Events
- Timed and all-day events
- Start/end times and duration
- Multi-calendar organization
- Calendar-specific colors
- Location, notes and attendee fields
- Search and filters
- Conflict detection and conflict filtering
- Recurrence: daily, weekdays, weekly, every 2 weeks, monthly and yearly
- Recurrence end date
- Remove a single occurrence or an entire recurring series
- Event reminders
- Quick date controls
- Natural-language quick capture such as `Study tomorrow 4pm 90 mins`
- Drag events to another date/time in calendar views
- Event templates
- Duplicate/copy/paste events

### Advanced event intelligence
- Event status: confirmed, tentative, cancelled
- Busy/free availability / transparency
- Event privacy classification
- Categories and tags
- Meeting/reference URL metadata
- Per-event time-zone metadata
- Travel-time buffers
- Protected focus-time classification
- Advanced event inspector
- Enhanced iCalendar export carrying categories, status, privacy, transparency, URL and local metadata extensions

### Planning and scheduling
- Find free time for a chosen duration and working window
- Smart free-time suggestions with morning/afternoon/balanced preferences
- Scheduling buffers
- Travel-aware free-time calculations
- One-click focus-block creation
- Working-day configuration
- Focus-time target
- Weekly planning capacity
- Default time zone
- Calendar workload insights
- Monthly event-hours and focus-hours analysis
- Busiest-day detection
- Conflict-pair analysis
- Overloaded-day health checks
- Event completeness checks
- Recurring-series statistics

### Calendar management and portability
- Multiple personal calendars
- Show/hide calendars
- Calendar descriptions and colors
- JSON backup/import
- iCalendar `.ics` export/import
- RFC 5545-style `VEVENT`, `DTSTART`, `DTEND`, recurrence and exception portability
- Enhanced export with `STATUS`, `CLASS`, `TRANSP`, `CATEGORIES`, `URL` and `EXDATE`
- Local advanced metadata export/import
- Local restore snapshots
- Up to 12 local restore points
- Storage usage/quota inspection
- Optional persistent-storage request
- Reset data

### Modern PWA and privacy
- Installable web app manifest
- Offline service worker cache
- PWA shortcuts
- Optional browser reminders with explicit permission
- Local-first storage
- No backend
- No accounts
- No analytics or telemetry
- No runtime third-party dependencies
- No pretend cloud synchronization

### Power-user UX
- Command palette with `Ctrl/Cmd + K`
- Quick access to views and planning tools
- Advanced Control Center
- Mobile-friendly advanced panels
- Keyboard Escape handling for overlays
- Accessible native dialogs in the core UI
- Visible focus indicators

## Research basis

The product scope was deliberately expanded after reviewing current calendar patterns from Google Calendar, Outlook and Apple Calendar, plus the iCalendar standard and current browser/PWA guidance.

- Google Calendar documents event creation, guests, colors, recurring events, suggested meeting times, working hours/location and focus-time concepts.
- Outlook documents multiple calendars, merged/side-by-side views, reminders, recurrence, categories, Scheduling Assistant and `.ics` support.
- Apple Calendar documents multiple color-coded calendars, repeating events, alerts, locations/travel time, invitees, attachments, URLs, time zones, import/export and focus-related behavior.
- RFC 5545 defines the iCalendar `VCALENDAR`/`VEVENT` model, recurrence rules, exception dates, event status, transparency and related event properties.
- MDN documents PWA manifests, service workers, offline operation, Notifications, storage APIs and IndexedDB. IndexedDB is intentionally identified as the correct future layer for large attachments rather than inflating localStorage.
- WCAG/WAI guidance was used for keyboard access, visible focus and modal interaction patterns.

## Architecture

- `index.html` — accessible application shell and core dialogs
- `styles.css` — responsive UI, calendar layouts and dark mode
- `app.js` — calendar state, event engine, recurrence expansion, core import/export, reminders and views
- `advanced.js` — advanced planning, event intelligence, command palette, snapshots, insights, smart scheduling and enhanced iCalendar export
- `manifest.webmanifest` — install metadata and PWA shortcuts
- `sw.js` — offline cache and runtime fallback
- `icon.svg` — application icon
- `.github/workflows/personal-calendar.yml` — syntax/asset validation and GitHub Pages deployment

## Honest architecture boundary

This project is intentionally **feature-complete for a static/local-first architecture**, not a cloud calendar clone. It does not pretend to provide live Google/Outlook/iCloud synchronization, multi-device cloud sync, server push, account authentication, online invitations, shared-calendar collaboration, real-time free/busy lookup, maps/weather, or hosted AI. Those features require provider APIs, identity, networking and/or a backend. Standard `.ics` exchange remains available.

For larger binary attachments, IndexedDB is the appropriate browser technology; the current project keeps calendar records in localStorage so the core remains simple and portable.

## Keyboard shortcuts

- `Ctrl/Cmd + N` — new event (core)
- `/` — focus search (core)
- `M` — month view
- `W` — week view
- `D` — day view
- `A` — agenda view
- `Ctrl/Cmd + K` — command palette
- `I` — open Advanced Control Center when the page body has focus
- `Esc` — close dialogs/advanced overlays

## Privacy

Calendar records and advanced metadata are stored locally in the browser. Exported files leave the browser only when the user explicitly exports them. Browser reminders require explicit permission. No calendar data is sent to a project server.

## Research references

- Google Calendar Help: event creation, recurring events, guests, working hours and focus time — https://support.google.com/calendar/
- Microsoft Support: Outlook Calendar and scheduling — https://support.microsoft.com/en-us/outlook/calendar/
- Apple Support: Calendar User Guide — https://support.apple.com/guide/calendar/welcome/mac
- RFC 5545: Internet Calendaring and Scheduling Core Object Specification — https://www.rfc-editor.org/rfc/rfc5545
- MDN: Progressive Web Apps — https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Reference
- MDN: Notifications API — https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
- MDN: IndexedDB API — https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- W3C WAI: WCAG 2.2 — https://www.w3.org/TR/WCAG22/
