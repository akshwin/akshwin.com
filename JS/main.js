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
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

    // SMOOTH SCROLL FOR LOGO
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ACTIVE NAVIGATION HIGHLIGHTING
    initActiveNavigation();

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

    // PROJECT MODALS
    initProjectModals();

    // FOOTER EMAIL COPY TO CLIPBOARD
    initFooterEmailCopy();

});

// FOOTER EMAIL COPY TO CLIPBOARD
function initFooterEmailCopy() {
    const footerEmail = document.querySelector('.footer-email');
    if (!footerEmail) return;

    footerEmail.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = 'akshwint.2003@gmail.com';
        
        try {
            await navigator.clipboard.writeText(email);
            
            // Visual feedback
            const originalText = footerEmail.innerHTML;
            footerEmail.innerHTML = '<i class="fas fa-check"></i> Copied!';
            footerEmail.style.color = 'var(--accent)';
            
            setTimeout(() => {
                footerEmail.innerHTML = originalText;
                footerEmail.style.color = '';
            }, 2000);
        } catch (err) {
            // Fallback: open mail client
            window.location.href = `mailto:${email}`;
        }
    });
}

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

// CONTACT FORM HANDLING - Using EmailJS for GitHub Pages compatibility
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm || !submitBtn || !formStatus) {
        console.warn('Contact form elements not found');
        return;
    }

    // Initialize EmailJS (replace with your public key)
    // Get your keys from: https://dashboard.emailjs.com/admin/account
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    const EMAILJS_PUBLIC_KEY = 'DtI5iLgZ7ZQ-8OEhV';
    const EMAILJS_SERVICE_ID = 'service_p7og81j';
    const EMAILJS_TEMPLATE_ID = 'template_wjpx42a';
    
    if (typeof emailjs !== 'undefined') {
        // Check if user has configured EmailJS
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            console.error('EmailJS not configured! Please update EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID in JS/main.js');
        } else {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Always prevent default form submission

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            formStatus.textContent = '✗ Email service not configured. Please check EmailJS setup.';
            formStatus.className = 'form-status error';
            return;
        }

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

        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name') || '',
            from_email: formData.get('email') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || '',
            to_email: 'akshwint.2003@gmail.com'
        };

        // Log for debugging
        console.log('Sending form data via EmailJS:', templateParams);

        // Check if EmailJS is configured
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            formStatus.textContent = '✗ EmailJS not configured. Please update the EmailJS credentials in JS/main.js. See EMAILJS_SETUP.md for instructions.';
            formStatus.className = 'form-status error';
            submitBtn.disabled = false;
            if (btnText) {
                btnText.textContent = 'Send Message';
            } else {
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
            }
            submitBtn.style.opacity = '1';
            return;
        }

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            // Success
            if (response.status === 200) {
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            // Error handling
            console.error('EmailJS error:', error);
            let errorMsg = 'Failed to send message. Please try again later.';
            
            if (error.text) {
                errorMsg = '✗ ' + error.text;
            } else if (error.message) {
                errorMsg = '✗ ' + error.message;
            } else {
                errorMsg = '✗ ' + errorMsg;
            }
            
            formStatus.textContent = errorMsg;
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

// ACTIVE NAVIGATION HIGHLIGHTING
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length === 0 || sections.length === 0) return;

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active nav link on scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle top of page
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial check
}