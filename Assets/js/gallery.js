// Photo gallery functionality
class PhotoGallery {
    constructor() {
        this.currentPhoto = 0;
        this.photos = [];
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupGallery());
        } else {
            this.setupGallery();
        }
    }

    setupGallery() {
        const galleryContainer = document.querySelector('[data-gallery]');
        if (!galleryContainer) return;

        // Initialize photo data
        this.photos = [
            { src: '/Assets/images/gallery1.jpg', alt: 'Εργαστήριο επισκευών' },
            { src: '/Assets/images/gallery2.jpg', alt: 'Εξοπλισμός συστημάτων ασφαλείας' },
            { src: '/Assets/images/gallery3.jpg', alt: 'Επισκευή κινητών τηλεφώνων' },
            { src: '/Assets/images/gallery4.jpg', alt: 'Εγκατάσταση συναγερμών' },
            { src: '/Assets/images/gallery5.jpg', alt: 'Τεχνική υποστήριξη' },
            { src: '/Assets/images/gallery6.jpg', alt: 'Νέα προϊόντα τεχνολογίας' }
        ];

        this.createGalleryHTML();
        this.setupControls();
        this.startAutoSlide();
    }

    createGalleryHTML() {
        const container = document.querySelector('[data-gallery]');
        if (!container) return;

        container.innerHTML = `
            <div class="relative w-full h-64 md:h-80 overflow-hidden rounded-lg bg-gray-200">
                <div class="gallery-photos relative w-full h-full">
                    ${this.photos.map((photo, index) => `
                        <div class="photo-slide absolute inset-0 transition-all duration-500 ease-in-out ${index === 0 ? 'active' : ''}"
                             style="transform: translateX(${index === 0 ? '0' : '100'}%)">
                            <img src="${photo.src}" alt="${photo.alt}" 
                                 class="w-full h-full object-cover"
                                 loading="lazy">
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <p class="text-white text-sm font-medium">${photo.alt}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Navigation arrows -->
                <button class="gallery-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Προηγούμενη φωτογραφία">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                
                <button class="gallery-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Επόμενη φωτογραφία">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                
                <!-- Indicators -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    ${this.photos.map((_, index) => `
                        <button class="gallery-indicator w-3 h-3 rounded-full transition-all duration-200 ${index === 0 ? 'bg-white' : 'bg-white/50'}"
                                data-index="${index}"
                                aria-label="Φωτογραφία ${index + 1}"></button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupControls() {
        // Arrow navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-prev')) {
                this.previousPhoto();
            } else if (e.target.closest('.gallery-next')) {
                this.nextPhoto();
            } else if (e.target.matches('.gallery-indicator')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.showPhoto(index);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const galleryContainer = document.querySelector('[data-gallery]');
            if (!galleryContainer) return;

            if (e.key === 'ArrowLeft') {
                this.previousPhoto();
            } else if (e.key === 'ArrowRight') {
                this.nextPhoto();
            }
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        document.addEventListener('touchstart', (e) => {
            const galleryContainer = e.target.closest('[data-gallery]');
            if (galleryContainer) {
                startX = e.touches[0].clientX;
            }
        });

        document.addEventListener('touchend', (e) => {
            const galleryContainer = e.target.closest('[data-gallery]');
            if (galleryContainer) {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        this.nextPhoto();
                    } else {
                        this.previousPhoto();
                    }
                }
            }
        });
    }

    showPhoto(index) {
        if (index < 0 || index >= this.photos.length) return;

        // Pause auto-slide
        this.pauseAutoSlide();

        const slides = document.querySelectorAll('.photo-slide');
        const indicators = document.querySelectorAll('.gallery-indicator');

        // Hide current photo
        slides[this.currentPhoto]?.classList.remove('active');
        slides[this.currentPhoto]?.style.setProperty('transform', 'translateX(-100%)');
        indicators[this.currentPhoto]?.classList.remove('bg-white');
        indicators[this.currentPhoto]?.classList.add('bg-white/50');

        // Show new photo
        this.currentPhoto = index;
        slides[this.currentPhoto]?.classList.add('active');
        slides[this.currentPhoto]?.style.setProperty('transform', 'translateX(0)');
        indicators[this.currentPhoto]?.classList.add('bg-white');
        indicators[this.currentPhoto]?.classList.remove('bg-white/50');

        // Resume auto-slide after 5 seconds
        setTimeout(() => this.resumeAutoSlide(), 5000);
    }

    nextPhoto() {
        const nextIndex = (this.currentPhoto + 1) % this.photos.length;
        this.showPhoto(nextIndex);
    }

    previousPhoto() {
        const prevIndex = this.currentPhoto === 0 ? this.photos.length - 1 : this.currentPhoto - 1;
        this.showPhoto(prevIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextPhoto();
        }, 2000); // 2 seconds as requested
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resumeAutoSlide() {
        if (!this.autoSlideInterval) {
            this.startAutoSlide();
        }
    }
}

// Initialize photo gallery
new PhotoGallery();
