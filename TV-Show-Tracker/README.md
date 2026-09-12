# TV Show Tracker

A modern, private, local-first TV tracking application for shows, seasons, episodes and a personal viewing diary.

## Features

### Show and episode tracking
- Add, edit, view and delete shows
- Statuses: Watchlist, Watching, Paused, Completed and Dropped
- Episode-level progress with season and episode numbers
- Generate an empty episode grid or add episodes manually
- Mark the next episode watched in one action
- Multiple watch dates for episodes
- Half-star ratings for shows and episodes
- Episode reviews and private notes
- Favorites, priority, tags, genres, creator, cast, network, country and language
- Poster, trailer and source URLs
- Optional service/platform labels
- Rewatch count and progress history fields

### Organization and discovery
- Full-text search across show metadata and notes
- Filters for status, favorites and unrated shows
- Sort by title, progress, rating, priority, year, runtime or date added
- Bulk status, favorite and delete actions
- Private custom lists for marathons, genres, moods and projects
- Smart local picker for shortest, highest-priority, favorite-first and least-watched choices
- Explainable decision engine that shows why a show was selected
- Library audit for duplicate titles, incomplete records and aging watchlist items

### Diary and analytics
- Chronological episode diary grouped by month
- Upcoming/undated episode queue based on manually entered air dates
- Viewing-day streaks
- Monthly viewing bars
- Total episode count and watch time
- Average episode rating
- Genre profile, decade profile and language profile
- Year-in-review summary
- Five local restore snapshots

### Data and privacy
- Browser LocalStorage; no account or backend required
- JSON backup and restore
- CSV export
- Browser-side encrypted backup using Web Crypto AES-GCM + PBKDF2
- Restore from local snapshots
- No telemetry or remote recommendation service
- Manual metadata keeps the static GitHub Pages build free of API keys

### UX and delivery
- Responsive desktop, tablet and mobile layout
- Light/dark/system theme cycling
- Keyboard shortcuts: Ctrl/Cmd+K search, Ctrl/Cmd+N add show, Escape close
- PWA manifest and offline service worker
- GitHub Actions validation and GitHub Pages deployment
- Vanilla HTML, CSS and JavaScript; no build step

## Research basis
The feature set was designed after reviewing current TV-tracking workflows from Trakt, Serializd, TV Time and newer tracker products. Common modern patterns include episode-level progress, detailed season/show pages, custom lists, watch history, calendars, statistics, year reviews, recommendations/decision helpers, imports and richer episode context. This project adapts those ideas to a private local-first static application. Trakt's 2026 updates emphasize progress, history, calendars, lists, screen-time stats, streaks, year reviews and explainable discovery; Serializd and TV Time emphasize show/season/episode tracking, reviews, diaries, lists, recommendations and personal stats.

## Static-app boundary
This project intentionally does **not** pretend to provide live TMDB/IMDb metadata, live streaming availability, cloud notifications or social accounts. Those require external services, APIs and/or a backend. Users can store their own metadata and URLs locally instead.

## Run
Open `index.html` locally or deploy the folder through GitHub Pages. There is no package installation or build command.

## Storage
The app stores data in the browser under `tv-show-tracker:v1`. Back up important data with the Data Center before clearing browser storage.
