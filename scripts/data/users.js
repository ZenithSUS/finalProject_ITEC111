// Function to get users from localStorage or initialize with default users
const getUsers = () => {
    let users = []; 

    // Try to load user data from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        // If no data in localStorage, use default data (or fetch from server)
        users = [
            { id: 1, username: "user1", password: "password1" },
            { id: 2, username: "user2", password: "password2" }
        ];
        /* Encrypt passwords before storing and update localStorage
           and use map to encrypt each password then update
        */
        users = users.map(user => ({
            ...user,
            password: encrypt(user.password, publicKey)
        }));
        localStorage.setItem('users', JSON.stringify(users));
    }
    return users;
}

// Function to update a user's information
const updateUser = (updatedUser, newPassword = null) => {
    console.log(updatedUser);
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === updatedUser.username);

    // If the user exists, update their information
    if (userIndex !== -1) {
        // Encrypt the updated password before storing
        updatedUser.password = encrypt(newPassword, publicKey);
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User updated:', updatedUser);
    } else {
        console.log('User not found:', updatedUser.username);
    }
}

// Function to insert a new user
const insertUser = (newUser) => {
    const users = getUsers();
    // Encrypt the password before storing
    newUser.password = encrypt(newUser.password, publicKey);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}