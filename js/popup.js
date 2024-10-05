'use strict';

function setAlarm() {
    let minutes = parseFloat($("#time").val()) // the amount of time the user wants
    chrome.alarms.create('reminderAlarm', {
        periodInMinutes: minutes
    })
    window.close()
}

$("submit").click(setAlarm) // submit button sets the alarm

$(document).ready(function() {
    $('#reminderForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const time = parseFloat($('#time').val()); // Get the time value

        if (time > 0 && time <= 59) {
            // Send a message to the background script to set the alarm
            chrome.runtime.sendMessage({ action: 'setAlarm', time: time * 60 }); // Convert minutes to seconds
            alert('Alarm set for ' + time + ' minutes');
        } else {
            alert('Please enter a valid number of minutes (1-59)');
        }
    });
});