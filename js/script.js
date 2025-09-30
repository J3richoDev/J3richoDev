// Portfolio JavaScript - Modern Animations and Interactions

// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio features
function initializePortfolio() {
    setupNavigation();
    setupScrollAnimations();
    setupTypingAnimation();
    setupParticleEffect();
    setupContactForm();
    setupFAQ();
    setupSkillBars();
    setupMobileMenu();
    setupThemeToggle();
    setupSmoothScrolling();
    setupLoadingAnimations();
    setupWorkFilter();
}

// Navigation scroll effect
function setupNavigation() {
    const navbar = $('.navbar');
    const navLinks = $$('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting for single page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.addEventListener('scroll', () => {
            const sections = $$('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = [
        ...$$('.service-card'),
        ...$$('.project-card'),
        ...$$('.project-card-full'),
        ...$$('.value-card'),
        ...$$('.social-link'),
        ...$$('.summary-card'),
        ...$$('.tech-category'),
        ...$$('.about-section'),
        ...$$('.contact-method'),
        ...$$('.faq-item')
    ];

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Typing animation
function setupTypingAnimation() {
    const typingElement = $('.typing-text');
    if (!typingElement) return;

    const texts = [
        'Hello, I\'m Jericho Nomat',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = currentText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation after a delay
    setTimeout(type, 1000);
}

// Particle effect for hero background
function setupParticleEffect() {
    const hero = $('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);

    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Contact form functionality
function setupContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const formSuccess = $('#formSuccess');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) return;
        
        // Show loading state
        submitBtn.classList.add('loading');
        hideGlobalError();

        // Submit to configured endpoint
        try {
            await submitFormData(new FormData(form));
            showFormSuccess();
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('Failed to send message. Please try again later.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    function validateForm() {
        const fields = [
            { id: 'name', message: 'Please enter your full name' },
            { id: 'email', message: 'Please enter a valid email address' },
            { id: 'subject', message: 'Please enter a subject' },
            { id: 'message', message: 'Please enter your message' }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = $(`#${field.id}`);
            const error = $(`#${field.id}Error`);
            const value = input.value.trim();

            if (!value) {
                showFieldError(error, field.message);
                isValid = false;
            } else if (field.id === 'email' && !isValidEmail(value)) {
                showFieldError(error, 'Please enter a valid email address');
                isValid = false;
            } else {
                hideFieldError(error);
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideFieldError(errorElement) {
        errorElement.style.display = 'none';
    }

    async function submitFormData(formData) {
        const endpoint = form.getAttribute('data-endpoint');

        if (!endpoint || endpoint.includes('yourFormId')) {
            throw new Error('Form endpoint not configured. Set data-endpoint on the form with your Formspree URL.');
        }

        // Convert FormData to JSON object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            // Try to parse JSON error from endpoint
            let errorMsg = `Server responded with ${res.status}`;
            try {
                const body = await res.json();
                if (body && body.error) errorMsg = body.error;
            } catch (e) {
                // ignore json parse errors
            }
            throw new Error(errorMsg);
        }

        // Formspree returns 200/201 and a JSON body on success
        return await res.json();
    }

    function showFormSuccess() {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.style.display = 'block';
            formSuccess.style.display = 'none';
            form.reset();
        }, 5000);
    }

    function showFormError(message) {
        const globalError = $('#formError');
        if (globalError) {
            globalError.textContent = message;
            globalError.style.display = 'block';
        } else {
            alert(message);
        }
    }

    function hideGlobalError() {
        const globalError = $('#formError');
        if (globalError) {
            globalError.textContent = '';
            globalError.style.display = 'none';
        }
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateForm);
    });
}

// FAQ functionality
function setupFAQ() {
    const faqItems = $$('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Skill bars animation
function setupSkillBars() {
    const skillBars = $$('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Mobile menu
function setupMobileMenu() {
    const navToggle = $('.nav-toggle');
    const navMenu = $('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    const links = $$('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = $(`#${targetId}`);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading animations
function setupLoadingAnimations() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            
            // Trigger initial animations
            const heroContent = $('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 1s ease';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 300);
            }
        }, 500);
    });
}

// Floating cards animation in hero
function animateFloatingCards() {
    const cards = $$('.floating-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
        
        // Add mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = '';
        });
    });
}

// Initialize floating cards animation
setTimeout(animateFloatingCards, 1000);

// Parallax effect for sections
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = $$('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const translateY = scrolled * speed;
            element.style.transform = `translateY(${translateY}px)`;
        });
    });
}

// Cursor trail effect
function setupCursorTrail() {
    if (window.innerWidth < 768) return; // Skip on mobile devices
    
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = '#ff8533';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.opacity = (i / trailLength).toString();
        dot.style.transition = 'all 0.1s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail
setupCursorTrail();

// Page transition effects
function setupPageTransitions() {
    const links = $$('a:not([href^="#"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                
                // Add fade-out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

setupPageTransitions();

// Performance optimization: Debounced scroll handler
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any performance-critical scroll handling here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add custom styles for loading and animations
const customStyles = `
<style>
.loading * {
    transition: none !important;
}

.cursor-dot {
    transform-origin: center;
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

.nav-menu.active {
    display: flex !important;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 999;
}

.nav-menu.active .nav-link {
    color: #fff;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 133, 51, 0.2);
}

.nav-actions.active .nav-contact-btn {
    display: block !important;
    margin: 20px 0;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', customStyles);

// Work filter functionality
function setupWorkFilter() {
    const filterBtns = $$('.filter-btn');
    const projectCards = $$('.project-card');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.querySelector('.project-category').textContent.toLowerCase();
                
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else if (category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = $('#themeToggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');
    
    // Get saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (icon) {
            icon.className = 'fas fa-moon';
        }
    }
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            
            const isLight = body.classList.contains('light-theme');
            
            // Update icon
            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
            }
            
            // Save theme preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Add rotation animation
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }
}

// Modal functionality: open/close, focus trap, ESC to close
function setupModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');

    function openModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        // save last focused element
        modal._lastFocus = document.activeElement;
        // focus first focusable element inside modal
        const focusable = modal.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        // restore focus
        if (modal._lastFocus) modal._lastFocus.focus();
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        const modalId = trigger.getAttribute('data-modal');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    // Close buttons and overlay
    document.addEventListener('click', (e) => {
        const close = e.target.closest('[data-close]');
        if (close) {
            const modal = close.closest('.modal');
            closeModal(modal);
        }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            modals.forEach(m => {
                if (m.getAttribute('aria-hidden') === 'false') closeModal(m);
            });
        }
        // simple focus trap
        if (e.key === 'Tab') {
            modals.forEach(m => {
                if (m.getAttribute('aria-hidden') === 'false') {
                    const focusable = Array.from(m.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])'))
                        .filter(el => !el.hasAttribute('disabled'));
                    if (!focusable.length) return;
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            });
        }
    });
}

// Initialize modals after DOM content
document.addEventListener('DOMContentLoaded', () => {
    setupModals();
});

// Initialize all animations and interactions
console.log('Portfolio JavaScript loaded successfully! 🚀');
