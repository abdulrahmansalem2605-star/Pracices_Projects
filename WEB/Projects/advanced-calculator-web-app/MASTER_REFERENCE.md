# Advanced Calculator Pro — Master Reference Manual

> **Version:** 1.0  
> **Stack:** React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4 · Zustand 5  
> **Modes:** 9 · **Architecture:** Component-Driven · **State:** Centralized Store  
> **Build Target:** Single-file production bundle

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Design](#2-architecture--design)
3. [Technology Stack](#3-technology-stack)
4. [State Management — Zustand Store](#4-state-management--zustand-store)
5. [Calculation Engine — CalculationService](#5-calculation-engine--calculationservice)
6. [Calculator Modes](#6-calculator-modes)
   - 6.1 [Standard Mode](#61-standard-mode)
   - 6.2 [Scientific Mode](#62-scientific-mode)
   - 6.3 [Programmer Mode](#63-programmer-mode)
   - 6.4 [Financial Mode](#64-financial-mode)
   - 6.5 [Statistics Mode](#65-statistics-mode)
   - 6.6 [Matrix Mode](#66-matrix-mode)
   - 6.7 [Graphing Mode](#67-graphing-mode)
   - 6.8 [Utilities Mode](#68-utilities-mode)
   - 6.9 [Favorites Mode](#69-favorites-mode)
7. [Shared Components](#7-shared-components)
8. [Panel Systems — History & Memory](#8-panel-systems--history--memory)
9. [Theme & Visual Design System](#9-theme--visual-design-system)
10. [Keyboard Input System](#10-keyboard-input-system)
11. [Build & Development](#11-build--development)

---

## 1. Project Overview

**Advanced Calculator Pro** is a production-grade, multi-mode calculator web application providing nine distinct calculation contexts — Standard, Scientific, Programmer, Financial, Statistics, Matrix, Graphing, Utilities, and Favorites — within a single unified interface.

The application targets both general-purpose and domain-specific computation, combining:

- A centralized Zustand state store managing all cross-mode state (display, expression, history, memory, undo/redo, graph functions, favorites, matrix data).
- A dedicated calculation service (`CalculationService.ts`) containing all mathematical, statistical, financial, matrix, and utility logic, built on top of the `mathjs` library.
- A component-per-mode architecture where each calculator mode is an isolated React component consuming the shared store.
- A dark/light theme system with mode-specific color accents and animated background gradients.
- Full keyboard support with `Ctrl+Z` / `Ctrl+Y` undo/redo, `Enter` for evaluation, and `Esc` for clear.

The application is designed as a single-file build via `vite-plugin-singlefile`, producing a self-contained HTML bundle.

---

## 2. Architecture & Design

### 2.1 Structural Layout

```
index.html                          — Entry point, loads /src/main.tsx
src/
├── main.tsx                        — React 19 StrictMode bootstrap
├── App.tsx                         — Root layout: header, mode tabs, content, side panel
├── index.css                       — Tailwind import + custom scrollbar utilities
├── store/
│   └── calculatorStore.ts          — Zustand store: all application state
├── services/
│   └── CalculationService.ts       — Pure functions: math, stats, finance, matrix, utils
├── utils/
│   └── cn.ts                       — Tailwind class merge utility (clsx + tailwind-merge)
└── components/
    ├── ResultBox.tsx               — Display/expression readout with copy-to-clipboard
    ├── CalcButton.tsx              — Reusable button with 9 visual variants
    ├── StandardMode.tsx            — Standard arithmetic calculator
    ├── ScientificMode.tsx          — Trig, logarithmic, power, factorial functions
    ├── ProgrammerMode.tsx          — Base conversion, bitwise operations
    ├── FinancialMode.tsx           — Interest, loan, VAT, investment calculations
    ├── StatisticsMode.tsx          — Descriptive stats, probability, distribution chart
    ├── MatrixMode.tsx              — Matrix operations with dynamic sizing
    ├── GraphingMode.tsx            — Multi-function graphing with recharts
    ├── UtilitiesMode.tsx           — JSON, hash, Base64, unit, base converters
    ├── FavoritesMode.tsx           — Saved expressions + formula library
    ├── HistoryPanel.tsx            — Collapsible history with CSV/TXT export
    └── MemoryPanel.tsx             — Memory store/recall interface
```

### 2.2 Data Flow

```
User Input (click/keyboard)
    │
    ▼
CalcButton / Mode Component
    │
    ├──▶ calculatorStore.appendToExpression()   → updates expression & display
    ├──▶ calculatorStore.evaluate()             → delegates to CalculationService
    ├──▶ calculatorStore.addHistory()           → records to history stack
    └──▶ calculatorStore.pushUndoStack()        → saves state for undo
                                                    │
                                                    ▼
                                            ResultBox re-renders
                                            HistoryPanel re-renders
                                            MemoryPanel re-renders
```

### 2.3 Mode Switching

`App.tsx` defines a `MODES` array mapping each `CalcMode` key to a label, icon, color, and short label. The active mode is stored in `calculatorStore.mode`. Switching modes resets `display`, `expression`, `isError`, and `justEvaluated` via the `setMode` action. The `ModeContent` component conditionally renders the appropriate mode component using a switch statement.

The `showResultBox()` function gates whether the `ResultBox` is displayed — active for `standard`, `scientific`, `programmer`, and `favorites` modes, and hidden for form-based modes (`financial`, `statistics`, `matrix`, `graphing`, `utilities`) that manage their own result display.

---

## 3. Technology Stack

### 3.1 Core Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| `react` | 19.2.3 | UI framework |
| `react-dom` | 19.2.3 | DOM rendering |
| `zustand` | 5.0.12 | State management |
| `mathjs` | 15.1.1 | Expression parsing & evaluation |
| `fraction.js` | 5.3.4 | Exact fractional arithmetic |
| `recharts` | 3.8.1 | Charts (statistics distribution, graphing) |
| `lucide-react` | 1.7.0 | Icon library |
| `react-draggable` | 4.5.0 | Draggable UI elements |
| `clsx` | 2.1.1 | Conditional class joining |
| `tailwind-merge` | 3.4.0 | Intelligent Tailwind class merging |

### 3.2 Dev Dependencies

| Dependency | Purpose |
|---|---|
| `vite` 7.2.4 | Build tool & dev server |
| `@vitejs/plugin-react` 5.1.1 | React Fast Refresh |
| `tailwindcss` 4.1.17 | Utility-first CSS |
| `@tailwindcss/vite` 4.1.17 | Tailwind Vite integration |
| `typescript` 5.9.3 | Type checking |
| `vite-plugin-singlefile` 2.3.0 | Single-file production build |
| `@types/node` 22.x | Node.js type definitions |

### 3.3 TypeScript Configuration

- **Target:** ES2020
- **Module Resolution:** Bundler mode
- **Strict mode:** Enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **Path aliases:** `@/*` maps to `src/*`
- **JSX transform:** `react-jsx` (automatic runtime)

### 3.4 Vite Configuration

```ts
plugins: [react(), tailwindcss(), viteSingleFile()],
resolve: {
  alias: { "@": path.resolve(__dirname, "src") },
}
```

The `viteSingleFile()` plugin inlines all JS, CSS, and assets into a single HTML file for deployment without external dependencies.

---

## 4. State Management — Zustand Store

**File:** `src/store/calculatorStore.ts`

### 4.1 Type Definitions

```ts
type CalcMode = 'standard' | 'scientific' | 'programmer' | 'financial'
             | 'statistics' | 'matrix' | 'graphing' | 'utilities' | 'favorites';

type Theme = 'dark' | 'light';
type ProgrammerBase = 'DEC' | 'HEX' | 'OCT' | 'BIN';

interface HistoryEntry {
  id: string;              // Timestamp + random suffix
  timestamp: Date;
  mode: CalcMode;
  expression: string;
  result: string;
  isError: boolean;
}

interface MemoryState { value: number; hasValue: boolean; }
interface MatrixData { rows: number; cols: number; data: number[][]; }
interface FavoriteItem { id: string; label: string; expression: string; mode: CalcMode; }
interface GraphFunction { id: string; expression: string; color: string; visible: boolean; }
```

### 4.2 State Shape

| Field | Type | Purpose |
|---|---|---|
| `mode` | `CalcMode` | Active calculator mode |
| `theme` | `Theme` | Dark or light mode |
| `display` | `string` | Current display value |
| `expression` | `string` | Current expression string |
| `previousResult` | `string` | Last evaluation result |
| `history` | `HistoryEntry[]` | Capped at 200 entries |
| `memory` | `MemoryState` | Single-value memory register |
| `programmerBase` | `ProgrammerBase` | Active number base |
| `angleUnit` | `'DEG' \| 'RAD'` | Trigonometric angle mode |
| `matrixA` / `matrixB` | `MatrixData` | Matrix operands |
| `favorites` | `FavoriteItem[]` | User-saved expressions |
| `graphFunctions` | `GraphFunction[]` | Graphing functions (7 colors) |
| `undoStack` / `redoStack` | `{ display, expression }[]` | Undo/redo (max 50) |
| `historyOpen` / `memoryOpen` / `favoritesOpen` | `boolean` | Panel visibility |
| `isError` / `justEvaluated` | `boolean` | Display state flags |

### 4.3 Key Actions

**Expression Management:**
- `appendToExpression(val)` — Appends to expression with decimal deduplication, auto-prepending `0.` when the expression starts with `.`, and clearing expression when appending digits after evaluation.
- `clearAll()` — Resets display to `'0'`, clears expression, saves to undo stack.
- `clearEntry()` — Same as clearAll but preserves undo continuity.
- `backspace()` — Removes last character.

**Memory Operations:**
- `memoryStore()` — Stores current display value.
- `memoryAdd()` / `memorySub()` — Adds/subtracts from stored value.
- `memoryRecall()` — Appends stored value to expression.
- `memoryClear()` — Resets memory.

**Undo/Redo:**
- `pushUndoStack()` — Pushes current state, capped at 50 entries.
- `undo()` / `redo()` — Swaps state between undo and redo stacks.

**History:**
- `addHistory(entry)` — Prepends entry with auto-generated ID (timestamp + random string), capped at 200 entries.
- `clearHistory()` — Empties history array.

**Graph Functions:**
- `addGraphFunction(expr)` — Assigns color from `GRAPH_COLORS` array cyclically.
- `removeGraphFunction(id)` / `toggleGraphFunction(id)` / `updateGraphFunction(id, expr)` — CRUD operations.

**Favorites:**
- `addFavorite(item)` / `removeFavorite(id)` — CRUD with auto-generated IDs.

---

## 5. Calculation Engine — CalculationService

**File:** `src/services/CalculationService.ts`

This file contains all pure computation logic, organized into domain-specific function groups. It uses `mathjs` for expression evaluation, configured with `math.create(math.all)` for full feature access.

### 5.1 Core Expression Evaluation

```ts
function evaluateExpression(expr: string, angleUnit: AngleUnit = 'DEG'): string
```

**Preprocessing pipeline:**
1. Replace display operators: `×` → `*`, `÷` → `/`, `π` → `pi`
2. Auto-close unmatched parentheses
3. Degree-to-radian conversion for trigonometric functions when `angleUnit === 'DEG'`:
   - Forward: `sin(x)` → `sin(x * pi / 180)`
   - Inverse: `asin(x)` → `asin(x) * 180 / pi`

**Output formatting** via `formatNumber()`:
- Values near zero (`< 1e-10`): scientific notation
- Values above `1e15`: scientific notation
- Otherwise: `toPrecision(12)` rounded, then `toString()`

### 5.2 Scientific Functions

| Function | Signature | Behavior |
|---|---|---|
| `calcFactorial(n)` | `number → string` | Iterative multiplication, max 170, negative/decimal rejected |
| `calcPermutation(n, r)` | `(number, number) → string` | Delegates to `math.permutations()` |
| `calcCombination(n, r)` | `(number, number) → string` | Delegates to `math.combinations()` |

### 5.3 Statistical Functions

| Function | Description |
|---|---|
| `calcMean(nums)` | Arithmetic mean |
| `calcMedian(nums)` | Middle value (odd) or average of two middles (even) |
| `calcVariance(nums, population)` | Population (÷N) or sample (÷(N-1)) variance |
| `calcStdDev(nums, population)` | Square root of variance |
| `calcMode(nums)` | All values with maximum frequency |
| `calcQuartiles(nums)` | Q1, Q2 (median), Q3 via recursive median halving |
| `calcZScore(x, mean, std)` | Standard score: `(x - mean) / std` |

**Normal Distribution:**
- `normalPDF(x, mean, std)` — Probability density function
- `normalCDF(x, mean, std)` — Cumulative distribution function using the error function approximation (`erf`)
- Error function: Polynomial approximation (5 coefficients) with sign handling

### 5.4 Financial Functions

| Function | Formula |
|---|---|
| `calcSimpleInterest(P, r, t)` | `P × (r/100) × t` |
| `calcCompoundInterest(P, r, t, n)` | `P × (1 + r/(100n))^(nt) - P` |
| `calcLoanPayment(P, annualRate, months)` | Amortization: `(Pr(1+r)^n) / ((1+r)^n - 1)` |
| `calcVAT(amount, rate)` | Returns `{ net, tax, gross }` |
| `calcROI(initial, final)` | `((final - initial) / initial) × 100` |
| `calcPresentValue(FV, rate, periods)` | `FV / (1 + r/100)^n` |
| `calcFutureValue(PV, rate, periods)` | `PV × (1 + r/100)^n` |

### 5.5 Matrix Operations

All operations validate dimension compatibility before computation.

| Operation | Input Validation | Implementation |
|---|---|---|
| `matrixAdd(a, b)` | Same dimensions | Element-wise addition |
| `matrixSubtract(a, b)` | Same dimensions | Element-wise subtraction |
| `matrixMultiply(a, b)` | `a.cols === b.rows` | Triple-nested loop (i,j,k) |
| `matrixTranspose(a)` | None | `a[0].map((_, j) => a.map(row => row[j]))` |
| `matrixDeterminant(a)` | Square matrix | Delegates to `math.det()` |
| `matrixInverse(a)` | Square matrix | Delegates to `math.inv()`, 8-digit precision |
| `matrixRank(a)` | None | Gaussian elimination with partial pivoting, ε = 1e-10 |

### 5.6 Programmer Functions

| Function | Description |
|---|---|
| `decToBase(num, base)` | Converts decimal to target base via `>>> 0` for unsigned 32-bit |
| `baseToDec(str, base)` | Parses string in given base via `parseInt()` |
| `bitwiseOp(a, b, op)` | Supports `AND`, `OR`, `XOR`, `NAND`, `NOR`, `XNOR`, `NOT`, `LSH`, `RSH` — all operands cast to 32-bit integer via `\| 0` |

### 5.7 Utility Functions

| Function | Description |
|---|---|
| `formatJSON(input)` | Pretty-prints JSON with 2-space indentation |
| `hashString(str, algorithm)` | Three algorithms: **DJB2** (hash = hash<<5 + hash + char), **FNV-1** (hash ^= char; hash *= 16777619), **Simple** (Math.imul(31, hash) + char) — all output 8-char uppercase hex |
| `base64Encode(str)` | `btoa(unescape(encodeURIComponent(str)))` for UTF-8 support |
| `base64Decode(str)` | Reverse of encode |

### 5.8 Graph Evaluation

```ts
function evaluateGraphFunction(expr: string, x: number): number | null
```

Parses expression with mathjs, substituting `{ x }` as a scope variable. Returns `null` for non-finite results.

```ts
function generateGraphData(functions, xMin, xMax, points = 400): DataPoint[]
```

Generates evenly-spaced x values across the range, evaluating each visible function at each point. Returns structured data for recharts consumption.

### 5.9 History Export

- `exportHistoryCSV(history)` — Generates CSV with columns: Timestamp, Mode, Expression, Result (with proper escaping).
- `exportHistoryTXT(history)` — Human-readable format with timestamps and mode labels.

---

## 6. Calculator Modes

### 6.1 Standard Mode

**File:** `src/components/StandardMode.tsx`  
**Grid layout:** 4 columns  
**Color accent:** Emerald

The foundational arithmetic calculator providing:

- **Memory operations:** MC (clear), MR (recall), M+ (add), M- (subtract), MS (store)
- **Parentheses:** Auto-toggling open/close based on balance
- **Percent:** Divides current value by 100
- **Negate (±):** Toggles sign of current value
- **Arithmetic:** `+`, `-`, `×` (display as `×`, computed as `*`), `÷` (display as `÷`, computed as `/`)
- **Clear:** AC (clear all), CE (clear entry), ⌫ (backspace)

**Keyboard mapping:**
| Key | Action |
|---|---|
| `0-9`, `.` | Append digit |
| `+`, `-` | Append operator |
| `*` | Appends `×` |
| `/` | Appends `÷` (prevented default) |
| `%` | Percent |
| `(`, `)` | Parentheses |
| `Enter` / `=` | Evaluate |
| `Backspace` | Delete last |
| `Escape` | Clear all |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |

**Evaluation flow:** Pushes undo stack → calls `evaluateExpression()` → logs to history → updates display → sets `justEvaluated = true` on success (enabling fresh expression on next digit input).

### 6.2 Scientific Mode

**File:** `src/components/ScientificMode.tsx`  
**Grid layout:** 6 columns  
**Color accent:** Blue

Extends standard arithmetic with scientific functions:

**Trigonometric (DEG/RAD toggle):**
- `sin`, `cos`, `tan` — Forward trigonometric functions
- `sin⁻¹`, `cos⁻¹`, `tan⁻¹` — Inverse trigonometric (arc) functions

**Logarithmic:**
- `log` → `log10()` (base 10)
- `ln` → `log()` (natural logarithm)
- `log₂` → `log2()` (base 2)

**Power & Root:**
- `√` → `sqrt()`
- `∛` → `cbrt()`
- `x²` → `^2`
- `x³` → `^3`
- `xʸ` → `^` (general power)
- `1/x` → `^-1` (reciprocal)

**Constants & Special:**
- `π` — Pi
- `e` — Euler's number
- `exp` → `exp()` (e^x)
- `abs` → `abs()` (absolute value)
- `n!` — Factorial via `calcFactorial()`

**Additional features:** Undo/Redo buttons, Copy/Paste expression, memory operations, percent, negate.

The angle unit toggle (`DEG`/`RAD`) is stored in `calculatorStore.angleUnit` and passed to `evaluateExpression()` for automatic degree-radian conversion.

### 6.3 Programmer Mode

**File:** `src/components/ProgrammerMode.tsx`  
**Color accent:** Purple

A base-conversion and bitwise-operations calculator:

**Base representations panel:** Displays the current value simultaneously in DEC, HEX, OCT, and BIN. Clicking any base switches the active input base.

**Bit width toggle:** 32-bit or 64-bit mode (local state `bits`). 32-bit mode clips results via `result | 0`.

**Bitwise operations:**
| Operation | Description |
|---|---|
| `AND` | Bitwise AND |
| `OR` | Bitwise OR |
| `XOR` | Bitwise XOR |
| `NOT` | Bitwise NOT (unary) |
| `NAND` | Bitwise NAND |
| `NOR` | Bitwise NOR |
| `LSH` | Left shift |
| `RSH` | Right shift |
| `~` | Bitwise NOT (alternative) |
| `MOD` | Modulo (`%`) |

**Input constraints by base:**
- BIN: Only digits 0-1 enabled
- OCT: Only digits 0-7 enabled
- DEC/HEX: All digits enabled
- HEX: Letters A-F enabled only in HEX mode

**Base switching:** Converts current value to the new base representation and updates expression.

### 6.4 Financial Mode

**File:** `src/components/FinancialMode.tsx`  
**Color accent:** Yellow  
**Layout:** Tabbed interface (5 tabs)

**Interest Calculator:**
- Inputs: Principal, Annual Rate (%), Time (years), Compound Frequency
- Outputs: Simple Interest, Compound Interest, Total Simple, Total Compound
- Formulas: Simple = P×r×t, Compound = P×(1+r/n)^(nt) - P

**Loan Calculator:**
- Inputs: Loan Amount, Annual Rate (%), Term (months)
- Outputs: Monthly Payment, Total Payment, Total Interest
- Formula: Amortization formula with zero-rate edge case

**VAT Calculator:**
- Inputs: Net Amount, VAT Rate (%)
- Outputs: Net Amount, VAT Amount, Gross Amount

**Investment Calculator:**
- Inputs: Initial Investment, Final Value, Periods (years), Discount Rate (%)
- Outputs: ROI (%), Present Value (PV), Future Value (FV)

**Currency Converter:**
- Static reference rates for 6 major pairs (USD→EUR, GBP, JPY, CAD, AUD, CHF)
- Placeholder for live API integration

All calculations log to the history system via `addHistory()`.

### 6.5 Statistics Mode

**File:** `src/components/StatisticsMode.tsx`  
**Color accent:** Pink  
**Layout:** Tabbed interface (3 tabs)

**Descriptive Statistics:**
- Input: Comma/space-separated numeric data in a textarea
- Toggle: Population (σ) vs Sample (s) standard deviation
- Computes 15 metrics:
  - Count (n), Sum, Mean (μ/x̄), Median, Mode, Min, Max, Range
  - Q1, Q2 (Median), Q3, IQR
  - Variance (σ²), Standard Deviation (σ), Coefficient of Variation

**Probability Calculator:**
- Inputs: x value, Mean (μ), Standard Deviation (σ)
- Outputs: Z-Score, P(X < x), P(X > x), P(-|x| < X < |x|)

**Distribution Visualizer:**
- Interactive normal distribution chart using Recharts `AreaChart`
- Configurable μ and σ
- Displays PDF curve with gradient fill and mean reference line
- Data generated across μ ± 4σ with 200 sample points

### 6.6 Matrix Mode

**File:** `src/components/MatrixMode.tsx`  
**Color accent:** Cyan

A matrix algebra interface with:

**Matrix A and Matrix B input panels:**
- Dynamic resizing: rows 1-5, columns 1-5 (via +/− buttons)
- Cell-by-cell numeric input
- Dimension display (e.g., `2×3`)

**Operations (7 total):**
| Operation | Label | Requires Matrix B | Output |
|---|---|---|---|
| Addition | A + B | Yes | Matrix |
| Subtraction | A − B | Yes | Matrix |
| Multiplication | A × B | Yes | Matrix |
| Transpose | Aᵀ | No | Matrix |
| Determinant | det(A) | No | Scalar |
| Inverse | A⁻¹ | No | Matrix |
| Rank | rank(A) | No | Scalar |

Matrix B panel is conditionally rendered based on the selected operation. Results display as formatted matrix tables or scalar values. All results are logged to history.

### 6.7 Graphing Mode

**File:** `src/components/GraphingMode.tsx`  
**Color accent:** Orange

A multi-function graphing calculator using Recharts:

**Chart:** `LineChart` with configurable X range (`xMin`, `xMax`), Cartesian grid, axis labels, origin reference lines, and custom tooltip showing x value and all function values.

**Function management:**
- Add custom functions via text input (Enter to submit)
- Edit inline by clicking the function expression
- Toggle visibility per function (eye icon)
- Remove functions (trash icon)
- 7 cycling colors: `['#6ee7b7', '#60a5fa', '#f97316', '#a78bfa', '#fb7185', '#fbbf24', '#34d399']`

**Predefined quick-add functions:**
`sin(x)`, `cos(x)`, `tan(x)`, `x^2`, `x^3`, `sqrt(x)`, `log(x)`, `exp(x)`, `1/x`, `abs(x)`, `x^2 - 4`, `sin(x)/x`

**Data generation:** 300 evenly-spaced points across the x-range, each point evaluated for all visible functions. Non-finite results are passed as `null` (gaps in the line).

### 6.8 Utilities Mode

**File:** `src/components/UtilitiesMode.tsx`  
**Color accent:** Teal  
**Layout:** Tabbed interface (5 tabs)

**JSON Formatter:**
- Input: Raw JSON string
- Output: Pretty-printed JSON with 2-space indentation
- Error reporting for invalid JSON

**Hash Generator:**
- Input: Any string
- Algorithms: DJB2, FNV-1, Simple (all 32-bit), plus basic checksum (char code sum as hex)
- Output: 8-character uppercase hex for each algorithm, plus string length and char code sum

**Base64 Encoder/Decoder:**
- Toggle between encode and decode modes
- UTF-8 safe via `encodeURIComponent`/`decodeURIComponent` pipeline

**Unit Converter:**
- Supports: km, miles, m, cm, ft, kg, lbs, g, celsius, fahrenheit, kelvin
- Static conversion factor table
- Special-case handling for temperature conversions (non-linear formulas)

**Number Base Converter:**
- Input: Number + source base selector (Binary, Octal, Decimal, Hex)
- Output: Simultaneous display in Binary (2), Octal (8), Decimal (10), Hex (16), Base 32, Base 36

All operations include copy-to-clipboard buttons with visual feedback.

### 6.9 Favorites Mode

**File:** `src/components/FavoritesMode.tsx`  
**Color accent:** Indigo

A bookmarking system for calculator expressions:

**User Favorites:**
- Add custom favorites with label + expression
- Run any favorite expression (evaluates and logs to history)
- Remove user-added favorites

**Built-in Formula Library (12 entries):**
| Label | Expression | Mode |
|---|---|---|
| Pythagorean (3,4,5) | `sqrt(3^2 + 4^2)` | Scientific |
| Circle Area (r=5) | `π * 5^2` | Scientific |
| Golden Ratio | `(1 + sqrt(5)) / 2` | Scientific |
| Euler's Identity | `e^(π)` | Scientific |
| ln(e) | `log(e)` | Scientific |
| Degrees to Radians (180°) | `180 * π / 180` | Scientific |
| Speed of Light (km/s) | `299792.458` | Standard |
| Avogadro's Number | `6.02214076e23` | Scientific |
| Sin(30°) | `sin(30)` | Scientific |
| Cos(60°) | `cos(60)` | Scientific |
| Fibonacci: 10th | `(((1+sqrt(5))/2)^10 - ((1-sqrt(5))/2)^10) / sqrt(5)` | Scientific |
| 1000! approx (Stirling) | `sqrt(2*π*1000) * (1000/e)^1000` | Scientific |

Each favorite shows an inline preview result after execution. Built-in favorites are marked with a filled amber star; user favorites with a filled indigo star.

---

## 7. Shared Components

### 7.1 CalcButton

**File:** `src/components/CalcButton.tsx`

A polymorphic button component with 9 visual variants, 3 sizes, and optional wide/active states.

**Variants:**
| Variant | Color Scheme | Use Case |
|---|---|---|
| `default` | Gray | General actions |
| `number` | Dark gray | Numeric digits |
| `operator` | Blue | Arithmetic operators |
| `equals` | Emerald gradient | Evaluate button |
| `clear` | Red | Clear all |
| `function` | Indigo | Scientific/functional buttons |
| `memory` | Amber | Memory operations |
| `accent` | Purple | Bitwise/special operations |
| `danger` | Rose | Backspace, clear entry |

**Sizes:** `sm` (h-8), `md` (h-10), `lg` (h-12)

**Visual effects:**
- Gradient shine overlay (`from-white/10 to-transparent`)
- `active:scale-95` press animation
- `active:brightness-90` on click
- `hover:brightness-110 hover:-translate-y-px` hover lift
- Focus ring with offset
- Disabled state: `opacity-40 cursor-not-allowed`

### 7.2 ResultBox

**File:** `src/components/ResultBox.tsx`

The primary display component showing the current expression (above) and result (below).

**Features:**
- Expression preview (smaller, muted)
- Main display with dynamic font sizing: `text-3xl` (≤12 chars), `text-2xl` (13-20), `text-xl` (>20)
- Copy-to-clipboard button with checkmark feedback
- Mode indicator dot + label
- Auto-scroll to end of long expressions
- Mode-specific accent colors

### 7.3 cn.ts Utility

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Combines `clsx` for conditional class joining with `tailwind-merge` for intelligent conflict resolution (e.g., `bg-red-500 bg-blue-500` resolves to `bg-blue-500`).

---

## 8. Panel Systems — History & Memory

### 8.1 History Panel

**File:** `src/components/HistoryPanel.tsx`

**Features:**
- Collapsible header with entry count badge
- Click any non-error entry to restore expression + result
- Export to CSV or TXT via Blob URL download
- Clear history button
- Mode-specific color coding for each entry
- Timestamp display
- Empty state with clock icon

**Export formats:**
- **CSV:** `Timestamp,Mode,Expression,Result` with proper escaping
- **TXT:** Human-readable blocks with timestamps and mode labels

### 8.2 Memory Panel

**File:** `src/components/MemoryPanel.tsx`

**Features:**
- Displays stored value or "Empty" state
- "M" badge when value is stored
- 5 operation buttons: MC, MR, MS, M+, M-
- Disabled states when memory is empty
- Single-value memory register (not a stack)

---

## 9. Theme & Visual Design System

### 9.1 Theme Toggle

Managed via `calculatorStore.theme`. Toggle applies `dark` class to `document.body` and sets `backgroundColor` inline. The `isDark` boolean is derived and passed through all components.

### 9.2 Mode-Specific Color System

Each calculator mode has a dedicated accent color used across the UI:

| Mode | Color | Background | Text | Tab Indicator |
|---|---|---|---|---|
| Standard | Emerald | `bg-emerald-600` | `text-emerald-400` | `bg-emerald-600` |
| Scientific | Blue | `bg-blue-600` | `text-blue-400` | `bg-blue-600` |
| Programmer | Purple | `bg-purple-600` | `text-purple-400` | `bg-purple-600` |
| Financial | Yellow | `bg-yellow-500` | `text-yellow-400` | `bg-yellow-500` |
| Statistics | Pink | `bg-pink-600` | `text-pink-400` | `bg-pink-600` |
| Matrix | Cyan | `bg-cyan-600` | `text-cyan-400` | `bg-cyan-600` |
| Graphing | Orange | `bg-orange-600` | `text-orange-400` | `bg-orange-600` |
| Utilities | Teal | `bg-teal-600` | `text-teal-400` | `bg-teal-600` |
| Favorites | Indigo | `bg-indigo-600` | `text-indigo-400` | `bg-indigo-600` |

### 9.3 Visual Effects

- **Background gradient:** Mode-specific gradient accent (`from-{color}-900/20 via-transparent`)
- **Grid overlay:** Subtle 40px grid pattern at 2% opacity
- **Backdrop blur:** `backdrop-blur-lg` on header and panels
- **Glass morphism:** Semi-transparent backgrounds with border blur (`bg-gray-900/80 border-gray-700/50`)
- **Smooth transitions:** `transition-colors duration-300` on theme, `duration-500` on gradients
- **Shadow system:** `shadow-2xl shadow-black/30` (dark), `shadow-xl shadow-gray-200/50` (light)

### 9.4 Layout Structure

```
┌─────────────────────────────────────────┐
│ Header (sticky, blur)                   │
│ [Mode Icon] [Title] [Undo/Redo] [Theme] │
├─────────────────────────────────────────┤
│ Mode Tabs (sticky, scrollable)          │
├──────────────────────┬──────────────────┤
│ Main Content         │ Side Panel       │
│ ┌──────────────┐    │ ┌──────────────┐ │
│ │ ResultBox    │    │ │ MemoryPanel  │ │
│ └──────────────┘    │ └──────────────┘ │
│ ┌──────────────┐    │ ┌──────────────┐ │
│ │ ModeContent  │    │ │ HistoryPanel │ │
│ │ (per mode)   │    │ └──────────────┘ │
│ └──────────────┘    │ ┌──────────────┐ │
│                      │ │ Quick Ref    │ │
│                      │ └──────────────┘ │
│                      │ ┌──────────────┐ │
│                      │ │ Mode Grid    │ │
│                      │ └──────────────┘ │
├──────────────────────┴──────────────────┤
│ Footer                                 │
└─────────────────────────────────────────┘
```

---

## 10. Keyboard Input System

Keyboard support is implemented via `useEffect` hooks in `StandardMode` and `ScientificMode`, registering `keydown` listeners on `window`.

**Event handling:**
- Input elements (`HTMLInputElement`, `HTMLTextAreaElement`) are excluded to prevent conflicts
- Letter keys (`z`, `y`) with `Ctrl`/`Meta` modifier for undo/redo
- `Enter` and `=` both trigger evaluation (with `preventDefault()`)
- `/` triggers `preventDefault()` to avoid browser quick-find
- Mapping converts keyboard operators to display operators (`*` → `×`, `/` → `÷`)

**Supported keys:** `0-9`, `.`, `+`, `-`, `*`, `/`, `(`, `)`, `Enter`, `=`, `Backspace`, `Escape`, `Ctrl+Z`, `Ctrl+Y`

---

## 11. Build & Development

### 11.1 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build (single-file output) |
| `npm run preview` | Preview production build locally |

### 11.2 Build Output

The `viteSingleFile()` plugin inlines all JavaScript, CSS, and assets into a single `index.html` file. This enables:
- Offline deployment
- Email attachment
- USB distribution
- No CORS dependencies

### 11.3 Path Aliases

`@/*` resolves to `src/*` in both TypeScript (`tsconfig.json`) and Vite (`vite.config.ts` resolve.alias), enabling clean imports:

```ts
import { useCalculatorStore } from '@/store/calculatorStore';
import { evaluateExpression } from '@/services/CalculationService';
```

---

*This document was synthesized exclusively from the project source code. All technical details, function signatures, algorithms, and architectural decisions reflect the actual implementation.*
