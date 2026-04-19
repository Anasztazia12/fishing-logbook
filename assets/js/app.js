const STORAGE = {
    users: "flb_users",
    currentUser: "flb_current_user",
    catches: "flb_catches",
    resetCodes: "flb_reset_codes",
    language: "flb_language"
};

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCBLFecNN1GGyAI3XotVZWwz8HO8PK-Jzo",
    authDomain: "fishing-logbook-a8851.firebaseapp.com",
    projectId: "fishing-logbook-a8851",
    storageBucket: "fishing-logbook-a8851.firebasestorage.app",
    messagingSenderId: "151846552983",
    appId: "1:151846552983:web:2d6dc9640e3292b010f0d2",
    measurementId: "G-ZK5QXB7B8P"
};

const FIREBASE_SDK_URLS = [
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics-compat.js"
];

const firebaseState = {
    enabled: false,
    app: null,
    auth: null,
    db: null,
    storage: null
};

const PUBLIC_PAGES = new Set(["index", "login", "register"]);
const SUPPORTED_LANGUAGES = new Set(["en", "hu"]);
const PASSWORD_POLICY = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=.?]{8,20}$/;

const I18N = {
    en: {
        "nav.dashboard": "Dashboard",
        "nav.addExperience": "Add Experience",
        "nav.logbook": "Logbook",
        "nav.places": "Places",
        "nav.logout": "Logout",
        "nav.home": "Home",
        "nav.login": "Login",
        "nav.register": "Register",
        "nav.guest": "Guest",
        "common.close": "Close",
        "nav.lang": "Language",
        "nav.weight": "Weight",
        "index.kicker": "Personal angling tracker",
        "index.title": "Track every catch, place and fishing memory",
        "index.text": "Register or login to add new fishing experiences, browse your logbook, and review catches by place with full details.",
        "index.openDashboard": "Open Dashboard",
        "index.addResult": "Add New Result",
        "index.continueGuest": "Continue as Guest",
        "login.title": "Login",
        "login.subtitle": "Access your fishing dashboard.",
        "login.email": "Email",
        "login.password": "Password",
        "login.passwordConfirm": "Confirm password",
        "login.button": "Login",
        "login.emailInvalid": "Email format is invalid.",
        "login.emailNotFound": "No account found with this email.",
        "login.passwordWrong": "Password is incorrect.",
        "login.badCredentials": "Email or password is incorrect.",
        "login.forgotTitle": "Forgot password?",
        "login.forgotSubtitle": "Request a reset email or generate a temporary code.",
        "login.requestReset": "Request reset",
        "login.resetCode": "Reset code",
        "login.newPassword": "New password",
        "login.newPasswordPh": "Type your new password",
        "login.applyReset": "Reset password",
        "login.openReset": "Password reminder",
        "login.resetEmailSent": "Password reset email sent. Check your inbox.",
        "login.resetCodeGenerated": "Temporary code generated: {code} (local mode demo)",
        "login.resetCodeMissing": "No reset code requested for this email.",
        "login.resetCodeExpired": "Reset code expired. Request a new one.",
        "login.resetCodeInvalid": "Reset code is invalid.",
        "login.resetSuccess": "Password updated. You can log in with the new password.",
        "login.noAccount": "No account yet?",
        "login.registerHere": "Register here",
        "register.title": "Register",
        "register.subtitle": "Create your personal fishing logbook account.",
        "register.username": "Username",
        "register.usernameRequired": "Username must be at least 3 characters.",
        "register.email": "Email",
        "register.password": "Password",
        "register.passwordHint": "Use 8-20 characters, with at least 1 letter and 1 number.",
        "register.passwordRules": "Allowed characters: letters, numbers, and ! @ # $ % ^ & * ( ) _ - + = . ?",
        "register.showPassword": "Show password",
        "register.hidePassword": "Hide password",
        "register.passwordInvalid": "Password must be 8-20 chars, include at least 1 letter and 1 number, and use only allowed symbols.",
        "register.firebaseFallback": "Cloud registration is unavailable right now. Your account was created locally.",
        "register.success": "Registration successful. Redirecting...",
        "register.failed": "Registration failed.",
        "register.weak": "Password is too weak.",
        "register.button": "Create account",
        "register.already": "Already registered?",
        "register.login": "Login",
        "dashboard.welcome": "Welcome, {name}",
        "dashboard.choose": "Choose what you want to manage in your fishing diary.",
        "dashboard.card.addTitle": "Add New Fishing Experience",
        "dashboard.card.addText": "Log location, fish details, photos and notes.",
        "dashboard.card.logbookTitle": "Logbook",
        "dashboard.card.logbookText": "Search and filter catches by date, place and weight.",
        "dashboard.card.placesTitle": "Places",
        "dashboard.card.placesText": "Review all places and open full diaries by location.",
        "dashboard.card.caughtTitle": "Caught Fish",
        "dashboard.card.caughtText": "Browse fish types, counts and top weights.",
        "dashboard.recent": "Recent catches",
        "dashboard.openFull": "Open full logbook",
        "dashboard.noCatches": "No catches yet. Start by adding a new fishing experience.",
        "add.title": "Add new fishing experience",
        "add.subtitle": "Save your full result: place, fish count, fish data, photos and notes.",
        "add.date": "Date",
        "add.placeName": "Place name",
        "add.placeNamePh": "Example: Lake Balaton, North Shore",
        "add.placeLink": "Place link",
        "add.placeLinkPh": "https://example.com/fishing-spot",
        "add.mapsLink": "Google Maps link",
        "add.mapsLinkPh": "https://maps.google.com/...",
        "add.placeHint": "You can type a place name, add a link, add a Google Maps link, or use all of them together.",
        "add.fishCount": "Caught fish count",
        "add.waterTemp": "Water temperature",
        "add.weather": "Weather",
        "add.weatherPh": "Sunny, cloudy, windy...",
        "add.fishDetails": "Fish details (type + weight)",
        "add.addFishRow": "Add fish row",
        "add.uploadPhotos": "Upload photos",
        "add.uploadCamera": "Take photo with phone camera",
        "add.notes": "Notes",
        "add.notesPh": "What happened on this fishing trip?",
        "add.save": "Save fishing result",
        "add.provideAnyPlace": "Please add at least one place field (name, place link, or Google Maps link).",
        "add.addFishDetail": "Add at least one fish detail row.",
        "add.saved": "Fishing result saved successfully.",
        "add.fishType": "Fish type",
        "add.weight": "Weight",
        "add.remove": "Remove",
        "logbook.title": "Fishing logbook",
        "logbook.subtitle": "Filter by date, place, caught fish count and fish weight.",
        "logbook.dateFrom": "Date from",
        "logbook.dateTo": "Date to",
        "logbook.place": "Place",
        "logbook.placePh": "Example: Lake Balaton",
        "logbook.fishMin": "Min fish count",
        "logbook.fishMax": "Max fish count",
        "logbook.weightMin": "Min fish weight",
        "logbook.weightMax": "Max fish weight",
        "logbook.apply": "Apply filters",
        "logbook.clear": "Clear",
        "logbook.results": "Results",
        "logbook.resultCount": "{count} result(s)",
        "logbook.noMatch": "No catches match the selected filters.",
        "details.title": "Catch details",
        "details.back": "Back to logbook",
        "details.missingId": "Missing catch id.",
        "details.notFound": "Catch not found.",
        "details.date": "Date",
        "details.place": "Place",
        "details.placeName": "Place name",
        "details.placeLink": "Place link",
        "details.mapsLink": "Google Maps",
        "details.openMap": "Open map",
        "details.caughtCount": "Caught fish count",
        "details.waterTemp": "Water temperature",
        "details.weather": "Weather",
        "details.largest": "Largest fish",
        "details.fishList": "Fish list",
        "details.photos": "Photos",
        "details.notes": "Notes",
        "details.noPhotos": "No uploaded photos.",
        "details.noNotes": "No notes added.",
        "details.type": "Type",
        "details.weight": "Weight",
        "places.title": "Fishing places",
        "places.subtitle": "Open any place to see all logs and details you wrote there.",
        "places.select": "Select a place",
        "places.noPlaces": "No places yet. Add a fishing experience first.",
        "places.logsFor": "Logs for {place}",
        "places.noLogs": "No logs for this place.",
        "places.logCount": "{count} log(s) | Largest fish {weight}",
        "common.unknownPlace": "Unknown place",
        "common.date": "Date",
        "common.caughtFish": "Caught fish",
        "common.largestFish": "Largest fish",
        "common.openDetails": "Open details",
        "unit.kg": "kg",
        "unit.lb": "lb"
    },
    hu: {
        "nav.dashboard": "Kezdőlap",
        "nav.addExperience": "Új élmény",
        "nav.logbook": "Horgásznapló",
        "nav.places": "Helyszínek",
        "nav.logout": "Kijelentkezés",
        "nav.home": "Főoldal",
        "nav.login": "Belépés",
        "nav.register": "Regisztráció",
        "nav.guest": "Vendég",
        "common.close": "Bezárás",
        "nav.lang": "Nyelv",
        "nav.weight": "Súly",
        "index.kicker": "Személyes horgász nyilvántartó",
        "index.title": "Rögzíts minden fogást, helyszínt és horgász emléket",
        "index.text": "Regisztrálj vagy lépj be, hogy új horgászati élményeket adj hozzá, szűrd a naplódat, és nézd át a helyszínek adatait teljes részletekkel.",
        "index.openDashboard": "Kezdőlap megnyitása",
        "index.addResult": "Új eredmény rögzítése",
        "index.continueGuest": "Folytatás vendégként",
        "login.title": "Belépés",
        "login.subtitle": "Lépj be a horgász irányítópultodra.",
        "login.email": "Email",
        "login.password": "Jelszó",
        "login.passwordConfirm": "Jelszó megerősítése",
        "login.button": "Belépés",
        "login.emailInvalid": "Az email cím formátuma hibás.",
        "login.emailNotFound": "Ehhez az email címhez nem található fiók.",
        "login.passwordWrong": "A jelszó helytelen.",
        "login.badCredentials": "Hibás email cím vagy jelszó.",
        "login.forgotTitle": "Elfelejtett jelszó?",
        "login.forgotSubtitle": "Kérj visszaállító emailt vagy ideiglenes kódot.",
        "login.requestReset": "Visszaállítás kérése",
        "login.resetCode": "Visszaállító kód",
        "login.newPassword": "Új jelszó",
        "login.newPasswordPh": "Add meg az új jelszót",
        "login.applyReset": "Jelszó visszaállítása",
        "login.openReset": "Jelszó emlékeztető",
        "login.resetEmailSent": "A jelszó-visszaállító email elküldve. Nézd meg a postafiókodat.",
        "login.resetCodeGenerated": "Ideiglenes kód generálva: {code} (helyi mód demo)",
        "login.resetCodeMissing": "Ehhez az emailhez nincs kért visszaállító kód.",
        "login.resetCodeExpired": "A visszaállító kód lejárt. Kérj újat.",
        "login.resetCodeInvalid": "A visszaállító kód hibás.",
        "login.resetSuccess": "A jelszó frissítve. Most már be tudsz lépni az új jelszóval.",
        "login.noAccount": "Nincs fiókod?",
        "login.registerHere": "Regisztrálj itt",
        "register.title": "Regisztráció",
        "register.subtitle": "Hozd létre a saját horgásznapló fiókodat.",
        "register.username": "Felhasználónév",
        "register.usernameRequired": "A felhasználónév legalább 3 karakter legyen.",
        "register.email": "Email",
        "register.password": "Jelszó",
        "register.passwordHint": "8-20 karakter, legalább 1 betűvel és 1 számmal.",
        "register.passwordRules": "Engedélyezett karakterek: betűk, számok, valamint ! @ # $ % ^ & * ( ) _ - + = . ?",
        "register.showPassword": "Jelszó megjelenítése",
        "register.hidePassword": "Jelszó elrejtése",
        "register.passwordInvalid": "A jelszó legyen 8-20 karakter, legyen benne legalább 1 betű és 1 szám, és csak engedélyezett karaktereket használj.",
        "register.firebaseFallback": "A felhős regisztráció most nem elérhető. A fiók helyben létrejött.",
        "register.success": "Sikeres regisztráció. Átirányítás...",
        "register.failed": "A regisztráció sikertelen.",
        "register.weak": "A jelszó túl gyenge.",
        "register.button": "Fiók létrehozása",
        "register.already": "Már regisztráltál?",
        "register.login": "Belépés",
        "dashboard.welcome": "Üdvözöllek, {name}",
        "dashboard.choose": "Válaszd ki, mit szeretnél kezelni a horgásznaplódban.",
        "dashboard.card.addTitle": "Új horgászati élmény",
        "dashboard.card.addText": "Rögzítsd a helyszínt, hal adatokat, fotókat és jegyzetet.",
        "dashboard.card.logbookTitle": "Horgásznapló",
        "dashboard.card.logbookText": "Keress és szűrj dátum, helyszín és súly szerint.",
        "dashboard.card.placesTitle": "Helyszínek",
        "dashboard.card.placesText": "Nézd át az összes helyszínt, és nyisd meg a teljes naplókat.",
        "dashboard.card.caughtTitle": "Kifogott halak",
        "dashboard.card.caughtText": "Böngészd a halfajokat, darabszámokat és max súlyt.",
        "dashboard.recent": "Legutóbbi fogások",
        "dashboard.openFull": "Teljes napló megnyitása",
        "dashboard.noCatches": "Még nincs fogás. Kezdd egy új horgászati eredmény rögzítésével.",
        "add.title": "Új horgászati élmény rögzítése",
        "add.subtitle": "Mentsd el a teljes eredményt: helyszín, halszám, hal adatok, fotók és jegyzet.",
        "add.date": "Dátum",
        "add.placeName": "Helyszín neve",
        "add.placeNamePh": "Példa: Balaton, északi part",
        "add.placeLink": "Helyszín link",
        "add.placeLinkPh": "https://pelda.hu/horgasz-helyszin",
        "add.mapsLink": "Google Maps link",
        "add.mapsLinkPh": "https://maps.google.com/...",
        "add.placeHint": "Megadhatsz helyszín nevet, linket, Google Maps linket, vagy ezeket együtt is.",
        "add.fishCount": "Kifogott halak száma",
        "add.waterTemp": "Víz hőmérséklet",
        "add.weather": "Időjárás",
        "add.weatherPh": "Napos, felhős, szeles...",
        "add.fishDetails": "Hal adatok (típus + súly)",
        "add.addFishRow": "Hal sor hozzáadása",
        "add.uploadPhotos": "Fotók feltöltése",
        "add.uploadCamera": "Fotó készítése telefon kamerával",
        "add.notes": "Jegyzet",
        "add.notesPh": "Mi történt ezen a horgászaton?",
        "add.save": "Horgászati eredmény mentése",
        "add.provideAnyPlace": "Adj meg legalább egy helyszín adatot (név, helyszín link vagy Google Maps link).",
        "add.addFishDetail": "Adj hozzá legalább egy hal sort.",
        "add.saved": "A horgászati eredmény sikeresen elmentve.",
        "add.fishType": "Hal típusa",
        "add.weight": "Súly",
        "add.remove": "Törlés",
        "logbook.title": "Horgásznapló",
        "logbook.subtitle": "Szűrés dátum, helyszín, kifogott halak száma és hal súly alapján.",
        "logbook.dateFrom": "Dátumtól",
        "logbook.dateTo": "Dátumig",
        "logbook.place": "Helyszín",
        "logbook.placePh": "Példa: Balaton",
        "logbook.fishMin": "Minimum halszám",
        "logbook.fishMax": "Maximum halszám",
        "logbook.weightMin": "Minimum hal súly",
        "logbook.weightMax": "Maximum hal súly",
        "logbook.apply": "Szűrők alkalmazása",
        "logbook.clear": "Szűrők törlése",
        "logbook.results": "Találatok",
        "logbook.resultCount": "{count} találat",
        "logbook.noMatch": "Nincs olyan fogás, ami megfelel a szűrőknek.",
        "details.title": "Fogás részletek",
        "details.back": "Vissza a naplóhoz",
        "details.missingId": "Hiányzó fogás azonosító.",
        "details.notFound": "A fogás nem található.",
        "details.date": "Dátum",
        "details.place": "Helyszín",
        "details.placeName": "Helyszín neve",
        "details.placeLink": "Helyszín link",
        "details.mapsLink": "Google Maps",
        "details.openMap": "Térkép megnyitása",
        "details.caughtCount": "Kifogott halak száma",
        "details.waterTemp": "Víz hőmérséklet",
        "details.weather": "Időjárás",
        "details.largest": "Legnagyobb hal",
        "details.fishList": "Halfaj lista",
        "details.photos": "Fotók",
        "details.notes": "Jegyzet",
        "details.noPhotos": "Nincsenek feltöltött fotók.",
        "details.noNotes": "Nincs megjegyzés.",
        "details.type": "Típus",
        "details.weight": "Súly",
        "places.title": "Horgász helyszínek",
        "places.subtitle": "Kattints egy helyszínre, és nézd meg az ottani teljes naplóbejegyzéseket.",
        "places.select": "Válassz helyszínt",
        "places.noPlaces": "Még nincs helyszín. Rögzíts előbb egy horgászati élményt.",
        "places.logsFor": "Naplók itt: {place}",
        "places.noLogs": "Ehhez a helyszínhez nincs napló.",
        "places.logCount": "{count} napló | Legnagyobb hal {weight}",
        "common.unknownPlace": "Ismeretlen helyszín",
        "common.date": "Dátum",
        "common.caughtFish": "Kifogott halak",
        "common.largestFish": "Legnagyobb hal",
        "common.openDetails": "Részletek",
        "unit.kg": "kg",
        "unit.lb": "lb"
    }
};

