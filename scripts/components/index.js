document.addEventListener('DOMContentLoaded', () => {
    displayMessages();
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const user = JSON.parse(userInfo);
        document.getElementById('usernameDisplay').textContent = user.username;
    } else {
        window.location.href = `auth/login.html`;
    }

    // Add event listener to view messages button
    const viewMessagesButton = document.querySelectorAll('.open-button');

    if(viewMessagesButton) {
        viewMessagesButton.forEach(button => button.addEventListener('click', () => {
            const messageId = button.getAttribute('data-id');
            window.location.href = `message.html?id=${messageId}`;
        }));
    }
});