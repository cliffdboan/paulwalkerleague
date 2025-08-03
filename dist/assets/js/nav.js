// Centralized Navigation System
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.basePath = this.getBasePath();
        this.navItems = [
            { href: `${this.basePath}index.html`, text: 'Home', icon: 'fas fa-home' },
            { href: `${this.basePath}index.html#rules`, text: 'Rules', icon: 'fas fa-gavel' },
            {
                text: 'Keepers',
                icon: 'fas fa-user-check',
                dropdown: true,
                items: [
                    { href: `${this.basePath}pages/keeper-rules.html`, text: 'Keeper Rules', icon: 'fas fa-book' },
                    { href: `${this.basePath}pages/keeper-tracker.html`, text: 'Keeper Tracker', icon: 'fas fa-table' }
                ]
            },
            { href: `${this.basePath}pages/history.html`, text: 'History', icon: 'fas fa-history' },
            { href: `${this.basePath}index.html#announcements`, text: 'Announcements', icon: 'fas fa-bullhorn' }
            // Polls commented out as per user changes
            // { href: 'index.html#polls', text: 'Polls', icon: 'fas fa-poll' }
        ];

        this.init();
    }

    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/pages/')) {
            return '../';
        }
        return './';
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();

        if (filename === '' || filename === 'index.html') {
            return 'home';
        } else if (filename === 'keeper-rules.html') {
            return 'keeper-rules';
        } else if (filename === 'keeper-tracker.html') {
            return 'keeper-tracker';
        } else if (filename === 'history.html') {
            return 'history';
        }

        return 'home';
    }

    isActive(href) {
        if (href.includes('index.html') && this.currentPage === 'home') {
            return true;
        }
        if (href.includes('keeper-rules.html') && this.currentPage === 'keeper-rules') {
            return true;
        }
        if (href.includes('keeper-tracker.html') && this.currentPage === 'keeper-tracker') {
            return true;
        }
        if (href.includes('history.html') && this.currentPage === 'history') {
            return true;
        }
        return false;
    }

    isDropdownActive() {
        return this.currentPage === 'keeper-rules' || this.currentPage === 'keeper-tracker';
    }

    generateNavHTML() {
        let navHTML = '';

        this.navItems.forEach(item => {
            if (item.dropdown) {
                navHTML += this.generateDropdownHTML(item);
            } else {
                navHTML += this.generateLinkHTML(item);
            }
        });

        return navHTML;
    }

    generateLinkHTML(item) {
        const isActive = this.isActive(item.href);
        const activeClass = isActive ? ' active' : '';

        return `
            <a href="${item.href}" class="nav-link${activeClass}">
                <i class="${item.icon}"></i>${item.text}
            </a>
        `;
    }

    generateDropdownHTML(item) {
        const isActive = this.isDropdownActive();
        const activeClass = isActive ? ' active' : '';

        let dropdownHTML = `
            <div class="nav-dropdown">
                <a href="#" class="nav-link${activeClass}">
                    <i class="${item.icon}"></i>${item.text}
                </a>
                <div class="dropdown-menu">
        `;

        item.items.forEach(dropdownItem => {
            const isDropdownActive = this.isActive(dropdownItem.href);
            const dropdownActiveClass = isDropdownActive ? ' active' : '';

            dropdownHTML += `
                <a href="${dropdownItem.href}" class="dropdown-item${dropdownActiveClass}">
                    <i class="${dropdownItem.icon}"></i>${dropdownItem.text}
                </a>
            `;
        });

        dropdownHTML += `
                </div>
            </div>
        `;

        return dropdownHTML;
    }

    generateFooterHTML() {
        return `
            <div class="footer-section">
                <h4>Paul Walker League</h4>
                <p>RIP to the legend</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <a href="${this.basePath}index.html#rules">Rules</a>
                <a href="${this.basePath}pages/keeper-rules.html">Keepers</a>
                <a href="${this.basePath}pages/keeper-tracker.html">Keeper Tracker</a>
                <a href="${this.basePath}index.html#announcements">Announcements</a>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p>Commissioner: Cliff</p>
            </div>
        `;
    }

    init() {
        // Replace navigation
        const navElement = document.querySelector('.nav');
        if (navElement) {
            navElement.innerHTML = this.generateNavHTML();
            // console.log('Navigation generated:', navElement.innerHTML);
        } else {
            console.error('Navigation element not found');
        }

        // Replace footer content
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.innerHTML = this.generateFooterHTML();
        }

        // Update footer copyright year
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom) {
            footerBottom.innerHTML = '&copy; 2025 Paul Walker League. All rights reserved.';
        }

        // Setup mobile menu
        this.setupMobileMenu();
        
        // Setup navigation click handlers
        this.setupNavigationHandlers();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('nav-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }
    }

    setupNavigationHandlers() {
        // Add click handlers to all navigation links to ensure proper navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Let the browser handle the navigation naturally
                window.location.href = link.href;
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        new NavigationManager();
        console.log('Navigation manager initialized successfully');
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, initialize immediately
    try {
        new NavigationManager();
        console.log('Navigation manager initialized immediately');
    } catch (error) {
        console.error('Error initializing navigation immediately:', error);
    }
}
