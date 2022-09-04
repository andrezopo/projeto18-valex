import joi from "joi";

const activateCardSchema = joi.object({
  cardId: joi.number().integer().required(),
  securityCode: joi.string().required(),
  password: joi.string().required(),
});

export default activateCardSchema;
