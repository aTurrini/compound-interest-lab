import { describe, it, expect } from "vitest";
import {
  compoundBalance,
  calculateCompoundInterest,
  formatCurrency,
  formatGrowthRatio,
} from "./compound";

describe("compoundBalance", () => {
  it("returns principal when years is 0", () => {
    expect(compoundBalance(10000, 7, 0, 12)).toBe(10000);
  });

  it("calculates annually compounded interest correctly", () => {
    // 10000 at 10% annually for 1 year = 11000
    expect(compoundBalance(10000, 10, 1, 1)).toBeCloseTo(11000, 2);
  });

  it("calculates monthly compounded interest correctly", () => {
    // 10000 at 12% monthly for 1 year ≈ 11268.25
    expect(compoundBalance(10000, 12, 1, 12)).toBeCloseTo(11268.25, 1);
  });

  it("produces higher balance with more frequent compounding", () => {
    const annually = compoundBalance(10000, 5, 10, 1);
    const monthly = compoundBalance(10000, 5, 10, 12);
    const daily = compoundBalance(10000, 5, 10, 365);
    expect(monthly).toBeGreaterThan(annually);
    expect(daily).toBeGreaterThan(monthly);
  });

  it("handles zero interest rate — balance equals principal", () => {
    expect(compoundBalance(5000, 0, 20, 12)).toBeCloseTo(5000, 2);
  });
});

describe("calculateCompoundInterest", () => {
  it("returns year 0 data point equal to principal", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 7,
      years: 10,
      frequency: "monthly",
    });
    expect(result.dataPoints[0].year).toBe(0);
    expect(result.dataPoints[0].balance).toBe(10000);
    expect(result.dataPoints[0].interest).toBe(0);
  });

  it("returns correct number of data points (years + 1 including year 0)", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 7,
      years: 10,
      frequency: "annually",
    });
    expect(result.dataPoints).toHaveLength(11);
  });

  it("final balance matches last data point", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 7,
      years: 20,
      frequency: "monthly",
    });
    const lastPoint = result.dataPoints[result.dataPoints.length - 1];
    expect(result.finalBalance).toBe(lastPoint.balance);
  });

  it("totalInterest = finalBalance - principal", () => {
    const result = calculateCompoundInterest({
      principal: 5000,
      annualRate: 8,
      years: 15,
      frequency: "quarterly",
    });
    expect(result.totalInterest).toBeCloseTo(
      result.finalBalance - 5000,
      1
    );
  });

  it("interestRatio = totalInterest / principal", () => {
    const result = calculateCompoundInterest({
      principal: 10000,
      annualRate: 7,
      years: 10,
      frequency: "annually",
    });
    expect(result.interestRatio).toBeCloseTo(
      result.totalInterest / 10000,
      2
    );
  });

  it("all frequencies produce increasing balances over time", () => {
    const frequencies = ["annually", "quarterly", "monthly", "daily"] as const;
    frequencies.forEach((frequency) => {
      const result = calculateCompoundInterest({
        principal: 10000,
        annualRate: 5,
        years: 10,
        frequency,
      });
      for (let i = 1; i < result.dataPoints.length; i++) {
        expect(result.dataPoints[i].balance).toBeGreaterThan(
          result.dataPoints[i - 1].balance
        );
      }
    });
  });
});

describe("formatCurrency", () => {
  it("formats whole numbers as USD currency", () => {
    expect(formatCurrency(10000)).toBe("$10,000");
  });

  it("rounds to nearest dollar", () => {
    expect(formatCurrency(10000.75)).toBe("$10,001");
  });

  it("handles large numbers with commas", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000");
  });
});

describe("formatGrowthRatio", () => {
  it("formats ratio as percentage with plus sign", () => {
    expect(formatGrowthRatio(1.43)).toBe("+143%");
  });

  it("handles zero growth", () => {
    expect(formatGrowthRatio(0)).toBe("+0%");
  });

  it("rounds to nearest percent", () => {
    expect(formatGrowthRatio(0.567)).toBe("+57%");
  });
});
