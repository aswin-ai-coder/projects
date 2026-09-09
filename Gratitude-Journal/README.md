# Gratitude Journal

A modern, calm, private and local-first gratitude journal for noticing good moments without turning the practice into a performance.

## Advanced feature-complete scope

- Fast one-line gratitude capture and multiple entries per day
- Three Good Things guided ritual
- Date/time, people, place and category metadata
- Mood context, tags, favorite memories
- Meaning layer: why a gratitude matters and how to savor/pass it forward
- Today, journal, calendar, memories and insights views
- Search across gratitude, context, people, places, categories and tags
- Random memory resurfacing
- 30-day, 90-day, yearly and all-time analysis periods
- Practice streak and consistency tracking with gentle, non-guilt framing
- 365-day gratitude activity map
- 12-week practice rhythm
- Category and appreciated-person frequency insights
- Milestones and badges based on practice activity
- Large rotating prompt library
- Custom prompts and favorite prompts
- Prompt-assisted entry creation
- Morning/evening rituals
- Optional browser notification permission and reminder preference
- Reflection library
- Practice goals
- Private appreciation-letter drafts
- Acts-of-appreciation log
- Gratitude Studio with Overview, Prompts, Rituals, Insights, Appreciation, Goals and Data
- Local IndexedDB media attachments for images, audio, video and documents
- JSON backup/import
- CSV export
- Standalone HTML archive
- Local restore points
- Password-protected encrypted backup/restore
- PBKDF2-SHA-256 key derivation + AES-256-GCM encryption
- Password is never stored
- Light/dark/system themes
- Responsive mobile/tablet/desktop UI
- PWA installability and offline service-worker cache
- LocalStorage journal database + IndexedDB attachment database
- No account, backend, telemetry or remote AI required

## Research basis

Feature planning was informed by current gratitude and journaling products including Presently, current gratitude-journal apps, Gratitude Plus, Gratitude/Self-Care Journal, Gratefuly, Gratify, Delightful and Apple's Journal patterns. Common high-value capabilities include low-friction daily writing, three-good-things formats, changing prompts, memories, mood context, calendars, streaks, search, reminders, rich media, private device storage, exports and guided morning/evening reflection. citeturn0search0turn0search1turn0search2turn0search4turn0search5turn0search9

The design deliberately avoids turning gratitude into a performance metric. Streaks, badges and goals describe the practice but do not imply that missing a day is failure. Pattern views are descriptive and do not claim medical or causal conclusions.

## Privacy boundary

The normal journal is stored in browser localStorage and is not encrypted at rest by this application. Media attachments are stored locally in IndexedDB. Use the encrypted backup option for a password-protected portable copy of the journal database. The encrypted export does not package browser-local media blobs; the app states this explicitly rather than pretending they are backed up.

This static GitHub Pages build does not fake native biometric locking, guaranteed background notifications, cloud sync, hosted AI, automatic health integrations or server-side accounts. Those require platform/backend capabilities outside this project.

## Deployment

GitHub Actions validates JavaScript syntax, required files, manifest JSON, media support, advanced feature markers and placeholder scans, then deploys `Gratitude-Journal/` to GitHub Pages.

Live target: https://aswin-ai-coder.github.io/projects/Gratitude-Journal/
