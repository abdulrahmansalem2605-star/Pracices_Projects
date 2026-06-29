# Python Desktop Applications — Master Portfolio Reference Manual

> **Collection:** Python Projects Collection 1  
> **Projects:** 7 Production-Grade Applications  
> **Primary Stack:** Python 3.10+ · PyQt6 · SQLite  
> **Architecture:** Clean Architecture (Domain-Driven Design)  
> **Total Lines of Code:** ~15,000+

---

## Executive Summary

This portfolio represents a comprehensive collection of seven production-grade desktop applications built with Python, each demonstrating progressive mastery of software architecture principles, database design, and user interface development. The projects span diverse domains — financial management, authentication systems, point-of-sale operations, banking platforms, productivity tools, and scientific computing — unified by a consistent commitment to Clean Architecture, layered separation of concerns, and professional engineering practices.

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

---

## Part I: Architectural Foundation & Common Patterns

### 1. Clean Architecture — Unified Implementation

All seven projects implement a strict layered architecture with unidirectional dependency flow:

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

**Dependency Rules (Universal Across All Projects):**
- **Domain** depends on nothing (pure business logic)
- **Application** depends on Domain only
- **Infrastructure** implements Application interfaces
- **Presentation** depends on Application and Domain, never Infrastructure directly

### 2. Design Patterns Applied Across Projects

| Pattern | Projects Using It | Implementation |
|---------|-------------------|----------------|
| **Repository Pattern** | All 7 | Abstracts persistence behind interfaces; enables future migration |
| **Service Layer** | All 7 | Orchestrates use cases without UI or database imports |
| **Dependency Injection** | All 7 | Constructor-based wiring; no global state or service locators |
| **Aggregate Root** | 1, 4, 5 | Domain objects owning collections (Budget, Invoice, Account) |
| **Value Object** | 1, 2, 3 | Immutable, validated data carriers (FinancialSummary, Credentials) |
| **Observer Pattern** | 1, 2, 3, 5, 6 | Qt signals for cross-component communication |
| **Singleton Pattern** | 5, 6 | Database managers ensuring single connection instance |
| **Factory Method** | 1, 4 | Immutable update patterns and ID generation |
| **Strategy Pattern** | 1, 3 | Theme systems with swappable palettes |
| **Context Manager** | 1, 5 | Atomic database transactions |
| **MVVM** | 2 | ViewModel mediates GUI and business logic |

### 3. Database Design — SQLite Conventions

All projects leverage SQLite with production-grade configurations:

| Configuration | Purpose | Projects |
|---------------|---------|----------|
| **WAL Mode** | Concurrent read performance | 1, 3, 5, 6 |
| **Foreign Keys** | Referential integrity | 1, 3, 4, 5, 6 |
| **Busy Timeout** | Lock contention handling | 5, 6 |
| **Row Factory** | Dict-like row access | 3, 4, 5 |
| **Indexes** | Query optimization | 1, 3, 5, 6 |

**Common Schema Patterns:**
- `users` table with role-based access control
- `id INTEGER PRIMARY KEY AUTOINCREMENT` for entity identity
- `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` for audit trails
- `UNIQUE` constraints for data integrity
- `ON DELETE CASCADE/SET NULL` for relationship management

### 4. Security Implementation

| Security Measure | Projects | Implementation |
|------------------|----------|----------------|
| **Password Hashing** | 2, 3, 5 | SHA-256 / PBKDF2-HMAC-SHA256 with salt |
| **Constant-Time Comparison** | 2, 3, 5 | `hmac.compare_digest()` for timing-attack prevention |
| **Input Sanitization** | 2, 5 | Null byte removal, control character stripping |
| **Role-Based Access Control** | 3, 5 | Database-stored permissions with granular control |
| **Account Locking** | 2 | Configurable maximum login attempts |
| **Generic Error Messages** | 2, 3, 5 | Prevent username enumeration attacks |

### 5. Theme Systems — Consistent Implementation

Every PyQt6 project implements a dual-mode (Dark/Light) theme system:

**Architecture:**
- Palette dataclass with 30+ semantic color tokens
- `build_stylesheet()` function generating complete QSS from palette
- Runtime switching without application restart
- Observer/callback pattern for live widget updates

