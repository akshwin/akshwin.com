const navbar = document.querySelector('.navbar');

// Always show navbar initially
navbar.style.display = 'block';

window.addEventListener('scroll', function() {
  if (window.scrollY === 0) {
    navbar.style.display = 'block';  // show at top
  } else {
    navbar.style.display = 'none';   // hide when scrolling
  }
});

document.addEventListener('DOMContentLoaded', function () {
  new Typed('#typed', {
    strings: ["Data Science Enthusiast", "AI Researcher", "ML Practitioner"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
});
