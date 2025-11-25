import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Transaction } from "./types";
import { parseTransactionsFromCsv } from "./utils/parse-csv";
import { DashboardSummary } from "./components/DashboardSummary";
import { TransactionsTable } from "./components/TransactionsTable";

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "pf-transactions",
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);
    try {
      const parsed = await parseTransactionsFromCsv(file);
      setTransactions(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to parse CSV. Check the format.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Personal Finance Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Upload a CSV of your transactions to visualize your spending.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer">
              <span>Upload CSV</span>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {isLoading && (
              <p className="text-xs text-blue-600">Parsing CSV, please wait…</p>
            )}
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </header>

        {transactions.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            <p className="text-sm">
              No transactions yet. Upload a CSV file to get started.
            </p>
            <p className="text-xs mt-2">
              Expected columns: <code>date</code>, <code>description</code>,{" "}
              <code>category</code>, <code>amount</code>, <code>type</code>{" "}
              (income/expense)
            </p>
          </div>
        ) : (
          <>
            <DashboardSummary transactions={transactions} />
            <TransactionsTable transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
