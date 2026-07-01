import prisma from "../../config/prisma.js";
import type { LedgerHistoryItem, BalanceResponse, BalanceAtResponse } from "./ledger.types.js";

async function fetchAccountOrThrow(accountId: string) {
  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: { id: true, currency: true },
  });
  if (!account) {
    throw new Error(`Account with ID ${accountId} not found`);
  }
  return account;
}

export const getAccountHistory = async (
  accountId: string
): Promise<LedgerHistoryItem[]> => {
  await fetchAccountOrThrow(accountId);

  const entries = await prisma.ledgerEntry.findMany({
    where: { accountId },
    orderBy: { createdAt: "asc" },
    select: {
      transactionId: true,
      entryType: true,
      amount: true,
      description: true,
      createdAt: true,
    },
  });

  return entries.map((entry) => ({
    transactionId: entry.transactionId,
    entryType: entry.entryType,
    amount: Number(entry.amount),
    description: entry.description,
    timestamp: entry.createdAt,
  }));
};

export const getCurrentBalance = async (
  accountId: string
): Promise<BalanceResponse> => {
  const account = await fetchAccountOrThrow(accountId);

  const entries = await prisma.ledgerEntry.findMany({
    where: { accountId },
    select: { entryType: true, amount: true },
  });

  let balance = 0;
  for (const entry of entries) {
    const val = Number(entry.amount);
    if (entry.entryType === "CREDIT") {
      balance += val;
    } else if (entry.entryType === "DEBIT") {
      balance -= val;
    }
  }

  return {
    accountId,
    balance,
    currency: account.currency,
  };
};

export const getBalanceAtTimestamp = async (
  accountId: string,
  timestamp: Date
): Promise<BalanceAtResponse> => {
  const account = await fetchAccountOrThrow(accountId);

  const entries = await prisma.ledgerEntry.findMany({
    where: {
      accountId,
      createdAt: {
        lte: timestamp,
      },
    },
    select: { entryType: true, amount: true },
  });

  let balance = 0;
  for (const entry of entries) {
    const val = Number(entry.amount);
    if (entry.entryType === "CREDIT") {
      balance += val;
    } else if (entry.entryType === "DEBIT") {
      balance -= val;
    }
  }

  return {
    accountId,
    balance,
    timestamp,
    currency: account.currency,
  };
};
