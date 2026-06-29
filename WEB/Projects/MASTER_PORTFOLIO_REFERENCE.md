# Engineering Portfolio — Master Reference Manual

> **Author Portfolio:** Four Production-Grade Web Applications  
> **Stack Core:** React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4  
> **Deployment Model:** Single-file HTML bundles (zero backend, full offline)  
> **Architecture Philosophy:** Component-driven, centralized state, persistent client-side data  
> **Last Updated:** June 2026

---

## Portfolio Overview

This document serves as the unified technical reference for four independent web applications, each demonstrating a distinct domain of engineering capability while sharing a common architectural foundation. Every project is a self-contained, single-file production build deployable without servers, databases, or external dependencies.

### Project Summary

| # | Project | Domain | Complexity | Key Differentiator |
|---|---------|--------|------------|-------------------|
| 1 | **Advanced Calculator Pro** | Mathematical Computation | 9 modes, 30+ operations | Multi-domain calculation engine with graphing |
| 2 | **TaskFlow** | Productivity / Behavioral Psychology | Eisenhower Matrix + Gamification | Point system with reward/penalty mechanics |
| 3 | **Enterprise Banking System** | Financial Services | Role-based access, multi-currency | Granular permission system with 9 permissions |
| 4 | **NEXUS TTT** | Game Systems / AI | 16 modular subsystems | Minimax α-β pruning with procedural audio |

### Cross-Project Skill Demonstration

| Competency | Calculator | TaskFlow | Banking | NEXUS TTT |
|------------|:----------:|:--------:|:-------:|:---------:|
| Component architecture | ● | ● | ● | ● |
| Centralized state management | ● (Zustand) | ● (useState) | ● (useState) | ● (useReducer) |
| TypeScript strict mode | ● | ● | ● | ● |
| Algorithm design | ● (mathjs) | ● (Eisenhower) | ● (currency) | ● (minimax) |
| Data persistence (localStorage) | ● | ● | ● | ● |
| Dark/light theming | ● | ● | ● | ● |
| Keyboard interaction | ● | — | — | — |
| Authentication & authorization | — | — | ● | — |
| AI / decision systems | — | — | — | ● |
| Procedural audio synthesis | — | — | — | ● |
| Data visualization | ● (Recharts) | ● (CSS charts) | ● (Recharts) | — |
| Data export (CSV/PDF/JSON) | ● | — | ● | — |
| Role-based UI rendering | — | — | ● | — |
| Replay / undo systems | ● | — | ● (soft delete) | ● |
| Animation systems | ● | — | ● | ● |

---

## Part I — Shared Engineering Foundation

All four projects share a common technological and architectural foundation. This section documents the reusable patterns, configurations, and utilities that form the backbone of each application.

---

### 1. Technology Stack

#### Core Dependencies

| Package | Version | Role Across Projects |
|---------|---------|---------------------|
| `react` | 19.2.3 | Declarative UI framework |
| `react-dom` | 19.2.3 | DOM rendering engine |
| `typescript` | 5.9.3 | Static type system with strict mode |
| `vite` | 7.2.4 | Build tool and development server |
| `tailwindcss` | 4.1.17 | Utility-first CSS framework |
| `@tailwindcss/vite` | 4.1.17 | Native Tailwind Vite integration |
| `@vitejs/plugin-react` | 5.1.1 | React Fast Refresh for development |
| `clsx` | 2.1.1 | Conditional class name construction |
| `tailwind-merge` | 3.4.0 | Intelligent Tailwind class conflict resolution |
| `vite-plugin-singlefile` | 2.3.0 | Single-file HTML production bundling |

#### Project-Specific Dependencies

| Package | Version | Used In | Purpose |
|---------|---------|---------|---------|
| `zustand` | 5.0.12 | Calculator | Centralized state store |
| `mathjs` | 15.1.1 | Calculator | Expression parsing and evaluation |
| `fraction.js` | 5.3.4 | Calculator | Exact fractional arithmetic |
| `recharts` | 3.8.1 | Calculator, Banking | Data visualization (charts) |
| `lucide-react` | 1.7.0 | Calculator | Icon library |
| `react-draggable` | 4.5.0 | Calculator | Draggable UI elements |
| `decimal.js` | 10.6.0 | Banking | High-precision financial arithmetic |
| `jsPDF` | 4.2.1 | Banking | PDF document generation |
| `jsPDF-autotable` | 5.0.7 | Banking | PDF table formatting |

---

### 2. Build Configuration

Every project uses an identical Vite and TypeScript configuration pattern:

#### Vite Configuration

