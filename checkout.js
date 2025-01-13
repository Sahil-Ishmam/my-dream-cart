import { products } from './products.js';
import { CartManager } from './cartManager.js';

const cartManager = new CartManager();
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');
const placeOrderBtn = document.getElementById('place-order');

// added code for promo code 
const promoCodeInput = document.getElementById('promo-code');
const applyPromoBtn = document.getElementById('apply-promo');

const PROMO_CODES = {
    'ostad10': 0.10, // 10% discount
    'ostad5': 0.05   // 5% discount
};

let appliedPromoCode = null;
let subtotal = 0;




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

// code for promo code 
function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    
    const promoSection = document.querySelector('.promo-code-section');
    const existingMessage = promoSection.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    promoSection.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 5000);
}

// code for promo code 

function updateTotalDisplay() {
    const summarySection = document.querySelector('.total-section');
    let discountAmount = 0;
    let finalTotal = subtotal;

    if (appliedPromoCode) {
        discountAmount = subtotal * PROMO_CODES[appliedPromoCode];
        finalTotal = subtotal - discountAmount;
    }

    summarySection.innerHTML = `
        <h3>Order Summary</h3>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        ${appliedPromoCode ? `
            <p>Discount (${appliedPromoCode}): -$${discountAmount.toFixed(2)}</p>
        ` : ''}
        <p class="final-total">Final Total: $${finalTotal.toFixed(2)}</p>
    `;
}



// code for promo code 
applyPromoBtn.addEventListener('click', () => {
    const promoCode = promoCodeInput.value.trim().toLowerCase();
    
    if (appliedPromoCode) {
        showMessage('A promo code has already been applied', true);
        return;
    }

    if (PROMO_CODES.hasOwnProperty(promoCode)) {
        appliedPromoCode = promoCode;
        const discountPercentage = PROMO_CODES[promoCode] * 100;
        showMessage(`${discountPercentage}% discount applied successfly!`);
        updateTotalDisplay();
        promoCodeInput.value = '';
    } else {
        showMessage('Invalid promo code', true);
    }
});

placeOrderBtn.addEventListener('click', () => {
    alert('Thank you for your order! Make more money and buy more stuff! ');
    cartManager.clearCart();
    window.location.href = '/';
});

displayCheckout();