# Still — Focus Timer

Still is a calm, responsive focus timer for study, creative work, reading, and personal projects. It combines flexible focus/break sessions with a lightweight task list and private progress history.

## Features

- Focus, short-break and long-break modes with editable durations and a configurable long-break cycle.
- Accurate end-time-based timer recovery so background timer throttling does not accumulate drift; optional pause-on-hidden behavior.
- Pause, resume, reset, skip, live progress ring, keyboard controls and a completion dialog.
- Tasks with estimated focus sessions, progress, completion, deletion and one-click focus selection.
- Session intentions, daily focus goal, today's summary, seven-day chart, all-time session totals and a simple active-day streak.
- Optional browser-generated ambient sound: quiet, rain-like noise, soft noise and a synthetic café hum, with volume control.
- Optional gentle end-of-session chime, automatic session-transition settings, and light/dark themes.
- Exportable JSON backup containing settings, tasks, history and timer state.
- Responsive layout, keyboard-visible focus, screen-reader labels, reduced-motion support, installable PWA and offline shell.
- Local-first storage: no account, analytics, server, or third-party audio downloads.

## Run locally

Open `index.html` in a browser or serve this folder over localhost. PWA/offline and service-worker features require HTTPS or localhost. Ambient sound starts only after a user action because browsers restrict autoplay.

## Keyboard shortcuts

- `Space`: start or pause the timer (when focus is not in a form control).
- `R`: reset the current session.
- `N`: skip to the next session.
- Buttons and navigation remain keyboard-accessible without shortcuts.

## Timer behavior and privacy

Timer state is saved locally in this browser. A running timer stores its target end timestamp and recalculates remaining time after returning to a background tab. Browser and operating-system scheduling can still delay visual updates, and a static web app cannot guarantee an alert when completely closed. Optional pause-on-hidden stops the timer when the page becomes hidden. Data does not sync between devices. Exported backups may contain personal task titles and session history; keep them private.

Ambient audio is generated using Web Audio and can use CPU/battery while playing. Choose Quiet or stop the sound when you no longer need it. The default Pomodoro-style durations are only a starting point—adjust them to suit your needs and take breaks when useful.

## Validation

GitHub Actions checks JavaScript syntax and required files, then runs automated DOM regression tests for the timer UI, task creation/completion, saved settings, and escaping user-provided task text. Automated tests are not a substitute for hands-on testing across real browsers and mobile devices.

## References

- [The Pomodoro Technique](https://www.pomodorotechnique.com/) — planning, focus, breaks and reflection.
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) — handling hidden tabs and background timer behavior.
- [MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) — browser notification capabilities and limitations.
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/) — keyboard access, visible focus and accessible interactions.
