import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(422).send(error.details.map((err) => err.message));
      return;
    }
    next();
  };
};

export default validateSchema;
