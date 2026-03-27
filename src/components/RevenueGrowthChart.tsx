import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { monthlyRevenueData } from "@/data/dashboardData";

const RevenueGrowthChart = () => {
  // Show last 12 months for cleaner view
  const data = monthlyRevenueData.slice(-12);

  return (
    <div className="dashboard-card p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Monthly Revenue & Growth</h3>
        <p className="text-xs text-muted-foreground mt-1">Revenue bars with growth rate trend line</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="revenue"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="growth"
              orientation="right"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 12,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number, name: string) =>
                name === "revenue" ? [`$${value.toLocaleString()}`, "Revenue"] : [`${value}%`, "Growth"]
              }
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}
              formatter={(v) => (v === "revenue" ? "Monthly Revenue" : "Growth %")}
            />
            <Bar
              yAxisId="revenue"
              dataKey="revenue"
              fill="hsl(var(--chart-revenue))"
              radius={[4, 4, 0, 0]}
              barSize={28}
              opacity={0.85}
            />
            <Line
              yAxisId="growth"
              type="monotone"
              dataKey="growth"
              stroke="hsl(var(--chart-growth))"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "hsl(var(--chart-growth))" }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGrowthChart;
