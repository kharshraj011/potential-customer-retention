import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CityRevenueChartProps {
  data: { city: string; avgRevenue: number; totalRevenue: number; count: number }[];
}

const CityRevenueChart = ({ data }: CityRevenueChartProps) => {
  const sorted = [...data].sort((a, b) => b.avgRevenue - a.avgRevenue);

  return (
    <div className="dashboard-card p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Average Revenue by City</h3>
        <p className="text-xs text-muted-foreground mt-1">Avg monthly revenue per customer by location</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 5, right: 30, bottom: 5, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 12, fill: "hsl(var(--foreground))", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 12,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Avg Revenue"]}
            />
            <Bar
              dataKey="avgRevenue"
              fill="hsl(var(--chart-revenue))"
              radius={[0, 6, 6, 0]}
              barSize={32}
              opacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex gap-4 flex-wrap">
        {sorted.map((d) => (
          <div key={d.city} className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{d.city}</span>: {d.count} customers
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityRevenueChart;
