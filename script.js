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

    const incrementInterval = 5; // Fixed increment interval in minutes
    const difference = targetValue - currentValue;
    const totalMinutes = difference * incrementInterval;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    document.getElementById('output').innerHTML = `<h3>Target Time: ${hours.toString().padStart(2, '0')} Hr(s) ${minutes.toString().padStart(2, '0')} Min(s)</h3>`;
}

function clearForm() {
    document.getElementById('calculator-form').reset();
    document.getElementById('output').innerHTML = '<h3>Target Time: 00 Hr(s) 00 Min(s)</h3>';
}

function closeApp() {
    alert('This is a static webpage. Closing is not applicable.');
}

const themeToggleButton = document.getElementById('theme-toggle');
const footer = document.querySelector('footer');
const container = document.querySelector('.container');
const output = document.querySelector('.output');

themeToggleButton.addEventListener('click', () => {
    console.log('Theme Toggle Button clicked!: ', document.body.classList.contains('dark'));
    const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);

    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    if (document.body.classList.contains('dark')) {
        output.classList.remove('dark');
        output.classList.add('light');
        container.classList.remove('dark');
        container.classList.add('light');
        footer.classList.remove('dark');
        footer.classList.add('light');
        themeToggleButton.classList.remove('light');
        themeToggleButton.classList.add('dark');
    } else {
        output.classList.remove('light');
        output.classList.add('dark');
        container.classList.remove('light');
        container.classList.add('dark');
        footer.classList.remove('light');
        footer.classList.add('dark');
        themeToggleButton.classList.remove('dark');
        themeToggleButton.classList.add('light');
    }
});

document.body.classList.add('dark');
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(savedTheme);
    }
    if (savedTheme==='dark')
    {
        output.classList.remove('dark');
        output.classList.add('light');
        container.classList.remove('dark');
        container.classList.add('light');
        footer.classList.remove('dark');
        footer.classList.add('light');
        themeToggleButton.classList.remove('light');
        themeToggleButton.classList.add('dark');
    } else {
        output.classList.remove('light');
        output.classList.add('dark');
        container.classList.remove('light');
        container.classList.add('dark');
        footer.classList.remove('light');
        footer.classList.add('dark');
        themeToggleButton.classList.remove('dark');
        themeToggleButton.classList.add('light');
    }
});

// Function to update the current time in UTC+7
function updateTime() {
    const currentTimeElement = document.getElementById('current-time'); // Select the time display element
    const now = new Date();

    // Adjust to UTC+7
    const utc7Offset = 7 * 60; // Offset in minutes
    const utc7Time = new Date(now.getTime() + (utc7Offset - now.getTimezoneOffset()) * 60 * 1000);

    // Format time (hh:mm:ss)
    const formattedTime = utc7Time
        .toLocaleTimeString('en-GB', { hour12: false });

    // Display the time
    currentTimeElement.textContent = `Current Time (UTC+7): ${formattedTime}`;
}

// Call updateTime every second
setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();

// range
var slider = document.getElementById("myRange");
var demo = document.getElementById("demo");
demo.innerHTML = slider.value;

slider.oninput = function () {
    demo.innerHTML = this.value;
}