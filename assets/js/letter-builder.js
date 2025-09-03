document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country-select');
    const recipientSelect = document.getElementById('recipient-select');
    const topicSelect = document.getElementById('topic-select');
    const yourNameInput = document.getElementById('your-name');
    const yourAddressInput = document.getElementById('your-address');
    const generateButton = document.getElementById('generate-letter');
    const copyButton = document.getElementById('copy-letter');
    const emailButton = document.getElementById('email-letter');
    const letterContent = document.getElementById('letter-content');

    // Letter templates
    const letterTemplates = {
        ceasefire: {
            subject: "Demand for Immediate Ceasefire in Gaza",
            body: `I am writing to urgently demand an immediate ceasefire in Gaza and the occupied Palestinian territories. The ongoing violence has resulted in thousands of civilian deaths, including many children, and has created a humanitarian catastrophe.

As your constituent, I strongly urge you to:
1. Publicly call for an immediate ceasefire
2. Support international diplomatic efforts to end the violence
3. Ensure humanitarian aid reaches all affected populations
4. Work towards a just and lasting peace based on international law

The international community must act now to prevent further loss of life and destruction. I expect you to use your position to advocate for peace and justice for all people in the region.`
        },
        recognition: {
            subject: "Recognition of Palestine as a Sovereign State",
            body: `I am writing to urge the recognition of Palestine as a sovereign state and the immediate establishment of diplomatic relations. Palestine has met the criteria for statehood under international law and deserves full recognition by the international community.

As your constituent, I strongly urge you to:
1. Officially recognize the State of Palestine
2. Support Palestine's membership in the United Nations
3. Establish full diplomatic relations with Palestine
4. Support Palestinian self-determination and sovereignty

Recognition of Palestine is not only a matter of justice but also essential for achieving lasting peace and stability in the region.`
        },
        arms: {
            subject: "Stop Arms Sales to Israel",
            body: `I am writing to demand an immediate halt to all arms sales and military aid to Israel. The continued provision of weapons that are being used in violations of international humanitarian law is unacceptable and makes our government complicit in these violations.

As your constituent, I strongly urge you to:
1. Immediately suspend all arms sales to Israel
2. Conduct a full review of military aid programs
3. Ensure compliance with international humanitarian law
4. Support accountability for war crimes

Our government must not be complicit in the violation of international law and human rights. I expect you to take immediate action to stop this support.`
        },
        sanctions: {
            subject: "Impose Sanctions on Israel for Violations of International Law",
            body: `I am writing to demand the imposition of sanctions on Israel for its systematic violations of international humanitarian law and human rights. The ongoing occupation and blockade have created a system of apartheid that must be addressed by the international community.

As your constituent, I strongly urge you to:
1. Support targeted sanctions against Israeli officials responsible for violations
2. Impose sanctions on companies involved in settlement construction
3. Support the UN database of companies doing business in settlements
4. Work for accountability through international legal mechanisms

Sanctions are a necessary tool to pressure for compliance with international law and to achieve justice for the Palestinian people.`
        },
        humanitarian: {
            subject: "Ensure Humanitarian Aid Reaches Gaza",
            body: `I am writing to demand immediate action to ensure humanitarian aid reaches the people of Gaza who are facing a catastrophic humanitarian crisis. The blockade and ongoing violence have created desperate conditions that require urgent international intervention.

As your constituent, I strongly urge you to:
1. Support immediate humanitarian corridors to Gaza
2. Pressure for the lifting of the illegal blockade
3. Ensure aid reaches all affected populations without restrictions
4. Support international monitoring of aid distribution

The humanitarian crisis in Gaza demands immediate action. Our government must use all available diplomatic and economic pressure to ensure aid reaches those who need it most.`
        }
    };

    // Contact information for different countries
    const contactInfo = {
        us: {
            senator: {
                email: "senator@senate.gov",
                instructions: "Find your senators at congress.gov"
            },
            representative: {
                email: "representative@house.gov",
                instructions: "Find your representative at congress.gov"
            },
            president: {
                email: "president@whitehouse.gov",
                instructions: "Contact the President through the White House website"
            }
        },
        uk: {
            mp: {
                email: "MP@parliament.uk",
                instructions: "Find your MP at parliament.uk"
            },
            "prime-minister": {
                email: "pm@10downingstreet.gov.uk",
                instructions: "Contact through the Prime Minister's office"
            }
        },
        canada: {
            mp: {
                email: "MP@parl.gc.ca",
                instructions: "Find your MP at parl.gc.ca"
            },
            "prime-minister": {
                email: "pm@pm.gc.ca",
                instructions: "Contact through the Prime Minister's office"
            }
        },
        germany: {
            mp: {
                email: "MP@bundestag.de",
                instructions: "Find your representative at bundestag.de"
            }
        },
        france: {
            mp: {
                email: "depute@assemblee-nationale.fr",
                instructions: "Find your deputy at assemblee-nationale.fr"
            },
            president: {
                email: "president@elysee.fr",
                instructions: "Contact through the President's office"
            }
        },
        australia: {
            mp: {
                email: "MP@aph.gov.au",
                instructions: "Find your MP at aph.gov.au"
            },
            "prime-minister": {
                email: "pm@pm.gov.au",
                instructions: "Contact through the Prime Minister's office"
            }
        }
    };

    // Generate letter function
    function generateLetter() {
        const country = countrySelect.value;
        const recipient = recipientSelect.value;
        const topic = topicSelect.value;
        const yourName = yourNameInput.value.trim();
        const yourAddress = yourAddressInput.value.trim();

        if (!country || !recipient || !topic || !yourName) {
            alert('Please fill in all required fields (Country, Recipient, Topic, and Your Name)');
            return;
        }

        const template = letterTemplates[topic];
        const contact = contactInfo[country] ? contactInfo[country][recipient] : null;

        let letterHTML = '';

        // Add header with date
        const today = new Date().toLocaleDateString();
        letterHTML += `<div class="letter-header">
            <div class="sender-address">
                ${yourAddress.replace(/\n/g, '<br>')}
            </div>
            <div class="date">${today}</div>
        </div>`;

        // Add recipient info
        letterHTML += `<div class="recipient-info">
            <p>The ${recipient.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p>Parliament/House of Representatives</p>
            <p>Capital City, ${country.toUpperCase()}</p>
        </div>`;

        // Add salutation
        letterHTML += `<div class="salutation">
            <p>Dear ${recipient.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())},</p>
        </div>`;

        // Add body
        letterHTML += `<div class="letter-body">
            <p>${template.body.replace(/\n/g, '</p><p>')}</p>
        </div>`;

        // Add closing
        letterHTML += `<div class="closing">
            <p>Sincerely,</p>
            <p>${yourName}</p>
        </div>`;

        // Add contact instructions if available
        if (contact) {
            letterHTML += `<div class="contact-info">
                <p><strong>How to contact:</strong></p>
                <p>${contact.instructions}</p>
                <p>Email: ${contact.email}</p>
            </div>`;
        }

        letterContent.innerHTML = letterHTML;

        // Enable action buttons
        copyButton.disabled = false;
        emailButton.disabled = false;
    }

    // Copy letter to clipboard
    function copyLetter() {
        const letterText = letterContent.innerText;
        navigator.clipboard.writeText(letterText).then(function() {
            // Show success feedback
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#27ae60';
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.background = '';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy to clipboard. Please select and copy manually.');
        });
    }

    // Open in email client
    function emailLetter() {
        const country = countrySelect.value;
        const recipient = recipientSelect.value;
        const topic = topicSelect.value;
        const template = letterTemplates[topic];
        const contact = contactInfo[country] ? contactInfo[country][recipient] : null;

        if (contact) {
            const subject = encodeURIComponent(template.subject);
            const body = encodeURIComponent(letterContent.innerText);
            const mailtoLink = `mailto:${contact.email}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        } else {
            alert('Email contact information not available for this selection. Please copy the letter and send manually.');
        }
    }

    // Event listeners
    generateButton.addEventListener('click', generateLetter);
    copyButton.addEventListener('click', copyLetter);
    emailButton.addEventListener('click', emailLetter);

    // Auto-save form data to localStorage
    function saveFormData() {
        const formData = {
            country: countrySelect.value,
            recipient: recipientSelect.value,
            topic: topicSelect.value,
            name: yourNameInput.value,
            address: yourAddressInput.value
        };
        localStorage.setItem('letterBuilderData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('letterBuilderData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            countrySelect.value = formData.country || '';
            recipientSelect.value = formData.recipient || '';
            topicSelect.value = formData.topic || '';
            yourNameInput.value = formData.name || '';
            yourAddressInput.value = formData.address || '';
        }
    }

    // Save data on input changes
    [countrySelect, recipientSelect, topicSelect, yourNameInput, yourAddressInput].forEach(element => {
        element.addEventListener('input', saveFormData);
        element.addEventListener('change', saveFormData);
    });

    // Load saved data on page load
    loadFormData();
});
