// ========================================
// DJOREN - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initParticles();
    initSoundWaves();
    initFloatingShapes();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScroll();
    initTestimonialsSlider();
});

// ========================================
// Loading Screen
// ========================================
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 1500);
        });
    }
}

// ========================================
// Particle Animation System
// ========================================
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 8 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';

    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(particle);
}

// ========================================
// Sound Wave Animation
// ========================================
function initSoundWaves() {
    const container = document.querySelector('.sound-waves');
    if (!container) return;

    const barCount = 60;

    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        bar.style.animationDelay = (i * 0.05) + 's';
        bar.style.height = (Math.random() * 60 + 20) + 'px';
        container.appendChild(bar);
    }
}

// ========================================
// Floating Shapes Animation
// ========================================
function initFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    if (!container) return;

    const shapes = [
        { class: 'shape-circle', count: 5 },
        { class: 'shape-square', count: 4 },
        { class: 'shape-triangle', count: 3 }
    ];

    shapes.forEach(shapeType => {
        for (let i = 0; i < shapeType.count; i++) {
            const shape = document.createElement('div');
            shape.className = `shape ${shapeType.class}`;

            // Random position
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';

            // Random animation delay
            shape.style.animationDelay = (Math.random() * 10) + 's';
            shape.style.animationDuration = (Math.random() * 10 + 15) + 's';

            container.appendChild(shape);
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        const isActive = mobileNav.classList.contains('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        // Toggle class on body to hide floating contact button
        document.body.classList.toggle('menu-open', isActive);
    });

    // Close menu when clicking a link (except dropdown toggle)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close menu if clicking on dropdown toggle
            if (link.classList.contains('mobile-dropdown-toggle')) {
                return;
            }
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        });
    });

    // Animate links with delay
    mobileNav.addEventListener('transitionend', function() {
        if (mobileNav.classList.contains('active')) {
            const links = mobileNav.querySelectorAll('.mobile-nav-links li');
            links.forEach((link, index) => {
                link.style.transitionDelay = (index * 0.1) + 's';
            });
        }
    });

    // Mobile dropdown toggle
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

    if (mobileDropdownToggle && mobileDropdown) {
        mobileDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
    }
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left, .scale-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Parallax Effect
// ========================================
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========================================
// Mouse Follower Effect
// ========================================
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// ========================================
// Text Typing Effect
// ========================================
function typeText(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// Form Handling
// ========================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success animation
        showFormSuccess();

        // Reset form
        form.reset();
    });
}

function showFormSuccess() {
    const btn = document.querySelector('.submit-btn');
    const originalText = btn.textContent;

    btn.textContent = '✓ נשלח בהצלחה!';
    btn.style.background = '#28a745';

    setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
}

// ========================================
// Ripple Effect on Buttons
// ========================================
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn, .event-btn, .submit-btn, .social-link');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Add ripple styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ========================================
// Magnetic Effect on Elements
// ========================================
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .social-link');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        element.addEventListener('mouseleave', function() {
            element.style.transform = '';
        });
    });
}

// ========================================
// Initialize Additional Effects
// ========================================
window.addEventListener('load', function() {
    initParallax();
    initContactForm();
    initMagneticEffect();
});

// ========================================
// Utility Functions
// ========================================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based animations
}, 16));

// ========================================
// Easter Egg - Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.toString() === konamiSequence.toString()) {
        activateDiscoMode();
    }
});

