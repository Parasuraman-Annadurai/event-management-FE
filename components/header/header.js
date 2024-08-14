    function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
}

function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
}

document.getElementById('bar').addEventListener('click', openSidebar);

