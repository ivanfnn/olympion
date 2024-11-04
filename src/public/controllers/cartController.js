import cartModel from './models/cart.model.js';
import userModel from './models/user.model.js';

class CartController {
    constructor() {}

    get = async (req, res) => {
        try {
            const carts = await cartModel
                .find()
                .populate({ path: 'user', model: userModel, select: 'email firstName lastName' })
                .lean();
            res.status(200).json({ status: 'success', payload: carts });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    getOne = async (req, res) => {
        const { cid } = req.params;
        try {
            const cart = await cartModel.findById(cid)
                .populate({ path: 'products._id', model: 'products' })
                .lean();
            if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            res.status(200).json({ status: 'success', payload: cart });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    add = async (req, res) => {
        const { user } = req.body; 
        try {
            const newCart = await cartModel.create({ user, products: [] });
            res.status(201).json({ status: 'success', payload: newCart });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    update = async (req, res) => {
        const { cid } = req.params;
        const updatedData = req.body;
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(cid, updatedData, { new: true });
            if (!updatedCart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            res.status(200).json({ status: 'success', payload: updatedCart });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    delete = async (req, res) => {
        const { cid } = req.params;
        try {
            const deletedCart = await cartModel.findByIdAndDelete(cid);
            if (!deletedCart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            res.status(200).json({ status: 'success', message: 'Carrito eliminado' });
        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    addProductToCart = async (cid, pid, qty) => {
        const cart = await cartModel.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');
        
        const existingProductIndex = cart.products.findIndex(p => p._id.toString() === pid);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].qty += qty;
        } else {
            cart.products.push({ _id: pid, qty });
        }

        await cart.save();
        return cart;
    }
}

export default CartController;
