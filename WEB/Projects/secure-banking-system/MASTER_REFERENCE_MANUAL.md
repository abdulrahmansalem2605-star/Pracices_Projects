# Enterprise Banking System — Master Reference Manual

> A comprehensive technical reference documenting the architecture, implementation, and operational semantics of the Enterprise Banking System.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Type System](#4-type-system)
5. [Security Layer](#5-security-layer)
6. [Database Layer](#6-database-layer)
7. [Service Layer](#7-service-layer)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [UI Architecture](#9-ui-architecture)
10. [Customer Portal](#10-customer-portal)
11. [Administration Panel](#11-administration-panel)
12. [Financial Analytics](#12-financial-analytics)
13. [Data Export](#13-data-export)
14. [Currency System](#14-currency-system)
15. [Build & Configuration](#15-build--configuration)

---

## 1. System Overview

The Enterprise Banking System is a role-based financial management application supporting two primary user roles: **Employee** (administrator/staff) and **Customer**. The system provides account management, transaction processing, multi-currency support, financial analytics, and configurable permission-based access control.

### Core Capabilities

- Role-based authentication with salted password hashing
- Granular permission system (9 distinct permissions)
- Multi-currency accounts (USD, EUR, SYP_NEW, SYP_OLD) with automatic conversion
- Deposit, withdrawal, and inter-account transfers
- Financial analytics with period-based filtering (daily/weekly/monthly/yearly)
- Data export to PDF, CSV, and JSON formats
- Dark mode theme persistence
- Client-side data persistence via localStorage

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Vite | 7.2.4 |
| UI Framework | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.1.17 |
| Charts | Recharts | 3.8.1 |
| PDF Generation | jsPDF + jsPDF-autotable | 4.2.1 / 5.0.7 |
| Decimal Precision | decimal.js | 10.6.0 |
| CSS Utilities | clsx + tailwind-merge | 2.1.1 / 3.4.0 |
| Build Target | Single-file output (vite-plugin-singlefile) | 2.3.0 |

### Build Configuration

- **Module type**: ESNext
- **Target**: ES2020
- **JSX transform**: react-jsx
- **Path alias**: `@/` maps to `src/`
- **Strict mode**: Enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)

---

## 3. Architecture

```
secure-banking-pyqt6-system/
├── index.html                    # Entry HTML shell
├── vite.config.ts                # Build configuration (single-file output)
├── tsconfig.json                 # TypeScript strict configuration
├── package.json                  # Dependencies and scripts
└── src/
    ├── main.tsx                  # React entry point (StrictMode)
    ├── App.tsx                   # Root component: auth gate + role routing
    ├── types.ts                  # Domain type definitions
    ├── services.ts               # Business logic, DB layer, security utils
    ├── index.css                 # Tailwind config, custom theme, animations
    └── components/
        ├── Login.tsx             # Authentication form
        ├── AdminPanel.tsx        # Employee dashboard + CRUD views
        └── CustomerPanel.tsx     # Customer portal + transactions + analytics
```

### Data Flow

1. **App.tsx** initializes the database on first load, manages auth state and theme
2. **Login.tsx** validates credentials against the service layer
3. On successful authentication, role determines routing:
   - `employee` → **AdminPanel** (Dashboard, Employee Management, Customer Management)
   - `customer` → **CustomerPanel** (Account Overview, Transactions, Analytics)
4. All state mutations flow through **services.ts**, which reads/writes to localStorage

---

## 4. Type System

### Roles

```typescript
type Role = 'employee' | 'customer';
```

### Permissions

Nine granular permissions organized by entity:

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

### Domain Entities

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
| `type` | `TransactionType` | One of four transaction types |
| `amount` | `string` | Decimal string in account currency |
| `currency` | `Currency` | Transaction currency |
| `timestamp` | `string` | ISO 8601 timestamp |
| `resultingBalance` | `string` | Post-transaction balance |
| `relatedAccountId` | `string?` | Linked account for transfers |
| `description` | `string?` | User-provided note |

**TransactionType**:

| Value | Description |
|-------|-------------|
| `deposit` | Funds added to account |
| `withdrawal` | Funds removed from account |
| `transfer_in` | Incoming transfer from another account |
| `transfer_out` | Outgoing transfer to another account |

---

## 5. Security Layer

### Password Hashing

Passwords are never stored in plaintext. The hashing pipeline:

1. **Salt generation**: 16 random bytes via `crypto.getRandomValues()`, encoded as 32-character hex string
2. **Hash computation**: `SHA-256(salt + password + salt)` using `crypto.subtle.digest()`
3. **Verification**: Re-hash provided password with stored salt, compare hex strings

```typescript
// services.ts:22-28
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
```

### Identity Generation

- **User/Account/Transaction IDs**: `crypto.randomUUID()` (v4 UUID)
- **Account numbers**: Four groups of 4 random digits, dash-separated (`XXXX-XXXX-XXXX-XXXX`)

### Soft Deletion

User and account records are never physically removed. Deactivation sets `isActive = false`, filtering them from all queries while preserving audit trails.

---

## 6. Database Layer

### Storage Mechanism

All data persists in browser `localStorage` under namespaced keys:

| Key Constant | localStorage Key | Entity |
|-------------|-----------------|--------|
| `DB.USERS` | `ebs_users` | User records |
| `DB.ACCOUNTS` | `ebs_accounts` | Account records |
| `DB.TRANSACTIONS` | `ebs_transactions` | Transaction records |
| `DB.INIT` | `ebs_initialized` | Initialization flag |

### CRUD Operations

```typescript
// services.ts:47-58
function getAll<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveAll<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}
```

### Initialization

On first load, the database seeds:

- **2 employee accounts**: `admin` (all permissions), `staff` (customer CRUD only)
- **3 customer accounts**: `john.doe`, `jane.smith`, `alex.wilson`
- **3 accounts**: USD ($12,500), EUR (€8,750), USD ($5,000)
- **Transaction history**: 12 months of synthetic deposit/withdrawal data

---

## 7. Service Layer

### Financial Precision

All monetary calculations use `decimal.js` with 20-digit precision and round-half-up rounding:

```typescript
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
```

### Transaction Operations

**Deposit** (`services.ts:294-321`):
1. Validates amount is positive
2. Converts deposit currency to account currency
3. Adds converted amount to balance
4. Records transaction with resulting balance
5. Persists account and transaction

**Withdrawal** (`services.ts:323-352`):
1. Validates amount is positive
2. Converts withdrawal currency to account currency
3. Checks sufficient funds (no overdraft permitted)
4. Subtracts converted amount from balance
5. Records transaction with resulting balance

**Transfer** (`services.ts:354-404`):
1. Validates source and destination are different accounts
2. Validates amount is positive
3. Converts amount to source account currency for debit
4. Converts amount to destination account currency for credit
5. Checks source account has sufficient funds
6. Creates paired `transfer_out` and `transfer_in` records
7. Atomically updates both accounts

### Analytics Service

`getAnalytics()` (`services.ts:419-476`) computes:
- Total deposits and withdrawals within a time period
- Net balance change
- Transaction counts by type
- Monthly aggregation for chart data
- Type breakdown for pie chart visualization

Period filtering options: `daily`, `weekly`, `monthly`, `yearly`, or all-time (default).

### Permission Helpers

```typescript
// services.ts:595-597
function hasPermission(user: User, perm: Permission): boolean {
  return user.role === 'employee' && user.permissions.includes(perm);
}
```

The menu system dynamically renders navigation items based on the employee's permission set:
- `view_employees` / `add_employees` / `edit_employees` / `delete_employees` → Employee Management
- `view_customers` / `add_customers` / `edit_customers` / `delete_customers` → Customer Management

---

## 8. Authentication & Authorization

### Login Flow

1. User submits username/password via `Login.tsx`
2. `authenticate()` in `services.ts` retrieves all users, finds active match by username
3. Re-hashes provided password with stored salt
4. Compares hash to stored `passwordHash`
5. Returns full `User` object on match, `null` on failure
6. `App.tsx` stores user in state and routes to appropriate panel

### Role-Based Routing

```
App.tsx
  ├─ !ready → Loading screen (database initializing)
  ├─ !user  → Login component
  └─ user.role
       ├─ 'employee' → AdminPanel
       └─ 'customer' → CustomerPanel
```

### Permission Gating

Within `AdminPanel`, each view checks permissions before rendering:

```typescript
// AdminPanel.tsx:195-199
const canView = hasPermission(currentUser, 'view_employees');
const canAdd = hasPermission(currentUser, 'add_employees');
const canEdit = hasPermission(currentUser, 'edit_employees');
const canDelete = hasPermission(currentUser, 'delete_employees');
const canAssign = hasPermission(currentUser, 'assign_permissions');
```

If `canView` is false, the component renders `<AccessDenied />` instead of the management table. Action buttons (Add, Edit, Delete, Assign Permissions) are conditionally rendered based on individual permissions.

### Self-Protection

Employees cannot delete their own accounts:

```typescript
// AdminPanel.tsx:262-264
const handleDelete = (id: string) => {
  if (id === currentUser.id) { setMsg({ type: 'err', text: 'Cannot delete yourself' }); return; }
```

---

## 9. UI Architecture

### Theme System

Dark mode is toggled via a CSS class on `<html>`:

```typescript
// App.tsx:22-30
useEffect(() => {
  const root = document.documentElement;
  if (darkMode) { root.classList.add('dark'); }
  else { root.classList.remove('dark'); }
  localStorage.setItem('ebs_theme', darkMode ? 'dark' : 'light');
}, [darkMode]);
```

The custom variant in `index.css` activates dark-mode styles:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### Custom Theme Tokens

```css
--color-primary-50 through --color-primary-950: Full blue palette
--color-banking-dark: #0f172a
--color-banking-darker: #020617
--color-banking-card: #1e293b
--color-banking-accent: #38bdf8
```

### Animations

- `animate-fade-in`: 0.3s ease-out vertical fade
- `animate-slide-in`: 0.25s ease-out horizontal slide

### Layout Pattern

Both panels use a fixed sidebar + scrollable main content pattern:

```
┌─────────────────────────────────────────┐
│ Sidebar (w-64)     │ Main Content       │
│ ┌───────────────┐  │ ┌────────────────┐ │
│ │ Logo/Title    │  │ │ View renders   │ │
│ │ Balance Card  │  │ │                │ │
│ │ Navigation    │  │ │                │ │
│ │ Theme Toggle  │  │ │                │ │
│ │ User Info     │  │ │                │ │
│ │ Sign Out      │  │ │                │ │
│ └───────────────┘  │ └────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 10. Customer Portal

### Overview View

Displays:
- Account balance card with formatted currency
- Account number
- Account currency label
- Total transaction count
- Recent 6 transactions with color-coded types
- Export buttons (PDF, CSV, JSON)

### Transaction View

Tabbed interface with three modes:

**Deposit Tab**:
- Amount input (positive decimal)
- Currency selector
- Optional description
- Validates positive amount, calls `deposit()`

**Withdraw Tab**:
- Amount input
- Currency selector
- Optional description
- Validates sufficient funds, calls `withdraw()`

**Transfer Tab**:
- Amount input
- Currency selector
- Destination account number (16-digit format)
- Optional description
- Validates account existence and sufficient funds, calls `transfer()`

### Transaction History

Filterable table with four filter options:
- `all` — All transaction types
- `deposit` — Deposits only
- `withdrawal` — Withdrawals only
- `transfer` — Both `transfer_in` and `transfer_out`

Table columns: Date, Type, Description, Amount (signed), Balance.

---

## 11. Administration Panel

### Dashboard View

Aggregate statistics:
- Active customer count
- Active employee count
- Total system assets (sum of all account balances)
- Today's transaction count
- Recent 8 system-wide transactions table

### Employee Management

CRUD interface with permission-aware controls:

| Action | Permission Required |
|--------|-------------------|
| View employee list | `view_employees` |
| Add new employee | `add_employees` |
| Edit employee details | `edit_employees` |
| Deactivate employee | `delete_employees` |
| Modify permissions | `assign_permissions` |

**Create Employee Form Fields**: Username, Password, First Name, Last Name, Email, Phone, Permission checkboxes.

**Edit Employee Form Fields**: First Name, Last Name, Email, Phone (username/password immutable).

**Permission Editor**: Inline checkbox grid for all 9 permissions, with save/cancel controls.

### Customer Management

Similar CRUD interface:

| Action | Permission Required |
|--------|-------------------|
| View customer list | `view_customers` |
| Add new customer | `add_customers` |
| Edit customer details | `edit_customers` |
| Deactivate customer | `delete_customers` |

**Create Customer Form Fields**: Username, Password, First Name, Last Name, Email, Phone, Account Currency selector.

New customers automatically receive a zero-balance account in the selected currency.

### Shared Components

- `InputField`: Reusable form input with label, supporting text and password types
- `AccessDenied`: Full-page access denial message displayed when permissions are insufficient

---

## 12. Financial Analytics

### Data Structure

```typescript
interface AnalyticsData {
  totalDeposits: string;      // Sum of deposit/transfer_in amounts
  totalWithdrawals: string;   // Sum of withdrawal/transfer_out amounts
  netBalanceChange: string;   // Deposits - Withdrawals
  transactionCount: number;   // Total transactions in period
  depositCount: number;       // Deposit + transfer_in count
  withdrawalCount: number;    // Withdrawal + transfer_out count
  monthlyData: { month: string; deposits: number; withdrawals: number }[];
  typeBreakdown: { name: string; value: number }[];
}
```

### Period Filtering

| Period | Start Date |
|--------|-----------|
| `daily` | Start of current day |
| `weekly` | 7 days ago |
| `monthly` | 1st of current month |
| `yearly` | January 1st of current year |
| `undefined` | All time (epoch) |

### Visualizations

- **Pie Chart**: Deposit vs. withdrawal breakdown (Recharts PieChart with inner radius)
- **Bar Chart**: Monthly activity (deposits in green, withdrawals in red)
- **Stat Cards**: Total deposits, total withdrawals, net change, transaction count
- **Monthly Breakdown Table**: Period-by-period detail with net calculation

---

## 13. Data Export

### CSV Export

`exportToCSV()` generates RFC 4180-compliant CSV with headers: ID, Type, Amount, Currency, Date, Balance After, Description. Double-quote escaping applied.

### JSON Export

`exportToJSON()` serializes data with 2-space indentation. Customer export bundles user info, account details, and full transaction history.

### PDF Export

`exportToPDF()` generates a multi-page document using jsPDF:

1. **Header**: Blue banner with system name, report title, generation timestamp
2. **Account Holder Info**: Name, email, phone, account number, currency, balance
3. **Financial Summary Table**: Deposits, withdrawals, net change, transaction count
4. **Transaction History Table**: Last 50 transactions with date, type, amount, balance, description
5. **Footer**: Page numbering with confidential marking on every page

### Download Mechanism

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

## 14. Currency System

### Supported Currencies

| Code | Label | Symbol | Rate to USD |
|------|-------|--------|-------------|
| `USD` | US Dollar | `$` | 1.0 |
| `EUR` | Euro | `€` | 1.09 |
| `SYP_NEW` | Syrian Pound (New) | `S£` | 0.00008 |
| `SYP_OLD` | Syrian Pound (Old) | `S£(Old)` | 0.0000008 |

### Conversion Logic

All conversions route through USD as the base currency:

```typescript
function convertCurrency(amount: Decimal, from: Currency, to: Currency): Decimal {
  if (from === to) return amount;
  const inUsd = amount.mul(RATES_TO_USD[from]);
  return inUsd.div(RATES_TO_USD[to]);
}
```

### Formatting

Amounts display with currency symbol, two decimal places, and comma-separated thousands:

```
$12,500.00
€8,750.00
S£1,500.00
```

---

## 15. Build & Configuration

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Production build (single-file HTML output) |
| `npm run preview` | Preview production build locally |

### Single-File Output

The `viteSingleFile()` plugin inlines all assets (JS, CSS) into a single HTML file, enabling the entire application to run from one portable file without a server.

### TypeScript Configuration

- **Strict mode**: All strict checks enabled
- **Unused variables**: Compilation error on unused locals/parameters
- **Fallthrough**: Error on missing switch cases
- **Path mapping**: `@/*` alias resolves to `src/*`

### CSS Configuration

- Tailwind CSS 4 with `@tailwindcss/vite` plugin
- Custom dark mode variant using `.dark` class selector
- Custom color tokens for banking-themed UI
- Custom scrollbar styling (6px width, rounded thumb)
- Print styles: `.no-print` class elements hidden

---

## Appendix A: Default Credentials

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Admin | `admin` | `admin123` | All 9 permissions |
| Staff | `staff` | `staff123` | `view_customers`, `add_customers`, `edit_customers` |
| Customer | `john.doe` | `customer123` | None |
| Customer | `jane.smith` | `customer123` | None |
| Customer | `alex.wilson` | `customer123` | None |

---

## Appendix B: localStorage Key Reference

| Key | Content | Format |
|-----|---------|--------|
| `ebs_users` | All user records | JSON array of User objects |
| `ebs_accounts` | All account records | JSON array of Account objects |
| `ebs_transactions` | All transaction records | JSON array of Transaction objects |
| `ebs_initialized` | Database initialization flag | String `"true"` |
| `ebs_theme` | Theme preference | String `"dark"` or `"light"` |

---

*This document was generated from the source code of the Enterprise Banking System project.*
