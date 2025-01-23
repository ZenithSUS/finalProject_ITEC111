document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = parseInt(urlParams.get('id'));

    if(isNaN(messageId)) {
        window.location.href = `index.html`;
    }

    displayMessage(messageId);

    // Close the message
    document.querySelector('.close-button').addEventListener('click', () => {
        window.location.href = `index.html`;
    });

    // Open the decryption modal
    document.querySelector('#decrypt-button').addEventListener('click', () => {
        document.getElementById('decrypt-modal').style.display = 'block';
    });

    // Add an event when the user press enter in unlocking message
    document.querySelector('#decrypt-modal').addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            document.querySelector('#decrypt-modal #decrypt-button').click();
        }
    });

    // Decrypt the message
    document.querySelector('#decrypt-modal #decrypt-button').addEventListener('click', () => {
        const otp = document.getElementById('otp').value.trim();
        const message = getMessagesById(messageId);
        if(otp !== message.otp) {
            showMesage('Wrong OTP');
            return;
        }
        const decryptedMessage = otpDecryptCipher(message.message, otp);
        document.querySelector('#decrypt-modal').style.display = 'none';
        showMesage(`Decrypted Message: ${decryptedMessage}`);
        updateMessage(decryptedMessage, messageId);

        document.getElementById('otp').value = '';
        // Display the new ciphertext and otp
        const newMessage = getMessagesById(messageId);
        document.getElementById('message-text').innerHTML = `Ciphered Message: ${newMessage.message}`;
        document.getElementById('otp-text').innerHTML = `OTP: ${newMessage.otp}`;
        document.getElementById('date-text').innerHTML = `Date Created: ${DateFormat(newMessage.date)}`;
        console.log(newMessage);
    });

    // Close the modal in decryption process
    document.querySelector('#decrypt-modal #close-button').addEventListener('click', () => {
        document.getElementById('decrypt-modal').style.display = 'none';
        document.getElementById('otp').value = '';
    });
});