// Navbar Show/Hide on Scroll
const navbar = document.querySelector('.navbar');

// Always show navbar initially
navbar.style.display = 'block';

// Handle navbar visibility on scroll
window.addEventListener('scroll', function () {
  if (window.scrollY === 0) {
    navbar.style.display = 'block'; // Show navbar at the top
  } else {
    navbar.style.display = 'none'; // Hide navbar when scrolling down
  }

  // Footer visibility on scroll end
  const footer = document.getElementById('footer');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 10) {
    footer.classList.add('visible'); // Show footer
  } else {
    footer.classList.remove('visible'); // Hide footer
  }
});

// Typed.js Initialization after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  new Typed('#typed', {
    strings: [
      "Data Science Enthusiast",
      "Artificial Intelligence Researcher",
      "Machine Learning Practitioner"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
});

// Show/Hide the "Back to Top" button based on scroll position
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top on button click
backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

  const footer = document.querySelector('.contact');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    // Show footer only when scrolled near bottom
    if (scrollY + windowHeight >= bodyHeight - 10) {
      footer.classList.add('show-footer');
    } else {
      footer.classList.remove('show-footer');
    }
  });