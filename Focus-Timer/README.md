# Still — Focus Timer

Still is a calm, responsive focus timer for study, creative work, reading, and personal projects. It combines flexible focus/break sessions with a lightweight task list and private progress history.

## Features

- Focus, short-break and long-break modes with editable durations and a configurable long-break cycle.
- Accurate end-time-based timer recovery so background timer throttling does not accumulate drift; optional pause-on-hidden behavior.
- Pause, resume, reset, skip, live progress ring, configurable keyboard shortcuts and a completion dialog.
- Tasks with estimated focus sessions, progress, completion, editing, search, deletion and one-click focus selection.
- Session intentions, daily focus goal, today's summary, seven-day chart, all-time session totals and a simple active-day streak.
- Optional browser-generated ambient sound: quiet, rain-like noise, soft noise and a synthetic café hum, with volume control.
- Optional gentle end-of-session chime and permission-based system notifications; configurable automatic next-session start after a five-second grace period; and light/dark themes.
- Export and validated import of JSON backups containing settings, tasks, history and timer state; imports are confirmed before replacing local data.
- Responsive layout, keyboard-visible focus, screen-reader labels, reduced-motion support, installable PWA and offline shell.
- Local-first storage: no account, analytics, server, or third-party audio downloads.

## Run locally

Open `index.html` in a browser or serve this folder over localhost. PWA/offline and service-worker features require HTTPS or localhost. Ambient sound starts only after a user action because browsers restrict autoplay.

## Keyboard shortcuts

- `Space`: start or pause the timer (when focus is not in a form control).
- `R`: reset the current session.
- `N`: skip to the next session.
- Buttons and navigation remain keyboard-accessible without shortcuts.

## Backups and recovery

Use **Export my data** to download a JSON backup and **Import backup** to restore one on this device. Import checks the backup format, record shapes and supported setting ranges before replacing current data, and asks for confirmation first. Keep backup files private because they may contain task names and session history.

## Notifications and browser support

System notifications are opt-in from Timer settings and require permission. Where supported, Still asks the service worker to show persistent notifications; browsers may not support the same APIs, and notification permission can be blocked by the browser or operating system. This static app does not run a background server or guarantee notifications when the app is closed.

## Timer behavior and privacy

Timer state is saved locally in this browser. A running timer stores its target end timestamp and recalculates remaining time after returning to a background tab. Browser and operating-system scheduling can still delay visual updates, and a static web app cannot guarantee an alert when completely closed. Optional pause-on-hidden stops the timer when the page becomes hidden. Data does not sync between devices. Exported backups may contain personal task titles and session history; keep them private.

Ambient audio is generated using Web Audio and can use CPU/battery while playing. Choose Quiet or stop the sound when you no longer need it. The default Pomodoro-style durations are only a starting point—adjust them to suit your needs and take breaks when useful.

## Validation

GitHub Actions checks JavaScript syntax and required files, then runs automated DOM regression tests for timer controls, task creation/completion/search, saved settings, backup import, and escaping user-provided task text. Automated tests are not a substitute for hands-on testing across real browsers and mobile devices.

## References

- [The Pomodoro Technique](https://www.pomodorotechnique.com/) — planning, focus, breaks and reflection.
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) — handling hidden tabs and background timer behavior.
- [MDN: Offline and background operation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation) — PWA offline behavior and background execution limits.
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/) — keyboard access, visible focus and accessible interactions.
