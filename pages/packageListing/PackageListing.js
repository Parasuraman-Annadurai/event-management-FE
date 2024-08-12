import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializePackageListings();
});

function initializePackageListings() {
    const container = document.getElementById('packageListings');
    if (!container) {
        console.error('No element with ID "packageListings" found.');
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (categoryId) {
        filterCategory(categoryId);
    } else {
        fetchAllPackages();
    }
}

function fetchAllPackages() {
    fetch("http://localhost:8080/api/allpackages")
        .then(response => response.json())
        .then(data => {
            displayPackages(data.data); // Adjusting to match the API response structure
        })
        .catch(error => console.error('Error fetching data:', error));
}

function filterCategory(category) {
    fetch(`http://localhost:8080/api/allpackages?category=${category}`)
        .then(response => response.json())
        .then(data => {
            const filteredPackages = data.data.filter(pkg => pkg.category === category);
            displayPackages(filteredPackages);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPackages(packages) {
    const container = document.getElementById('packageListings');
    if (!container) {
        console.error('No element with ID "packageListings" found.');
        return;
    }
    container.innerHTML = '';

    packages.forEach(pkg => {
        let price = parseInt(pkg.totalPackagePrice);

        // Create package card
        const card = document.createElement('div');
        card.className = 'packageCard';

        // Populate card with package data
        card.innerHTML = `
            <img src="/assets/Home_Images/${pkg.packageImage}" alt="${pkg.packageName}">
            <div class="packageCardMain">
                <div class="packageCardBody">
                    <h3>${pkg.organizationName}</h3>
                    <p>${pkg.packageDescription}</p>
                </div>
                <div class="packageCardFooter">
                    <span>₹ ${price.toLocaleString()}</span>
                    <span>per day</span>
                </div>
            </div>
        `;

        // Append card to container
        container.appendChild(card);

        // Add click event to redirect to package details
        card.addEventListener('click', () => {
            showPackageDetails(pkg.organizationName);
        });
    });
}

function showPackageDetails(organizationName) {
    const formattedTitle = encodeURIComponent(organizationName);
    window.location.href = `/pages/packageDescription/PackageDescription.html?title=${formattedTitle}`;
}
