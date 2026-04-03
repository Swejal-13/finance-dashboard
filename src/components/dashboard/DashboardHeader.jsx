import { useFinanceStore } from "@/store/useFinanceStore";
import { Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TransactionFormDialog from "@/components/transactions/TransactionFormDialog";
import WidgetSettingsDialog from "./WidgetSettingsDialog";

const DashboardHeader = () => {
  const { role } = useFinanceStore();
  const [showAdd, setShowAdd] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your income, expenses, and insights
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
          <Settings2 className="h-4 w-4 mr-1.5" /> Widgets
        </Button>
        {role === "admin" && (
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Transaction
          </Button>
        )}
      </div>

      <TransactionFormDialog open={showAdd} onClose={() => setShowAdd(false)} />
      <WidgetSettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />
    </header>
  );
};

export default DashboardHeader;
