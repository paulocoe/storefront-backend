import Client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(product: Product): Promise<number> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO products (name, price, category_id) 
       VALUES (${product.name}, ${product.price}, ${product.categoryId})
       RETURNING id`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0].id as number;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
