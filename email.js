// Sample email data categorized into folders
const emailFolders = {
    inbox: [
        {
            id: 1,
            senderName: "Captain Harrison (RCPD)",
            senderImage: "police.png",
            senderEmail: "harrison@rcpd.gov",
            subject: "Case Assignment – Samuel Reid’s Death",
            body: "Detective Mercer,\n\nYou’ve been assigned to investigate the sudden death of Samuel Reid...",
            attachments: ["📁 case_report.pdf"],
            dateTime: "March 15, 2025 | 10:32 AM"
        },
        {
            id: 2,
            senderName: "Dr. Evelyn Carter",
            senderImage: "https://img.freepik.com/...", 
            senderEmail: "forensic@metro-medical.org",
            subject: "Official Autopsy Report – Samuel Reid",
            body: "Detective Mercer,\n\nAttached is the official autopsy report for Samuel Reid...",
            attachments: ["📁 autopsy_report.pdf"],
            dateTime: "March 15, 2025 | 11:47 AM"
        },
        {
            id: 3,
            senderName: "Samuel Reid",
            senderImage: "https://images.stockcake.com/...", 
            senderEmail: "samuelreid@personalmail.com",
            subject: "Security Concern – Possible Threat",
            body: "Detective Mercer,\n\nI don’t know who else to trust. Someone is watching me...",
            attachments: ["case_brief.pdf"],
            dateTime: "March 15, 2025 | 9:15 AM"
        }
    ],
    sent: [],
    drafts: [],
    spam: [
        {
            id: 1,
            senderName: "Cipher",
            senderImage: "https://lh4.googleusercontent.com/-yh60oQ7Nlik/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck7Xo2I7I-VzjhYsLH-bhIpNoIAcA/photo.jpg",
            senderEmail: "Anonymous Email",
            subject: "You’re Looking in the Wrong Places",
            body: `Detective Mercer,

            I know why you’re here. Samuel Reid didn’t die by accident—they silenced him. But the people you’re looking at aren’t the ones pulling the strings.
            
            Check his private chats. His laptop holds the real evidence, but it won’t be easy to access. And be careful—LuminaTech doesn’t take kindly to people asking the wrong questions.
            I won’t be able to mail you often, they might have a track on me too. Better talk to me on Chats app.
            
            We’ll talk soon.
            
            – Cipher`,
            attachments: ["[No attachments]"],
            dateTime: "March 15, 2025 | 10:32 AM"
        },
    ],
    trash: []
};

// Function to display emails in the selected folder
function loadEmails(folder) {
    const emailList = document.getElementById("email-list");
    emailList.innerHTML = "";
    
    emailFolders[folder].forEach(email => {
        let emailElement = document.createElement("div");
        emailElement.classList.add("email");
        emailElement.innerHTML = `
            <strong>${email.subject}</strong><br>
            <small>${email.senderName} - ${email.dateTime}</small>
        `;
        emailElement.addEventListener("click", () => openEmail(email));
        emailList.appendChild(emailElement);
    });
}

// Function to open and display an email
function openEmail(email) {
    document.getElementById("sender-image").src = email.senderImage;
    document.getElementById("sender-name").textContent = email.senderName;
    document.getElementById("sender-email").textContent = email.senderEmail;
    document.getElementById("email-subject").textContent = email.subject;
    document.getElementById("email-body").textContent = email.body;
    
    let attachmentsDiv = document.getElementById("email-attachments");
    attachmentsDiv.innerHTML = "";
    email.attachments.forEach(file => {
        let link = document.createElement("a");
        link.href = "#"; // Updated to prevent broken links
        link.textContent = file;
        link.target = "_blank";
        attachmentsDiv.appendChild(link);
        attachmentsDiv.appendChild(document.createElement("br"));
    });

    document.getElementById("email-detail").classList.add("show");
}

// Close Email Detail View
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("email-detail").classList.remove("show");
});

// Folder Navigation
document.querySelectorAll(".folder").forEach(folder => {
    folder.addEventListener("click", function() {
        document.querySelectorAll(".folder").forEach(f => f.classList.remove("active"));
        this.classList.add("active");
        loadEmails(this.dataset.folder);
    });
});

// Load Inbox by default
document.addEventListener("DOMContentLoaded", function() {
    loadEmails("inbox");
});
