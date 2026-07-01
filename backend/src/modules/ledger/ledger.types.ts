export interface LedgerHistoryItem {
  transactionId: string;
  entryType: "DEBIT" | "CREDIT";
  amount: number;
  description: string | null;
  timestamp: Date;
}

export interface BalanceResponse {
  accountId: string;
  balance: number;
  currency: string;
}

export interface BalanceAtResponse {
  accountId: string;
  balance: number;
  timestamp: Date;
  currency: string;
}
