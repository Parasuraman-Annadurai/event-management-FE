import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer
    loadHeader();
    loadFooter();

    // Fetch the JSON data
    fetch('/utility/testimonials.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const testimonialsGrid = document.getElementById('testimonialsGrid');

            // Loop through each testimonial and create HTML elements
            data.forEach(customer => {
                const testimonialElement = document.createElement('div');
                testimonialElement.classList.add('testimonial');

                testimonialElement.innerHTML = `
                    <img src="/assets/Home_Images/testimonials/${customer.img}" alt="${customer.name}">
                    <h3>${customer.name}</h3>
                    <p>${customer.review}</p>
                `;

                testimonialsGrid.appendChild(testimonialElement);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
