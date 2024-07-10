document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById('eventListings');
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');

    if (categoryId) {
        filterCategory(categoryId);
    } else {
        console.error('No category ID found in URL parameters.');
    }

    // Add event listener to the dropdown
    document.getElementById('priceFilter').addEventListener('change', applyPriceFilter);

    // Function to filter and display events based on category
    function filterCategory(category) {
        fetch('/project-root/event-management-FE/utility/eventlist.json')
            .then(response => response.json())
            .then(data => {
                const filteredEvents = data.filter(event => event.Category === category);
                displayEvents(filteredEvents);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display events
    function displayEvents(events) {
        container.innerHTML = ''; // Clear the existing content

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${event.eventPhotos}" alt="${event.eventName}">
                <div class="card-body">
                    <h3>${event.OrganizationName}</h3>
                    <p>${event.eventDescription}</p>
                </div>
                <div class="card-footer">
                    <span>₹${event.price}</span>
                    <span>per day</span>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Function to apply price filter
    function applyPriceFilter() {
        fetch('/project-root/event-management-FE/utility/eventlist.json')
            .then(response => response.json())
            .then(data => {
                let filteredEvents = data;

                if (categoryId) {
                    filteredEvents = filteredEvents.filter(event => event.Category === categoryId);
                }

                let selectedPrice = document.getElementById('priceFilter').value;

                if (selectedPrice !== 'all') {
                    let [min, max] = selectedPrice.split('-').map(Number);
                    max = max || Infinity; // If there's no max value, set it to Infinity
                    filteredEvents = filteredEvents.filter(event => event.price >= min && event.price <= max);
                }

                displayEvents(filteredEvents);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});
