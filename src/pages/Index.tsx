import { useState } from "react";
import { DollarSign, TrendingUp, UserMinus } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import KPICard from "@/components/KPICard";
import RevenueGrowthChart from "@/components/RevenueGrowthChart";
import CityRevenueChart from "@/components/CityRevenueChart";
import InsightsPanel from "@/components/InsightsPanel";
import DashboardFilters from "@/components/DashboardFilters";
import {
  getFilteredCityData,
  getFilteredMonthlyData,
  getFilteredKPIs,
} from "@/data/dashboardData";

const Index = () => {
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);

  const kpi = getFilteredKPIs(channelFilter, planFilter);
  const cityData = getFilteredCityData(channelFilter, planFilter);
  const monthlyData = getFilteredMonthlyData(channelFilter, planFilter);

  const clearAll = () => {
    setChannelFilter(null);
    setPlanFilter(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto" style={{ aspectRatio: "16/9" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Customer Retention Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revenue & retention insights · FY 2024
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DashboardFilters
              channelFilter={channelFilter}
              planFilter={planFilter}
              onChannelChange={setChannelFilter}
              onPlanChange={setPlanFilter}
              onClearAll={clearAll}
            />
            <ThemeToggle />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <KPICard
            label="Total Revenue"
            value={`$${(kpi.totalRevenue / 1000).toFixed(1)}K`}
            subtitle="Monthly recurring"
            icon={DollarSign}
            bgClass="bg-[hsl(var(--kpi-revenue-bg))]"
            iconColorClass="text-primary"
            trend={{ value: "12.3% vs last year", positive: true }}
          />
          <KPICard
            label="MRR"
            value={`$${(kpi.mrr / 1000).toFixed(1)}K`}
            subtitle="Active customers only"
            icon={TrendingUp}
            bgClass="bg-[hsl(var(--kpi-growth-bg))]"
            iconColorClass="text-accent"
            trend={{ value: `${kpi.mrrGrowthPercent}% growth`, positive: true }}
          />
          <KPICard
            label="Churn Rate"
            value={`${kpi.churnRate}%`}
            subtitle="200 customers lost"
            icon={UserMinus}
            bgClass="bg-[hsl(var(--kpi-churn-bg))]"
            iconColorClass="text-destructive"
            trend={{ value: "Needs attention", positive: false }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <RevenueGrowthChart data={monthlyData} />
          <CityRevenueChart data={cityData} />
        </div>

        {/* Insights */}
        <InsightsPanel />
      </div>
    </div>
  );
};

export default Index;
