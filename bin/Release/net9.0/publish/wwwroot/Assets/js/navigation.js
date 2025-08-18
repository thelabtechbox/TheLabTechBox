// Navigation functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Active section highlighting
        this.setupActiveSection();
    }

    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, `#${targetId}`);
                }
            }
        });
    }

    setupMobileMenu() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-mobile-menu-toggle]')) {
                const menu = document.querySelector('[data-mobile-menu]');
                if (menu) {
                    menu.classList.toggle('hidden');
                    
                    // Toggle hamburger icon
                    const icon = e.target.querySelector('svg');
                    if (icon) {
                        icon.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
                    }
                }
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const menu = document.querySelector('[data-mobile-menu]');
            const toggle = document.querySelector('[data-mobile-menu-toggle]');
            
            if (menu && !menu.classList.contains('hidden') && 
                !menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
    }

    setupActiveSection() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Update active navigation link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize navigation when DOM is ready
new Navigation();
