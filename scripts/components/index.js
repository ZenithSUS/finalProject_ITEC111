document.addEventListener('DOMContentLoaded', () => {
    displayMessages();

    // Add event listener to view messages button
    const viewMessagesButton = document.querySelectorAll('.open-button');

    if(viewMessagesButton) {
        viewMessagesButton.forEach(button => button.addEventListener('click', () => {
            const messageId = button.getAttribute('data-id');
            window.location.href = `message.html?id=${messageId}`;
        }));
    }
});