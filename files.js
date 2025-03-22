// DOM Elements
const sidebarNav = document.querySelector('.sidebar-nav');
const breadcrumb = document.getElementById('breadcrumb');
const fileList = document.getElementById('file-list');
const contextMenu = document.getElementById('context-menu');

let currentPath = "This PC";

// File System Data (Mock)
const fileSystem = {
  "This PC": [
    { name: "Local Disk (C:)", type: "drive", size: "256 GB", date: "2023-01-01" },
    { name: "Data (D:)", type: "drive", size: "1 TB", date: "2023-01-01" },
    { name: "Media (E:)", type: "drive", size: "500 GB", date: "2023-01-01" }
  ],
  "C:": [
    { name: "Windows", type: "folder", size: "20 GB", date: "2023-01-01" },
    { name: "Users", type: "folder", size: "50 GB", date: "2023-01-01" },
    { name: "Program Files", type: "folder", size: "30 GB", date: "2023-01-01" }
  ],
  "D:": [
    { name: "Documents", type: "folder", size: "10 GB", date: "2023-05-15" },
    { name: "Videos", type: "folder", size: "200 GB", date: "2023-06-20" },
    { name: "Backup.zip", type: "file", size: "5 GB", date: "2023-07-01" }
  ],
  "E:": [
    { name: "Music", type: "folder", size: "50 GB", date: "2023-03-10" },
    { name: "Photos", type: "folder", size: "100 GB", date: "2023-04-25" },
    { name: "movie.mp4", type: "file", size: "2 GB", date: "2023-08-01" }
  ]
};

// Load files for the current path
function loadFiles(path) {
  currentPath = path;
  breadcrumb.textContent = path;
  fileList.innerHTML = '';

  const items = fileSystem[path] || [];
  items.forEach(item => {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-item';
    fileDiv.dataset.name = item.name;
    fileDiv.dataset.type = item.type;

    const icon = item.type === 'folder' ? '📂' : item.type === 'drive' ? '💾' : '📜';
    fileDiv.innerHTML = `
      <span class="file-icon">${icon}</span>
      <span class="file-name">${item.name}</span>
      <span class="file-details">${item.size} • ${item.date}</span>
    `;

    fileList.appendChild(fileDiv);
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.path === path);
  });
}

// Handle navigation
sidebarNav.addEventListener('click', (e) => {
  const navItem = e.target.closest('.nav-item');
  if (navItem) {
    const path = navItem.dataset.path;
    loadFiles(path);
  }
});

// Handle file/folder click
fileList.addEventListener('click', (e) => {
  const fileItem = e.target.closest('.file-item');
  if (fileItem && fileItem.dataset.type !== 'file') {
    const path = fileItem.dataset.name;
    if (fileSystem[path]) {
      loadFiles(path);
    }
  }
});

// Context Menu
fileList.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const fileItem = e.target.closest('.file-item');
  if (fileItem) {
    fileItem.classList.add('active');
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;

    // Basic actions (for demo)
    contextMenu.querySelector('ul').onclick = (ev) => {
      const action = ev.target.textContent;
      alert(`${action} on ${fileItem.dataset.name}`);
      contextMenu.style.display = 'none';
      fileItem.classList.remove('active');
    };
  }
});

// Hide context menu on click elsewhere
document.addEventListener('click', () => {
  contextMenu.style.display = 'none';
  document.querySelectorAll('.file-item').forEach(item => item.classList.remove('active'));
});

// Initial load
document.addEventListener('DOMContentLoaded', () => loadFiles("This PC"));