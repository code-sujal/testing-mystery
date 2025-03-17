// Sample email data categorized into folders
const emailFolders = {
    inbox: [
        {
            id: 1,
            senderName: "Captain Harrison (RCPD)",
            senderImage: "police.png",
            senderEmail: "harrison@rcpd.gov",
            subject: "Case Assignment – Samuel Reid’s Death",
            body: "Detective Mercer,\n\n" +
    "You’ve been assigned to investigate the sudden death of Samuel Reid, LuminaTech’s lead scientist. The preliminary autopsy report suggests possible foul play, but LuminaTech is pushing to close the case as an accident.\n\n" +
    "Reid was last seen working on Project Eclipse, a classified renewable energy initiative. You’ll need to tread carefully—LuminaTech has powerful backers. I’m attaching the case report from the night of his death.\n\n" +
    "Keep me updated.\n\n" +
    "– Captain Harrison",
            attachments: ["📁 case_report.pdf"],
            dateTime: "March 15, 2025 | 10:32 AM"
        },
        {
            id: 2,
            senderName: "Dr. Evelyn Carter",
            senderImage: "doctor.webp",
            senderEmail: "forensic@metro-medical.org",
            subject: "Official Autopsy Report – Samuel Reid",
            body: `
Detective Mercer,

Attached is the official autopsy report for Samuel Reid. Preliminary findings confirm no external injuries, but forensic analysis suggests an irregular cardiac event.

Key Findings:

Primary Cause of Death: Cardiac arrest due to abnormal biochip stimulation

Biochip Activity Log: Unauthorized external access detected hours before death

Toxicology Report: No traces of conventional toxins or drugs

Additional Notes: Suspicious fluctuations in neural impulse regulation, indicating possible forced override


This suggests a potential cybernetic interference rather than a natural failure. Let me know if further analysis is required.

Dr. Evelyn Carter
Forensic Pathologist, Metro Medical Institute
`,
            attachments: ["📁 autopsy_report.pdf"],
            dateTime: "March 15, 2025 | 11:47 AM"
        },
        {
            id: 3,
            senderName: "Samuel Reid",
            senderImage: "samuel.jpg",
            senderEmail: "samuelreid@personalmail.com",
            subject: "Security Concern – Possible Threat",
            body: "Detective Mercer,\n\n" +
    "I don’t know who else to trust. Someone is watching me. Unauthorized access attempts to my personal workstation have increased. I tried requesting security logs from LuminaTech, but they denied me access.\n\n" +
    "If something happens to me, know that the truth is inside Project Eclipse.\n\n" +
    "I’ll reach out again if I get anything concrete.\n\n" +
    "– Samuel Reid",

            attachments: ["case_brief.pdf"],
            dateTime: "March 15, 2025 | 9:15 AM"
        }
    ],
    sent: [
        {
            id: 1,
            senderName: "To Dr. Moreno",
            senderImage: "alx.png",
            senderEmail: "(from)alex@detective.gov",
            subject: "Follow-up on Biochip Inquiry",
            body: "Dr. Moreno, I need more details on the security risks of Luminatech's Biochip. You mentioned something about an exploit? Please send the documents ASAP. Time is running out.",
            attachments: ["[No attachments]"],
            dateTime: "  Sent 2 days ago"


        },
        {
            id: 2,
            senderName: "To Unknown contact",
            senderImage: "alx.png",
            senderEmail: "(from)alex@detective.gov",
            subject: "Meeting at Warehouse 17",
            body: "The files are ready. Meet me at Warehouse 17 at midnight. No delays, no mistakes.",
            attachments: ["[No attachments]"],
            dateTime: "  Sent Last night"


        },
        {
            id: 3,
            senderName: "To sophia.w@msnr.news ",
            senderImage: "alx.png",
            senderEmail: "(from)alex@detective.gov",
            subject: "Emergency—Need Your Help",
            body: "I have proof that Luminatech is hiding something dangerous. If something happens to me, the truth must come out. I'll send you the files soon—stay safe.",
            attachments: ["[No attachments]"],
            dateTime: "  Sent 3 days ago"


        }
    ],
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
        {
            id: 2,
            senderName: "ShadowByte",
            senderImage: "shadow.jpg",
            senderEmail: "shadowbyte@blacnet.sec",
            subject: "Lost in the dark?",
            body: "The truth is hidden in plain sight. Whenever you are stuck, use this: PROCLIPSE69.This code will help you get access to Reid's computer,I'm watching you, no need to be worried,I am Reid's bestfriend. But be careful—Luminatech sees everything. You didn't get this from me.",
            attachments: ["[No attachments]"],
            dateTime: "March 15, 2025 | 10:32 AM"


        }
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
        document.getElementById("folder-title").textContent = this.textContent.trim();
    });
});

// Load Inbox by default
document.addEventListener("DOMContentLoaded", function() {
    loadEmails("inbox");
});