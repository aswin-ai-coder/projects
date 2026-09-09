# Mood Journal

A modern, private, local-first mood journal for low-friction emotional check-ins, reflection and personal pattern discovery.

## Feature-complete scope

### Check-ins
- One-tap mood check-ins with five simple mood levels
- Mood intensity, energy, stress and sleep-quality context
- Multiple emotions, activities/factors and tags per check-in
- Free-form notes and important/favorite entries
- Quick mood, reflection, gratitude, intention, coping and moment capture
- Reusable check-in templates
- Custom reflection prompts

### Review & analytics
- Today view and searchable timeline
- Monthly calendar with mood visualization
- 30-day, 90-day, 1-year and all-time analysis periods
- Mood distribution and average mood
- 12-week mood rhythm visualization
- 365-day Year in Pixels view
- Logging streak and consistency tracking
- Factor association analysis with minimum-observation guardrails
- Personal experiments for comparing a factor with mood over time
- Custom numeric, rating and yes/no trackers
- Custom tracker history
- 7-day reflection summary
- Clear "association, not causation" wording for pattern insights

### Studio
- Mood Journal Studio with Overview, Patterns, Reflections, Goals and Data
- Advanced Wellness workspace
- Reflection library
- Check-in-count goals
- Custom trackers
- Personal experiments
- Prompt library
- Reusable templates
- Daily reminder preference with browser notification support when permission is available

### Data & privacy
- JSON backup/import
- CSV export
- Standalone HTML archive export
- Local restore points
- Password-protected encrypted backup/restore using Web Crypto AES-256-GCM + PBKDF2-SHA-256
- Password is never stored
- LocalStorage-only core journal storage
- No account, server, telemetry or remote AI required
- No diagnostic or medical claims

### UX/platform
- Light/dark/system themes
- Responsive desktop/tablet/mobile UI
- Keyboard-friendly native controls and dialogs
- PWA installability
- Offline service-worker cache
- Fast local interaction
- Graceful browser capability fallbacks

## Privacy boundary

The normal journal database is stored in the browser's localStorage and is therefore **not encrypted at rest** by this application. Use the encrypted backup option when you need a password-protected export. Browser security, device security and OS storage protections still apply.

Pattern reports are descriptive associations over the user's own logs. They are not medical conclusions or diagnoses.

## Research basis

Feature planning was informed by current mood/journal products and open-source projects including Daylio, Bearable, MoodNotes, Nightlio, Nomie, Moodiary and other privacy-first local applications. Common high-value patterns included low-friction check-ins, customizable factors and measurements, notes, reminders, calendars, mood maps, goals, experiments, charts, correlation views, exports, rich journaling and local privacy. The implementation also borrows the strongest local-first principles seen in open-source journaling projects: offline operation, portable backups, explicit privacy boundaries and no required account.

## Platform boundary

This static GitHub Pages build cannot provide reliable OS-level background reminders, native biometric locking, automatic health-platform synchronization, hosted AI analysis or cross-device cloud synchronization without a backend/native integration. Those are intentionally not faked. Browser notifications are best-effort and require user permission and an open/recently active browser environment.

## Run locally

Open `index.html` in a modern browser or serve the folder from a local static server. The service worker requires a secure context such as GitHub Pages or localhost.

## Deployment

GitHub Actions validates all JavaScript modules, the manifest, required files and product markers, then deploys `Mood-Journal/` to GitHub Pages.

Live target: https://aswin-ai-coder.github.io/projects/Mood-Journal/
