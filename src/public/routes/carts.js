import { Router } from 'express';
import CartController from '../controllers/cartController.js';

const router = Router();
const cartController = new CartController();

router.get('/', cartController.get);
router.get('/:cid', cartController.getOne);
router.post('/', cartController.add);
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body; 
        const cart = await cartController.addProductToCart(cid, pid, quantity);
        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
router.delete('/:cid', cartController.delete);

export default router;
