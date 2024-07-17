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
        fetch('../../utility/eventlist.json')
            .then(response => response.json())
            .then(data => {
                let filteredEvents = data.filter(event => event.Category === category);
                displayEvents(filteredEvents);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display events
    function displayEvents(events) {
        container.innerHTML = ''; // Clear the existing content

        events.forEach(event => {
            let card = document.createElement('div');
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


            card.addEventListener("click", () => {
                showVendorsDetails(event.OrganizationName);
            });
            
        });
    }

    // Function to apply price filter
    function applyPriceFilter() {
        fetch('../../utility/eventlist.json')
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

function showVendorsDetails(OrganizationName) {
    // Replace spaces with hyphens
    var formattedName = OrganizationName.replace(/ /g, '-');
    // Redirect to the new URL
    window.location.href = `../eventDescription/eventDescription.html?organization=${formattedName}`;
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

