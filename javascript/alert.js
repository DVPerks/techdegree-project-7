const alertBanner = document.getElementById("alert");

alertBanner.innerHTML =
    `
        <div class="alert-banner">
            <p><strong>Alert:</strong> You have unread messages</p>
            <p class="alert-banner-close">x</p>
        </div>
    `

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none"
    }
});
