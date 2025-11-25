# Personal Finance Dashboard

A simple, modern finance dashboard built with **React + TypeScript + Vite + Tailwind CSS**, designed to visualize personal spending using an uploaded CSV file.

This project parses your transactions, categorizes them, and displays them through clean tables and charts.

Perfect as a **portfolio-ready full-stack demo** showing frontend skills, data parsing, charts, and UI styling.

## Features

- Upload CSV and instantly visualize data
- LocalStorage persistence — no backend required
- Charts:
  - Spending over time (line chart)
  - Spending by category (pie chart)
- Clean transaction table with categories & color badges
- Tailwind UI with modern responsive layout
- Handles income and expense automatically
- CSV cleaning script included

## CSV Format

Your CSV must include the following columns:

| Column        | Example            | Notes                                        |
|---------------|--------------------|----------------------------------------------|
| date          | 2025-02-20         | Any valid date string                        |
| description   | Payment Visa ICBC  | What the transaction is                      |
| category      | ICBC / Casa / XYZ  | Used to group spending                       |
| amount        | 123.45             | Always positive; type determines sign        |
| type          | income / expense   | income = +, expense = −                      |

Example:

```
2025-02-20,Payment Visa,ICBC,171.23,expense
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- PapaParse
- LocalStorage

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  components/
    DashboardSummary.tsx
    TransactionsTable.tsx
  hooks/
    useLocalStorage.ts
  utils/
    parseCsv.ts
  types.ts
  App.tsx
  main.tsx
  index.css
```

## Deployment

Deploy easily using Vercel or Netlify after building:

```bash
npm run build
```

## Roadmap

- Add filters (date range, category)
- Demo data button
- Category rules engine
- CSV export
- Dark mode

## License

MIT — feel free to use this as a starter, portfolio project, or base for your own finance tools.
