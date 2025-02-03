import express from 'express';
import { ProductsController } from './productsController';

const router = express.Router();

router.get('/', (req, res) => ProductsController.getAll(req, res));
router.get('/:id', (req, res) => ProductsController.getById(req, res));
router.post('/', (req, res) => ProductsController.create(req, res));
router.put('/:id', (req, res) => ProductsController.update(req, res));
router.delete('/:id', (req, res) => ProductsController.delete(req, res));

export default router;