import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    showLoaderAndFetchData();
});

function showLoaderAndFetchData() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block'; // Show loader
    }

    // Simulate loader display for 2 seconds
    setTimeout(() => {
        initializePackageListings();
        if (loader) {
            loader.style.display = 'none'; // Hide loader
        }
    }, 300);
}

function initializePackageListings() {
    const container = document.getElementById('packageListings');
    if (!container) {
        console.error('No element with ID "packageListings" found.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');

    if (categoryId) {
        categoryId = decodeURIComponent(categoryId).replace(/%2F/g, '/'); // Decode and replace %2F with /
        filterCategory(categoryId);
    } else {
        fetchAllPackages(container);
    }
}

function fetchAllPackages(container) {
    fetch("http://localhost:8080/api/allpackages")
        .then(response => response.json())
        .then(data => {
            displayPackages(container, data.data); // Adjusting to match the API response structure
        })
        .catch(error => console.error('Error fetching data:', error));
}

function filterCategory(category) {
    const container = document.getElementById('packageListings');
    category = encodeURIComponent(category).replace(/%2F/g, '/').replace(/%20/g, '+'); // Ensure URL encoding and replace spaces
    fetch(`http://localhost:8080/api/allpackages?category=${category}`)
        .then(response => response.json())
        .then(data => {
            const filteredPackages = data.data.filter(pkg => pkg.category === category);
            displayPackages(container, filteredPackages);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPackages(container, packages) {
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

        // Primary and fallback URLs for the package image
        const primaryUrl = "/assets/Home_Images/" + pkg.packageImage;
        const fallbackUrl = "http://localhost:8080/" + pkg.packageImage.slice(7);

        // Populate card with package data
        card.innerHTML = `
            <img src="${primaryUrl}" alt="${pkg.packageName}">
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

        // Add error handling for the image
        const imgElement = card.querySelector('img');
        imgElement.onerror = function() {
            imgElement.src = fallbackUrl;
        };

        // Append card to container
        container.appendChild(card);

        // Add click event to redirect to package details using organizationName
        card.addEventListener('click', () => {
            showPackageDetails(pkg._id);
        });
    });
}

function showPackageDetails(packageId) {
    const formattedId = encodeURIComponent(packageId);
    window.location.href = `/pages/packageDescription/PackageDescription.html?_id=${formattedId}`;
}

// Function to apply filters and fetch data with loader
// Function to apply filters and fetch data with loader
function applyFilters(container) {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block'; // Show loader
    }

    // Simulate loader display for 2 seconds
    setTimeout(() => {
        let city = document.getElementById('city');
        let startPrice = document.getElementById('startPrice');
        let endPrice = document.getElementById('endPrice');

        // Create an object to hold filter values
        let filterObj = {
            city: city.value,
            startPrice: startPrice.value,
            endPrice: endPrice.value
        };

        // Get the category from the URL
        let urlParams = new URLSearchParams(window.location.search);
        let packageName = urlParams.get('category');
        packageName = decodeURIComponent(packageName); // Decode the category to replace %2F with /

        // Construct the API URL with the category and filter parameters
        let apiUrl = `http://localhost:8080/api/allpackages?category=${packageName}`;

        Object.keys(filterObj).forEach((key) => {
            if (filterObj[key]) {
                apiUrl += `&${key}=${encodeURIComponent(filterObj[key])}`;
            }
        });

        // Fetch and display the filtered packages
        fetchDataAndDisplay(container, apiUrl);

        if (loader) {
            loader.style.display = 'none'; // Hide loader after fetching data
        }
    }, 500); 
}


// Function to fetch data from the API and display packages
function fetchDataAndDisplay(container, apiUrl) {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayPackages(container, data.data);
    })
    .catch(error => {
        console.error('Error fetching packages:', error);
        container.innerHTML = `An error occurred while fetching the packages: ${error.message}`;
    });
}

// Event listener for the form submission
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const container = document.getElementById('packageListings');
    applyFilters(container);
});
