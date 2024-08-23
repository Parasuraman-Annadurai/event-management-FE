import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
    setupFormSubmission();

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

// Open modal
function openModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'block';
    document.getElementById('blurOverlay').style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('userModal');
    modal.style.display = 'none';
    document.getElementById('blurOverlay').style.display = 'none';
}

function setupFormSubmission() {
    // Implement form validation and submission logic
}

function convertRatingToStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    return starsHTML;
}
