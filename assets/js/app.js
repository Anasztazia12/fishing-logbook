// Allowed backgrounds (exclude screenshots)
const AVAILABLE_BACKGROUNDS = [
    "background.png",
    "background2.png",
    "camouflage.png",
    "camouflage2.png",
    "carp.png",
    "carp2.png",
    "Carpbaits.png",
    "fishing.png",
    "fishing2.png",
    "fishing3.png",
    "fishing4.png",
    "fishing5.png"
];
const ALLOWED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif"
];
    const bgModalState = {
    originalBackground: "background.png",
    previewBackground: "background.png"
};

function getCurrentBackground() {
    const img = localStorage.getItem("flb_bg");
    if (img && AVAILABLE_BACKGROUNDS.includes(img)) {
        return img;
    }

    return "background.png";
}

function previewBackground(img) {
    if (AVAILABLE_BACKGROUNDS.includes(img)) {
        document.body.style.backgroundImage = `url('assets/images/${img}')`;
    }
}

function openBgModal() {
    let modal = document.getElementById("bgModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "bgModal";
        modal.className = "modal-overlay";
        modal.innerHTML = `
            <div class="modal-card">
                <h2>${t("common.changeBg") || "Change Background"}</h2>
                <div class="bg-options">
                    ${AVAILABLE_BACKGROUNDS.map(img => `
                        <button class="bg-thumb" data-img="${img}" style="background-image:url('assets/images/${img}')" title="${img}"></button>
                    `).join("")}
                </div>
                <div class="card-head" style="justify-content:center; gap:.5rem;">
                    <button class="btn btn-secondary" id="closeBgModal">${t("common.cancel") || "Cancel"}</button>
                    <button class="btn btn-primary" id="confirmBgModal">${t("common.ok") || "OK"}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.hidden = false;
    }

    bgModalState.originalBackground = getCurrentBackground();
    bgModalState.previewBackground = bgModalState.originalBackground;

    modal.style.display = "flex";
    modal.querySelectorAll(".bg-thumb").forEach(btn => {
        btn.onclick = () => {
            const img = btn.getAttribute("data-img");
            if (!img) {
                return;
            }

            bgModalState.previewBackground = img;
            previewBackground(img);
        };
    });

    const confirmBtn = document.getElementById("confirmBgModal");
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            setBackground(bgModalState.previewBackground);
            closeBgModal(true);
        };
    }

    const closeBtn = document.getElementById("closeBgModal");
    if (closeBtn) {
        closeBtn.onclick = () => closeBgModal(false);
    }

    modal.onclick = (event) => {
        if (event.target === modal) {
            closeBgModal(false);
        }
    };
}

function closeBgModal(keepPreview = false) {
    const modal = document.getElementById("bgModal");
    if (!keepPreview) {
        previewBackground(bgModalState.originalBackground);
    }

    if (modal) {
        modal.style.display = "none";
    }
}

function setBackground(img) {
    if (AVAILABLE_BACKGROUNDS.includes(img)) {
        localStorage.setItem("flb_bg", img);
        document.body.style.backgroundImage = `url('assets/images/${img}')`;
    }
}

function applySavedBackground() {
    const img = localStorage.getItem("flb_bg");
    if (img && AVAILABLE_BACKGROUNDS.includes(img)) {
        document.body.style.backgroundImage = `url('assets/images/${img}')`;
    } else {
        document.body.style.backgroundImage = "url('assets/images/background.png')";
    }
}

function ensureBrandIcon() {
    const brand = document.querySelector(".brand");
    if (!brand || brand.querySelector(".brand-icon")) {
        return;
    }

    const icon = document.createElement("img");
    icon.src = "assets/images/icon.png";
    icon.alt = "Fishing Logbook Icon";
    icon.className = "brand-icon";

    const label = brand.querySelector("span");
    if (label) {
        brand.prepend(icon);
        return;
    }

    const text = String(brand.textContent || "").trim() || "Fishing Logbook";
    brand.textContent = "";
    const textNode = document.createElement("span");
    textNode.textContent = text;
    brand.append(icon, textNode);
}

function ensureSectionIcons() {
    const page = String(document.body?.dataset?.page || "");
    if (page === "login") {
        return;
    }

    const headings = document.querySelectorAll(
        "main .card > h1, main .card > .card-head > h1, main .card > .card-head > h2"
    );

    headings.forEach((heading) => {
        if (heading.querySelector(".section-icon")) {
            return;
        }

        if (heading.querySelector("img")) {
            return;
        }

        const icon = document.createElement("img");
        icon.src = "assets/images/icon.png";
        icon.alt = "Fishing Logbook Icon";
        icon.className = "section-icon";
        heading.prepend(icon);
    });
}

// SINGLE DOMContentLoaded HANDLER FOR ALL INIT
document.addEventListener("DOMContentLoaded", () => {
    applySavedBackground();
    ensureBrandIcon();
    // Ensure topbar controls exist immediately on public pages as well.
    const nav = document.getElementById("mainNav");
    if (nav) {
        renderNav(getCurrentUser());
    }

    void bootstrapApp().catch(() => {
        // Keep navigation usable even if bootstrap fails.
        if (nav) {
            renderNav(getCurrentUser());
        }
    });

    // Always attach guest button logic if present
    const guestButton = document.getElementById("continueGuestBtn");
    if (guestButton) {
        guestButton.onclick = () => {
            startGuestSession();
            window.location.href = "dashboard.html";
        };
    }
});
const STORAGE = {
    users: "flb_users",
    currentUser: "flb_current_user",
    catches: "flb_catches",
    recommendedPlaces: "flb_recommended_places",
    resetCodes: "flb_reset_codes",
    language: "flb_language"
};

const SUPABASE_DEFAULT_CONFIG = {
    url: "",
    anonKey: "",
    storageBucket: "fish, image"
};
let SUPABASE_CONFIG = { ...SUPABASE_DEFAULT_CONFIG };
let supabaseClient = null;

const PUBLIC_PAGES = new Set(["index", "login", "register"]);
const SUPPORTED_LANGUAGES = new Set(["en", "hu"]);
const PASSWORD_POLICY = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=.?]{8,20}$/;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
]);
const ALLOWED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

const I18N = {
    en: {
        "nav.dashboard": "Dashboard",
        "nav.back": "Back",
        "nav.startScreen": "Welcome page",
        "nav.addExperience": "Add Experience",
        "nav.logbook": "Logbook",
        "nav.places": "Places",
        "nav.placesFished": "Places I fished",
        "nav.placesWishlist": "Interesting places",
        "nav.placesVisitedOption": "Places (where I fished)",
        "nav.recommendedPlaces": "Recommended places",
        "nav.logout": "Logout",
        "nav.deleteAccount": "Delete account",
        "nav.home": "Home",
        "nav.login": "Login",
        "nav.register": "Register",
        "nav.guest": "Guest",
        "common.close": "Close",
        "common.changeBg": "Change background",
        "common.pictures": "Pictures",
        "common.ok": "OK",
        "common.cancel": "Cancel",
        "nav.lang": "Language",
        "nav.weight": "Weight",
        "index.kicker": "Personal angling tracker",
        "index.title": "Track every catch, place and fishing memory",
        "index.text": "Register or login to add new fishing experiences, browse your logbook, and review catches by place with full details.",
        "index.openDashboard": "Open Dashboard",
        "index.addResult": "Add New Result",
        "index.continueGuest": "Continue as Guest",
        "index.loginBtn": "Login",
        "index.registerBtn": "Registration",
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
        "register.cloudUnavailable": "Cloud registration is currently unavailable. Please try again later.",
        "register.supabaseConfigMissing": "Supabase config is missing. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env, then hard refresh.",
        "register.verificationSent": "Welcome, {name}! A confirmation email has been sent to {email}.",
        "register.success": "Registration successful. Redirecting...",
        "register.failed": "Registration failed.",
        "register.weak": "Password is too weak.",
        "register.button": "Create account",
        "register.passwordConfirm": "Confirm password",
        "register.already": "Already registered?",
        "register.login": "Login",
        "dashboard.welcome": "Welcome, {name}",
        "dashboard.guestWelcome": "Guest mode active",
        "dashboard.guestHint": "This is an info banner. Use the cards below to choose an action.",
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
        "add.baits": "Baits used",
        "add.baitsPh": "Bait type, brand, color...",
        "add.saving": "Saving...",
        "add.savedAndReload": "Saved. Opening logbook...",
        "add.saveFailed": "Saving failed. Please try again.",
        "add.invalidImage": "Only PNG, JPG, JPEG, WEBP, GIF image files are allowed.",
        "add.previewFailed": "One or more images could not be previewed.",
        "add.fishDetails": "Fish details (type + weight)",
        "add.addFishRow": "Add fish row",
        "add.uploadPhotos": "Upload photos",
        "add.uploadCamera": "Take photo with phone camera",
        "add.compressImages": "Compress photos before upload (recommended)",
        "add.compressHint": "Reduces image size and speeds up saving.",
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
        "logbook.search": "Search",
        "logbook.searchToggle": "Show/hide filters",
        "logbook.fishType": "Fish type",
        "logbook.fishTypePh": "Carp, Pike...",
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
        "details.baits": "Baits used",
        "details.edit": "Edit",
        "details.delete": "Delete",
        "details.editSaved": "Saved changes.",
        "details.deleted": "Saved catch deleted.",
        "details.deleteConfirm": "Delete this saved catch?",
        "details.editDate": "Date",
        "details.editPlace": "Place name",
        "details.editFishCount": "Caught fish count",
        "details.editWeather": "Weather",
        "details.editBaits": "Baits used",
        "details.editNotes": "Notes",
        "details.editImages": "Manage photos",
        "details.removePhoto": "Remove",
        "details.addMorePhotos": "Add more photos",
        "details.photosUpdated": "Photo changes saved.",
        "details.noPhotosLeft": "No photos left.",
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
        "places.search": "Search",
        "places.addAction": "Add new place",
        "places.emptyFishedLabel": "Place (where I fished)",
        "places.emptyRecommendedLabel": "Recommend Places",
        "places.searchPh": "Search place...",
        "places.fishingList": "Fishing places",
        "places.fishedModeTitle": "Places where I fished",
        "places.wishlistModeTitle": "Interesting places",
        "places.recommendedList": "Recommended places",
        "places.detailsTitle": "Fishing place details",
        "places.recommendedEditor": "Recommended place",
        "places.editorFished": "New fished place",
        "places.editorWishlist": "New interesting place",
        "places.recommendedName": "Place name",
        "places.recommendedInfo": "Info",
        "places.recommendedInfoPh": "Why do you recommend this place?",
        "places.recommendedLink": "Link",
        "places.recommendedLinkPh": "https://example.com/place",
        "places.recommendedPhotos": "Photos",
        "places.recommendedSave": "Save",
        "places.recommendedDelete": "Delete",
        "places.recommendedClear": "Clear",
        "places.recommendedSaved": "Place saved.",
        "places.recommendedDeleted": "Place deleted.",
        "places.recommendedDeleteConfirm": "Delete this recommended place?",
        "places.recommendedNoItems": "No recommended places yet.",
        "places.recommendedFor": "Recommended: {place}",
        "places.savedFor": "Saved place: {place}",
        "places.sourceCatch": "From saved catches",
        "places.noPlaces": "No places yet. Add a fishing experience first.",
        "places.logsFor": "Logs for {place}",
        "places.noLogs": "No logs for this place.",
        "places.logCount": "{count} log(s) | Largest fish {weight}",
        "account.deleteConfirm": "Are you sure you want to delete your account? This cannot be undone.",
        "account.deleted": "Your account has been deleted. We are sorry to see you go.",
        "account.deleteFailed": "Account deletion failed. Please try again.",
        "account.recentLogin": "For security, please log in again and then delete your account.",
        "account.deleteEmailNote": "Automatic deletion confirmation email requires backend email service.",
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
        "nav.back": "Vissza",
        "nav.startScreen": "Belépő oldal",
        "nav.addExperience": "Új élmény",
        "nav.logbook": "Horgásznapló",
        "nav.places": "Helyszínek",
        "nav.placesFished": "Ahol horgásztam",
        "nav.placesWishlist": "Érdekes helyek",
        "nav.placesVisitedOption": "Places (ahol voltam)",
        "nav.recommendedPlaces": "Ajánlott helyek",
        "nav.logout": "Kijelentkezés",
        "nav.deleteAccount": "Fiók törlése",
        "nav.home": "Főoldal",
        "nav.login": "Belépés",
        "nav.register": "Regisztráció",
        "nav.guest": "Vendég",
        "common.close": "Bezárás",
        "common.changeBg": "Háttér változtatása",
        "common.pictures": "Képek",
        "common.ok": "OK",
        "common.cancel": "Mégsem",
        "nav.lang": "Nyelv",
        "nav.weight": "Súly",
        "index.kicker": "Személyes horgász nyilvántartó",
        "index.title": "Rögzíts minden fogást, helyszínt és horgász emléket",
        "index.text": "Regisztrálj vagy lépj be, hogy új horgászati élményeket adj hozzá, szűrd a naplódat, és nézd át a helyszínek adatait teljes részletekkel.",
        "index.openDashboard": "Kezdőlap megnyitása",
        "index.addResult": "Új eredmény rögzítése",
        "index.continueGuest": "Folytatás vendégként",
        "index.loginBtn": "Bejelentkezés",
        "index.registerBtn": "Regisztráció",
        "login.passwordWrong": "A jelszó helytelen.",
        "login.badCredentials": "Hibás email cím vagy jelszó.",
        "login.forgotTitle": "Elfelejtett jelszó?",
        "login.forgotSubtitle": "Kérj visszaállító emailt vagy ideiglenes kódot.",
        "login.requestReset": "Visszaállítás kérése",
        "login.resetCode": "Visszaállító kód",
        "login.title": "Belépés",
        "login.subtitle": "Lépj be a horgász irányítópultodra.",
        "login.email": "Email",
        "login.password": "Jelszó",
        "login.passwordConfirm": "Jelszó megerősítése",
        "login.button": "Belépés",
        "login.emailInvalid": "Az email cím formátuma hibás.",
        "login.emailNotFound": "Ehhez az email címhez nem található fiók.",
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
        "register.cloudUnavailable": "A felhős regisztráció most nem elérhető. Próbáld újra később.",
        "register.supabaseConfigMissing": "Hianyzik a Supabase config. Add meg a SUPABASE_URL es SUPABASE_ANON_KEY ertekeket a .env-ben, majd csinalj hard refresh-t.",
        "register.verificationSent": "Üdv, {name}! Visszaigazoló emailt küldtünk ide: {email}.",
        "register.success": "Sikeres regisztráció. Átirányítás...",
        "register.failed": "A regisztráció sikertelen.",
        "register.weak": "A jelszó túl gyenge.",
        "register.button": "Fiók létrehozása",
        "register.passwordConfirm": "Jelszó megerősítése",
        "register.already": "Már regisztráltál?",
        "register.login": "Belépés",
        "dashboard.welcome": "Üdvözöllek, {name}",
        "dashboard.guestWelcome": "Vendég mód aktív",
        "dashboard.guestHint": "Ez egy tájékoztató sáv. Választani az alábbi kártyákból tudsz.",
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
        "add.baits": "Használt csalik",
        "add.baitsPh": "Csali típus, márka, szín...",
        "add.saving": "Mentés folyamatban...",
        "add.savedAndReload": "Adatok mentve. Napló megnyitása...",
        "add.saveFailed": "A mentés nem sikerült. Próbáld újra.",
        "add.invalidImage": "Csak PNG, JPG, JPEG, WEBP, GIF képfájl tölthető fel.",
        "add.previewFailed": "Egy vagy több kép előnézete nem tölthető be.",
        "add.fishDetails": "Hal adatok (típus + súly)",
        "add.addFishRow": "Hal sor hozzáadása",
        "add.uploadPhotos": "Fotók feltöltése",
        "add.uploadCamera": "Fotó készítése telefon kamerával",
        "add.compressImages": "Fotók tömörítése feltöltés előtt (ajánlott)",
        "add.compressHint": "Csökkenti a képek méretét, és gyorsítja a mentést.",
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
        "logbook.search": "Keresés",
        "logbook.searchToggle": "Szűrők mutatása/elrejtése",
        "logbook.fishType": "Hal típusa",
        "logbook.fishTypePh": "Ponty, csuka...",
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
        "details.baits": "Használt csalik",
        "details.edit": "Módosítás",
        "details.delete": "Törlés",
        "details.editSaved": "Módosítások mentve.",
        "details.deleted": "A mentett fogás törölve.",
        "details.deleteConfirm": "Törlöd ezt a mentett fogást?",
        "details.editDate": "Dátum",
        "details.editPlace": "Helyszín neve",
        "details.editFishCount": "Kifogott halak száma",
        "details.editWeather": "Időjárás",
        "details.editBaits": "Használt csalik",
        "details.editNotes": "Jegyzet",
        "details.editImages": "Képek kezelése",
        "details.removePhoto": "Törlés",
        "details.addMorePhotos": "További képek",
        "details.photosUpdated": "Képmódosítások mentve.",
        "details.noPhotosLeft": "Nincs már kép.",
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
        "places.search": "Keresés",
        "places.addAction": "Új hely hozzáadása",
        "places.emptyFishedLabel": "Helyek (ahol horgásztam)",
        "places.emptyRecommendedLabel": "Ajánlott helyek",
        "places.searchPh": "Hely keresése...",
        "places.fishingList": "Horgász helyek",
        "places.fishedModeTitle": "Helyek, ahol horgásztam",
        "places.wishlistModeTitle": "Érdekes helyek",
        "places.recommendedList": "Ajánlott helyek",
        "places.detailsTitle": "Horgászhely adatok",
        "places.recommendedEditor": "Ajánlott hely",
        "places.editorFished": "Új horgászott hely",
        "places.editorWishlist": "Új érdekes hely",
        "places.recommendedName": "Hely neve",
        "places.recommendedInfo": "Információ",
        "places.recommendedInfoPh": "Miért ajánlod ezt a helyet?",
        "places.recommendedLink": "Link",
        "places.recommendedLinkPh": "https://pelda.hu/hely",
        "places.recommendedPhotos": "Fotók",
        "places.recommendedSave": "Mentés",
        "places.recommendedDelete": "Törlés",
        "places.recommendedClear": "Törlés",
        "places.recommendedSaved": "Hely elmentve.",
        "places.recommendedDeleted": "Hely törölve.",
        "places.recommendedDeleteConfirm": "Törlöd ezt az ajánlott helyet?",
        "places.recommendedNoItems": "Még nincs ajánlott hely.",
        "places.recommendedFor": "Ajánlott: {place}",
        "places.savedFor": "Mentett hely: {place}",
        "places.sourceCatch": "Mentett fogásokból",
        "places.noPlaces": "Még nincs helyszín. Rögzíts előbb egy horgászati élményt.",
        "places.logsFor": "Naplók itt: {place}",
        "places.noLogs": "Ehhez a helyszínhez nincs napló.",
        "places.logCount": "{count} napló | Legnagyobb hal {weight}",
        "account.deleteConfirm": "Biztosan törölni szeretnéd a fiókodat? Ez nem vonható vissza.",
        "account.deleted": "A fiók törölve. Sajnáljuk, hogy elmész.",
        "account.deleteFailed": "A fiók törlése nem sikerült. Próbáld újra.",
        "account.recentLogin": "Biztonsági okból lépj be újra, majd töröld a fiókodat.",
        "account.deleteEmailNote": "Automatikus törlési emailhez szerver oldali email küldés szükséges.",
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

// (Removed duplicate DOMContentLoaded handler)

async function bootstrapApp() {
    ensureBootstrapStyles();
    await loadRuntimeSupabaseConfig();
    await loadSupabaseSdk();
    initSupabase();
    await syncAuthState();

    const page = document.body.dataset.page;
    const user = getCurrentUser();

    renderNav(user);
    protectPage(page, user);
    applyPageTranslations(page, user);
    ensureSectionIcons();

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

async function loadSupabaseSdk() {
    if (window.supabase) {
        return;
    }

    try {
        await injectScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js");
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

async function loadRuntimeSupabaseConfig() {
    const envVars = await loadDotEnvVars();
    const windowVars = getWindowRuntimeVars();
    const localVars = getLocalRuntimeVars();
    SUPABASE_CONFIG = {
        ...SUPABASE_DEFAULT_CONFIG,
        url: String(envVars.SUPABASE_URL || windowVars.SUPABASE_URL || localVars.SUPABASE_URL || "").trim(),
        anonKey: String(envVars.SUPABASE_ANON_KEY || windowVars.SUPABASE_ANON_KEY || localVars.SUPABASE_ANON_KEY || "").trim(),
        storageBucket: String(envVars.SUPABASE_STORAGE_BUCKET || windowVars.SUPABASE_STORAGE_BUCKET || localVars.SUPABASE_STORAGE_BUCKET || SUPABASE_DEFAULT_CONFIG.storageBucket).trim()
    };
}

async function loadDotEnvVars() {
    if (!window.location.protocol.startsWith("http")) {
        return {};
    }

    try {
        const candidates = [".env", "/.env", "env.local", "/env.local"];
        for (const path of candidates) {
            const response = await fetch(path, { cache: "no-store" });
            if (!response.ok) {
                continue;
            }

            const envText = await response.text();
            const parsed = parseDotEnv(envText);
            if (parsed.SUPABASE_URL || parsed.SUPABASE_ANON_KEY) {
                return parsed;
            }
        }

        return {};
    } catch {
        return {};
    }
}

function getWindowRuntimeVars() {
    try {
        return {
            SUPABASE_URL: String(window.__FLB_SUPABASE_URL__ || ""),
            SUPABASE_ANON_KEY: String(window.__FLB_SUPABASE_ANON_KEY__ || ""),
            SUPABASE_STORAGE_BUCKET: String(window.__FLB_SUPABASE_STORAGE_BUCKET__ || "")
        };
    } catch {
        return {};
    }
}

function getLocalRuntimeVars() {
    try {
        return {
            SUPABASE_URL: String(localStorage.getItem("flb_supabase_url") || ""),
            SUPABASE_ANON_KEY: String(localStorage.getItem("flb_supabase_anon_key") || ""),
            SUPABASE_STORAGE_BUCKET: String(localStorage.getItem("flb_supabase_storage_bucket") || "")
        };
    } catch {
        return {};
    }
}

function parseDotEnv(envText) {
    const result = {};
    const lines = String(envText || "").split(/\r?\n/);
    for (const lineRaw of lines) {
        const line = lineRaw.trim();
        if (!line || line.startsWith("#")) {
            continue;
        }

        const separatorIndex = line.indexOf("=");
        if (separatorIndex <= 0) {
            continue;
        }

        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");
        if (!key) {
            continue;
        }

        result[key] = value;
    }

    return result;
}

function initSupabase() {
    if (!window.supabase) {
        supabaseClient = null;
        return;
    }

    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        supabaseClient = null;
        return;
    }

    try {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    } catch {
        supabaseClient = null;
    }
}

function hasSupabaseRuntimeConfig() {
    return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}

function catchToSupabase(record) {
    return {
        id: record.id,
        user_id: record.userId || "",
        date: record.date || new Date().toISOString().slice(0, 10),
        place_name: record.placeName || "",
        place_link: record.placeLink || "",
        maps_link: record.mapsLink || "",
        fish_count: Number(record.fishCount) || 0,
        fish_data: record.fishItems || [],
        baits: record.baits || "",
        notes: record.notes || "",
        water_temp: (record.waterTemp !== undefined && record.waterTemp !== null) ? Number(record.waterTemp) : 0,
        weather: record.weather || "",
        image_urls: record.imageData || []
    };
}

function catchFromSupabase(row) {
    return {
        id: row.id,
        userId: row.user_id || "",
        userEmail: "",
        date: row.date || "",
        placeName: row.place_name || "",
        placeLink: row.place_link || "",
        mapsLink: row.maps_link || "",
        fishCount: Number(row.fish_count) || 0,
        fishItems: Array.isArray(row.fish_data) ? row.fish_data : [],
        baits: row.baits || "",
        notes: row.notes || "",
        waterTemp: (row.water_temp !== undefined && row.water_temp !== null) ? Number(row.water_temp) : null,
        weather: row.weather || "",
        imageData: Array.isArray(row.image_urls) ? row.image_urls.map(normalizeImageEntry).filter(Boolean) : [],
        createdAt: new Date().toISOString()
    };
}

function normalizeImageEntry(entry) {
    if (!entry) {
        return null;
    }

    if (typeof entry === "string") {
        if (entry.startsWith("http://") || entry.startsWith("https://") || entry.startsWith("data:")) {
            return { src: entry };
        }

        return { path: entry };
    }

    if (typeof entry === "object") {
        const path = String(entry.path || entry.storagePath || "").trim();
        const src = String(entry.signedUrl || entry.url || entry.src || "").trim();
        if (!path && !src) {
            return null;
        }

        return { path, src };
    }

    return null;
}

function getImageEntrySrc(entry) {
    const normalized = normalizeImageEntry(entry);
    if (!normalized) {
        return "";
    }

    if (normalized.src) {
        return normalized.src;
    }

    return "";
}

async function getSignedStorageUrl(path) {
    if (!supabaseClient || !SUPABASE_CONFIG.storageBucket || !path) {
        return "";
    }

    try {
        const { data, error } = await supabaseClient.storage
            .from(SUPABASE_CONFIG.storageBucket)
            .createSignedUrl(path, 60 * 60 * 24);

        if (error) {
            return "";
        }

        return String(data?.signedUrl || "");
    } catch {
        return "";
    }
}

async function enrichCatchImages(catchRecord) {
    const imageData = Array.isArray(catchRecord?.imageData) ? catchRecord.imageData : [];
    const resolved = await Promise.all(imageData.map(async (entry) => {
        const normalized = normalizeImageEntry(entry);
        if (!normalized) {
            return null;
        }

        if (normalized.src && (!normalized.path || normalized.src.startsWith("data:"))) {
            return normalized;
        }

        if (normalized.path) {
            const signedUrl = await getSignedStorageUrl(normalized.path);
            if (signedUrl) {
                return { path: normalized.path, src: signedUrl };
            }
        }

        return normalized.src ? normalized : null;
    }));

    return {
        ...catchRecord,
        imageData: resolved.filter(Boolean)
    };
}

async function enrichCatchCollection(catches) {
    return Promise.all((Array.isArray(catches) ? catches : []).map((item) => enrichCatchImages(item)));
}

// Fast normalization without async API calls - for initial page load
function quickNormalizeCatchImages(catchRecord) {
    const imageData = Array.isArray(catchRecord?.imageData) ? catchRecord.imageData : [];
    const normalized = imageData
        .map((entry) => normalizeImageEntry(entry))
        .filter(Boolean);

    return {
        ...catchRecord,
        imageData: normalized
    };
}

// Fast batch normalization for initial load - no API calls
function quickNormalizeCatchCollection(catches) {
    return (Array.isArray(catches) ? catches : []).map((item) => quickNormalizeCatchImages(item));
}

async function syncAuthState() {
    if (!supabaseClient) {
        return;
    }

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session?.user) {
            return;
        }

        const authUser = session.user;
        const localUser = getCurrentUser();
        if (localUser?.isGuest) {
            return;
        }

        const localEmail = String(localUser?.email || "").toLowerCase();
        const authEmail = String(authUser.email || "").toLowerCase();
        if (localUser && localEmail && authEmail && localEmail !== authEmail) {
            return;
        }

        localStorage.setItem(STORAGE.currentUser, JSON.stringify({
            id: authUser.id,
            username: authUser.user_metadata?.username || authUser.email || "User",
            email: authUser.email || ""
        }));
    } catch {
        // Keep local session if sync fails.
    }
}

function protectPage(page, user) {
    if (PUBLIC_PAGES.has(page)) {
        return;
    }

    if (!user) {
        window.location.href = "login.html";
    }
}

async function deleteCurrentAccount() {
    const user = getCurrentUser();
    if (!user || user.isGuest) {
        return;
    }

    const confirmed = window.confirm(t("account.deleteConfirm"));
    if (!confirmed) {
        return;
    }

    try {
        if (supabaseClient) {
            try {
                await supabaseClient
                    .from("catches")
                    .delete()
                    .eq("user_id", user.id);
            } catch {
                // Continue deletion even if cloud catch cleanup fails.
            }

            try {
                await supabaseClient.auth.signOut();
            } catch {
                // Continue even if sign out fails.
            }
        }

        const users = readStorage(STORAGE.users, []);
        writeStorage(STORAGE.users, users.filter((u) => u.email !== user.email));

        const catches = readStorage(STORAGE.catches, []);
        writeStorage(STORAGE.catches, catches.filter((item) => item.userId !== user.id));

        localStorage.removeItem(STORAGE.currentUser);
        window.alert(t("account.deleted"));
        window.location.href = "index.html";
    } catch {
        window.alert(t("account.deleteFailed"));
    }
}

function renderNav(user) {
    const nav = document.getElementById("mainNav");
    if (!nav) {
        return;
    }

    const page = String(document.body?.dataset?.page || "");
    const forcePublicNav = PUBLIC_PAGES.has(page);
    const effectiveUser = isUserSessionActive(user) ? user : null;

    let navHtml = "";
    if (!forcePublicNav && effectiveUser) {
        const guestLabel = effectiveUser.isGuest ? ` (${t("nav.guest")})` : "";
        navHtml = [
            `<button type="button" class="btn-link" id="backBtn">${t("nav.back")}</button>`,
            `<a href="dashboard.html">${t("nav.dashboard")}${guestLabel}</a>`,
            `<a href="add-catch.html">${t("nav.addExperience")}</a>`,
            `<a href="my-cathches.html">${t("nav.logbook")}</a>`,
            `<button type="button" class="btn-link nav-parent-toggle" id="placesMenuToggle" data-menu-keep-open="1" aria-expanded="false" aria-controls="placesSubmenu">${t("nav.places")}</button>`,
            `<div class="nav-submenu" id="placesSubmenu" hidden>`,
            `<a href="places.html?mode=fished">${t("nav.placesVisitedOption")}</a>`,
            `<a href="places.html?mode=wishlist">${t("nav.recommendedPlaces")}</a>`,
            `</div>`,
            `<button type="button" class="btn-link" id="changeBgBtn">${t("common.changeBg")}</button>`,
            `<button type="button" class="btn-link" id="logoutBtn">${t("nav.logout")}</button>`,
            effectiveUser.isGuest ? "" : `<div class="nav-separator" role="separator" aria-hidden="true"></div>`,
            effectiveUser.isGuest ? "" : `<button type="button" class="btn-link btn-danger-link" id="deleteAccountBtn">${t("nav.deleteAccount")}</button>`
        ].join("");
    } else {
        navHtml = [
            `<a href="index.html">${t("nav.home")}</a>`,
            `<a href="login.html">${t("nav.login")}</a>`,
            `<a href="register.html">${t("nav.register")}</a>`,
            `<button type="button" class="btn-link" id="changeBgBtn">${t("common.changeBg")}</button>`
        ].join("");
    }
    nav.innerHTML = navHtml;

    if (!forcePublicNav && effectiveUser) {
        const backBtn = document.getElementById("backBtn");
        const logout = document.getElementById("logoutBtn");
        const deleteAccountBtn = document.getElementById("deleteAccountBtn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (window.history.length > 1) {
                    window.history.back();
                    return;
                }

                window.location.href = "dashboard.html";
            });
        }

        if (logout) {
            logout.addEventListener("click", async () => {
                if (supabaseClient) {
                    await supabaseClient.auth.signOut().catch(() => {});
                }

                localStorage.removeItem(STORAGE.currentUser);
                window.location.href = "index.html";
            });
        }

        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener("click", () => {
                void deleteCurrentAccount();
            });
        }

        const placesMenuToggle = document.getElementById("placesMenuToggle");
        const placesSubmenu = document.getElementById("placesSubmenu");
        if (placesMenuToggle && placesSubmenu) {
            placesMenuToggle.addEventListener("click", (event) => {
                event.preventDefault();
                const willOpen = placesSubmenu.hidden;
                placesSubmenu.hidden = !willOpen;
                placesMenuToggle.setAttribute("aria-expanded", String(willOpen));
            });
        }
    }

    // Always ensure hamburger menu and language switch
    ensureMenuToggle(nav);
    setTimeout(() => {
        const bgBtn = document.getElementById("changeBgBtn");
        if (bgBtn) {
            bgBtn.addEventListener("click", openBgModal);
        }
    }, 0);
    ensureTopbarLanguageSwitch();
    // Always show language switch
    const langWrap = document.getElementById("topbarLangSwitch");
    if (langWrap) langWrap.style.display = "flex";
}

function isUserSessionActive(user) {
    if (!user) {
        return false;
    }

    if (user.isGuest) {
        return true;
    }

    const users = readStorage(STORAGE.users, []);
    if (users.some((stored) => String(stored.email || "").toLowerCase() === String(user.email || "").toLowerCase())) {
        return true;
    }

    // Valid if session came from Supabase sync (has id + email)
    return Boolean(user.id && user.email);
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
    const controls = document.querySelector(".topbar-controls");
    if (!controls) {
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
        controls.appendChild(toggle);
    }

    // Keep controls order stable even when markup is pre-rendered.
    if (toggle.parentElement !== controls) {
        controls.appendChild(toggle);
    }

    const closeNav = () => {
        nav.classList.remove("open");
        nav.style.display = "none";
        nav.querySelectorAll(".nav-submenu").forEach((submenu) => {
            submenu.hidden = true;
        });
        nav.querySelectorAll(".nav-parent-toggle").forEach((btn) => {
            btn.setAttribute("aria-expanded", "false");
        });
        toggle.setAttribute("aria-expanded", "false");
        document.removeEventListener("click", handleMenuGlobalClick);
    };

    toggle.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = nav.classList.toggle("open");
        nav.style.display = isOpen ? "flex" : "none";
        toggle.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
            // Ha megnyílt, barmilyen kattintas zárja (kiveve a toggle gombot).
            setTimeout(() => {
                document.addEventListener("click", handleMenuGlobalClick);
            }, 0);
        } else {
            closeNav();
        }
    };

    function handleMenuGlobalClick(event) {
        const target = event.target;
        if (!(target instanceof Node)) {
            return;
        }

        if (toggle.contains(target) || nav.contains(target)) {
            return;
        }

        closeNav();
    }

    // Close menu after selecting a menu action/link.
    nav.querySelectorAll("a,button").forEach((item) => {
        if (item.getAttribute("data-menu-keep-open") === "1") {
            return;
        }

        item.addEventListener("click", () => {
            closeNav();
        });
    });

    // A menü csak a hamburger gombbal nyílik/záródik, nem zárjuk be mouseleave-re
    // nav.dataset.hoverCloseBound = "1";
}

function ensureTopbarLanguageSwitch() {
    const controls = document.querySelector(".topbar-controls");
    if (!controls) {
        return;
    }

    let langWrap = document.getElementById("topbarLangSwitch");
    if (!langWrap) {
        langWrap = document.createElement("div");
        langWrap.id = "topbarLangSwitch";
        controls.appendChild(langWrap);
    }

    langWrap.innerHTML = renderLanguageSwitch("topbar-lang");

    const toggle = document.getElementById("menuToggle");
    if (toggle) {
        controls.insertBefore(langWrap, toggle);
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
    // No-op: guest button logic handled globally in DOMContentLoaded
}

function startGuestSession() {
    const guestId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    localStorage.setItem(STORAGE.currentUser, JSON.stringify({
        id: `guest-${guestId}`,
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
    const passwordAgainInput = document.getElementById("registerPasswordAgain");
    const togglePasswordAgainBtn = document.getElementById("toggleRegisterPasswordAgain");

    if (!form || !msg) {
        return;
    }

    setupPasswordToggle(passwordInput, togglePasswordBtn, "register");
    setupPasswordToggle(passwordAgainInput, togglePasswordAgainBtn, "register");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const username = String(formData.get("username") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();
        const passwordAgain = String(formData.get("passwordAgain") || "").trim();

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

        if (password !== passwordAgain) {
            setMessage(msg, t("register.passwordsDontMatch", { fallback: "Passwords do not match." }), false);
            return;
        }

        const users = readStorage(STORAGE.users, []);
        const alreadyExists = users.some((u) => u.email === email);

        if (alreadyExists) {
            setMessage(msg, t("register.alreadyExists", { fallback: "This email is already registered." }), false);
            return;
        }

        let authUserId = null;

        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: { data: { username } }
                });

                if (error) {
                    const msg2 = String(error.message || "").toLowerCase();
                    if (msg2.includes("already registered") || msg2.includes("already exists") || msg2.includes("already been registered")) {
                        setMessage(msg, t("register.alreadyExists", { fallback: "This email is already registered." }), false);
                    } else {
                        setMessage(msg, error.message || t("register.failed"), false);
                    }
                    return;
                }

                authUserId = data.user?.id || null;
                if (data.session) {
                    setMessage(msg, t("register.success"), true);
                } else {
                    setMessage(msg, t("register.verificationSent", { name: username, email }), true);
                }
            } catch {
                setMessage(msg, t("register.cloudUnavailable"), false);
                return;
            }
        } else {
            setMessage(msg, hasSupabaseRuntimeConfig() ? t("register.cloudUnavailable") : t("register.supabaseConfigMissing"), false);
            return;
        }

        const newUser = {
            id: authUserId || crypto.randomUUID(),
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

        setMessage(msg, t("register.success"), true);
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

    const handleLoginFailure = (messageText) => {
        setMessage(msg, messageText, false);
    };

    forgotTrigger.hidden = false;
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

        if (!isValidEmail(email)) {
            handleLoginFailure(t("login.emailInvalid"));
            return;
        }

        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) {
                    handleLoginFailure(t("login.badCredentials"));
                    return;
                }

                const authUser = data.user;
                localStorage.setItem(STORAGE.currentUser, JSON.stringify({
                    id: authUser.id,
                    username: authUser.user_metadata?.username || authUser.email || "User",
                    email: authUser.email || email
                }));

                window.location.href = "dashboard.html";
                return;
            } catch {
                handleLoginFailure(t("login.badCredentials"));
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
        window.location.href = "dashboard.html";
    });

    requestResetBtn.addEventListener("click", async () => {
        const email = String(resetEmailInput.value || "").trim().toLowerCase();
        if (!isValidEmail(email)) {
            setMessage(resetMsg, t("login.emailInvalid"), false);
            return;
        }

        if (supabaseClient) {
            try {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
                if (error) throw error;
                setMessage(resetMsg, t("login.resetEmailSent"), true);
                return;
            } catch {
                setMessage(resetMsg, t("login.badCredentials"), false);
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

        if (supabaseClient) {
            setMessage(resetMsg, t("login.resetEmailSent"), true);
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
    const introCard = document.querySelector(".intro-card");
    const introHint = document.querySelector(".intro-card p");
    const recent = document.getElementById("recentCatches");

    if (welcome) {
        if (user.isGuest) {
            welcome.textContent = t("dashboard.guestWelcome");
            introCard?.classList.add("guest-banner");
            if (introHint) {
                introHint.textContent = t("dashboard.guestHint");
            }
        } else {
            welcome.textContent = t("dashboard.welcome", { name: user.username });
            introCard?.classList.remove("guest-banner");
        }
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
    const compressToggle = document.getElementById("compressImagesToggle");

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



    const MAX_IMAGES = 10;
    let selectedImages = [];

    const updatePreview = () => {
        // Frissíti az előnézetet a selectedImages alapján
        renderImagePreviews(selectedImages, imagePreview, true, () => {
            setMessage(msg, t("add.previewFailed"), false);
        });
        if (selectedImages.length > MAX_IMAGES) {
            setMessage(msg, t("add.tooManyImages", { fallback: `You can upload up to ${MAX_IMAGES} images per experience.` }), false);
        } else {
            setMessage(msg, "", true);
        }
    };

    const handleFileInput = (input) => {
        const files = Array.from(input.files || []);
        if (!files.length) return;

        const imageFiles = files.filter((file) => isAllowedImageFile(file));
        const hasInvalidFiles = imageFiles.length !== files.length;

        // Ha túl sok lenne, csak a hiányzó mennyiséget engedjük hozzáadni
        const canAdd = Math.max(0, MAX_IMAGES - selectedImages.length);
        const filesToAdd = imageFiles.slice(0, canAdd);
        selectedImages = selectedImages.concat(filesToAdd);
        updatePreview();
        if (hasInvalidFiles) {
            setMessage(msg, t("add.invalidImage"), false);
        }
        // Reset input, hogy ugyanazt a képet is újra lehessen választani
        input.value = "";
    };

    imageInput.addEventListener("change", () => handleFileInput(imageInput));
    cameraInput.addEventListener("change", () => handleFileInput(cameraInput));

    imagePreview.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const btn = target.closest(".preview-remove-btn");
        if (!btn) {
            return;
        }

        const idxRaw = btn.getAttribute("data-preview-index") || "-1";
        const idx = Number(idxRaw);
        if (!Number.isInteger(idx) || idx < 0 || idx >= selectedImages.length) {
            return;
        }

        selectedImages.splice(idx, 1);
        updatePreview();
    });

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
        if (selectedImages.length > MAX_IMAGES) {
            setMessage(msg, t("add.tooManyImages", { fallback: `You can upload up to ${MAX_IMAGES} images per experience.` }), false);
            return;
        }
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn instanceof HTMLButtonElement) {
            submitBtn.disabled = true;
            submitBtn.textContent = t("add.saving");
        }

        try {
            const imageData = await saveImages(selectedImages, user.id, catchId);
            const fishCount = Number(data.get("fishCount") || 0);
            const waterTemp = parseOptionalNumber(data.get("waterTemp"));
            const weather = String(data.get("weather") || "").trim();
            const baits = String(data.get("baits") || "").trim();

            const newCatch = {
                id: catchId,
                userId: user.id,
                userEmail: String(user.email || "").toLowerCase(),
                date: String(data.get("catchDate") || "").trim(),
                placeName,
                placeLink,
                mapsLink,
                fishCount,
                waterTemp,
                weather,
                baits,
                fishItems,
                imageData,
                notes: String(data.get("notes") || "").trim(),
                createdAt: new Date().toISOString()
            };

            await saveCatch(newCatch);

            setMessage(msg, t("add.savedAndReload"), true);
            form.reset();
            dateInput.value = new Date().toISOString().slice(0, 10);
            fishRows.innerHTML = "";
            addFishRow(fishRows);
            addFishRow(fishRows);
            imagePreview.innerHTML = "";
            selectedImages = [];
            setTimeout(() => {
                window.location.href = `my-cathches.html?fromSave=1&savedCatchId=${encodeURIComponent(catchId)}`;
            }, 800);
        } catch (error) {
            console.error("Catch save failed", error);
            setMessage(msg, parseSaveError(error), false);
        } finally {
            if (submitBtn instanceof HTMLButtonElement) {
                submitBtn.disabled = false;
                submitBtn.textContent = t("add.save");
            }
        }
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
    const modal = document.getElementById("logbookDetailsModal");
    const modalContent = document.getElementById("logbookDetailsContent");
    const closeModalBtn = document.getElementById("closeLogbookDetails");
    const filterPanel = document.getElementById("filterPanel");
    const toggleFilterPanelBtn = document.getElementById("toggleFilterPanel");
    const filterDescription = document.getElementById("filterDescription");
    const listCard = document.getElementById("logbookResultsCard") || container?.closest(".card");

    if (!form || !clearBtn || !container || !modal || !modalContent || !closeModalBtn || !filterPanel || !toggleFilterPanelBtn) {
        return;
    }

    // Show filter description only if there's data to filter
    const updateFilterDescriptionVisibility = () => {
        if (filterDescription) {
            filterDescription.hidden = catches.length === 0 || !filterPanelOpened;
        }
    };

    // Prevent duplicate initialization (remove old listeners)
    if (window.__logbookInitialized) {
        return;
    }
    window.__logbookInitialized = true;

    const quick = new URLSearchParams(window.location.search).get("quick");
    const fromSave = new URLSearchParams(window.location.search).get("fromSave") === "1";
    const savedCatchId = new URLSearchParams(window.location.search).get("savedCatchId") || "";
    let filterPanelOpened = quick === "caught";
    if (quick === "caught") {
        const fishMinInput = document.getElementById("filterFishMin");
        if (fishMinInput) {
            fishMinInput.value = "1";
        }
        filterPanel.hidden = false;
    } else {
        filterPanel.hidden = true;
    }

    let didSearch = fromSave;

    toggleFilterPanelBtn.addEventListener("click", () => {
        if (filterPanel.hidden) {
            filterPanel.hidden = false;
            filterPanelOpened = true;
            updateFilterDescriptionVisibility();
            return;
        }

        didSearch = true;
        render();
    });

    if (fromSave) {
        form.reset();
    }

    let catches = await getUserCatches(user.id);
    let focusedSavedCatch = false;

    // **KRITIKUS FIX**: Ha idejöttünk save után, biztosan kell lennie adatnak
    // Ha üres, próbáljuk újra betölteni (max 3 próba)
    if (fromSave && catches.length === 0) {
        let retries = 0;
        while (catches.length === 0 && retries < 3) {
            await new Promise(resolve => setTimeout(resolve, 200)); // várakozás 200ms
            catches = await getUserCatches(user.id);
            retries += 1;
        }
    }

    if (fromSave && savedCatchId && !catches.some((item) => item.id === savedCatchId)) {
        const storedCatch = getStoredCatchById(savedCatchId);
        if (storedCatch) {
            catches = quickNormalizeCatchCollection([storedCatch, ...catches.filter((item) => item.id !== savedCatchId)]);
        }
    }

    // **DEBUG**: Log a betöltött catches számát
    console.log(`[LOGBOOK] Loaded ${catches.length} catches for user ${user.id}`, catches);

    const openDetailsModal = (catchId) => {
        const selected = catches.find((item) => item.id === catchId);
        if (!selected) {
            return;
        }

        modalContent.innerHTML = renderCatchDetailsMarkup(selected);
        wirePhotoViewer(modalContent);
        modal.hidden = false;
        document.body.style.overflow = "hidden";
    };

    const closeDetailsModal = () => {
        modal.hidden = true;
        document.body.style.overflow = "";
    };

    const refreshCatches = async () => {
        catches = await getUserCatches(user.id);
    };

    const focusSavedCatchCard = () => {
        if (fromSave && listCard instanceof HTMLElement) {
            listCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        if (!savedCatchId || focusedSavedCatch) {
            return;
        }

        const savedCard = container.querySelector(`[data-catch-id="${CSS.escape(savedCatchId)}"]`);
        if (!(savedCard instanceof HTMLElement)) {
            return;
        }

        focusedSavedCatch = true;
        savedCard.classList.add("just-saved");
        savedCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    const render = () => {
        try {
            const formData = new FormData(form);
            const hasActiveFilters = Array.from(formData.values()).some((value) => String(value || "").trim() !== "");
            const filtered = filterCatches(catches, formData);
            const shouldShowSearchFeedback = hasActiveFilters || didSearch;
            const shouldShowResults = filtered.length > 0 || shouldShowSearchFeedback;

            if (count) {
                count.hidden = !shouldShowSearchFeedback;
                if (shouldShowSearchFeedback) {
                    count.textContent = t("logbook.resultCount", { count: filtered.length });
                    count.classList.toggle("badge-empty", filtered.length === 0);
                } else {
                    count.textContent = "";
                    count.classList.remove("badge-empty");
                }
            }

            if (filtered.length === 0) {
                container.innerHTML = shouldShowSearchFeedback
                    ? `<article class="list-item"><p>${t("logbook.noMatch")}</p></article>`
                    : "";
                if (listCard) {
                    listCard.hidden = !shouldShowResults;
                }
                return;
            }

            if (listCard) {
                listCard.hidden = false;
            }
            container.innerHTML = filtered.map((item) => renderCatchCard(item, false)).join("");
            focusSavedCatchCard();
        } catch (error) {
            console.error("Render failed:", error);
            if (container) {
                container.innerHTML = `<article class="list-item"><p>Error: ${escapeHtml(String(error.message || "Unknown error"))}</p></article>`;
            }
            if (listCard) {
                listCard.hidden = false;
            }
        }
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        didSearch = true;
        render();
    });

    clearBtn.addEventListener("click", () => {
        form.reset();
        didSearch = false;
        render();
    });

    container.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const article = target.closest(".list-item[data-catch-id]");
        if (!article) {
            return;
        }

        const catchId = article.getAttribute("data-catch-id") || "";
        if (!catchId) {
            return;
        }

        event.preventDefault();
        openDetailsModal(catchId);
    });

    wireDetailActions(modalContent, {
        onEdit: async (catchId) => {
            const selected = catches.find((item) => item.id === catchId);
            if (!selected) {
                return;
            }

            const updated = editCatchViaPrompts(selected);
            if (!updated) {
                return;
            }

            await updateCatchRecord(updated);
            await refreshCatches();
            render();
            openDetailsModal(updated.id);
            window.alert(t("details.editSaved"));
        },
        onDelete: async (catchId) => {
            const confirmDelete = window.confirm(t("details.deleteConfirm"));
            if (!confirmDelete) {
                return;
            }

            await deleteCatchRecord(catchId, user.id);
            await refreshCatches();
            render();
            closeDetailsModal();
            window.alert(t("details.deleted"));
        },
        onEditImages: async (catchId) => {
            const selected = catches.find((item) => item.id === catchId);
            if (!selected) {
                return;
            }

            const updated = await editCatchImages(selected);
            if (!updated) {
                return;
            }

            await updateCatchRecord(updated);
            await refreshCatches();
            render();
            openDetailsModal(updated.id);
            window.alert(t("details.photosUpdated"));
        }
    });

    closeModalBtn.addEventListener("click", closeDetailsModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeDetailsModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeDetailsModal();
        }
    });

    if (catches.length > 0) {
        if (fromSave) {
            didSearch = true;
        }
    }

    // Update filter description visibility based on data availability
    updateFilterDescriptionVisibility();

    // Initial render to show catches if they exist
    render();

    // Async image loading in the background after initial render
    // This enriches the image URLs with signed storage URLs without blocking initial display
    (async () => {
        try {
            const enriched = await enrichCatchCollection(catches);
            catches = enriched;
            // Re-render to update images with signed URLs
            updateFilterDescriptionVisibility();
            render();
        } catch (error) {
            console.warn("Async image enrichment failed:", error);
            // App continues with non-enriched images (base64 or paths)
        }
    })();
}

function getStoredCatchById(catchId) {
    if (!catchId) {
        return null;
    }

    const catches = readStorage(STORAGE.catches, []);
    return catches.find((item) => String(item?.id || "") === String(catchId)) || null;
}

async function initCatchDetails(user) {
    if (!user) {
        return;
    }

    const container = document.getElementById("catchDetailsContent");
    if (!container) {
        return;
    }

    let catches = await getUserCatches(user.id);
    if (catches.length === 0) {
        container.innerHTML = `<p class="message error">${t("logbook.noMatch")}</p>`;
        return;
    }

    const requestedId = new URLSearchParams(window.location.search).get("id") || "";
    let activeId = requestedId && catches.some((item) => item.id === requestedId)
        ? requestedId
        : catches[0].id;

    container.innerHTML = [
        '<div id="catchCardCarousel" class="catch-carousel"></div>',
        '<section class="card catch-preview-card" id="catchPreviewPanel"></section>'
    ].join("");

    const carousel = document.getElementById("catchCardCarousel");
    const preview = document.getElementById("catchPreviewPanel");
    if (!carousel || !preview) {
        return;
    }

    const renderSelected = () => {
        const selected = catches.find((item) => item.id === activeId) || catches[0];
        activeId = selected.id;

        carousel.innerHTML = catches.map((item) => {
            const place = getPrimaryPlaceLabel(item);
            const largest = getLargestWeight(item);
            const activeClass = item.id === activeId ? " active" : "";
            return [
                `<button type="button" class="carousel-catch-card${activeClass}" data-catch-id="${escapeAttr(item.id)}">`,
                `<strong>${escapeHtml(place || t("common.unknownPlace"))}</strong>`,
                `<span>${t("common.date")}: ${escapeHtml(item.date || "-")}</span>`,
                `<span>${t("common.largestFish")}: ${formatWeight(largest)}</span>`,
                `</button>`
            ].join("");
        }).join("");

        preview.innerHTML = renderCatchDetailsMarkup(selected);
        wirePhotoViewer(preview);
    };

    const refreshCatches = async () => {
        catches = await getUserCatches(user.id);
    };

    carousel.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        const btn = target.closest(".carousel-catch-card");
        if (!btn) {
            return;
        }
        const nextId = btn.getAttribute("data-catch-id") || "";
        if (!nextId) {
            return;
        }
        activeId = nextId;
        renderSelected();
    });

    wireDetailActions(preview, {
        onEdit: async (catchId) => {
            const selected = catches.find((item) => item.id === catchId);
            if (!selected) {
                return;
            }

            const updated = editCatchViaPrompts(selected);
            if (!updated) {
                return;
            }

            await updateCatchRecord(updated);
            await refreshCatches();
            activeId = updated.id;
            renderSelected();
            window.alert(t("details.editSaved"));
        },
        onDelete: async (catchId) => {
            const confirmDelete = window.confirm(t("details.deleteConfirm"));
            if (!confirmDelete) {
                return;
            }

            await deleteCatchRecord(catchId, user.id);
            await refreshCatches();
            if (catches.length === 0) {
                container.innerHTML = `<p class="message error">${t("logbook.noMatch")}</p>`;
                return;
            }

            activeId = catches[0].id;
            renderSelected();
            window.alert(t("details.deleted"));
        },
        onEditImages: async (catchId) => {
            const selected = catches.find((item) => item.id === catchId);
            if (!selected) {
                return;
            }

            const updated = await editCatchImages(selected);
            if (!updated) {
                return;
            }

            await updateCatchRecord(updated);
            await refreshCatches();
            activeId = updated.id;
            renderSelected();
            window.alert(t("details.photosUpdated"));
        }
    });

    renderSelected();
}

function renderCatchDetailsMarkup(selected) {
    const placeName = selected.placeName
        ? escapeHtml(selected.placeName)
        : "-";
    const placeLink = selected.placeLink
        ? `<a href="${escapeHtml(selected.placeLink)}" target="_blank" rel="noopener">${escapeHtml(selected.placeLink)}</a>`
        : "-";
    const mapsLink = selected.mapsLink
        ? `<a href="${escapeHtml(selected.mapsLink)}" target="_blank" rel="noopener">${t("details.openMap")}</a>`
        : "-";

    const fishItems = Array.isArray(selected.fishItems) ? selected.fishItems : [];
    const fishRows = fishItems
        .map((fish) => `<tr><td>${escapeHtml(fish.type)}</td><td>${formatWeight(fish.weight)}</td></tr>`)
        .join("");

    const imagesArray = Array.isArray(selected.imageData) ? selected.imageData : [];
    const images = imagesArray.length
        ? [
            `<div class="photo-viewer" data-photo-viewer="1">`,
            `<img src="${escapeAttr(getImageEntrySrc(imagesArray[0]))}" alt="Catch photo" class="photo-main" data-photo-main="1">`,
            `<div class="photo-thumbs">`,
            imagesArray.map((entry, index) => {
                const src = getImageEntrySrc(entry);
                return `<button type="button" class="photo-thumb-btn${index === 0 ? " active" : ""}" data-photo-src="${escapeAttr(src)}"><img src="${escapeAttr(src)}" alt="Catch photo ${index + 1}" class="thumb"></button>`;
            }).join(""),
            `</div>`,
            `</div>`
        ].join("")
        : `<p>${t("details.noPhotos")}</p>`;

    return [
        `<div class="detail-actions">`,
        `<button type="button" class="btn btn-primary detail-action" data-catch-action="edit" data-catch-id="${escapeAttr(selected.id)}">${t("details.edit")}</button>`,
        `<button type="button" class="btn btn-secondary detail-action" data-catch-action="edit-images" data-catch-id="${escapeAttr(selected.id)}">${t("details.editImages")}</button>`,
        `<button type="button" class="btn btn-danger detail-action" data-catch-action="delete" data-catch-id="${escapeAttr(selected.id)}">${t("details.delete")}</button>`,
        `</div>`,
        `<div class="detail-grid">`,
        `<p><strong>${t("details.date")}:</strong> ${escapeHtml(selected.date || "-")}</p>`,
        `<p><strong>${t("details.placeName")}:</strong> ${placeName}</p>`,
        `<p><strong>${t("details.placeLink")}:</strong> ${placeLink}</p>`,
        `<p><strong>${t("details.mapsLink")}:</strong> ${mapsLink}</p>`,
        `<p><strong>${t("details.caughtCount")}:</strong> ${selected.fishCount}</p>`,
        `<p><strong>${t("details.waterTemp")}:</strong> ${selected.waterTemp === null || selected.waterTemp === undefined ? "-" : `${toFixed(selected.waterTemp)} ${String.fromCharCode(176)}C`}</p>`,
        `<p><strong>${t("details.weather")}:</strong> ${escapeHtml(selected.weather || "-")}</p>`,
        `<p><strong>${t("details.baits")}:</strong> ${escapeHtml(selected.baits || "-")}</p>`,
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

function wirePhotoViewer(root) {
    if (!root) {
        return;
    }

    if (root.dataset.photoViewerBound === "1") {
        return;
    }

    root.dataset.photoViewerBound = "1";

    root.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const btn = target.closest(".photo-thumb-btn");
        if (!btn) {
            return;
        }

        const viewer = btn.closest("[data-photo-viewer='1']");
        if (!viewer) {
            return;
        }

        const main = viewer.querySelector("[data-photo-main='1']");
        if (!(main instanceof HTMLImageElement)) {
            return;
        }

        const nextSrc = btn.getAttribute("data-photo-src") || "";
        if (!nextSrc) {
            return;
        }

        main.src = nextSrc;

        const thumbButtons = viewer.querySelectorAll(".photo-thumb-btn");
        thumbButtons.forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
    });
}

function wireDetailActions(root, handlers) {
    if (!root) {
        return;
    }

    if (root.dataset.detailActionsBound === "1") {
        return;
    }

    root.dataset.detailActionsBound = "1";

    root.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const btn = target.closest(".detail-action");
        if (!btn) {
            return;
        }

        const catchId = btn.getAttribute("data-catch-id") || "";
        const action = btn.getAttribute("data-catch-action") || "";
        if (!catchId) {
            return;
        }

        if (action === "edit") {
            void handlers?.onEdit?.(catchId);
            return;
        }

        if (action === "edit-images") {
            void handlers?.onEditImages?.(catchId);
            return;
        }

        if (action === "delete") {
            void handlers?.onDelete?.(catchId);
        }
    });
}

async function initPlaces(user) {
    if (!user) {
        return;
    }

    const placesList = document.getElementById("placesList");
    const modeTitle = document.getElementById("placesModeTitle");
    const searchToggleBtn = document.getElementById("placeSearchToggleBtn");
    const addToggleBtn = document.getElementById("placeAddToggleBtn");
    const searchPanel = document.getElementById("placeSearchPanel");
    const searchInput = document.getElementById("placeSearchInput");
    const searchBtn = document.getElementById("placeSearchBtn");
    const editorSection = document.getElementById("recommendedEditorSection");
    const form = document.getElementById("recommendedPlaceForm");
    const idInput = document.getElementById("recommendedPlaceId");
    const nameInput = document.getElementById("recommendedPlaceName");
    const infoInput = document.getElementById("recommendedPlaceInfo");
    const linkInput = document.getElementById("recommendedPlaceLink");
    const imagesInput = document.getElementById("recommendedPlaceImages");
    const imagePreview = document.getElementById("recommendedPlaceImagePreview");
    const saveBtn = document.getElementById("recommendedSaveBtn");
    const deleteBtn = document.getElementById("recommendedDeleteBtn");
    const clearBtn = document.getElementById("recommendedClearBtn");
    const msg = document.getElementById("recommendedPlaceMessage");
    const editorTitle = document.getElementById("recommendedEditorTitle");

    if (!placesList || !modeTitle || !searchToggleBtn || !addToggleBtn || !searchPanel || !searchInput || !searchBtn || !editorSection || !form || !idInput || !nameInput || !infoInput || !linkInput || !imagesInput || !imagePreview || !saveBtn || !deleteBtn || !clearBtn || !msg || !editorTitle) {
        return;
    }

    const modeParam = new URLSearchParams(window.location.search).get("mode");
    const mode = modeParam === "wishlist" ? "wishlist" : "fished";

    modeTitle.textContent = mode === "wishlist" ? t("places.wishlistModeTitle") : t("places.fishedModeTitle");
    editorTitle.textContent = mode === "wishlist" ? t("places.editorWishlist") : t("places.editorFished");
    searchPanel.hidden = true;
    editorSection.hidden = true;

    const catches = await getUserCatches(user.id);
    let savedPlaces = getUserRecommendedPlaces(user, mode);
    let searchQuery = "";
    let existingImages = [];
    let newImageFiles = [];
    let activeEntryId = "";

    const normalizeSearch = (text) => String(text || "").toLowerCase();

    const getCatchEntries = () => {
        if (mode !== "fished") {
            return [];
        }

        const grouped = groupByPlace(catches);
        return Object.entries(grouped)
            .map(([placeName, list]) => ({
                id: `catch:${placeName}`,
                source: "catch",
                name: placeName,
                info: t("places.sourceCatch"),
                link: "",
                imageData: list.flatMap((item) => Array.isArray(item.imageData) ? item.imageData : []).slice(0, 1),
                catches: list
            }))
            .sort((a, b) => a.name.localeCompare(b.name, currentLanguage, { sensitivity: "base" }));
    };

    const getSavedEntries = () => savedPlaces.map((item) => ({
        ...item,
        id: `saved:${item.id}`,
        source: "saved",
        catches: []
    }));

    const getEntries = () => {
        const all = [...getCatchEntries(), ...getSavedEntries()];
        const q = normalizeSearch(searchQuery);
        return all.filter((entry) => normalizeSearch(entry.name).includes(q) || normalizeSearch(entry.info).includes(q));
    };

    const renderRecommendedImagePreview = () => {
        const all = [
            ...existingImages.map((src, index) => ({ kind: "existing", index, src })),
            ...newImageFiles.map((file, index) => ({ kind: "new", index, file }))
        ];

        if (all.length === 0) {
            imagePreview.innerHTML = "";
            return;
        }

        imagePreview.innerHTML = all.map((item) => {
            const src = item.kind === "existing" ? getImageEntrySrc(item.src) : URL.createObjectURL(item.file);
            const marker = `${item.kind}:${item.index}`;
            return [
                `<div class="preview-thumb-wrap">`,
                `<img src="${escapeAttr(src)}" class="thumb" alt="place-image">`,
                `<button type="button" class="btn btn-danger place-image-remove-btn" data-image-marker="${escapeAttr(marker)}">${t("details.removePhoto")}</button>`,
                `</div>`
            ].join("");
        }).join("");
    };

    const resetRecommendedForm = () => {
        idInput.value = "";
        nameInput.value = "";
        infoInput.value = "";
        linkInput.value = "";
        existingImages = [];
        newImageFiles = [];
        imagesInput.value = "";
        renderRecommendedImagePreview();
        setMessage(msg, "", true);
        deleteBtn.hidden = true;
    };

    const renderEntryDetails = (entry) => {
        if (entry.source === "catch") {
            idInput.value = "";
            nameInput.value = entry.name;
            infoInput.value = "";
            linkInput.value = "";
            existingImages = [];
            newImageFiles = [];
            imagesInput.value = "";
            renderRecommendedImagePreview();
            deleteBtn.hidden = true;
            return;
        }

        idInput.value = String(entry.id.replace("saved:", "") || "");
        nameInput.value = String(entry.name || "");
        infoInput.value = String(entry.info || "");
        linkInput.value = String(entry.link || "");
        existingImages = Array.isArray(entry.imageData) ? [...entry.imageData] : [];
        newImageFiles = [];
        imagesInput.value = "";
        renderRecommendedImagePreview();
        deleteBtn.hidden = false;
    };

    const renderLists = () => {
        const entries = getEntries();

        if (entries.length === 0) {
            activeEntryId = "";
        } else if (!entries.some((entry) => entry.id === activeEntryId)) {
            activeEntryId = entries[0].id;
        }

        placesList.innerHTML = entries.length
            ? entries.map((entry) => {
                const active = activeEntryId === entry.id ? " active" : "";
                const largest = entry.source === "catch"
                    ? Math.max(...entry.catches.map(getLargestWeight))
                    : 0;
                const meta = entry.source === "catch"
                    ? t("places.logCount", { count: entry.catches.length, weight: formatWeight(largest) })
                    : (entry.info || "-");
                return [
                    `<button type="button" class="list-item place-btn place-carousel-card${active}" data-entry-id="${escapeAttr(entry.id)}">`,
                    `<h3>${escapeHtml(entry.name)}</h3>`,
                    `<p>${escapeHtml(meta)}</p>`,
                    `</button>`
                ].join("");
            }).join("")
            : [
                `<article class="list-item places-empty-state">`,
                `<p class="places-empty-option">${escapeHtml(t("places.emptyFishedLabel"))}</p>`,
                `<p class="places-empty-option">${escapeHtml(t("places.emptyRecommendedLabel"))}</p>`,
                `<p>${t("places.noPlaces")}</p>`,
                `</article>`
            ].join("");
    };

    const getEntryById = (entryId) => getEntries().find((item) => item.id === entryId);

    const applySearch = () => {
        searchQuery = String(searchInput.value || "").trim();
        renderLists();
    };

    searchToggleBtn.addEventListener("click", () => {
        const willOpen = searchPanel.hidden;
        searchPanel.hidden = !searchPanel.hidden;
        if (willOpen) {
            searchInput.focus();
            return;
        }

        if (searchQuery) {
            searchInput.value = "";
            searchQuery = "";
            renderLists();
        }
    });

    addToggleBtn.addEventListener("click", () => {
        editorSection.hidden = !editorSection.hidden;
        if (editorSection.hidden) {
            return;
        }

        const selected = getEntryById(activeEntryId);
        if (selected) {
            renderEntryDetails(selected);
            return;
        }

        resetRecommendedForm();
    });

    searchBtn.addEventListener("click", applySearch);
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            applySearch();
        }
    });

    placesList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const placeBtn = target.closest(".place-btn[data-entry-id]");
        if (!placeBtn) {
            return;
        }

        const entryId = placeBtn.getAttribute("data-entry-id") || "";
        if (!entryId) {
            return;
        }

        const selected = getEntries().find((item) => item.id === entryId);
        if (!selected) {
            return;
        }

        activeEntryId = selected.id;
        if (!editorSection.hidden) {
            renderEntryDetails(selected);
        }
        renderLists();
    });

    imagesInput.addEventListener("change", () => {
        const files = Array.from(imagesInput.files || []);
        const valid = files.filter((file) => isAllowedImageFile(file));
        if (valid.length !== files.length) {
            setMessage(msg, t("add.invalidImage"), false);
        }
        newImageFiles = newImageFiles.concat(valid);
        imagesInput.value = "";
        renderRecommendedImagePreview();
    });

    imagePreview.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const btn = target.closest(".place-image-remove-btn");
        if (!btn) {
            return;
        }

        const marker = btn.getAttribute("data-image-marker") || "";
        const [kind, indexRaw] = marker.split(":");
        const index = Number(indexRaw);
        if (!Number.isInteger(index) || index < 0) {
            return;
        }

        if (kind === "existing") {
            existingImages.splice(index, 1);
        } else if (kind === "new") {
            newImageFiles.splice(index, 1);
        }

        renderRecommendedImagePreview();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = String(idInput.value || "") || crypto.randomUUID();
        const name = String(nameInput.value || "").trim();
        const info = String(infoInput.value || "").trim();
        const link = String(linkInput.value || "").trim();
        if (!name) {
            return;
        }

        if (saveBtn instanceof HTMLButtonElement) {
            saveBtn.disabled = true;
        }

        try {
            const uploaded = newImageFiles.length
                ? await saveImages(newImageFiles, user.id, `recommended-${id}`)
                : [];
            const previous = savedPlaces.find((item) => String(item.id) === String(id));

            const record = {
                id,
                category: mode,
                userId: user.id,
                userEmail: String(user.email || "").toLowerCase(),
                name,
                info,
                link,
                imageData: [...existingImages, ...uploaded],
                updatedAt: new Date().toISOString(),
                createdAt: previous?.createdAt || new Date().toISOString()
            };

            saveRecommendedPlaceRecord(record);
            savedPlaces = getUserRecommendedPlaces(user, mode);
            setMessage(msg, t("places.recommendedSaved"), true);
            const fresh = savedPlaces.find((item) => String(item.id) === String(record.id));
            if (fresh) {
                activeEntryId = `saved:${fresh.id}`;
                renderEntryDetails({ ...fresh, id: activeEntryId, source: "saved", catches: [] });
            }
            renderLists();
        } finally {
            if (saveBtn instanceof HTMLButtonElement) {
                saveBtn.disabled = false;
            }
        }
    });

    deleteBtn.addEventListener("click", () => {
        const id = String(idInput.value || "");
        if (!id) {
            return;
        }

        const confirmed = window.confirm(t("places.recommendedDeleteConfirm"));
        if (!confirmed) {
            return;
        }

        deleteRecommendedPlaceRecord(id);
        savedPlaces = getUserRecommendedPlaces(user, mode);
        setMessage(msg, t("places.recommendedDeleted"), true);
        resetRecommendedForm();
        renderLists();
    });

    clearBtn.addEventListener("click", () => {
        resetRecommendedForm();
        renderLists();
    });

    resetRecommendedForm();
    renderLists();
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
    const userEmail = String(user?.email || "").toLowerCase();
    const knownUsers = readStorage(STORAGE.users, []);
    const localAll = readStorage(STORAGE.catches, []);
    const emailByUserId = new Map(
        knownUsers.map((entry) => [
            String(entry?.id || ""),
            String(entry?.email || "").toLowerCase()
        ])
    );
    const localOwn = localAll.filter((item) => {
        const itemUserId = String(item?.userId || "");
        const itemEmail = String(item?.userEmail || "").toLowerCase();
        const legacyOwnerEmail = emailByUserId.get(itemUserId) || "";

        if (userId && itemUserId === String(userId)) {
            return true;
        }

        if (userEmail && itemEmail && itemEmail === userEmail) {
            return true;
        }

        // Legacy fallback: old local catches may only have a historic userId.
        if (userEmail && legacyOwnerEmail && legacyOwnerEmail === userEmail) {
            return true;
        }

        // Legacy fallback: very old local records could miss owner metadata.
        if (!itemUserId && !itemEmail && (userId || userEmail)) {
            return true;
        }

        return false;
    });

    // If strict ownership matching finds nothing but local data exists,
    // fall back to local records so users can still access previously saved data.
    const localVisible = localOwn.length > 0 ? localOwn : localAll;

    if (isGuest) {
        return quickNormalizeCatchCollection(localVisible.sort((a, b) => {
            const aDate = new Date(a.date || a.createdAt).getTime();
            const bDate = new Date(b.date || b.createdAt).getTime();
            return bDate - aDate;
        }));
    }

    if (supabaseClient && userId) {
        try {
            const { data, error } = await supabaseClient
                .from("catches")
                .select("*")
                .eq("user_id", userId)
                .order("date", { ascending: false });

            console.log(`[SUPABASE] SELECT catches for user_id=${userId}`, { data, error });

            if (!error && data) {
                const cloud = data.map(catchFromSupabase);
                const cloudIds = new Set(cloud.map((item) => item.id));
                localVisible.forEach((item) => {
                    if (!cloudIds.has(item.id)) {
                        cloud.push(item);
                    }
                });

                return quickNormalizeCatchCollection(cloud.sort((a, b) => {
                    const aDate = new Date(a.date || a.createdAt).getTime();
                    const bDate = new Date(b.date || b.createdAt).getTime();
                    return bDate - aDate;
                }));
            }
        } catch {
            // Falls through to local data if cloud query fails.
        }
    }

    return quickNormalizeCatchCollection(localVisible.sort((a, b) => {
        const aDate = new Date(a.date || a.createdAt).getTime();
        const bDate = new Date(b.date || b.createdAt).getTime();
        return bDate - aDate;
    }));
}

function getUserRecommendedPlaces(user, category = "") {
    const userId = String(user?.id || "");
    const userEmail = String(user?.email || "").toLowerCase();
    const knownUsers = readStorage(STORAGE.users, []);
    const emailByUserId = new Map(
        knownUsers.map((entry) => [
            String(entry?.id || ""),
            String(entry?.email || "").toLowerCase()
        ])
    );

    const all = readStorage(STORAGE.recommendedPlaces, []);
    return all
        .filter((item) => {
            const itemCategory = String(item?.category || "wishlist");
            const itemUserId = String(item?.userId || "");
            const itemEmail = String(item?.userEmail || "").toLowerCase();
            const legacyOwnerEmail = emailByUserId.get(itemUserId) || "";

            if (category && itemCategory !== category) {
                return false;
            }

            if (userId && itemUserId === userId) {
                return true;
            }
            if (userEmail && itemEmail && itemEmail === userEmail) {
                return true;
            }
            if (userEmail && legacyOwnerEmail && legacyOwnerEmail === userEmail) {
                return true;
            }
            return false;
        })
        .sort((a, b) => String(a?.name || "").localeCompare(String(b?.name || ""), currentLanguage, { sensitivity: "base" }));
}

function saveRecommendedPlaceRecord(record) {
    const list = readStorage(STORAGE.recommendedPlaces, []);
    const index = list.findIndex((item) => String(item?.id || "") === String(record?.id || ""));
    const payload = {
        ...record,
        updatedAt: new Date().toISOString(),
        createdAt: record?.createdAt || new Date().toISOString()
    };

    if (index === -1) {
        list.unshift(payload);
    } else {
        list[index] = { ...list[index], ...payload };
    }

    writeStorage(STORAGE.recommendedPlaces, list);
}

function deleteRecommendedPlaceRecord(id) {
    const list = readStorage(STORAGE.recommendedPlaces, []);
    const next = list.filter((item) => String(item?.id || "") !== String(id || ""));
    writeStorage(STORAGE.recommendedPlaces, next);
}

async function saveCatch(catchRecord) {
    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);

    if (!isGuest && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from("catches")
                .upsert(catchToSupabase(catchRecord));
            if (error) {
                console.warn("Supabase catch save failed, using local fallback.", error);
            }
        } catch (error) {
            console.warn("Supabase catch save failed, using local fallback.", error);
        }
    }

    const catches = readStorage(STORAGE.catches, []);
    const index = catches.findIndex((item) => item.id === catchRecord.id);
    if (index === -1) {
        catches.unshift(catchRecord);
    } else {
        catches[index] = catchRecord;
    }
    writeStorage(STORAGE.catches, catches);
}

async function updateCatchRecord(catchRecord) {
    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);
    const normalizedRecord = {
        ...catchRecord,
        userEmail: String(catchRecord?.userEmail || user?.email || "").toLowerCase()
    };

    if (!isGuest && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from("catches")
                .upsert(catchToSupabase(normalizedRecord));
            if (error) {
                console.warn("Supabase catch update failed, using local fallback.", error);
            }
        } catch (error) {
            console.warn("Supabase catch update failed, using local fallback.", error);
        }
    }

    const catches = readStorage(STORAGE.catches, []);
    const index = catches.findIndex((item) => item.id === normalizedRecord.id);
    if (index === -1) {
        catches.unshift(normalizedRecord);
    } else {
        catches[index] = normalizedRecord;
    }
    writeStorage(STORAGE.catches, catches);
}

async function deleteCatchRecord(catchId, userId) {
    const user = getCurrentUser();
    const isGuest = Boolean(user?.isGuest);

    if (!isGuest && supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from("catches")
                .delete()
                .eq("id", catchId);
            if (error) {
                console.warn("Supabase catch delete failed, using local fallback.", error);
            }
        } catch (error) {
            console.warn("Supabase catch delete failed, using local fallback.", error);
        }
    }

    const catches = readStorage(STORAGE.catches, []);
    const filtered = catches.filter((item) => item.id !== catchId || (userId && item.userId !== userId));
    writeStorage(STORAGE.catches, filtered);
}

function editCatchViaPrompts(catchRecord) {
    const nextDate = window.prompt(t("details.editDate"), String(catchRecord.date || ""));
    if (nextDate === null) {
        return null;
    }

    const nextPlace = window.prompt(t("details.editPlace"), String(catchRecord.placeName || ""));
    if (nextPlace === null) {
        return null;
    }

    const nextFishCountRaw = window.prompt(t("details.editFishCount"), String(catchRecord.fishCount ?? 0));
    if (nextFishCountRaw === null) {
        return null;
    }

    const parsedFishCount = Number(nextFishCountRaw);
    if (!Number.isFinite(parsedFishCount) || parsedFishCount < 0) {
        return null;
    }

    const nextWeather = window.prompt(t("details.editWeather"), String(catchRecord.weather || ""));
    if (nextWeather === null) {
        return null;
    }

    const nextBaits = window.prompt(t("details.editBaits"), String(catchRecord.baits || ""));
    if (nextBaits === null) {
        return null;
    }

    const nextNotes = window.prompt(t("details.editNotes"), String(catchRecord.notes || ""));
    if (nextNotes === null) {
        return null;
    }

    return {
        ...catchRecord,
        date: String(nextDate).trim() || catchRecord.date,
        placeName: String(nextPlace).trim(),
        fishCount: parsedFishCount,
        weather: String(nextWeather).trim(),
        baits: String(nextBaits).trim(),
        notes: String(nextNotes).trim()
    };
}

async function editCatchImages(catchRecord) {
    let workingImages = [...(Array.isArray(catchRecord.imageData) ? catchRecord.imageData : [])];

    while (workingImages.length > 0) {
        const shouldRemove = window.confirm(`${t("details.removePhoto")}? (${workingImages.length})`);
        if (!shouldRemove) {
            break;
        }

        const raw = window.prompt(`${t("details.removePhoto")} (1-${workingImages.length})`, "1");
        if (raw === null) {
            break;
        }

        const idx = Number(raw) - 1;
        if (!Number.isInteger(idx) || idx < 0 || idx >= workingImages.length) {
            continue;
        }

        workingImages.splice(idx, 1);
    }

    const addMore = window.confirm(t("details.addMorePhotos"));
    let uploaded = [];
    if (addMore) {
        uploaded = await pickAndUploadAdditionalImages(catchRecord);
    }

    return {
        ...catchRecord,
        imageData: [...workingImages, ...uploaded]
    };
}

function pickAndUploadAdditionalImages(catchRecord) {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.style.position = "fixed";
        input.style.left = "-9999px";
        document.body.appendChild(input);

        const cleanup = () => {
            if (input.parentNode) {
                input.parentNode.removeChild(input);
            }
        };

        input.addEventListener("change", async () => {
            try {
                const files = Array.from(input.files || []);
                if (files.length === 0) {
                    resolve([]);
                    return;
                }

                const uploaded = await saveImages(files, catchRecord.userId || "", catchRecord.id);
                resolve(uploaded);
            } catch (error) {
                console.error("Additional image upload failed", error);
                resolve([]);
            } finally {
                cleanup();
            }
        }, { once: true });

        input.click();
    });
}

async function saveImages(files, userId, catchId, options = {}) {
    if (!files || files.length === 0) {
        return [];
    }

    // ALWAYS compress images - no option to disable
    const uploadFiles = await compressImageFiles(files);

    if (supabaseClient && SUPABASE_CONFIG.storageBucket && userId) {
        try {
            return await uploadToSupabaseStorage(uploadFiles, userId, catchId);
        } catch (error) {
            console.warn("Supabase storage upload failed, using local fallback.", error);
        }
    }

    const base64Files = await filesToBase64(uploadFiles);
    return base64Files.map((src) => ({ src }));
}

async function uploadToSupabaseStorage(files, userId, catchId) {
    const uploaded = [];

    for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const safeName = String(file.name || `image-${index}`).replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `${userId}/${catchId}/${Date.now()}-${index}-${safeName}`;

        const { error } = await supabaseClient.storage
            .from(SUPABASE_CONFIG.storageBucket)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type || undefined
            });

        if (error) {
            throw error;
        }

        uploaded.push({
            path: filePath,
            src: await getSignedStorageUrl(filePath)
        });
    }

    return uploaded;
}

function compressImageFiles(files) {
    return Promise.all(files.map(async (file) => {
        try {
            return await compressImageFile(file);
        } catch (error) {
            console.warn("Image compression failed, using original file.", error);
            return file;
        }
    }));
}

async function compressImageFile(file) {
    if (!(file instanceof File)) {
        return file;
    }

    const type = String(file.type || "").toLowerCase();
    if (!type.startsWith("image/") || type === "image/gif") {
        return file;
    }

    // Compress all JPEG/PNG/WebP images for consistent storage
    const MAX_DIMENSION = 1400;
    const QUALITY = 0.75;  // Aggressive compression for smaller file size
    const image = await loadImageForCompression(file);
    const sourceWidth = Number(image.naturalWidth || image.width || 0);
    const sourceHeight = Number(image.naturalHeight || image.height || 0);
    if (!sourceWidth || !sourceHeight) {
        return file;
    }

    const scale = Math.min(1, MAX_DIMENSION / Math.max(sourceWidth, sourceHeight));
    const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
    const targetHeight = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return file;
    }

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    let outputType = "image/jpeg";
    if (type === "image/png") {
        outputType = "image/png";
    } else if (type === "image/webp") {
        outputType = "image/webp";
    }

    const blob = await canvasToBlob(canvas, outputType, outputType === "image/png" ? undefined : QUALITY);
    if (!blob) {
        return file;
    }

    if (blob.size >= file.size * 0.95) {
        return file;
    }

    return new File([blob], normalizeImageFileName(file.name, outputType), {
        type: outputType,
        lastModified: Date.now()
    });
}

function loadImageForCompression(file) {
    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(img);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to decode image."));
        };

        img.src = objectUrl;
    });
}

function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob || null), type, quality);
    });
}

function normalizeImageFileName(originalName, mimeType) {
    const name = String(originalName || "photo");
    const dotIndex = name.lastIndexOf(".");
    const base = dotIndex > 0 ? name.slice(0, dotIndex) : name;

    const extByMime = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp"
    };

    const ext = extByMime[mimeType] || "jpg";
    return `${base}.${ext}`;
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

function renderImagePreviews(files, container, removable = false, onError = null) {
    container.innerHTML = "";

    if (!files || files.length === 0) {
        return;
    }

    Array.from(files).forEach((file, index) => {
        const source = typeof file === "string"
            ? file
            : (file instanceof File ? URL.createObjectURL(file) : getImageEntrySrc(file));

        const img = document.createElement("img");
        img.src = source;
        img.className = "thumb";
        img.alt = typeof file === "string"
            ? `photo-${index + 1}`
            : String(file?.name || `photo-${index + 1}`);

        if (file instanceof File) {
            img.addEventListener("load", () => {
                URL.revokeObjectURL(source);
            }, { once: true });
            img.addEventListener("error", () => {
                URL.revokeObjectURL(source);
                if (typeof onError === "function") {
                    onError(file);
                }
            }, { once: true });
        }

        if (!removable) {
            container.appendChild(img);
            return;
        }

        const card = document.createElement("div");
        card.className = "preview-thumb-wrap";
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-danger preview-remove-btn";
        removeBtn.setAttribute("data-preview-index", String(index));
        removeBtn.textContent = t("details.removePhoto");

        card.appendChild(img);
        card.appendChild(removeBtn);
        container.appendChild(card);
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
    const fishType = String(formData.get("fishType") || "").trim().toLowerCase();
    const fishMin = parseOptionalNumber(formData.get("fishMin"));
    const fishMax = parseOptionalNumber(formData.get("fishMax"));
    const weightMin = normalizeInputWeight(parseOptionalNumber(formData.get("weightMin")));
    const weightMax = normalizeInputWeight(parseOptionalNumber(formData.get("weightMax")));

    return catches.filter((item) => {
        const itemDate = item.date || "";
        const itemPlaceText = `${item.placeName || ""} ${item.placeLink || ""} ${item.mapsLink || ""} ${getPrimaryPlaceLabel(item)}`.toLowerCase();
        const largest = getLargestWeight(item);
        const fishText = Array.isArray(item.fishItems)
            ? item.fishItems.map((fish) => String(fish.type || "").toLowerCase()).join(" ")
            : "";

        if (dateFrom && itemDate < dateFrom) {
            return false;
        }

        if (dateTo && itemDate > dateTo) {
            return false;
        }

        if (place && !itemPlaceText.includes(place)) {
            return false;
        }

        if (fishType && !fishText.includes(fishType)) {
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
    const imageList = Array.isArray(item.imageData) ? item.imageData : [];
    const coverImage = getImageEntrySrc(imageList[0]);
    const fishItems = Array.isArray(item.fishItems) ? item.fishItems : [];
    const fishSummary = fishItems.length
        ? fishItems.map((fish) => escapeHtml(String(fish.type || "-"))).join(", ")
        : "-";

    return [
        `<article class="list-item" data-catch-id="${escapeAttr(item.id)}">`,
        compact || !coverImage
            ? ""
            : `<img src="${escapeAttr(coverImage)}" alt="Catch photo" class="thumb logbook-card-thumb">`,
        `<h3>${escapeHtml(place || t("common.unknownPlace"))}</h3>`,
        `<p>${t("common.date")}: ${escapeHtml(item.date || "-")}</p>`,
        `<p>${t("common.caughtFish")}: ${item.fishCount}</p>`,
        compact ? "" : `<p>${t("details.type")}: ${fishSummary}</p>`,
        `<p>${t("common.largestFish")}: ${formatWeight(largest)}</p>`,
        compact ? "" : `<a class="btn btn-secondary open-detail-link" href="catch-details.html?id=${encodeURIComponent(item.id)}">${t("common.openDetails")}</a>`,
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

function withTimeout(promise, ms, errorMessage) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(errorMessage || "Operation timed out."));
        }, ms);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => {
        clearTimeout(timeoutId);
    });
}

function parseSaveError(error) {
    const message = String(error?.message || "").toLowerCase();
    const code = String(error?.code || "").toLowerCase();
    const name = String(error?.name || "").toLowerCase();

    if (name.includes("quota") || code.includes("quota") || message.includes("quota")) {
        return "Save failed: local storage is full (usually too many/too large images in offline fallback). Delete older catches or upload fewer images.";
    }

    if (message.includes("timed out") || message.includes("network") || message.includes("offline")) {
        return "Save failed: network is unstable or too slow. Try again with a stronger connection.";
    }

    return t("add.saveFailed");
}

function isAllowedImageFile(file) {
    const mime = String(file?.type || "").toLowerCase();
    if (ALLOWED_IMAGE_MIME_TYPES.has(mime)) {
        return true;
    }

    const name = String(file?.name || "").toLowerCase();
    return ALLOWED_IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext));
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

    const EYE_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="6"/><circle cx="12" cy="12" r="2.8" fill="currentColor" stroke="none"/></svg>`;
    const EYE_CLOSED = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c2-2.5 4.5-4 8-4s6 1.5 8 4"/><path d="M6.5 16.5l-1 1.5M12 18v2M17.5 16.5l1 1.5"/></svg>`;

    let autoHideTimer = null;

    const hidePassword = () => {
        inputElement.type = "password";
        toggleButton.innerHTML = EYE_CLOSED;
        toggleButton.setAttribute("aria-label", t(`${translationPrefix}.showPassword`));
        toggleButton.setAttribute("title", t(`${translationPrefix}.showPassword`));
    };

    const updateToggleState = () => {
        const isVisible = inputElement.type === "text";
        toggleButton.innerHTML = isVisible ? EYE_OPEN : EYE_CLOSED;
        const action = isVisible ? t(`${translationPrefix}.hidePassword`) : t(`${translationPrefix}.showPassword`);
        toggleButton.setAttribute("aria-label", action);
        toggleButton.setAttribute("title", action);
    };

    toggleButton.addEventListener("click", () => {
        const willShow = inputElement.type === "password";
        inputElement.type = willShow ? "text" : "password";
        updateToggleState();

        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }
        if (willShow) {
            autoHideTimer = setTimeout(() => {
                hidePassword();
                autoHideTimer = null;
            }, 10000);
        }
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
            setText("a.hero-btn[href='login.html']", t("index.loginBtn"));
            setText("a.hero-btn[href='register.html']", t("index.registerBtn"));
            setText("#continueGuestBtn", t("index.continueGuest"));
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
            setText('label[for="registerPasswordAgain"]', t("register.passwordConfirm") || "Password again");
            setText("#registerPasswordHint", `${t("register.passwordHint")} ${t("register.passwordRules")}`);
            setText('#registerForm button[type="submit"]', t("register.button"));
            const registerToggleButton = document.getElementById("toggleRegisterPassword");
            const registerToggleButtonAgain = document.getElementById("toggleRegisterPasswordAgain");
            if (registerToggleButton instanceof HTMLButtonElement) {
                registerToggleButton.setAttribute("aria-label", t("register.showPassword"));
                registerToggleButton.setAttribute("title", t("register.showPassword"));
            }
            if (registerToggleButtonAgain instanceof HTMLButtonElement) {
                registerToggleButtonAgain.setAttribute("aria-label", t("register.showPassword"));
                registerToggleButtonAgain.setAttribute("title", t("register.showPassword"));
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
                setText("h2 .card-title-text", t("dashboard.card.addTitle"), cards[0]);
                setText("p", t("dashboard.card.addText"), cards[0]);
            }
            if (cards[1]) {
                setText("h2 .card-title-text", t("dashboard.card.logbookTitle"), cards[1]);
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
            setText('label[for="baits"]', t("add.baits"));
            setText(".fish-block h2", t("add.fishDetails"));
            setText("#addFishRow", t("add.addFishRow"));
            setText('label[for="catchImages"]', t("add.uploadPhotos"));
            setText('label[for="catchCamera"]', t("add.uploadCamera"));
            setText("#compressImagesLabel", t("add.compressImages"));
            setText("#compressImagesHint", t("add.compressHint"));
            setText('label[for="notes"]', t("add.notes"));
            setText('#catchForm button[type="submit"]', t("add.save"));
            setPlaceholder("#placeName", t("add.placeNamePh"));
            setPlaceholder("#placeLink", t("add.placeLinkPh"));
            setPlaceholder("#mapsLink", t("add.mapsLinkPh"));
            setPlaceholder("#weather", t("add.weatherPh"));
            setPlaceholder("#baits", t("add.baitsPh"));
            setPlaceholder("#notes", t("add.notesPh"));
            break;
        }
        case "logbook":
            document.title = `${t("nav.logbook")} | Fishing Logbook`;
            setText(".card h1", t("logbook.title"));
            setText(".card > p", t("logbook.subtitle"));
            setText("#toggleFilterPanel", `🔍 ${t("logbook.search")}`);
            {
                const toggleBtn = document.getElementById("toggleFilterPanel");
                if (toggleBtn) {
                    toggleBtn.setAttribute("title", t("logbook.searchToggle"));
                    toggleBtn.setAttribute("aria-label", t("logbook.searchToggle"));
                }
            }
            setText('label[for="filterDateFrom"]', t("logbook.dateFrom"));
            setText('label[for="filterDateTo"]', t("logbook.dateTo"));
            setText('label[for="filterPlace"]', t("logbook.place"));
            setText('label[for="filterFishType"]', t("logbook.fishType"));
            setText('label[for="filterFishMin"]', t("logbook.fishMin"));
            setText('label[for="filterFishMax"]', t("logbook.fishMax"));
            setText('label[for="filterWeightMin"]', `${t("logbook.weightMin")} (${t(`unit.${currentWeightUnit}`)})`);
            setText('label[for="filterWeightMax"]', `${t("logbook.weightMax")} (${t(`unit.${currentWeightUnit}`)})`);
            setText('#filterForm button[type="submit"]', t("logbook.apply"));
            setText("#clearFilters", t("logbook.clear"));
            setText(".card-head h2", t("logbook.results"));
            setText("#logbookDetailTitle", t("details.title"));
            setText("#closeLogbookDetails", t("common.close"));
            setPlaceholder("#filterPlace", t("logbook.placePh"));
            setPlaceholder("#filterFishType", t("logbook.fishTypePh"));
            break;
        case "catch-details":
            document.title = `${t("details.title")} | Fishing Logbook`;
            setText(".card-head h1", t("details.title"));
            setText(".card-head .btn", t("details.back"));
            break;
        case "places":
            document.title = `${t("nav.places")} | Fishing Logbook`;
            {
                const mode = new URLSearchParams(window.location.search).get("mode") === "wishlist" ? "wishlist" : "fished";
                setText("#placeSearchToggleBtn", `🔍 ${t("places.search")}`);
                setText("#placeAddToggleBtn", `+ ${t("places.addAction")}`);
                setText("#placeSearchBtn", `🔍 ${t("places.search")}`);
                setPlaceholder("#placeSearchInput", t("places.searchPh"));
                setText("#placesModeTitle", mode === "wishlist" ? t("places.wishlistModeTitle") : t("places.fishedModeTitle"));
                setText("#recommendedEditorTitle", mode === "wishlist" ? t("places.editorWishlist") : t("places.editorFished"));
                setText('label[for="recommendedPlaceName"]', t("places.recommendedName"));
                setText('label[for="recommendedPlaceInfo"]', t("places.recommendedInfo"));
                setText('label[for="recommendedPlaceLink"]', t("places.recommendedLink"));
                setText('label[for="recommendedPlaceImages"]', t("places.recommendedPhotos"));
                setText("#recommendedSaveBtn", t("places.recommendedSave"));
                setText("#recommendedDeleteBtn", t("places.recommendedDelete"));
                setText("#recommendedClearBtn", t("places.recommendedClear"));
                setPlaceholder("#recommendedPlaceInfo", t("places.recommendedInfoPh"));
                setPlaceholder("#recommendedPlaceLink", t("places.recommendedLinkPh"));
                const searchToggle = document.getElementById("placeSearchToggleBtn");
                if (searchToggle instanceof HTMLButtonElement) {
                    searchToggle.setAttribute("aria-label", t("places.search"));
                    searchToggle.setAttribute("title", t("places.search"));
                }
                const addToggle = document.getElementById("placeAddToggleBtn");
                if (addToggle instanceof HTMLButtonElement) {
                    addToggle.setAttribute("aria-label", t("places.addAction"));
                    addToggle.setAttribute("title", t("places.addAction"));
                }
            }
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
