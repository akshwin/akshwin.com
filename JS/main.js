document.addEventListener("DOMContentLoaded", () => {

    // GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // LOADING ANIMATION
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');

    // Simulate loading
    setTimeout(() => {
        progress.style.width = '100%';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            initAnimations(); // Start site animations
        }, 800);
    }, 1000);

    // CUSTOM CURSOR
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Follower delay
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }

    // TYPED TEXT
    new Typed('.typing-text', {
        strings: [
            "Data Science Enthusiast",
            "AI Researcher",
            "Machine Learning Engineer",
            "Deep Learning Specialist"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });

    // TILT EFFECT FOR CARDS - Disabled for simple, neat design
    // VanillaTilt.init(document.querySelectorAll(".project-card"), {
    //     max: 10,
    //     speed: 400,
    //     glare: true,
    //     "max-glare": 0.2
    // });

    // MOBILE MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }
    // CONTACT FORM HANDLING - Initialize immediately
    initContactForm();

    // BACK TO TOP BUTTON
    initBackToTop();

    // PROJECT FILTERS
    initProjectFilters();

    // ANIMATED COUNTERS
    initAnimatedCounters();

    // THEME TOGGLE
    initThemeToggle();

    // READING PROGRESS
    initReadingProgress();

    // PROJECT MODALS
    initProjectModals();

});

function initAnimations() {

    // Hero Animations
    gsap.from(".hero-content", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });

    // Section Headers Parallax
    gsap.utils.toArray(".section-header").forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Skills Stagger
    gsap.from(".tags span", {
        scrollTrigger: {
            trigger: ".skills-wrapper",
            start: "top 85%"
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
    });

    // Timeline Items
    gsap.utils.toArray(".timeline-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Projects Parallax
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2, // Stagger effect
            ease: "power3.out"
        });
    });

    // Research List
    gsap.utils.toArray(".research-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

// CONTACT FORM HANDLING - Separate function to initialize immediately
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm || !submitBtn || !formStatus) {
        console.warn('Contact form elements not found');
        return;
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Always prevent default form submission

        // Disable button and show loading state
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Sending...';
        } else {
            submitBtn.textContent = 'Sending...';
        }
        submitBtn.style.opacity = '0.7';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Get form data and convert to JSON
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };

        // Log for debugging
        console.log('Sending form data:', data);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (response.ok && data.success) {
                    // Success
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    // Error
                    const errorMsg = data.error || 'Oops! Something went wrong. Please try again.';
                    formStatus.textContent = '✗ ' + errorMsg;
                    formStatus.className = 'form-status error';
                }
            } else {
                // Non-JSON response (likely HTML error page)
                throw new Error('Server returned non-JSON response. Make sure the backend server is running.');
            }
        } catch (error) {
            // Network error or server not running
            console.error('Form submission error:', error);
            formStatus.textContent = '✗ Server error. Please make sure the backend server is running (npm start).';
            formStatus.className = 'form-status error';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            if (btnText) {
                btnText.textContent = 'Send Message';
            } else {
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
            }
            submitBtn.style.opacity = '1';
        }
    });
}

// BACK TO TOP BUTTON
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// PROJECT FILTERS
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden', 'fade-out');
                    setTimeout(() => {
                        card.style.display = '';
                    }, 100);
                } else {
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ANIMATED COUNTERS
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = counter.textContent.trim();
        const isNumber = !isNaN(parseFloat(target)) && isFinite(target);
        
        if (!isNumber) return; // Skip non-numeric values like "AI"
        
        // Skip GPA (9.04) - don't animate it
        if (target === '9.04') return;
        
        const targetNum = parseFloat(target);
        const duration = 2000; // 2 seconds
        const increment = targetNum / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < targetNum) {
                // Format based on original format
                if (target.includes('.')) {
                    counter.textContent = current.toFixed(2);
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target; // Ensure exact value
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}