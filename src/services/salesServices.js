const { getProductByIdModel } = require('../models/productsModels');
const salesModels = require('../models/salesModels');
const schema = require('./validations/validationsInputValues');

const getAllSalesService = async () => {
  const salesWithoutDate = await salesModels.getAllSalesModel();

  const allSales = await Promise.all(salesWithoutDate.map(async (sale) => {
    const [{ date }] = await salesModels.getSaleDateByIdModel(sale.saleId);
    return {
      saleId: sale.saleId,
      date,
      productId: sale.productId,
      quantity: sale.quantity,
    };
  }));

  return { type: null, message: allSales };
};

const getSaleByIdService = async (idzada) => {
  const error = schema.validateId(idzada);
  if (error.type) return error;

  const allSales = await getAllSalesService();

  const filteredSales = allSales.message.filter((sale) => sale.saleId === Number(idzada));

  if (!filteredSales.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const sale = filteredSales.map((filteredSale) => ({
      date: filteredSale.date,
      productId: filteredSale.productId,
      quantity: filteredSale.quantity,
    }));

  return { type: null, message: sale };
};

const createNewSaleService = async (saleDetails) => {
  const error = schema.validateSale(saleDetails);
  if (error.type) return { type: error.type, message: error.message };

  const checkProductId = await Promise.all(saleDetails
    .map(async (sale) => getProductByIdModel(sale.productId)));
  if (checkProductId.some((product) => !product)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const idOfSale = await salesModels.createNewSaleDateModel();

  await Promise.all(saleDetails.map((eachSale) => {
      const { productId, quantity } = eachSale;

      return salesModels.createNewSaleDetailsModel({ idOfSale, productId, quantity });
    }));
  
  return { type: null, message: { id: idOfSale, itemsSold: saleDetails },
  };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createNewSaleService,
};
