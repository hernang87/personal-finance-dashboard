import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: Props) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <span className="text-xs text-slate-500">
          {transactions.length} records
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="max-h-96 overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Category</Th>
                <Th>Type</Th>
                <Th className="text-right">Amount</Th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-100 last:border-none hover:bg-slate-50"
                >
                  <Td>
                    {new Date(t.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </Td>
                  <Td>{t.description}</Td>
                  <Td>{t.category}</Td>
                  <Td className="capitalize">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        t.type === "income"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {t.type}
                    </span>
                  </Td>
                  <Td className="text-right tabular-nums">
                    {t.type === "expense" ? "-" : "+"}${t.amount.toFixed(2)}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={
        "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 " +
        className
      }
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={"px-3 py-2 align-middle text-slate-800 " + className}>
      {children}
    </td>
  );
}
