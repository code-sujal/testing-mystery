document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('authCheckbox');
    const enterBtn = document.getElementById('enterBtn');
    const backBtn = document.getElementById('backBtn'); // New back button
    const modal = document.getElementById('authModal');
    const mainContent = document.getElementById('mainContent');
    const proceedBtn = document.getElementById('proceedBtn');
    const blinkScreen = document.getElementById('blinkScreen');
    const retreat= document.getElementById('retreat');

    retreat.addEventListener('click', () => {
        localStorage.setItem("window", 'false');
        window.location.href = 'welcome.html';
    })
    // Checkbox enables/disables Proceed button
    checkbox.addEventListener('change', () => {
        enterBtn.disabled = !checkbox.checked;
    });

    // Enter button shows main content
    enterBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            modal.style.display = 'none';
            mainContent.style.display = 'block';
        }
    });

    // Back button returns to investigation (welcome.html)
    backBtn.addEventListener('click', () => {
        localStorage.setItem("window", 'false');
        window.location.href = 'welcome.html';
    });

    // Proceed button triggers blinking screen and redirect
    proceedBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent immediate redirect
        blinkScreen.style.display = 'flex'; // Show blinking screen

        // After 3 seconds, fade out and redirect
        setTimeout(() => {
            blinkScreen.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                window.location.href = 'secret_channel.html';
            }, 500); // Wait for fade-out to complete
        }, 3000); // Blink for 3 seconds
    });
});