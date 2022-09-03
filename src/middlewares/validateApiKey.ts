import { findByApiKey } from "../repositories/companyRepository";
import { Request, Response, NextFunction } from "express";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];

  if (typeof apiKey !== "string") {
    throw { code: "unauthorized", message: "Invalid API key!" };
  }

  const company = await findByApiKey(apiKey);

  res.locals.company = company;

  next();
}
