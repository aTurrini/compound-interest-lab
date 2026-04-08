# Contributing to compound-interest-lab

Thank you for taking the time to contribute. This is a portfolio project built
to demonstrate senior-level engineering practices — contributions that uphold
that standard are very welcome.

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 9+
- Git

### Local setup

```bash
git clone https://github.com/YOUR_USERNAME/compound-interest-lab.git
cd compound-interest-lab
npm install
npm run dev
```

The app runs at `http://localhost:5173/compound-interest-lab/`.

### Run the tests

```bash
npm test
```

All 16 tests must pass before submitting a pull request.

---

## Project structure

```
src/
├── lib/
│   ├── compound.ts          # Pure math — no React dependency
│   └── compound.test.ts     # Unit tests (Vitest)
├── components/
│   ├── SliderInput.tsx      # Accessible labelled slider
│   ├── SummaryCard.tsx      # Animated metric card (Framer Motion)
│   └── GrowthChart.tsx      # Recharts area chart
├── App.tsx                  # Root layout and state
└── index.css                # Tailwind v4 entry point
```

---

## How to contribute

### Reporting a bug

Open an issue using the **Bug report** template. Include:
- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Browser and OS

### Suggesting a feature

Open an issue using the **Feature request** template. Describe the use case
clearly — what problem does it solve and for whom?

### Submitting a pull request

1. Fork the repo and create a branch from `main`
2. Use the branch naming convention: `feat/short-description` or `fix/short-description`
3. Write or update tests for any logic changes in `src/lib/`
4. Ensure `npm test` passes with no failures
5. Ensure `npm run build` completes without TypeScript errors
6. Open a PR against `main` — the PR template will guide you through the checklist

---

## Code standards

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add inflation-adjusted return toggle
fix: correct daily compounding boundary at year 0
docs: update README with new screenshot
chore: upgrade recharts to v3
refactor: extract formatting helpers from App.tsx
```

### TypeScript

- Strict mode is enabled — no `any` types
- All exported functions must have explicit return types
- Interfaces over type aliases for object shapes

### Math and financial logic

All financial calculations live exclusively in `src/lib/compound.ts`.
This module has zero React dependencies and must remain fully unit-testable
in isolation. If you add a new calculation, add a corresponding test in
`compound.test.ts` first (test-driven).

### Styling

Tailwind CSS v4 utility classes only. No inline styles, no CSS modules,
no additional CSS files. Dark mode is handled via the `dark:` variant —
every UI element must be visually correct in both light and dark mode.

### Accessibility

- All interactive elements must be keyboard-navigable
- ARIA attributes required on custom controls (see `SliderInput.tsx` for reference)
- Colour contrast must meet WCAG AA minimum

---

## What we won't merge

- Changes that break the `$0/month` cost constraint
- Additional runtime dependencies without strong justification
- Logic that duplicates or bypasses `src/lib/compound.ts`
- Hardcoded secrets, API keys, or environment-specific values
- Removing or weakening existing unit tests

---

## Licence

By contributing, you agree that your contributions will be licenced under
the MIT Licence that covers this project.