```ts
// Shared across all projects
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

**Key design decisions:**
- **`viteSingleFile()`** — Inlines all JavaScript, CSS, and assets into a single `index.html`, enabling offline deployment, email attachment, USB distribution, and zero CORS dependencies.
- **Path alias `@/`** — Maps to `src/` for clean, refactoring-safe imports (e.g., `import { useStore } from '@/store'`).

#### TypeScript Configuration

| Setting | Value | Rationale |
|---------|-------|-----------|
| `target` | ES2020 | Modern browser support with async/await |
| `moduleResolution` | Bundler | Vite-optimized module resolution |
| `strict` | `true` | Compile-time type safety |
| `noUnusedLocals` | `true` | Dead code elimination |
| `noUnusedParameters` | `true` | API cleanliness enforcement |
| `noFallthroughCasesInSwitch` | `true` | Prevent accidental fallthrough |
| `jsx` | `react-jsx` | Automatic runtime (no React import needed) |

#### Build Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with Hot Module Replacement |
| `npm run build` | Production build producing a single HTML file |
| `npm run preview` | Local preview of the production build |

---

### 3. Shared Utility: `cn()` — Class Name Merging

All four projects implement an identical Tailwind class utility:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This combines `clsx` for conditional class joining (e.g., `cn(isActive && "bg-blue-500", className)`) with `tailwind-merge` for intelligent conflict resolution (e.g., `cn("bg-red-500", "bg-blue-500")` resolves to `"bg-blue-500"`).

---

### 4. Persistence Architecture

All four projects persist state exclusively via `localStorage` — no backend, no database, no network requests. This section documents the shared patterns.

#### Safe JSON Serialization

Every project implements a defensive parsing function to handle corrupted or missing data:

```ts
function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
```

#### Key Namespacing Convention

| Project | Key Prefix | Keys |
|---------|-----------|------|
| Calculator | (none) | Uses Zustand persist middleware |
| TaskFlow | `etm_` | `etm_tasks_v1`, `etm_rewards_v1`, `etm_reminders_v1`, `etm_analytics_v1`, `etm_theme_v1` |
| Banking | `ebs_` | `ebs_users`, `ebs_accounts`, `ebs_transactions`, `ebs_initialized`, `ebs_theme` |
| NEXUS TTT | `nexus_ttt_` | `nexus_ttt_v2` (primary), `nexus_ttt_backup` (redundancy) |

#### Backup & Recovery Pattern (NEXUS TTT)

The most sophisticated persistence implementation uses a dual-key backup strategy:

1. **Before writing:** Current primary data is copied to the backup key.
2. **Write:** New data overwrites the primary key.
3. **On load failure:** Falls back to the backup key.
4. **On backup failure:** Returns default values.

---

### 5. Theme System

All four projects support dark/light mode with localStorage persistence.

#### Shared Pattern

```ts
// Toggle dark class on root element
useEffect(() => {
  const root = document.documentElement;
  if (darkMode) root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
}, [darkMode]);
```

#### Project-Specific Theme Implementations

| Project | Approach | Unique Features |
|---------|----------|-----------------|
| Calculator | Zustand store + Tailwind | 9 mode-specific accent colors, animated gradient backgrounds |
| TaskFlow | useState + CSS class | System preference detection on init |
| Banking | useState + CSS class | Custom CSS tokens (`--color-banking-*`) |
| NEXUS TTT | ThemeEngine singleton | 3 complete palettes (Obsidian, Ivory, Synthwave), 19 tokens each, CSS custom property injection |

---

## Part II — Advanced Calculator Pro

> **9 calculation modes · 30+ operations · Centralized Zustand state · Component-per-mode architecture**

---

### 6. System Architecture

#### Structural Layout

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
│   └── cn.ts                       — Tailwind class merge utility
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

#### Data Flow

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

#### Mode Switching

`App.tsx` defines a `MODES` array mapping each `CalcMode` key to a label, icon, color, and short label. The active mode is stored in `calculatorStore.mode`. Switching modes resets `display`, `expression`, `isError`, and `justEvaluated` via the `setMode` action.

The `showResultBox()` function gates whether the `ResultBox` is displayed — active for `standard`, `scientific`, `programmer`, and `favorites` modes, and hidden for form-based modes (`financial`, `statistics`, `matrix`, `graphing`, `utilities`) that manage their own result display.

---

### 7. State Management — Zustand Store

**File:** `src/store/calculatorStore.ts`

#### Type Definitions

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

#### State Shape

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

#### Key Actions

**Expression Management:**
- `appendToExpression(val)` — Appends to expression with decimal deduplication, auto-prepending `0.` when expression starts with `.`, and clearing expression after evaluation.
- `clearAll()` — Resets display to `'0'`, clears expression, saves to undo stack.
- `clearEntry()` — Same as clearAll but preserves undo continuity.
- `backspace()` — Removes last character.

**Memory Operations:** `memoryStore()`, `memoryAdd()`, `memorySub()`, `memoryRecall()`, `memoryClear()`

**Undo/Redo:** `pushUndoStack()` (capped at 50), `undo()`, `redo()`

**History:** `addHistory()` (auto-generated ID, capped at 200), `clearHistory()`

**Graph Functions:** `addGraphFunction()` (cyclic color assignment), `removeGraphFunction()`, `toggleGraphFunction()`, `updateGraphFunction()`

**Favorites:** `addFavorite()`, `removeFavorite()` with auto-generated IDs

---

### 8. Calculation Engine

**File:** `src/services/CalculationService.ts`

All pure computation logic, organized into domain-specific function groups. Uses `mathjs` for expression evaluation, configured with `math.create(math.all)` for full feature access.

#### Core Expression Evaluation

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

#### Scientific Functions

| Function | Signature | Behavior |
|---|---|---|
| `calcFactorial(n)` | `number → string` | Iterative multiplication, max 170, negative/decimal rejected |
| `calcPermutation(n, r)` | `(number, number) → string` | Delegates to `math.permutations()` |
| `calcCombination(n, r)` | `(number, number) → string` | Delegates to `math.combinations()` |

#### Statistical Functions

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

#### Financial Functions

| Function | Formula |
|---|---|
| `calcSimpleInterest(P, r, t)` | `P × (r/100) × t` |
| `calcCompoundInterest(P, r, t, n)` | `P × (1 + r/(100n))^(nt) - P` |
| `calcLoanPayment(P, annualRate, months)` | Amortization: `(Pr(1+r)^n) / ((1+r)^n - 1)` |
| `calcVAT(amount, rate)` | Returns `{ net, tax, gross }` |
| `calcROI(initial, final)` | `((final - initial) / initial) × 100` |
| `calcPresentValue(FV, rate, periods)` | `FV / (1 + r/100)^n` |
| `calcFutureValue(PV, rate, periods)` | `PV × (1 + r/100)^n` |

#### Matrix Operations

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

#### Programmer Functions

| Function | Description |
|---|---|
| `decToBase(num, base)` | Converts decimal to target base via `>>> 0` for unsigned 32-bit |
| `baseToDec(str, base)` | Parses string in given base via `parseInt()` |
| `bitwiseOp(a, b, op)` | Supports `AND`, `OR`, `XOR`, `NAND`, `NOR`, `XNOR`, `NOT`, `LSH`, `RSH` — all operands cast to 32-bit integer via `\| 0` |

#### Utility Functions

| Function | Description |
|---|---|
| `formatJSON(input)` | Pretty-prints JSON with 2-space indentation |
| `hashString(str, algorithm)` | Three algorithms: **DJB2** (hash = hash<<5 + hash + char), **FNV-1** (hash ^= char; hash *= 16777619), **Simple** (Math.imul(31, hash) + char) — all output 8-char uppercase hex |
| `base64Encode(str)` | `btoa(unescape(encodeURIComponent(str)))` for UTF-8 support |
| `base64Decode(str)` | Reverse of encode |

#### Graph Evaluation

```ts
function evaluateGraphFunction(expr: string, x: number): number | null
```
Parses expression with mathjs, substituting `{ x }` as a scope variable. Returns `null` for non-finite results.

```ts
function generateGraphData(functions, xMin, xMax, points = 400): DataPoint[]
```
Generates evenly-spaced x values across the range, evaluating each visible function at each point. Returns structured data for recharts consumption.

#### History Export

- `exportHistoryCSV(history)` — Generates CSV with columns: Timestamp, Mode, Expression, Result (with proper escaping).
- `exportHistoryTXT(history)` — Human-readable format with timestamps and mode labels.

---

### 9. Calculator Modes

#### 9.1 Standard Mode

**File:** `src/components/StandardMode.tsx` · **Grid:** 4 columns · **Accent:** Emerald

The foundational arithmetic calculator providing memory operations (MC, MR, M+, M-, MS), auto-toggling parentheses, percent, negate, and full arithmetic (`+`, `-`, `×`, `÷`).

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

**Evaluation flow:** Pushes undo stack → calls `evaluateExpression()` → logs to history → updates display → sets `justEvaluated = true` on success.

#### 9.2 Scientific Mode

**File:** `src/components/ScientificMode.tsx` · **Grid:** 6 columns · **Accent:** Blue

Extends standard arithmetic with trigonometric functions (sin, cos, tan, and inverses), logarithmic functions (log₁₀, ln, log₂), power/root operations (sqrt, cbrt, x², x³, xʸ, 1/x), constants (π, e), and special functions (exp, abs, n!). The angle unit toggle (`DEG`/`RAD`) is stored in `calculatorStore.angleUnit` and passed to `evaluateExpression()`.

#### 9.3 Programmer Mode

**File:** `src/components/ProgrammerMode.tsx` · **Accent:** Purple

A base-conversion and bitwise-operations calculator with simultaneous DEC/HEX/OCT/BIN display, 32-bit/64-bit toggle, and full bitwise operations (AND, OR, XOR, NOT, NAND, NOR, LSH, RSH, MOD). Input constraints enforce valid digits per base.

#### 9.4 Financial Mode

**File:** `src/components/FinancialMode.tsx` · **Accent:** Yellow · **Layout:** 5 tabs

Tabbed interface covering Interest Calculator (simple + compound), Loan Calculator (amortization), VAT Calculator (net/tax/gross), Investment Calculator (ROI, PV, FV), and Currency Converter (6 major pairs with static rates).

#### 9.5 Statistics Mode

**File:** `src/components/StatisticsMode.tsx` · **Accent:** Pink · **Layout:** 3 tabs

Descriptive Statistics (15 metrics including mean, median, mode, quartiles, IQR, variance, standard deviation, coefficient of variation), Probability Calculator (Z-score, P(X<x), P(X>x)), and Distribution Visualizer (interactive normal distribution chart via Recharts AreaChart with configurable μ and σ).

#### 9.6 Matrix Mode

**File:** `src/components/MatrixMode.tsx` · **Accent:** Cyan

Matrix algebra interface with dynamic 1-5 × 1-5 sizing, supporting 7 operations: Addition, Subtraction, Multiplication, Transpose, Determinant, Inverse, and Rank. Matrix B panel is conditionally rendered based on operation selection.

#### 9.7 Graphing Mode

**File:** `src/components/GraphingMode.tsx` · **Accent:** Orange

Multi-function graphing using Recharts `LineChart` with configurable X range, Cartesian grid, custom tooltip, and function management (add, edit, toggle, remove). Supports 7 cycling colors and 12 predefined quick-add functions. Generates 300 evenly-spaced points across the range.

#### 9.8 Utilities Mode

**File:** `src/components/UtilitiesMode.tsx` · **Accent:** Teal · **Layout:** 5 tabs

JSON Formatter (pretty-print with error reporting), Hash Generator (DJB2, FNV-1, Simple), Base64 Encoder/Decoder (UTF-8 safe), Unit Converter (length, mass, temperature), and Number Base Converter (simultaneous display in 6 bases).

#### 9.9 Favorites Mode

**File:** `src/components/FavoritesMode.tsx` · **Accent:** Indigo

Bookmarking system for calculator expressions with user-created favorites and a built-in formula library of 12 entries (Pythagorean, Circle Area, Golden Ratio, Euler's Identity, etc.). Each favorite shows an inline preview result after execution.

---

### 10. Shared Components & UI Systems

#### CalcButton

A polymorphic button component with 9 visual variants (`default`, `number`, `operator`, `equals`, `clear`, `function`, `memory`, `accent`, `danger`), 3 sizes, and optional wide/active states. Visual effects include gradient shine overlay, `active:scale-95` press animation, and hover lift.

#### ResultBox

Primary display component with dynamic font sizing (`text-3xl` ≤12 chars, `text-2xl` 13-20, `text-xl` >20), copy-to-clipboard with checkmark feedback, mode indicator, and auto-scroll.

#### Panel Systems

- **History Panel:** Collapsible with entry count badge, click-to-restore, CSV/TXT export, mode-specific color coding.
- **Memory Panel:** Single-value memory register with MC/MR/MS/M+/M- operations and disabled states.

#### Keyboard Input System

Implemented via `useEffect` hooks registering `keydown` listeners on `window`. Input elements are excluded to prevent conflicts. `/` triggers `preventDefault()` to avoid browser quick-find. Keyboard operators map to display operators (`*` → `×`, `/` → `÷`).

---

### 11. Theme & Visual Design System

#### Mode-Specific Color System

| Mode | Accent | Background | Text | Tab Indicator |
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

#### Visual Effects

- **Background gradient:** Mode-specific gradient accent (`from-{color}-900/20 via-transparent`)
- **Grid overlay:** Subtle 40px grid pattern at 2% opacity
- **Backdrop blur:** `backdrop-blur-lg` on header and panels
- **Glass morphism:** Semi-transparent backgrounds with border blur (`bg-gray-900/80 border-gray-700/50`)
- **Smooth transitions:** `transition-colors duration-300` on theme, `duration-500` on gradients

---

## Part III — TaskFlow: Daily Task Management System

> **Eisenhower Matrix · Gamification Engine · Behavioral Psychology · Client-Side Persistence**

---

### 12. System Architecture

#### Application Views

| View | Purpose |
|------|---------|
| **Dashboard** | Overview with progress bar, score, weekly trend, and Eisenhower Matrix preview |
| **Quadrants** | Full Eisenhower Matrix grid — tasks organized by importance/urgency |
| **Task Table** | Sortable, filterable table of all tasks with search |
| **Analytics** | Bar charts for 14-day performance, donut chart for category distribution |

#### File Structure

```
daily-task-management-system/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              — Entry point
    ├── App.tsx                — Root component, tab routing, state orchestration
    ├── types.ts               — Type definitions, category metadata, point calculation
    ├── index.css              — Tailwind import
    ├── components/
    │   ├── TaskForm.tsx       — Task creation/editing form
    │   ├── QuadrantView.tsx   — Eisenhower Matrix grid
    │   ├── TaskTable.tsx      — Filterable, sortable task list
    │   ├── Progress.tsx       — ProgressBar and StatCard
    │   ├── AnalyticsCharts.tsx — Bar chart, donut chart, performance cards
    │   └── Toast.tsx          — Notification toast system
    ├── lib/
    │   ├── storage.ts         — localStorage persistence layer
    │   ├── taskService.ts     — Task CRUD and derived metrics
    │   ├── analytics.ts       — Score, trend, and performance analytics
    │   └── reminderService.ts — Timer-based reminder and penalty engine
    └── utils/
        └── cn.ts              — Tailwind class merging utility
