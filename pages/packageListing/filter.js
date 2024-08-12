document.getElementById('filterForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const startPrice = document.getElementById('startPrice').value;
    const endPrice = document.getElementById('endPrice').value;
    const packageName = document.getElementById('packageName').value;

    const params = new URLSearchParams();

    if (city) params.append('city', city);
    if (startPrice) params.append('startPrice', startPrice);
    if (endPrice) params.append('endPrice', endPrice);
    if (packageName) params.append('packageName', packageName);

    try {
        const response = await fetch(`http://localhost:8080/api/allpackages/filter?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayPackages(data.data); // Reusing displayPackages from the listing page script
    } catch (error) {
        console.error('Error fetching packages:', error);
        document.getElementById('packageListings').innerHTML = `An error occurred while fetching the packages: ${error.message}`;
    }
});

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
