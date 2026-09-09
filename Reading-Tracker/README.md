# Reading Tracker

A modern local-first reading workspace for managing a personal library, reading progress, sessions, goals, reflections and long-term reading analytics.

## Core features

- Want to Read, Currently Reading, Read, DNF and Owned shelves
- Title, author, pages, current progress, genre, tags and private notes
- Page and percentage progress
- Reading-session history with pages, minutes, dates and notes
- Annual book, page and minute targets
- Dashboard, library, sessions, statistics and goals views
- Search and status filtering
- Reading Studio with prompts, reflections, challenges and restore points

## Power Studio

- Deliberate Up Next queue
- Per-book format, series and ISBN metadata
- Private 0.5-step ratings and reviews
- Quotes, locations and personal annotations
- DNF reason tracking
- Reading plans with page/minute targets and deadlines
- Current and longest reading streaks
- Total pace and average-session analysis
- Year-over-year book/page comparison
- Genre/library profile analysis
- Daily page and minute preferences
- Complete JSON portability
- Password-based AES-256-GCM encrypted export using PBKDF2-SHA-256

## Privacy and platform boundary

All reading data stays in the browser's local storage. There is no account, backend, telemetry or remote AI. The static GitHub Pages architecture intentionally does not claim server sync, online catalog lookup, barcode scanning or guaranteed background reminders.

## Research basis

Feature planning was informed by current reading products and open-source/self-hosted trackers. Research covered custom tags/lists, DNF and owned states, reading journals, progress history, challenges, queues, ratings, statistics, metadata/ISBN support, quotes/annotations, imports/exports, reading sessions and privacy-first data ownership. The implementation favors useful local capabilities that work without an account.

## Offline/PWA

The project is installable as a PWA and caches the application shell plus the advanced reading layer for offline use.

## Validation

`.github/workflows/reading-tracker.yml` performs JavaScript syntax checks, required-file checks, product-feature checks and GitHub Pages deployment.
