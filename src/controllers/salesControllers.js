const salesServices = require('../services/salesServices');
const errorMap = require('../utils/errorMap');

const getAllSalesController = async (_req, res) => {
  const { message } = await salesServices.getAllSalesService();
  return res
    .status(200)
    .json(message);
};

const getSaleByIdController = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.getSaleByIdService(id);

  if (type) return res.status(404).json({ message });

  return res
    .status(200)
    .json(message);
};

const createNewSaleController = async (req, res) => {
  const { type, message } = await salesServices.createNewSaleService(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res
    .status(201)
    .json(message);
};

module.exports = {
  getAllSalesController,
  getSaleByIdController,
  createNewSaleController,
};
