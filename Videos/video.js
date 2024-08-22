function getVideoId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadVideo() {
    const videoId = getVideoId();
    let videoSrc = '';

    switch(videoId) {
        case 'cassette1p1':
            videoSrc = 'https://voe.sx/e/od6h7p7psthd';
            break;
        case 'cassette1p2':
            videoSrc = 'https://voe.sx/e/qmohdzzigddr';
            break;
        // Agrega más casos según sea necesario
        default:
            videoSrc = '';
    }

    if (videoSrc) {
        document.getElementById('frame').src = videoSrc;
    } else {
        document.getElementById('videoContainer').innerHTML = '<p>Video no encontrado.</p>';
    }
}

window.onload = loadVideo;