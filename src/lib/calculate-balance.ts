import { financeData } from "./finance-data";

export function calculateTotalBalance(): number {
  let balance = 0;

  for (const quarter of financeData) {
    for (const month of quarter.months) {
      for (const tx of month.transactions) {
        balance += tx.type === "income" ? tx.amount : -tx.amount;
      }
    }
  }

  return balance;
}
