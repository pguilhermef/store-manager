const productsModels = require('../models/productsModels');
const schema = require('./validations/validationsInputValues');

const getAllProductsService = async () => {
  const allProducts = await productsModels.getAllProductsModel();
  return { type: null, message: allProducts };
};

const getProductByIdService = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const productFinded = await productsModels.getProductByIdModel(productId);
  if (!productFinded) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: productFinded };
};

const createNewProductService = async (name) => {
  const error = schema.validateProductName(name);
  if (error.type) return { type: error.type, message: error.message };

  // cria o produto por de trás dos panos e retorna a busca por Id do produto buscado
  const newProductId = await productsModels.createNewProductModel({ name });
  const createdProduct = await productsModels.getProductByIdModel(newProductId);
  
  return { type: null, message: createdProduct };
};

const updateProductService = async (name, id) => {
  const error = schema.validateProductName(name);
  if (error.type) return error;

  const productFinded = await productsModels.getProductByIdModel(id);
  if (!productFinded) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModels.updateProductModel(name, id);

  const updatedProduct = await productsModels.getProductByIdModel(id);

  return { type: null, message: updatedProduct };
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
  createNewProductService,
  updateProductService,
};
