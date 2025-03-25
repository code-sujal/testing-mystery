// DOM Elements
const mainVideo = document.getElementById('main-video');
const mainFeedLabel = document.getElementById('main-feed-label');
const cameraGrid = document.getElementById('camera-grid');
const alertsList = document.getElementById('alerts-list');
const themeToggle = document.getElementById('theme-toggle');
const layoutToggle = document.getElementById('layout-toggle');
const alertSound = document.getElementById('alert-sound');
const systemTime = document.getElementById('system-time');
const mainFeedTime = document.getElementById('main-feed-time');

// Back button functionality
function goBack() {
    window.history.back();
}

// Update time
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    systemTime.textContent = timeStr;
    mainFeedTime.textContent = timeStr;
}
setInterval(updateTime, 1000);

// Camera swapping
function swapFeed(sideFeed) {
    const mainSource = mainVideo.querySelector('source').src;
    const mainLabel = mainFeedLabel.textContent;
    const mainStatus = document.querySelector('.main-feed .status-indicator').className.includes('online') ? 'online' : 'offline';

    const sideVideo = sideFeed.querySelector('video');
    const sideSource = sideVideo.querySelector('source').src;
    const sideLabel = sideFeed.querySelector('.feed-label').textContent;
    const sideStatus = sideFeed.querySelector('.status-indicator').className.includes('online') ? 'online' : 'offline';

    mainVideo.querySelector('source').src = sideSource;
    mainVideo.load();
    mainVideo.play();

    sideVideo.querySelector('source').src = mainSource;
    sideVideo.load();
    sideVideo.play();

    mainFeedLabel.textContent = sideLabel;
    document.querySelector('.main-feed .status-indicator').className = `status-indicator ${sideStatus}`;
    sideFeed.querySelector('.feed-label').textContent = mainLabel;
    sideFeed.querySelector('.status-indicator').className = `status-indicator ${mainStatus}`;
}

// Add click listeners to side feeds
cameraGrid.querySelectorAll('.side-feed').forEach(feed => {
    feed.addEventListener('click', () => swapFeed(feed));
});

// Alerts system
function addAlert(message) {
    const li = document.createElement('li');
    li.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    alertsList.prepend(li);
    alertSound.play();
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('neon-light');
    themeToggle.textContent = document.body.classList.contains('neon-light') ? '🌑 Dark' : '🌙 Neon';
});

// Layout toggle (grid vs list, placeholder)
let isGrid = true;
layoutToggle.addEventListener('click', () => {
    isGrid = !isGrid;
    cameraGrid.style.gridTemplateColumns = isGrid ? 'repeat(4, 1fr)' : '1fr';
    cameraGrid.style.gridTemplateRows = isGrid ? 'repeat(2, 1fr)' : 'auto';
    layoutToggle.textContent = isGrid ? 'Toggle Grid' : 'Toggle List';
});

// Playback controls (basic functionality)
const playPauseBtn = document.querySelector('.control-btn:nth-child(2)');
playPauseBtn.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseBtn.textContent = '⏸';
    } else {
        mainVideo.pause();
        playPauseBtn.textContent = '▶';
    }
});

// Simulate alerts
setInterval(() => {
    const alerts = [
        'Motion detected at LAB-ENTRANCE',
        'VAULT-ROOM access attempted',
        'MEETING-ZONE offline',
    ];
    addAlert(alerts[Math.floor(Math.random() * alerts.length)]);
}, 10000);

// Initial setup
updateTime();