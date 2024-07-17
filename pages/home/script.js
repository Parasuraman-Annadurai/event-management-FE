document.addEventListener('DOMContentLoaded', () => {
    const navbarHeader = document.getElementById('navbarHeader');

    // Fetch and load header.html
    function loadHeader() {
        fetch('./components/header/header.html')
            .then(response => response.text())
            .then(data => {
                navbarHeader.innerHTML = data;

                // Re-execute any scripts from the fetched HTML
                const scriptElements = navbarHeader.getElementsByTagName('script');
                for (let i = 0; i < scriptElements.length; i++) {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    if (scriptElements[i].src) {
                        script.src = scriptElements[i].src;
                    } else {
                        script.textContent = scriptElements[i].textContent;
                    }
                    document.body.appendChild(script);
                }

                // Reapply event listeners
                document.getElementById('bar').addEventListener('click', openSidebar);
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Slideshow function
    function createSlideshow() {
        const slideshowContainer = document.createElement('div');
        slideshowContainer.className = 'slideshow-container';

        for (let i = 1; i <= 8; i++) {
            const slide = document.createElement('div');
            slide.className = 'mySlides fade';

            const img = document.createElement('img');
            img.src = `./assets/Home_Images/slideshow/Designer${i}.jpeg`;
            img.alt = `Slide ${i}`;

            slide.appendChild(img);
            slideshowContainer.appendChild(slide);
        }

        return slideshowContainer;
    }

    function showSlides() {
        let slideIndex = 0;
        return function showNextSlide() {
            const slides = document.getElementsByClassName("mySlides");
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showNextSlide, 2000);
        }
    }

    // Initialize app
    function slidesHome() {
        const homePageSlideShow = document.getElementById('homePageMain_BannerSlider');
        homePageSlideShow.appendChild(createSlideshow());
        showSlides()();
    }

    // Function to fetch JSON data
    async function fetchData(jsonFile) {
        try {
            let response = await fetch(jsonFile);
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Function to initialize slideshow for each section
    function initializeSlideshow(containerSelector, leftImageSelector, rightDescriptionSelector, jsonDataKey) {
        const container = document.querySelector(containerSelector);
        const leftImage = container.querySelector(leftImageSelector);
        const rightDescription = container.querySelector(rightDescriptionSelector);

        let index = 0;
        let data = [];

        // Function to update slide content
        function updateSlide() {
            if (data.length > 0) {
                leftImage.src = data[index].image;
                rightDescription.textContent = data[index].description;
                index = (index + 1) % data.length;
            }
        }

        // Fetch JSON data and start slideshow
        fetchData(jsonDataKey)
            .then((jsonData) => {
                if (jsonData && jsonData[Object.keys(jsonData)[0]]) {
                    data = jsonData[Object.keys(jsonData)[0]]; // Assuming JSON structure { "organisers": [...] } etc.
                    updateSlide(); // Initial slide update
                    setInterval(updateSlide, 3000); // Automatically change slide every 3 seconds
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    // Initialize slideshows for each section
    initializeSlideshow('.homePageTopOrganisersMain', '.homePageLeftDivImages', '.homePageRightdescription', './utility/homeOrganisers.json');
    initializeSlideshow('.homePageTopPackagesMain', '.homePagePackagesLeftDivImages', '.homePagePackagesRightdescription', './utility/homePackages.json');
    initializeSlideshow('.homePageTopEventsMain', '.homePageEventsLeftDivImages', '.homePageEventsRightdescription', './utility/homeEvents.json');

    loadHeader();
    slidesHome();
});

function createTestimonialDiv(testimonial) {

    const testimonialDiv = document.createElement('div');
    testimonialDiv.className = 'testimonial';
    
    const img = document.createElement('img');
    img.src = testimonial.image;

    const textDiv = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = testimonial.name;
    const review = document.createElement('p');
    review.textContent = testimonial.review;

    textDiv.appendChild(name);
    textDiv.appendChild(review);

    testimonialDiv.appendChild(img);
    testimonialDiv.appendChild(textDiv);

    return testimonialDiv;
}
document.addEventListener('DOMContentLoaded', function () {
    const testimonialContainer = document.getElementById('testimonial-container');
    let currentTestimonial = 0;
    let testimonials = [];

    // Fetch testimonials data from JSON file
    fetch('testimonials.json')
        .then(response => response.json())
        .then(data => {
            testimonials = data;
            loadTestimonials();
            displayTestimonial(currentTestimonial);
        });

    function loadTestimonials() {
        testimonials.forEach((testimonial, index) => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.classList.add('testimonial-content');
            testimonialDiv.id = `testimonial-${index}`;
            testimonialDiv.innerHTML = `
                <img src="${testimonial.img}" alt="${testimonial.name}">
                <h3>${testimonial.name}</h3>
                <p>${testimonial.profession}</p>
                <p>${testimonial.review}</p>
            `;
            testimonialContainer.appendChild(testimonialDiv);
        });
    }

    function displayTestimonial(index) {
        const allTestimonials = document.querySelectorAll('.testimonial-content');
        allTestimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        allTestimonials[index].style.display = 'block';
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        displayTestimonial(currentTestimonial);
    }

    function previousTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        displayTestimonial(currentTestimonial);
    }

    window.nextTestimonial = nextTestimonial;
    window.previousTestimonial = previousTestimonial;
});

document.addEventListener('DOMContentLoaded', function () {
const container1 = document.getElementById('testimonial-container-1');
const container2 = document.getElementById('testimonial-container-2');
const container3 = document.getElementById('testimonial-container-3');
let currentTestimonial = [0, 0, 0];
let testimonials = [];

// Fetch testimonials data from JSON file
fetch('./utility/testimonials.json')
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
        <img src="${testimonial.img}" alt="${testimonial.name}">
        <h3>${testimonial.name}</h3>
        <p>${testimonial.profession}</p>
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
    allTestimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    allTestimonials[indexes[idx]].style.display = 'block';
});
}

function nextTestimonial() {
currentTestimonial = currentTestimonial.map((index, i) => (index + 1) % (testimonials.length / 3));
displayTestimonials(currentTestimonial);
}

function previousTestimonial() {
currentTestimonial = currentTestimonial.map((index, i) => (index - 1 + (testimonials.length / 3)) % (testimonials.length / 3));
displayTestimonials(currentTestimonial);
}

window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
});


// Sidebar functions
function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
}

function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch footer.html and insert into #footerEMS
    fetch('./components/footer/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footerEMS').innerHTML = html;
        })
        .catch(error => console.error('Error fetching footer:', error));
});