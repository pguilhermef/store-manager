const productsModels = require('../models/productsModels');

const getAllProductsService = async () => {
  const allProducts = await productsModels.getAllProductsModel();
  return allProducts;
};

const getProductByIdService = async (productId) => {
  const productFinded = await productsModels.getProductByIdModel(productId);
  return productFinded;
};

const createNewProductService = async (name) => {
  const newProductId = await productsModels.createNewProductModel({ name });
  const createdProduct = await productsModels.getProductByIdModel(newProductId);
  
  return createdProduct;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  createNewProductService,
};
