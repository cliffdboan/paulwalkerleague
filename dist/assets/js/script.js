// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Poll voting functionality
    const voteButtons = document.querySelectorAll('.vote-button');

    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pollCard = this.closest('.poll-card');
            const pollOptions = pollCard.querySelectorAll('.poll-option');

            // Simple voting simulation - randomly update percentages
            pollOptions.forEach(option => {
                const pollFill = option.querySelector('.poll-fill');
                const pollText = option.querySelector('.poll-text');

                // Generate random percentage between 10% and 80%
                const newPercentage = Math.floor(Math.random() * 70) + 10;

                pollFill.style.width = `${newPercentage}%`;
                pollText.textContent = pollText.textContent.replace(/\(\d+%\)/, `(${newPercentage}%)`);
            });

            // Show voting confirmation
            this.textContent = 'Voted!';
            this.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Vote Now';
                this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                this.disabled = false;
            }, 2000);
        });
    });

    // // CTA button functionality
    // const ctaButton = document.querySelector('.cta-button');

    // if (ctaButton) {
    //     ctaButton.addEventListener('click', function() {
    //         alert('Thanks for your interest! Please contact the commissioner to join the league.');
    //     });
    // }

    // Add hover effects for cards
    const cards = document.querySelectorAll('.stat-card, .rule-card, .announcement-card, .poll-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add some dynamic content updates
setInterval(() => {
    // Update announcement dates to show "X days ago" format
    const announcementDates = document.querySelectorAll('.announcement-date');

    announcementDates.forEach(dateElement => {
        const dateText = dateElement.textContent;
        if (dateText.includes('Dec')) {
            const daysAgo = Math.floor(Math.random() * 10) + 1;
            dateElement.textContent = `${daysAgo} days ago`;
        }
    });
}, 30000); // Update every 30 seconds