```

---

### 13. Type System & Data Models

#### EisenhowerCategory

```ts
type EisenhowerCategory =
  | 'important-urgent'
  | 'important-not-urgent'
  | 'not-important-urgent'
  | 'not-important-not-urgent';
```

#### Task

The central entity representing a user task:

```ts
interface Task {
  id: string;                    // Unique identifier (random + timestamp)
  name: string;                  // Task title
  description?: string;          // Optional detail
  status: TaskStatus;            // 'pending' | 'completed'
  category: EisenhowerCategory;  // Eisenhower quadrant
  createdAt: string;             // ISO 8601 timestamp
  dueDate?: string;              // Optional ISO 8601 deadline
  completedAt?: string;          // Set when status → 'completed'
  pointsAwarded?: number;        // Points earned on completion
  pointsPenalized?: number;      // Points lost on overdue/deletion
  reminderOffset?: number;       // Minutes before due date to trigger reminder
}
```

#### RewardEvent

Tracks every point-awarding or penalty event:

```ts
interface RewardEvent {
  id: string;
  taskId: string;
  type: 'reward' | 'penalty';
  points: number;
  reason: string;                // Human-readable explanation
  timestamp: string;             // ISO 8601
  category: EisenhowerCategory;
}
```

#### Reminder

Tracks reminder state per task to avoid duplicate notifications:

```ts
interface Reminder {
  id: string;
  taskId: string;
  dueDate: string;
  reminded: boolean;             // Has pre-deadline reminder been sent?
  overdueNotified: boolean;      // Has overdue penalty been applied?
}
```

#### AnalyticsSnapshot

```ts
interface AnalyticsSnapshot {
  date: string;                  // YYYY-MM-DD
  completed: number;
  total: number;
  rewards: number;
  penalties: number;
  byCategory: Record<EisenhowerCategory, {
    completed: number;
    total: number;
  }>;
}
```

---

### 14. Eisenhower Matrix — Core Framework

#### Quadrant Definitions

| Quadrant | Key | Priority | Base Reward | Penalty Multiplier | Description |
|----------|-----|----------|-------------|---------------------|-------------|
| **Important & Urgent** | `important-urgent` | 1 | 20 pts | 2.0× | Crisis, deadlines, problems |
| **Important & Not Urgent** | `important-not-urgent` | 2 | 15 pts | 1.5× | Prevention, planning, development |
| **Not Important & Urgent** | `not-important-urgent` | 3 | 8 pts | 1.0× | Interruptions, some calls/emails |
| **Not Important & Not Urgent** | `not-important-not-urgent` | 4 | 5 pts | 0.5× | Trivia, time wasters |

Each category also defines: `color` (Tailwind text), `bg` (Tailwind background), `border` (Tailwind border), and `short` label ("Do First", "Schedule", "Delegate", "Eliminate").

---

### 15. Gamification Engine

#### Point Calculation

```ts
function calculateTaskPoints(task: Task, event: 'complete' | 'missed'): number
```

**On Completion:**
1. Start with the category's `baseReward`
2. **+10 bonus** if the task is `important-urgent`
3. **+5 bonus** if completed more than 24 hours before the due date
4. **+5 bonus** if completed more than 72 hours before the due date

**On Miss (overdue/deletion):**
1. Start with `baseReward × penaltyMultiplier`
2. **+10 extra** if the task is `important-urgent`

#### Score Aggregation

Returns `total` (net score), `rewards` (sum of all reward points), and `penalties` (sum of all penalty points).

#### Weekly Trend Analysis

Compares the last 3 days against the previous 3 days: **up** (recent > previous + 1), **down** (recent < previous - 1), or **stable**.

---

### 16. Service Layer

#### TaskService

| Method | Description |
|--------|-------------|
| `getAll()` | Returns all tasks sorted by: pending first → priority ascending → due date earliest first |
| `getById(id)` | Find a single task by ID |
| `create(data)` | Validates input, generates ID, sets `createdAt`, creates a `Reminder` entry if `dueDate` is provided |
| `update(id, patch)` | Merges partial updates, syncs reminder if `dueDate` changed |
| `toggleStatus(id)` | Completes a pending task (awards points) or reopens a completed task (no penalty) |
| `delete(id)` | Removes task; applies penalty if overdue and category is important |
| `getCompletionStats()` | Returns `{ total, completed, percentage, overdue, dueSoon }` |
| `getTasksByCategory()` | Groups tasks by Eisenhower category for the matrix view |

**Deletion Penalty Logic:** Applies only when task is `pending` AND overdue AND category is `important-urgent` or `important-not-urgent`. This prevents users from deleting overdue critical tasks without consequence.

---

### 17. Reminder & Notification Service

#### Architecture

`ReminderServiceImpl` is a singleton class implementing the Observer pattern:
- **`subscribe(listener)`** — Register a callback; returns an unsubscribe function.
- **`start()`** — Begins a 30-second interval check (plus one immediate check).
- **`stop()`** — Clears the interval.
- **`check()`** — Core logic that evaluates all pending tasks and emits notifications.

#### Notification Types

| Type | Trigger | Toast Style | Duration |
|------|---------|-------------|----------|
| `reminder` | Task approaching deadline (within custom offset or 24h default) | Warning (amber) | 4500ms |
| `overdue` | Task past due date | Error (red) | 6000ms |
| `success` | Task completed | Success (green) | 4500ms |
| `penalty` | Penalty applied | Error (red) | 4500ms |

#### Penalty Application on Overdue

When a task is detected as overdue for the first time: emits notification, calculates penalty via `calculateTaskPoints(task, 'missed')`, records a `RewardEvent`, updates `pointsPenalized`, and sets `reminder.overdueNotified = true`.

#### Throttling

15-second throttle on `check()` to prevent rapid duplicate notifications. Interval runs every 30 seconds.

---

### 18. Analytics Engine

| Function | Purpose |
|----------|---------|
| `getTotalScore()` | Net score = rewards − penalties |
| `getDailyPerformance(days)` | Array of `AnalyticsSnapshot` for last N days (zero-filled for missing days) |
| `getCategoryDistribution()` | Counts tasks per category across all time |
| `getWeeklyTrend()` | 7-day aggregate with trend direction |
| `getPerformanceByCategory()` | 30-day completion rate per category |

**Data Flow:**
```
User toggles task → TaskService.toggleStatus()
  → storage.setTasks() → storage.updateAnalytics()
    → Daily snapshot updated in localStorage

