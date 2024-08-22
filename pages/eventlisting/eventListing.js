
import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    let container = document.getElementById('eventListings');
    
    // Initialize filters and URL
    initializePage(container);

    // Set up filter button click event
    document.getElementById('filterButton').addEventListener('click', () => {
        applyFilters(container);
    });
});

// Function to initialize page with existing URL parameters
function initializePage(container) {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');
    let city = urlParams.get('city');
    let price = urlParams.get('price');

    // Construct the initial API URL
    let apiUrl = `http://localhost:8080/api/events?category=${categoryId}`;
    if (city) apiUrl += `&city=${city}`;
    if (price) apiUrl += `&price=${price}`;

    // Fetch and display data
    fetchDataAndDisplay(container, apiUrl);
}

// Function to fetch and display events based on the API URL
function fetchDataAndDisplay(container, apiUrl) {
    fetchData(apiUrl)
        .then(data => {
            let events = data.data;
            displayEvents(events, container);
        })
        .catch(error => console.error('Error fetching data:', error));
}



function applyFilters(container) {
    let city = document.getElementById('city');
    let maxPrice = document.getElementById('price');

    let filterObj = {
        [city.id]: city.value,
        [maxPrice.id]: maxPrice.value
    };
  
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');
    let apiUrl = `http://localhost:8080/api/events?category=${categoryId}`;

    // Construct the API URL with query parameters
    Object.keys(filterObj).forEach((key) => {
        if (filterObj[key]) {
            apiUrl += `&${key}=${filterObj[key]}`; 
        }
    });

    // Fetch and display filtered events
    fetchDataAndDisplay(container, apiUrl);

      // Clear the input fields
      city.value = '';
      maxPrice.value = '';
}



// Function to fetch data from the backend
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Function to display events or a "no data" message
function displayEvents(events, container) {
    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <i class="fas fa-exclamation-triangle"></i>
                <p>No events match your selection.</p>
            </div>
        `;
    } else {
        events.forEach(event => {
            let card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="/assets/eventsOrgImg/${event.imageUrl}" alt="${event.eventName}">
                <div class="card-body">
                    <h3>${event.organizationname}</h3>
                    <p>${event.eventDescription}</p>
                </div>
                <div class="card-footer">
                    <span>₹${event.price}</span>
                    <span>per day</span>
                </div>
            `;

            container.appendChild(card);

            // Event listener for card click
            card.addEventListener("click", () => {
                showVendorsDetails(event._id);
            });
        });
    }
}

// Function to redirect to event details page
function showVendorsDetails(eventId) {
    window.location.href = `../eventDescription/eventDescription.html?id=${eventId}`;
}
