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

    // TILT EFFECT FOR CARDS
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });

    // MOBILE MENU
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }
    // THEME TOGGLE
    const themeBtn = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check local storage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            // Icon swap
            const icon = themeBtn.querySelector('i');
            if (isLight) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

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

    // CONTACT FORM HANDLING
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Get form data
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    // Error
                    formStatus.textContent = '✗ Oops! Something went wrong. Please try again.';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                // Network error
                formStatus.textContent = '✗ Network error. Please check your connection and try again.';
                formStatus.className = 'form-status error';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                submitBtn.style.opacity = '1';
            }
        });
    }
}