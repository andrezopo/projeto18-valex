import { Response, Request } from "express";
import * as rechargesService from "../services/rechargesService";

export async function rechargeCard(req: Request, res: Response) {
  const { apiKey } = res.locals;
  const { cardId, amount } = req.body;

  await rechargesService.rechargeCard(cardId, amount, apiKey);

  res.status(201).send("Card recharged succesfully");
}
