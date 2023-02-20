const connection = require('./connection');

const getAllProductsModel = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [allProducts] = await connection.execute(query);
  return allProducts;
};

const getProductByIdModel = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC';
  const [[productFinded]] = await connection.execute(query, [productId]);
  return productFinded;
};

const createNewProductModel = async (product) => {
  const colums = Object.keys(product).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  
  const query = `INSERT INTO StoreManager.products (${colums}) VALUES (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);
  
  return insertId;
};

module.exports = {
  getAllProductsModel,
  getProductByIdModel,
  createNewProductModel,
};
