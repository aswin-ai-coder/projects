# Game Backlog Tracker

A modern, private, local-first game collection and backlog manager. It runs as a static web app, so your library stays in your browser and no account or backend is required.

## Included

- Backlog, Playing, Completed, Abandoned and Wishlist statuses
- Game library with platform, release year, genre, series, developer and publisher metadata
- Ownership and medium tracking
- Progress percentage, hours played, ratings, priorities, favorites and tags
- Notes and personal reviews
- Cover image URLs
- Real play-session journal with dates, minutes, notes and automatic hour totals
- Continue-playing dashboard and priority backlog
- Transparent smart backlog ranking
- Randomized next-game picker
- Custom lists with multi-select game membership
- Search, status filters and sorting by title, rating, progress, hours, year, priority and backlog age
- Library audit for duplicate titles, incomplete metadata and stale backlog items
- Statistics for completion rate, average rating, favorites, genres, platforms, ratings and release years
- JSON backup and restore
- CSV export
- Password-based encrypted JSON backup using Web Crypto AES-GCM + PBKDF2
- Local restore snapshots
- Light/dark theme
- Responsive mobile/desktop UI
- PWA install support and offline caching
- GitHub Actions JavaScript validation and GitHub Pages deployment

## Design boundary

This project intentionally uses user-entered metadata instead of pretending to provide live game catalogs, store prices, achievements or online social feeds without an API/backend. Those services can change independently and require external integrations. The local-first app keeps the core backlog workflow reliable and private.

## Run

Open `index.html` in a modern browser, or use the deployed GitHub Pages site. Data is stored in browser local storage. Use **Power tools → JSON backup** regularly if the data matters.

## Verification

The included workflow runs JavaScript syntax checks and product-file checks, then publishes the project to GitHub Pages whenever files in this folder change on `main`.