import { loadHeader, loadFooter } from 'utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializePackageListings();
});

function initializePackageListings() {
    const container = document.getElementById('packageListings');
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    if (categoryId) {
        filterCategory(categoryId);
    } else {
        console.error('No category ID found in URL parameters.');
    }
}

function filterCategory(category) {
    fetch('utility/packageListingData.json')
        .then(response => response.json())
        .then(data => {
            const filteredPackages = data.packages.filter(pkg => pkg.category === category);
            displayPackages(filteredPackages);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPackages(packages) {
    const container = document.getElementById('packageListings');
    container.innerHTML = '';

    packages.forEach(pkg => {

        let price =parseInt(pkg.totalPackagePrice)
        
        const card = document.createElement('div');
        card.className = 'packageCard';

        card.innerHTML = `
            <img src="assets/Home_Images/${pkg.packageImage}" alt="${pkg.packageName}">
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

        container.appendChild(card);

        card.addEventListener('click', () => {
            showPackageDetails(pkg.packageName);
        });
    });
}

function showPackageDetails(packageName) {
    const formattedTitle = packageName.replace(/ /g, '-');
    window.location.href = `../packageDescription/PackageDescription.html?title=${formattedTitle}`;
}
