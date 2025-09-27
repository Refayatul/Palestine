document.addEventListener('DOMContentLoaded', function () {
    const selectButtons = document.querySelectorAll('.select-variant');
    const embedCodeTextarea = document.getElementById('embed-code-textarea');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const previewContainer = document.getElementById('badge-preview-container');

    // Badge templates
    const badgeTemplates = {
        classic: {
            html: `<div class="palestine-badge classic-badge">
    <span>Free Palestine</span>
    <i class="fas fa-star"></i>
</div>`,
            css: `.palestine-badge.classic-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    color: white;
    border-radius: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.palestine-badge.classic-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.palestine-badge.classic-badge i {
    color: #f59e0b;
}`
        },
        flag: {
            html: `<div class="palestine-badge flag-badge">
    <div class="flag-colors">
        <div class="black"></div>
        <div class="white"></div>
        <div class="green"></div>
    </div>
    <span>Palestine</span>
</div>`,
            css: `.palestine-badge.flag-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: white;
    color: #1e3a8a;
    border-radius: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border: 2px solid #1e3a8a;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.palestine-badge.flag-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.palestine-badge.flag-badge .flag-colors {
    display: flex;
    width: 20px;
    height: 14px;
    border-radius: 2px;
    overflow: hidden;
}

.palestine-badge.flag-badge .flag-colors div {
    flex: 1;
}

.palestine-badge.flag-badge .flag-colors .black { background: #000000; }
.palestine-badge.flag-badge .flag-colors .white { background: #ffffff; }
.palestine-badge.flag-badge .flag-colors .green { background: #00a651; }`
        },
        solidarity: {
            html: `<div class="palestine-badge solidarity-badge">
    <i class="fas fa-hand-holding-heart"></i>
    <span>Stand with Palestine</span>
</div>`,
            css: `.palestine-badge.solidarity-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #dc2626, #ef4444);
    color: white;
    border-radius: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.palestine-badge.solidarity-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.palestine-badge.solidarity-badge i {
    color: #ffffff;
}`
        }
    };

    // Event listeners for variant selection
    selectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const variant = this.getAttribute('data-variant');
            selectBadgeVariant(variant);
        });
    });

    // Copy code functionality
    copyCodeBtn.addEventListener('click', function () {
        const code = embedCodeTextarea.value;
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                showCopyFeedback();
            }).catch(err => {
                // Fallback for older browsers
                embedCodeTextarea.select();
                document.execCommand('copy');
                showCopyFeedback();
            });
        }
    });

    function selectBadgeVariant(variant) {
        const template = badgeTemplates[variant];

        // Generate embed code
        const embedCode = `<style>
${template.css}
</style>
${template.html}`;

        // Update textarea
        embedCodeTextarea.value = embedCode;
        copyCodeBtn.disabled = false;

        // Update preview
        updatePreview(variant);

        // Highlight selected variant
        selectButtons.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.getAttribute('data-variant') === variant) {
                btn.classList.add('selected');
            }
        });
    }

    function updatePreview(variant) {
        const template = badgeTemplates[variant];

        // Clear previous preview
        previewContainer.innerHTML = '';

        // Add CSS to page for preview
        let styleElement = document.getElementById('preview-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'preview-styles';
            document.head.appendChild(styleElement);
        }
        styleElement.textContent = template.css;

        // Add HTML to preview container
        previewContainer.innerHTML = template.html;
    }

    function showCopyFeedback() {
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = 'Copied!';
        copyCodeBtn.disabled = true;

        setTimeout(() => {
            copyCodeBtn.textContent = originalText;
            copyCodeBtn.disabled = false;
        }, 2000);
    }

    // Initialize with first variant
    setTimeout(() => {
        selectBadgeVariant('classic');
    }, 100);
});
