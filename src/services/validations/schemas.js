const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const saleSchema = Joi.object().keys({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const saleArraySchema = Joi.array().items(saleSchema);

module.exports = {
  idSchema,
  nameSchema,
  saleSchema,
  saleArraySchema,
};
