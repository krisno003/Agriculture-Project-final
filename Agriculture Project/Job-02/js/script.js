// Weather API Integration for Krisno
const weatherConfig = {
    apiKey: 'YOUR_API_KEY_HERE',
    city: 'Dhaka',
    units: 'metric'
};

async function updateLiveWeather() {
    const weatherElement = document.getElementById('weather-info');
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${weatherConfig.city}&units=${weatherConfig.units}&appid=${weatherConfig.apiKey}`
        );

        if (!response.ok) throw new Error('Weather data unavailable');

        const data = await response.json();
        
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;
        const humidity = data.main.humidity;

        // Updating the live data bar
        weatherElement.innerHTML = `${temp}°C | ${condition} (RH: ${humidity}%)`;
        
    } catch (error) {
        console.error('Weather Error:', error);
        weatherElement.innerHTML = "31°C | Sunny"; 
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateLiveWeather);

setInterval(updateLiveWeather, 900000);
document.getElementById('year').textContent = new Date().getFullYear();
function updateBangladeshDateTime() {
    const now = new Date();

    // 1. Format the Date (e.g., April 5, 2026)
    const dateOptions = {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const bdDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(now);

    // 2. Format the Time (e.g., 05:15:02 PM)
    const timeOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const bdTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(now);

    // 3. Inject into HTML
    document.getElementById('bd-date').textContent = bdDate;
    document.getElementById('bd-time').textContent = bdTime;
}

// Update the clock every 1 second
setInterval(updateBangladeshDateTime, 1000);

// Run immediately on page load
updateBangladeshDateTime();

/* ===== GUIDES & TUTORIALS FUNCTIONALITY ===== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Guides Functionality
    initializeGuidesFiltering();
    initializeGuidesSearch();
    initializeAnimations();
    initializeCategoryTabs();
    initializeInstructionTabs();
    initializeCategoryCardAnimations();
});

// Filter Guides by Category
function initializeGuidesFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const guideCards = document.querySelectorAll('.guide-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter cards with animation
            guideCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'slideInLeft 0.6s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search Guides by Title
function initializeGuidesSearch() {
    const searchInput = document.getElementById('searchGuides');
    const guideCards = document.querySelectorAll('.guide-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        let foundCount = 0;
        
        guideCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                card.style.animation = 'slideInLeft 0.4s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results
        if (foundCount === 0 && searchTerm.length > 0) {
            console.log('No guides found for: ' + searchTerm);
        }
    });
}

// Intersection Observer for Staggered Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInLeft 0.6s ease';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all guide cards
    const cards = document.querySelectorAll('.guide-card');
    cards.forEach(card => observer.observe(card));
}

/**
 * Category Tabs Functionality
 * Switch between Crop Type, Seasons, and Farming Methods
 */
function initializeCategoryTabs() {
    const tabButtons = document.querySelectorAll('.cat-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content with animation
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.style.animation = 'fadeIn 0.6s ease';
            }
        });
    });
}

/**
 * Instruction Tabs Functionality
 * Switch between different farming instructions
 */
function initializeInstructionTabs() {
    const tabButtons = document.querySelectorAll('.inst-tab-btn');
    const tabContents = document.querySelectorAll('.instruction-content');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentId = this.getAttribute('data-instruction');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content with animation
            const activeContent = document.getElementById(contentId);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.style.animation = 'fadeIn 0.6s ease';
            }
        });
    });
}

/**
 * Add hover animation to category cards
 */
function initializeCategoryCardAnimations() {
    const cards = document.querySelectorAll('.category-card, .instruction-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Animate contact form section and reveal cards on scroll
function initializeContactSection() {
    const cards = document.querySelectorAll('.contact-form-card, .contact-info-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

function initializeContactForm() {
    const form = document.getElementById('extension-contact-form');
    const alertBox = document.getElementById('contactFormAlert');

    if (!form || !alertBox) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = form.fullName.value.trim();
        const email = form.emailAddress.value.trim();
        const inquiry = form.messageText.value.trim();

        if (!fullName || !email || !inquiry) {
            alertBox.classList.remove('d-none', 'alert-success');
            alertBox.classList.add('alert-warning');
            alertBox.textContent = 'Please complete the required fields before submitting.';
            return;
        }

        alertBox.classList.remove('d-none', 'alert-warning');
        alertBox.classList.add('alert-success');
        alertBox.textContent = `Thank you ${fullName}! Your inquiry has been received. Our agricultural extension team will contact you shortly.`;
        form.reset();

        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 7000);
    });
}

function populateCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeContactSection();
    initializeContactForm();
    populateCurrentYear();
});

/* ===== CROP INFORMATION FUNCTIONALITY ===== */

// Initialize Crop Section on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCropFiltering();
    initializeCropSearch();
    initializeCropModal();
    initializeCropAnimations();
});

// Filter Crops by Category
function initializeCropFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const cropCards = document.querySelectorAll('.crop-card');

    if (!categoryButtons.length) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-category');

            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter cards with animation
            cropCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'slideInLeft 0.6s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search Crops by Name
function initializeCropSearch() {
    const searchInput = document.getElementById('searchCrops');
    const cropCards = document.querySelectorAll('.crop-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        let foundCount = 0;

        cropCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.crop-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                card.style.animation = 'slideInLeft 0.4s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show message if no results
        if (foundCount === 0 && searchTerm.length > 0) {
            console.log('No crops found for: ' + searchTerm);
        }
    });
}

// Modal Functionality for Crop Details
function initializeCropModal() {
    const modal = document.getElementById('cropModal');
    const closeBtn = document.querySelector('.modal-close');
    const viewDetailButtons = document.querySelectorAll('.view-details');

    if (!modal || !viewDetailButtons.length) return;

    // Open modal when view details is clicked
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cropCard = this.closest('.crop-card');
            const cropName = cropCard.querySelector('h3').textContent;
            const cropImage = cropCard.querySelector('img').src;
            const cropDescription = cropCard.querySelector('.crop-description').textContent;

            // Populate modal with crop data
            populateModal(cropName, cropImage, cropDescription);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Populate Modal with Crop Data
function populateModal(cropName, cropImage, cropDescription) {
    const modalTitle = document.querySelector('.modal-header h2');
    const modalImage = document.querySelector('.modal-image');
    const modalDescription = document.querySelector('.modal-description');

    if (modalTitle) modalTitle.textContent = cropName;
    if (modalImage) modalImage.src = cropImage;
    if (modalDescription) modalDescription.textContent = cropDescription;

    // You can extend this function to populate more detailed information
    // based on the crop data attributes or a data structure
}

// Intersection Observer for Crop Card Animations
function initializeCropAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInLeft 0.6s ease';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all crop cards
    const cropCards = document.querySelectorAll('.crop-card');
    cropCards.forEach(card => observer.observe(card));
}

/* ===== PEST CONTROL FUNCTIONALITY ===== */

// Initialize Pest Control Section on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePestFiltering();
    initializePestSearch();
    initializePestModal();
    initializePestAnimations();
});

// Filter Pests by Category
function initializePestFiltering() {
    const pestCategoryButtons = document.querySelectorAll('.pest-category-btn');
    const pestCards = document.querySelectorAll('.pest-card');

    if (!pestCategoryButtons.length) return;

    pestCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-pest-category');

            // Remove active class from all buttons
            pestCategoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter cards with animation
            pestCards.forEach(card => {
                const category = card.getAttribute('data-pest-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'slideInLeft 0.6s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search Pests by Name
function initializePestSearch() {
    const searchInput = document.getElementById('searchPests');
    const pestCards = document.querySelectorAll('.pest-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        let foundCount = 0;

        pestCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.pest-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                card.style.animation = 'slideInLeft 0.4s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show message if no results
        if (foundCount === 0 && searchTerm.length > 0) {
            console.log('No pests found for: ' + searchTerm);
        }
    });
}

// Modal Functionality for Pest Details
function initializePestModal() {
    const modal = document.getElementById('pestModal');
    const closeBtn = document.querySelector('.modal-close');
    const viewDetailButtons = document.querySelectorAll('.pest-card .view-details');

    if (!modal || !viewDetailButtons.length) return;

    // Open modal when view details is clicked
    viewDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pestCard = this.closest('.pest-card');
            const pestName = pestCard.querySelector('h3').textContent;
            const pestImage = pestCard.querySelector('img').src;
            const pestDescription = pestCard.querySelector('.pest-description').textContent;

            // Populate modal with pest data
            populatePestModal(pestName, pestImage, pestDescription);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Populate Pest Modal with Data
function populatePestModal(pestName, pestImage, pestDescription) {
    const modalTitle = document.querySelector('.pest-modal .modal-header h2');
    const modalImage = document.querySelector('.pest-modal .modal-image');
    const modalDescription = document.querySelector('.pest-modal .modal-description');

    if (modalTitle) modalTitle.textContent = pestName;
    if (modalImage) modalImage.src = pestImage;
    if (modalDescription) modalDescription.textContent = pestDescription;

    // You can extend this function to populate more detailed information
    // based on the pest data attributes or a data structure
}

// Intersection Observer for Pest Card Animations
function initializePestAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInLeft 0.6s ease';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all pest cards
    const pestCards = document.querySelectorAll('.pest-card');
    pestCards.forEach(card => observer.observe(card));

    // Observe biological control cards
    const biologicalCards = document.querySelectorAll('.biological-card');
    biologicalCards.forEach(card => observer.observe(card));

    // Observe approach cards
    const approachCards = document.querySelectorAll('.approach-card');
    approachCards.forEach(card => observer.observe(card));
}
 
      document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('extension-contact-form');
        const alertBox = document.getElementById('contactFormAlert');

        if (!form || !alertBox) return;

        form.addEventListener('submit', function(event) {
          event.preventDefault();

          const fullName = form.fullName.value.trim();
          const email = form.emailAddress.value.trim();
          const inquiry = form.messageText.value.trim();

          if (!fullName || !email || !inquiry) {
            alertBox.classList.remove('d-none', 'alert-success');
            alertBox.classList.add('alert-warning');
            alertBox.textContent = 'Please complete the required fields before submitting.';
            return;
          }

          alertBox.classList.remove('d-none', 'alert-warning');
          alertBox.classList.add('alert-success');
          alertBox.textContent = `Thank you ${fullName}! Your inquiry has been received. Our agricultural extension team will contact you shortly.`;
          form.reset();

          setTimeout(() => {
            alertBox.classList.add('d-none');
          }, 7000);
        });
      });