import db from '../database/config';
import { Product } from './productsInterfaces';
import { productSchema } from './productsValidations';


export class ProductsModel {

   // Obtener todos los productos
   static async getAll(): Promise<Product[]> {
    const result = await db.execute({
      sql: 'SELECT * FROM products',
    });
    const parsedProducts = productSchema.array().parse(result.rows);

  return parsedProducts;// Retorna un array de productos
  }

  // Obtener un producto por ID
  static async getById(id: number): Promise<Product | undefined> {
    const result = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [id],
    });
    return result.rows[0] as Product | any; // Retorna el producto o undefined si no existe
  }

  // Crear un nuevo producto
  static async create(product: Omit<Product, 'id'>): Promise<boolean> {
    const result = await db.execute({
      sql: 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      args: [product.name, product.price, product.description],
    });
    return result.rowsAffected > 0; // Retorna true si se insertó correctamente
  }

  // Actualizar un producto existente
  static async update(id: number, product: Omit<Product, 'id'>): Promise<boolean> {
    const result = await db.execute({
      sql: 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      args: [product.name, product.price, product.description, id],
    });
    return result.rowsAffected > 0; // Retorna true si se actualizó correctamente
  }

  // Eliminar un producto
  static async delete(id: number): Promise<boolean> {
    const result = await db.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id],
    });
    return result.rowsAffected > 0; // Retorna true si se eliminó correctamente
  }
}