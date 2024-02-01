let apiKey = '42149832-f9141c5344ccf49924bc7a124';
let currentPage = 1;
let imagesPerPage = 16;

function searchImages() {
    let searchTerm = document.getElementById('searchInput').value;
    let colorFilter = document.getElementById('colorSelect').value;
    const startIndex = (currentPage - 1) * imagesPerPage;

    let apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&per_page=${imagesPerPage}&page=${currentPage}`;

    // Lägg till färgfilter om det är valt
    if (colorFilter) {
        apiUrl += `&colors=${colorFilter}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
            displayPagination(data.totalHits);
        });
}

function displayImages(images) {
    let container = document.getElementById('imageContainer');

    // Ta bort befintliga bilder (om det finns några)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Skapa och lägg till nya bild-element
    images.forEach(image => {
        let imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        container.append(imgElement);
    });
}

function displayPagination(totalHits) {
    const totalPages = Math.ceil(totalHits / imagesPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.append = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            searchImages();
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            searchImages();
        }
    });

    paginationContainer.append(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            searchImages();
        });
        paginationContainer.append(pageButton);
    }

    paginationContainer.append(nextButton);
}
