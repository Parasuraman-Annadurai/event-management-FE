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

    // Add click event listeners for navigation
    document.getElementById('aboutSection').addEventListener('click', () => {
        document.getElementById('aboutContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('projectSection').addEventListener('click', () => {
        document.getElementById('projectContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('contactSection').addEventListener('click', () => {
        document.getElementById('contactContainer').scrollIntoView({ behavior: 'smooth' });
    });
});

function displayEventDetails(event) {
    document.getElementById('eventImage').src = event.eventPhotos;
    document.getElementById('eventName').textContent = event.eventName;
    document.getElementById('eventTagline').textContent = event.tagline;
    document.getElementById('eventPrice').textContent = event.price;
    document.getElementById('aboutDescription').innerHTML = event.about;
    document.getElementById('aboutImage').src = event.about_img;
    // Projects Section
    document.getElementById('projectImg1').src = event.projectImages[0];
    document.getElementById('projectImg2').src = event.projectImages[1];
    document.getElementById('projectImg3').src = event.projectImages[2];
    document.getElementById('projectImg4').src = event.projectImages[3];

    // Contact Section
    document.getElementById('contactAddress').innerHTML = `<i class="fas fa-map-marker-alt icon"></i> ${event.address}`;
    document.getElementById('contactMobile').textContent = `Mobile: ${event.Mobile}`;
    document.getElementById('contactWhatsapp').textContent = `WhatsApp: ${event.whatsapp}`;
    document.getElementById('contactEmail').textContent = event.email;

    // Booking Button
    document.getElementById('bookingSection').addEventListener("click", () => {
        alert(`Booking for ${event.OrganizationName}`);
    });
}
