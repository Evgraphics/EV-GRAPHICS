// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'fixed'; // Changed to fixed for better mobile experience
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(18, 18, 18, 0.98)';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
        navLinks.style.textAlign = 'center';
        navLinks.style.height = 'calc(100vh - 70px)'; // Full height minus header
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navLinks.style.display = 'none';
    }
});

// Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu on click
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1 // Lower threshold for earlier activation
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation class to elements
document.querySelectorAll('.service-card, .Samples-item, .section-title, .info-item, .why-us-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});


// --- Category Management & Lightbox Logic ---

// Image Data Source (simulated large gallery using available images)
const categoryImages = {
    'logo-design': [
        'img/LOGO DESING 1.jpeg', 'img/LOGO DESING 2.jpeg', 'img/LOGO DESING 3.jpeg',
        'img/LOGO DESING 4.jpeg', 'img/LOGO DESING 5.jpeg', 'img/LOGO DESING 6.jpeg',
        'img/LOGO DESING 7.jpeg', 'img/LOGO DESING 8.jpeg', 'img/LOGO DESING 9.jpeg',
        'img/LOGO DESING 10.jpeg', 'img/LOGO DESING 11.jpeg'
    ],
    'youtube-thumbnail': [
        'img/YT T 1.jpeg', 'img/YT T 2.jpeg', 'img/D1.png'
    ],
    'leaflet-design': [
        'img/LEAFLET D 1.jpeg', 'img/LEAFLET D 2.jpeg', 'img/LEAFLET D 3.jpeg',
        'img/LEAFLET D 4.jpeg'
    ],
    'brand-label': [
        'img/PEANUT 1.jpg', 'img/PEANUT 2.jpg', 'img/PEANUT 3.jpg'
    ],
    'tute-cover': [
        'img/COVER 1.jpeg', 'img/COVER 2.jpeg', 'img/6.jpg', 'img/7.jpg',
        'img/8.jpg', 'img/9.jpg', 'img/10.jpg', 'img/11.jpg'
    ],
    'social-post': [
        'img/SOCIL MEDIA 1.jpeg', 'img/SOCIL MEDIA 2.jpeg', 'img/SOCIL MEDIA 3.jpeg',
        'img/SOCIL MEDIA 4.jpeg', 'img/SOCIL MEDIA 5.jpeg', 'img/SOCIL MEDIA 6.jpeg',
        'img/S 1.jpg', 'img/S3.jpg', 'img/S2.jpg',
        'img/SOCIL MEDIA D1.jpeg', 'img/SOCIL MEDIA D2.jpeg', 'img/SOCIL MEDIA D3.jpeg',
        'img/SOCIL MEDIA D4.jpeg', 'img/SOCIL MEDIA D5.jpeg'
    ],
    'tshirt-merch': [
        'img/SHIRT D 1.jpeg', 'img/SHIRT D 2.jpeg', 'img/SHIRT D 3.jpeg',
        'img/SHIRT D 4.jpeg', 'img/SHIRT D 5.jpeg', 'img/SHIRT D 6.jpeg',
        'img/SHIRT D 7.jpeg', 'img/SHIRT D 8.jpeg', 'img/SHIRT D 9.jpeg',
        'img/SHIRT D 10.jpeg'
    ],
    'business-card': [
        'img/BS CARD 1.jpeg', 'img/BS CARD 2.jpeg', 'img/BS CARD 3.jpeg',
        'img/BS CARD 4.jpeg', 'img/BS CARD 5.jpeg', 'img/BS CARD 6.jpeg'
    ],
    'event-tickets': [
        'img/tickets available.jpg', 'img/COVER 4.jpg', 'img/COVER 5.jpg',
        'img/tickets available.jpg', 'img/COVER 4.jpg', 'img/COVER 5.jpg'
    ],
    'banner-visiting': [
        'img/S 1.jpg', 'img/S2.jpg', 'img/S3.jpg', 'img/7.jpg', 'img/S 1.jpg',
        'img/S2.jpg', 'img/S3.jpg', 'img/7.jpg'
    ]
};

// Auto Slideshow for Category Cards
const categoryCards = document.querySelectorAll('.sample-category-card');

categoryCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const imgElement = card.querySelector('.category-main-img');
    const images = categoryImages[category];

    if (images && images.length > 1) {
        let currentIndex = 0;

        // Change image every 3 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            // Simple fade effect could be added here preferably via CSS class, 
            // but directly swapping src works for basic slideshow
            imgElement.style.opacity = '0.5';
            setTimeout(() => {
                imgElement.src = images[currentIndex];
                imgElement.onload = () => {
                    imgElement.style.opacity = '1';
                };
            }, 200);
        }, 3000 + Math.random() * 2000); // Random offset so they don't all change at once
    }

    // click event to open lightbox
    card.addEventListener('click', () => {
        openLightbox(category);
    });
});

