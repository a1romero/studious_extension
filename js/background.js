'use strict';

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('Alarm triggered: ', alarm.name);
    chrome.notifications.create({
    type: "basic",
    iconUrl: "http://www.google.com/favicon.ico",
    title: "Pay attention!",
    message: "Smile and nod, smile and nod... even if you don't get it",
    priority: 1
    }, function(notificationId) {
        console.log("Notification created with ID: ", notificationId);
    });
});

// test code
chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/award.png"),
    title: "Test Notification",
    message: "This is a test notification to check if it's working.",
    priority: 1
});

// alarm on extension install
chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed. Creating alarm...');
    chrome.alarms.create('testAlarm', { delayInMinutes: 0.1 });  // Alarm triggers in 6 seconds
});

// listen for messages 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setAlarm') {
        const alarmTime = request.time; // Time in seconds
        chrome.alarms.create('reminderAlarm', { delayInMinutes: alarmTime / 60 }); // Set the alarm
        sendResponse({ status: 'Alarm set for ' + (alarmTime / 60) + ' minutes.' });
    }
});