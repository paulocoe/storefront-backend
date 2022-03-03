import Client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const sql = "SELECT * FROM products";
    const products = await this.executeQuery(sql);
    return products;
  }

  async create(product: Product): Promise<number> {
    const sql = `INSERT INTO products (name, price, category_id) 
       VALUES ('${product.name}', ${product.price}, ${product.categoryId})
       RETURNING id`;
    console.log(sql);
    const products = await this.executeQuery(sql);
    return products[0].id;
  }

  async show(productId: number): Promise<Product> {
    const sql = `SELECT * FROM products WHERE id = '${productId}'`;
    const products = await this.executeQuery(sql);
    return products[0];
  }

  async mostPopular(): Promise<Product[]> {
    const sql = `SELECT  * 
     FROM 	products
     WHERE	id in (
            SELECT 	op.product_id
            FROM 	  order_products op,
                    orders o,
                    products p
            WHERE 	o.id = op.order_id
            AND 	  o.status_id = 2
            order by sum(op.quantity) desc
            limit 5);`;
    const products = await this.executeQuery(sql);
    return products;
  }

  async byCategory(categoryId: number): Promise<Product[]> {
    const sql = `SELECT * FROM products WHERE category_id = ${categoryId}`;
    const products = await this.executeQuery(sql);
    return products;
  }

  private async executeQuery(sql: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const result = await conn.query<Product>(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      console.error(`Error when querying/persisting the database - ${error}`);
      throw error;
    }
  }
}
