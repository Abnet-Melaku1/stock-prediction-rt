import type { DateRange, Stock } from "@/types/stock-analysis";
import { useState } from "react";

export function useStockAnalysis() {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  return {
    selectedStocks,
    dateRange,

    setSelectedStocks,
    setDateRange,
  };
}
