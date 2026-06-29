# Digital Kingdoms Academy

## Master Reference Manual

**Author:** Abdulrahman  
**Language:** Java 24  
**Build System:** Apache Maven  
**Project Type:** Object-Oriented Programming — Final Project

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Module 1 — HeroCreationSystem](#3-module-1--herocreationsystem)
   - 3.1 Core Domain Model
   - 3.2 Entity Hierarchy and Polymorphism
   - 3.3 HeroStats — Immutable Value Object
   - 3.4 HeroState — Immutable State Management
   - 3.5 HeroMetadata — Audit Trail
   - 3.6 Status Effect System (Strategy + Factory Patterns)
   - 3.7 Hero Creation Pipeline (Factory + Validator Patterns)
   - 3.8 Serialization and Persistence
   - 3.9 Registry and Query Services
   - 3.10 Console Input Adapter
4. [Module 2 — HeroManagementSystem](#4-module-2--heromanagementsystem)
   - 4.1 HeroManager — Facade for CRUD Operations
   - 4.2 HeroActionExecutor — Action Coordination
   - 4.3 HeroActionDispatcher — Dispatch Chain
   - 4.4 HeroQueryService Interface and In-Memory Implementation
   - 4.5 HeroFilter — Null-Safe Query Facade
   - 4.6 HeroArchiverTracker — Deletion and Update History
   - 4.7 ArchivedHero and HeroUpdateRecord DTOs
   - 4.8 HeroActionLogService — Audit Logging
   - 4.9 MVC Presentation Layer (TableModel, Presenter, Controller, SelectionModel)
5. [Module 3 — SimulationArena](#5-module-3--simulationarena)
   - 5.1 SimulationEngine — Full Battle Orchestrator
   - 5.2 BattleSimulator — Single Round Combat
   - 5.3 TurnManager — Cyclic Turn Rotation
   - 5.4 EffectResolutionEngine — Status Effect Resolution
   - 5.5 VictoryCondition — Strategy Interface
   - 5.6 BattleScenario — Predefined Scenario Configuration
   - 5.7 Simulation Config, Result, Log, Event DTOs
   - 5.8 SimulationUIAdapter — Display Bridge
6. [Module 4 — BackupAndRetrievalSystem](#6-module-4--backupandretrievalsystem)
   - 6.1 Archiving — Password-Protected File Persistence
   - 6.2 HeroSystemIntegration — System Bridge
7. [Module 5 — UI](#7-module-5--ui)
   - 7.1 HeroDataManager — CLI Menu Interface
8. [Application Entry Point](#8-application-entry-point)
9. [Design Patterns Reference](#9-design-patterns-reference)
10. [OOP Principles Demonstrated](#10-oop-principles-demonstrated)

---

## 1. Project Overview

Digital Kingdoms Academy is a comprehensive Java application that models a hero management ecosystem within a fantasy academy setting. The system supports hero creation with distinct classes (Warrior, Wizard, Archer), each possessing unique combat mechanics and behavioral characteristics. Heroes can be managed through a full CRUD lifecycle, engaged in automated battle simulations governed by configurable victory conditions, and persisted via password-protected file archiving.

The project demonstrates mastery of core Object-Oriented Programming principles — encapsulation, inheritance, polymorphism, and abstraction — alongside advanced design patterns including Factory, Strategy, Observer, Adapter, and Facade.

**Key capabilities:**

- **Hero Creation** with validation, unique ID generation, and console input adaptation
- **Status Effect Engine** supporting Poisoned, Burned, Stunned, and Cleanse effects with duration-based lifecycle management
- **Battle Simulation** with turn-based combat, effect resolution, and configurable victory conditions
- **Management Layer** providing CRUD, filtering, action dispatching, and audit logging
- **Persistence Layer** with password-protected file-based archiving for heroes, battles, and evolutions
- **Presentation Layer** following MVC principles with table models, presenters, and controllers

---

## 2. System Architecture

The system is organized into five distinct packages, each representing a bounded context within the domain:

```
DigitalKingdomsAcademy/
├── HeroCreationSystem/          # Core domain: entities, effects, creation, serialization
├── HeroManagementSystem/        # Application layer: CRUD, actions, queries, MVC
├── SimulationArena/             # Simulation engine: battle, turns, effects, victory
├── BackupAndRetrievalSystem/    # Persistence: password-protected file archiving
├── UI/                          # User interface: CLI menu system
└── s/digitalkingdomsacademy/    # Entry point: main class
```

**Dependency flow (high-level):**

```
UI → BackupAndRetrievalSystem
UI → HeroManagementSystem → HeroCreationSystem
SimulationArena → HeroCreationSystem
BackupAndRetrievalSystem → HeroCreationSystem
BackupAndRetrievalSystem → HeroManagementSystem
```

The `HeroCreationSystem` package is the foundational layer with zero external dependencies, making it the stable core upon which all other modules depend.

---

## 3. Module 1 — HeroCreationSystem

### 3.1 Core Domain Model

The domain model follows a layered architecture where immutable value objects (`HeroStats`, `HeroMetadata`, `HeroState`) compose the state of mutable `Entity` objects. This separation ensures that state transitions are explicit and traceable.

**Key classes:**

| Class | Role |
|-------|------|
| `Entity` | Abstract base class for all hero types |
| `HeroStats` | Immutable value object holding power and energy |
| `HeroState` | Immutable value object holding alive status and active effects |
| `HeroMetadata` | Immutable value object holding creation audit data and traits |
| `HeroSummary` | Read-only projection of an Entity for display purposes |
| `HeroInput` | DTO encapsulating creation/update input parameters |
| `ValidationResult` | Result object for validation outcomes |
| `ActionResult` | Result object for combat action outcomes |

### 3.2 Entity Hierarchy and Polymorphism

`Entity` is the abstract base class implementing the `Fightable` interface. It defines the contract for all hero types while providing shared behavior.

**`Fightable` Interface:**

```java
public interface Fightable {
    ActionResult attack(Entity target);
    ActionResult performAction(Entity target);
}
```

**`Entity` Abstract Class** — key design decisions:

- **Immutable identity:** `id`, `name`, and `age` are `final` fields set in the constructor. Identity cannot change after creation.
- **Mutable state:** `stats` and `state` are replaceable via setter methods (`setState`, `reduceEnergy`, `reducePower`), enabling state transitions while maintaining the overall object reference.
- **Age modifier:** A simple heuristic applies a 10% bonus for heroes under 25 and a 10% penalty for heroes over 50, reflecting physical prime.
- **Trait-based immunity:** `applyConditionalEffect` checks for traits prefixed with `"ImmuneTo"` before applying effects, implementing a domain rule via metadata.
- **Clone support:** `cloneWithNewId` enables creating modified copies while preserving the original's identity — used during update operations.

**Concrete Implementations:**

| Class | Type | Attack Modifier | Special Ability |
|-------|------|----------------|-----------------|
| `Warrior` | `WARRIOR` | 1.0x base power | `performAction`: +5 bonus damage, "Mighty Blow" |
| `Wizard` | `WIZARD` | 1.0x base power | `performAction`: 1.3x multiplier, costs 5 energy |
| `Archer` | `ARCHER` | 0.9x base power | `performAction`: 0.6x multiplier, "Evasive Shot" |

Each subclass implements `getType()`, `attack()`, `performAction()`, and `cloneWithNewId()`, fulfilling the polymorphic contract while varying combat behavior.

### 3.3 HeroStats — Immutable Value Object

`HeroStats` encapsulates two integer properties — `power` and `energy` — and provides `withPower` and `withEnergy` copy methods that return new instances. This ensures all state changes to stats are visible as object replacements rather than in-place mutations, supporting the immutable value object pattern.

```java
public HeroStats withEnergy(int newEnergy) {
    return new HeroStats(this.power, newEnergy);
}
```

This design prevents accidental side effects when multiple components hold references to the same stats object.

### 3.4 HeroState — Immutable State Management

`HeroState` manages two concerns:
- **Vitality:** A boolean `alive` flag marking whether the hero is active
- **Active Effects:** An immutable list of `StatusEffect` instances

State transitions are performed via copy methods:

| Method | Purpose |
|--------|---------|
| `withEffect(effect)` | Adds a new effect, returns new state |
| `withEffects(list)` | Replaces all effects, returns new state |
| `withoutEffect(name)` | Removes a named effect, returns new state |
| `markDead()` | Sets alive to false, returns new state |
| `describeEffects()` | Returns comma-separated effect names for display |

The use of `List.copyOf` in the constructor and `Collections.unmodifiableList` for the getter ensures that the internal effect list cannot be externally mutated.

### 3.5 HeroMetadata — Audit Trail

`HeroMetadata` stores immutable creation context:

- `createdAt`: Timestamp of creation
- `createdBy`: Identifier of the creating agent (e.g., `"system"`)
- `traits`: A list of trait strings enabling trait-based behavior checks

The `hasTrait(String)` method supports the immunity system used in `Entity.applyConditionalEffect`.

### 3.6 Status Effect System (Strategy + Factory Patterns)

The status effect system demonstrates the **Strategy Pattern** through polymorphic effects and the **Factory Pattern** through centralized effect creation.

**`StatusEffect` Interface:**

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

**Concrete Effects:**

| Effect | Default Duration | Per-Tick Damage | Behavior |
|--------|-----------------|-----------------|----------|
| `PoisonedEffect` | 3 turns | 5 energy | Continuous energy drain |
| `BurnedEffect` | 3 turns | 3 energy | Moderate energy drain |
| `StunnedEffect` | 1 turn | 0 | Disables action entirely |
| `CleanseEffect` | Instant | 0 | Removes a target effect |

Each effect implements `apply` (applies its per-tick logic), `tick` (decrements duration), and `isExpired` (returns true when duration reaches zero). The `withDuration` method enables creating effect instances with custom durations.

**`EffectFactory` — Static Factory:**

The `EffectFactory` provides centralized creation:

```java
public static StatusEffect create(String effectName)          // Create by name
public static StatusEffect createWithDuration(String name, int duration)  // Create with custom duration
public static StatusEffect createCleanse(String targetEffect) // Create cleanse for specific effect
public static StatusEffect createForAction(HeroActionType action) // Create effect for action type
```

The `createForAction` method maps action types to associated effects:
- `CAST_SPELL` → Burned (3 turns)
- `HEAL` → Regeneration (2 turns)
- `DEFEND` → Shield (1 turn)

**`HeroStateEffectEngine` — Effect Lifecycle Manager:**

This engine orchestrates the full effect lifecycle on an entity:

1. **Apply:** Adds a new effect, respecting immunity traits
2. **Update:** Iterates all active effects, applies each, advances duration, removes expired ones
3. **Returns:** List of effect names that were removed due to expiration

```java
public void applyEffect(Entity hero, StatusEffect effect) {
    if (!hero.isAlive()) return;
    String immunityTrait = "ImmuneTo" + effect.getName();
    if (hero.hasTrait(immunityTrait)) return;
    hero.setState(hero.getState().withEffect(effect));
}
```

### 3.7 Hero Creation Pipeline (Factory + Validator Patterns)

Hero creation follows a validated pipeline:

```
HeroInput → HeroValidator → ValidationResult → HeroFactory → Entity → HeroRegistry
```

**`HeroValidator`** enforces creation constraints:

| Rule | Condition |
|------|-----------|
| Name | Non-null, non-blank |
| Age | Between 10 and 100 |
| Power | Non-negative |
| Energy | Non-negative |
| Type | Non-null |
| Traits | Non-blank strings |
| Initial Effects | Known effect names (validated via `EffectFactory`) |

**`ValidationResult`** provides a value object for validation outcomes with static factory methods `success()` and `failure(List<String> errors)`.

**`HeroFactory`** orchestrates creation:

1. Validates input via `HeroValidator`
2. Generates a unique ID via `HeroIdGenerator`
3. Constructs `HeroStats`, `HeroMetadata`, and `HeroState`
4. Uses a `switch` expression to instantiate the correct subclass (`Warrior`, `Wizard`, `Archer`)

**`HeroIdGenerator`** ensures uniqueness using a `HashSet<String>` of previously generated UUIDs, with `synchronized` access for thread safety.

**`HeroInputConsoleAdapter`** provides a console-based input adapter that reads validated input from `System.in`, handling type conversion, range validation, and empty-input retries.

### 3.8 Serialization and Persistence

**`HeroSerializer`** provides semicolon-delimited serialization:

```
id;name;age;power;energy;TYPE;createdAtTimestamp;createdBy
```

The `serialize` method extracts fields from an `Entity`, and `deserialize` reconstructs the correct subclass based on the `HeroType` enum value.

### 3.9 Registry and Query Services

**`HeroRegistry`** is the in-memory storage for all created heroes, backed by a `LinkedHashMap<String, Entity>`:

| Method | Purpose |
|--------|---------|
| `add(hero)` | Register a hero by ID |
| `findById(id)` | Retrieve by unique ID |
| `getAll()` | Return all heroes |
| `getByType(type)` | Filter by `HeroType` |
| `getByTrait(trait)` | Filter by metadata trait |
| `getAlive()` | Filter living heroes |
| `getByCreator(creator)` | Filter by creator |
| `remove(id)` | Remove by ID |
| `size()` | Count of registered heroes |

The registry preserves insertion order through `LinkedHashMap` and returns defensive copies via `List.copyOf`.

### 3.10 Console Input Adapter

`HeroInputConsoleAdapter` demonstrates the **Adapter Pattern**, converting raw console input into a validated `HeroInput` DTO. It encapsulates all input reading logic, including:

- Non-empty string validation with retry loops
- Integer range validation (age: 10–100)
- Non-negative integer validation (power, energy)
- Enum selection from `HeroType.values()`
- Comma-separated list parsing for traits and initial effects

---

## 4. Module 2 — HeroManagementSystem

### 4.1 HeroManager — Facade for CRUD Operations

`HeroManager` implements the **Facade Pattern**, providing a unified interface over multiple creation-system components:

```java
public HeroManager(HeroRegistry registry,
                   HeroFactory factory,
                   HeroValidator validator,
                   HeroSerializer serializer,
                   HeroActionLogService logService,
                   HeroArchiverTracker archive,
                   HeroActionExecutor executor)
```

**CRUD Operations:**

| Method | Behavior |
|--------|----------|
| `create(input)` | Validates, creates via factory, registers in registry |
| `update(id, input)` | Validates, creates new entity, clones with original ID, records update history |
| `delete(id)` | Records deletion in archive tracker, removes from registry |
| `softDelete(id)` | Marks hero as dead without removing from registry |
| `listAll()` | Returns `HeroSummary` projections of all heroes |
| `findEntityById(id)` | Returns the raw `Entity` by ID |
| `performAction(id, action)` | Delegates to `HeroActionExecutor`, logs result |

The `update` method demonstrates the **clone-and-replace** pattern: it creates a new entity from the updated input, then clones it with the original ID to maintain identity consistency.

### 4.2 HeroActionExecutor — Action Coordination

`HeroActionExecutor` is the central coordinator for hero actions, implementing the **Command Pattern** via the `HeroActionType` enum.

**Action Routing:**

| Action | Behavior |
|--------|----------|
| `ATTACK` | Finds first alive enemy, delegates to `entity.attack(target)` |
| `CAST_SPELL` | Creates a Burned effect via `EffectFactory`, applies to target |
| `HEAL` | Creates a Regeneration effect, applies to self |
| `DEFEND` | Creates a Shield effect, applies to self |
| `WAIT` | Returns partial result with no damage |

The executor handles:
- **Energy cost deduction:** Checks affordability before each action
- **Effect application:** Uses `HeroStateEffectEngine` for lifecycle management
- **Effect advancement:** `applyEffects(id)` ticks all active effects on a hero
- **Error handling:** Returns structured `ActionResult` for failures

### 4.3 HeroActionDispatcher — Dispatch Chain

`HeroActionDispatcher` implements a **dispatch chain** pattern, resolving hero IDs (either explicit or from the current selection) and routing actions through the executor:

```java
public ActionResult dispatchAction(String id, HeroActionType action)
public List<ActionResult> dispatchGroupAction(List<String> ids, HeroActionType action)
```

The dispatcher resolves IDs via `resolveIdOrSelected`, which falls back to `HeroSelectionModel` when no explicit ID is provided, enabling both single-hero and group operations.

### 4.4 HeroQueryService Interface and In-Memory Implementation

`HeroQueryService` defines the query contract:

```java
public interface HeroQueryService {
    List<HeroSummary> getAllSummaries();
    Optional<HeroSummary> findById(String id);
    List<HeroSummary> searchByName(String name);
    List<HeroSummary> filterByType(HeroType type);
    List<HeroSummary> filterAliveOnly();
    List<HeroSummary> filterByTrait(String trait);
}
```

`InMemoryHeroQueryService` provides a `Supplier<List<HeroSummary>>`-backed implementation, enabling lazy data loading. All query methods use Stream API filtering with null-safety checks.

`HeroManager` itself implements `HeroQueryService`, delegating to its internal `HeroRegistry`.

### 4.5 HeroFilter — Null-Safe Query Facade

`HeroFilter` wraps a `HeroQueryService` and adds null/blank safety checks, preventing invalid filter parameters from reaching the underlying service:

```java
public List<HeroSummary> filterByType(HeroType type) {
    if (type == null) return List.of();
    return queryService.filterByType(type);
}
```

### 4.6 HeroArchiverTracker — Deletion and Update History

`HeroArchiverTracker` maintains two thread-safe collections:

- **`archivedDeletions`**: `ConcurrentHashMap<String, ArchivedHero>` — one snapshot per hero ID (latest deletion)
- **`archivedUpdates`**: `ConcurrentHashMap<String, List<HeroUpdateRecord>>` — chronological update history per hero ID

Both collections use `ConcurrentHashMap` and `CopyOnWriteArrayList` for thread safety, supporting concurrent read/write operations.

### 4.7 ArchivedHero and HeroUpdateRecord DTOs

**`ArchivedHero`** — Immutable, `Serializable` snapshot of a deleted hero:

| Field | Type | Purpose |
|-------|------|---------|
| `id` | `String` | Original hero ID |
| `name` | `String` | Hero name at deletion |
| `type` | `HeroType` | Hero class |
| `deletedAt` | `Date` | Deletion timestamp |
| `originalData` | `HeroSummary` | Full snapshot |

**`HeroUpdateRecord`** — Immutable, `Serializable` record of a single update:

| Field | Type | Purpose |
|-------|------|---------|
| `heroId` | `String` | Hero ID |
| `timestamp` | `Date` | Update timestamp |
| `oldData` | `HeroInput` | Previous input state |
| `newData` | `HeroInput` | Updated input state |
| `changedFields` | `List<String>` | Fields that changed |

Both implement `equals`, `hashCode`, and `toString` for proper value semantics.

### 4.8 HeroActionLogService — Audit Logging

`HeroActionLogService` maintains an in-memory audit log using `CopyOnWriteArrayList<HeroActionLog>` for thread-safe append operations:

- `record(id, result)`: Constructs a human-readable log entry from `ActionResult` fields
- `getLogsForHero(id)`: Returns filtered logs for a specific hero
- `log(entry)`: Directly adds a `HeroActionLog` entry

### 4.9 MVC Presentation Layer

The presentation layer follows **Model-View-Controller** separation:

**`HeroTableModel` (Model):**
- Maintains a list of `HeroSummary` rows
- Provides `getValueAt(row, column)` for cell-level access
- Implements `DataChangeListener` observer pattern for UI refresh notifications
- Thread-safe via `synchronized` methods

**`HeroListPresenter` (Presenter):**
- Converts `HeroSummary` to `DisplayRow` DTOs for rendering
- Formats status text ("Dead" / effect name / "Healthy")
- Formats traits and timestamps
- Provides `highlightIfDead` for conditional UI styling

**`HeroListController` (Controller):**
- Connects `HeroQueryService` to `HeroTableModel`
- Provides `refreshAll()`, `applyFilterByType()`, `searchByName()`, and `clear()` operations

**`HeroSelectionModel` (Selection State):**
- Maintains a selected hero ID
- Resolves to either `Entity` (via function resolver) or `HeroSummary` (via query service)
- Thread-safe via `synchronized` methods

---

## 5. Module 3 — SimulationArena

### 5.1 SimulationEngine — Full Battle Orchestrator

`SimulationEngine` coordinates the complete simulation lifecycle:

1. **Initialize:** Create `TurnManager` with both participants
2. **Loop:** Until max rounds reached or one entity dies:
   - Advance turns
   - Apply active effects on both entities
   - Execute combat round via `BattleSimulator`
   - Log both actions
   - Check alive count
3. **Resolve:** Apply `VictoryCondition` strategy to determine winner
4. **Package:** Create `SimulationResult` with winner, round count, and all results

```java
public void runSimulation(Entity a, Entity b) {
    // ... initialization
    while (round < config.getMaxRounds() && turnManager.hasNext()) {
        Entity attacker = turnManager.getNextTurn();
        Entity defender = turnManager.getNextTurn();
        effectEngine.applyEffects(attacker, attacker.getState().getEffects());
        effectEngine.applyEffects(defender, defender.getState().getEffects());
        ActionResult[] results = simulator.fight(attacker, defender);
        // ... logging and alive check
    }
    Entity winner = config.getVictoryCondition().determineWinner(participants);
    result = new SimulationResult(winner, round, allResults);
}
```

### 5.2 BattleSimulator — Single Round Combat

`BattleSimulator` executes one combat round between two entities:

- If both are alive, entity A performs an action on B, then B on A
- If one dies after the first action, the second action is skipped
- Returns a 2-element `ActionResult[]` array

This ensures fairness by preventing attacks on already-dead entities.

### 5.3 TurnManager — Cyclic Turn Rotation

`TurnManager` manages turn order using a `Queue<Entity>`:

- **Initialization:** Adds only alive entities to the queue
- **Turn advancement:** Polls from front, pushes alive entities to back (circular queue)
- **Dead entity handling:** Dead entities are removed from the queue entirely
- **Termination:** `hasNext()` checks if any alive entity remains

This guarantees fair, alternating turns without entity starvation.

### 5.4 EffectResolutionEngine — Status Effect Resolution

`EffectResolutionEngine` handles effect lifecycle during simulation:

1. Iterates all active effects on the target
2. Applies each effect's per-tick logic
3. Advances duration via `tick()`
4. Filters out expired effects
5. Updates the entity's `HeroState` with the remaining effects

This is functionally equivalent to `HeroStateEffectEngine` but operates within the simulation context, demonstrating code reuse through similar but independent implementations.

### 5.5 VictoryCondition — Strategy Interface

The `VictoryCondition` interface enables pluggable victory determination:

```java
public interface VictoryCondition {
    Entity determineWinner(List<Entity> participants);
}
```

**Implementations:**

| Strategy | Logic |
|----------|-------|
| `LastHeroStanding` | First alive entity wins |
| `HighestEnergyWins` | Entity with maximum remaining energy wins |

This demonstrates the **Strategy Pattern**, allowing simulation behavior to be configured at runtime via `SimulationConfig`.

### 5.6 BattleScenario — Predefined Scenario Configuration

`BattleScenario` encapsulates a complete battle setup:

- Two `HeroInput` objects defining the combatants
- A `SimulationConfig` controlling rules
- A descriptive `label`

Scenarios can be serialized, saved, and reused for reproducible testing.

### 5.7 Simulation Config, Result, Log, Event DTOs

**`SimulationConfig`** — Immutable configuration:

| Field | Purpose |
|-------|---------|
| `maxRounds` | Maximum battle rounds (must be > 0) |
| `allowDraw` | Whether a draw outcome is permitted |
| `condition` | `VictoryCondition` strategy instance |

**`SimulationResult`** — Battle outcome:

| Field | Purpose |
|-------|---------|
| `winner` | The winning entity (null for draw) |
| `totalRounds` | Number of rounds executed |
| `allResults` | Complete list of `ActionResult` objects |

Includes a `summary()` method generating a human-readable report with total damage, energy spent, and successful action count.

**`SimulationEvent`** — Single action record:

| Field | Purpose |
|-------|---------|
| `source` | Acting entity |
| `target` | Target entity |
| `actionType` | Action performed |
| `result` | Action outcome |
| `timestamp` | Event timestamp |

**`SimulationLog`** — Event collection with `record()`, `getEvents()`, and `clear()` methods.

### 5.8 SimulationUIAdapter — Display Bridge

`SimulationUIAdapter` bridges the simulation engine and the user interface:

- `displayLog()`: Prints all simulation events to console
- `displayResult(SimulationResult)`: Prints summary, winner details (name, type, power, energy, traits, effects, creator)

This adapter encapsulates all presentation logic, keeping the simulation engine UI-agnostic.

---

## 6. Module 4 — BackupAndRetrievalSystem

### 6.1 Archiving — Password-Protected File Persistence

`Archiving` implements a password-protected file-based persistence layer:

**Security model:**
- Password stored in `HeroData/password.txt`
- First run prompts for password creation
- Login required before any save/load operation
- 3-attempt login limit enforced by `HeroDataManager`

**Data operations:**

| Method | File | Purpose |
|--------|------|---------|
| `saveHeroes(List<String>)` | `heroes.dat` | Persist hero data |
| `loadHeroes()` | `heroes.dat` | Retrieve hero data |
| `saveBattles(List<String>)` | `battles.dat` | Persist battle records |
| `loadBattles()` | `battles.dat` | Retrieve battle records |
| `saveEvolutions(List<String>)` | `evolutions.dat` | Persist evolution records |
| `loadEvolutions()` | `evolutions.dat` | Retrieve evolution records |

**File format:** Password on first line, followed by data lines. Load operations verify password before returning data.

**Additional operations:**
- `changePassword(old, new)`: Re-encrypts all data files with new password
- `showSystemInfo()`: Reports file existence and sizes

### 6.2 HeroSystemIntegration — System Bridge

`HeroSystemIntegration` bridges the `BackupAndRetrievalSystem` and `HeroCreationSystem`:

- `saveHeroesFromSystem()`: Serializes all registry heroes to pipe-delimited format and saves via `Archiving`
- `loadHeroesToSystem()`: Parses saved data and recreates heroes via `HeroManager.create()`

Data format: `name|type|power|energy|traits|alive`

---

## 7. Module 5 — UI

### 7.1 HeroDataManager — CLI Menu Interface

`HeroDataManager` provides the user-facing command-line interface:

**Authentication:**
- 3-attempt login with password verification
- Logout on exit

**Main Menu Options:**

| Option | Operation |
|--------|-----------|
| 1 | View Heroes |
| 2 | Add New Hero |
| 3 | View Battles |
| 4 | Add New Battle |
| 5 | View Evolutions |
| 6 | Add New Evolution |
| 7 | System Information |
| 8 | Change Password |
| 9 | Exit |

Each operation delegates to `Archiving` for persistence, demonstrating separation of concerns between UI and data layers.

---

## 8. Application Entry Point

`DigitalKingdomsAcademy.main()` orchestrates startup:

```java
Archiving archiving = new Archiving();
HeroDataManager dataManager = new HeroDataManager(archiving);
if (dataManager.showLogin()) {
    dataManager.showMainMenu();
}
```

The entry point initializes the persistence layer, presents the login screen, and launches the main menu upon successful authentication.

---

## 9. Design Patterns Reference

| Pattern | Implementation | Location |
|---------|---------------|----------|
| **Factory** | `HeroFactory` creates `Entity` subclasses from `HeroInput` | HeroCreationSystem |
| **Factory** | `EffectFactory` creates `StatusEffect` instances by name or action type | HeroCreationSystem |
| **Strategy** | `VictoryCondition` interface with `LastHeroStanding` and `HighestEnergyWins` | SimulationArena |
| **Strategy** | `StatusEffect` interface with polymorphic effect implementations | HeroCreationSystem |
| **Facade** | `HeroManager` unifies registry, factory, validator, serializer, and executor | HeroManagementSystem |
| **Adapter** | `HeroInputConsoleAdapter` converts console input to `HeroInput` DTO | HeroCreationSystem |
| **Adapter** | `SimulationUIAdapter` bridges simulation engine and display layer | SimulationArena |
| **Observer** | `HeroTableModel.DataChangeListener` notifies UI of data changes | HeroManagementSystem |
| **Command** | `HeroActionType` enum routes action execution through `HeroActionExecutor` | HeroManagementSystem |
| **MVC** | `HeroTableModel` (M), `HeroListPresenter` (V helper), `HeroListController` (C) | HeroManagementSystem |
| **Immutable Value Object** | `HeroStats`, `HeroState`, `HeroMetadata`, `ValidationResult`, `ActionResult` | HeroCreationSystem |
| **Template Method** | `Entity.attack()` / `Entity.performAction()` abstract methods with subclass implementations | HeroCreationSystem |

---

## 10. OOP Principles Demonstrated

### Encapsulation

- `HeroStats`, `HeroState`, `HeroMetadata` expose only getters; state changes produce new instances
- `HeroRegistry` wraps internal `LinkedHashMap` and returns defensive copies
- `HeroArchiverTracker` uses `ConcurrentHashMap` for thread-safe internal storage

### Inheritance

- `Entity` → `Warrior`, `Wizard`, `Archer` class hierarchy
- `StatusEffect` → `PoisonedEffect`, `BurnedEffect`, `StunnedEffect`, `CleanseEffect`

### Polymorphism

- `Fightable` interface enables uniform treatment of all hero types
- `VictoryCondition` interface allows pluggable winner determination
- `HeroQueryService` interface with `HeroManager` and `InMemoryHeroQueryService` implementations
- `StatusEffect` interface with four concrete implementations

### Abstraction

- `HeroQueryService` abstracts data access from consumers
- `HeroActionExecutor` abstracts action mechanics from the management layer
- `SimulationEngine` abstracts battle orchestration from the UI layer

### Additional Principles

- **Composition over Inheritance:** `Entity` composes `HeroStats`, `HeroState`, and `HeroMetadata` rather than inheriting from them
- **Immutability by Default:** Value objects (`HeroStats`, `HeroState`, `HeroMetadata`, `ValidationResult`, `ActionResult`) are immutable
- **Single Responsibility:** Each class has one reason to change — `HeroValidator` validates, `HeroFactory` creates, `HeroSerializer` serializes
- **Open/Closed Principle:** New hero types can be added by extending `Entity` without modifying existing code; new victory conditions can be added by implementing `VictoryCondition`
- **Dependency Inversion:** High-level modules (`HeroManager`, `SimulationEngine`) depend on abstractions (`HeroQueryService`, `VictoryCondition`) rather than concrete implementations

---

*This manual was generated from the complete source code of the Digital Kingdoms Academy project. All architectural descriptions, design pattern identifications, and behavioral specifications are derived directly from the implementation.*
