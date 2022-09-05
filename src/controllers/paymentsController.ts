import { Response, Request } from "express";
import * as paymentsService from "../services/paymentsService";

export async function payTransaction(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;

  await paymentsService.payTransaction(cardId, password, businessId, amount);

  res.status(201).send("Transaction paid succesfully");
}

export async function payOnlineTransaction(req: Request, res: Response) {
  const {
    cardId,
    cardNumber,
    cardholderName,
    expirationDate,
    securityCode,
    businessId,
    amount,
  } = req.body;

  await paymentsService.payOnlineTransaction(
    cardId,
    cardNumber,
    cardholderName,
    expirationDate,
    securityCode,
    businessId,
    amount
  );

  res.status(201).send("Transaction paid succesfully");
}
