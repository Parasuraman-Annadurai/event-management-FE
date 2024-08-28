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

// Error handling function
function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
    } else {
        errorElement.textContent = message;
    }

    inputElement.style.borderColor = 'red';
}

function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        formGroup.removeChild(errorElement);
    }

    inputElement.style.borderColor = '';
}

// Handle signup submission
function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    let isValid = true;

    // Validate inputs
    if (username.value.trim() === '') {
        showError(username, 'Username is required');
        isValid = false;
    } else {
        clearError(username);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError(email, 'Invalid email format');
        isValid = false;
    } else {
        clearError(email);
    }

    if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isValid = false;
    } else {
        clearError(password);
    }

    if (confirmPassword.value.trim() === '') {
        showError(confirmPassword, 'Confirm Password is required');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    if (!isValid) {
        return;
    }

    fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username.value, 
            email: email.value, 
            password: password.value 
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
    
            localStorage.setItem('token', data.token);
           
            toggleForms(false);
        } else {
            Swal.fire({
                title: "Success",
                text: "signup successfully.",
                icon: "success",
            });
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';

    document.getElementById('Login_btn').addEventListener('click', () => {
        toggleForms(true);
    });

    document.getElementById('signup_btn').addEventListener('click', () => {
        toggleForms(false);
    });
            
            // alert('Signup: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: "Error",
            text: "Signup failed.",
            icon: "error",
        });
       
    });
}

// Handle login submission
function handleLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById('usernames');
    const password = document.getElementById('passwords');

    let isValid = true;

    // Validate inputs
    if (username.value.trim() === '') {
        showError(username, 'Username is required');
        isValid = false;
    } else {
        clearError(username);
    }

    if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isValid = false;
    } else {
        clearError(password);
    }

    if (!isValid) {
        return;
    }

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username.value, 
            password: password.value 
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
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

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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
