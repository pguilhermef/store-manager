const errorMap = {
  //  REQUIRED
  NAME_IS_REQUIRED: 400,
  PRODUCT_ID_IS_REQUIRED: 400,
  QUANTITY_IS_REQUIRED: 400,
  // NOT FOUND
  PRODUCT_NOT_FOUND: 404,
  // GREATER OR EQUAL
  NAME_GREATER_EQUAL_FIVE: 422,
  QUANTITY_GREATER_EQUAL_ONE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
