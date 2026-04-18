const STORAGE = {
    users: "flb_users",
    currentUser: "flb_current_user",
    catches: "flb_catches",
    seeded: "flb_seeded",
    language: "flb_language"
};

const PUBLIC_PAGES = new Set(["index", "login", "register"]);
const SUPPORTED_LANGUAGES = new Set(["en", "hu"]);

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
        "nav.lang": "Language",
        "index.kicker": "Personal angling tracker",
        "index.title": "Track every catch, place and fishing memory",
        "index.text": "Register or login to add new fishing experiences, browse your logbook, and review catches by place with full details.",
        "index.openDashboard": "Open Dashboard",
        "index.addResult": "Add New Result",
        "login.title": "Login",
        "login.subtitle": "Access your fishing dashboard.",
        "login.email": "Email",
        "login.password": "Password",
        "login.button": "Login",
        "login.noAccount": "No account yet?",
        "login.registerHere": "Register here",
        "register.title": "Register",
        "register.subtitle": "Create your personal fishing logbook account.",
        "register.username": "Username",
        "register.email": "Email",
        "register.password": "Password",
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
        "add.placeInputType": "Place input type",
        "add.placeNameOption": "Place name",
        "add.placeLinkOption": "Place link",
        "add.placeName": "Place name",
        "add.placeNamePh": "Example: Edinburgh, Union Canal",
        "add.placeLink": "Place link",
        "add.placeLinkPh": "https://example.com/fishing-spot",
        "add.fishCount": "Caught fish count",
        "add.fishDetails": "Fish details (type + weight)",
        "add.addFishRow": "Add fish row",
        "add.uploadPhotos": "Upload photos",
        "add.notes": "Notes",
        "add.notesPh": "What happened on this fishing trip?",
        "add.save": "Save fishing result",
        "add.providePlaceName": "Please provide a place name.",
        "add.providePlaceLink": "Please provide a place link.",
        "add.addFishDetail": "Add at least one fish detail row.",
        "add.saved": "Fishing result saved successfully.",
        "add.fishType": "Fish type",
        "add.weight": "Weight (kg)",
        "add.remove": "Remove",
        "logbook.title": "Fishing logbook",
        "logbook.subtitle": "Filter by date, place, caught fish count and fish weight.",
        "logbook.dateFrom": "Date from",
        "logbook.dateTo": "Date to",
        "logbook.place": "Place",
        "logbook.placePh": "Example: Edinburgh",
        "logbook.fishMin": "Min fish count",
        "logbook.fishMax": "Max fish count",
        "logbook.weightMin": "Min fish weight (kg)",
        "logbook.weightMax": "Max fish weight (kg)",
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
        "details.caughtCount": "Caught fish count",
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
        "places.logCount": "{count} log(s) | Largest fish {weight} kg",
        "common.unknownPlace": "Unknown place",
        "common.date": "Date",
        "common.caughtFish": "Caught fish",
        "common.largestFish": "Largest fish",
        "common.openDetails": "Open details"
    },
    hu: {
        "nav.dashboard": "Kezdolap",
        "nav.addExperience": "Uj elmeny",
        "nav.logbook": "Horgasznaplo",
        "nav.places": "Helyszinek",
        "nav.logout": "Kijelentkezes",
        "nav.home": "Fooldal",
        "nav.login": "Belepes",
        "nav.register": "Regisztracio",
        "nav.lang": "Nyelv",
        "index.kicker": "Szemelyes horgasz nyilvantarto",
        "index.title": "Rogzits minden fogast, helyszint es horgasz emleket",
        "index.text": "Regisztralj vagy lepjel be, hogy uj horgaszati elmenyeket adj hozza, szurd a naplodat, es nezd at a helyszinek adatait teljes reszletekkel.",
        "index.openDashboard": "Kezdolap megnyitasa",
        "index.addResult": "Uj eredmeny rogzitese",
        "login.title": "Belepes",
        "login.subtitle": "Lepj be a horgasz iranyitopultodra.",
        "login.email": "Email",
        "login.password": "Jelszo",
        "login.button": "Belepes",
        "login.noAccount": "Nincs fiokod?",
        "login.registerHere": "Regisztralj itt",
        "register.title": "Regisztracio",
        "register.subtitle": "Hozd letre a sajat horgasznaplo fiokodat.",
        "register.username": "Felhasznalonev",
        "register.email": "Email",
        "register.password": "Jelszo",
        "register.button": "Fiok letrehozasa",
        "register.already": "Mar regisztraltal?",
        "register.login": "Belepes",
        "dashboard.welcome": "Udvozollek, {name}",
        "dashboard.choose": "Valaszd ki, mit szeretnel kezelni a horgasznaplodban.",
        "dashboard.card.addTitle": "Uj horgaszati elmeny",
        "dashboard.card.addText": "Rogzitsd a helyszint, hal adatokat, fotokat es jegyzetet.",
        "dashboard.card.logbookTitle": "Horgasznaplo",
        "dashboard.card.logbookText": "Keress es szurj datum, helyszin es suly szerint.",
        "dashboard.card.placesTitle": "Helyszinek",
        "dashboard.card.placesText": "Nezd at az osszes helyszint, es nyisd meg a teljes naplokat.",
        "dashboard.card.caughtTitle": "Kifogott halak",
        "dashboard.card.caughtText": "Bongeszd a halfajokat, darabszamokat es max sulyt.",
        "dashboard.recent": "Legutobbi fogasok",
        "dashboard.openFull": "Teljes naplo megnyitasa",
        "dashboard.noCatches": "Meg nincs fogas. Kezdd egy uj horgaszati eredmeny rogzitesével.",
        "add.title": "Uj horgaszati elmeny rogzitese",
        "add.subtitle": "Mentsd el a teljes eredmenyt: helyszin, halszam, hal adatok, fotok es jegyzet.",
        "add.date": "Datum",
        "add.placeInputType": "Helyszin megadasa",
        "add.placeNameOption": "Helyszin neve",
        "add.placeLinkOption": "Helyszin link",
        "add.placeName": "Helyszin neve",
        "add.placeNamePh": "Pelda: Edinburgh, Union Canal",
        "add.placeLink": "Helyszin link",
        "add.placeLinkPh": "https://pelda.hu/horgasz-helyszin",
        "add.fishCount": "Kifogott halak szama",
        "add.fishDetails": "Hal adatok (tipus + suly)",
        "add.addFishRow": "Hal sor hozzaadasa",
        "add.uploadPhotos": "Fotok feltoltese",
        "add.notes": "Jegyzet",
        "add.notesPh": "Mi tortent ezen a horgaszaton?",
        "add.save": "Horgaszati eredmeny mentese",
        "add.providePlaceName": "Add meg a helyszin nevet.",
        "add.providePlaceLink": "Add meg a helyszin linkjet.",
        "add.addFishDetail": "Adj hozza legalabb egy hal sort.",
        "add.saved": "A horgaszati eredmeny sikeresen elmentve.",
        "add.fishType": "Hal tipusa",
        "add.weight": "Suly (kg)",
        "add.remove": "Torles",
        "logbook.title": "Horgasznaplo",
        "logbook.subtitle": "Szures datum, helyszin, kifogott halak szama es hal suly alapjan.",
        "logbook.dateFrom": "Datum tol",
        "logbook.dateTo": "Datum ig",
        "logbook.place": "Helyszin",
        "logbook.placePh": "Pelda: Edinburgh",
        "logbook.fishMin": "Minimum halszam",
        "logbook.fishMax": "Maximum halszam",
        "logbook.weightMin": "Minimum hal suly (kg)",
        "logbook.weightMax": "Maximum hal suly (kg)",
        "logbook.apply": "Szurok alkalmazasa",
        "logbook.clear": "Szurok torlese",
        "logbook.results": "Talalatok",
        "logbook.resultCount": "{count} talalat",
        "logbook.noMatch": "Nincs olyan fogas, ami megfelel a szuroknek.",
        "details.title": "Fogas reszletek",
        "details.back": "Vissza a naplohoz",
        "details.missingId": "Hianyzo fogas azonosito.",
        "details.notFound": "A fogas nem talalhato.",
        "details.date": "Datum",
        "details.place": "Helyszin",
        "details.caughtCount": "Kifogott halak szama",
        "details.largest": "Legnagyobb hal",
        "details.fishList": "Halfaj lista",
        "details.photos": "Fotok",
        "details.notes": "Jegyzet",
        "details.noPhotos": "Nincsenek feltoltott fotok.",
        "details.noNotes": "Nincs megjegyzes.",
        "details.type": "Tipus",
        "details.weight": "Suly",
        "places.title": "Horgasz helyszinek",
        "places.subtitle": "Kattints egy helyszinre, es nezd meg az ottani teljes naplobejegyzeseket.",
        "places.select": "Valassz helyszint",
        "places.noPlaces": "Meg nincs helyszin. Rogzits elobb egy horgaszati elmenyt.",
        "places.logsFor": "Naplok itt: {place}",
        "places.noLogs": "Ehhez a helyszinhez nincs naplo.",
        "places.logCount": "{count} naplo | Legnagyobb hal {weight} kg",
        "common.unknownPlace": "Ismeretlen helyszin",
        "common.date": "Datum",
        "common.caughtFish": "Kifogott halak",
        "common.largestFish": "Legnagyobb hal",
        "common.openDetails": "Reszletek"
    }
};

