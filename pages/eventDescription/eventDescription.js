
import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    setupEventDetails();
    setupNavigation();
    setupFormSubmission();
});

function setupEventDetails() {
    let urlParams = new URLSearchParams(window.location.search);
    let organizationName = urlParams.get('organization').replace(/-/g, ' ');

    fetch('../../utility/eventlist.json')
        .then(response => response.json())
        .then(data => {
            let event = data.find(event => event.OrganizationName === organizationName);
            if (event) {
                displayEventDetails(event);
                setupModalFunctionality(event); 
            } else {
                console.error('Event not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayEventDetails(event) {
    document.getElementById('eventImage').src = event.eventPhotos;
    document.getElementById('eventName').textContent = event.eventName;
    document.getElementById('eventTagline').textContent = event.tagline;
    document.getElementById('eventPrice').textContent = event.price;
    document.getElementById('aboutDescription').innerHTML = event.about;
    document.getElementById('aboutImage').src = event.about_img;
    
    // Projects Section
    document.getElementById('projectImg1').src = event.projectImages[0];
    document.getElementById('projectImg2').src = event.projectImages[1];
    document.getElementById('projectImg3').src = event.projectImages[2];
    document.getElementById('projectImg4').src = event.projectImages[3];

    // Contact Section
    document.getElementById('contactAddress').innerHTML = `<i class="fas fa-map-marker-alt icon"></i> ${event.address}`;
    document.getElementById('contactMobile').textContent = `Mobile: ${event.Mobile}`;
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

    // Initialize images array
    let images = event.projectImages;

    document.getElementById('bookingSection').addEventListener('click', () => {
        if (images.length > 0) {
            let randomImage = images[Math.floor(Math.random() * images.length)];
            document.getElementById('randomImage').src = randomImage;
            openModal(modal, blurOverlay);
        } else {
            console.error('No project images available for modal');
        }
    });

    closeBtn.addEventListener('click', () => closeModal(modal, blurOverlay));

    window.addEventListener('click', (event) => {
        if (event.target === modal || event.target === blurOverlay) {
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
    modal.style.display = "none";
    blurOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    resetForm();
}

function resetForm() {
    document.getElementById('userForm').reset();
}

function setupFormSubmission() {
    let form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
                        Swal.fire({
                            title: "Success",
                            text: "Your order placed",
                            icon: "success",
                        });
        closeModal(document.getElementById('userModal'), document.getElementById('blurOverlay'));
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

    if (userName.value.trim() === "") {
        userNameError.textContent = "Enter user name";
        userNameError.style.display = 'block';
        isValid = false;
    } else {
        userNameError.style.display = 'none';
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        emailError.textContent = "Enter email";
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter valid email";
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    let contactPattern = /^[0-9]{10}$/;
    if (contact.value.trim() === "") {
        contactError.textContent = "Enter contact number";
        contactError.style.display = 'block';
        isValid = false;
    } else if (!contactPattern.test(contact.value.trim())) {
        contactError.textContent = "Enter valid contact number";
        contactError.style.display = 'block';
        isValid = false;
    } else {
        contactError.style.display = 'none';
    }

    if (address.value.trim() === "") {
        addressError.textContent = "Enter address";
        addressError.style.display = 'block';
        isValid = false;
    } else {
        addressError.style.display = 'none';
    }

    if (!agree.checked) {
        agreeError.textContent = "You must agree to the terms";
        agreeError.style.display = 'block';
        isValid = false;
    } else {
        agreeError.style.display = 'none';
    }

    return isValid;
}