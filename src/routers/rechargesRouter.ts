import { Router } from "express";
import { rechargeCard } from "../controllers/rechargesController";

import validateApiKey from "../middlewares/validateApiKey";
import validateSchema from "../middlewares/validateSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const rechargesRouter = Router();

rechargesRouter.post(
  "/",
  validateSchema(rechargeSchema),
  validateApiKey,
  rechargeCard
);

export default rechargesRouter;
