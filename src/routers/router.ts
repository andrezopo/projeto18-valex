import { Router } from "express";
import cardsRouter from "./cardsRouter";
import paymentsRouter from "./paymentsRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();

router.use("/cards", cardsRouter);

router.use("/recharges", rechargesRouter);

router.use("/payments", paymentsRouter);

export default router;
