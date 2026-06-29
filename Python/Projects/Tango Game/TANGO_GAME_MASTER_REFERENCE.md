# Tango AI Puzzle System — Master Reference Manual

**Al-Sham Private University (ASPU) — Computer Science Department**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture Overview](#2-architecture-overview)
3. [State Space Representation](#3-state-space-representation)
4. [Rule-Based Expert System](#4-rule-based-expert-system)
5. [Blind Search Algorithms](#5-blind-search-algorithms)
6. [Smart Puzzle Generation](#6-smart-puzzle-generation)
7. [Robustness & Validation](#7-robustness--validation)
8. [Implementation Reference](#8-implementation-reference)
9. [Summary](#9-summary)

---

## 1. Introduction

The Tango AI Puzzle System is a constraint-satisfaction puzzle solver that demonstrates the application of core Artificial Intelligence concepts through a practical, interactive implementation. The system combines multiple AI paradigms:

- **Rule-based expert systems** using forward chaining for logical deduction
- **Blind search algorithms** (BFS and DFS) for exhaustive state exploration
- **Constraint satisfaction** through backtracking generation
- **Defensive programming** for robust user interaction

The puzzle consists of an N×N grid where cells must be filled with either SUN (S) or MOON (M) symbols, subject to balance constraints (equal numbers of each symbol per row/column), adjacency constraints (no three identical symbols adjacent), and explicit equality/opposite constraints between neighboring cells.

---

## 2. Architecture Overview

The system follows a classical **Layered Architecture** pattern, separating concerns into three distinct logical layers that communicate through well-defined interfaces.

### 2.1 Layered Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   INTERACTION LAYER                     │
│         (UI Functions, Menu Navigation, I/O)            │
├─────────────────────────────────────────────────────────┤
│                    STATE LAYER                          │
│         (TangoBoard — Data Model & Validation)          │
├─────────────────────────────────────────────────────────┤
│                  INTELLIGENCE LAYER                     │
│    (UltimateSolver, TangoExpertEngine, BFS/DFS)         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 State Layer (TangoBoard Class)

**Responsibility:** Represents the puzzle's data model. Manages the N×N grid, the fixed_mask (boolean grid locking initial clues), and the constraint matrices (h_constraints and v_constraints).

**Encapsulation:** All rule validation logic (`is_legal`, `is_win`) is encapsulated within this class, ensuring that every board instance can independently verify its own consistency without external dependencies.

The board maintains four core data structures:

| Structure | Dimensions | Purpose |
|-----------|------------|---------|
| `board` | N×N | Cell values: EMPTY (0), SUN (1), MOON (2) |
| `fixed_mask` | N×N | Boolean grid indicating immutable cells |
| `h_constraints` | N×(N-1) | Horizontal constraints between adjacent columns |
| `v_constraints` | (N-1)×N | Vertical constraints between adjacent rows |

### 2.3 Intelligence Layer (UltimateSolver + TangoExpertEngine)

**Responsibility:** Contains all AI reasoning and search algorithms.

- `UltimateSolver` — Orchestrates the expert system, backtracking, BFS, and DFS
- `TangoExpertEngine` — Built on `experta` library, handles rule-based logical deduction

**Decoupling:** The solver receives a `TangoBoard` reference at initialization but does not mutate the board directly during search; instead, it operates on deep copies, preserving the original state for the UI layer.

### 2.4 Interaction Layer (Global Functions)

**Responsibility:** Handles all terminal I/O, user input validation, menu navigation, and puzzle generation orchestration.

The `start()` function acts as the entry point, instantiating the State and Intelligence layers, then entering the main event loop that bridges user actions to solver methods.

**Why this matters:** This separation ensures that the AI algorithms can be tested independently of the UI, and the board representation can be modified (e.g., switching from lists to numpy) without rewriting the solver logic.

---

## 3. State Space Representation

### 3.1 Mathematical Definition

A state **S** in the Tango puzzle is formally defined as a tuple:

```
S = (B, F, H, V)
```

Where:

- **B** is an N×N matrix where each cell B[i][j] ∈ {0, 1, 2} (EMPTY, SUN, MOON)
- **F** is an N×N boolean matrix indicating fixed (immutable) cells
- **H** is an N×(N-1) matrix of horizontal constraints between adjacent columns
- **V** is an (N-1)×N matrix of vertical constraints between adjacent rows

### 3.2 Programmatic Implementation

This is implemented using nested Python lists, avoiding external dependencies like numpy. Each matrix is constructed iteratively using `for` loops and `.append()`, making the data structure transparent and easily inspectable.

### 3.3 State Immutability: The `copy_board()` Function

The `copy_board(original)` function performs a manual deep copy of the entire `TangoBoard` object. This is critical for AI search because:

1. **State Immutability:** Search algorithms (BFS/DFS) must explore hypothetical futures without corrupting the current board. Each branch in the search tree requires an independent copy.
2. **No Shared References:** A shallow copy would cause multiple search nodes to reference the same underlying lists, leading to catastrophic state corruption during backtracking.
3. **Explicit Control:** By manually iterating through each matrix, the function guarantees complete independence between the original and copied states.

### 3.4 State Identification: The `get_hash()` Method

The `get_hash()` method generates a unique string identifier for a board state by concatenating all cell values into a single string. This serves two purposes:

1. **Visited Set Tracking:** Both BFS and DFS maintain a `visited = set()` of hashes. Before expanding a state, the algorithm checks if its hash exists in the set. This prevents infinite loops and redundant exploration of identical states reached via different move orders.
2. **State Comparison:** Comparing two full board objects is O(N²). Comparing two hash strings is O(1) amortized, making cycle detection computationally efficient.

---

## 4. Rule-Based Expert System

### 4.1 Architecture of TangoExpertEngine

The expert system is built using the `experta` library, which implements the Rete algorithm for efficient pattern matching. The system consists of:

#### Fact Classes

| Fact Class | Attributes | Purpose |
|------------|------------|---------|
| `CellFact` | row, col, value | Represents the state of a single cell |
| `HConstraintFact` | row, col, relation | Represents horizontal constraints |
| `VConstraintFact` | row, col, relation | Represents vertical constraints |

#### Knowledge Loading

The `load_board()` method translates the current board state into a set of facts declared into the engine's working memory using `self.declare()`.

### 4.2 Implemented Rules (12 Total)

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

### 4.3 Forward Chaining Deduction Process

1. **Fact Declaration:** The board state is loaded as facts into working memory.
2. **Pattern Matching:** The Rete engine automatically matches facts against the LHS (Left-Hand Side) of all `@Rule` decorators.
3. **Rule Firing:** When all conditions of a rule are satisfied, the RHS (Right-Hand Side) executes, appending a deduction `(r, c, v)` to the list.
4. **Application:** The `solve_next_step()` method retrieves deductions, validates them against `is_legal`, and applies the first valid one to the board. This loop repeats until no new deductions are found.

This demonstrates **forward chaining**: starting from known facts and deriving new knowledge until a fixed point is reached.

---

## 5. Blind Search Algorithms

### 5.1 BFS vs DFS Comparison

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

### 5.2 The "First Empty Cell" Branching Strategy

**Problem:** A naive approach branches on ALL empty cells simultaneously, creating a branching factor of 2 × k where k is the number of empty cells. For a 4×4 board with 12 empty cells, this yields 24 branches per state — leading to exponential explosion.

**Solution:** The `find_first_empty()` method returns the coordinates of the first empty cell encountered in row-major order. The search branches only on this single cell, trying v=1 (SUN) and v=2 (MOON). This reduces the branching factor to exactly 2 per state.

**Why this works:** The order of filling cells does not affect the final solution. By enforcing a deterministic fill order, the search tree becomes a binary tree of depth k instead of a factorial explosion, making 4×4 puzzles solvable in milliseconds.

### 5.3 Path Output Format

Both algorithms return the solution as a raw list of tuples:

```
[(r1, c1, v1), (r2, c2, v2), ..., (rk, ck, vk)]
```

Each tuple represents one move: (row_index, column_index, value). This format is:

- **Mathematically precise:** Each action is a 3-tuple mapping to the state transition function.
- **Serializable:** Can be printed, stored, or replayed deterministically.
- **Verified:** The `display_path()` function prints the raw path first, then iterates through it to show human-readable steps.

### 5.4 BFS Implementation

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

### 5.5 DFS Implementation

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

---

## 6. Smart Puzzle Generation

### 6.1 Why Random Placement Fails

The previous implementation placed random cells and random constraints independently. This produced mathematically impossible puzzles where the given clues contradicted each other or the constraints made the puzzle unsolvable.

### 6.2 The Three-Step "Generate → Mask" Strategy

#### Step 1: Generate a Full Valid Board

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

#### Step 2: Derive Constraints from Reality

Instead of placing random constraints, the algorithm iterates through all adjacent cell pairs on the completed board:

- If two adjacent cells have the same value → constraint = EQUAL (1)
- If they have different values → constraint = OPPOSITE (2)

**Guarantee:** Constraints are always consistent with the solution because they are derived from it.

#### Step 3: Mask (Hide) Cells

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

---

## 7. Robustness & Validation

### 7.1 Design Philosophy: The "Zero-Crash" Policy

The codebase strictly avoids `try-except` blocks for input validation. Instead, it employs defensive programming using `while True` loops with logical predicates. This approach:

1. **Prevents silent failures:** Exceptions can mask underlying logic errors. Explicit validation makes failure modes visible and recoverable.
2. **Ensures type safety:** `str.isdigit()` checks are performed before any `int()` conversion, eliminating `ValueError` crashes.
3. **Guarantees loop termination:** Each validation function only returns when a valid value is obtained, ensuring the main program never receives malformed input.

### 7.2 Validation Examples

#### Board Size Validation

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

#### Row/Column Input Validation

- Checks `isdigit()` first
- Converts to `int` only after validation
- Checks range boundaries `[0, size-1]` explicitly

#### Menu Choice Validation

- The main loop reads input as a string
- Compares against valid options using `if-elif` chains
- Invalid choices trigger an error message and loop continuation, never an exception

#### Value Input Validation

- Accepts only 'S', 'M', or 'E' (case-insensitive via `.upper()`)
- Any other input triggers a re-prompt

This design ensures the program cannot crash due to user input, regardless of what characters, empty strings, or extreme values are entered.

---

## 8. Implementation Reference

### 8.1 Constants and Data Types

```python
# Cell values
EMPTY = 0
SUN = 1
MOON = 2

# Constraint types
NONE = 0
EQUAL = 1
OPPOSITE = 2
```

### 8.2 Core Class Methods

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

### 8.3 Alternative Implementation (Simple Solve)

An alternative implementation exists that uses a different architectural approach:

**Key Differences:**

| Aspect | First Solve (TANGO_GAME.py) | Simple Solve (Tango.py) |
|--------|-----------------------------|-------------------------|
| Board Representation | Integer constants (0, 1, 2) | Character constants ('S', 'M', '.') |
| Constraint Storage | 2D matrices | Dictionary with tuple keys |
| Fixed Cells | Boolean 2D array | Set of (row, col) tuples |
| Expert System | 12 separate rule methods | 8 combined rule methods |
| Move Application | Direct board mutation | Returns new TangoBoard instance |
| Search Algorithm | BFS + DFS | DFS only |

The simple solve implementation demonstrates a more functional approach where each move creates a new board instance, which is inherently safer for search operations but may have higher memory overhead.

---

## 9. Summary

The Tango AI system demonstrates a mature application of core AI concepts:

| Concept | Implementation | Key Innovation |
|---------|----------------|----------------|
| State-Space Search | BFS/DFS with visited sets | "First Empty Cell" branching reduces complexity from factorial to exponential (base 2) |
| Expert Systems | Forward chaining via `experta` | 12 rules covering constraints, balance, and adjacency |
| Constraint Satisfaction | Backtracking generation | "Generate → Mask" strategy guarantees solvability |
| Defensive Programming | `while True` validation loops | Zero-crash policy without exception handling |
| Software Engineering | Three-layer architecture | Separation of concerns enables independent testing and modification |

**Performance Characteristics:**

- 4×4 puzzles: Solvable in milliseconds
- 6×6 puzzles: Solvable in seconds
- 8×8 puzzles: Solvable in minutes with BFS/DFS
- Expert system: Near-instantaneous for single-step deduction

**Key Algorithms:**

- **BFS:** Optimal path, higher memory usage
- **DFS:** Lower memory usage, no optimality guarantee
- **Backtracking:** Complete search with early pruning
- **Forward Chaining:** Incremental logical deduction

The system represents a complete integration of theoretical AI concepts with practical software engineering, demonstrating proficiency in algorithm design, data structure management, and user experience development.

---

*This document was generated from project source files and technical analysis reports.*
