import shoppingCart from './shoppingCart.js';

class Product {
    // Constructor
    constructor({ 
        _id = null, 
        category = "Unknown", 
        name = "Producto desconocido", 
        price = 0.0, 
        quantity = 0, 
        imgUrl = "https://i.imgur.com/nP2ttKj.gif", 
        description = "No hay descripcion disponible." 
    } = {}) {
        this.setId(_id);
        this.setCategory(category);
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setImgUrl(imgUrl);
        this.setDescription(description);
    }

    // Getter y Setter con validaciones
    getId() {
        return this._id;
    }

    setId(_id) {
        if (typeof _id !== 'string' || _id.trim() === '') {
            throw new ProductException('ID debe ser un string no vacío');
        }
        this._id = _id;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        if (typeof category !== 'string' || category.trim() === '') {
            throw new ProductException('Categoría debe ser un string no vacío');
        }
        this.category = category;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new ProductException('Nombre debe ser un string no vacío');
        }
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        if (typeof price !== 'number' || price < 0) {
            throw new ProductException('El precio debe ser un número positivo');
        }
        this.price = price;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        if (typeof quantity !== 'number' || quantity < 0) {
            throw new ProductException('La cantidad debe ser un número positivo');
        }
        this.quantity = quantity;
    }

    getImgUrl() {
        return this.imgUrl;
    }

    setImgUrl(imgUrl) {
        if (typeof imgUrl !== 'string' || imgUrl.trim() === '') {
            throw new ProductException('La URL de la imagen debe ser un string no vacío');
        }
        this.imgUrl = imgUrl;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        if (typeof description !== 'string' || description.trim() === '') {
            throw new ProductException('La descripción debe ser un string no vacío');
        }
        this.description = description;
    }

// Método para renderizar la tarjeta del producto
renderProductCard() {
    const card = document.createElement('div');
    card.classList.add('col-6', 'col-md-4', 'col-lg-3');

    card.innerHTML = `
        <div class="card h-100">
            <img src="${this.imgUrl}" class="card-img-top img-fluid ps-3 pt-3 pe-3" 
                 alt="${this.name}" style="cursor: pointer;">
            <div class="card-body d-flex flex-column">
                <p class="card-text ms-4 me-4">
                    ${this.description}
                    <br> <br>
                    1 paquete por ${this.price} MX
                </p>
            </div>
        </div>
    `;

// Agregar evento para añadir el producto al carrito al hacer clic en la imagen
const img = card.querySelector('img');
img.addEventListener('click', () => {
    // Aquí asumimos que `this` es un objeto de tipo `Producto` dentro del contexto del card
    console.log(`Imagen clickeada: ${this.name}`);

    // Ahora le pasamos el objeto `Producto` completo a `addItem`
    shoppingCart.addItem(this, 1); // `this` es la instancia de Producto que se debe pasar
});

    return card;
}


// Método estático para crear un producto desde un JSON
static createFromJson(jsonValue) {
    try {
        // Imprimir el JSON recibido antes de procesarlo
        console.log("JSON recibido:", jsonValue);  

        const data = JSON.parse(jsonValue);  // Convertir el string JSON en un objeto

        // Imprimir el objeto después de parsearlo
        console.log("JSON parseado:", data);  

        // Validar las propiedades
        if (typeof data._id !== 'string' || data._id.trim() === '') {
            throw new ProductException('ID inválido (_id)');
        }
        if (typeof data.category !== 'string' || data.category.trim() === '') {
            throw new ProductException('Categoría inválida');
        }
        if (typeof data.name !== 'string' || data.name.trim() === '') {
            throw new ProductException('Nombre inválido');
        }
        if (typeof data.price !== 'number' || data.price < 0) {
            throw new ProductException('Precio inválido');
        }
        if (typeof data.quantity !== 'number' || data.quantity < 0) {
            throw new ProductException('Cantidad inválida');
        }
        if (typeof data.imgUrl !== 'string' || data.imgUrl.trim() === '') {
            throw new ProductException('URL de la imagen inválida');
        }
        if (typeof data.description !== 'string' || data.description.trim() === '') {
            throw new ProductException('Descripción inválida');
        }

        // Si todas las validaciones pasan, crear el producto
        return new Product(data);
    } catch (e) {
        // Si hay algún error (ya sea JSON malformado o validaciones fallidas)
        console.error("Error al convertir JSON en producto:", e);
        throw new ProductException(`Error al convertir JSON en producto: ${e.message}`);
    }
}





    // Método estático para crear un producto desde un objeto
static createFromObject(obj) {
        try {
            const validKeys = ['id', 'category', 'name', 'price', 'quantity', 'imgUrl', 'description'];
            const filteredObj = {};

            // Filtramos solo las propiedades válidas
            for (const key of validKeys) {
                if (obj.hasOwnProperty(key)) {
                    filteredObj[key] = obj[key];
                }
            }

            return new Product(filteredObj);
        } catch (e) {
            throw new ProductException('Error al crear producto desde objeto');
        }
    }
}

// Excepciones personalizadas para los productos
class ProductException extends Error {
    constructor(message) {
        super(message);
        this.name = "ProductException";
    }
}

export default Product;
