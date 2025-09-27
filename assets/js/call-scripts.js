document.addEventListener('DOMContentLoaded', function() {
    const countryFilter = document.getElementById('country-filter');
    const topicFilter = document.getElementById('topic-filter');
    const recipientFilter = document.getElementById('recipient-filter');
    const scriptsGrid = document.getElementById('scripts-grid');
    const resultsCount = document.getElementById('results-count');

    // Call scripts data
    const callScripts = [
        {
            id: 1,
            country: "us",
            topic: "ceasefire",
            recipient: "senator",
            title: "Demand Immediate Ceasefire - US Senator",
            introduction: "Hello, I'm calling as a constituent from [Your City/State]. I would like to speak with Senator [Name] about the urgent need for an immediate ceasefire in Gaza.",
            mainPoints: [
                "The ongoing violence in Gaza has resulted in over 30,000 Palestinian deaths, including thousands of children",
                "A ceasefire is essential to allow humanitarian aid to reach the 2.3 million Palestinians in Gaza who are facing starvation",
                "The United States has significant influence over Israel and must use that leverage to demand an immediate ceasefire",
                "As your constituent, I urge you to publicly call for an immediate ceasefire and work with the Biden administration to make this happen"
            ],
            closing: "Thank you for your time. I will be following this issue closely and will remember your position when I vote. May I have your response to share with other constituents?"
        },
        {
            id: 2,
            country: "us",
            topic: "arms",
            recipient: "representative",
            title: "Stop US Arms Sales to Israel - US Representative",
            introduction: "Hello, I'm calling as a constituent from [Your District]. I would like to speak with Representative [Name] about stopping US military aid to Israel.",
            mainPoints: [
                "The US provides Israel with $3.8 billion in military aid annually, which is being used in violations of international humanitarian law",
                "US-supplied weapons have been used in attacks on civilian infrastructure, hospitals, and refugee camps in Gaza",
                "Congress has the authority to condition or halt military aid under the Arms Export Control Act",
                "As your constituent, I urge you to support legislation that conditions military aid to Israel on compliance with international law"
            ],
            closing: "Thank you for your time. Will you commit to supporting measures to halt military aid to Israel until it complies with international humanitarian law?"
        },
        {
            id: 3,
            country: "uk",
            topic: "ceasefire",
            recipient: "mp",
            title: "Demand Ceasefire in Gaza - UK MP",
            introduction: "Hello, I'm calling as a constituent from [Your Constituency]. I would like to speak with MP [Name] about the urgent need for a ceasefire in Gaza.",
            mainPoints: [
                "The UK has historically played a key role in Middle East diplomacy and must use its influence now",
                "Over 30,000 Palestinians have been killed in Gaza, including 14,000 children, in what the Center for Constitutional Rights calls a 'textbook case of genocide'",
                "The UK must demand an immediate ceasefire and support international efforts to hold Israel accountable",
                "As your constituent, I urge you to publicly call for an immediate ceasefire and support the suspension of arms sales to Israel"
            ],
            closing: "Thank you for your time. Will you commit to advocating for an immediate ceasefire in Gaza and the suspension of UK arms sales to Israel?"
        },
        {
            id: 4,
            country: "canada",
            topic: "recognition",
            recipient: "mp",
            title: "Recognize Palestine - Canadian MP",
            introduction: "Hello, I'm calling as a constituent from [Your Riding]. I would like to speak with MP [Name] about Canada's recognition of Palestine.",
            mainPoints: [
                "Canada recognized Palestine in 1995 but suspended diplomatic relations in 2000",
                "Palestine meets all the criteria for statehood under international law",
                "Recognition would strengthen Canada's position in international diplomacy",
                "As your constituent, I urge you to support Canada's formal recognition of the State of Palestine"
            ],
            closing: "Thank you for your time. Will you support Canada's formal recognition of Palestine as a sovereign state?"
        },
        {
            id: 5,
            country: "germany",
            topic: "sanctions",
            recipient: "mp",
            title: "Impose Sanctions on Israel - German MP",
            introduction: "Hello, I'm calling as a constituent from [Your Constituency]. I would like to speak with MP [Name] about imposing sanctions on Israel.",
            mainPoints: [
                "Germany has a special historical responsibility and must not be complicit in violations of international law",
                "The UN Special Rapporteur on the occupied Palestinian territories has concluded that Israel's policies constitute apartheid",
                "Targeted sanctions against individuals responsible for violations are necessary to pressure for compliance with international law",
                "As your constituent, I urge you to support EU sanctions against Israeli officials responsible for war crimes"
            ],
            closing: "Thank you for your time. Will you support targeted sanctions against Israeli officials responsible for violations of international law?"
        },
        {
            id: 6,
            country: "france",
            topic: "humanitarian",
            recipient: "mp",
            title: "Humanitarian Aid to Gaza - French MP",
            introduction: "Hello, I'm calling as a constituent from [Your Constituency]. I would like to speak with Deputy [Name] about humanitarian aid to Gaza.",
            mainPoints: [
                "France has played a leading role in humanitarian efforts and must increase pressure for aid delivery to Gaza",
                "2.3 million Palestinians in Gaza are facing catastrophic hunger and disease",
                "Israel's blockade and destruction of infrastructure have made aid delivery nearly impossible",
                "As your constituent, I urge you to support increased French humanitarian aid and diplomatic pressure for unhindered aid delivery"
            ],
            closing: "Thank you for your time. Will you support increased humanitarian aid to Gaza and diplomatic efforts to ensure its delivery?"
        },
        {
            id: 7,
            country: "australia",
            topic: "apartheid",
            recipient: "mp",
            title: "End Apartheid System - Australian MP",
            introduction: "Hello, I'm calling as a constituent from [Your Electorate]. I would like to speak with MP [Name] about Australia's response to apartheid in Palestine.",
            mainPoints: [
                "Multiple human rights organizations, including Human Rights Watch and Amnesty International, have concluded that Israel's treatment of Palestinians constitutes apartheid",
                "Australia has a strong tradition of opposing apartheid systems",
                "The Australian government must end military cooperation with Israel and support accountability measures",
                "As your constituent, I urge you to support measures to end Australia's complicity in apartheid"
            ],
            closing: "Thank you for your time. Will you support ending Australia's military cooperation with Israel and measures to hold it accountable for apartheid?"
        },
        {
            id: 8,
            country: "us",
            topic: "sanctions",
            recipient: "senator",
            title: "Support Sanctions on Israel - US Senator",
            introduction: "Hello, I'm calling as a constituent from [Your State]. I would like to speak with Senator [Name] about supporting sanctions against Israel.",
            mainPoints: [
                "The US has significant economic leverage over Israel and must use it to demand compliance with international law",
                "Targeted sanctions against individuals and entities responsible for violations are authorized under US law",
                "The Biden administration has already sanctioned some Israeli settlers for extremist violence",
                "As your constituent, I urge you to support expanded sanctions against those responsible for war crimes and apartheid policies"
            ],
            closing: "Thank you for your time. Will you support targeted sanctions against Israeli officials and entities responsible for violations of international law?"
        },
        {
            id: 9,
            country: "uk",
            topic: "arms",
            recipient: "mp",
            title: "Suspend UK Arms Sales to Israel - UK MP",
            introduction: "Hello, I'm calling as a constituent from [Your Constituency]. I would like to speak with MP [Name] about suspending UK arms sales to Israel.",
            mainPoints: [
                "The UK has exported £300 million worth of arms to Israel since 2015, despite clear risk of their use in violations of international humanitarian law",
                "UK arms have been used in attacks on Gaza that have killed over 30,000 Palestinians",
                "The UK government has a legal obligation under the Arms Trade Treaty to halt exports where there is a clear risk of serious violations",
                "As your constituent, I urge you to support an immediate suspension of all arms sales to Israel"
            ],
            closing: "Thank you for your time. Will you support legislation to suspend all UK arms sales to Israel until it complies with international humanitarian law?"
        },
        {
            id: 10,
            country: "canada",
            topic: "humanitarian",
            recipient: "mp",
            title: "Increase Humanitarian Aid - Canadian MP",
            introduction: "Hello, I'm calling as a constituent from [Your Riding]. I would like to speak with MP [Name] about increasing Canada's humanitarian aid to Palestinians.",
            mainPoints: [
                "Canada provides only $25 million annually to UNRWA, despite serving 6 million Palestinian refugees",
                "The humanitarian crisis in Gaza requires immediate and substantial aid increases",
                "Canada must also pressure Israel to lift its blockade and allow aid delivery",
                "As your constituent, I urge you to support a significant increase in humanitarian aid to Palestinians"
            ],
            closing: "Thank you for your time. Will you support increasing Canada's humanitarian aid to Palestinians and diplomatic pressure for aid delivery to Gaza?"
        }
    ];

    // Render scripts
    function renderScripts(scripts) {
        scriptsGrid.innerHTML = '';

        if (scripts.length === 0) {
            scriptsGrid.innerHTML = '<div class="no-scripts">No scripts found matching your criteria. Try adjusting your filters.</div>';
            return;
        }

        scripts.forEach(script => {
            const scriptCard = document.createElement('div');
            scriptCard.className = 'script-card';
            scriptCard.innerHTML = `
                <div class="script-header">
                    <h3>${script.title}</h3>
                    <div class="script-meta">
                        <span class="country-tag">${script.country.toUpperCase()}</span>
                        <span class="topic-tag">${script.topic}</span>
                        <span class="recipient-tag">${script.recipient}</span>
                    </div>
                </div>
                <div class="script-content">
                    <div class="script-section">
                        <h4>Introduction:</h4>
                        <p class="script-text">${script.introduction}</p>
                    </div>
                    <div class="script-section">
                        <h4>Key Points:</h4>
                        <ul class="script-points">
                            ${script.mainPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="script-section">
                        <h4>Closing:</h4>
                        <p class="script-text">${script.closing}</p>
                    </div>
                </div>
                <div class="script-actions">
                    <button class="btn copy-script" data-script-id="${script.id}">Copy Script</button>
                    <button class="btn print-script" data-script-id="${script.id}">Print Script</button>
                </div>
            `;
            scriptsGrid.appendChild(scriptCard);
        });

        // Add event listeners for copy and print buttons
        document.querySelectorAll('.copy-script').forEach(button => {
            button.addEventListener('click', function() {
                const scriptId = parseInt(this.getAttribute('data-script-id'));
                copyScript(scriptId);
            });
        });

        document.querySelectorAll('.print-script').forEach(button => {
            button.addEventListener('click', function() {
                const scriptId = parseInt(this.getAttribute('data-script-id'));
                printScript(scriptId);
            });
        });
    }

    // Filter scripts
    function filterScripts() {
        const countryValue = countryFilter.value;
        const topicValue = topicFilter.value;
        const recipientValue = recipientFilter.value;

        const filteredScripts = callScripts.filter(script => {
            const countryMatch = !countryValue || script.country === countryValue;
            const topicMatch = !topicValue || script.topic === topicValue;
            const recipientMatch = !recipientValue || script.recipient === recipientValue;

            return countryMatch && topicMatch && recipientMatch;
        });

        resultsCount.textContent = filteredScripts.length;
        renderScripts(filteredScripts);
    }

    // Copy script to clipboard
    function copyScript(scriptId) {
        const script = callScripts.find(s => s.id === scriptId);
        if (!script) return;

        const scriptText = `
INTRODUCTION:
${script.introduction}

KEY POINTS:
${script.mainPoints.map(point => `• ${point}`).join('\n')}

CLOSING:
${script.closing}
        `;

        navigator.clipboard.writeText(scriptText).then(function() {
            showFeedback('Script copied to clipboard!', 'success');
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            showFeedback('Failed to copy. Please select and copy manually.', 'error');
        });
    }

    // Print script
    function printScript(scriptId) {
        const script = callScripts.find(s => s.id === scriptId);
        if (!script) return;

        const printWindow = window.open('', '_blank');
        const scriptHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${script.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                    h1 { color: #ce1126; border-bottom: 2px solid #ce1126; padding-bottom: 10px; }
                    h2 { color: #009736; margin-top: 30px; }
                    .script-text { margin: 15px 0; }
                    .script-points { margin: 15px 0; padding-left: 20px; }
                    .script-points li { margin-bottom: 8px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <h1>${script.title}</h1>

                <h2>Introduction</h2>
                <p class="script-text">${script.introduction}</p>

                <h2>Key Points</h2>
                <ul class="script-points">
                    ${script.mainPoints.map(point => `<li>${point}</li>`).join('')}
                </ul>

                <h2>Closing</h2>
                <p class="script-text">${script.closing}</p>
            </body>
            </html>
        `;

        printWindow.document.write(scriptHTML);
        printWindow.document.close();
        printWindow.print();
    }

    // Show feedback message
    function showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    // Add CSS animations for feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    countryFilter.addEventListener('change', filterScripts);
    topicFilter.addEventListener('change', filterScripts);
    recipientFilter.addEventListener('change', filterScripts);

    // Initial render
    filterScripts();
});