let currentLanguage = getLanguage();

document.addEventListener("DOMContentLoaded", () => {
    seedDemoData();

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
            initRegister();
            break;
        case "login":
            initLogin();
            break;
        case "dashboard":
            initDashboard(user);
            break;
        case "add-catch":
            initAddCatch(user);
            break;
        case "logbook":
            initLogbook(user);
            break;
        case "catch-details":
            initCatchDetails(user);
            break;
        case "places":
            initPlaces(user);
            break;
        default:
            break;
    }
});

function seedDemoData() {
    if (localStorage.getItem(STORAGE.seeded)) {
        return;
    }

    const catches = readStorage(STORAGE.catches, []);
    const demoRecord = {
        id: crypto.randomUUID(),
        userId: "demo-user",
        date: "2026-03-24",
        placeType: "name",
        placeName: "Edinburgh - Union Canal",
        placeLink: "",
        fishCount: 3,
        fishItems: [
            { type: "Pike", weight: 4.2 },
            { type: "Perch", weight: 1.3 },
            { type: "Trout", weight: 2.1 }
        ],
        imageData: [],
        notes: "Windy afternoon, near old bridge.",
        createdAt: new Date().toISOString()
    };

    catches.push(demoRecord);
    writeStorage(STORAGE.catches, catches);
    localStorage.setItem(STORAGE.seeded, "true");
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
        nav.innerHTML = [
            `<a href="dashboard.html">${t("nav.dashboard")}</a>`,
            `<a href="add-catch.html">${t("nav.addExperience")}</a>`,
            `<a href="my-cathches.html">${t("nav.logbook")}</a>`,
            `<a href="places.html">${t("nav.places")}</a>`,
            `<button type="button" class="btn-link" id="logoutBtn">${t("nav.logout")}</button>`,
            renderLanguageSwitch()
        ].join("");

        const logout = document.getElementById("logoutBtn");
        if (logout) {
            logout.addEventListener("click", () => {
                localStorage.removeItem(STORAGE.currentUser);
                window.location.href = "index.html";
            });
        }
    } else {
        nav.innerHTML = [
            `<a href="index.html">${t("nav.home")}</a>`,
            `<a href="login.html">${t("nav.login")}</a>`,
            `<a href="register.html">${t("nav.register")}</a>`,
            renderLanguageSwitch()
        ].join("");
    }

    const langButtons = nav.querySelectorAll(".lang-btn");
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
            `<a class="btn btn-primary" href="login.html">${t("nav.login")}</a>`,
            `<a class="btn btn-secondary" href="register.html">${t("nav.register")}</a>`
        ].join("");
    }
}

