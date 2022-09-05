import { Router } from "express";
import { payTransaction } from "../controllers/paymentsController";
import validateSchema from "../middlewares/validateSchema";
import paymentSchema from "../schemas/paymentSchema";

const paymentsRouter = Router();

paymentsRouter.post("/", validateSchema(paymentSchema), payTransaction);

export default paymentsRouter;
