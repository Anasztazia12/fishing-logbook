# Fishing Logbook

Fishing Logbook is a multi-page client-side web app built with HTML, CSS, and Vanilla JavaScript.

It helps anglers quickly record fishing sessions (place, fish details, photos, notes), then browse and filter saved entries through a responsive interface.

## Contents

- [Overview](#overview)
- [Features in Detail](#features-in-detail)
- [Pages and Purpose](#pages-and-purpose)
- [Project Structure](#project-structure)
- [Data Storage (localStorage)](#data-storage-localstorage)
- [Firebase Integration (Optional)](#firebase-integration-optional)
- [Run Locally](#run-locally)
- [Manual Test Checklist](#manual-test-checklist)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Future Improvements](#future-improvements)

## Overview

Primary goals:

- Fast data entry flow that works well in real outdoor usage
- Responsive UI for desktop and mobile
- Bilingual interface (English and Hungarian)
- localStorage-first behavior with optional Firebase support

Current focus:

- Simplified catch logging and editing
- Better filter usability in Logbook
- Mode-driven Places page (`fished` and `wishlist`)
- Clean hamburger navigation on smaller screens

## Features in Detail

### 1. Authentication and Session

- Registration with username, email, and password
- Login
- Guest mode
- Password reset flow (Firebase or local fallback)

### 2. Dashboard

- Welcome banner (`Welcome, <user>` or `Guest mode active`)
- Main action cards:
  - Add New Fishing Experience
  - Logbook
- Hamburger menu navigation on protected pages

### 3. Add Catch

- Date, place name, place link, Google Maps link
- Fish count
- Weather, water temperature, baits
- Multiple fish detail rows (type + weight)
- Photo upload with file-type validation

### 4. Logbook

- Filters for date range, place, fish type, fish count, and weight range
- Results list rendering
- Detail modal support
- Edit, delete, and image-management actions from details

### 5. Catch Details Page

- Carousel-style navigation through saved catches
- Full details view including fish list, largest fish, photos, and notes

### 6. Places Page (Mode-based)

- Two URL modes:
  - `places.html?mode=fished`
  - `places.html?mode=wishlist`
- Minimal default view:
  - Small search action
  - Small add-place action
  - Carousel list of places
- Additional panels open only on user interaction

### 7. Additional UX Features

- Language switch (EN/HU)
- Weight display unit handling (kg/lb)
- Background selection modal
- Mobile-friendly top bar and hamburger menu

## Pages and Purpose

- `index.html`: landing page
- `register.html`: registration
- `login.html`: login and password reset
- `dashboard.html`: main user hub
- `add-catch.html`: create catch records
- `my-cathches.html`: logbook and filtering
- `catch-details.html`: dedicated catch details view
- `places.html`: place management and place-centric browsing (mode-based)

## Project Structure

- `assets/js/app.js`: core app logic, initialization, i18n, navigation, storage handling
- `assets/css/style.css`: full styling and responsive layout rules
- `assets/images/`: backgrounds, icons, screenshots

## Data Storage (localStorage)

Used keys:

- `flb_users`: registered users (local fallback)
- `flb_current_user`: active user session
- `flb_catches`: saved catch records
- `flb_recommended_places`: places records by category/mode
- `flb_reset_codes`: local reset code entries
- `flb_language`: selected language
- `flb_bg`: selected background image

Note: This project is currently a prototype-style client-side app. Local password storage is for demo/development behavior only.

## Firebase Integration (Optional)

If Firebase SDK loads and config is valid, the app can use:

- Auth: login and registration
- Firestore: catches storage
- Storage: image uploads

If cloud operations fail, the app falls back to localStorage where possible.

## Run Locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open `index.html` directly in a browser, or use a local static server (recommended).
4. Register, login, or continue as guest.

## Manual Test Checklist

Recommended checks before release:

1. Register with a new email.
2. Login with valid credentials.
3. Verify invalid login cases (wrong password, invalid email format).
4. Verify password reset flow (if enabled).
5. Save a new catch with at least one fish row.
6. Verify image upload validation (allowed and blocked files).
7. Test Logbook filters and clear behavior.
8. Open catch details and verify edit/delete/image changes.
9. Verify both Places modes:
   - `fished`
   - `wishlist`
10. Verify language switching (EN/HU).
11. Verify mobile behavior including hamburger menu and key breakpoints (640px, 430px).

## Screenshots

- ![Fishing Logbook laptop view](assets/images/Screenshot1.png)
- ![Fishing Logbook responsive phone view](assets/images/Screenshot2.png)

## Deployment

The app is static and can be hosted on GitHub Pages or Firebase Hosting.

### GitHub Pages

1. Push the repository to GitHub.
2. Open repository settings.
3. Go to Pages.
4. Choose Deploy from a branch.
5. Select `main` and `/ (root)`.
6. Save and wait for publication.

### Firebase Hosting

1. `firebase login`
2. `firebase init hosting`
3. Set public directory to `.`
4. Choose `No` for single-page app mode
5. `firebase deploy`

## Security Notes

This version is a client-side prototype.

For production usage, strongly recommended:

- Backend-driven authentication
- Password hashing with modern algorithms and salts
- Server-side validation
- HTTPS-only deployment
- Proper Firestore/Storage rules

## Future Improvements

Short term:

- Automated tests for critical flows
- Better validation UX and inline feedback

Mid term:

- Export functions (CSV/PDF)
- Rich statistics by fish type, place, and date

Long term:

- Weather API integration
- Offline draft support
- Printable catch summary format
