
// import { loadHeader, loadFooter } from '/utility/utility.js';

    
// document.addEventListener("DOMContentLoaded", () => {

//     loadHeader();
//     loadFooter();
//     let container = document.getElementById('eventListings');
//     let urlParams = new URLSearchParams(window.location.search);
//     let categoryId = urlParams.get('category');

//     if (categoryId) {
//         filterCategory(categoryId, container);
//     } else {
//         console.error('No category ID found in URL parameters.');
//     }

//     setupEventListeners(container, categoryId);
// });

// function setupEventListeners(container, categoryId) {
//     document.getElementById('priceFilter').addEventListener('change', () => {
//         applyPriceFilter(container, categoryId);
//     });
// }

// function filterCategory(categoryId, container) {
//     fetchData('../../utility/eventlist.json')
//         .then(data => {
//             let filteredEvents = data.filter(event => event.Category === categoryId);
//             displayEvents(filteredEvents, container);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// async function fetchData(url) {
//     return fetch(url)
//         .then(response => response.json());
// }

// function displayEvents(events, container) {
//     container.innerHTML = ''; // Clear the existing content

//     events.forEach(event => {
//         let card = document.createElement('div');
//         card.className = 'card';

//         card.innerHTML = `
//             <img src="${event.eventPhotos}" alt="${event.eventName}">
//             <div class="card-body">
//                 <h3>${event.OrganizationName}</h3>
//                 <p>${event.eventDescription}</p>
//             </div>
//             <div class="card-footer">
//                 <span>₹${event.price}</span>
//                 <span>per day</span>
//             </div>
//         `;

//         container.appendChild(card);

//         card.addEventListener("click", () => {
//             showVendorsDetails(event.OrganizationName);
//         });
//     });
// }

// function applyPriceFilter(container, categoryId) {
//     fetchData('../../utility/eventlist.json')
//         .then(data => {
//             let filteredEvents = data;

//             if (categoryId) {
//                 filteredEvents = filteredEvents.filter(event => event.Category === categoryId);
//             }

//             let selectedPrice = document.getElementById('priceFilter').value;

//             if (selectedPrice !== 'all') {
//                 let [min, max] = selectedPrice.split('-').map(Number);
//                 max = max || Infinity; // If there's no max value, set it to Infinity
//                 filteredEvents = filteredEvents.filter(event => event.price >= min && event.price <= max);
//             }

//             displayEvents(filteredEvents, container);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }


// function showVendorsDetails(OrganizationName) {
//     // Replace spaces with hyphens
//     var formattedName = OrganizationName.replace(/ /g, '-');
//     // Redirect to the new URL
//     window.location.href = `../eventDescription/eventDescription.html?organization=${formattedName}`;
// }



import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    let container = document.getElementById('eventListings');
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');

    if (categoryId) {
        filterCategory(categoryId, container);
    } else {
        console.error('No category ID found in URL parameters.');
    }

    setupEventListeners(container, categoryId);
});

function setupEventListeners(container, categoryId) {
    document.getElementById('priceFilter').addEventListener('change', () => {
        applyPriceFilter(container, categoryId);
    });
}

function filterCategory(categoryId, container) {
    fetchData('http://localhost:8080/api/event')
        .then(data => {
            let filteredEvents = data.data.filter(event => event.category === categoryId);
            displayEvents(filteredEvents, container);
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function fetchData(url) {
    return fetch(url)
        .then(response => response.json());
}

function displayEvents(events, container) {
    container.innerHTML = ''; // Clear the existing content

    events.forEach(event => {
        let card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${event.imageUrl}" alt="${event.eventName}">
            <div class="card-body">
                <h3>${event.organizationName}</h3>
                <p>${event.eventDescription}</p>
            </div>
            <div class="card-footer">
                <span>₹${event.price}</span>
                <span>per day</span>
            </div>
        `;

        container.appendChild(card);

        card.addEventListener("click", () => {
            showVendorsDetails(event.organizationName);
        });
    });
}

function applyPriceFilter(container, categoryId) {
    fetchData('http://localhost:8080/api/event')
        .then(data => {
            let filteredEvents = data.data;

            if (categoryId) {
                filteredEvents = filteredEvents.filter(event => event.category === categoryId);
            }

            let selectedPrice = document.getElementById('priceFilter').value;

            if (selectedPrice !== 'all') {
                let [min, max] = selectedPrice.split('-').map(Number);
                max = max || Infinity; // If there's no max value, set it to Infinity
                filteredEvents = filteredEvents.filter(event => event.price >= min && event.price <= max);
            }

            displayEvents(filteredEvents, container);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showVendorsDetails(organizationName) {
    // Replace spaces with hyphens
    var formattedName = organizationName.replace(/ /g, '-');
    // Redirect to the new URL
    window.location.href = `../eventDescription/eventDescription.html?organization=${formattedName}`;
}
