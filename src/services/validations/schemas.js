const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const saleSchema = Joi.object().keys({
  productId: Joi.number().min(1).required().messages({
  'any.required': '"productId" is required',
  'number.min': '"productId" must be greater than or equal to 1',
}),
  quantity: Joi.number().min(1).required().messages({
  'any.required': '"quantity" is required',
  'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

const saleArraySchema = Joi.array().items(saleSchema);

module.exports = {
  idSchema,
  nameSchema,
  saleSchema,
  saleArraySchema,
};