AnalyticsPanel reads:
  → getDailyPerformance(14)   → BarChart (14-day completed tasks)
  → getCategoryDistribution() → DonutChart (category breakdown)
  → getPerformanceByCategory() → Per-category completion rates (30-day)
```

---

### 19. UI Components

#### TaskForm

Create or edit a task with fields: Task Name (required), Description (optional), Category selector (4 Eisenhower quadrants with color coding), Due Date (optional `datetime-local`), and Reminder offset (None / 15m / 1h / 1d).

#### QuadrantView

2×2 CSS grid on large screens, single column on mobile. Each quadrant card contains a colored header with task count badge, and a scrollable task list with toggle, name, description, due date badge, points badges, and hover-revealed edit/delete actions.

#### TaskTable

Full task list with search (text filter by name/description), status filter (All/Pending/Completed), category filter, sortable columns (name, status, category, created, due), visual status badges, and hover-visible row actions.

#### Progress Components

- **`ProgressBar`:** Animated horizontal bar with gradient fill, clamped 0–100.
- **`StatCard`:** Metric card with label, value, subtitle, and tone-based styling (`default`, `success`, `warn`, `danger`).

#### Analytics Charts

- **`BarChart`:** Horizontal bar chart with percentage-based width.
- **`PieLegend`:** Grid legend with CSS `conic-gradient` donut chart for category distribution.
- **`AnalyticsPanel`:** Responsive grid composing 14-day bar chart (2/3 width), donut chart (1/3 width), and per-category completion rates (full width).

#### Toast System

Fixed-position container at bottom-right, stacking up to 5 toasts. Types: `success` (green), `error` (red), `warning` (amber), `info` (slate). Auto-dismisses after configured duration with 200ms exit animation.

---

### 20. Application Shell & Routing

No router library — tabs managed via `useState<Tab>`:

```ts
type Tab = 'dashboard' | 'quadrants' | 'tasks' | 'analytics';
```

#### State Management

| State | Source | Purpose |
|-------|--------|---------|
| `tasks` | `useTasks()` hook | All tasks from localStorage |
| `tab` | `useState` | Active view |
| `theme` | `useState` + `storage.getTheme()` | Light/dark mode |
| `toasts` | `useState` | Active notification stack (max 5) |
| `editing` | `useState<Task \| null>` | Task being edited (shows modal) |
| `showNewTask` | `useState` | Toggles new-task form panel |

#### Seed Data

On first load, 4 sample tasks are seeded across all four Eisenhower quadrants to demonstrate the system.

---

## Part IV — Enterprise Banking System

> **Role-based access · 9 granular permissions · Multi-currency · Financial analytics · PDF export**

---

### 21. System Architecture

#### Core Capabilities

- Role-based authentication with salted password hashing
- Granular permission system (9 distinct permissions)
- Multi-currency accounts (USD, EUR, SYP_NEW, SYP_OLD) with automatic conversion
- Deposit, withdrawal, and inter-account transfers
- Financial analytics with period-based filtering (daily/weekly/monthly/yearly)
- Data export to PDF, CSV, and JSON formats
- Dark mode theme persistence
- Client-side data persistence via localStorage

#### File Structure

```
secure-banking-pyqt6-system/
├── index.html                    — Entry HTML shell
├── vite.config.ts                — Build configuration (single-file output)
├── tsconfig.json                 — TypeScript strict configuration
├── package.json                  — Dependencies and scripts
└── src/
    ├── main.tsx                  — React entry point (StrictMode)
    ├── App.tsx                   — Root component: auth gate + role routing
    ├── types.ts                  — Domain type definitions
    ├── services.ts               — Business logic, DB layer, security utils
    ├── index.css                 — Tailwind config, custom theme, animations
    └── components/
        ├── Login.tsx             — Authentication form
        ├── AdminPanel.tsx        — Employee dashboard + CRUD views
        └── CustomerPanel.tsx     — Customer portal + transactions + analytics
