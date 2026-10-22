const close = document.getElementById("notification-close");
const link = document.querySelector(".notification-link");
const dialog = document.getElementById('myDialog');

close.addEventListener('click', () => {
    link.classList.remove('has-notification');
    dialog.close();
});