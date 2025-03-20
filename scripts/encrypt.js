document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const passphraseInput = document.getElementById("passphrase");
    const encryptButton = document.getElementById("encryptButton");
    const fileUpload = document.getElementById("fileUpload");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");
    const downloadButton = document.getElementById("downloadButton");

    setupFileUpload(input, fileUpload, true); // Enable binary mode for file uploads
    setupCopyButton(output, copyButton);
    setupDownloadButton(output, downloadButton, "encrypted.json");

    encryptButton.addEventListener("click", async () => {
        try {
            if (typeof window.encryptionMethod !== "function") {
                throw new Error("Encryption method is not defined or is not a function.");
            }
            const data = input.fileData || new TextEncoder().encode(input.value); // Use binary data if available
            const encryptedData = await window.encryptionMethod(data, passphraseInput.value);
            output.value = encryptedData;
        } catch (error) {
            alert("Encryption failed: " + error.message);
        }
    });
});
