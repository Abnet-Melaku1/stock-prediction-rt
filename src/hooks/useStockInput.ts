import { useState } from "react";
import { Stock } from "@/types/stock-analysis";
import { getStockName, isValidStockSymbol } from "@/lib/stock-utils";

export function useStockInput(initial: Stock[] = []) {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>(initial);
  const [isAddingStock, setIsAddingStock] = useState(false);

  const addStock = async (symbol: string) => {
    if (!symbol.trim()) return;
    symbol = symbol.toUpperCase();

    if (selectedStocks.some((s) => s.symbol === symbol)) return;
    if (!isValidStockSymbol(symbol)) return;

    setIsAddingStock(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newStock: Stock = {
        symbol,
        name: getStockName(symbol),
      };

      setSelectedStocks([...selectedStocks, newStock]);
    } finally {
      setIsAddingStock(false);
    }
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter((s) => s.symbol !== symbol));
  };

  return {
    selectedStocks,
    setSelectedStocks,
    addStock,
    removeStock,
    isAddingStock,
  };
}
