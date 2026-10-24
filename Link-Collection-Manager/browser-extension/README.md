# Gather Quick Save browser extension

A minimal Manifest V3 extension for Chromium-based browsers. It saves the current tab or a clicked link from the context menu, keeps a local queue, and exports the queue as standard Netscape Bookmarks HTML.

## Install locally
1. Open the browser's extension manager and enable developer mode.
2. Choose **Load unpacked** and select this `browser-extension` folder.
3. Click the extension icon to save the current tab, or right-click a page/link.
4. In the popup choose **Export queue HTML**.
5. In Gather, choose **Import** and select the exported HTML file.

The queue stays in extension-local storage and is not sent to a server. For browsers that do not support Chromium Manifest V3 extensions, use the bookmarklet in Gather Tools instead.