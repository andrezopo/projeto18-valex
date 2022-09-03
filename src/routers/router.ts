import { Router } from "express";
import cardsRouter from "./cardsRouter";

const router = Router();

router.use("/cards", cardsRouter);

export default router;
