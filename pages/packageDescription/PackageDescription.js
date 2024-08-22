import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
});

const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('_id');
console.log(packageId)

async function fetchPackageData() {
    try {
        const response = await fetch(`http://localhost:8080/api/allpackages?_id=${packageId}`);
        const data = await response.json();
        const packageData = data.data.find(pkg => pkg._id === packageId);
console.log(packageData)
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

// Function to convert rating into star icons
function convertRatingToStars(rating) {
    let fullStar = '★';
    let emptyStar = '☆';

    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return fullStar.repeat(fullStars) + emptyStar.repeat(emptyStars);
}

document.getElementById('prevBtn').addEventListener('click', () => {
    document.getElementById('carousel').scrollBy({
        top: 0,
        left: -190,
        behavior: 'smooth'
    });
});

document.getElementById('nextBtn').addEventListener('click', () => {
    document.getElementById('carousel').scrollBy({
        top: 0,
        left: 190,
        behavior: 'smooth'
    });
});
