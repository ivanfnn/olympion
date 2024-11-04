import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById); 
router.post('/', productController.createProduct); 
router.put('/:pid', productController.updateProduct); 
router.delete('/:pid', productController.deleteProduct); 

export default router;
