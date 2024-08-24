import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
    setupModalFunctionality();
    setupFormSubmission();
    document.getElementById('prevBtn').addEventListener('click', () => moveCarousel(-1));
    document.getElementById('nextBtn').addEventListener('click', () => moveCarousel(1));

    // document.querySelector('.close').addEventListener('click', closeModal);
    // document.getElementById('blurOverlay').addEventListener('click', closeModal);
});

const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('_id');
console.log(packageId);

let images = []; 
async function fetchPackageData() {
    try {
        const response = await fetch(`http://localhost:8080/api/allpackages?_id=${packageId}`);
        const data = await response.json();
        const packageData = data.data.find(pkg => pkg._id === packageId);
        console.log(packageData);
        if (packageData) {
            document.getElementById('packageImage').src = "/assets/Home_Images/" + packageData.packageImage;
            document.getElementById('packageName').textContent = packageData.packageName;
            packageData.totalPackagePrice = packageData.totalPackagePrice.toLocaleString();
            document.getElementById('packagePrice').textContent = "₹" + packageData.totalPackagePrice;
            document.getElementById('packageTagLine').textContent = packageData.packageTagline;
            document.getElementById('organizerName').textContent = packageData.organizationName || 'Organizer Name';
            document.getElementById('packageDescription').textContent = packageData.packageDescription;

            const carousel = document.getElementById('carousel');
            packageData.packagesLists.forEach(event => {
                images.push(event.eventPhotos); // Store image paths in the images array
                const img = document.createElement('img');
                img.src = "/assets/Home_Images/" + event.eventPhotos;
                img.alt = event.eventName;
                carousel.appendChild(img);
            });

            const packageDetails = document.getElementById('packageDetails');
            packageData.packagesLists.forEach(event => {
                const card = document.createElement('div');
                card.className = 'eventDetail';
                card.innerHTML = `
                    <img src="/assets/Home_Images/${event.eventPhotos}" alt="${event.eventName}">
                    <h3>${event.eventName}</h3>
                    <div class="price">₹${event.price.toLocaleString()}</div>
                    <p>${event.description}</p>
                `;
                packageDetails.appendChild(card);
            });

            document.getElementById('address').textContent = packageData.address;
            document.getElementById('whatsapp').textContent = packageData.whatsapp;
            document.getElementById('mobile').textContent = packageData.mobile;
            document.getElementById('email').textContent = packageData.email;

            // Convert rating to stars and display
            const ratingStars = convertRatingToStars(packageData.rating);
            document.getElementById('rating').innerHTML = ratingStars;

            document.getElementById('experience').textContent = packageData.experience + " Years";

            // Map Integration
            const city = packageData.city;
            const mapURL = `https://www.google.com/maps?q=${encodeURIComponent(city)}&z=13&output=embed`;
            document.getElementById('cityMap').src = mapURL;

        } else {
            console.error('Package not found');
        }
    } catch (error) {
        console.error('Error fetching package data:', error);
    }
}

function setupModalFunctionality() {
    let modal = document.getElementById('userModal');
    let blurOverlay = document.getElementById('blurOverlay');
    let closeBtn = document.querySelector('.close');
    let isSubmitting = false;

    closeBtn.addEventListener('click', () => {
        if (!isSubmitting) {
            closeModal(modal, blurOverlay);
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === blurOverlay && modal.style.display === "flex" && !isSubmitting) {
            closeModal();
        }
    });

    document.getElementById('bookingSection').addEventListener('click', () => {
        if (images.length > 0) {
            let randomImage = images[Math.floor(Math.random() * images.length)];
            document.getElementById('randomImage').src = `/assets/Home_Images/${randomImage}`;
        } else {
            document.getElementById('randomImage').src = '/assets/eventsOrgImg/org1_prewed.jpg'; // Default image path
        }
        openModal(document.getElementById('userModal'), document.getElementById('blurOverlay'));
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
                address: formData.get('address'),
                organizerEmail: document.getElementById('email').textContent,
                organizerName: document.getElementById('packageName').textContent,
                organizerAddress: document.getElementById('address').textContent,
                organizerMobile: document.getElementById('mobile').textContent,
            };
            console.log(data.email);
            

            let submitBtn = document.querySelector('.submit-btn');
            
            let isSubmitting = true; // Set to true when submission starts

             // Show loader when submitting form
             document.getElementById('descriptionLoader').style.display = 'block';

            if (submitBtn) {
                submitBtn.innerText = "Submitting...";
                submitBtn.disabled = true; // Disable the button while submitting
            }

            fetch(`http://localhost:8080/api/orders`, {
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

    console.log(contact.value);
    
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
    console.log(email.innerText);
    
    if (email.innerText === "") {
        emailError.textContent = "Enter email";
        emailError.style.display = 'block';
        errors.push(emailError);
        isValid = false;
    } else if (!emailPattern.test(email.innerText)) {
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

    if (address.innerText.trim() === "") {
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
function moveCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const items = carousel.children;
    const itemWidth = items[0].clientWidth + 16; // Adjust for margin/padding if necessary
    carousel.scrollBy({ left: itemWidth * direction, behavior: 'smooth' });
}
function convertRatingToStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="fa fa-star checked"></span>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<span class="fa fa-star-half-alt checked"></span>';
        } else {
            stars += '<span class="fa fa-star"></span>';
        }
    }
    return stars;
}