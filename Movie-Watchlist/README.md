# Movie Watchlist

A modern, private, local-first personal cinema tracker for deciding what to watch, recording viewing history, and understanding your movie taste without an account or backend.

## Feature-complete scope

- Watchlist, watched and DNF states
- Dated movie diary and rewatch tracking
- Five-star ratings, favorites, reviews and personal notes
- Director, year, runtime, genres and free-form tags
- Search, filtering and sorting
- Private curated lists
- Random and smart watchlist picking
- Smart local filters for favorites, unrated films, rewatches and long films
- Annual viewing goal and viewing challenges
- Genre, rating, year and watch-time analytics
- Movie Studio with reflections and customizable prompts
- Streaming-service labels for manually recording where you can watch/own a title
- Browser notification permission preference
- Local restore points
- JSON backup/import
- CSV export
- Password-derived AES-GCM encrypted backup export
- PWA/offline caching and service-worker registration
- Responsive light/dark/system interface
- Keyboard shortcuts
- Local-first browser storage
- No account, backend, telemetry or remote recommendation engine

## Research basis

The interaction model was informed by current movie-tracking patterns from Letterboxd and Trakt: watchlists, watched history/diaries, ratings, reviews, tags, rewatches, curated lists, imports, detailed statistics, progress/history views, challenges and discovery-oriented workflows. Letterboxd documents watchlists, dated diary entries, ratings, reviews, tags, lists, imports and statistics; Trakt's 2026 product updates emphasize lists, filters, history, calendars, screen-time statistics, ratings and import/recovery workflows. citeturn0search0turn0search2

## Platform boundary

Movie metadata and streaming labels are intentionally manual. This GitHub Pages build does not claim live catalog, poster, cast/crew or streaming-availability data without a remote API. That keeps it free, private and usable offline. Encrypted backup protects exported copies; normal browser storage remains local browser storage rather than full-disk encryption.
