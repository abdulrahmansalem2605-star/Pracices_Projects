# Master Reference Manual — Password Generation & Validation

**Author:** Abdulrahman
**Language:** Java
**Package:** `s.generatepassword`

---

## 1. Project Overview

A console-based password validation utility built in Java. The program enforces a defined set of password rules, validates user input through iterative prompting, and provides visual feedback via formatted console output.

---

## 2. Architecture

### 2.1 Component Structure

```
GeneratePassword (class)
├── Input Layer
│   └── readString()          — Generic string input reader
├── Presentation Layer
│   ├── printBorder()          — Renders a horizontal separator
│   └── printTextInBorder()    — Wraps text within border delimiters
├── Validation Layer
│   ├── IsValidPasswordLength()    — Minimum length check (≥10)
│   ├── IsValidPasswordType()      — Alphanumeric-only enforcement
│   ├── countLettersInPassword()   — Letter frequency counter
│   └── IsValidPasswordLettersCount() — Minimum letter count (≥2)
└── Orchestration
    ├── ReadValidPassword()    — Input + validation loop
    └── main()                 — Entry point
```

### 2.2 Class-Level State

| Field        | Type     | Scope   | Purpose                              |
|-------------|----------|---------|--------------------------------------|
| `scanner`   | `Scanner` | static  | Shared `System.in` reader instance   |

---

## 3. Validation Rules

The program enforces three rules on user-supplied passwords:

| #  | Rule                                          | Method                           | Threshold |
|----|-----------------------------------------------|----------------------------------|-----------|
| R1 | Minimum length                                | `IsValidPasswordLength()`        | ≥ 10      |
| R2 | Alphanumeric characters only                  | `IsValidPasswordType()`          | —         |
| R3 | Minimum letter count                          | `IsValidPasswordLettersCount()`  | ≥ 2       |

### 3.1 Logical Composition

All three conditions must hold simultaneously. The validation loop uses short-circuit `||` evaluation:

```java
while (!IsValidPasswordLength(Password)
    || !IsValidPasswordType(Password)
    || !IsValidPasswordLettersCount(Password))
```

### 3.2 Implementation Details

#### `IsValidPasswordLength(String)`
Returns `true` if `Password.length() >= 10`. Trivial linear-time check.

#### `IsValidPasswordType(String)`
Iterates over every character and rejects the password if any character is neither a letter nor a digit:

```java
for (char c : Password.toCharArray()) {
    if (!Character.isLetterOrDigit(c)) {
        return false;
    }
}
```

This enforces the constraint: **no special characters, spaces, or symbols**.

#### `countLettersInPassword(String)`
Accumulates a count of alphabetic characters using a `short` counter. This is a supporting metric consumed by the letter-count validation.

#### `IsValidPasswordLettersCount(String)`
Delegates to `countLettersInPassword()` and returns `true` when the count is ≥ 2.

---

## 4. Presentation Layer

### 4.1 `printBorder(int borderLength)`

Renders a horizontal line of `=` characters, bracketed by blank lines. Used as a visual separator for output sections.

### 4.2 `printTextInBorder(String message, int borderLength)`

Wraps a message between two border lines:

```
====================================================

 <message>

====================================================
```

Used for both error messages and the final success confirmation.

---

## 5. Control Flow

```
main()
  │
  ▼
ReadValidPassword()
  │
  ├─► readString()  ──────────────────┐
  │                                    │
  ▼                                    │
Validation checks (R1 + R2 + R3)      │
  │                                    │
  ├── PASS ──► return password         │
  │                                    │
  └── FAIL ──► printTextInBorder() ────┘
              (error details)
```

The program loops until a valid password is supplied. On success, it prints `Valid Password` within borders.

---

## 6. I/O Specification

### 6.1 Input
- A single line of text from `System.in` via `Scanner.nextLine()`.

### 6.2 Output

**On invalid input:**
```
====================================================

 	 Invalid Password!

 * Password rules: 
 1. A password must have at least ten characters. 
 2. A password consists of only letters and digits. 
 3. A password must contain at least two digits.

====================================================
```

**On valid input:**
```
====================================================

 Valid Password

====================================================
```

---

## 7. Key Design Decisions

| Decision | Rationale |
|---|---|
| `short` counter for letter count | Memory-conscious choice for a bounded counter (passwords realistically won't exceed `Short.MAX_VALUE`) |
| De Morgan's note in code | Line 39 includes a comment clarifying the logical equivalence: `!(A \|\| B) → !A && !B`, demonstrating awareness of boolean algebra |
| Shared `Scanner` instance | Avoids repeated `System.in` stream wrapping; declared `static` to persist across method calls |
| Separate validation methods | Each rule is isolated in its own predicate, enabling independent testing and clear error-path composition |

---

## 8. Extensibility Considerations

Potential enhancements based on the current architecture:

- **Additional rule predicates** — The modular validation structure allows adding new `IsValid*` methods without modifying the control flow.
- **Character-class counters** — `countLettersInPassword` establishes a pattern that can be extended to count digits, uppercase, and lowercase characters independently.
- **Configuration-driven thresholds** — Hardcoded values (10, 2) could be extracted to constants or externalized.
- **Return type for validation** — Returning an enum or error code instead of `boolean` would enable rule-specific error messages without string matching.

---

*Manual generated from source: `GeneratePassword.java`*
