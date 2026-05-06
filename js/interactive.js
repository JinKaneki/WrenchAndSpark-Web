// Interactive elements for Wrench & Spark website

// Product Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchFunctionality();
    initializeProductFilter();
    initializeImageLightbox();
    initializeAccordions();
    initializeModal();
    initializeAnimations();
});

// Advanced Search Functionality
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        // Real-time search filtering
        searchInput.addEventListener('input', function() {
            filterProducts(this.value.toLowerCase());
        });
        
        // Search button click
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value.toLowerCase());
        });
        
        // Enter key support
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value.toLowerCase());
            }
        });
    }
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        const productCategory = card.getAttribute('data-category');
        
        if (productName.includes(searchTerm) || 
            productDescription.includes(searchTerm) || 
            productCategory.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show no results message if needed
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

function performSearch(searchTerm) {
    filterProducts(searchTerm);
    
    // Update URL for shareable searches (without page reload)
    const newUrl = window.location.origin + window.location.pathname + 
                  (searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '');
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Show search results count
    const resultsCount = document.querySelectorAll('.product-card[style="display: block"]').length;
    if (searchTerm && resultsCount > 0) {
        showNotification(`Found ${resultsCount} products matching "${searchTerm}"`);
    }
}

// Advanced Product Filtering
function initializeProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortProducts');
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const priceRange = this.getAttribute('data-price');
            
            applyAdvancedFilters(filter, priceRange);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function applyAdvancedFilters(category, priceRange) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        const productPrice = parseFloat(card.querySelector('.product-price').textContent.replace('R', '').replace(',', ''));
        let shouldShow = true;
        
        // Category filter
        if (category && category !== 'all' && productCategory !== category) {
            shouldShow = false;
        }
        
        // Price range filter
        if (priceRange && shouldShow) {
            const [min, max] = priceRange.split('-').map(Number);
            if (productPrice < min || (max && productPrice > max)) {
                shouldShow = false;
            }
        }
        
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

function sortProducts(sortBy) {
    const productGrid = document.querySelector('.product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('R', '').replace(',', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('R', '').replace(',', ''));
        const nameA = a.querySelector('h3').textContent.toLowerCase();
        const nameB = b.querySelector('h3').textContent.toLowerCase();
        
        switch(sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            case 'featured':
            default:
                return 0; // Keep original order
        }
    });
    
    // Re-append sorted products
    productCards.forEach(card => productGrid.appendChild(card));
}

// Image Lightbox Gallery
function initializeImageLightbox() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            openLightbox(this);
        });
    });
    
    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content">
                <img id="lightbox-image" src="" alt="">
                <div class="lightbox-caption">
                    <h3 id="lightbox-title"></h3>
                    <p id="lightbox-description"></p>
                </div>
            </div>
            <button class="lightbox-nav lightbox-prev">&#10094;</button>
            <button class="lightbox-nav lightbox-next">&#10095;</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Lightbox event listeners
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const lightboxImage = document.getElementById('lightbox-image');
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const productCard = element.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productDescription = productCard.querySelector('.product-description').textContent;
    
    // Use Font Awesome icon or placeholder for demo
    lightboxImage.innerHTML = '<i class="fas fa-tools fa-5x" style="color: #003366;"></i>';
    lightboxTitle.textContent = productName;
    lightboxDescription.textContent = productDescription;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// FAQ Accordion
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Toggle active class
            accordionItem.classList.toggle('active');
            
            // Toggle content visibility
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
            
            // Close other accordions (optional)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
        });
    });
}

// Modal System
function initializeModal() {
    // Special offers modal that appears after 3 seconds
    setTimeout(() => {
        showSpecialOfferModal();
    }, 3000);
}

function showSpecialOfferModal() {
    // Check if user has already seen the modal today
    const lastModalDate = localStorage.getItem('lastModalDate');
    const today = new Date().toDateString();
    
    if (lastModalDate !== today) {
        const modalHTML = `
            <div id="specialOfferModal" class="modal">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2>Special Offer! 🛠️</h2>
                    <p>Get <strong>15% OFF</strong> your first order when you sign up for our newsletter!</p>
                    <div class="modal-form">
                        <input type="email" placeholder="Enter your email" id="modalEmail">
                        <button class="btn" onclick="subscribeNewsletter()">Get My Discount</button>
                    </div>
                    <p class="modal-small">Limited time offer. Terms and conditions apply.</p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('specialOfferModal');
        const closeBtn = document.querySelector('.modal-close');
        
        modal.style.display = 'block';
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            localStorage.setItem('lastModalDate', today);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                localStorage.setItem('lastModalDate', today);
            }
        });
    }
}

// Animations
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card, .value-card').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Global function for modal subscription
function subscribeNewsletter() {
    const email = document.getElementById('modalEmail').value;
    if (validateEmail(email)) {
        showNotification('Thank you for subscribing! Check your email for your discount code.', 'success');
        document.getElementById('specialOfferModal').style.display = 'none';
        localStorage.setItem('lastModalDate', new Date().toDateString());
        localStorage.setItem('subscribed', 'true');
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}