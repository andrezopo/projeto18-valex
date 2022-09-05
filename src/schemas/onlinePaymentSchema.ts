import joi from "joi";

const onlinePaymentSchema = joi.object({
  cardId: joi.number().integer().required(),
  cardNumber: joi.string().required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.string().required(),
  securityCode: joi.string().required(),
  businessId: joi.number().integer().required(),
  amount: joi.number().integer().min(1).required(),
});

export default onlinePaymentSchema;
