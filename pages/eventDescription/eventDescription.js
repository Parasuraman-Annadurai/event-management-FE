document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let organizationName = urlParams.get('organization').replace(/-/g, ' ');

    fetch('../../utility/eventlist.json')
        .then(response => response.json())
        .then(data => {
            let event = data.find(event => event.OrganizationName === organizationName);
            if (event) {
                displayEventDetails(event);
            } else {
                console.error('Event not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayEventDetails(event) {
    document.getElementById('eventImage').src = event.eventPhotos;
    document.getElementById('eventName').textContent = event.eventName;
    document.getElementById('eventTagline').textContent = event.tagline;
    document.getElementById('eventPrice').textContent = `₹${event.price}`;
}




        // Booking Button
        // document.getElementById('bookingButton').addEventListener("click", () => {
        //     alert(`Booking for ${event.OrganizationName}`);
        // });
    