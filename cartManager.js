export class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    getCart() {
        return this.cart;
    }

    addItem(productId) {
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;

        
           
        } else {
            this.cart.push({ id: productId, quantity: 1 });
        }
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        if (quantity === 0) {
            this.cart = this.cart.filter(item => item.id !== productId);
        } else {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
            }
            
        }
        this.saveCart();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }
}