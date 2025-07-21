import { formatDate } from "@/lib/utils";
import type { DateRange } from "@/types/stock-analysis";

type StockDataResponse = Record<string, { date: string; value: number }[]>;
type StockDataPoint = { date: string; value: number };
class StockAnalysisService {
  private stockApiUrl =
    "https://polygon-api-worker.first-ai-deployment.workers.dev";

  async getStockData(
    tickers: string[],
    dateRange: DateRange
  ): Promise<StockDataResponse> {
    const results: StockDataResponse = {};

    for (const ticker of tickers) {
      const url = `${this.stockApiUrl}/?ticker=${ticker}&startDate=${formatDate(
        dateRange.from
      )}&endDate=${formatDate(dateRange.to)}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data for ${ticker}`);
      }

      const data: StockDataPoint[] = await res.json();
      results[ticker] = data;
    }

    return results;
  }
}

export const stockAnalysisService = new StockAnalysisService();
