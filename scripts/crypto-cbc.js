async function encryptCBC(text, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKeyCBC(passphrase, salt);

    const enc = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv: iv },
        key,
        enc.encode(text)
    );

    return JSON.stringify({
        salt: btoa(String.fromCharCode(...salt)),
        iv: btoa(String.fromCharCode(...iv)),
        ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    });
}

async function decryptCBC(encryptedData, passphrase) {
    const data = JSON.parse(encryptedData);
    const salt = Uint8Array.from(atob(data.salt), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(data.iv), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(data.ciphertext), c => c.charCodeAt(0));

    const key = await deriveKeyCBC(passphrase, salt);
    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: iv },
        key,
        ciphertext
    );

    return new TextDecoder().decode(decryptedBuffer);
}

async function deriveKeyCBC(passphrase, salt) {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(passphrase),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Expose functions globally
window.encryptCBC = encryptCBC;
window.decryptCBC = decryptCBC;
