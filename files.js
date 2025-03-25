// File structure
const fileSystem = {
    documents: [
        {
            id: 1,
            name: "Personal\n\nNotes",
            type: "text",
            content: "March 3, 2025\n\n" +
                     "I’ve been feeling uneasy about the Reid case. LuminaTech’s influence is everywhere, and I can’t shake the feeling that I’m being watched. I need to be careful about what I write here.\n\n" +
                     "Emily’s doctor appointment went well today. Dr. Mitchell said her treatment is progressing, but we need to keep monitoring her condition. I need to schedule her next visit for April.\n\n" +
                     "Also, I need to call the school about Emily’s science fair project—she’s been so excited about it.",
            meta: "Last modified: March 3, 2025 | Size: 1.2 KB"
        },
        {
            id: 2,
            name: "To-Do_List",
            type: "text",
            content: "To-Do List (March 2025)\n\n" +
                     "- Finish report on the downtown vandalism case\n" +
                     "- Pick up Emily’s prescription from the pharmacy\n" +
                     "- Buy groceries (milk, eggs, bread, coffee beans)\n" +
                     "- Schedule meeting with Captain Reynolds about the Reid case\n" +
                     "- Call Mom—she’s been asking about Emily",
            meta: "Last modified: March 4, 2025 | Size: 0.8 KB"
        },
        {
            id: 3,
            name: "Budget_Planner",
            type: "text",
            content: "Monthly Budget Planner - March 2025\n" +
                     "----------------------------------------\n" +
                     "Income\n" +
                     "----------------------------------------\n" +
                     "Detective Salary (City PD)          | $4,500\n" +
                     "Additional Income (LumaTrust Fee)   | $1,000\n" +
                     "----------------------------------------\n" +
                     "Total Income                        | $5,500\n" +
                     "----------------------------------------\n" +
                     "Expenses\n" +
                     "----------------------------------------\n" +
                     "Rent                                | $1,800\n" +
                     "Groceries                           | $400\n" +
                     "Emily’s Medical Expenses            | $600\n" +
                     "Utilities (Electricity, Water, etc) | $300\n" +
                     "School Supplies (Science Fair)      | $100\n" +
                     "Miscellaneous (Entertainment, Gas)  | $200\n" +
                     "----------------------------------------\n" +
                     "Total Expenses                      | $3,400\n" +
                     "----------------------------------------\n" +
                     "Savings\n" +
                     "----------------------------------------\n" +
                     "Emergency Fund                      | $1,000\n" +
                     "Emily’s College Fund                | $100\n" +
                     "----------------------------------------\n" +
                     "Total Savings                       | $1,100\n" +
                     "----------------------------------------\n" +
                     "Summary\n" +
                     "----------------------------------------\n" +
                     "Remaining Balance                   | $1,000\n" +
                     "(Income - Expenses - Savings)\n" +
                     "----------------------------------------",
            meta: "Last modified: March 1, 2025 | Size: 1 KB"
        },
        {
            id: 4,
            name: "Emily\n\n School\n\n Schedule",
            type: "text",
            content: "Emily’s School Schedule - March 2025\n" +
                     "----------------------------------------\n" +
                     "Monday:\n" +
                     "- 8:00 AM: Drop-off at school\n" +
                     "- 3:00 PM: Pick-up\n" +
                     "- 4:00 PM: Math tutoring (Mrs. Carter)\n\n" +
                     "Tuesday:\n" +
                     "- 8:00 AM: Drop-off\n" +
                     "- 3:00 PM: Pick-up\n" +
                     "- 3:30 PM: Science Club (working on her solar system project)\n\n" +
                     "Wednesday:\n" +
                     "- 8:00 AM: Drop-off\n" +
                     "- 1:00 PM: Early dismissal (Parent-Teacher Conference at 2:00 PM)\n" +
                     "- 3:00 PM: Playdate with Sarah\n\n" +
                     "Thursday:\n" +
                     "- 8:00 AM: Drop-off\n" +
                     "- 3:00 PM: Pick-up\n" +
                     "- 4:00 PM: Emily's Super-Medicine Slot\n\n" +
                     "Friday:\n" +
                     "- 8:00 AM: Drop-off\n" +
                     "- 3:00 PM: Pick-up\n" +
                     "- 5:00 PM: Science Fair setup (need to help Emily with her display)\n\n" +
                     "Notes:\n" +
                     "- Don’t forget to pack her lunch every day (she loves PB&J sandwiches).\n" +
                     "- Check with Mrs. Carter about Emily’s progress in math—she’s been struggling.\n" +
                     "- Science Fair is on March 15th. Emily’s so excited about her project!\n" +
                     "----------------------------------------",
            meta: "Last modified: March 2, 2025 | Size: 0.9 KB"
        },
        {
            id: 5,
            name: "Journal_Entry",
            type: "text",
            content: "Journal Entry - March 5, 2025\n" +
                     "----------------------------------------\n" +
                     "I haven’t written in a while. Things have been so hectic lately, and I feel like I’m drowning sometimes. The Reid case is weighing on me more than I’d like to admit. I keep thinking about what I saw at LuminaTech—the way those lab techs looked at me when I mentioned Project Eclipse. I can’t shake the feeling that I’m in over my head. What if I’m putting Emily at risk by digging too deep?\n\n" +
                     "Emily’s been my rock, even if she doesn’t know it. She showed me her science fair project today—a model of the solar system. She was so proud of it, and seeing her smile made all the stress melt away for a moment. I just want to give her a normal life, but it’s hard when I’m always working late. I need to be better for her.\n\n" +
                     "I got a call from an unknown number yesterday. They didn’t say anything—just heavy breathing on the other end. I hung up, but it’s been on my mind. Is this related to the case? I need to be careful. Maybe I should talk to Captain Reynolds about getting some backup, but I don’t want to seem paranoid.\n\n" +
                     "I just want this case to be over so I can focus on being a mom again.\n" +
                     "----------------------------------------",
            meta: "Last modified: March 5, 2025 | Size: 1.5 KB"
        },
        {
            id: 6,
            name: "Case_Overview",
            type: "text",
            content: "Case Overview Notes - March 2025\n" +
                     "----------------------------------------\n" +
                     "1. Samuel Reid Case (High Priority)\n" +
                     "- Status: Active investigation\n" +
                     "- Notes: Suspected foul play. LuminaTech lab visit revealed chemical smell and nervous techs. Autopsy report doesn’t add up—toxin levels suggest poisoning. Need to look into Project Eclipse and Dr. Vex.\n\n" +
                     "2. Downtown Vandalism Case\n" +
                     "- Status: Report due March 10th\n" +
                     "- Notes: Multiple businesses hit last month. Graffiti includes anti-LuminaTech slogans (“Tech Kills,” “Eclipse the Truth”). Could be related to Reid case—possible protest against Project Eclipse? Need to interview local activists.\n\n" +
                     "3. Missing Person: Jane Carter\n" +
                     "- Status: Ongoing\n" +
                     "- Notes: Last seen near LuminaTech HQ on February 20th. Family says she was a whistleblower at the company. No leads yet, but her disappearance feels too coincidental with Reid’s death. Need to cross-check with Reid case files.\n\n" +
                     "4. Petty Theft at Neon Market\n" +
                     "- Status: Low priority\n" +
                     "- Notes: Shoplifting incident on March 1st. Suspect is a known repeat offender. Handed off to Officer Daniels for follow-up—I don’t have time for this right now.\n\n" +
                     "Notes:\n" +
                     "- Captain Reynolds wants updates on all cases by end of week. I’m stretched thin, but I can’t let the Reid case slip. Too many red flags.\n" +
                     "----------------------------------------",
            meta: "Last modified: March 6, 2025 | Size: 1.8 KB"
        },
        {
            id: 7,
            name: "Work_Life_\n\n Balance_Plan",
            type: "text",
            content: "Work-Life Balance Plan - March 2025\n" +
                     "----------------------------------------\n" +
                     "I need to get better at managing my time. I can’t keep missing Emily’s events because of work, but I also can’t let my cases slip. Here’s the plan:\n\n" +
                     "1. Work Hours\n" +
                     "- Limit overtime to 2 nights per week (Tuesdays and Thursdays).\n" +
                     "- No work after 8:00 PM on other nights—spend that time with Emily.\n" +
                     "- Delegate smaller cases (like the Neon Market theft) to Officer Daniels.\n\n" +
                     "2. Family Time\n" +
                     "- Dinner with Emily every night at 6:00 PM (no exceptions).\n" +
                     "- Help Emily with her science fair project on weekends.\n" +
                     "- Plan a fun outing for us—maybe the Neon Arcade on March 20th?\n\n" +
                     "3. Self-Care\n" +
                     "- Take 30 minutes each morning to meditate or exercise (I’ve been too stressed lately).\n" +
                     "- Write in my journal at least once a week to clear my head.\n\n" +
                     "4. Investigation Focus\n" +
                     "- Prioritize the Reid case—it’s too important to ignore.\n" +
                     "- Be cautious about LuminaTech. I found a note in my mailbox yesterday: “Stop digging, or Emily pays.” I don’t know who sent it, but I can’t ignore it. I need to protect Emily while still getting to the truth.\n\n" +
                     "Notes:\n" +
                     "- I need to talk to Captain Harrison about the note. Maybe I can get a patrol car to check on the house? I can’t let this case put Emily in danger.\n" +
                     "----------------------------------------",
            meta: "Last modified: March 4, 2025 | Size: 1.3 KB"
        }
    ],    images: [
        {
            id: 1,
            name: "Emily_Drawing.jpg",
            type: "image",
            content: "emilydrwaing.jpg",
            meta: "Last modified: March 1, 2025 | Size: 250 KB"
        },
        {
            id: 2,
            name: "Lab_Photo.jpg",
            type: "image",
            content: "lab_photo.jpg",
            meta: "Last modified: February 28, 2025 | Size: 320 KB"
        },
        {
            id: 3,
            name: "emily's_super_ \n\nmedTime.jpg",
            type: "image",
            content: "https://i.guim.co.uk/img/media/d40363fb930ce39f4e7fd962d35cc5d88bb88e87/0_199_1024_614/master/1024.jpg?width=1200&quality=85&auto=format&fit=max&s=c082ed2b81637e48b8f4799236c41485",
            meta: "Last modified: December 25, 2024 | Size: 450 KB"
        },
        
    ],
    "case-files": [
        {
            id: 1,
            name: "Reid_Case_Notes",
            type: "text",
            content: "Samuel Reid Case Notes\n\n" +
                     "March 6, 2025: Visited LuminaTech lab where Reid was last seen. Noticed an unusual smell—possibly chemical. The lab techs seemed nervous when I asked about Project Eclipse. One of them mentioned a 'Dr. Vex'—need to look into that name.\n\n" +
                     "March 8, 2025: Received preliminary autopsy report. Cause of death listed as natural, but I have my doubts. The toxin levels in his blood don’t add up. Need to dig deeper, but I’m getting pressure to close the case.\n\n" +
                     "March 9, 2025: Found a memo in Reid’s office about Project Eclipse—something about 'neural interfacing.' I don’t understand the tech, but it sounds dangerous.",
            meta: "Last modified: March 2, 2025 | Size: 2.5 KB"
        },
        {
            id: 2,
            name: "Witness_Statement.pdf",
            type: "pdf",
            content: "Download to view: witness_statement.pdf",
            meta: "Last modified: March 2, 2025 | Size: 150 KB"
        },
        {
            id: 3,
            name: "Vandalism_Case_Summary.docx",
            type: "doc",
            content: "Download to view: vandalism_case_summary.docx",
            meta: "Last modified: March 5, 2025 | Size: 90 KB"
        }
    ],
    downloads: [
        {
            id: 1,
            name: "LuminaTech_Brochure.pdf",
            type: "pdf",
            content: "Download to view: luminary_brochure.pdf",
            meta: "Last modified: March 5, 2025 | Size: 1.2 MB"
        },
        {
            id: 2,
            name: "Security_Guidelines.docx",
            type: "doc",
            content: "Download to view: security_guidelines.docx",
            meta: "Last modified: March 4, 2025 | Size: 80 KB"
        },
        {
            id: 3,
            name: "Emily_School_Newsletter.pdf",
            type: "pdf",
            content: "Download to view: emily_school_newsletter.pdf",
            meta: "Last modified: March 6, 2025 | Size: 500 KB"
        },
        {
            id: 4,
            name: "CityPD_Training_Manual.pdf",
            type: "pdf",
            content: "Download to view: citypd_training_manual.pdf",
            meta: "Last modified: March 1, 2025 | Size: 2.3 MB"
        }
    ]
};

