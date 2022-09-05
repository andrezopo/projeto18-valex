import { Router } from "express";
import {
  payOnlineTransaction,
  payTransaction,
} from "../controllers/paymentsController";
import validateSchema from "../middlewares/validateSchema";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema";
import paymentSchema from "../schemas/paymentSchema";

const paymentsRouter = Router();

paymentsRouter.post("/", validateSchema(paymentSchema), payTransaction);

paymentsRouter.post(
  "/online",
  validateSchema(onlinePaymentSchema),
  payOnlineTransaction
);

export default paymentsRouter;
