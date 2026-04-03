import { useEffect } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import Navbar from "@/components/layout/Navbar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import OverviewCards from "@/components/dashboard/OverviewCards";
import BalanceTrendChart from "@/components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/charts/SpendingBreakdownChart";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import InsightsPanel from "@/components/insights/InsightsPanel";

const Index = () => {
  const { isLoading, error, initializeData, widgetVisibility } = useFinanceStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <DashboardSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive font-medium mb-2">{error}</p>
            <button onClick={() => initializeData()} className="text-sm text-primary underline">
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <DashboardHeader />

        <div className="space-y-6">
          {widgetVisibility.overview && <OverviewCards />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {widgetVisibility.balanceTrend && <BalanceTrendChart />}
            {widgetVisibility.spendingBreakdown && <SpendingBreakdownChart />}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              {widgetVisibility.transactions && <TransactionsTable />}
            </div>
            <div>
              {widgetVisibility.insights && <InsightsPanel />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
