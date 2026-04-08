# compound-interest-lab

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/compound-interest-lab/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/compound-interest-lab/actions/workflows/deploy.yml)
[![Tests](https://github.com/YOUR_USERNAME/compound-interest-lab/actions/workflows/deploy.yml/badge.svg?label=tests)](https://github.com/YOUR_USERNAME/compound-interest-lab/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**[→ Live demo](https://YOUR_USERNAME.github.io/compound-interest-lab/)**

An interactive compound interest calculator demonstrating how money grows
over time. Move the sliders — the chart and summary cards update instantly.

---

## What it does

- **Four input controls** — principal, annual rate, time horizon, compounding
  frequency (annually / quarterly / monthly / daily)
- **Real-time area chart** — balance growth vs principal baseline; the gap
  between the two curves is the interest you've earned
- **Animated summary cards** — final balance, total interest earned, and total
  growth ratio; values animate on every change via Framer Motion
- **Dark mode** — follows system preference automatically
- **Fully accessible** — keyboard-navigable, ARIA-labelled controls, WCAG AA
  colour contrast throughout

---

## Architecture

```
src/
├── lib/
│   ├── compound.ts          # Pure math — A = P(1 + r/n)^(nt)
│   └── compound.test.ts     # 16 unit tests (Vitest)
├── components/
│   ├── SliderInput.tsx      # Accessible labelled slider
│   ├── SummaryCard.tsx      # Animated metric card (Framer Motion)
│   └── GrowthChart.tsx      # Recharts AreaChart with custom tooltip
└── App.tsx                  # Root layout, state, useMemo derivation
```

### Key decisions

**Math is isolated.** All financial logic lives in `src/lib/compound.ts` with
zero React dependency. It is independently testable and reusable.

**`useMemo` for derived data.** The chart dataset and summary values are derived
from slider state via `useMemo` — they recalculate only when inputs change, never
on unrelated re-renders.

**Static SPA, no backend.** All computation runs in the browser. The deployment
target is GitHub Pages — $0/month, no cold starts, permanent URL.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript | Type safety on financial math |
| Framework | React 19 + Vite | Fast dev loop, modern standard |
| Charts | Recharts | React-native, composable |
| Animation | Framer Motion | Declarative value transitions |
| Styling | Tailwind CSS v4 | Utility-first, dark mode built-in |
| Testing | Vitest | Native Vite integration |
| Hosting | GitHub Pages | $0, permanent URL, no ops |
| CI/CD | GitHub Actions | Deploy on push to main |

**Cost: $0/month.**

---

## Quickstart

### Prerequisites

- Node.js 20+
- npm 9+

### Run locally

```bash
git clone https://github.com/YOUR_USERNAME/compound-interest-lab.git
cd compound-interest-lab
npm install
npm run dev
```

Open `http://localhost:5173/compound-interest-lab/`

### Run the tests

```bash
npm test
```

16 tests across `compoundBalance`, `calculateCompoundInterest`,
`formatCurrency`, and `formatGrowthRatio`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. The GitHub Actions workflow runs this automatically
on every push to `main` and deploys to GitHub Pages.

---

## How compound interest works

The standard formula:

```
A = P × (1 + r/n)^(n×t)
```

Where:
- `P` — principal (initial investment)
- `r` — annual interest rate as a decimal
- `n` — number of times interest compounds per year
- `t` — time in years
- `A` — final balance

The more frequently interest compounds, the faster the balance grows — the
gap between the two chart curves widens with higher frequency. Switch between
annually, quarterly, monthly, and daily to see the effect.

---

## Deployment

Every push to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which:

1. Runs `npm ci` and `npm run build`
2. Uploads the `dist/` folder as a GitHub Pages artifact
3. Deploys to `https://YOUR_USERNAME.github.io/compound-interest-lab/`

The full pipeline runs in approximately 60–90 seconds.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Licence

[MIT](LICENSE)
