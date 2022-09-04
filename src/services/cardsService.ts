import * as cardRepository from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

const mySecret = process.env.SECRET;
const cryptr = new Cryptr(mySecret!);

export async function createCard(cardInfo: any, apiKey: string) {
  const company = await findByApiKey(apiKey);
  if (!company) {
    throw { type: "unauthorized", message: "Invalid API key" };
  }
  const employee = await findById(cardInfo["employeeId"]);
  if (!employee) {
    throw { type: "notFound", message: "Employee not found" };
  }
  const repeatedCardType = await cardRepository.findByTypeAndEmployeeId(
    cardInfo.type,
    employee.id
  );
  if (repeatedCardType) {
    throw {
      type: "conflict",
      message: "Employee already has this type of card",
    };
  }
  const newCard = populateCardInfos(cardInfo, employee);

  cardRepository.insert(newCard);
}

function populateCardInfos(cardInfo: any, employee: any) {
  const cardNumber = faker.finance.creditCardNumber();
  const securityCode = encryptSensibleData(faker.finance.creditCardCVV());
  const employeeName = employee.fullName;
  const cardholderName = generateCardholderName(employeeName);
  const expirationDate = generateExpirationDate();

  cardInfo.number = cardNumber;
  cardInfo.securityCode = securityCode;
  cardInfo.cardholderName = cardholderName;
  cardInfo.expirationDate = expirationDate;
  cardInfo.isBlocked = true;

  return cardInfo;
}

function generateCardholderName(employeeName: string) {
  const cardholderName = employeeName
    .split(" ")
    .map((name: string, index: number) => {
      if (name.length < 3) return "";
      if (index !== 0 && index !== employeeName.length - 1) return name[0];
      return name;
    })
    .filter((name) => name)
    .join(" ")
    .toUpperCase();
  return cardholderName;
}

function generateExpirationDate() {
  const expirationDate = dayjs().add(5, "y").format("MM/YY");
  return expirationDate;
}

function encryptSensibleData(sensibleData: string) {
  const encryptedSecurityCode = cryptr.encrypt(sensibleData);
  return encryptedSecurityCode;
}

export async function activateCard(
  id: number,
  securityCode: string,
  password: string
) {
  const card = await cardRepository.findById(id);
  const passwordRegex = /^[0-9]{4}$/;

  if (!card) {
    throw { type: "notFound", message: "Card not found" };
  }
  const decriptedSecurityCode = cryptr.decrypt(card.securityCode);
  if (securityCode !== decriptedSecurityCode) {
    throw { type: "unauthorized", message: "Invalid CVV" };
  }
  if (card.password !== null) {
    throw { type: "conflict", message: "This card has been already activated" };
  }
  if (!passwordRegex.test(password)) {
    throw { type: "unprocessableEntity", message: "Invalid password" };
  }
  if (isExpired(card.expirationDate)) {
    throw { type: "notAcceptable", message: "Card expired" };
  }

  const encryptedPassword = encryptSensibleData(password);

  const cardUpdateInfo = {
    password: encryptedPassword,
  };

  cardRepository.update(id, cardUpdateInfo);
}

function isExpired(date: string) {
  const monthYear = date.split("/");
  const expiringYear = Number(monthYear[1]);
  const expiringMonth = Number(monthYear[0]);
  const currentYear = Number(dayjs().year().toString().substring(2));
  const currentMonth = dayjs().month();
  if (
    expiringYear < currentYear ||
    (currentYear === expiringYear && currentMonth > expiringMonth)
  ) {
    return true;
  }
  return false;
}

export async function getCardBalance(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw { type: "notFound", message: "Card not found" };
  }
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  const balance = calculateBalance(payments, recharges);

  return generateTransactionsObject(balance, payments, recharges);
}

function calculateBalance(payments: any[], recharges: any[]) {
  const debts = payments.reduce(
    (currentSum, payment) => currentSum + payment["amount"],
    0
  );
  const credits = recharges.reduce(
    (currentSum, payment) => currentSum + payment["amount"],
    0
  );
  const balance = credits - debts;

  return balance;
}

function generateTransactionsObject(
  balance: number,
  transactions: any[],
  recharges: any[]
) {
  const result = {
    balance,
    transactions,
    recharges,
  };
  return result;
}
