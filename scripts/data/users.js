const getUsers = () => {
    let users = []; 

    // Try to load user data from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        // If no data in localStorage, use default data (or fetch from server)
        users = [
            { id: 1, username: "user1", password: encryptColumnarCipher("password1")},
            { id: 2, username : "user2", password: encryptColumnarCipher("password2") }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    return users;
}

const updateUser = (updatedUser) => {
    const userIndex = users.findIndex(user => user.username === updatedUser.username);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User updated:', updatedUser);
    }
}