# Fishing Logbook

A simple frontend Fishing Logbook web app where users can register/login, save fishing experiences, and browse logs by filters or places.

## Overview

This project is a static HTML/CSS/JavaScript app using browser localStorage.
No backend is required for basic usage.

Main goals:

- User authentication flow (register/login/logout)
- Add full fishing experience records
- Search and filter fishing logs
- Browse logs by places
- EN/HU language switch in the top navigation

## Features

- Register and login pages
- Dashboard with quick navigation cards
- Add new fishing experience:
  - date
  - place by name or link
  - caught fish count
  - fish type + weight rows
  - image upload (stored as base64 in localStorage)
  - notes
- Logbook page with filters:
  - date from/to
  - place text
  - min/max fish count
  - min/max largest fish weight
- Catch details page with full entry data
- Places page with grouped place records
- Persistent EN/HU language preference

## Project Structure

- index.html: Landing page
- login.html: Login page
- register.html: Register page
- dashboard.html: Main dashboard after login
- add-catch.html: Add fishing experience form
- my-cathches.html: Logbook list and filters
- catch-details.html: Full details of one catch
- places.html: Grouped places and logs
- assets/css/style.css: Styles
- assets/js/app.js: App logic (auth, storage, filters, i18n)

## How To Use

1. Open index.html in a browser.
2. Register a new user account.
3. Login and open the dashboard.
4. Add a new fishing experience from Add Experience.
5. Open Logbook to filter and search results.
6. Open Places to inspect logs grouped by location.
7. Use EN/HU switch in the header to change language.

## Data Storage

This app stores data in browser localStorage keys:

- flb_users
- flb_current_user
- flb_catches
- flb_seeded
- flb_language

Note: Clearing browser storage removes saved local data.

## Notes

- This is a client-side prototype.
- Passwords are stored locally in plain form (not secure for production).
- For production use, add backend auth and database.

## Future Improvements

- Backend integration (Supabase/Firebase/Node API)
- Secure password handling and token auth
- Cloud image storage
- Better analytics per place and fish type
- Export logs to CSV/PDF
