// Navbar Show/Hide on Scroll
const navbar = document.querySelector('.navbar');

// Always show navbar initially
navbar.style.display = 'block';

// Handle navbar visibility on scroll
window.addEventListener('scroll', function() {
  if (window.scrollY === 0) {
    navbar.style.display = 'block'; // Show navbar at the top
  } else {
    navbar.style.display = 'none'; // Hide navbar when scrolling down
  }
});

// Typed.js Initialization after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  new Typed('#typed', {
    strings: [
      "Data Science Enthusiast",
      "AI Researcher",
      "ML Practitioner"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
});
