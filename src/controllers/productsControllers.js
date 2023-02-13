const productsServices = require('../services/productsServices');
const httpCodes = require('./httpCodes');

const getAllProductsController = async (_req, res) => {
  const allProducts = await productsServices.getAllProductsService;
  if (!allProducts) {
    return res
      .status(httpCodes.NOT_FOUND.code)
      .json({ message: httpCodes.NOT_FOUND.message });
  }
  return res
    .status(httpCodes.OK.code)
    .json(allProducts);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.body;
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

module.exports = {
  getAllProductsController,
  getProductByIdController,
};
