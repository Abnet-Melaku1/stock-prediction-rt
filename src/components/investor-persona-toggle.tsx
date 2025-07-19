import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { InvestorPersona } from "@/types/stock-analysis";
import { GraduationCap, TrendingUp, Target } from "lucide-react";

interface InvestorPersonaToggleProps {
  activePersona: InvestorPersona;
  onPersonaChange: (persona: InvestorPersona) => void;
}

const personas = [
  {
    id: "beginner" as InvestorPersona,
    label: "Beginner",
    icon: GraduationCap,
    description: "Simple explanations and basic metrics",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "active-trader" as InvestorPersona,
    label: "Active Trader",
    icon: TrendingUp,
    description: "Technical analysis and short-term signals",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "value-investor" as InvestorPersona,
    label: "Value Investor",
    icon: Target,
    description: "Fundamental analysis and long-term outlook",
    color: "from-purple-500 to-pink-500",
  },
];

export function InvestorPersonaToggle({
  activePersona,
  onPersonaChange,
}: InvestorPersonaToggleProps) {
  return (
    <Card className="rounded-2xl  shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-colors duration-300">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Choose Your Investor Profile
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Customize analysis tone and metrics based on your experience level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = activePersona === persona.id;

            return (
              <motion.div
                key={persona.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`w-full cursor-pointer h-auto p-4 flex flex-col items-center space-y-3 relative overflow-hidden transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${persona.color} text-white border-0 shadow-lg`
                      : "hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                  }`}
                  onClick={() => onPersonaChange(persona.id)}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  />
                  <div className="text-center">
                    <div
                      className={`font-medium ${
                        isActive
                          ? "text-white"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {persona.label}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isActive
                          ? "text-white/90"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {persona.description}
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
