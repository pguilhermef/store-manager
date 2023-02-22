const salesModels = require('../models/salesModels');
const schema = require('./validations/validationsInputValues');

const getAllSalesService = async () => {
  const allSales = await salesModels.getAllSalesModel();
  return { type: null, message: allSales };
};

const getSaleByIdService = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const saleFinded = await salesModels.getSaleByIdModel(saleId);
  if (!saleFinded) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: saleFinded };
};

const createNewSaleService = async (saleDetails) => {
  const error = schema.validateSale(saleDetails);
  if (error.type) return { type: error.type, message: error.message };

  const idOfSale = await salesModels.createNewSaleDateModel();

  await Promise.all(saleDetails
    .map((eachSale) => {
      const { productId, quantity } = eachSale;

      return salesModels.createNewSaleDetailsModel({ idOfSale, productId, quantity });
    }));
  
  return {
    type: null,
    message: {
      id: idOfSale,
      itemsSold: saleDetails,
    },
  };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createNewSaleService,
};
