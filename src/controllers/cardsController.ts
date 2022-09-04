import { Response, Request } from "express";
import * as cardsService from "../services/cardsService";

export async function createCard(req: Request, res: Response) {
  const cardInfo = req.body;
  const { apiKey } = res.locals;
  await cardsService.createCard(cardInfo, apiKey);
  res.status(201).send("Card created succesfully");
}

export async function activateCard(req: Request, res: Response) {
  const {
    cardId,
    securityCode,
    password,
  }: { cardId: number; securityCode: string; password: string } = req.body;

  await cardsService.activateCard(cardId, securityCode, password);

  res.status(201).send("Card activated succesfully");
}

export async function getCardTransactionsBalance(req: Request, res: Response) {
  const { cardId } = req.params;
  res.send("Rota de visualizar saldo e transações de cartões " + cardId);
}

export async function blockCard(req: Request, res: Response) {
  res.send("Rota de bloquear cartões");
}

export async function unlockCard(req: Request, res: Response) {
  res.send("Rota de desbloquear cartões");
}
