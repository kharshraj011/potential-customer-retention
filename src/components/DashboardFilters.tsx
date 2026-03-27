import { X } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { channels, plans } from "@/data/dashboardData";

interface DashboardFiltersProps {
  channelFilter: string | null;
  planFilter: string | null;
  onChannelChange: (value: string | null) => void;
  onPlanChange: (value: string | null) => void;
  onClearAll: () => void;
}

const DashboardFilters = ({
  channelFilter,
  planFilter,
  onChannelChange,
  onPlanChange,
  onClearAll,
}: DashboardFiltersProps) => {
  const hasFilters = channelFilter || planFilter;

  return (
    <div className="flex items-center gap-3">
      <Select
        value={channelFilter ?? "all"}
        onValueChange={(v) => onChannelChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[180px] h-8 text-xs">
          <SelectValue placeholder="All Channels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Channels</SelectItem>
          {channels.map((ch) => (
            <SelectItem key={ch} value={ch}>{ch}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={planFilter ?? "all"}
        onValueChange={(v) => onPlanChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[140px] h-8 text-xs">
          <SelectValue placeholder="All Plans" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          {plans.map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
        >
          <X className="w-3 h-3" />
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default DashboardFilters;
