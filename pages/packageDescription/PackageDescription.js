import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
});

const urlParams = new URLSearchParams(window.location.search);
const packageName = urlParams.get('title');

async function fetchPackageData() {
    try {
        const response = await fetch('/utility/packageListingData.json');
        const data = await response.json();
        const packageData = data.packages.find(pkg => pkg.organizationName === packageName);

        if (packageData) {
            document.getElementById('packageImage').src = "/assets/Home_Images/" + packageData.packageImage;
            document.getElementById('packageName').textContent = packageData.packageName;
            document.getElementById('organizerName').textContent = packageData.organizationName || 'Organizer Name';
            document.getElementById('packageDescription').textContent = packageData.packageDescription;

            const carousel = document.getElementById('carousel');
            packageData.packagesLists.forEach(event => {
                const img = document.createElement('img');
                img.src = "/assets/Home_Images/" + event.eventPhotos;
                img.alt= event.eventName
                carousel.appendChild(img);
            });

            const packageDetails = document.getElementById('packageDetails');
            packageData.packagesLists.forEach(event => {
                const card = document.createElement('div');
                card.className = 'eventDetail';
                card.innerHTML = `
                    <img src="/assets/Home_Images/${event.eventPhotos}" alt="${event.eventName}">
                    <h3>${event.eventName}</h3>
                    <div class="price">₹${event.price}</div>
                    <p>${event.description}</p>
                `;
                packageDetails.appendChild(card);
            });

            document.getElementById('address').textContent = packageData.address;
            document.getElementById('whatsapp').textContent = packageData.whatsapp;
            document.getElementById('mobile').textContent = packageData.mobile;
            document.getElementById('email').textContent = packageData.email;
            document.getElementById('rating').textContent = packageData.rating;
            document.getElementById('experience').textContent = packageData.experience;
        } else {
            console.error('Package not found');
        }
    } catch (error) {
        console.error('Error fetching package data:', error);
    }
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