function activateDiscoMode() {
    document.body.style.animation = 'discoColors 0.5s infinite';

    const discoStyles = document.createElement('style');
    discoStyles.textContent = `
        @keyframes discoColors {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(discoStyles);

    setTimeout(function() {
        document.body.style.animation = '';
        discoStyles.remove();
    }, 5000);
}

// ========================================
// Testimonials Slider
// ========================================
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.slider-arrow-right');
    const nextBtn = document.querySelector('.slider-arrow-left');

    if (!slider || !track) return;

    let currentSlide = 0;
    const totalCards = document.querySelectorAll('.testimonial-card').length;

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 2;
        return 4;
    }

    function getTotalSlides() {
        return Math.ceil(totalCards / getCardsPerView());
    }

    // Auto slide every 5 seconds
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % getTotalSlides();
        updateSlider();
    }, 5000);

    // Arrow buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + getTotalSlides()) % getTotalSlides();
            updateSlider();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % getTotalSlides();
            updateSlider();
            resetAutoSlide();
        });
    }

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        });
    });

    // Touch/Swipe support
    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < getTotalSlides() - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
            updateSlider();
            resetAutoSlide();
        }
        isDragging = false;
    });

    function updateSlider() {
        const cardsPerView = getCardsPerView();
        const cardWidthPercent = 100 / cardsPerView;
        const gapPercent = 1.5;
        const offset = currentSlide * cardsPerView * (cardWidthPercent + gapPercent);
        track.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % getTotalSlides();
            updateSlider();
        }, 5000);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        currentSlide = 0;
        updateSlider();
    });
}

console.log('%c🎵 DJOREN Website', 'font-size: 24px; color: #FF6B00; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'font-size: 12px; color: #888;');

// ========================================
// Lightbox Gallery
// ========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');

    // Find all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;
    let images = [];

    // Collect all gallery images with their sources
    galleryImages.forEach((img, index) => {
        // Get high resolution image (remove w=500 for larger version)
        let src = img.src;
        if (src.includes('unsplash.com')) {
            src = src.replace('w=500', 'w=1200').replace('w=600', 'w=1200');
        }
        images.push({
            src: src,
            alt: img.alt
        });

        img.addEventListener('click', function() {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (images.length === 0) return;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        updateCounter();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        updateCounter();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        updateCounter();
    }

    function updateCounter() {
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showNext(); // RTL - left arrow goes next
                break;
            case 'ArrowRight':
                showPrev(); // RTL - right arrow goes prev
                break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext(); // Swipe left = next (RTL)
            } else {
                showPrev(); // Swipe right = prev (RTL)
            }
        }
    }
}

// Initialize lightbox on page load
document.addEventListener('DOMContentLoaded', initLightbox);

// ========================================
// Floating Contact Button
// ========================================
function initFloatingContact() {
    const floatingContact = document.querySelector('.floating-contact');
    const floatingBtn = document.querySelector('.floating-contact-btn');

    if (!floatingContact || !floatingBtn) return;

    // Toggle menu on button click
    floatingBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        floatingContact.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingContact.contains(e.target)) {
            floatingContact.classList.remove('active');
        }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            floatingContact.classList.remove('active');
        }
    });
}

// Initialize floating contact on page load
document.addEventListener('DOMContentLoaded', initFloatingContact);

// ========================================
// Accessibility Widget
// ========================================
function initAccessibility() {
    const widget = document.querySelector('.accessibility-widget');
    const btn = document.querySelector('.accessibility-btn');
    const panel = document.querySelector('.accessibility-panel');
    const options = document.querySelectorAll('.acc-option');
    const resetBtn = document.querySelector('.acc-reset');

    if (!widget || !btn || !panel) return;

    // Toggle panel
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        panel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!widget.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // Load saved preferences
    loadAccessibilityPrefs();

    // Handle option clicks
    options.forEach(option => {
        option.addEventListener('click', function() {
            const accType = this.getAttribute('data-acc');
            const className = 'acc-' + accType;

            // Toggle the class on body
            document.body.classList.toggle(className);
            this.classList.toggle('active');

            // Save preferences
            saveAccessibilityPrefs();
        });
    });

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Remove all accessibility classes
            const accClasses = [
                'acc-bigger-text',
                'acc-high-contrast',
                'acc-grayscale',
                'acc-light-bg',
                'acc-big-cursor',
                'acc-highlight-links',
                'acc-reading-line',
                'acc-stop-animations'
            ];

            accClasses.forEach(cls => {
                document.body.classList.remove(cls);
            });

            // Remove active state from options
            options.forEach(opt => opt.classList.remove('active'));

            // Clear saved preferences
            localStorage.removeItem('accessibilityPrefs');
        });
    }

    // Save preferences to localStorage
    function saveAccessibilityPrefs() {
        const prefs = {};
        options.forEach(option => {
            const accType = option.getAttribute('data-acc');
            prefs[accType] = option.classList.contains('active');
        });
        localStorage.setItem('accessibilityPrefs', JSON.stringify(prefs));
    }

    // Load preferences from localStorage
    function loadAccessibilityPrefs() {
        const saved = localStorage.getItem('accessibilityPrefs');
        if (saved) {
            const prefs = JSON.parse(saved);
            for (const [accType, isActive] of Object.entries(prefs)) {
                if (isActive) {
                    const className = 'acc-' + accType;
                    document.body.classList.add(className);
                    const option = document.querySelector(`[data-acc="${accType}"]`);
                    if (option) option.classList.add('active');
                }
            }
        }
    }

    // Handle reading line movement with mouse
    document.addEventListener('mousemove', function(e) {
        if (document.body.classList.contains('acc-reading-line')) {
            const style = document.querySelector('#reading-line-style');
            if (!style) {
                const newStyle = document.createElement('style');
                newStyle.id = 'reading-line-style';
                document.head.appendChild(newStyle);
            }
            document.querySelector('#reading-line-style').textContent = `
                body.acc-reading-line::after {
                    top: ${e.clientY}px !important;
                    transform: translateY(-50%);
                }
            `;
        }
    });
}

// Initialize accessibility on page load
document.addEventListener('DOMContentLoaded', initAccessibility);
