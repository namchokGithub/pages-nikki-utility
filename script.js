//---------------------
// |                 |
// |    Calculate    |
// |                 |
// -------------------
let countdownInterval;
function startCountdown(targetValue, currentValue, incrementInterval) {
    const updateCountdown = () => {
        const difference = targetValue - currentValue;
        const totalSeconds = difference * incrementInterval * 60; // Calculate total seconds

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('.hour-count-down').textContent = '00';
            document.querySelector('.min-count-down').textContent = '00';
            document.querySelector('.sec-count-down').textContent = '00';
            return;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        document.querySelector('.hour-count-down').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.min-count-down').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.sec-count-down').textContent = seconds.toString().padStart(2, '0');
        document.title = `Infinity Nikki Utility | ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        currentValue += incrementInterval / 60;
    };

    clearInterval(countdownInterval); // Clear any existing interval to avoid duplicates
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}
function calculateTargetTime() {
    let currentValue = parseInt(document.getElementById('current-value').value);
    let targetValue = parseInt(document.getElementById('target-value').value);
    // if (isNaN(currentValue) || isNaN(targetValue)) {
    //     alert('Please enter valid numbers.');
    //     return;
    // }
    if (isNaN(currentValue)) {
        currentValue = 0;
    }
    if (isNaN(targetValue)) {
        targetValue = 350;
    }
    document.getElementById("current-value").value = currentValue;
    document.getElementById("target-value").value = targetValue;

    const incrementInterval = 5; // Fixed increment interval in minutes
    const difference = targetValue - currentValue;
    const totalMinutes = difference * incrementInterval;
    const totalSeconds = difference * incrementInterval * 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    document.getElementById('output').innerHTML = `
    <p class="total-time">
        Total Time: [ ${hours.toString().padStart(2, '0')}
        <span class="time-unit">Hr(s)</span>
        ${minutes.toString().padStart(2, '0')}
        <span class="time-unit">Min(s)</span> ]
    </p>
    <h2>
        <span class="hour-count-down">${hours.toString().padStart(2, '0')}</span> <span class="time-unit">Hr(s)</span>
        <span class="min-count-down">${minutes.toString().padStart(2, '0')}</span> <span class="time-unit">Min(s)</span>
        <span class="sec-count-down">${seconds.toString().padStart(2, '0')}</span> <span class="time-unit">Sec(s)</span>
    </h2>
    `;
    clearInterval(countdownInterval);
    startCountdown(totalMinutes, 0, 1);
}
function clearForm() {
    const clearButton = document.getElementById('btn-clear');
    if (clearButton.classList.contains('disabled')) {
        return;
    }
    clearInterval(countdownInterval);
    document.title = "Infinity Nikki Utility";
    document.getElementById('calculator-form').reset();
    document.getElementById('output').innerHTML = `
        <p class="total-time">
            Total Time: [ 00
            <span class="time-unit">Hr(s)</span>
            00
            <span class="time-unit">Min(s)</span> ]
        </p>
        <h2>
            <span class="hour-count-down">00</span> <span class="time-unit">Hr(s)</span>
            <span class="min-count-down">00</span> <span class="time-unit">Min(s)</span>
            <span class="sec-count-down">00</span> <span class="time-unit">Sec(s)</span>
        </h2>
    `;
}
function closeApp() {
    const userChoice = confirm("Are you sure you want to close this tab?");
    if (userChoice) {
        window.close();
    } else {
        alert("Tab closure canceled.");
    }
}

//---------------------
// |                 |
// |  Button Events  |
// |                 |
// -------------------
document.addEventListener('DOMContentLoaded', () => {
    const clearButton = document.getElementById('btn-clear');
    const inputField = document.getElementById('current-value');

    function onCalculateButtonClick() {
        if (inputField.value.trim() === '') {
            clearButton.classList.add('disabled');
        } else {
            clearButton.classList.remove('disabled');
        }
    }

    clearButton.addEventListener('click', onCalculateButtonClick);
});
const rangeInput = document.getElementById('current-value-range');
const clearButton = document.getElementById('btn-clear');
function onRangeChange() {
    if (rangeInput.value === '0' || rangeInput.value === '') {
        clearButton.classList.add('disabled');
    } else {
        clearButton.classList.remove('disabled');
    }
}
rangeInput.addEventListener('change', onRangeChange);
onRangeChange();

//---------------------
// |                 |
// |  Toggle Theme   |
// |                 |
// -------------------
const themeToggleButton = document.getElementById('theme-toggle');
const elementsToToggle = [
    { elements: [document.body], classes: ['dark', 'light'] },
    { elements: document.querySelectorAll('.time-unit'), classes: ['dark', 'light'] },
    { elements: [document.querySelector('.note')], classes: ['dark', 'light'] },
    { elements: [document.querySelector('.output')], classes: ['dark', 'light'] },
    { elements: [document.querySelector('.container')], classes: ['dark', 'light'] },
    { elements: [document.querySelector('footer')], classes: ['dark', 'light'] },
    { elements: [themeToggleButton], classes: ['dark', 'light'] }
];
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    elementsToToggle.forEach(({ elements, classes }) => {
        elements.forEach(element => {
            classes.forEach(cls => element.classList.toggle(cls));
        });
    });
}
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme);

    elementsToToggle.forEach(({ elements, classes }) => {
        elements.forEach(element => {
            if (savedTheme === 'dark') {
                element.classList.remove('light');
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
                element.classList.add('light');
            }
        });
    });
}
themeToggleButton.addEventListener('click', toggleTheme);
window.addEventListener('load', applySavedTheme);

//---------------------
// |                 |
// |  Current time   |
// |                 |
// -------------------
function getTimezoneName() {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'short' });
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
        const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
        return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
    } else {
        return full;
    }
}
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date(); // Automatically uses the user's local timezone
    let formattedTime = now.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
    formattedTime = formattedTime.replace(' am', ' AM').replace(' pm', ' PM');
    currentTimeElement.textContent = `⏲️ Current Time (${getTimezoneName()}): ${formattedTime}`;
}
function startMinuteUpdater() {
    updateTime();
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 60000); // Update every 60 seconds
    }, secondsUntilNextMinute * 1000);
}
startMinuteUpdater();

//---------------------
// |                 |
// |  Input Range    |
// |                 |
// -------------------
var currentRange = document.getElementById("current-value-range");
var currentValue = document.getElementById("current-value");
currentValue.innerHTML = currentRange.value;
currentRange.oninput = function () {
    currentValue.value = currentRange.value;
}
var targetRange = document.getElementById("target-value-range");
var targetValue = document.getElementById("target-value");
targetValue.innerHTML = targetRange.value;
targetRange.oninput = function () {
    targetValue.value = targetRange.value;
}