import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializeCarousel();
    // checkTokenAndRedirect();
});


// function initializeCarousel() {
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const carousel = document.querySelector('.carousel');
//     let scrollAmount = 0;

//     nextBtn.addEventListener('click', () => {
//         carousel.scrollBy({
//             left: 300,
//             behavior: 'smooth'
//         });
//         scrollAmount += 300;
//     });

//     prevBtn.addEventListener('click', () => {
//         carousel.scrollBy({
//             left: -300,
//             behavior: 'smooth'
//         });
//         scrollAmount -= 300;
//     });
// }

