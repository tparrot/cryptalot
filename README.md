# Cryptalot - Cryptography Tools

Cryptalot is a lightweight, client-side cryptography tool that allows users to encrypt and decrypt data using AES-256-GCM and AES-256-CBC algorithms. All operations are performed entirely in the browser, ensuring that no data is sent to any server.

## Features

- **AES-256-GCM Encryption/Decryption**:
  - Encrypt and decrypt data using the AES-256-GCM algorithm.
  - Automatically generates a random salt and IV for each encryption.
  - Outputs encryption results in a JSON structure containing `salt`, `iv`, and `ciphertext`.

- **AES-256-CBC Encryption/Decryption**:
  - Encrypt and decrypt data using the AES-256-CBC algorithm.
  - Automatically generates a random salt and IV for each encryption.
  - Outputs encryption results in a JSON structure containing `salt`, `iv`, and `ciphertext`.

- **Client-Side Only**:
  - All cryptographic operations are performed in the browser.
  - No data is sent to any server, ensuring complete privacy.

- **User-Friendly Interface**:
  - Simple and intuitive web interface for encryption and decryption.
  - Supports file uploads for input data.
  - Provides options to copy or download the output data.

## How It Works

1. **Encryption**:
   - Enter the data to encrypt in the input field.
   - Provide a passphrase for encryption.
   - Click the "Encrypt" button to generate the encrypted JSON output.

2. **Decryption**:
   - Paste the encrypted JSON data into the input field.
   - Provide the same passphrase used for encryption.
   - Click the "Decrypt" button to retrieve the original data.

3. **File Upload**:
   - Use the file upload option to load input data from a file.

4. **Output Options**:
   - Copy the output data to the clipboard.
   - Download the output data as a file.

## JSON Encryption Output Structure

The encryption output is a JSON object with the following structure:

```json
{
  "salt": "Base64-encoded salt",
  "iv": "Base64-encoded initialization vector",
  "ciphertext": "Base64-encoded encrypted data"
}
```

## Project Structure

```
/cryptalot
├── encrypt-gcm.html       # AES-256-GCM encryption page
├── decrypt-gcm.html       # AES-256-GCM decryption page
├── encrypt-cbc.html       # AES-256-CBC encryption page
├── decrypt-cbc.html       # AES-256-CBC decryption page
├── index.html             # Main landing page with links to tools
├── scripts/
│   ├── encrypt.js         # Generic encryption logic
│   ├── decrypt.js         # Generic decryption logic
│   ├── crypto-gcm.js      # AES-256-GCM cryptographic logic
│   ├── crypto-cbc.js      # AES-256-CBC cryptographic logic
│   ├── ui-handler.js      # UI utility functions
│   ├── crypto-utils.js    # Placeholder for additional utilities
└── styles/                # (Optional) CSS styles
```

## Security and Privacy

- **Client-Side Only**: All cryptographic operations are performed in the browser. No data is sent to any server.
- **Randomized Salt and IV**: Each encryption operation generates a unique salt and IV for enhanced security.
- **Passphrase-Based Encryption**: The passphrase is used to derive the encryption key, ensuring that only users with the correct passphrase can decrypt the data.

## Getting Started

1. Clone the repository or download the project files.
2. Open `index.html` in your browser.
3. Select the desired encryption or decryption tool.
4. Follow the instructions on the tool's page.

## Supported Algorithms

- **AES-256-GCM**: Recommended for most use cases due to its authenticated encryption.
- **AES-256-CBC**: Supported for compatibility with legacy systems.

## Browser Compatibility

Cryptalot uses the Web Crypto API, which is supported in modern browsers. Ensure you are using one of the following:

- Google Chrome (v37+)
- Mozilla Firefox (v34+)
- Microsoft Edge (v12+)
- Safari (v11+)

## Disclaimer

Cryptalot is provided as-is, without any warranty. Use it at your own risk. While the tool is designed to be secure, it is not intended for highly sensitive or mission-critical data.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

Enjoy secure, client-side cryptography with Cryptalot!
