import { Request, Response, NextFunction } from "express";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];

  if (typeof apiKey !== "string") {
    throw { type: "unprocessableEntity", message: "No API key" };
  }

  res.locals.apiKey = apiKey;

  next();
}
