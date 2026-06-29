# Java General Transportation Station — Master Reference Manual

> **Author:** Abdulrahman
> **Build System:** Apache Ant (NetBeans IDE)
> **Architecture:** Console-based public transportation management system demonstrating core OOP principles

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture & Package Structure](#2-architecture--package-structure)
3. [Class Hierarchy & Relationships](#3-class-hierarchy--relationships)
4. [Abstract Base: Driver](#4-abstract-base-driver)
5. [Concrete Driver Implementations](#5-concrete-driver-implementations)
6. [Immutable Record: BusLog](#6-immutable-record-buslog)
7. [Operation Mode Enumeration](#7-operation-mode-enumeration)
8. [Bus — The Central Domain Entity](#8-bus--the-central-domain-entity)
9. [Fleet — Collection Management](#9-fleet--collection-management)
10. [ControlRoom — Operational Intelligence](#10-controlroom--operational-intelligence)
11. [Supervisor — Monitoring Layer](#11-supervisor--monitoring-layer)
12. [Application Entry Point & Execution Flow](#12-application-entry-point--execution-flow)
13. [OOP Principles Demonstrated](#13-oop-principles-demonstrated)
14. [Design Decisions & Rationale](#14-design-decisions--rationale)

---

## 1. System Overview

A console-based public transportation management system that models a real-world general transit station. The system manages buses, drivers, fleets, and operational control through an object-oriented architecture, demonstrating foundational Java OOP principles including abstraction, inheritance, polymorphism, encapsulation, and immutability.

**Core Capabilities:**

| Feature | Description |
|---------|-------------|
| Driver Management | Abstract driver hierarchy with polymorphic behavior |
| Bus Operations | Dynamic operation mode switching based on road conditions |
| Fleet Organization | Geographic grouping of buses into named fleets |
| Route Control | Centralized control room for mode assignment and fleet transfers |
| Supervision | Real-time fleet monitoring and status reporting |
| Immutable Logging | Tamper-proof bus maintenance records since creation |

---

## 2. Architecture & Package Structure

```
GeneralTransportationStation/
├── build.xml                          # Ant build configuration
├── manifest.mf                        # JAR manifest
├── nbproject/                         # NetBeans project metadata
├── src/
│   └── generaltransportationstation/
│       ├── GeneralTransportationStation.java   # Application entry point
│       ├── Driver.java                         # Abstract driver base class
│       ├── RegularDriver.java                  # Standard driver implementation
│       ├── ProfessionalDriver.java             # Advanced driver implementation
│       ├── OperationMode.java                  # Enum for bus operation states
│       ├── Bus.java                            # Central domain entity
│       ├── BusLog.java                         # Immutable maintenance record
│       ├── Fleet.java                          # Geographic bus grouping
│       ├── ControlRoom.java                    # Operational control center
│       └── Supervisor.java                     # Fleet monitoring agent
└── test/                              # Test directory (empty)
```

**Single-Package Design:**

All classes reside within the `generaltransportationstation` package. This flat structure reflects the system's focused scope — a single bounded domain without cross-cutting concerns requiring sub-package isolation.

---

## 3. Class Hierarchy & Relationships

```
                    ┌──────────────┐
                    │    Driver     │  (abstract)
                    │  ───────────  │
                    │  - id: int    │
                    │  - name: Str  │
                    │  + drive()*   │  (abstract)
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
   ┌──────────────────┐      ┌─────────────────────┐
   │  RegularDriver    │      │  ProfessionalDriver   │
   │  ───────────────  │      │  ───────────────────  │
   │  + drive()        │      │  + drive()            │
   │                   │      │  + handleDifficult..()│
   └──────────────────┘      └─────────────────────┘

   ┌──────────────┐      ┌──────────────┐
   │  OperationMode │◄────│     Bus       │
   │  (enum)        │     │  ───────────  │
   └──────────────┘      │  - log: BusLog│
                          │  - mode       │
                          │  - driver     │
   ┌──────────────┐      │  + operate()  │
   │   BusLog      │─────►│  + setMode()  │
   │  (final)      │      │  + setDriver()│
   │  ───────────  │      └───────┬───────┘
   │  - busNumber  │              │
   │  - maintDate  │        (contained in)
   │  - drivers*   │              │
   └──────────────┘       ┌───────┴───────┐
                           │    Fleet       │
                           │  ───────────  │
                           │  - name       │
                           │  - area       │
                           │  - buses: []  │
                           │  + addBus()   │
                           │  + removeBus()│
                           └───────┬───────┘
                                   │
                      ┌────────────┴────────────┐
                      │                         │
              ┌──────────────┐        ┌──────────────┐
              │  ControlRoom  │        │  Supervisor   │
              │  ───────────  │        │  ───────────  │
              │  + setMode()  │        │  + monitor()  │
              │  + transfer() │        └──────────────┘
              └──────────────┘
```

**Relationship Types:**

| Relationship | Type | Description |
|-------------|------|-------------|
| `Driver` → `RegularDriver` / `ProfessionalDriver` | Inheritance | Abstract class extended by concrete implementations |
| `Bus` → `Driver` | Association | Bus holds a reference to its current driver |
| `Bus` → `BusLog` | Composition | Bus owns an immutable log; log cannot exist without bus |
| `Bus` → `OperationMode` | Association | Bus references an enum state for its current mode |
| `Fleet` → `Bus` | Aggregation | Fleet contains multiple buses; buses can be transferred |
| `ControlRoom` → `Bus` / `Fleet` | Dependency | ControlRoom operates on buses and fleets without owning them |
| `Supervisor` → `Fleet` | Dependency | Supervisor reads fleet state without modifying it |

---

## 4. Abstract Base: Driver

**File:** `src/generaltransportationstation/Driver.java`

The `Driver` class serves as the abstract foundation for all driver types, enforcing a contract that every driver must implement driving behavior while providing shared identity attributes.

```java
public abstract class Driver {
    private final int id;
    private final String name;

    public Driver(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public abstract void drive();

    public int getId() { return id; }
    public String getName() { return name; }

    @Override
    public String toString() {
        return "سائق [" + id + "] " + name;
    }
}
```

**Design Characteristics:**

| Aspect | Implementation | Rationale |
|--------|---------------|-----------|
| Abstract method | `drive()` | Forces each subclass to define its own driving behavior |
| Immutable fields | `final` id and name | Driver identity does not change after construction |
| Getter-only access | No setters | Identity is established at construction and never modified |
| `toString()` override | Arabic-formatted string | Enables meaningful console output when driver is referenced |

**Abstraction Contract:**

The `drive()` method is declared abstract, meaning no default implementation exists. Every concrete driver subclass **must** provide its own implementation, ensuring polymorphic dispatch at runtime.

---

## 5. Concrete Driver Implementations

### 5.1 RegularDriver

**File:** `src/generaltransportationstation/RegularDriver.java`

Represents a standard bus driver who follows prescribed routes with steady, disciplined operation.

```java
public class RegularDriver extends Driver {
    public RegularDriver(int id, String name) {
        super(id, name);
    }

    @Override
    public void drive() {
        System.out.println("   السائق العادي [" + getName() + "] يقود بشكل متزن ويتبع المسار المحدد.");
    }
}
```

**Behavior:** Drives in a balanced manner, following the designated route.

### 5.2 ProfessionalDriver

**File:** `src/generaltransportationstation/ProfessionalDriver.java`

Represents an advanced driver with specialized capabilities beyond standard operation, including handling adverse conditions.

```java
public class ProfessionalDriver extends Driver {
    public ProfessionalDriver(int id, String name) {
        super(id, name);
    }

    @Override
    public void drive() {
        System.out.println("   السائق المحترف [" + getName() + "] يستخدم مهارات متقدمة في القيادة.");
    }

    public void handleDifficultConditions() {
        System.out.println("   السائق المحترف [" + getName() + "] يتعامل مع الظروف المناخية الصعبة والازدحام بكفاءة عالية.");
    }
}
```

**Behavior:** Drives using advanced skills. Additionally provides `handleDifficultConditions()` — a method exclusive to professional drivers that enables operation under adverse weather and heavy traffic.

**Polymorphism in Action:**

When `bus.operate()` calls `currentDriver.drive()`, the JVM dispatches to the correct implementation at runtime based on the actual object type, not the reference type:

```java
Driver regular1 = new RegularDriver(1, "أحمد");
Driver pro1 = new ProfessionalDriver(3, "محمد");

regular1.drive();  // → RegularDriver.drive() — steady driving
pro1.drive();      // → ProfessionalDriver.drive() — advanced driving
```

---

## 6. Immutable Record: BusLog

**File:** `src/generaltransportationstation/BusLog.java`

The `BusLog` class implements an immutable record pattern, ensuring that bus maintenance history and original driver assignments cannot be altered after creation.

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

    public int getBusNumber() { return busNumber; }
    public String getMaintenanceDate() { return maintenanceDate; }
    public List<String> getDriversFromCreation() { return driversFromCreation; }

    @Override
    public String toString() {
        return "سجل الحافلة { رقم: " + busNumber
                + " | آخر صيانة: " + maintenanceDate
                + " | سائقون منذ التوليد: " + driversFromCreation + " }";
    }
}
```

**Immutability Guarantees:**

| Mechanism | Purpose |
|-----------|---------|
| `final class` | Prevents subclassing that could break immutability contract |
| `final` fields | Prevents reassignment after construction |
| `Collections.unmodifiableList()` | Wraps the internal list to throw `UnsupportedOperationException` on mutation attempts |
| Defensive copy | `new ArrayList<>(drivers)` creates a copy of the input list, preventing external mutation of the internal state |
| Getter-only | No setters exposed; read-only access |

**Why `final` on the Class?**

Making `BusLog` `final` prevents any subclass from overriding methods to introduce mutability. This is critical for a log record that must remain tamper-proof throughout the system's lifetime.

---

## 7. Operation Mode Enumeration

**File:** `src/generaltransportationstation/OperationMode.java`

Defines the three operational states a bus can occupy, each with an Arabic display name for console output.

```java
public enum OperationMode {
    CONGESTION_RELIEF("تخفيف الازدحام"),
    MEDIUM_SPEED("السرعة المتوسطة"),
    QUIET_OPERATION("التشغيل الهادئ");

    private final String arabicName;

    OperationMode(String arabicName) {
        this.arabicName = arabicName;
    }

    public String getArabicName() {
        return arabicName;
    }
}
```

**Mode Specifications:**

| Constant | Arabic Name | When Activated | Description |
|----------|------------|----------------|-------------|
| `CONGESTION_RELIEF` | تخفيف الازدحام | Heavy traffic detected | Bus operates in congestion-relief mode |
| `MEDIUM_SPEED` | السرعة المتوسطة | Normal conditions (default) | Standard balanced speed operation |
| `QUIET_OPERATION` | التشغيل الهادئ | Nighttime operation | Reduced-noise, low-speed mode |

**Enum Advantages:**

- **Type Safety:** Compile-time guarantee that only valid modes can be assigned
- **No Invalid States:** Unlike `String` constants, an enum cannot contain typos or undefined values
- **Self-Documenting:** Each constant carries its own display name
- **Default State:** `Bus` constructor initializes to `MEDIUM_SPEED`, the safest operational default

---

## 8. Bus — The Central Domain Entity

**File:** `src/generaltransportationstation/Bus.java`

The `Bus` class is the primary domain entity, integrating a driver, an operation mode, and an immutable log record into a single cohesive unit.

```java
public class Bus {
    private final BusLog log;
    private OperationMode currentMode;
    private Driver currentDriver;

    public Bus(int busNumber, String maintenanceDate, List<String> drivers) {
        this.log = new BusLog(busNumber, maintenanceDate, drivers);
        this.currentMode = OperationMode.MEDIUM_SPEED;
    }

    public BusLog getLog() { return log; }

    public void setOperationMode(OperationMode mode) {
        this.currentMode = mode;
        System.out.println("   الحافلة " + log.getBusNumber()
                + " تعمل الآن بنمط: [" + mode.getArabicName() + "]");
    }

    public OperationMode getCurrentMode() { return currentMode; }

    public void setDriver(Driver driver) {
        this.currentDriver = driver;
        System.out.println("   تم تعيين " + driver + " للحافلة " + log.getBusNumber());
    }

    public void operate() {
        if (currentDriver != null) {
            currentDriver.drive();
        } else {
            System.out.println("   الحافلة " + log.getBusNumber() + " بدون سائق حالياً!");
        }
    }

    @Override
    public String toString() {
        return "حافلة رقم " + log.getBusNumber()
                + " | النمط: " + currentMode.getArabicName()
                + " | السائق: " + (currentDriver != null ? currentDriver.getName() : "لا يوجد");
    }
}
```

**Field Responsibilities:**

| Field | Type | Mutability | Purpose |
|-------|------|-----------|---------|
| `log` | `BusLog` | Immutable (`final`) | Permanent maintenance and identity record |
| `currentMode` | `OperationMode` | Mutable | Current operational state, changeable by ControlRoom |
| `currentDriver` | `Driver` | Mutable | Assigned driver, changeable at runtime |

**Key Behaviors:**

| Method | Description |
|--------|-------------|
| `setOperationMode(mode)` | Updates the bus's current operational mode; delegates to ControlRoom |
| `setDriver(driver)` | Assigns a driver to this bus; accepts any `Driver` subtype via polymorphism |
| `operate()` | Delegates driving action to the current driver; handles null-driver case gracefully |
| `getLog()` | Returns the immutable log — **no setter provided**, ensuring the log cannot be replaced |

**Log Access Pattern:**

The `BusLog` is deliberately exposed only through a getter with no corresponding setter:

```java
public BusLog getLog() { return log; }
// No setLog() method exists
```

This enforces the invariant that a bus's maintenance record is permanent and cannot be swapped or cleared after construction.

---

## 9. Fleet — Collection Management

**File:** `src/generaltransportationstation/Fleet.java`

The `Fleet` class represents a geographic grouping of buses, managing a dynamic collection that supports runtime addition and removal of vehicles.

```java
public class Fleet {
    private final String name;
    private final String area;
    private final List<Bus> buses;

    public Fleet(String name, String area) {
        this.name = name;
        this.area = area;
        this.buses = new ArrayList<>();
    }

    public void addBus(Bus bus) {
        buses.add(bus);
        System.out.println("    إضافة الحافلة " + bus.getLog().getBusNumber()
                + " إلى أسطول [" + name + "]");
    }

    public boolean removeBus(Bus bus) {
        boolean removed = buses.remove(bus);
        if (removed) {
            System.out.println("    إزالة الحافلة " + bus.getLog().getBusNumber()
                    + " من أسطول [" + name + "]");
        }
        return removed;
    }

    public List<Bus> getBuses() { return buses; }
    public String getName() { return name; }
    public String getArea() { return area; }

    public void printStatus() {
        System.out.println("   أسطول: " + name + " | المنطقة: " + area
                + " | عدد الحافلات: " + buses.size());
        for (Bus b : buses) {
            System.out.println("      → " + b);
        }
    }
}
```

**Fleet Composition:**

| System Instance | Name | Area |
|----------------|------|------|
| Downtown fleet | وسط المدينة | المركز التجاري (Commercial Center) |
| Suburb fleet | الضواحي | المناطق السكنية (Residential Areas) |

**Collection Management Methods:**

| Method | Return | Description |
|--------|--------|-------------|
| `addBus(bus)` | `void` | Appends a bus to the fleet and logs the addition |
| `removeBus(bus)` | `boolean` | Removes a bus; returns `true` if found and removed |
| `getBuses()` | `List<Bus>` | Exposes the internal bus list for iteration |
| `printStatus()` | `void` | Displays fleet name, area, bus count, and each bus's status |

**Transfer Mechanism:**

Buses are transferred between fleets by removing from one and adding to another — orchestrated by `ControlRoom.transferBus()`. The fleet's `removeBus()` returns a boolean, enabling atomic transfer logic:

```java
if (from.removeBus(bus)) {
    to.addBus(bus);
}
```

This ensures a bus is only added to the destination fleet if it was successfully removed from the source, preventing duplication.

---

## 10. ControlRoom — Operational Intelligence

**File:** `src/generaltransportationstation/ControlRoom.java`

The `ControlRoom` serves as the system's decision-making authority, determining bus operation modes based on environmental conditions and orchestrating fleet-to-fleet transfers.

```java
public class ControlRoom {
    private final String name;

    public ControlRoom(String name) {
        this.name = name;
    }

    public void setMode(Bus bus, boolean isCongested, boolean isNight) {
        System.out.println("\n[غرفة التحكم] تحديد نمط الحافلة " + bus.getLog().getBusNumber() + ":");
        if (isNight) {
            bus.setOperationMode(OperationMode.QUIET_OPERATION);
        } else if (isCongested) {
            bus.setOperationMode(OperationMode.CONGESTION_RELIEF);
        } else {
            bus.setOperationMode(OperationMode.MEDIUM_SPEED);
        }
    }

    public void transferBus(Bus bus, Fleet from, Fleet to) {
        System.out.println("\n[غرفة التحكم] نقل حافلة " + bus.getLog().getBusNumber()
                + " من [" + from.getName() + "] إلى [" + to.getName() + "]:");
        if (from.removeBus(bus)) {
            to.addBus(bus);
        }
    }
}
```

**Mode Decision Logic:**

The `setMode()` method implements a priority-based decision tree:

```
isNight == true?
  ├── YES → QUIET_OPERATION (highest priority)
  └── NO
        isCongested == true?
          ├── YES → CONGESTION_RELIEF
          └── NO  → MEDIUM_SPEED (default)
```

Night operation takes precedence over congestion, reflecting real-world transit priorities where noise reduction in residential areas during nighttime supersedes traffic conditions.

**Transfer Protocol:**

`transferBus()` orchestrates the atomic removal and addition of a bus between two fleets:

1. Log the transfer operation with source and destination fleet names
2. Remove the bus from the source fleet
3. If removal succeeds, add the bus to the destination fleet
4. If removal fails (bus not in source), no action is taken on the destination

---

## 11. Supervisor — Monitoring Layer

**File:** `src/generaltransportationstation/Supervisor.java`

The `Supervisor` provides a read-only monitoring capability, observing fleet status without modifying system state.

```java
public class Supervisor {
    private final String name;

    public Supervisor(String name) {
        this.name = name;
    }

    public void monitorFleet(Fleet fleet) {
        System.out.println("\n[المشرف " + name + "] يراقب أسطول ["
                + fleet.getName() + "] عبر أنظمة التتبع:");
        fleet.printStatus();
    }
}
```

**Monitoring Scope:**

The supervisor delegates status reporting entirely to `Fleet.printStatus()`, maintaining a clean separation between observation and data ownership. The supervisor never modifies fleet contents — it only reads.

---

## 12. Application Entry Point & Execution Flow

**File:** `src/generaltransportationstation/GeneralTransportationStation.java`

The `main()` method orchestrates the complete system lifecycle, demonstrating all class interactions in a single execution sequence.

**Startup Sequence:**

```
1. System Banner
   └── Display station title in Arabic

2. Driver Creation
   ├── RegularDriver(1, "أحمد")
   ├── RegularDriver(2, "خالد")
   └── ProfessionalDriver(3, "محمد")

3. Bus Creation (with immutable logs)
   ├── Bus(101, "2024-01-15", ["خالد", "أحمد"])
   ├── Bus(102, "2024-03-10", ["سامر"])
   └── Bus(103, "2024-02-20", ["علي", "محمد"])

4. Driver Assignment
   ├── bus101 ← regular1
   ├── bus102 ← pro1
   └── bus103 ← regular2

5. Fleet Creation & Population
   ├── downtownFleet ("وسط المدينة", "المركز التجاري")
   │   ├── addBus(bus101)
   │   └── addBus(bus102)
   └── suburbFleet ("الضواحي", "المناطق السكنية")
       └── addBus(bus103)

6. ControlRoom Mode Assignment
   ├── bus101 → CONGESTION_RELIEF  (isCongested=true,  isNight=false)
   ├── bus102 → MEDIUM_SPEED       (isCongested=false, isNight=false)
   └── bus103 → QUIET_OPERATION    (isCongested=false, isNight=true)

7. Bus Operation (polymorphic drive)
   ├── bus101.operate() → RegularDriver.drive()
   ├── bus102.operate() → ProfessionalDriver.drive()
   └── bus103.operate() → RegularDriver.drive()

8. Professional Driver Special Skill
   └── pro1.handleDifficultConditions()

9. Bus Transfer (ControlRoom orchestrates)
   └── bus101: downtownFleet → suburbFleet

10. Supervisor Monitoring
    ├── supervisor.monitorFleet(downtownFleet)
    └── supervisor.monitorFleet(suburbFleet)

11. Immutable Log Display
    ├── bus101.getLog()  → full log record
    ├── bus102.getLog()  → full log record
    └── bus103.getLog()  → full log record

12. Shutdown Banner
```

**Execution Output Categories:**

| Phase | Output Source | Purpose |
|-------|--------------|---------|
| Creation | Constructors | Confirm object instantiation |
| Assignment | `setDriver()`, `setMode()` | Log state changes |
| Operation | `operate()` → `drive()` | Demonstrate polymorphic dispatch |
| Transfer | `transferBus()` | Log fleet reorganization |
| Monitoring | `monitorFleet()` | Display fleet status |
| Logs | `getLog()` | Display immutable records |

---

## 13. OOP Principles Demonstrated

This project serves as a comprehensive demonstration of core Object-Oriented Programming principles in Java:

### 13.1 Abstraction

| Implementation | Location |
|---------------|----------|
| `Driver` declared as `abstract` | `Driver.java` |
| `drive()` declared as `abstract void` | `Driver.java:15` |
| Abstract class cannot be instantiated directly | Enforced by compiler |

Abstraction defines a behavioral contract without implementation, allowing each driver type to define its own driving behavior.

### 13.2 Inheritance

| Parent | Children |
|--------|----------|
| `Driver` | `RegularDriver`, `ProfessionalDriver` |

Each subclass inherits `id`, `name`, `getId()`, `getName()`, and `toString()` from `Driver`, while providing its own `drive()` implementation.

### 13.3 Polymorphism

| Mechanism | Example |
|-----------|---------|
| Method overriding | `RegularDriver.drive()` vs `ProfessionalDriver.drive()` |
| Runtime dispatch | `currentDriver.drive()` resolves to actual type at runtime |
| Upcasting | `Driver regular1 = new RegularDriver(...)` — reference type is `Driver`, actual type is `RegularDriver` |

The `Bus.operate()` method demonstrates this:
```java
public void operate() {
    if (currentDriver != null) {
        currentDriver.drive();  // Dispatch depends on actual object type
    }
}
```

### 13.4 Encapsulation

| Class | Encapsulated Fields | Access Pattern |
|-------|-------------------|----------------|
| `Driver` | `id`, `name` | Private fields, public getters, no setters |
| `Bus` | `log`, `currentMode`, `currentDriver` | Private fields, selective getters/setters |
| `BusLog` | `busNumber`, `maintenanceDate`, `driversFromCreation` | Private fields, public getters, no setters |
| `Fleet` | `name`, `area`, `buses` | Private fields, public getters/mutation methods |
| `ControlRoom` | `name` | Private field, public getter |
| `Supervisor` | `name` | Private field, public getter |

### 13.5 Immutability

| Class | Immutability Mechanism |
|-------|----------------------|
| `BusLog` | `final` class, `final` fields, `Collections.unmodifiableList()`, defensive copy, no setters |
| `Driver` | `final` fields (id, name), no setters |

The `BusLog` is the project's primary immutability example — once created, its bus number, maintenance date, and driver list cannot be altered by any part of the system.

### 13.6 Composition

| Container | Component | Relationship |
|-----------|-----------|-------------|
| `Bus` | `BusLog` | Bus **has-a** immutable log |
| `Bus` | `Driver` | Bus **has-a** driver reference |
| `Bus` | `OperationMode` | Bus **has-a** current mode |
| `Fleet` | `Bus` (List) | Fleet **has-many** buses |

---

## 14. Design Decisions & Rationale

### 14.1 Why an Abstract Driver Class?

The `Driver` class is abstract rather than concrete because different driver types exhibit fundamentally different driving behaviors. A `RegularDriver` follows routes methodically, while a `ProfessionalDriver` employs advanced techniques and handles adverse conditions. The abstract `drive()` method enforces that every driver type must define its behavior, while the shared `id` and `name` fields avoid code duplication.

### 14.2 Why `final` on BusLog?

Making `BusLog` `final` (both the class and its fields) ensures the maintenance record is truly immutable. No subclass can override behavior to introduce mutability, and no external code can modify the record after construction. This is essential for audit trails — maintenance dates and original driver assignments must remain trustworthy throughout the system's lifetime.

### 14.3 Why Collections.unmodifiableList()?

The `driversFromCreation` list in `BusLog` is wrapped with `Collections.unmodifiableList()`. This provides runtime enforcement: any attempt to add, remove, or modify elements throws `UnsupportedOperationException`. Combined with the defensive copy (`new ArrayList<>(drivers)`), this ensures the log's driver list is completely isolated from external mutation.

### 14.4 Why a ControlRoom Separated from Bus?

Mode assignment logic is centralized in `ControlRoom` rather than embedded in `Bus`. This separation of concerns ensures that:
- `Bus` remains a passive domain entity
- Decision logic about environmental conditions lives in a dedicated controller
- The same ControlRoom can manage any number of buses and fleets

### 14.5 Why Priority-Based Mode Selection?

The `ControlRoom.setMode()` method checks `isNight` before `isCongested`, reflecting real-world transit priorities. Night operation requires noise reduction regardless of traffic, making it the highest-priority condition.

### 14.6 Why Transfer Uses Boolean Return?

`Fleet.removeBus()` returns a `boolean` indicating success. This enables `ControlRoom.transferBus()` to perform an atomic transfer — the bus is only added to the destination if it was successfully removed from the source, preventing the logical inconsistency of a bus belonging to two fleets simultaneously.

### 14.7 Why No Setter for BusLog in Bus?

The `Bus` class exposes `getLog()` but provides no `setLog()`. Once a bus is constructed with its log, that log is permanent. This design prevents accidental or intentional replacement of maintenance records, preserving data integrity.

---

## Appendix A: Class Method Reference

| Class | Method | Access | Description |
|-------|--------|--------|-------------|
| `Driver` | `drive()` | `abstract` | Polymorphic driving behavior |
| `Driver` | `getId()` | `public` | Returns driver identifier |
| `Driver` | `getName()` | `public` | Returns driver name |
| `Driver` | `toString()` | `public` | Arabic-formatted driver string |
| `RegularDriver` | `drive()` | `public` | Steady, route-following driving |
| `ProfessionalDriver` | `drive()` | `public` | Advanced skill driving |
| `ProfessionalDriver` | `handleDifficultConditions()` | `public` | Adverse condition handling |
| `BusLog` | `getBusNumber()` | `public` | Returns bus number |
| `BusLog` | `getMaintenanceDate()` | `public` | Returns last maintenance date |
| `BusLog` | `getDriversFromCreation()` | `public` | Returns immutable driver list |
| `BusLog` | `toString()` | `public` | Full log record string |
| `Bus` | `getLog()` | `public` | Returns immutable log reference |
| `Bus` | `setOperationMode(mode)` | `public` | Updates current mode |
| `Bus` | `getCurrentMode()` | `public` | Returns current mode |
| `Bus` | `setDriver(driver)` | `public` | Assigns driver to bus |
| `Bus` | `operate()` | `public` | Delegates to driver's drive() |
| `Bus` | `toString()` | `public` | Full bus status string |
| `Fleet` | `addBus(bus)` | `public` | Appends bus to fleet |
| `Fleet` | `removeBus(bus)` | `public` | Removes bus; returns success boolean |
| `Fleet` | `getBuses()` | `public` | Returns internal bus list |
| `Fleet` | `getName()` | `public` | Returns fleet name |
| `Fleet` | `getArea()` | `public` | Returns fleet area |
| `Fleet` | `printStatus()` | `public` | Displays fleet and bus status |
| `ControlRoom` | `setMode(bus, isCongested, isNight)` | `public` | Sets mode based on conditions |
| `ControlRoom` | `transferBus(bus, from, to)` | `public` | Atomic bus transfer between fleets |
| `Supervisor` | `monitorFleet(fleet)` | `public` | Displays fleet monitoring report |

---

## Appendix B: System Instance Configuration

| Instance | Type | Name | Details |
|----------|------|------|---------|
| `regular1` | `RegularDriver` | أحمد | ID: 1 |
| `regular2` | `RegularDriver` | خالد | ID: 2 |
| `pro1` | `ProfessionalDriver` | محمد | ID: 3 |
| `bus101` | `Bus` | — | Number: 101, Maintenance: 2024-01-15 |
| `bus102` | `Bus` | — | Number: 102, Maintenance: 2024-03-10 |
| `bus103` | `Bus` | — | Number: 103, Maintenance: 2024-02-20 |
| `downtownFleet` | `Fleet` | وسط المدينة | Area: المركز التجاري |
| `suburbFleet` | `Fleet` | الضواحي | Areas: المناطق السكنية |
| `controlRoom` | `ControlRoom` | غرفة التحكم المركزية | Central control |
| `supervisor` | `Supervisor` | فيصل | Fleet monitor |

---

*This manual is derived exclusively from the source code within the GeneralTransportationStation project.*