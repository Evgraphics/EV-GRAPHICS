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

const categoryCards = document.querySelectorAll('.sample-category-card');

categoryCards.forEach(card => {
    // Click event to open lightbox
    card.addEventListener('click', () => {
        const categoryTitle = card.querySelector('h3').innerText;
        const hiddenGallery = card.querySelector('.hidden-gallery');
        // Get all images from the hidden gallery inside this card
        const images = hiddenGallery ? Array.from(hiddenGallery.querySelectorAll('img')) : [];

        openLightbox(categoryTitle, images);
    });
});

// Lightbox Functions
const lightbox = document.getElementById('lightbox');
const lightboxGrid = document.getElementById('lightbox-grid');
const lightboxTitle = document.getElementById('lightbox-category-title');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(title, images) {
    if (!lightbox || !lightboxGrid) return;

    // Clear previous
    lightboxGrid.innerHTML = '';

    // Set Title
    lightboxTitle.innerText = title.toUpperCase() + ' SAMPLES';

    // Populate Images from the DOM
    images.forEach((img, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'lightbox-img-wrapper';

        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.className = 'lightbox-img';
        newImg.loading = 'lazy';

        imgWrapper.appendChild(newImg);
        lightboxGrid.appendChild(imgWrapper);

        // Staggered appearance animation
        imgWrapper.style.opacity = '0';
        imgWrapper.style.transform = 'translateY(15px)';
        setTimeout(() => {
            imgWrapper.style.transition = 'all 0.4s ease';
            imgWrapper.style.opacity = '1';
            imgWrapper.style.transform = 'translateY(0)';
        }, index * 30);
    });

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

const MY_STORIES = [
    {
        name: 'Ev Graphics Admin',
        profile: 'ev.png', 
        story_img: 'ev site d.jpg',
        caption: '🌐 Website Launch Announcement 🌐
We are proud to announce the launch of our official EV Graphics website — a fresh digital space designed to reflect our vision of creativity and innovation.

This new platform has been carefully crafted with:

A modern design that mirrors our brand identity.

Faster navigation so you can explore with ease.

A seamless experience across devices, ensuring clarity and connection wherever you are.

But this is more than just a website. It is our new digital home — a place where ideas meet design, and creativity is reimagined. Through this launch, we aim to connect with you more clearly, share our journey more openly, and inspire with every detail.

Discover creativity reimagined. Welcome to the future of EV Graphics.


☎️Contact us : 075 775 8038
              : 071 679 0298

▫️FB - Ev Graphics

📧Gmail- Evgraphicslk@gmail.com

    },
    {
        name: 'Design',
        profile: 'img/LOGO%20DESING%201.jpeg',
        story_img: 'img/LOGO%20DESING%202.jpeg',
        caption: 'Professional Logo making in progress...'
    },
    {
        name: 'Print',
        profile: 'img/SHIRT%20D%201.jpeg',
        story_img: 'img/SHIRT%20D%204.jpeg',
        caption: 'Quality Printing for our clients! 👕'
    },
    // Aluth ekak danna nam me pahala thiyena block eka copy karala paste karanna:
    /*
    {
        name: 'Oyata One Nama',
        profile: 'img/image_namaya.jpg',
        story_img: 'img/loku_image_ekay_namaya.jpg',
        caption: 'Oyata ona wachana tika'
    },
    */
];

// --- DO NOT EDIT BELOW THIS LINE (Unless you are a pro) ---

function layoutStories() {
    const list = document.getElementById('stories-list');
    list.innerHTML = '';
    
    MY_STORIES.forEach((s, index) => {
        const item = document.createElement('div');
        item.className = 'story-item';
        item.onclick = () => openStory(index);
        item.innerHTML = `
            <div class="story-circle">
                <img src="${s.profile}" alt="${s.name}">
            </div>
            <span>${s.name}</span>
        `;
        list.appendChild(item);
    });
}

let storyTimer;

function openStory(index) {
    const modal = document.getElementById('story-viewer');
    const data = MY_STORIES[index];
    
    document.getElementById('story-admin-name').innerText = data.name;
    document.getElementById('story-admin-img').src = data.profile;
    document.getElementById('story-time').innerText = 'Update: Just now';
    document.getElementById('story-body').innerHTML = `<img src="${data.story_img}">`;
    document.getElementById('story-caption').innerText = data.caption;
    
    modal.style.display = 'block';
    
    const progressFill = document.querySelector('.story-progress-fill');
    progressFill.style.width = '0%';
    
    let width = 0;
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        if (width >= 100) {
            clearInterval(storyTimer);
            closeStory();
        } else {
            width++;
            progressFill.style.width = width + '%';
        }
    }, 50); 
}

function closeStory() {
    document.getElementById('story-viewer').style.display = 'none';
    clearInterval(storyTimer);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    layoutStories();
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.id === 'story-viewer') closeStory();
});
</script>


