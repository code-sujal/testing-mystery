const caseList = document.getElementById('case-list');
const caseDetails = document.getElementById('case-details');
const caseTitle = document.getElementById('case-title');
const suspectImages = document.getElementById('suspect-images');
const victimImages = document.getElementById('victim-images');
const caseOverview = document.getElementById('case-overview');
const closeDetails = document.getElementById('close-details');
const searchBar = document.getElementById('search-bar');
const backBtn = document.getElementById('back-btn'); // Added back button reference

// Updated cases array with more detailed information
const cases = [
    {
        id: "CASE-001",
        name: "Bank Robbery",
        status: "solved",
        suspect: {
            name: "Henry, James ",
            age: 34,
            images: [
                "https://www.tcpalm.com/gcdn/-mm-/f8b7bef18f2c357b7da76cefbfd0ef8ae1ce4f6d/c=12-4-459-600/local/-/media/2016/10/19/Treasure%20Coast/TreasureCoast/636124856377968761-Anthony-Carpino.jpg?width=447&height=596&fit=crop&format=pjpg&auto=webp",
                "https://tbrnewsmedia.com/wp-content/uploads/2016/07/Michael-Dublarw-276x300.jpg"
            ],
            lastKnownLocation: "Downtown District",
            criminalRecord: "Previous robbery convictions"
        },
        victim: {
            name: "Late Mr. Mathews",
            type: "Bank Manager",
            images: ["https://i.pinimg.com/736x/ed/18/91/ed189191dc22169f0e6786a85f068616.jpg"],
            damageEstimate: "$250,000 + 1 Life Lossed"
        },
        overview: "Robbery at Central Bank on March 10, 2025. Suspect apprehended with stolen cash and murdered Mr. Mathews ,identified via CCTV. Case Status : Solved"
    },
    {
        id: "CASE-002",
        name: "Arson Incident",
        status: "solved",
        suspect: {
            name: "Jane Smith,Sara Welder",
            age: 28,
            images: [
                "https://cdn.workmob.com/stories_workmob/images/stories/thumb/ravi-sen-banking-udaipur-thumb.jpg",
                "https://img.izismile.com/img/img9/20160630/640/hot_female_criminals_that_would_be_perfect_for_orange_is_new_black_640_05.jpg"
            ],
            lastKnownLocation: "Industrial Zone",
            criminalRecord: "None"
        },
        victim: {
            name: "Warehouse Corp",
            type: "Corporate",
            images: [],
            damageEstimate: "$1,200,000 + 10 Lives Lossed"
        },
        overview: "Fire set at warehouse on February 15, 2025. Suspect confessed after evidence of accelerants found."
    },
    {
        id: "CASE-003",
        name: "Drug Trafficking",
        status: "solved",
        suspect: {
            name: "Carlos Rivera,Jane Smith",
            age: 42,
            images: [
                "https://static.vecteezy.com/system/resources/thumbnails/040/298/394/small_2x/ai-generated-prison-mugshot-of-young-arab-man-in-orange-jumpsuit-photo.jpg",
                "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/67801ade16337f001ded9f79.jpg"
            ],
            lastKnownLocation: "Port District",
            criminalRecord: "Drug possession, assault"
        },
        victim: {
            name: "Community Health Center",
            type: "Corporate",
            images: [],
            damageEstimate: "N/A - Public health impact"
        },
        overview: "Major drug bust on March 5, 2025. 75kg of cocaine seized, suspect arrested during sting operation."
    },
    {
        id: "CASE-004",
        name: "Homicide",
        status: "solved",
        suspect: {
            name: "Robert Kline",
            age: 39,
            images: [
                "https://image1.masterfile.com/getImage/NjAwLTAyMjAxNDUyZW4uMDAwMDAwMDA=ANup$I/600-02201452en_Masterfile.jpg",
                
            ],
            lastKnownLocation: "Westside Apartments",
            criminalRecord: "Domestic violence"
        },
        victim: {
            name: "Lisa Monroe",
            age: 35,
            images: ["https://visafoto.com/img/source355x388_in.jpg"],
            lastSeen: "March 15, 2025",
            status: "Deceased"
        },
        overview: "Murder reported on March 16, 2025. Suspect caught with murder weapon and confessed after interrogation."
    },
    {
        id: "CASE-005",
        name: "Cyber Fraud",
        status: "solved",
        suspect: {
            name: "Alex Chen",
            age: 26,
            images: [
                "https://www.boredpanda.com/blog/wp-content/uploads/2024/12/Luigi-Mangione-676d171c06d0e-png__700.jpg",
                
            ],
            lastKnownLocation: "Tech District",
            criminalRecord: "Identity theft"
        },
        victim: {
            name: "Multiple Individuals",
            type: "Civilian Group",
            images: [],
            damageEstimate: "$500,000"
        },
        overview: "Online scam uncovered on March 20, 2025. Suspect traced through IP and arrested with stolen data."
    },
    {
        id: "CASE-006",
        name: "Money Heist",
        status: "solved",
        suspect: {
            name: "Tokyo, Rio",
            age: "NO DATA",
            images: [
                "https://resize.elle.fr/portrait_1280/var/plain_site/storage/images/mode/la-mode-des-stars/la-panoplie-mode-de-tokyo-dans-la-casa-de-papel/95788919-1-fre-FR/La-panoplie-mode-de-Tokyo-dans-La-Casa-de-Papel.jpg",
                "https://assets.mycast.io/characters/rio-3280618-normal.jpg?1627889880"
            ],
            lastKnownLocation: "East Market",
            criminalRecord: "Petty theft"
        },
        victim: {
            name: "Bank of France",
            type: "Corporate",
            images: [],
            damageEstimate: "National Gold(worth couldn't be estimated)"
        },
        overview: "Armed robbery at Bank of France on March 22, 2025. Suspect identified via witness testimony ,Suspects couldn't be arrested. CASE STATUS : SOLVED"
    },
    {
        id: "CASE-007",
        name: "Death at LuminaTech Labs",
        status: "unsolved",
        suspect: {
            name: "Unknown",
            age: "Unknown",
            images: [],
            lastKnownLocation: "LuminTech Labs",
            criminalRecord: "N/A"
        },
        victim: {
            name: "Dr. Samuel Reid",
            age: 34,
            images: [
                "https://img.freepik.com/free-photo/confident-middle-aged-man-portrait_23-2149051736.jpg",
                
            ],
            lastSeen: "March 4, 2025",
            status: "Died"
        },
        overview: "Dr. Reid was found dead in his labs,Autopsy report pending from Doctors.Requires special attention from Detective Alice Harper."
    }
];

