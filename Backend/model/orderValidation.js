const Joi = require('joi');

const orderValidation = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(), 
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required(),
  userId: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed').optional()
});

module.exports = orderValidation;
