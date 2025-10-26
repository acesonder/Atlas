// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    // Handle navigation clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            // Check if target element exists
            if (!targetElement) {
                console.error(`Section with id "${targetSection}" not found`);
                return;
            }
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            targetElement.classList.add('active');
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Add hover effect to spacecraft cards
    const spacecraftCards = document.querySelectorAll('.spacecraft-card');
    spacecraftCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#60a5fa';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#374151';
        });
    });

    // Initialize - show comet section by default
    console.log('Atlas Solar System Explorer initialized');
    
    // Add dynamic date update for footer
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Atlas - Solar System Explorer | Educational purposes`;
    }
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
    const activeButton = document.querySelector('.nav-btn.active');
    const currentIndex = navButtons.indexOf(activeButton);
    
    // Left arrow key
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navButtons[currentIndex - 1].click();
    }
    
    // Right arrow key
    if (e.key === 'ArrowRight' && currentIndex < navButtons.length - 1) {
        navButtons[currentIndex + 1].click();
    }
});
