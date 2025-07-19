import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./components/header";
import { InvestorPersonaToggle } from "./components/investor-persona-toggle";
import { StockInputSection } from "./components/stock-input-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useStockAnalysis } from "./hooks/use-stock-analysis";
import type { InvestorPersona } from "./types/stock-analysis";
const App = () => {
  const [activePersona, setActivePersona] =
    useState<InvestorPersona>("beginner");
  const {
    selectedStocks,
    dateRange,

    setSelectedStocks,
    setDateRange,
  } = useStockAnalysis();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome to Smart Stock Analysis
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Get AI-powered insights for smarter investment decisions
          </p>
        </motion.div>
        {/* Investor Persona Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <InvestorPersonaToggle
            activePersona={activePersona}
            onPersonaChange={setActivePersona}
          />
        </motion.div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger
              value="analysis"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Compare
            </TabsTrigger>
            <TabsTrigger
              value="watchlist"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Watchlist
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
            >
              Portfolio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Stock Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StockInputSection
                selectedStocks={selectedStocks}
                dateRange={dateRange}
                onStocksChange={setSelectedStocks}
                onDateRangeChange={setDateRange}
              />
            </motion.div>

            {/* Results Section */}
          </TabsContent>

          <TabsContent value="comparison">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>comparison</h1>
            </motion.div>
          </TabsContent>

          <TabsContent value="watchlist">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>watchlist</h1>
            </motion.div>
          </TabsContent>

          <TabsContent value="alerts">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>Alerts</h1>
            </motion.div>
          </TabsContent>

          <TabsContent value="portfolio">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>Portfolio</h1>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
