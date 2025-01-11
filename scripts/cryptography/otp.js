// Define the letters and their length
const letters = "abcdefghijklmnopqrstuvwxyz";
const letter_length = letters.length;

// Function to generate a random OTP
const generateOTP = (length) => {
    let otp = '';
    // Loop through the length of the OTP
    for (let i = 0; i < length; i++) {
        // Generate a random letter
        otp += letters[Math.floor(Math.random() * letter_length)];
    }
    return otp;
};

// Function to encrypt a message
const otpEncryptCipher = (plaintext, otp) => {
    // Check if the plaintext and OTP are the same length
    if ((plaintext.length != otp.length) || plaintext === '') {
        return;
    }
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        if (letters.includes(char.toLowerCase())) {
            // Get the index of the character in the letters string and add the OTP index
            const plainIndex = letters.indexOf(char.toLowerCase());
            const otpIndex = letters.indexOf(otp[i]);
            const cipherIndex = (plainIndex + otpIndex) % letter_length;
            // Check if the character is uppercase or lowercase
            ciphertext += char === char.toUpperCase() ? letters[cipherIndex].toUpperCase() : letters[cipherIndex];
        } else {
            // If the character is not a letter, just add it to the ciphertext
            ciphertext += char;
        }
    }
    return ciphertext;
};

// Function to decrypt a message
const otpDecryptCipher = (ciphertext, otp) => {
    if ((ciphertext.length != otp.length) || ciphertext === '') {
        return;
    }
    let plaintext = '';
    // Loop through each character in the ciphertext
    for (let i = 0; i < ciphertext.length; i++) {
        // Check if the character is a letter
        const char = ciphertext[i];
        if (letters.includes(char.toLowerCase())) {
            // Get the index of the character in the letters string and subtract the OTP index
            const cipherIndex = letters.indexOf(char.toLowerCase());
            const otpIndex = letters.indexOf(otp[i]);
            const plainIndex = (cipherIndex - otpIndex + letter_length) % letter_length;
            // Check if the character is uppercase or lowercase
            plaintext += char === char.toUpperCase() ? letters[plainIndex].toUpperCase() : letters[plainIndex];
        } else {
            // If the character is not a letter, just add it to the plaintext
            plaintext += char;
        }
    }
    return plaintext;
};