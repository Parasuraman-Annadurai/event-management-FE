// Function to apply filters and fetch data
function applyFilters(container) {
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

    // Optionally, clear the input fields after applying the filters
    city.value = '';
    startPrice.value = '';
    endPrice.value = '';
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

// Function to display packages
function displayPackages(container, packages) {
    if (!container) {
        console.error('No element with ID "packageListings" found.');
        return;
    }
    container.innerHTML = '';

    packages.forEach(pkg => {
        let price = parseInt(pkg.totalPackagePrice);

        const card = document.createElement('div');
        card.className = 'packageCard';

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

        container.appendChild(card);

        card.addEventListener('click', () => {
            showPackageDetails(pkg.organizationName);
        });
    });
}

// Event listener for the form submission
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const container = document.getElementById('packageListings');
    applyFilters(container);
});

// Function to handle package details view
function showPackageDetails(organizationName) {
    const formattedTitle = encodeURIComponent(organizationName);
    window.location.href = `/pages/packageDescription/PackageDescription.html?title=${formattedTitle}`;
}
