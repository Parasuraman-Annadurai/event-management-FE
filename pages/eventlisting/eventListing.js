

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

    // setupEventListeners(container, categoryId);
});

// function setupEventListeners(container, categoryId) {
//     document.getElementById('priceFilter').addEventListener('change', () => {
//         applyPriceFilter(container, categoryId);
//     });
// }

function filterCategory(categoryId, container) {
    fetchData('http://localhost:8080/api/events')
        .then(data => {
            let filteredEvents = data.data.filter(event => event.category === categoryId);
            console.log(filteredEvents);
            
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
             <img src="/assets/eventsOrgImg/${event.imageUrl}" alt="${event.eventName}">
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
            showVendorsDetails(event._id);
        });
    });
}

// function applyPriceFilter(container, categoryId) {
//     fetchData('http://localhost:8080/api/event')
//         .then(data => {
//             let filteredEvents = data.data;

//             if (categoryId) {
//                 filteredEvents = filteredEvents.filter(event => event.category === categoryId);
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

function showVendorsDetails(eventId) {
    window.location.href = `../eventDescription/eventDescription.html?id=${eventId}`;
}
