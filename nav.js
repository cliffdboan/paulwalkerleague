// Centralized Navigation System
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navItems = [
            { href: './index.html', text: 'Home', icon: 'fas fa-home' },
            { href: 'index.html#rules', text: 'Rules', icon: 'fas fa-gavel' },
            {
                text: 'Keepers',
                icon: 'fas fa-user-check',
                dropdown: true,
                items: [
                    { href: 'keeper-rules.html', text: 'Keeper Rules', icon: 'fas fa-book' },
                    { href: 'keeper-tracker.html', text: 'Keeper Tracker', icon: 'fas fa-table' }
                ]
            },
            { href: 'history.html', text: 'History', icon: 'fas fa-history' },
            { href: 'index.html#announcements', text: 'Announcements', icon: 'fas fa-bullhorn' }
            // Polls commented out as per user changes
            // { href: 'index.html#polls', text: 'Polls', icon: 'fas fa-poll' }
        ];

        this.init();
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
        if (href === 'index.html' && this.currentPage === 'home') {
            return true;
        }
        if (href === 'keeper-rules.html' && this.currentPage === 'keeper-rules') {
            return true;
        }
        if (href === 'keeper-tracker.html' && this.currentPage === 'keeper-tracker') {
            return true;
        }
        if (href === 'history.html' && this.currentPage === 'history') {
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

        // Special handling for Home and Rules links to ensure they always navigate
        const clickHandler = (item.text === 'Home' || item.text === 'Rules') ? ' onclick="window.location.href=this.href; return true;"' : '';

        return `
            <a href="${item.href}" class="nav-link${activeClass}"${clickHandler}>
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
                <a href="index.html#rules">Rules</a>
                <a href="keeper-rules.html">Keepers</a>
                <a href="keeper-tracker.html">Keeper Tracker</a>
                <a href="index.html#announcements">Announcements</a>
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
