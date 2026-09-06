# Personal Notes

A modern, private, local-first notes workspace built as a zero-backend Progressive Web App. Notes stay in the browser and the app does not require an account, analytics service, or hosted database.

## Feature set

### Writing and knowledge management
- Markdown editor with formatting toolbar and live preview
- Bold, italic, headings, lists, checklists, quotes, code, links, tables and dividers
- Autosave and word/character/link counts
- Full-text search across titles, content and tags
- Folders, tags, favorites and pinned notes
- Daily notes / journal workflow
- Archive, trash, restore and permanent deletion
- Local version history
- `[[Wiki Title]]` links, backlinks and outgoing links
- Knowledge graph visualization
- Clickable note outline from Markdown headings
- Structured note properties
- Templates for meetings, projects, study, journals, reading, decisions, how-to, ideas, reviews and research
- Duplicate note, random note and find/replace tools
- Note analytics including reading time, headings and link counts

### Files and portability
- Local file attachments using IndexedDB
- Multiple-file attachment import
- Drag-and-drop attachments onto the editor
- Image and PDF previews when supported by the browser
- Attachment download and deletion
- JSON backup import/export
- Export current Markdown
- Export all notes as a Markdown bundle
- Import Markdown files

### App experience
- Command palette and keyboard shortcuts
- Focus mode
- Light, dark and system themes
- Adjustable editor font size and compact mode
- Responsive mobile layout
- Installable PWA
- Offline application shell
- Storage usage and persistent-storage request tools
- No third-party runtime service is required

## Run

Open `index.html` from a local development server or deploy the folder to GitHub Pages or another HTTPS static host. A secure origin is required for normal PWA installation behavior.

## Data and privacy

Note text and preferences are stored locally in the current browser profile. Attachments are stored separately in IndexedDB so larger files do not need to be encoded into the note JSON. Browser storage is still subject to browser quota and eviction rules, so regular JSON backups are recommended.

The app intentionally does not claim that browser storage is a secure vault for secrets. Do not store passwords, private keys, or other credentials in notes.

## Architecture

- `index.html` — application shell, editor and dialogs
- `styles.css` — responsive design system and themes
- `app.js` — note state, editor, search, links, history, import/export and settings
- `advanced.js` — graph, templates, properties, outline, analytics, storage and advanced tools
- `attachments.js` — IndexedDB attachment storage, previews and drag/drop
- `manifest.webmanifest` — PWA metadata and shortcuts
- `sw.js` — offline application-shell cache
- `icon.svg` — app icon

No backend is required for the intended personal/local use case.

## Keyboard shortcuts

- `N` — new note
- `/` — focus search
- `Ctrl/Cmd + K` — command palette
- `Ctrl/Cmd + S` — save immediately
- `Ctrl/Cmd + Shift + P` — preview
- `Ctrl/Cmd + Alt + G` — knowledge graph
- `Ctrl/Cmd + Alt + T` — templates
- `Ctrl/Cmd + Alt + R` — random note
- `Ctrl/Cmd + Alt + P` — note properties
- `Ctrl/Cmd + Alt + H` — find and replace
- `Esc` — close dialogs

## Product decisions

The app focuses on private personal knowledge capture rather than team collaboration. Cloud sync, shared workspaces, accounts, and server-side search are intentionally out of scope for this standalone build because they require a backend, identity model, conflict resolution and a different privacy architecture. JSON/Markdown portability is provided instead.

## Validation

GitHub Actions checks JavaScript and service-worker syntax, required files, manifest JSON, HTML/script wiring, offline-cache wiring and key advanced feature markers before deploying the `Personal-Notes-App` directory to GitHub Pages.
