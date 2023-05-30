document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    if (link.href === window.location.href) {
      link.parentNode.classList.add("active-link");
    }
  });
});
