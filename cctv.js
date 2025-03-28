const mainVideo = document.getElementById('main-video');
const mainFeedLabel = document.getElementById('main-feed-label');
const cameraGrid = document.getElementById('camera-grid');
const alertsList = document.getElementById('alerts-list');
const alertsPanel = document.getElementById('alerts-panel');
const alertsTitle = document.getElementById('alerts-title');
const overlayToggle = document.getElementById('overlay-toggle');
const alertsToggle = document.getElementById('alerts-toggle');
const searchBar = document.getElementById('search-bar');
const groupSelect = document.getElementById('group-select');
const alertSound = document.getElementById('alert-sound');
const systemTime = document.getElementById('system-time');
const mainFeedTime = document.getElementById('main-feed-time');
const playPauseBtn = document.getElementById('play-pause');

let alertHistory = [];
let showingHistory = false;

function goBack() {
    window.history.back();
}

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    systemTime.textContent = timeStr;
    mainFeedTime.textContent = timeStr;
}
setInterval(updateTime, 1000);

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
    sideFeed.querySelector('.status-indicator').className = `status-indicator ${sideStatus}`;
}

function zoomFeed(feed) {
    feed.classList.toggle('zoomed');
    if (feed.classList.contains('zoomed')) {
        feed.style.position = 'fixed';
        feed.style.top = '50%';
        feed.style.left = '50%';
        feed.style.transform = 'translate(-50%, -50%)';
        feed.style.width = '80vw';
        feed.style.height = '80vh';
        feed.style.zIndex = '1000';
    } else {
        feed.style.position = '';
        feed.style.top = '';
        feed.style.left = '';
        feed.style.transform = '';
        feed.style.width = '';
        feed.style.height = '';
        feed.style.zIndex = '';
    }
}

cameraGrid.querySelectorAll('.feed').forEach(feed => {
    feed.addEventListener('click', () => {
        if (!feed.classList.contains('main-feed')) swapFeed(feed);
    });
    feed.addEventListener('dblclick', () => zoomFeed(feed));
});

function addAlert(message) {
    const timestamp = new Date().toLocaleTimeString();
    alertHistory.unshift(`${timestamp}: ${message}`);
    if (!showingHistory) {
        alertsList.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = `${timestamp}: ${message}`;
        alertsList.appendChild(li);
        alertSound.play();
    }
}

overlayToggle.addEventListener('click', () => {
    document.querySelectorAll('.feed-overlay').forEach(overlay => {
        overlay.classList.toggle('hidden');
    });
    overlayToggle.textContent = overlayToggle.textContent === 'Overlay' ? 'Show' : 'Overlay';
});

alertsToggle.addEventListener('click', () => {
    showingHistory = !showingHistory;
    alertsTitle.textContent = showingHistory ? 'Alert History' : 'Live Alerts';
    alertsList.innerHTML = '';
    if (showingHistory) {
        alertHistory.forEach(alert => {
            const li = document.createElement('li');
            li.textContent = alert;
            alertsList.appendChild(li);
        });
    } else {
        const latest = alertHistory[0] || 'No recent alerts';
        const li = document.createElement('li');
        li.textContent = latest;
        alertsList.appendChild(li);
    }
});

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    cameraGrid.querySelectorAll('.feed').forEach(feed => {
        const label = feed.dataset.camera.toLowerCase();
        feed.style.display = label.includes(query) ? '' : 'none';
    });
});

groupSelect.addEventListener('change', () => {
    const group = groupSelect.value;
    cameraGrid.querySelectorAll('.feed').forEach(feed => {
        const feedGroup = feed.dataset.group;
        feed.style.display = (group === 'all' || feedGroup === group) ? '' : 'none';
    });
});

playPauseBtn.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseBtn.textContent = '⏸';
    } else {
        mainVideo.pause();
        playPauseBtn.textContent = '▶';
    }
});

setInterval(() => {
    const alerts = [
        'Motion detected at LAB-ENTRANCE',
        'VAULT-ROOM access attempted',
        'MEETING-ZONE offline',
    ];
    addAlert(alerts[Math.floor(Math.random() * alerts.length)]);
}, 10000);

updateTime();