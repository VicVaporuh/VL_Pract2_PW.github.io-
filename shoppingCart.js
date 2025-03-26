class ShoppingCart {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            const storedCart = JSON.parse(localStorage.getItem('cart'));
            this.cart = Array.isArray(storedCart) ? storedCart : [];
            this.cartCountElement = document.getElementById('cart-count');
            this.cartContainerElement = document.getElementById('cart-container');
            this.totalItemsListElement = document.getElementById('total-items-list');  // Asegúrate de que este ID exista
            this.updateCartCount();
            this.renderCartItems();  // Llamamos a la función para renderizar los productos al cargar la página
            this.updateTotalCompra();  // Actualizamos el total de compra al cargar la página
        });
    }

    // Agregar un producto al carrito
    addItem(product, amount = 1) {
        const existingProduct = this.cart.find(item => item.product._id === product._id);

        if (existingProduct) {
            existingProduct.amount += amount;
        } else {
            this.cart.push({ product, amount });
        }
        this.saveCart();
    }

    // Actualizar la cantidad de un producto
    updateItem(product, newAmount) {
        // Verificamos si la nueva cantidad es cero o negativa
        if (newAmount <= 0) {
            if (newAmount === 0) {
                this.removeItem(product);
            } else {
                alert(`No están permitidos números negativos`);
            }
            return;
        }
    
        // Verificamos si la cantidad nueva es mayor que el stock disponible
        if (newAmount > product.quantity) {
            alert(`No puedes agregar más de ${product.quantity} unidades de este producto.`);
            return;
        }
    
        const existingProduct = this.cart.find(item => item.product._id === product._id);
        if (existingProduct) {
            existingProduct.amount = newAmount;  // Actualizamos la cantidad
            this.saveCart();  // Guardamos el carrito actualizado en localStorage
        } else {
            alert("Producto no encontrado en el carrito.");
        }
    }
    
    

    // Eliminar un producto del carrito
    removeItem(product) {
        this.cart = this.cart.filter(item => item.product._id !== product._id);
        this.saveCart();
    }

    // Calcular el total de productos en el carrito (solo cantidad, no precio)
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.amount, 0);
    }

    // Calcular el total de la compra en base al precio y cantidad
    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + (item.product.price * item.amount), 0).toFixed(2);
    }

    // Guardar el carrito en localStorage y actualizar el contador
    saveCart() {
        // Guardamos el carrito en localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();  // Actualizamos el contador del carrito
        this.renderCartItems();  // Volver a renderizar los productos
        this.updateTotalCompra();  // Actualizamos el total de la compra
    }
    

    // Actualizar el número de productos en la UI
    updateCartCount() {
        if (this.cartCountElement) {
            this.cartCountElement.textContent = this.getTotalItems();
        }
    }

// Función para renderizar los productos del carrito en la página
renderCartItems() {
    if (this.cartContainerElement) {
        this.cartContainerElement.innerHTML = '';  // Limpiar el contenedor antes de agregar los productos

        this.cart.forEach(item => {
            // Generamos el HTML para cada producto en el carrito
            const productHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                            <!-- Contenido del producto -->
                            <div class="col-md-8 d-flex flex-column justify-content-start">
                                <h5 class="card-title">${item.product.name}</h5>

                                <!-- Cantidad -->
                                <div class="d-flex align-items-center mt-3">
                                    <span class="input-group-text">Cantidad</span>
                                    <input type="number" class="form-control w-25 ms-2 cantidad-input" value="${item.amount}" min="1" data-id="${item.product._id}">
                                    <span class="input-group-text ms-2">
                                        <i class="fas fa-pencil-alt"></i>
                                    </span>
                                </div>

                                <!-- Precio -->
                                <div class="d-flex align-items-center mt-3">
                                    <span class="input-group-text">Precio</span>
                                    <input type="text" class="form-control w-25 ms-2" value="$${(item.product.price * item.amount).toFixed(2)}" readonly>
                                    <span class="input-group-text ms-2">MXN</span>
                                </div>
                            </div>

                            <!-- Imagen del producto -->
                            <div class="col-md-4 d-flex justify-content-end align-items-center">
                                <img src="${item.product.imgUrl}" class="img-fluid" alt="Producto ${item.product._id}">
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Insertamos el HTML generado en el contenedor
            this.cartContainerElement.innerHTML += productHTML;
        });

        // Agregar eventListener a los inputs de cantidad después de renderizar el HTML
        document.querySelectorAll('.cantidad-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const productId = event.target.getAttribute('data-id');
                const newAmount = parseInt(event.target.value, 10);

                // Buscar el producto en el carrito
                const product = this.cart.find(item => item.product._id === productId);
                if (product) {
                    this.updateItem(product.product, newAmount);
                }
            });
        });
    }
}


    // Función para actualizar el total de compra en la UI
    updateTotalCompra() {
        console.log("Cart from localStorage:", localStorage.getItem('cart'));
        if (this.totalItemsListElement) {
            let totalHTML = '';
            this.cart.forEach(item => {
                totalHTML += `
                    <div class="d-flex justify-content-between">
                        <p>${item.product.name}: ${item.amount} x $${item.product.price.toFixed(2)}</p>
                        <p>$${(item.product.price * item.amount).toFixed(2)}</p>
                    </div>
                `;
            });

            totalHTML += `
                <hr>
                <div class="d-flex justify-content-between">
                    <h5>Monto a pagar</h5>
                    <h5>$${this.getTotalPrice()}</h5>
                </div>
            `;

            this.totalItemsListElement.innerHTML = totalHTML;
        }
    }
}

// Crear una única instancia global
const shoppingCart = new ShoppingCart();

// Exportar la instancia para usar en otros archivos
export default shoppingCart;
