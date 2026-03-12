// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
    // All animations removed - static page only
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// All scroll animations removed

// Counter animations removed - static numbers only

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

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .funnel-card, .result-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .funnel-card.animate-in, .result-card.animate-in, 
    {
        opacity: 1;
        transform: translateY(0);
    }
    
    .funnel-card:nth-child(1).animate-in { transition-delay: 0s; }
    .funnel-card:nth-child(2).animate-in { transition-delay: 0.1s; }
    .funnel-card:nth-child(3).animate-in { transition-delay: 0.2s; }
    
    .result-card:nth-child(1).animate-in { transition-delay: 0s; }
    .result-card:nth-child(2).animate-in { transition-delay: 0.1s; }
    .result-card:nth-child(3).animate-in { transition-delay: 0.2s; }
    
    /* Loading animation for chart */
    .chart-container canvas {
        opacity: 0;
        animation: fadeIn 1s ease forwards 0.5s;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    
    /* Hover effects */
    .funnel-card:hover .step-number {
        color: var(--accent-orange);
        transform: scale(1.1);
        transition: all 0.3s ease;
    }
    
    .result-card:hover {
        border-top-width: 6px;
        transition: all 0.3s ease;
    }
    
    .stat:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
        .funnel-stats {
            flex-direction: column;
            gap: 20px;
        }
        
        .arrow {
            transform: rotate(90deg);
            font-size: 1.5rem;
        }
        
        .metric-comparison {
            flex-direction: column;
            gap: 4px;
            text-align: center;
        }
    }
    
    /* Pulse animation for key metrics */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .stat-number, .step-number {
        animation: pulse 2s infinite;
        animation-play-state: paused;
    }
    
    .animate-in .stat-number, .animate-in .step-number {
        animation-play-state: running;
        animation-delay: 1s;
    }
`;
document.head.appendChild(style);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for buttons (for analytics)
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Analytics tracking would go here
            console.log('Button clicked:', this.textContent);
        });
    });
    
    // Add hover effects for funnel cards
    document.querySelectorAll('.funnel-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-green)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-light)';
        });
    });
    
    // Progressive enhancement for reduced motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// Performance optimization: Lazy load chart
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Chart is already initialized in the main function
            chartObserver.unobserve(entry.target);
        }
    });
});

const chartContainer = document.querySelector('.chart-container');
if (chartContainer) {
    chartObserver.observe(chartContainer);
}