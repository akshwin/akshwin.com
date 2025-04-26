const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY === 0) {
    navbar.style.display = 'block';  // show at very top
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
  