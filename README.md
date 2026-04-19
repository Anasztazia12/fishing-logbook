# Fishing Logbook

A multi-page fishing logbook web app built with HTML, CSS, and Vanilla JavaScript.

## Overview

Fishing Logbook helps users record and review fishing sessions in one place.
The app supports registration/login, guest usage, catch tracking, filtering, and place-based browsing.

Main goals:

- Fast, practical logging flow for real outdoor use
- Responsive UI for desktop/tablet/mobile
- Simple state management via localStorage, with optional Firebase usage
- English and Hungarian UI support

## Core Features

- Authentication: register, login, guest mode
- Password reset flow (email or code depending on mode)
- Dashboard with consistent navigation
- Add catch with multiple fish rows
- Logbook with filters (date/place/count/weight)
- Catch details page
- Places page grouped by location
- EN/HU language switching
- Image upload support

## Project Structure

- index.html: landing page
- login.html: login + password reset
- register.html: registration
- dashboard.html: main navigation hub
- add-catch.html: create catch entries
- my-cathches.html: logbook list and filters
- catch-details.html: full catch details
- places.html: catches grouped by place
- assets/css/style.css: app styling
- assets/js/app.js: application logic

## Local Storage Keys

- flb_users
- flb_current_user
- flb_catches
- flb_language
- flb_reset_codes
- flb_bg

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap (CDN styling support)
- Firebase SDK (optional)

## Run Locally

1. Clone or download the project.
2. Open index.html in a browser.
3. Register, login, or continue as guest.
4. Navigate from the dashboard and test the main flows.

## Deployment

The app is a static site and can be deployed with GitHub Pages or Firebase Hosting.

### GitHub Pages

1. Push the project to GitHub.
2. Open repository settings.
3. Go to Pages.
4. Choose Deploy from a branch.
5. Select branch main and folder /(root).
6. Save and wait for publish.

### Firebase Hosting

1. Install Firebase CLI.
2. Run firebase login.
3. Run firebase init hosting in project root.
4. Set public directory to .
5. Choose No for single-page app.
6. Run firebase deploy.

## Validation and Testing

Quick manual checklist:

- Register a new account
- Login with valid credentials
- Test invalid login and reset flow
- Add a catch with at least one fish row
- Verify logbook filtering
- Open catch details
- Verify places grouping
- Test language switch (EN/HU)
- Check mobile navigation and hamburger menu

Screenshots:

- ![Fishing Logbook laptop view](assets/images/Screenshot1.png)
- ![Fishing Logbook responsive phone view](assets/images/Screenshot2.png)

## Security Note

This is a client-side prototype.
Do not use plain local password storage in production.

Production recommendations:

- Backend-based authentication
- Password hashing and salting
- HTTPS-only deployment
- Secure token handling
- Rate limiting for auth endpoints

## Future Improvements

Must have:

- Backend validation and secure auth flow
- Automated tests for critical flows

Should have:

- Export features (CSV/PDF)
- Better analytics by place and fish type

Could have:

- Weather integration
- Offline draft support
- Printable catch summary
