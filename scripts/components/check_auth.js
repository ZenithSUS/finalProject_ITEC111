const userInfo = localStorage.getItem('userInfo');
const user = JSON.parse(userInfo);

if (userInfo) {
    const authContainer = document.querySelector('.user-auth');
    const h2 = document.createElement('h2');
    h2.textContent = `Welcome, ${user.username}`;
    authContainer.appendChild(h2);;
} else {
    window.location.href = `auth/login.html`;
}