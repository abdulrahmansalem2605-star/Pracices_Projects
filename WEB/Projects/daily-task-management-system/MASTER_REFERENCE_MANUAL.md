# TaskFlow — Daily Task Management System

## Master Reference Manual

**Project:** TaskFlow — Achieve your Tasks  
**Type:** Single-Page Application (SPA)  
**Stack:** React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4  
**Architecture:** Client-side only — no backend, data persisted in `localStorage`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack & Build Configuration](#2-technology-stack--build-configuration)
3. [Type System & Data Models](#3-type-system--data-models)
4. [Eisenhower Matrix — Core Framework](#4-eisenhower-matrix--core-framework)
5. [Gamification Engine — Points, Rewards & Penalties](#5-gamification-engine--points-rewards--penalties)
6. [Service Layer](#6-service-layer)
7. [Persistence Layer](#7-persistence-layer)
8. [Reminder & Notification Service](#8-reminder--notification-service)
9. [Analytics Engine](#9-analytics-engine)
10. [UI Components](#10-ui-components)
11. [Application Shell & Routing](#11-application-shell--routing)
12. [Utility Functions](#12-utility-functions)

---

## 1. Project Overview

TaskFlow is a **daily task management system** that applies behavioral psychology principles through the Eisenhower Matrix methodology. Tasks are categorized by importance and urgency into four quadrants, with a gamification layer that rewards task completion and penalizes overdue abandonment.

### Key Design Decisions

- **Zero backend** — all state lives in `localStorage`, making the app fully offline-capable.
- **Single-file build** — `vite-plugin-singlefile` inlines all assets into one HTML file for easy deployment.
- **No external UI library** — all components are hand-built with Tailwind CSS, maintaining full control over design.
- **Dark mode support** — system-preference detection with manual toggle, persisted to `localStorage`.

### Application Views

| View | Purpose |
|------|---------|
| **Dashboard** | Overview with progress bar, score, weekly trend, and a preview of the Eisenhower Matrix |
| **Quadrants** | Full Eisenhower Matrix grid — tasks organized by importance/urgency |
| **Task Table** | Sortable, filterable table of all tasks with search |
| **Analytics** | Bar charts for 14-day performance, donut chart for category distribution, per-category completion rates |

---

## 2. Technology Stack & Build Configuration

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.3 | UI framework |
| `react-dom` | 19.2.3 | DOM renderer |
| `clsx` | 2.1.1 | Conditional class names |
| `tailwind-merge` | 3.4.0 | Merge Tailwind classes without conflicts |
| `tailwindcss` | 4.1.17 | Utility-first CSS framework |
| `@tailwindcss/vite` | 4.1.17 | Tailwind Vite plugin |
| `vite` | 7.2.4 | Build tool |
| `@vitejs/plugin-react` | 5.1.1 | React Fast Refresh for Vite |
| `vite-plugin-singlefile` | 2.3.0 | Inlines all JS/CSS into a single HTML file |
| `typescript` | 5.9.3 | Static type checking |

### Vite Configuration

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

- **`viteSingleFile()`** — Inlines all bundled JS and CSS into `index.html`, producing a single portable file.
- **Path alias `@/`** — Maps to `src/` for clean imports (e.g., `@/lib/storage`).

### TypeScript Configuration

- **Target:** ES2020
- **Strict mode** enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **JSX:** `react-jsx` (automatic runtime)
- **Module resolution:** Bundler mode with path mapping `@/* → src/*`

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build (single HTML file) |
| `npm run preview` | Preview the production build locally |

---

## 3. Type System & Data Models

### Core Types (`src/types.ts`)

#### `EisenhowerCategory`

The four quadrants of the Eisenhower Matrix:

```ts
type EisenhowerCategory =
  | 'important-urgent'
  | 'important-not-urgent'
  | 'not-important-urgent'
  | 'not-important-not-urgent';
```

#### `Task`

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

#### `RewardEvent`

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

#### `Reminder`

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

#### `AnalyticsSnapshot`

Daily aggregated metrics for historical analytics:

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

## 4. Eisenhower Matrix — Core Framework

The Eisenhower Matrix classifies tasks along two axes: **Importance** and **Urgency**.

### Quadrant Definitions (`CATEGORY_META`)

Each category carries metadata driving UI rendering, point calculations, and sorting:

| Quadrant | Key | Priority | Base Reward | Penalty Multiplier | Description |
|----------|-----|----------|-------------|---------------------|-------------|
| **Important & Urgent** | `important-urgent` | 1 | 20 pts | 2.0× | Crisis, deadlines, problems |
| **Important & Not Urgent** | `important-not-urgent` | 2 | 15 pts | 1.5× | Prevention, planning, development |
| **Not Important & Urgent** | `not-important-urgent` | 3 | 8 pts | 1.0× | Interruptions, some calls/emails |
| **Not Important & Not Urgent** | `not-important-not-urgent` | 4 | 5 pts | 0.5× | Trivia, time wasters |

Each category also defines:
- **`color`** — Tailwind text color (e.g., `text-red-700`)
- **`bg`** — Tailwind background (e.g., `bg-red-50`)
- **`border`** — Tailwind border color (e.g., `border-red-200`)
- **`short`** — Label used in compact views: "Do First", "Schedule", "Delegate", "Eliminate"

### Quadrant Rendering (`QuadrantView`)

`src/components/QuadrantView.tsx` renders a 2×2 grid:
- Categories are displayed in priority order: Important-Urgent → Important-Not-Urgent → Not Important-Urgent → Not Important-Not-Urgent.
- Each quadrant is a card with a colored header, task count badge, and a scrollable task list.
- Empty quadrants show a placeholder with icon and "Add tasks to this quadrant" text.
- Each task row includes: toggle checkbox, name (with strikethrough if completed), description, due date badge, points badge, created date, and hover-revealed edit/delete buttons.

---

## 5. Gamification Engine — Points, Rewards & Penalties

### Point Calculation (`calculateTaskPoints`)

```ts
function calculateTaskPoints(task: Task, event: 'complete' | 'missed'): number
```

**On Completion:**
1. Start with the category's `baseReward`.
2. **+10 bonus** if the task is `important-urgent`.
3. **+5 bonus** if completed more than 24 hours before the due date.
4. **+5 bonus** if completed more than 72 hours before the due date.

**On Miss (overdue/deletion):**
1. Start with `baseReward × penaltyMultiplier`.
2. **+10 extra** if the task is `important-urgent`.

### Score Aggregation (`getTotalScore`)

Returns:
- `total` — Net score (rewards minus penalties)
- `rewards` — Sum of all reward points earned
- `penalties` — Sum of all penalty points lost

### Weekly Trend Analysis (`getWeeklyTrend`)

Compares the last 3 days against the previous 3 days:
- **`up`** — Recent > Previous + 1
- **`down`** — Recent < Previous - 1
- **`stable`** — Otherwise

---

## 6. Service Layer

### TaskService (`src/lib/taskService.ts`)

A static class providing all CRUD operations and derived metrics:

| Method | Description |
|--------|-------------|
| `getAll()` | Returns all tasks sorted by: pending first → priority (ascending) → due date (earliest first) |
| `getById(id)` | Find a single task by ID |
| `create(data)` | Validates input, generates ID, sets `createdAt`, creates a `Reminder` entry if `dueDate` is provided |
| `update(id, patch)` | Merges partial updates, syncs reminder if `dueDate` changed |
| `toggleStatus(id)` | Completes a pending task (awards points) or reopens a completed task (no penalty) |
| `delete(id)` | Removes task; applies penalty if overdue and category is important |
| `getCompletionStats()` | Returns `{ total, completed, percentage, overdue, dueSoon }` |
| `getTasksByCategory()` | Groups tasks by Eisenhower category for the matrix view |

**Sort Order in `getAll()`:**
1. Status: `pending` before `completed`
2. Priority: `important-urgent` (1) → `not-important-not-urgent` (4)
3. Due date: earliest first; tasks without due dates sort last

**Deletion Penalty Logic:**
- Applies only when: task is `pending` AND overdue AND category is `important-urgent` or `important-not-urgent`.
- The penalty prevents users from deleting overdue critical tasks without consequence.

---

## 7. Persistence Layer

### Storage API (`src/lib/storage.ts`)

All data is persisted to `localStorage` with namespaced keys:

| Key | Data Type | Retention |
|-----|-----------|-----------|
| `etm_tasks_v1` | `Task[]` | Unlimited |
| `etm_rewards_v1` | `RewardEvent[]` | Last 500 events |
| `etm_reminders_v1` | `Reminder[]` | Unlimited |
| `etm_analytics_v1` | `AnalyticsSnapshot[]` | Last 90 days |
| `etm_theme_v1` | `'light' \| 'dark'` | Single value |

### Safe Parsing

```ts
function safeParse<T>(value: string | null, fallback: T): T
```

Wraps `JSON.parse` with a fallback to handle corrupted or missing data gracefully.

### Analytics Auto-Update

Every call to `storage.setTasks()` triggers `updateAnalytics()`, which:
1. Computes today's snapshot from the current task list.
2. Aggregates rewards and penalties for the day.
3. Updates or appends the snapshot for today's date.

### Initialization & Seed Data

On first load (`storage.init()`), the app seeds 4 sample tasks:
1. "Review quarterly OKRs" — `important-not-urgent`, due in 3 days
2. "Fix production checkout bug" — `important-urgent`, due in 6 hours
3. "Answer non-critical Slack messages" — `not-important-urgent`, no due date
4. "Browse design inspiration" — `not-important-not-urgent`, completed 1 day ago with 5 points

---

## 8. Reminder & Notification Service

### Architecture (`src/lib/reminderService.ts`)

`ReminderServiceImpl` is a singleton class implementing the Observer pattern:

- **`subscribe(listener)`** — Register a callback; returns an unsubscribe function.
- **`start()`** — Begins a 30-second interval check (plus one immediate check).
- **`stop()`** — Clears the interval.
- **`check()`** — Core logic that evaluates all pending tasks and emits notifications.

### Notification Types

| Type | Trigger | Toast Style | Duration |
|------|---------|-------------|----------|
| `reminder` | Task approaching deadline (within custom offset or 24h default) | Warning (amber) | 4500ms |
| `overdue` | Task past due date | Error (red) | 6000ms |
| `success` | Task completed | Success (green) | 4500ms |
| `penalty` | Penalty applied | Error (red) | 4500ms |

### Reminder Offset Logic

1. If the task has a custom `reminderOffset` (15min, 1hr, 24hr), fire when `minutesLeft ≤ offset`.
2. If no custom offset, fall back to `isDueSoon(task, 24)` — fire within 24 hours of deadline.
3. Once fired, `reminder.reminded = true` prevents duplicate notifications.

### Throttling

- The `check()` method enforces a **15-second throttle** to prevent rapid duplicate notifications.
- The interval runs every **30 seconds**, balancing responsiveness with performance.

### Penalty Application on Overdue

When a task is detected as overdue for the first time:
1. Emits an `overdue` notification.
2. Calculates penalty points via `calculateTaskPoints(task, 'missed')`.
3. Records a `RewardEvent` of type `penalty`.
4. Updates the task's `pointsPenalized` field.
5. Sets `reminder.overdueNotified = true` to prevent re-triggering.

---

## 9. Analytics Engine

### Functions (`src/lib/analytics.ts`)

| Function | Purpose |
|----------|---------|
| `getTotalScore()` | Net score = rewards − penalties |
| `getDailyPerformance(days)` | Returns an array of `AnalyticsSnapshot` for the last N days (zero-filled for missing days) |
| `getCategoryDistribution()` | Counts tasks per category across all time |
| `getWeeklyTrend()` | 7-day aggregate with trend direction (up/down/stable) |
| `getPerformanceByCategory()` | 30-day completion rate per category |

### Data Flow

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

## 10. UI Components

### TaskForm (`src/components/TaskForm.tsx`)

**Purpose:** Create or edit a task.

**Fields:**
- Task Name (required, validated)
- Description (optional textarea)
- Category selector (4 Eisenhower quadrants, visual radio buttons with color coding)
- Due Date (optional `datetime-local` input)
- Reminder offset (None / 15m / 1h / 1d — nested inside the due date section)

**Validation:**
- Name cannot be empty.
- Due date must be a valid date if provided.
- Category is required (defaults to `important-not-urgent`).

**Behavior:**
- On create: resets all fields after submission.
- On edit: pre-fills from the `initial` prop, retains values on cancel.

### QuadrantView (`src/components/QuadrantView.tsx`)

**Purpose:** Visual Eisenhower Matrix.

**Layout:** 2×2 CSS grid on large screens, single column on mobile.

**Each quadrant card contains:**
- Header with color dot, label, task count, and short description.
- Task list with: toggle button, name, description, due date badge (with overdue/due-soon styling), points awarded/penalized badges, created date, and hover-visible edit/delete actions.

### TaskTable (`src/components/TaskTable.tsx`)

**Purpose:** Full task list with filtering, sorting, and search.

**Features:**
- **Search:** Text input filters by name or description (case-insensitive).
- **Status filter:** All / Pending / Completed.
- **Category filter:** All / each Eisenhower category.
- **Sortable columns:** Task name, Status, Category, Created, Due — each toggles ascending/descending.
- **Visual indicators:** Status badges (green for completed, red for overdue, amber for due soon, slate for pending).
- **Row actions:** Edit and delete buttons appear on hover.

### Progress Components (`src/components/Progress.tsx`)

**`ProgressBar`:** Animated horizontal bar with gradient fill, clamped 0–100, with a subtle ring overlay.

**`StatCard`:** Metric card with label, value, subtitle, optional icon, and tone-based styling (`default`, `success`, `warn`, `danger`). Used for Total Score, Weekly Trend, Rewards, and Penalties on the dashboard.

### Analytics Charts (`src/components/AnalyticsCharts.tsx`)

**`BarChart`:** Horizontal bar chart with percentage-based width relative to the maximum value. Used for 14-day task completion history.

**`PieLegend`:** Grid legend with color dots and percentage breakdown. Paired with a CSS `conic-gradient` donut chart for category distribution.

**`AnalyticsPanel`:** Composes the above into a responsive grid:
- 14-day bar chart (2/3 width)
- Category distribution donut (1/3 width)
- Performance by category (full width, 4-column grid with individual progress bars)

### Toast System (`src/components/Toast.tsx`)

**`ToastContainer`:** Fixed-position container at bottom-right, stacking up to 5 toasts.

**`Toast`:** Animated notification with enter/exit transitions, type-specific icons and colors:
- `success` — green border, checkmark icon
- `error` — red border, X icon
- `warning` — amber border, triangle icon
- `info` — slate border, info circle icon

Each toast auto-dismisses after its configured duration (default 4000ms). Manual dismiss triggers a 200ms exit animation.

---

## 11. Application Shell & Routing

### Entry Point (`src/main.tsx`)

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
);
```

### Tab-Based Navigation (`src/App.tsx`)

No router library — tabs are managed via `useState<Tab>`:

```ts
type Tab = 'dashboard' | 'quadrants' | 'tasks' | 'analytics';
```

The header renders tab buttons with an active indicator (underline bar).

### State Management

| State | Source | Purpose |
|-------|--------|---------|
| `tasks` | `useTasks()` hook | All tasks from localStorage, refreshed after mutations |
| `tab` | `useState` | Active view |
| `theme` | `useState` + `storage.getTheme()` | Light/dark mode |
| `toasts` | `useState` | Active notification stack (max 5) |
| `editing` | `useState<Task \| null>` | Task being edited (shows modal) |
| `showNewTask` | `useState` | Toggles new-task form panel |

### Computed Values (via `useMemo`)

- `stats` — Completion statistics derived from current tasks.
- `byCategory` — Tasks grouped by Eisenhower category.
- `score` — Total score from reward events.
- `weekly` — Weekly trend from analytics snapshots.

### Edit Modal

When `editing` is non-null, a fixed-position modal overlay renders with a `TaskForm` pre-filled with the task's current data. Clicking outside or pressing the close button sets `editing` to `null`.

### Theme Handling

- Toggles `dark` class on `document.documentElement`.
- Persists preference to `localStorage`.
- On init, reads system preference via `window.matchMedia('(prefers-color-scheme: dark)')`.

### Reward History

`RewardHistory` (defined at the bottom of `App.tsx`) polls `storage.getRewards()` every 2 seconds and renders the last 20 reward/penalty events with icons, timestamps, and point values.

---

## 12. Utility Functions

### `cn()` (`src/utils/cn.ts`)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Merges conditional Tailwind classes intelligently, resolving conflicts (e.g., `bg-red-500 bg-blue-500` → `bg-blue-500`).

### Type Utilities (`src/types.ts`)

| Function | Purpose |
|----------|---------|
| `calculateTaskPoints(task, event)` | Computes points for completion or miss events |
| `formatDate(iso)` | Renders `"Mon DD"` (includes year if not current) |
| `formatDateTime(iso)` | Renders `"Mon DD, HH:MM"` |
| `isOverdue(task)` | `true` if `dueDate < now` and task is pending |
| `isDueSoon(task, hours)` | `true` if due within N hours (default 24) and task is pending |
| `generateId()` | `Math.random().toString(36).slice(2) + Date.now().toString(36)` |

---

## Appendix: File Structure

```
daily-task-management-system/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx              # Entry point
    ├── App.tsx                # Root component, tab routing, state orchestration
    ├── types.ts               # Type definitions, category metadata, point calculation, utilities
    ├── index.css              # Tailwind import
    ├── components/
    │   ├── TaskForm.tsx       # Task creation/editing form
    │   ├── QuadrantView.tsx   # Eisenhower Matrix grid
    │   ├── TaskTable.tsx      # Filterable, sortable task list
    │   ├── Progress.tsx       # ProgressBar and StatCard
    │   ├── AnalyticsCharts.tsx # Bar chart, donut chart, performance cards
    │   └── Toast.tsx          # Notification toast system
    ├── lib/
    │   ├── storage.ts         # localStorage persistence layer
    │   ├── taskService.ts     # Task CRUD and derived metrics
    │   ├── analytics.ts       # Score, trend, and performance analytics
    │   └── reminderService.ts # Timer-based reminder and penalty engine
    └── utils/
        └── cn.ts              # Tailwind class merging utility
```
