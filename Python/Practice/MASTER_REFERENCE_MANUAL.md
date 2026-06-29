# Master Reference Manual — Python & Artificial Intelligence

> **Author:** Abdulrahman  
> **Scope:** Comprehensive reference consolidating all coursework, exercises, and project implementations across the Python & AI learning path  
> **Python Version:** 3.10+  
> **Key Libraries:** experta, collections, queue

---

## Table of Contents

| Part | Title | Focus |
|------|-------|-------|
| I | [Python Fundamentals](#part-i--python-fundamentals) | Language core, control flow, basic I/O |
| II | [Data Structures & OOP](#part-ii--data-structures--object-oriented-programming) | Advanced types, classes, design patterns |
| III | [Expert Systems](#part-iii--expert-systems-with-python-experta) | Declarative AI with `experta` |
| IV | [Graph Theory & Search](#part-iv--graph-theory-and-state-space-search) | Traversal algorithms, state-space search |
| | &emsp; 4.11 [Adversarial Search — Minimax and Alpha-Beta Pruning](#411-adversarial-search--minimax-and-alpha-beta-pruning) | Game-tree search, pruning, heuristics |
| | &emsp; 4.12 [Constraint Satisfaction Problems](#412-constraint-satisfaction-problems) | CSP definition, backtracking, propagation |
| V | [Applied Projects](#part-v--applied-projects-and-exercises) | Integrated implementations |
| VI | [Pattern Matching Reference](#part-vi--pattern-matching-reference) | Quick-reference cheat sheet |

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

# Part V — Applied Projects and Exercises

> This section consolidates all applied implementations, demonstrating the integration of Python fundamentals, expert systems, and search algorithms into complete, functional projects. Projects include the Smart Home AC System, Speed Radar System, Greeting Engine, BFS 8-Puzzle Solver, XO Game (with minimax AI), and Tango Puzzle Solver (with constraint satisfaction).

---

## 5.1 Smart Home AC System (Experta Intro)

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

**Execution Flow:**
1. Initial fact: `temperature_degree=30`
2. Rule `hot` fires → declares `ac_status="on"`
3. Rule `ac_on` fires → activates AC

**File:** `2/Experta/Introduction Excersices/excersice1.py`

---

## 5.2 Speed Radar System (Experta Intermediate)

A system using MATCH, AS fact binding, and TEST for conditional evaluation across multiple facts.

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

**Key Techniques:**
- `AS.light` captures the time fact for potential modification
- `MATCH.time` and `MATCH.user_status` extract values into parameters
- `TEST()` evaluates a compound condition across both extracted values

**File:** `2/Experta/Practice/SpeedRadarSystem.py`

---

## 5.3 Greeting Engine with Fact Modification

Demonstrates the complete fact lifecycle: pattern matching, value extraction, and runtime modification.

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

**Fact Lifecycle:**
| Step | Operation | Fact State |
|------|-----------|------------|
| 1 | `@DefFacts()` | `user_name="Alice", status="online"` |
| 2 | Rule matches | Pattern extracted |
| 3 | `self.modify()` | `user_name="Alice", status="greeted"` |

**File:** `2/Experta/Lecture4/excersice1.py`

---

## 5.4 BFS Solver — 8-Puzzle Hard State

The complete BFS solver applied to the hardest puzzle configuration (20 optimal moves).

```python
goal_node, nodes_expanded = solve_bfs(START_STATE_HARD)
path = get_solution_path(goal_node)
for state in path:
    state.print()
```

**Execution Summary:**
| Metric | Value |
|--------|-------|
| Start State | `[[7,2,4],[5,0,6],[8,3,1]]` |
| Optimal Moves | 20 |
| Algorithm | BFS (guarantees optimal) |
| Output | Prints each intermediate state |

**File:** `2/S6/Lec6.py`

---

## Project Integration Matrix

| Project | Concepts Applied | Key Files |
|---------|-----------------|-----------|
| Smart Home AC | `experta` basics, `@DefFacts`, `@Rule` | `excersice1.py` |
| Speed Radar | `MATCH`, `AS`, `TEST` | `SpeedRadarSystem.py` |
| Greeting Engine | Fact modification, `self.modify()` | `excersice1.py` |
| BFS Solver | `PuzzleState`, `solve_bfs()`, path reconstruction | `Lec6.py` |

---

# Part VI — Pattern Matching Reference

> Quick-reference guide for `experta` pattern matching constructs. See [Part III](#part-iii--expert-systems-with-python-experta) for detailed explanations.

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

*This manual was synthesized from lecture notebooks, exercise files, and project implementations across the Python & AI learning path. All code examples reflect original coursework and hands-on practice.*

**Document Version:** 2.0  
**Last Updated:** June 2026
