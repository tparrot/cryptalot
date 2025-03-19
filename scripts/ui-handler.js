function setupFileUpload(inputElement, fileUploadElement) {
    fileUploadElement.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => (inputElement.value = e.target.result);
        reader.readAsText(file);
    });
}

function setupCopyButton(outputElement, copyButton) {
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(outputElement.value);
        alert("Copied to clipboard!");
    });
}

function setupDownloadButton(outputElement, downloadButton, filename) {
    downloadButton.addEventListener("click", () => {
        const blob = new Blob([outputElement.value], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    });
}

function setupRandomizeButton(inputElement, buttonElement, length) {
    buttonElement.addEventListener("click", () => {
        const randomBytes = crypto.getRandomValues(new Uint8Array(length));
        inputElement.value = Array.from(randomBytes)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    });
}

// Expose functions globally
window.setupFileUpload = setupFileUpload;
window.setupCopyButton = setupCopyButton;
window.setupDownloadButton = setupDownloadButton;
window.setupRandomizeButton = setupRandomizeButton;