function initRegister() {
    const form = document.getElementById("registerForm");
    const msg = document.getElementById("registerMessage");

    if (!form || !msg) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const username = String(formData.get("username") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();

        const users = readStorage(STORAGE.users, []);
        const alreadyExists = users.some((u) => u.email === email);

        if (alreadyExists) {
            setMessage(msg, t("register.alreadyExists", { fallback: "This email is already registered." }), false);
            return;
        }

        const newUser = {
            id: crypto.randomUUID(),
            username,
            email,
            password
        };

        users.push(newUser);
        writeStorage(STORAGE.users, users);
        localStorage.setItem(STORAGE.currentUser, JSON.stringify({ id: newUser.id, username: newUser.username, email: newUser.email }));

        setMessage(msg, t("register.success", { fallback: "Registration successful. Redirecting..." }), true);
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 600);
    });
}

function initLogin() {
    const form = document.getElementById("loginForm");
    const msg = document.getElementById("loginMessage");

    if (!form || !msg) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();

        const users = readStorage(STORAGE.users, []);
        const found = users.find((u) => u.email === email && u.password === password);

        if (!found) {
            setMessage(msg, t("login.invalid", { fallback: "Invalid email or password." }), false);
            return;
        }

        localStorage.setItem(STORAGE.currentUser, JSON.stringify({ id: found.id, username: found.username, email: found.email }));
        setMessage(msg, t("login.success", { fallback: "Login successful. Redirecting..." }), true);

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    });
}

