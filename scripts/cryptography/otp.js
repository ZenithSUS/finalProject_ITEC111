const letters = "abcdefghijklmnopqrstuvwxyz";
const letter_length = letters.length;

const generateOTP = (length) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += letters[Math.floor(Math.random() * letter_length)];
    }
    return otp;
};

const otpEncryptCipher = (plaintext, otp) => {
    if ((plaintext.length != otp.length) || plaintext === '') {
        return;
    }
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
        const plainIndex = letters.indexOf(plaintext[i]);
        const otpIndex = letters.indexOf(otp[i]);
        const cipherIndex = (plainIndex + otpIndex) % letter_length;
        ciphertext += letters[cipherIndex];
    }
    return ciphertext;
};

const otpDecryptCipher = (ciphertext, otp) => {
    if ((ciphertext.length != otp.length) || ciphertext === '') {
        return;
    }
    let plaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
        const cipherIndex = letters.indexOf(ciphertext[i]);
        const otpIndex = letters.indexOf(otp[i]);
        const plainIndex = (cipherIndex - otpIndex + letter_length) % letter_length;
        plaintext += letters[plainIndex];
    }
    return plaintext;
};

// Example usage:
// const otp = generateOTP(plaintext.length);
// const encrypted = otpEncryptCipher(plaintext, otp);
// const decrypted = otpDecryptCipher(encrypted, otp);