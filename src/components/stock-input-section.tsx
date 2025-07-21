import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AVAILABLE_STOCKS } from "@/constants/index";
import { useStockAnalysis } from "@/hooks/use-stock-analysis";
import { isValidDateRange } from "@/lib/stock-utils";
import { cn } from "@/lib/utils";
import { stockAnalysisService } from "@/services/stock-analysis-service";
import { format } from "date-fns";
import { CalendarIcon, Plus, TrendingUp, X } from "lucide-react";
import { useState } from "react";

export type StockInputSectionProps = ReturnType<typeof useStockAnalysis>;

export function StockInputSection({
  selectedStocks,
  dateRange,

  handleStockSelect,
  handleDateSelect,
  manualStock,
  setManualStock,
  addManualStock,
  removeStock,
  isLoading,
  setIsLoading,
  isAddingStock,
}: StockInputSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const stockOptions = AVAILABLE_STOCKS.map((stock) => ({
    value: stock.symbol,
    label: `${stock.symbol} - ${stock.name}`,
    stock,
  }));

  const generateStockData = async () => {
    if (
      !isValidDateRange(dateRange.from, dateRange.to) ||
      selectedStocks.length === 0
    )
      return;

    try {
      setIsLoading(true);

      const tickers = selectedStocks.map((s) => s.symbol);
      const data = await stockAnalysisService.getStockData(tickers, dateRange);

      console.log("Fetched stock data:", data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setIsLoading(false);
    }
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
              className="shrink-0 bg-transparent cursor-pointer disabled:cursor-alias"
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

        {!isValidDateRange(dateRange.from, dateRange.to) && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Date range cannot exceed 3 days
          </p>
        )}

        {/* Generate Report Button */}
        <Button
          disabled={
            selectedStocks.length === 0 ||
            !isValidDateRange(dateRange.from, dateRange.to) ||
            isLoading
          }
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl"
          size="lg"
          onClick={generateStockData}
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
