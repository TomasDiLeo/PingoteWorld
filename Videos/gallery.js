// Función para crear cada entrada de la galería
function createGalleryEntry(thumbnail, title, description, link) {
    const entryDiv = document.createElement('div');
    const text_descript = document.createElement('div');
    entryDiv.classList.add('gallery-entry');
    text_descript.classList.add('text-descript');

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = thumbnail;
    thumbnailImg.alt = title;
    thumbnailImg.classList.add('thumbnail');

    const titleLink = document.createElement('a');
    titleLink.href = `video.html?title=${encodeURIComponent(title)}&link=${encodeURIComponent(link)}`;
    titleLink.textContent = title;
    titleLink.classList.add('video-title');

    const descriptionP = document.createElement('p');
    descriptionP.textContent = description;
    descriptionP.classList.add('video-description');

    text_descript.appendChild(titleLink);
    text_descript.appendChild(descriptionP);

    entryDiv.appendChild(thumbnailImg);
    entryDiv.appendChild(text_descript);

    return entryDiv;
}

// Función para cargar el CSV y generar la galería
function loadGallery() {
    Papa.parse('https://raw.githubusercontent.com/TomasDiLeo/hosted-files/main/digitalizacion-datos.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            const galleryContainer = document.getElementById('galleryContainer');

            data.forEach(row => {
                if (row.id) {
                    const entry = createGalleryEntry(row.thumbnail, row.title, row.description, row.link);
                    galleryContainer.appendChild(entry);
                }
            });
        }
    });
}

// Ejecutar la función loadGallery cuando la página cargue
window.onload = loadGallery;