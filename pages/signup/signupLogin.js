import { loadHeader, loadFooter } from '/utility/utility.js'; 

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initializeForms();
});

let form1= document.getElementById('form1');
let form2 = document.getElementById('submit-btn');
// Initialize forms
function initializeForms() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';

    document.getElementById('Login_btn').addEventListener('click', () => {
        toggleForms(false);
    });

    document.getElementById('signup_btn').addEventListener('click', () => {
        toggleForms(true);
    });
}

// Toggle between signup and login forms
function toggleForms(isSignup) {
    document.getElementById('signup-form').style.display = isSignup ? 'block' : 'none';
    document.getElementById('login-form').style.display = isSignup ? 'none' : 'block';
    document.getElementById('form-title').innerText = isSignup ? 'Sign Up' : 'Login';
    document.getElementById('submit-btn').innerText = isSignup ? 'Sign Up' : 'Login';
    document.getElementById('switch-form').innerHTML = isSignup
        ? `Already have an account? <span id="Login_btn">Login here</span>`
        : `Don't have an account? <span id="signup_btn">Sign up here</span>`;
}


const username = document.getElementById('username').value; // Changed from 'username' to 'email'
const password = document.getElementById('password').value;



// Handle login submission
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const username = document.getElementById('usernames').value; // Changed from 'username' to 'email'
    const password = document.getElementById('passwords').value;

       
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Changed 'name' to 'email' to match backend
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token) { // Assuming the backend returns a token on successful login
            alert('Login successful!');

            console.log('User data:', data);
            localStorage.setItem('token', data.token);
            window.location.replace('/pages/organiserPage/organiser.html');
           
           
           
        } else {
            alert('Login failed: ' + data.message);
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
}

// Attach submit event to the login form
document.getElementById('form2').addEventListener('submit', handleLogin);
// Attach submit event to the signup form
document.getElementById('signup-form').addEventListener('submit', handleSignup);

// Handle hamburger menu toggling
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

