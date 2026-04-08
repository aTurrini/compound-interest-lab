import { motion, AnimatePresence } from "framer-motion";

interface SummaryCardProps {
  label: string;
  value: string;
  subValue?: string;
  accent?: "blue" | "emerald" | "violet";
}

const ACCENT_CLASSES = {
  blue: {
    border: "border-blue-500/30 dark:border-blue-400/30",
    label: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  emerald: {
    border: "border-emerald-500/30 dark:border-emerald-400/30",
    label: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  violet: {
    border: "border-violet-500/30 dark:border-violet-400/30",
    label: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};

export function SummaryCard({
  label,
  value,
  subValue,
  accent = "blue",
}: SummaryCardProps) {
  const classes = ACCENT_CLASSES[accent];

  return (
    <div
      className={`
        relative flex flex-col gap-1 rounded-2xl border bg-white dark:bg-slate-800/60
        p-5 shadow-sm backdrop-blur-sm
        ${classes.border}
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-1.5 h-1.5 rounded-full ${classes.dot}`} />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${classes.label}`}
        >
          {label}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums"
        >
          {value}
        </motion.div>
      </AnimatePresence>

      {subValue && (
        <AnimatePresence mode="wait">
          <motion.div
            key={subValue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-slate-500 dark:text-slate-400 tabular-nums"
          >
            {subValue}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
