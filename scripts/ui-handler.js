function setupFileUpload(inputElement, fileUploadElement, isBinary = false) {
    fileUploadElement.addEventListener("change", (event) => {
        const file = event.target.files[0]; // Ensure a file is selected
        if (!file) {
            alert("No file selected. Please upload a valid file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (isBinary) {
                inputElement.fileData = new Uint8Array(e.target.result); // Store binary data
            } else {
                inputElement.value = e.target.result; // Store text data
            }
        };

        if (isBinary) {
            reader.readAsArrayBuffer(file); // Read binary data
        } else {
            reader.readAsText(file); // Read text data
        }
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
        const blob = new Blob([outputElement.value], { type: "application/json" });
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
