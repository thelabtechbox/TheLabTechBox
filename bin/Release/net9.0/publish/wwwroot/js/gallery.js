// Gallery Auto-Rotation - Changes image every 2 seconds
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;
    
    if (images.length === 0) return;
    
    // Function to show current image and hide others
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.opacity = '1';
            } else {
                img.style.opacity = '0';
            }
        });
    }
    
    // Auto-rotate images every 2 seconds
    function rotateImages() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    
    // Start the rotation
    const interval = setInterval(rotateImages, 2000);
    
    // Optional: Pause on hover
    const container = document.querySelector('.gallery-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        container.addEventListener('mouseleave', () => {
            setInterval(rotateImages, 2000);
        });
    }
});
