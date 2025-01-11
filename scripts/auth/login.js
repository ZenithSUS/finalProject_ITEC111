document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#loginForm");
    const users = getUsers();
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if the form fields are empty
        if(form.username.value === "" && form.password.value === ""){
            document.getElementById("auth-status").textContent = "Please fill the fields";
            return;
        }

        const username = form.username.value.trim();
        const password = form.password.value.trim();
        const foundUser = users.find(user => user.username === username);

        if (foundUser) {
            // Decrypt the stored password and compare with the input password
            if(password === decrypt(foundUser.password, privateKey)) {
                localStorage.setItem('userInfo', JSON.stringify({id: foundUser.id, username: foundUser.username}));
                window.location.href = `../index.html?message=${"Logged in successfully!"}`;
            } else {
                document.getElementById("auth-status").textContent = "Wrong Username or Password";
            }
        } else {
            document.getElementById("auth-status").textContent = "User not found";
        }
    });
});