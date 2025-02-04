import express from 'express';
import { ProductsController } from './productsController';

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.post('/', ProductsController.create);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.delete);

export default router;