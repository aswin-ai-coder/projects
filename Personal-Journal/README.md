# Personal Journal

A modern, private, local-first journal for writing daily entries, preserving memories, and reviewing your writing rhythm.

## Features

- Timeline, calendar, favorites, and **On this day** views
- Rich-text writing with headings, lists, links, bold, italic and underline
- Multiple entries per day with date/time metadata
- Mood, weather, location, tags, favorite and private-note metadata
- Full-text search plus journal/tag/mood filters
- Daily writing prompts and guided prompts
- Reusable journal templates and custom templates
- Journaling streak and activity insights
- 21-day activity heatmap and writing statistics
- Journal Studio with weekly reflection, restore points and enriched exports
- JSON backup/import, CSV export and Markdown export
- Full local restore points for safer experimentation
- Optional local app lock using a PIN hash
- Light/dark/system appearance
- Responsive mobile layout
- PWA and offline caching
- No account, server, analytics or remote AI required

## Privacy boundary

The app stores journal data in the browser's localStorage. It does not upload entries anywhere. The optional app lock helps prevent casual access on the same browser profile, but it is **not equivalent to end-to-end encryption** and should not be described as cryptographic journal protection. Exported backup files are unencrypted and should be handled carefully.

## Research basis

The feature set was compared against current journaling patterns from Day One, Diarium and Journey: templates, prompts, streaks, calendar/timeline views, favorites, tags, search/filtering, mood/context metadata, On This Day memories, backups/exports, local-first privacy, and restore/review workflows.

References:
- https://dayoneapp.com/features/
- https://dayoneapp.com/guides/tips-and-tutorials/templates/
- https://dayoneapp.com/guides/tips-and-tutorials/prompt-packs/
- https://dayoneapp.com/guides/tips-and-tutorials/exporting-entries/
- https://diariumapp.com/en
- https://journey.cloud/
- https://support.journey.cloud/en/categories/app-interface-functionalities/articles/timeline-interface-in-journey

## Platform boundary

This is intentionally a static GitHub Pages application. Cloud sync, cross-device accounts, server-side encryption, guaranteed background reminders, biometric unlock and remote AI are not included because they require platform services or native capabilities beyond a standalone local-first Pages app.

## Deployment

https://aswin-ai-coder.github.io/projects/Personal-Journal/
