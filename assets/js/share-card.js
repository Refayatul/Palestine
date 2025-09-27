document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');
    const headlineInput = document.getElementById('headline');
    const subtextInput = document.getElementById('subtext');
    const backgroundSelect = document.getElementById('background-select');
    const logoToggle = document.getElementById('logo-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');

    // Canvas dimensions
    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 630;

    // Colors and themes
    const themes = {
        default: {
            background: '#1e3a8a',
            textColor: '#ffffff',
            accentColor: '#f59e0b'
        },
        dark: {
            background: '#111827',
            textColor: '#ffffff',
            accentColor: '#10b981'
        },
        light: {
            background: '#f8fafc',
            textColor: '#1e293b',
            accentColor: '#1e3a8a'
        },
        flag: {
            background: 'linear-gradient(90deg, #000000 33%, #ffffff 33%, #ffffff 66%, #00a651 66%)',
            textColor: '#ffffff',
            accentColor: '#dc2626'
        }
    };

    // Initialize canvas with default theme
    drawCard();

    // Event listeners
    headlineInput.addEventListener('input', drawCard);
    subtextInput.addEventListener('input', drawCard);
    backgroundSelect.addEventListener('change', drawCard);
    logoToggle.addEventListener('change', drawCard);

    generateBtn.addEventListener('click', function() {
        drawCard();
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PNG';
    });

    downloadBtn.addEventListener('click', downloadCard);

    function drawCard() {
        const headline = headlineInput.value || 'Free Palestine';
        const subtext = subtextInput.value || 'Stand with justice and liberation';
        const theme = themes[backgroundSelect.value];
        const includeLogo = logoToggle.checked;

        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw background
        if (backgroundSelect.value === 'flag') {
            // Create gradient for flag
            const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(0.33, '#000000');
            gradient.addColorStop(0.33, '#ffffff');
            gradient.addColorStop(0.66, '#ffffff');
            gradient.addColorStop(0.66, '#00a651');
            gradient.addColorStop(1, '#00a651');
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = theme.background;
        }

        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Add subtle pattern for non-flag themes
        if (backgroundSelect.value !== 'flag') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            for (let i = 0; i < CANVAS_WIDTH; i += 50) {
                for (let j = 0; j < CANVAS_HEIGHT; j += 50) {
                    ctx.fillRect(i, j, 25, 25);
                }
            }
        }

        // Draw logo if enabled
        if (includeLogo) {
            drawLogo();
        }

        // Draw text
        drawText(headline, subtext, theme);
    }

    function drawLogo() {
        // Simple text-based logo (you can replace with actual logo image)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Free', 80, 120);

        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Palestine', 80, 180);
    }

    function drawText(headline, subtext, theme) {
        // Headline
        ctx.fillStyle = theme.textColor;
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';

        // Word wrap headline if too long
        const words = headline.split(' ');
        let headlineLines = [];
        let currentLine = '';

        ctx.font = 'bold 72px Arial';
        for (let word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);

            if (metrics.width > CANVAS_WIDTH - 160 && currentLine) {
                headlineLines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        headlineLines.push(currentLine);

        // Draw headline lines
        let yPos = CANVAS_HEIGHT / 2 - (headlineLines.length * 40);
        headlineLines.forEach((line, index) => {
            ctx.fillText(line, CANVAS_WIDTH / 2, yPos + (index * 80));
        });

        // Subtext
        ctx.fillStyle = theme.textColor;
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';

        // Word wrap subtext
        const subtextWords = subtext.split(' ');
        let subtextLines = [];
        let currentSubtextLine = '';

        ctx.font = '36px Arial';
        for (let word of subtextWords) {
            const testLine = currentSubtextLine + (currentSubtextLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);

            if (metrics.width > CANVAS_WIDTH - 160 && currentSubtextLine) {
                subtextLines.push(currentSubtextLine);
                currentSubtextLine = word;
            } else {
                currentSubtextLine = testLine;
            }
        }
        subtextLines.push(currentSubtextLine);

        // Draw subtext lines
        let subtextYPos = CANVAS_HEIGHT / 2 + 100;
        subtextLines.forEach((line, index) => {
            ctx.fillText(line, CANVAS_WIDTH / 2, subtextYPos + (index * 50));
        });

        // Add hashtag
        ctx.fillStyle = theme.accentColor;
        ctx.font = 'bold 32px Arial';
        ctx.fillText('#FreePalestine', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
    }

    function downloadCard() {
        // Create download link
        const link = document.createElement('a');
        link.download = 'palestine-share-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Show feedback
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'Downloaded!';
        downloadBtn.disabled = true;

        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    }

    // Auto-generate on page load with default content
    setTimeout(() => {
        drawCard();
        downloadBtn.disabled = false;
    }, 500);
});
