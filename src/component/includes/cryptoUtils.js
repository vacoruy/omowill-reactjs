// cryptoUtils.js
import CryptoJS from 'crypto-js';

// Function to encrypt data with a fixed IV
export const encryptData = (data) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRETKEY);
    const iv = CryptoJS.enc.Utf8.parse('fixed_iv_12345678'); // Use a fixed IV

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
};

// Function to decrypt data with a fixed IV
export const decryptData = (ciphertext) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRETKEY);
    const iv = CryptoJS.enc.Utf8.parse('fixed_iv_12345678'); // Use the same fixed IV

    const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
