import { Router } from 'express';
import CartController from '../controllers/cartController.js';
import cartModel from '../models/cart.model.js';

const router = Router();
const cartController = new CartController();

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;
        
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número mayor a 0' });
        }
        
        const cart = await cartController.addProductToCart(cid, pid, quantity);
        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        cart.products = cart.products.filter(product => product._id.toString() !== pid);
        await cart.save();

        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número mayor a 0' });
        }

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        const product = cart.products.find(product => product._id.toString() === pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });

        product.qty = quantity;
        await cart.save();

        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
