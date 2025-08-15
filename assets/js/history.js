  // Mobile Menu Toggle
  document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Accordion Functionality
document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + 'px';
    });
});

// UN Documents Modal
const unDocs = {
    "UNGA194": {
        title: "UN General Assembly Resolution 194 (1948)",
        content: `
            <h3>Key Provisions:</h3>
            <ul>
                <li>Article 11: Affirms Palestinian refugees' right to return to their homes</li>
                <li>Established Conciliation Commission for Palestine</li>
                <li>Israel has refused implementation for 75+ years</li>
            </ul>
            <a href="../assets/docs/UNGA194.pdf" class="btn" target="_blank">Read Full Document</a>
        `
    },
    "UNSC242": {
        title: "UN Security Council Resolution 242 (1967)",
        content: `
            <h3>Key Provisions:</h3>
            <ul>
                <li>Calls for Israeli withdrawal from occupied territories</li>
                <li>Emphasizes "inadmissibility of territory acquisition by war"</li>
                <li>Israel has violated this resolution for 55+ years</li>
            </ul>
            <a href="../assets/docs/UNSC242.pdf" class="btn" target="_blank">Read Full Document</a>
        `
    },
    "UNSC338": {
        title: "UN Security Council Resolution 338 (1973)",
        content: `
            <h3>Key Provisions:</h3>
            <ul>
                <li>Calls for implementation of 242</li>
                <li>Demands ceasefire and negotiations</li>
            </ul>
        `
    },
    "UNGA3236": {
        title: "UN General Assembly Resolution 3236 (1974)",
        content: `
            <h3>Key Provisions:</h3>
            <ul>
                <li>Reaffirms Palestinian right to self-determination</li>
                <li>Recognizes PLO as representative of Palestinian people</li>
            </ul>
        `
    },
    "UNSC465": {
        title: "UN Security Council Resolution 465 (1980)",
        content: `
            <h3>Key Provisions:</h3>
            <ul>
                <li>Condemns Israeli settlements as illegal</li>
                <li>Calls for dismantling existing settlements</li>
            </ul>
        `
    },
    "UNGAES10L22": {
         title: "UN General Assembly ES-10/L.22 (2017)",
         content: `
             <h3>Key Provisions:</h3>
             <ul>
                 <li>Condemns US Jerusalem recognition</li>
                 <li>Affirms Jerusalem as final status issue</li>
             </ul>
         `
     },
     "UNHRC43": {
         title: "Human Rights Council 43 (2020)",
         content: `
             <h3>Key Provisions:</h3>
             <ul>
                 <li>Documents war crimes in Gaza</li>
                 <li>Calls for accountability</li>
             </ul>
         `
     },
     "UNGAES10L25": {
         title: "UN General Assembly ES-10/L.25 (2023)",
         content: `
             <h3>Key Provisions:</h3>
             <ul>
                 <li>Calls for immediate ceasefire in Gaza</li>
                 <li>Demands humanitarian access</li>
             </ul>
         `
     }
    // Additional documents can be added
};

document.querySelectorAll('.doc-card').forEach(card => {
    card.addEventListener('click', function() {
        const docId = this.dataset.doc;
        const doc = unDocs[docId];
        
        document.getElementById('doc-display').innerHTML = `
            <h2>${doc.title}</h2>
            ${doc.content}
        `;
        document.getElementById('doc-modal').style.display = 'block';
    });
});

// Close Modal
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Interactive Map
const mapData = {
    "1917": { 
        img: "palestine-1917.png",
        stats: "100% Palestinian control under Ottoman rule"
    },
    "1947": { 
        img: "partition-plan.png",
        stats: "UN proposed giving 55% to Jewish state (33% population)"
    },
    "1967": { 
        img: "post-1967.png",
        stats: "Israel occupies 100% of historic Palestine"
    },
    "1993": { 
        img: "oslo-accords.png",
        stats: "Palestinians control just 18% of West Bank in disconnected cantons"
    },
    "2024": { 
        img: "current-map.png",
        stats: "Israel controls 94% of historic Palestine directly or indirectly"
    }
};

document.querySelectorAll('.map-controls button').forEach(btn => {
    btn.addEventListener('click', function() {
        const year = this.dataset.year;
        document.getElementById('dynamic-map').src = `../assets/img/maps/${mapData[year].img}`;
        // Update tooltip or stats display as needed
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
