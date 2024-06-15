// Theme toggling function
function toggleThemeDark() {
    var body = document.body;
    body.classList.toggle("dark-theme");
}

var header = document.getElementById("heder");

function toggleMenu() {
    var menu = document.getElementById("mobile-menu");
    var hamburger = document.getElementById("hamburger");
    if (menu.style.display === "block") {
        menu.style.display = "none";
        hamburger.innerHTML=`
        <i class="fa-solid fa-bars" style="color: #3383eb;"></i>
        `
    } else {
        menu.style.display = "block";
        hamburger.innerHTML=`
        <i class="fa-solid fa-x fa-sm" style="color: #3383eb;"></i>
        `
    }
}

document.addEventListener('click', function(event) {
    var navbar = document.getElementById('mobile-menu');
    var isClickInsideNavbar = navbar.contains(event.target);

    if (isClickInsideNavbar) {
        toggleMenu();
    }
});

function smoothScrollTo(targetId) {
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        var targetPosition = targetElement.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
var lastScrollTop = 0;

// Show or hide the "Back to Top" button based on scroll position
window.onscroll = function() {
    var backToTopBtn = document.getElementById("backToTopBtn");
    var currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.style.top = "-100px";
        backToTopBtn.style.bottom = "10px";
    } else {
        header.style.top = "0";
        backToTopBtn.style.bottom = "-10px";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};