const Joi = require('joi');

const inventoryItemValidationSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
    purchasedPrice: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
    supplier: Joi.string().allow('').optional(),
    userId: Joi.string().required(),
});

module.exports = inventoryItemValidationSchema;