let currentLanguage = getLanguage();
let currentWeightUnit = "kg";

document.addEventListener("DOMContentLoaded", () => {
    void bootstrapApp();
});

async function bootstrapApp() {
    ensureBootstrapStyles();
    await loadFirebaseSdk();
    initFirebase();
    await syncAuthState();

    const page = document.body.dataset.page;
    const user = getCurrentUser();

    renderNav(user);
    protectPage(page, user);
    applyPageTranslations(page, user);

    switch (page) {
        case "index":
            initIndex(user);
            break;
        case "register":
            await initRegister();
            break;
        case "login":
            await initLogin();
            break;
        case "dashboard":
            await initDashboard(user);
            break;
        case "add-catch":
            await initAddCatch(user);
            break;
        case "logbook":
            await initLogbook(user);
            break;
        case "catch-details":
            await initCatchDetails(user);
            break;
        case "places":
            await initPlaces(user);
            break;
        default:
            break;
    }
}

async function loadFirebaseSdk() {
    if (window.firebase) {
        return;
    }

    try {
        for (const url of FIREBASE_SDK_URLS) {
            await injectScript(url);
        }
    } catch {
        // SDK load failure keeps app functional via localStorage fallback.
    }
}

function injectScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[data-sdk="${src}"]`);
        if (existing) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.sdk = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

function initFirebase() {
    if (!window.firebase) {
        firebaseState.enabled = false;
        return;
    }

    try {
        const app = window.firebase.apps.length
            ? window.firebase.app()
            : window.firebase.initializeApp(FIREBASE_CONFIG);

        firebaseState.enabled = true;
        firebaseState.app = app;
        firebaseState.auth = window.firebase.auth();
        firebaseState.db = window.firebase.firestore();
        firebaseState.storage = window.firebase.storage();

        try {
            if (window.location.protocol.startsWith("http")) {
                window.firebase.analytics();
            }
        } catch {
            // Analytics is optional.
        }
    } catch {
        firebaseState.enabled = false;
    }
}

async function syncAuthState() {
    if (!firebaseState.enabled || !firebaseState.auth) {
        return;
    }

    const storedUser = getCurrentUser();

    await new Promise((resolve) => {
        const unsubscribe = firebaseState.auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                if (!storedUser || !storedUser.isGuest) {
                    localStorage.removeItem(STORAGE.currentUser);
                }
            } else {
                localStorage.setItem(STORAGE.currentUser, JSON.stringify({
                    id: authUser.uid,
                    username: authUser.displayName || authUser.email || "User",
                    email: authUser.email || ""
                }));
            }

            unsubscribe();
            resolve();
        });
    });
}

function protectPage(page, user) {
    if (PUBLIC_PAGES.has(page)) {
        return;
    }

    if (!user) {
        window.location.href = "login.html";
    }
}

function renderNav(user) {
    const nav = document.getElementById("mainNav");
    if (!nav) {
        return;
    }

    if (user) {
        const guestLabel = user.isGuest ? ` (${t("nav.guest")})` : "";
        nav.innerHTML = [
            `<a href="dashboard.html">${t("nav.dashboard")}${guestLabel}</a>`,
            `<a href="add-catch.html">${t("nav.addExperience")}</a>`,
            `<a href="my-cathches.html">${t("nav.logbook")}</a>`,
            `<a href="places.html">${t("nav.places")}</a>`,
            `<button type="button" class="btn-link" id="logoutBtn">${t("nav.logout")}</button>`
        ].join("");

        const logout = document.getElementById("logoutBtn");
        if (logout) {
            logout.addEventListener("click", async () => {
                if (firebaseState.enabled && firebaseState.auth) {
                    await firebaseState.auth.signOut();
                }

                localStorage.removeItem(STORAGE.currentUser);
                window.location.href = "index.html";
            });
        }
    } else {
        nav.innerHTML = [
            `<a href="index.html">${t("nav.home")}</a>`,
            `<a href="login.html">${t("nav.login")}</a>`,
            `<a href="register.html">${t("nav.register")}</a>`
        ].join("");
    }

    ensureMenuToggle(nav);
    ensureTopbarLanguageSwitch();
}

function ensureBootstrapStyles() {
    const existing = document.getElementById("bootstrap-cdn");
    if (existing) {
        return;
    }

    const link = document.createElement("link");
    link.id = "bootstrap-cdn";
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    link.integrity = "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
}

function ensureMenuToggle(nav) {
    const topbar = document.querySelector(".topbar");
    if (!topbar) {
        return;
    }

    let toggle = document.getElementById("menuToggle");
    if (!toggle) {
        toggle = document.createElement("button");
        toggle.type = "button";
        toggle.id = "menuToggle";
        toggle.className = "menu-toggle";
        toggle.setAttribute("aria-label", "Toggle navigation");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<span></span><span></span><span></span>';
        topbar.insertBefore(toggle, nav);
    }

    toggle.onclick = () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    };

    if (!nav.dataset.hoverCloseBound) {
        nav.addEventListener("mouseleave", () => {
            if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                return;
            }

            if (nav.classList.contains("open")) {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });

        nav.dataset.hoverCloseBound = "1";
    }
}

function ensureTopbarLanguageSwitch() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) {
        return;
    }

    let langWrap = document.getElementById("topbarLangSwitch");
    if (!langWrap) {
        langWrap = document.createElement("div");
        langWrap.id = "topbarLangSwitch";
        topbar.appendChild(langWrap);
    }

    langWrap.innerHTML = renderLanguageSwitch("topbar-lang");

    const toggle = document.getElementById("menuToggle");
    if (toggle) {
        topbar.insertBefore(langWrap, toggle);
    }

    const langButtons = langWrap.querySelectorAll(".lang-btn");
    langButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const lang = button.getAttribute("data-lang") || "en";
            setLanguage(lang);
        });
    });
}

function initIndex(user) {
    const actions = document.getElementById("indexActions");
    if (!actions) {
        return;
    }

    if (user) {
        actions.innerHTML = [
            `<a class="btn btn-primary" href="dashboard.html">${t("index.openDashboard")}</a>`,
            `<a class="btn btn-secondary" href="add-catch.html">${t("index.addResult")}</a>`
        ].join("");
    } else {
        actions.innerHTML = [
            `<a class="btn btn-primary btn-lg" href="login.html">${t("nav.login")}</a>`,
            `<a class="btn btn-secondary btn-lg" href="register.html">${t("nav.register")}</a>`,
            `<button class="btn btn-outline-success btn-lg fw-bold" type="button" id="continueGuestBtn">${t("index.continueGuest")}</button>`
        ].join("");

        const guestButton = document.getElementById("continueGuestBtn");
        if (guestButton) {
            guestButton.addEventListener("click", () => {
                startGuestSession();
                window.location.href = "dashboard.html";
            });
        }
    }
}

function startGuestSession() {
    localStorage.setItem(STORAGE.currentUser, JSON.stringify({
        id: `guest-${crypto.randomUUID()}`,
        username: t("nav.guest"),
        email: "",
        isGuest: true
    }));
}

async function initRegister() {
    const form = document.getElementById("registerForm");
    const msg = document.getElementById("registerMessage");
    const passwordInput = document.getElementById("registerPassword");
    const togglePasswordBtn = document.getElementById("toggleRegisterPassword");

    if (!form || !msg) {
        return;
    }

    setupPasswordToggle(passwordInput, togglePasswordBtn, "register");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const username = String(formData.get("username") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();

        if (username.length < 3) {
            setMessage(msg, t("register.usernameRequired"), false);
            return;
        }

        if (!isValidEmail(email)) {
            setMessage(msg, t("login.emailInvalid"), false);
            return;
        }

        if (!isValidPassword(password)) {
            setMessage(msg, t("register.passwordInvalid"), false);
            return;
        }

        const users = readStorage(STORAGE.users, []);
        const alreadyExists = users.some((u) => u.email === email);

        if (alreadyExists) {
            setMessage(msg, t("register.alreadyExists", { fallback: "This email is already registered." }), false);
            return;
        }

        let firebaseUser = null;
        let usedLocalFallback = false;

        if (firebaseState.enabled && firebaseState.auth) {
            try {
                const credential = await firebaseState.auth.createUserWithEmailAndPassword(email, password);
                if (credential.user) {
                    await credential.user.updateProfile({ displayName: username });
                    firebaseUser = credential.user;
                }
            } catch (error) {
                const code = String(error?.code || "");
                if (code === "auth/email-already-in-use") {
                    setMessage(msg, t("register.alreadyExists", { fallback: "This email is already registered." }), false);
                    return;
                }

                if (code === "auth/invalid-email" || code === "auth/weak-password") {
                    setMessage(msg, parseFirebaseError(error, t("register.failed")), false);
                    return;
                }

                usedLocalFallback = true;
            }
        }

        const newUser = {
            id: firebaseUser?.uid || crypto.randomUUID(),
            username,
            email,
            password
        };

        users.push(newUser);
        writeStorage(STORAGE.users, users);
        localStorage.setItem(STORAGE.currentUser, JSON.stringify({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }));

        setMessage(msg, usedLocalFallback ? t("register.firebaseFallback") : t("register.success"), true);
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 600);
    });
}

async function initLogin() {
    const form = document.getElementById("loginForm");
    const msg = document.getElementById("loginMessage");
    const forgotTrigger = document.getElementById("openResetModal");
    const resetModal = document.getElementById("resetModal");
    const closeResetModalBtn = document.getElementById("closeResetModal");
    const resetEmailInput = document.getElementById("resetEmail");
    const resetCodeInput = document.getElementById("resetCode");
    const resetNewPasswordInput = document.getElementById("resetNewPassword");
    const requestResetBtn = document.getElementById("requestResetCode");
    const applyResetBtn = document.getElementById("applyResetCode");
    const resetMsg = document.getElementById("resetMessage");

    if (!form || !msg || !forgotTrigger || !resetModal || !closeResetModalBtn || !resetEmailInput || !resetCodeInput || !resetNewPasswordInput || !requestResetBtn || !applyResetBtn || !resetMsg) {
        return;
    }

    const openResetModal = () => {
        resetModal.hidden = false;
    };

    const closeResetModal = () => {
        resetModal.hidden = true;
    };

    const showForgotTrigger = () => {
        forgotTrigger.hidden = false;
    };

    const handleLoginFailure = (messageText) => {
        setMessage(msg, messageText, false);
        showForgotTrigger();
    };

    forgotTrigger.hidden = true;
    forgotTrigger.addEventListener("click", openResetModal);
    closeResetModalBtn.addEventListener("click", closeResetModal);
    resetModal.addEventListener("click", (event) => {
        if (event.target === resetModal) {
            closeResetModal();
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();
        const confirmPassword = String(formData.get("password_confirm") || "").trim();

        if (password !== confirmPassword) {
            handleLoginFailure(t("login.passwordWrong"));
            return;
        }

        if (!isValidEmail(email)) {
            handleLoginFailure(t("login.emailInvalid"));
            return;
        }

        if (firebaseState.enabled && firebaseState.auth) {
            try {
                const credential = await firebaseState.auth.signInWithEmailAndPassword(email, password);
                const authUser = credential.user;
                localStorage.setItem(STORAGE.currentUser, JSON.stringify({
                    id: authUser.uid,
                    username: authUser.displayName || authUser.email || "User",
                    email: authUser.email || email
                }));

                setMessage(msg, t("login.success", { fallback: "Login successful. Redirecting..." }), true);
                forgotTrigger.hidden = true;
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 500);
                return;
            } catch (error) {
                const message = parseFirebaseError(error, t("login.invalid", { fallback: "Invalid email or password." }));
                handleLoginFailure(message);
                return;
            }
        }

        const users = readStorage(STORAGE.users, []);
        const userByEmail = users.find((u) => u.email === email);

        if (!userByEmail) {
            handleLoginFailure(t("login.emailNotFound"));
            return;
        }

        if (userByEmail.password !== password) {
            handleLoginFailure(t("login.passwordWrong"));
            return;
        }

        localStorage.setItem(STORAGE.currentUser, JSON.stringify({ id: userByEmail.id, username: userByEmail.username, email: userByEmail.email }));
        setMessage(msg, t("login.success", { fallback: "Login successful. Redirecting..." }), true);
        forgotTrigger.hidden = true;

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    });

    requestResetBtn.addEventListener("click", async () => {
        const email = String(resetEmailInput.value || "").trim().toLowerCase();
        if (!isValidEmail(email)) {
            setMessage(resetMsg, t("login.emailInvalid"), false);
            return;
        }

        if (firebaseState.enabled && firebaseState.auth) {
            try {
                await firebaseState.auth.sendPasswordResetEmail(email);
                setMessage(resetMsg, t("login.resetEmailSent"), true);
                return;
            } catch (error) {
                setMessage(resetMsg, parseFirebaseError(error, t("login.badCredentials")), false);
                return;
            }
        }

        const users = readStorage(STORAGE.users, []);
        const userByEmail = users.find((u) => u.email === email);
        if (!userByEmail) {
            setMessage(resetMsg, t("login.emailNotFound"), false);
            return;
        }

        const code = String(Math.floor(100000 + Math.random() * 900000));
        const resetCodes = readStorage(STORAGE.resetCodes, {});
        resetCodes[email] = {
            code,
            expiresAt: Date.now() + 10 * 60 * 1000
        };
        writeStorage(STORAGE.resetCodes, resetCodes);
        setMessage(resetMsg, t("login.resetCodeGenerated", { code }), true);
    });

    applyResetBtn.addEventListener("click", () => {
        const email = String(resetEmailInput.value || "").trim().toLowerCase();
        const code = String(resetCodeInput.value || "").trim();
        const nextPassword = String(resetNewPasswordInput.value || "").trim();

        if (!isValidEmail(email)) {
            setMessage(resetMsg, t("login.emailInvalid"), false);
            return;
        }

        if (!isValidPassword(nextPassword)) {
            setMessage(resetMsg, t("register.weak", { fallback: "Password is too weak." }), false);
            return;
        }

        if (firebaseState.enabled && firebaseState.auth) {
            setMessage(resetMsg, t("login.resetEmailSent"), false);
            return;
        }

        const resetCodes = readStorage(STORAGE.resetCodes, {});
        const entry = resetCodes[email];
        if (!entry) {
            setMessage(resetMsg, t("login.resetCodeMissing"), false);
            return;
        }

        if (Number(entry.expiresAt) < Date.now()) {
            delete resetCodes[email];
            writeStorage(STORAGE.resetCodes, resetCodes);
            setMessage(resetMsg, t("login.resetCodeExpired"), false);
            return;
        }

        if (String(entry.code) !== code) {
            setMessage(resetMsg, t("login.resetCodeInvalid"), false);
            return;
        }

        const users = readStorage(STORAGE.users, []);
        const index = users.findIndex((u) => u.email === email);
        if (index === -1) {
            setMessage(resetMsg, t("login.emailNotFound"), false);
            return;
        }

        users[index].password = nextPassword;
        writeStorage(STORAGE.users, users);
        delete resetCodes[email];
        writeStorage(STORAGE.resetCodes, resetCodes);
        setMessage(resetMsg, t("login.resetSuccess"), true);

        closeResetModal();

        const loginEmail = document.getElementById("loginEmail");
        const loginPassword = document.getElementById("loginPassword");
        if (loginEmail instanceof HTMLInputElement) {
            loginEmail.value = email;
        }
        if (loginPassword instanceof HTMLInputElement) {
            loginPassword.value = nextPassword;
        }
    });
}

async function initDashboard(user) {
    if (!user) {
        return;
    }

    const welcome = document.getElementById("welcomeTitle");
    const recent = document.getElementById("recentCatches");

    if (welcome) {
        welcome.textContent = t("dashboard.welcome", { name: user.username });
    }

    if (!recent) {
        return;
    }

    const catches = (await getUserCatches(user.id)).slice(0, 4);

    if (catches.length === 0) {
        recent.innerHTML = `<article class="list-item"><p>${t("dashboard.noCatches")}</p></article>`;
        return;
    }

    recent.innerHTML = catches.map((item) => renderCatchCard(item, true)).join("");
}

async function initAddCatch(user) {
    if (!user) {
        return;
    }

    const form = document.getElementById("catchForm");
    const fishRows = document.getElementById("fishRows");
    const addFishRowBtn = document.getElementById("addFishRow");
    const msg = document.getElementById("catchMessage");
    const dateInput = document.getElementById("catchDate");
    const imageInput = document.getElementById("catchImages");
    const cameraInput = document.getElementById("catchCamera");
    const imagePreview = document.getElementById("imagePreview");

    if (!form || !fishRows || !addFishRowBtn || !msg || !dateInput || !imageInput || !cameraInput || !imagePreview) {
        return;
    }

    dateInput.value = new Date().toISOString().slice(0, 10);
    addFishRow(fishRows);
    addFishRow(fishRows);

    addFishRowBtn.addEventListener("click", () => addFishRow(fishRows));

    fishRows.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target.classList.contains("remove-row")) {
            const row = target.closest(".fish-row");
            if (row) {
                row.remove();
            }
        }
    });

    const updatePreview = () => {
        renderImagePreviews(collectSelectedFiles(imageInput, cameraInput), imagePreview);
    };

    imageInput.addEventListener("change", updatePreview);
    cameraInput.addEventListener("change", updatePreview);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const placeName = String(data.get("placeName") || "").trim();
        const placeLink = String(data.get("placeLink") || "").trim();
        const mapsLink = String(data.get("mapsLink") || "").trim();

        if (!placeName && !placeLink && !mapsLink) {
            setMessage(msg, t("add.provideAnyPlace"), false);
            return;
        }

        const fishItems = collectFishRows(fishRows);
        if (fishItems.length === 0) {
            setMessage(msg, t("add.addFishDetail"), false);
            return;
        }

        const catchId = crypto.randomUUID();
        const selectedFiles = collectSelectedFiles(imageInput, cameraInput);
        const imageData = await saveImages(selectedFiles, user.id, catchId);
        const fishCount = Number(data.get("fishCount") || 0);
        const waterTemp = parseOptionalNumber(data.get("waterTemp"));
        const weather = String(data.get("weather") || "").trim();

        const newCatch = {
            id: catchId,
            userId: user.id,
            date: String(data.get("catchDate") || "").trim(),
            placeName,
            placeLink,
            mapsLink,
            fishCount,
            waterTemp,
            weather,
            fishItems,
            imageData,
            notes: String(data.get("notes") || "").trim(),
            createdAt: new Date().toISOString()
        };

        await saveCatch(newCatch);

        setMessage(msg, t("add.saved"), true);
        form.reset();
        dateInput.value = new Date().toISOString().slice(0, 10);
        fishRows.innerHTML = "";
        addFishRow(fishRows);
        addFishRow(fishRows);
        imagePreview.innerHTML = "";
    });
}

async function initLogbook(user) {
    if (!user) {
        return;
    }
    const form = document.getElementById("filterForm");
    const clearBtn = document.getElementById("clearFilters");
    const container = document.getElementById("logbookList");
    const count = document.getElementById("resultCount");

    if (!form || !clearBtn || !container || !count) {
        return;
    }

    const quick = new URLSearchParams(window.location.search).get("quick");
    if (quick === "caught") {
        const fishMinInput = document.getElementById("filterFishMin");
        if (fishMinInput) {
            fishMinInput.value = "1";
        }
    }

    const catches = await getUserCatches(user.id);

    const render = () => {
        const filtered = filterCatches(catches, new FormData(form));
        count.textContent = t("logbook.resultCount", { count: filtered.length });
        count.classList.toggle("badge-empty", filtered.length === 0);

        if (filtered.length === 0) {
            container.innerHTML = `<article class="list-item"><p>${t("logbook.noMatch")}</p></article>`;
            return;
        }

        container.innerHTML = filtered.map((item) => renderCatchCard(item, false)).join("");
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        render();
    });

    clearBtn.addEventListener("click", () => {
        form.reset();
        render();
    });

    render();
}

async function initCatchDetails(user) {
    if (!user) {
        return;
    }

    const container = document.getElementById("catchDetailsContent");
    if (!container) {
        return;
    }

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        container.innerHTML = `<p class="message error">${t("details.missingId")}</p>`;
        return;
    }

    const catches = await getUserCatches(user.id);
    const selected = catches.find((item) => item.id === id);

    if (!selected) {
        container.innerHTML = `<p class="message error">${t("details.notFound")}</p>`;
        return;
    }

    const placeName = selected.placeName
        ? escapeHtml(selected.placeName)
        : "-";
    const placeLink = selected.placeLink
        ? `<a href="${escapeHtml(selected.placeLink)}" target="_blank" rel="noopener">${escapeHtml(selected.placeLink)}</a>`
        : "-";
    const mapsLink = selected.mapsLink
        ? `<a href="${escapeHtml(selected.mapsLink)}" target="_blank" rel="noopener">${t("details.openMap")}</a>`
        : "-";

    const fishRows = selected.fishItems
        .map((fish) => `<tr><td>${escapeHtml(fish.type)}</td><td>${formatWeight(fish.weight)}</td></tr>`)
        .join("");

    const images = selected.imageData.length
        ? selected.imageData.map((src) => `<img src="${src}" alt="Catch photo" class="thumb">`).join("")
        : `<p>${t("details.noPhotos")}</p>`;

    container.innerHTML = [
        `<div class="detail-grid">`,
        `<p><strong>${t("details.date")}:</strong> ${escapeHtml(selected.date)}</p>`,
        `<p><strong>${t("details.placeName")}:</strong> ${placeName}</p>`,
        `<p><strong>${t("details.placeLink")}:</strong> ${placeLink}</p>`,
        `<p><strong>${t("details.mapsLink")}:</strong> ${mapsLink}</p>`,
        `<p><strong>${t("details.caughtCount")}:</strong> ${selected.fishCount}</p>`,
        `<p><strong>${t("details.waterTemp")}:</strong> ${selected.waterTemp === null || selected.waterTemp === undefined ? "-" : `${toFixed(selected.waterTemp)} ${String.fromCharCode(176)}C`}</p>`,
        `<p><strong>${t("details.weather")}:</strong> ${escapeHtml(selected.weather || "-")}</p>`,
        `<p><strong>${t("details.largest")}:</strong> ${formatWeight(getLargestWeight(selected))}</p>`,
        `</div>`,
        `<h2>${t("details.fishList")}</h2>`,
        `<table class="fish-table"><thead><tr><th>${t("details.type")}</th><th>${t("details.weight")}</th></tr></thead><tbody>${fishRows}</tbody></table>`,
        `<h2>${t("details.photos")}</h2>`,
        `<div class="image-preview">${images}</div>`,
        `<h2>${t("details.notes")}</h2>`,
        `<p>${escapeHtml(selected.notes || t("details.noNotes"))}</p>`
    ].join("");
}

async function initPlaces(user) {
    if (!user) {
        return;
    }

    const placesList = document.getElementById("placesList");
    const catchesContainer = document.getElementById("placeCatches");
    const title = document.getElementById("selectedPlaceTitle");

    if (!placesList || !catchesContainer || !title) {
        return;
    }

    const catches = await getUserCatches(user.id);
    if (catches.length === 0) {
        placesList.innerHTML = `<article class="list-item"><p>${t("places.noPlaces")}</p></article>`;
        catchesContainer.innerHTML = "";
        return;
    }

    const grouped = groupByPlace(catches);
    const entries = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);

    placesList.innerHTML = entries.map(([key, list], index) => {
        const largest = Math.max(...list.map(getLargestWeight));
        return [
            `<button type="button" class="list-item place-btn" data-place="${escapeAttr(key)}" ${index === 0 ? "data-default=\"1\"" : ""}>`,
            `<h3>${escapeHtml(key)}</h3>`,
            `<p>${t("places.logCount", { count: list.length, weight: formatWeight(largest) })}</p>`,
            `</button>`
        ].join("");
    }).join("");

    const selectPlace = (placeKey) => {
        const list = grouped[placeKey] || [];
        title.textContent = t("places.logsFor", { place: placeKey });

        if (list.length === 0) {
            catchesContainer.innerHTML = `<article class="list-item"><p>${t("places.noLogs")}</p></article>`;
            return;
        }

        catchesContainer.innerHTML = list.map((item) => renderCatchCard(item, false)).join("");
    };

    placesList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const placeBtn = target.closest(".place-btn");
        if (!placeBtn) {
            return;
        }

        const key = placeBtn.dataset.place || "";
        if (key) {
            selectPlace(key);
        }
    });

    if (entries.length > 0) {
        selectPlace(entries[0][0]);
    }
}

function getCurrentUser() {
    const raw = localStorage.getItem(STORAGE.currentUser);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

async function getUserCatches(userId) {
    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);

    if (isGuest) {
        const catchesLocal = readStorage(STORAGE.catches, []);
        const ownGuest = catchesLocal.filter((item) => item.userId === userId);

        return ownGuest.sort((a, b) => {
            const aDate = new Date(a.date || a.createdAt).getTime();
            const bDate = new Date(b.date || b.createdAt).getTime();
            return bDate - aDate;
        });
    }

    if (firebaseState.enabled && firebaseState.db) {
        try {
            const snapshot = await firebaseState.db
                .collection("catches")
                .where("userId", "==", userId)
                .get();

            return snapshot.docs
                .map((doc) => ({ ...doc.data() }))
                .sort((a, b) => {
                    const aDate = new Date(a.date || a.createdAt).getTime();
                    const bDate = new Date(b.date || b.createdAt).getTime();
                    return bDate - aDate;
                });
        } catch {
            // Falls through to local data if cloud query fails.
        }
    }

    const catches = readStorage(STORAGE.catches, []);
    const own = catches.filter((item) => item.userId === userId);

    return own.sort((a, b) => {
        const aDate = new Date(a.date || a.createdAt).getTime();
        const bDate = new Date(b.date || b.createdAt).getTime();
        return bDate - aDate;
    });
}

async function saveCatch(catchRecord) {
    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);

    if (!isGuest && firebaseState.enabled && firebaseState.db) {
        await firebaseState.db.collection("catches").doc(catchRecord.id).set(catchRecord);
        return;
    }

    const catches = readStorage(STORAGE.catches, []);
    catches.unshift(catchRecord);
    writeStorage(STORAGE.catches, catches);
}

async function saveImages(files, userId, catchId) {
    if (!files || files.length === 0) {
        return [];
    }

    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);

    if (!isGuest && firebaseState.enabled && firebaseState.storage) {
        try {
            const uploads = files.map(async (file, index) => {
                const safeName = String(file.name || `image-${index}`).replaceAll(/[^a-zA-Z0-9._-]/g, "_");
                const path = `catches/${userId}/${catchId}/${Date.now()}-${index}-${safeName}`;
                const ref = firebaseState.storage.ref().child(path);
                await ref.put(file);
                return ref.getDownloadURL();
            });

            return Promise.all(uploads);
        } catch {
            // Falls through to local base64 save.
        }
    }

    return filesToBase64(files);
}

function addFishRow(container) {
    const row = document.createElement("div");
    row.className = "fish-row";
    row.innerHTML = [
        `<label>${t("add.fishType")} <input type="text" name="fishType" required></label>`,
        `<label>${t("add.weight")}<div class="weight-inline"><input type="number" name="fishWeight" min="0" step="0.01" required><select name="fishWeightUnit"><option value="kg">kg</option><option value="lb">lb</option></select></div></label>`,
        `<button type="button" class="btn btn-danger remove-row">${t("add.remove")}</button>`
    ].join("");

    container.appendChild(row);
}

function collectFishRows(container) {
    const rows = Array.from(container.querySelectorAll(".fish-row"));
    return rows.map((row) => {
        const typeInput = row.querySelector('input[name="fishType"]');
        const weightInput = row.querySelector('input[name="fishWeight"]');
        const unitInput = row.querySelector('select[name="fishWeightUnit"]');
        const selectedUnit = String(unitInput?.value || "kg").toLowerCase();

        return {
            type: String(typeInput?.value || "").trim(),
            weight: convertWeightToKg(Number(weightInput?.value || 0), selectedUnit)
        };
    }).filter((fish) => fish.type && fish.weight >= 0);
}

function renderImagePreviews(files, container) {
    container.innerHTML = "";

    if (!files || files.length === 0) {
        return;
    }

    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement("img");
            img.src = String(reader.result || "");
            img.className = "thumb";
            img.alt = file.name;
            container.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function collectSelectedFiles(imageInput, cameraInput) {
    return [
        ...Array.from(imageInput?.files || []),
        ...Array.from(cameraInput?.files || [])
    ];
}

function filesToBase64(files) {
    return Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Failed to read image."));
        reader.readAsDataURL(file);
    })));
}

function filterCatches(catches, formData) {
    const dateFrom = String(formData.get("dateFrom") || "").trim();
    const dateTo = String(formData.get("dateTo") || "").trim();
    const place = String(formData.get("place") || "").trim().toLowerCase();
    const fishMin = parseOptionalNumber(formData.get("fishMin"));
    const fishMax = parseOptionalNumber(formData.get("fishMax"));
    const weightMin = normalizeInputWeight(parseOptionalNumber(formData.get("weightMin")));
    const weightMax = normalizeInputWeight(parseOptionalNumber(formData.get("weightMax")));

    return catches.filter((item) => {
        const itemDate = item.date || "";
        const itemPlaceText = `${item.placeName || ""} ${item.placeLink || ""} ${item.mapsLink || ""} ${getPrimaryPlaceLabel(item)}`.toLowerCase();
        const largest = getLargestWeight(item);

        if (dateFrom && itemDate < dateFrom) {
            return false;
        }

        if (dateTo && itemDate > dateTo) {
            return false;
        }

        if (place && !itemPlaceText.includes(place)) {
            return false;
        }

        if (fishMin !== null && item.fishCount < fishMin) {
            return false;
        }

        if (fishMax !== null && item.fishCount > fishMax) {
            return false;
        }

        if (weightMin !== null && largest < weightMin) {
            return false;
        }

        if (weightMax !== null && largest > weightMax) {
            return false;
        }

        return true;
    });
}

function renderCatchCard(item, compact) {
    const place = getPrimaryPlaceLabel(item);

    const largest = getLargestWeight(item);

    return [
        '<article class="list-item">',
        `<h3>${escapeHtml(place || t("common.unknownPlace"))}</h3>`,
        `<p>${t("common.date")}: ${escapeHtml(item.date || "-")}</p>`,
        `<p>${t("common.caughtFish")}: ${item.fishCount}</p>`,
        `<p>${t("common.largestFish")}: ${formatWeight(largest)}</p>`,
        compact ? "" : `<a class="btn btn-secondary" href="catch-details.html?id=${encodeURIComponent(item.id)}">${t("common.openDetails")}</a>`,
        '</article>'
    ].join("");
}

function groupByPlace(catches) {
    return catches.reduce((acc, item) => {
        const key = getPrimaryPlaceLabel(item);
        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);
        return acc;
    }, {});
}

function getLargestWeight(item) {
    if (!item.fishItems || item.fishItems.length === 0) {
        return 0;
    }

    return Math.max(...item.fishItems.map((f) => Number(f.weight) || 0));
}

function parseOptionalNumber(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

function parseFirebaseError(error, fallback) {
    const code = String(error?.code || "");
    switch (code) {
        case "auth/email-already-in-use":
            return t("register.alreadyExists", { fallback: "This email is already registered." });
        case "auth/invalid-email":
            return t("login.emailInvalid", { fallback: "Email format is invalid." });
        case "auth/weak-password":
            return t("register.weak", { fallback: "Password is too weak." });
        case "auth/user-not-found":
            return t("login.emailNotFound", { fallback: "No account found with this email." });
        case "auth/wrong-password":
            return t("login.passwordWrong", { fallback: "Password is incorrect." });
        case "auth/invalid-credential":
            return t("login.badCredentials", { fallback: "Email or password is incorrect." });
        case "auth/network-request-failed":
            return t("register.firebaseFallback", { fallback: "Cloud registration is unavailable right now. Your account was created locally." });
        case "auth/operation-not-allowed":
            return t("register.firebaseFallback", { fallback: "Cloud registration is unavailable right now. Your account was created locally." });
        default:
            return fallback;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function isValidPassword(password) {
    return PASSWORD_POLICY.test(String(password || "").trim());
}

function setupPasswordToggle(inputElement, toggleButton, translationPrefix) {
    if (!(inputElement instanceof HTMLInputElement) || !(toggleButton instanceof HTMLButtonElement)) {
        return;
    }

    const updateToggleState = () => {
        const isVisible = inputElement.type === "text";
        const action = isVisible ? t(`${translationPrefix}.hidePassword`) : t(`${translationPrefix}.showPassword`);
        toggleButton.setAttribute("aria-label", action);
        toggleButton.setAttribute("title", action);
    };

    toggleButton.addEventListener("click", () => {
        inputElement.type = inputElement.type === "password" ? "text" : "password";
        updateToggleState();
    });

    updateToggleState();
}

function readStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }

        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function setMessage(el, text, ok) {
    el.textContent = text;
    el.className = `message ${ok ? "success" : "error"}`;
}

function toFixed(value) {
    return Number(value || 0).toFixed(2);
}

function formatWeight(kgValue) {
    const value = currentWeightUnit === "lb"
        ? kgToLb(Number(kgValue || 0))
        : Number(kgValue || 0);
    return `${toFixed(value)} ${t(`unit.${currentWeightUnit}`)}`;
}

function normalizeInputWeight(value) {
    if (value === null || value === undefined) {
        return value;
    }

    const n = Number(value);
    if (!Number.isFinite(n)) {
        return 0;
    }

    return currentWeightUnit === "lb" ? lbToKg(n) : n;
}

function convertWeightToKg(value, unit) {
    const n = Number(value || 0);
    if (!Number.isFinite(n)) {
        return 0;
    }

    return String(unit || "kg") === "lb" ? lbToKg(n) : n;
}

function kgToLb(kg) {
    return kg * 2.2046226218;
}

function lbToKg(lb) {
    return lb / 2.2046226218;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
    return String(value).replaceAll('"', "&quot;");
}

function getPrimaryPlaceLabel(item) {
    if (item.placeName && item.placeName.trim()) {
        return item.placeName.trim();
    }

    if (item.mapsLink && item.mapsLink.trim()) {
        return item.mapsLink.trim();
    }

    if (item.placeLink && item.placeLink.trim()) {
        return item.placeLink.trim();
    }

    if (item.placeType === "link" && item.placeLink) {
        return item.placeLink;
    }

    return t("common.unknownPlace");
}

function renderLanguageSwitch(extraClass = "") {
    const className = ["lang-switch", extraClass].filter(Boolean).join(" ");

    return [
        `<div class="${className}" aria-label="${t("nav.lang")}">`,
        `<span>${t("nav.lang")}</span>`,
        `<button type="button" class="lang-btn ${currentLanguage === "en" ? "active" : ""}" data-lang="en">EN</button>`,
        `<button type="button" class="lang-btn ${currentLanguage === "hu" ? "active" : ""}" data-lang="hu">HU</button>`,
        `</div>`
    ].join("");
}

function getLanguage() {
    const saved = String(localStorage.getItem(STORAGE.language) || "hu").toLowerCase();
    return SUPPORTED_LANGUAGES.has(saved) ? saved : "hu";
}

function setLanguage(lang) {
    const next = String(lang || "hu").toLowerCase();
    if (!SUPPORTED_LANGUAGES.has(next)) {
        return;
    }

    localStorage.setItem(STORAGE.language, next);
    window.location.reload();
}

function t(key, params = {}) {
    const dict = I18N[currentLanguage] || I18N.en;
    const fallbackDict = I18N.en;
    const base = dict[key] || fallbackDict[key] || params.fallback || key;

    return String(base).replaceAll(/\{(\w+)\}/g, (_, token) => {
        const value = params[token];
        return value === undefined ? `{${token}}` : String(value);
    });
}

function setPlaceholder(selector, value) {
    const el = document.querySelector(selector);
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.placeholder = value;
    }
}

function applyPageTranslations(page, user) {
    document.documentElement.lang = currentLanguage;

    switch (page) {
        case "index":
            document.title = "Fishing Logbook";
            setText(".hero-kicker", t("index.kicker"));
            setText(".hero h1", t("index.title"));
            setText(".hero-text", t("index.text"));
            break;
        case "login": {
            document.title = `${t("login.title")} | Fishing Logbook`;
            setText(".auth-card h1", t("login.title"));
            setText(".auth-card > p", t("login.subtitle"));
            setText('label[for="loginEmail"]', t("login.email"));
            setText('label[for="loginPassword"]', t("login.password"));
            setText('label[for="loginPasswordConfirm"]', t("login.passwordConfirm"));
            setText('#loginForm button[type="submit"]', t("login.button"));
            setText("#openResetModal", t("login.openReset"));
            setText("#resetTitle", t("login.forgotTitle"));
            setText("#resetSubtitle", t("login.forgotSubtitle"));
            setText('label[for="resetEmail"]', t("login.email"));
            setText('label[for="resetCode"]', t("login.resetCode"));
            setText('label[for="resetNewPassword"]', t("login.newPassword"));
            setText("#requestResetCode", t("login.requestReset"));
            setText("#applyResetCode", t("login.applyReset"));
            setText("#closeResetModal", t("common.close"));
            setPlaceholder("#resetNewPassword", t("login.newPasswordPh"));
            const fine = document.querySelector(".auth-card .fine-print");
            if (fine) {
                fine.innerHTML = `${t("login.noAccount")} <a href="register.html">${t("login.registerHere")}</a>.`;
            }
            break;
        }
        case "register": {
            document.title = `${t("register.title")} | Fishing Logbook`;
            setText(".auth-card h1", t("register.title"));
            setText(".auth-card > p", t("register.subtitle"));
            setText('label[for="registerUsername"]', t("register.username"));
            setText('label[for="registerEmail"]', t("register.email"));
            setText('label[for="registerPassword"]', t("register.password"));
            setText("#registerPasswordHint", `${t("register.passwordHint")} ${t("register.passwordRules")}`);
            setText('#registerForm button[type="submit"]', t("register.button"));
            const registerToggleButton = document.getElementById("toggleRegisterPassword");
            if (registerToggleButton instanceof HTMLButtonElement) {
                registerToggleButton.setAttribute("aria-label", t("register.showPassword"));
                registerToggleButton.setAttribute("title", t("register.showPassword"));
            }
            const fine = document.querySelector(".auth-card .fine-print");
            if (fine) {
                fine.innerHTML = `${t("register.already")} <a href="login.html">${t("register.login")}</a>.`;
            }
            break;
        }
        case "dashboard": {
            document.title = `${t("nav.dashboard")} | Fishing Logbook`;
            setText(".intro-card p", t("dashboard.choose"));
            const cards = document.querySelectorAll(".dashboard-grid .nav-card");
            if (cards[0]) {
                setText("h2", t("dashboard.card.addTitle"), cards[0]);
                setText("p", t("dashboard.card.addText"), cards[0]);
            }
            if (cards[1]) {
                setText("h2", t("dashboard.card.logbookTitle"), cards[1]);
                setText("p", t("dashboard.card.logbookText"), cards[1]);
            }
            if (cards[2]) {
                setText("h2", t("dashboard.card.placesTitle"), cards[2]);
                setText("p", t("dashboard.card.placesText"), cards[2]);
            }
            if (cards[3]) {
                setText("h2", t("dashboard.card.caughtTitle"), cards[3]);
                setText("p", t("dashboard.card.caughtText"), cards[3]);
            }
            setText(".card-head h2", t("dashboard.recent"));
            setText(".card-head .btn", t("dashboard.openFull"));
            if (user) {
                setText("#welcomeTitle", t("dashboard.welcome", { name: user.username }));
            }
            break;
        }
        case "add-catch": {
            document.title = `${t("nav.addExperience")} | Fishing Logbook`;
            setText(".card h1", t("add.title"));
            setText(".card > p", t("add.subtitle"));
            setText('label[for="catchDate"]', t("add.date"));
            setText('label[for="placeName"]', t("add.placeName"));
            setText('label[for="placeLink"]', t("add.placeLink"));
            setText('label[for="mapsLink"]', t("add.mapsLink"));
            setText(".field-hint", t("add.placeHint"));
            setText('label[for="fishCount"]', t("add.fishCount"));
            setText('label[for="waterTemp"]', t("add.waterTemp"));
            setText('label[for="weather"]', t("add.weather"));
            setText(".fish-block h2", t("add.fishDetails"));
            setText("#addFishRow", t("add.addFishRow"));
            setText('label[for="catchImages"]', t("add.uploadPhotos"));
            setText('label[for="catchCamera"]', t("add.uploadCamera"));
            setText('label[for="notes"]', t("add.notes"));
            setText('#catchForm button[type="submit"]', t("add.save"));
            setPlaceholder("#placeName", t("add.placeNamePh"));
            setPlaceholder("#placeLink", t("add.placeLinkPh"));
            setPlaceholder("#mapsLink", t("add.mapsLinkPh"));
            setPlaceholder("#weather", t("add.weatherPh"));
            setPlaceholder("#notes", t("add.notesPh"));
            break;
        }
        case "logbook":
            document.title = `${t("nav.logbook")} | Fishing Logbook`;
            setText(".card h1", t("logbook.title"));
            setText(".card > p", t("logbook.subtitle"));
            setText('label[for="filterDateFrom"]', t("logbook.dateFrom"));
            setText('label[for="filterDateTo"]', t("logbook.dateTo"));
            setText('label[for="filterPlace"]', t("logbook.place"));
            setText('label[for="filterFishMin"]', t("logbook.fishMin"));
            setText('label[for="filterFishMax"]', t("logbook.fishMax"));
            setText('label[for="filterWeightMin"]', `${t("logbook.weightMin")} (${t(`unit.${currentWeightUnit}`)})`);
            setText('label[for="filterWeightMax"]', `${t("logbook.weightMax")} (${t(`unit.${currentWeightUnit}`)})`);
            setText('#filterForm button[type="submit"]', t("logbook.apply"));
            setText("#clearFilters", t("logbook.clear"));
            setText(".card-head h2", t("logbook.results"));
            setPlaceholder("#filterPlace", t("logbook.placePh"));
            break;
        case "catch-details":
            document.title = `${t("details.title")} | Fishing Logbook`;
            setText(".card-head h1", t("details.title"));
            setText(".card-head .btn", t("details.back"));
            break;
        case "places":
            document.title = `${t("nav.places")} | Fishing Logbook`;
            setText(".card h1", t("places.title"));
            setText(".card > p", t("places.subtitle"));
            setText("#selectedPlaceTitle", t("places.select"));
            break;
        default:
            break;
    }
}

function setText(selector, value, root) {
    const scope = root || document;
    const el = scope.querySelector(selector);
    if (el) {
        el.textContent = value;
    }
}
