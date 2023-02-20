const { idSchema, nameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) {
    return {
      type: error.details[0].type,
      message: error.details[0].message,
    }; 
  }

  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = nameSchema.validate(name);

  if (error) {
    return {
      type: error.details[0].type,
      message: error.details[0].message,
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProductName,
};
