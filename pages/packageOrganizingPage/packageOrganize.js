import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();

    const eventsContainer = document.getElementById('eventsContainer');
    const eventsDisplayContainer = document.getElementById('eventsDisplayContainer');
    const addEventButton = document.getElementById('addEventButton');
    let eventCounter = 0;

    // Event listener for the "Add More Events" button
    addEventButton.addEventListener('click', () => {
        const eventGroup = eventsContainer.querySelector('.event-group');

        // Get values from the current event group
        const eventName = eventGroup.querySelector('input[name="eventName"]').value;
        const description = eventGroup.querySelector('input[name="description"]').value;
        const eventPhotos = eventGroup.querySelector('input[name="eventPhotos"]').value;
        const price = eventGroup.querySelector('input[name="price"]').value;

        // Check if all fields are filled
        if (eventName && description && eventPhotos && price) {
            // Increment event counter
            eventCounter++;

            // Create a dropdown button for the event
            const eventDisplay = document.createElement('div');
            eventDisplay.className = 'event-display';
            eventDisplay.innerHTML = `
                <button type="button" class="event-toggle-btn">Event ${eventCounter}</button>
                <div class="event-data">
                    <p><strong>Event Name:</strong> ${eventName}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Event Photo URL:</strong> ${eventPhotos}</p>
                    <p><strong>Price:</strong> ${price}</p>
                </div>
            `;
            eventsDisplayContainer.appendChild(eventDisplay);

            // Add event listener to toggle the dropdown
            eventDisplay.querySelector('.event-toggle-btn').addEventListener('click', function() {
                const eventData = this.nextElementSibling;
                eventData.style.display = eventData.style.display === 'none' || eventData.style.display === '' ? 'block' : 'none';
            });

            // Clear the input fields after storing the data
            eventGroup.querySelector('input[name="eventName"]').value = '';
            eventGroup.querySelector('input[name="description"]').value = '';
            eventGroup.querySelector('input[name="eventPhotos"]').value = '';
            eventGroup.querySelector('input[name="price"]').value = '';
        } else {
            alert('Please fill in all fields for the event before adding another one.');
        }
    });

    document.getElementById('packageForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const packageData = {
            organizationName: formData.get('organizationName'),
            packageName: formData.get('packageName'),
            packageImage: formData.get('packageImage'),
            category: formData.get('category'),
            city: formData.get('city'),
            packageDescription: formData.get('packageDescription'),
            packageTagline: formData.get('packageTagline'),
            totalPackagePrice: parseInt(formData.get('totalPackagePrice'), 10),
            address: formData.get('address'),
            whatsapp: formData.get('whatsapp'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            rating: parseFloat(formData.get('rating')),
            experience: parseInt(formData.get('experience'), 10),
            packagesLists: []
        };

        const eventGroups = document.querySelectorAll('.event-display .event-data');
        eventGroups.forEach(eventData => {
            const eventName = eventData.querySelector('p:nth-child(1)').textContent.split(': ')[1];
            const description = eventData.querySelector('p:nth-child(2)').textContent.split(': ')[1];
            const eventPhotos = eventData.querySelector('p:nth-child(3)').textContent.split(': ')[1];
            const price = eventData.querySelector('p:nth-child(4)').textContent.split(': ')[1];
            if (eventName && description && eventPhotos && price) {
                packageData.packagesLists.push({ eventName, description, eventPhotos, price: parseInt(price, 10) });
            }
        });

        console.log('Final Package Data:', packageData);
        alert('Form submitted successfully!');
    });
});
