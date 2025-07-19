export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface AnalysisResults {
  report: string;
  sentiment: "bullish" | "neutral" | "bearish";
  riskLevel: "low" | "medium" | "high";
  forecast: "uptrend" | "downtrend" | "volatile";
  priceChart: ChartData[];
  sentimentChart: ChartData[];
  summary: string;
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

export type InvestorPersona = "beginner" | "active-trader" | "value-investor";

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  targetPrice?: number;
  autoReport: boolean;
  addedAt: Date;
}

export interface Alert {
  id: string;
  symbol: string;
  condition: string;
  price: number;
  sentiment?: "bullish" | "neutral" | "bearish";
  isActive: boolean;
  createdAt: Date;
}

export interface PortfolioAllocation {
  symbol: string;
  percentage: number;
  amount: number;
}
