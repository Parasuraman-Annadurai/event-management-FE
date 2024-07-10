// Main app
const footerBar = document.getElementById('footer');

// Create footer
function createFooter() {
    const footer = document.createElement('footer');
    footer.textContent = '© 2024 EventSpot';
    return footer;
}

// Initialize app
 function footer() {
    footerBar.appendChild(createFooter());

}

// Run the app
footer();
