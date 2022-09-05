import { Response, Request } from "express";
import * as cardsService from "../services/cardsService";

export async function createCard(req: Request, res: Response) {
  const cardInfo = req.body;
  const { apiKey } = res.locals;
  const createdCard = await cardsService.createCard(cardInfo, apiKey);
  res.status(201).send(createdCard);
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
  const cardId = Number(req.params.cardId);
  const cardTransactionsBalance = await cardsService.getCardBalance(cardId);

  res.status(200).send(cardTransactionsBalance);
}

export async function blockCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number; password: string } = req.body;
  await cardsService.blockCard(cardId, password);

  res.status(200).send("Card blocked succesfully");
}

export async function unlockCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number; password: string } = req.body;
  await cardsService.unlockCard(cardId, password);

  res.status(200).send("Card unlocked succesfully");
}
