# Python & Artificial Intelligence — Master Reference Manual

> A consolidated reference of language fundamentals, data structures, expert systems, graph theory, and ten production-grade applications spanning AI algorithms, security, persistence, and desktop application development.

**Author:** Abdulrahman  
**Python Version:** 3.10+  
**Key Libraries:** experta, PyQt6, SQLite, ReportLab, collections, queue  
**Scope:** 10 production-grade applications + foundational coursework | 25+ design patterns | 15,000+ lines documented

---

## Executive Summary

This unified reference manual consolidates two comprehensive learning paths into a single authoritative document.

**Parts I–IV** cover Python fundamentals, data structures, expert systems, and graph theory — building the computational foundation. **Parts V–XI** document ten production-grade applications demonstrating mastery of clean architecture, database engineering, security, UI/UX, and AI algorithms. **Part XII** provides a quick-reference for experta pattern matching.

The progression moves from language fundamentals through advanced software engineering, culminating in AI systems that combine search algorithms, constraint satisfaction, and game-tree intelligence.

---

## Table of Contents

| Part | Title | Focus ||------|-------|-------|| I | [Python Fundamentals](#part-i--python-fundamentals) | Language core, control flow, basic I/O || II | [Data Structures & OOP](#part-ii--data-structures--object-oriented-programming) | Advanced types, classes, design patterns || III | [Expert Systems](#part-iii--expert-systems-with-python-experta) | Declarative AI with `experta` || IV | [Graph Theory & Search](#part-iv--graph-theory-and-state-space-search) | Traversal algorithms, state-space search || V | [Architectural Foundations](#part-v--architectural-foundations) | Clean architecture, design patterns, security || VI | [Project Domain Analysis](#part-vi--project-domain-analysis) | Domain-specific implementations || VII | [AI Systems in Practice](#part-vii--artificial-intelligence-systems) | AI algorithms, expert systems, game trees || VIII | [Advanced Systems](#part-viii--advanced-systems) | Persistence, analytics, replay || IX | [Technical Skills Matrix](#part-ix--technical-skills-matrix) | Comprehensive skill inventory || X | [Project Evolution](#part-x--project-evolution) | Growth and complexity analysis || XI | [Quick Reference](#part-xi--quick-reference) | Technology stack, commands || XII | [Pattern Matching Reference](#part-xii--pattern-matching-reference) | Quick-reference cheat sheet |
---
# Part I — Python Fundamentals

## 1.1 Variables and Data Types

A **variable** is a named container for data. Python employs dynamic typing — the interpreter infers the type at assignment without explicit declaration.

### Primitive Types

| Type | Python Type | Example | Description |
|------|------------|---------|-------------|
| Integer | `int` | `5`, `-10`, `42` | Arbitrary-precision whole numbers |
| Float | `float` | `3.14`, `-0.5` | IEEE-754 double-precision decimals |
| String | `str` | `"Hello"`, `'Python'` | Immutable Unicode character sequences |
| Boolean | `bool` | `True`, `False` | Logical values (subclass of `int`) |

```python
current_city   = "Aleppo"   # str
travel_cost    = 250.5      # float
cities_visited = 3          # int
goal_reached   = False      # bool
```

### Object Identity and Type Introspection

Every Python object possesses three attributes: **type**, **value**, and **identity** (memory address). The `type()` function returns the class; `id()` returns the unique identity.

```python
print(type(current_city))   # <class 'str'>
print(id(current_city))     # Memory address of the object
```

**AI Application:** In search algorithms, variables store the current state (`current_city`), cumulative cost (`travel_cost`), frontier size (`cities_visited`), and termination flag (`goal_reached`).

---

## 1.2 Input and Output

- **Output:** `print()` displays text or variable values to stdout.
- **Input:** `input()` reads user input as a string; type casting is required for numeric data.

```python
print("AI Pathfinding System")
start = input("Enter start city: ")
goal  = input("Enter destination city: ")
print(f"Searching for a path from {start} to {goal}...")
```

**Best Practice:** Use f-strings for formatted output — they provide readable, efficient string interpolation.

---

## 1.3 Indentation and Code Structure

Python enforces **indentation** (4 spaces standard) to define code blocks, replacing curly braces used in C-family languages. Indentation errors produce `IndentationError` at parse time.

```python
path_found = True

if path_found:
    print("Path found! Displaying route...")
    print("Route: Aleppo → Hama → Homs → Damascus")

print("Search complete.")  # Outside the if block — always executes
```

**Key Distinction:** Statements at the same indentation level belong to the same block. Inconsistent indentation is a syntax error, not a warning.

---

## 1.4 Conditional Logic

Conditions enable decision-making based on boolean expressions.

### Control Flow Constructs

| Construct | Purpose | Execution |
|-----------|---------|-----------|
| `if` | Primary condition check | Evaluates once |
| `elif` | Alternative conditions | Short-circuit: first match wins |
| `else` | Fallback branch | Executes when all conditions fail |
| `and` / `or` / `not` | Logical operators | Short-circuit evaluation |

```python
path_cost = 85

if path_cost < 50:
    print("Excellent path!")
elif path_cost < 100:
    print("Acceptable path. Continuing search.")
elif path_cost < 200:
    print("Expensive path. Will try alternatives.")
else:
    print("Path too costly. Abandoning.")
```

### Compound Conditions

```python
path_exists   = True
road_is_clear = True

if path_exists and road_is_clear:
    print("Valid path! Agent can proceed.")
elif path_exists or road_is_clear:
    print("Partial route available.")
else:
    print("No valid route found. Re-routing...")
```

**AI Connection:** Conditional logic governs state transitions in search algorithms — checking goal states, validating moves, and branching on heuristic values.

---

## 1.5 Repetition (Loops)

### `for` Loop
Iterates over a sequence (range, list, string). Use when the number of iterations is known or bounded.

```python
for step in range(5):
    print(f"  Visiting node #{step}")
```

### `while` Loop
Repeats as long as a condition remains `True`. Use when iteration count is not predetermined (e.g., search loops).

```python
nodes_remaining = 4
while nodes_remaining > 0:
    print(f"  Exploring... {nodes_remaining} node(s) left")
    nodes_remaining -= 1
print("Frontier is empty — search complete!")
```

**AI Connection:** `while` loops power search frontier processing; `for` loops handle iteration over neighbor lists and path reconstruction.

---

## 1.6 Functions

A **function** is a reusable block defined with `def`. It accepts parameters, executes a body, and optionally returns a value.

### Basic Function

```python
def explore_node(node_name):
    print(f"Exploring node: {node_name}")

explore_node("Aleppo")
explore_node("Hama")
```

### Heuristic Function

Heuristic functions estimate the cost from a given state to the goal — a core component of informed search algorithms (A*, Greedy Best-First).

```python
def estimate_distance(from_city, to_city):
    distance_table = {
        ("Aleppo",  "Damascus"): 300,
        ("Hama",    "Damascus"): 180,
        ("Homs",    "Damascus"): 140,
    }
    return distance_table.get((from_city, to_city), 9999)

h1 = estimate_distance("Hama", "Damascus")   # 180
h2 = estimate_distance("Homs", "Damascus")   # 140
```

**Note — Heuristic Search vs. Heuristic Evaluation:** The heuristic function above estimates distance in **informed search algorithms** (A*, Greedy Best-First), where it guides exploration toward the goal. A different use of heuristics appears in **adversarial search** (minimax), where a **heuristic evaluation function** assigns a numeric score to a board position at the depth limit — estimating which player is winning rather than estimating path cost. Both are admissible estimates, but they serve different purposes: one measures *proximity to goal*, the other measures *relative advantage*.

### Applied: Final Price Calculator

```python
def calculate_FinalePrice(price, tax_rate, discount_rate):
    tax = price * tax_rate
    discount = price * discount_rate
    return price + tax - discount

print(calculate_FinalePrice(1000, 0.15, 0.10))  # 1050.0
```

**See also:** [Generators and Decorators](#21-advanced-functions--generators-and-decorators) for advanced function patterns.

---

## 1.7 Collections — Strings, Lists, Dictionaries

### Lists

Ordered, mutable sequences created with `[]`. Support indexing, slicing, and dynamic resizing.

```python
path = ["Aleppo", "Hama", "Homs", "Damascus"]
print(path[0])       # Aleppo (first element)
print(path[-1])      # Damascus (last element)

path[1] = "Latakia"  # Replace element at index
path.append("Tartus") # Append to end

for city in path:
    print(f"  --> Arriving at: {city}")
```

**AI Application:** Lists represent ordered paths, sequences of moves, and frontier expansions.

### Strings

Immutable sequences of characters. Support indexing, slicing, and rich method libraries.

```python
name = "Python"
print(name[0])       # 'P'
print(name[-1])      # 'n'
print(name[0:3])     # 'Pyt' (slice)
```

### Dictionaries

Key-value pairs — the natural representation for graph adjacency lists and sparse data.

```python
graph = {
    "Aleppo":   {"Hama": 130, "Raqqa": 160},
    "Hama":     {"Homs": 45,  "Damascus": 200},
    "Homs":     {"Damascus": 140, "Latakia": 120},
}

for city, neighbors in graph.items():
    print(f"  {city} → {neighbors}")
```

**See also:** [Advanced Collections](#part-ii--data-structures--object-oriented-programming) for tuples, sets, and deque.

---

## 1.8 Type Casting

Explicit type conversion between data types:

```python
x = "100"          # str
y = int(x)         # int: 100
z = float(x)       # float: 100.0
w = str(100)       # str: "100"
```

**Caution:** `int("3.14")` raises `ValueError` — use `float()` as an intermediate step for string-to-integer conversion of decimal strings.

---

## 1.9 Error Handling (try/except)

Graceful runtime error handling prevents crashes and enables recovery:

```python
try:
    num1 = float(input("Enter first number: "))
    op   = input("Enter operator (+, -, *, /): ")
    num2 = float(input("Enter second number: "))

    if op == "+":
        print("Result:", num1 + num2)
    elif op == "/":
        if num2 == 0:
            print("Error: Cannot divide by zero.")
        else:
            print("Result:", num1 / num2)
    else:
        print("Invalid operator.")
except ValueError:
    print("Please enter valid numbers.")
```

**Exception Hierarchy:**
| Exception | Cause |
|-----------|-------|
| `ValueError` | Invalid type conversion |
| `ZeroDivisionError` | Division by zero |
| `IndexError` | Sequence index out of range |
| `KeyError` | Dictionary key not found |

---

## 1.10 File I/O

Context managers (`with` statement) ensure proper resource cleanup:

```python
# Write
with open("example.txt", "w") as f:
    f.write("Hello from Python!\n")

# Read
with open("example.txt", "r") as f:
    print(f.read())
```

**File Modes:** `"r"` (read), `"w"` (write/truncate), `"a"` (append), `"r+"` (read/write).

---

## 1.11 Modules and Imports

```python
import math
import random
from collections import deque
from queue import PriorityQueue
```

**Import Conventions:**
| Import Style | Use Case |
|--------------|----------|
| `import module` | When namespace clarity is needed |
| `from module import name` | When specific names are used frequently |
| `from module import *` | Discouraged — pollutes namespace |

---

## 1.12 Applied Project — Simple Calculator

A complete CLI calculator demonstrating input validation, error handling, and arithmetic operations.

**Implementation Highlights:**
- Type-safe input parsing with `float()` conversion
- Division-by-zero protection
- Operator validation
- Clean separation of input, processing, and output

**File:** `1/fundementels/16- simple calculator.py`

---

## 1.13 Applied Project — GUI Tic-Tac-Toe (XO) Game

A production-quality Tic-Tac-Toe application demonstrating software engineering best practices with a 4-component architecture.

### Architecture

| Component | Responsibility | Design Pattern |
|-----------|---------------|----------------|
| `GameLogic` | Pure game rules and board state (UI-agnostic) | Domain Model |
| `AIEngine` | Three difficulty levels with distinct strategies | Strategy Pattern |
| `ScoreManager` | JSON-based persistent scoring per player | Repository Pattern |
| `TicTacToeApp` | Tkinter UI controller with multiple screens | MVC Controller |

> **Cross-reference:** The Strategy Pattern here is applied in AI difficulty tiers — each difficulty level (Easy, Medium, Hard) implements a distinct strategy class (`EasyAIStrategy`, `MediumAIStrategy`, `HardAIStrategy`) sharing a common interface. See [Adversarial Search](#411-adversarial-search--minimax-and-alpha-beta-pruning) for the theoretical foundations of these strategies.

### AI Difficulty Levels

| Level | Strategy | Algorithm |
|-------|----------|-----------|
| Easy | Random valid move | Uniform random selection |
| Medium | Win if possible, block opponent, then random | Greedy heuristic |
| Hard | Optimal play | Minimax with recursive evaluation |

### Persistence Model

Scores stored in JSON with per-player, per-difficulty granularity:
```json
{
  "player_name": {
    "easy": {"wins": 5, "losses": 2, "draws": 1, "points": 120},
    "medium": {"wins": 3, "losses": 4, "draws": 2, "points": 85},
    "hard": {"wins": 1, "losses": 6, "draws": 1, "points": 40}
  }
}
```

**File:** `1/fundementels/19- XO game.py` (846 lines)

---

# Part II — Data Structures & Object-Oriented Programming

> This part covers Python's intermediate and advanced features — from memory-efficient generators to the class hierarchies that model complex systems. These concepts directly support the AI and search implementations in subsequent parts.

---

## 2.1 Advanced Functions — Generators and Decorators

### Generators (`yield`)

Generators produce values lazily, one at a time, without loading entire datasets into memory. They maintain state between calls via the `yield` keyword.

```python
def generate_search_levels(max_depth):
    level = 1
    while level <= max_depth:
        yield f"Level {level}: expanding nodes at depth {level}"
        level += 1

for status in generate_search_levels(4):
    print(status)
```

**AI Connection:** Generators lazily produce search states — each neighboring state is generated on-demand, avoiding memory exhaustion on large state spaces with high branching factors.

### Decorators (`@`)

Decorators modify function behavior without altering source code — a form of metaprogramming.

```python
import time

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"[Timer] Starting {func.__name__}...")
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"[Timer] Finished in {elapsed:.4f}s")
        return result
    return wrapper

@timer_decorator
def run_search():
    total = sum(range(100_000))
    print(f"  Result: {total}")
```

**AI Connection:** The `experta` library uses decorators extensively — `@Rule(...)` and `@DefFacts()` transform Python functions into expert-system rules and initial fact declarations.

---

## 2.2 List Comprehensions

Concise, declarative syntax for creating lists from existing sequences:

```python
all_path_costs = [45, 120, 35, 200, 89, 67, 310, 55]

# Filter paths under 100
valid_paths = [cost for cost in all_path_costs if cost < 100]

# Apply weighted cost factor
weighted = [cost * 1.1 for cost in valid_paths]
```

**Syntax:** `[expression for item in iterable if condition]`

**AI Application:** Filtering and transforming heuristic values, generating neighbor states, and computing path costs.

---

## 2.3 Tuples

Immutable sequences — ideal for fixed-structure data like coordinates, edges, and records.

```python
aleppo = ("Aleppo", 36.20, 37.16)  # (name, lat, lon)
edge = ("Aleppo", "Damascus", 300)  # (from, to, distance)
# edge[2] = 999  # ERROR — tuples are immutable
```

**When to Use Tuples vs. Lists:**
| Tuples | Lists |
|--------|-------|
| Fixed structure | Variable-length sequences |
| Dictionary keys (hashable) | Not hashable |
| Return multiple values | Ordered collections |

---

## 2.4 Sets

Unordered collections with **no duplicates** and **O(1) membership testing**. The standard structure for tracking visited nodes in search algorithms.

```python
visited = {"Aleppo", "Hama", "Homs"}
visited.add("Damascus")
print("Is Hama visited?:", "Hama" in visited)  # True — O(1)

# Set operations for multi-agent exploration
agent1 = {"Aleppo", "Hama", "Homs"}
agent2 = {"Homs", "Damascus", "Latakia"}
print("Both explored:", agent1.intersection(agent2))   # {'Homs'}
print("All explored:", agent1.union(agent2))
print("Only agent1:", agent1.difference(agent2))
```

**AI Application:** The `explored` set in BFS/DFS prevents revisiting states — O(1) lookup is critical for performance.

---

## 2.5 Dictionaries

Key-value pairs — the natural representation for graphs (adjacency lists) and state mappings.

```python
graph = {
    "Aleppo":   {"Hama": 130, "Raqqa": 160},
    "Hama":     {"Homs": 45,  "Damascus": 200},
    "Homs":     {"Damascus": 140, "Latakia": 120},
    "Damascus": {},
    "Latakia":  {"Homs": 120},
}
```

**Dictionary Operations for Graphs:**
| Operation | Complexity | Example |
|-----------|------------|---------|
| Lookup | O(1) average | `graph["Aleppo"]` |
| Insert | O(1) average | `graph["NewCity"] = {}` |
| Iteration | O(n) | `for node, edges in graph.items()` |

---

## 2.6 Deque — Stack (DFS) and Queue (BFS)

`collections.deque` provides **O(1) insertion/removal from both ends** — the foundation for both DFS and BFS frontiers.

### Stack (LIFO) — DFS Frontier

```python
from collections import deque

dfs_stack = deque()
dfs_stack.append("Aleppo")   # Push
dfs_stack.append("Hama")
dfs_stack.append("Homs")
next_node = dfs_stack.pop()  # Homs (most recent — LIFO)
```

### Queue (FIFO) — BFS Frontier

```python
bfs_queue = deque()
bfs_queue.append("Aleppo")     # Enqueue
bfs_queue.append("Hama")
bfs_queue.append("Raqqa")
next_node = bfs_queue.popleft()  # Aleppo (earliest — FIFO)
```

**Performance Note:** `list.pop()` is O(n) for arbitrary removals; `deque.popleft()` is O(1). Always use deque for BFS.

---

## 2.7 Priority Queue — A\* and Dijkstra

Elements are popped in **priority order** (lowest cost first) — essential for informed search algorithms.

```python
from queue import PriorityQueue

frontier = PriorityQueue()
frontier.put((0,   "Aleppo"))    # Start
frontier.put((130, "Hama"))      # Cost via Aleppo
frontier.put((175, "Homs"))      # Cost via Hama
frontier.put((315, "Damascus"))  # Cost via Homs

while not frontier.empty():
    cost, city = frontier.get()
    print(f"  {city}: {cost} km")
# Output: Aleppo(0) → Hama(130) → Homs(175) → Damascus(315)
```

**AI Application:** Priority queues order the frontier in A* (f = g + h) and Dijkstra (g only) algorithms.

---

## 2.8 Classes and Object-Oriented Programming

A **class** is a blueprint for objects with attributes (data) and methods (behavior). Classes model the key components of search systems — states, graphs, and algorithms.

### Node Class for Search

```python
class Node:
    """Represents a single state in the search space."""

    def __init__(self, name, cost=0, parent=None):
        self.name   = name
        self.cost   = cost
        self.parent = parent

    def describe(self):
        came_from = self.parent.name if self.parent else "Start"
        print(f"Node: {self.name:12s} | Cost: {self.cost:4d} km | From: {came_from}")

# Build path: Aleppo → Hama → Damascus
start = Node("Aleppo", cost=0)
mid   = Node("Hama",   cost=130, parent=start)
goal  = Node("Damascus", cost=330, parent=mid)
```

### Class Design Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Encapsulation** | Bundle data with methods | `Node` stores state + path |
| **Abstraction** | Hide implementation details | `SearchAlgorithm.run()` |
| **Inheritance** | Share logic via parent classes | `DFS` extends `SearchAlgorithm` |
| **Polymorphism** | Override behavior in subclasses | Different frontier strategies |

---

## 2.9 Dunder (Magic) Methods

Special methods that define how objects interact with Python's built-in operations.

| Method | Purpose | AI Application |
|--------|---------|----------------|
| `__str__` | Controls `print()` output | Human-readable node display |
| `__lt__` | Less-than comparison | Priority Queue ordering |
| `__eq__` | Equality comparison | Set membership checks |
| `__hash__` | Hashing for sets/dicts | Explored-set lookups |

### Implementation Example

```python
class Node:
    def __init__(self, name, cost=0):
        self.name = name
        self.cost = cost

    def __str__(self):
        return f"[{self.name} | cost={self.cost} km]"

    def __lt__(self, other):
        return self.cost < other.cost

pq = PriorityQueue()
pq.put(Node("Homs", 175))
pq.put(Node("Hama", 130))
print(pq.get())  # [Hama | cost=130 km]
```

**Required for Priority Queues:** `__lt__` enables comparison-based ordering. Without it, `PriorityQueue` cannot determine which node has lower cost.

---

## 2.10 Inheritance

A child class reuses attributes and methods from a parent class, enabling code reuse and polymorphic behavior.

### Basic Inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def sleep(self):
        print(f"{self.name} is sleeping.")

class Cat(Animal):
    def meow(self):
        print(f"{self.name} says Meow!")

cat = Cat("Whiskers")
cat.sleep()  # Inherited method
cat.meow()   # Own method
```

### AI Application: Search Algorithm Hierarchy

DFS and BFS share common logic (visited tracking, goal checking) but differ in frontier management. A parent `SearchAlgorithm` class captures shared logic; child classes override what differs.

```python
class SearchAlgorithm:
    """Base class with shared search logic."""
    def __init__(self, problem):
        self.problem = problem
        self.explored = set()

    def is_goal(self, state):
        return state == self.problem.goal

    def get_frontier(self):
        raise NotImplementedError  # Subclasses implement

class BFS(SearchAlgorithm):
    def get_frontier(self):
        return deque()  # FIFO

class DFS(SearchAlgorithm):
    def get_frontier(self):
        return deque()  # LIFO (use pop())
```

**See also:** [Graph Traversals](#44-graph-traversals--bfs-and-dfs) for complete BFS/DFS implementations.

---

# Part III — Expert Systems with Python (`experta`)

> Expert systems implement **declarative AI** — you declare facts and rules, and the inference engine determines which conclusions follow. The `experta` library provides a production-grade framework built on the Rete algorithm for efficient pattern matching.
>
> **Cross-reference:** The Rete algorithm used in `experta` is also employed in **constraint propagation** for constraint satisfaction problems, where rule-based inference prunes the search space by deducing variable values from constraints. See [Constraint Satisfaction Problems](#412-constraint-satisfaction-problems) for this application.

---

## 3.1 Imperative vs. Declarative Programming

| Paradigm | Description | Analogy |
|----------|-------------|---------|
| **Imperative** | You specify *how* to solve the problem step by step | Turn-by-turn driving directions |
| **Declarative** | You specify *what* you know; the engine figures out *how* | Giving an Uber driver the restaurant address |

Expert systems use **declarative programming** — you declare facts and rules, and the engine infers conclusions through forward chaining.

---

## 3.2 Core Concepts: Fact, Rule, Engine

| Concept | Definition | Example |
|---------|-----------|---------|
| **Fact** | A piece of information about the current state of the world | `Fact(temperature=30)` |
| **Rule** | An `IF-THEN` statement — condition (LHS) triggers action (RHS) | `@Rule(Fact(temperature=30))` |
| **Knowledge Engine** | The inference system — stores facts, evaluates rules, fires those whose conditions are met | `class MyEngine(KnowledgeEngine)` |

---

## 3.3 Forward vs. Backward Chaining

| Strategy | Direction | Analogy | `experta` Support |
|----------|-----------|---------|-------------------|
| **Forward Chaining** | Data-driven: facts → conclusions | Detective building a case from clues | Yes (Rete algorithm) |
| **Backward Chaining** | Goal-driven: conclusion → facts needed | Detective targeting a suspect, seeking evidence | No |

**Forward Chaining Process:**
1. Initial facts are declared
2. All rules are evaluated against current facts
3. Matching rules "fire" and may declare new facts
4. Process repeats until no more rules match

---

## 3.4 Logical Operations (AND, OR, NOT)

Combine patterns to create complex rule conditions:

```python
@Rule(AND(Fact(has_fur=True), Fact(makes_sound="woof")))    # Both must match
@Rule(OR(Fact(makes_sound="meow"), Fact(action="purrs")))   # Either can match
@Rule(NOT(Fact(is_penguin=True)))                            # Must NOT exist
```

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `AND` | All patterns must match | Compound conditions |
| `OR` | Any pattern can match | Alternative triggers |
| `NOT` | Pattern must not exist | Exclusion rules |

---

## 3.5 Defining Facts

Facts are the knowledge base — they represent the current state of the world.

### Simple Flag Fact

```python
f1 = Fact('system-ready')  # Anonymous positional fact
print(f1[0])               # 'system-ready'
```

### Key-Value Fact

```python
f2 = Fact(name="Alice", role="Admin", clearance_level=5)
print(f2['name'])  # 'Alice'
print(f2['role'])  # 'Admin'
```

**Fact Constraints:**
- Facts must be declared with `declare()` before rules can match them
- Facts are identified by their content (two facts with identical key-value pairs are considered equal)
- Modifying a fact creates a new version (facts are immutable snapshots)

---

## 3.6 Knowledge Engine and Fact Manipulation

The `KnowledgeEngine` class is the inference engine — it stores facts, evaluates rules, and manages the rule-firing cycle.

### Complete Example

```python
class SmartHomeEngine(KnowledgeEngine):

    @DefFacts()
    def initial_state(self):
        yield Fact(time="night")
        yield Fact(user_status="sleeping")

engine = SmartHomeEngine()
engine.reset()                                      # Seeds @DefFacts
engine.declare(Fact(dreaming=True))                 # Add fact
engine.modify(engine.facts[1], time="morning")      # Update fact
engine.retract(engine.facts[3])                      # Remove fact
print(engine.facts)                                 # View all facts
```

### Fact Manipulation API

| Method | Purpose | Example |
|--------|---------|---------|
| `@DefFacts()` | Define initial facts when engine resets | `yield Fact(status="idle")` |
| `self.declare(Fact(...))` | Add a new fact during runtime | `self.declare(Fact(event="start"))` |
| `self.modify(fact, key=value)` | Update an existing fact | `self.modify(fact, status="active")` |
| `self.retract(fact)` | Remove a fact | `self.retract(fact)` |
| `self.facts` | View all current facts (list) | `print(self.facts)` |

---

## 3.7 Defining Rules

Rules are decorated functions that fire when their patterns match current facts.

### Basic Rule with Chaining

```python
class TrafficLightEngine(KnowledgeEngine):
    @DefFacts()
    def startup(self):
        yield Fact(light_color="green")

    @Rule(Fact(light_color="green"))
    def go(self):
        print("Action: GO! The road is clear.")
        self.declare(Fact(vehicle_moving=True))  # Triggers next rule

    @Rule(Fact(vehicle_moving=True))
    def driving(self):
        print("Notice: The car is currently in motion.")

engine = TrafficLightEngine()
engine.reset()
engine.run()  # Rules fire automatically in sequence
```

**Rule Chaining:** A newly declared fact triggers other rules — this is the core of forward chaining.

### Rule Priority

When multiple rules match, `experta` fires them in declaration order. Use `salience` for explicit priority:

```python
@Rule(Fact(event="start"), salience=10)  # Higher = fires first
def high_priority(self):
    ...

@Rule(Fact(event="start"), salience=1)   # Lower = fires last
def low_priority(self):
    ...
```

---

## 3.8 Advanced Pattern Matching — MATCH and Fact Binding

| Syntax | Purpose | Example |
|--------|---------|---------|
| `MATCH.name` | Extract a value from a fact into a variable | `Fact(user_name=MATCH.name)` |
| `AS.fact << Fact(...)` | Capture the entire fact object for modification | `AS.user_fact << Fact(...)` |

### Complete Example

```python
class GreetingEngine(KnowledgeEngine):
    @DefFacts()
    def startup(self):
        yield Fact(user_name="Alice", status="online")

    @Rule(AS.user_fact << Fact(user_name=MATCH.name, status="online"))
    def greet_user(self, user_fact, name):
        print(f"Hello, {name}! I see you are online.")
        self.modify(user_fact, status="greeted")

engine = GreetingEngine()
engine.reset()
engine.run()
```

**Key Points:**
- `MATCH.var` extracts a single value into the named parameter
- `AS.fact` captures the entire fact object for `modify()` or `retract()`
- Parameters must match the variable names used in patterns

---

## 3.9 TEST — Conditional Evaluation

`TEST` evaluates a Python expression (typically a lambda) across multiple matched variables.

### Basic TEST

```python
class SpeedCameraEngine(KnowledgeEngine):
    @DefFacts()
    def startup(self):
        yield Fact(vehicle="Car A", speed=65)
        yield Fact(vehicle="Car B", speed=85)

    @Rule(Fact(vehicle=MATCH.v_name, speed=MATCH.s),
          TEST(lambda s: s > 70))
    def issue_ticket(self, v_name, s):
        print(f"TICKET: {v_name} was going {s} mph!")

engine = SpeedCameraEngine()
engine.reset()
engine.run()
```

### Pattern Matching Constructs Comparison

| Construct | Scope | Example |
|-----------|-------|---------|
| `MATCH` | Extract value for use in function | `Fact(speed=MATCH.s)` |
| `W()` | Confirm field exists (ignore value) | `Fact(ip=W())` |
| `P(lambda)` | Inline condition on one field | `Fact(speed=P(lambda s: s > 70))` |
| `TEST(lambda)` | Condition across multiple matched vars | `TEST(lambda s, t: s > t)` |

**When to Use TEST vs. P:**
- Use `P()` for single-field conditions (simpler syntax)
- Use `TEST()` for multi-field conditions or complex logic

---

## 3.10 EXISTS and FORALL Quantifiers

Quantifiers handle rules that depend on the *existence* or *universality* of facts.

| Quantifier | Behavior | Use Case |
|------------|----------|----------|
| `EXISTS(pattern)` | Fires once if *at least one* fact matches | Emergency protocols, status checks |
| `FORALL(p1, p2)` | Fires only if *all* facts of type p1 also satisfy p2 | Validation, graduation checks |

### EXISTS Example

```python
@Rule(EXISTS(Fact(type="alarm", active=True)))
def emergency_protocol(self):
    print("EMERGENCY: An alarm is active! Evacuate!")
```

### FORALL Example

```python
@Rule(FORALL(Fact(type="student", name=MATCH.n),
             Fact(type="student", name=MATCH.n, passed=True)))
def graduation(self):
    print("All students have passed!")
```

### Alternative: Double Negation

```python
@Rule(NOT(Fact(type="student", passed=False)))
def graduation2(self):
    print("All students have passed!")
```

---

## 3.11 Field Constraints — W() and P()

| Constraint | Purpose | Example |
|------------|---------|---------|
| `W()` | Wildcard — field must exist, value doesn't matter | `Fact(ip_address=W())` |
| `P(lambda x: ...)` | Predicate — inline condition on one field | `Fact(points=P(lambda a: a > 0))` |

### Combined Example

```python
@Rule(
    Fact(action="login"),
    Fact(ip_address=W()),                    # Must have IP (any value)
    Fact(points=P(lambda a: isinstance(a, int) and a > 0))  # Must be positive int
)
def valid_login(self):
    print("Valid login detected.")
```

---

## 3.12 Applied Projects — Expert Systems

### Smart AC System

A basic expert system demonstrating forward chaining with temperature-based activation.

```python
class SmartACSystem(KnowledgeEngine):
    @DefFacts()
    def initial_state(self):
        yield Fact(temperature_degree=30)

    @Rule(Fact(temperature_degree=30))
    def hot(self):
        print("It's too hot!")
        self.declare(Fact(ac_status="on"))

    @Rule(Fact(ac_status="on"))
    def ac_on(self):
        print("AC is on!")
```

**File:** `2/Experta/Introduction Excersices/excersice1.py`

### Speed Radar System

Demonstrates MATCH, AS fact binding, and TEST for conditional evaluation across multiple facts.

```python
class SmartHomeEngineExtended(KnowledgeEngine):
    @DefFacts()
    def initial_state(self):
        yield Fact(time="night")
        yield Fact(user_status="awake")

    @Rule(
        AS.light << Fact(time=MATCH.time),
        Fact(user_status=MATCH.user_status),
        TEST(lambda time, user_status: time == "night" and user_status == "awake")
    )
    def turn_on_lights(self, time, user_status):
        print(f"It's {time} and user is {user_status}. Turning lights on...")
        self.declare(Fact(light="on"))
```

**File:** `2/Experta/Practice/SpeedRadarSystem.py`

### Greeting Engine

Demonstrates MATCH, AS fact binding, and `self.modify()` to update user status from "online" to "greeted".

```python
class GreetingEngine(KnowledgeEngine):
    @DefFacts()
    def startup(self):
        yield Fact(user_name="Alice", status="online")

    @Rule(AS.user_fact << Fact(user_name=MATCH.user_name, status="online"))
    def greet_user(self, user_fact, user_name):
        print(f"Hello, {user_name}! I see you are online.")
        self.modify(user_fact, status="greeted")
```

**File:** `2/Experta/Lecture4/excersice1.py`

**See also:** [Part V — Applied Projects](#51-smart-home-ac-system-experta-intro) for complete implementations.

---

# Part IV — Graph Theory and State-Space Search

> This part formalizes the mathematical foundations of graph theory and applies them to state-space search — the backbone of classical AI problem-solving. The 8-Puzzle serves as the canonical implementation target.

---

## 4.1 Graph Definition and Terminology

A **graph** G = (V, E) consists of:
- **V** = set of vertices (nodes)
- **E** = set of edges (links) connecting pairs of vertices

### Core Terminology

| Term | Definition | Example |
|------|-----------|---------|
| **Vertex/Node** | Fundamental unit representing a state | A city in a road network |
| **Edge/Link** | Connection between two vertices | A road between cities |
| **Weight** | Cost associated with an edge | Distance in kilometers |
| **Path** | Sequence of connected vertices | Aleppo → Hama → Damascus |
| **Cycle** | Path that starts and ends at the same vertex | A → B → C → A |
| **Degree** | Number of edges incident to a vertex | Node with 3 connections has degree 3 |

---

## 4.2 Types of Graphs

| Type | Direction | Weights | Use Case |
|------|-----------|---------|----------|
| **Undirected** | Bidirectional | Optional | Social networks, road maps |
| **Directed (Digraph)** | Unidirectional | Optional | Web links, dependencies |
| **Weighted** | Either | Numerical costs | shortest path problems |
| **Unweighted** | Either | Uniform (1) | BFS/DFS traversal |

---

## 4.3 Graph Representations

### Adjacency List (Dictionary)

Preferred for **sparse graphs** — memory-efficient with O(V + E) space.

```python
graph = {
    "Aleppo":   {"Hama": 130, "Raqqa": 160},
    "Hama":     {"Homs": 45,  "Damascus": 200},
    "Homs":     {"Damascus": 140, "Latakia": 120},
}
```

**Operation Complexities:**
| Operation | Average | Worst |
|-----------|---------|-------|
| Lookup edge | O(1) | O(degree) |
| List neighbors | O(degree) | O(degree) |
| Add edge | O(1) | O(1) |

### Adjacency Matrix

N × N matrix — O(1) edge lookup but O(V²) space. Preferred for **dense graphs**.

| | Aleppo | Hama | Homs | Damascus |
|---|---|---|---|---|
| **Aleppo** | 0 | 130 | 0 | 0 |
| **Hama** | 130 | 0 | 45 | 200 |
| **Homs** | 0 | 45 | 0 | 140 |
| **Damascus** | 0 | 200 | 140 | 0 |

**When to Use Each:**
| Representation | Sparse (E ≈ V) | Dense (E ≈ V²) |
|----------------|----------------|----------------|
| Adjacency List | Preferred | — |
| Adjacency Matrix | — | Preferred |

---

## 4.4 Graph Traversals — BFS and DFS

| Property | BFS | DFS |
|----------|-----|-----|
| **Data Structure** | Queue (FIFO) | Stack (LIFO) |
| **Strategy** | Level by level | Deep before wide |
| **Complete?** | Yes (finite graph) | No (may loop in infinite graph) |
| **Optimal?** (uniform cost) | Yes | No |
| **Time Complexity** | O(V + E) | O(V + E) |
| **Space Complexity** | O(V) | O(V) |

**AI Application:** BFS guarantees shortest path for unweighted graphs; DFS is memory-efficient for deep search spaces.

> **Cross-reference:** Both BFS and DFS are applied in the **8-Puzzle solver** (see [BFS Implementation](#410-bfs-implementation)) and in the **Tango puzzle solver** (see [Constraint Satisfaction Problems](#412-constraint-satisfaction-problems)), where they perform exhaustive state exploration with visited-set cycle detection.

---

## 4.5 State-Space Search — Problem Formulation (8-Puzzle)

The **8-Puzzle** is a 3×3 grid with 8 tiles (1-8) and one blank space (0). It serves as the canonical benchmark for search algorithms.

### Goal State

```
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 0 │
└───┴───┴───┘
```

### Formal Problem Definition

| Component | Definition |
|-----------|-----------|
| **State** | 3×3 grid configuration (2D list) |
| **Initial State** | Starting configuration |
| **Actions** | `Up`, `Down`, `Left`, `Right` (blank tile movement) |
| **Transition Model** | `Result(state, action)` → new state after swapping |
| **Goal State** | Tiles 1-8 in order, blank at bottom-right |
| **Path Cost** | Number of moves (each move costs 1) |

### `PuzzleState` Class

```python
class PuzzleState:
    def __init__(self, board):
        self.board = board

    def blank_pos(self):
        for i in range(len(self.board)):
            for j in range(len(self.board[i])):
                if self.board[i][j] == 0:
                    return (i, j)

    def possible_actions(self):
        actions = []
        row, col = self.blank_pos()
        if row > 0: actions.append('Up')
        if row < len(self.board) - 1: actions.append('Down')
        if col > 0: actions.append('Left')
        if col < len(self.board[0]) - 1: actions.append('Right')
        return actions

    def apply_action(self, action):
        new_state = self.deep_copy()
        row, col = new_state.blank_pos()
        match action:
            case 'Up':    new_row, new_col = row - 1, col
            case 'Down':  new_row, new_col = row + 1, col
            case 'Left':  new_row, new_col = row, col - 1
            case 'Right': new_row, new_col = row, col + 1
        new_state.board[row][col], new_state.board[new_row][new_col] = \
            new_state.board[new_row][new_col], new_state.board[row][col]
        return new_state

    def is_goal(self):
        goal = [[1,2,3],[4,5,6],[7,8,0]]
        return self.board == goal

    def __hash__(self):
        return hash(tuple(tuple(i) for i in self.board))

    def __eq__(self, state):
        return self.__hash__() == state.__hash__()

    def get_next_states(self):
        return [self.apply_action(a) for a in self.possible_actions()]
```

### Difficulty Levels

| Level | Start State | Optimal Moves | Branching Factor |
|-------|-------------|---------------|------------------|
| Easy | `[[1,2,3],[4,5,6],[7,0,8]]` | 2 | 2-3 |
| Medium | `[[1,3,6],[5,0,2],[4,7,8]]` | 8 | 2-3 |
| Hard | `[[7,2,4],[5,0,6],[8,3,1]]` | 20 | 2-3 |

---

## 4.6 The General Search Algorithm

All search algorithms share the same **Graph Search** framework. The only variation is how nodes are selected from the frontier.

```
function GRAPH-SEARCH(problem):
    initialize frontier with initial state
    initialize explored set to empty

    loop:
        if frontier is empty: return failure

        choose and remove node from frontier  ← ONLY THIS STEP DIFFERS

        if node.state is goal: return solution

        add node.state to explored set

        for each child_state in get_next_states(node.state):
            if child_state not in explored:
                add child_node to frontier
```

### Algorithm Variation Summary

| Algorithm | Frontier Selection | Heuristic |
|-----------|-------------------|-----------|
| BFS | FIFO (popleft) | None |
| DFS | LIFO (pop) | None |
| UCS | Priority (cost) | None |
| A* | Priority (f = g + h) | h(n) |

---

## 4.7 Search Tree and Node Representation

```python
class Node:
    def __init__(self, state, parent=None, path_cost=0):
        self.state = state
        self.parent = parent
        self.path_cost = path_cost

    def __lt__(self, other):
        return self.path_cost < other.path_cost

    def __eq__(self, other):
        return self.__hash__() == other.__hash__()

    def __hash__(self):
        return self.state.__hash__()
```

**Node Fields:**
| Field | Purpose |
|-------|---------|
| `state` | The puzzle configuration |
| `parent` | Backpointer for path reconstruction |
| `path_cost` | Total cost from start (g(n)) |

---

## 4.8 Solution Path Reconstruction

Trace parent links from goal back to start:

```python
def get_solution_path(node):
    path = []
    current = node
    while current.parent is not None:
        path.append(current.state)
        current = current.parent
    path.append(current.state)
    path.reverse()
    return path
```

**Time Complexity:** O(d) where d is the solution depth.

---

## 4.9 DFS Implementation

**Data Structure:** LIFO Stack (deque with `pop()`)

```python
from collections import deque

def solve_dfs(start_state):
    start_node = Node(state=start_state)
    frontier = deque([start_node])
    explored = set()
    nodes_expanded = 0

    while frontier:
        current_node = frontier.pop()
        nodes_expanded += 1

        if current_node.state.is_goal():
            return current_node, nodes_expanded

        if current_node.state in explored:
            continue

        explored.add(current_node.state)

        for child_state in current_node.state.get_next_states():
            if child_state not in explored:
                child_node = Node(
                    state=child_state,
                    parent=current_node,
                    path_cost=current_node.path_cost + 1
                )
                frontier.append(child_node)

    return None, nodes_expanded
```

### Properties

| Property | Value | Notes |
|----------|-------|-------|
| **Complete** | Yes | With explored set in finite graph |
| **Optimal** | No | Finds first solution, not shortest |
| **Time** | O(b^m) | b = branching factor, m = max depth |
| **Space** | O(b × m) | Stores single path + siblings |

---

## 4.10 BFS Implementation

**Data Structure:** FIFO Queue (deque with `popleft()`)

```python
from collections import deque

def solve_bfs(start_state):
    start_node = Node(state=start_state)
    frontier = deque([start_node])
    explored = set()
    nodes_expanded = 0

    while frontier:
        current_node = frontier.popleft()
        nodes_expanded += 1

        if current_node.state.is_goal():
            return current_node, nodes_expanded

        if current_node.state in explored:
            continue

        explored.add(current_node.state)

        for child_state in current_node.state.get_next_states():
            if child_state not in explored:
                child_node = Node(
                    state=child_state,
                    parent=current_node,
                    path_cost=current_node.path_cost + 1
                )
                frontier.append(child_node)

    return None, nodes_expanded
```

### Properties

| Property | Value | Notes |
|----------|-------|-------|
| **Complete** | Yes | Guaranteed to find solution |
| **Optimal** | Yes | Shortest path for uniform cost |
| **Time** | O(b^d) | d = solution depth |
| **Space** | O(b^d) | Stores all frontier nodes |

### BFS Solver — Hard State Execution

```python
goal_node, nodes_expanded = solve_bfs(START_STATE_HARD)
path = get_solution_path(goal_node)
for state in path:
    state.print()
```

**Performance:** Solves the hard state (20 optimal moves) efficiently, printing each intermediate state in the solution path.

---

## 4.11 Adversarial Search — Minimax and Alpha-Beta Pruning

Unlike single-agent search (BFS, DFS, A*), adversarial search involves two opponents with opposing goals. The search must account for an opponent who minimizes the agent's score at every step.

### Adversarial vs. Single-Agent Search

| Property | Single-Agent Search | Adversarial Search |
|----------|--------------------|--------------------|
| **Players** | One | Two (maximizer vs. minimizer) |
| **Goal** | Find shortest/cheapest path | Find move sequence guaranteeing best outcome |
| **Frontier selection** | Deterministic (cost, FIFO, LIFO) | Alternating: max player picks best, min player picks worst |
| **Evaluation** | Path cost to goal | Terminal payoff or heuristic board score |
| **Optimality criterion** | Minimum cost to goal | Maximum guaranteed payoff |
| **Representative algorithms** | BFS, DFS, A*, Dijkstra | Minimax, Alpha-Beta, Expectimax |

### Minimax Algorithm

Minimax assumes both players play optimally. The maximizer (AI) chooses moves that increase its score; the minimizer (opponent) chooses moves that decrease it.

**Pseudocode:**

```
function MINIMAX(node, depth, is_maximizing):
    if node is terminal or depth == 0:
        return evaluate(node)

    if is_maximizing:
        best = -∞
        for each child in node.children:
            score = MINIMAX(child, depth - 1, FALSE)
            best = max(best, score)
        return best
    else:
        best = +∞
        for each child in node.children:
            score = MINIMAX(child, depth - 1, TRUE)
            best = min(best, score)
        return best
```

**Properties:**

| Property | Value | Notes |
|----------|-------|-------|
| **Complete** | Yes (finite game tree) | All terminal states reached |
| **Optimal** | Yes (given perfect evaluation) | Assumes opponent plays optimally |
| **Time** | O(b^d) | b = branching factor, d = search depth |
| **Space** | O(d) | Stores current path only |

### Alpha-Beta Pruning

Alpha-beta pruning accelerates minimax by skipping branches that cannot influence the final decision. It maintains two bounds:

- **α (alpha):** Best score the maximizer can guarantee along the current path
- **β (beta):** Best score the minimizer can guarantee along the current path

When `β ≤ α`, the remaining branches in that subtree are pruned — no further exploration is needed.

**Pruning Rule:**

| Condition | Action | Interpretation |
|-----------|--------|----------------|
| `β ≤ α` at max node | Prune remaining children | Minimizer already has a better option elsewhere |
| `β ≤ α` at min node | Prune remaining children | Maximizer already has a better option elsewhere |

**Pseudocode:**

```
function ALPHA-BETA(node, depth, α, β, is_maximizing):
    if node is terminal or depth == 0:
        return evaluate(node)

    if is_maximizing:
        best = -∞
        for each child in node.children:
            score = ALPHA-BETA(child, depth - 1, α, β, FALSE)
            best = max(best, score)
            α = max(α, best)
            if β ≤ α: break   // Beta cutoff
        return best
    else:
        best = +∞
        for each child in node.children:
            score = ALPHA-BETA(child, depth - 1, α, β, TRUE)
            best = min(best, score)
            β = min(β, best)
            if β ≤ α: break   // Alpha cutoff
        return best
```

**Impact on Effective Branching Factor:**

| Scenario | Minimax Nodes | Alpha-Beta Nodes | Reduction |
|----------|---------------|------------------|-----------|
| Random move order | b^d | b^d (no pruning) | None |
| Perfect move order | b^d | b^(d/2) | √(b^d) — equivalent to doubling depth |
| Typical with good ordering | b^d | b^(0.6d) to b^(0.8d) | Significant |

### Heuristic Evaluation Functions

When the search depth limit is reached (the game tree is too large to explore fully), a **heuristic evaluation function** estimates the board value without reaching a terminal state.

**Common components:**

| Component | Description | Example |
|-----------|-------------|---------|
| **Material count** | Difference in piece counts | `(AI pieces) - (opponent pieces)` |
| **Positional weight** | Center cells valued higher | Center = 3, corner = 2, edge = 1 |
| **Open-run counting** | Consecutive same-player marks | Runs of 2, 3, 4 scored exponentially |
| **Mobility** | Number of available moves | More moves = better position |
| **Center proximity** | Bonus for central control | Distance-to-center inverse weighting |

A good heuristic is **admissible** — it never overestimates the true value — ensuring minimax with alpha-beta remains optimal within the depth limit.

### Depth-Limited Search

Large game trees (chess: ~10^47 nodes) make full exploration infeasible. Depth-limited search explores to a fixed depth `d`, then applies the heuristic evaluation function at leaf nodes.

| Board Size | Typical Depth Limit | Rationale |
|-----------|-------------------|-----------|
| 3×3 | 9 (full search) | Small enough for exhaustive exploration |
| 5×5 | 4–6 | Heuristic evaluation needed at depth 4+ |
| 8×8+ | 2–3 | Only immediate tactical lines explored |

Depth limiting trades optimality for feasibility. Deeper limits produce stronger play but require more computation time.

### Transposition Tables

The same board position can be reached via different move sequences (transpositions). A **transposition table** caches evaluated positions to avoid redundant computation.

**Implementation concept:**

| Element | Description |
|---------|-------------|
| **Key** | Board state encoded as immutable hash (e.g., tuple of all cell values) |
| **Value** | Evaluation score + depth + flag (exact/upper-bound/lower-bound) |
| **Lookup** | Before evaluating a node, check if its state exists in the table |
| **Store** | After evaluation, insert the result keyed by board state |

**Benefits:**

- Eliminates redundant subtree evaluations
- Provides **exact scores** (if previously computed to same or greater depth)
- Provides **bounds** (if previously computed to lesser depth — still useful for pruning)

**Tradeoff:** Memory usage grows with the number of unique positions stored. Typical implementations use 64–256 MB with LRU eviction.

### Move Ordering Heuristics

Alpha-beta pruning is most effective when the best moves are examined first. **Move ordering** heuristics sort candidate moves to maximize early cutoffs:

| Heuristic | Description | Effect |
|-----------|-------------|--------|
| **Center proximity** | Try moves closer to board center first | Center cells have higher strategic value |
| **Capture-first** | Prioritize moves that capture opponent pieces | High-impact moves likely to improve score |
| **Killer moves** | Try moves that caused cutoffs at the same depth | Historically effective at this search level |
| **History heuristic** | Track moves that caused cutoffs across the entire search | Persistent ordering improvement |
| **Evaluation ordering** | Score child nodes with a quick heuristic, sort descending | Better estimate of best move without full search |

Good move ordering can reduce the effective branching factor from `b` to approximately `√b`, dramatically improving alpha-beta performance.

---

## 4.12 Constraint Satisfaction Problems

A **Constraint Satisfaction Problem (CSP)** formalizes a class of problems where variables must be assigned values from domains subject to constraints. CSP solvers combine search with inference to prune the search space.

### CSP Definition

A CSP is defined as a triple **(X, D, C)**:

| Component | Definition | Example (4×4 Tango Puzzle) |
|-----------|-----------|---------------------------|
| **Variables (X)** | Set of unknowns to be assigned | All empty cells: {(0,2), (1,3), ...} |
| **Domains (D)** | Set of possible values per variable | {SUN, MOON} for each cell |
| **Constraints (C)** | Rules restricting variable combinations | Row balance, adjacency, equality/opposite |

**Constraint types:**

| Type | Description | Example |
|------|-------------|---------|
| **Unary** | Restricts a single variable | Fixed cells: `cell(r,c) = SUN` |
| **Binary** | Relates two variables | Adjacent cells must not form 3 identical symbols |
| **Global** | Involves all variables in a scope | Each row must contain exactly N/2 SUNs and N/2 MOONs |

### Backtracking Search with Early Pruning

Backtracking systematically assigns values to variables, reverting when a constraint is violated.

**Pseudocode:**

```
function BACKTRACK(assignment):
    if assignment is complete: return assignment

    var = select_unassigned_variable(assignment)
    for each value in order_domain_values(var):
        if value is consistent with constraints given assignment:
            add var = value to assignment
            result = BACKTRACK(assignment)
            if result ≠ failure: return result
            remove var = value from assignment   // backtrack

    return failure
```

**Key properties:**

| Property | Value | Notes |
|----------|-------|-------|
| **Complete** | Yes | Explores all consistent assignments |
| **Optimal** | Depends | Finds *a* solution; optimization requires cost tracking |
| **Time** | O(d^n) worst case | d = domain size, n = number of variables |
| **Space** | O(n) | Stores current assignment only |

**Early pruning** cuts branches before full exploration:
- **Row/column balance:** If a row already has N/2 SUNs, all remaining empty cells must be MOON — no search needed
- **Adjacency constraint:** If placing a value would create three identical adjacent symbols, reject immediately
- **Equality/opposite constraint:** If one side of a constraint is known, the other is determined — propagate instantly

### Forward Chaining / Constraint Propagation

**Constraint propagation** reduces domains by applying constraints iteratively. When a variable's domain is reduced, this may trigger further reductions on related variables.

**Process:**

```
1. Initialize all variable domains to full values
2. Apply all constraints to reduce domains
3. If any domain becomes empty → failure (constraint contradiction)
4. If any domain becomes singleton → propagate to related variables
5. Repeat until fixed point (no more reductions possible)
```

**Connection to expert systems:** The Rete algorithm used in `experta` implements a form of constraint propagation — pattern matching against facts applies rule conditions that derive new facts, effectively reducing the space of possible conclusions.

**Example — Tango puzzle rule propagation:**

| Trigger | Rule Applied | Effect |
|---------|-------------|--------|
| Row has N/2 SUNs | Balance rule | All empty cells in row → MOON |
| Cell A = SUN with `=` constraint to Cell B | Equality rule | Cell B → SUN |
| Cell A = SUN with `×` constraint to Cell B | Opposite rule | Cell B → MOON |
| Cell A's domain reduced | All connected constraints | Neighboring domains may shrink |

### Branching Factor Reduction Strategies

Naive CSP search branches on all unassigned variables simultaneously, creating exponential explosion. Practical solvers reduce the effective branching factor:

| Strategy | Description | Effect |
|----------|-------------|--------|
| **"First Empty Cell" ordering** | Always branch on the first unassigned variable in a deterministic order | Converts factorial branching to binary tree (depth = number of empty cells) |
| **Most constrained variable** | Choose the variable with the smallest remaining domain first | Fails early when contradictions exist |
| **Domain filtering** | Remove values that violate constraints before branching | Reduces branches per variable |
| **Arc consistency** | Ensure every value in a variable's domain has a compatible value in every related variable's domain | Eliminates dead-end values preemptively |

The "first empty cell" strategy reduces branching from O(2^k × k!) (trying all empty cells in all orders) to O(2^k) (a binary tree of depth k), where k is the number of empty cells. For a 4×4 board with 12 empty cells, this is the difference between ~10^9 and ~4096 states.

### State Hashing for Cycle Detection

Search algorithms must detect when they revisit previously explored states to avoid infinite loops and redundant computation.

**Implementation:**

| Component | Purpose | Complexity |
|-----------|---------|------------|
| **Hash function** | Convert board state to unique string/int | O(n²) for n×n board |
| **Visited set** | Store hashes of all explored states | O(1) amortized lookup |
| **Cycle check** | Before expanding a state, verify hash is not in visited set | Prevents revisiting via different move orders |

**Hash design considerations:**

- Concatenating all cell values produces a deterministic, order-independent identifier
- Two boards with identical configurations always produce the same hash regardless of how they were constructed
- Comparing two hash strings is O(n²) worst case but effectively O(1) for fixed-size boards
- A set of hashes provides O(1) amortized membership testing, critical for search performance

**Tradeoff:** Storing all visited hashes consumes memory proportional to the number of explored states. For large puzzles, this may require bounded-size caches with LRU eviction.

---

# Part V — Architectural Foundations & Universal Patterns

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

# Part VI — Project Domain Analysis

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

# Part VII — Artificial Intelligence Systems

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

# Part VIII — Advanced Systems & Engineering Excellence

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

# Part IX — Technical Skills Matrix

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

# Part X — Project Evolution & Progression

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

# Part XI — Quick Reference

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


# Part XII — Pattern Matching Reference

> Quick-reference guide for `experta` pattern matching constructs. See [Part III](#part-iii--expert-systems-with-python-experta) for detailed explanations.

---

---

## Pattern Matching Constructs

| Construct | Syntax | Purpose | Scope |
|-----------|--------|---------|-------|
| **MATCH** | `Fact(field=MATCH.var)` | Extract value into variable | Single field |
| **AS** | `AS.fact << Fact(...)` | Bind entire fact for modify/retract | Entire fact |
| **W()** | `Fact(field=W())` | Field must exist (ignore value) | Single field |
| **P()** | `Fact(field=P(lambda x: ...))` | Inline condition on one field | Single field |
| **TEST** | `TEST(lambda: ...)` | Condition across multiple matched vars | Multiple fields |
| **AND** | `AND(pattern1, pattern2)` | All patterns must match | Multiple facts |
| **OR** | `OR(pattern1, pattern2)` | Any pattern can match | Multiple facts |
| **NOT** | `NOT(pattern)` | Pattern must NOT exist | Single fact |
| **EXISTS** | `EXISTS(pattern)` | At least one match (fire once) | Single fact type |
| **FORALL** | `FORALL(p1, p2)` | All p1 must satisfy p2 | Multiple facts |

---

## Rule Action Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `self.declare(Fact(...))` | Add a new fact | `self.declare(Fact(status="active"))` |
| `self.retract(fact)` | Remove a fact | `self.retract(self.facts[0])` |
| `self.modify(fact, key=value)` | Update a fact | `self.modify(fact, status="done")` |
| `self.facts` | View all current facts | `print(self.facts)` |

---

## Common Patterns

### Single Fact Matching

```python
@Rule(Fact(status="active"))
def handle_active(self):
    print("Processing active item")
```

### Multiple Fact Matching

```python
@Rule(Fact(status="active"), Fact(priority="high"))
def handle_high_priority(self):
    print("Processing high-priority active item")
```

### Value Extraction

```python
@Rule(Fact(user=MATCH.name, role=MATCH.r))
def process_user(self, name, r):
    print(f"Processing {name} with role {r}")
```

### Fact Modification

```python
@Rule(AS.fact << Fact(status="pending"))
def complete_task(self, fact):
    self.modify(fact, status="completed")
```

### Conditional Logic

```python
@Rule(Fact(speed=MATCH.s), TEST(lambda s: s > 70))
def issue_ticket(self, s):
    print(f"TICKET: Speed was {s} mph!")
```

---

## Decision Guide

| Scenario | Recommended Construct |
|----------|----------------------|
| Need to use a fact's value in the action | `MATCH` |
| Need to modify or retract a fact | `AS` + `modify()`/`retract()` |
| Need to check if a field exists | `W()` |
| Single-field condition | `P(lambda)` |
| Multi-field condition | `TEST(lambda)` |
| All conditions must be true | `AND` |
| Any condition can be true | `OR` |
| Fact must not exist | `NOT` |
| Fire once if any match exists | `EXISTS` |
| Fire only if all of type match | `FORALL` |

---


## Appendices

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