**Common Token Categories:**
| Category | Tokens |
|----------|--------|
| Backgrounds | `bg_window`, `bg_sidebar`, `bg_card`, `bg_input`, `bg_table_*` |
| Text | `fg_primary`, `fg_secondary`, `fg_muted`, `fg_heading` |
| Accents | `accent`, `accent_light` |
| Semantic | `success`, `danger`, `warning` (with background variants) |
| Borders | `border`, `border_focus` |

---

## Part II: Individual Project References

---

### Project 1: Budget Manager Pro

**Domain:** Personal Financial Management  
**Version:** 3.0.0  
**Framework:** PyQt6 · Python 3.10+  
**Database:** SQLite (WAL Mode)

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

**Testing:** 40 tests across all layers without PyQt6 dependency

---

### Project 2: Smart Login System

**Domain:** Desktop Authentication  
**Version:** 2.4  
**Framework:** Tkinter · Python 3.14  
**Architecture:** Clean Architecture + MVVM

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

**Data Flows:**
- Authentication: User Input → ViewModel → Use Case → Service → Repository
- Theme Switch: Toggle → MainWindow → LoginView → All Widgets (explicit propagation)
- Session Reset: Button → ViewModel → Use Case → Service → Repository

---

### Project 3: Student Academic Management System

**Domain:** University Academic Records  
**Version:** 1.0.0  
**Framework:** PyQt6 · SQLite · ReportLab · PyQt6-Charts  
**Architecture:** Clean Architecture (Onion/Hexagonal)

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

**Grading Scale:**
| Range | Letter | Evaluation | Grade Points |
|-------|--------|------------|--------------|
| 90–100 | A | Excellent | 4.0 |
| 80–89.99 | B | Very Good | 3.0 |
| 70–79.99 | C | Good | 2.0 |
| 0–69.99 | F | Fail | 0.0 |

---

### Project 4: QuickMart POS System

**Domain:** Retail Point-of-Sale  
**Version:** 1.0  
**Framework:** PyQt6 · SQLite · ReportLab  
**Architecture:** Clean Architecture

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

**Financial Model:**
```
subtotal = Σ(item.unit_price × item.quantity)
tax_amount = subtotal × (tax_rate / 100)
discount_amount = subtotal × (discount_rate / 100)
total = subtotal + tax_amount - discount_amount
```

---

### Project 5: Enterprise Mini Banking System

**Domain:** Banking Platform  
**Version:** 1.0.0  
**Framework:** PyQt6 ≥ 6.5.0 · SQLite  
**Architecture:** Clean Architecture (Domain-Driven Design)

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

**Multi-Currency Engine:**
```
Source → USD → Target
balance_usd = balance × EXCHANGE_RATES_TO_USD[source]
converted = balance_usd / EXCHANGE_RATES_TO_USD[target]
```
All values use Python `Decimal` with `ROUND_HALF_UP` quantization.

**ACID Transfer Atomicity:**
1. `BEGIN IMMEDIATE` acquires exclusive write lock
2. Source account balance decremented
3. Destination account balance incremented
4. Two Transaction records created (TRANSFER_OUT + TRANSFER_IN) linked by `reference_id`
5. `COMMIT` persists all changes atomically
6. On any failure: `ROLLBACK` reverts all changes

---

### Project 6: Daily Task Manager

**Domain:** Productivity & Task Management  
**Version:** 1.0  
**Framework:** PyQt6 ≥ 6.6.0 · SQLite  
**Architecture:** Clean Architecture  
**Design Philosophy:** Eisenhower Matrix with Gamification

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

**Level System:**
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

---

### Project 7: Advanced Calculator

**Domain:** Scientific Computing  
**Version:** 1.0  
**Framework:** PyQt6 · Python 3.8+  
**Architecture:** Layered Architecture

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

---

## Part III: Technical Skills Demonstrated

### Programming Paradigms

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Object-Oriented Design** | All 7 | Encapsulation, inheritance, polymorphism throughout |
| **Functional Concepts** | 1, 3, 6 | Pure functions, immutability, higher-order functions |
| **Type Safety** | All 7 | Type annotations, enums, dataclasses with validation |
| **Error Handling** | All 7 | Domain exceptions, controller-level catching, user-friendly messages |

