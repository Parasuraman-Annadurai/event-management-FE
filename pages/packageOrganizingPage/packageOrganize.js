import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});

let eventCounter = 0; // Initialize event counter
let eventList = []; // Store all event data

// Event listener for the "Add More Events" button
document.getElementById('addEventButton').addEventListener('click', () => {
    const eventGroup = document.querySelector('#eventsContainer .event-item');

    // Get values from the current event group
    const eventName = eventGroup.querySelector('.eventName').value;
    const description = eventGroup.querySelector('.description').value;
    const eventPhotos = eventGroup.querySelector('.eventPhotos').files[0];
    const price = eventGroup.querySelector('.price').value;

    // Check if all fields are filled
    if (eventName && description && eventPhotos && price) {
        // Increment event counter
        eventCounter++;

        // Create an event object and push it to the eventList array
        eventList.push({
            eventName,
            description,
            eventPhotos,
            price
        });

        // Create a dropdown button for the event
        const eventDisplay = document.createElement('div');
        eventDisplay.className = 'event-display';
        eventDisplay.innerHTML = `
            <button type="button" class="event-toggle-btn">Event ${eventCounter}</button>
            <div class="event-data">
                <p><strong>Event Name:</strong> ${eventName}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Event Photo:</strong> ${eventPhotos.name}</p>
                <p><strong>Price:</strong> ${price}</p>
            </div>
        `;
        document.getElementById('eventsDisplayContainer').appendChild(eventDisplay);

        // Add event listener to toggle the dropdown
        eventDisplay.querySelector('.event-toggle-btn').addEventListener('click', function() {
            const eventData = this.nextElementSibling;
            eventData.style.display = eventData.style.display === 'none' || eventData.style.display === '' ? 'block' : 'none';
        });

        // Clear the input fields after storing the data
        eventGroup.querySelector('.eventName').value = '';
        eventGroup.querySelector('.description').value = '';
        eventGroup.querySelector('.eventPhotos').value = '';
        eventGroup.querySelector('.price').value = '';
    } else {
        alert('Please fill in all fields for the event before adding another one.');
    }
});

// Handle form submission
document.getElementById('packageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('organizationName', document.getElementById('organizationName').value);
    formData.append('packageName', document.getElementById('packageName').value);
    formData.append('packageTagline', document.getElementById('packageTagline').value);
    formData.append('packageDescription', document.getElementById('packageDescription').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('whatsapp', document.getElementById('whatsapp').value);
    formData.append('mobile', document.getElementById('mobile').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('rating', document.getElementById('rating').value);
    formData.append('experience', document.getElementById('experience').value);
    formData.append('city', document.getElementById('city').value);
    formData.append('totalPackagePrice', document.getElementById('totalPackagePrice').value);

    const packageImageFile = document.getElementById('packageImage').files[0];
    if (packageImageFile) {
        formData.append('packageImage', packageImageFile);
    }

    // Loop through the eventList and append each event to formData
    eventList.forEach((event, index) => {
        formData.append(`packagesLists[${index}][eventName]`, event.eventName);
        formData.append(`packagesLists[${index}][description]`, event.description);
        formData.append(`packagesLists[${index}][price]`, event.price);

        if (event.eventPhotos) {
            formData.append(`packagesLists[${index}][eventPhotos]`, event.eventPhotos);
        }
    });

    // Log the formData keys and values for debugging
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Send the request
    fetch('http://localhost:8080/api/allpackages/create', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log('Package created successfully:', data);
    })
    .catch(error => {
        console.error('Error creating package:', error);
    });
});
