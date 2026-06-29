# C# & Programming Fundamentals — Master Reference Manual

> A comprehensive technical reference documenting algorithmic foundations, pseudocode design, and object-oriented system implementation across the IPG101 and IPG202 learning path.

**Author:** Abdulrahman Arfan Salem  
**Institution:** Al-Sham Private University — Faculty of Engineering  
**Courses:** IPG101 (Pseudocode & Algorithmic Thinking) | IPG202 (Object-Oriented Programming)  
**Languages:** Pseudocode, C++, C# | **Period:** Fall 2024  
**Scope:** Algorithm design, flowchart construction, OOP systems, role-based access control, dual-language implementation

---

## Table of Contents

### Part I — Programming Fundamentals (IPG101)

1. [Competency Overview](#1-competency-overview)
2. [Algorithm A: Pythagorean Triples Generator](#2-algorithm-a-pythagorean-triples-generator)
3. [Algorithm B: Server Status Checker](#3-algorithm-b-server-status-checker)
4. [Comparative Analysis — Algorithms](#4-comparative-analysis--algorithms)
5. [Algorithmic Design Methodology](#5-algorithmic-design-methodology)

### Part II — Object-Oriented Programming (IPG202)

6. [System Overview — Products Management](#6-system-overview--products-management)
7. [Architecture & Design](#7-architecture--design)
8. [Data Structures & Storage](#8-data-structures--storage)
9. [Foundation Layer — SystemFundamental](#9-foundation-layer--systemfundamental)
10. [Product Subsystem](#10-product-subsystem)
11. [Employee Subsystem](#11-employee-subsystem)
12. [Admin Subsystem](#12-admin-subsystem)
13. [Navigation & Screen Management](#13-navigation--screen-management)
14. [Input Validation Framework](#14-input-validation-framework)
15. [Dual-Language Implementation Analysis](#15-dual-language-implementation-analysis)

### Part III — Synthesis & Reference

16. [Progression Analysis — IPG101 to IPG202](#16-progression-analysis--ipg101-to-ipg202)
17. [Technical Appendices](#17-technical-appendices)

---

# PART I — Programming Fundamentals (IPG101)

---

## 1. Competency Overview

### 1.1 Skills Demonstrated

| Competency | Application |
|------------|-------------|
| **Problem Decomposition** | Breaking complex problems into discrete, manageable logical steps |
| **Algorithmic Design** | Developing language-agnostic solution specifications |
| **Flowchart Construction** | Creating visual representations of algorithmic logic |
| **Input Validation** | Implementing robust edge-case handling and boundary management |
| **Loop Architecture** | Designing nested and sequential iteration patterns |
| **Conditional Logic** | Constructing multi-level branching decision structures |
| **Mathematical Computation** | Applying mathematical operations within algorithmic constraints |

### 1.2 Learning Outcomes Matrix

| Outcome | Algorithm A | Algorithm B |
|---------|-------------|-------------|
| Loop structures | Nested `FOR` iterations | Sequential linear checks |
| Conditional branching | Multi-level `IF/THEN/ELSE` | Complex conditional hierarchies |
| Data management | Dynamic list accumulation | Static input validation |
| Mathematical operations | Square root, integer verification | Range boundary checking |
| Output generation | Aggregate list production | Status message dispatch |

---

## 2. Algorithm A: Pythagorean Triples Generator

### 2.1 Problem Definition

**Objective:** Generate all Pythagorean triples (a, b, c) satisfying:

- **Mathematical relationship:** a² + b² = c²
- **Domain constraints:** 2 ≤ a ≤ b ≤ c ≤ 1000
- **Type constraints:** All values must be positive integers

### 2.2 Algorithm Specification

```pseudo
BEGIN ALGORITHM: PythagoreanTriplesGenerator

    // Phase 1: Initialization
    SET trianglesList TO empty collection
    
    // Phase 2: Exhaustive Search
    FOR a FROM 2 TO 1000 DO
        FOR b FROM a TO 1000 DO
            // Compute candidate hypotenuse
            SET c TO SQRT(a² + b²)
            
            // Phase 3: Validation
            IF (c IS INTEGER) THEN
                IF (c ≥ 2 AND c ≤ 1000) THEN
                    // Phase 4: Collection
                    ADD (a, b, c) TO trianglesList
                END IF
            END IF
        END FOR
    END FOR
    
    // Phase 5: Output
    RETURN trianglesList

END ALGORITHM
```

### 2.3 Execution Flowchart

```
                    ┌─────────────────┐
                    │      START      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ trianglesList = │
                    │       []        │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  FOR a = 2 TO 1000           │◄─────────────┐
              └──────────────┬───────────────┘              │
                             │                              │
                             ▼                              │
              ┌──────────────────────────────┐              │
              │  FOR b = a TO 1000           │◄───────┐    │
              └──────────────┬───────────────┘        │    │
                             │                        │    │
                             ▼                        │    │
              ┌──────────────────────────────┐        │    │
              │  c = SQRT(a² + b²)          │        │    │
              └──────────────┬───────────────┘        │    │
                             │                        │    │
                             ▼                        │    │
                    ┌────────────────┐               │    │
                    │  c is INTEGER? │──NO────────────┘    │
                    └───────┬────────┘                     │
                            │ YES                          │
                            ▼                              │
                    ┌────────────────┐                     │
                    │ c ≥ 2 AND      │──NO─────────────────┘
                    │ c ≤ 1000?      │
                    └───────┬────────┘
                            │ YES
                            ▼
                    ┌────────────────┐
                    │ ADD (a,b,c)    │
                    │ TO trianglesList│
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │  CONTINUE      │
                    │  INNER LOOP    │──→ (back to FOR b)
                    └────────────────┘
                            
              After all loops complete:
                     │
                     ▼
             ┌──────────────────┐
             │ PRINT            │
             │ trianglesList    │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │      END         │
             └──────────────────┘
```

### 2.4 Complexity Analysis

| Metric | Value | Justification |
|--------|-------|---------------|
| **Time Complexity** | O(n²) | Two nested loops, each iterating up to n = 1000 |
| **Space Complexity** | O(k) | Storage proportional to k valid triples discovered |
| **Worst-Case Iterations** | 1,000,000 | Maximum: 1000 × 1000 loop combinations |
| **Practical Iterations** | ~500,000 | Inner loop starts from `a`, reducing by ~50% |

### 2.5 Design Decisions

| Decision | Technical Rationale |
|----------|---------------------|
| Inner loop `b` initialized from `a` | Eliminates symmetric duplicates (a,b,c) and (b,a,c), reducing computation by approximately 50% |
| Integer validation before range check | Short-circuits evaluation; non-integer hypotenuse values are rejected before expensive range comparison |
| Hypotenuse computed via `SQRT()` | Direct application of Pythagorean theorem; integer verification confirms validity |
| Range constraint [2, 1000] | Ensures non-trivial triples; excludes degenerate cases where a = 1 |

### 2.6 Variables & Data Types

| Variable | Type | Scope | Purpose |
|----------|------|-------|---------|
| `a` | Integer | Loop counter (outer) | First leg of triangle; range [2, 1000] |
| `b` | Integer | Loop counter (inner) | Second leg of triangle; range [a, 1000] |
| `c` | Float → Integer | Computed value | Hypotenuse; validated for integer property |
| `trianglesList` | Collection of Tuples | Output accumulator | Stores validated (a, b, c) triples |

### 2.7 Testing Strategy

| Test Category | Input | Expected Behavior |
|---------------|-------|-------------------|
| **Boundary — Minimum** | a=2, b=2 | c = √8 ≈ 2.83 → Not integer → Rejected |
| **Boundary — Known Triple** | a=3, b=4 | c = √25 = 5 → Accepted: (3, 4, 5) |
| **Boundary — Maximum** | a=1000, b=1000 | c = √2,000,000 ≈ 1414.21 → Exceeds range → Rejected |
| **Symmetry Verification** | (5, 12, 13) | Found once; (12, 5, 13) not generated due to loop initialization |
| **Edge Case — Non-Integer c** | a=2, b=3 | c = √13 ≈ 3.61 → Not integer → Rejected |

---

## 3. Algorithm B: Server Status Checker

### 3.1 Problem Definition

**Objective:** Determine server availability status based on three input parameters:

- **Day of week:** Integer [1-7] (7 represents Friday/holiday)
- **Time slot:** Integer [1-3] (3 represents maintenance window)
- **Service type:** Integer [1-4] (identifies specific service)

### 3.2 Algorithm Specification

```pseudo
BEGIN ALGORITHM: ServerStatusChecker

    // Phase 1: Input Collection
    PROMPT "Enter day (1-7): "
    READ day
    PROMPT "Enter time slot (1-3): "
    READ hour
    PROMPT "Enter service (1-4): "
    READ service
    
    // Phase 2: Input Validation
    IF (day < 1 OR day > 7) OR (hour < 1 OR hour > 3) OR (service < 1 OR service > 4) THEN
        PRINT "Error: The entered data is invalid"
        TERMINATE
    END IF
    
    // Phase 3: Status Determination
    // Priority 1: Holiday check
    IF (day = 7) THEN
        PRINT "Status: Servers Closed for holiday"
        TERMINATE
    END IF
    
    // Priority 2: Maintenance check
    IF (hour = 3) THEN
        PRINT "Status: Servers under maintenance"
        TERMINATE
    END IF
    
    // Phase 4: Service availability
    PRINT "Service Status: Available"
    // Additional day/hour/service-specific logic applied here
    
END ALGORITHM
```

### 3.3 Execution Flowchart

```
                    ┌─────────────────┐
                    │      START      │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  INPUT day (1-7)             │
              │  INPUT hour (1-3)            │
              │  INPUT service (1-4)         │
              └──────────────┬───────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Data Valid?   │──NO──→ PRINT "Invalid data" ──→ END
                    └───────┬────────┘
                            │ YES
                            ▼
                    ┌────────────────┐
                    │  day = 7?      │──YES──→ PRINT "Closed (Holiday)" ──→ END
                    └───────┬────────┘
                            │ NO
                            ▼
                    ┌────────────────┐
                    │  hour = 3?     │──YES──→ PRINT "Under Maintenance" ──→ END
                    └───────┬────────┘
                            │ NO
                            ▼
                    ┌────────────────┐
                    │  Determine     │
                    │  Service Status│
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │  PRINT Status  │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │      END       │
                    └────────────────┘
```

### 3.4 Decision Matrix

| Day | Hour | Service | Status | Reason |
|-----|------|---------|--------|--------|
| 7 | Any | Any | **Closed** | Holiday — all services unavailable |
| Any | 3 | Any | **Maintenance** | Scheduled maintenance window |
| 1-6 | 1-2 | 1-4 | **Available** | Normal operating conditions |

### 3.5 Input Validation Framework

```pseudo
valid_day = (day ≥ 1) AND (day ≤ 7)
valid_hour = (hour ≥ 1) AND (hour ≤ 3)
valid_service = (service ≥ 1) AND (service ≤ 4)

data_is_valid = valid_day AND valid_hour AND valid_service

IF NOT data_is_valid THEN
    DISPLAY error message
    TERMINATE with error code
END IF
```

### 3.6 Variables & Data Types

| Variable | Type | Range | Purpose |
|----------|------|-------|---------|
| `day` | Integer | [1-7] | Day of week identifier |
| `hour` | Integer | [1-3] | Time slot identifier |
| `service` | Integer | [1-4] | Service type identifier |

### 3.7 Testing Strategy

| Test Case | Input | Expected Output | Validation Type |
|-----------|-------|-----------------|-----------------|
| Valid — Normal | day=1, hour=1, service=1 | Service Available | Baseline positive |
| Boundary — Holiday | day=7, hour=1, service=1 | Closed for holiday | Priority check |
| Boundary — Maintenance | day=1, hour=3, service=1 | Under maintenance | Priority check |
| Invalid — Day | day=8, hour=1, service=1 | Invalid data error | Input validation |
| Invalid — Hour | day=1, hour=4, service=1 | Invalid data error | Input validation |
| Invalid — Service | day=1, hour=1, service=5 | Invalid data error | Input validation |
| Combined — Holiday+Maintenance | day=7, hour=3, service=1 | Closed for holiday | Priority ordering |

---

## 4. Comparative Analysis — Algorithms

### 4.1 Algorithmic Approaches

| Dimension | Algorithm A (Pythagorean) | Algorithm B (Server Status) |
|-----------|---------------------------|----------------------------|
| **Primary Structure** | Nested loop iteration | Sequential conditional checks |
| **Computational Profile** | Computation-intensive | Decision-intensive |
| **Data Flow** | Accumulator pattern (builds result set) | Dispatcher pattern (returns single status) |
| **Validation Approach** | Mathematical property verification | Input boundary checking |
| **Output Type** | Collection of results | Single status message |
| **State Management** | Persistent accumulator across iterations | Stateless per invocation |
| **Termination** | Natural loop exhaustion | Early exit on first match |

### 4.2 Structural Patterns

**Algorithm A — Accumulator Pattern:**
- Initializes empty result container
- Iterates through solution space
- Tests each candidate against constraints
- Accumulates valid results
- Returns complete result set

**Algorithm B — Dispatcher Pattern:**
- Collects and validates inputs
- Evaluates conditions in priority order
- Returns immediately on first matching condition
- No result accumulation required

### 4.3 Complexity Comparison

| Metric | Algorithm A | Algorithm B |
|--------|-------------|-------------|
| Time Complexity | O(n²) | O(1) — constant-time decisions |
| Space Complexity | O(k) — result-dependent | O(1) — fixed input size |
| Branching Factor | 2 decision points per iteration | 3 sequential decision points |
| Loop Dependency | High — nested iteration | None — linear execution |

---

## 5. Algorithmic Design Methodology

### 5.1 Problem-Solving Framework

Both algorithms were developed following a systematic four-phase methodology:

```
Phase 1: PROBLEM UNDERSTANDING
    ├── Identify all inputs and outputs
    ├── Define constraints and boundaries
    ├── Document edge cases and exceptions
    └── Establish success criteria
    
Phase 2: ALGORITHM DESIGN
    ├── Decompose into logical steps
    ├── Identify loop structures and conditions
    ├── Map data flow between components
    └── Define termination criteria
    
Phase 3: VISUAL REPRESENTATION
    ├── Construct flowchart diagrams
    ├── Map decision points and branches
    ├── Identify convergence and divergence points
    └── Validate visual logic against specification
    
Phase 4: PSEUDO CODE DEVELOPMENT
    ├── Translate flowcharts to structured text
    ├── Maintain language independence
    ├── Ensure readability and maintainability
    └── Verify against original problem statement
```

### 5.2 Design Quality Indicators

| Indicator | Evidence |
|-----------|----------|
| **Completeness** | All inputs, outputs, and edge cases addressed |
| **Correctness** | Algorithms produce expected results for all test cases |
| **Clarity** | Consistent naming conventions and indentation structure |
| **Efficiency** | Loop optimization (b starting from a) reduces unnecessary computation |
| **Robustness** | Input validation prevents invalid states |
| **Maintainability** | Modular pseudo code structure enables modification |

---

# PART II — Object-Oriented Programming (IPG202)

---

## 6. System Overview — Products Management

### 6.1 Application Description

The Products Management System is a console-based Point of Sale (POS) application implementing role-based access control with two distinct user roles:

| Role | Access Level | Primary Functions |
|------|--------------|-------------------|
| **Admin (Manager)** | Full system access | Employee management, product management, sales reporting |
| **Seller (Employee)** | Limited operational access | Product purchasing, personal sales records |

### 6.2 Core Capabilities

#### Admin Capabilities
- View employee information (all accounts)
- Add new employee accounts
- Activate/deactivate employee accounts
- Add new products to inventory
- Modify product quantities
- View product inventory
- Generate sales reports by product
- Generate sales reports by employee
- Account switching

#### Seller Capabilities
- Execute product sales (purchases)
- View personal sales records
- Account switching

### 6.3 Implementation Scope

| Language | Approach | File Structure |
|----------|----------|----------------|
| **C++** | Modular | 5 header files + 1 source file |
| **C#** | Monolithic | Single Program.cs class |

---

## 7. Architecture & Design

### 7.1 C++ Modular Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FILE STRUCTURE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Source.cpp ──────────────────────────────────┐             │
│      │                                        │             │
│      ▼                                        │             │
│  System_Screens.h                             │             │
│      │                                        │             │
│      ├──→ Admin.h                             │             │
│      │        │                               │             │
│      │        ├──→ Employee.h                 │             │
│      │        │        │                      │             │
│      │        │        ├──→ ProductsSystem.h  │             │
│      │        │        │        │             │             │
│      │        │        │        └──→ SystemFundamental.h    │
│      │        │        │             (Foundation Layer)     │
│      │        │        │                                   │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Namespace Hierarchy

```
MySystemFundamental    (SystemFundamental.h)  — Foundation utilities
    │
    ├──→ MyProductsSystem   (ProductsSystem.h)  — Product CRUD operations
    │         │
    │         └──→ MyEmployees      (Employee.h)      — Seller operations
    │                   │
    │                   └──→ MyAdmins         (Admin.h)         — Admin operations
    │                             │
    │                             └──→ MySystem_Screens (System_Screens.h) — Navigation
    │
    └──→ [Each namespace #include's the previous]
```

### 7.3 C# Monolithic Architecture

```
Program.cs
│
├── Static Fields
│   ├── Products[, ] — Product storage
│   ├── Employees[, ] — Employee storage
│   ├── SalesOperations[, ] — Sales transaction storage
│   ├── Current_NumberOfProducts — State counter
│   ├── Current_NumberOfEmployees — State counter
│   ├── Current_SalesOperations — State counter
│   ├── CurrentLoggedInSellerID — Session state
│   └── CurrentLoggedInAdminID — Session state
│
├── SystemFundamental Region
│   ├── I/O Utilities (ReadString, PrintString, PrintBar, etc.)
│   ├── Input Validation (ReadValidChar, ValidateCharInRange, GetValidChar)
│   └── User Interface (YES_NO, PressEnterToContinue)
│
├── Product System Region
│   ├── GetProductID_ByProductName()
│   ├── GetValidProductName()
│   ├── AddProduct() / AddProducts()
│   ├── ViewProduct() / ViewProducts()
│   └── ShowAddProductsScreen() / ShowViewProductsScreen()
│
├── Employee System Region
│   ├── Authentication (LoginEmployeeScreen)
│   ├── Buy Product (BuyProduct, GetValidProductId, GetValidProductQuantity)
│   └── Sales Records (ShowPaymentOfSellerEmployee)
│
├── Admin System Region
│   ├── Authentication (LoginAdminScreen)
│   ├── Employee Management (AddEmployee, DeactivateEmployee)
│   ├── Product Management (ChangeProductQuantity)
│   └── Sales Reporting (ShowSpecificProductSales, ShowSpecificEmployeesSales)
│
├── Systems Screens Region
│   ├── Admin Menu Navigation (ImplementAdminChoice)
│   ├── Employee Menu Navigation (ImplementEmployeeChoice)
│   └── System Menu Navigation (ImplementSystemChoice)
│
└── Main Method — Entry point
```

---

## 8. Data Structures & Storage

### 8.1 Products Storage

**Structure:** Two-dimensional string array `Products[MAX, 3]`

| Index | Field | Type | Description |
|-------|-------|------|-------------|
| `[i, 0]` | Product ID | String (numeric) | Auto-assigned sequential ID (1-based) |
| `[i, 1]` | Product Name | String | Unique product identifier |
| `[i, 2]` | Product Quantity | String (numeric) | Current stock level |

**Constraints:**
- Maximum capacity: 100 products
- Names must be unique (enforced via `GetProductID_ByProductName`)
- Quantities are stored as strings (parsed to integers for arithmetic)

### 8.2 Employees Storage

**Structure:** Two-dimensional string array `Employees[MAX, 5]`

| Index | Field | Type | Description |
|-------|-------|------|-------------|
| `[i, 0]` | Employee ID | String (numeric) | Auto-assigned sequential ID (1-based) |
| `[i, 1]` | Employee Name | String | Must not contain spaces |
| `[i, 2]` | Password | String | Minimum 7 characters; must start with letter |
| `[i, 3]` | Employee Type | String | `"1"` = Admin/Manager, `"2"` = Seller |
| `[i, 4]` | Status | String | `"0"` = Deactivated, `"1"` = Activated |

**Default Accounts:**

| Name | Password | Type | Status |
|------|----------|------|--------|
| Abdulrahman | IOPFGHJ | Admin (1) | Active (1) |
| Ahmad | QWE6ZXC | Seller (2) | Active (1) |
| Omar | ABCDEFG | Seller (2) | Deactivated (0) |

### 8.3 Sales Operations Storage

**Structure:** Two-dimensional string array `SalesOperations[MAX, 4]`

| Index | Field | Type | Description |
|-------|-------|------|-------------|
| `[i, 0]` | Operation ID | String (numeric) | Auto-assigned sequential ID (1-based) |
| `[i, 1]` | Employee ID | String (numeric) | ID of the seller who performed the sale |
| `[i, 2]` | Product ID | String (numeric) | ID of the product sold |
| `[i, 3]` | Quantity | String (numeric) | Number of units sold |

### 8.4 System Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `MAX_NumberOfProducts` | 100 | Maximum products in system |
| `MAX_NumberOfEmployees` | 100 | Maximum employees in system |
| `MAX_SalesOperations` | 100 | Maximum sales transaction records |

### 8.5 State Counters

| Variable | Purpose | Initial Value |
|----------|---------|---------------|
| `Current_NumberOfProducts` | Tracks active product count | 0 (incremented after initialization) |
| `Current_NumberOfEmployees` | Tracks active employee count | 0 (incremented after initialization) |
| `Current_SalesOperations` | Tracks total sales records | 0 |
| `CurrentLoggedInSellerID` | Active seller session | -1 (no session) |
| `CurrentLoggedInAdminID` | Active admin session | -1 (no session) |

### 8.6 Default Product Initialization (C# Only)

```
Product 1: Mouse (Quantity: 100)
Product 2: KeyBoard (Quantity: 100)
```

---

## 9. Foundation Layer — SystemFundamental

### 9.1 Purpose

The Foundation Layer provides core I/O utilities, input validation mechanisms, and screen formatting functions used throughout the system.

### 9.2 I/O Utility Functions

#### String Input Functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `ReadString` | `string ReadString(string message)` | Reads a line of text from console after displaying prompt |
| `ReadString_WhiteSpaces` | `string ReadString_WhiteSpaces(string message)` | Reads with leading whitespace handling (`cin >> ws`); used for first string in loops |

#### Output Functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `PrintString` | `void PrintString(string variable, string message)` | Outputs variable with optional prefix message |
| `PrintBorder` | `void PrintBorder(ushort length)` | Prints `'='` separator line |
| `PrintBar` | `void PrintBar(ushort length)` | Prints `'-'` separator line |
| `PrintStar` | `void PrintStar(ushort length)` | Prints `'*'` separator line |
| `PrintUnderScore` | `void PrintUnderScore(ushort length)` | Prints `'_'` separator line (C++ only) |

#### Character Input Functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `ReadChar` | `char ReadChar(string message)` | Reads single character (unused in final implementation) |
| `ReadValidChar` | `char ReadValidChar(string message)` | Validates single-character input with retry loop |

### 9.3 Input Validation Chain

```
ReadValidChar(message)
    │
    ▼
ValidateCharInRange(character, From, To)
    │
    ▼
GetValidChar(From, To, message)
    │
    ▼
YES_NO(message)  ──→  Returns bool (true for '1', false for '0')
```

#### Validation Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `ReadValidChar(message)` | Ensures single-character input via retry loop | `char` |
| `ValidateCharInRange(char, From, To)` | Bounds check against inclusive range `[From, To]` | `bool` |
| `GetValidChar(From, To, message)` | Combined read + range validation | `char` |
| `YES_NO(message)` | Boolean prompt accepting only '0' or '1' | `bool` |

### 9.4 Screen Utilities

| Function | Purpose |
|----------|---------|
| `PressEnterToContinue()` | Halts execution until user presses Enter; provides pause points between screens |
| `system("cls")` / `Console.Clear()` | Clears console for fresh screen display |

### 9.5 Data Initialization

**`InitializeFirstAdmin_Seller()`** seeds the system with default accounts:

```
┌─────────────────────────────────────────────────────────┐
│  ACCOUNT          │  PASSWORD  │  TYPE     │  STATUS    │
├─────────────────────────────────────────────────────────┤
│  Abdulrahman      │  IOPFGHJ  │  Admin    │  Active    │
│  Ahmad            │  QWE6ZXC  │  Seller   │  Active    │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Product Subsystem

### 10.1 Overview

The Product Subsystem manages product inventory with full CRUD (Create, Read, Update, Delete) operations.

### 10.2 Product Search

**`GetProductID_ByProductName(string ProductName)`**
- Performs linear search through `Products` array
- Compares against field index `[i, 1]` (Product Name)
- Returns index if found; `-1` otherwise
- Complexity: O(n) where n = `Current_NumberOfProducts`

### 10.3 Add Product Workflow

```
ShowAddProductsScreen()
    │
    ▼
AddProducts()  ← Loop control (do-while with YES_NO prompt)
    │
    ▼
AddProduct()
    ├── GetValidProductName()  ← Uniqueness check via GetProductID()
    │       └── Prompts until unique name or cancel (returns "" on cancel)
    │
    ├── Auto-assign ID (Current_NumberOfProducts + 1)
    │
    ├── Read product quantity
    │
    ├── Store in Products[Current_NumberOfProducts, 0-2]
    │
    ├── Increment Current_NumberOfProducts
    │
    └── Display confirmation (green background, product ID, info)
```

**Key Behaviors:**
- Product names validated for uniqueness via `GetProductID_ByProductName`
- Maximum capacity enforced (100 products); displays red background warning
- Sequential batch addition supported via do-while loop
- Success confirmation with green background and audible beep (`\a`)

### 10.4 View Product Workflow

```
ShowViewProductsScreen()
    │
    ▼
ViewProducts()
    ├── Empty list check
    │       └── HandleNoProductCase()  → Red background, error message
    │
    └── Loop: for each product index
            └── ViewProduct(index)
                    ├── PrintString: Product ID
                    ├── PrintString: Product Name
                    └── PrintString: Product Quantity
```

**Display Format:**
```
========================================
  Product ID      : 1
  Product Name    : Mouse
  Product Quantity: 100
----------------------------------------
  Product ID      : 2
  Product Name    : KeyBoard
  Product Quantity: 100
========================================
```

### 10.5 Product Information Display

**`ProductInformation(short ProductID)`** — Displays detailed product info in a formatted block with bar separators, used for post-operation confirmation screens.

---

## 11. Employee Subsystem

### 11.1 Overview

The Employee Subsystem handles seller authentication and sales operations, providing the primary interface for daily point-of-sale transactions.

### 11.2 Seller Authentication

```
LoginEmployeeScreen()
    │
    ├── GetValidEmployeeName(ref SellerID)
    │       └── ReturnEmployeeID_Using_EmployeeName()  ← Filters by role "2"
    │
    ├── IsEmployeeSeller(SellerID)  ← Checks role "2" AND status "1"
    │       └── Retry loop with YES_NO prompt
    │
    ├── GetValidEmployeePassword(SellerID)
    │       └── Matches against Employees[SellerID, 2]
    │
    └── Returns SellerID on success, -1 on cancel
```

**Validation Chain:**
1. Name lookup filters by role `"2"` (Seller only)
2. Account must be active (`status == "1"`)
3. Password must match stored value
4. Retry or cancel available at each validation failure

**Visual Feedback:**
- Login screen: DarkYellow background with Black foreground
- Invalid account: Red background error message
- Successful login: Returns to caller for menu display

### 11.3 Buy Product Workflow

```
ShowBuyProductsScreen()
    │
    ▼
BuyProducts()  ← Loop control (do-while with YES_NO prompt)
    │
    ├── Empty product list check → HandleNoProductCase()
    │
    ▼
BuyProduct()
    ├── ShowViewProductsScreen()  ← Display available products
    │
    ├── GetValidProductId()
    │       └── IsProduct()  ← Validates ID exists in Products array
    │
    ├── GetValidProductQuantity(ProductID)
    │       └── Validates: 1 ≤ quantity ≤ current stock
    │
    ├── Display before/after quantity comparison
    │
    ├── YES_NO confirmation prompt
    │
    ├── Update Products[productIndex, 2]  ← Decrease stock level
    │
    ├── Record in SalesOperations:
    │       [operationID, sellerID, productID, quantity]
    │
    └── Increment Current_SalesOperations
```

**Transaction Details:**
- Stock decrement: `newQty = currentQty - purchaseQty`
- Sales record created with operation ID, seller ID, product ID, and quantity
- Confirmation display with green background and product information

### 11.4 Sales Record Display

**`ShowPaymentOfSellerEmployee(EmployeeID)`**
- Filters `SalesOperations` array by `employeeID` field
- Displays matching records with operation ID, product ID, and quantity
- Handles empty sales case with red background message

---

## 12. Admin Subsystem

### 12.1 Overview

The Admin Subsystem provides administrative capabilities for managing employees, products, and viewing sales reports.

### 12.2 Admin Authentication

```
LoginAdminScreen()
    │
    ├── GetValidAdminName(ref AdminId)
    │       └── ReturnAdminID()  ← Filters by role "1"
    │
    ├── IsActiveAdmin(AdminId)  ← Checks role "1" AND status "1"
    │       └── Retry loop with YES_NO prompt
    │
    ├── GetValidAdminPassword(AdminId)
    │       └── Matches against Employees[AdminId, 2]
    │
    └── Returns AdminId on success, -1 on cancel
```

### 12.3 Employee Management

#### Add Employee

```
AddEmployee()
    ├── Check MAX capacity (Current_NumberOfEmployees ≥ MAX_NumberOfEmployees)
    │       └── Display error if at capacity
    │
    ├── Auto-assign ID (Current_NumberOfEmployees + 1)
    │
    ├── ReadValidEmployeeName()
    │       └── Rejects names containing spaces (IsStringHaveSpace check)
    │
    ├── ReadValidEmployeePassword()
    │       └── Minimum 7 characters; must start with alphabet character
    │
    ├── Default type: "2" (Seller)
    │
    ├── Default status: "1" (Active)
    │
    ├── Increment Current_NumberOfEmployees
    │
    └── Display confirmation (green background, employee ID, info)
```

**Validation Rules:**
- Employee names must not contain spaces
- Passwords must be ≥ 7 characters
- Passwords must start with an alphabetical character

#### Activate/Deactivate Employee

```
GetValidEmployeeID_To_Activate_Deactivate()
    ├── GetValidEmployeeID()  ← Validates ID exists
    │
    ├── EmployeeInformation()  ← Display employee details
    │
    ├── Safety checks:
    │       ├── Prevent: Cannot change own account status
    │       ├── Prevent: Cannot activate already active employee
    │       └── Prevent: Cannot deactivate already deactivated employee
    │
    └── Returns validated EmployeeId or -1
        │
        ▼
DoYouWant_Deactivate_Activate_Employee(EmployeeId)
    └── Confirmation prompt with employee info display
        │
        ▼
Toggle Employees[employeeIndex, 4]  ← "0" ↔ "1"
```

### 12.4 Product Management

#### Change Product Quantity

```
ChangeProductQuantity()
    ├── ViewProducts()  ← Display current inventory
    │
    ├── GetExistProductID()  ← Validate product exists
    │
    ├── MaxProductQuantitySelled(ProductID)  ← Calculate total sold
    │       └── Iterates SalesOperations, sums quantities for product
    │
    ├── GetValidQuantityProducts(MaxQuantitySelled)
    │       └── New quantity must be > total quantity sold
    │
    ├── Display before/after/max sold comparison
    │
    └── Confirmation prompt before update
```

**Validation Logic:**
- New quantity must exceed total quantity already sold
- Prevents reducing stock below committed sales

### 12.5 Sales Reporting

#### Report by Product

**`ShowSpecificProductSales()`**
- Prompts for valid product ID
- Filters `SalesOperations` by product ID
- Displays operation ID, product ID, and quantity for each matching record

#### Report by Employee

**`ShowSpecificEmployeesSales()`**
- Prompts for valid seller employee ID
- Filters out managers and inactive sellers
- Displays sales records for selected seller

**Employee Filtering Logic:**
```
IF employee is manager (type "1") → REJECT
IF employee is inactive (status "0") → REJECT
IF employee is cancelled (ID = -1) → REJECT
ELSE → Display sales records
```

---

## 13. Navigation & Screen Management

### 13.1 System Menu

```
┌─────────────────────────────────────────────────────────┐
│                   System Menu Screen:                   │
│─────────────────────────────────────────────────────────│
│  [A] Admin Menu                                         │
│  [B] Employee Menu                                      │
│  [C] Exit System                                        │
└─────────────────────────────────────────────────────────┘
```

**Console Colors:** Blue background for menu; DarkBlue background for choice input

### 13.2 Admin Menu (10 Options)

```
┌─────────────────────────────────────────────────────────┐
│               Admin Menu Screen:                        │
│─────────────────────────────────────────────────────────│
│  [a] View Employee Information Menu                     │
│  [b] Add New Employee's Account(s)                      │
│  [c] Activate/Deactivate an Employee's Account(s)       │
│  [d] Add New Product(s)                                 │
│  [e] Change Product(s) Quantity                         │
│  [f] Show Products Quantity                             │
│  [g] Show Sales for Specific Product                    │
│  [h] Show Sales for Specific Employee                   │
│  [i] Switch Account and Log In with Another Account     │
│  [j] Main Menu                                          │
└─────────────────────────────────────────────────────────┘
```

**Console Colors:** Cyan background for admin menu

### 13.3 Employee Menu (4 Options)

```
┌─────────────────────────────────────────────────────────┐
│              Employee Menu Screen:                      │
│─────────────────────────────────────────────────────────│
│  [a] Execute a Sale                                     │
│  [b] View each employee's sales record                  │
│  [c] Switch Account and Log In with Another Account     │
│  [d] Main Menu                                          │
└─────────────────────────────────────────────────────────┘
```

**Console Colors:** DarkCyan background for employee menu; DarkYellow background for login

### 13.4 Menu Routing Logic

```
ImplementSystemChoice()
    │
    ├── InitializeFirstAdmin_Seller()
    │
    └── do-while loop:
            │
            ├── ReadSystemMenuChoice()
            │
            └── switch (choice):
                    │
                    ├── 'A' → ImplementAdminChoice()
                    │           ├── ShowLoginAdminScreen()
                    │           └── switch (a-j) → Screen functions
                    │
                    ├── 'B' → ImplementEmployeeChoice()
                    │           ├── Check IsThereAnyActiveEmployee()
                    │           ├── ShowLoginEmployeeScreen()
                    │           └── switch (a-d) → Screen functions
                    │
                    └── 'C' → ShowExitProgramScreen()
                                └── Return (exit application)
```

### 13.5 Navigation Flow Diagram

```
                         ┌─────────────┐
                         │ System Menu │
                         └──────┬──────┘
                                │
               ┌────────────────┼────────────────┐
               ▼                ▼                ▼
          ┌─────────┐    ┌──────────┐    ┌──────────┐
          │  Admin  │    │ Employee │    │   Exit   │
          │  Login  │    │  Login   │    │          │
          └────┬────┘    └────┬─────┘    └──────────┘
               │               │
               ▼               ▼
       ┌───────────────┐  ┌───────────────┐
       │  Admin Menu   │  │ Employee Menu │
       │  (10 items)   │  │  (4 items)    │
       └───────┬───────┘  └───────┬───────┘
               │                   │
     ┌─────────┴─────────┐        ├──────────────┐
     │   Employee Mgmt   │        │ Execute Sale │
     │   Product Mgmt    │        │ View Records │
     │   Sales Reports   │        │ Switch Accnt │
     │   Switch / Exit   │        │ Main Menu    │
     └───────────────────┘        └──────────────┘
```

### 13.6 Session Management

| State | Variable | Value | Behavior |
|-------|----------|-------|----------|
| No session | `CurrentLoggedInSellerID = -1` | `-1` | Login required |
| Active seller | `CurrentLoggedInSellerID ≥ 0` | Index | Seller operations available |
| No session | `CurrentLoggedInAdminID = -1` | `-1` | Login required |
| Active admin | `CurrentLoggedInAdminID ≥ 0` | Index | Admin operations available |

**Account Switching:**
- Resets current session ID to -1
- Re-initiates login procedure
- Allows seamless transition between accounts

---

## 14. Input Validation Framework

### 14.1 Validation Architecture

The system implements a layered validation approach with consistent error handling patterns.

#### Character Validation Layer

| Function | Purpose |
|----------|---------|
| `ReadValidChar()` | Ensures single-character input via retry loop |
| `ValidateCharInRange()` | Bounds check against inclusive range `[From, To]` |
| `GetValidChar()` | Combined read + range validation |
| `YES_NO()` | Boolean prompt; returns true for '1', false for '0' |

#### Data Validation Rules

| Input | Validation Rule | Error Message |
|-------|-----------------|---------------|
| Product Name | Must be unique (checked via `GetProductID`) | "This Product is already Exist" |
| Employee Name | Must not contain spaces | "Employee Name Musn't Have Space" |
| Employee Password | Minimum 7 characters; must start with alphabet | "Password Mustn't Be shorter than 6 letters" |
| Product Quantity | Must be ≤ current stock | "Invalid Product Quantity, The max Quantity..." |
| New Product Quantity | Must be > total quantity sold | "The product Quantity must be greater than..." |
| Employee ID | Must exist in system | "Invalid Employee Id, Try again please" |
| Product ID | Must exist in system | "The product does not exist" |

### 14.2 Error Recovery Pattern

All validation loops follow a consistent pattern:

```
while (condition is invalid)
    ├── Display error message with star/bar decoration
    │
    ├── Offer retry: YES_NO("Do you want to try again?")
    │       │
    │       ├── Yes → Re-prompt for input
    │       │
    │       └── No → Return "" or -1 (cancel operation)
    │
    └── Repeat until valid input or user cancels
```

### 14.3 Visual Feedback System

| State | Console Appearance | Purpose |
|-------|-------------------|---------|
| **Success** | Green background | Operation completed successfully |
| **Error/Warning** | Red background | Invalid input or error condition |
| **Admin Menu** | Cyan background | Admin context indicator |
| **Admin Login** | Yellow background | Admin login context |
| **Employee Menu** | DarkCyan background | Employee context indicator |
| **Employee Login** | DarkYellow background | Employee login context |
| **System Menu** | Blue background | System-level navigation |
| **System Exit** | DarkGray background | Application exit confirmation |
| **Audio Feedback** | `Console.Beep()` / `\a` | Audible confirmation on success |

### 14.4 Validation Function Signatures

```csharp
// C# Validation Functions
static bool ValidateCharInRange(char character, char From, char To)
static char GetValidChar(char From, char To, string message)
static bool YES_NO(string message)
static string GetValidProductName()
static string ReadValidEmployeeName()
static string ReadValidEmployeePassword()
static string GetValidProductId()
static string GetValidProductQuantity(string ProductID)
static short GetValidEmployeeID()
static short GetExistProductID()
static string GetValidQuantityProducts(uint MaxQuantitySelled)
```

---

## 15. Dual-Language Implementation Analysis

### 15.1 C++ Implementation (Modular Approach)

#### Structural Characteristics

| Aspect | Detail |
|--------|--------|
| **Organization** | 5 header files + 1 source file |
| **Encapsulation** | Namespace-based (`MySystemFundamental`, `MyProductsSystem`, `MyEmployees`, `MyAdmins`, `MySystem_Screens`) |
| **Data Sharing** | `static` variables within namespaces; functions accept array parameters |
| **Dependencies** | Linear include chain via `using namespace` |
| **Screen Clear** | `system("cls")` |
| **String Input** | `getline(cin >> ws, text)` for whitespace handling |
| **Compilation** | Header-only implementation (all functions defined in headers) |

#### Namespace Dependency Chain

```
SystemFundamental.h  (Foundation)
    │
    ▼
ProductsSystem.h  (includes SystemFundamental.h)
    │
    ▼
Employee.h  (includes ProductsSystem.h)
    │
    ▼
Admin.h  (includes Employee.h)
    │
    ▼
System_Screens.h  (includes Admin.h)
    │
    ▼
Source.cpp  (includes System_Screens.h)
```

### 15.2 C# Implementation (Monolithic Approach)

#### Structural Characteristics

| Aspect | Detail |
|--------|--------|
| **Organization** | Single `Program` class, all methods `static` |
| **Encapsulation** | All data as `static` class fields |
| **Data Access** | Direct field access (no parameter passing for shared arrays) |
| **Dependencies** | None (single file) |
| **Screen Clear** | `Console.Clear()` |
| **String Input** | `Console.ReadLine()` with `!` null-forgiving operator |
| **Color Support** | `Console.BackgroundColor`, `Console.ForegroundColor` |
| **Audio Feedback** | `Console.Beep()` via `\a` escape sequence |

### 15.3 Key Behavioral Differences

| Feature | C++ | C# |
|---------|-----|-----|
| **Account switching** | Recursive call to `ImplementSystemChoice()` | Reset session ID + recursive call to menu function |
| **Exit confirmation** | Simple prompt | Full-screen confirmation with state change |
| **Active employee check** | Not implemented | `IsThereAnyActiveEmployee()` check before employee menu |
| **Self-deactivation prevention** | Not implemented | `GetValidEmployeeID_To_Activate_Deactivate()` |
| **Default products** | Not initialized | Mouse (100) and KeyBoard (100) pre-loaded |
| **Employee info display** | Shows all fields | Intentionally hides password for privacy |
| **Capacity validation** | Basic check | Enhanced with visual feedback |

### 15.4 Implementation Trade-offs

| Dimension | C++ (Modular) | C# (Monolithic) |
|-----------|---------------|-----------------|
| **Maintainability** | Higher — separated concerns | Lower — all code in one file |
| **Readability** | Higher — smaller files | Lower — large single file |
| **Data Passing** | Explicit — parameters required | Implicit — static field access |
| **Compilation** | Complex — header dependencies | Simple — single file compilation |
| **Code Reuse** | Higher — namespace separation | Lower — all methods in one class |
| **Debugging** | Easier — isolated modules | Harder — larger context required |

---

# PART III — Synthesis & Reference

---

## 16. Progression Analysis — IPG101 to IPG202

### 16.1 Skill Progression

| Dimension | IPG101 (Fundamentals) | IPG202 (OOP) |
|-----------|----------------------|---------------|
| **Problem Scope** | Single-function algorithms | Multi-component system |
| **Data Management** | Simple variables and lists | Multi-dimensional arrays with state |
| **Control Flow** | Basic loops and conditionals | Nested menus with session management |
| **Input Handling** | Basic validation | Layered validation framework |
| **Output** | Console text | Formatted console with color coding |
| **Architecture** | Linear algorithm | Modular/monolithic system design |
| **Language** | Pseudo code | C++ and C# implementations |
| **Testing** | Manual verification | Structured test cases |

### 16.2 Competency Growth

```
IPG101                              IPG202
─────────────────────────────────────────────────────────────
Problem Decomposition        →      System Architecture Design
Algorithm Design             →      Subsystem Decomposition
Flowchart Construction       →      Data Structure Design
Input Validation             →      Layered Validation Framework
Loop Structures              →      Menu Navigation Systems
Conditional Logic            →      Role-Based Access Control
Mathematical Computation     →      Business Logic Implementation
Single Output                →      Multi-Format Reporting
```

### 16.3 Engineering Maturity Indicators

| Indicator | IPG101 Evidence | IPG202 Evidence |
|-----------|-----------------|-----------------|
| **Design Thinking** | Problem decomposition methodology | System architecture planning |
| **Code Organization** | Structured pseudo code | Namespace/module separation |
| **Error Handling** | Basic input validation | Comprehensive error recovery patterns |
| **User Experience** | Text output | Color-coded visual feedback system |
| **Documentation** | Algorithm specification | Technical reference manual |
| **Testing** | Boundary case analysis | Structured test case matrix |

---

## 17. Technical Appendices

### Appendix A: Flowchart Symbol Reference

| Symbol | Shape | Purpose | Usage Context |
|--------|-------|---------|---------------|
| Terminal | Rounded rectangle | Start/End points | Algorithm entry and exit |
| Process | Rectangle | Computational operations | Assignment, calculation |
| Decision | Diamond | Conditional branching | IF/THEN/ELSE constructs |
| Input/Output | Parallelogram | Data I/O operations | READ/WRITE operations |
| Flow Lines | Arrows | Execution direction | Sequential flow |
| Connector | Small circle | Jump points | Complex flowchart linking |

### Appendix B: Pseudo Code Conventions

| Convention | Format | Example |
|------------|--------|---------|
| Keywords | UPPERCASE | `FOR`, `IF`, `THEN`, `END` |
| Variables | lowercase | `day`, `trianglesList`, `isValid` |
| Indentation | 4 spaces | Nested structures |
| Comments | `//` prefix | Single-line explanations |
| Flowchart nodes | `[Brackets]` | `[Start]`, `[END]` |
| Decision conditions | `{Braces}` | `{Is c integer?}` |

### Appendix C: Mathematical Reference

**Pythagorean Theorem:**
- Formula: a² + b² = c²
- Where: a, b are legs; c is the hypotenuse
- Constraint: c > a and c > b for valid triangles

**Integer Verification:**
- Method: `c IS INTEGER` equivalent to `c mod 1 = 0`
- Implementation: Compare `floor(c)` with `c`; if equal, c is integer

### Appendix D: Function Reference Index — C++ Implementation

#### Foundation Layer Functions

| Function | File | Purpose |
|----------|------|---------|
| `ReadString` | SystemFundamental | Read text from console |
| `ReadString_WhiteSpaces` | SystemFundamental | Read text with whitespace handling |
| `PrintString` | SystemFundamental | Output variable with prefix |
| `PrintBorder` | SystemFundamental | Print '=' separator |
| `PrintBar` | SystemFundamental | Print '-' separator |
| `PrintStar` | SystemFundamental | Print '*' separator |
| `ReadValidChar` | SystemFundamental | Validate single character input |
| `ValidateCharInRange` | SystemFundamental | Check character within range |
| `GetValidChar` | SystemFundamental | Combined read + validation |
| `YES_NO` | SystemFundamental | Boolean prompt |
| `PressEnterToContinue` | SystemFundamental | Pause execution |

#### Product System Functions

| Function | File | Purpose |
|----------|------|---------|
| `GetProductID` | ProductsSystem | Search product by name |
| `GetValidProductName` | ProductsSystem | Validate unique product name |
| `AddProduct` | ProductsSystem | Add single product |
| `AddProducts` | ProductsSystem | Batch add products |
| `ViewProduct` | ProductsSystem | Display single product |
| `ViewProducts` | ProductsSystem | Display all products |
| `ShowAddProductsScreen` | ProductsSystem | Add products screen |
| `ShowViewProductsScreen` | ProductsSystem | View products screen |

#### Employee System Functions

| Function | File | Purpose |
|----------|------|---------|
| `ReturnSellerID` | Employee | Search seller by name |
| `GetValidSellerName` | Employee | Validate seller name |
| `GetValidSellerPassword` | Employee | Validate seller password |
| `IsActiveSeller` | Employee | Check seller status |
| `LoginEmployeeScreen` | Employee | Seller authentication |
| `IsProduct` | Employee | Validate product exists |
| `GetValidProductId` | Employee | Validate product ID |
| `GetValidProductQuantity` | Employee | Validate purchase quantity |
| `BuyProduct` | Employee | Execute single sale |
| `BuyProducts` | Employee | Batch execute sales |
| `ShowPaymentOfSellerEmployee` | Employee | Display seller sales |

#### Admin System Functions

| Function | File | Purpose |
|----------|------|---------|
| `ReturnAdminID` | Admin | Search admin by name |
| `GetValidAdminName` | Admin | Validate admin name |
| `GetValidAdminPassword` | Admin | Validate admin password |
| `IsActiveAdmin` | Admin | Check admin status |
| `LoginAdminScreen` | Admin | Admin authentication |
| `ViewEmployee` | Admin | Display employee info |
| `ViewEmployees` | Admin | Display all employees |
| `ReadValidEmployeeName` | Admin | Validate employee name |
| `ReadValidEmployeePassword` | Admin | Validate employee password |
| `AddEmployee` | Admin | Add new employee |
| `GetValidEmployeeID` | Admin | Validate employee ID |
| `DeactivateEmployee` | Admin | Toggle employee status |
| `ChangeProductQuantity` | Admin | Modify product stock |
| `MaxProductQuantitySelled` | Admin | Calculate total sold |
| `GetSpecificProductSales` | Admin | Filter sales by product |
| `ShowPaymentOfSellerEmployeeScreen` | Admin | Display employee sales |

### Appendix E: Screen Color Reference

| Screen | Background | Foreground | Context |
|--------|------------|------------|---------|
| System Menu | Blue | White | System navigation |
| Admin Menu | Cyan | Black | Admin operations |
| Admin Login | Yellow | Black | Admin authentication |
| Employee Menu | DarkCyan | Black | Employee operations |
| Employee Login | DarkYellow | Black | Employee authentication |
| Success | Green | Black | Operation completed |
| Error | Red | Black | Invalid input/error |
| Exit | DarkGray | White | Application exit |

### Appendix F: Data Flow Diagrams

#### Sales Transaction Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Seller      │    │  Product     │    │  Sales          │
│  Login       │───→│  Selection   │───→│  Recording      │
└─────────────┘    └──────────────┘    └─────────────────┘
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Validate   │    │  Validate    │    │  Update         │
│  Credentials│    │  Quantity    │    │  Stock Level    │
└─────────────┘    └──────────────┘    └─────────────────┘
```

#### Employee Management Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Admin       │    │  Employee    │    │  Account        │
│  Login       │───→│  Selection   │───→│  Modification   │
└─────────────┘    └──────────────┘    └─────────────────┘
       │                  │                     │
       ▼                  ▼                     ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│  Validate   │    │  Safety      │    │  Toggle         │
│  Credentials│    │  Checks      │    │  Status         │
└─────────────┘    └──────────────┘    └─────────────────┘
```

### Appendix G: Glossary

| Term | Definition |
|------|------------|
| **Pythagorean Triple** | Three positive integers (a, b, c) satisfying a² + b² = c² |
| **Hypotenuse** | The longest side of a right triangle, opposite the right angle |
| **Flowchart** | Visual representation of algorithmic logic using standardized symbols |
| **Pseudo Code** | Language-agnostic, human-readable algorithm specification |
| **Input Validation** | Process of checking user input against defined constraints |
| **Edge Case** | Input at the extreme boundary of valid range |
| **POS** | Point of Sale — system for processing sales transactions |
| **CRUD** | Create, Read, Update, Delete — standard data operations |
| **Role-Based Access** | Access control based on user role assignments |
| **Session State** | Persistent variables tracking current user context |
| **Linear Search** | Sequential search through array elements |
| **Namespace** | C++ mechanism for grouping related identifiers |
| **Static Field** | Class-level variable shared across all methods |
| **Do-While Loop** | Post-test loop executing at least once |

---

## Document Metadata

| Property | Value |
|----------|-------|
| **Author** | Abdulrahman (ID: 321325) |
| **Courses** | IPG101 — Pseudo Code & Algorithmic Thinking; IPG202 — Object-Oriented Programming |
| **Academic Period** | Fall 2024 |
| **Document Type** | Unified Master Reference Manual |
| **Version** | 1.0 |
| **Classification** | Academic Portfolio Documentation |
| **Languages** | Pseudo Code, C++, C# |
| **Source Files** | 1 PDF assignment, 5 C++ headers, 1 C++ source, 1 C# source |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Current | Unified consolidation of IPG101 and IPG202 Master Reference Manuals |

---

*This manual documents original academic work. All algorithms, implementations, analyses, and system designs represent the author's own development and understanding of programming fundamentals and object-oriented programming concepts.*

**End of Document — Unified Master Reference Manual**
