import { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  bgClass: string;
  iconColorClass: string;
  trend?: { value: string; positive: boolean };
}

const KPICard = ({ label, value, subtitle, icon: Icon, bgClass, iconColorClass, trend }: KPICardProps) => (
  <div className="dashboard-card p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="kpi-label">{label}</span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bgClass}`}>
        <Icon className={`w-4 h-4 ${iconColorClass}`} />
      </div>
    </div>
    <div>
      <p className="kpi-value">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    {trend && (
      <span className={`insight-badge w-fit ${trend.positive ? 'bg-accent/15 text-accent' : 'bg-destructive/15 text-destructive'}`}>
        {trend.positive ? '↑' : '↓'} {trend.value}
      </span>
    )}
  </div>
);

export default KPICard;
