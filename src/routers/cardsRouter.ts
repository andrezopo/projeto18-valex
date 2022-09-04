import { Router } from "express";
import {
  activateCard,
  blockCard,
  createCard,
  getCardTransactionsBalance,
  unlockCard,
} from "../controllers/cardsController";
import validateApiKey from "../middlewares/validateApiKey";
import validateSchema from "../middlewares/validateSchema";
import createCardSchema from "../schemas/createCardSchema";

const cardsRouter = Router();

cardsRouter.post(
  "/create",
  validateSchema(createCardSchema),
  validateApiKey,
  createCard
);

cardsRouter.post("/activate", activateCard);

cardsRouter.get("/:cardId", getCardTransactionsBalance);

cardsRouter.post("/block", blockCard);

cardsRouter.post("/unlock", unlockCard);

export default cardsRouter;
