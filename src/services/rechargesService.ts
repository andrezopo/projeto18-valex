import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import { isExpired } from "./cardsService";

export async function rechargeCard(
  cardId: number,
  amount: number,
  apiKey: string
) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) {
    throw { type: "unauthorized", message: "Invalid API key" };
  }
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

  const recharge = createRechargeObject(cardId, amount);

  await rechargeRepository.insert(recharge);
}

function createRechargeObject(cardId: number, amount: number) {
  const recharge = {
    cardId,
    timestamp: new Date(),
    amount,
  };

  return recharge;
}
