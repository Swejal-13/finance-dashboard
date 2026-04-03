import { format, parseISO } from "date-fns";

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

export const formatDate = (dateStr) =>
  format(parseISO(dateStr), "MMM dd, yyyy");

export const formatMonth = (dateStr) =>
  format(parseISO(dateStr), "MMM yyyy");

export const getMonthlyData = (transactions) => {
  const map = new Map();

  transactions.forEach((t) => {
    const key = t.date.substring(0, 7);
    const current = map.get(key) || { income: 0, expenses: 0 };
    if (t.type === "income") current.income += t.amount;
    else current.expenses += t.amount;
    map.set(key, current);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: format(parseISO(`${month}-01`), "MMM"),
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }));
};

export const getCategoryBreakdown = (transactions) => {
  const map = new Map();
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map.set(t.category, (map.get(t.category) || 0) + t.amount);
    });

  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getTotals = (transactions) => {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const exportToCSV = (transactions) => {
  const headers = "Date,Description,Amount,Type,Category\n";
  const rows = transactions
    .map((t) => `${t.date},"${t.description}",${t.amount},${t.type},${t.category}`)
    .join("\n");
  downloadFile(headers + rows, "transactions.csv", "text/csv");
};

export const exportToJSON = (transactions) => {
  downloadFile(JSON.stringify(transactions, null, 2), "transactions.json", "application/json");
};

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
