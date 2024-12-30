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