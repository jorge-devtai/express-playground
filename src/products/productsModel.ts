// src/products/productsModel.ts
import db from '../database/config';
import { Product } from './productsInterfaces';

export class ProductsModel {
  static async getAll(): Promise<Product[]> {
    const result = await db.execute('SELECT * FROM products');
    return result.rows as Product[];
  }

  static async getById(id: number): Promise<Product | null> {
    const result = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0] as Product;
  }

  static async create(product: Omit<Product, 'id'>): Promise<number> {
    const result = await db.execute(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [product.name, product.price, product.description]
    );
    return result.lastInsertRowid as number;
  }

  static async update(id: number, product: Partial<Product>): Promise<boolean> {
    const result = await db.execute(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [product.name, product.price, product.description, id]
    );
    return result.changes > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.changes > 0;
  }
}