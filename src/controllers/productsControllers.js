const productsServices = require('../services/productsServices');
const httpCodes = require('./httpCodes');

const getAllProductsController = async (_req, res) => {
  const allProducts = await productsServices.getAllProductsService();
  return res
    .status(httpCodes.OK.code)
    .json(allProducts);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const productFinded = await productsServices.getProductByIdService(id);
  if (!productFinded) {
    return res
      .status(httpCodes.NOT_FOUND.code)
      .json({ message: httpCodes.NOT_FOUND.message });
  }
  return res
    .status(httpCodes.OK.code)
    .json(productFinded);
};

const createNewProductController = async (req, res) => {
  const { name } = req.body;
  const createdProduct = await productsServices.createNewProductService(name);

  return res
    .status(httpCodes.CREATED.code)
    .json({ createdProduct });
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  createNewProductController,
};
