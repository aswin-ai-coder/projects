# Movie Watchlist

A modern, private, local-first personal cinema tracker for deciding what to watch, recording viewing history, and understanding your movie taste without an account or backend.

## Feature-complete scope

### Library
- Watchlist, watched and DNF states
- Add, edit, view and delete movies
- Half-star ratings from 0.5 to 5
- Favorites, rewatch state and rewatch count
- Dated watch history
- Director, cast, release date/year, runtime, genres, country and language
- Free-form tags, mood, priority and notes
- Review text with spoiler flag
- Streaming/service, viewing location, format and ownership fields
- Optional poster and source/trailer URLs

### Organization
- Full-text search across movie metadata, tags and notes
- Status, favorite, rewatch, unrated and owned filters
- Sort by added date, title, rating, release year, runtime, priority and watched date
- Private custom lists with multi-select membership management
- Bulk select, mark watched, move to watchlist, favorite and delete
- Random movie picker
- Smart local picking by mood, runtime, priority, rating state and genre

### Diary & analytics
- Chronological movie diary grouped by month
- Rewatch history
- Annual viewing goal
- Monthly viewing bars
- Genre breakdown
- Average rating
- Total watch time
- Current-year progress
- Year-in-review export
- Private reflection journal
- Viewing challenges

### Data & privacy
- LocalStorage persistence
- Automatic migration from the earlier v1 data format
- JSON backup and restore
- CSV export
- No account, backend, telemetry or remote recommendation engine
- Optional poster/source URLs are user-supplied; metadata is intentionally manual
- PWA/service-worker support remains enabled

### UX
- Modern responsive layout
- Light/dark/system theme
- Accessible labels and focusable controls
- Mobile-friendly navigation and dialogs
- Keyboard shortcut: `Ctrl/Cmd + K` for search
- Keyboard shortcut: `N` for quick add
- Escape closes dialogs

## Research basis

The product scope was reviewed against current movie-tracking patterns from Letterboxd, Trakt and streaming-discovery products. Common patterns include watchlists, dated diaries/history, ratings, reviews, tags, rewatches, custom lists, powerful filters, imports/exports, statistics, yearly summaries, challenges and discovery helpers. The app deliberately implements the useful personal-library patterns while keeping the project static, local-first and dependency-free.

## Platform boundary

This GitHub Pages build does **not** claim live movie metadata or live streaming availability. Posters, cast/crew data, service labels and external sources are entered manually. This keeps the project usable offline and avoids requiring API keys or a backend.

## Run

Open `index.html` in a browser or deploy the folder as a static site. No build step is required.

## Stack

HTML, CSS and vanilla JavaScript. No framework and no external runtime dependency.
