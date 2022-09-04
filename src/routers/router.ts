import { Router } from "express";
import cardsRouter from "./cardsRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();

router.use("/cards", cardsRouter);

router.use("/recharges", rechargesRouter);

export default router;
