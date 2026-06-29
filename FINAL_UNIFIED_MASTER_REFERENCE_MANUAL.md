# Final Unified Master Reference Manual

## Engineering Portfolio — Complete Technical Reference

**Author:** Abdulrahman Arfan Salem  
**Institution:** Al-Sham Private University — Faculty of Engineering (ITE)  
**Scope:** 9 disciplines | 50+ projects | 30,000+ lines of source code  
**Languages:** C++, C#, Java, Python, JavaScript/TypeScript, SQL, x86 Assembly  
**Version:** 1.0 — Unified Consolidation  
**Classification:** Professional Engineering Portfolio

---

> This document serves as the definitive single-source reference for the complete body of software engineering work across all learning paths. It synthesizes insights, patterns, and implementations from foundational programming through enterprise systems, artificial intelligence, and competitive problem-solving.

---

## Table of Contents

### Part I — Foundation & Architecture
1. [Executive Summary](#1-executive-summary)
2. [Learning Path Overview](#2-learning-path-overview)
3. [Technology Portfolio Matrix](#3-technology-portfolio-matrix)
4. [Core Engineering Principles](#4-core-engineering-principles)

### Part II — Systems Programming
5. [x86 Assembly Language](#5-x86-assembly-language)
6. [C++ Engineering](#6-c-engineering)

### Part III — Application Development
7. [C# & Object-Oriented Programming](#7-c--object-oriented-programming)
8. [Java Enterprise Systems](#8-java-enterprise-systems)

### Part IV — Data & Intelligence
9. [Python & Artificial Intelligence](#9-python--artificial-intelligence)
10. [SQL & Database Engineering](#10-sql--database-engineering)

### Part V — Web & Front-End
11. [Web Development](#11-web-development)

### Part VI — Competitive Problem Solving
12. [Competitive Programming & ICPC](#12-competitive-programming--icpc)

### Part VII — Cross-Cutting Analysis
13. [Design Patterns Across Languages](#13-design-patterns-across-languages)
14. [Architecture Evolution](#14-architecture-evolution)
15. [Competency Matrix](#15-competency-matrix)
16. [Project Index](#16-project-index)

---

# Part I — Foundation & Architecture

---

## 1. Executive Summary

This unified reference consolidates the complete body of work developed across nine distinct learning paths into a single professional engineering portfolio. The material spans from low-level hardware interaction (x86 Assembly) through systems programming (C++), application development (C#, Java), artificial intelligence (Python), database engineering (SQL), web technologies (HTML/CSS/JS/React/TypeScript), to competitive algorithmic problem-solving (ACM/ICPC).

### Quantitative Overview

| Discipline | Projects | Lines of Code | Key Milestone |
|------------|----------|---------------|---------------|
| **C++** | 15+ | ~8,000 | Hospital Simulation (Enterprise) |
| **Java** | 9 | ~7,000 | SmartCity (Security + Encryption) |
| **Python** | 10+ | ~15,000 | Tango AI + Vexon Strategic Game |
| **Web** | 15+ | ~5,000 | NEXUS TTT (16 subsystems) |
| **C#/C++ OOP** | 2 | ~3,000 | Products Management System |
| **SQL** | 1 | ~700 | Commercial Order Management |
| **Assembly** | 1 | ~1,000 | 8086 Architecture Mastery |
| **ACM/ICPC** | 40+ | ~2,000 | ICPC 2025 Competition Prep |
| **Total** | **80+** | **~37,000** | |

### Engineering Maturity Trajectory

```
Foundational          Applied           Modular           Modern           Enterprise
──────────────────────────────────────────────────────────────────────────────────────
Variables & I/O  →   CRUD Systems   →  Layered Arch  →  Smart Pointers →  Multi-Module
Basic Loops     →   Validation     →  Namespaces    →  RAII/Move     →  Testing
Simple Logic    →   Arrays/Lists   →  OOP Patterns  →  Templates     →  Encryption
Linear Flow     →   File I/O       →  Error Handling →  Generics      →  Event-Driven
```

---

## 2. Learning Path Overview

### 2.1 Progression Map

```
PHASE 1: LANGUAGE FOUNDATIONS
═══════════════════════════════════════════════════════════════
  Assembly (8086) ──► C++ Fundamentals ──► C# / Java OOP
  Low-level I/O     Control flow         Class hierarchies
  Registers         Data types           Encapsulation
  Flags & jumps     Loops & arrays       Polymorphism

PHASE 2: DATA STRUCTURES & ALGORITHMS
═══════════════════════════════════════════════════════════════
  Linked Lists ──► Stacks/Queues ──► Trees ──► Hash Tables
  Singly/Doubly   LIFO/FIFO         BST/AVL    Chaining/Probing

  Sorting: Insertion → Selection → Shell → QuickSort (Lomuto/Hoare)
  Search: Linear → Binary → Hash-Based
  Backtracking: N-Queens, Knight's Tour, Maze, Graph Coloring

PHASE 3: APPLIED SYSTEMS
═══════════════════════════════════════════════════════════════
  Order Management ──► Employee/Contact CRUD ──► Hospital Simulation
  Dynamic arrays      Smart pointers (RAII)     Multi-module architecture
  Audit trails        Geometric growth           Embedded testing

PHASE 4: SPECIALIZED DOMAINS
═══════════════════════════════════════════════════════════════
  Python/AI       Java Enterprise      Web/React       SQL/Databases
  Expert systems  Design patterns      HTML/CSS/JS     ER modeling
  Graph search    AES encryption       TypeScript      Normalization
  Game trees      RBAC + Sessions      React hooks     Query optimization
  Constraint sat  Event-driven arch    Zustand/state   Relational algebra

PHASE 5: COMPETITIVE EXCELLENCE
═══════════════════════════════════════════════════════════════
  ACM Workshops ──► ICPC 2025 ──► Competition Ready
  35+ solved         Advanced patterns    Multi-paradigm
  problems           Bitmask DP, LCA      problem solving
```

### 2.2 Discipline Cross-References

| Concept | C++ | Java | Python | C# | Web | SQL |
|---------|-----|------|--------|-----|-----|-----|
| **OOP Pillars** | §6.8 | §8 | §9.2 | §7.7 | — | — |
| **Dynamic Memory** | §6.7-6.8 | — | — | §7.8 | — | — |
| **Design Patterns** | §6.22 | §8.6-8.7 | §9.5 | §7.7 | §11.17 | — |
| **File I/O** | §6.19-6.20 | §8.5 | §9.10 | §7.10-7.12 | — | §10.5 |
| **Error Handling** | §6.25 | §8.5 | §9.9 | §7.14 | §11.8 | §10.6 |
| **Sorting/Search** | §6.15-6.16 | — | §9.4 | — | — | — |
| **Security** | — | §8.7 | §9.5 | — | §11.16 | — |

---

## 3. Technology Portfolio Matrix

### 3.1 Languages & Frameworks

| Technology | Version/Standard | Proficiency | Primary Application |
|------------|-----------------|-------------|-------------------|
| **C++** | C++11–C++17 | Advanced | Systems, DSA, Enterprise Simulation |
| **C#** | .NET Console | Advanced | OOP, POS Systems, Role-Based Access |
| **Java** | 24 | Advanced | Enterprise Architecture, Security, Encryption |
| **Python** | 3.10+ | Advanced | AI/ML, Expert Systems, Desktop Applications |
| **JavaScript** | ES6+ | Advanced | DOM Manipulation, Calculator, CRUD Tables |
| **TypeScript** | 5.9 (Strict) | Advanced | React Applications, Type-Safe State |
| **SQL** | T-SQL / SQLite | Intermediate | Database Design, Query Implementation |
| **x86 Assembly** | 8086/8088 | Intermediate | Hardware-Level Programming |

### 3.2 Frameworks & Libraries

| Framework | Language | Usage |
|-----------|----------|-------|
| **React 19** | TypeScript | Component architecture, hooks, state management |
| **Vite 7** | TypeScript | Build configuration, single-file bundling |
| **Tailwind CSS 4** | CSS | Utility-first styling, responsive design |
| **Bootstrap 5** | HTML/CSS | Responsive grid, components |
| **PyQt6** | Python | Desktop GUI applications (6 projects) |
| **experta** | Python | Rule-based expert systems (Rete algorithm) |
| **ReportLab** | Python | PDF generation (transcripts, invoices) |
| **SQLite** | Python/Java | Embedded database with WAL mode |
| **Zustand** | TypeScript | Centralized state management |

### 3.3 Development Environments

| Environment | Used For |
|-------------|----------|
| emu8086 | Assembly language development and testing |
| Visual Studio | C++, C#, and Java development |
| Maven/Ant | Java build systems |
| Vite CLI | React/TypeScript build pipeline |
| Python 3.10+ | Python application execution |
| Browser DevTools | Web development and debugging |

---

## 4. Core Engineering Principles

### 4.1 Universal Patterns Observed Across All Projects

These patterns appear consistently across every language and project in the portfolio:

#### Input Validation

```cpp
// C++ Pattern
while (cin.fail()) {
    cin.clear();
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    cout << "Invalid input. Try again.\n";
}
```

```java
// Java Pattern
while (!scanner.hasNextInt()) {
    System.out.println("Please enter a valid number.");
    scanner.next(); // discard invalid
}
```

```python
# Python Pattern
while True:
    val = input("Enter value: ")
    if val.isdigit():
        break
    print("Invalid input.")
```

#### Modular Separation of Concerns

Every project beyond the introductory level follows a layered architecture:

```
┌─────────────────────────────────────┐
│        Presentation Layer           │  UI, menus, user interaction
├─────────────────────────────────────┤
│        Business Logic Layer         │  Domain rules, validation, computation
├─────────────────────────────────────┤
│        Data/Infrastructure Layer    │  Persistence, I/O, external systems
└─────────────────────────────────────┘
```

#### Confirmation Before Destructive Operations

All projects implementing CRUD operations require explicit user confirmation before delete or modify operations — a pattern applied uniformly across C++, C#, Java, Python, and JavaScript implementations.

### 4.2 Complexity Analysis Standards

Every algorithmic implementation in the portfolio includes formal complexity analysis:

| Complexity | Class | Examples in Portfolio |
|-----------|-------|---------------------|
| O(1) | Constant | Hash lookup, array index, register access |
| O(log n) | Logarithmic | Binary search, AVL rotation, GCD (Euclidean) |
| O(n) | Linear | Linear search, array traversal, BFS/DFS |
| O(n log n) | Linearithmic | QuickSort, Shell Sort, merge operations |
| O(n²) | Quadratic | Insertion Sort, Selection Sort, nested loops |
| O(b^d) | Exponential | Minimax, BFS/DFS on game trees, N-Queens |
| O(n × 2^n) | Exponential | Bitmask DP, subset enumeration |

---

# Part II — Systems Programming

---

## 5. x86 Assembly Language

> The foundation of all computing — direct hardware interaction through registers, flags, and memory addressing on the 8086/8088 architecture.

### 5.1 Program Structure

All programs use `org 100h` — the standard COM file offset reserving 256 bytes for the PSP (Program Segment Prefix). Data movement centers on the `MOV` instruction with direct, register-indirect, and segment-override addressing modes.

### 5.2 Data Definition & Memory

| Directive | Size | Usage |
|-----------|------|-------|
| `DB` | 1 byte | Byte variables, character data |
| `DW` | 2 bytes | Word variables, addresses |
| `DUP(n)` | n × size | Array initialization |
| `EQU` | — | Compile-time constants (no storage) |

**Addressing modes demonstrated:**
- Direct: `mov [12ABH], al`
- Register-indirect: `mov si, 1234H` → `mov [si], al`
- Segment override: `mov ds, ax` → physical address = segment × 16 + offset

### 5.3 Arithmetic Operations

| Instruction | Behavior | Flags Affected |
|-------------|----------|----------------|
| `ADD` | dest = dest + src | CF, ZF, SF, OF, PF |
| `ADC` | dest = dest + src + CF | CF, ZF, SF, OF, PF |
| `SUB` | dest = dest − src | CF, ZF, SF, OF, PF |
| `MUL` | unsigned: AL×r/m8→AX; AX×r/m16→DX:AX | CF, OF |
| `IMUL` | signed multiplication | CF, OF |
| `DIV` | unsigned: AX÷r/m8→AL:AH; DX:AX÷r/m16→AX:DX | — |

**Register clearing (4 methods):**
```asm
mov al, 0      ; Method 1: immediate
xor al, al     ; Method 2: XOR (preferred, 2 bytes)
and al, 0      ; Method 3: AND
sub al, al     ; Method 4: subtract self
```

### 5.4 Control Flow

**Unconditional:** `JMP label`  
**Conditional (carry-based):** `JC`, `JNC`  
**Conditional (comparison):** `JA/JB` (unsigned), `JG/JL` (signed), `JE/JNE` (equality)

**LOOP instruction:** Decrements `CX` and jumps if nonzero. Critical behavior: `CX=0` causes underflow to 65535 iterations.

**Nested loop pattern:** Save outer `CX` before inner loop, restore after.

### 5.5 I/O, Procedures & Macros

| Mechanism | Key Interrupt | Purpose |
|-----------|--------------|---------|
| DOS char input | `INT 21h, AH=01h` | Read character to AL |
| BIOS char output | `INT 10h, AH=0Eh` | Display character from AL |
| Port input | `IN ax, port` | Read word from hardware port |
| Port output | `OUT port, al` | Write byte to hardware port |

**Procedure vs Macro:** Procedures use `CALL`/`RET` (single instance, jumped to). Macros expand inline at assembly time (duplicated code, parameter substitution).

### 5.6 Applied Projects

| Project | Concepts Applied |
|---------|-----------------|
| Practice 1–3 | Constants, variables, LEA, array population |
| Element Classification | LOOP + CMP + conditional jumps |
| Range Validation | Boundary checking with JL/JG |
| Grade Average | DIV for averaging, pass/fail logic |

> *Detailed implementations: Assembly_Language_Master_Reference.md*

---

## 6. C++ Engineering

> The most extensively documented language in the portfolio — from parameter passing mechanisms to a full hospital simulation system with embedded testing.

### 6.1 Parameter Passing — The Foundation

| Mechanism | Syntax | Original Modified | Safety | Use Case |
|-----------|--------|-------------------|--------|----------|
| **By Value** | `Type param` | No | High | Read-only access |
| **By Reference** | `Type& param` | Yes (direct alias) | Medium | Mutation, large objects |
| **By Pointer** | `Type* param` | Yes (via deref) | Low | Dynamic memory, nullable |

**Best practices established:** Initialize pointers to `nullptr`, pair every `new` with `delete`, set to `nullptr` after deletion.

### 6.2 Core Constructs

**Function overloading** — Same name, different parameter signatures for polymorphic behavior.  
**Templates** — Generic programming with `typename T` for type-independent algorithms.  
**Preprocessor macros** — Multi-line text substitution with parenthesized parameters to prevent precedence issues.  
**Enumerations** — Type-safe integer constants for state representation.

### 6.3 Memory Management Evolution

The portfolio traces a clear progression in memory management sophistication:

| Stage | Project | Technique | Safety |
|-------|---------|-----------|--------|
| **Manual** | Order System | Raw `new[]`/`delete[]` | Manual tracking required |
| **RAII** | Contact System | `unique_ptr<unique_ptr<Contact>[]>` | Automatic cleanup |
| **Ownership** | Hospital System | Registry-owned pointers | Single-owner, shared-raw |

**Geometric growth strategy:**
```
size == capacity    → resize(capacity × 2)     // Amortized O(1) insert
size < capacity / 4 → resize(capacity / 2)     // Reclaim memory
capacity > 10       → Never shrink below 10    // Prevent thrashing
```

### 6.4 Data Structures Implemented

| Structure | Variants | Key Operations |
|-----------|----------|----------------|
| **Linked List** | Singly, Doubly, Circular | Insert/delete at position O(n) |
| **Stack** | LIFO (linked list) | push, pop, peek O(1) |
| **Queue** | FIFO (linked list) | enqueue, dequeue O(1) |
| **Priority Queue** | Sorted SLL | Insert O(n), dequeue O(1) |
| **Hash Table** | Chaining, Double Hashing, Linear Probing | Insert/search O(1) avg |
| **Binary Search Tree** | Standard, AVL (self-balancing) | Insert/search O(log n) |
| **Union-Find** | Weighted + Path Compression | Union/find O(α(n)) ≈ O(1) |

### 6.5 Sorting Algorithms

| Algorithm | Best | Average | Worst | Implementation Location |
|-----------|------|---------|-------|------------------------|
| Insertion Sort | O(n) | O(n²) | O(n²) | Practices/8 |
| Selection Sort | O(n²) | O(n²) | O(n²) | Practices/8 |
| Shell Sort | O(n log n) | O(n^1.3) | O(n²) | Practices/8 |
| QuickSort (Lomuto) | O(n log n) | O(n log n) | O(n²) | Employee System |
| QuickSort (Hoare) | O(n log n) | O(n log n) | O(n²) | Contact System |

### 6.6 Backtracking Algorithms

Four classic NP-hard problems solved with recursive backtracking:

| Problem | Board/Space | Constraint Check | Complexity |
|---------|------------|-----------------|------------|
| N-Queens | N×N chessboard | Row, diagonal conflicts | O(N!) |
| Knight's Tour | 8×8 chessboard | Unvisited cells, valid moves | O(8^(N²)) |
| Maze Solving | 4×4 grid | Walls, visited cells | O(4^(N²)) |
| Graph Coloring | 4-vertex graph | Adjacent vertex colors | O(m^V) |

### 6.7 Applied Systems

| System | Complexity | Key Features |
|--------|-----------|--------------|
| **Chemistry Toolkit** | Foundational | Unit conversion, periodic table search |
| **Order Management** | Applied | Dynamic arrays, audit trail, secret commands |
| **Employee Management** | Modular | Raw pointer CRUD, QuickSort, binary search |
| **Contact Management** | Modern | Smart pointers, RAII, geometric growth, Hoare partition |
| **Exam Order System** | Comparative | 3 implementations: procedural → modular → OOP |
| **Hospital Simulation** | Enterprise | 6 managers, heap-based scheduling, embedded testing |

### 6.8 Hospital Simulation — Enterprise Architecture

The capstone C++ project implements a four-layer architecture:

```
HospitalSystem/
├── Models/      → Data structures (POD structs + serialize/deserialize)
├── Core/        → Business logic managers (algorithm engines)
├── Utilities/   → Infrastructure (string, file I/O, date, input, random)
├── UI/          → Console display, menus, verification suite
└── Data/        → Flat-file persistence (#-delimited)
```

**Algorithm inventory:**

| Module | Data Structure | Complexity |
|--------|---------------|-----------|
| Registry | Dual `unordered_map` (ID + name) | O(1) avg lookup |
| ER Triage | `priority_queue` (max-heap) + fixed beds | O(log W) insert, O(1) top |
| In-Patient | `unordered_map<int, Department>` | O(1) per department |
| Surgery | `set<stOperation>` (BST, time-ordered) | O(log S) insert |
| Blood Bank | `unordered_map<string, queue>` | O(1) FIFO with lazy expiry |
| Lab | Dual heap: min-heap (devices) + max-heap (waitlist) | O(log k) device allocation |

**Embedded testing framework:**
```cpp
#define SANDBOX_VERIFY(cond, msg) do { \
    if (cond) { cout << "[PASS] " << msg; s_PassCount++; } \
    else      { cout << "[FAIL] " << msg; s_FailCount++; } \
} while(0)
```

> *Detailed implementations: UNIFIED_CPP_MASTER_REFERENCE_MANUAL.md*

---

# Part III — Application Development

---

## 7. C# & Object-Oriented Programming

> A dual-language (C++ and C#) Products Management System demonstrating OOP principles, role-based access control, and console-based UI design.

### 7.1 Algorithmic Foundations (IPG101)

Before system implementation, foundational algorithmic thinking was established through two capstone algorithms:

**Algorithm A — Pythagorean Triples Generator:**
- Exhaustive search with O(n²) complexity
- Inner loop optimization: `b` starts from `a` (50% reduction)
- Integer validation via `SQRT` + floor comparison

**Algorithm B — Server Status Checker:**
- Decision-intensity: O(1) sequential conditionals
- Priority-based dispatch: Holiday → Maintenance → Available
- Multi-level input validation with early termination

### 7.2 Products Management System (IPG202)

**Architecture comparison:**

| Aspect | C++ (Modular) | C# (Monolithic) |
|--------|---------------|-----------------|
| Organization | 5 headers + 1 source | Single Program.cs |
| Encapsulation | Namespace-based | Static class fields |
| Data Sharing | Parameters required | Direct field access |
| Screen Clear | `system("cls")` | `Console.Clear()` |
| String Input | `getline(cin >> ws)` | `Console.ReadLine()` |

**Namespace hierarchy (C++):**
```
SystemFundamental → ProductsSystem → Employee → Admin → System_Screens
```

**Role-based access:**
| Role | Access Level | Menu Options |
|------|-------------|--------------|
| Admin | Full system | 10 operations |
| Seller | Limited | 4 operations |

**Data storage:** 2D string arrays with `#//#` delimiter for serialization.

**Validation framework:** Layered chain — `ReadValidChar` → `ValidateCharInRange` → `GetValidChar` → `YES_NO`.

> *Detailed implementations: MASTER_REFERENCE_MANUAL.md (C#)*

---

## 8. Java Enterprise Systems

> Nine projects progressing from single-class utilities to a 142-file enterprise system with AES-256-GCM encryption, RBAC, and event-driven architecture.

### 8.1 Progression Overview

| # | Project | Lines | Key Concepts |
|---|---------|-------|-------------|
| 1 | GeneratePassword | 189 | Modular predicates, input validation |
| 2 | Al-Amal Library | 703 | Abstract classes, inheritance, polymorphism |
| 3 | General Transportation | 808 | Immutable records, enum state, composition |
| 4 | Employee Date Management | 539 | CRUD, Zeller's Congruence, flat-file persistence |
| 5 | Bank System | 740 | Financial transactions, soft-delete, rollback |
| 6 | Library Management | 571 | Facade pattern, interface segregation, custom exceptions |
| 7 | Kingdom of Magical Programming | 845 | Architecture evolution (3 solutions), generics |
| 8 | Digital Kingdoms Academy | 761 | 12+ design patterns, battle simulation, MVC |
| 9 | SmartCity | 1,523 | AES-256-GCM, RBAC (26 permissions), event bus |

### 8.2 Design Patterns Catalog (25+)

| Pattern | Projects | Purpose |
|---------|----------|---------|
| Abstraction (Abstract Class) | 2,3,7,8,9 | Define contracts, hide implementation |
| Inheritance | 2,3,7,8,9 | Share logic via parent classes |
| Polymorphism | 2,3,7,8,9 | Runtime method dispatch |
| Encapsulation | All 9 | Protect internal state |
| Immutability | 3,8,9 | `final` class + fields + `unmodifiableList` |
| Factory Method | 8,9 | Object creation without specifying class |
| Strategy | 8,9 | Swappable algorithms (VictoryCondition, Authenticator) |
| Facade | 6,8,9 | Simplified interface over complex operations |
| Observer/Pub-Sub | 8,9 | Loose coupling via event notification |
| MVC | 8 | Model-View-Controller separation |
| Command + Undo | 9 | Reversible operations with stack-based history |
| RBAC | 2,9 | Role-based access with granular permissions |
| Soft-Delete | 5,9 | Flag-based deletion preserving referential integrity |
| Rollback | 5 | State restoration on cancellation |

### 8.3 Security Architecture (SmartCity)

**AES-256-GCM encryption pipeline:**
```
Domain Object → Serializer Function → EncryptedEntityStorage<T>
    → StorageManager (string → bytes)
        → AesEncryption (AES-256-GCM encrypt)
            → storage/secure/*.txt
```

**Password hashing:** SHA-256 with 16-byte random salt, lowercase hex output.  
**RBAC:** 4 roles × 26 permissions, static immutable policy with runtime-extensible wrapper.  
**Session management:** 30-minute TTL, eager expiry computation.

> *Detailed implementations: MASTER_REFERENCE_MANUAL_FINAL.md (Java)*

---

# Part IV — Data & Intelligence

---

## 9. Python & Artificial Intelligence

> Language fundamentals through production-grade desktop applications and AI systems — including expert systems, graph search, game-tree intelligence, and constraint satisfaction.

### 9.1 Language Mastery

| Topic | Key Concepts | AI Connection |
|-------|-------------|---------------|
| Variables & Types | Dynamic typing, `type()`, `id()` | State representation |
| Control Flow | if/elif/else, for/while | State transitions, frontier processing |
| Functions | Def, decorators, generators | Heuristic functions, lazy state generation |
| Collections | Lists, dicts, sets, deque, PriorityQueue | Graphs, explored sets, frontiers |
| OOP | Classes, inheritance, dunder methods | Node classes, algorithm hierarchies |
| Error Handling | try/except, exception hierarchy | Robust input validation |

### 9.2 Expert Systems with `experta`

**Core paradigm:** Declarative AI — declare facts and rules; the Rete algorithm determines which conclusions follow via forward chaining.

| Component | Purpose | Example |
|-----------|---------|---------|
| `Fact` | State representation | `Fact(temperature=30)` |
| `@Rule` | IF-THEN condition-action | `@Rule(Fact(light_color="green"))` |
| `KnowledgeEngine` | Inference engine | Stores facts, evaluates rules, fires matches |
| `@DefFacts` | Initial knowledge seed | `yield Fact(time="night")` |

**Pattern matching constructs:**
| Construct | Scope | Example |
|-----------|-------|---------|
| `MATCH` | Extract value into variable | `Fact(speed=MATCH.s)` |
| `AS` | Capture entire fact object | `AS.fact << Fact(...)` |
| `W()` | Field existence check | `Fact(ip=W())` |
| `P(lambda)` | Single-field predicate | `Fact(speed=P(lambda s: s > 70))` |
| `TEST(lambda)` | Multi-field condition | `TEST(lambda s, t: s > t)` |
| `EXISTS` | At least one matching fact | `EXISTS(Fact(type="alarm"))` |
| `FORALL` | All facts satisfy condition | `FORALL(Fact(type="student"), Fact(passed=True))` |

### 9.3 Graph Theory & State-Space Search

**8-Puzzle — Canonical Benchmark:**

| Algorithm | Frontier | Complete | Optimal | Time | Space |
|-----------|----------|----------|---------|------|-------|
| BFS | FIFO Queue | Yes | Yes | O(b^d) | O(b^d) |
| DFS | LIFO Stack | Yes* | No | O(b^m) | O(b×m) |
| A* | Priority Queue (f=g+h) | Yes | Yes† | O(b^d) | O(b^d) |

*With explored set in finite graph. †With admissible heuristic.

**Adversarial Search — Minimax + Alpha-Beta:**

| Aspect | Value |
|--------|-------|
| Players | Two (maximizer vs. minimizer) |
| Optimality | Optimal with perfect evaluation |
| Pruning | α-β cuts reduce effective branching from b to √b |
| Transposition tables | Cache positions to avoid redundant evaluation |
| Move ordering | Center → corners → edges maximizes pruning |

### 9.4 Production Applications

| Application | Domain | Key Features |
|------------|--------|-------------|
| Budget Manager Pro | Finance | CRUD, monthly budgeting, CSV/JSON import, backup |
| Smart Login | Auth | SHA-256, attempt limiting, card shake animation |
| Student Management | Academic | GPA calculation, PDF transcripts, interactive charts |
| QuickMart POS | Retail | Invoice management, PDF export, tax/discount |
| Mini Banking | Finance | Multi-currency, ACID transfers, RBAC (20 permissions) |
| Task Manager | Productivity | Eisenhower Matrix, gamification, reminders |
| Advanced Calculator | Scientific | 8 modes, matrix ops, financial functions |
| Hayah Charity | Donation | 16+ currencies, goal tracking, 12 achievements |
| Tango AI | Puzzle Solver | Expert system + BFS/DFS + constraint satisfaction |
| Vexon Strategic Game | Game AI | Minimax α-β, 8 themes, procedural sound |

### 9.5 Tango AI — Multi-Paradigm Intelligence

The Tango AI Puzzle System combines three AI paradigms in a single solver:

```
Interaction Layer (UI/Menu)
        ↓
State Layer (TangoBoard — data model & validation)
        ↓
Intelligence Layer
├── TangoExpertEngine (experta — 12 forward-chaining rules)
├── UltimateSolver (orchestrator)
├── BFS (FIFO frontier, shortest-path optimal)
└── DFS (LIFO frontier, memory-efficient)
```

**Smart puzzle generation:** Generate full valid board → Derive constraints from reality → Mask cells by difficulty.

**"First Empty Cell" branching strategy:** Reduces branching from O(2^k × k!) to O(2^k) — the difference between ~10^9 and ~4096 states for a 4×4 board.

> *Detailed implementations: MASTER_REFERENCE_MANUAL.md (Python)*

---

## 10. SQL & Database Engineering

> Relational database design, ER modeling, schema normalization, and query implementation for a commercial order management system.

### 10.1 Entity Identification

| Entity | Primary Key | Key Attributes |
|--------|------------|----------------|
| Customer | NationalID | Name, composite Address, multi-valued PhoneNumbers |
| Employee | NationalID | Name, multi-valued PhoneNumbers |
| Product | ProductID | Name, Price |
| Order | OrderID | Date, TotalValue, FK→Employee, FK→Customer |
| Order_Product | (OrderID, ProductID) | Quantity — resolves M:N relationship |

### 10.2 ER Relationships

```
Customer (1) ──── places ──── (N) Order
Employee (1) ──── processes ── (N) Order
Order (N) ──── contains ──── (M) Product
                              ↑ via Order_Product junction table
```

### 10.3 SQL Implementation

```sql
-- Three-table join with aggregation
SELECT o.OrderID, p.ProductName, SUM(op.Quantity) AS TotalQuantity
FROM Order_Product op
JOIN Product p ON op.ProductID = p.ProductID
JOIN [Order] o ON op.OrderID = o.OrderID
WHERE o.OrderID = 10
GROUP BY o.OrderID, p.ProductName;
```

### 10.4 Normalization Analysis

| Normal Form | Requirement | Book Example Status |
|-------------|-------------|-------------------|
| **1NF** | Atomic values, no repeating groups | Pass |
| **2NF** | No partial dependencies | Pass (simple key) |
| **3NF** | No transitive dependencies | **Fail** → Decomposed |

**3NF decomposition:** `BookID → Publisher → BookType` transitive dependency resolved by splitting into `Book(BookID, Title, Publisher)` and `Publisher_Info(Publisher, BookType)`.

### 10.5 Relational Algebra

| Operation | Symbol | SQL Equivalent |
|-----------|--------|---------------|
| Projection | Π | SELECT column |
| Selection | σ | WHERE condition |
| Cartesian Product | × | CROSS JOIN |
| Natural Join | ⋈ | JOIN ON |

> *Detailed implementations: SQL_Master_Reference_Manual.md*

---

# Part V — Web & Front-End

---

## 11. Web Development

> A complete front-end development journey from semantic HTML5 through production-quality React/TypeScript applications.

### 11.1 Technology Stack Evolution

| Phase | Technologies | Architecture |
|-------|-------------|--------------|
| **Fundamentals** | HTML5, CSS3, Bootstrap 5 | Page-based, multi-file |
| **Interactivity** | JavaScript (ES6+), DOM | Event-driven, single-page |
| **Modern** | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4 | Component-based, type-safe |

### 11.2 Core Competencies Demonstrated

**HTML5:** Semantic elements, forms with validation attributes, tables, details/summary, accessibility.

**CSS3:** Custom properties (design tokens), selector hierarchies, Flexbox/Grid layouts, responsive breakpoints (768px/480px), print optimization, pseudo-elements.

**JavaScript:** DOM manipulation, event delegation, array methods (push/splice/includes), template literals, real-time search filtering, CRUD operations.

**TypeScript:** Strict mode, interfaces, type-safe state, generics, utility types.

**React:** Component architecture, hooks (useState/useEffect/useReducer/useMemo), Zustand state management, Context API, custom hooks.

### 11.3 React Application Portfolio

| Application | Features | State Management | Lines |
|------------|---------|-----------------|-------|
| **Calculator Pro** | 9 modes, 30+ operations, memory, history | Zustand store | ~2,000 |
| **TaskFlow** | Eisenhower Matrix, gamification, reminders | useState + hooks | ~1,500 |
| **Banking System** | RBAC, multi-currency, analytics, PDF export | useState + services | ~2,000 |
| **NEXUS TTT** | 16 subsystems, minimax α-β, procedural audio | useReducer state machine | ~2,500 |

### 11.4 Shared Engineering Foundation

All four React projects share:

- **`viteSingleFile()`** — All assets inlined into single `index.html`
- **`cn()` utility** — `clsx` + `tailwind-merge` for class name conflicts
- **localStorage persistence** — No backend, no database
- **Dark/Light theme** — CSS custom properties with runtime switching
- **Strict TypeScript** — `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

### 11.5 NEXUS TTT — 16-Subsystem Architecture

```
Section 16: Root Orchestrator
Section 15: UI Components
Section 14: State Machine
Section 13: Theme Engine (3 palettes × 19 tokens)
Section 12: Replay System
Section 11: Stats Engine
Section 10: Storage Manager (dual-key localStorage)
Section 09: Sound Manager (Web Audio API synthesis)
Section 08: AI Controller (Easy/Medium/Hard strategies)
Section 07: AI Framework (minimax α-β + memo)
Section 06: Board Manager
Section 05: Game Engine
Section 04: Error Handling
Section 03: Logging (per-subsystem)
Section 02: Configuration
Section 01: Constants
```

**AI difficulty tiers:**

| Level | Algorithm | Play Quality |
|-------|-----------|-------------|
| Hard | Minimax α-β + transposition table | Provably optimal — cannot be defeated |
| Medium | Heuristic priority + 22% random error | Strong with human-like mistakes |
| Easy | Weighted random (center preference) | Beginner-friendly |

> *Detailed implementations: WEB/MASTER_REFERENCE_MANUAL.md*

---

# Part VI — Competitive Problem Solving

---

## 12. Competitive Programming & ICPC

> 40+ solved problems spanning 8 algorithmic domains — from basic I/O through advanced bitmask DP, LCA with binary lifting, and modular arithmetic.

### 12.1 Problem Distribution

| Category | Problems | Key Techniques |
|----------|----------|---------------|
| Fundamentals | 13 | I/O, data types, conditionals, arithmetic |
| String Processing | 4 | ASCII manipulation, character classification, abbreviation |
| Mathematical Foundations | 5 | GCD, logarithms, prime factorization, modular arithmetic |
| Combinatorics & Probability | 2 | Combinatorial functions, probability with unknowns |
| Simulation & Modeling | 4 | Chess rules, Nim game, weighted character mapping |
| Greedy Algorithms | 4 | Activity selection, group packing, parity analysis |
| Advanced Patterns (ICPC) | 12+ | Bitmask DP, LCA, sliding window, string optimization |

### 12.2 Algorithm Complexity Reference

| Algorithm | Complexity | Problems |
|-----------|-----------|---------|
| Gauss Formula | O(1) | Sum 1 to n |
| Euclidean GCD | O(log min(a,b)) | MaratonIME, FairAndSquare |
| Trial Division | O(√n) | Bash's Big Day |
| Activity Selection | O(n log n) | Greedy scheduling |
| Binary Search | O(log n) | Guess Number (interactive) |
| Sliding Window | O(n) | Difference counting |
| Bitmask DP | O(n × 2^n) | Woman and Cars |
| Binary Lifting LCA | O(N log N) preprocess, O(log N) query | IHate |

### 12.3 Code Templates

**Fast I/O:**
```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

**Modular arithmetic:**
```cpp
const int MOD = 1000000007;
res = (res + value) % MOD;
```

**GCD:**
```cpp
int gcd(int a, int b) {
    while (b) { int t = b; b = a % b; a = t; }
    return a;
}
```

> *Detailed implementations: ACM/ACM_Competitive_Programming_Master_Reference.md*

---

# Part VII — Cross-Cutting Analysis

---

## 13. Design Patterns Across Languages

### 13.1 Universal Patterns

| Pattern | C++ | Java | Python | C# | Web |
|---------|-----|------|--------|-----|-----|
| **Encapsulation** | Classes | All 9 projects | Classes | Data hiding | Component props |
| **Inheritance** | BST→AVL, Entity hierarchy | Book→4 types, Robot→4 types | SearchAlgorithm→BFS/DFS | — | React component trees |
| **Polymorphism** | Virtual functions | `displayInfo()`, `attack()` | Override methods | Interface impl | Conditional rendering |
| **Strategy** | QuickSort partition variants | VictoryCondition, StatusEffect | AI difficulty tiers | — | Theme systems |
| **Observer** | — | EventBus (pub/sub) | — | — | React state updates |
| **Factory** | — | HeroFactory, EffectFactory | — | — | Component creation |
| **Facade** | — | HeroManager, AuthServices | OperationService | — | Service layers |
| **Singleton** | — | StorageRegistry | Database managers | — | Zustand store |
| **State Machine** | — | Task status, Job lifecycle | Game states | — | useReducer actions |
| **RAII** | unique_ptr arrays | — | Context managers | — | useEffect cleanup |
| **Command + Undo** | — | UndoManager | — | — | History stack |

### 13.2 Persistence Strategies Comparison

| Language | Strategy | Format | Delimiter | Encryption |
|----------|----------|--------|-----------|------------|
| C++ | Flat file, # delimited | Text | `#` | None |
| C# | Flat file, # delimited | Text | `#//#` | None |
| Java (early) | Flat file | Text | `#//#` | None |
| Java (late) | AES-256-GCM encrypted | Binary | newline | AES-256 |
| Python | SQLite (WAL mode) | Binary | — | PBKDF2 hashing |
| Web | localStorage | JSON | — | SHA-256 (banking) |
| SQL | Relational tables | Binary | — | Foreign keys |

---

## 14. Architecture Evolution

### 14.1 Structural Maturity Across Projects

| Era | Characteristics | Representative Projects |
|-----|----------------|----------------------|
| **Procedural** | Global state, standalone functions, linear flow | Assembly programs, C++ Collection homework |
| **Modular Procedural** | Functions in namespaces, parameterized data | C++ Order System, Employee System |
| **Object-Oriented** | Classes, inheritance, encapsulation | C++ Contact System, Java Al-Amal Library |
| **Layered Architecture** | Presentation/Business/Data separation | Java Bank System, Python Calculator |
| **Enterprise** | Multi-module, testing, encryption, event-driven | C++ Hospital, Java SmartCity, Python Banking |
| **Modern Web** | Component-based, type-safe, state management | React/TypeScript applications |

### 14.2 Memory Management Evolution

```
Raw new[]/delete[]  →  Smart pointers (unique_ptr)  →  RAII (automatic)
     C++ Order             C++ Contact                   Java/Python
     Manual tracking       Ownership transfer            GC-managed
```

### 14.3 Error Handling Evolution

```
Basic cin.fail()  →  Validation loops  →  Custom exceptions  →  Defensive programming
    C++ Collection     C++ Order System     Java Library           Python Tango AI
```

---

## 15. Competency Matrix

### 15.1 Technical Skills

| Skill | Assembly | C++ | C# | Java | Python | SQL | Web |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Data Types & Variables** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Control Flow** | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| **Functions/Methods** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Arrays/Lists** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **OOP** | — | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| **Dynamic Memory** | — | ✓ | — | — | — | — | — |
| **DSA** | — | ✓ | — | — | ✓ | — | — |
| **File I/O** | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Design Patterns** | — | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| **Security/Encryption** | — | — | — | ✓ | ✓ | — | ✓ |
| **AI/Algorithms** | — | ✓ | — | — | ✓ | — | ✓ |
| **GUI Development** | — | — | — | — | ✓ | — | ✓ |
| **Web Development** | — | — | — | — | — | — | ✓ |
| **Database Design** | — | — | — | — | ✓ | ✓ | — |
| **Testing** | — | ✓ | — | — | ✓ | — | — |

### 15.2 Soft Skills Demonstrated

| Skill | Evidence |
|-------|----------|
| **Technical Documentation** | 9 Master Reference Manuals, bilingual (EN/AR) |
| **Progressive Complexity** | 80+ projects from basic I/O to enterprise systems |
| **Multi-Language Fluency** | 8 languages/frameworks across different paradigms |
| **System Design** | Hospital Simulation, SmartCity, NEXUS TTT |
| **Algorithm Design** | 40+ competitive problems, backtracking, game trees |
| **Problem Decomposition** | Consistent layered architecture across all projects |
| **Cross-Platform Thinking** | Same problems solved in C++/C#/Java/Python for comparison |

---

## 16. Project Index

### By Language

#### Assembly (1 project)
| # | Project | Lines | Concepts |
|---|---------|-------|----------|
| 1 | 8086 Assembly Exercises | ~1,000 | MOV, arithmetic, flags, jumps, LOOP, procedures, macros |

#### C++ (15+ projects)
| # | Project | Lines | Complexity |
|---|---------|-------|-----------|
| 1 | Parameter Passing Study | ~200 | Value vs Reference vs Pointer |
| 2 | Homework Collection (10) | ~500 | Functions, templates, macros, enums |
| 3 | Conditionals & Loops | ~300 | Piecewise functions, batch processing |
| 4 | Arrays & Functions | ~400 | 2D arrays, selection sort, parallel arrays |
| 5 | Linked Lists | ~600 | Singly, Doubly, Circular |
| 6 | Stacks & Queues | ~500 | LIFO, FIFO, Priority Queue |
| 7 | Stack Applications | ~400 | Balanced parentheses, infix→postfix, evaluation |
| 8 | Hash Tables | ~500 | Chaining, double hashing, linear probing |
| 9 | Trees | ~700 | BST, AVL (4 rotation cases), template-based |
| 10 | Sorting Algorithms | ~400 | Insertion, Selection, Shell, QuickSort (2 partitions) |
| 11 | Search Algorithms | ~300 | Binary, recursive linear, hash-based |
| 12 | Backtracking | ~500 | N-Queens, Knight's Tour, Maze, Graph Coloring |
| 13 | Chemistry Toolkit | ~400 | Unit conversion, periodic table |
| 14 | Order Management | ~600 | Dynamic arrays, audit trail |
| 15 | Employee/Contact CRUD | ~800 | Raw→Smart pointer evolution |
| 16 | Hospital Simulation | ~1,200 | Enterprise architecture, embedded testing |

#### Java (9 projects)
| # | Project | Lines | Complexity |
|---|---------|-------|-----------|
| 1 | GeneratePassword | 189 | ★☆☆☆☆ |
| 2 | Al-Amal Library | 703 | ★★☆☆☆ |
| 3 | General Transportation | 808 | ★★☆☆☆ |
| 4 | Employee Date Management | 539 | ★★★☆☆ |
| 5 | Bank System | 740 | ★★★☆☆ |
| 6 | Library Management | 571 | ★★★☆☆ |
| 7 | Kingdom of Magical Programming | 845 | ★★★★☆ |
| 8 | Digital Kingdoms Academy | 761 | ★★★★☆ |
| 9 | SmartCity | 1,523 | ★★★★★ |

#### Python (10+ projects)
| # | Project | Lines | Complexity |
|---|---------|-------|-----------|
| 1 | Budget Manager Pro | ~2,500 | Personal finance, CRUD, analytics |
| 2 | Smart Login System | ~1,200 | Authentication, MVVM, themes |
| 3 | Student Academic System | ~2,900 | GPA, charts, PDF transcripts |
| 4 | QuickMart POS | ~1,800 | Invoice management, PDF export |
| 5 | Enterprise Mini Banking | ~3,000 | ACID, RBAC, multi-currency |
| 6 | Daily Task Manager | ~2,000 | Eisenhower Matrix, gamification |
| 7 | Advanced Calculator | ~1,600 | 8 modes, matrix, financial |
| 8 | Hayah Charity Tracker | ~3,000 | Multi-currency, achievements |
| 9 | Tango AI Puzzle System | ~1,500 | Expert system + BFS/DFS |
| 10 | Vexon Strategic Game | ~2,500 | Minimax α-β, 8 themes, audio |

#### Web (15+ projects)
| # | Project | Stack | Complexity |
|---|---------|-------|-----------|
| 1 | S3–S5 | HTML/CSS/Bootstrap | Foundational |
| 2 | S6–S7 | Tables, Forms, JS Calculator | Intermediate |
| 3 | S8–S10 | Multi-page, CRUD Table | Intermediate |
| 4 | Finale Exams | Full-stack integration | Capstone |
| 5 | Organick E-Commerce | Production-quality static site | Advanced |
| 6 | Calculator Pro | React 19, Zustand, 9 modes | Advanced |
| 7 | TaskFlow | React, Eisenhower Matrix | Advanced |
| 8 | Enterprise Banking | React, RBAC, multi-currency | Advanced |
| 9 | NEXUS TTT | React, 16 subsystems, AI | Advanced |

#### SQL (1 project)
| # | Project | Scope |
|---|---------|-------|
| 1 | Commercial Order Management | ER diagram, relational model, 7 queries, normalization |

#### ACM/ICPC (40+ problems)
| # | Category | Problems | Techniques |
|---|----------|----------|------------|
| 1 | Fundamentals | 13 | I/O, data types, arithmetic |
| 2 | Strings | 4 | ASCII, classification, abbreviation |
| 3 | Mathematics | 5 | GCD, logarithms, primes, modular |
| 4 | Combinatorics | 2 | Probability, factorization |
| 5 | Simulation | 4 | Chess, Nim, game logic |
| 6 | Greedy | 4 | Activity selection, group packing |
| 7 | Advanced (ICPC) | 12+ | Bitmask DP, LCA, sliding window |

---

## Appendix: Source Reference Guide

Each detailed discipline manual provides complete implementations, code annotations, and extended analysis:

| Manual | Location | Content |
|--------|----------|---------|
| ACM Competitive Programming | `ACM/ACM_Competitive_Programming_Master_Reference.md` | 40+ problem solutions, ICPC patterns |
| Assembly Language | `Assembly/Assembly_Language_Master_Reference.md` | 8086 architecture, all instructions |
| C# & OOP | `C#/MASTER_REFERENCE_MANUAL.md` | Dual-language POS system, OOP analysis |
| C++ Unified | `CPP/UNIFIED_CPP_MASTER_REFERENCE_MANUAL.md` | 15+ projects, DSA, enterprise systems |
| ICPC 2025 | `ICPC 2025/ICPC_2025_Master_Reference_Manual.md` | Redirected to ACM manual |
| Java | `JAVA/MASTER_REFERENCE_MANUAL_FINAL.md` | 9 projects, 25+ patterns, SmartCity |
| SQL | `SQL/SQL_Master_Reference_Manual.md` | Database design, normalization, queries |
| Python & AI | `Python/MASTER_REFERENCE_MANUAL.md` | 10 apps, expert systems, game AI |
| Web Development | `WEB/MASTER_REFERENCE_MANUAL.md` | HTML→React progression, 4 React apps |

---

> *This Final Unified Master Reference Manual was synthesized from 9 discipline-specific manuals totaling 30,000+ lines of documentation. All code, algorithms, system designs, and architectural decisions represent original work across a progressive engineering education. No external content or AI-generated theory was introduced.*

> *Document Version: 1.0 | Author: Abdulrahman Arfan Salem*
