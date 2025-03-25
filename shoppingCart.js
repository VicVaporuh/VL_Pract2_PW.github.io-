class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || {};
        this.cartCountElement = document.getElementById('cart-count');
        this.updateCartCount();
    }

    // Agregar un producto al carrito
    addItem(productId, amount = 1) {
        if (this.cart[productId]) {
            this.cart[productId] += amount;
        } else {
            this.cart[productId] = amount;
        }
        this.saveCart();
    }

    // Actualizar la cantidad de un producto
    updateItem(productId, newAmount) {
        if (newAmount <= 0) {
            this.removeItem(productId);
        } else {
            this.cart[productId] = newAmount;
            this.saveCart();
        }
    }

    // Eliminar un producto del carrito
    removeItem(productId) {
        delete this.cart[productId];
        this.saveCart();
    }

    // Calcular el total de productos en el carrito
    getTotalItems() {
        return Object.values(this.cart).reduce((sum, qty) => sum + qty, 0);
    }

    // Guardar el carrito en localStorage y actualizar el contador
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount(); // Actualizar contador en la UI
    }
    

    // Actualizar el número de productos en la UI
    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.getTotalItems();
        }
    }
    
}

// Crear una única instancia global
const shoppingCart = new ShoppingCart();

// Exportar la instancia para usar en otros archivos
export default shoppingCart;
