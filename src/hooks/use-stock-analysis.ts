import { useState } from "react";
import type { DateRange, Stock } from "@/types/stock-analysis";
import {
  getStockName,
  isValidStockSymbol,
  isValidDateRange,
} from "@/lib/stock-utils"; // You can extract these to a util
import { AVAILABLE_STOCKS } from "@/constants";

export function useStockAnalysis() {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [manualStock, setManualStock] = useState("");
  const [isAddingStock, setIsAddingStock] = useState(false);

  const handleStockSelect = (selectedSymbols: string[]) => {
    const stocks = selectedSymbols
      .map((symbol) =>
        AVAILABLE_STOCKS.find((stock) => stock.symbol === symbol)
      )
      .filter((stock): stock is Stock => !!stock);

    setSelectedStocks(stocks);
  };

  const handleDateSelect = (date: Date | undefined, type: "from" | "to") => {
    if (!date) return;
    setDateRange((prev) => ({ ...prev, [type]: date }));
  };

  const addManualStock = async () => {
    const symbol = manualStock.trim().toUpperCase();
    if (!symbol || selectedStocks.some((s) => s.symbol === symbol)) return;
    if (!isValidStockSymbol(symbol)) return;

    setIsAddingStock(true);

    console.log("Symbol ", symbol);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate API
      const stock: Stock = {
        symbol,
        name: getStockName(symbol),
      };

      setSelectedStocks((prev) => [...prev, stock]);
    } finally {
      setManualStock("");
      setIsAddingStock(false);
    }
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks((prev) => prev.filter((s) => s.symbol !== symbol));
  };

  return {
    selectedStocks,
    setSelectedStocks,
    dateRange,
    setDateRange,
    handleStockSelect,
    handleDateSelect,
    addManualStock,
    removeStock,
    manualStock,
    setManualStock,
    isAddingStock,
    isLoading,
    setIsLoading,

    isValidDateRange: () => isValidDateRange(dateRange.from, dateRange.to),
  };
}
