# Advanced Technical Portfolio — Master Reference Manual

> **Engineer:** Abdulrahman  
> **Total Projects:** 10 Production-Grade Applications  
> **Primary Stack:** Python 3.10+ · PyQt6 · SQLite  
> **Architecture Paradigms:** Clean Architecture · Domain-Driven Design · Event-Driven Architecture  
> **Total Lines of Code:** ~27,000+

---

## Executive Summary

This comprehensive technical portfolio represents a progressive engineering journey across ten production-grade applications spanning diverse domains: financial management, authentication systems, academic administration, retail operations, banking platforms, productivity tools, scientific computing, charitable giving, artificial intelligence, and strategic gaming.

Each project demonstrates mastery of core software engineering principles while showcasing adaptation to domain-specific requirements. The portfolio unifies around consistent commitments to **Clean Architecture**, **layered separation of concerns**, **database engineering excellence**, and **professional UI/UX practices** — while also exploring advanced topics including **AI algorithm design**, **procedural sound synthesis**, **constraint-satisfaction solving**, and **multi-tier game intelligence systems**.

### Portfolio Overview

| # | Project | Domain | Lines | Architecture | UI Framework |
|---|---------|--------|-------|--------------|--------------|
| 1 | Budget Manager Pro | Personal Finance | ~2,500 | Clean Architecture (4-Layer) | PyQt6 |
| 2 | Smart Login System | Authentication | ~1,200 | Clean Architecture + MVVM | Tkinter |
| 3 | Student Academic System | Education Management | ~2,900 | Clean Architecture (Onion) | PyQt6 |
| 4 | QuickMart POS | Retail Point-of-Sale | ~1,800 | Clean Architecture | PyQt6 |
| 5 | Enterprise Mini Banking | Banking Platform | ~3,000 | Clean Architecture (DDD) | PyQt6 |
| 6 | Daily Task Manager | Productivity | ~2,000 | Clean Architecture | PyQt6 |
| 7 | Advanced Calculator | Scientific Computing | ~1,600 | Layered Architecture | PyQt6 |
| 8 | Hayah Charity Tracker | Charitable Giving | ~3,000 | Layered Architecture | PyQt6 |
| 9 | Tango AI Puzzle System | Artificial Intelligence | ~1,500 | Layered Architecture | Terminal |
| 10 | Strategic Grid Game (Vexon) | Gaming & AI | ~7,000 | Layered Monolith | PyQt6 |

---

## Table of Contents

