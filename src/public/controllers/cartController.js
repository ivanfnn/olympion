import mongoose from 'mongoose';
import cartModel from '../models/cart.model.js';

class CartController {
    addProductToCart = async (cid, pid, qty) => {
    
        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            throw new Error('ID no válido');
        }

        
        if (!Number.isInteger(qty) || qty <= 0) {
            throw new Error('La cantidad debe ser un número entero positivo');
        }

        try {
            
            const cart = await cartModel.findById(cid);
            if (!cart) throw new Error('Carrito no encontrado');

            
            const existingProductIndex = cart.products.findIndex(p => p._id.toString() === pid);
            if (existingProductIndex !== -1) {

                cart.products[existingProductIndex].qty += qty;
            } else {
                
                cart.products.push({ _id: pid, qty });
            }

           
            await cart.save();
            return { message: 'Producto agregado al carrito', cart: cart.products };
        } catch (err) {
            throw new Error(`Error al agregar producto al carrito: ${err.message}`);
        }
    };
}

export default CartController;
