# Personal Journal

A modern, private, local-first journal for writing daily entries, preserving memories, and reviewing your writing rhythm.

## Feature-complete scope

### Writing and memory capture
- Timeline, calendar, favorites, and **On this day** views
- Rich-text writing with headings, lists, links, bold, italic and underline
- Multiple entries per day with editable date/time
- Mood, weather, location, tags, favorite and private-note metadata
- Daily prompts plus an expanded guided prompt library
- Reusable built-in and custom journal templates
- Autosaved draft recovery for unfinished writing
- Focus mode for distraction-free writing

### Organization and discovery
- Multiple journals
- Full-text search
- Journal, tag and mood filters
- Favorites
- Entry duplication and deletion
- Activity history metadata
- Journaling streaks
- 21-day writing heatmap
- Mood distribution and tag-frequency insights
- Writing-pattern analysis
- Writing-day and word-count statistics

### Reflection and personal analytics
- Journal Studio workspace
- Daily reflection check-ins for mood, energy, sleep and stress
- Weekly reflections
- Weekly writing goals
- Optional annual entry target
- Gentle progress guidance rather than aggressive streak pressure
- Prompt library with custom prompts

### Data ownership and recovery
- Local browser storage
- JSON backup/import
- Full JSON backup including Studio data
- Enriched CSV export
- Markdown export from the core journal
- Standalone HTML archive export
- Local restore points
- Draft recovery
- Optional AES-GCM encrypted backup using a password-derived key
- No account, server, analytics or remote AI required

### UX and platform
- Light/dark/system appearance
- Responsive mobile layout
- Keyboard-friendly controls
- PWA and offline caching
- GitHub Pages deployment

## Privacy boundary

The journal stays in browser storage and is not uploaded by this application. The optional app PIN is intended to prevent casual access in the same browser profile; it is **not** presented as end-to-end encryption. The encrypted-backup feature uses browser Web Crypto AES-GCM with a password-derived key and is separate from the normal localStorage lock.

Do not lose the password used for an encrypted backup: the application does not maintain a recovery key or server-side copy.

## Research basis

The feature set was reviewed against current 2026 journaling patterns from Day One, Diarium and Journey, including rich text, multiple journals, prompts, templates, reminders/streak concepts, On This Day, search/filtering, mood/context metadata, calendar/timeline views, media-oriented capture, exports, recovery, privacy and reflective analytics. citeturn1search0turn1search1turn1search2turn1search3turn1search7

The implementation intentionally keeps the product local-first and deterministic. Current commercial products offer cloud sync, native biometric security, large media libraries, integrations and optional AI services; those depend on native/platform infrastructure and are outside the scope of a standalone GitHub Pages application. citeturn1search0turn1search2turn1search8

## Platform boundary

Not included: cloud synchronization, user accounts, server-side key management, guaranteed background notifications, native biometrics, third-party integrations, or hosted AI. These are infrastructure capabilities rather than missing local UI features.

## Deployment

https://aswin-ai-coder.github.io/projects/Personal-Journal/
