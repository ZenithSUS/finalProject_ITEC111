document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#loginForm");
    const users = getUsers();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(form.username.value === "" && form.password.value === ""){
            document.getElementById("auth-status").textContent = "Please fill the fields";
            return;
        }

        const username = form.username.value;
        const password = form.password.value
        const foundUser = users.find(user => user.username === username);

        if (foundUser) {
            if(password === decryptColumnarCipher(foundUser.password)) {
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