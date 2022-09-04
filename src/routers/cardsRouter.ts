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
import activateCardSchema from "../schemas/activateCardSchema";
import blockUnlockCardSchema from "../schemas/blockUnlockCardSchema";
import createCardSchema from "../schemas/createCardSchema";

const cardsRouter = Router();

cardsRouter.post(
  "/create",
  validateSchema(createCardSchema),
  validateApiKey,
  createCard
);

cardsRouter.post("/activate", validateSchema(activateCardSchema), activateCard);

cardsRouter.get("/:cardId", getCardTransactionsBalance);

cardsRouter.post("/block", validateSchema(blockUnlockCardSchema), blockCard);

cardsRouter.post("/unlock", validateSchema(blockUnlockCardSchema), unlockCard);

export default cardsRouter;
