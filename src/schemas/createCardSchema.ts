import joi from "joi";

const createCardSchema = joi.object({
  employeeId: joi.number().integer().required(),
  isVirtual: joi.boolean().required(),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

export default createCardSchema;
