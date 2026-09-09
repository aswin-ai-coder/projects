# Movie Watchlist

A modern, private, local-first personal cinema tracker for deciding what to watch, recording viewing history, and understanding movie taste without an account or backend.

## Feature-complete scope

### Core library
- Watchlist, watched and DNF states
- Add, edit, view and delete movies
- Half-star ratings from 0.5 to 5
- Favorites, rewatches and rewatch counts
- Multiple dated viewing records
- Director, cast, release date/year, runtime, genres, country and language
- Tags, mood, priority and private notes
- Reviews with spoiler flag
- Streaming/service, viewing location, format and ownership fields
- Optional poster, backdrop, trailer and source URLs

### Organization & discovery
- Full-text search across movie metadata, tags, notes and reviews
- Status, favorite, rewatch, unrated and owned filters
- Sorting by added date, title, rating, release year, runtime, priority and watched date
- Private custom lists with multi-select membership management
- Bulk select, status changes, favorites and deletion
- Random picker and explainable local decision engine
- Mood, runtime, priority, rating-state and genre decision helpers
- Smart rule-based lists with saved results
- Group picker for shared shortlists
- Watchlist aging and library-quality audit
- Duplicate-title detection and incomplete-metadata audit

### Diary, analytics & taste
- Chronological diary grouped by month
- Rewatch history
- Annual viewing goal and progress
- Monthly viewing bars and calendar activity
- Viewing-day counts and longest consecutive-day streak
- Genre breakdown and rating distribution
- Director, decade and language taste profile
- Average rating and total watch time
- Current-year and historical year review
- Copyable year-review summaries
- Private reflection journal and viewing challenges

### Data, portability & privacy
- LocalStorage persistence with automatic v1 migration
- Full JSON backup/restore
- CSV export for spreadsheet portability
- Encrypted browser-generated backup using Web Crypto AES-GCM
- Local restore snapshots with the five most recent restore points
- No account, backend, telemetry or remote recommendation dependency
- User-supplied metadata and links keep the static build independent of API keys
- PWA/service-worker support for offline use

### UX & quality
- Modern responsive layout for desktop, tablet and mobile
- Light/dark/system theme support
- Accessible labels, focus states and dialogs
- Sticky search/filter toolbar
- Keyboard shortcuts already supported by the core app: `Ctrl/Cmd + K`, `N`, and `Escape`
- Power tools opened from the header and the Power navigation tab
- GitHub Actions syntax/file validation plus automatic GitHub Pages deployment

## Research basis

The feature set was reviewed against current movie-tracking patterns from Letterboxd, Trakt, JustWatch and current 2026 movie-tracker comparisons. Common high-value patterns include watchlists, dated diaries/history, ratings, reviews, tags, rewatches, custom lists, sorting/filtering, imports/exports, statistics, yearly summaries, challenges, streaming-service context, reordering and discovery helpers. The project combines the strongest personal-library patterns while keeping the implementation static, private, local-first and dependency-free.

## Platform boundary

This GitHub Pages build does **not** pretend to provide live movie metadata or live streaming availability. Posters, cast/crew data, service labels and external sources are entered manually. That boundary keeps the project private, portable and usable without API keys or a backend.

## Run

Open `index.html` in a browser or deploy the `Movie-Watchlist` folder as a static site. No build step or package installation is required.

## Stack

HTML, CSS and vanilla JavaScript. No framework and no external runtime dependency.
