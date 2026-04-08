import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { YearDataPoint } from "../lib/compound";
import { formatCurrency } from "../lib/compound";

interface GrowthChartProps {
  data: YearDataPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: number;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const balance = payload.find((p) => p.name === "Balance")?.value ?? 0;
  const principal = payload.find((p) => p.name === "Principal")?.value ?? 0;
  const interest = balance - principal;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
        Year {label}
      </p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-6">
          <span className="text-blue-500">Balance</span>
          <span className="font-medium text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(balance)}
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Principal</span>
          <span className="font-medium text-slate-600 dark:text-slate-300 tabular-nums">
            {formatCurrency(principal)}
          </span>
        </div>
        <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1 flex justify-between gap-6">
          <span className="text-emerald-500">Interest earned</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatCurrency(interest)}
          </span>
        </div>
      </div>
    </div>
  );
}

function yAxisFormatter(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-700"
          vertical={false}
        />

        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "currentColor" }}
          className="text-slate-400 dark:text-slate-500"
          label={{
            value: "Years",
            position: "insideBottom",
            offset: -2,
            fontSize: 12,
            fill: "currentColor",
          }}
          height={36}
        />

        <YAxis
          tickFormatter={yAxisFormatter}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "currentColor" }}
          className="text-slate-400 dark:text-slate-500"
          width={64}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }}
        />

        {/* Principal baseline — rendered first so it's behind */}
        <Area
          type="monotone"
          dataKey="principal"
          name="Principal"
          stroke="#94A3B8"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="url(#principalGradient)"
          dot={false}
          activeDot={false}
        />

        {/* Balance — the growing curve */}
        <Area
          type="monotone"
          dataKey="balance"
          name="Balance"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#balanceGradient)"
          dot={false}
          activeDot={{
            r: 5,
            strokeWidth: 2,
            stroke: "#3B82F6",
            fill: "#fff",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
