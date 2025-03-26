// Sample email data categorized into folders
const emailFolders = {
    inbox: [
        // 2. LumaTrust Medical Coverage (March 2, 2025)
        {
            id: 2,
            senderName: "LuminaTrust Foundation",
            senderImage: "ltlogo.png",
            senderEmail: "charity@luminatech.com",
            subject: "Medical Coverage Confirmation",
            body: "Dear Detective Alice,\n\n" +
                  "We are pleased to inform you that LumaTrust has fully covered the outstanding medical bills for your daughter's treatment. If you have any further requests or need additional assistance, do not hesitate to reach out.\n\n" +
                  "We value your cooperation in this matter.\n\n" +
                  "Best,\nLuminaTrust Foundation",
            attachments: [{name: "📁 medical_bill.pdf", url: "https://drive.google.com/file/d/1kU3DHiyOpCScUAdWFQR1KHvS-kcjygFR/view?usp=drivesdk"}],
            dateTime: "March 2, 2025 | 9:15 AM"
        },
        // 3. Doctor Appointment (March 3, 2025)
        {
            id: 3,
            senderName: "Dr. Sarah Mitchell",
            senderImage: "https://i.pinimg.com/736x/c5/a3/90/c5a3904b38eb241dd03dd30889599dc4.jpg",
            senderEmail: "smitchell@ramaiahospital.org",
            subject: "Follow-Up Appointment for Emily",
            body: "Dear Detective Harper,\n\n" +
                  "I’m writing to confirm Emily’s follow-up appointment on March 10 at 2 PM. We’ll review her recent test results and discuss the next steps for her treatment.\n\n" +
                  "Please let me know if this time works for you.\n\n" +
                  "Best,\nDr. Sarah Mitchell",
            attachments: [],
            dateTime: "March 3, 2025 | 8:45 AM"
        },
        // 4. Case Assignment (March 5, 2025)
        {
            id: 4,
            senderName: "Captain Harrison (RCPD)",
            senderImage: "police.png",
            senderEmail: "harrison@rcpd.gov",
            subject: "Case Assignment – Samuel Reid’s Death",
            body: "Detective Mercer,\n\n" +
                  "You’ve been assigned to investigate the sudden death of Samuel Reid, LuminaTech’s lead scientist. The preliminary autopsy report suggests possible foul play, but LuminaTech is pushing to close the case as an accident.\n\n" +
                  "Reid was last seen in his lab, all other details are there in the case report I've attached. You’ll need to tread carefully—LuminaTech has powerful backers. I’m attaching the case report from the night of his death.\n\n" +
                  "Keep me updated.\n\n" +
                  "– Captain Harrison",
            attachments: [{name: "📁 case_report.pdf", url: "https://docs.google.com/document/d/1LTsr9V_e5KBrJfaeT4kFixgcWPqe88orw3JnrmT7aQ4/edit?usp=sharing"}],
            dateTime: "March 5, 2025 | 9:32 AM"
        },
        // 5. Closure of Reid Case (March 6, 2025)
        {
            id: 5,
            senderName: "LuminaTech Legal",
            senderImage: "ltlogo.png",
            senderEmail: "legal@luminatech.com",
            subject: "Closure of Reid Case",
            body: "Detective,\n\n" +
                  "We appreciate your cooperation in handling Dr. Reid’s case efficiently. Our internal medical experts have concluded his death was due to pre-existing conditions.\n\n" +
                  "As such, we request that this case be considered closed to avoid unnecessary disruptions to ongoing company research.\n\n" +
                  "Please confirm receipt of this message.\n\n",
            attachments: [],
            dateTime: "March 6, 2025 | 12:00 PM"
        },
        // 6. Charity Thank You (March 7, 2025)
        {
            id: 6,
            senderName: "Rachel Evans",
            senderImage: "https://static.vecteezy.com/system/resources/thumbnails/043/210/856/small_2x/a-minimalist-logo-featuring-two-people-holding-hands-and-a-house-symbolizing-support-and-community-design-a-minimalist-logo-for-a-cutting-edge-tech-startup-free-vector.jpg",
            senderEmail: "revans@communitycare.org",
            subject: "Thank You for Volunteering!",
            body: "Dear Detective Harper,\n\n" +
                  "Thank you for volunteering at our annual charity run last weekend. Your help with the registration booth was greatly appreciated.\n\n" +
                  "We raised over $5,000 for local families in need!\n\n" +
                  "Hope to see you at next year’s event,\nRachel Evans",
            attachments: [],
            dateTime: "March 7, 2025 | 1:30 PM"
        },
        // 7. Autopsy Report (March 15, 2025)
        {
            id: 7,
            senderName: "Dr. Evelyn Carter",
            senderImage: "doctor.webp",
            senderEmail: "forensic@metro-medical.org",
            subject: "Official Autopsy Report – Samuel Reid",
            body: "Detective Mercer,\n\n" +
                  "Attached is the official autopsy report for Samuel Reid. Preliminary findings confirm no external injuries, but forensic analysis suggests irregular toxin levels in his blood.\n\n" +
                  "Although further investigation is highly recommended in this case, as it seems very sensitive. I've attached the autopsy report. Reach me anytime for help!\n\n",
            attachments: [{name: "📁 autopsy_report.pdf", url: "https://docs.google.com/document/d/16ig4_OcK3Td6PY77CFGpa2pYz1AQKnx309bwj_8JbA8/edit?usp=sharing"}],
            dateTime: "March 15, 2025 | 11:47 AM"
        }
    ],
    sent: [
        {
            id: 1,
            senderName: "To Internal Affairs (ia@citypd.com)",
            senderImage: "https://static.vecteezy.com/system/resources/thumbnails/023/810/334/small_2x/police-badge-isolated-on-white-background-free-vector.jpg",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Need Clarification on Reid Case",
            body: "Captain,\n\n" +
            "Something about the Dr. Reid case doesn’t sit right with me. Cause of death was ruled as a natural condition, but the evidence at the scene tells a different story.\n\n" +
            "Lab security footage from that night is missing, and employees are whispering about something bigger.\n\n" +
            "I need permission to open an independent inquiry. Please advise.\n\n" +
            "Detective Alice Harper",
            attachments: [],
            dateTime: "Sent by you on, March 7, 2025"
        },
        {
            id: 2,
            senderName: "To Ryan Gomez (rgomez.hr@lumatech.com)",
            senderImage: "https://pbs.twimg.com/media/Ef04eIDWAAE6utv.jpg",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Need to Talk – Reid’s Complaints",
            body: "Ryan,\n\n" +
            "I’ve been reviewing some reports, and Dr. Reid made multiple complaints about Project Eclipse. You handled those concerns, right?\n\n" +
            "Did he ever mention feeling threatened?\n\n" +
            "I need to know if he had any enemies inside the company before his death.\n\n" +
            "Detective Alice Harper",
            attachments: [],
            dateTime: "March 6, 2025"
        },
        {
            id: 3,
            senderName: "To Sam (sam.assistdetective@citypd.com) ",
            senderImage: "https://static.vecteezy.com/system/resources/thumbnails/051/154/197/small_2x/male-police-officer-in-uniform-looking-determined-on-a-transparent-background-png.png",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "The Blue Sedan theft case",
            body: "Hey Sam,\n\n" +
            "I’m following up on the downtown theft case from last week. Have you had a chance to get that witness statement from Mrs. Carter yet?\n\n" +
            "She mentioned something about a blue sedan, and I think it might match the description from another report.\n\n" +
            "Let me know when you’ve got an update.\n\n" +
            "Detective Alice Harper",
            attachments: [],
            dateTime: "December 17,2024"
        },
        {
            id: 4,
            senderName: "To Ms Thompson (bluebird.teacher@school.com) ",
            senderImage: "https://t4.ftcdn.net/jpg/10/15/28/87/360_F_1015288766_BZzag9Hi7VTedZ5NLiOAfqDYMjrFtMGy.jpg",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Confirmation about the Parents Teacher Meet",
            body: "Ms. Thompson,\n\n" +
            "I wanted to confirm that I’ll be attending the parent-teacher meeting for my daughter, Emily Harper, next Wednesday. I’ve cleared my schedule for the 4 PM slot.\n\n" +
            "Please let me know if there’s anything specific you’d like to discuss about her progress.\n\n" +
            "Looking forward to speaking with you.\n\n" +
            " Alice Harper",
            attachments: [],
            dateTime: "November 27,2024"
        }
    ],
    drafts: [
        {
            id: 1,
            senderName: "To Detective Sam (sam.assistdetective@citypd.com)",
            senderImage: "https://static.vecteezy.com/system/resources/thumbnails/051/154/197/small_2x/male-police-officer-in-uniform-looking-determined-on-a-transparent-background-png.png",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Follow-Up on the Vandalism Case",
            body: "Hey Sam,\n\n" +
                  "I wanted to check in on the vandalism case at the downtown library. Did you manage to get the security footage from the night of the incident? I think we might be able to identify the kids involved if we can get a clear shot of their faces.\n\n" +
                  "Also, I’m thinking we should interview the librarian again—she seemed nervous when we spoke last time. Let me know what you think.\n\n" +
                  "Thanks,\nAlice",
            attachments: [],
            dateTime: "Draft saved on March 10, 2025 | 8:20 AM"
        },
        {
            id: 2,
            senderName: "To Ms. Thompson (bluebird.teacher@school.com)",
            senderImage: "https://t4.ftcdn.net/jpg/10/15/28/87/360_F_1015288766_BZzag9Hi7VTedZ5NLiOAfqDYMjrFtMGy.jpg",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Emily’s Science Fair Project",
            body: "Dear Ms. Thompson,\n\n" +
                  "I wanted to follow up about Emily’s science fair project. She’s been working really hard on her model of the solar system, but she mentioned she might need some extra supplies for the presentation.\n\n" +
                  "Could you let me know if there’s anything specific she should bring? I can stop by the store this weekend to pick up whatever she needs.\n\n" +
                  "Thank you,\nAlice Harper",
            attachments: [],
            dateTime: "Draft saved on March 9, 2025 | 6:15 PM"
        },
        {
            id: 3,
            senderName: "To Self (alice.detective@citypd.com)",
            senderImage: "https://static.vecteezy.com/system/resources/previews/035/342/944/non_2x/ai-generated-woman-in-a-business-suit-free-photo.jpg",
            senderEmail: "Detective Alice (alice.detective@citypd.com)",
            subject: "Reminder: Pick Up Dry Cleaning",
            body: "Hey Alice,\n\n" +
                  "Don’t forget to pick up your dry cleaning after work tomorrow. You’ve got that meeting with the captain on Wednesday, and your good blazer is still at the cleaners.\n\n" +
                  "Also, grab some coffee beans while you’re out—the good kind, not the cheap stuff.\n\n" +
                  "– Me",
            attachments: [],
            dateTime: "Draft saved on March 8, 2025 | 9:30 PM"
        }
    ],
    spam: [
        {
            id: 3,
            senderName: "GadgetFly",
            senderImage: "https://images.tokopedia.net/img/cache/215-square/GAnVPX/2023/8/2/1a28b279-5a06-4877-82f4-73c6780e8f07.png",
            senderEmail: "deals@GadgetFly.com",
            subject: "🔥 Flash Sale Alert! 99% Off Cyber-Gadgets!",
            body: "Dear Valued Customer,\n\n" +
                  "Tickle your tech cravings with GadgetFly’s MEGA FLASH SALE! We’re slashing prices on all cyber-gadgets—99% OFF for the next 24 hours ONLY!\n\n" +
                  "✨ Holo-Headphones: Now $0.99 (was $99.99!)\n" +
                  "✨ NeuroSync Smart Socks: Keep your feet in sync with the cloud for just $1.50!\n" +
                  "✨ Quantum Widget Spinner: Spin your way to enlightenment for only $0.50!\n\n" +
                  "Hurry, Detective Harper! These deals are so hot, they might just self-destruct. Click the link below to shop now!\n\n" +
                  "[Shop Now]\n\n" +
                  "Stay Tickled,\nThe GadgetFly Team",
            attachments: [],
            dateTime: "March 14, 2025 | 2:15 PM"
        },
        {
            id: 4,
            senderName: "Bargain Bonanza Bot",
            senderImage: "https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg",
            senderEmail: "promo@bargainbonanzabot.net",
            subject: "🤖 Don’t Miss Out: Buy One, Get 999 Free!",
            body: "Hello Detective Harper,\n\n" +
                  "I am Bargain Bonanza Bot, your friendly deal-finding AI! This week only, we’re offering a deal so wild, it might crash my circuits: Buy One, Get 999 FREE on all items!\n\n" +
                  "🛒 Cybernetic Cat Toys: Perfect for your robotic feline friend!\n" +
                  "🛒 Glow-in-the-Dark Toothpaste: Smile brighter than a neon billboard!\n" +
                  "🛒 Portable Black Hole Storage: Store ALL your detective files in a single void!\n\n" +
                  "Click below to claim your 999 free items before I overheat from excitement!\n\n" +
                  "[Claim Your Deal]\n\n" +
                  "Beep Boop Bargain,\nBargain Bonanza Bot",
            attachments: [{name: "📁 deal_flyer.pdf", url: "https://example.com/deal_flyer.pdf"}],
            dateTime: "March 13, 2025 | 9:00 AM"
        },
        {
            id: 5,
            senderName: "Wacky Widgets Warehouse",
            senderImage: "https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-vector-storage-warehouse-icon-png-image_711359.jpg",
            senderEmail: "sales@wackywarehouse.biz",
            subject: "🎉 Wacky Wednesday: Free Widgets for Life!",
            body: "Hey there, Detective Harper!\n\n" +
                  "It’s Wacky Wednesday at Wacky Widgets Warehouse, and we’re giving away FREE WIDGETS FOR LIFE to our first 1,000 customers!\n\n" +
                  "🌟 Self-Assembling Desk Widget: It builds itself while you sip coffee!\n" +
                  "🌟 Anti-Gravity Widget Holder: Defy physics for only $0.00!\n" +
                  "🌟 Widget That Sings Karaoke: Your new desk buddy with a voice of gold!\n\n" +
                  "Don’t miss out—your lifetime supply of widgets awaits! Click below to claim your wacky deal!\n\n" +
                  "[Get Your Widgets]\n\n" +
                  "Stay Wacky,\nThe Wacky Widgets Team",
            attachments: [],
            dateTime: "March 12, 2025 | 11:30 AM"
        },
        {
            id: 6,
            senderName: "Gizmo Galore Galaxy",
            senderImage: "https://t4.ftcdn.net/jpg/05/27/02/39/360_F_527023934_CBczAdqF43ZrP7qAuGLjY4UIQB4RhPJ2.jpg",
            senderEmail: "offers@gizmogaloregalaxy.com",
            subject: "🚀 Intergalactic Deals: 1 Credit Shipping!",
            body: "Greetings, Earthling Detective Harper!\n\n" +
                  "Gizmo Galore Galaxy is bringing the universe’s best deals straight to your inbox! This month, we’re offering 1 CREDIT SHIPPING on all intergalactic gizmos!\n\n" +
                  "🪐 Holographic Pet Rock: A companion that never dies!\n" +
                  "🪐 Warp-Speed Charger: Charge your devices in 0.0001 light-seconds!\n" +
                  "🪐 Galactic Glitter Spray: Shine brighter than a supernova!\n\n" +
                  "Beam up these deals before they get sucked into a black hole! Click below to shop now!\n\n" +
                  "[Shop the Galaxy]\n\n" +
                  "Cosmically Yours,\nThe Gizmo Galore Galaxy Crew",
            attachments: [{name: "📁 cosmic_catalog.pdf", url: "https://example.com/cosmic_catalog.pdf"}],
            dateTime: "March 11, 2025 | 3:45 PM"
        }
    ],
    trash: [
        {
            id: 1,
            senderName: "Ryan Gomez (HR, LuminaTech)",
            senderImage: "https://pbs.twimg.com/media/Ef04eIDWAAE6utv.jpg",
            senderEmail: "rgomez.hr@lumatech.com",
            subject: "Lunch Meeting Confirmation",
            body: "Hi Alice,\n\n" +
                  "Just confirming our lunch meeting tomorrow at Neon Diner, 1 PM. I know things have been tense lately with the Reid situation, but I promise it’s nothing heavy—just a casual chat. I’ll bring the Project Eclipse summary you asked for, though I’d prefer if we kept that between us for now.\n\n" +
                  "Looking forward to it,\nRyan",
            attachments: [],
            dateTime: "Deleted on March 6, 2025 | Originally sent on March 5, 2025 | 4:10 PM"
        },
        {
            id: 2,
            senderName: "Anonymous Tip",
            senderImage: "https://savedp.com/wp-content/uploads/2024/08/a-black-and-white-circle-with-sunglasses-on-it.jpg",
            senderEmail: "unknown@darknetmail.net",
            subject: "You Should Look Closer",
            body: "Detective Harper,\n\n" +
                  "I know you’re working on the Reid case. You might want to check the lab’s inventory logs from February 28th. There’s a discrepancy in the chemical supplies—something that shouldn’t have been there. I can’t say more, but you’re not the only one watching.\n\n" +
                  "Be careful.\n– A Friend",
            attachments: [],
            dateTime: "Deleted on March 7, 2025 | Originally sent on March 6, 2025 | 11:20 PM"
        },
        {
            id: 3,
            senderName: "LuminaTrust Foundation",
            senderImage: "ltlogo.png",
            senderEmail: "charity@luminatech.com",
            subject: "Thank You for Your Cooperation",
            body: "Dear Detective Harper,\n\n" +
                  "We wanted to express our gratitude for your discretion in handling the recent matter. As a token of our appreciation, we’ve arranged for an additional donation to the City PD’s charity fund—$10,000, as discussed. Should you need to reach out, please use the private line: 555-0134.\n\n" +
                  "We trust you’ll continue to prioritize the city’s best interests.\n\n" +
                  "Warm regards,\nLuminaTrust Foundation",
            attachments: [],
            dateTime: "Deleted on March 8, 2025 | Originally sent on March 7, 2025 | 2:30 PM"
        }
    ]
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
    if (email.attachments.length > 0) {
        email.attachments.forEach(attachment => {
            if (attachment && attachment.url) { // Check if attachment has a URL
                let link = document.createElement("a");
                link.href = attachment.url;
                link.textContent = attachment.name;
                link.target = "_blank";
                link.rel = "noopener noreferrer"; // Security best practice
                attachmentsDiv.appendChild(link);
                attachmentsDiv.appendChild(document.createElement("br"));
            }
        });
    } else {
        attachmentsDiv.innerHTML = "<p>No attachments</p>";
    }

    document.getElementById("email-date-time").textContent = email.dateTime;
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

// Profile Icon Toggle
const profileIcon = document.getElementById("profile-icon");
const profileDropdown = document.getElementById("profile-dropdown");

profileIcon.addEventListener("click", function(event) {
    event.stopPropagation();
    profileDropdown.classList.toggle("show");
});

// Close Profile Dropdown When Clicking Outside
document.addEventListener("click", function(event) {
    if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.classList.remove("show");
    }
});

// Back Button Functionality
document.getElementById("back-btn").addEventListener("click", function() {
    window.location.href = "welcome.html";
});

// Load Inbox by default
document.addEventListener("DOMContentLoaded", function() {
    loadEmails("inbox");
});