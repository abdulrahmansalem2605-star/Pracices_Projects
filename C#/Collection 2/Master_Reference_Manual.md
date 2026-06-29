# Master Reference Manual — Products Management System (IPG202)

**Course:** IPG202 — Object-Oriented Programming  
**Student:** Abdulrahman (ID: 321325)  
**Academic Period:** Fall 2024  
**Document Classification:** Academic Portfolio — Technical Reference  
**Version:** 2.0

---

## Document Purpose

This manual provides a comprehensive technical reference for the Products Management System — a console-based Point of Sale (POS) application demonstrating dual-language implementation competency in C++ and C#. The document covers system architecture, data structures, subsystem design, and comparative implementation analysis.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture & Design](#2-architecture--design)
3. [Data Structures & Storage](#3-data-structures--storage)
4. [Foundation Layer — SystemFundamental](#4-foundation-layer--systemfundamental)
5. [Product Subsystem](#5-product-subsystem)
6. [Employee Subsystem](#6-employee-subsystem)
7. [Admin Subsystem](#7-admin-subsystem)
8. [Navigation & Screen Management](#8-navigation--screen-management)
9. [Input Validation Framework](#9-input-validation-framework)
10. [Dual-Language Implementation Analysis](#10-dual-language-implementation-analysis)
11. [Technical Appendices](#11-technical-appendices)

---

## 1. System Overview

### 1.1 Application Description

The Products Management System is a console-based Point of Sale (POS) application implementing role-based access control with two distinct user roles:

| Role | Access Level | Primary Functions |
|------|--------------|-------------------|
| **Admin (Manager)** | Full system access | Employee management, product management, sales reporting |
| **Seller (Employee)** | Limited operational access | Product purchasing, personal sales records |

### 1.2 Core Capabilities

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

### 1.3 Implementation Scope

The system is implemented in two programming languages to demonstrate cross-language competency:

| Language | Approach | File Structure |
|----------|----------|----------------|
| **C++** | Modular | 5 header files + 1 source file |
| **C#** | Monolithic | Single Program.cs class |

---

## 2. Architecture & Design

### 2.1 C++ Modular Architecture

The C++ implementation employs a namespace-based modular architecture with linear dependency chains:

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

### 2.2 Namespace Hierarchy

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

### 2.3 C# Monolithic Architecture

The C# implementation consolidates all functionality within a single `Program` class:

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

## 3. Data Structures & Storage

### 3.1 Products Storage

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

### 3.2 Employees Storage

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

### 3.3 Sales Operations Storage

**Structure:** Two-dimensional string array `SalesOperations[MAX, 4]`

| Index | Field | Type | Description |
|-------|-------|------|-------------|
| `[i, 0]` | Operation ID | String (numeric) | Auto-assigned sequential ID (1-based) |
| `[i, 1]` | Employee ID | String (numeric) | ID of the seller who performed the sale |
| `[i, 2]` | Product ID | String (numeric) | ID of the product sold |
| `[i, 3]` | Quantity | String (numeric) | Number of units sold |

### 3.4 System Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| `MAX_NumberOfProducts` | 100 | Maximum products in system |
| `MAX_NumberOfEmployees` | 100 | Maximum employees in system |
| `MAX_SalesOperations` | 100 | Maximum sales transaction records |

### 3.5 State Counters

| Variable | Purpose | Initial Value |
|----------|---------|---------------|
| `Current_NumberOfProducts` | Tracks active product count | 0 (incremented after initialization) |
| `Current_NumberOfEmployees` | Tracks active employee count | 0 (incremented after initialization) |
| `Current_SalesOperations` | Tracks total sales records | 0 |
| `CurrentLoggedInSellerID` | Active seller session | -1 (no session) |
| `CurrentLoggedInAdminID` | Active admin session | -1 (no session) |

### 3.6 Default Product Initialization (C# Only)

```
Product 1: Mouse (Quantity: 100)
Product 2: KeyBoard (Quantity: 100)
```

---

## 4. Foundation Layer — SystemFundamental

### 4.1 Purpose

The Foundation Layer provides core I/O utilities, input validation mechanisms, and screen formatting functions used throughout the system.

### 4.2 I/O Utility Functions

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

### 4.3 Input Validation Chain

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

### 4.4 Screen Utilities

| Function | Purpose |
|----------|---------|
| `PressEnterToContinue()` | Halts execution until user presses Enter; provides pause points between screens |
| `system("cls")` / `Console.Clear()` | Clears console for fresh screen display |

### 4.5 Data Initialization

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

## 5. Product Subsystem

### 5.1 Overview

The Product Subsystem manages product inventory with full CRUD (Create, Read, Update, Delete) operations.

### 5.2 Product Search

**`GetProductID_ByProductName(string ProductName)`**
- Performs linear search through `Products` array
- Compares against field index `[i, 1]` (Product Name)
- Returns index if found; `-1` otherwise
- Complexity: O(n) where n = `Current_NumberOfProducts`

### 5.3 Add Product Workflow

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

### 5.4 View Product Workflow

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

### 5.5 Product Information Display

**`ProductInformation(short ProductID)`** — Displays detailed product info in a formatted block with bar separators, used for post-operation confirmation screens.

---

## 6. Employee Subsystem

### 6.1 Overview

The Employee Subsystem handles seller authentication and sales operations, providing the primary interface for daily point-of-sale transactions.

### 6.2 Seller Authentication

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

### 6.3 Buy Product Workflow

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

### 6.4 Sales Record Display

**`ShowPaymentOfSellerEmployee(EmployeeID)`**
- Filters `SalesOperations` array by `employeeID` field
- Displays matching records with operation ID, product ID, and quantity
- Handles empty sales case with red background message

---

## 7. Admin Subsystem

### 7.1 Overview

The Admin Subsystem provides administrative capabilities for managing employees, products, and viewing sales reports.

### 7.2 Admin Authentication

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

### 7.3 Employee Management

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

### 7.4 Product Management

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

### 7.5 Sales Reporting

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

## 8. Navigation & Screen Management

### 8.1 System Menu

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

### 8.2 Admin Menu (10 Options)

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

### 8.3 Employee Menu (4 Options)

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

### 8.4 Menu Routing Logic

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

### 8.5 Navigation Flow Diagram

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

### 8.6 Session Management

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

## 9. Input Validation Framework

### 9.1 Validation Architecture

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

### 9.2 Error Recovery Pattern

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

### 9.3 Visual Feedback System

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

### 9.4 Validation Function Signatures

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

## 10. Dual-Language Implementation Analysis

### 10.1 C++ Implementation (Modular Approach)

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

### 10.2 C# Implementation (Monolithic Approach)

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

### 10.3 Key Behavioral Differences

| Feature | C++ | C# |
|---------|-----|-----|
| **Account switching** | Recursive call to `ImplementSystemChoice()` | Reset session ID + recursive call to menu function |
| **Exit confirmation** | Simple prompt | Full-screen confirmation with state change |
| **Active employee check** | Not implemented | `IsThereAnyActiveEmployee()` check before employee menu |
| **Self-deactivation prevention** | Not implemented | `GetValidEmployeeID_To_Activate_Deactivate()` |
| **Default products** | Not initialized | Mouse (100) and KeyBoard (100) pre-loaded |
| **Employee info display** | Shows all fields | Intentionally hides password for privacy |
| **Capacity validation** | Basic check | Enhanced with visual feedback |

### 10.4 Implementation Trade-offs

| Dimension | C++ (Modular) | C# (Monolithic) |
|-----------|---------------|-----------------|
| **Maintainability** | Higher — separated concerns | Lower — all code in one file |
| **Readability** | Higher — smaller files | Lower — large single file |
| **Data Passing** | Explicit — parameters required | Implicit — static field access |
| **Compilation** | Complex — header dependencies | Simple — single file compilation |
| **Code Reuse** | Higher — namespace separation | Lower — all methods in one class |
| **Debugging** | Easier — isolated modules | Harder — larger context required |

---

## 11. Technical Appendices

### Appendix A: Function Reference Index

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

### Appendix B: Screen Color Reference

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

### Appendix C: Data Flow Diagrams

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

### Appendix D: Glossary

| Term | Definition |
|------|------------|
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
| **Course** | IPG202 — Object-Oriented Programming |
| **Academic Period** | Fall 2024 |
| **Document Type** | Master Reference Manual |
| **Version** | 2.0 |
| **Classification** | Academic Portfolio Documentation |
| **Languages** | C++, C# |
| **Source Files** | 5 C++ headers, 1 C++ source, 1 C# source |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial documentation |
| 2.0 | Current | Comprehensive restructuring and technical refinement |

---

*This manual documents original academic work. All implementations, analyses, and system designs represent the author's own development and understanding of object-oriented programming concepts and console application development.*

**End of Document — Collection 2: Products Management System**
