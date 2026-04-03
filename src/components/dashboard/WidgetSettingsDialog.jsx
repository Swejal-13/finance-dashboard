import { useFinanceStore } from "@/store/useFinanceStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const labels = {
  overview: "Overview Cards",
  balanceTrend: "Balance Trend Chart",
  spendingBreakdown: "Spending Breakdown",
  transactions: "Transactions Table",
  insights: "Insights Panel",
};

const WidgetSettingsDialog = ({ open, onClose }) => {
  const { widgetVisibility, setWidgetVisibility } = useFinanceStore();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Dashboard Widgets</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          {Object.keys(labels).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key} className="cursor-pointer">{labels[key]}</Label>
              <Switch
                id={key}
                checked={widgetVisibility[key]}
                onCheckedChange={(checked) => setWidgetVisibility({ [key]: checked })}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WidgetSettingsDialog;
