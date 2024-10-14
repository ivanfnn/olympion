// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const productsFilePath = path.join(__dirname, '../data/products.json');

// const readProducts = () => {
//     try {
//         const data = fs.readFileSync(productsFilePath, 'utf-8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Error al leer el archivo de productos:', error);
//         return [];
//     }
// };

// const saveProducts = (products) => {
//     try {
//         fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
//     } catch (error) {
//         console.error('Error al guardar los productos:', error);
//     }
// };

// export const getProducts = (req, res) => {
//     let products = readProducts();
//     const limit = parseInt(req.query.limit);
//     if (limit) {
//         products = products.slice(0, limit);
//     }
//     res.status(200).json(products);
// };

// export const getProductById = (req, res) => {
//     const products = readProducts();
//     const product = products.find(p => p.id === parseInt(req.params.pid));
//     if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
//     res.status(200).json(product);
// };

// export const createProduct = (req, res) => {
//     const products = readProducts();
//     const { title, description, code, price, stock, category } = req.body;

//     if (!title || !description || !code || !price || !stock || !category) {
//         return res.status(400).json({ message: 'Faltan datos requeridos' });
//     }

//     const newProduct = {
//         id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
//         title,
//         description,
//         code,
//         price: parseFloat(price),
//         stock: parseInt(stock),
//         category,
//         status: true
//     };

//     products.push(newProduct);
//     saveProducts(products);
//     res.status(201).json(newProduct);
// };

// export const updateProduct = (req, res) => {
//     const products = readProducts();
//     const product = products.find(p => p.id === parseInt(req.params.pid));
//     if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

//     const { title, description, code, price, stock, category } = req.body;
//     product.title = title || product.title;
//     product.description = description || product.description;
//     product.code = code || product.code;
//     product.price = price ? parseFloat(price) : product.price;
//     product.stock = stock ? parseInt(stock) : product.stock;
//     product.category = category || product.category;

//     saveProducts(products);
//     res.status(200).json(product);
// };

// export const deleteProduct = (req, res) => {
//     let products = readProducts();
//     const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
//     if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });

//     products.splice(productIndex, 1);
//     saveProducts(products);
//     res.status(204).send();
// };
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        return [];
    }
};

const saveProducts = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error al guardar los productos:', error);
    }
};

// Obtener todos los productos
export const getProducts = (req, res) => {
    let products = readProducts();
    const limit = parseInt(req.query.limit);
    if (limit) {
        products = products.slice(0, limit);
    }
    res.status(200).json(products);
};

// Obtener producto por ID
export const getProductById = (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
};

// Crear un nuevo producto, evitando duplicados
export const createProduct = (req, res) => {
    const products = readProducts();
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar si ya existe un producto con el mismo código
    const existingProduct = products.find(p => p.code === code);
    if (existingProduct) {
        return res.status(400).json({ message: 'Ya existe un producto con este código' });
    }

    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        title,
        description,
        code,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        status: true
    };

    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
};

// Actualizar un producto
export const updateProduct = (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const { title, description, code, price, stock, category } = req.body;
    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price ? parseFloat(price) : product.price;
    product.stock = stock ? parseInt(stock) : product.stock;
    product.category = category || product.category;

    saveProducts(products);
    res.status(200).json(product);
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
    let products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });

    products.splice(productIndex, 1);
    saveProducts(products);
    res.status(204).send();
};
