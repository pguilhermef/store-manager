const productsServices = require('../services/productsServices');
const errorMap = require('../utils/errorMap');

const getAllProductsController = async (_req, res) => {
  const { message } = await productsServices.getAllProductsService();
  return res
    .status(200)
    .json(message);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductByIdService(id);

  if (type) return res.status(404).json({ message });

  return res
    .status(200)
    .json(message);
};

const createNewProductController = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.createNewProductService(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res
    .status(201)
    .json(message);
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  createNewProductController,
};
