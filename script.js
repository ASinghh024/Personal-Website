// Apple-style page transitions
function initializePageTransitions() {
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });
    
    // Smooth section transitions
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(60px)';
        section.style.transition = `all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Enhanced scroll-based animations with Apple timing
function initializeAdvancedScrollAnimations() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Add scrolling class for enhanced effects
        document.body.classList.add('scrolling');
        
        // Remove scrolling class after scroll ends
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);
        
        // Progressive blur effect for background elements
        const scrolled = window.scrollY;
        const backgroundElements = document.querySelectorAll('.section::before');
        
        backgroundElements.forEach(el => {
            const blurAmount = Math.min(scrolled / 100, 5);
            el.style.filter = `blur(${blurAmount}px)`;
        });
        
        // Scale effect for cards during scroll
        const cards = document.querySelectorAll('.card, .project-card, .timeline-content');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
                const maxDistance = window.innerHeight / 2;
                const scale = 1 - (distanceFromCenter / maxDistance) * 0.05;
                
                card.style.transform = `scale(${Math.max(scale, 0.95)})`;
                card.style.opacity = Math.max(1 - (distanceFromCenter / maxDistance) * 0.3, 0.7);
            }
        });
    });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeDarkMode();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
    initializePageTransitions();
    initializeAdvancedScrollAnimations();
    initializeFloatingElements();
    initializeLoadingAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Apple-style smooth scrolling with easing
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add subtle haptic feedback simulation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Smooth scroll with custom easing
                const targetPosition = targetSection.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
            navbar.style.boxShadow = 'var(--shadow-medium)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }

    // Apple-style navbar scroll effect with enhanced blur
    let ticking = false;

    function updateNavbar() {
        const scrolled = window.scrollY;
        const scrollProgress = Math.min(scrolled / 100, 1);
        
        // Enhanced glassmorphism effect based on scroll
        const blurAmount = 10 + (scrollProgress * 20);
        
        navbar.style.backdropFilter = `blur(${blurAmount}px)`;
        navbar.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
        
        // Add subtle shadow on scroll
        if (scrolled > 20) {
            navbar.style.boxShadow = `0 1px 20px rgba(0, 0, 0, ${0.1 * scrollProgress})`;
            navbar.style.borderBottomColor = `rgba(255, 255, 255, ${0.2 * scrollProgress})`;
        } else {
            navbar.style.boxShadow = '0 1px 0 0 var(--border-color)';
            navbar.style.borderBottomColor = 'var(--glass-border)';
        }
        
        ticking = false;
    }

    // Scroll event listeners with parallax effects
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating elements animation
        const floatingElements = document.querySelectorAll('.card, .project-card');
        floatingElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
                const translateY = Math.sin(scrollProgress * Math.PI) * 10;
                el.style.transform = `translateY(${translateY}px)`;
            }
        });
    });

    // Initial call
    updateActiveNavLink();
}

// Dark mode functionality (removed navbar toggle, only floating toggle remains)
function initializeDarkMode() {
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter project cards
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const downloadResumeButtons = document.querySelectorAll('#downloadResume, #downloadResumeFooter');

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic form validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Resume download functionality - buttons now have direct links
    // No need for event listeners as buttons link directly to Google Drive
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Apple-style scroll-triggered animations with staggered timing
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay for multiple elements
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for animation with Apple-style timing
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .timeline-item, .skill-category, .card, .skill-tag');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Apple-style button interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Enhanced hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional animations
function initializeAnimations() {
    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add subtle hover effects to cards
        const cards = document.querySelectorAll('.project-card, .blog-card, .highlights');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'info':
        default:
            notification.style.background = '#3b82f6';
            break;
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Apple-style floating elements functionality
function initializeFloatingElements() {
    const floatingBtns = document.querySelectorAll('.floating-btn');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const quickContactBtn = document.querySelector('.quick-contact');
    const themeToggleFloating = document.querySelector('.theme-toggle-floating');
    
    // Show/hide floating buttons based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 300) {
            floatingBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('visible');
                }, index * 100);
            });
        } else {
            floatingBtns.forEach(btn => {
                btn.classList.remove('visible');
            });
        }
    });
    
    // Scroll to top functionality with Apple-style easing
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            const startPosition = window.pageYOffset;
            const duration = 800;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, -startPosition, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
            
            requestAnimationFrame(animation);
        });
    }
    
    // Quick contact functionality
    if (quickContactBtn) {
        quickContactBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on the first input after scroll
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input, textarea');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    }
    
    // Floating theme toggle functionality
    if (themeToggleFloating) {
        themeToggleFloating.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = themeToggleFloating.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${rect.width / 2 - size / 2}px;
                top: ${rect.height / 2 - size / 2}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            themeToggleFloating.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add hover sound effect simulation (visual feedback)
    floatingBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            if (btn.classList.contains('visible')) {
                btn.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Apple-style loading animations
function initializeLoadingAnimations() {
    // Create loading overlay for demonstrations
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    // Show loading animation
    function showLoading(text = 'Loading...', duration = 2000) {
        const overlay = createLoadingOverlay();
        const loadingText = overlay.querySelector('.loading-text');
        loadingText.textContent = text;
        
        // Show overlay
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // Hide overlay after duration
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }, duration);
        
        return overlay;
    }
    
    // Add loading to form submissions
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add spinner to button
            submitBtn.innerHTML = '<span class="loading-spinner"></span>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '✓ Sent!';
                submitBtn.style.background = 'var(--success-color, #34C759)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 2000);
        });
    }
    
    // Add skeleton loading to project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const img = card.querySelector('img');
                
                if (img && !img.complete) {
                    // Create skeleton loader
                    const skeleton = document.createElement('div');
                    skeleton.className = 'skeleton-loader';
                    skeleton.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 200px;
                        z-index: 1;
                    `;
                    
                    const imgContainer = img.parentElement;
                    imgContainer.style.position = 'relative';
                    imgContainer.appendChild(skeleton);
                    
                    img.addEventListener('load', () => {
                        skeleton.style.opacity = '0';
                        setTimeout(() => {
                            skeleton.remove();
                        }, 300);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => observer.observe(card));
    
    // Add progress bar to page navigation
    function addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                progressBar.style.opacity = '1';
                isScrolling = true;
            }
            
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                progressBar.style.opacity = '0';
                isScrolling = false;
            }, 1000);
        });
    }
    
    addProgressBar();
    
    // Expose loading function globally for demonstrations
    window.showAppleLoading = showLoading;
}

// Add scroll to top button (optional)
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--accent-color)',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        boxShadow: 'var(--shadow-medium)'
    });
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events for better performance
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log('%c👋 Welcome to Ankit Singh\'s Portfolio!', 'color: #0ea5e9; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repository!', 'color: #64748b; font-size: 14px;');

// Export functions for potential external use
window.portfolioUtils = {
    scrollToTop,
    showNotification,
    isValidEmail
};