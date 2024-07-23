document.addEventListener('DOMContentLoaded', () => {
    fetchAndInsertHeader();
    fetchAndInsertFooter();
    setupEventDetails();
    setupNavigation();
    setupModalFunctionality();
    setupFormSubmission();
});

function fetchAndInsertHeader() {
    fetch('../../components/header/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        })
        .catch(error => console.error('Error fetching header:', error));
}

function fetchAndInsertFooter() {
    fetch('../../components/footer/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footerEMS').innerHTML = html;
        })
        .catch(error => console.error('Error fetching footer:', error));
}

function setupEventDetails() {
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
}

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
}

function setupNavigation() {
    document.getElementById('aboutSection').addEventListener('click', () => {
        document.getElementById('aboutContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('projectSection').addEventListener('click', () => {
        document.getElementById('projectContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('contactSection').addEventListener('click', () => {
        document.getElementById('contactContainer').scrollIntoView({ behavior: 'smooth' });
    });
}

function setupModalFunctionality() {
    let modal = document.getElementById('userModal');
    let blurOverlay = document.getElementById('blurOverlay');
    let closeBtn = document.querySelector('.close');

    document.getElementById('bookingSection').addEventListener('click', () => openModal(modal, blurOverlay));

    closeBtn.addEventListener('click', () => closeModal(modal, blurOverlay));

    window.addEventListener('click', (event) => {
        if (event.target === modal || event.target === blurOverlay) {
            closeModal(modal, blurOverlay);
        }
    });
}

function openModal(modal, blurOverlay) {
    modal.style.display = "flex";
    blurOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modal, blurOverlay) {
    modal.style.display = "none";
    blurOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    resetForm();
}

function resetForm() {
    document.getElementById('userForm').reset();
}

function setupFormSubmission() {
    let form = document.getElementById('userForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        Swal.fire({
            title: "Success",
            text: "Your order placed",
            icon: "success",
        });
        closeModal(document.getElementById('userModal'), document.getElementById('blurOverlay'));
    });
}








