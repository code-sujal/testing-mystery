// Time and Date Updates
// Back Button Navigation
function goBack() {
    window.location.href = "welcome.html";
}



const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

function updateTimeAndDate() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    timeElement.textContent = formattedTime;
    dateElement.textContent = formattedDate;

    // Update timestamps on feeds
    document.querySelectorAll(".feed-overlay .overlay-right span:first-child").forEach(span => {
        span.textContent = formattedTime;
    });
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

// System Status Updates
function simulateStatusUpdates() {
    const latencyElement = document.getElementById("latency");
    const memoryElement = document.getElementById("memory");
    const networkElement = document.getElementById("network");

    setInterval(() => {
        const latency = Math.floor(Math.random() * 200) + 50;
        const memory = Math.floor(Math.random() * 4096);
        const network = Math.random() < 0.95 ? "Active" : "Inactive";

        latencyElement.textContent = `${latency}ms`;
        memoryElement.textContent = `${memory}mb`;
        networkElement.textContent = network;
    }, 5000);
}

simulateStatusUpdates();

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️ Light" : "🌙 Dark";
});

// Layout Toggle
const layoutToggle = document.getElementById("layout-toggle");
layoutToggle.addEventListener("click", () => {
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.toggle("grid-layout");
    layoutToggle.textContent = dashboard.classList.contains("grid-layout") ? "Split Layout" : "Grid Layout";
});

// Feed Switching
function switchFeed(cameraLabel, videoSrc) {
    const mainVideo = document.getElementById("main-video");
    const mainFeedLabel = document.getElementById("main-feed-label");
    mainVideo.src = videoSrc;
    mainFeedLabel.textContent = cameraLabel;
}

// Tab Switching
function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add("active");
}

// Live Alerts
const alertsList = document.getElementById("alerts-list");
function addAlert(message, type) {
    const li = document.createElement("li");
    li.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    li.classList.add(`alert-${type}`);
    alertsList.prepend(li);
    if (alertsList.children.length > 10) {
        alertsList.removeChild(alertsList.lastChild);
    }
}

// Simulate Alerts
function simulateAlerts() {
    const alertTypes = ["critical", "warning"];
    const messages = [
        "Motion detected at CAM 7.1/ws",
        "Unusual activity at CAM 8.1/ws",
        "Network latency spike detected",
        "Camera 9.1/ws offline"
    ];

    setInterval(() => {
        const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        addAlert(message, type);
    }, 10000);
}

simulateAlerts();

// Blinking Recording Indicator
function blinkRecordingIndicator() {
    const indicators = document.querySelectorAll(".recording-indicator");
    setInterval(() => {
        indicators.forEach(indicator => {
            indicator.style.opacity = indicator.style.opacity === "0" ? "1" : "0";
        });
    }, 1000);
}

blinkRecordingIndicator();