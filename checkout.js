import { products } from './products.js';
import { CartManager } from './cartManager.js';

const cartManager = new CartManager();
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');
const placeOrderBtn = document.getElementById('place-order');

function displayCheckout() {
    const cart = cartManager.getCart();
    let total = 0;

    checkoutItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2>${product.name}</h2>
                    <p><strong>Quantity</strong>: ${item.quantity}</p>
                    <p><strong>Price per unit: </strong> $${product.price}</p>
                    <p><strong>Subtotal: </strong> $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    checkoutTotal.textContent = total.toFixed(2);
}

placeOrderBtn.addEventListener('click', () => {
    alert('Thank you for your order! Make more money and buy more stuff! ');
    cartManager.clearCart();
    window.location.href = '/';
});

displayCheckout();