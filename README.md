# Fishing Logbook

A multi-page fishing logbook web app built with plain HTML, CSS, and JavaScript.

## Why This Exists

This project was built to give fishing sessions a clean, easy place to live. A lot of fishing notes end up scattered across photos, messages, or paper, so the goal here is to keep everything in one readable flow: sign in, log a catch, review it later, and check where it happened.

The app is intentionally simple on the surface, but the user experience is the main focus. The interface is designed to make the most common tasks fast:

- get into the app quickly
- add a catch without fighting the form
- revisit catches by place or filter
- keep the mobile layout usable while on the water

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

## User Experience Notes

- The topbar keeps navigation compact so the main content stays visible.
- The hamburger menu stays short and content-width instead of covering the whole screen.
- The EN/HU switch is kept close to the menu controls for fast language changes.
- Form actions use stronger contrast so they are easier to spot outdoors and on mobile.
- The logbook and place views are structured for scanning, not for dense reading.
- Responsive behavior is kept practical first, not decorative.

## Current Navigation Behavior

- The app uses a right-side hamburger menu.
- The EN/HU switch is shown next to the hamburger button.
- The menu opens as a right-aligned dropdown panel.
- The dropdown width follows content length (not full-screen).
- Menu items have hover and focus-visible feedback.
- On desktop pointer devices, the menu closes when the cursor leaves the dropdown.

## Screenshots

Laptop view:

![Fishing Logbook laptop view](assets/images/Screenshot1.png)

Responsive phone view:

![Fishing Logbook responsive phone view](assets/images/Screenshot2.png)

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

## Deploy

This project can be deployed as a static site. The two most practical options are GitHub Pages and Firebase Hosting.

### Before You Deploy

1. Make sure the app runs locally without console errors.
2. Check that image paths are correct, especially `assets/images/background.png` and the screenshots in the README.
3. Confirm that `assets/js/app.js` contains the Firebase config you want to ship.
4. Verify that the login and register pages still work after your latest changes.
5. Commit all changes so the deployment source is clean.

### Option 1: GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, select `Deploy from a branch`.
6. Choose the `main` branch.
7. Set the folder to `/(root)`.
8. Save the settings.
9. Wait for GitHub Pages to finish building the site.
10. Open the published URL that GitHub provides.
11. Test the home page, login page, register page, and the responsive hamburger menu on the live site.

### Option 2: Firebase Hosting

1. Install the Firebase CLI if you do not have it yet.
2. Run `firebase login` in your terminal.
3. From the project root, run `firebase init hosting`.
4. Choose the Firebase project that matches your config in `assets/js/app.js`.
5. Set the public directory to `.` so the root HTML files are served correctly.
6. Answer `No` when asked if this is a single-page app, because this project uses multiple HTML pages.
7. If asked to overwrite files, do not overwrite your existing app files.
8. Run `firebase deploy`.
9. Copy the hosting URL from the terminal output.
10. Open the deployed site and test registration, login, guest mode, and catch entry saving.

### After Deployment

1. Verify that the screenshots load correctly in the README.
2. Test the mobile layout, especially the hamburger menu and the topbar language switch.
3. Check that the login flow still shows the correct custom button styles.
4. If Firebase is enabled, confirm that auth and storage behave as expected.

## Security Note

This is a client-side project/prototype.
Do not use plain local password storage in production.

## Suggested Next Steps

### Should Have

- Add backend validation and secure auth flow
- Add server-side image rules and quotas
- Add automated tests for filtering and catch rendering

### Could Have

- Add export features (CSV/PDF)
- Add better analytics per place and fish type
- Add optional weather history suggestions

### Nice to Have

- Add richer charts for catch trends
- Add offline-friendly draft saving
- Add a printable catch summary page
