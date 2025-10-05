// Sample photo data
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1759222169701-3a68fb4ea47a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8fA%3D%3D", title: "Faujadarhat Dews", category: "nature" },
  { id: 2, src: "https://images.unsplash.com/photo-1759222238722-23e840ca5998?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Urban Night", category: "street" },
  { id: 3, src: "https://images.unsplash.com/photo-1759222169608-f903f498bbaa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Light Painting", category: "portraits" },
  { id: 4, src: "https://images.unsplash.com/photo-1759222194446-5fc536a89d2e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Light of Hope", category: "creative" },
  { id: 5, src: "https://images.unsplash.com/photo-1759223150675-01f62db634dc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "View through the Windows", category: "nature" },
  { id: 6, src: "https://images.unsplash.com/photo-1759222180492-f5cabd43cc90?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "City Life", category: "street" },
  { id: 7, src: "https://images.unsplash.com/photo-1759222198113-d0e2b862a3b5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Glimps of SCC", category: "portraits" },
  { id: 8, src: "https://images.unsplash.com/photo-1759222210096-844ca35058e6?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "The Horizon", category: "creative" }
];

// DOM elements
const photoGrid = document.getElementById('photoGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentFilter = 'all';
let currentLightboxIndex = 0;
let filteredPhotos = [];

// Initialize the gallery
function initGallery() {
  renderPhotos(photos);
  setupEventListeners();
}

// Render photos
function renderPhotos(photosArray) {
  photoGrid.innerHTML = '';
  photosArray.forEach((photo, index) => {
    const gridItem = document.createElement('div');
    gridItem.className = `grid-item ${photo.category}`;
    gridItem.style.animationDelay = `${index * 0.1}s`;

    gridItem.innerHTML = `
      <img src="${photo.src}" alt="${photo.title}" class="photo">
      <div class="photo-info">
        <h3 class="photo-title">${photo.title}</h3>
        <span class="photo-category">${photo.category}</span>
      </div>
    `;

    gridItem.addEventListener('click', () => openLightbox(index, photosArray));
    photoGrid.appendChild(gridItem);
  });
  filteredPhotos = photosArray;
}

// Filter photos
function filterPhotos(category) {
  if (category === 'all') {
    renderPhotos(photos);
  } else {
    renderPhotos(photos.filter(photo => photo.category === category));
  }

  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-filter') === category) btn.classList.add('active');
  });
  currentFilter = category;
}

// Lightbox
function openLightbox(index, photosArray) {
  currentLightboxIndex = index;
  lightboxImg.src = photosArray[index].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
  if (direction === 'prev') {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
  } else {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredPhotos.length;
  }
  lightboxImg.src = filteredPhotos[currentLightboxIndex].src;
}

// Events
function setupEventListeners() {
  filterButtons.forEach(btn => btn.addEventListener('click', () => filterPhotos(btn.dataset.filter)));
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
  lightboxNext.addEventListener('click', () => navigateLightbox('next'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    }
  });
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

document.addEventListener('DOMContentLoaded', initGallery);
