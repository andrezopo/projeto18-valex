import joi from "joi";

const blockUnlockCardSchema = joi.object({
  cardId: joi.number().integer().required(),
  password: joi.string().required(),
});

export default blockUnlockCardSchema;
