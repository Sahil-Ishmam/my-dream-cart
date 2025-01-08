import { products } from './products.js';
import { CartManager } from './cartManager.js';

const cartManager = new CartManager();

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const viewCartBtn = document.getElementById('view-cart');
const closeCartBtn = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');

// Display Products
function displayProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h2>${product.name}</h2>
                
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button onclick="window.addToCart(${product.id})">Add to Cart</button>
                
            </div>
        </div>
    `).join('');
}

// Update Cart UI
function updateCartUI() {
    const cart = cartManager.getCart();
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal.textContent = cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product.price * item.quantity);
    }, 0).toFixed(2);

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                    <div class="quantity-controls">
                        <button onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Event Handlers
window.addToCart = (productId) => {
    cartManager.addItem(productId);
    updateCartUI();
};

window.updateQuantity = (productId, quantity) => {
    if (quantity < 0) return;
    cartManager.updateQuantity(productId, quantity);
    updateCartUI();
};

viewCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartUI();
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

clearCartBtn.addEventListener('click', () => {
    cartManager.clearCart();
    updateCartUI();
});

// Initialize
displayProducts();
updateCartUI();