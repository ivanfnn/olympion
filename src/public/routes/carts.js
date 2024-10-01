import { Router } from 'express';
import { getCartById, createCart, addProductToCart } from '../controllers/cartController';

const router = Router();

const validateCartId = (req, res, next) => {
    const { cid } = req.params;
    if (isNaN(parseInt(cid)) || parseInt(cid) <= 0) {
        return res.status(400).json({ message: 'ID del carrito inválido' });
    }
    next();
};

const validateProductId = (req, res, next) => {
    const { pid } = req.params;
    if (isNaN(parseInt(pid)) || parseInt(pid) <= 0) {
        return res.status(400).json({ message: 'ID del producto inválido' });
    }
    next();
};

router.get('/:cid', validateCartId, getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', validateCartId, validateProductId, addProductToCart);

export default router;
