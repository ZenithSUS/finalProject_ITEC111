document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#forgotPasswordForm");
    const confirmButton = document.querySelector("#confirm-button");
    const checkUsernameButton = document.querySelector("#check-username-button");
    const changeUsernameButton = document.querySelector("#change-username-button");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirm_password");
    const usernameError = document.querySelector('#username-error');
    const passwordError = document.querySelector('#password-error');
    const confirmPasswordError = document.querySelector('#confirm-password-error');
    
    const generateOtpButton = document.querySelector("#generate-otp-button");
    const resetOtpButton = document.querySelector("#reset-otp-button");
    const otpField = document.querySelector("#otp-field");
    const otpInput = document.querySelector("#otp");
    const otpError = document.querySelector("#otp-error");
    const generatedOtpText = document.querySelector("#generated-otp-text");
    const generatedOtp = document.querySelector("#generated-otp");

    checkUsernameButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Check if the form fields are empty
        if(form.username.value === "") {
            usernameError.textContent = "Please fill the username";
            return;
        }

        const users = getUsers();
        const username = form.username.value.trim();
        const foundUser = users.find(user => user.username === username);

        if (foundUser) {
            checkUsernameButton.hidden = true;
            confirmButton.hidden = false;
            document.getElementById("auth-status").textContent = '';
            document.getElementById("password-field").style.display = "block";
            document.getElementById("confirm-password-field").style.display = "block";
            document.getElementById("button-options").style.display = "block";
            document.getElementById("username").disabled = true;
            otpField.style.display = "block";
            generatedOtp.hidden = true;
            resetOtpButton.style.display = "none";
            generateOtpButton.style.display = "inline-block";
        } else {
            document.getElementById("auth-status").textContent = "User not found";
            return;
        }
    });

    changeUsernameButton.addEventListener('click', () => {
        checkUsernameButton.hidden = false;
        otpField.style.display = "none";
        document.getElementById("button-options").style.display = "none";
        document.getElementById("password-field").style.display = "none";
        document.getElementById("confirm-password-field").style.display = "none";
        document.getElementById("auth-status").textContent = '';
        document.getElementById("username").disabled = false;
        usernameInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPassword = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        let hasError = false;

        if (newPassword.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters";
            hasError = true;
        } else if (!/[A-Z]/.test(newPassword)) {
            passwordError.textContent = "Password must contain at least one uppercase letter";
            hasError = true;
        } else if (!/[a-z]/.test(newPassword)) {
            passwordError.textContent = "Password must contain at least one lowercase letter";
            hasError = true;
        } else if (!/[0-9]/.test(newPassword)) {
            passwordError.textContent = "Password must contain at least one number";
            hasError = true;
        }

        // Check if the new password and confirm password fields are empty
        if (newPassword === "" && confirmPassword === "") {
            passwordError.textContent = "Please enter the new password";
            hasError = true;
        }
        

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match";
            hasError = true;
        }

        // Check if the OTP field is empty
        if (otpInput.value === "") {
            otpError.textContent = "Please enter the OTP";
            hasError = true;
        }

        // Check if the OTP is correct
        if (otpInput.value !== generatedOtpText.textContent) {
            otpError.textContent = "OTP is incorrect";
            hasError = true;
        }

        if(hasError) {
            return;
        }

        // Get the user from the database
        const users = getUsers();
        const username = form.username.value.trim();
        const foundUser = users.find(user => user.username === username);
        console.log(publicKey);

        // Update the user's password
        updateUser(foundUser, newPassword);
        window.location.href = `login.html?message=${"Password reset successfully!"}`;
    });

    generateOtpButton.addEventListener('click', () => {
        const otp = generateOTP(10);
        generatedOtpText.innerHTML = addLinesToOtp(otp);
        generatedOtp.hidden = false;
        generateOtpButton.style.display = "none";
        resetOtpButton.style.display = "inline-block";
    });

    resetOtpButton.addEventListener('click', () => {
        generatedOtp.hidden = true;
        generatedOtpText.innerHTML = "";
        generateOtpButton.style.display = "inline-block";
        resetOtpButton.style.display = "none";
        otpInput.value = "";
        otpError.textContent = "";
    });

    function addLinesToOtp(otp) {
        // Split the OTP into an array of characters
        return otp.split('').map(char => `<span class="otp-char">${char}</span>`).join('');
    }

    // Clear error messages when input fields change
    usernameInput.addEventListener('input', () => {
        usernameError.textContent = '';
        document.getElementById("auth-status").textContent = '';
    });

    passwordInput.addEventListener('input', () => {
        passwordError.textContent = '';
        document.getElementById("auth-status").textContent = '';
    });

    confirmPasswordInput.addEventListener('input', () => {
        confirmPasswordError.textContent = '';
        document.getElementById("auth-status").textContent = '';
    });
});


