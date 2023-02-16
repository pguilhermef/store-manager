const productsModels = require('../models/productsModels');

const getAllProductsService = async () => {
  const allProducts = await productsModels.getAllProductsModel();
  return allProducts;
};

const getProductByIdService = async (productId) => {
  const productFinded = await productsModels.getProductByIdModel(productId);
  return productFinded;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};
