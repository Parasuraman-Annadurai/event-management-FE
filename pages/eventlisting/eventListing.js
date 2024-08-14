import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    let container = document.getElementById('eventListings');
    
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');
    let city = urlParams.get('city');
    let price = urlParams.get('price');

    // Construct the initial API URL
    let apiUrl = `http://localhost:8080/api/events?category=${categoryId}`;
    
    if (city) {
        apiUrl += `&city=${city}`;
    }
    
    if (price) {
        apiUrl += `&price=${price}`;
    }

    // Fetch and display data
    fetchDataAndDisplay(container, apiUrl);

    // Set up filter button click event
    document.getElementById('filterButton').addEventListener('click', () => {
        applyFilters(container, categoryId);
    });
});

// Function to fetch and display events based on the API URL
function fetchDataAndDisplay(container, apiUrl) {
    fetchData(apiUrl)
        .then(data => {
            let events = data.data;
            displayEvents(events, container);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to apply filters and fetch filtered data from the backend
function applyFilters(container, categoryId) {
    let city = document.getElementById('citySelect').value;
    let maxPrice = document.getElementById('priceSelect').value;

    // Construct the API URL with query parameters
    let apiUrl = `http://localhost:8080/api/events?category=${categoryId}`;
    
    if (city) {
        apiUrl += `&city=${city}`;
    }
    
    if (maxPrice) {
        apiUrl += `&price=${maxPrice}`; 
    }

    // Log the constructed API URL
    console.log("API URL:", apiUrl);



    // Update the browser's URL after clicked the filter button
    let newUrl = `${window.location.pathname}?category=${categoryId}`;
    if (city) {
        newUrl += `&city=${city}`;
    }
    if (maxPrice) {
        newUrl += `&price=${maxPrice}`;
    }
    window.history.pushState({}, '', newUrl);


    fetchData(apiUrl)
        .then(data => {
            let filteredEvents = data.data;
            displayEvents(filteredEvents, container);

            // Log the fetched data
            console.log("Filtered Events:", filteredEvents);
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
    container.innerHTML = '';

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
