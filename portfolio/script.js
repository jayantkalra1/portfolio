/**
 * Portfolio Website - JavaScript
 * Features: Smooth scrolling, mobile menu, form validation, scroll animations
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ========================================
    // Smooth Scrolling for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll-based Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .section-header');
    animateElements.forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ========================================
    // Form Validation
    // ========================================
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitBtn = contactForm.querySelector('.btn-submit');

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate name
        function validateName() {
            const value = nameInput.value.trim();
            
            if (value === '') {
                nameInput.classList.add('error');
                nameError.textContent = 'Name is required';
                return false;
            } else if (value.length < 2) {
                nameInput.classList.add('error');
                nameError.textContent = 'Name must be at least 2 characters';
                return false;
            } else {
                nameInput.classList.remove('error');
                nameError.textContent = '';
                return true;
            }
        }

        // Validate email
        function validateEmail() {
            const value = emailInput.value.trim();
            
            if (value === '') {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
                return false;
            } else if (!emailRegex.test(value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                return false;
            } else {
                emailInput.classList.remove('error');
                emailError.textContent = '';
                return true;
            }
        }

        // Validate message
        function validateMessage() {
            const value = messageInput.value.trim();
            
            if (value === '') {
                messageInput.classList.add('error');
                messageError.textContent = 'Message is required';
                return false;
            } else if (value.length < 10) {
                messageInput.classList.add('error');
                messageError.textContent = 'Message must be at least 10 characters';
                return false;
            } else {
                messageInput.classList.remove('error');
                messageError.textContent = '';
                return true;
            }
        }

        // Real-time validation on input
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        // Remove error state on focus
        nameInput.addEventListener('focus', function() {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        });

        emailInput.addEventListener('focus', function() {
            emailInput.classList.remove('error');
            emailError.textContent = '';
        });

        messageInput.addEventListener('focus', function() {
            messageInput.classList.remove('error');
            messageError.textContent = '';
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                // Disable submit button
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span>';

                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    // Show success message
                    submitBtn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    submitBtn.style.background = 'var(--color-success)';

                    // Reset form
                    contactForm.reset();

                    // Re-enable button after 3 seconds
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                        submitBtn.style.background = '';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation, { passive: true });

    // ========================================
    // Lazy Loading Enhancement
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('[data-src]');
        
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            lazyObserver.observe(img);
        });
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c Welcome to Jayant Kalra\'s Portfolio ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
    console.log('%c Built with HTML, CSS & Vanilla JavaScript ', 'color: #94a3b8; font-size: 12px;');

})();
