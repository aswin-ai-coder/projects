# E2E smoke checklist

The CI suite validates build and unit tests. Before release, manually verify the critical authenticated flows in this order:

1. Open `/auth`, create an account, and sign in.
2. Create a subject, note, flashcard, and quiz; refresh and confirm persistence.
3. Complete a study session and quiz; confirm XP, achievements, history, and notifications update.
4. Review a flashcard, refresh, and confirm its schedule persists.
5. Open Analytics and confirm current totals, streak, subject/topic data, and quiz trend render.
6. Open Notifications, change preferences, refresh, and confirm read state persists.
7. Sign out; protected API calls should return 401 and sensitive pages should not expose account data.

For browser automation, install Playwright in the repository and turn these steps into authenticated fixtures once a deployment URL is available.
