const form = document.querySelector('#registerForm');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm_password');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');
const confirmPasswordError = document.querySelector('#confirm-password-error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate form fields
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required';
        hasError = true;
    } else {
        usernameError.textContent = '';
    }

    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required';
        hasError = true;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        hasError = true;
    } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordError.textContent = 'Password must contain at least one uppercase letter';
        hasError = true;
    } else {
        passwordError.textContent = '';
    }

    if (confirmPasswordInput.value.trim() === '') {
        confirmPasswordError.textContent = 'Confirm Password is required';
        hasError = true;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        hasError = true;
    } else {
        confirmPasswordError.textContent = '';
    }

    // If no errors, register the user
    if (!hasError) {
        const users = getUsers();
        const newUser = {
            id: users.length + 1,
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };
        // Encrypt the password before storing
        insertUser(newUser);
        form.reset();
        window.location.href = `login.html?message=${"Registered Successfully!"}`;
    }
});

// Clear error messages when input fields change
usernameInput.addEventListener('input', () => {
    usernameError.textContent = '';
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
});

confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordError.textContent = '';
});