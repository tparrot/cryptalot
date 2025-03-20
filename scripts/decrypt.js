document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const passphraseInput = document.getElementById("passphrase"); // Updated to use passphrase
    const decryptButton = document.getElementById("decryptButton");
    const fileUpload = document.getElementById("fileUpload");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");
    const downloadButton = document.getElementById("downloadButton");

    setupFileUpload(input, fileUpload);
    setupCopyButton(output, copyButton);
    setupDownloadButton(output, downloadButton, "decrypted.txt");

    decryptButton.addEventListener("click", async () => {
        try {
            const decryptionMethod = window.decryptionMethod;
            const decryptedData = await decryptionMethod(input.value, passphraseInput.value); // Use passphrase
            output.value = decryptedData;
        } catch (error) {
            alert("Decryption failed: " + error.message);
        }
    });
});
