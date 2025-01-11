document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);


    if(window.location.href.includes("message=")){
        const message = urlParams.get('message');
        showMesage(message);
        history.replaceState({}, document.title, window.location.pathname);
    }
});


const showMesage = (message) => {
    const notification = document.getElementById('modal-notification');
    const notificationContent = document.getElementById('modal-content');
    notificationContent.innerHTML = `
        <h1>Notification</h1>
        <p>${message}</p>    
    `;
    
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000)
}