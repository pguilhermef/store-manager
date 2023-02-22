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

const createNewSaleModel = async (sales) => {
  // --------- Lógica de Query Dinâmica ---------
  const colums = Object.keys(sales[0]).join(', ');

  const placeholders = Object.keys(sales[0])
    .map((_key) => '?')
    .join(', ');

  const salesLength = sales.map((_sale) => `(${placeholders})`).join(', ');

  const valuesToTable = sales.reduce((acc, obj) => {
    const objValores = Object.values(obj);
    return [...acc, ...objValores];
  }, []);

  const query = `INSERT INTO StoreManager.sales (${colums}) VALUES ${salesLength};`;
  // --------- Fim da Lógica de Query Dinâmica ---------

  const [{ insertId }] = await connection.execute(query, [valuesToTable]);
  
  return insertId;
};

module.exports = {
  getAllSalesModel,
  getSaleByIdModel,
  createNewSaleModel,
};
