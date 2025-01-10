const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userInfo');
        window.location.href = `auth/login.html?message=${"Logged out successfully!"}`;
    }
});