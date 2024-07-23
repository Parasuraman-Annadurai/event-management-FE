document.addEventListener('DOMContentLoaded', function() {
    // Fetch footer.html and insert into #footerEMS
    fetch('../../components/header/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        })
        .catch(error => console.error('Error fetching footer:', error));
});


document.addEventListener("DOMContentLoaded", () => {
    let categoriesContainer = document.getElementById("categories");
    let eventsData = "../../utility/model.json";

    fetchEventsData(eventsData, categoriesContainer);
});

function fetchEventsData(url, categoriesContainer) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let categories = data.events;
            displayCategories(categories, categoriesContainer);
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
    categoryDiv.id = category.id;
    categoryDiv.style.backgroundColor = category.backgroundColor;

    let img = document.createElement("img");
    img.src = category.imageUrl;
    img.alt = category.title;

    let title = document.createElement("h2");
    title.textContent = category.title;

    let description = document.createElement("p");
    description.textContent = category.description;

    categoryDiv.appendChild(img);
    categoryDiv.appendChild(title);
    categoryDiv.appendChild(description);

    rowDiv.appendChild(categoryDiv);

    // Use the category.id when adding the event listener
    categoryDiv.addEventListener("click", () => {
        showVendors(category.id);
    });
}


// Define the showVendors function
function showVendors(categoryId) {
    window.location.href = `../eventlisting/eventListing.html?category=${categoryId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch footer.html and insert into #footerEMS
    fetch('../../components/footer/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footerEMS').innerHTML = html;
        })
        .catch(error => console.error('Error fetching footer:', error));
});