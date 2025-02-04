import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Soy la ruta de productos');
});

export default router;