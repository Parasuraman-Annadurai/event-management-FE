// Main app
const navigationBar = document.getElementById('header');
// console.log(navigationBar)
// Create navbar
function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    const navbarLeft = document.createElement('div');
    navbarLeft.className = 'navbar-left';

    const sidebarIcon = document.createElement('i');
    sidebarIcon.className = 'fas fa-bars sidebar-icon';
    sidebarIcon.id='bar'
    
    // console.log(sidebarIcon.onclick = openSidebar)
    // const sidebarIcon = document.createElement('i');
    // sidebarIcon.className = 'fas fa-bars sidebar-icon';
    // sidebarIcon.addEventListener('click', openSidebar);
    // console.log("sidebarIcon");

    const navLogo = document.createElement('div');
    navLogo.className = 'nav-logo';
    navLogo.textContent = 'Event Spot';

    navbarLeft.appendChild(sidebarIcon);
    navbarLeft.appendChild(navLogo);

    const navbarRight = document.createElement('div');
    navbarRight.className = 'navbar-right';

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search...';
    searchBar.className = 'search-bar';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    searchIcon.id='search-icon'

    const famousPackages = document.createElement('div');
    famousPackages.className = 'famous-Packages';
    
    const packagesButton = document.createElement('button');
    packagesButton.textContent = 'Famous Packages';
    packagesButton.className = 'famous_Packages';


    const packagesDropdown = document.createElement('div');
    packagesDropdown.className = 'packages-dropdown-content';

    const birthdayLink = document.createElement('a');
    birthdayLink.href = '#';
    birthdayLink.textContent = 'BirthDay Party';

    const weddingLink = document.createElement('a');
    weddingLink.href = '#';
    weddingLink.textContent = 'Wedding';

    packagesDropdown.appendChild(birthdayLink);
    packagesDropdown.appendChild(weddingLink);

    famousPackages.appendChild(packagesButton);
    famousPackages.appendChild(packagesDropdown);

    const famousEvents = document.createElement('div');
    famousEvents.className = 'famous-Events';
    
    const eventsButton = document.createElement('button');
    eventsButton.textContent = 'Famous Events';
    eventsButton.className = 'Famous_events';


    const eventsDropdown = document.createElement('div');
    eventsDropdown.className = 'events-dropdown-content';

    const makeupLink = document.createElement('a');
    makeupLink.href = '#';
    makeupLink.textContent = 'Makeup';

    const decorationLink = document.createElement('a');
    decorationLink.href = '#';
    decorationLink.textContent = 'Decoration';

    eventsDropdown.appendChild(makeupLink);
    eventsDropdown.appendChild(decorationLink);

    famousEvents.appendChild(eventsButton);
    famousEvents.appendChild(eventsDropdown);


    const servicesDropdown = document.createElement('div');
    servicesDropdown.className = 'services-dropdown';
    
    const servicesButton = document.createElement('button');
    servicesButton.textContent = 'Services';
    servicesButton.className = 'Services_content';


    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'services-dropdown-content';

    const packagesLink = document.createElement('a');
    packagesLink.href = '#';
    packagesLink.textContent = 'Packages';

    const eventsLink = document.createElement('a');
    eventsLink.href = '#';
    eventsLink.textContent = 'Events';

    dropdownContent.appendChild(packagesLink);
    dropdownContent.appendChild(eventsLink);

    servicesDropdown.appendChild(servicesButton);
    servicesDropdown.appendChild(dropdownContent);

    const profileIcon = document.createElement('i');
    profileIcon.className = 'fas fa-user-circle profile-icon';

    navbarRight.appendChild(searchBar);
    navbarRight.appendChild(searchIcon);
    navbarRight.appendChild(famousPackages);
    navbarRight.appendChild(famousEvents);
    navbarRight.appendChild(servicesDropdown);
    navbarRight.appendChild(profileIcon);

    navbar.appendChild(navbarLeft);
    navbar.appendChild(navbarRight);
// console.log(navbar);
    return navbar;
}

// Create sidebar
function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'mySidebar';
    sidebar.className = 'sidebar';

    const closeBtn = document.createElement('a');
    closeBtn.href = 'javascript:void(0)';
    closeBtn.className = 'closebtn';
    closeBtn.onclick = closeSidebar;
    closeBtn.innerHTML = '&times;';

    const menuItems = ['Home', 'Events', 'Packages', 'About Us', 'Contact', 'FAQ', 'Terms', 'Privacy Policy'];

    sidebar.appendChild(closeBtn);

    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item;
        sidebar.appendChild(link);
    });

    return sidebar;
}



// // Create overlay
// function createOverlay() {
//     const overlay = document.createElement('div');
//     overlay.id = 'overlay';
//     overlay.className = 'overlay';
//     overlay.onclick = closeSidebar;
//     return overlay;
// }



// Open sidebar


// Close sidebar
function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}


// Initialize app
 function header() {

    navigationBar.appendChild(createNavbar());
    navigationBar.appendChild(createSidebar());
    // navigationBar.appendChild(createOverlay());
    
  
}

// Run the app
header();

let bar = document.querySelector('#bar')
console.log(bar);
bar.addEventListener('click', openSidebar)
function openSidebar() {
    console.log("open sidebar")
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
}
