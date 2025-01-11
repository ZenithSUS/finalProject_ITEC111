document.addEventListener('DOMContentLoaded', () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const user = JSON.parse(userInfo);
        document.getElementById('usernameDisplay').textContent = user.username;
    } else {
        window.location.href = `auth/login.html`;
    }

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

    // Decrypt the message
    document.querySelector('#decrypt-modal #decrypt-button').addEventListener('click', () => {
        const otp = document.getElementById('otp').value.trim();
        const message = getMessagesById(messageId);
        if(otp !== message.otp) {
            showMesage('Wrong OTP');
            return;
        }
        const decryptedMessage = otpDecryptCipher(message.message, otp);
        showMesage(`Decrypted Message: ${decryptedMessage}`);  
    });

    // Close the modal in decryption process
    document.querySelector('#decrypt-modal #close-button').addEventListener('click', () => {
        document.getElementById('decrypt-modal').style.display = 'none';
        document.getElementById('otp').value = '';
    });
});