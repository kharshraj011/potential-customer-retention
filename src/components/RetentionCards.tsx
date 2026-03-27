import { AlertTriangle, UserX, UserCheck } from "lucide-react";
import { kpiData } from "@/data/dashboardData";

const cards = [
  {
    label: "At Risk Customers",
    value: kpiData.atRiskCustomers,
    icon: AlertTriangle,
    color: "text-[hsl(var(--chart-warning))]",
    bg: "bg-[hsl(var(--kpi-lost-bg))]",
    desc: "Showing disengagement signals",
  },
  {
    label: "Churned Customers",
    value: kpiData.churnedCustomers,
    icon: UserX,
    color: "text-destructive",
    bg: "bg-[hsl(var(--kpi-churn-bg))]",
    desc: "Lost in current period",
  },
  {
    label: "Active Customers",
    value: kpiData.activeCustomers,
    icon: UserCheck,
    color: "text-accent",
    bg: "bg-[hsl(var(--kpi-growth-bg))]",
    desc: "Engaged and retained",
  },
];

const RetentionCards = () => (
  <div className="grid grid-cols-3 gap-4">
    {cards.map((c) => (
      <div key={c.label} className="dashboard-card p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg}`}>
          <c.icon className={`w-5 h-5 ${c.color}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{c.value.toLocaleString()}</p>
          <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">{c.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default RetentionCards;
