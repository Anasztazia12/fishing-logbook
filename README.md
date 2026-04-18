# Fishing Logbook

A multi-page fishing logbook web app built with plain HTML, CSS, and JavaScript.

## What It Does

- Registration and login
- Continue as Guest mode
- Dashboard navigation
- Add catch entries with multiple fish rows
- Logbook filter and list view
- Catch details page
- Places grouping page
- EN/HU language switch
- Responsive topbar with hamburger menu

## Current Navigation Behavior

- The app uses a right-side hamburger menu.
- The EN/HU switch is shown next to the hamburger button.
- The menu opens as a right-aligned dropdown panel.
- The dropdown width follows content length (not full-screen).
- Menu items have hover and focus-visible feedback.
- On desktop pointer devices, the menu closes when the cursor leaves the dropdown.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Optional Firebase (Auth, Firestore, Storage) with local fallback

## Data Model and Storage

Local keys used:

- `flb_users`
- `flb_current_user`
- `flb_catches`
- `flb_language`

Notes:

- Guest data is isolated by guest user id.
- If Firebase is available and working, auth/data/image operations can use Firebase.
- If Firebase is unavailable, the app falls back to localStorage behavior.

## Pages

- `index.html` - Landing page
- `login.html` - Login page
- `register.html` - Registration page
- `dashboard.html` - User dashboard
- `add-catch.html` - Add catch form
- `my-cathches.html` - Logbook filters and result list
- `catch-details.html` - Single catch details
- `places.html` - Places aggregation and browsing

## Add Catch Fields

Typical catch entry includes:

- Date
- Place name or link
- Optional maps link
- Fish count
- One or more fish rows (type, weight, kg/lb)
- Weather and water temperature
- Optional notes
- Optional image upload (gallery/camera)

## Run Locally

1. Open `index.html` in a browser.
2. Register, login, or continue as guest.
3. Use dashboard cards or the hamburger menu to navigate.

## Security Note

This is a client-side project/prototype.
Do not use plain local password storage in production.

## Suggested Next Steps

- Add backend validation and secure auth flow
- Add server-side image rules and quotas
- Add export features (CSV/PDF)
- Add automated tests for filtering and catch rendering
