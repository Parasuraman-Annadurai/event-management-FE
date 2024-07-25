import { loadHeader, loadFooter } from 'utility/utility.js';   

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializePackageCategories();
});

function initializePackageCategories() {
    const categoriesContainer = document.getElementById("package-categories");
    const eventsData = "utility/packageData.json";

    fetch(eventsData)
        .then(response => response.json())
        .then(data => {
            const categories = data.packages;
            let rowDiv = null;

            categories.forEach((category, index) => {
                if (index % 2 === 0) {
                    rowDiv = document.createElement("div");
                    rowDiv.className = "package-categories-row";
                    categoriesContainer.appendChild(rowDiv);
                }

                const categoryDiv = document.createElement("div");
                categoryDiv.className = "package-category";
                categoryDiv.id = category.id;
                categoryDiv.style.backgroundColor = category.backgroundColor;

                const img = document.createElement("img");
                img.src = "assets/Home_Images/Packages/" + category.imageUrl;

                const title = document.createElement("h2");
                title.textContent = category.title;

                const description = document.createElement("p");
                description.textContent = category.description;

                categoryDiv.appendChild(img);
                categoryDiv.appendChild(title);
                categoryDiv.appendChild(description);

                rowDiv.appendChild(categoryDiv);

                categoryDiv.addEventListener("click", () => {
                    showVendors(category.id);
                });
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

function showVendors(categoryId) {
    window.location.href = `pages/packageListing/PackageListing.html?category=${categoryId}`;
}
