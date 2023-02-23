const errorMap = {
  //  REQUIRED
  IS_REQUIRED: 400,
  'any.required': 400,
  'string.min': 422,
  'number.min': 422,
  // NOT FOUND
  PRODUCT_NOT_FOUND: 404,
  // GREATER OR EQUAL || GENERAL INVALID VALUES
  INVALID_VALUE: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
