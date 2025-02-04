import { Request, Response } from 'express';
import { productSchema } from './productsValidations';
import { ProductsModel } from './productsModel';

export class ProductsController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductsModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const product = await ProductsModel.getById(id);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = productSchema.parse(req.body);
      const id = await ProductsModel.create(validatedData);
      res.status(201).json({ id, ...validatedData });
    } catch (error) {
      res.status(400).json({ error: 'Datos inválidos', details: error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const validatedData = productSchema.partial().parse(req.body);
      const success = await ProductsModel.update(id, validatedData);
      if (!success) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ id, ...validatedData });
    } catch (error) {
      res.status(400).json({ error: 'Datos inválidos', details: error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const success = await ProductsModel.delete(id);
      if (!success) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
}





