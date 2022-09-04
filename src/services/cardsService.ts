import * as cardRepository from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

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
  const securityCode = encryptSecurityCode(faker.finance.creditCardCVV());
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

function encryptSecurityCode(securityCode: string) {
  const mySecret = process.env.SECRET;
  const cryptr = new Cryptr(mySecret!);
  const encryptedSecurityCode = cryptr.encrypt(securityCode);
  return encryptedSecurityCode;
}
