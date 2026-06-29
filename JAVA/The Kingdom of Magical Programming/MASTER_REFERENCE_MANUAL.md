# The Kingdom of Magical Programming

## Master Reference Manual — Object-Oriented Programming in Java

> **Author:** Abdulrahman
> **Language:** Java 24
> **Build System:** Maven / Apache Ant (NetBeans)
> **Scope:** OOP homework assignment — Kingdom domain modeling

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Evolution](#2-architecture-evolution)
3. [OOP Concepts Demonstrated](#3-oop-concepts-demonstrated)
4. [Simple Solution — Single-Package Design](#4-simple-solution--single-package-design)
5. [Reference Solution — Provided Model](#5-reference-solution--provided-model)
6. [Extended Solution — Multi-Package Enterprise Design](#6-extended-solution--multi-package-enterprise-design)
7. [Class Hierarchy & Relationships](#7-class-hierarchy--relationships)
8. [Design Patterns & Service Layer](#8-design-patterns--service-layer)
9. [Persistence & File I/O](#9-persistence--file-io)
10. [User Interface Layer](#10-user-interface-layer)
11. [UML Sequence Diagram](#11-uml-sequence-diagram)

---

## 1. Project Overview

This project models a medieval kingdom domain to demonstrate mastery of Object-Oriented Programming principles in Java. The domain consists of characters (Kings, Knights, Wizards, Advisors), infrastructure (Castles, Towers, Gates), governance (Councils), and financial systems (Treasury).

Three implementations exist, each representing a different level of architectural sophistication:

| Solution | Package Structure | Key Feature |
|---|---|---|
| **Simple Solve** | Single package | Inner classes, basic OOP |
| **Main (Reference)** | Single package | Provided model, composition vs aggregation |
| **Extended Solve** | Multi-package | File I/O, console UI, service layer, generics |

---

## 2. Architecture Evolution

The three implementations demonstrate a clear progression in engineering maturity:

### Phase 1 — Simple Solve
All classes reside in `com.mycompany.kingdom`. Castle uses **inner classes** for `Gate` and `Tower`. No persistence. Minimal abstraction — `Person` is abstract, but `Advisor` is an empty class.

### Phase 2 — Reference Solution (Main)
Moves to a flat `main` package. Introduces explicit composition (`Castle` owns `Gate`/`Tower` as separate top-level classes) and aggregation (`Council` holds an `Advisor[]`). Demonstrates the distinction between these two relationship types through code comments.

### Phase 3 — Extended Solve
Full multi-package Maven project with seven packages: `characters`, `council`, `infrastructure`, `interfaces`, `logic`, `manager`, `records`, `ui`. Adds file-based persistence, a console UI, a service layer, generic uniqueness checking, and domain logic (Tasks, Events, Achievements).

---

## 3. OOP Concepts Demonstrated

### 3.1 Abstraction

`Person` is declared `abstract` with an abstract `speak()` method, enforcing that all subclasses provide their own voice behavior.

```java
// Extended Solve — characters/Person.java
public abstract class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public abstract void speak();
}
```

The reference solution uses a concrete `Person` with a default implementation — demonstrating the difference between **abstract base classes** and **concrete base classes**.

### 3.2 Inheritance

All character types extend `Person`:

```
Person (abstract)
├── King
├── Knight
└── Wizard
```

Each subclass calls `super(name, age)` and overrides `speak()` with role-specific behavior.

### 3.3 Polymorphism

The `speak()` method is overridden in every subclass. At runtime, the correct implementation is dispatched based on the actual object type:

```java
// King — "I am King Arthur, ruling with wisdom and order."
// Knight — "I am Knight Lancelot, my voice echoes bravery."
// Wizard — "I am Wizard Merlin, speaking in mysterious spells."
```

This is demonstrated in `Main.java` where a single loop or sequential calls invoke different behaviors on the same base type.

### 3.4 Encapsulation

Fields are declared `private` with controlled access through getters and setters:

```java
// Treasury — private gold with controlled deposit/withdraw
public class Treasury {
    private int gold;

    public void deposit(int amount) {
        if (amount > 0) gold += amount;
    }

    public void withdraw(int amount) {
        if (amount > 0 && amount <= gold) gold -= amount;
    }
}
```

The `Person` class uses `protected` fields to allow subclass access while preventing external modification.

### 3.5 Interfaces

The `Fightable` interface defines a contract for combat-capable characters:

```java
public interface Fightable {
    void attack();
}
```

`Knight` and `Wizard` implement `Fightable`, while `King` does not — modeling that kings command rather than fight directly. This demonstrates **interface segregation** and **role-based capability assignment**.

### 3.6 Composition vs. Aggregation

The reference solution explicitly distinguishes these two relationships:

**Composition** — `Castle` owns `Gate` and `Tower` internally. These components are created inside the Castle constructor and cannot exist independently:

```java
// Castle.java — Composition
public class Castle {
    private Gate gate;
    private Tower tower;

    public Castle() {
        this.gate = new Gate();
        this.tower = new Tower();
    }
}
```

**Aggregation** — `Council` holds `Advisor` objects that are created externally and passed in. Advisors exist independently of the Council:

```java
// Council.java — Aggregation
public class Council {
    private Advisor[] advisors;

    public Council(Advisor[] advisors) {
        this.advisors = advisors;
    }
}
```

The simple solve demonstrates composition through **inner classes**, where `Gate` and `Tower` are defined as private inner classes of `Castle`:

```java
public class Castle {
    private Gate gate;
    private Tower tower;

    private class Gate {
        public void open() { System.out.println("Gate has beeen open."); }
    }

    private class Tower {
        public void defend() { System.out.println("The twoer defends the castle."); }
    }
}
```

### 3.7 Inner Classes

The simple solution uses non-static inner classes for `Gate` and `Tower` inside `Castle`. This demonstrates:
- Encapsulation of implementation details within the enclosing class
- Tight coupling between container and components (appropriate for composition)
- Reduced namespace pollution

---

## 4. Simple Solution — Single-Package Design

### Package: `com.mycompany.kingdom`

All classes in one flat package. 10 source files.

### Class Summary

| Class | Extends / Implements | Purpose |
|---|---|---|
| `Person` | — (abstract) | Base class with `name`, `age`, abstract `speak()` |
| `King` | `Person` | Ruler with a `Council` |
| `Knight` | `Person`, `Fightable` | Fighter serving a `King` |
| `Wizard` | `Person`, `Fightable` | Magic user |
| `Advisor` | — (empty) | Placeholder for council members |
| `Council` | — | Manages a `List<Advisor>` |
| `Castle` | — | Contains inner `Gate` and `Tower` classes |
| `Treasury` | — | Gold management with deposit/withdraw |
| `Fightable` | — (interface) | Contract: `void attack()` |
| `Kingdom` | — (main) | Entry point, demo execution |

### Entry Point

```java
public class Kingdom {
    public static void main(String[] args) {
        King king = new King("Rice", 60);
        king.speak();

        king.getCouncil().addAdvisor(new Advisor("Wisdom Advisor"));
        king.getCouncil().addAdvisor(new Advisor("Logic Advisor"));

        Knight knight = new Knight("Gabi", 35, king);
        knight.speak();
        knight.attack();

        Wizard wizard = new Wizard("Sam", 50);
        wizard.speak();
        wizard.attack();

        Treasury treasury = new Treasury(1000);
        treasury.deposit(500);
        treasury.withdraw(300);
        System.out.println("Total Gold balance: " + treasury.getGold());

        Castle castle = new Castle();
        castle.describe();
        king.getCouncil().listAdvisors();
    }
}
```

### Key Observations

- `Advisor` is an empty class — demonstrates early-stage modeling where the class exists as a structural placeholder
- `Council` uses `ArrayList<Advisor>` — dynamic sizing vs the reference solution's fixed array
- `Castle` inner classes are `private` — full encapsulation of components
- `Wizard` overrides `attack()` without the `@Override` annotation (simple solve), while the extended solve adds it

---

## 5. Reference Solution — Provided Model

### Package: `main`

The provided reference solution in `The solve/Main`. 9 source files.

### Class Summary

| Class | Relationship | Purpose |
|---|---|---|
| `Person` | Base class | Concrete with default `speak()` |
| `King` | extends `Person` | Holds a `Council` (composition) |
| `Knight` | extends `Person` | Holds a `King` reference (aggregation) |
| `Wizard` | extends `Person` | Standalone magic user |
| `Advisor` | Standalone | Simple name holder |
| `Council` | Standalone | Holds `Advisor[]` (aggregation) |
| `Castle` | Standalone | Owns `Gate`/`Tower` (composition) |
| `Treasury` | Standalone | Gold management |
| `Main` | Entry point | Demo execution |

### Design Decisions

- `Person` is **concrete**, not abstract — `speak()` has a default implementation
- `Castle`, `Gate`, `Tower` are all top-level classes in the same file (`Castle.java`) — demonstrating Java's ability to have multiple classes per file (one public)
- `Council` uses a **fixed-size array** (`Advisor[]`) rather than a collection
- `King` requires a `Council` in its constructor — mandatory composition
- `Knight` requires a `King` in its constructor — explicit dependency declaration

### Entry Point

```java
public class Main {
    public static void main(String[] args) {
        Advisor a1 = new Advisor("Alfred");
        Advisor a2 = new Advisor("Baldur");
        Advisor[] advisors = { a1, a2 };
        Council council = new Council(advisors);

        King king = new King("Arthur", 60, council);
        Knight knight = new Knight("Lancelot", 35, king);
        Wizard wizard = new Wizard("Merlin", 120);

        Castle castle = new Castle();

        king.speak();
        knight.speak();
        wizard.speak();

        Treasury treasury = new Treasury(500);
        treasury.addGold(200);
        treasury.withdrawGold(300);
    }
}
```

---

## 6. Extended Solution — Multi-Package Enterprise Design

### Package Structure

```
Kingdom/
├── src/main/java/
│   ├── com/mycompany/kingdom/
│   │   └── Kingdom.java              ← Entry point
│   ├── characters/
│   │   ├── Person.java               ← Abstract base
│   │   ├── King.java
│   │   ├── Knight.java
│   │   ├── Wizard.java
│   │   └── Advisor.java
│   ├── council/
│   │   ├── Council.java
│   │   └── CouncilService.java
│   ├── infrastructure/
│   │   ├── Castle.java
│   │   ├── Gate.java
│   │   ├── Tower.java
│   │   └── Treasury.java
│   ├── interfaces/
│   │   └── Fightable.java
│   ├── logic/
│   │   ├── Task.java
│   │   ├── Event.java
│   │   └── Achievement.java
│   ├── manager/
│   │   └── KingdomManager.java
│   ├── records/
│   │   ├── RecordManager.java
│   │   └── Transaction.java
│   └── ui/
│       └── ConsoleUI.java
├── records/                           ← Runtime data files
│   ├── kings.txt
│   ├── knights.txt
│   ├── wizards.txt
│   ├── advisors.txt
│   └── councils.txt
└── pom.xml                           ← Maven config (Java 24)
```

### 6.1 Characters Package

#### `Person` — Abstract Base Class

```java
public abstract class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) { ... }
    public abstract void speak();
    public String getName() { return name; }
    public int getAge() { return age; }
    public String toRecord() { return name + "," + age; }
}
```

Key additions over the simple solution:
- `abstract` keyword enforces implementation in subclasses
- `toRecord()` method for serialization
- Getter methods for controlled access

#### `King` — Ruler with Council

```java
public class King extends Person {
    private Council council;

    public King(String name, int age) {
        super(name, age);
        this.council = new Council(name);
    }

    public static King fromRecord(String line) {
        String[] parts = line.split(",");
        return new King(parts[0], Integer.parseInt(parts[1]));
    }
}
```

- Creates its own `Council` internally (composition)
- `fromRecord()` static factory method for deserialization

#### `Knight` — Fighter with Liege

```java
public class Knight extends Person implements Fightable {
    private King king;

    public Knight(String name, int age, King king) {
        super(name, age);
        this.king = king;
    }

    @Override
    public void attack() {
        System.out.println("Knight " + name + " attacks with a sword!");
    }

    public static Knight fromRecord(String line, King linkedKing) { ... }
}
```

- Implements `Fightable` — can fight
- Holds a reference to the `King` it serves
- `fromRecord()` accepts a pre-resolved `King` object (dependency injection)

#### `Wizard` — Magic Fighter

```java
public class Wizard extends Person implements Fightable {
    @Override
    public void attack() {
        System.out.println("Wizard " + name + " casts a magical attack!");
    }

    public static Wizard fromRecord(String line) { ... }
}
```

- Standalone — no king dependency
- Implements `Fightable` with magic-based attack

#### `Advisor` — Counsel Provider

```java
public class Advisor {
    private String name;
    private String assignedToKing;

    public void advise() { ... }
    public String toRecord() { return name + "," + (assignedToKing != null ? assignedToKing : "none"); }
    public static Advisor fromRecord(String line) { ... }
}
```

- Not a `Person` subclass — advisors are structural, not character-based
- Tracks which king they serve via string reference
- Full serialization support

### 6.2 Interfaces Package

#### `Fightable`

```java
public interface Fightable {
    void attack();
}
```

Implemented by `Knight` and `Wizard`. Demonstrates **interface-based polymorphism** — code can operate on `Fightable` references without knowing the concrete type.

### 6.3 Infrastructure Package

#### `Castle` — Composition

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

Components are **separate top-level classes** (not inner classes), demonstrating composition through class ownership rather than nesting.

#### `Treasury` — Encapsulated State

```java
public class Treasury {
    private int gold;
    private List<Transaction> history;

    public void deposit(int amount) {
        if (amount > 0) {
            gold += amount;
            history.add(new Transaction("Deposit", amount));
        }
    }

    public void withdraw(int amount) {
        if (amount > 0 && amount <= gold) {
            gold -= amount;
            history.add(new Transaction("Withdraw", amount));
        }
    }
}
```

Key evolution: maintains a `Transaction` history — each operation is recorded with a timestamp. This demonstrates **audit logging** and **immutable record keeping** through the `Transaction` class.

### 6.4 Logic Package

#### `Task` — State Machine

```java
public class Task {
    private String description;
    private String assignedTo;
    private TaskStatus status;

    public enum TaskStatus {
        PENDING, IN_PROGRESS, COMPLETED, FAILED
    }

    public void start() { status = TaskStatus.IN_PROGRESS; }
    public void complete() { status = TaskStatus.COMPLETED; }
    public void fail() { status = TaskStatus.FAILED; }
}
```

Demonstrates **enums** for type-safe state management and a **state machine** pattern for task lifecycle.

#### `Event` — Timestamped Domain Event

```java
public class Event {
    private String title;
    private String description;
    private LocalDateTime timestamp;
}
```

Uses `java.time.LocalDateTime` for immutable timestamps. Records kingdom events with automatic time capture.

#### `Achievement` — Recognition Record

```java
public class Achievement {
    private String title;
    private String earnedBy;
    private String description;
}
```

Simple value object for tracking character accomplishments.

---

## 7. Class Hierarchy & Relationships

### Inheritance Tree

```
Person (abstract)
├── King
│   └── [has-a] Council
│       └── [has-many] Advisor
├── Knight (implements Fightable)
│   └── [has-a] King (reference)
└── Wizard (implements Fightable)
```

### Relationship Types

| From | To | Type | Mechanism |
|---|---|---|---|
| Castle | Gate, Tower | **Composition** | Created internally, lifecycle-bound |
| Council | Advisor | **Aggregation** | Passed in externally, independent lifecycle |
| Knight | King | **Association** | Reference to served king |
| Advisor | King | **Association** | String reference to assigned king |
| KingdomManager | All entities | **Association** | Central management hub |
| Treasury | Transaction | **Composition** | Created on each operation |

---

## 8. Design Patterns & Service Layer

### 8.1 Manager Pattern — `KingdomManager`

Central orchestration class that manages all kingdom entities:

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

Responsibilities:
- Entity lifecycle management (add, find, check existence)
- File loading on initialization
- Treasury operations delegation
- Event and task management
- Display/listing operations

### 8.2 Service Pattern — `CouncilService`

Encapsulates council-specific operations:

```java
public class CouncilService {
    public void assignAdvisorToKing(Advisor advisor, King king) {
        king.getCouncil().addAdvisor(advisor);
        saveAdvisor(advisor);
    }

    public void showAdvisorsOfKing(King king) { ... }
    public void saveAdvisor(Advisor advisor) { ... }
    public List<Advisor> loadAllAdvisors() { ... }
}
```

Separates business logic (assignment) from persistence (save/load) while keeping related operations cohesive.

### 8.3 Generic Uniqueness Checker

```java
private <T> boolean isUnique(List<T> list, T candidate, Function<T, String> keyExtractor) {
    String candidateKey = keyExtractor.apply(candidate);
    return list.stream()
            .map(keyExtractor)
            .noneMatch(existingKey -> existingKey.equalsIgnoreCase(candidateKey));
}
```

Demonstrates:
- **Generics** — works with any entity type
- **Functional interface** (`Function<T, String>`) — extracts comparison key
- **Stream API** — declarative collection processing
- **Method references** — `King::getName`, `Knight::getName`, etc.

### 8.4 Serialization Pattern

Every domain entity implements a consistent serialization contract:

```java
public String toRecord() { ... }           // Object → String
public static T fromRecord(String line) { ... }  // String → Object
```

This is a manual implementation of the **Data Transfer Object (DTO)** pattern, enabling:
- File-based persistence
- Data exchange between layers
- Reconstruction from flat-file storage

---

## 9. Persistence & File I/O

### Record Format

All records use comma-separated values (CSV) without headers:

```
# kings.txt
abdulrahman,50

# knights.txt (empty)
# wizards.txt (empty)
# advisors.txt (empty)
```

### RecordManager — File Operations

```java
public class RecordManager {
    public static void appendLine(String filename, String line) { ... }
    public static List<String> readAllLines(String filename) { ... }
    public static void overwriteFile(String filename, List<String> lines) { ... }
}
```

Key implementation details:
- Uses `java.nio.file.Files` for reading
- Uses `BufferedWriter` with `FileWriter` for writing
- Auto-creates parent directories with `mkdirs()`
- Error handling with try-with-resources
- Append mode for additive records, overwrite for full rewrites

### Data Loading Sequence

```
KingdomManager()
├── loadKingsFromFile()     → reads records/kings.txt
├── loadKnightsFromFile()   → reads records/knights.txt, links to King by name
├── loadWizardsFromFile()   → reads records/wizards.txt
└── loadAdvisorsFromFile()  → reads records/advisors.txt, assigns to King via CouncilService
```

The loading order matters — Kings must be loaded before Knights and Advisors since they reference Kings by name.

---

## 10. User Interface Layer

### ConsoleUI — Menu-Driven Interface

```java
public class ConsoleUI {
    private KingdomManager manager;
    private Scanner scanner;
}
```

### Menu Options

| Option | Action | Manager Method |
|---|---|---|
| 1 | Add King | `addKing()` |
| 2 | Add Knight | `addKnight()` |
| 3 | Add Wizard | `addWizard()` |
| 4 | Assign Advisor | `assignAdvisorToKing()` |
| 5 | Show Treasury | `showTreasuryStatus()` |
| 6 | Assign Task | `assignTask()` |
| 7 | Log Event | `logEvent()` |
| 8 | List All | `listKings/Knights/Wizards/Advisors()` |
| 0 | Exit | — |

### Input Validation

- Duplicate name checking before adding entities
- King existence verification before assigning Knights or Advisors
- Null-safe king lookup with user feedback

---

## 11. UML Sequence Diagram

The following sequence illustrates the initialization flow:

```
ConsoleUI → KingdomManager: new KingdomManager()

KingdomManager → RecordManager: readAllLines("records/kings.txt")
RecordManager → KingdomManager: List<String>
loop for each line
    KingdomManager → King: new King(name, age)
    KingdomManager → kings: add(King)
end

KingdomManager → RecordManager: readAllLines("records/knights.txt")
RecordManager → KingdomManager: List<String>
loop for each line
    KingdomManager → KingdomManager: findKingByName(kingName)
    KingdomManager → Knight: new Knight(name, age, king)
    KingdomManager → knights: add(Knight)
end

KingdomManager → RecordManager: readAllLines("records/wizards.txt")
RecordManager → KingdomManager: List<String>
loop for each line
    KingdomManager → Wizard: new Wizard(name, age)
    KingdomManager → wizards: add(Wizard)
end

KingdomManager → RecordManager: readAllLines("records/advisors.txt")
RecordManager → KingdomManager: List<String>
loop for each line
    KingdomManager → KingdomManager: findKingByName(kingName)
    KingdomManager → Advisor: new Advisor(name)
    KingdomManager → CouncilService: assignAdvisorToKing(advisor, king)
    KingdomManager → advisors: add(Advisor)
end
```

---

## Appendix: File Inventory

### Simple Solve — 10 Java Files

| File | Lines | Purpose |
|---|---|---|
| `Person.java` | 21 | Abstract base class |
| `King.java` | 30 | King with Council |
| `Knight.java` | 28 | Knight with Fightable |
| `Wizard.java` | 25 | Wizard with Fightable |
| `Fightable.java` | 13 | Combat interface |
| `Advisor.java` | 13 | Empty placeholder |
| `Council.java` | 25 | Advisor list manager |
| `Castle.java` | 35 | Inner class composition |
| `Treasury.java` | 29 | Gold management |
| `Kingdom.java` | 37 | Main entry point |

### Reference Solution — 9 Java Files

| File | Lines | Purpose |
|---|---|---|
| `Person.java` | 19 | Concrete base class |
| `King.java` | 18 | King with Council |
| `Knight.java` | 28 | Knight with King reference |
| `Wizard.java` | 23 | Wizard |
| `Advisor.java` | 13 | Name holder |
| `Council.java` | 16 | Aggregation demo |
| `Castle.java` | 23 | Composition demo + inner Gate/Tower |
| `Treasury.java` | 22 | Encapsulation demo |
| `Main.java` | 46 | Demo entry point |

### Extended Solve — 19 Java Files

| File | Lines | Purpose |
|---|---|---|
| `Person.java` | 28 | Abstract base with toRecord() |
| `King.java` | 29 | King with Council + fromRecord() |
| `Knight.java` | 34 | Knight + Fightable + fromRecord() |
| `Wizard.java` | 41 | Wizard + Fightable + serialization |
| `Advisor.java` | 51 | Advisor with king assignment |
| `Fightable.java` | 12 | Combat interface |
| `Council.java` | 30 | Advisor list with king binding |
| `CouncilService.java` | 50 | Service layer for council ops |
| `Castle.java` | 27 | Composition with external classes |
| `Gate.java` | 15 | Gate component |
| `Tower.java` | 15 | Tower component |
| `Treasury.java` | 48 | Gold + transaction history |
| `Task.java` | 58 | Task with enum state machine |
| `Event.java` | 43 | Timestamped domain event |
| `Achievement.java` | 41 | Character achievement record |
| `KingdomManager.java` | 235 | Central orchestrator |
| `RecordManager.java` | 69 | File I/O utility |
| `Transaction.java` | 42 | Treasury transaction record |
| `ConsoleUI.java` | 163 | Menu-driven interface |
| `Kingdom.java` | 20 | Main entry point |

---

*This manual was generated exclusively from the source files within the project directory.*