function initDashboard(user) {
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

    const catches = getUserCatches(user.id).slice(0, 4);

    if (catches.length === 0) {
        recent.innerHTML = `<article class="list-item"><p>${t("dashboard.noCatches")}</p></article>`;
        return;
    }

    recent.innerHTML = catches.map((item) => renderCatchCard(item, true)).join("");
}

function initAddCatch(user) {
    if (!user) {
        return;
    }

    const form = document.getElementById("catchForm");
    const fishRows = document.getElementById("fishRows");
    const addFishRowBtn = document.getElementById("addFishRow");
    const msg = document.getElementById("catchMessage");
    const dateInput = document.getElementById("catchDate");
    const imageInput = document.getElementById("catchImages");
    const imagePreview = document.getElementById("imagePreview");

    if (!form || !fishRows || !addFishRowBtn || !msg || !dateInput || !imageInput || !imagePreview) {
        return;
    }

    dateInput.value = new Date().toISOString().slice(0, 10);
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

    imageInput.addEventListener("change", () => {
        renderImagePreviews(imageInput.files, imagePreview);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const placeType = String(data.get("placeType") || "name");
        const placeName = String(data.get("placeName") || "").trim();
        const placeLink = String(data.get("placeLink") || "").trim();

        if (placeType === "name" && !placeName) {
            setMessage(msg, t("add.providePlaceName"), false);
            return;
        }

        if (placeType === "link" && !placeLink) {
            setMessage(msg, t("add.providePlaceLink"), false);
            return;
        }

        const fishItems = collectFishRows(fishRows);
        if (fishItems.length === 0) {
            setMessage(msg, t("add.addFishDetail"), false);
            return;
        }

        const imageData = await filesToBase64(Array.from(imageInput.files || []));
        const fishCount = Number(data.get("fishCount") || 0);

        const newCatch = {
            id: crypto.randomUUID(),
            userId: user.id,
            date: String(data.get("catchDate") || "").trim(),
            placeType,
            placeName,
            placeLink,
            fishCount,
            fishItems,
            imageData,
            notes: String(data.get("notes") || "").trim(),
            createdAt: new Date().toISOString()
        };

        const catches = readStorage(STORAGE.catches, []);
        catches.unshift(newCatch);
        writeStorage(STORAGE.catches, catches);

        setMessage(msg, t("add.saved"), true);
        form.reset();
        dateInput.value = new Date().toISOString().slice(0, 10);
        fishRows.innerHTML = "";
        addFishRow(fishRows);
        imagePreview.innerHTML = "";
    });
}

