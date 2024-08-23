// Función para obtener el ID del video desde la URL
function getVideoTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('title');
}

function getVideoLink() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('link');
}

// Función para cargar el CSV y buscar el ID
function loadVideo() {
    const videoTitle= getVideoTitle();
    const videoLink = getVideoLink();

    if (videoLink) {
        document.getElementById('videoFrame').src = videoLink;
        document.getElementById('title').innerText = videoTitle;
        document.title = videoTitle;
    } else {
        document.getElementById('message').textContent = 'Video no encontrado.';
    }
}

// Ejecutar la función loadVideo cuando la página cargue
window.onload = loadVideo;