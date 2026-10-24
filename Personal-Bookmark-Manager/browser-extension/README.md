# Pinboard Quick Save (optional Chrome/Chromium extension)

A lightweight Manifest V3 extension that keeps a separate local queue and exports a standard Netscape bookmarks HTML file. The Pinboard web app can import that HTML file.

## Install for personal use
1. Open your browser's extension management page.
2. Enable developer mode.
3. Choose **Load unpacked** and select this folder.
4. Use the extension popup to save the current tab, or right-click a page/link and choose a Pinboard save action.
5. Export the queue as HTML, then open Pinboard and use Import.

The extension queue is stored in browser extension storage, separate from the web app's local storage; export/import is the bridge. It requests only active-tab, local storage, and context-menu permissions. No remote server or analytics is used.
