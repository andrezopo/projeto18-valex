import * as paymentRepository from "../repositories/paymentRepository";
import * as cardRepository from "../repositories/cardRepository";
import * as businessRepository from "../repositories/businessRepository";
import { getCardBalance, isExpired } from "./cardsService";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

const mySecret = process.env.SECRET;
const cryptr = new Cryptr(mySecret!);

export async function payTransaction(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "notFound", message: "Card not found" };
  }
  if (!card["password"]) {
    throw {
      type: "notAcceptable",
      message: "Card has never been activated yet",
    };
  }
  if (isExpired(card.expirationDate)) {
    throw { type: "notAcceptable", message: "Card expired" };
  }
  if (card.isBlocked) {
    throw { type: "unauthorized", message: "This card is blocked" };
  }
  const decryptedPassword = cryptr.decrypt(card["password"]);
  if (decryptedPassword !== password) {
    throw { type: "unauthorized", message: "Incorrect password" };
  }
  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw { type: "notFound", message: "Business is not registered" };
  }
  if (business["type"] !== card["type"]) {
    throw {
      type: "notAcceptable",
      message: "Card type not allowed in this business",
    };
  }
  const { balance } = await getCardBalance(cardId);

  if (balance < amount) {
    throw { type: "notAcceptable", message: "Insufficient funds" };
  }

  const payment = createPaymentObject(cardId, businessId, amount);

  await paymentRepository.insert(payment);
}

function createPaymentObject(
  cardId: number,
  businessId: number,
  amount: number
) {
  const payment = {
    cardId,
    businessId,
    timestamp: new Date(),
    amount,
  };

  return payment;
}