// Variable to store the current folder and search query
let currentFolder = "documents";
let currentSearchQuery = "";

// Function to display files in the selected folder
function loadFiles(folder, searchQuery = "") {
    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";

    // Filter files based on the search query
    const files = fileSystem[folder].filter(file => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        if (file.type === "text") {
            return (
                file.name.toLowerCase().includes(query) ||
                file.content.toLowerCase().includes(query)
            );
        }
        return file.name.toLowerCase().includes(query);
    });

    // Display filtered files
    files.forEach(file => {
        let fileElement = document.createElement("div");
        fileElement.classList.add("file");
        fileElement.innerHTML = `
            <img src="${getFileIcon(file.type)}" alt="${file.type}">
            <span>${file.name}</span>
            ${fileList.classList.contains("list-view") ? `<small>${file.meta}</small>` : ""}
        `;
        fileElement.addEventListener("click", () => openFile(file));
        fileList.appendChild(fileElement);
    });

    // If no files match the search query, display a message
    if (files.length === 0) {
        fileList.innerHTML = "<p>No files found.</p>";
    }

    // Update breadcrumb
    document.getElementById("breadcrumb-path").textContent = folder.charAt(0).toUpperCase() + folder.slice(1).replace("-", " ");
}

// Function to get file icon based on type
function getFileIcon(type) {
    switch (type) {
        case "text":
            return "https://upload.wikimedia.org/wikipedia/commons/2/2d/Microsoft_Sticky_Notes_icon.png";
        case "image":
            return "https://cdn-icons-png.flaticon.com/512/10856/10856267.png";
        case "pdf":
            return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
        case "doc":
            return "https://cdn-icons-png.flaticon.com/512/888/888883.png";
        default:
            return "https://cdn-icons-png.flaticon.com/512/4726/4726059.png";
    }
}

