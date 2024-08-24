
import { loadHeader, loadFooter } from '/utility/utility.js';

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
})

document.querySelector('form').addEventListener('submit', async function(e) {
     
    e.preventDefault();
    
    let formData = {
        organizationname: document.getElementById('organization').value,
        eventName: document.getElementById('eventname').value,
        eventDescription: document.getElementById('eventdescription').value,
        price: document.getElementById('eventprice').value,
        city: document.getElementById('selectcity').value,
        tagline: document.getElementById('eventtagline').value,
        // about_img: document.getElementById('eventimage').files[0],
        about: document.getElementById('eventabout').value,
        // imageurl: Array.from(document.getElementById('projectimages').files),
        address: document.getElementById('address').value,
        whatsapp: document.getElementById('whatsapp').value,
        mobile: document.getElementById('mobile').value,
        category: document.getElementById('selecteventcategory').value,
        email: document.getElementById('email').value,
    };

    console.log("Form Data:", formData);

    try {
        const response = await fetch('http://localhost:8080/api/events/createEvent', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result = await response.json();
            console.log("Success:", result);
            Swal.fire({
                title: "Success",
                text: "Your order has been placed, and a confirmation email has been sent.",
                icon: "success",
            })
        } else {
            let error = await response.json();
            console.log("Error:", error);
            Swal.fire({
                title: "Error",
                text: "There was an issue placing your order. Please try again.",
                icon: "error",
            });
        }
    } catch (error) {
        console.error("Request Failed:", error);
    }
});
