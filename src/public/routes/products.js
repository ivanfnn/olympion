import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

const validateProductId = (req, res, next) => {
    const { pid } = req.params;
    if (isNaN(parseInt(pid)) || parseInt(pid) <= 0) {
        return res.status(400).json({ message: 'ID del producto inválido' });
    }
    next();
};

router.get('/', getProducts);
router.get('/:pid', validateProductId, getProductById);
router.post('/', createProduct);
router.put('/:pid', validateProductId, updateProduct);
router.delete('/:pid', validateProductId, deleteProduct);

export default router;
