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
  // Show only first 6 months to match reference
  const sliced = data.slice(0, 6);

  // Add total labels
  const withTotals = sliced.map((d) => ({
    ...d,
    total: d.SEO + d["Content Marketing"] + d.Email,
  }));

  return (
    <div className="dashboard-card p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground">Monthly Revenue Growth by Channel ($)</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={withTotals} margin={{ top: 15, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              tickFormatter={(v) => v.replace(" '24", "")}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 11,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="Email" stackId="rev" fill="hsl(var(--chart-email))" />
            <Bar dataKey="SEO" stackId="rev" fill="hsl(var(--chart-seo))" />
            <Bar
              dataKey="Content Marketing"
              stackId="rev"
              fill="hsl(var(--chart-content))"
              radius={[3, 3, 0, 0]}
              barSize={32}
              label={{
                position: "top",
                fontSize: 10,
                fill: "hsl(var(--muted-foreground))",
                formatter: (_: any, __: any, index: number) => `$${withTotals[index]?.total?.toLocaleString() ?? ""}`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueGrowthChart;
