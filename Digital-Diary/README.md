# Digital Diary

A modern, private, local-first diary for capturing everyday moments and memories. Designed as a static GitHub Pages app with no account, backend, analytics or required cloud service.

## Included

- Timeline, calendar, memories and favorites views
- Multiple entries per day and multiple journals
- Rich Markdown-style formatting toolbar
- Title, date/time, mood, energy, weather and location metadata
- Tags, search and sorting
- Favorite and memory marking
- Daily quick capture, reflection, memory and prompt flows
- Custom prompt library
- Daily writing streak, writing statistics and 12-week activity rhythm
- On This Day memories
- Diary Studio with overview, mood/energy insights, goals, prompts, journal management and data tools
- Annual writing target and private reflections
- Local restore points and recovery
- JSON, CSV and portable HTML archive export
- Password-based AES-GCM encrypted backup export/import using Web Crypto; password is never stored
- Local image, video, audio and document attachments through IndexedDB
- Attachment preview/open/delete controls
- Responsive light/dark/system themes
- Distraction-free focus writing mode
- PWA installability and offline caching
- Keyboard shortcut for Diary Studio
- No account or server required

## Privacy boundary

Diary data is stored in browser localStorage and attachments in browser IndexedDB. Nothing is sent to a server by this application. Browser storage can be cleared by the user or browser, so regular backups are recommended.

The normal diary store is not end-to-end encrypted. The optional encrypted backup uses Web Crypto AES-GCM with a PBKDF2-derived key, but this does not turn ordinary browser storage into a secure device vault. Native biometrics and hardware-backed secure storage are outside the capabilities of a static GitHub Pages application.

## Research basis

The feature set was informed by current diary/journal products and open-source local-first projects, especially patterns around rich writing, multiple journals, calendar/timeline views, media attachments, prompts, templates, mood metadata, reminders, search, streaks, On This Day memories, statistics, recovery, privacy, encryption, export and offline ownership.

Research references:
- Day One — https://dayoneapp.com/features/
- Day One Plans — https://dayoneapp.com/plans/
- Day One Prompt Packs — https://dayoneapp.com/guides/tips-and-tutorials/prompt-packs/
- Journey — https://support.journey.cloud/en/categories/journey-basics/articles/what-is-journey
- Diarium — https://diariumapp.com/en
- Penzu — https://penzu.com/
- Inkwell — https://github.com/Fenron-dev/inkwell
- Neoma — https://github.com/infinitumio/neoma

## Platform boundary

This is intentionally a client-only web app. Native biometrics, reliable OS-level background reminders, automatic weather/calendar/location history integrations and cross-device cloud synchronization require platform or server capabilities that GitHub Pages does not provide. The implementation keeps useful local-first versions of those workflows instead of faking remote functionality.

## Live

`https://aswin-ai-coder.github.io/projects/Digital-Diary/`
