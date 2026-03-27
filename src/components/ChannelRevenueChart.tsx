import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { channelRevenueData } from "@/data/dashboardData";

const COLORS = [
  "hsl(var(--chart-seo))",
  "hsl(var(--chart-content))",
  "hsl(var(--chart-email))",
];

const ChannelRevenueChart = () => (
  <div className="dashboard-card p-6">
    <div className="mb-5">
      <h3 className="text-base font-semibold text-foreground">Revenue by Acquisition Channel</h3>
      <p className="text-xs text-muted-foreground mt-1">SEO delivers highest scalable revenue potential</p>
    </div>
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={channelRevenueData}
          layout="vertical"
          margin={{ top: 5, right: 30, bottom: 5, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fontSize: 12, fill: "hsl(var(--foreground))", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={130}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: 12,
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
          />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={36}>
            {channelRevenueData.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} opacity={index === 0 ? 1 : 0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 flex gap-4">
      {channelRevenueData.map((d, i) => (
        <div key={d.channel} className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
          <span>{d.channel}: {d.percentage}%</span>
        </div>
      ))}
    </div>
  </div>
);

export default ChannelRevenueChart;
