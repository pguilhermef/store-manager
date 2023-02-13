const connection = require('./connection');

const getAllProductsModel = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const allProducts = await connection.execute(query);
  return allProducts;
};

const getProductByIdModel = async (productId) => {
  const query = 'SELECT * PRODUCT WHERE id = ? ORDER BY id ASC';
  const productFinded = await connection.execute(query, [productId]);
  return productFinded;
};

module.exports = {
  getAllProductsModel,
  getProductByIdModel,
};
