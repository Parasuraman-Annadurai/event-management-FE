
import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
});

document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let isValid = true;

    // Function to hide error messages after 3 seconds
    const hideErrorAfterDelay = (element) => {
        setTimeout(() => {
            element.textContent = "";
        }, 2000);
    };

    // Organization Name Validation
    const organizationName = document.getElementById('organizationname');
    const organizationNameError = document.getElementById('organizationname-error');
    if (organizationName.value.trim() === "") {
        organizationNameError.textContent = "Organization name is required.";
        isValid = false;
        hideErrorAfterDelay(organizationNameError);
    } else {
        organizationNameError.textContent = "";
    }

    // Event Name Validation
    const eventName = document.getElementById('eventName');
    const eventNameError = document.getElementById('eventName-error');
    if (eventName.value.trim() === "") {
        eventNameError.textContent = "Event name is required.";
        isValid = false;
        hideErrorAfterDelay(eventNameError);
    } else {
        eventNameError.textContent = "";
    }

    // Tagline Validation
    const tagline = document.getElementById('tagline');
    const taglineError = document.getElementById('tagline-error');
    if (tagline.value.trim() === "") {
        taglineError.textContent = "Event tagline is required.";
        isValid = false;
        hideErrorAfterDelay(taglineError);
    } else {
        taglineError.textContent = "";
    }

    // Email Validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
        hideErrorAfterDelay(emailError);
    } else {
        emailError.textContent = "";
    }

    // Mobile Number Validation
    const mobile = document.getElementById('mobile');
    const mobileError = document.getElementById('mobile-error');
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobile.value.trim())) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
        hideErrorAfterDelay(mobileError);
    } else {
        mobileError.textContent = "";
    }

    // WhatsApp Number Validation
    const whatsapp = document.getElementById('whatsapp');
    const whatsappError = document.getElementById('whatsapp-error');
    if (!mobilePattern.test(whatsapp.value.trim())) {
        whatsappError.textContent = "Please enter a valid 10-digit WhatsApp number.";
        isValid = false;
        hideErrorAfterDelay(whatsappError);
    } else {
        whatsappError.textContent = "";
    }

    // Price Validation
    const price = document.getElementById('price');
    const priceError = document.getElementById('price-error');
    if (price.value.trim() === "" || isNaN(price.value) || Number(price.value) <= 0) {
        priceError.textContent = "Please enter a valid price.";
        isValid = false;
        hideErrorAfterDelay(priceError);
    } else {
        priceError.textContent = "";
    }

    // Category Validation
    const category = document.getElementById('category');
    const categoryError = document.getElementById('category-error');
    if (category.value === "") {
        categoryError.textContent = "Please select an event category.";
        isValid = false;
        hideErrorAfterDelay(categoryError);
    } else {
        categoryError.textContent = "";
    }

    // City Validation
    const city = document.getElementById('city');
    const cityError = document.getElementById('city-error');
    if (city.value === "") {
        cityError.textContent = "Please select a city.";
        isValid = false;
        hideErrorAfterDelay(cityError);
    } else {
        cityError.textContent = "";
    }

    // About Validation
    const about = document.getElementById('about');
    const aboutError = document.getElementById('about-error');
    if (about.value.trim() === "" || about.value.trim().length < 10) {
        aboutError.textContent = "Please enter at least 10 characters.";
        isValid = false;
        hideErrorAfterDelay(aboutError);
    } else {
        aboutError.textContent = "";
    }

    // Event Description Validation
    const eventDescription = document.getElementById('eventDescription');
    const eventDescriptionError = document.getElementById('eventDescription-error');
    if (eventDescription.value.trim() === "" || eventDescription.value.trim().length < 10) {
        eventDescriptionError.textContent = "Please enter at least 10 characters.";
        isValid = false;
        hideErrorAfterDelay(eventDescriptionError);
    } else {
        eventDescriptionError.textContent = "";
    }

    // Address Validation
    const address = document.getElementById('address');
    const addressError = document.getElementById('address-error');
    if (address.value.trim() === "") {
        addressError.textContent = "Please enter an address.";
        isValid = false;
        hideErrorAfterDelay(addressError);
    } else {
        addressError.textContent = "";
    }

    // Event Image Validation
    const eventImage = document.getElementById('imageUrl');
    const eventImageError = document.getElementById('imageUrl-error');
    if (eventImage.files.length === 0) {
        eventImageError.textContent = "Please upload an event image.";
        isValid = false;
        hideErrorAfterDelay(eventImageError);
    } else {
        eventImageError.textContent = "";
    }
     // Event Image Validation
     const aboutImage = document.getElementById('about_img');
     const aboutImageError = document.getElementById('about_img-error');
     if (aboutImage.files.length === 0) {
         aboutImageError.textContent = "Please upload an about image.";
         isValid = false;
         hideErrorAfterDelay(aboutImageError);
     } else {
         eventImageError.textContent = "";
     }
    // Project Images Validation
    const projectImages = document.getElementById('imageurl');
    const projectImagesError = document.getElementById('imageurl-error');
    if (projectImages.files.length === 0 || projectImages.files.length > 4) {
        projectImagesError.textContent = "Please upload between 1 and 4 project images.";
        isValid = false;
        hideErrorAfterDelay(projectImagesError);
    } else {
        projectImagesError.textContent = "";
    }

    if (isValid) {
        // If the form is valid, proceed with form submission
        const formData = new FormData(this);

        try {
            const response = await fetch('http://localhost:8080/api/events/eventCreate', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                Swal.fire({
                    title: "Success",
                    text: "Your event has been created successfully",
                    icon: "success",
                }).then(() => {
                    // Clear the form fields after successful submission
                    document.querySelector('form').reset();
                    // Redirect to the organizer page
                    window.location.href = '/pages/organiserPage/organiser.html';
                });
            } else {
                const errorResponse = await response.json();
                Swal.fire({
                    title: "Error",
                    text: "There was an issue creating your event. Please try again.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            Swal.fire({
                title: "Error",
                text: "There was a network error. Please try again later.",
                icon: "error",
            });
        }
    }
});