```

#### Data Flow

1. **App.tsx** initializes the database on first load, manages auth state and theme
2. **Login.tsx** validates credentials against the service layer
3. On successful authentication, role determines routing:
   - `employee` → **AdminPanel** (Dashboard, Employee Management, Customer Management)
   - `customer` → **CustomerPanel** (Account Overview, Transactions, Analytics)
4. All state mutations flow through **services.ts**, which reads/writes to localStorage

---

### 22. Type System

#### Roles

```typescript
type Role = 'employee' | 'customer';
```

#### Permissions (9 granular permissions)

| Permission | Description |
|-----------|-------------|
| `view_customers` | Read customer records |
| `add_customers` | Create new customer accounts |
| `edit_customers` | Modify customer information |
| `delete_customers` | Deactivate customer accounts |
| `view_employees` | Read employee records |
| `add_employees` | Create new employee accounts |
| `edit_employees` | Modify employee information |
| `delete_employees` | Deactivate employee accounts |
| `assign_permissions` | Modify permission sets for employees |

#### Domain Entities

**User** — Represents any system user (employee or customer):

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | UUID via `crypto.randomUUID()` |
| `username` | `string` | Unique login identifier |
| `passwordHash` | `string` | SHA-256 hash of salted password |
| `salt` | `string` | 16-byte hex-encoded salt |
| `role` | `Role` | `employee` or `customer` |
| `firstName` | `string` | Given name |
| `lastName` | `string` | Family name |
| `email` | `string` | Contact email |
| `phone` | `string` | Contact phone |
| `createdAt` | `string` | ISO 8601 timestamp |
| `isActive` | `boolean` | Soft-delete flag |
| `permissions` | `Permission[]` | Granted permissions (employees only) |

**Account** — Bank account linked to a user:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | UUID |
| `userId` | `string` | Owner reference |
| `accountNumber` | `string` | 16-digit format `XXXX-XXXX-XXXX-XXXX` |
| `balance` | `string` | Decimal string for precision |
| `currency` | `Currency` | Account denomination |
| `createdAt` | `string` | ISO 8601 timestamp |
| `isActive` | `boolean` | Soft-delete flag |

**Transaction** — Immutable financial record:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | UUID |
| `accountId` | `string` | Source account |
| `type` | `TransactionType` | `deposit`, `withdrawal`, `transfer_in`, `transfer_out` |
| `amount` | `string` | Decimal string in account currency |
| `currency` | `Currency` | Transaction currency |
| `timestamp` | `string` | ISO 8601 timestamp |
| `resultingBalance` | `string` | Post-transaction balance |
| `relatedAccountId` | `string?` | Linked account for transfers |
| `description` | `string?` | User-provided note |

---

### 23. Security Layer

#### Password Hashing

Passwords are never stored in plaintext. The hashing pipeline:

1. **Salt generation**: 16 random bytes via `crypto.getRandomValues()`, encoded as 32-character hex string
2. **Hash computation**: `SHA-256(salt + password + salt)` using `crypto.subtle.digest()`
3. **Verification**: Re-hash provided password with stored salt, compare hex strings

```typescript
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
```

#### Identity Generation

- **User/Account/Transaction IDs**: `crypto.randomUUID()` (v4 UUID)
- **Account numbers**: Four groups of 4 random digits, dash-separated (`XXXX-XXXX-XXXX-XXXX`)

#### Soft Deletion

User and account records are never physically removed. Deactivation sets `isActive = false`, filtering them from all queries while preserving audit trails.

---

### 24. Database Layer

All data persists in browser `localStorage` under namespaced keys:

| Key Constant | localStorage Key | Entity |
|-------------|-----------------|--------|
| `DB.USERS` | `ebs_users` | User records |
| `DB.ACCOUNTS` | `ebs_accounts` | Account records |
| `DB.TRANSACTIONS` | `ebs_transactions` | Transaction records |
| `DB.INIT` | `ebs_initialized` | Initialization flag |

#### Initialization Seed Data

- **2 employee accounts**: `admin` (all permissions), `staff` (customer CRUD only)
- **3 customer accounts**: `john.doe`, `jane.smith`, `alex.wilson`
- **3 accounts**: USD ($12,500), EUR (€8,750), USD ($5,000)
- **Transaction history**: 12 months of synthetic deposit/withdrawal data

---

### 25. Service Layer

#### Financial Precision

All monetary calculations use `decimal.js` with 20-digit precision and round-half-up rounding:

```typescript
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
```

#### Transaction Operations

**Deposit** — Validates positive amount → converts currency → adds to balance → records transaction.

**Withdrawal** — Validates positive amount → converts currency → checks sufficient funds (no overdraft) → subtracts from balance → records transaction.

**Transfer** — Validates different accounts → validates positive amount → converts to source currency for debit and destination currency for credit → checks sufficient funds → creates paired `transfer_out` and `transfer_in` records → atomically updates both accounts.

#### Analytics Service

`getAnalytics()` computes: total deposits and withdrawals within a time period, net balance change, transaction counts by type, monthly aggregation for chart data, and type breakdown for pie chart visualization.

Period filtering: `daily`, `weekly`, `monthly`, `yearly`, or all-time.

#### Permission Helpers

```typescript
function hasPermission(user: User, perm: Permission): boolean {
  return user.role === 'employee' && user.permissions.includes(perm);
}
```

The menu system dynamically renders navigation items based on the employee's permission set.

---

### 26. Authentication & Authorization

#### Login Flow

1. User submits username/password via `Login.tsx`
2. `authenticate()` retrieves all users, finds active match by username
3. Re-hashes provided password with stored salt
4. Compares hash to stored `passwordHash`
5. Returns full `User` object on match, `null` on failure
6. `App.tsx` stores user in state and routes to appropriate panel

#### Role-Based Routing

```
App.tsx
  ├─ !ready → Loading screen (database initializing)
  ├─ !user  → Login component
  └─ user.role
       ├─ 'employee' → AdminPanel
       └─ 'customer' → CustomerPanel
