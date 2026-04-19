# Minimal Refactor Plan (Low Risk)

## Goal

Reduce chaos in `assets/js/app.js` without changing user-facing behavior.

## Rules

- Keep current HTML pages and routes unchanged.
- Move code in small steps, no feature rewrite.
- After each step: run quick smoke test (login, register, add catch, logbook, places).

## Step 1: Extract Pure Utilities

Create `assets/js/modules/utils.js` and move only pure helpers:

- `readStorage`, `writeStorage`
- `isValidEmail`, `isValidPassword`
- unit conversion and date formatting helpers

Acceptance:

- No behavioral change.

- `app.js` imports utilities and still passes manual smoke test.

## Step 2: Extract i18n Module

Create `assets/js/modules/i18n.js`:

- Move `I18N`, `SUPPORTED_LANGUAGES`
- Move `t`, `setLanguage`, `getLanguage`, translation apply helpers

Acceptance:

- Language switch works on all pages.
- No broken keys in HU/EN.

## Step 3: Extract Auth Module

Create `assets/js/modules/auth.js`:

- Move `getCurrentUser`, `syncAuthState`, `protectPage`
- Move login/register/reset handlers (`initLogin`, `initRegister`)

Acceptance:

- Register/login/logout/reset flow works in both Firebase and local fallback mode.

## Step 4: Extract Layout/Nav Module

Create `assets/js/modules/layout.js`:

- Move `renderNav`, `ensureMenuToggle`, `ensureTopbarLanguageSwitch`
- Keep one nav rendering path for all pages

Acceptance:

- Header behavior stays identical across all pages.

## Step 5: Extract Catch Features

Create `assets/js/modules/catches.js`:

- Move catch CRUD + page initializers (`initAddCatch`, `initLogbook`, `initCatchDetails`, `initPlaces`, `initDashboard`)

Acceptance:

- Add catch, list/filter, details, places all work.

## Step 6: Thin Bootstrap Entry

Keep `assets/js/app.js` as orchestrator only:

- SDK/Firebase bootstrap
- page detection and initializer dispatch

Target:

- `app.js` reduced to ~200-350 lines.

## Optional Step 7: Safety Net

Add lightweight browser smoke script checklist in README:

- register -> logout -> login -> add catch -> open details -> filter -> places

This gives a repeatable release check without introducing test framework complexity.
