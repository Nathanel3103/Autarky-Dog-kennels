// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in nav bar
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add to cart function
function addToCart(name, price, image) {
    // Convert price to number if it's a string
    const numericPrice = parseFloat(price);
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: numericPrice, // Store as number
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${name} added to cart!`);
}

// Remove from cart function
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (window.location.pathname.includes('Cart.html')) {
        displayCart();
    }
}

// Update quantity function
function updateQuantity(name, newQuantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity) || 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (window.location.pathname.includes('Cart.html')) {
            displayCart();
        }
    }
}

// Calculate subtotal
function calculateSubtotal(price, quantity) {
    return (parseFloat(price) * parseInt(quantity)).toFixed(2);
}

// Display cart contents
function displayCart() {
    const cartTable = document.getElementById('cartTable');
    const tbody = cartTable.querySelector('tbody');
    const totalAmount = document.getElementById('totalAmount');
    
    tbody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = parseFloat(item.price) * parseInt(item.quantity);
        total += subtotal;
        
        tbody.innerHTML += `
            <tr>
                <td><i class="far fa-times-circle remove-item" onclick="removeFromCart('${item.name}')"></i></td>
                <td><img src="images/puppies/${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${parseFloat(item.price).toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" 
                    onchange="updateQuantity('${item.name}', this.value)">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    if (totalAmount) {
        totalAmount.textContent = total.toFixed(2);
    }
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('Cart.html')) {
        displayCart();
    }
});

function showReview(){
    document.querySelector("")
}
