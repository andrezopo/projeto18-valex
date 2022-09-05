import { Response, Request } from "express";
import * as paymentsService from "../services/paymentsService";

export async function payTransaction(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;

  await paymentsService.payTransaction(cardId, password, businessId, amount);

  res.status(201).send("Transaction paid succesfully");
}
