import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    let container = document.getElementById('eventListings');
    
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');

    // Display events based on the category or all events by default
    fetchDataAndDisplay(container, categoryId);

    // Set up filter button click event
    document.getElementById('filterButton').addEventListener('click', () => {
        applyFilters(container, categoryId);
    });
});

// Function to fetch and display events based on category or all events
function fetchDataAndDisplay(container, categoryId) {
    fetchData(`http://localhost:8080/api/events/category/${categoryId}`)
        .then(data => {
            let events = data.data;
            displayEvents(events, container);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to apply filters and consider the category
function applyFilters(container, categoryId) {
    let city = document.getElementById('citySelect').value;
    let priceRange = document.getElementById('priceSelect').value;

    fetchData(`http://localhost:8080/api/events/category/${categoryId}`)
        .then(data => {
            let filteredEvents = data.data;

            // Apply city filter if selected
            if (city) {
                filteredEvents = filteredEvents.filter(event => event.city === city);
            }

            // Apply price range filter if selected
            if (priceRange) {
                let [minPrice, maxPrice] = priceRange.split('-').map(Number);
                filteredEvents = filteredEvents.filter(event => event.price >= minPrice && event.price <= maxPrice);
            }

            displayEvents(filteredEvents, container);
        })
        .catch(error => console.error('Error fetching data:', error));

         // Clear the filter selections after applying
        document.getElementById('citySelect').value = "";
        document.getElementById('priceSelect').value = "";
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
    container.innerHTML = ''; // Clear the existing content

    if (events.length === 0) {
        // If no events match, display the "No Data" message
        container.innerHTML = `
            <div class="no-data">
                <i class="fas fa-exclamation-triangle"></i>
                <p>No events match your selection.</p>
            </div>
        `;
    } else {
        // If events exist, display them
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



