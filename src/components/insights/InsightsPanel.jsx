import { useMemo } from "react";
import { TrendingUp, TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { getCategoryBreakdown, getMonthlyData, formatCurrency } from "@/utils/helpers";
import { motion } from "framer-motion";

const InsightsPanel = () => {
  const transactions = useFinanceStore((s) => s.transactions);

  const insights = useMemo(() => {
    const categories = getCategoryBreakdown(transactions);
    const monthly = getMonthlyData(transactions);
    const items = [];

    if (categories.length > 0) {
      items.push({
        icon: BarChart3,
        label: "Highest Spending",
        value: `${categories[0].name}: ${formatCurrency(categories[0].value)}`,
        color: "text-warning",
      });
    }

    if (monthly.length >= 2) {
      const last = monthly[monthly.length - 1];
      const prev = monthly[monthly.length - 2];
      const change = last.expenses - prev.expenses;
      const pct = prev.expenses ? ((change / prev.expenses) * 100).toFixed(1) : "0";
      items.push({
        icon: change > 0 ? TrendingUp : TrendingDown,
        label: "Expense Change",
        value: `${change > 0 ? "+" : ""}${pct}% vs last month`,
        color: change > 0 ? "text-destructive" : "text-success",
      });

      const savingsRate = last.income > 0 ? (((last.income - last.expenses) / last.income) * 100).toFixed(0) : "0";
      items.push({
        icon: Lightbulb,
        label: "Savings Rate",
        value: `${savingsRate}% this month`,
        color: Number(savingsRate) > 20 ? "text-success" : "text-warning",
      });
    }

    if (categories.length >= 3) {
      const top3 = categories.slice(0, 3).map((c) => c.name).join(", ");
      items.push({
        icon: BarChart3,
        label: "Top 3 Categories",
        value: top3,
        color: "text-primary",
      });
    }

    return items;
  }, [transactions]);

  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-lg p-5"
    >
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        Insights
      </h3>
      <div className="space-y-3">
        {insights.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
            <item.icon className={`h-4 w-4 mt-0.5 ${item.color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InsightsPanel;
