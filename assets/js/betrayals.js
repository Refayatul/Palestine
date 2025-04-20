document.addEventListener('DOMContentLoaded', function() {
    // Toggle evidence sections
    const evidenceBtns = document.querySelectorAll('.evidence-btn');
    
    evidenceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const betrayalItem = this.closest('.betrayal-item');
            
            // Close other open items first
            document.querySelectorAll('.betrayal-item').forEach(item => {
                if (item !== betrayalItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherBtn = item.querySelector('.evidence-btn');
                    otherBtn.innerHTML = '<span>View Evidence</span><i class="fas fa-chevron-down"></i>';
                }
            });
            
            // Toggle current item
            betrayalItem.classList.toggle('active');
            
            // Update button text and icon
            if (betrayalItem.classList.contains('active')) {
                this.innerHTML = '<span>Hide Evidence</span><i class="fas fa-chevron-up"></i>';
                
                // Smooth scroll to show full content
                setTimeout(() => {
                    betrayalItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            } else {
                this.innerHTML = '<span>View Evidence</span><i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // Modal functionality
    const evidenceModal = document.querySelector('.evidence-modal');
    
    document.querySelectorAll('.evidence-gallery img').forEach(img => {
        img.addEventListener('click', function() {
            const modalTitle = document.getElementById('modal-title');
            const modalImage = document.getElementById('modal-image');
            
            modalTitle.textContent = this.closest('.betrayal-item').querySelector('h3').textContent + ' Evidence';
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            
            evidenceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    evidenceModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    function closeModal() {
        evidenceModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && evidenceModal.classList.contains('active')) {
            closeModal();
        }
    });

});