// Function to open and display a file in the modal
function openFile(file) {
    document.getElementById("file-name").textContent = file.name;
    document.getElementById("file-meta").textContent = file.meta;
    
    const fileContent = document.getElementById("file-content");
    fileContent.innerHTML = "";

    if (file.type === "text") {
        fileContent.textContent = file.content;
    } else if (file.type === "image") {
        const img = document.createElement("img");
        img.src = file.content;
        fileContent.appendChild(img);
    } else {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = file.content;
        fileContent.appendChild(link);
    }

    document.getElementById("file-modal").classList.add("show");
}

// Close File Modal
document.getElementById("close-modal-btn").addEventListener("click", function() {
    document.getElementById("file-modal").classList.remove("show");
});

// Folder Navigation
document.querySelectorAll(".folder").forEach(folder => {
    folder.addEventListener("click", function() {
        document.querySelectorAll(".folder").forEach(f => f.classList.remove("active"));
        this.classList.add("active");
        currentFolder = this.dataset.folder;
        loadFiles(currentFolder, currentSearchQuery);
    });
});

// Search Functionality
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function() {
    currentSearchQuery = this.value.trim();
    loadFiles(currentFolder, currentSearchQuery);
});

// View Toggle
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const fileList = document.getElementById("file-list");

gridViewBtn.addEventListener("click", function() {
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    fileList.classList.remove("list-view");
    fileList.classList.add("grid-view");
    loadFiles(currentFolder, currentSearchQuery);
});

listViewBtn.addEventListener("click", function() {
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    fileList.classList.remove("grid-view");
    fileList.classList.add("list-view");
    loadFiles(currentFolder, currentSearchQuery);
});

// Load Documents by default
document.addEventListener("DOMContentLoaded", function() {
    loadFiles("documents");
});