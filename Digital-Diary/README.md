# Digital Diary

A modern, private, local-first diary for capturing everyday moments and memories. Designed as a static GitHub Pages app with no account, backend, analytics or required cloud service.

## Included

- Timeline, calendar, memories, favorites and recovery-bin views
- Multiple entries per day and multiple journals
- Rich Markdown-style formatting toolbar
- Title, date/time, mood, energy, weather and location metadata
- Private-entry flag, tags, search and sorting
- Journal and mood filters plus private-only filtering
- Favorite and memory marking
- Daily quick capture, reflection, memory and prompt flows
- Custom prompt library and reusable reflection prompts
- Daily writing streak, word statistics, mood/energy insights and 12-week activity rhythm
- On This Day memories
- Diary Studio with overview, insights, prompts, journals, goals, versions and data workspaces
- Annual writing target and private reflections
- Entry version history with up to 20 saved versions per entry
- Soft-delete trash with restore and permanent deletion
- Up to 15 local restore points
- Daily reminder schedules with notification-permission support when the browser supports it
- Storage usage health and persistent-storage request
- JSON, CSV, Markdown and portable HTML archive export
- Password-based AES-256-GCM encrypted backup export/import using PBKDF2-SHA256; password is never stored
- Local image, video, audio and document attachments through IndexedDB
- Attachment preview/open/delete controls plus a dedicated media library
- Responsive light/dark/system themes
- Distraction-free focus writing mode
- PWA installability and offline caching
- Keyboard shortcut for Diary Studio and Ctrl/Cmd+K search focus
- No account or server required

## Privacy boundary

Diary data is stored in browser localStorage and attachments in browser IndexedDB. Nothing is sent to a server by this application. Browser storage can be cleared by the user or browser, so regular backups are recommended. The app can request persistent browser storage where supported.

The normal diary store is not end-to-end encrypted. The optional encrypted backup uses Web Crypto AES-GCM with a PBKDF2-derived key, but this does not turn ordinary browser storage into a secure device vault. Native biometrics and hardware-backed secure storage are outside the capabilities of a static GitHub Pages application.

Reminder notifications are best-effort browser notifications. Reliable OS-level background scheduling is intentionally not faked because a static client-only site cannot guarantee it across platforms.

## Research basis

The feature set was informed by current diary/journal products and open-source local-first projects, especially patterns around rich writing, multiple journals, calendar/timeline views, media attachments, prompts, templates, mood metadata, reminders, search, streaks, On This Day memories, statistics, recovery, privacy, encryption, export and offline ownership. Current research also covered browser storage persistence, IndexedDB, notifications, Web Crypto and keyboard accessibility.

Research references:
- Day One — https://dayoneapp.com/features/
- Day One Plans — https://dayoneapp.com/plans/
- Day One release notes — https://dayoneapp.com/releases/
- Journey — https://support.journey.cloud/en/categories/journey-basics/articles/what-is-journey
- Diarium — https://diariumapp.com/en
- Penzu — https://penzu.com/
- Inkwell — https://github.com/Fenron-dev/inkwell
- Neoma — https://github.com/infinitumio/neoma
- MDN IndexedDB — https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- MDN Storage — https://developer.mozilla.org/en-US/docs/Web/API/Storage_API
- MDN Web Crypto — https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
- MDN Notifications — https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
- MDN Accessibility — https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Accessible_web_applications_and_widgets

## Platform boundary

This is intentionally a client-only web app. Native biometrics, reliable OS-level background reminders, automatic weather/calendar/location history integrations and cross-device cloud synchronization require platform or server capabilities that GitHub Pages does not provide. The implementation keeps useful local-first versions of those workflows instead of faking remote functionality.

## Live

`https://aswin-ai-coder.github.io/projects/Digital-Diary/`
