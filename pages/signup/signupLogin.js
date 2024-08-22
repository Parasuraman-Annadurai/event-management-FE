import { loadHeader, loadFooter } from '/utility/utility.js'; // Adjust path as needed

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter(); // or switchToLogin() based on your default preference
});

document.getElementById('signup-form').style.display = 'block';
document.getElementById('login-form').style.display = 'none';

 const Login_btn=document.getElementById('Login_btn').addEventListener('click', () =>{
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('form-title').innerText = 'Login';
    document.getElementById('submit-btn').innerText = 'Login';
    document.getElementById('switch-form').innerHTML = `Don't have an account? <span onclick="switchToSignup()">Sign up here</span>`;



 });
  const signup_btn=document.getElementById('signup_btn').addEventListener('click', () =>{
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('form-title').innerText = 'Sign Up';
    document.getElementById('submit-btn').innerText = 'Sign Up';
    document.getElementById('switch-form').innerHTML = `Already have an account? <span onclick="switchToLogin()">Login here</span>`;
  });


  function handleSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log({ username, email, password });

    // Add form validation and submission logic here
    // Example:
    // if (!username || !email || !password) {
    //     alert('All fields are required');
    //     return;
    // }
    // Perform AJAX request to submit the form
}



  
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
