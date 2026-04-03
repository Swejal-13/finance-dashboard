export const CATEGORIES = [
  "Salary", "Freelance", "Investments", "Food", "Transport",
  "Entertainment", "Shopping", "Bills", "Healthcare", "Education", "Travel", "Other",
];

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investments", "Other"];
export const EXPENSE_CATEGORIES = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Healthcare", "Education", "Travel", "Other"];

const generateId = () => Math.random().toString(36).substring(2, 11);

export const generateMockTransactions = () => {
  const transactions = [];
  const now = new Date();

  const incomeEntries = [
    { desc: "Monthly Salary", amount: 5200, cat: "Salary" },
    { desc: "Freelance Project", amount: 1500, cat: "Freelance" },
    { desc: "Stock Dividends", amount: 320, cat: "Investments" },
    { desc: "Consulting Fee", amount: 800, cat: "Freelance" },
    { desc: "Bonus", amount: 2000, cat: "Salary" },
  ];

  const expenseEntries = [
    { desc: "Grocery Store", amount: 85, cat: "Food" },
    { desc: "Restaurant Dinner", amount: 65, cat: "Food" },
    { desc: "Gas Station", amount: 45, cat: "Transport" },
    { desc: "Netflix Subscription", amount: 15, cat: "Entertainment" },
    { desc: "Electric Bill", amount: 120, cat: "Bills" },
    { desc: "Online Shopping", amount: 230, cat: "Shopping" },
    { desc: "Gym Membership", amount: 50, cat: "Healthcare" },
    { desc: "Coffee Shop", amount: 12, cat: "Food" },
    { desc: "Uber Ride", amount: 25, cat: "Transport" },
    { desc: "Phone Bill", amount: 75, cat: "Bills" },
    { desc: "Book Purchase", amount: 28, cat: "Education" },
    { desc: "Movie Tickets", amount: 32, cat: "Entertainment" },
    { desc: "Doctor Visit", amount: 150, cat: "Healthcare" },
    { desc: "Flight Booking", amount: 450, cat: "Travel" },
    { desc: "Internet Bill", amount: 60, cat: "Bills" },
    { desc: "Clothing Store", amount: 180, cat: "Shopping" },
    { desc: "Lunch Delivery", amount: 22, cat: "Food" },
    { desc: "Parking Fee", amount: 15, cat: "Transport" },
    { desc: "Concert Tickets", amount: 95, cat: "Entertainment" },
    { desc: "Online Course", amount: 199, cat: "Education" },
  ];

  for (let month = 5; month >= 0; month--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - month, 1);

    const incomeCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < incomeCount; i++) {
      const entry = incomeEntries[Math.floor(Math.random() * incomeEntries.length)];
      const day = 1 + Math.floor(Math.random() * 28);
      transactions.push({
        id: generateId(),
        date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day).toISOString().split("T")[0],
        description: entry.desc,
        amount: entry.amount + Math.floor(Math.random() * 200 - 100),
        type: "income",
        category: entry.cat,
      });
    }

    const expenseCount = 5 + Math.floor(Math.random() * 6);
    for (let i = 0; i < expenseCount; i++) {
      const entry = expenseEntries[Math.floor(Math.random() * expenseEntries.length)];
      const day = 1 + Math.floor(Math.random() * 28);
      transactions.push({
        id: generateId(),
        date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day).toISOString().split("T")[0],
        description: entry.desc,
        amount: entry.amount + Math.floor(Math.random() * 30 - 15),
        type: "expense",
        category: entry.cat,
      });
    }
  }

  return transactions.sort((a, b) => b.date.localeCompare(a.date));
};

export const DEFAULT_WIDGET_VISIBILITY = {
  overview: true,
  balanceTrend: true,
  spendingBreakdown: true,
  transactions: true,
  insights: true,
};
