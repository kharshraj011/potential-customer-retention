export interface CustomerRecord {
  city: string;
  plan: string;
  monthlyRevenue: number;
  status: string;
  acquisitionChannel: string;
}

export const customers: CustomerRecord[] = [
  // Data will be aggregated from raw records below
];

// Raw aggregated data
export const cityRevenueData = [
  { city: "Chicago", avgRevenue: 108.29, totalRevenue: 22308, count: 206 },
  { city: "New York", avgRevenue: 106.59, totalRevenue: 20678, count: 194 },
  { city: "Miami", avgRevenue: 105.39, totalRevenue: 22658, count: 215 },
  { city: "Los Angeles", avgRevenue: 102.43, totalRevenue: 19768, count: 193 },
  { city: "San Francisco", avgRevenue: 100.09, totalRevenue: 19218, count: 192 },
];

export const channelRevenueData = [
  { channel: "SEO", revenue: 33087, percentage: 31.6, count: 310 },
  { channel: "Content Marketing", revenue: 36906, percentage: 35.3, count: 355 },
  { channel: "Email", revenue: 34637, percentage: 33.1, count: 335 },
];

export const monthlyRevenueByChannel = [
  { month: "Jan '24", SEO: 2650, "Content Marketing": 2800, Email: 2700 },
  { month: "Feb '24", SEO: 1800, "Content Marketing": 2100, Email: 2220 },
  { month: "Mar '24", SEO: 2900, "Content Marketing": 2700, Email: 2790 },
  { month: "Apr '24", SEO: 2100, "Content Marketing": 2300, Email: 2040 },
  { month: "May '24", SEO: 1850, "Content Marketing": 2200, Email: 2150 },
  { month: "Jun '24", SEO: 2400, "Content Marketing": 2600, Email: 2800 },
  { month: "Jul '24", SEO: 3100, "Content Marketing": 3200, Email: 3390 },
  { month: "Aug '24", SEO: 1700, "Content Marketing": 2100, Email: 2300 },
  { month: "Sep '24", SEO: 2400, "Content Marketing": 2600, Email: 2800 },
  { month: "Oct '24", SEO: 2500, "Content Marketing": 2660, Email: 2700 },
  { month: "Nov '24", SEO: 2800, "Content Marketing": 3010, Email: 3400 },
  { month: "Dec '24", SEO: 2300, "Content Marketing": 2500, Email: 2950 },
];

export const kpiData = {
  totalRevenue: 104630,
  growthPercent: 5.1,
  activeCustomers: 750,
  churnRate: 20.0,
  revenueLost: 20348,
  atRiskCustomers: 50,
  churnedCustomers: 200,
  mrr: 78663,
  mrrGrowthPercent: 3.2,
  cac: 145,
};

export const plans = ["Small", "Medium", "Large"] as const;
export const channels = ["SEO", "Content Marketing", "Email"] as const;
export const cities = ["Chicago", "New York", "Miami", "Los Angeles", "San Francisco"] as const;

export const insights = [
  { icon: "trending", text: "Revenue fluctuates month to month — seasonal patterns and campaign cycles drive variance." },
  { icon: "search", text: "SEO is the strongest scalable acquisition channel with highest long-term ROI potential." },
  { icon: "plan", text: "Medium plan drives the most revenue — opportunity to upsell to Large tier." },
  { icon: "alert", text: "Churn creates measurable revenue leakage — $20.3K monthly revenue at risk." },
];

// Filtered data helpers
export const getFilteredCityData = (channelFilter: string | null, planFilter: string | null) => {
  // Simulated filtering — in production this would query actual records
  // For demo, adjust values slightly based on filters
  if (!channelFilter && !planFilter) return cityRevenueData;

  const multipliers: Record<string, Record<string, number>> = {
    SEO: { Chicago: 0.95, "New York": 1.05, Miami: 0.98, "Los Angeles": 1.02, "San Francisco": 1.1 },
    "Content Marketing": { Chicago: 1.08, "New York": 0.95, Miami: 1.05, "Los Angeles": 0.92, "San Francisco": 0.98 },
    Email: { Chicago: 0.97, "New York": 1.0, Miami: 0.97, "Los Angeles": 1.06, "San Francisco": 0.92 },
  };

  const planMultipliers: Record<string, number> = { Small: 0.6, Medium: 1.0, Large: 1.4 };

  return cityRevenueData.map((c) => {
    let adj = c.avgRevenue;
    if (channelFilter && multipliers[channelFilter]) {
      adj *= multipliers[channelFilter][c.city] ?? 1;
    }
    if (planFilter && planMultipliers[planFilter]) {
      adj *= planMultipliers[planFilter];
    }
    return { ...c, avgRevenue: Math.round(adj * 100) / 100 };
  });
};

export const getFilteredMonthlyData = (channelFilter: string | null, planFilter: string | null) => {
  if (!channelFilter && !planFilter) return monthlyRevenueByChannel;

  const planScale: Record<string, number> = { Small: 0.85, Medium: 1.0, Large: 1.15 };

  return monthlyRevenueByChannel.map((m) => {
    const scale = planFilter ? (planScale[planFilter] ?? 1) : 1;
    if (channelFilter) {
      return {
        month: m.month,
        SEO: channelFilter === "SEO" ? Math.round(m.SEO * scale) : 0,
        "Content Marketing": channelFilter === "Content Marketing" ? Math.round(m["Content Marketing"] * scale) : 0,
        Email: channelFilter === "Email" ? Math.round(m.Email * scale) : 0,
      };
    }
    return {
      month: m.month,
      SEO: Math.round(m.SEO * scale),
      "Content Marketing": Math.round(m["Content Marketing"] * scale),
      Email: Math.round(m.Email * scale),
    };
  });
};

export const getFilteredKPIs = (channelFilter: string | null, planFilter: string | null) => {
  if (!channelFilter && !planFilter) return kpiData;

  let scale = 1;
  if (channelFilter) {
    const channelShares: Record<string, number> = { SEO: 0.316, "Content Marketing": 0.353, Email: 0.331 };
    scale *= (channelShares[channelFilter] ?? 1) * 3;
  }
  if (planFilter) {
    const planShares: Record<string, number> = { Small: 0.33, Medium: 0.337, Large: 0.333 };
    scale *= (planShares[planFilter] ?? 1) * 3;
  }

  return {
    ...kpiData,
    totalRevenue: Math.round(kpiData.totalRevenue * scale),
    mrr: Math.round(kpiData.mrr * scale),
    churnRate: Math.round(kpiData.churnRate * (channelFilter === "Email" ? 1.1 : channelFilter === "SEO" ? 0.85 : 1) * 10) / 10,
  };
};
