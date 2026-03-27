import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface MonthlyChannelData {
  month: string;
  SEO: number;
  "Content Marketing": number;
  Email: number;
}

interface RevenueGrowthChartProps {
  data: MonthlyChannelData[];
}

const RevenueGrowthChart = ({ data }: RevenueGrowthChartProps) => {
  return (
    <div className="dashboard-card p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Monthly Revenue by Channel</h3>
        <p className="text-xs text-muted-foreground mt-1">Revenue breakdown by acquisition channel</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 12,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}
            />
            <Bar
              dataKey="SEO"
              stackId="revenue"
              fill="hsl(var(--chart-seo))"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Content Marketing"
              stackId="revenue"
              fill="hsl(var(--chart-content))"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Email"
              stackId="revenue"
              fill="hsl(var(--chart-email))"
              radius={[4, 4, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGrowthChart;
