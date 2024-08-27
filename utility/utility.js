export function loadHeader() {
    fetch('/components/header/header.html')
        .then(response => response.text())
        .then(data => {
            const navbarHeader = document.getElementById('navbarHeader');
            navbarHeader.innerHTML = data;

            const scriptElements = navbarHeader.querySelectorAll('script');
            scriptElements.forEach(scriptElement => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                if (scriptElement.src) {
                    script.src = scriptElement.src;
                } else {
                    script.textContent = scriptElement.textContent;
                }
                document.body.appendChild(script);
            });

            document.getElementById('bar').addEventListener('click', openSidebar);

            // Call showProfileIcon after header is loaded
            showProfileIcon();
        })
        .catch(error => console.error('Error loading header:', error));
}

export function loadFooter() {
    fetch('/components/footer/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footerEMS').innerHTML = html;
        })
        .catch(error => console.error('Error fetching footer:', error));
}

export async function fetchData(jsonFile) {
    try {
        let response = await fetch(jsonFile);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function showProfileIcon() {
    const token = localStorage.getItem('token');
    const profileIconDiv = document.getElementById("profileOrganiser");

    if (token) {
        profileIconDiv.style.display = "block";
        
    } else {
        profileIconDiv.style.display = "none";
    }
}