// Lightbox Functions
const lightbox = document.getElementById('lightbox');
const lightboxGrid = document.getElementById('lightbox-grid');
const lightboxTitle = document.getElementById('lightbox-category-title');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(category) {
    // Clear previous
    lightboxGrid.innerHTML = '';

    // Set Title
    lightboxTitle.innerText = category.toUpperCase() + ' SAMPLES';

    // Populate Images
    // We duplicate the array to simulate "60 images" if needed, 
    // or just use what we have.
    const images = categoryImages[category];
    // Create enough copies to fill grid
    const totalDisplay = 60;

    for (let i = 0; i < totalDisplay; i++) {
        const src = images[i % images.length];
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'lightbox-img-wrapper';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'lightbox-img';
        img.loading = 'lazy'; // Performance for many images

        imgWrapper.appendChild(img);
        lightboxGrid.appendChild(imgWrapper);

        // Animate appearance
        imgWrapper.style.opacity = '0';
        imgWrapper.style.transform = 'translateY(20px)';
        setTimeout(() => {
            imgWrapper.style.transition = 'all 0.5s ease';
            imgWrapper.style.opacity = '1';
            imgWrapper.style.transform = 'translateY(0)';
        }, i * 50); // Staggered animation
    }

    // Show Lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


// Reviews Carousel Interaction (Manual Scroll support)
const reviewsCarousel = document.querySelector('.reviews-carousel');
if (reviewsCarousel) {
    // Enable horizontal scrolling with mouse wheel
    reviewsCarousel.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        reviewsCarousel.scrollLeft += evt.deltaY;
    });

    // Add hover effect to individual cards
    const reviewCards = document.querySelectorAll('.reviews-carousel .review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 243, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });

        // Initial styles
        card.style.transition = 'all 0.3s ease';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
}

// Star Rating Functionality
const starIcons = document.querySelectorAll('.star-rating-input i');
const feedbackRatingInput = document.getElementById('feedbackRating');

starIcons.forEach(star => {
    star.addEventListener('click', function () {
        const value = this.getAttribute('data-value');
        feedbackRatingInput.value = value;

        // Update star display
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    });

    // Hover effect
    star.addEventListener('mouseover', function () {
        const value = this.getAttribute('data-value');
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= value) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

// Reset stars on mouseleave
const starRatingInput = document.querySelector('.star-rating-input');
if (starRatingInput) {
    starRatingInput.addEventListener('mouseleave', function () {
        const currentValue = feedbackRatingInput.value;
        starIcons.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= currentValue) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');
const successMessage = document.getElementById('successMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check if rating is selected
        if (feedbackRatingInput.value === '0') {
            alert('Please select a rating!');
            return;
        }

        // Get form values
        const name = document.getElementById('feedbackName').value;
        const email = document.getElementById('feedbackEmail').value;
        const rating = feedbackRatingInput.value;
        const message = document.getElementById('feedbackMessage').value;

        // Change button text to indicate sending
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        // Replace with your Service ID and Template ID
        const templateParams = {
            from_name: name,
            from_email: email,
            rating: rating,
            message: message,
            to_name: "EV Graphic's Admin"
        };

        emailjs.send('service_Janith2007', 'template_jycdexf', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);

                // Add new review to Customer Reviews carousel (visual feedback)
                const reviewsCarousel = document.querySelector('.reviews-carousel');
                if (reviewsCarousel) {
                    // Create new review card HTML
                    let starsHTML = '';
                    for (let i = 0; i < 5; i++) {
                        starsHTML += '<i class="fas fa-star"></i>';
                    }

                    const newReviewHTML = `
                        <div class="review-card" style="animation: slideInUp 0.6s ease-out forwards;">
                            <div class="review-header">
                                <div class="review-stars">
                                    ${starsHTML}
                                </div>
                                <span class="review-rating">${rating}/5</span>
                            </div>
                            <h4>${name}</h4>
                            <p>"${message}"</p>
                        </div>
                    `;

                    // Add card to carousel
                    reviewsCarousel.insertAdjacentHTML('beforeend', newReviewHTML);

                    // Apply hover effects to new card
                    const newCard = reviewsCarousel.lastElementChild;
                    newCard.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    newCard.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';

                    newCard.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-10px) scale(1.02)';
                        this.style.boxShadow = '0 15px 30px rgba(0, 243, 255, 0.4)';
                    });

                    newCard.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0) scale(1)';
                        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                    });

                    // Scroll to show new review
                    setTimeout(() => {
                        reviewsCarousel.scrollLeft = reviewsCarousel.scrollWidth;
                    }, 100);
                }

                // Hide form and show success message
                feedbackForm.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after 5 seconds
                setTimeout(() => {
                    feedbackForm.reset();
                    feedbackForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    feedbackRatingInput.value = '0';
                    submitBtn.innerText = originalBtnText; // Restore button text
                    submitBtn.disabled = false;
                    starIcons.forEach(s => {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    });
                }, 5000);

            }, function (error) {
                console.log('FAILED...', error);
                alert('Failed to send feedback. Please try again later.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Contact Form Submission (Get In Touch)
// Contact Form Submission (Get In Touch)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Change button text to indicate sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            reply_to: email, // Added correct reply_to field
            rating: "N/A (Contact Form)",
            message: message,
            to_name: "EV Graphic's Admin"
        };

        emailjs.send('service_Janith2007', 'template_jycdexf', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);

                // Show a more visible success message (alert is okay, but custom UI is better)
                // For now, we'll stick to alert but make it friendly
                alert('Success! Your message has been sent to EV Graphic\'s. We will contact you shortly.');

                contactForm.reset();
                submitBtn.innerText = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            }, function (error) {
                console.log('FAILED...', error);
                alert('Oops! Something went wrong. Please check your internet connection or email us directly at sdimuthubandara@gmail.com');
                submitBtn.innerText = 'Try Again';
                submitBtn.disabled = false;
            });
    });
}

