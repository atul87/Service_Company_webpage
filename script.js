// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productName = product.querySelector('h2').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        // Add visual feedback
        this.textContent = 'Added!';
        this.style.backgroundColor = '#28a745';
        
        // Store in localStorage for persistence
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            name: productName,
            price: productPrice,
            id: Date.now() // Simple ID generation
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = '';
        }, 2000);
        
        // Update cart icon (if we implement a counter)
        updateCartCounter(cart.length);
        
        console.log(`Added to cart: ${productName} - ${productPrice}`);
    });
});

// Action button functionality
document.querySelector('.action-button.primary').addEventListener('click', function() {
    document.querySelector('#services').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.action-button.secondary').addEventListener('click', function() {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentNode;
        faqItem.classList.toggle('active');
    });
});

// Update cart counter function
function updateCartCounter(count) {
    const cartIcon = document.querySelector('.cart-icon');
    let counter = cartIcon.querySelector('.cart-counter');
    
    if (!counter) {
        counter = document.createElement('span');
        counter.classList.add('cart-counter');
        cartIcon.appendChild(counter);
        
        // Make counter clickable to go to cart page
        counter.addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = 'cart.html';
        });
    }
    
    counter.textContent = count;
    
    // Hide counter if cart is empty
    if (count === 0) {
        counter.style.display = 'none';
    } else {
        counter.style.display = 'inline-block';
    }
}

// Initialize cart counter on page load
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCounter(cart.length);
    
    // Make cart icon clickable
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
    
    // Search functionality
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                if (searchTerm) {
                    // Simple search implementation - in a real site, this would search content
                    alert(`Searching for: ${searchTerm}\nIn a real implementation, this would search the site content.`);
                }
            }
        });
    }
    
    // Mobile menu toggle
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '☰';
    hamburger.classList.add('hamburger');
    document.querySelector('.nav-container').insertBefore(hamburger, document.querySelector('.nav-menu'));
    
    hamburger.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCounter(cart.length);
});

// Form validation for contact form
function validateContactForm() {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}