### Database Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Schema Design** | All 7 | Normalized tables, constraints, indexes |
| **Query Optimization** | 1, 3, 5, 6 | Indexes on frequently queried columns |
| **Transaction Management** | 1, 5, 6 | ACID compliance, atomic operations, rollback |
| **Data Integrity** | All 7 | Foreign keys, UNIQUE constraints, CHECK clauses |
| **Connection Management** | 1, 5, 6 | Thread-safe singletons, WAL mode, busy timeout |

### Security Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Password Hashing** | 2, 3, 5 | SHA-256, PBKDF2-HMAC-SHA256 with salt |
| **Timing Attack Prevention** | 2, 3, 5 | `hmac.compare_digest()` |
| **Input Validation** | All 7 | Domain-level validation, sanitization |
| **Access Control** | 3, 5 | Role-based permissions, module-level authorization |
| **Error Masking** | 2, 3, 5 | Generic error messages preventing enumeration |

### UI/UX Engineering

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Responsive Layout** | All 7 | Fixed/minimum sizes, stretch policies |
| **Theme Systems** | 1, 2, 3, 5, 6 | Dark/Light with 30+ tokens, runtime switching |
| **Animation** | 2 | Card shake, button states, focus transitions |
| **Chart Visualization** | 3, 5, 6 | Pie, bar, spline charts |
| **Print Support** | 1, 3, 4 | PDF export, system printing |
| **Accessibility** | All 7 | Keyboard shortcuts, clear typography, logical grouping |

### Software Architecture

| Skill | Projects | Evidence |
|-------|----------|----------|
| **Clean Architecture** | All 7 | 4-layer separation with dependency inversion |
| **Repository Pattern** | All 7 | Abstracted persistence behind interfaces |
| **Service Layer** | All 7 | Stateless orchestration without UI/DB imports |
| **Dependency Injection** | All 7 | Constructor-based wiring; no global state |
| **Domain-Driven Design** | 1, 4, 5 | Aggregate roots, value objects, domain events |
| **Testing** | 1 | 40 tests across all layers |

---

## Part IV: Project Evolution & Progression

### Skill Progression Matrix

| Skill Area | Early Projects (1-2) | Mid Projects (3-5) | Advanced Projects (6-7) |
|------------|----------------------|---------------------|-------------------------|
| **Architecture** | Basic Clean Architecture | Full DDD with RBAC | Production-grade with background services |
| **Database** | Simple CRUD | Complex schemas with FK | ACID transactions, indexes, WAL |
| **Security** | SHA-256 hashing | PBKDF2 + RBAC | Input sanitization, constant-time comparison |
| **UI** | Basic forms | Multi-page dashboards | Custom-painted charts, animations |
| **Domain Complexity** | Single entities | Aggregate roots | State machines, gamification |
| **Testing** | Manual | Structured test suites | Comprehensive coverage |

### Complexity Growth

```
Project 1 (Budget Manager)     ████████████████████ 2,500 lines
Project 2 (Smart Login)        ████████░░░░░░░░░░░░ 1,200 lines
Project 3 (Student System)     ████████████████████░ 2,900 lines
Project 4 (QuickMart POS)      ████████████░░░░░░░░ 1,800 lines
Project 5 (Mini Banking)       ████████████████████░ 3,000 lines
Project 6 (Task Manager)       ████████████████░░░░ 2,000 lines
Project 7 (Calculator)         ████████████░░░░░░░░ 1,600 lines
```

---

## Part V: Quick Reference

### Technology Stack

| Technology | Version | Projects |
|------------|---------|----------|
| Python | 3.8+ (3.10+ preferred) | All 7 |
| PyQt6 | ≥ 6.5.0 | 1, 3, 4, 5, 6, 7 |
| Tkinter | Standard Library | 2 |
| SQLite | Built-in | All 7 |
| ReportLab | Latest | 1, 3, 4 |
| PyQt6-Charts | Latest | 3 |
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

# Create ZIP archive (Project 5)
python create_project.py

# Export history (Project 7)
# Via File → Export History menu
```

---

## Appendix: File Structure Templates

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

---

*This portfolio was generated from the source code and technical documentation of all seven projects in Python Projects Collection 1. All architectural decisions, implementation details, and technical specifications are derived directly from the codebases.*