```

#### Permission Gating

Within `AdminPanel`, each view checks permissions before rendering. If `canView` is false, the component renders `<AccessDenied />`. Action buttons (Add, Edit, Delete, Assign Permissions) are conditionally rendered based on individual permissions.

#### Self-Protection

Employees cannot delete their own accounts.

---

### 27. Customer Portal

#### Overview View

Account balance card, account number, currency label, total transaction count, recent 6 transactions with color-coded types, and export buttons (PDF, CSV, JSON).

#### Transaction View

Tabbed interface with Deposit, Withdraw, and Transfer tabs. Each tab validates inputs and calls the appropriate service method.

#### Transaction History

Filterable table with four filter options: `all`, `deposit`, `withdrawal`, `transfer`. Columns: Date, Type, Description, Amount (signed), Balance.

---

### 28. Administration Panel

#### Dashboard View

Active customer count, active employee count, total system assets, today's transaction count, recent 8 system-wide transactions.

#### Employee Management

CRUD interface with permission-aware controls:

| Action | Permission Required |
|--------|-------------------|
| View employee list | `view_employees` |
| Add new employee | `add_employees` |
| Edit employee details | `edit_employees` |
| Deactivate employee | `delete_employees` |
| Modify permissions | `assign_permissions` |

**Permission Editor:** Inline checkbox grid for all 9 permissions, with save/cancel controls.

#### Customer Management

| Action | Permission Required |
|--------|-------------------|
| View customer list | `view_customers` |
| Add new customer | `add_customers` |
| Edit customer details | `edit_customers` |
| Deactivate customer | `delete_customers` |

New customers automatically receive a zero-balance account in the selected currency.

---

### 29. Financial Analytics

#### Period Filtering

| Period | Start Date |
|--------|-----------|
| `daily` | Start of current day |
| `weekly` | 7 days ago |
| `monthly` | 1st of current month |
| `yearly` | January 1st of current year |
| `undefined` | All time (epoch) |

#### Visualizations

- **Pie Chart**: Deposit vs. withdrawal breakdown (Recharts PieChart with inner radius)
- **Bar Chart**: Monthly activity (deposits in green, withdrawals in red)
- **Stat Cards**: Total deposits, total withdrawals, net change, transaction count
- **Monthly Breakdown Table**: Period-by-period detail with net calculation

---

### 30. Data Export

#### CSV Export

RFC 4180-compliant CSV with headers: ID, Type, Amount, Currency, Date, Balance After, Description. Double-quote escaping applied.

#### JSON Export

Serializes data with 2-space indentation. Customer export bundles user info, account details, and full transaction history.

#### PDF Export

Multi-page document using jsPDF:
1. **Header**: Blue banner with system name, report title, generation timestamp
2. **Account Holder Info**: Name, email, phone, account number, currency, balance
3. **Financial Summary Table**: Deposits, withdrawals, net change, transaction count
4. **Transaction History Table**: Last 50 transactions with date, type, amount, balance, description
5. **Footer**: Page numbering with confidential marking

#### Download Mechanism

```typescript
function downloadFile(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
```

---

### 31. Currency System

#### Supported Currencies

| Code | Label | Symbol | Rate to USD |
|------|-------|--------|-------------|
| `USD` | US Dollar | `$` | 1.0 |
| `EUR` | Euro | `€` | 1.09 |
| `SYP_NEW` | Syrian Pound (New) | `S£` | 0.00008 |
| `SYP_OLD` | Syrian Pound (Old) | `S£(Old)` | 0.0000008 |

#### Conversion Logic

All conversions route through USD as the base currency:

```typescript
function convertCurrency(amount: Decimal, from: Currency, to: Currency): Decimal {
  if (from === to) return amount;
  const inUsd = amount.mul(RATES_TO_USD[from]);
  return inUsd.div(RATES_TO_USD[to]);
}
```

---

## Part V — NEXUS TTT: Enterprise Tic Tac Toe System

> **16 modular subsystems · Minimax α-β pruning · Procedural audio · Three AI difficulty tiers · Replay system**

---

### 32. System Architecture

NEXUS TTT is a single-file React application composed of 16 modular subsystems. The architecture follows strict separation of concerns: pure game logic, AI computation, data persistence, and UI rendering are isolated into independent, testable units.

```
┌─────────────────────────────────────────────────┐
│           SECTION 16 — Root Orchestrator        │
│   (Subsystem init, persistence wiring, render)  │
├─────────────────────────────────────────────────┤
│           SECTION 15 — UI Components            │
│   (Theme-aware React presentation layer)        │
├─────────────────────────────────────────────────┤
│           SECTION 14 — State Machine            │
│   (useReducer central state + action dispatch)  │
├────────┬──────────┬─────────┬──────────┬────────┤
│  13    │   12     │   11    │   10     │   09   │
│ Theme  │ Replay   │ Stats   │ Storage  │ Sound  │
│ Engine │ System   │ Engine  │ Manager  │ Manager│
├────────┴──────────┴─────────┴──────────┴────────┤
│           SECTION 08 — AI Controller            │
│   (Difficulty abstraction + async orchestration) │
├─────────────────────────────────────────────────┤
│           SECTION 07 — AI Framework             │
│   (Minimax α-β / Heuristic / Weighted Random)   │
├─────────────────────────────────────────────────┤
│           SECTION 06 — Board Manager            │
│   (Mutable board state + undo history)          │
├─────────────────────────────────────────────────┤
│           SECTION 05 — Game Engine              │
│   (Pure functional game logic, zero UI)         │
├─────────────────────────────────────────────────┤
│   04 — Error Handling  │  03 — Logging  │  02  │
├────────────────────────┼─────────────────┼──────┤
│          SECTION 01 — Configuration System      │
│   (Immutable constants, enums, theme tokens)    │
└─────────────────────────────────────────────────┘
```

#### Dependency Flow

- **Configuration** is consumed by all subsystems. No magic values exist outside `APP_CONFIG`.
- **Logging** and **Error Handling** are cross-cutting concerns used throughout.
- **Game Engine** is a pure static class — no instantiation, no side effects.
- **AI Framework** consumes only `GameEngine` methods; it never touches the DOM.
- **State Machine** is the sole source of truth for the UI; components dispatch actions and never call business logic directly.

---

### 33. Configuration System

#### Global Configuration

```js
APP_CONFIG = Object.freeze({
  version: "1.0.0",
  schemaVersion: 2,
  appName: "NEXUS TTT",
  maxReplayHistory: 50,
  aiThinkingDelayMs: { easy: 500, medium: 750, hard: 1100 },
  animationDurationMs: {
    cellReveal: 350, winLine: 600, boardReset: 400,
    screenTransition: 500, replayStep: 700,
  },
  sounds: { enabled: true, volume: 0.4 },
  defaultTheme: "dark",
  defaultDifficulty: "medium",
  defaultGameMode: "vs-ai",
  storageKey: "nexus_ttt_v2",
  storageBackupKey: "nexus_ttt_backup",
});
```

#### Enum Definitions

| Enum | Values | Purpose |
|------|--------|---------|
| `GAME_MODES` | `VS_AI`, `VS_HUMAN`, `AI_VS_AI` | Game mode identifiers |
| `DIFFICULTY` | `EASY`, `MEDIUM`, `HARD` | AI difficulty tiers |
| `PLAYER` | `X`, `O`, `NONE` | Player marker identifiers |

#### Board Geometry

- `CELL_COUNT = 9`, `BOARD_SIZE = 3`
- `WIN_PATTERNS` — All 8 winning index sets (3 rows, 3 columns, 2 diagonals)
- `MOVE_PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7]` — Center → corners → edges ordering

#### Theme Token System

Three complete theme palettes:

| Theme | Name | Character |
|-------|------|-----------|
| `dark` | Obsidian | Deep black background, gold accent |
| `light` | Ivory | Warm parchment surface, brown accent |
| `neon` | Synthwave | Ultra-dark purple, magenta/cyan players |

Each theme defines 19 tokens: `bg`, `surface`, `surfaceAlt`, `border`, `accent`, `accentLight`, `accentDark`, `text`, `textMuted`, `textDim`, `playerX`, `playerO`, `win`, `gridLine`, `cellHover`, `shadow`, `glow`, `particleColor`.

---

### 34. Logging Framework

A structured, levelled, context-tagged logging system. Each subsystem receives its own `Logger` instance, maintaining a rolling in-memory history of up to 250 entries.

| Level | Value | Use Case |
|-------|-------|----------|
| `DEBUG` | 0 | Verbose operational traces (filtered in production) |
| `INFO` | 1 | Normal operational events |
| `WARN` | 2 | Recoverable anomalies |
| `ERROR` | 3 | Exceptional conditions |

**Logger instances:** `LOG.engine`, `LOG.ai`, `LOG.storage`, `LOG.ui`, `LOG.replay`, `LOG.sound`, `LOG.stats`, `LOG.app`

---

### 35. Error Handling Framework

Typed application errors with machine-readable codes, diagnostic context, and timestamps.

#### AppError

Extends `Error` with `code`, `context`, and `timestamp`.

#### Error Code Registry

| Code | Identifier | Description |
|------|------------|-------------|
| E001 | `STORAGE_READ` | Failed to read from localStorage |
| E002 | `STORAGE_WRITE` | Failed to write to localStorage |
| E003 | `STORAGE_CORRUPT` | Both primary and backup storage corrupted |
| E004 | `AI_COMPUTE` | AI strategy computation failure |
| E005 | `REPLAY_INVALID` | Invalid replay data encountered |
| E006 | `PROFILE_MISS` | Player profile not found |
| E007 | `MOVE_INVALID` | Attempt to place on occupied cell |

#### safeExecute

```
safeExecute(fn, fallback, code, logger) → T
```

Wraps a function in try/catch. On failure, wraps the original error in an `AppError`, logs it, and returns the caller-supplied `fallback`.

---

### 36. Core Game Engine

Pure functional game logic with zero UI coupling. All methods are static — no mutable state, fully deterministic, independently testable.

| Method | Signature | Description |
|--------|-----------|-------------|
| `checkWin` | `(board, player) → { won, pattern }` | Tests all 8 win patterns |
| `checkDraw` | `(board) → boolean` | Returns `true` if no empty cells |
| `getEmptyCells` | `(board) → number[]` | Collects unoccupied indices |
| `getOpponent` | `(player) → string` | Returns `O` for `X` and vice versa |
| `createEmptyBoard` | `() → Array<null>` | Fresh 9-cell board |
| `applyMove` | `(board, index, player) → Array` | Immutable move; throws `AppError` if occupied |
| `evaluateBoard` | `(board) → { status, winner, winPattern }` | Full board evaluation |
| `countThreats` | `(board, player) → number` | Lines with 2 pieces + 1 empty |
| `heuristicScore` | `(board, player) → number` | Positional scoring (center=+3, corners=+1, threats=+10) |

#### Board Representation

```
 0 │ 1 │ 2
