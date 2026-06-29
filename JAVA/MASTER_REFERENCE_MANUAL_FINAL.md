# JAVA Learning Path — Master Reference Manual

> **Author:** Abdulrahman  
> **Language:** Java 24  
> **Build Systems:** Apache Maven (8 projects), Apache Ant (1 project)  
> **Scope:** 9 projects | 200+ source files | 25+ design patterns  
> **Version:** 2.0 — Consolidated  
> **Generated:** 2026-06-29

---

## Table of Contents

1. [Learning Path Overview](#1-learning-path-overview)
2. [Technology Stack](#2-technology-stack)
3. [Part I — Foundations: OOP Principles & Language Fundamentals](#part-i--foundations-oop-principles--language-fundamentals)
   - 3.1 [GeneratePassword — Input Validation](#31-generatepassword--input-validation)
   - 3.2 [Al-Amal Library — OOP in Practice](#32-al-amal-library--oop-in-practice)
4. [Part II — Intermediate: Domain Modeling, Immutability & Persistence](#part-ii--intermediate-domain-modeling-immutability--persistence)
   - 4.1 [General Transportation Station — Abstraction & Immutability](#41-general-transportation-station--abstraction--immutability)
   - 4.2 [Employee Date Management — CRUD & Date Algorithms](#42-employee-date-management--crud--date-algorithms)
5. [Part III — Applied: CRUD Systems, Financial Transactions & Business Logic](#part-iii--applied-crud-systems-financial-transactions--business-logic)
   - 5.1 [Bank System — Financial Transactions & Soft-Delete](#51-bank-system--financial-transactions--soft-delete)
   - 5.2 [Library Management System — Facade & Persistence](#52-library-management-system--facade--persistence)
6. [Part IV — Advanced: Design Patterns, Architecture Evolution & Simulation](#part-iv--advanced-design-patterns-architecture-evolution--simulation)
   - 6.1 [The Kingdom of Magical Programming — Architecture Evolution](#61-the-kingdom-of-magical-programming--architecture-evolution)
   - 6.2 [Digital Kingdoms Academy — Design Patterns & Simulation](#62-digital-kingdoms-academy--design-patterns--simulation)
7. [Part V — Enterprise: Security, Encryption & System Architecture](#part-v--enterprise-security-encryption--system-architecture)
   - 7.1 [SmartCity — Enterprise Architecture & Security](#71-smartcity--enterprise-architecture--security)
8. [Part VI — Cross-Cutting References](#part-vi--cross-cutting-references)
   - 8.1 [Design Patterns Catalog](#81-design-patterns-catalog)
   - 8.2 [OOP Principles Matrix](#82-oop-principles-matrix)
   - 8.3 [Persistence Strategies Comparison](#83-persistence-strategies-comparison)
   - 8.4 [Architecture Comparison Matrix](#84-architecture-comparison-matrix)
   - 8.5 [Competency Matrix](#85-competency-matrix)
9. [Part VII — Architecture Evolution & Project Index](#part-vii--architecture-evolution--project-index)
   - 9.1 [Architecture Evolution Summary](#91-architecture-evolution-summary)
   - 9.2 [Cross-Reference Guide](#92-cross-reference-guide)
   - 9.3 [Project Index](#93-project-index)

---

## 1. Learning Path Overview

This manual consolidates nine Java projects into a single reference document, organized by complexity from foundational utilities to enterprise-grade systems. Each project demonstrates progressively advanced software engineering concepts while maintaining consistent adherence to Object-Oriented Programming principles.

### Progression Map

```
GeneratePassword (189 lines)
    └── Input validation, modular predicates
AlAmalLibrary (703 lines)
    └── Abstract classes, inheritance, polymorphism, role-based authorization
GeneralTransportationStation (808 lines)
    └── Abstract hierarchies, immutable records, enum-driven state, composition
Employee Date Management (539 lines)
    └── CRUD operations, date algorithms, layered architecture
Bank System (740 lines)
    └── Financial transactions, soft-delete, rollback, nested inner classes
Library Management System (571 lines)
    └── Facade pattern, interface segregation, custom exceptions, file persistence
Kingdom of Magical Programming (845 lines)
    └── Architecture evolution, composition vs aggregation, serialization, generics
Digital Kingdoms Academy (761 lines)
    └── 12+ design patterns, battle simulation, MVC, strategy, factory
SmartCity (1523 lines)
    └── Enterprise architecture, AES encryption, RBAC, event-driven, 21 packages
```

### Complexity Spectrum

```
Entry-Level                                              Enterprise
    │                                                        │
    ├── GeneratePassword ─── Single class, no persistence    │
    ├── AlAmalLibrary ────── Abstract class, inheritance     │
    ├── GeneralTransportation ─── Immutable records, enums   │
    ├── Employee_Date ─────── CRUD, date algorithms          │
    ├── BankSystem ────────── CRUD, transactions, rollback   │
    ├── Library ───────────── Exceptions, interface seg.     │
    ├── Kingdom ───────────── 3 solutions, generics, lambdas │
    ├── DigitalKingdoms ───── 5 modules, 12+ patterns        │
    └── SmartCity ─────────── 142 files, AES encryption, RBAC│
```

### Key Milestones

| Milestone | Project | What It Demonstrates |
|-----------|---------|---------------------|
| First OOP | AlAmalLibrary | Abstract classes, inheritance, polymorphism |
| First Persistence | Employee_Date | File I/O, serialization, flat-file CRUD |
| First Design Patterns | Kingdom | Manager, Service, Factory, Generic utilities |
| First State Machine | Kingdom (Task) | Enum-based lifecycle management |
| First Encrypted Storage | DigitalKingdoms | Password-protected file archiving |
| First Security Architecture | SmartCity | AES-256-GCM, RBAC, session management |
| First Event-Driven System | SmartCity | Publish/subscribe event bus |
| First System Monitoring | SmartCity | CPU, memory, disk, thread monitoring |

---

## 2. Technology Stack

| Project | Build System | Java | Packages | Source Files | Complexity |
|---------|-------------|------|----------|-------------|-----------|
| GeneratePassword | Maven | 24 | 1 | 1 | ★☆☆☆☆ |
| Al-Amal Library | Maven | 24 | 1 | 8 | ★★☆☆☆ |
| General Transportation Station | Ant/NetBeans | 24 | 1 | 10 | ★★☆☆☆ |
| Library Management System | Maven | 24 | 4 | 8 | ★★★☆☆ |
| Employee Date Management | Maven | 24 | 1 | 8 | ★★★☆☆ |
| Bank System | Maven | 24 | 3 | 9 | ★★★☆☆ |
| Kingdom of Magical Programming | Maven | 24 | 8 | 38 | ★★★★☆ |
| Digital Kingdoms Academy | Maven | 24 | 5 | 40+ | ★★★★☆ |
| SmartCity | Maven | 24 | 21 | 142 | ★★★★★ |

---

# Part I — Foundations: OOP Principles & Language Fundamentals

---

## 3.1 GeneratePassword — Input Validation

> **Package:** `s.generatepassword` | **Lines:** 189 | **Files:** 1

### Purpose

A console-based password validation utility enforcing three rules through modular validation predicates. Demonstrates the principle of separating validation logic from control flow.

### Validation Rules

| Rule | Condition | Method | Threshold |
|------|-----------|--------|-----------|
| R1 | Minimum length | `IsValidPasswordLength()` | ≥ 10 characters |
| R2 | Alphanumeric only | `IsValidPasswordType()` | No special characters |
| R3 | Minimum letter count | `IsValidPasswordLettersCount()` | ≥ 2 letters |

### Architecture

```
GeneratePassword (class)
├── Input Layer: readString()
├── Presentation Layer: printBorder(), printTextInBorder()
├── Validation Layer: IsValidPasswordLength(), IsValidPasswordType(), IsValidPasswordLettersCount()
└── Orchestration: ReadValidPassword() → main()
```

### Control Flow

The validation loop uses short-circuit `||` evaluation — all three conditions must pass simultaneously. On failure, error details are displayed within formatted borders. The program loops until a valid password is supplied.

### Key Design Decisions

- **Modular predicates:** Each rule isolated in its own method for independent testing
- **Shared Scanner:** Static instance avoids repeated `System.in` wrapping
- **`short` counter:** Memory-conscious choice for bounded letter counting
- **De Morgan's awareness:** Code includes boolean algebra equivalence comment

### OOP Concepts Demonstrated

| Concept | Implementation |
|---------|---------------|
| Encapsulation | Private fields, public methods |
| Input Validation | Loop until valid input received |
| Method Decomposition | Each rule in its own method |

---

## 3.2 Al-Amal Library — OOP in Practice

> **Package:** `com.mycompany.alamallibrary` | **Lines:** 703 | **Files:** 8

### Purpose

Object-oriented library management demonstrating the four pillars of OOP through book categorization, staff-based authorization, and reader profile management.

### Class Hierarchy

```
Book (abstract)
├── DevelopmentBook  [Development - Inspiration]
├── HistoryBook      [History - Memory of Nations]
├── ScienceBook      [Science - Secrets of Universe]
└── LiteratureBook   [Literature - Stories & Tales]

Reader (concrete)
└── List<Book> borrowedBooks

Staff (concrete)
└── String childName, String responsibility
```

### Core Components

#### Abstract Base: Book

```java
public abstract class Book {
    private String title;
    private String author;
    private boolean isAvailable;

    public abstract void displayInfo();        // Subclass-specific
    protected void displayBasicInfo() { ... }  // Shared template
}
```

#### Concrete Subclasses

| Class | Category Tag | Override Behavior |
|-------|-------------|-------------------|
| `DevelopmentBook` | `[Development - Inspiration]` | Prepends category tag |
| `HistoryBook` | `[History - Memory of Nations]` | Prepends category tag |
| `ScienceBook` | `[Science - Secrets of Universe]` | Prepends category tag |
| `LiteratureBook` | `[Literature - Stories & Tales]` | Prepends category tag |

#### Staff — Role-Based Authorization

Authorization enforced via class name prefix matching:

```java
if (!book.getClass().getSimpleName().startsWith(responsibility)) {
    // Access Denied
}
```

- Staff "Omar" with responsibility "Literature" → only processes `LiteratureBook`
- Staff "Sara" with responsibility "Science" → only processes `ScienceBook`

#### Reader — Borrowing History

```java
private List<Book> borrowedBooks;  // Composition: Reader has-a Books
public void addToHistory(Book book) { borrowedBooks.add(book); }
public void removeFromHistory(Book book) { borrowedBooks.remove(book); }
```

### OOP Principles Demonstrated

| Principle | Evidence |
|-----------|----------|
| Abstraction | `Book` is abstract; cannot be instantiated directly |
| Inheritance | 4 concrete classes extend `Book` |
| Polymorphism | `displayInfo()` dispatched at runtime by actual type |
| Encapsulation | Private fields with public getters/setters |
| Composition | `Reader` contains `List<Book>` |

### Design Patterns

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| Template Method | `Book.displayInfo()` | Define algorithm skeleton with subclass customization |
| Factory Method | Book instantiation | Create objects without specifying exact class |
| Encapsulation | Private fields | Protect internal state |

### Data Structures

| Component | Structure | Justification |
|-----------|-----------|---------------|
| Book metadata | String fields | Fixed-size text data |
| Book availability | boolean flag | Binary state |
| Reader history | ArrayList\<Book\> | Dynamic, ordered collection |

---

# Part II — Intermediate: Domain Modeling, Immutability & Persistence

---

## 4.1 General Transportation Station — Abstraction & Immutability

> **Package:** `generaltransportationstation` | **Lines:** 808 | **Files:** 10 | **Build:** Ant

### Purpose

Console-based public transportation management demonstrating abstract hierarchies, immutable record patterns, enum-driven state management, and composition.

### Core Capabilities

| Feature | Description |
|---------|-------------|
| Driver Management | Abstract driver hierarchy with polymorphic behavior |
| Bus Operations | Dynamic operation mode switching based on road conditions |
| Fleet Organization | Geographic grouping of buses into named fleets |
| Route Control | Centralized control room for mode assignment and fleet transfers |
| Supervision | Real-time fleet monitoring and status reporting |
| Immutable Logging | Tamper-proof bus maintenance records since creation |

### Class Hierarchy & Relationships

```
                     ┌──────────────┐
                     │    Driver     │  (abstract)
                     │  - id: int    │
                     │  - name: Str  │
                     │  + drive()*   │  (abstract)
                     └──────┬───────┘
                            │
               ┌────────────┴────────────┐
               │                         │
    ┌──────────────────┐      ┌─────────────────────┐
    │  RegularDriver    │      │  ProfessionalDriver   │
    │  + drive()        │      │  + drive()            │
    │                   │      │  + handleDifficult..()│
    └──────────────────┘      └─────────────────────┘

    ┌──────────────┐      ┌──────────────┐
    │  OperationMode │◄────│     Bus       │
    │  (enum)        │     │  - log: BusLog│
    └──────────────┘      │  - mode       │
                          │  - driver     │
    ┌──────────────┐      │  + operate()  │
    │   BusLog      │─────►│  + setMode()  │
    │  (final)      │      └───────┬───────┘
    └──────────────┘              │
                           (contained in)
                          ┌───────┴───────┐
                          │    Fleet       │
                          │  - buses: []  │
                          └───────┬───────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
             ┌──────────────┐        ┌──────────────┐
             │  ControlRoom  │        │  Supervisor   │
             │  + setMode()  │        │  + monitor()  │
             │  + transfer() │        └──────────────┘
             └──────────────┘
```

### Relationship Types

| From | To | Type | Mechanism |
|------|-----|------|-----------|
| Driver → RegularDriver/ProfessionalDriver | Inheritance | Abstract class extension |
| Bus → Driver | Association | Reference to current driver |
| Bus → BusLog | Composition | Immutable ownership |
| Bus → OperationMode | Association | Enum state reference |
| Fleet → Bus | Aggregation | Dynamic collection |
| ControlRoom → Bus/Fleet | Dependency | Operates without owning |

### Immutable Record: BusLog

The system's primary immutability example:

```java
public final class BusLog {
    private final int busNumber;
    private final String maintenanceDate;
    private final List<String> driversFromCreation;

    public BusLog(int busNumber, String maintenanceDate, List<String> drivers) {
        this.busNumber = busNumber;
        this.maintenanceDate = maintenanceDate;
        this.driversFromCreation = Collections.unmodifiableList(new ArrayList<>(drivers));
    }
}
```

| Mechanism | Purpose |
|-----------|---------|
| `final class` | Prevents subclassing that could break immutability |
| `final` fields | Prevents reassignment after construction |
| `Collections.unmodifiableList()` | Runtime mutation enforcement |
| Defensive copy | `new ArrayList<>(drivers)` isolates internal state |
| Getter-only | No setters exposed |

### OperationMode Enumeration

| Constant | Arabic Name | When Activated |
|----------|------------|----------------|
| `CONGESTION_RELIEF` | تخفيف الازدحام | Heavy traffic |
| `MEDIUM_SPEED` | السرعة المتوسطة | Normal conditions (default) |
| `QUIET_OPERATION` | التشغيل الهادئ | Nighttime operation |

### ControlRoom — Decision Logic

Priority-based mode selection:

```
isNight == true? → QUIET_OPERATION (highest priority)
isCongested == true? → CONGESTION_RELIEF
otherwise → MEDIUM_SPEED (default)
```

Atomic bus transfer:

```java
if (from.removeBus(bus)) {
    to.addBus(bus);
}
```

### OOP Principles Demonstrated

| Principle | Implementation |
|-----------|---------------|
| Abstraction | `Driver` declared `abstract`; `drive()` has no body |
| Inheritance | `RegularDriver`, `ProfessionalDriver` extend `Driver` |
| Polymorphism | `bus.operate()` dispatches to correct `drive()` at runtime |
| Encapsulation | Private fields, public getters, no setters on immutable classes |
| Immutability | `BusLog`: `final` class + fields + `unmodifiableList` |
| Composition | `Bus` has-a `BusLog`, `Driver`, `OperationMode` |
| Aggregation | `Fleet` contains `List<Bus>` (transferable) |

---

## 4.2 Employee Date Management — CRUD & Date Algorithms

> **Package:** `com.mycompany.employee_date` | **Lines:** 539 | **Files:** 8

### Purpose

Console-based employee record management with full CRUD operations, automatic date validation, Zeller's Congruence day-of-week calculation, and persistent file storage.

### Architecture

```
┌─────────────────────────────────────┐
│          Presentation Layer         │
│   EmployeeSystemScreen              │
├─────────────────────────────────────┤
│          Business Logic Layer       │
│   EmployeeManager                   │
│   (Read, Display, Search,           │
│    Delete, Update)                  │
├─────────────────────────────────────┤
│          Domain Model Layer         │
│   clsEmployee, clsDate              │
├─────────────────────────────────────┤
│          Persistence Layer          │
│   EmployeeFileManager               │
├─────────────────────────────────────┤
│          Utility Layer              │
│   InputHelper, OutputHelper         │
└─────────────────────────────────────┘
```

### Data Model

| Field | Type | Format | Constraints |
|-------|------|--------|-------------|
| ID | `int` | Integer | Auto-generated, sequential, unique |
| Name | `String` | Free text | Supports spaces |
| Salary | `double` | Decimal | ≥ 0 |
| Birth Date | `String` | `D/M/YYYY` | Validated against month/year |
| Hire Date | `String` | `D/M/YYYY` | Auto-set to system date |

**File Format:** `ID#//#Name#//#Salary#//#BirthDate#//#HireDate`

### Algorithm Reference

#### Zeller's Congruence (Day of Week)

```
h = (q + (13*(m+1))/5 + K + K/4 + J/4 + 5*J) mod 7

q = day of month
m = adjusted month (March=3 through February=14)
K = year of century (year % 100)
J = zero-based century (year / 100)
h = result (0=Saturday, 1=Sunday, ..., 6=Friday)
```

#### Leap Year Detection

```
year % 400 == 0 → Leap Year
year % 100 == 0 → Not Leap Year
year % 4 == 0   → Leap Year
otherwise        → Not Leap Year
```

#### Auto-ID Generation

```
maxID = 0
for each employee in file:
    if employee.ID > maxID:
        maxID = employee.ID
return maxID + 1
```

### CRUD Operations

| Operation | Flow |
|-----------|------|
| **Create** | Generate next ID → read name/salary → auto-set hire date → validate birth date → confirm → append to file |
| **Read** | Refresh from file → render table with printf padding → footer with count |
| **Update** | Display card → confirm → select field → enter new value → compare → save or rollback |
| **Delete** | Display card → confirm → remove from vector → overwrite file |
| **Search** | Linear search through vector → display card or "Not Found" |

### Inner Class Modules

```java
EmployeeManager
├── Read        — New employee creation
├── Display     — Table rendering
├── Search      — ID-based lookup
├── Delete      — Removal with confirmation
└── Update      — Field modification with rollback
```

---

# Part III — Applied: CRUD Systems, Financial Transactions & Business Logic

---

## 5.1 Bank System — Financial Transactions & Soft-Delete

> **Packages:** `s.banksystem`, `s.banksystem.HelperClasses`, `BankSystemClients` | **Lines:** 740 | **Files:** 9

### Purpose

Console-based banking system managing client accounts with full CRUD operations, financial transaction capabilities (deposit/withdraw), and flat-file persistence.

### Architecture

```
BankSystem/
├── s/banksystem/
│   ├── BankSystem.java                    # Entry point
│   ├── BankSystemScreen.java              # Main & Transactions menu controller
│   ├── BankTransactionsSystem.java        # Deposit, Withdraw, TotalBalances
│   └── HelperClasses/
│       ├── InputHelper.java               # Validated console input
│       ├── OutputHelper.java              # Console formatting
│       └── FileUtils.java                 # Generic file I/O
└── BankSystemClients/
    ├── Client.java                        # Domain entity
    ├── ClientsManager.java                # CRUD operations
    └── ClientFileManager.java             # File serialization
```

### Data Model

```java
public class Client {
    private String _Name = "";
    private String _PhoneNumber = "";
    private String _AccountNumber = "";
    private String _PinCode = "";
    private double _AccountBalance = 0.0;
    private boolean _DeletedClientMark = false;  // Soft-delete flag
}
```

**File Format:** `Name#//#PhoneNumber#//#AccountNumber#//#PinCode#//#AccountBalance`

### Soft-Delete Pattern

Rather than removing entries from the `Vector`, clients are flagged as deleted and excluded during file writes:

```java
clientToDelete.setDeletedClientMark(true);
// During file write:
if (!client.isDeletedClientMark()) {
    writer.write(convertRecordToLine(client, separator));
}
```

### Financial Transactions

| Operation | Validation | Rollback Support |
|-----------|-----------|-----------------|
| Deposit | Amount ≥ 1, client exists | Yes — restores original balance |
| Withdraw | Amount ∈ [1, balance], balance > 0 | Yes — restores original balance |
| Total Balances | None | N/A — read-only |

#### Deposit Workflow

```
Show client list → Locate account → Display card → Confirm → Enter amount
→ Show before/after → Confirm → Update balance → Persist → Rollback on cancel
```

#### Withdrawal Workflow

```
Show client list → Locate account → Validate non-zero balance → Display card
→ Confirm → Enter amount (validated: 1 to currentBalance)
→ Show before/after → Confirm → Update balance → Persist → Rollback on cancel
```

**Balance Constraint:** Withdrawal amount negated before addition:

```java
withdrawValue = -InputHelper.getValidNumber(1, balance, ...);
client.setAccountBalance(client.getAccountBalance() + withdrawValue);
```

### Rollback Mechanism

Both deposit and withdrawal save original state before modification:

```java
Client oldClientData = new Client(
    client.getName(), client.getPhoneNumber(),
    client.getAccountNumber(), client.getPinCode(),
    client.getAccountBalance()
);
// On cancel:
client.setAccountBalance(oldClientData.getAccountBalance());
```

### Menu Architecture

```
Main Menu
├── [1] Show Client List       → Display.printClients()
├── [2] Add New Client         → Read.readVectorOfClients()
├── [3] Delete Client          → Delete.deleteClientsByAccountNumber()
├── [4] Update Client          → Update.updateClientsByAccountNumber()
├── [5] Find Client            → Search.searchForClientsByAccountNumber()
├── [6] Transactions
│   ├── [1] Deposit            → Deposit.depositToClients()
│   ├── [2] Withdraw           → Withdraw.withdrawClients()
│   ├── [3] Total Balance      → TotalBalances.clientTotalBalances()
│   └── [4] Main Menu
└── [7] Exit                   → Confirmation → Terminate
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| `Vector` over `ArrayList` | Thread-safety via synchronized methods |
| `#//#` delimiter | Avoids conflicts with name/phone/account data |
| Soft-delete | Avoids index corruption; clean file state after deletion |
| Nested inner classes | Namespace isolation with access to parent constants |
| Confirmation workflows | Every destructive/financial operation requires explicit user approval |

---

## 5.2 Library Management System — Facade & Persistence

> **Packages:** `s.finalecode`, `model`, `persistence`, `LibraryExceptions` | **Lines:** 571 | **Files:** 10

### Purpose

Console-based library management with book cataloging, member registration, borrow/return transactions, and persistent flat-file storage.

### Architecture

```
┌─────────────────────────────────────────────┐
│            Presentation Layer                │
│            (FinaleCode.java)                 │
├─────────────────────────────────────────────┤
│             Business Logic Layer             │
│             (Library.java)                   │
│    Orchestration · Validation · State        │
├─────────────────────────────────────────────┤
│              Model Layer                     │
│     (Book.java · Member.java · enAction)     │
│          Domain Entities + Enums             │
├─────────────────────────────────────────────┤
│            Persistence Layer                 │
│    (DataStorage · FileStorage)               │
│        File I/O · Serialization              │
└─────────────────────────────────────────────┘
         Custom Exceptions (LibraryExceptions)
```

### Design Patterns

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| Facade | `Library` class | Simplified interface over complex operations |
| Interface Segregation | `DataStorage` interface | Decouples persistence contract from implementation |
| Custom Exception Hierarchy | 5 domain-specific exceptions | Structured error handling |

### Borrow Transaction Flow

```
Input → Validate book exists → Check availability → Validate member → Check limit (≤3)
    → Mark book borrowed → Link to member → Increment counter → Log transaction → Persist
```

### Custom Exceptions

| Exception | Trigger | Message |
|-----------|---------|---------|
| `BookNotFoundException` | Book ID not in library | `"Book with ID <id> Doesn't exist."` |
| `BookAlreadyBorrowedException` | Borrowing borrowed book | `"Book '<title>' is already borrowed"` |
| `MemberNotFoundException` | Member ID not registered | `"Member with id <id> not registered"` |
| `MaxBooksLimitException` | 3 concurrent borrows | `"Member Reached max book borrows (3 Books)"` |
| `FilePersistenceException` | File I/O failure | Caller-provided message |

### File Formats

| File | Format | Example |
|------|--------|---------|
| `books.txt` | `<id>\|<title>\|<author>\|<isBorrowed>\|<borrowedBy>` | `1\|C++\|Abo-Hadhaud\|false\|null` |
| `members.txt` | `<memberId>\|<name>\|<borrowedBooksCount>` | `1\|Abdulrahman\|0` |
| `transactions.txt` | `<timestamp>\|<memberId>\|<bookId>\|<action>` | `Mon Jun 29 12:00:00 UTC 2026\|1\|1\|BorrowBook` |

---

# Part IV — Advanced: Design Patterns, Architecture Evolution & Simulation

---

## 6.1 The Kingdom of Magical Programming — Architecture Evolution

> **Lines:** 845 | **Solutions:** 3 implementations | **Build:** Maven / Ant

### Purpose

A medieval kingdom domain model demonstrating mastery of Object-Oriented Programming principles through three implementations of progressive architectural sophistication.

### Architecture Evolution

| Solution | Package Structure | Key Feature | Lines |
|----------|-------------------|-------------|-------|
| **Simple Solve** | Single package | Inner classes, basic OOP | ~256 |
| **Reference Solution** | Single package | Composition vs aggregation | ~204 |
| **Extended Solve** | Multi-package (8) | File I/O, console UI, service layer, generics | ~845 |

### Domain Model

```
Person (abstract)
├── King (has-a Council)
│   └── Council (has-many Advisor)
├── Knight (implements Fightable, has-a King reference)
└── Wizard (implements Fightable)

Infrastructure: Castle (composition: Gate, Tower), Treasury
Logic: Task (state machine), Event, Achievement
Records: RecordManager, Transaction
UI: ConsoleUI (menu-driven)
```

### OOP Concepts Demonstrated

#### Abstraction

```java
public abstract class Person {
    protected String name;
    protected int age;
    public abstract void speak();
}
```

#### Composition vs. Aggregation

**Composition** — `Castle` owns `Gate`/`Tower` internally:

```java
public class Castle {
    private Gate gate;
    private Tower tower;
    public Castle() {
        this.gate = new Gate();
        this.tower = new Tower();
    }
}
```

**Aggregation** — `Council` holds externally created `Advisor` objects:

```java
public class Council {
    private Advisor[] advisors;
    public Council(Advisor[] advisors) {
        this.advisors = advisors;
    }
}
```

#### Interfaces

```java
public interface Fightable {
    void attack();
}
```

`Knight` and `Wizard` implement `Fightable`; `King` does not — modeling that kings command rather than fight directly.

### Extended Solution — Package Structure

```
Kingdom/
├── characters/      — Person, King, Knight, Wizard, Advisor
├── council/         — Council, CouncilService
├── infrastructure/  — Castle, Gate, Tower, Treasury
├── interfaces/      — Fightable
├── logic/           — Task, Event, Achievement
├── manager/         — KingdomManager
├── records/         — RecordManager, Transaction
└── ui/              — ConsoleUI
```

### Design Patterns

#### Manager Pattern — KingdomManager

Central orchestration class managing all kingdom entities:

```java
public class KingdomManager {
    private List<King> kings;
    private List<Knight> knights;
    private List<Wizard> wizards;
    private List<Advisor> advisors;
    private List<Task> tasks;
    private List<Event> events;
    private Treasury treasury;
    private CouncilService councilService;
}
```

#### Generic Uniqueness Checker

```java
private <T> boolean isUnique(List<T> list, T candidate, Function<T, String> keyExtractor) {
    String candidateKey = keyExtractor.apply(candidate);
    return list.stream()
            .map(keyExtractor)
            .noneMatch(existingKey -> existingKey.equalsIgnoreCase(candidateKey));
}
```

Demonstrates generics, functional interfaces, Stream API, and method references.

#### Serialization Pattern

Every domain entity implements:

```java
public String toRecord() { ... }                   // Object → String
public static T fromRecord(String line) { ... }     // String → Object
```

### Task State Machine

```java
public class Task {
    public enum TaskStatus {
        PENDING, IN_PROGRESS, COMPLETED, FAILED
    }
    public void start()   { status = TaskStatus.IN_PROGRESS; }
    public void complete() { status = TaskStatus.COMPLETED; }
    public void fail()    { status = TaskStatus.FAILED; }
}
```

### File Inventory

| Solution | Files | Key Lines |
|----------|-------|-----------|
| Simple Solve | 10 | 276 total |
| Reference Solution | 9 | 206 total |
| Extended Solve | 19 | 1,019 total |

---

## 6.2 Digital Kingdoms Academy — Design Patterns & Simulation

> **Lines:** 761 | **Files:** 5 packages, 40+ classes | **Build:** Maven

### Purpose

Java OOP Final Project — hero management ecosystem with battle simulation, demonstrating 12+ design patterns, MVC architecture, and strategy-based game mechanics.

### System Architecture

```
DigitalKingdomsAcademy/
├── HeroCreationSystem/          # Core domain: entities, effects, creation, serialization
├── HeroManagementSystem/        # Application layer: CRUD, actions, queries, MVC
├── SimulationArena/             # Simulation engine: battle, turns, effects, victory
├── BackupAndRetrievalSystem/    # Persistence: password-protected file archiving
└── UI/                          # User interface: CLI menu system
```

**Dependency flow:**

```
UI → BackupAndRetrievalSystem
UI → HeroManagementSystem → HeroCreationSystem
SimulationArena → HeroCreationSystem
BackupAndRetrievalSystem → HeroCreationSystem
```

### Entity Hierarchy

`Entity` is the abstract base class implementing `Fightable`:

| Class | Type | Attack Modifier | Special Ability |
|-------|------|----------------|-----------------|
| `Warrior` | `WARRIOR` | 1.0x base power | +5 bonus damage, "Mighty Blow" |
| `Wizard` | `WIZARD` | 1.0x base power | 1.3x multiplier, costs 5 energy |
| `Archer` | `ARCHER` | 0.9x base power | 0.6x multiplier, "Evasive Shot" |

**Immutable identity:** `id`, `name`, `age` are `final` fields.  
**Mutable state:** `stats` and `state` are replaceable via copy methods.  
**Age modifier:** 10% bonus < 25, 10% penalty > 50.  
**Trait-based immunity:** `"ImmuneTo"` prefix checks prevent effect application.

### Immutable Value Objects

#### HeroStats

```java
public HeroStats withEnergy(int newEnergy) {
    return new HeroStats(this.power, newEnergy);
}
```

All state changes produce new instances — preventing accidental side effects.

#### HeroState

| Method | Purpose |
|--------|---------|
| `withEffect(effect)` | Adds effect, returns new state |
| `withoutEffect(name)` | Removes named effect, returns new state |
| `markDead()` | Sets alive to false, returns new state |

Uses `List.copyOf` and `Collections.unmodifiableList` for internal list protection.

### Status Effect System (Strategy + Factory)

#### StatusEffect Interface

```java
public interface StatusEffect {
    String getName();
    void apply(Entity target);
    void tick();
    boolean isExpired();
    StatusEffect withDuration(int turns);
    int getCost();
}
```

#### Concrete Effects

| Effect | Default Duration | Per-Tick Damage | Behavior |
|--------|-----------------|-----------------|----------|
| `PoisonedEffect` | 3 turns | 5 energy | Continuous energy drain |
| `BurnedEffect` | 3 turns | 3 energy | Moderate energy drain |
| `StunnedEffect` | 1 turn | 0 | Disables action entirely |
| `CleanseEffect` | Instant | 0 | Removes a target effect |

#### EffectFactory

```java
public static StatusEffect create(String effectName)
public static StatusEffect createWithDuration(String name, int duration)
public static StatusEffect createCleanse(String targetEffect)
public static StatusEffect createForAction(HeroActionType action)
```

`createForAction` mapping: `CAST_SPELL` → Burned, `HEAL` → Regeneration, `DEFEND` → Shield.

### Hero Creation Pipeline

```
HeroInput → HeroValidator → ValidationResult → HeroFactory → Entity → HeroRegistry
```

| Validation Rule | Condition |
|----------------|-----------|
| Name | Non-null, non-blank |
| Age | Between 10 and 100 |
| Power/Energy | Non-negative |
| Traits | Non-blank strings |
| Initial Effects | Known effect names (validated via EffectFactory) |

### Management Layer

#### HeroManager — Facade

```java
public HeroManager(HeroRegistry registry, HeroFactory factory,
                   HeroValidator validator, HeroSerializer serializer,
                   HeroActionLogService logService, HeroArchiverTracker archive,
                   HeroActionExecutor executor)
```

| Method | Behavior |
|--------|----------|
| `create(input)` | Validates, creates via factory, registers |
| `update(id, input)` | Creates new entity, clones with original ID (clone-and-replace) |
| `delete(id)` | Records in archive tracker, removes from registry |
| `performAction(id, action)` | Delegates to executor, logs result |

#### HeroActionExecutor — Command Pattern

| Action | Behavior |
|--------|----------|
| `ATTACK` | Finds first alive enemy, delegates to `entity.attack(target)` |
| `CAST_SPELL` | Creates Burned effect via EffectFactory, applies to target |
| `HEAL` | Creates Regeneration effect, applies to self |
| `DEFEND` | Creates Shield effect, applies to self |
| `WAIT` | Returns partial result with no damage |

### Simulation Engine

#### SimulationEngine — Battle Orchestrator

```
1. Initialize TurnManager with both participants
2. Loop until max rounds or death:
   a. Advance turns
   b. Apply active effects
   c. Execute combat round via BattleSimulator
   d. Log both actions
   e. Check alive count
3. Apply VictoryCondition strategy
4. Package SimulationResult
```

#### TurnManager — Cyclic Turn Rotation

Uses `Queue<Entity>` for fair alternating turns:
- Polls from front, pushes alive entities to back (circular queue)
- Dead entities removed entirely
- Guarantees no entity starvation

#### VictoryCondition — Strategy Interface

```java
public interface VictoryCondition {
    Entity determineWinner(List<Entity> participants);
}
```

| Strategy | Logic |
|----------|-------|
| `LastHeroStanding` | First alive entity wins |
| `HighestEnergyWins` | Entity with maximum remaining energy |

### Design Patterns Reference

| Pattern | Implementation | Location |
|---------|---------------|----------|
| Factory | `HeroFactory`, `EffectFactory` | HeroCreationSystem |
| Strategy | `VictoryCondition`, `StatusEffect` | SimulationArena, HeroCreationSystem |
| Facade | `HeroManager` | HeroManagementSystem |
| Adapter | `HeroInputConsoleAdapter`, `SimulationUIAdapter` | HeroCreationSystem, SimulationArena |
| Observer | `HeroTableModel.DataChangeListener` | HeroManagementSystem |
| Command | `HeroActionType` enum routing | HeroManagementSystem |
| MVC | TableModel (M), Presenter (V), Controller (C) | HeroManagementSystem |
| Template Method | `Entity.attack()` / `Entity.performAction()` abstract methods | HeroCreationSystem |
| Immutable Value Object | `HeroStats`, `HeroState`, `HeroMetadata`, `ValidationResult`, `ActionResult` | HeroCreationSystem |

### OOP Principles

| Principle | Evidence |
|-----------|----------|
| Encapsulation | Value objects expose only getters; state changes produce new instances |
| Inheritance | `Entity` → `Warrior`/`Wizard`/`Archer`; `StatusEffect` → 4 concrete effects |
| Polymorphism | `Fightable` interface, `VictoryCondition`, `HeroQueryService` |
| Abstraction | `HeroQueryService`, `HeroActionExecutor`, `SimulationEngine` |
| Composition over Inheritance | `Entity` composes `HeroStats`, `HeroState`, `HeroMetadata` |
| Immutability by Default | All value objects are immutable |
| Single Responsibility | `HeroValidator` validates, `HeroFactory` creates, `HeroSerializer` serializes |
| Open/Closed | New hero types extend `Entity`; new victory conditions implement `VictoryCondition` |
| Dependency Inversion | High-level modules depend on abstractions (`HeroQueryService`, `VictoryCondition`) |

---

# Part V — Enterprise: Security, Encryption & System Architecture

---

## 7.1 SmartCity — Enterprise Architecture & Security

> **Lines:** 1523 | **Files:** 142 Java classes | **Packages:** 21 | **Build:** Maven

### Purpose

Comprehensive Java-based smart city management system orchestrating robot fleets, job scheduling, citizen service requests, user authentication, and real-time system health monitoring through a console-based interface.

### Core Capabilities

| Domain | Description |
|--------|-------------|
| **Robot Fleet Management** | Four specialized robot types with lifecycle tracking, task execution, energy management |
| **Job Orchestration** | End-to-end job lifecycle with template-based creation |
| **Citizen Services** | Robot request submission, service feedback, request tracking |
| **Authentication & Authorization** | RBAC with 4 roles, 26 permissions, session management |
| **Encrypted Persistence** | AES-256-GCM encrypted file storage |
| **System Health Monitoring** | CPU, memory, disk, thread monitoring |
| **Audit Trail** | Timeline-based event recording with filtering and statistics |
| **Event-Driven Architecture** | Publish/subscribe event bus |

### Layered Architecture (6 Layers)

```
┌──────────────────────────────────────────────────┐
│                  UI Layer                         │
│   LoginUI → SystemConsoleUI → AdminUI            │
│              EmployeeUI → ClientUI               │
│              RobotConsoleUI / JobManagerConsoleUI │
├──────────────────────────────────────────────────┤
│               Manager Layer                       │
│   AdminManager | EmployeeManager | JobManager    │
│   RobotManager | ReportManager | SystemManager   │
├──────────────────────────────────────────────────┤
│               Service Layer                       │
│   AuthServices | SmartSearch | UndoManager       │
│   EventBus | LogAggregator | TimelineRecorder    │
├──────────────────────────────────────────────────┤
│               Model Layer                         │
│   User | Robot | Job | Report | TaskRecord       │
├──────────────────────────────────────────────────┤
│             Persistence Layer                     │
│   EncryptedStorage → AesEncryption               │
│   StorageManager | EncryptedEntityStorage        │
│   StorageRegistry (static registry)              │
├──────────────────────────────────────────────────┤
│              Security Layer                       │
│   AesEncryption | PasswordHasher | TokenGenerator│
│   SessionKeyManager | SecurityManager            │
├──────────────────────────────────────────────────┤
│             System Layer                          │
│   SystemHealthChecker | CpuMonitor               │
│   DiskUsageChecker | ThreadMonitor               │
└──────────────────────────────────────────────────┘
```

### Security Architecture

#### AES-256-GCM Encryption

| Constant | Value | Purpose |
|----------|-------|---------|
| `ALGO` | `"AES"` | Algorithm identifier |
| `TRANSFORMATION` | `"AES/GCM/NoPadding"` | Authenticated encryption mode |
| `GCM_TAG_LENGTH` | `128` bits | Authentication tag size |
| `IV_LENGTH` | `12` bytes | Initialization vector size |

**Output format:** `[12-byte IV] + [ciphertext + GCM tag]`  
**Key derivation:** SHA-256 hash of passphrase, truncated to 32 bytes.

#### Password Storage

SHA-256 with 16-byte random salt:

```java
public static String hash(String password, byte[] salt) {
    // SHA-256 with prepended salt, returns lowercase hex
}
```

#### RBAC — 26 Permissions × 4 Roles

| Role | Permission Count | Examples |
|------|-----------------|----------|
| `ADMIN` | 11 | VIEW_USERS, EDIT_USERS, CONFIGURE_SYSTEM, MANAGE_BACKUPS |
| `EMPLOYEE` | 8 | EXECUTE_JOB, VIEW_ASSIGNED_JOBS, RECHARGE |
| `CLIENT` | 6 | SUBMIT_REQUEST, VIEW_MY_REQUESTS |
| `ROBOT_MANAGER` | 12 | ADD_ROBOT, ASSIGN_TASK, ACCESS_ANALYTICS |

**RolePermissionMap** — Static immutable policy  
**PermissionManager** — Runtime-extensible wrapper with add/remove

#### Authentication Flow

```
User enters credentials
  → Authenticator.authenticate(username, password)
      → iterates StorageRegistry.userStorage
      → matches by case-insensitive username
      → PasswordHasher.verify(password, storedHash, salt)
  → Returns LocalUser or null
  → Session created (30-minute TTL)
  → SessionContext stores session
  → PermissionSelector checks permissions per operation
```

### Robot Hierarchy

```
Robot (abstract, extends BaseEntity)
  └── SmartRobot (abstract, adds status, taskHistory, energyLevel)
       ├── AIPoweredRobot    — Data analysis, AI operations
       ├── GuardianRobot     — Security, monitoring, patrol
       ├── ServiceRobot      — Citizen-facing services, delivery
       └── InnovativeRobot   — Research, prototyping, collaboration
```

Each robot has energy management (0–100), task history, and audit metadata.

### Job Lifecycle

```
PENDING → ASSIGNED → IN_PROGRESS → EXECUTED
                                      ↓
                                   FAILED
PENDING → CANCELLED
```

| Entity | Purpose |
|--------|---------|
| `Job` | Primary domain entity with lifecycle state machine |
| `JobTag` | Normalized tag (trimmed, lowercased) |
| `JobTemplate` | Reusable job blueprint with `toJob()` factory |
| `JobAssignment` | Immutable assignment record |
| `JobResult` | Execution outcome |
| `JobHistory` | Append-only history entries |
| `JobRequest` | Citizen-initiated request |
| `JobValidator` | Static validation methods |

### Data Persistence Pipeline

```
Domain Object
    ↓  (serializer Function<T,String>)
EncryptedEntityStorage<T>
    ↓  (line joining)
StorageManager
    ↓  (string → bytes)
EncryptedStorage
    ↓  (AES-256-GCM encrypt)
AesEncryption
    ↓  (bytes → file)
storage/secure/*.txt
```

### Event-Driven Architecture

```java
public class EventBus {
    private final ConcurrentHashMap<String, CopyOnWriteArrayList<EventListener>> listeners;

    public void register(String eventType, EventListener listener) { ... }
    public void unregister(String eventType, EventListener listener) { ... }
    public void publish(DomainEvent event) { ... }
}
```

Thread-safe via `ConcurrentHashMap` + `CopyOnWriteArrayList`.

### System Health Monitoring

```java
SystemHealthChecker → SystemSnapshot (point-in-time capture)
    → SystemValidator.isHealthy(snapshot)
        → heapUsed < 500MB && threadCount < 200
    → SystemReporter.reportAsText(snapshot)
```

### Application Lifecycle

```
Startup:
  SmartCity.main() → UserConsoleUI.launch() → Role-based dispatch
      → LoginUI → Session creation → AdminUI/EmployeeUI/ClientUI

Runtime:
  User Action → Permission Check → Business Logic → Persistence
      → Undo Registration → Session Logging → Event Publishing → Audit Recording

Shutdown:
  ExitReviewUI.showExitSummary() → SessionReview.clearSession() → Terminate
```

### Design Patterns Catalog (25+)

| Pattern | Implementation |
|---------|---------------|
| RBAC | `Role`, `Permission`, `RolePermissionMap`, `PermissionManager` |
| Immutable Value Object | `TaskRecord`, `Report`, `Credentials`, `SystemSnapshot`, `JobAssignment` |
| Abstract Base / Template Method | `User` → 4 subclasses; `Robot` → `SmartRobot` → 4 robot types |
| Facade | `AuthServices`, `PermissionSelector`, `EncryptedStorage` |
| Static Service / Utility | `Authenticator`, `SecurityManager`, `PasswordHasher`, `TokenGenerator` |
| Context Object | `SessionContext` (global session holder) |
| Guard / Assertion | `SessionValidator`, `PermissionSelector.require()` |
| Registry / Lookup Table | `RolePermissionMap`, `StorageRegistry` |
| Repository | `EncryptedEntityStorage<T>` |
| Adapter | `EncryptedEntityStorage<T>` bridges objects to line-based text |
| Publish/Subscribe (Observer) | `EventBus` + `EventListener` + `DomainEvent` |
| Strategy | `security.Authenticator` interface |
| Command (with Undo) | `UndoManager` with `UndoAction` |
| Stack-Based Undo | `UndoManager` (push/pop Runnable callbacks) |
| Front Controller | `UserConsoleUI` routing to role-specific UIs |
| Role-Based Dispatch | `SystemConsoleUI` dispatching by `Role` enum |
| Factory Method | `AesEncryption.generateNew()`, `JobTemplate.toJob()` |
| Decorator / Extension | `PermissionManager` wraps static map with runtime mutability |
| Audit Trail | `AuthManager` + `TimelineSink`, `SessionReview` logging |
| TTL Session | `Session` with eager expiry computation |
| Thread-Safe Pub/Sub | `EventBus` with `ConcurrentHashMap` |
| Java Serialization Backup | `BackupManager` with `ObjectOutputStream` |
| Generic Search | `SmartSearch.searchByFields()` with `Function<T, List<String>>` |

---

# Part VI — Cross-Cutting References

---

## 8.1 Design Patterns Catalog

All design patterns identified across the 9 projects:

| Pattern | Projects Using It |
|---------|-------------------|
| **Abstraction (Abstract Class)** | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy, SmartCity |
| **Inheritance** | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy, SmartCity |
| **Polymorphism** | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy, SmartCity |
| **Encapsulation** | All 9 projects |
| **Composition** | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy, SmartCity |
| **Interface Segregation** | Library, SmartCity |
| **Factory Method** | DigitalKingdomsAcademy, SmartCity |
| **Strategy** | DigitalKingdomsAcademy, SmartCity |
| **Facade** | Library, DigitalKingdomsAcademy, SmartCity |
| **Adapter** | DigitalKingdomsAcademy, SmartCity |
| **Observer / Publish-Subscribe** | DigitalKingdomsAcademy, SmartCity |
| **Command** | DigitalKingdomsAcademy, SmartCity |
| **MVC** | DigitalKingdomsAcademy |
| **Template Method** | AlAmalLibrary, DigitalKingdomsAcademy, SmartCity |
| **Immutable Value Object** | GeneralTransportationStation, DigitalKingdomsAcademy, SmartCity |
| **State Machine** | Kingdom (Task), SmartCity (Job) |
| **RBAC** | SmartCity |
| **Soft-Delete** | BankSystem, SmartCity |
| **Rollback** | BankSystem |
| **Custom Exception Hierarchy** | Library |
| **Audit Trail** | SmartCity |
| **Event-Driven Architecture** | SmartCity |
| **Thread-Safe Collections** | DigitalKingdomsAcademy, SmartCity |
| **Undo/Redo** | SmartCity |

---

## 8.2 OOP Principles Matrix

| Principle | GeneratePassword | AlAmalLibrary | Transp.Station | Employee_Date | BankSystem | Library | Kingdom | DigitalKingdoms | SmartCity |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Abstraction | | ✓ | ✓ | | | | ✓ | ✓ | ✓ |
| Inheritance | | ✓ | ✓ | | | | ✓ | ✓ | ✓ |
| Polymorphism | | ✓ | ✓ | | | | ✓ | ✓ | ✓ |
| Encapsulation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Composition | | ✓ | ✓ | | | | ✓ | ✓ | ✓ |
| Interface | | | | | ✓ | ✓ | ✓ | ✓ | ✓ |
| Immutability | | | ✓ | | | | | ✓ | ✓ |
| Generics | | | | | | | ✓ | ✓ | ✓ |
| Functional Interfaces | | | | | | | ✓ | ✓ | ✓ |
| Stream API | | | | | | | ✓ | ✓ | ✓ |

---

## 8.3 Persistence Strategies Comparison

| Project | Strategy | Format | Delimiter | Encryption |
|---------|----------|--------|-----------|------------|
| Employee_Date | Flat file, append/overwrite | `ID#//#Name#//#...` | `#//#` | None |
| BankSystem | Flat file, append/overwrite | `Name#//#Phone#//#...` | `#//#` | None |
| Library | Flat file, full rewrite + append | `id\|title\|author\|...` | `\|` | None |
| Kingdom | Flat file (CSV) | `name,age` | `,` | None |
| DigitalKingdoms | Password-protected files | `heroes.dat`, `battles.dat` | newline | Password gate |
| SmartCity | AES-256-GCM encrypted | `storage/secure/*.txt` | newline | AES-256-GCM |

**Common Patterns:**
- All persistence uses flat files (no database)
- Delimiter-based serialization avoids external dependencies
- Full snapshot rewrite after mutations ensures consistency
- Append mode for additive records (transactions, logs)

---

## 8.4 Architecture Comparison Matrix

| Project | Layers | Packages | Entry Point | UI Type | Persistence |
|---------|--------|----------|-------------|---------|-------------|
| GeneratePassword | 4 (Input/Presentation/Validation/Orchestration) | 1 | main() | Console | None |
| AlAmalLibrary | 4 (Application/Service/Entity/Domain) | 1 | AlAmalLibrary.main() | Console | None |
| GeneralTransportationStation | 3 (Entity/Collection/Control) | 1 | GeneralTransportationStation.main() | Console | None |
| Library Management System | 4 (Presentation/Business/Model/Persistence) | 4 | FinaleCode.main() | Console | Flat file |
| Employee Date Management | 5 (Presentation/Business/Domain/Persistence/Utility) | 1 | Employee_Date.main() | Console | Flat file |
| Bank System | 4 (Core/Domain/Helper/Entry) | 3 | BankSystem.main() | Console | Flat file |
| Kingdom of Magical Programming | 7 (characters/council/infrastructure/interfaces/logic/manager/ui) | 8 | Kingdom.main() | Console | Flat file |
| Digital Kingdoms Academy | 5 (Creation/Management/Simulation/Backup/UI) | 5 | DigitalKingdomsAcademy.main() | Console | Password-protected |
| SmartCity | 6 (UI/Manager/Service/Model/Persistence/Security/System) | 21 | SmartCity.main() | Console | AES-256-GCM encrypted |

---

## 8.5 Competency Matrix

| Competency | GeneratePassword | AlAmalLibrary | GeneralTransportation | Library | Employee Date | Bank System | Kingdom | DigitalKingdoms | SmartCity |
|-----------|-----------------|---------------|----------------------|---------|--------------|-------------|---------|----------------|-----------|
| Encapsulation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Inheritance | — | ✓ | ✓ | — | — | — | ✓ | ✓ | ✓ |
| Polymorphism | — | ✓ | ✓ | — | — | — | ✓ | ✓ | ✓ |
| Abstraction | — | ✓ | ✓ | — | — | — | ✓ | ✓ | ✓ |
| Interfaces | — | — | — | ✓ | — | — | ✓ | ✓ | ✓ |
| Generics | — | — | — | — | — | — | ✓ | — | ✓ |
| Enums | — | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ |
| Immutability | — | — | ✓ | — | — | — | — | ✓ | ✓ |
| File I/O | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Custom Exceptions | — | — | — | ✓ | — | — | — | ✓ | ✓ |
| Design Patterns | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Layered Architecture | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CRUD Operations | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Encryption | — | — | — | — | — | — | — | ✓ | ✓ |
| RBAC | — | ✓ | — | — | — | — | — | — | ✓ |
| Event System | — | — | — | — | — | — | — | — | ✓ |
| MVC | — | — | — | — | — | — | — | ✓ | — |
| Undo/Redo | — | — | — | — | — | — | — | — | ✓ |

---

# Part VII — Architecture Evolution & Project Index

---

## 9.1 Architecture Evolution Summary

### Key Milestones

| Milestone | Project | What It Demonstrates |
|-----------|---------|---------------------|
| First OOP | AlAmalLibrary | Abstract classes, inheritance, polymorphism |
| First Persistence | Employee_Date | File I/O, serialization, flat-file CRUD |
| First Design Patterns | Kingdom | Manager, Service, Factory, Generic utilities |
| First State Machine | Kingdom (Task) | Enum-based lifecycle management |
| First Encrypted Storage | DigitalKingdoms | Password-protected file archiving |
| First Security Architecture | SmartCity | AES-256-GCM, RBAC, session management |
| First Event-Driven System | SmartCity | Publish/subscribe event bus |
| First System Monitoring | SmartCity | CPU, memory, disk, thread monitoring |

---

## 9.2 Cross-Reference Guide

| Topic | Projects Where Discussed |
|-------|------------------------|
| Abstract Classes | AlAmalLibrary, GeneralTransportationStation, DigitalKingdomsAcademy, SmartCity |
| Inheritance Hierarchies | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy |
| Polymorphism | AlAmalLibrary, GeneralTransportationStation, Kingdom, DigitalKingdomsAcademy, SmartCity |
| Encapsulation | All 9 projects |
| File Persistence | Library, Employee Date, Bank System, Kingdom, DigitalKingdoms, SmartCity |
| Encryption | SmartCity (AES-256-GCM) |
| Design Patterns | Library (Facade), DigitalKingdoms (12+ patterns), SmartCity (enterprise patterns) |
| Custom Exceptions | Library (5 types), DigitalKingdoms |
| RBAC / Authorization | AlAmalLibrary (class-name prefix), SmartCity (26 permissions, 4 roles) |
| Immutability | GeneralTransportationStation (BusLog), DigitalKingdoms (HeroStats, HeroState, HeroMetadata) |
| Soft-Delete | Bank System |
| Rollback / Undo | Bank System, SmartCity (UndoManager) |
| Event Systems | SmartCity (EventBus, DomainEvent) |
| MVC Architecture | Digital Kingdoms Academy |
| Console UI | All 9 projects |

---

## 9.3 Project Index

| # | Project | Package | Files | Lines | Build | Complexity |
|---|---------|---------|-------|-------|-------|-----------|
| 1 | GeneratePassword | `s.generatepassword` | 1 | 189 | Maven | ★☆☆☆☆ |
| 2 | Al-Amal Library | `com.mycompany.alamallibrary` | 8 | 703 | Maven | ★★☆☆☆ |
| 3 | General Transportation Station | `generaltransportationstation` | 10 | 808 | Ant | ★★☆☆☆ |
| 4 | Employee Date Management | `com.mycompany.employee_date` | 8 | 539 | Maven | ★★★☆☆ |
| 5 | Bank System | `s.banksystem`, `BankSystemClients` | 9 | 740 | Maven | ★★★☆☆ |
| 6 | Library Management System | `s.finalecode`, `model`, `persistence`, `LibraryExceptions` | 10 | 571 | Maven | ★★★☆☆ |
| 7 | Kingdom of Magical Programming | 8 packages | 38 | 845 | Maven | ★★★★☆ |
| 8 | Digital Kingdoms Academy | 5 packages | 40+ | 761 | Maven | ★★★★☆ |
| 9 | SmartCity | 21 packages | 142 | 1523 | Maven | ★★★★★ |

---

> **Document Version:** 2.0  
> **Generated:** 2026-06-29  
> **Author:** Abdulrahman  
> **Total Documentation Lines:** ~7,000+ (consolidated from 9 source manuals)  
> **Scope:** Java 24 | Maven/Ant | 9 Projects | 200+ Source Files | 25+ Design Patterns
