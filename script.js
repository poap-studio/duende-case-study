// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize comparison chart
    initComparisonChart();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// Comparison Chart
function initComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Normal Post\n(46K likes)', 'Campaign Story\n(141K views)', 'Campaign Reel\n(9K comments)', 'Campaign Shares\n(2.1K shares)'],
            datasets: [{
                label: 'Engagement Rate (%)',
                data: [1.7, 11.1, 511, 20.3],
                backgroundColor: [
                    'rgba(108, 117, 125, 0.8)',
                    'rgba(22, 160, 133, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(22, 160, 133, 0.9)'
                ],
                borderColor: [
                    'rgba(108, 117, 125, 1)',
                    'rgba(22, 160, 133, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(22, 160, 133, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(22, 160, 133, 0.8)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.parsed.y;
                            if (context.dataIndex === 2) {
                                return `Comment Rate: ${label}% (vs 1.7% normal)`;
                            } else if (context.dataIndex === 3) {
                                return `Share Rate: ${label}% (vs 0.9% normal)`;
                            } else {
                                return `Engagement Rate: ${label}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)',
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: '#666',
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        maxRotation: 0
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections (removed .stat to prevent number animation)
    document.querySelectorAll('.funnel-card, .result-card, .problem-box, .comparison-chart').forEach(el => {
        observer.observe(el);
    });
}

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
    .funnel-card, .result-card, .stat, .problem-box, .comparison-chart {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .funnel-card.animate-in, .result-card.animate-in, .stat.animate-in, 
    .problem-box.animate-in, .comparison-chart.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat:nth-child(1).animate-in { transition-delay: 0s; }
    .stat:nth-child(2).animate-in { transition-delay: 0.1s; }
    .stat:nth-child(3).animate-in { transition-delay: 0.2s; }
    
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