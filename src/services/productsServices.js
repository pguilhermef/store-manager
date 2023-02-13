const productsModels = require('../models/productsModels');

const getAllProductsService = async () => {
  const allProducts = await productsModels.getAllProductsModel;
  return allProducts;
};

const getProductByIdService = async (id) => {
  const productFinded = await productsModels.getProductByIdModel(id);
  return productFinded;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};
