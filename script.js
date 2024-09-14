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

window.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('CheckingDarkMode');
    
    setTimeout(function() {
        checkbox.checked = true;
        toggleThemeDark();
    }, 500);
});

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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inputs-informations');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('.submit-btn');

    let isSubmitting = false;  // Track form submission state

    form.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent default form submission
        let errors = [];

        // Clear any previous error messages
        document.querySelectorAll('.error-message').forEach(error => error.remove());

        // Validate Name input
        if (nameInput.value.trim() === '') {
            errors.push({ field: nameInput, message: 'Please enter your name.' });
        }

        // Validate Email input
        if (emailInput.value.trim() === '') {
            errors.push({ field: emailInput, message: 'Please enter your email.' });
        } else if (!validateEmail(emailInput.value)) {
            errors.push({ field: emailInput, message: 'Please enter a valid email address.' });
        }

        // Validate Message input
        if (messageInput.value.trim() === '') {
            errors.push({ field: messageInput, message: 'Please enter your message.' });
        }

        // Show errors if any exist
        if (errors.length > 0) {
            errors.forEach(error => {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = 'red';
                errorElement.textContent = error.message;
                error.field.parentNode.appendChild(errorElement);
            });
            return;  // Stop form submission if errors exist
        }

        // If form is already being submitted, do not allow multiple submissions
        if (isSubmitting) {
            return;
        }

        // Disable the submit button and set the submission state
        isSubmitting = true;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Proceed to send the form (using XMLHttpRequest or fetch)
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            isSubmitting = false;  // Reset submission state
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;

            if (data.status === 'success') {
                alert('Message sent successfully!');
                form.reset();  // Clear the form fields
            } else {
                alert('Error sending message: ' + data.message);
            }
        })
        .catch(error => {
            isSubmitting = false;
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            alert('There was an error sending the message.');
        });
    });

    // Function to validate email using regex
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});