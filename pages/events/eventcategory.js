

import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();

    let categoriesContainer = document.getElementById("categories");
    let eventsDataUrl = "http://localhost:8080/api/categories";

    fetchEventsData(eventsDataUrl, categoriesContainer);
});

function fetchEventsData(url, categoriesContainer) {
    fetch(url)
        .then(response => response.json())
        .then(responseData => {
            console.log('API Response:', responseData); 
            if (responseData.success && Array.isArray(responseData.data)) {
                displayCategories(responseData.data, categoriesContainer);
            } else {
                console.error('Unexpected data format:', responseData);
            }
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

function displayCategories(categories, categoriesContainer) {
    let rowDiv = null;
    categories.forEach((category, index) => {
        if (index % 2 === 0) {
            rowDiv = document.createElement("div");
            rowDiv.className = "categories-row";
            categoriesContainer.appendChild(rowDiv);
        }
        createCategoryElement(category, rowDiv);
    });
}

function createCategoryElement(category, rowDiv) {
    let categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.id = category._id;
    categoryDiv.style.backgroundColor = category.backgroundColor;

    let img = document.createElement("img");
    img.src = category.imageUrl;
    img.alt = category.category;

    let title = document.createElement("h2");
    title.textContent = category.title;
    console.log(category.title);
    

    let description = document.createElement("p");
    description.textContent = category.description;

    categoryDiv.appendChild(img);
    categoryDiv.appendChild(title);
    categoryDiv.appendChild(description);

    rowDiv.appendChild(categoryDiv);

    // Use the category.category when adding the event listener
    categoryDiv.addEventListener("click", () => {
        showVendors(category.category);
    });
}

function showVendors(categoryId) {
    window.location.href = `../eventlisting/eventListing.html?category=${categoryId}`;
}
