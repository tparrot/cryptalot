async function encryptGCM(data, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKeyGCM(passphrase, salt);

    const ciphertextChunks = [];
    await processChunksIncrementally(data, async (chunk) => {
        const encryptedChunk = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            chunk
        );
        ciphertextChunks.push(new Uint8Array(encryptedChunk));
    });

    const mergedCiphertext = mergeChunksIncrementally(ciphertextChunks);

    return JSON.stringify({
        salt: btoa(String.fromCharCode(...salt)),
        iv: btoa(String.fromCharCode(...iv)),
        ciphertext: btoa(String.fromCharCode(...mergedCiphertext)), // Base64-encoded ciphertext
    });
}

async function decryptGCM(encryptedData, passphrase) {
    const data = JSON.parse(encryptedData);
    const salt = Uint8Array.from(atob(data.salt), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(data.iv), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(data.ciphertext), c => c.charCodeAt(0));

    const key = await deriveKeyGCM(passphrase, salt);

    const decryptedChunks = [];
    await processChunksIncrementally(ciphertext, async (chunk) => {
        const decryptedChunk = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            chunk
        );
        decryptedChunks.push(new Uint8Array(decryptedChunk));
    });

    const mergedDecryptedData = mergeChunksIncrementally(decryptedChunks);

    return new TextDecoder().decode(mergedDecryptedData);
}

async function deriveKeyGCM(passphrase, salt) {
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
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Expose functions globally
window.encryptGCM = encryptGCM;
window.decryptGCM = decryptGCM;
