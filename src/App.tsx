import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { CompoundFrequency } from "./lib/compound";
import {
  calculateCompoundInterest,
  formatCurrency,
  formatGrowthRatio,
} from "./lib/compound";
import { SliderInput } from "./components/SliderInput";
import { SummaryCard } from "./components/SummaryCard";
import { GrowthChart } from "./components/GrowthChart";

const FREQUENCY_OPTIONS: { value: CompoundFrequency; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
  { value: "daily", label: "Daily" },
];

export default function App() {
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");

  const result = useMemo(
    () =>
      calculateCompoundInterest({ principal, annualRate, years, frequency }),
    [principal, annualRate, years, frequency]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Compound Interest
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Watch your money grow over time
            </p>
          </div>
          <a
            href="https://github.com/aTurrini/compound-interest-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="View source on GitHub"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View source
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Summary cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SummaryCard
            label="Final balance"
            value={formatCurrency(result.finalBalance)}
            subValue={`after ${years} year${years !== 1 ? "s" : ""}`}
            accent="blue"
          />
          <SummaryCard
            label="Interest earned"
            value={formatCurrency(result.totalInterest)}
            subValue={`on ${formatCurrency(principal)} invested`}
            accent="emerald"
          />
          <SummaryCard
            label="Total growth"
            value={formatGrowthRatio(result.interestRatio)}
            subValue={`${frequency} compounding`}
            accent="violet"
          />
        </motion.div>

        {/* Chart */}
        <motion.div
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Balance growth over time
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              The gap between the curves is the interest you've earned
            </p>
          </div>
          <GrowthChart data={result.dataPoints} />
        </motion.div>

        {/* Controls */}
        <motion.div
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6">
            Adjust the parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SliderInput
              label="Initial principal"
              value={principal}
              min={1000}
              max={100000}
              step={500}
              format={(v) => formatCurrency(v)}
              onChange={setPrincipal}
            />
            <SliderInput
              label="Annual interest rate"
              value={annualRate}
              min={0.5}
              max={20}
              step={0.5}
              format={(v) => `${v}%`}
              onChange={setAnnualRate}
            />
            <SliderInput
              label="Time horizon"
              value={years}
              min={1}
              max={40}
              step={1}
              format={(v) => `${v} yr${v !== 1 ? "s" : ""}`}
              onChange={setYears}
            />

            {/* Frequency selector */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Compound frequency
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FREQUENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFrequency(opt.value)}
                    className={`
                      rounded-lg py-2 px-3 text-sm font-medium transition-all
                      ${
                        frequency === opt.value
                          ? "bg-blue-500 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }
                    `}
                    aria-pressed={frequency === opt.value}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Explainer */}
        <motion.div
          className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30 p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
            How compound interest works
          </h2>
          <p className="text-sm text-blue-600/80 dark:text-blue-300/70 leading-relaxed">
            Unlike simple interest (which applies only to your principal), compound
            interest is calculated on both your initial deposit and the interest
            already earned. The formula is{" "}
            <span className="font-mono font-medium">
              A = P(1 + r/n)^(nt)
            </span>{" "}
            — where <span className="font-mono">P</span> is principal,{" "}
            <span className="font-mono">r</span> is the annual rate,{" "}
            <span className="font-mono">n</span> is the compounding frequency per
            year, and <span className="font-mono">t</span> is time in years. The
            more frequently interest compounds, the faster the gap between the two
            curves above widens.
          </p>
        </motion.div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>compound-interest-lab</span>
          <span>For illustrative purposes only — not financial advice</span>
        </div>
      </footer>
    </div>
  );
}
