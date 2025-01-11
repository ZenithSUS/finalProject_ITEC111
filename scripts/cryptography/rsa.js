// Function to compute the greatest common divisor
function gcd(a, b) {
    // Euclidean algorithm
    // If b is zero then return a
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to compute the modular inverse
function modInverse(e, phi) {
    /* Extended Euclidean algorithm
        the m0 is the inverse
        the x0 is the modular inverse
    */
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    // If phi is not prime
    if (phi === 1) return 0;

    // If phi is prime
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    // If x1 is negative then make it positive by adding m0 to it
    if (x1 < 0) x1 += m0;

    return x1;
}

// Function to perform modular exponentiation
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    // If exp is negative, make it positive
    while (exp > 0) {
        // If exp is odd then multiply base with result and then divide by mod
        if (exp % 2 === 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Function to generate RSA keys
function generateRSAKeys() {
    const p = 3557; // Higher prime number
    const q = 2579; // Higher prime number
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Choose an e that is relatively prime to phi
    let e = 3;

    // Ensure that e is relatively prime to phi
    while (gcd(e, phi) !== 1) {
        e += 2;
    }

    // Compute the modular inverse of e
    const d = modInverse(e, phi);

    // Export the public and private keys
    // Public key: (e, n)
    // Private key: (d, n)
    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

// Function to encrypt a message
function encrypt(message, publicKey) {
    // Extract e and n from the public key
    const { e, n } = publicKey;
    // Convert the message to an array of character codes
    const messageCode = message.split('').map(char => char.charCodeAt(0));
    const encryptedMessage = messageCode.map(m => modExp(m, e, n));
    return encryptedMessage;
}

// Function to decrypt a message
function decrypt(encryptedMessage, privateKey) {
    // Extract d and n from the private key
    const { d, n } = privateKey;
    // Convert the encrypted message to an array of character codes
    const decryptedMessage = encryptedMessage.map(c => modExp(c, d, n));
    // Convert the array of character codes to a string
    return String.fromCharCode(...decryptedMessage);
}

// Generate RSA keys and export them
const { publicKey, privateKey } = generateRSAKeys();