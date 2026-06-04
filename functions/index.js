const functions = require("firebase-functions");

exports.verifyRecaptcha = functions.https.onCall(async (data) => {
    const token = String(data?.token || "");
    if (!token) {
        throw new functions.https.HttpsError("invalid-argument", "reCAPTCHA token is missing.");
    }

    const secret = functions.config().recaptcha?.secret;
    if (!secret) {
        throw new functions.https.HttpsError(
            "internal",
            "reCAPTCHA secret key is not configured on the server."
        );
    }

    try {
        const params = new URLSearchParams({ secret, response: token });
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?${params}`,
            { method: "POST" }
        );
        const result = await response.json();
        return { success: Boolean(result.success) };
    } catch {
        throw new functions.https.HttpsError("internal", "reCAPTCHA verification request failed.");
    }
});
