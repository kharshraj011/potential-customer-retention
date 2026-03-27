import { TrendingUp, Search, CreditCard, AlertCircle } from "lucide-react";
import { insights } from "@/data/dashboardData";

const iconMap = {
  trending: TrendingUp,
  search: Search,
  plan: CreditCard,
  alert: AlertCircle,
};

const colorMap = {
  trending: "text-primary bg-primary/10",
  search: "text-accent bg-accent/10",
  plan: "text-primary bg-primary/10",
  alert: "text-destructive bg-destructive/10",
};

const InsightsPanel = () => (
  <div className="dashboard-card p-6">
    <h3 className="section-title mb-4">Key Insights</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {insights.map((insight, i) => {
        const Icon = iconMap[insight.icon as keyof typeof iconMap];
        const colors = colorMap[insight.icon as keyof typeof colorMap];
        return (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs leading-relaxed text-foreground/80">{insight.text}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default InsightsPanel;
