const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const allProducts = await connection.execute(query);
  return allProducts;
};

const getProductById = async (productId) => {
  const query = 'SELECT * PRODUCT WHERE id = ?';
  const productFinded = await connection.execute(query, [productId]);
  return productFinded;
};

export {
  getAllProducts,
  getProductById,
};
