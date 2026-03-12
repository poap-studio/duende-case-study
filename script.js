// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel videos
    initCarouselVideos();
    
    // Smooth scrolling for anchor links only
    initSmoothScrolling();
});

// Carousel video optimization
function initCarouselVideos() {
    const videos = document.querySelectorAll('.story-video');
    
    videos.forEach(video => {
        // Reduce quality for performance
        video.setAttribute('preload', 'metadata');
        
        // Error handling for large videos
        video.addEventListener('error', function() {
            console.log('Video failed to load:', this.src);
            // Could replace with a poster image here
        });
        
        // Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(e => {
                        console.log('Video autoplay failed:', e);
                    });
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(video);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}