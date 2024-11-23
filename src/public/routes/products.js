import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const router = Router();
const productController = new ProductController();

router.get('/', async (req, res) => {
    try {
        await productController.getProducts(req, res);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        await productController.getProductById(req, res);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, price, stock, category, code } = req.body;
        
        if (!title || !description || !price || !stock || !category || !code) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos requeridos' });
        }
        
        await productController.createProduct(req, res);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { title, description, price, stock, category, code } = req.body;
        
        if (!title && !description && !price && !stock && !category && !code) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un campo para actualizar' });
        }
        
        await productController.updateProduct(req, res);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        await productController.deleteProduct(req, res);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
