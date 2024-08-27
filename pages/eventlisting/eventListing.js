
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
    showLoader(); // Show loader before fetching data
    fetchData(apiUrl)
        .then(data => {
            let events = data.data;
            displayEvents(events, container);
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => hideLoader()); // Hide loader after data is fetched
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
    
     // Show loader, fetch and display filtered events
     fetchDataAndDisplay(container, apiUrl);  // Loader functions are handled within this function


      // Clear the input fields
      city.value = '';
      maxPrice.value = '';
}

// Function to show the loader
function showLoader() {
    document.getElementById('listingLoader').style.display = 'block';
}

// Function to hide the loader
function hideLoader() {
    document.getElementById('listingLoader').style.display = 'none';
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

            // Primary and fallback URLs for the event image
            let primaryUrl = `/assets/eventsOrgImg/${event.imageUrl}`;
            let fallbackUrl = "http://localhost:8080/" + event.imageUrl.slice(7);

            card.innerHTML = `
                <img src="${primaryUrl}" alt="${event.eventName}">
                <div class="card-body">
                    <h3>${event.organizationname}</h3>
                    <p>${event.eventDescription}</p>
                </div>
                <div class="card-footer">
                    <span>₹${event.price}</span>
                    <span>per day</span>
                </div>
            `;

            // Add error handling for the image
            let imgElement = card.querySelector('img');
            imgElement.onerror = function() {
                imgElement.src = fallbackUrl;
            };

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
