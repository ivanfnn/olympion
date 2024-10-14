// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const cartsFilePath = path.join(__dirname, '../data/carts.json');
// const productsFilePath = path.join(__dirname, '../data/products.json');

// const readCarts = () => {
//     try {
//         const data = fs.readFileSync(cartsFilePath, 'utf-8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Error al leer el archivo de carritos:', error);
//         return [];
//     }
// };

// const saveCarts = (carts) => {
//     try {
//         fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
//     } catch (error) {
//         console.error('Error al guardar los carritos:', error);
//     }
// };

// export const getCartById = (req, res) => {
//     const carts = readCarts();
//     const cart = carts.find(c => c.id === parseInt(req.params.cid));
//     if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
//     res.status(200).json(cart);
// };

// export const createCart = (req, res) => {
//     const carts = readCarts();
//     const newCart = {
//         id: carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1,
//         products: []
//     };
//     carts.push(newCart);
//     saveCarts(carts);
//     res.status(201).json(newCart);
// };

// export const addProductToCart = (req, res) => {
//     const carts = readCarts();
//     const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//     const cart = carts.find(c => c.id === parseInt(req.params.cid));
//     if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

//     const product = products.find(p => p.id === parseInt(req.params.pid));
//     if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

//     const existingProduct = cart.products.find(p => p.id === product.id);
//     if (existingProduct) {
//         existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 1;
//     } else {
//         cart.products.push({ id: product.id, quantity: 1 });
//     }

//     saveCarts(carts);
//     res.status(200).json(cart);
// };
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readCarts = () => {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de carritos:', error);
        return [];
    }
};

const saveCarts = (carts) => {
    try {
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error('Error al guardar los carritos:', error);
    }
};

// Obtener carrito por ID
export const getCartById = (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.status(200).json(cart);
};

// Crear un nuevo carrito
export const createCart = (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1,
        products: []
    };
    carts.push(newCart);
    saveCarts(carts);
    res.status(201).json(newCart);
};

// Agregar producto al carrito con cantidad personalizada
export const addProductToCart = (req, res) => {
    const carts = readCarts();
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const { quantity = 1 } = req.body;  // Cantidad personalizada, por defecto 1
    const existingProduct = cart.products.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);  // Actualizar la cantidad si ya está en el carrito
    } else {
        cart.products.push({ id: product.id, quantity: parseInt(quantity) });  // Agregar nuevo producto
    }

    saveCarts(carts);
    res.status(200).json(cart);
};
