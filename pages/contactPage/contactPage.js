import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        try {
            // Send data to the backend
            const response = await fetch('http://localhost:8080/api/contactemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Display success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                contactForm.reset(); // Clear the form after submission
            } else {
                // Display error alert if submission fails
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem sending your message. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});
