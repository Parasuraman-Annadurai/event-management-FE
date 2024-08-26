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
        const eventPhotos = eventGroup.querySelector('input[name="eventPhotos"]').files[0];
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
                    <p><strong>Event Photo:</strong> ${eventPhotos.name}</p>
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

    // Handle form submission
    document.getElementById('packageForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData();

        // Safely accessing the form elements
        const getFieldValue = (id) => document.getElementById(id)?.value || '';

        // Append basic package data
        formData.append('organizationName', getFieldValue('organizationName'));
        formData.append('customised', getFieldValue('customised'));
        formData.append('packageName', getFieldValue('packageName'));
        formData.append('packageTagline', getFieldValue('packageTagline'));
        formData.append('packageDescription', getFieldValue('packageDescription'));
        formData.append('address', getFieldValue('address'));
        formData.append('whatsapp', getFieldValue('whatsapp'));
        formData.append('mobile', getFieldValue('mobile'));
        formData.append('category', getFieldValue('category'));
        formData.append('email', getFieldValue('email'));
        formData.append('rating', getFieldValue('rating'));
        formData.append('experience', getFieldValue('experience'));
        formData.append('city', getFieldValue('city'));
        formData.append('totalPackagePrice', getFieldValue('totalPackagePrice'));

        // Append package image
        const packageImageFile = document.getElementById('packageImage')?.files[0];
        if (packageImageFile) {
            formData.append('packageImage', packageImageFile);
        }

        // Append event data
        const eventItems = document.getElementsByClassName('event-item');
        for (let i = 0; i < eventItems.length; i++) {
            formData.append(`packagesLists[${i}][eventName]`, eventItems[i].querySelector('.eventName')?.value || '');
            formData.append(`packagesLists[${i}][description]`, eventItems[i].querySelector('.description')?.value || '');
            formData.append(`packagesLists[${i}][price]`, eventItems[i].querySelector('.price')?.value || '');

            const eventPhotoFile = eventItems[i].querySelector('.eventPhotos')?.files[0];
            if (eventPhotoFile) {
                formData.append(`packagesLists[${i}][eventPhotos]`, eventPhotoFile);
            }
        }

        // Log the formData keys and values
        console.log('FormData content:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        // Send the request to the API
        fetch('http://localhost:8080/api/allpackages/create', {
            method: 'POST',
            body: formData,
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
            alert('Package added successfully!');
            // Optionally, redirect to another page or clear the form
        })
        .catch(error => {
            console.error('Error creating package:', error);
            alert('There was an error adding the package.');
        });
    });
});
