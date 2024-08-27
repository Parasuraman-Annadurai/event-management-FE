import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    showLoaderAndFetchData();
});

function showLoaderAndFetchData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    setTimeout(() => {
        fetchPackageData();
        loader.style.display = 'none'; // Hide loader
    }, 300);
}

function fetchPackageData() {
    fetch("http://localhost:8080/api/allpackages")
        .then(res => res.json())
        .then(data => {
            const allImages = data.data.flatMap(pkg => pkg.packagesLists.map(event => event.eventPhotos));
            initializeGallery(allImages);
        })
        .catch(error => console.error('Error fetching the API data:', error));
}

function initializeGallery(images) {
    const galleryContainer = document.getElementById("gallery-container");
    if (!galleryContainer) {
        console.error('No element with ID "gallery-container" found.');
        return;
    }

    // Limit to first 50 images and paginate
    const imagesPerPage = 9;
    const totalPages = Math.ceil(Math.min(images.length, 50) / imagesPerPage);

    let currentPage = 1;

    function renderPage(page) {
        galleryContainer.innerHTML = '';

        const start = (page - 1) * imagesPerPage;
        const end = Math.min(start + imagesPerPage, images.length);

        for (let i = start; i < end; i++) {
            const img = document.createElement('img');
            img.className = 'img';
            img.src = "/assets/Home_Images/" + images[i];
            
            const imgContainer = document.createElement('div');
            imgContainer.className = 'responsive-container-block img-cont';
            imgContainer.appendChild(img);

            galleryContainer.appendChild(imgContainer);
        }

        updatePagination(page);
    }

    function updatePagination(page) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = 'pagination-button' + (i === page ? ' active' : '');
            button.textContent = i;
            button.addEventListener('click', () => renderPage(i));

            paginationContainer.appendChild(button);
        }

        galleryContainer.appendChild(paginationContainer);
    }

    renderPage(currentPage);
}
