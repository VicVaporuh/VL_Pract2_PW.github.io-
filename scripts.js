import Product from './products.js';

const API_URL = "https://crudcrud.com/api/769f84e56ff94f01b47ed48164c911a3/products";
const productData = document.getElementById("ProductCards");

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        for (const productJson of data) {
            const product = Product.createFromJson(JSON.stringify(productJson));  // Convertir el JSON en un objeto Product
            productData.appendChild(product.renderProductCard());  // Mostrar el producto
        }
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

loadProducts();

