import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setupEventDetails();
    setupNavigation();
    setupFormSubmission();
});

let isSubmitting = false; // Flag to track form submission state

function setupEventDetails() {
    let urlParams = new URLSearchParams(window.location.search);
    let eventId = urlParams.get('id');

    if (!eventId) {
        console.error('Event ID is missing');
        return;
    }


    // Show loader while fetching data
    document.getElementById('descriptionLoader').style.display = 'block';

    fetch(`http://localhost:8080/api/events/${eventId}`)
        .then(response => response.json())
        .then(responseData => { 
            let event = responseData.data;
            if (event) {
                displayEventDetails(event);
                setupModalFunctionality(event);
            } else {
                console.error('Event not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            // Hide loader after data is fetched
            document.getElementById('descriptionLoader').style.display = 'none';
        });
}

function displayEventDetails(event) {
    console.log(event);
    
    document.getElementById('eventImage').src = `/assets/eventsOrgImg/${event.imageUrl}`;
    document.getElementById('eventName').textContent = event.eventName;
    document.getElementById('eventTagline').textContent = event.tagline;
    document.getElementById('eventPrice').textContent = event.price;
    document.getElementById('aboutDescription').innerHTML = event.about;
    document.getElementById('aboutImage').src = `/assets/eventsOrgImg/${event.about_img}`;
    
    // Projects Section
    if (event.imageurl && event.imageurl.length >= 4) {
        document.getElementById('projectImg1').src = `/assets/eventsOrgImg/${event.imageurl[0]}`;
        document.getElementById('projectImg2').src = `/assets/eventsOrgImg/${event.imageurl[1]}`;
        document.getElementById('projectImg3').src = `/assets/eventsOrgImg/${event.imageurl[2]}`;
        document.getElementById('projectImg4').src = `/assets/eventsOrgImg/${event.imageurl[3]}`;
    } else {
        console.error('imageurl array is missing or does not contain enough elements');
    }

    // Contact Section
    document.getElementById('contactAddress').innerHTML = `<i class="fas fa-map-marker-alt icon"></i> ${event.address}`;
    document.getElementById('contactMobile').textContent = `Mobile: ${event.mobile}`;
    document.getElementById('contactWhatsapp').textContent = `WhatsApp: ${event.whatsapp}`;
    document.getElementById('contactEmail').textContent = event.email;
}

function setupNavigation() {
    document.getElementById('aboutSection').addEventListener('click', () => {
        document.getElementById('aboutContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('projectSection').addEventListener('click', () => {
        document.getElementById('projectContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('contactSection').addEventListener('click', () => {
        document.getElementById('contactContainer').scrollIntoView({ behavior: 'smooth' });
    });
}

function setupModalFunctionality(event) {
    let modal = document.getElementById('userModal');
    let blurOverlay = document.getElementById('blurOverlay');
    let closeBtn = document.querySelector('.close');
    let images = event.imageurl || [];

    document.getElementById('bookingSection').addEventListener('click', () => {
        if (images.length > 0) {
            let randomImage = images[Math.floor(Math.random() * images.length)];
            document.getElementById('randomImage').src = `/assets/eventsOrgImg/${randomImage}`;
        } else {
            document.getElementById('randomImage').src = '/assets/eventsOrgImg/org1_prewed.jpg'; // Path to a default image
        }
        openModal(modal, blurOverlay);
    });

    closeBtn.addEventListener('click', () => {
        if (!isSubmitting) {
            closeModal(modal, blurOverlay);
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === blurOverlay && modal.style.display === "flex" && !isSubmitting) {
            closeModal(modal, blurOverlay);
        }
    });
}

function openModal(modal, blurOverlay) {
    modal.style.display = "flex";
    blurOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modal, blurOverlay) {
    if (modal.style.display === "flex") {
        modal.style.display = "none";
        blurOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        resetForm();
    }
}

function resetForm() {
    document.getElementById('userForm').reset();
}

function setupFormSubmission() {
    let form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            let formData = new FormData(form);
            let data = {
                name: formData.get('userName'),
                email: formData.get('email'),
                contact: formData.get('contact'),
                address: formData.get('address')
            };

            let eventId = new URLSearchParams(window.location.search).get('id');
            let submitBtn = document.querySelector('.submit-btn');

            isSubmitting = true; // Set to true when submission starts

             // Show loader when submitting form
             document.getElementById('descriptionLoader').style.display = 'block';

            if (submitBtn) {
                submitBtn.innerText = "Submitting...";
                submitBtn.disabled = true; // Disable the button while submitting
            }

            fetch(`http://localhost:8080/api/orders/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.statusCode === 201 || responseData.success) {
                    Swal.fire({
                        title: "Success",
                        text: "Your order has been placed, and a confirmation email has been sent.",
                        icon: "success",
                    }).then(() => {
                        closeModal(document.getElementById('userModal'), document.getElementById('blurOverlay'));
                    });
                } else {
                    console.error('Order submission failed:', responseData);
                    Swal.fire({
                        title: "Error",
                        text: "There was an issue placing your order. Please try again.",
                        icon: "error",
                    });
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                Swal.fire({
                    title: "Error",
                    text: "There was a problem with the request. Please try again later.",
                    icon: "error",
                });
            })
            .finally(() => {
                isSubmitting = false; // Reset after submission is complete

                // Hide loader after submission is complete
                document.getElementById('descriptionLoader').style.display = 'none';
                
                if (submitBtn) {
                    submitBtn.innerText = "Submit";
                    submitBtn.disabled = false; // Re-enable the button
                }
            });
        }
    });
}

function validateForm() {
    let isValid = true;

    let userName = document.getElementById('userName');
    let email = document.getElementById('email');
    let contact = document.getElementById('contact');
    let address = document.getElementById('address');
    let agree = document.getElementById('agree');

    let userNameError = document.getElementById('userNameError');
    let emailError = document.getElementById('emailError');
    let contactError = document.getElementById('contactError');
    let addressError = document.getElementById('addressError');
    let agreeError = document.getElementById('agreeError');

    let errors = [];

    if (userName.value.trim() === "") {
        userNameError.textContent = "Enter user name";
        userNameError.style.display = 'block';
        errors.push(userNameError);
        isValid = false;
    } else {
        userNameError.style.display = 'none';
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        emailError.textContent = "Enter email";
        emailError.style.display = 'block';
        errors.push(emailError);
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter valid email";
        emailError.style.display = 'block';
        errors.push(emailError);
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    let contactPattern = /^[0-9]{10}$/;
    if (contact.value.trim() === "") {
        contactError.textContent = "Enter contact number";
        contactError.style.display = 'block';
        errors.push(contactError);
        isValid = false;
    } else if (!contactPattern.test(contact.value.trim())) {
        contactError.textContent = "Enter valid contact number";
        contactError.style.display = 'block';
        errors.push(contactError);
        isValid = false;
    } else {
        contactError.style.display = 'none';
    }

    if (address.value.trim() === "") {
        addressError.textContent = "Enter address";
        addressError.style.display = 'block';
        errors.push(addressError);
        isValid = false;
    } else {
        addressError.style.display = 'none';
    }

    if (!agree.checked) {
        agreeError.textContent = "You must agree to the terms";
        agreeError.style.display = 'block';
        errors.push(agreeError);
        isValid = false;
    } else {
        agreeError.style.display = 'none';
    }

    if (errors.length > 0) {
        setTimeout(() => {
            errors.forEach(error => error.style.display = 'none');
        }, 2000);
    }

    return isValid;
}



