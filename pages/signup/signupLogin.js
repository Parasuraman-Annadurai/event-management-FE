import { loadHeader, loadFooter } from '/utility/utility.js'; 

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initializeForms();
});


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



// Handle signup submission
function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !password || !email) {
        alert('All fields are required for signup');
        return;
    }

    fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            alert('Signup successful!');
            console.log('User data:', data);
            localStorage.setItem('token', data.token);

            
            document.getElementById('signup-form').reset();

            
            toggleForms(false);
        } else {
            alert('Signup failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during signup.');
    });
}

// Handle login submission
function handleLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById('usernames').value; 
    const password = document.getElementById('passwords').value;

   
       
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}), 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token) { 
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


document.getElementById('form2').addEventListener('submit', handleLogin);

document.getElementById('form1').addEventListener('submit', handleSignup);

// Hamburger menu functionality


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

