import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    
    // Initialize form validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            Swal.fire({
                title: "Success",
                text: "Your message has been sent successfully!",
                icon: "success",
            });
        }
    });
});

function validateForm() {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Subject validation
    const subject = document.getElementById('subject').value.trim();
    if (subject === '') {
        document.getElementById('subjectError').textContent = 'Subject is required.';
        isValid = false;
    }

    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required.';
        isValid = false;
    }

    return isValid;
}

