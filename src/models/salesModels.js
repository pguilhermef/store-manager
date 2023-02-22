const connection = require('./connection');

const getAllSalesModel = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getSaleByIdModel = async (saleId) => {
  const query = `SELECT * FROM StoreManager.sales_products
  WHERE sale_id = ? ORDER BY sale_id, product_id ASC`;
  const [[saleFinded]] = await connection.execute(query, [saleId]);
  return saleFinded;
};

const createNewSaleDateModel = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUE (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const createNewSaleDetailsModel = async (sale) => {
  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');
  
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(sale)]);
  
  return insertId;
};

module.exports = {
  getAllSalesModel,
  getSaleByIdModel,
  createNewSaleDateModel,
  createNewSaleDetailsModel,
};
