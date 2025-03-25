import Product from './products.js';

const API_URL = "https://crudcrud.com/api/a13d01079acd407f87c243fc43ca55cc/products";
const productData = document.getElementById("ProductCards");

const productsPerPage = 8;
let currentPage = 1;
let products = [];

// Cargar productos desde la API
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Renderizar los productos de la página actual
function renderProducts() {
    productData.innerHTML = ''; // Limpiar productos anteriores

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    for (const productJson of paginatedProducts) {
        const product = Product.createFromJson(JSON.stringify(productJson));
        productData.appendChild(product.renderProductCard());
    }

    updatePagination();
}

// Actualizar botones de paginación
function updatePagination() {
    document.getElementById('pageNumber').textContent = currentPage;
    document.getElementById('prevPage').classList.toggle('disabled', currentPage === 1);
    document.getElementById('nextPage').classList.toggle('disabled', currentPage >= Math.ceil(products.length / productsPerPage));
}

// Eventos para cambiar de página
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
        currentPage++;
        renderProducts();
    }
});

// Cargar productos al inicio
loadProducts();
