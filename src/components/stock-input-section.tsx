import { useState } from "react";
import { CalendarIcon, TrendingUp, X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MultiSelect } from "@/components/ui/multi-select";
import type { Stock, DateRange } from "@/types/stock-analysis";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface StockInputSectionProps {
  selectedStocks: Stock[];
  dateRange: DateRange;
  onStocksChange: (stocks: Stock[]) => void;
  onDateRangeChange: (range: DateRange) => void;
  onGenerateReport?: () => void;
  isLoading?: boolean;
}

const AVAILABLE_STOCKS: Stock[] = [
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 145.32,
    change: 2.45,
    changePercent: 1.71,
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 298.75,
    change: -1.23,
    changePercent: -0.41,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 248.5,
    change: 5.67,
    changePercent: 2.33,
  },
  {
    symbol: "AAPL",
    name: "Apple",
    price: 189.25,
    change: 1.89,
    changePercent: 1.01,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    price: 142.18,
    change: -0.95,
    changePercent: -0.66,
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 378.85,
    change: 3.21,
    changePercent: 0.85,
  },
];

export function StockInputSection({
  selectedStocks,
  dateRange,
  onStocksChange,
  onDateRangeChange,

  isLoading,
}: StockInputSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [manualStock, setManualStock] = useState("");
  const [isAddingStock, setIsAddingStock] = useState(false);

  const stockOptions = AVAILABLE_STOCKS.map((stock) => ({
    value: stock.symbol,
    label: `${stock.symbol} - ${stock.name}`,
    stock,
  }));

  const handleStockSelect = (selectedValues: string[]) => {
    const stocks = selectedValues.map(
      (symbol) => AVAILABLE_STOCKS.find((stock) => stock.symbol === symbol)!
    );
    onStocksChange(stocks);
  };

  const handleDateSelect = (date: Date | undefined, type: "from" | "to") => {
    if (!date) return;

    onDateRangeChange({
      ...dateRange,
      [type]: date,
    });
  };

  const addManualStock = async () => {
    if (!manualStock.trim()) return;

    const symbol = manualStock.toUpperCase().trim();

    // Check if stock already exists
    if (selectedStocks.some((stock) => stock.symbol === symbol)) {
      setManualStock("");
      return; // Stock already selected
    }

    // Basic validation
    if (!/^[A-Z]{1,5}$/.test(symbol)) {
      setManualStock("");
      return; // Invalid symbol format
    }

    setIsAddingStock(true);

    // Simulate API call to get stock data
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newStock: Stock = {
        symbol,
        name: getStockName(symbol),
        price: Math.random() * 200 + 50, // Mock price
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
      };

      onStocksChange([...selectedStocks, newStock]);
      setManualStock("");
    } catch (error) {
      console.error("Failed to add stock:", error);
    } finally {
      setIsAddingStock(false);
    }
  };

  const getStockName = (symbol: string): string => {
    const stockNames: Record<string, string> = {
      AAPL: "Apple Inc.",
      GOOGL: "Alphabet Inc.",
      MSFT: "Microsoft Corporation",
      AMZN: "Amazon.com Inc.",
      TSLA: "Tesla Inc.",
      META: "Meta Platforms Inc.",
      NVDA: "NVIDIA Corporation",
      CRM: "Salesforce Inc.",
      NFLX: "Netflix Inc.",
      ADBE: "Adobe Inc.",
      PYPL: "PayPal Holdings Inc.",
      INTC: "Intel Corporation",
      AMD: "Advanced Micro Devices Inc.",
      ORCL: "Oracle Corporation",
      CSCO: "Cisco Systems Inc.",
      IBM: "International Business Machines Corp.",
      UBER: "Uber Technologies Inc.",
      LYFT: "Lyft Inc.",
      SNAP: "Snap Inc.",
      ZOOM: "Zoom Video Communications Inc.",
      SHOP: "Shopify Inc.",
      SQ: "Block Inc.",
      ROKU: "Roku Inc.",
      PINS: "Pinterest Inc.",
      DOCU: "DocuSign Inc.",
      ZM: "Zoom Video Communications Inc.",
      PLTR: "Palantir Technologies Inc.",
      SNOW: "Snowflake Inc.",
    };

    return stockNames[symbol] || `${symbol} Inc.`;
  };

  const removeStock = (symbolToRemove: string) => {
    onStocksChange(
      selectedStocks.filter((stock) => stock.symbol !== symbolToRemove)
    );
  };

  const isValidDateRange = () => {
    const diffTime = Math.abs(
      dateRange.to.getTime() - dateRange.from.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Stock Analysis Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stock Selection */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Select Stocks
          </label>

          {/* Multi-select dropdown */}
          <MultiSelect
            options={stockOptions}
            selected={selectedStocks.map((s) => s.symbol)}
            onChange={handleStockSelect}
            placeholder="Choose from popular stocks..."
            className="w-full"
          />

          {/* Manual stock input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter stock symbol (e.g., NVDA, CRM)"
              value={manualStock}
              onChange={(e) => setManualStock(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addManualStock()}
              className="flex-1 "
            />
            <Button
              onClick={addManualStock}
              disabled={!manualStock.trim() || isAddingStock}
              variant="outline"
              className="shrink-0 bg-transparent"
            >
              {isAddingStock ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Selected stocks display */}
          {selectedStocks.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Selected Stocks ({selectedStocks.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {stock.symbol}
                      </span>
                      <span className="text-xs opacity-75">
                        ${stock.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => removeStock(stock.symbol)}
                      className="ml-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              From Date
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from
                    ? format(dateRange.from, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="dark:text-slate-300"
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => handleDateSelect(date, "from")}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              To Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.to && "text-muted-foreground dark:text-slate-300"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  className="dark:text-slate-300"
                  selected={dateRange.to}
                  onSelect={(date) => handleDateSelect(date, "to")}
                  disabled={(date) =>
                    date > new Date() || date < dateRange.from
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {!isValidDateRange() && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Date range cannot exceed 3 days
          </p>
        )}

        {/* Generate Report Button */}
        <Button
          disabled={
            selectedStocks.length === 0 || !isValidDateRange() || isLoading
          }
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating Analysis...
            </>
          ) : (
            "Generate AI Report"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
