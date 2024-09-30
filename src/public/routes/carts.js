import { Router } from 'express';
import { getCartById, createCart, addProductToCart } from '../controllers/cartController';

const router = Router();


const validateCartId = (req, res) => {
    const { cid } = req.params;
    if (isNaN(cid) || cid <= 0) {
        return res.status(400).json({ message: 'ID del carrito inválido' });
    }
};

const validateProductId = (req, res) => {
    const { pid } = req.params;
    if (isNaN(pid) || pid <= 0) {
        return res.status(400).json({ message: 'ID del producto inválido' });
    }
};


router.get('/:cid', validateCartId, getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', validateCartId, validateProductId, addProductToCart);

export default router;
