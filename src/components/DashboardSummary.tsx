import type { Transaction } from "../types";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#0ea5e9",
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#eab308",
];

export function DashboardSummary({ transactions }: Props) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Spending by category (expenses)
  const categoryMap = new Map<string, number>();
  for (const t of transactions.filter((t) => t.type === "expense")) {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  }
  const categoryData = Array.from(categoryMap.entries()).map(
    ([name, value]) => ({ name, value })
  );

  // Spending over time (by date)
  const dateMap = new Map<string, number>();
  for (const t of transactions.filter((t) => t.type === "expense")) {
    const dateKey = new Date(t.date).toISOString().slice(0, 10); // YYYY-MM-DD
    dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + t.amount);
  }
  const timeData = Array.from(dateMap.entries())
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  return (
    <section className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Total Income" value={totalIncome} />
        <StatCard label="Total Expenses" value={totalExpense} negative />
        <StatCard label="Balance" value={balance} highlight />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-medium text-slate-800 mb-2">
            Spending by Category
          </h3>
          {categoryData.length === 0 ? (
            <p className="text-xs text-slate-500">
              No expense data to display yet.
            </p>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-medium text-slate-800 mb-2">
            Spending Over Time
          </h3>
          {timeData.length === 0 ? (
            <p className="text-xs text-slate-500">
              No expense data to display yet.
            </p>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  highlight,
  negative,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  negative?: boolean;
}) {
  const valueClass = negative
    ? "text-rose-600"
    : highlight
    ? "text-emerald-600"
    : "text-slate-900";

  return (
    <div
      className={[
        "rounded-xl border bg-white p-4 shadow-sm",
        highlight ? "border-emerald-200" : "border-slate-200",
      ].join(" ")}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${valueClass}`}>
        ${value.toFixed(2)}
      </div>
    </div>
  );
}
