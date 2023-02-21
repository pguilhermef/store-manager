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

const createNewSaleModel = async (sale) => {
  const colums = Object.keys(sale).join(', ');

  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');
  
  const query = `INSERT INTO StoreManager.sales (${colums}) VALUES (${placeholders})`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(sale)]);
  
  return insertId;
};

module.exports = {
  getAllSalesModel,
  getSaleByIdModel,
  createNewSaleModel,
};
