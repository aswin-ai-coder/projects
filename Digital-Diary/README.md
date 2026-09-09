# Digital Diary

A modern, private, local-first diary for capturing everyday moments and memories. Designed as a static GitHub Pages app with no account, backend, analytics or required cloud service.

## Included

- Timeline, calendar, memories and favorites views
- Multiple entries per day
- Rich Markdown-style formatting toolbar
- Title, date/time, mood, energy, weather and location metadata
- Tags and diary journals
- Search and sorting
- Favorite and memory marking
- Daily quick capture, reflection, memory and prompt flows
- Prompt library and custom prompts
- Daily writing streak and writing statistics
- 21-day activity rhythm and Diary Studio
- Annual entry target and private reflections
- Local restore points and JSON backup/import
- Responsive light/dark/system themes
- Focus writing mode
- Local attachment storage architecture via IndexedDB
- PWA installability and offline caching
- Keyboard shortcut for Diary Studio
- No account or server required

## Privacy boundary

Diary data is stored in browser localStorage. Attachments use browser IndexedDB. Nothing is sent to a server by this application. Browser storage can be cleared by the user or browser, so regular JSON backups are recommended.

This project does not claim end-to-end encryption: browser local storage and IndexedDB are not a substitute for encrypted storage on a compromised device.

## Research basis

The feature set was informed by current diary/journal products and open-source local-first projects, especially patterns around timeline/calendar/map memories, media attachments, prompts, templates, mood metadata, statistics, privacy, export and offline ownership.

Research references:
- Day One — https://dayoneapp.com/features/
- Day One Prompt Packs — https://dayoneapp.com/guides/tips-and-tutorials/prompt-packs/
- Journey — https://support.journey.cloud/en/categories/journey-basics/articles/what-is-journey
- Diarium — https://diariumapp.com/en
- Inkwell — https://github.com/Fenron-dev/inkwell
- Neoma — https://github.com/infinitumio/neoma

## Platform boundary

This is intentionally a client-only web app. Native biometrics, background weather/calendar integrations and cross-device cloud synchronization require platform or server capabilities that GitHub Pages does not provide. The implementation keeps the useful local-first versions of those workflows instead of faking remote functionality.

## Live

`https://aswin-ai-coder.github.io/projects/Digital-Diary/`
