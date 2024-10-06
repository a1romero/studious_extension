document.getElementById("start").addEventListener("click", () => { // find start button in the popup.html and wait for a click
    console.log("Start pressed")
    const interval = parseFloat(document.getElementById("interval").value); // find interval info and put its value into a variable
    if (interval > 0){
        chrome.runtime.sendMessage({action: "startReminder", interval}); // send a message that the service worker should notice
    }
});

document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({action: "stopReminder"}); // send a message with stopReminders
});

chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("../icons/48.png"), // get static path to relative URL
    title: "Welcome",
    message: "Make sure to add a notification!",
    priority: 1 
});