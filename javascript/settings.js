const notifications = document.getElementById("notifications");
const publicToggle = document.getElementById("public");
const timezone = document.getElementById("timezones");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

// Function to check if any field is changed/populated and update Cancel button style
function updateCancelButton() {
    const hasChanges = notifications.checked || publicToggle.checked || timezone.selectedIndex > 0;

    if (hasChanges) {
        cancel.classList.remove("button-disabled");
        cancel.classList.add("button-primary");
    } else {
        cancel.classList.remove("button-primary");
        cancel.classList.add("button-disabled");
    }
}

// Load saved settings on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedNotifications = localStorage.getItem("locNotifications");
    if (savedNotifications !== null) {
        notifications.checked = (savedNotifications === "true");
    }

    const savedPublic = localStorage.getItem("locPublic");
    if (savedPublic !== null) {
        publicToggle.checked = (savedPublic === "true");
    }

    const savedTimezone = localStorage.getItem("locTimezone");
    if (savedTimezone) {
        timezone.value = savedTimezone;
    }

    // Check state immediately after loading saved data
    updateCancelButton();
});

// Listen for user changes on form fields
notifications.addEventListener('change', updateCancelButton);
publicToggle.addEventListener('change', updateCancelButton);
timezone.addEventListener('change', updateCancelButton);

// Save settings to localStorage
save.addEventListener('click', () => {
    localStorage.setItem("locNotifications", notifications.checked ? "true" : "false");
    localStorage.setItem("locPublic", publicToggle.checked ? "true" : "false");

    const region = timezone.value;
    if (region && region !== "Select a Timezone") {
        localStorage.setItem("locTimezone", region);
    }

    console.log("Settings saved successfully!");
    updateCancelButton();
});

// Clear local storage and reset form when Cancel is clicked
cancel.addEventListener('click', () => {
    // Prevent action if there are no changes to cancel
    const hasChanges = !notifications.checked || publicToggle.checked || timezone.selectedIndex > 0;
    if (!hasChanges) return;

    // Clear specific settings from localStorage
    localStorage.removeItem("locNotifications");
    localStorage.removeItem("locPublic");
    localStorage.removeItem("locTimezone");

    // Reset form fields back to defaults
    notifications.checked = false;
    publicToggle.checked = false;
    timezone.selectedIndex = 0;
    
    // Revert button class back to disabled
    updateCancelButton();
    
   console.log("Settings cleared and changes discarded.");
});