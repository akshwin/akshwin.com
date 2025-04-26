
  let prevScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0"; // show navbar
    } else {
      navbar.style.top = "-100px"; // hide navbar (adjust value to navbar height)
    }
    prevScrollPos = currentScrollPos;
  }


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
  