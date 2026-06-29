# Master Reference Manual — Programming Fundamentals (IPG101)

**Course:** IPG101 — Pseudo Code & Algorithmic Thinking  
**Student:** Abdulrahman  
**Academic Period:** Fall 2024  
**Document Classification:** Academic Portfolio — Technical Reference  
**Version:** 2.0  
**Date:** 2024-11-19

---

## Document Purpose

This manual serves as a comprehensive technical reference documenting the algorithmic solutions developed during the IPG101 course. It presents two distinct algorithmic implementations that demonstrate foundational competencies in computational thinking, problem decomposition, and formal algorithm specification.

---

## Table of Contents

1. [Competency Overview](#1-competency-overview)
2. [Algorithm A: Pythagorean Triples Generator](#2-algorithm-a-pythagorean-triples-generator)
3. [Algorithm B: Server Status Checker](#3-algorithm-b-server-status-checker)
4. [Comparative Analysis](#4-comparative-analysis)
5. [Methodology & Design Process](#5-methodology--design-process)
6. [Technical Appendices](#6-technical-appendices)

---

## 1. Competency Overview

### 1.1 Skills Demonstrated

The following technical competencies are evidenced through the implementations documented in this manual:

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

**Objective:** Generate all Pythagorean triples (a, b, c) satisfying the following constraints:

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
// Character-level validation
valid_day = (day ≥ 1) AND (day ≤ 7)
valid_hour = (hour ≥ 1) AND (hour ≤ 3)
valid_service = (service ≥ 1) AND (service ≤ 4)

// Compound validation
data_is_valid = valid_day AND valid_hour AND valid_service

// Error handling
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

## 4. Comparative Analysis

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

## 5. Methodology & Design Process

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

## 6. Technical Appendices

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

### Appendix D: Glossary

| Term | Definition |
|------|------------|
| **Pythagorean Triple** | Three positive integers (a, b, c) satisfying a² + b² = c² |
| **Hypotenuse** | The longest side of a right triangle, opposite the right angle |
| **Flowchart** | Visual representation of algorithmic logic using standardized symbols |
| **Pseudo Code** | Language-agnostic, human-readable algorithm specification |
| **Input Validation** | Process of checking user input against defined constraints |
| **Edge Case** | Input at the extreme boundary of valid range |

---

## Document Metadata

| Property | Value |
|----------|-------|
| **Author** | Abdulrahman |
| **Course** | IPG101 — Pseudo Code & Algorithmic Thinking |
| **Institution** | Academic Program |
| **Document Type** | Master Reference Manual |
| **Version** | 2.0 |
| **Classification** | Academic Portfolio Documentation |
| **Source Materials** | Course assignments, problem analyses, solution implementations |

---

*This manual documents original academic work. All algorithms, analyses, and implementations represent the author's own development and understanding of programming fundamentals.*

**End of Document — Collection 1: Programming Fundamentals**