| Part | Title | Focus |
|------|-------|-------|
| I | [Architectural Foundations](#part-i-architectural-foundations--universal-patterns) | Universal patterns, design systems |
| II | [Project Domain Analysis](#part-ii-project-domain-analysis) | Domain-specific implementations |
| III | [Artificial Intelligence Systems](#part-iii-artificial-intelligence-systems) | AI algorithms and expert systems |
| IV | [Advanced Systems](#part-iv-advanced-systems--engineering-excellence) | Persistence, analytics, replay |
| V | [Technical Skills Matrix](#part-v-technical-skills-matrix) | Comprehensive skill inventory |
| VI | [Project Evolution](#part-vi-project-evolution--progression) | Growth and complexity analysis |
| VII | [Quick Reference](#part-vii-quick-reference) | Technology stack, commands |

---

# Part I: Architectural Foundations & Universal Patterns

> This part documents the architectural principles and design patterns applied consistently across all ten projects.

---

## 1. Clean Architecture — Unified Implementation

All ten projects implement layered architecture with unidirectional dependency flow, demonstrating consistent application of Robert C. Martin's architectural principles:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  Views, Controllers, Widgets, Theme Systems                 │
├─────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                         │
│  Services, Use Cases, Orchestration Logic                   │
├─────────────────────────────────────────────────────────────┤
│                     DOMAIN LAYER                            │
│  Entities, Value Objects, Enums, Business Rules             │
├─────────────────────────────────────────────────────────────┤
│                  INFRASTRUCTURE LAYER                        │
│  Database, Repositories, Security, External I/O             │
└─────────────────────────────────────────────────────────────┘
```

### Dependency Rules (Universal Across All Projects)

| Layer | Depends On | Contains |
|-------|------------|----------|
| **Domain** | Nothing | Pure business logic, entities, value objects |
| **Application** | Domain only | Use cases, services, orchestration |
| **Infrastructure** | Application interfaces | Database, repositories, security, external I/O |
| **Presentation** | Application + Domain | Views, controllers, widgets, themes |

**Critical Rule:** Presentation never depends on Infrastructure directly — only through Application-layer interfaces.

---

## 2. Design Patterns Applied Across Projects

| Pattern | Projects | Implementation |
|---------|----------|----------------|
| **Repository Pattern** | All 10 | Abstracts persistence behind interfaces; enables future migration |
| **Service Layer** | All 10 | Orchestrates use cases without UI or database imports |
| **Dependency Injection** | All 10 | Constructor-based wiring; no global state or service locators |
| **Aggregate Root** | 1, 4, 5, 8 | Domain objects owning collections (Budget, Invoice, Account, User) |
| **Value Object** | 1, 2, 3, 10 | Immutable, validated data carriers (FinancialSummary, Credentials, BoardConfig) |
| **Observer Pattern** | 1, 2, 3, 5, 6, 8, 10 | Qt signals for cross-component communication; EventBus pub/sub |
| **Singleton Pattern** | 5, 6, 8 | Database managers ensuring single connection instance |
| **Factory Method** | 1, 4, 10 | Immutable update patterns, ID generation, AI strategy creation |
| **Strategy Pattern** | 1, 3, 10 | Theme systems with swappable palettes; AI difficulty tiers |
| **Context Manager** | 1, 5 | Atomic database transactions |
| **MVVM** | 2 | ViewModel mediates GUI and business logic |
| **State Pattern** | 10 | Game states, board configurations |
| **Template Method** | 10 | `BaseJsonStorage._load()` → `_migrate()` |

### Pattern Selection Guide

| Need | Recommended Pattern | Example |
|------|---------------------|---------|
| Abstract persistence | Repository | All 10 projects |
| Orchestrate business logic | Service Layer | All 10 projects |
| Share logic across similar classes | Inheritance + Template Method | Vexon storage |
| Swappable algorithms | Strategy | AI difficulty tiers, themes |
| Loose coupling | Observer + EventBus | Vexon components |
| Enforce invariants | Aggregate Root | Budget, Account |

---

## 3. Database Design — SQLite Conventions

All projects leverage SQLite with production-grade configurations:

| Configuration | Purpose | Projects |
|---------------|---------|----------|
| **WAL Mode** | Concurrent read performance | 1, 3, 5, 6, 8 |
| **Foreign Keys** | Referential integrity | 1, 3, 4, 5, 6, 8 |
| **Busy Timeout** | Lock contention handling | 5, 6 |
| **Row Factory** | Dict-like row access | 3, 4, 5 |
| **Indexes** | Query optimization | 1, 3, 5, 6 |
| **Schema Versioning** | Migration management | 8, 10 |

### Common Schema Patterns

```sql
-- Standard entity table
CREATE TABLE entity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field1 TEXT UNIQUE NOT NULL,
    field2 TEXT NOT NULL,
    field3 REAL NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Role-based access control
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key with cascade
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Index for query optimization
CREATE INDEX idx_entity_field ON entity(field1);
```

---

## 4. Security Implementation

| Security Measure | Projects | Implementation |
|------------------|----------|----------------|
| **Password Hashing** | 2, 3, 5, 8 | SHA-256 / PBKDF2-HMAC-SHA256 with salt |
| **Constant-Time Comparison** | 2, 3, 5 | `hmac.compare_digest()` for timing-attack prevention |
| **Input Sanitization** | 2, 5 | Null byte removal, control character stripping |
| **Role-Based Access Control** | 3, 5 | Database-stored permissions with granular control |
| **Account Locking** | 2 | Configurable maximum login attempts |
| **Generic Error Messages** | 2, 3, 5 | Prevent username enumeration attacks |
| **PBKDF2 Iterations** | 8 | 260,000 iterations with 32-byte salt |

### Security by Project

| Project | Hashing | RBAC | Locking | Error Masking |
|---------|---------|------|---------|---------------|
| Smart Login | SHA-256 | — | ✓ | ✓ |
| Student System | SHA-256 | ✓ | — | ✓ |
| Mini Banking | PBKDF2 | ✓ | — | ✓ |
| Hayah Charity | PBKDF2 (260K) | — | — | — |

---

## 5. Theme Systems — Consistent Implementation

Every PyQt6 project implements a dual-mode (Dark/Light) theme system:

### Architecture

- **Palette dataclass** with 30+ semantic color tokens
- **`build_stylesheet()`** function generating complete QSS from palette
- **Runtime switching** without application restart
- **Observer/callback pattern** for live widget updates

### Token Categories

| Category | Tokens |
|----------|--------|
| Backgrounds | `bg_window`, `bg_sidebar`, `bg_card`, `bg_input`, `bg_table_*` |
| Text | `fg_primary`, `fg_secondary`, `fg_muted`, `fg_heading` |
| Accents | `accent`, `accent_light` |
| Semantic | `success`, `danger`, `warning` (with background variants) |
| Borders | `border`, `border_focus` |

### Implementation Pattern

```python
@dataclass
class Palette:
    bg_window: str = "#1e1e2e"
    bg_card: str = "#2a2a3a"
    fg_primary: str = "#cdd6f4"
    accent: str = "#89b4fa"
    # ... 30+ tokens

def build_stylesheet(palette: Palette) -> str:
    return f"""
    QMainWindow {{ background-color: {palette.bg_window}; }}
    QWidget {{ color: {palette.fg_primary}; }}
    QPushButton {{ background-color: {palette.accent}; }}
    """
```

**See also:** [Project 10 — Vexon](#project-10-strategic-grid-game-vexon) for advanced 8-theme integration with procedural sound.

---

# Part II: Project Domain Analysis

> This section provides detailed analysis of each project domain, highlighting architectural decisions, domain-specific patterns, and implementation highlights.

---

## A. Financial & Business Applications

---

### Project 1: Budget Manager Pro

**Domain:** Personal Financial Management  
**Version:** 3.0.0  
**Framework:** PyQt6 · Python 3.10+ · SQLite (WAL Mode)  
**Lines:** ~2,500

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Expense CRUD** | Create, read, update, delete expense records with validation |
| **Monthly Budget** | Salary-based budgeting with configurable savings percentage |
| **Financial Dashboard** | Real-time KPIs, spending progress, alert system |
| **Category Analysis** | Breakdown by Food, Transport, Housing, Health, etc. |
| **Data Import** | CSV and JSON import with automatic duplicate detection |
| **Backup System** | Automatic backup rotation (max 7) with corruption recovery |
| **Dual Theme** | Dark and Light modes with persistent preference |
| **Year Overview** | Comparative monthly summaries across a full year |

#### Architecture Highlights

**Domain Layer:**
- `Category` enum with 10 expense categories and safe lookup methods
- `Expense` entity with validation invariants and immutable update pattern
- `Budget` aggregate root with 10+ computed financial properties
- `FinancialSummary` value object with formatted output properties

**Application Layer:**
- `ExpenseService` — 7 use cases for expense CRUD
- `BudgetService` — Pure computation: summary generation, alert evaluation
- `ReportService` — Cross-month reporting with CSV/JSON import

**Infrastructure Layer:**
- Thread-safe SQLite manager with WAL mode and `threading.local` connection pool
- `BudgetRepository` — All SQL queries; domain never touches SQL
- `StorageManager` — Backup lifecycle, startup integrity verification

**UI Layer:**
- 4-view stacked widget: Dashboard, Expenses, Reports, Data Management
- Controller pattern mediating views and services
- Reusable widgets: `ExpenseTable`, `SummaryCard`

**Database Schema:**
```sql
-- 3 tables: salary, expenses, settings
-- Indexes on expense_date and category
-- UNIQUE constraint on (month, year) for salary
```

#### Key Metrics

| Metric | Value |
|--------|-------|
| Test Coverage | 40 tests across all layers |
| Database | SQLite with WAL mode, thread-safe connections |
| Backup | Automatic rotation (max 7), corruption recovery |

**File:** `Budget Manager Pro/`

---

### Project 4: QuickMart POS System

**Domain:** Retail Point-of-Sale  
**Version:** 1.0  
**Framework:** PyQt6 · SQLite · ReportLab  
**Lines:** ~1,800

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Product Entry** | Add products with name, price, quantity |
| **Line-Item Management** | Dynamic add/remove of invoice items |
| **Tax Calculation** | Configurable tax rate with real-time computation |
| **Discount Application** | Percentage-based discount on subtotal |
| **Invoice Persistence** | SQLite-backed storage with full CRUD |
| **Receipt Generation** | Fixed-width text receipt for printing |
| **PDF Export** | Professional PDF invoices via ReportLab |
| **System Printing** | Direct printer output via QPrinter |

#### Architecture Highlights

**Domain Layer:**
- `Product` entity with optional ID for ad-hoc products
- `InvoiceItem` entity (Product × Quantity) with computed subtotal
- `Invoice` aggregate root with 4 financial properties: subtotal, tax_amount, discount_amount, total

**Application Layer:**
- `TaxService` — Stateless tax calculation and validation
- `DiscountService` — Stateless discount calculation and validation
- `InvoiceService` — Session manager with invoice lifecycle

**Infrastructure Layer:**
- `InvoiceRepository` — INSERT/UPDATE with item cascade
- `InvoicePrinter` — Text receipt (42-char width), PDF export, system printing

**Presentation Layer:**
- `POSView` — Main window with product entry form, cart table, totals panel, receipt preview
- `POSController` — Signal→Service→View mediator
- `ProductTable` — Styled table with per-row delete buttons
- `TotalsPanel` — Running financial summary with adjustable rates

#### Financial Model

```
subtotal = Σ(item.unit_price × item.quantity)
tax_amount = subtotal × (tax_rate / 100)
discount_amount = subtotal × (discount_rate / 100)
total = subtotal + tax_amount - discount_amount
```

**File:** `QuickMart POS/`

---

### Project 5: Enterprise Mini Banking System

**Domain:** Banking Platform  
**Version:** 1.0.0  
**Framework:** PyQt6 ≥ 6.5.0 · SQLite  
**Architecture:** Clean Architecture (Domain-Driven Design)  
**Lines:** ~3,000

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Unified Login** | Single authentication for Admin, Employee, Customer |
| **Dynamic RBAC** | Database-stored permissions (20 permissions, 6 categories) |
| **Multi-Currency** | USD, EUR, SYP (New), SYP (Old) with automatic conversion |
| **ACID Transactions** | Overdraft protection, dual-entry transfers, audit trails |
| **Financial Analytics** | Pie charts, bar charts, daily breakdowns, monthly trends |
| **Data Export** | JSON, CSV, PDF-ready data generation |
| **Dark/Light Theme** | Instant switching with 520+ line stylesheet generation |

#### Architecture Highlights

**Domain Layer:**
- `User` entity with `UserRole` enum (ADMIN, EMPLOYEE, CUSTOMER)
- `Account` entity with `Currency` enum and exchange rates
- `Transaction` entity with `TransactionType` enum (DEPOSIT, WITHDRAWAL, TRANSFER_IN, TRANSFER_OUT)
- `Permission` entity with 20 granular permissions across 6 categories

**Application Layer:**
- `AuthService` — PBKDF2-HMAC-SHA256 verification, session management, module-to-permission mapping
- `UserService` — CRUD with validation (username ≥3 chars, password ≥6 chars, email format)
- `AccountService` — Account lifecycle with ownership validation
- `TransactionService` — ACID-compliant deposits, withdrawals, atomic transfers
- `AnalyticsService` — Period-based financial insights (daily, weekly, monthly, yearly)
- `ExportService` — Multi-format export with metadata

**Infrastructure Layer:**
- `SecurityManager` — PBKDF2-HMAC-SHA256 (100,000 iterations, 32-byte salt)
- `DatabaseSeeder` — Initializes demo data (4 users, 4 accounts, 5-8 transactions)
- Repository layer: `UserRepository`, `AccountRepository`, `TransactionRepository`, `PermissionRepository`

#### Multi-Currency Engine

```
Source → USD → Target
balance_usd = balance × EXCHANGE_RATES_TO_USD[source]
converted = balance_usd / EXCHANGE_RATES_TO_USD[target]
```

**Implementation:** All values use Python `Decimal` with `ROUND_HALF_UP` quantization to avoid floating-point errors.

#### ACID Transfer Atomicity

| Step | Operation | Failure Handling |
|------|-----------|------------------|
| 1 | `BEGIN IMMEDIATE` acquires exclusive write lock | Abort |
| 2 | Source account balance decremented | Rollback |
| 3 | Destination account balance incremented | Rollback |
| 4 | Two Transaction records created (TRANSFER_OUT + TRANSFER_IN) linked by `reference_id` | Rollback |
| 5 | `COMMIT` persists all changes atomically | — |
| 6 | On any failure: `ROLLBACK` reverts all changes | — |

#### RBAC System

| Category | Permissions |
|----------|-------------|
| Account Management | create, view, edit, delete |
| Transaction Processing | deposit, withdraw, transfer |
| User Management | create, edit, deactivate |
| Reporting | view_reports, export_data |
| System Administration | manage_settings, audit_log |

**File:** `Enterprise Mini Banking System/`

---

### Project 8: Hayah Charity Tracker

**Domain:** Charitable Giving & Donation Tracking  
**Framework:** PyQt6 ≥ 6.5.0 · SQLite  
**Version:** 3.0.0  
**Lines:** ~3,000

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Multi-User Auth** | PBKDF2-SHA256 (260,000 iterations) |
| **Prayer-Time Categories** | Tahajjud, Fajr, Dhuhr, Asr, Maghrib, Isha, Qiyam Al-Layl |
| **Multi-Currency** | 16+ currencies with USD base normalization |
| **Goal Tracking** | Daily, weekly, monthly, yearly with progress visualization |
| **Achievements** | 12 unlockable achievements with points-based gamification |
| **Analytics** | Streaks, trends, category distributions, monthly aggregates |
| **Export** | CSV, JSON, PDF with chart embedding |
| **Auto-Backups** | Every 30 minutes with manifest metadata |

#### Architecture Highlights

| Component | Responsibility |
|-----------|---------------|
| `User` | Aggregate root with theme preferences and reminder settings |
| `CharityEntry` | Dual-currency storage (original + normalized amounts) |
| `Goal` | Entity with period-based progress evaluation |
| `Achievement` | UNIQUE constraint for idempotent awards |

#### Currency System

| Currency | Parity | Notes |
|----------|--------|-------|
| USD | Base | All amounts normalized to USD |
| SYP | 1:100 | Special handling for Syrian Pound |
| EUR, GBP, etc. | Market rates | 16+ supported currencies |

**File:** `Hayah Charity Tracker/`

---

## B. Authentication & Academic Systems

---

### Project 2: Smart Login System

**Domain:** Desktop Authentication  
**Version:** 2.4  
**Framework:** Tkinter · Python 3.14  
**Architecture:** Clean Architecture + MVVM  
**Lines:** ~1,200

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Authentication** | Username/password with SHA-256 hashing |
| **Attempt Limiting** | Configurable maximum attempts (default: 3) before lockout |
| **Visual Feedback** | Card shake animation on failure, color-coded status |
| **Theme Switching** | Dark/Light with full widget propagation |
| **Session Reset** | Unlock accounts and restore attempt counters |

#### Architecture Highlights

**Domain Layer:**
- `User` entity with mutable state (lock/unlock, attempt counting)
- `Credentials` value object (frozen, immutable)
- `AuthenticationResult` with 4 status types (SUCCESS, DENIED, LOCKED, INVALID_INPUT)
- `UserRepository` interface (Dependency Inversion)

**Application Layer:**
- `LoginUser` use case — orchestrates credential validation
- `ResetAttempts` use case — session reset delegation

**Infrastructure Layer:**
- `InMemoryUserRepository` — Dictionary-backed persistence
- Seeds default `admin` user with hashed credentials

**Presentation Layer (MVVM):**
- `LoginViewModel` — UI state management, no GUI imports
- `LoginView` — 350-line card UI with animation system
- Custom widgets: `AnimatedButton`, `InputField`, `StatusLabel`

#### Data Flows

| Flow | Path |
|------|------|
| Authentication | User Input → ViewModel → Use Case → Service → Repository |
| Theme Switch | Toggle → MainWindow → LoginView → All Widgets |
| Session Reset | Button → ViewModel → Use Case → Service → Repository |

#### Security Features

| Feature | Implementation |
|---------|----------------|
| Password Hashing | SHA-256 |
| Timing Attack Prevention | `hmac.compare_digest()` |
| Account Locking | Configurable max attempts |
| Error Masking | Generic error messages |

**File:** `Smart Login System/`

---

### Project 3: Student Academic Management System

**Domain:** University Academic Records  
**Version:** 1.0.0  
**Framework:** PyQt6 · SQLite · ReportLab · PyQt6-Charts  
**Architecture:** Clean Architecture (Onion/Hexagonal)  
**Lines:** ~2,900

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Student Management** | Add, edit, delete, search, view records |
| **Subject Management** | Register courses with credit hours and department |
| **Grade Entry** | Enter, update, delete grades per student/subject/semester |
| **GPA Calculation** | Semester, cumulative, annual GPA with trend analysis |
| **Analytics** | Interactive charts — GPA trend, grade distribution, semester comparison |
| **PDF Export** | Professional academic transcript generation |
| **Role-Based Access** | Admin and Student dashboards with different permissions |

#### Architecture Highlights

**Domain Layer:**
- `Student` entity with role-based authentication fields
- `Subject` entity with credit hour validation
- `Grade` entity with grading scale methods (letter grade, evaluation, grade points)
- `Semester` entity with GPA calculation: `Σ(grade_points × credit_hours) / Σ(credit_hours)`

**Application Layer:**
- `AuthService` — SHA-256 + salt password hashing, session management
- `StudentService` — CRUD with duplicate detection
- `GradeService` — Grade and subject operations with academic summary computation
- `GPACalculator` — Pure computation service (all `@staticmethod`)

**Infrastructure Layer:**
- `StudentRepository`, `GradeRepository`, `SubjectRepository` — SQLite CRUD
- `PDFExporter` — ReportLab A4 transcript generation with color-coded evaluations

**Presentation Layer:**
- `AdminDashboard` — 5-page shell (Overview, Students, Subjects, Grade Entry, Reports)
- `StudentDashboard` — 3-page portal (Home, My Grades, Analytics)
- Charts: `GPATrendChart` (spline), `GradeDistributionChart` (pie), `PerformanceBarChart` (bar)

#### Grading Scale

| Range | Letter | Evaluation | Grade Points |
|-------|--------|------------|--------------|
| 90–100 | A | Excellent | 4.0 |
| 80–89.99 | B | Very Good | 3.0 |
| 70–79.99 | C | Good | 2.0 |
| 0–69.99 | F | Fail | 0.0 |

#### Chart Types

| Chart | Type | Library |
|-------|------|---------|
| GPA Trend | Spline | PyQt6-Charts |
| Grade Distribution | Pie | PyQt6-Charts |
| Performance | Bar | PyQt6-Charts |

**File:** `Student Academic Management System/`

---

## C. Productivity & Scientific Computing

---

### Project 6: Daily Task Manager

**Domain:** Productivity & Task Management  
**Version:** 1.0  
**Framework:** PyQt6 ≥ 6.6.0 · SQLite  
**Design Philosophy:** Eisenhower Matrix with Gamification  
**Lines:** ~2,000

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Eisenhower Matrix** | 4-quadrant task classification with visual display |
| **Reward & Penalty System** | Points per category multiplier; streak bonuses |
| **In-app Reminders** | Pre-deadline (24h) and overdue notifications |
| **Analytics & Progress** | Completion rates, category distribution, weekly trends |
| **Light/Dark Theme** | Runtime-switchable with QSS from design tokens |
| **Persistence** | SQLite with WAL mode, foreign keys, indexed queries |

#### Architecture Highlights

**Domain Layer:**
- `Task` entity with state machine: PENDING → COMPLETED/OVERDUE → PENDING
- `Category` enum (Eisenhower Matrix) with embedded metadata (color, reward/penalty multipliers)
- `RewardRecord` entity with 4 reward types
- `PointsCalculator` — Static calculation engine with streak tiers

**Gamification System:**

| Quadrant | Color | Reward Multiplier | Penalty Multiplier |
|----------|-------|-------------------|-------------------|
| Q1: Important & Urgent | Red | 1.5× | 2.0× |
| Q2: Important & Not Urgent | Blue | 1.25× | 1.5× |
| Q3: Not Important & Urgent | Orange | 1.0× | 1.0× |
| Q4: Not Important & Not Urgent | Gray | 0.75× | 0.5× |

#### Level System

| Total Points | Level Name |
|--------------|------------|
| 0–49 | Newcomer |
| 50–199 | Getting Started |
| 200–499 | Rising Star |
| 500–999 | Task Champion |
| 1000+ | Productivity Master |

**Application Layer:**
- `TaskService` — Task lifecycle with integrated reward calculations
- `RewardService` — Score tracking, streaks, levels
- `ReminderService` — Background polling (60s) for pre-deadline and overdue alerts
- `AnalyticsService` — Completion stats, category distribution, daily trends

**Infrastructure Layer:**
- Singleton `Database` with WAL mode, foreign keys, busy timeout
- `TaskRepository` — 14 query methods including overdue detection and date-range filtering
- `RewardRepository` — Point aggregation, daily/weekly trends
- `ReminderRepository` — Read/unread tracking, bulk mark-read

**File:** `Daily Task Manager/`

---

### Project 7: Advanced Calculator

**Domain:** Scientific Computing  
**Version:** 1.0  
**Framework:** PyQt6 · Python 3.8+  
**Architecture:** Layered Architecture  
**Lines:** ~1,600

#### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Multi-Mode Architecture** | 8 specialized calculation modes |
| **High-Precision Computation** | Python's decimal module for accurate results |
| **Persistent Storage** | SQLite history + JSON settings |
| **Memory Management** | M+, M-, MR, MC operations |
| **Expression Evaluation** | Parse and evaluate expressions with functions |
| **Keyboard Navigation** | Full keyboard support for all operations |
| **Export Functionality** | CSV, TXT, JSON history export |

#### Calculation Modes

| Mode | Purpose | Key Features |
|------|---------|--------------|
| **Standard** | Basic arithmetic | +, -, ×, ÷, %, parentheses |
| **Scientific** | Advanced math | Trig functions, logarithms, constants (π, e, φ, τ) |
| **Programmer** | Base conversions | Binary, octal, hex, bitwise operations |
| **Matrix** | Linear algebra | Addition, multiplication, determinant, inverse, transpose |
| **Financial** | Currency/units | 40+ currencies, 14 unit categories, interest calculations |
| **Statistics** | Data analysis | Mean, median, mode, variance, standard deviation |
| **Advanced** | Utility tools | JSON formatter, hash generator, symbolic math (sympy) |
| **Favorites** | Saved expressions | Persistent storage across sessions |

#### Architecture Highlights

**Domain Layer:**
- `calculator.py` — Core calculation engine with decimal precision
- `modes.py` — Mode-specific calculators (stats, programmer, advanced)
- `financial.py` — Financial calculations and unit conversions
- `matrix.py` — Matrix and linear algebra operations

**Service Layer:**
- `OperationService` — History, undo/redo, memory, favorites
- `UIService` — Theme management and settings persistence
- `ErrorService` — Centralized error handling and logging

**Persistence:**
- History: SQLite database at `~/.advanced_calculator.db`
- Settings: JSON file at `~/.advanced_calculator_config.json`

**File:** `Advanced Calculator/`

---

# Part III: Artificial Intelligence Systems

> This section documents the AI implementations across two projects: constraint-satisfaction puzzle solving (Tango) and strategic game intelligence (Vexon).

---

## Project 9: Tango AI Puzzle System

**Domain:** Constraint-Satisfaction Puzzle Solving  
**Architecture:** Three-Layer (Interaction, State, Intelligence)  
**Lines:** ~1,500

### Introduction

The Tango AI Puzzle System is a constraint-satisfaction puzzle solver that demonstrates the application of core Artificial Intelligence concepts through a practical, interactive implementation. The system combines multiple AI paradigms:

- **Rule-based expert systems** using forward chaining for logical deduction
- **Blind search algorithms** (BFS and DFS) for exhaustive state exploration
- **Constraint satisfaction** through backtracking generation
- **Defensive programming** for robust user interaction

The puzzle consists of an N×N grid where cells must be filled with either SUN (S) or MOON (M) symbols, subject to balance constraints (equal numbers of each symbol per row/column), adjacency constraints (no three identical symbols adjacent), and explicit equality/opposite constraints between neighboring cells.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   INTERACTION LAYER                     │
│         (UI Functions, Menu Navigation, I/O)            │
├─────────────────────────────────────────────────────────────┤
│                    STATE LAYER                          │
│         (TangoBoard — Data Model & Validation)          │
├─────────────────────────────────────────────────────────────┤
│                  INTELLIGENCE LAYER                     │
│    (UltimateSolver, TangoExpertEngine, BFS/DFS)         │
└─────────────────────────────────────────────────────────────┘
```

### State Layer (TangoBoard Class)

**Responsibility:** Represents the puzzle's data model. Manages the N×N grid, the fixed_mask (boolean grid locking initial clues), and the constraint matrices (h_constraints and v_constraints).

**Encapsulation:** All rule validation logic (`is_legal`, `is_win`) is encapsulated within this class, ensuring that every board instance can independently verify its own consistency without external dependencies.

The board maintains four core data structures:

| Structure | Dimensions | Purpose |
|-----------|------------|---------|
| `board` | N×N | Cell values: EMPTY (0), SUN (1), MOON (2) |
| `fixed_mask` | N×N | Boolean grid indicating immutable cells |
| `h_constraints` | N×(N-1) | Horizontal constraints between adjacent columns |
| `v_constraints` | (N-1)×N | Vertical constraints between adjacent rows |

### State Space Representation

A state **S** in the Tango puzzle is formally defined as a tuple:

```
S = (B, F, H, V)
```

Where:

- **B** is an N×N matrix where each cell B[i][j] ∈ {0, 1, 2} (EMPTY, SUN, MOON)
- **F** is an N×N boolean matrix indicating fixed (immutable) cells
- **H** is an N×(N-1) matrix of horizontal constraints between adjacent columns
- **V** is an (N-1)×N matrix of vertical constraints between adjacent rows

### State Immutability: The `copy_board()` Function

The `copy_board(original)` function performs a manual deep copy of the entire `TangoBoard` object. This is critical for AI search because:

1. **State Immutability:** Search algorithms (BFS/DFS) must explore hypothetical futures without corrupting the current board. Each branch in the search tree requires an independent copy.
2. **No Shared References:** A shallow copy would cause multiple search nodes to reference the same underlying lists, leading to catastrophic state corruption during backtracking.
3. **Explicit Control:** By manually iterating through each matrix, the function guarantees complete independence between the original and copied states.

### State Identification: The `get_hash()` Method

The `get_hash()` method generates a unique string identifier for a board state by concatenating all cell values into a single string. This serves two purposes:

1. **Visited Set Tracking:** Both BFS and DFS maintain a `visited = set()` of hashes. Before expanding a state, the algorithm checks if its hash exists in the set. This prevents infinite loops and redundant exploration of identical states reached via different move orders.
2. **State Comparison:** Comparing two full board objects is O(N²). Comparing two hash strings is O(1) amortized, making cycle detection computationally efficient.

### Intelligence Layer (UltimateSolver + TangoExpertEngine)

**Responsibility:** Contains all AI reasoning and search algorithms.

- `UltimateSolver` — Orchestrates the expert system, backtracking, BFS, and DFS
- `TangoExpertEngine` — Built on `experta` library, handles rule-based logical deduction

**Decoupling:** The solver receives a `TangoBoard` reference at initialization but does not mutate the board directly during search; instead, it operates on deep copies, preserving the original state for the UI layer.

### Rule-Based Expert System (12 Rules)

#### Architecture of TangoExpertEngine

The expert system is built using the `experta` library, which implements the Rete algorithm for efficient pattern matching.

#### Fact Classes

| Fact Class | Attributes | Purpose |
|------------|------------|---------|
| `CellFact` | row, col, value | Represents the state of a single cell |
| `HConstraintFact` | row, col, relation | Represents horizontal constraints |
| `VConstraintFact` | row, col, relation | Represents vertical constraints |

#### Knowledge Loading

The `load_board()` method translates the current board state into a set of facts declared into the engine's working memory using `self.declare()`.

#### Constraint-Based Rules (Rules 1-8)

| Rule Category | Method Name | Logic |
|---------------|-------------|-------|
| Horizontal Equality | `rule_h_equal_right` | If cell[r][c] is empty and cell[r][c+1] has value v with `=` constraint, deduce v |
| | `rule_h_equal_left` | If cell[r][c] has value v and cell[r][c+1] is empty with `=` constraint, deduce v |
| Horizontal Opposite | `rule_h_opposite_right` | If cell[r][c] is empty and cell[r][c+1] has value v with `x` constraint, deduce 3-v |
| | `rule_h_opposite_left` | If cell[r][c] has value v and cell[r][c+1] is empty with `x` constraint, deduce 3-v |
| Vertical Equality | `rule_v_equal_down` | Same logic applied vertically (downward neighbor) |
| | `rule_v_equal_up` | Same logic applied vertically (upward neighbor) |
| Vertical Opposite | `rule_v_opposite_down` | Opposite constraint applied vertically (downward) |
| | `rule_v_opposite_up` | Opposite constraint applied vertically (upward) |

#### Balance Rules (Rules 9-12)

| Rule Category | Method Name | Logic |
|---------------|-------------|-------|
| Row Balance | `rule_row_balance_sun` | If row already contains N/2 suns, all remaining empty cells must be moon |
| | `rule_row_balance_moon` | If row already contains N/2 moons, all remaining empty cells must be sun |
| Column Balance | `rule_col_balance_sun` | If column already contains N/2 suns, remaining cells must be moon |
| | `rule_col_balance_moon` | If column already contains N/2 moons, remaining cells must be sun |

#### Forward Chaining Deduction Process

1. **Fact Declaration:** The board state is loaded as facts into working memory.
2. **Pattern Matching:** The Rete engine automatically matches facts against the LHS (Left-Hand Side) of all `@Rule` decorators.
3. **Rule Firing:** When all conditions of a rule are satisfied, the RHS (Right-Hand Side) executes, appending a deduction `(r, c, v)` to the list.
4. **Application:** The `solve_next_step()` method retrieves deductions, validates them against `is_legal`, and applies the first valid one to the board. This loop repeats until no new deductions are found.

This demonstrates **forward chaining**: starting from known facts and deriving new knowledge until a fixed point is reached.

### Blind Search Algorithms

#### BFS vs DFS Comparison

| Feature | BFS | DFS |
|---------|-----|-----|
| Data Structure | `deque` (FIFO queue) | `list` used as stack (LIFO) |
| Exploration Order | Level-by-level (shallowest first) | Depth-first (deepest first) |
| Optimality | Guarantees shortest path | No path length guarantee |
| Memory Usage | Higher (stores all frontier nodes) | Lower (stores single path + siblings) |
| Implementation | `queue.popleft()` | `stack.pop()` |

Both algorithms share identical core logic:

- Initialize with a deep copy of the starting board and an empty path `[]`
- Maintain a visited set of state hashes to prevent cycles
- Impose a step limit of 50,000 to prevent infinite execution on unsolvable states

#### The "First Empty Cell" Branching Strategy

**Problem:** A naive approach branches on ALL empty cells simultaneously, creating a branching factor of 2 × k where k is the number of empty cells. For a 4×4 board with 12 empty cells, this yields 24 branches per state — leading to exponential explosion.

**Solution:** The `find_first_empty()` method returns the coordinates of the first empty cell encountered in row-major order. The search branches only on this single cell, trying v=1 (SUN) and v=2 (MOON). This reduces the branching factor to exactly 2 per state.

**Why this works:** The order of filling cells does not affect the final solution. By enforcing a deterministic fill order, the search tree becomes a binary tree of depth k instead of a factorial explosion, making 4×4 puzzles solvable in milliseconds.

#### BFS Implementation

```python
def bfs(self):
    start_state = copy_board(self.board)
    start_hash = start_state.get_hash()
    queue = deque()
    queue.append((start_state, []))
    visited = set()
    visited.add(start_hash)
    steps = 0
    while len(queue) > 0:
        current_state, path = queue.popleft()
        if current_state.is_win():
            return path
        steps = steps + 1
        if steps > 50000:
            return []
        empty = current_state.find_first_empty()
        if empty is None:
            continue
        r, c = empty
        for v in [SUN, MOON]:
            legal, _ = current_state.is_legal(r, c, v)
            if legal:
                next_state = copy_board(current_state)
                next_state.board[r][c] = v
                state_hash = next_state.get_hash()
                if state_hash not in visited:
                    visited.add(state_hash)
                    new_path = path + [(r, c, v)]
                    queue.append((next_state, new_path))
    return []
```

#### DFS Implementation

```python
def dfs(self):
    start_state = copy_board(self.board)
    stack = []
    stack.append((start_state, []))
    visited = set()
    visited.add(start_state.get_hash())
    steps = 0
    while len(stack) > 0:
        current_state, path = stack.pop()
        if current_state.is_win():
            return path
        steps = steps + 1
        if steps > 50000:
            return []
        empty = current_state.find_first_empty()
        if empty is None:
            continue
        r, c = empty
        for v in [SUN, MOON]:
            legal, _ = current_state.is_legal(r, c, v)
            if legal:
                next_state = copy_board(current_state)
                next_state.board[r][c] = v
                state_hash = next_state.get_hash()
                if state_hash not in visited:
                    visited.add(state_hash)
                    new_path = path + [(r, c, v)]
                    stack.append((next_state, new_path))
    return []
```

#### Path Output Format

Both algorithms return the solution as a raw list of tuples:

```
[(r1, c1, v1), (r2, c2, v2), ..., (rk, ck, vk)]
```

Each tuple represents one move: (row_index, column_index, value). This format is:

- **Mathematically precise:** Each action is a 3-tuple mapping to the state transition function.
- **Serializable:** Can be printed, stored, or replayed deterministically.
- **Verified:** The `display_path()` function prints the raw path first, then iterates through it to show human-readable steps.

### Smart Puzzle Generation (Three-Step Strategy)

#### Why Random Placement Fails

The previous implementation placed random cells and random constraints independently. This produced mathematically impossible puzzles where the given clues contradicted each other or the constraints made the puzzle unsolvable.

#### The Three-Step "Generate → Mask" Strategy

**Step 1: Generate a Full Valid Board**

The `generate_full_board()` method uses randomized backtracking to fill the entire N×N grid.

**Algorithm:**
1. Find the first empty cell using `find_first_empty()`
2. Shuffle `[SUN, MOON]` for randomness
3. For each candidate value, validate:
   - Row/column balance (no more than N/2 of either symbol)
   - No three adjacent identical symbols (horizontal and vertical)
4. If valid, place the value and recurse
5. If recursion fails, backtrack (`board.board[r][c] = EMPTY`) and try the alternative value

**Guarantee:** Since the board is constructed cell-by-cell with full rule validation, the resulting complete board is 100% valid by construction.

**Step 2: Derive Constraints from Reality**

Instead of placing random constraints, the algorithm iterates through all adjacent cell pairs on the completed board:

- If two adjacent cells have the same value → constraint = EQUAL (1)
- If they have different values → constraint = OPPOSITE (2)

**Guarantee:** Constraints are always consistent with the solution because they are derived from it.

**Step 3: Mask (Hide) Cells**

1. Save the full board values to a temporary list
2. Clear all cells to EMPTY
3. Select a random subset based on difficulty:

| Difficulty | Initial Cells Shown | Formula |
|------------|---------------------|---------|
| Easy | N × 2 | More clues |
| Medium | N | Balanced |
| Hard | N // 2 | Minimal clues |

4. Restore selected cells and lock them with `is_initial=True`

**Guarantee:** Since the hidden cells were part of a known-valid full board, and constraints are consistent with that board, at least one solution (the original) is guaranteed to exist.

### Robustness & Validation

#### Design Philosophy: The "Zero-Crash" Policy

The codebase strictly avoids `try-except` blocks for input validation. Instead, it employs defensive programming using `while True` loops with logical predicates. This approach:

1. **Prevents silent failures:** Exceptions can mask underlying logic errors. Explicit validation makes failure modes visible and recoverable.
2. **Ensures type safety:** `str.isdigit()` checks are performed before any `int()` conversion, eliminating `ValueError` crashes.
3. **Guarantees loop termination:** Each validation function only returns when a valid value is obtained, ensuring the main program never receives malformed input.

#### Validation Examples

**Board Size Validation:**
```python
def get_even_size():
    while True:
        size_input = input("Enter board size (must be an even number like 4, 6, 8): ").strip()
        if size_input.isdigit() == False:
            print("Error: Please enter a valid integer number.")
            continue
        size = int(size_input)
        if size <= 2:
            print("Error: Size must be greater than 2.")
            continue
        if size % 2 != 0:
            print("Error: Size must be an even number.")
            continue
        return size
```

- **Row/Column Input Validation:** Checks `isdigit()` first, converts to `int` only after validation, checks range boundaries `[0, size-1]` explicitly.
- **Menu Choice Validation:** Reads input as a string, compares against valid options using `if-elif` chains, invalid choices trigger re-prompt.
- **Value Input Validation:** Accepts only 'S', 'M', or 'E' (case-insensitive via `.upper()`), any other input triggers re-prompt.

### Core Class Methods Reference

#### TangoBoard Methods

| Method | Purpose | Returns |
|--------|---------|---------|
| `__init__(size)` | Initialize empty board with specified dimensions | None |
| `get_hash()` | Generate unique string identifier for board state | String |
| `is_legal(r, c, val)` | Check if placing val at (r,c) violates any rules | (bool, str) |
| `find_first_empty()` | Find first empty cell in row-major order | (int, int) or None |
| `set_value(r, c, val, is_initial)` | Set cell value with optional locking | bool |
| `is_fixed(r, c)` | Check if cell is locked | bool |
| `is_win()` | Check if board is completely solved | bool |
| `render()` | Print board to terminal | None |

#### UltimateSolver Methods

| Method | Purpose | Returns |
|--------|---------|---------|
| `solve_next_step()` | Apply one step of expert system deduction | bool |
| `solve_all()` | Solve entire board using expert rules then backtracking | bool |
| `_backtrack()` | Recursive backtracking solver | bool |
| `generate_full_board(board)` | Generate complete valid board using randomized backtracking | bool |
| `bfs()` | Breadth-First Search solution | list of tuples |
| `dfs()` | Depth-First Search solution | list of tuples |
| `apply_path(path)` | Apply solution path to board | None |

#### TangoExpertEngine Methods

| Method | Purpose | Returns |
|--------|---------|---------|
| `load_board()` | Load board state into knowledge engine | None |
| `get_deductions()` | Return list of deductions made by engine | list of tuples |

### Performance Characteristics

- 4×4 puzzles: Solvable in milliseconds
- 6×6 puzzles: Solvable in seconds
- 8×8 puzzles: Solvable in minutes with BFS/DFS
- Expert system: Near-instantaneous for single-step deduction

### Summary

| Concept | Implementation | Key Innovation |
|---------|----------------|----------------|
| State-Space Search | BFS/DFS with visited sets | "First Empty Cell" branching reduces complexity from factorial to exponential (base 2) |
| Expert Systems | Forward chaining via `experta` | 12 rules covering constraints, balance, and adjacency |
| Constraint Satisfaction | Backtracking generation | "Generate → Mask" strategy guarantees solvability |
| Defensive Programming | `while True` validation loops | Zero-crash policy without exception handling |
| Software Engineering | Three-layer architecture | Separation of concerns enables independent testing and modification |

**File:** `Tango AI Puzzle System/`

---

## Project 10: Strategic Grid Game (Vexon)

**Domain:** Strategic Gaming with AI Opponents  
**Framework:** PyQt6  
**Lines:** ~7,000+ (single-file monolith)  
**Total Codebase:** ~12,000+ lines across three architectural iterations

### Project Evolution & Architectural Journey

The project was developed in three distinct phases, each representing a learning milestone:

| Phase | Framework | Architecture | Lines | Key Insight |
|-------|-----------|--------------|-------|-------------|
| Phase 1 | PyQt5 | Strict DDD (26 modules) | ~8,000 | Over-engineering for simple problem |
| Phase 2 | Tkinter | Modular Monolith + EventBus (10 modules) | ~5,000 | Right balance of modularity |
| Phase 3 | PyQt6 | Layered Single-File (21 sections) | 7,001 | Well-structured single file > premature modularization |

**Lesson Learned:** Architecture should match problem complexity. A well-structured single file can be more maintainable than premature modularization for self-contained desktop applications.

---

### Iteration I — Clean Architecture (Domain-Driven Design)

#### Layer Architecture

```
presentation/  →  application/  →  domain/  ←  infrastructure/
```

**Domain Layer** (`domain/`):

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| `Board` | Game board with dynamic sizing | `size: int`, `grid: List[List[str]]` |
| `GameState` | Current game status | `status: GameStatus`, `winner_symbol: Optional[str]` |
| `Player` | Runtime player instance | `player_id`, `name`, `symbol`, `stats: PlayerStats` |
| `Profile` | Persistent player data | `player_id`, `name`, `level`, `stats: Dict` |
| `GameResult` | Immutable game outcome record | `game_id`, `player_x_id`, `winner_id`, `duration_seconds`, `board_size` |

**Value Objects** (`domain/value_objects/`):

| Value Object | Purpose |
|-------------|---------|
| `Difficulty` | Enum: EASY, MEDIUM, HARD |
| `BoardConfig` | Frozen dataclass validating board size (3-10) |
| `Rating` | Elo-style rating with `update(opponent_rating, score, k_factor)` |

**Repositories** (Abstract interfaces, `domain/repositories/`):

```python
class ProfileRepository(ABC):
    @abstractmethod
    def get_by_id(self, player_id: str) -> Optional[Profile]: ...
    @abstractmethod
    def save(self, profile: Profile) -> None: ...
    @abstractmethod
    def list_all(self) -> List[Profile]: ...

class GameResultRepository(ABC):
    @abstractmethod
    def save(self, result: GameResult) -> None: ...
    @abstractmethod
    def list_all(self) -> List[GameResult]: ...

class ReplayRepository(ABC):
    @abstractmethod
    def save_replay(self, game_id: str, moves: List[Dict[str, Any]]) -> None: ...
    @abstractmethod
    def get_replay(self, game_id: str) -> List[Dict[str, Any]]: ...
```

**Domain Services** (`domain/services/`):

- **`GameService`** — Orchestrates a single game session. UI-agnostic; holds `Board`, `GameState`, invokes `AIService`, delegates to `RatingService` and `ReplayService`.
- **`AIService`** — Strategy selector based on `Difficulty`. Implements random, heuristic, and minimax approaches.
- **`RatingService`** — Manages Elo-style rating updates. K-factor = 32.0. Score: 1.0 (win), 0.5 (draw), 0.0 (loss).
- **`ReplayService`** — Thin delegation to `ReplayRepository` for persistence.

**Application Layer** (`application/use_cases/`):

| Use Case | Function | Description |
|----------|----------|-------------|
| `start_game.py` | `start_game(player_name)` | Initializes all services, returns `(GameService, human, ai)` |
| `make_move.py` | `make_move(game_service, row, col)` | Applies human move, triggers AI response |
| `end_game.py` | `end_game(game_service)` | Finalizes result, persists to all storage layers |
| `get_stats.py` | `get_stats(player_id)` | Reads profile stats from persistence |
| `update_settings.py` | `update_settings(board_size, difficulty)` | Validates and persists configuration changes |
| `save_replay.py` | `save_replay_use_case(game_id, moves)` | Explicit replay persistence |

**Infrastructure Layer** (`infrastructure/`):

- **`json_storage.py`** — Generic JSON read/write with `load_json(filename, default)` and `save_json(filename, data)`. Uses `pathlib.Path`, auto-creates `data/` directory.
- **`result_storage.py`** — Appends game results to `data/results.json` with timestamps.
- **`profile_storage.py`** — CRUD for player profiles in `data/profiles.json`.
- **`replay_storage.py`** — Key-value replay storage in `data/replays.json`, keyed by game UUID.
- **`config_manager.py`** — Reads/writes `data/config.json` with defaults for `board_size` and `difficulty`.
- **`logger.py`** — Centralized `get_logger(name)` with file and console handlers.

**Presentation Layer** (`presentation/`):

- **`MainWindow`** — Hosts all views via `QStackedLayout`. Orchestrates navigation and game flow.
- **`GameView`** — Dynamic NxN grid of `QPushButton`s with `pyqtSignal(int, int)` for cell clicks. Features last-move highlighting and "pop" animation via `QPropertyAnimation`.
- **`MenuView`** — Title + three buttons (Start, Settings, Stats) with signal emission.
- **`SettingsView`** — `QSpinBox` for board size, `QComboBox` for difficulty and theme.
- **`StatsView`** — Read-only display of wins/losses/draws and last-played metadata.
- **`ThemeManager`** — Static utility loading QSS files from `presentation/themes/`.

**Themes (QSS):** `light.qss`, `dark.qss`, `cheerful.qss`

---

### Iteration II — Modular Monolith (Event-Driven)

A flat-package architecture centered on an **EventBus** pub/sub system. All 10 modules reside in a single `TicTacToe_2/` directory with clean imports via `__init__.py`.

#### Core Engine (`core_engine.py` — 653 lines)

**Logging & Error Framework:**
```python
class Logger:          # Singleton-pattern logging facade
class TicTacToeError(Exception):    # Base exception
class ConfigurationError(TicTacToeError)
class PersistenceError(TicTacToeError)
class AIError(TicTacToeError)
```

**Path & Configuration Management:**
```python
class PathManager:     # Centralized file paths (data/, scores.json, replays.json, etc.)
class ConfigManager:   # Versioned JSON config with migration support
```

**Domain Models:**
```python
class Symbol(str, Enum):       # X, O, EMPTY
class PlayerType(str, Enum):   # HUMAN, AI
class GameResult(str, Enum):   # HUMAN_WIN, AI_WIN, DRAW, IN_PROGRESS
class Difficulty(str, Enum):   # EASY, MEDIUM, HARD

@dataclass
class PlayerProfile:     # Aggregate stats with record_result()
class MoveRecord:        # Single move: index, symbol, player_type, row, col, timestamp
class GameStateSnapshot: # Complete board snapshot for undo/replay
```

**Event Bus:**
```python
class EventType(str, Enum):
    GAME_STARTED, MOVE_PLAYED, GAME_ENDED, GAME_RESET,
    PROFILE_UPDATED, STATS_UPDATED, THEME_CHANGED, CONFIG_CHANGED, ERROR_OCCURRED

class EventBus:
    def subscribe(self, event_type, handler): ...
    def unsubscribe(self, event_type, handler): ...
    def emit(self, event): ...  # Error-isolated handler execution
```

**Board System:**
```python
class Board:  # UI-agnostic, SIZE=3, grid-based
    def is_valid_move(row, col) -> bool
    def make_move(row, col, symbol) -> bool
    def get_empty_positions() -> List[Tuple[int, int]]
    def check_winner() -> Optional[Symbol]  # Rows, cols, diagonals
    def get_winning_cells() -> List[Tuple[int, int]]
```

**Game Engine:**
```python
class AIPlayerProtocol(Protocol):
    def choose_move(board, symbol) -> Tuple[int, int]: ...

class GameEngine:
    def start_new_game(self): ...
    def play_human_move(row, col) -> bool
    def play_ai_move() -> Optional[Tuple[int, int]]
    def get_snapshot() -> GameStateSnapshot
    def reset_game(self): ...
```

#### AI Strategies (`ai_strategies.py` — 322 lines)

**EasyAI — Weighted Randomness:**
- 35% chance to take center (1,1)
- 35% chance to take a corner from available corners
- Otherwise uniform random

**MediumAI — Heuristic + Mistake Injection:**
1. Check if AI can win in one move → take it
2. Check if opponent can win in one move → block it
3. 70% chance: play heuristic move (center > corner > random)
4. 30% chance: play random move (mistake injection)

**HardAI — Minimax with Alpha-Beta Pruning + Caching:**
- Uses `MinimaxCacheKey` (flat board tuple + symbol) for memoization
- `_minimax(board, is_maximizing, ai_symbol, alpha, beta)` — standard algorithm
- `_check_winner_fast(board)` — logging-free inline winner check
- Cache stores evaluated scores to avoid recomputation

**DifficultyRouter (Factory):**
```python
class DifficultyRouter:
    @staticmethod
    def create_ai(difficulty: Difficulty) -> BaseAI:
        # Returns EasyAI, MediumAI, or HardAI
```

#### Persistence Layer (`persistence.py` — 208 lines)

All storage classes inherit from `BaseJsonStorage`:

```python
class BaseJsonStorage:
    CURRENT_VERSION = 1
    def _load(self): ...       # Load → validate → migrate if needed
    def _save(self): ...       # Backup → write → error handling
    def _recover_from_backup(self): ...  # Corruption recovery
    def _migrate(self, old, old_version): ...  # Schema migration
```

**Concrete Storage Classes:**

| Class | Data Structure | File |
|-------|---------------|------|
| `ScoreStorage` | `{players: {name: {difficulty: {wins, losses, draws, points}}}}` | `scores.json` |
| `ProfileStorage` | `{profiles: {name: PlayerProfile.__dict__}}` | `profiles.json` |
| `ReplayStorage` | `{replays: [{player, difficulty, result, timestamp, moves}]}` | `replays.json` |
| `AnalyticsStorage` | `{games_played, human_wins, ai_wins, draws}` | `analytics.json` |

#### Theme Engine (`themes.py` — 188 lines)

```python
@dataclass
class Theme:
    name, bg, fg, accent, accent_soft, board_bg, cell_bg,
    cell_hover, cell_pressed, win_highlight, status_bg

class ThemeManager:
    def _register_builtin_themes(self):  # light, dark, midnight_neon
    def register_custom_theme(self, theme): ...
    def set_theme(self, name): ...       # Runtime switching + persistence
    def apply_to_frame(self, frame): ... # Tkinter widget helpers
    def apply_to_cell(self, button): ...
```

**Built-in Themes:**
- **Light** — `#f4f4f7` bg, `#0078d7` accent, `#9be7a1` win highlight
- **Dark** — `#1e1e2e` bg, `#4fc3f7` accent, `#66bb6a` win highlight
- **Midnight Neon** — `#0d0d14` bg, `#8a2be2` accent, `#00ffcc` win highlight

#### Sound Manager (`sound_manager.py` — 103 lines)

Cross-platform sound abstraction:
- Windows: `winsound.Beep(freq, dur)`
- Other: Silent fallback (no-op)
- Config-driven enable/disable
- Event-specific frequencies: move (900Hz), win (1200Hz), loss (400Hz), draw (700Hz), invalid (300Hz)

#### Analytics Engine (`analytics.py` — 278 lines)

Event-driven analytics with four tracking dimensions:

```python
@dataclass
class DifficultyStats:     # Per-difficulty win/loss/draw counts + rates
class MoveTimingStats:     # Human vs AI move timing averages
class MoveFrequencyStats:  # Cell play frequency (human_freq, ai_freq)
class OpeningMoveStats:    # First-move → outcome correlation

class AnalyticsEngine:
    def handle_event(self, event): ...  # Subscribes to MOVE_PLAYED, GAME_ENDED
    def summary(self) -> Dict: ...      # Full export-ready analytics
    def human_heatmap(self) -> List[List[int]]: ...
    def ai_heatmap(self) -> List[List[int]]: ...
    def difficulty_trend(self, difficulty): ...
```

#### UI Application (`ui_app.py` — 1,174 lines)

Tkinter-based cinematic UI with:
- **Screen Management:** Main menu → Difficulty selection → Game screen (frame-based navigation)
- **AI Threading:** `threading.Thread` for non-blocking AI computation with UI freeze prevention
- **Animation System:** `AnimationManager` with `pulse_buttons()` and `pulse_label()` — Tkinter `after()` based
- **Scaling Engine:** `ScalingEngine` with configurable scale factor (0.7–2.0) affecting all font sizes and padding
- **Hover Effects:** Per-button `<Enter>`/`<Leave>` bindings for visual feedback
- **Winning Animation:** Pulsing cell highlight on game end

#### Logging Configuration (`logging_config.py` — 120 lines)

```python
class LoggingConfigurator:
    LOG_FILENAME = "tictactoe.log"
    MAX_BYTES = 1_000_000  # 1 MB per file
    BACKUP_COUNT = 5       # Keep last 5 logs

    def configure(self): ...
    # Console handler + rotating file handler + separate error log
```

---

### Iteration III — Vexon: Production-Grade Single-File Application

Vexon consolidates the entire system into a single 7,001-line file with 21 clearly labeled sections and 42 classes. This is a deliberate engineering decision for a self-contained desktop application where the cost of cross-file navigation exceeds the benefit of file-level separation.

#### Section Index

| # | Section | Key Classes |
|---|---------|-------------|
| 01 | Configuration & Constants | `APP_CONFIG`, `win_length_for()`, `ai_depth_limit()` |
| 02 | Logging Framework | 8 namespaced loggers (engine, ai, storage, ui, replay, sound, stats, app) |
| 03 | Error Handling | `VexonError`, `ErrorCode` (E001–E012), `safe_run()` |
| 04 | Core Game Engine | `GameEngine` (stateless), `BoardConfig`, `EvalResult`, `Player` |
| 05 | Board Manager | `BoardManager`, `MoveRecord` |
| 06 | AI Engine | `HardAIStrategy`, `MediumAIStrategy`, `EasyAIStrategy`, `TranspositionTable` |
| 07 | Difficulty Layer | `AIController`, `AIWorker` (QThread-based async) |
| 08 | Sound Manager | `SoundManager` (procedural WAV synthesis via ADSR envelopes) |
| 09 | Persistence | `PersistenceManager`, `StoredData`, `AppSettings`, `StatisticsData` |
| 10 | Player Profiles | `PlayerProfileManager` |
| 11 | Statistics Engine | `StatisticsEngine` — streaks, difficulty/board-size breakdowns |
| 12 | Replay System | `ReplaySystem`, `ReplayManager` — frame-accurate board reconstruction |
| 13 | Theme Engine | `ThemeEngine`, `ThemePalette` — 8 themes, runtime QSS injection |
| 14 | Animation Manager | `AnimationManager` — Qt Animation Framework wrappers |
| 15 | UI Component Framework | `VexButton`, `CellWidget`, `BoardWidget`, `ScoreBar`, `StatusLabel`, `ThinkingWidget`, `DiffBadge` |
| 16 | Screen: Menu | `MenuScreen`, `BoardPreview` |
| 17 | Screen: Game | `GameScreen` |
| 18 | Screen: Statistics | `StatsScreen` |
| 19 | Screen: Replays | `ReplaysScreen` |
| 20 | Screen: Settings | `SettingsScreen` |
| 21 | Root Orchestrator | `MainWindow` |

#### Core Game Engine — Stateless Design

The `GameEngine` in Vexon is completely **stateless** — all methods are `@staticmethod`. Board state is represented as a flat `list[Player]` of length `size²`. Cell index = `row * size + col` (row-major order).

```python
class GameEngine:
    @staticmethod
    def empty_board(cfg: BoardConfig) -> list[Player]:
        return [Player.NONE] * cfg.cell_count

    @staticmethod
    def apply_move(board, index, player, cfg) -> list[Player]:
        """Immutable: returns a new board."""
        nxt = list(board)
        nxt[index] = player
        return nxt

    @staticmethod
    def check_win(board, player, cfg) -> list[int]:
        """Direction-based win detection for arbitrary board sizes."""
        # Checks 4 directions: horizontal, vertical, diagonal ↘, diagonal ↙
        # Uses straight_run() with row/column continuity enforcement

    @staticmethod
    def evaluate_board(board, cfg) -> EvalResult:
        """Full evaluation: win (with winner + cells), draw, or playing."""

    @staticmethod
    def heuristic_score(board, player, cfg) -> float:
        """Positional evaluation using open-run counting + center bonus."""
```

**Board Configuration:**

```python
@dataclass(frozen=True, slots=True)
class BoardConfig:
    size:       int  # edge length (3-10)
    win_len:    int  # consecutive marks to win
    cell_count: int  # size²

    @staticmethod
    def for_size(size: int) -> BoardConfig:
        wl = win_length_for(size)
        return BoardConfig(size=size, win_len=wl, cell_count=size * size)
```

**Win-Length Policy:**

| Board Size | Win Length | AI Depth Limit | Strategy |
|-----------|-----------|----------------|----------|
| 3×3 | 3 | 10 (full search) | Minimax |
| 4×4 | 4 | 6 | Minimax + pruning |
| 5×5 | 4 | 4 | Minimax + pruning |
| 6×6 | 5 | 3 | Minimax + heuristic |
| 7×7+ | 5 | 2 (heuristic) | Heuristic only |

**Board Manager — Mutable State Container:**

```python
class BoardManager:
    def __init__(self, cfg: BoardConfig): ...
    def reset(self, cfg=None): ...
    def make_move(self, index: int) -> bool: ...
    def undo_move(self, steps: int = 1) -> bool: ...  # Rebuilds board from history
    def get_state(self) -> dict[str, Any]: ...          # Immutable snapshot
    def get_move_log(self) -> list[dict]: ...           # For replay serialization
```

#### Win Detection Algorithm

Vexon's `check_win()` uses a direction-based approach:

```python
directions = [(0, 1), (1, 0), (1, 1), (1, -1)]  # →, ↓, ↘, ↙

for start in range(cell_count):
    if board[start] is not player: continue
    for dr, dc in directions:
        cells = straight_run(start, dr, dc)  # Follow direction for win_len steps
        if len(cells) == win_len:
            return cells  # Winning line found
```

The `straight_run()` function enforces **row/column continuity** — it verifies that each step stays within bounds and that the column index matches the expected column during diagonal traversal.

**Evolution of Board Representation:**

| Iteration | Representation | Size Support | Win Detection |
|-----------|---------------|-------------|---------------|
| I (DDD) | `List[List[str]]` | Dynamic (3-10) | Full row/col/diagonal scan |
| II (Event) | `List[List[Symbol]]` | Fixed 3×3 | 8-line check (3 rows, 3 cols, 2 diagonals) |
| III (Vexon) | `list[Player]` (flat) | Dynamic (3-10) | Direction-based with win_len |

---

### Three-Tier AI System

#### HardAIStrategy — Minimax α-β + Transposition Table

```python
class HardAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        """Depth-limited minimax with alpha-beta pruning."""
        self._tt.reset()
        depth_limit = ai_depth_limit(cfg.size)  # 2-10 based on board
        for idx in _priority_order(empty_cells, cfg.size):  # center-first ordering
            nxt = apply_move(board, idx, ai_player, cfg)
            score = minimax(nxt, 0, False, -inf, inf, ...)
            if score > best_score: best_move = idx

class TranspositionTable:
    """Memoization cache. Keys = (board_values..., maximizing)."""
    def get(key) -> float | None
    def set(key, value): ...
    def diagnostics() -> dict  # hit rate, size, hits, misses
```

| Component | Implementation |
|-----------|----------------|
| Algorithm | Depth-limited minimax with alpha-beta pruning |
| Optimization | Transposition table for memoization (board state → score mapping) |
| Move Ordering | Center proximity for improved cutoff frequency |
| Leaf Evaluation | Heuristic with exponential open-run weights (1, 10, 100, 1000) |

**Performance Optimizations:**
1. **Move Ordering:** `_priority_order()` sorts candidate moves by center proximity, improving α-β cutoff frequency
2. **Depth Limiting:** Depth decreases as board size increases (10 for 3×3, 2 for 7×7+)
3. **Heuristic Leaf Evaluation:** At depth limit, `heuristic_score()` returns a float instead of terminal scoring
4. **Transposition Table:** Avoids redundant subtree evaluation with hit/miss diagnostics

#### MediumAIStrategy — Heuristic + Probabilistic Noise

```python
class MediumAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        mistake_rate = max(0.10, 0.28 - 0.02 * cfg.size)  # Scales with board
        # 1. Win immediately (always)
        # 2. Block opponent (86% probability)
        # 3. Random mistake (mistake_rate% probability)
        # 4. Heuristic best move
```

| Behavior | Probability |
|----------|-------------|
| Takes immediate wins | 100% |
| Blocks opponent wins | 86% |
| Random mistake injection | 10-28% (based on board size) |
| Heuristic best move | Center > corner > random |

#### EasyAIStrategy — Weighted Random

```python
class EasyAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        # 25% chance to grab an immediate win
        # Otherwise: weighted random favoring center proximity
```

| Behavior | Probability |
|----------|-------------|
| Grabs immediate win | 25% |
| Weighted random (center preference) | 75% |

#### AI Algorithm Comparison

| Tier | Algorithm | Strengths | Weaknesses |
|------|-----------|-----------|------------|
| Easy | Weighted Random | Center-biased, occasionally wins | No tactical awareness |
| Medium | Heuristic + Noise | Wins/blocks, beatable | Probabilistic mistakes |
| Hard | Minimax α-β + TT | Optimal play on 3×3, strong on larger | Depth-limited on large boards |

#### AI Performance Characteristics

| Board | Hard AI Depth | Approx. Nodes Explored | Response Time |
|-------|-------------|----------------------|---------------|
| 3×3 | 10 (full) | ~5,500 | <100ms |
| 4×4 | 6 | ~10,000 | <200ms |
| 5×5 | 4 | ~15,000 | <300ms |
| 7×7 | 2 + heuristic | ~5,000 | <150ms |
| 10×10 | 2 + heuristic | ~8,000 | <200ms |

#### Async AI Execution (QThread)

```python
class AIWorker(QObject):
    move_ready     = pyqtSignal(int)
    error_occurred = pyqtSignal(str)

    def run(self):
        time.sleep(self._delay_ms / 1000.0)  # Realistic delay
        move = strategy.get_best_move(...)
        self.move_ready.emit(move)

class AIController:
    _STRATEGIES = {"hard": HardAIStrategy(), "medium": MediumAIStrategy(), "easy": EasyAIStrategy()}

    def request_move(self, board, player, difficulty, cfg, on_move, on_error):
        """Non-blocking. Spawns QThread per request. Cancels previous if running."""
```

**AI Think Delays:** Easy: 450ms, Medium: 720ms, Hard: 1050ms

---

### Eight Themes with Runtime Switching

#### Theme System Architecture

Vexon's theme engine uses a **token-based design system**:

```python
@dataclass
class ThemePalette:
    id: str                    # "dark", "light", "midnight", etc.
    name: str                  # Display name
    bg: str                    # Primary background
    surface: str               # Card/panel background
    surface_alt: str           # Secondary surface
    border: str                # Border color
    grid_line: str             # Board grid lines
    accent: str                # Primary accent
    accent_light: str          # Lighter accent variant
    text: str                  # Primary text
    text_muted: str            # Secondary text
    player_x: str              # X player color
    player_o: str              # O player color
    win_color: str             # Winning highlight
    cell_hover: str            # Cell hover state
    danger: str                # Error/danger (consistent across themes)
```

**Token Aliases:** Properties like `background_primary`, `accent_color`, `text_primary` provide semantic access to raw tokens.

#### Eight Built-in Themes

| Theme | ID | Character |
|-------|-----|-----------|
| True Dark | `dark` | Warm gold accent on deep black |
| Light Classic | `light` | Earthy tones, warm cream background |
| Midnight Blue | `midnight` | Deep navy with blue accent |
| Emerald Accent | `emerald` | Dark green with emerald accent |
| Royal Purple | `purple` | Deep violet with purple accent |
| High Contrast | `hc` | Pure black/white/yellow for accessibility |
| Minimal Mono | `mono` | Grayscale, monochromatic |
| Synthwave | `neon` | Neon purple/pink on deep purple |

#### Runtime Theme Switching

```python
class ThemeEngine:
    def set_theme(self, theme_id: str): ...
    def build_palette(self) -> QPalette: ...  # Full QPalette for native widgets
    def build_qss(self) -> str: ...           # Complete scoped Qt stylesheet
    def apply_to_app(self, app: QApplication): ...
        # 1. Apply QPalette (native rendering)
        # 2. Apply QSS (custom widget styling)
        # 3. Force repaint of all top-level widgets
```

No application restart required. The QSS generation covers:
- Global reset (transparent backgrounds, font family)
- Scrollbar styling (thin, rounded)
- VexButton states (default, hover, pressed, primary, danger, disabled)
- Panel/card frames (border-radius, surface colors)
- Input widgets (QLineEdit, QComboBox, QSlider, QCheckBox)
- List widgets and group boxes
- MessageBox styling

---

### Procedural Sound Synthesis (ADSR)

Vexon synthesizes all sound effects at startup using **ADSR (Attack-Decay-Sustain-Release) envelope synthesis** — the same technique used in the Web Audio API. No external audio files are required.

#### ADSR Envelope

```
Attack  →  Rise from 0 to peak (configurable duration)
Decay   →  Drop from peak to sustain level
Sustain →  Hold at sustain level (configurable amplitude)
Release →  Fade from sustain to 0
```

#### Supported Waveforms

- `sine` — Smooth, natural tone
- `triangle` — Warm, slightly buzzy
- `square` — Sharp, digital
- `sawtooth` — Bright, harmonically rich

#### Core Synthesis Functions

```python
def _adsr(freq, dur, *, attack, decay, sustain, release, wave, vol) -> list[float]:
    """Generate ADSR-enveloped waveform. wave: sine|triangle|square|sawtooth"""

def _make_wav(samples: list[float]) -> bytes:
    """Pack float samples into 16-bit mono WAV bytes."""

def _mix(*tracks: list[float]) -> list[float]: ...
def _sequence(notes: list[tuple], gap=0.0) -> list[float]: ...
def _fade(samples, fade_in=0.0, fade_out=0.03) -> list[float]: ...
```

#### Sound Catalogue

| Sound | Technique | Description |
|-------|-----------|-------------|
| `move_x` | Triangle wave, 466Hz, 160ms | Crisp high click for X |
| `move_o` | Triangle wave, 349Hz, 160ms | Warm lower click for O |
| `ai_move` | Sine wave, 392Hz, 130ms | Muted, softer than human |
| `win` | 4-note ascending fanfare (C5→E5→G5→C6) | Victory celebration |
| `draw` | 3-note descending resolve | Balanced neutral |
| `loss` | 2-note gentle descend | Non-frustrating feedback |
| `undo` | Triangle wave, 280Hz | Quick downward chirp |
| `reset` | 2-note up-chime | Fresh start feel |
| `hover` | Sine, 680Hz, 40ms | Near-silent UI tick |
| `theme` | Sine, 800Hz, 100ms | Soft swish upward |

#### Sound Design Philosophy

Each sound is designed for its emotional context:
- **Move sounds** are short and crisp — immediate feedback without distraction
- **Win fanfare** ascends in pitch — celebrating achievement
- **Loss sound** descends gently — acknowledging defeat without frustration
- **Draw sound** resolves neutrally — balanced conclusion
- **Hover tick** is nearly inaudible — subliminal UI feedback

#### Playback

WAV bytes are written to a `tempfile.TemporaryDirectory`, loaded into `QSoundEffect` instances for zero-latency non-blocking playback. Falls back to `QApplication.beep()` if QtMultimedia is unavailable.

---

### Statistics & Analytics

#### StatisticsData Structure

```python
@dataclass
class StatisticsData:
    total_games:         int
    wins_x:              int
    wins_o:              int
    draws:               int
    total_moves:         int
    avg_moves:           float
    streak_current:      int    # Current win streak
    streak_best:         int    # Best win streak
    loss_streak_current: int
    loss_streak_best:    int
    total_playtime_sec:  float
    by_difficulty:       dict   # {easy: {wins, losses, draws}, medium: ..., hard: ...}
    by_board_size:       dict   # {"3": {wins_x, wins_o, draws}, ...}
```

#### GameRecord

Every completed game is recorded with:

```python
@dataclass
class GameRecord:
    id:           str    # UUID
    player_x:     str    # Player name
    player_o:     str    # Player name
    board_size:   int
    difficulty:   str
    mode:         str    # "vs_ai" | "vs_human" | "ai_vs_ai"
    result:       str    # "win_x" | "win_o" | "draw"
    move_count:   int
    duration_sec: float
    timestamp:    float  # Unix epoch
```

---

### Replay System

#### Recording

```python
class ReplaySystem:
    def start(self, cfg, game_mode, difficulty, player_names, user_id): ...
    def record_move(self, player, index): ...
    def stop(self, winner): ...  # Finalizes and stores replay
```

Each replay contains: board size, difficulty, player names, move list (player, index, timestamp), duration, and result.

#### Frame-Accurate Reconstruction

```python
@staticmethod
def board_at_frame(replay: dict, frame: int) -> list[Player]:
    """Reconstruct board state at any frame (0 = empty board)."""
    cfg = BoardConfig.for_size(replay["board_size"])
    board = GameEngine.empty_board(cfg)
    for rec in replay["moves"][:frame]:
        board[rec["index"]] = Player(rec["player"])
    return board
```

#### Isolated Playback Controller

```python
class ReplayManager(QObject):
    frame_changed     = pyqtSignal(int, int, object)  # (frame, max, board)
    playback_finished = pyqtSignal()
    status_changed    = pyqtSignal(str)                # "playing"|"paused"|"stopped"

    def load(self, replay, user_id): ...    # Ownership validation
    def play(self): ...                     # Start/resume
    def pause(self): ...                    # Pause
    def stop(self): ...                     # Stop and reset
    def restart(self): ...                  # Reset to frame 0 and play
    def step_forward(self): ...             # Manual advance
    def step_back(self): ...                # Manual reverse (rebuilds board)
    def seek(self, frame): ...              # Jump to arbitrary frame
```

**Design:** The `ReplayManager` maintains an isolated board state that never touches the live game board. The UI connects only to signals — it never reads internal state directly.

---

### Persistence & Data Management

#### Data Location

```
~/.vexon/
├── data.json           # Primary store (schema v3)
├── data.backup.json    # Auto-backup (written before every save)
├── vexon.log           # Structured rotating log
├── users.json          # Multi-user authentication data
├── results.json        # Game result history
└── stats.json          # Statistics snapshot
```

#### Schema Versioning & Migration

```python
SCHEMA_VERSION = 3

class PersistenceManager:
    def load(self) -> StoredData:
        # Fall-back chain: primary → backup → fresh defaults

    def _migrate(self, raw: dict) -> StoredData:
        """Non-destructively migrate to current schema."""
        # Uses .get(key, default) for every field
        # New fields get default values automatically

    def save(self, data: StoredData) -> bool:
        # Backup current → write new → log success
```

**Schema Evolution:**
- **v1:** Basic settings + statistics
- **v2:** Added game_records, replays, profiles
- **v3:** Added by_board_size breakdown, streaks, playtime

#### Corruption Recovery

```
Load attempt: primary.json
  ├── Success → validate → migrate if needed → return
  └── Failure → load backup.json
        ├── Success → validate → migrate → save as primary → return
        └── Failure → return StoredData() (fresh defaults)
```

#### Atomic Writes

Every save operation follows:
1. Copy current file to `.backup.json` (if exists)
2. Write new data to primary file
3. Log success/failure

This ensures data integrity even if the process crashes mid-write.

---

### Multi-User Support

Vexon supports multiple user profiles with:
- UUID-based player identification
- Per-user statistics tracking
- Replay ownership validation (users can only view their own replays)
- Profile creation and management

---

### Design Patterns & Engineering Principles

#### Patterns Applied

| Pattern | Where Used |
|---------|-----------|
| **Strategy** | AI difficulty tiers (`EasyAIStrategy`, `MediumAIStrategy`, `HardAIStrategy`) |
| **Factory** | `DifficultyRouter.create_ai()`, `BoardConfig.for_size()` |
| **Observer/Pub-Sub** | `EventBus` with `subscribe()`/`emit()` |
| **State** | `GameState`, `GameStatus` enum |
| **Repository** | Abstract `ProfileRepository`, `GameResultRepository`, `ReplayRepository` |
| **Template Method** | `BaseJsonStorage._load()` → `_migrate()` |
| **Adapter** | `ReplayAdapter` bridging function-based storage to class interface |
| **Singleton** | `Logger` class (class-level `_logger`) |
| **Command** | `safe_run(fn, fallback, code, logger)` |

#### Engineering Principles

- **Single Responsibility:** Each class does one thing well
- **Open/Closed:** Theme system extensible via `register_custom_theme()`
- **Liskov Substitution:** All AI strategies implement the same interface
- **Interface Segregation:** Abstract repositories define minimal contracts
- **Dependency Inversion:** Domain depends on abstractions, infrastructure provides implementations
- **Immutability:** `BoardConfig` is frozen, `GameEngine` methods are stateless

#### Code Quality Standards

- **Type Hints:** Comprehensive throughout all iterations
- **Dataclasses:** Used for all value objects and data containers
- **Docstrings:** Module-level, class-level, and method-level documentation
- **Error Handling:** Typed exceptions with machine-readable error codes
- **Logging:** Structured, namespaced logging across all subsystems

**File:** `Strategic Grid Game (Vexon)/`

---

# Part IV: Advanced Systems & Engineering Excellence

> This section documents advanced engineering patterns: persistence strategies, analytics systems, and replay mechanisms.

---

## Persistence & Data Management

### Schema Versioning & Migration

| Project | Schema Version | Migration Strategy |
|---------|----------------|-------------------|
| Hayah | v5 | Incremental with `schema_version` table |
| Vexon | v3 | Non-destructive with `.get(key, default)` defaults |
| Mini Banking | v1 | Direct with foreign keys |

### Vexon's Corruption Recovery

```
Load attempt: primary.json
  ├── Success → validate → migrate if needed → return
  └── Failure → load backup.json
        ├── Success → validate → migrate → save as primary → return
        └── Failure → return StoredData() (fresh defaults)
```

### Atomic Writes (Vexon)

| Step | Operation | Purpose |
|------|-----------|---------|
| 1 | Copy current file to `.backup.json` | Enable rollback |
| 2 | Write new data to primary file | Persist changes |
| 3 | Log success/failure | Audit trail |

---

## Analytics & Statistics Systems

### Vexon Statistics Engine

```python
@dataclass
class StatisticsData:
    total_games:         int
    wins_x:              int
    wins_o:              int
    draws:               int
    total_moves:         int
    avg_moves:           float
    streak_current:      int    # Current win streak
    streak_best:         int    # Best win streak
    loss_streak_current: int
    loss_streak_best:    int
    total_playtime_sec:  float
    by_difficulty:       dict   # {easy: {wins, losses, draws}, medium: ..., hard: ...}
    by_board_size:       dict   # {"3": {wins_x, wins_o, draws}, ...}
```

### Hayah Analytics

| Metric | Description |
|--------|-------------|
| Daily/weekly/monthly/yearly totals | Aggregated donation amounts |
| Category distribution | By prayer time |
| Streak algorithms | Longest and current consecutive days |
| Monthly trend analysis | Growth patterns over time |
| Normalized amounts | All computations use USD for consistency |

---

## Replay Systems

### Vexon's Frame-Accurate Reconstruction

```python
@staticmethod
def board_at_frame(replay: dict, frame: int) -> list[Player]:
    """Reconstruct board state at any frame (0 = empty board)."""
    cfg = BoardConfig.for_size(replay["board_size"])
    board = GameEngine.empty_board(cfg)
    for rec in replay["moves"][:frame]:
        board[rec["index"]] = Player(rec["player"])
    return board
```

### Isolated Playback Controller

| Feature | Implementation |
|---------|----------------|
| State Isolation | `ReplayManager` maintains isolated board state (never touches live game board) |
| UI Connection | Connects only to signals — never reads internal state directly |
| Controls | Play, pause, stop, restart, step forward/back, seek |

---

# Part V: Technical Skills Matrix

> Comprehensive inventory of technical skills demonstrated across all ten projects.

---

## Programming Paradigms

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Object-Oriented Design** | All 10 | Encapsulation, inheritance, polymorphism throughout |
| **Functional Concepts** | 1, 3, 6, 10 | Pure functions, immutability, higher-order functions |
| **Type Safety** | All 10 | Type annotations, enums, dataclasses with validation |
| **Error Handling** | All 10 | Domain exceptions, controller-level catching, user-friendly messages |
| **Stateless Design** | 10 | GameEngine as static methods, immutable board operations |

---

## Database Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Schema Design** | All 10 | Normalized tables, constraints, indexes |
| **Query Optimization** | 1, 3, 5, 6 | Indexes on frequently queried columns |
| **Transaction Management** | 1, 5, 6, 8 | ACID compliance, atomic operations, rollback |
| **Data Integrity** | All 10 | Foreign keys, UNIQUE constraints, CHECK clauses |
| **Connection Management** | 1, 5, 6, 8 | Thread-safe singletons, WAL mode, busy timeout |
| **Schema Migration** | 8, 10 | Versioned migrations with backward compatibility |

---

## Security Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Password Hashing** | 2, 3, 5, 8 | SHA-256, PBKDF2-HMAC-SHA256 with salt |
| **Timing Attack Prevention** | 2, 3, 5 | `hmac.compare_digest()` |
| **Input Validation** | All 10 | Domain-level validation, sanitization |
| **Access Control** | 3, 5 | Role-based permissions, module-level authorization |
| **Error Masking** | 2, 3, 5 | Generic error messages preventing enumeration |
| **Corruption Recovery** | 10 | Backup chain with fresh defaults fallback |

---

## UI/UX Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Responsive Layout** | All 10 | Fixed/minimum sizes, stretch policies |
| **Theme Systems** | 1, 2, 3, 5, 6, 8, 10 | Dark/Light with 30+ tokens, runtime switching |
| **Animation** | 2, 10 | Card shake, button states, Qt Animation Framework |
| **Chart Visualization** | 3, 5, 6, 8 | Pie, bar, spline charts via PyQt6-Charts and matplotlib |
| **Print Support** | 1, 3, 4, 8 | PDF export, system printing |
| **Accessibility** | All 10 | Keyboard shortcuts, clear typography, logical grouping |
| **Procedural Sound** | 10 | ADSR envelope synthesis, WAV generation |
| **Multi-User Support** | 8, 10 | UUID-based identification, per-user statistics |

---

## Software Architecture

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Clean Architecture** | All 10 | 4-layer separation with dependency inversion |
| **Repository Pattern** | All 10 | Abstracted persistence behind interfaces |
| **Service Layer** | All 10 | Stateless orchestration without UI/DB imports |
| **Dependency Injection** | All 10 | Constructor-based wiring; no global state |
| **Domain-Driven Design** | 1, 4, 5, 8, 10 | Aggregate roots, value objects, domain events |
| **Event-Driven Architecture** | 10 | EventBus pub/sub system |
| **Testing** | 1 | 40 tests across all layers |

---

## Artificial Intelligence

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Rule-Based Expert Systems** | 9 | Forward chaining via `experta` with 12 rules |
| **Search Algorithms** | 9 | BFS and DFS with visited sets and step limits |
| **Constraint Satisfaction** | 9 | Backtracking generation with "Generate → Mask" strategy |
| **Game Tree Search** | 10 | Minimax with alpha-beta pruning |
| **Transposition Tables** | 10 | Memoization cache for state evaluation |
| **Heuristic Evaluation** | 10 | Open-run counting with exponential weights |
| **Depth-Limited Search** | 10 | Adaptive depth based on board size |

---

# Part VI: Project Evolution & Progression

> This section tracks the progression of skills and complexity across the portfolio.

---

### Skill Progression Matrix

| Skill Area | Early Projects (1-2) | Mid Projects (3-5) | Advanced Projects (6-8) | AI & Gaming (9-10) |
|------------|----------------------|---------------------|-------------------------|-------------------|
| **Architecture** | Basic Clean Architecture | Full DDD with RBAC | Production-grade with background services | Layered with specialized AI layers |
| **Database** | Simple CRUD | Complex schemas with FK | ACID transactions, indexes, WAL | Schema versioning, migration |
| **Security** | SHA-256 hashing | PBKDF2 + RBAC | Input sanitization, constant-time comparison | PBKDF2 with 260K iterations |
| **UI** | Basic forms | Multi-page dashboards | Custom-painted charts, animations | Procedural sound synthesis |
| **Domain Complexity** | Single entities | Aggregate roots | State machines, gamification | Constraint satisfaction, game trees |
| **AI/Algorithms** | None | None | Basic calculations | Minimax, BFS/DFS, expert systems |
| **Testing** | Manual | Structured test suites | Comprehensive coverage | Algorithm verification |

### Complexity Growth

```
Project 1  (Budget Manager)     ████████████████████ 2,500 lines
Project 2  (Smart Login)        ████████░░░░░░░░░░░░ 1,200 lines
Project 3  (Student System)     ████████████████████░ 2,900 lines
Project 4  (QuickMart POS)      ████████████░░░░░░░░ 1,800 lines
Project 5  (Mini Banking)       ████████████████████░ 3,000 lines
Project 6  (Task Manager)       ████████████████░░░░ 2,000 lines
Project 7  (Calculator)         ████████████░░░░░░░░ 1,600 lines
Project 8  (Hayah Charity)      ████████████████████ 3,000 lines
Project 9  (Tango AI)           ████████████░░░░░░░░ 1,500 lines
Project 10 (Vexon Game)         ████████████████████████████░░░░ 7,000 lines
```

### Complexity Milestones

| Milestone | Project | Achievement |
|-----------|---------|-------------|
| First CRUD App | 1 | Expense management with validation |
| First RBAC System | 5 | 20 permissions across 6 categories |
| First AI Integration | 9 | Expert system with 12 rules |
| Largest Codebase | 10 | 7,000+ lines in single file |
| Most Complex Domain | 5 | ACID transactions, multi-currency |
| Most Tests | 1 | 40 tests across all layers |
| Highest Security | 8 | PBKDF2 with 260K iterations |

---

# Part VII: Quick Reference

> Quick-access reference for technology stack, running projects, and common commands.

---

### Technology Stack

| Technology | Version | Projects |
|------------|---------|----------|
| Python | 3.8+ (3.10+ preferred) | All 10 |
| PyQt6 | ≥ 6.5.0 | 1, 3, 4, 5, 6, 7, 8, 10 |
| PyQt5 | 5.x | 10 (Phase 1) |
| Tkinter | Standard Library | 2, 10 (Phase 2) |
| SQLite | Built-in | All 10 |
| ReportLab | Latest | 1, 3, 4, 8 |
| PyQt6-Charts | Latest | 3 |
| matplotlib | ≥ 3.7.0 | 8 (optional) |
| experta | Latest | 9 |
| sympy | Optional | 7 |

### Running Any Project

```bash
# Navigate to project directory
cd <project_folder>

# Install dependencies
pip install -r requirements.txt

# Run application
python main.py
```

### Common Commands

```bash
# Run tests (Project 1)
python tests/test_suite.py

# Create ZIP archive (Project 5, 8)
python create_project.py
python build_package.py

# Export history (Project 7, 8)
# Via File → Export History menu
# Or via Settings → Export
```

---

## Appendix: File Structure Templates

> Reusable templates for project setup and database schema design.

---

### Standard Clean Architecture Layout

```
project_name/
├── main.py                          # Entry point + DI wiring
├── requirements.txt                 # Dependencies
├── domain/                          # Pure business logic
│   ├── entities/
│   └── value_objects/
├── application/                     # Use cases and services
├── infrastructure/                  # Database, repositories, external I/O
│   └── repositories/
├── presentation/                    # UI layer
│   ├── views/
│   ├── controllers/
│   └── widgets/
└── utils/                           # Shared utilities
```

### Layered Monolith Layout (Single-File)

```
project_name/
├── main.py                          # Single-file with 21+ sections
├── requirements.txt                 # Dependencies
├── data/                            # Runtime data storage
│   ├── config.json
│   ├── results.json
│   └── replays.json
└── README.md
```

### Database Schema Pattern

```sql
CREATE TABLE entity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    field1 TEXT UNIQUE NOT NULL,
    field2 TEXT NOT NULL,
    field3 REAL NOT NULL DEFAULT 0,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_entity_field ON entity(field1);
```

### AI Algorithm Template

```python
class BaseAIStrategy:
    def get_best_move(self, board, player, cfg) -> int:
        raise NotImplementedError

class EasyAIStrategy(BaseAIStrategy):
    def get_best_move(self, board, player, cfg) -> int:
        # Weighted random approach
        pass

class MediumAIStrategy(BaseAIStrategy):
    def get_best_move(self, board, player, cfg) -> int:
        # Heuristic + noise approach
        pass

class HardAIStrategy(BaseAIStrategy):
    def get_best_move(self, board, player, cfg) -> int:
        # Minimax with alpha-beta pruning
        pass
```

---

## Appendix: Lessons Learned & Technical Reflections

> Key engineering insights derived from building ten production-grade applications.

---

### 1. Architecture Complexity vs. Problem Complexity

The XO Game project demonstrated a critical engineering lesson: **architecture should match problem complexity**. A Tic-Tac-Toe game does not need abstract repositories, use cases, and infrastructure layers. The second iteration found a better balance with modular flat architecture, and the third iteration (Vexon) demonstrated that a well-structured single file can be more maintainable than premature modularization for a self-contained desktop application.

### 2. AI Algorithm Selection

The three-tier AI system demonstrates an understanding that different contexts require different approaches:

| Tier | Approach | Use Case |
|------|----------|----------|
| **Easy AI** | Weighted randomness | Approachable opponent for beginners |
| **Medium AI** | Heuristic + noise | Beatable but challenging opponent |
| **Hard AI** | Minimax with optimizations | Near-perfect opponent for experts |

### 3. Performance Engineering

The depth-limited minimax with transposition tables and move ordering demonstrates practical performance engineering — maintaining responsiveness on boards up to 10×10 while preserving AI quality.

### 4. Cross-Framework Experience

Working across Tkinter, PyQt5, and PyQt6 demonstrates adaptability and understanding of GUI event loops, threading models, and widget lifecycle management across different frameworks.

### 5. Procedural Sound as Zero-Dependency Solution

The ADSR synthesis approach eliminates the need for external audio assets while producing musically appropriate sound effects — a creative engineering solution to the deployment constraint of bundling audio files.

### 6. Constraint Satisfaction vs. Brute Force

The Tango AI system demonstrates that constraint propagation (expert system rules) can dramatically reduce the search space before blind search algorithms are needed, showing practical understanding of when to apply different AI techniques.

### 7. Multi-Currency Financial Precision

The Hayah and Mini Banking projects demonstrate that financial applications require `Decimal` precision (never `float`), explicit rounding strategies (`ROUND_HALF_UP`), and careful handling of currency conversion chains to avoid accumulation of floating-point errors.

### 8. Defensive Programming Over Exception Handling

The Tango system's "zero-crash" policy using `while True` validation loops demonstrates that explicit input validation can be more robust than exception-based approaches for user-facing systems, ensuring the program cannot crash regardless of input.

---

*This portfolio represents the complete technical reference for Abdulrahman's Python project collection. All architectural decisions, algorithms, and implementation details are derived directly from the source codebases. The progression from basic CRUD applications to AI-driven systems demonstrates a comprehensive journey through software engineering fundamentals and advanced computing concepts.*

---

**Document Version:** 3.0  
**Generated:** June 2026  
**Total Projects Documented:** 10  
**Total Lines of Code:** ~27,000+  
**Source Files Synthesized:** 4 (ADVANCED_MASTER_REFERENCE, MASTER_PORTFOLIO, TANGO_GAME_MASTER_REFERENCE, MASTER_REFERENCE_MANUAL)
