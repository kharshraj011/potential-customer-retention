import { useState } from "react";
import { DollarSign, TrendingUp, UserMinus, Users, CreditCard, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import RevenueGrowthChart from "@/components/RevenueGrowthChart";
import CityRevenueChart from "@/components/CityRevenueChart";
import InsightsPanel from "@/components/InsightsPanel";
import DashboardFilters from "@/components/DashboardFilters";
import {
  getFilteredCityData,
  getFilteredMonthlyData,
  getFilteredKPIs,
  kpiData,
} from "@/data/dashboardData";

interface KPIItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass: string;
  bgClass: string;
}

const KPIItem = ({ icon: Icon, label, value, colorClass, bgClass }: KPIItemProps) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bgClass}`}>
      <Icon className={`w-4 h-4 ${colorClass}`} />
    </div>
    <div>
      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className="text-base font-bold text-foreground leading-none">{value}</p>
    </div>
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,30%,96%)] via-[hsl(200,20%,94%)] to-[hsl(240,25%,95%)] dark:from-[hsl(240,20%,10%)] dark:via-[hsl(220,25%,12%)] dark:to-[hsl(260,20%,14%)] p-4 lg:p-6">
      <div className="max-w-[1400px] mx-auto" style={{ aspectRatio: "16/9" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Potential Customer Retention Dashboard with Key Performance Indicators
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Revenue & retention insights · FY 2024
            </p>
          </div>
          <div className="flex items-center gap-3">
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

        {/* Main Grid: KPIs left, Charts right */}
        <div className="grid grid-cols-[220px_1fr] gap-4 h-[calc(100%-60px)]">
          {/* Left KPI Sidebar */}
          <div className="flex flex-col gap-2.5">
            <KPIItem
              icon={DollarSign}
              label="Total Revenue"
              value={`$${kpi.totalRevenue.toLocaleString()}`}
              colorClass="text-primary"
              bgClass="bg-[hsl(var(--kpi-revenue-bg))]"
            />
            <KPIItem
              icon={DollarSign}
              label="Monthly Recurring Revenue"
              value={`$${kpi.mrr.toLocaleString()}`}
              colorClass="text-primary"
              bgClass="bg-[hsl(var(--kpi-revenue-bg))]"
            />
            <KPIItem
              icon={TrendingUp}
              label="Monthly Revenue Growth %"
              value={`${kpi.mrrGrowthPercent}%`}
              colorClass="text-accent"
              bgClass="bg-[hsl(var(--kpi-growth-bg))]"
            />
            <KPIItem
              icon={ArrowUpCircle}
              label="Highest Sale City"
              value={[...cityData].sort((a, b) => b.avgRevenue - a.avgRevenue)[0]?.city ?? "—"}
              colorClass="text-accent"
              bgClass="bg-[hsl(var(--kpi-growth-bg))]"
            />
            <KPIItem
              icon={ArrowDownCircle}
              label="Lowest Sale City"
              value={[...cityData].sort((a, b) => a.avgRevenue - b.avgRevenue)[0]?.city ?? "—"}
              colorClass="text-destructive"
              bgClass="bg-[hsl(var(--kpi-churn-bg))]"
            />
            <KPIItem
              icon={UserMinus}
              label="Churn Rate"
              value={`${kpi.churnRate}%`}
              colorClass="text-destructive"
              bgClass="bg-[hsl(var(--kpi-churn-bg))]"
            />
            <KPIItem
              icon={CreditCard}
              label="Cost of Customer Acquisition"
              value={`$${kpi.cac}`}
              colorClass="text-primary"
              bgClass="bg-[hsl(var(--kpi-revenue-bg))]"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-4">
            {/* Top Charts Row */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <RevenueGrowthChart data={monthlyData} />
              <CityRevenueChart data={cityData} />
            </div>

            {/* Bottom Insights */}
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
