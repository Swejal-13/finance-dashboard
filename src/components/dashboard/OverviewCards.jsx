import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { getTotals, formatCurrency } from "@/utils/helpers";
import { useMemo } from "react";

const OverviewCards = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  const totals = useMemo(() => getTotals(transactions), [transactions]);

  const cards = [
    {
      label: "Total Balance",
      value: totals.balance,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Income",
      value: totals.income,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Expenses",
      value: totals.expenses,
      icon: TrendingDown,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="glass-card rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">{card.label}</span>
            <div className={`${card.bgColor} ${card.color} p-2 rounded-md`}>
              <card.icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight">{formatCurrency(card.value)}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
