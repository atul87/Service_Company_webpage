// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    setupEventListeners();
    
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
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
    
    // Continue shopping button
    const continueShopping = document.getElementById('continue-shopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            window.location.href = 'kuku.html#store';
        });
    }
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        return;
    }
    
    // Hide empty cart message
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Add items to cart
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">${item.price}</p>
            </div>
            <div class="item-actions">
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateCartSummary();
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        // Extract number from price string (e.g., "$19.99" -> 19.99)
        const price = parseFloat(item.price.replace('$', ''));
        if (!isNaN(price)) {
            subtotal += price;
        }
    });
    
    // Shipping (free for orders over $50)
    const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
    
    // Tax (10%)
    const tax = subtotal * 0.1;
    
    const total = subtotal + shipping + tax;
    
    // Update UI
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function setupEventListeners() {
    // Remove item buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeItemFromCart(index);
        }
    });
    
    // Checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // In a real implementation, this would redirect to a checkout page
            alert('Redirecting to checkout... (This is a demo)');
            // window.location.href = 'checkout.html';
        });
    }
}

function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems(); // Reload the cart display
        updateCartCounter(cart.length); // Update the cart icon counter
    }
}

// Update cart counter function
function updateCartCounter(count) {
    const cartIcon = document.querySelector('.cart-icon');
    let counter = cartIcon.querySelector('.cart-counter');
    
    if (!counter) {
        counter = document.createElement('span');
        counter.classList.add('cart-counter');
        cartIcon.appendChild(counter);
    }
    
    counter.textContent = count;
    
    // Hide counter if cart is empty
    if (count === 0) {
        counter.style.display = 'none';
    } else {
        counter.style.display = 'inline-block';
    }
}