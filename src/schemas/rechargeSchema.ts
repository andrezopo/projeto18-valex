import joi from "joi";

const rechargeSchema = joi.object({
  cardId: joi.number().integer().required(),
  amount: joi.number().integer().min(1).required(),
});

export default rechargeSchema;
