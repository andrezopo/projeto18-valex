import joi from "joi";

const blockCardSchema = joi.object({
  cardId: joi.number().integer().required(),
  password: joi.string().required(),
});

export default blockCardSchema;
