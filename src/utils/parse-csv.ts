import Papa from "papaparse";
import type { Transaction } from "../types";

interface CsvRow {
  amount?: string;
  type?: string;
  date?: string;
  description?: string;
  category?: string;
}

export function parseTransactionsFromCsv(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as CsvRow[];
          const transactions: Transaction[] = data.map((row, index) => {
            const rawAmount = parseFloat(row.amount || "0");
            const amount = isNaN(rawAmount) ? 0 : rawAmount;

            const typeFromCsv = (row.type || "").toLowerCase();
            const type =
              typeFromCsv === "income" || typeFromCsv === "in"
                ? "income"
                : "expense";

            return {
              id: `${Date.now()}-${index}`,
              date: new Date(
                row.date || new Date().toISOString()
              ).toISOString(),
              description: row.description || "",
              category: row.category || "Uncategorized",
              amount: Math.abs(amount),
              type,
            };
          });

          resolve(transactions);
        } catch (e) {
          reject(e);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
