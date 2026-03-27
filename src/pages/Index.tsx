import { DollarSign, TrendingUp, Users, UserMinus, AlertTriangle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import KPICard from "@/components/KPICard";
import RevenueGrowthChart from "@/components/RevenueGrowthChart";
import ChannelRevenueChart from "@/components/ChannelRevenueChart";
import RetentionCards from "@/components/RetentionCards";
import InsightsPanel from "@/components/InsightsPanel";
import { kpiData } from "@/data/dashboardData";

const Index = () => (
  <div className="min-h-screen bg-background p-6 lg:p-8">
    <div className="max-w-[1400px] mx-auto" style={{ aspectRatio: "16/9" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Customer Retention Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Revenue & retention insights · FY 2022–2024
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <KPICard
          label="Total Revenue"
          value={`$${(kpiData.totalRevenue / 1000).toFixed(1)}K`}
          subtitle="Monthly recurring"
          icon={DollarSign}
          bgClass="bg-[hsl(var(--kpi-revenue-bg))]"
          iconColorClass="text-primary"
          trend={{ value: "12.3% vs last year", positive: true }}
        />
        <KPICard
          label="Growth"
          value={`${kpiData.growthPercent}%`}
          subtitle="Year over year"
          icon={TrendingUp}
          bgClass="bg-[hsl(var(--kpi-growth-bg))]"
          iconColorClass="text-accent"
          trend={{ value: "Steady growth", positive: true }}
        />
        <KPICard
          label="Active Customers"
          value={kpiData.activeCustomers.toLocaleString()}
          subtitle="Currently engaged"
          icon={Users}
          bgClass="bg-[hsl(var(--kpi-active-bg))]"
          iconColorClass="text-primary"
          trend={{ value: "75% retention", positive: true }}
        />
        <KPICard
          label="Churn Rate"
          value={`${kpiData.churnRate}%`}
          subtitle="200 customers lost"
          icon={UserMinus}
          bgClass="bg-[hsl(var(--kpi-churn-bg))]"
          iconColorClass="text-destructive"
          trend={{ value: "Needs attention", positive: false }}
        />
        <KPICard
          label="Revenue Lost"
          value={`$${(kpiData.revenueLost / 1000).toFixed(1)}K`}
          subtitle="From churned users"
          icon={AlertTriangle}
          bgClass="bg-[hsl(var(--kpi-lost-bg))]"
          iconColorClass="text-[hsl(var(--chart-warning))]"
          trend={{ value: "19.4% of total", positive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <RevenueGrowthChart />
        <ChannelRevenueChart />
      </div>

      {/* Retention + Insights */}
      <div className="grid grid-cols-1 gap-4">
        <RetentionCards />
        <InsightsPanel />
      </div>
    </div>
  </div>
);

export default Index;
