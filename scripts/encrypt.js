document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const passphraseInput = document.getElementById("passphrase");
    const encryptButton = document.getElementById("encryptButton");
    const fileUpload = document.getElementById("fileUpload");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");
    const downloadButton = document.getElementById("downloadButton");

    setupFileUpload(input, fileUpload);
    setupCopyButton(output, copyButton);
    setupDownloadButton(output, downloadButton, "encrypted.json");

    encryptButton.addEventListener("click", async () => {
        try {
            const encryptionMethod = window.encryptionMethod;
            const encryptedData = await encryptionMethod(input.value, passphraseInput.value);
            output.value = encryptedData;
        } catch (error) {
            alert("Encryption failed: " + error.message);
        }
    });
});
