
// Main app
const app = document.getElementById('app');

// Create slideshow
function createSlideshow() {
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-container';

    for (let i = 1; i <= 8; i++) {
        const slide = document.createElement('div');
        slide.className = 'mySlides fade';

        const img = document.createElement('img');
        img.src = `./assets/Home_Images/slideshow/Designer${i}.jpeg`;
       

        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    }

    return slideshowContainer;
}


// Fetch data
async function fetchData() {
    const response = await axios.get('./utility/homeData.json');
    return response.data;
}

// Slideshow function
function showSlides() {
    let slideIndex = 0;
    return function showNextSlide() {
        let slides = document.getElementsByClassName("mySlides");
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
async function initApp() {
    const data = await fetchData();

    app.appendChild(createSlideshow());

    // Start slideshow
    showSlides()();
}

// Run the app

async function fetchData() {
    const response = await fetch('./utility/homeData1.json');
    return await response.json();
}

function createMainDiv(data, index) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'main-div';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left-div';

    const rightDiv = document.createElement('div');
    rightDiv.className = 'right-div';

    const img = document.createElement('img');
    const p = document.createElement('p');

    if (index % 2 === 0) {
        leftDiv.appendChild(img);
        rightDiv.appendChild(p);
    } else {
        leftDiv.appendChild(p);
        rightDiv.appendChild(img);
    }

    mainDiv.appendChild(leftDiv);
    mainDiv.appendChild(rightDiv);

    return { mainDiv, img, p };
}

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

async function init() {
    const data = await fetchData();
    const app = document.getElementById('app1');

    const mainDivs = data.slideshow.map((_, index) => createMainDiv(_, index));
    mainDivs.forEach(({ mainDiv }) => app.appendChild(mainDiv));

    const testimonialContainer = document.createElement('div');
    testimonialContainer.className = 'testimonial-div';
    data.testimonials.forEach(testimonial => {
        testimonialContainer.appendChild(createTestimonialDiv(testimonial));
    });
    app.appendChild(testimonialContainer);

    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % data.slideshow[0].length;
        mainDivs.forEach(({ img, p }, index) => {
            const slideData = data.slideshow[index][currentSlide];
            img.src = slideData.image;
            p.textContent = slideData.text;
        });
    }, 5000);
   
}
initApp();
init();

// let footer  = document.querySelector('.footer')

// fetch('./footer/footer.html').then(res=>res.text()).then(data=>{
//     footer.innerHTML = data
// })