function initLogbook(user) {
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

    const render = () => {
        const catches = getUserCatches(user.id);
        const filtered = filterCatches(catches, new FormData(form));
        count.textContent = t("logbook.resultCount", { count: filtered.length });

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

function initCatchDetails(user) {
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

    const catches = getUserCatches(user.id);
    const selected = catches.find((item) => item.id === id);

    if (!selected) {
        container.innerHTML = `<p class="message error">${t("details.notFound")}</p>`;
        return;
    }

    const place = selected.placeType === "link"
        ? `<a href="${escapeHtml(selected.placeLink)}" target="_blank" rel="noopener">${escapeHtml(selected.placeLink)}</a>`
        : escapeHtml(selected.placeName);

    const fishRows = selected.fishItems
        .map((fish) => `<tr><td>${escapeHtml(fish.type)}</td><td>${toFixed(fish.weight)} kg</td></tr>`)
        .join("");

    const images = selected.imageData.length
        ? selected.imageData.map((src) => `<img src="${src}" alt="Catch photo" class="thumb">`).join("")
        : `<p>${t("details.noPhotos")}</p>`;

    container.innerHTML = [
        `<div class="detail-grid">`,
        `<p><strong>${t("details.date")}:</strong> ${escapeHtml(selected.date)}</p>`,
        `<p><strong>${t("details.place")}:</strong> ${place}</p>`,
        `<p><strong>${t("details.caughtCount")}:</strong> ${selected.fishCount}</p>`,
        `<p><strong>${t("details.largest")}:</strong> ${toFixed(getLargestWeight(selected))} kg</p>`,
        `</div>`,
        `<h2>${t("details.fishList")}</h2>`,
        `<table class="fish-table"><thead><tr><th>${t("details.type")}</th><th>${t("details.weight")}</th></tr></thead><tbody>${fishRows}</tbody></table>`,
        `<h2>${t("details.photos")}</h2>`,
        `<div class="image-preview">${images}</div>`,
        `<h2>${t("details.notes")}</h2>`,
        `<p>${escapeHtml(selected.notes || t("details.noNotes"))}</p>`
    ].join("");
}

function initPlaces(user) {
    if (!user) {
        return;
    }

    const placesList = document.getElementById("placesList");
    const catchesContainer = document.getElementById("placeCatches");
    const title = document.getElementById("selectedPlaceTitle");

    if (!placesList || !catchesContainer || !title) {
        return;
    }

    const catches = getUserCatches(user.id);
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
            `<p>${t("places.logCount", { count: list.length, weight: toFixed(largest) })}</p>`,
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

function getUserCatches(userId) {
    const catches = readStorage(STORAGE.catches, []);
    const sharedDemo = catches.filter((item) => item.userId === "demo-user");
    const own = catches.filter((item) => item.userId === userId);

    return [...own, ...sharedDemo].sort((a, b) => {
        const aDate = new Date(a.date || a.createdAt).getTime();
        const bDate = new Date(b.date || b.createdAt).getTime();
        return bDate - aDate;
    });
}

function addFishRow(container) {
    const row = document.createElement("div");
    row.className = "fish-row";
    row.innerHTML = [
        `<label>${t("add.fishType")} <input type="text" name="fishType" required></label>`,
        `<label>${t("add.weight")} <input type="number" name="fishWeight" min="0" step="0.01" required></label>`,
        `<button type="button" class="btn btn-danger remove-row">${t("add.remove")}</button>`
    ].join("");

    container.appendChild(row);
}

function collectFishRows(container) {
    const rows = Array.from(container.querySelectorAll(".fish-row"));
    return rows.map((row) => {
        const typeInput = row.querySelector('input[name="fishType"]');
        const weightInput = row.querySelector('input[name="fishWeight"]');

        return {
            type: String(typeInput?.value || "").trim(),
            weight: Number(weightInput?.value || 0)
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
    const weightMin = parseOptionalNumber(formData.get("weightMin"));
    const weightMax = parseOptionalNumber(formData.get("weightMax"));

    return catches.filter((item) => {
        const itemDate = item.date || "";
        const itemPlaceText = `${item.placeName || ""} ${item.placeLink || ""}`.toLowerCase();
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
    const place = item.placeType === "link"
        ? item.placeLink
        : item.placeName;

    const largest = getLargestWeight(item);

    return [
        '<article class="list-item">',
        `<h3>${escapeHtml(place || t("common.unknownPlace"))}</h3>`,
        `<p>${t("common.date")}: ${escapeHtml(item.date || "-")}</p>`,
        `<p>${t("common.caughtFish")}: ${item.fishCount}</p>`,
        `<p>${t("common.largestFish")}: ${toFixed(largest)} kg</p>`,
        compact ? "" : `<a class="btn btn-secondary" href="catch-details.html?id=${encodeURIComponent(item.id)}">${t("common.openDetails")}</a>`,
        '</article>'
    ].join("");
}

function groupByPlace(catches) {
    return catches.reduce((acc, item) => {
        const key = (item.placeType === "link" ? item.placeLink : item.placeName) || t("common.unknownPlace");
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

function renderLanguageSwitch() {
    return [
        `<div class="lang-switch" aria-label="${t("nav.lang")}">`,
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
            setText("#loginForm button", t("login.button"));
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
            setText("#registerForm button", t("register.button"));
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
            setText(".inline-fieldset legend", t("add.placeInputType"));
            const placeOptions = document.querySelectorAll(".inline-fieldset label");
            if (placeOptions[0]) {
                placeOptions[0].lastChild.textContent = ` ${t("add.placeNameOption")}`;
            }
            if (placeOptions[1]) {
                placeOptions[1].lastChild.textContent = ` ${t("add.placeLinkOption")}`;
            }
            setText('label[for="placeName"]', t("add.placeName"));
            setText('label[for="placeLink"]', t("add.placeLink"));
            setText('label[for="fishCount"]', t("add.fishCount"));
            setText(".fish-block h2", t("add.fishDetails"));
            setText("#addFishRow", t("add.addFishRow"));
            setText('label[for="catchImages"]', t("add.uploadPhotos"));
            setText('label[for="notes"]', t("add.notes"));
            setText('#catchForm button[type="submit"]', t("add.save"));
            setPlaceholder("#placeName", t("add.placeNamePh"));
            setPlaceholder("#placeLink", t("add.placeLinkPh"));
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
            setText('label[for="filterWeightMin"]', t("logbook.weightMin"));
            setText('label[for="filterWeightMax"]', t("logbook.weightMax"));
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
