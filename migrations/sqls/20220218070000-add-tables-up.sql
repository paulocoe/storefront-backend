CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE order_status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  password VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL, 
  price NUMERIC(2) NOT NULL, 
  category_id INT NOT NULL,
  CONSTRAINT fk_category
  	FOREIGN KEY(category_id)
  		REFERENCES category(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  status_id INT NOT NULL,
  CONSTRAINT fk_user
  	FOREIGN KEY(user_id)
  		REFERENCES users(id),
  CONSTRAINT fk_status
  	FOREIGN KEY(status_id)
  		REFERENCES order_status(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_order
  	FOREIGN KEY(order_id)
  		REFERENCES orders(id),
  CONSTRAINT fk_product
  	FOREIGN KEY(product_id)
  		REFERENCES products(id)
);