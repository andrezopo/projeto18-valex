import joi from "joi";

const createCardSchema = joi.object({
  employeeId: joi.number().integer().required(),
  cardholderName: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi
    .string()
    .valid("groceries", "restaurants", "transport", "education", "health"),
});

export default createCardSchema;
