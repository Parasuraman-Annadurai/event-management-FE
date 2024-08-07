import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    fetchPackageData();
});

function fetchPackageData() {
    fetch("http://localhost:8080/api/allpackages")
        .then(res => res.json())
        .then(data => {
            data = data.data;
            const uniquePackages = {};

            data.forEach(pkg => {
                if (!uniquePackages[pkg.packageName]) {
                    uniquePackages[pkg.packageName] = pkg;
                }
            });

            const packagesArray = Object.values(uniquePackages);
            initializePackageCategories(packagesArray);
        })
        .catch(error => console.error('Error fetching the API data:', error));
}

function initializePackageCategories(packages) {
    const categoriesContainer = document.getElementById("package-categories");
    if (!categoriesContainer) {
        console.error('No element with ID "package-categories" found.');
        return;
    }
    let rowDiv = null;

    packages.forEach((category, index) => {
        if (index % 3 === 0) {
            rowDiv = document.createElement("div");
            rowDiv.className = "package-categories-row";
            categoriesContainer.appendChild(rowDiv);
        }

        const categoryDiv = document.createElement("div");
        categoryDiv.className = "package-category";
        categoryDiv.id = category.category;

        const img = document.createElement("img");
        img.src = "/assets/Home_Images/" + category.packageImage;

        const title = document.createElement("h2");
        title.textContent = category.packageName;

        const description = document.createElement("p");
        const descriptionText = category.packageDescription.split(' ').slice(0, 11).join(' ') + '...';
        description.textContent = descriptionText;

        categoryDiv.appendChild(img);
        categoryDiv.appendChild(title);
        categoryDiv.appendChild(description);

        rowDiv.appendChild(categoryDiv);

        categoryDiv.addEventListener("click", () => {
            showVendors(category.category); 
        });
    });
}

function showVendors(categoryId) {
    window.location.href = `/pages/packageListing/PackageListing.html?category=${encodeURIComponent(categoryId)}`;
}
