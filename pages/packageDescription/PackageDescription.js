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
        const packageData = data.packages.find(pkg => pkg.packageName === packageName);

        if (packageData) {
            document.getElementById('packageImage').src = "/assets/Home_Images/" + packageData.packageImage;
            document.getElementById('packageName').textContent = packageData.packageName;
            document.getElementById('organizerName').textContent = packageData.organizationName || 'Organizer Name';
            document.getElementById('packageDescription').textContent = packageData.packageDescription;

            const detailsDiv = document.getElementById('packageDetails');
            packageData.packagesLists.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'eventDetail';
                eventElement.innerHTML = `
                    <img src="${event.eventPhotos}" alt="${event.eventName}">
                    <h3>${event.eventName}</h3>
                    <p>${event.description}</p>
                    <p>Price: ₹${event.price}</p>
                `;
                detailsDiv.appendChild(eventElement);
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
