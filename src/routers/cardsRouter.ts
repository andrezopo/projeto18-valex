import { Router } from "express";
import {
  activateCard,
  blockCard,
  createCard,
  getCardTransactionsBalance,
  unlockCard,
} from "../controllers/cardsController";

const cardsRouter = Router();

cardsRouter.post("/create", createCard);

cardsRouter.post("/activate", activateCard);

cardsRouter.get("/:cardId", getCardTransactionsBalance);

cardsRouter.post("/block", blockCard);

cardsRouter.post("/unlock", unlockCard);

export default cardsRouter;
