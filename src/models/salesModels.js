const connection = require('./connection');

const getAllSalesModel = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getSaleByIdModel = async (saleId) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ? ORDER BY saleId, productId ASC';
  const [[saleFinded]] = await connection.execute(query, [saleId]);
  return saleFinded;
};

const createNewSaleDateModel = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUE (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const createNewSaleDetailsModel = async (sales) => {
  const colums = Object.keys(sales).join(', ');

  const placeholders = Object.keys(sales)
    .map((_key) => '?')
    .join(', ');
  
  const query = `INSERT INTO StoreManager.sales_products (${colums}) VALUES (${placeholders})`;

  const itemsSold = await connection.execute(query, [...Object.values(sales)]);
  
  return itemsSold;
};

module.exports = {
  getAllSalesModel,
  getSaleByIdModel,
  createNewSaleDateModel,
  createNewSaleDetailsModel,
};