───┼───┼───
 3 │ 4 │ 5
───┼───┼───
 6 │ 7 │ 8
```

Each cell is `PLAYER.X` (`"X"`), `PLAYER.O` (`"O"`), or `PLAYER.NONE` (`null`). `applyMove` creates a shallow copy before placing, preserving immutability for minimax tree traversal.

---

### 37. AI Framework

Three pluggable strategy implementations, each conforming to: `getBestMove(board, aiPlayer) → number`.

#### Transposition Table

Memoization cache for minimax. Encodes board state + maximizing player into a compact string key. Tracks hit/miss statistics: `{ size, hits, misses, hitRate }`.

#### Hard AI — Minimax α-β + Memo

**Algorithm:** Minimax with alpha-beta pruning and transposition table memoization.

- **Provably optimal** — cannot be defeated.
- Move ordering: center → corners → edges (reduces tree depth via early cutoffs).
- Depth-aware scoring: `10 - depth` for AI wins, `depth - 10` for opponent wins, `0` for draws.
- Alpha-beta cutoffs: `if (beta <= alpha) break;`
- Full game tree exploration for 3×3 board (at most 9! = 362,880 leaf nodes, practically far fewer with pruning).

#### Medium AI — Heuristic + Noise

Rule-based priority system with probabilistic error injection:

1. Take immediate win if available (100%).
2. Block opponent's winning move (88% probability — intentionally imperfect).
3. Random mistake injection (22% chance of suboptimal play).
4. Strategic fallback: center → corner → random.

Creates a beatable opponent that rewards careful play while remaining engaging.

#### Easy AI — Weighted Random

Weighted random selection with minimal tactical awareness:
- 30% chance to detect and take an immediate win.
- Center cell receives 2× weight.
- Weighted random selection via cumulative probability walk.

---

### 38. Difficulty Abstraction Layer

#### AIController

Factory + async orchestration for AI strategy selection.

```js
computeMove(board, player, difficulty) → Promise<number>
```

- Resolves the appropriate strategy from `_strategies`.
- Applies a deliberate UX thinking delay (500ms easy / 750ms medium / 1100ms hard).
- Wraps strategy execution in `safeExecute` for error resilience.
- Returns the selected cell index asynchronously, ensuring the UI thread is never blocked.

---

### 39. Sound Manager

Procedural Web Audio API sound synthesis — no external audio files. All tones generated at runtime using oscillator nodes and gain envelopes.

#### ADSR Envelope Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `frequency` | 440 Hz | Oscillator frequency |
| `type` | `"sine"` | Waveform type |
| `duration` | 0.15s | Total tone duration |
| `gain` | 0.3 | Peak volume |
| `attack` | 0.01s | Fade-in time |
| `decay` | 0.05s | Decay to sustain |
| `sustain` | 0.6 | Sustain amplitude ratio |
| `release` | 0.06s | Fade-out time |

#### Sound Events

| Method | Description | Technique |
|--------|-------------|-----------|
| `playHover()` | Soft hover tick | 680 Hz sine, 50ms |
| `playMove(player)` | Player move placement | Triangle wave; X = 466 Hz, O = 349 Hz |
| `playWin()` | Ascending fanfare | Four-note: C5 → E5 → G5 → C6 |
| `playDraw()` | Descending tones | Three-note sawtooth: E4 → D4 → C4 |
| `playUndo()` | Step-back tone | 280 Hz triangle |
| `playReset()` | New game chime | Two-note: G4 → C5 |
| `playThemeChange()` | Theme switch swish | 800 Hz sine, 120ms |

---

### 40. Persistent Storage Layer

Versioned JSON schema with automatic backup and corruption recovery.

#### Data Schema

```js
{
  statistics: { ... },
  profiles: { ... },
  replays: [ ... ],
  settings: {
    theme: "dark",
    difficulty: "medium",
    gameMode: "vs-ai",
    soundEnabled: true,
    volume: 0.4,
    playerNames: { X: "Player 1", O: "Player 2" },
  },
  schemaVersion: 2,
  savedAt: <timestamp>,
}
```

#### Storage Strategy

- **Primary key:** `nexus_ttt_v2` / **Backup key:** `nexus_ttt_backup`
- **Save:** Copy primary to backup, then overwrite primary.
- **Load:** Primary → parse → migrate. On failure: backup → defaults.
- **Migration:** Non-destructive — only adds missing fields from `defaultData()`.

---

### 41. Player Profile Manager

Per-player identity, symbol association, and rolling statistics:

```js
{
  id: string,
  name: string,
  symbol: "X" | "O",
  createdAt: number,
  stats: { wins, losses, draws, totalGames, winRate },
}
```

Operations: `createProfile()`, `updateStats()`, `getProfile()`, `getAll()`.

---

### 42. Statistics & Analytics Engine

#### recordGame

Updates: `totalGames`, `totalMoves`, `averageMovesPerGame`, `wins[winner]`, `byDifficulty[difficulty]` (VS_AI only), `streaks.current` (incremented on human wins, reset on losses/draws), `streaks.best`.

#### Derived Metrics

- **`winRate(player)`** — Win percentage (0–100)
- **`getSummary()`** — Complete analytics snapshot including win rates, difficulty breakdowns, and streak data

---

### 43. Replay System

Records every move during a game session and supports frame-by-frame board reconstruction.

#### Recording Lifecycle

1. **`startRecording(meta)`** — Initializes with metadata (game mode, difficulty, player names)
2. **`recordMove(player, index)`** — Appends move with timestamp
3. **`stopRecording(result)`** — Finalizes with game result, prepends to history

#### Replay Record

```js
{
  id: "rpl_<timestamp>",
  gameMode, difficulty, playerNames,
  moves: [{ player, index, ts }, ...],
  startTime, endTime, duration,
  result: { winner },
}
```

#### Playback

`ReplaySystem.getBoardAtFrame(replay, frame)` reconstructs the board state at any frame by replaying moves 0 through `frame - 1` onto a fresh board. Supports up to 50 stored replays with FIFO eviction.

---

### 44. Central State Machine

A `useReducer`-powered central state machine with 14 action types.

#### Action Types

| Action | Payload | Behavior |
|--------|---------|----------|
| `NAVIGATE` | `{ screen }` | Switches the active screen |
| `SET_GAME_MODE` | `{ mode }` | Updates the game mode |
| `SET_DIFFICULTY` | `{ difficulty }` | Updates difficulty setting |
| `SET_THEME` | `{ theme }` | Switches visual theme |
| `SET_SOUND` | `{ enabled }` | Toggles sound effects |
| `SET_VOLUME` | `{ volume }` | Adjusts audio volume |
| `SET_PLAYER_NAME` | `{ player, name }` | Updates player display name |
| `GAME_START` | — | Resets board, starts new game |
| `MAKE_MOVE` | `{ index, player }` | Applies a move, evaluates board state |
| `UNDO_MOVE` | — | Reverts 1 move (2 in VS_AI mode) |
| `AI_THINKING` | `{ thinking }` | Toggles AI computation indicator |
| `UPDATE_STATISTICS` | `{ statistics }` | Replaces statistics block |
| `SET_REPLAYS` | `{ replays }` | Replaces replay list |
| `CLEAR_WIN_CELEBRATION` | — | Dismisses end-of-game overlay |

#### Undo Logic

In `VS_AI` mode, undo removes 2 moves (human's last + AI's response). In `VS_HUMAN` mode, only 1 move is undone. Board is reconstructed by replaying the truncated `moveHistory` array via `buildBoardFromHistory()`.

---

### 45. UI Component Framework

#### Component Inventory

| Component | Purpose | Notable Details |
|-----------|---------|-----------------|
| `BackgroundParticles` | Atmospheric floating particles | 14 particles, CSS keyframe animation |
| `ThinkingDots` | AI computation indicator | Three animated dots, staggered delays |
| `Btn` | Multi-variant action button | `primary`, `small`, `danger`, `disabled` variants |
| `NavBtn` | Navigation tab button | Active state highlighting |
| `GameCell` | Individual board cell | Pop animation, pulse glow on win cells |
| `GameBoard` | 3×3 grid container | CSS Grid, responsive sizing |
| `StatusBanner` | Game state display | Dynamic message for turns, wins, draws |
| `ScorePanel` | Win/draw score display | Three-column with player names |
| `DiffBadge` | Difficulty indicator pill | Color-coded (green/orange/red) |
| `EndOverlay` | Victory/draw modal | Backdrop blur, play-again and menu actions |
| `AppHeader` | Top navigation bar | Logo, navigation, sound toggle |

#### Screen Components

| Screen | Description |
|--------|-------------|
| `MenuScreen` | Mode selection, difficulty picker, player names, quick stats |
| `GameScreen` | Active board, status, score, timeline, undo/new controls |
| `StatsScreen` | Full statistics dashboard with difficulty breakdown |
| `ReplaysScreen` | Archive list with frame-by-frame viewer |
| `SettingsScreen` | Theme selector, audio controls, data reset |

#### Animation System

| Animation | Name | Purpose |
|-----------|------|---------|
| Pop | `nttt-pop` | Cell marker placement (scale + rotate bounce) |
| Win Pulse | `nttt-win-pulse` | Winning cell border pulsing |
| Dot | `nttt-dot` | Thinking indicator dots |
| Fade In | `nttt-fade-in` | Overlay background fade |
| Overlay Pop | `nttt-overlay-pop` | End-of-game modal entrance |
| Particle | `nttt-particle` | Background floating particles |

#### Responsive Typography

Font sizes use CSS `clamp()` for responsive scaling:
- Title: `clamp(2.8rem, 9vw, 4.5rem)`
- Cell markers: `clamp(1.8rem, 7vw, 3.6rem)`
- Status messages: `clamp(1rem, 3vw, 1.4rem)`

Primary font: `Playfair Display` (serif) with `Georgia` fallback.

---

### 46. Root Application Orchestrator

#### Initialization Sequence

1. Load persisted data from `storageManager.load()`.
2. Instantiate `ThemeEngine` with stored theme preference.
3. Instantiate `StatisticsEngine` with stored statistics.
4. Hydrate `replaySystem` with persisted replay records.
5. Create `useReducer` with initial state merged from persisted settings.

#### Persistence Wiring

- **Debounced auto-save:** 600ms debounce timer saves statistics, replays, and settings whenever values change.
- **Replay recording:** `startRecording` triggered when `gameStatus` transitions to `"playing"` with `moveCount === 0`. Each move recorded via `recordMove` when `recentlyPlaced` changes.
- **Game end callback:** Stops replay recording, updates statistics via `statsEngine.recordGame()`, dispatches updated state.

---

## Part VI — Cross-Project Analysis

---

### 47. Architectural Patterns

| Pattern | Calculator | TaskFlow | Banking | NEXUS TTT |
|---------|-----------|----------|---------|-----------|
| State management | Zustand store | useState + hooks | useState + hooks | useReducer state machine |
| Component architecture | Component-per-mode | View-per-tab | Panel-per-role | Screen-per-state |
| Data flow | Unidirectional | Unidirectional | Unidirectional | Action dispatch |
| Separation of concerns | Service layer isolated | Service layer isolated | Services.ts monolith | 16 isolated subsystems |
| Type safety | Strict TypeScript | Strict TypeScript | Strict TypeScript | JavaScript (no TS) |

### 48. State Management Approaches

| Project | Approach | Trade-off |
|---------|----------|-----------|
| Calculator | **Zustand** — Single centralized store with middleware | Best for complex cross-cutting state; minimal boilerplate |
| TaskFlow | **useState + custom hooks** — Decentralized | Simpler for smaller apps; hooks encapsulate domain logic |
| Banking | **useState + services.ts** — Monolithic service layer | All mutations through one module; simpler to reason about |
| NEXUS TTT | **useReducer** — Action-based state machine | Most structured; each action is traceable and testable |

### 49. Persistence Strategies

| Project | Keys | Backup | Migration | Data Volume |
|---------|------|--------|-----------|-------------|
| Calculator | Zustand persist | None | None | Low (history, favorites) |
| TaskFlow | 5 namespaced keys | None | None | Medium (tasks, rewards, analytics) |
| Banking | 4 namespaced keys | None | None | Medium (users, accounts, transactions) |
| NEXUS TTT | 2 keys (primary + backup) | Dual-key | Versioned schema | High (statistics, profiles, replays) |

### 50. UI Design Systems

| Project | Theming | Color Strategy | Visual Effects |
|---------|---------|----------------|----------------|
| Calculator | 9 mode-specific accent colors | Per-mode gradient backgrounds | Glass morphism, backdrop blur, grid overlay |
| TaskFlow | Light/dark toggle | Per-quadrant color coding | Minimal transitions |
| Banking | Light/dark with custom tokens | Banking blue palette | Fade-in/slide-in animations |
| NEXUS TTT | 3 complete palettes (19 tokens each) | CSS custom properties | Particles, pop animations, pulse glow |

---

## Appendix A: Default Credentials (Banking System)

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Admin | `admin` | `admin123` | All 9 permissions |
| Staff | `staff` | `staff123` | `view_customers`, `add_customers`, `edit_customers` |
| Customer | `john.doe` | `customer123` | None |
| Customer | `jane.smith` | `customer123` | None |
| Customer | `alex.wilson` | `customer123` | None |

## Appendix B: localStorage Key Reference (Banking System)

| Key | Content | Format |
|-----|---------|--------|
| `ebs_users` | All user records | JSON array of User objects |
| `ebs_accounts` | All account records | JSON array of Account objects |
| `ebs_transactions` | All transaction records | JSON array of Transaction objects |
| `ebs_initialized` | Database initialization flag | String `"true"` |
| `ebs_theme` | Theme preference | String `"dark"` or `"light"` |

## Appendix C: localStorage Key Reference (TaskFlow)

| Key | Data Type | Retention |
|-----|-----------|-----------|
| `etm_tasks_v1` | `Task[]` | Unlimited |
| `etm_rewards_v1` | `RewardEvent[]` | Last 500 events |
| `etm_reminders_v1` | `Reminder[]` | Unlimited |
| `etm_analytics_v1` | `AnalyticsSnapshot[]` | Last 90 days |
| `etm_theme_v1` | `'light' \| 'dark'` | Single value |

## Appendix D: NEXUS TTT Singleton Instances

| Instance | Class | Purpose |
|----------|-------|---------|
| `LOG` | `Logger` (×8) | Per-subsystem logging |
| `aiController` | `AIController` | AI strategy orchestration |
| `soundManager` | `SoundManager` | Procedural audio synthesis |
| `storageManager` | `StorageManager` | localStorage persistence |
| `replaySystem` | `ReplaySystem` | Game recording/playback |

---

*This document was synthesized exclusively from the source code and project documentation of all four applications. All technical details, function signatures, algorithms, and architectural decisions reflect actual implementations.*