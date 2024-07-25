import { loadHeader, loadFooter, fetchData } from 'utility/homeUtility.js';


document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    slidesHome();
    initializeSlideshow('.homePageTopOrganisersMain', '.homePageLeftDivImages', '.homePageRightdescription', '../../utility/homeOrganisers.json');
    initializeSlideshow('.homePageTopPackagesMain', '.homePagePackagesLeftDivImages', '.homePagePackagesRightdescription', '../../utility/homePackages.json');
    initializeSlideshow('.homePageTopEventsMain', '.homePageEventsLeftDivImages', '.homePageEventsRightdescription', '../../utility/homeEvents.json');
    initializeTestimonials();
});

function createSlideshow() {
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-container';

    for (let i = 1; i <= 8; i++) {
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';

        const img = document.createElement('img');
        img.src = `../../assets/Home_Images/slideshow/Designer${i}.jpeg`;
        img.alt = `Slide ${i}`;

        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    }

    return slideshowContainer;
}

function showSlides() {
    let slideIndex = 0;
    return function showNextSlide() {
        const slides = document.querySelectorAll(".mySlides");
        slides.forEach(slide => slide.style.display = "none");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].style.display = "block";
        setTimeout(showNextSlide, 2000);
    }
}

function slidesHome() {
    const homePageSlideShow = document.getElementById('homePageMain_BannerSlider');
    homePageSlideShow.appendChild(createSlideshow());
    showSlides()();
}

function initializeSlideshow(containerSelector, leftImageSelector, rightDescriptionSelector, jsonDataKey) {
    const container = document.querySelector(containerSelector);
    const leftImage = container.querySelector(leftImageSelector);
    const rightDescription = container.querySelector(rightDescriptionSelector);

    let index = 0;
    let data = [];

    function updateSlide() {
        if (data.length > 0) {
            leftImage.src = "./assets/Home_Images/"+data[index].image;
            rightDescription.textContent = data[index].description;
            index = (index + 1) % data.length;
        }
    }

    fetchData(jsonDataKey)
        .then((jsonData) => {
            if (jsonData && jsonData[Object.keys(jsonData)[0]]) {
                data = jsonData[Object.keys(jsonData)[0]];
                updateSlide();
                setInterval(updateSlide, 3000);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function initializeTestimonials() {
    const container1 = document.getElementById('testimonial-container-1');
    const container2 = document.getElementById('testimonial-container-2');
    const container3 = document.getElementById('testimonial-container-3');
    let currentTestimonial = [0, 0, 0];
    let testimonials = [];

    fetch('../../utility/testimonials.json')
        .then(response => response.json())
        .then(data => {
            testimonials = data;
            loadTestimonials();
            displayTestimonials(currentTestimonial);
        });

    function loadTestimonials() {
        testimonials.forEach((testimonial, index) => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.classList.add('testimonial-content');
            testimonialDiv.id = `testimonial-${index}`;
            testimonialDiv.innerHTML = `
                <img src="../assets/Home_Images/testimonials/${testimonial.img}" alt="${testimonial.name}">
                <h3>${testimonial.name}</h3>
                <p>${testimonial.review}</p>
            `;
            if (index % 3 === 0) {
                container1.appendChild(testimonialDiv);
            } else if (index % 3 === 1) {
                container2.appendChild(testimonialDiv);
            } else {
                container3.appendChild(testimonialDiv);
            }
        });
    }

    function displayTestimonials(indexes) {
        const containers = [container1, container2, container3];
        containers.forEach((container, idx) => {
            const allTestimonials = container.querySelectorAll('.testimonial-content');
            allTestimonials.forEach(testimonial => testimonial.style.display = 'none');
            if (allTestimonials[indexes[idx]]) {
                allTestimonials[indexes[idx]].style.display = 'block';
            }
        });
    }

    window.nextTestimonial = function() {
        currentTestimonial = currentTestimonial.map((index, i) => (index + 1) % Math.ceil(testimonials.length / 3));
        displayTestimonials(currentTestimonial);
    };

    window.previousTestimonial = function() {
        currentTestimonial = currentTestimonial.map((index, i) => (index - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
        displayTestimonials(currentTestimonial);
    };
}
