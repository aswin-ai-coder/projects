# Gratitude Journal

A modern, calm, private and local-first gratitude journal for noticing good moments without turning the practice into a performance.

## Feature-complete scope

- Fast one-line gratitude capture
- Multiple entries per day
- Date/time, people, place and category metadata
- Mood context and tags
- Favorites / Memories collection
- Search across gratitude, people, places and tags
- Today, journal, calendar and memories views
- Monthly calendar navigation
- 30-day, 90-day, yearly and all-time periods
- Practice streak and consistency tracking
- 365-day gratitude activity map
- 12-week practice rhythm
- Category distribution and practice profile
- Daily rotating prompt library
- Custom prompts
- Prompt-assisted entry creation
- Morning and evening gratitude rituals
- Reflection library
- Practice goals
- Gentle review language that avoids guilt around missed days
- Gratitude Studio with overview, prompts, rituals, insights, goals and data
- JSON backup/import
- CSV export
- Standalone HTML archive
- Local restore points
- Password-protected encrypted backup/restore
- PBKDF2-SHA-256 key derivation + AES-256-GCM encryption
- Password is never stored
- Light/dark/system themes
- Responsive mobile/tablet/desktop UI
- PWA installability
- Offline service-worker cache
- LocalStorage-only journal data
- No account, backend, telemetry or remote AI

## Research basis

Feature planning was informed by current gratitude and journaling products and open-source projects. Presently emphasizes simple private daily entries, reflection history, prompts, reminders, search, export/import and device-local ownership. Current gratitude apps also use mood context, streaks, calendars, memories, rich prompts and media. Day One's current Prompt Packs demonstrate the value of themed prompts and progress, while Stoic emphasizes morning/evening reflection and guided journals. Privacy-first open-source projects reinforce local storage and encrypted backup patterns. The app deliberately keeps the experience calm and avoids manipulative streak pressure. citeturn0search0turn0search1turn0search4turn0search17

## Privacy boundary

The normal journal is stored in browser localStorage and is not encrypted at rest by this application. Use the encrypted backup option when a password-protected portable copy is needed. The password is never saved. Browser/device security still applies.

This static GitHub Pages build does not fake native biometric locking, guaranteed background reminders, cloud sync, hosted AI, automatic health integrations or server-side accounts. Those require platform/backend capabilities outside this project.

## Design principle

Gratitude is optional and personal. Missing a day is not failure. Streaks and goals are descriptive tools, not requirements.

## Deployment

GitHub Actions validates JavaScript syntax, required files, manifest JSON, feature markers and placeholder scans, then deploys `Gratitude-Journal/` to GitHub Pages.

Live target: https://aswin-ai-coder.github.io/projects/Gratitude-Journal/
