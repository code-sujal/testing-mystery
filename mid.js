document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('authCheckbox');
    const enterBtn = document.getElementById('enterBtn');
    const modal = document.getElementById('authModal');
    const mainContent = document.getElementById('mainContent');

    checkbox.addEventListener('change', () => {
        enterBtn.disabled = !checkbox.checked;
    });

    enterBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            modal.style.display = 'none';
            mainContent.style.display = 'block';
        }
    });
});