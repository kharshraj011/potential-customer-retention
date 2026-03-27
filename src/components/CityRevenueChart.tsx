import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface CityRevenueChartProps {
  data: { city: string; avgRevenue: number; totalRevenue: number; count: number }[];
}

// Transform city data into monthly trend format for line chart (simulated monthly trends)
const generateMonthlyTrends = (cityData: { city: string; avgRevenue: number }[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const patterns: Record<string, number[]> = {
    "New York": [950, 880, 1020, 870, 960, 1050],
    "Los Angeles": [820, 780, 850, 900, 830, 870],
    "San Francisco": [880, 920, 870, 950, 910, 940],
    "Miami": [750, 800, 770, 820, 790, 810],
    "Chicago": [700, 680, 750, 720, 740, 760],
  };

  return months.map((month) => {
    const entry: Record<string, string | number> = { month };
    cityData.forEach((c) => {
      const base = patterns[c.city] || [800, 800, 800, 800, 800, 800];
      const idx = months.indexOf(month);
      // Scale based on filtered avgRevenue
      const scale = c.avgRevenue / 105;
      entry[c.city] = Math.round(base[idx] * scale);
    });
    return entry;
  });
};

const cityColors: Record<string, string> = {
  "New York": "hsl(var(--chart-seo))",
  "Los Angeles": "hsl(var(--chart-content))",
  "San Francisco": "hsl(var(--chart-email))",
  "Miami": "hsl(var(--chart-danger))",
  "Chicago": "hsl(var(--muted-foreground))",
};

const CityRevenueChart = ({ data }: CityRevenueChartProps) => {
  const trendData = generateMonthlyTrends(data);
  const cities = data.map((d) => d.city);

  return (
    <div className="dashboard-card p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground">Average Revenue by City ($)</h3>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
              domain={[0, 1200]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 11,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number, name: string) => [`$${value}`, name]}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            {cities.map((city) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={cityColors[city] || "hsl(var(--primary))"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CityRevenueChart;
