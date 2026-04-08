export type CompoundFrequency = "annually" | "quarterly" | "monthly" | "daily";

export interface CompoundParams {
  principal: number;
  annualRate: number; // as percentage, e.g. 7 for 7%
  years: number;
  frequency: CompoundFrequency;
}

export interface YearDataPoint {
  year: number;
  balance: number;
  principal: number;
  interest: number;
}

export interface CompoundResult {
  finalBalance: number;
  totalInterest: number;
  interestRatio: number; // interest / principal
  dataPoints: YearDataPoint[];
}

const FREQUENCY_MAP: Record<CompoundFrequency, number> = {
  annually: 1,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

/**
 * Calculates compound interest using the standard formula:
 * A = P * (1 + r/n)^(n*t)
 *
 * @param principal - Initial investment amount
 * @param annualRate - Annual interest rate as a percentage (e.g. 7 for 7%)
 * @param years - Investment duration in years
 * @param n - Compounding frequency per year
 */
export function compoundBalance(
  principal: number,
  annualRate: number,
  years: number,
  n: number
): number {
  const r = annualRate / 100;
  return principal * Math.pow(1 + r / n, n * years);
}

/**
 * Generates year-by-year data points for charting.
 * Always includes year 0 (initial principal) as the baseline.
 */
export function calculateCompoundInterest(
  params: CompoundParams
): CompoundResult {
  const { principal, annualRate, years, frequency } = params;
  const n = FREQUENCY_MAP[frequency];

  const dataPoints: YearDataPoint[] = [];

  for (let year = 0; year <= years; year++) {
    const balance =
      year === 0
        ? principal
        : compoundBalance(principal, annualRate, year, n);

    dataPoints.push({
      year,
      balance: Math.round(balance * 100) / 100,
      principal,
      interest: Math.round((balance - principal) * 100) / 100,
    });
  }

  const finalBalance = dataPoints[dataPoints.length - 1].balance;
  const totalInterest = Math.round((finalBalance - principal) * 100) / 100;
  const interestRatio = Math.round((totalInterest / principal) * 1000) / 1000;

  return {
    finalBalance,
    totalInterest,
    interestRatio,
    dataPoints,
  };
}

/**
 * Formats a number as a currency string (USD).
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a ratio as a percentage string, e.g. 1.43 → "+143%"
 */
export function formatGrowthRatio(ratio: number): string {
  return `+${Math.round(ratio * 100)}%`;
}
