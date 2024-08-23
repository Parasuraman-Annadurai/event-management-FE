import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
    setupModalFunctionality();

    // Event listeners for "Book Now" buttons
    document.getElementById('headerBookingBtn').addEventListener('click', openModal);
    document.getElementById('contactBookingBtn').addEventListener('click', openModal);

    // Event listener for closing the modal
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('blurOverlay').addEventListener('click', closeModal);
});

const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('_id');
console.log(packageId);

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
    
    closeBtn.addEventListener('click', () => {
        if (!isSubmitting) {
            closeModal();
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === blurOverlay && modal.style.display === "flex" && !isSubmitting) {
            closeModal();
        }
    });
}

function openModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
    document.getElementById('blurOverlay').style.display = 'none';
    document.body.style.overflow = "auto";
    resetForm(); // Clear the form when modal closes
}

function resetForm() {
    document.getElementById('userForm').reset(); // Reset the form fields
}

function setupFormSubmission() {
    const form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('userName'),
            email: formData.get('email'),
            contact: formData.get('contact'),
            address: formData.get('address')
        };

        const submitBtn = document.querySelector('.submit-btn');

        isSubmitting = true; // Set to true when submission starts

        // Show loader when submitting form
        document.getElementById('descriptionLoader').style.display = 'block';

        if (submitBtn) {
            submitBtn.innerText = "Submitting...";
            submitBtn.disabled = true; // Disable the button while submitting
        }

        fetch(`http://localhost:8080/api/orders/${packageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.statusCode === 201 || responseData.success) {
                // Trigger email sending via the API
                return fetch('http://localhost:8080/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        contact: data.contact,
                        address: data.address,
                        organizerEmail: 'delightfulbabycelebrations@example.com', // Set organizer email
                        organizerName: 'Delightful Baby Celebrations', // Set organizer name
                        organizerAddress: '123 Celebration Avenue, Joy Town', // Set organizer address
                        organizerMobile: '9812345672' // Set organizer mobile
                    }),
                });
            } else {
                throw new Error('Order submission failed');
            }
        })
        .then(mailResponse => mailResponse.json())
        .then(mailData => {
            if (mailData.success) {
                Swal.fire({
                    title: "Success",
                    text: "Your order has been placed, and a confirmation email has been sent.",
                    icon: "success",
                }).then(() => {
                    closeModal();
                });
            } else {
                throw new Error('Email sending failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                text: "There was an issue with your request. Please try again later.",
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
    });
}

function convertRatingToStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }

    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}
