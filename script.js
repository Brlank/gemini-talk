document.addEventListener('DOMContentLoaded', function() {
    let counter = 0;
    const counterDisplay = document.getElementById('counter');
    const increaseButton = document.getElementById('increaseButton');

    increaseButton.addEventListener('click', function() {
        counter++;
        counterDisplay.textContent = counter;
    });
});