function renderCases(filter = '') {
    caseList.innerHTML = '';
    const filteredCases = cases.filter(c => 
        c.id.toLowerCase().includes(filter) || 
        c.name.toLowerCase().includes(filter) ||
        c.suspect.name.toLowerCase().includes(filter)
    );
    filteredCases.forEach((c, index) => {
        const folder = document.createElement('div');
        folder.className = `folder ${c.status}`;
        folder.innerHTML = `
            <i class="fas fa-folder"></i>
            <span>${c.id} - ${c.name}</span>
        `;
        folder.addEventListener('click', () => showCaseDetails(index));
        caseList.appendChild(folder);
    });
}

function showCaseDetails(index) {
    const c = cases[index];
    caseTitle.textContent = `${c.id} - ${c.name}`;

    // Render suspect details
    suspectImages.innerHTML = `
        <h3>Suspect: ${c.suspect.name}</h3>
        <div class="image-container">
            ${c.suspect.images.length > 0 
                ? c.suspect.images.map(img => `<img src="${img}" alt="${c.suspect.name}">`).join('')
                : '<p>No images available</p>'}
        </div>
        <div class="details">
            <p>Age: ${c.suspect.age}</p>
            <p>Last Known Location: ${c.suspect.lastKnownLocation}</p>
            <p>Criminal Record: ${c.suspect.criminalRecord}</p>
        </div>
    `;

    // Render victim details
    victimImages.innerHTML = `
        <h3>Victim: ${c.victim.name}</h3>
        <div class="image-container">
            ${c.victim.images.length > 0 
                ? c.victim.images.map(img => `<img src="${img}" alt="${c.victim.name}">`).join('')
                : '<p>No images available</p>'}
        </div>
        <div class="details">
            ${c.victim.age ? `<p>Age: ${c.victim.age}</p>` : ''}
            ${c.victim.type ? `<p>Type: ${c.victim.type}</p>` : ''}
            ${c.victim.damageEstimate ? `<p>Damage Estimate: ${c.victim.damageEstimate}</p>` : ''}
            ${c.victim.lastSeen ? `<p>Last Seen: ${c.victim.lastSeen}</p>` : ''}
            ${c.victim.status ? `<p>Status: ${c.victim.status}</p>` : ''}
        </div>
    `;

    caseOverview.textContent = c.overview;
    caseDetails.classList.remove('hidden');
}

closeDetails.addEventListener('click', () => {
    caseDetails.classList.add('hidden');
});

searchBar.addEventListener('input', () => {
    renderCases(searchBar.value.toLowerCase());
});

// Add event listener for back button
backBtn.addEventListener('click', () => {
    window.location.href = 'welcome.html'; // Navigate to welcome.html
});

// Initial render
renderCases();