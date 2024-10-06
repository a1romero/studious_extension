let reminderInterval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // messages sent from the popup html are received
    if (request.action === "startReminder") {
        clearInterval(reminderInterval); // reset
        reminderInterval = setInterval(() => { // reminderInterval is in seconds
            chrome.notifications.create({
                type: "basic",
                iconUrl: chrome.runtime.getURL("../icons/48.png"),
                title: "Pay attention!",
                message: "Or at least pretend to...",
                priority: 1
            });
        console.log("Notification created!")
        }, request.interval * 60 * 1000);
    } else if (request.action === "stopReminder") {
        clearInterval(reminderInterval);
    }
});