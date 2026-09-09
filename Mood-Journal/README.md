# Mood Journal

A modern, private, local-first mood journal for quick emotional check-ins, reflection and personal pattern discovery.

## Feature-complete scope

- One-tap mood check-ins with five simple mood levels
- Mood intensity, energy, stress and sleep-quality context
- Multiple emotions, activities/factors and tags per check-in
- Free-form notes and important/favorite entries
- Quick mood, reflection, gratitude and moment capture
- Today view and searchable timeline
- Monthly calendar with mood visualization
- 30-day, 90-day, 1-year and all-time analysis periods
- Mood distribution and average mood
- 12-week mood rhythm visualization
- 365-day Year in Pixels view
- Logging streak and consistency tracking
- Factor association analysis with minimum-observation guardrails
- Clear "association, not causation" wording for pattern insights
- Reflection library
- Simple check-in-count goals
- Mood Journal Studio with Overview, Patterns, Reflections, Goals and Data areas
- JSON backup/import
- CSV export
- Standalone HTML archive export
- Local restore points
- Password-protected encrypted backup/restore using Web Crypto AES-256-GCM + PBKDF2-SHA-256
- Password is never stored
- Light/dark/system themes
- Responsive desktop/tablet/mobile UI
- Keyboard-friendly native controls and dialogs
- PWA installability
- Offline service-worker cache
- LocalStorage-only core journal storage
- No account, server, telemetry or remote AI required

## Privacy boundary

The normal journal database is stored in the browser's localStorage and is therefore **not encrypted at rest** by this application. Use the encrypted backup option when you need a password-protected export. Browser security, device security and OS storage protections still apply.

The app deliberately does not pretend to diagnose mental-health conditions. Pattern reports are descriptive associations over the user's own logs and should not be interpreted as medical conclusions.

## Research basis

Feature planning was informed by current mood/journal products and open-source projects, especially Daylio, Bearable, Moodnotes and privacy-first open-source mood journals. Common high-value patterns included low-friction check-ins, customizable factors, notes, reminders, calendars, mood maps, goals, charts, correlation views, exports and local privacy.

## Platform boundary

This static GitHub Pages build cannot provide reliable OS-level background reminders, native biometric locking, automatic health-platform synchronization, hosted AI analysis or cross-device cloud synchronization without a backend/native integration. Those are intentionally not faked.

## Run locally

Open `index.html` in a modern browser or serve the folder from a local static server. The service worker requires a secure context such as GitHub Pages or localhost.

## Deployment

GitHub Actions validates the JavaScript, manifest, product markers and required files, then deploys `Mood-Journal/` to GitHub Pages.

Live target: https://aswin-ai-coder.github.io/projects/Mood-Journal/
