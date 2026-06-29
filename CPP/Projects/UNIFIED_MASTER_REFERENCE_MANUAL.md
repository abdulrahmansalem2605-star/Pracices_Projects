# Unified Master Reference Manual — C++ Systems Portfolio

**Author:** Abdulrahman Arfan Salem  
**Institution:** Al-Sham Private University — Faculty of Engineering (ITE)  
**Language:** C++ (C++11 through C++17)  
**Scope:** 7 projects spanning foundational concepts to enterprise-grade systems

---

## Preface

This manual consolidates a progressive series of C++ projects into a unified professional reference. Each project demonstrates specific engineering competencies — from low-level memory management and algorithm design to multi-module system architecture and embedded testing frameworks. The material is organized to reflect a deliberate learning trajectory: foundational concepts → applied algorithms → complete systems.

---

## Table of Contents

### Part I — Foundational Concepts

1. [Parameter Passing Mechanisms](#part-i--foundational-concepts)
   - 1.1 Call by Value
   - 1.2 Call by Reference
   - 1.3 Call by Pointers
   - 1.4 Comparative Analysis

2. [Core Programming Constructs](#2-core-programming-constructs)
   - 2.1 Function Overloading
   - 2.2 Templates & Generic Programming
   - 2.3 Recursion
   - 2.4 Preprocessor Macros
   - 2.5 Enumerations

### Part II — Algorithm & Data Structure Applications

3. [Dynamic Memory Management Patterns](#part-ii--algorithm--data-structure-applications)
   - 3.1 Manual Dynamic Arrays
   - 3.2 RAII-Based Arrays
   - 3.3 Resizing Strategies

4. [Sorting & Searching Algorithms](#4-sorting--searching-algorithms)
   - 4.1 QuickSort Implementation
   - 4.2 Binary Search Implementation
   - 4.3 Linear Search (Recursive)

5. [Chemistry Computation Toolkit](#5-chemistry-computation-toolkit)
   - 5.1 Unit Conversion Engine
   - 5.2 Periodic Table Database

### Part III — Applied Systems

6. [Order Management System](#part-iii--applied-systems)
   - 6.1 Architecture & Data Structures
   - 6.2 CRUD Operations
   - 6.3 Audit Trail System

7. [Employee Data Management & Contact Management](#7-employee-data-management--contact-management)
   - 7.1 Volume I: Employee System (Raw Pointers)
   - 7.2 Volume II: Contact System (Smart Pointers)
   - 7.3 Evolution Analysis

8. [Examination Order Management System](#8-examination-order-management-system)
   - 8.1 Three Implementation Approaches
   - 8.2 Comparative Evaluation

### Part IV — Enterprise Systems

9. [Hospital Simulation System](#part-iv--enterprise-systems)
   - 9.1 Architecture Overview
   - 9.2 Data Models
   - 9.3 Core Managers & Algorithms
   - 9.4 Embedded Testing Framework
   - 9.5 Algorithmic Complexity Summary

### Cross-Cutting Analysis

10. [Shared Patterns & Evolution](#cross-cutting-analysis)
    - 10.1 Input Validation Patterns
    - 10.2 Dynamic Memory Lifecycle
    - 10.3 Algorithmic Evolution
    - 10.4 Engineering Maturity Progression

---

# Part I — Foundational Concepts

---

## 1. Parameter Passing Mechanisms

This study establishes the three fundamental parameter-passing mechanisms in C++, providing the theoretical foundation for all subsequent projects.

### 1.1 Call by Value

A **copy** of the actual argument is created and passed to the function's formal parameter. Modifications within the function do not affect the original variable.

**Characteristics:**
- Copy of the variable is passed
- Changes never modify the original
- Actual and formal arguments in **different** memory locations
- Actual arguments remain secure against accidental modification

**Syntax:**
```cpp
returnType functionName(Type paramName)
{
    // Operations on paramName (a copy)
}
```

### 1.2 Call by Reference

The **address of the variable** is implicitly passed via a reference parameter. The function operates directly on the original variable.

**Characteristics:**
- An alias is created for the original variable
- Changes affect the original
- Actual and formal arguments share the **same** memory location
- Actual arguments can be accidentally modified

**Syntax:**
```cpp
returnType functionName(Type& paramName)
{
    // Operations on paramName (alias to the original)
}
```

### 1.3 Call by Pointers

The **address of the variable** is passed explicitly via a pointer parameter. The function dereferences the pointer to access the original variable.

**Characteristics:**
- Pointer (address) is passed
- Changes via dereferencing (`*ptr`) affect the original
- Both formal and actual arguments point to the same memory location
- Requires careful management to avoid dangling pointers

**Syntax:**
```cpp
returnType functionName(Type* paramName)
{
    // Operations via dereferencing: (*paramName)
}
```

### 1.4 Comparative Analysis

| Criterion | Call by Value | Call by Reference | Call by Pointers |
|-----------|---------------|-------------------|------------------|
| **Mechanism** | Copy passed | Alias created | Address passed |
| **Original Modified** | No | Yes | Yes (via deref) |
| **Memory Location** | Different | Same | Same (via ptr) |
| **Safety** | High | Medium | Low |
| **Use Case** | Read-only access | Mutation, large objects | Dynamic memory, nullable params |

**Practical Demonstration — Shopping Cart Counter:**

```cpp
void addToCartByValue(int itemsCount) { itemsCount++; }        // No effect
void addToCartByReference(int& itemsCount) { itemsCount++; }   // Modifies original
void addToCartByPointer(int* itemsCount) { (*itemsCount)++; }  // Modifies original
```

**Output:**
| Step | Mechanism | itemsCount |
|------|-----------|------------|
| Initial | — | N |
| By Value | Call by Value | N (unchanged) |
| By Reference | Call by Reference | N + 1 |
| By Pointer | Call by Pointer | N + 2 |

**Dangling vs Valid Pointers:**

```cpp
// DANGEROUS: Returns pointer to stack variable
void DanglingPointer(int*& ptr) {
    int localVar = 100;
    ptr = &localVar;  // INVALID after function returns
}

// SAFE: Heap-allocated memory outlives the function
void ValidPointer(int*& ptr) {
    ptr = new int(100);  // Persists until explicitly deleted
}
```

**Best Practices:**
1. Always initialize pointers (`nullptr` over uninitialized)
2. Validate before dereferencing
3. Pair every `new` with `delete`
4. Set to `nullptr` after `delete`

---

## 2. Core Programming Constructs

*Derived from the Collection of 10 Homework Assignments*

### 2.1 Function Overloading

Two `Area` functions sharing the same name with different parameter counts:

```cpp
double Area(double RectangleLength, double RectangleWidth)
{
    return RectangleLength * RectangleWidth;
}

double Area(double radius)
{
    return PI() * radius * radius;
}
```

### 2.2 Templates & Generic Programming

**Generic Swap Function:**
```cpp
template<typename T>
void Swap(T& A, T& B)
{
    T Temp;
    Temp = A;
    A = B;
    B = Temp;
}
```

**Template Struct with Enum-Based Type Selection:**
```cpp
template <typename T>
struct stMyVariables
{
    T Variable1;
    T Variable2;
};

enum enVariableType { Char = 1, Long_Double, LONG_LONG, String };
```

Four overloaded `GetVariableValuesForType` functions handle reading for each supported type, demonstrating template instantiation via `static_cast` and `switch`.

### 2.3 Recursion

**Recursive Linear Search:**
```cpp
unsigned short recursiveSearchInArray(float* arr, unsigned short currentIndex, 
                                      unsigned short size, float key)
{
    if (currentIndex >= size) return -1;
    if (arr[currentIndex] == key) return currentIndex;
    return recursiveSearchInArray(arr, currentIndex + 1, size, key);
}
```

**Recursive Digit Printing:**
```cpp
void PrintDigitsOfNumber(unsigned long long Number)
{
    if (Number > 0)
    {
        PrintDigitsOfNumber(Number / 10);  // Recurse first
        cout << Number % 10 << " ";        // Then print current digit
    }
}
```

**Execution Trace (input: 1234):**
| Call | Number | Action |
|------|--------|--------|
| 1 | 1234 | Recurse with 123 |
| 2 | 123 | Recurse with 12 |
| 3 | 12 | Recurse with 1 |
| 4 | 1 | Base case reached |
| 4 | 1 | Print `1 % 10 = 1` |
| 3 | 12 | Print `12 % 10 = 2` |
| 2 | 123 | Print `123 % 10 = 3` |
| 1 | 1234 | Print `1234 % 10 = 4` |

### 2.4 Preprocessor Macros

**Multi-Line Macro with Continuation:**
```cpp
#define PRINT_MAX(x,y) \
        cout << endl; \
        if ((x) > (y)) \
            cout << "Max element is : first variable" \
                      << " and its value = " << (x) << '\n'; \
        else if ((x) < (y)) \
            cout << "Max element is : second variable" \
                      << " and its value = " << (y) << '\n'; \
        else \
            cout << "first variable = " << (x) \
                      << " equals " \
                      << "second variable = " << (y) << '\n';
```

**Note:** Parenthesization of macro parameters (`(x)`, `(y)`) prevents operator precedence issues.

### 2.5 Enumerations

**Parity Classification:**
```cpp
enum enEvenOrOdd { Odd = 1, Even = 2 };
```

**Enum-Based Result Pipeline:**
```
ReadVariables → areEqual → Get_areEqual_Statue → Get_areEqual_String → PrintFinaleResult
```

---

# Part II — Algorithm & Data Structure Applications

---

## 3. Dynamic Memory Management Patterns

### 3.1 Manual Dynamic Arrays

**Core Pattern (Employee System):**
```cpp
EMPLOYEE* resize(int oldSize, int newSize, EMPLOYEE* arr) {
    EMPLOYEE* newArr = new EMPLOYEE[newSize];
    for (int i = 0; i < min(oldSize, newSize); i++) {
        newArr[i] = arr[i];
    }
    delete[] arr;
    return newArr;
}
```

### 3.2 RAII-Based Arrays (Contact System)

**Smart Pointer Architecture:**
```cpp
struct DynamicContacts {
    unique_ptr<unique_ptr<Contact>[]> data;
    int size;
    int capacity;

    DynamicContacts(int cap = 10)
        : data(new unique_ptr<Contact>[cap]), size(0), capacity(cap) {}
};
```

**Resize with Move Semantics:**
```cpp
void resize(int newCap) {
    auto newData = make_unique<unique_ptr<Contact>[]>(newCap);
    for (int i = 0; i < size; ++i)
        newData[i] = move(data[i]);
    data = move(newData);
    capacity = newCap;
}
```

### 3.3 Resizing Strategies

| Strategy | Growth | Shrink | Amortized Insert |
|----------|--------|--------|------------------|
| **Exact-fit** | None | None | O(n) |
| **Doubling** | ×2 | None | O(1) |
| **Geometric + Shrink** | ×2 | ÷2 at 25% | O(1) |

**Geometric + Shrink (Contact System):**
| Condition | Action | Rationale |
|-----------|--------|-----------|
| `size == capacity` | `resize(capacity * 2)` | Amortized O(1) insertion |
| `size < capacity / 4` | `resize(capacity / 2)` | Reclaim memory |
| `capacity > 10` | Never shrink below 10 | Prevent thrashing |

---

## 4. Sorting & Searching Algorithms

### 4.1 QuickSort Implementation

**Lomuto Partition (Employee System):**
```cpp
int partition(int low, int high, EMPLOYEE employees[]) {
    int pivot = employees[high].id;
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (employees[j].id <= pivot) {
            i++;
            swap(employees[i], employees[j]);
        }
    }
    swap(employees[i + 1], employees[high]);
    return i + 1;
}
```

**Hoare Partition (Contact System):**
```cpp
void quickSort(unique_ptr<Contact>* arr, int left, int right) {
    int i = left, j = right;
    int pivot = arr[(left + right) / 2]->contactID;
    while (i <= j) {
        while (arr[i]->contactID < pivot) i++;
        while (arr[j]->contactID > pivot) j--;
        if (i <= j) {
            swap(arr[i], arr[j]);
            i++; j--;
        }
    }
    if (left < j) quickSort(arr, left, j);
    if (i < right) quickSort(arr, i, right);
}
```

| Aspect | Lomuto (Employee) | Hoare (Contact) |
|--------|-------------------|-----------------|
| Pivot | Last element | Midpoint |
| Partition | Lomuto scheme | Hoare scheme |
| Swap | Values | Smart pointers |
| Performance | Good average | Better average |

### 4.2 Binary Search Implementation

**Employee System (prints directly):**
```cpp
void search_about_employee(int ID, int n, EMPLOYEE* employees) {
    quick_Sort(0, n - 1, employees);  // Ensure sorted
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (employees[mid].id < ID) low = mid + 1;
        else if (employees[mid].id > ID) high = mid - 1;
        else { /* display found */ return; }
    }
    cout << "Employee with ID " << ID << " not found." << endl;
}
```

**Contact System (returns index for reuse):**
```cpp
int binarySearch(unique_ptr<Contact>* arr, int size, int targetID) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int midID = arr[mid]->contactID;
        if (midID == targetID) return mid;
        else if (midID < targetID) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

### 4.3 Linear Search (Recursive)

```cpp
unsigned short recursiveSearchInArray(float* arr, unsigned short currentIndex, 
                                      unsigned short size, float key)
{
    if (currentIndex >= size) return -1;
    if (arr[currentIndex] == key) return currentIndex;
    return recursiveSearchInArray(arr, currentIndex + 1, size, key);
}
```

---

## 5. Chemistry Computation Toolkit

### 5.1 Unit Conversion Engine

**Architecture:** Four independent conversion functions with two-tier input validation.

**Conversion Functions:**
| Function | Units Supported | Conversion Method |
|----------|----------------|-------------------|
| `convertLength` | m, km, cm | Matrix-based |
| `convertTime` | s, min, h | Matrix-based |
| `convertWeight` | g, kg | Ternary expressions |
| `convertTemperature` | C, K, F | Direct formula evaluation |

**Temperature Conversion Matrix:**
| From → To | Formula |
|-----------|---------|
| C → K | `value + 273.15` |
| K → C | `value - 273.15` |
| C → F | `(value * 9/5) + 32` |
| F → C | `(value - 32) * 5/9` |
| F → K | `(value - 32) * 5/9 + 273.15` |
| K → F | `(value - 273.15) * 9/5 + 32` |

### 5.2 Periodic Table Database

**Two Architectural Approaches:**

| Version | Data Structure | Encapsulation |
|---------|----------------|---------------|
| Array | `const char elements[118][300]` | Inline in `main()` |
| Function | `const char** getChemicalElements(int&)` | Dedicated function |

**Search Algorithm:**
```cpp
for (int i = 0; i < numberOfElements; i++)
{
    if (strncmp(symbol, elements[i], strlen(symbol)) == 0)
    {
        cout << " Element: " << elements[i] << endl;
        found = true;
        break;
    }
}
```

**String Handling (`<cstring>`):**
| Function | Purpose |
|----------|---------|
| `strcmp(a, b)` | Exact match (exit command) |
| `strncmp(a, b, n)` | Prefix match (symbol search) |
| `strlen(s)` | Determine comparison length |

---

# Part III — Applied Systems

---

## 6. Order Management System

*Institution: Al-Sham Private University — Spring 2024–2025*  
*Authors: Abdulrahman Arfan Salem & Ahmed Yaser Jamous*

### 6.1 Architecture & Data Structures

```
┌─────────────────────────────────────────────────────────┐
│                    MAIN MENU LOOP                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Add      │ │ Display  │ │ Modify   │ │ Delete/  │   │
│  │ Order    │ │ Orders   │ │ Order    │ │ Partial  │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
│       │             │            │             │          │
│  ┌────▼─────────────▼────────────▼─────────────▼────┐   │
│  │              DynamicArray (orders)                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────── Hidden Admin Commands ──────────┐ │
│  │ loeschen │ aenderung │ forschung                   │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Data Structures:**

```cpp
struct Product {
    string name;
    int quantity;
    double unitPrice;
};

struct Order {
    string orderID;
    string customerID;
    Product* products;
    int productCount;
    double totalPrice;
};

struct DynamicArray {
    Order* data;
    int size;
    int capacity;

    DynamicArray(int initialCapacity = 10);
    ~DynamicArray();
    void resize(int newCapacity);
    void add(const Order& order);
    void removeAt(int index);
};
```

**Memory Management Strategy:**
| Operation | Behavior |
|-----------|----------|
| Constructor | Allocates initial capacity (default: 10) |
| Destructor | Deletes all product arrays, then order array |
| resize() | Creates new array, copies elements, deletes old |
| add() | Doubles capacity when full |
| removeAt() | Shifts elements left, shrinks at 25% utilization |

### 6.2 CRUD Operations

**Global State:**
```cpp
DynamicArray orders;
DynamicArray partiallyDeletedOrders;
DynamicArray fullyDeletedOrders;
DynamicArray modifiedOrders;
```

**Order Selection (Two Modes):**
1. **Direct ID Entry:** Binary search O(log n)
2. **Browse & Select:** Display all, user picks by index O(n)

**Add Order Workflow:**
1. Prompt for customer ID
2. Select order type (single/multiple products)
3. For each product: display catalog → select → enter quantity
4. Calculate total price
5. Generate unique order ID
6. Sort orders by ID

**Delete / Partial Delete:**
- **Full Deletion:** Save to `fullyDeletedOrders`, remove from active
- **Partial Deletion:** Remove specific product, save pre-deletion copy
- **Auto-convert:** Empty orders after partial deletion move to `fullyDeletedOrders`

### 6.3 Audit Trail System

The four-array design provides complete mutation history:
| Array | Purpose |
|-------|---------|
| `orders` | Active orders |
| `partiallyDeletedOrders` | Orders with products removed |
| `fullyDeletedOrders` | Completely removed orders |
| `modifiedOrders` | Orders with quantity changes |

**Secret Commands (German):**
| Command | Meaning | Function |
|---------|---------|----------|
| `loeschen` | "Delete" | View deleted orders |
| `aenderung` | "Modification" | View modified orders |
| `forschung` | "Research" | View both |

---

## 7. Employee Data Management & Contact Management

### 7.1 Volume I: Employee System (Raw Pointers)

**Architecture:** Procedural paradigm with centralized data structure.

**Three-Layer Design:**
```
┌──────────────────────────────────────────────┐
│              Presentation Layer               │
│   welcome()  │  choose_operation()  │  main() │
├──────────────────────────────────────────────┤
│            Business Logic Layer               │
│  enter_information()  │  Delete_information() │
│  search_about_employee()  │  print_information│
├──────────────────────────────────────────────┤
│            Infrastructure Layer               │
│  partition()  │  quick_Sort()  │  resize()    │
│  EMPLOYEE struct  │  Dynamic Array Mgmt      │
└──────────────────────────────────────────────┘
```

**Data Structure:**
```cpp
struct EMPLOYEE {
    int id;
    string name;
    long int salary;
};
```

**Memory Lifecycle:**
```
main() starts → employees = nullptr
    │
    ▼
enter_information → resize(old, new)
    │
    ▼
Operations loop (1-5)
    │
    ▼
Exit (choice 5) → delete[] employees → employees = nullptr
```

### 7.2 Volume II: Contact System (Smart Pointers)

**Architecture:** Procedural with RAII-based data structures, function pointers for display polymorphism.

**Four-Layer Design:**
```
┌────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│   main() loop  │  handleSecretLogCommand()  │  getConfirmation() │
├────────────────────────────────────────────────────────────┤
│                  Business Logic Layer                        │
│  addContact()  │  displayContacts()  │  modifyContact()      │
│  deleteContact()  │  searchByID()  │  printContact()         │
├────────────────────────────────────────────────────────────┤
│            Infrastructure & Data Layer                       │
│  DynamicContacts  │  quickSort()  │  binarySearch()          │
│  unique_ptr  │  Move Semantics  │  Input Validation          │
├────────────────────────────────────────────────────────────┤
│                    Audit Layer                               │
│  modifiedContacts  │  partiallyDeletedContacts               │
│  fullyDeletedContacts  │  Secret Commands                    │
└────────────────────────────────────────────────────────────┘
```

**Data Structure:**
```cpp
struct Contact {
    int contactID;
    string name;
    string phone;
    string email;
};

struct DynamicContacts {
    unique_ptr<unique_ptr<Contact>[]> data;
    int size;
    int capacity;

    DynamicContacts(int cap = 10)
        : data(new unique_ptr<Contact>[cap]), size(0), capacity(cap) {}
};
```

**Key Features:**
- **Function Pointer Display:** `using PrintFunc = void(*)(const Contact&);`
- **Move Semantics:** Ownership transfer without copying
- **Geometric Growth:** ×2 growth, ÷2 shrink at 25%

### 7.3 Evolution Analysis

| Dimension | Volume I: Employee | Volume II: Contact |
|-----------|-------------------|-------------------|
| **Pointer type** | Raw (`EMPLOYEE*`) | Smart (`unique_ptr<Contact>`) |
| **Memory management** | Manual `new[]`/`delete[]` | RAII via `unique_ptr` array |
| **Resize strategy** | Exact-fit | Geometric (×2/÷2) |
| **Sort algorithm** | QuickSort (Lomuto) | QuickSort (Hoare) |
| **Input validation** | None | Comprehensive |
| **Audit trail** | None | Three-tier logging |
| **UI pattern** | Recursive menu | Iterative loop |
| **Confirmation prompts** | None | All destructive ops |

---

## 8. Examination Order Management System

*Course: CS 20252 — Computer Science*  
*Assignment: 1 — Dynamic Arrays with Pointers and Structs*

### 8.1 Three Implementation Approaches

| Solution | File | Paradigm | Lines | Complexity |
|----------|------|----------|-------|------------|
| **A** | `حل بسيط.cpp` | Procedural (global state) | 223 | Foundational |
| **B** | `حل متقدم.cpp` | Modular procedural | 600 | Advanced |
| **C** | `طريقة حل مختلفة.cpp` | Object-Oriented | 254 | Intermediate |

### 8.2 Comparative Evaluation

| Criteria | Solution A | Solution B | Solution C |
|----------|------------|------------|------------|
| **Abstraction** | Low | High | Medium-High |
| **Input validation** | Minimal | Comprehensive | Basic |
| **Memory management** | Grow-only | Bidirectional | RAII (ctor/dtor) |
| **Type safety** | String | Enum | String |
| **Uniqueness enforcement** | No | Yes | Yes |
| **Delete correctness** | Buggy | Correct | Correct |
| **Code organization** | Linear | Modular | Encapsulated |

**Status Workflow:**
```
                  ┌──────────┐
                  │ InReview │  ← Default
                  └────┬─────┘
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
       ┌─────────┐          ┌──────────┐
       │ Accepted │          │ Rejected │
       └─────────┘          └──────────┘
            │                     │
            └──────────┬──────────┘
                       ▼
                  ┌──────────┐
                  │ Deletable │  ← Only Accepted/Rejected
                  └──────────┘
```

**Engineering Maturity Progression:**
| Stage | Characterization | Lesson |
|-------|------------------|--------|
| **Solution A** | Getting it done | Core mechanics work but edge cases unhandled |
| **Solution C** | Getting it organized | Encapsulation improves safety and clarity |
| **Solution B** | Getting it robust | Comprehensive validation and modular design |

---

# Part IV — Enterprise Systems

---

## 9. Hospital Simulation System

> A comprehensive, algorithm-annotated C++17 console application simulating core hospital operations.

### 9.1 Architecture Overview

**Four-Layer Architecture:**
```
HospitalSystem/
├── Models/          ← Data structures (POD structs + serialize/deserialize)
│   ├── clsPatient.h
│   ├── clsBedRoom.h
│   ├── clsBloodBag.h
│   └── clsOperation.h
├── Core/            ← Business logic managers (algorithm engines)
│   ├── clsRegistryManager.h
│   ├── clsERManager.h
│   ├── clsInPatientManager.h
│   ├── clsOperationManager.h
│   ├── clsBloodBankManager.h
│   └── clsLabManager.h
├── Utilities/       ← Infrastructure (string, file I/O, date, input, random)
│   └── HospitalUtilities.h
├── UI/              ← Console display, menus, verification
│   ├── clsScreenMenus.h
│   ├── clsVerificationSuite.h
│   └── main.cpp
└── Data/            ← Flat-file persistence
    ├── Registry.txt
    ├── ER.txt
    ├── InPatient.txt
    ├── BloodBank.txt
    ├── LabTests.txt
    └── Operations.txt
```

**Key Design Principles:**
- Each manager class owns its data and serializes to `#`-delimited flat files
- `clsRegistryManager` is the **single source of truth** for patient lifetime
- Every public method includes a complexity annotation
- `SANDBOX_VERIFY` macro-based testing runs at startup

### 9.2 Data Models

**clsPatient (Central Entity):**
```
int m_ID                    — Randomly generated 4-digit ID
string m_Name               — Patient name
string m_BloodType          — One of 8 standard types
vector<string> m_Medications — Medication history
vector<string> m_Surgeries   — Surgery history
vector<string> m_LabTests    — Lab test history
void* m_LocationPtr         — Polymorphic pointer to current location
bool m_IsActive             — Discharge flag
```

**Serialization:** `ID#Name#BloodType#Medications(comma-sep)#Surgeries(comma-sep)#LabTests(comma-sep)#IsActive(0/1)`

**clsBedRoom:**
```cpp
enum enBedStatus { BedAvailable = 0, BedOccupied = 1, BedMaintenance = 2 };

struct stBedRoom {
    int RoomNumber;
    int BedIndex;
    enBedStatus Status;
    clsPatient* AssignedPatient;
};
```

**clsBloodBag:**
```cpp
struct stBloodBag {
    string DonorTimestamp;  // "DD/MM/YYYY HH:MM"
    string BloodGroup;      // e.g., "O+", "A-"
    string UniqueKey;       // e.g., "ABCD-EFGH-IJKL-MNOP"
};
```

**clsOperation:**
```cpp
struct stOperation {
    int RoomID;
    stDateTime StartTime;
    int DurationMinutes;
    unsigned short Priority;  // 1-5 (1 = most critical)
    clsPatient* Patient;
};
```

### 9.3 Core Managers & Algorithms

#### clsRegistryManager — Patient Source of Truth

**Data Structure:** Two `unordered_map<string, clsPatient*>` — one keyed by ID, one by lowercase name.

| Method | Complexity | Description |
|--------|-----------|-------------|
| `Register(patient)` | O(1) avg | Inserts or replaces; takes heap ownership |
| `DeactivatePatient(id)` | O(1) avg | Sets `IsActive=false`, clears location |
| `FindByID(id)` | O(1) avg | Hash lookup by stringified ID |
| `FindByName(name)` | O(1) avg | Case-insensitive hash lookup |
| `Remove(id)` | O(1) avg | Erases and `delete`s the patient object |

**Critical Invariant:** This manager is the **sole owner** of all `clsPatient` objects. Other modules receive raw pointers but never `delete` them.

#### clsERManager — Emergency Room Triage

**Data Structures:**
- `stBedRoom m_Beds[10]` — Fixed-size array of 10 ER beds
- `priority_queue<stERWaitEntry, vector, enWaitComparator> m_Waitlist` — **Max-heap** for overflow

**Heap Comparator:** Returns `true` if `a` has LOWER priority than `b`. This produces a max-heap where the most critical patient (lowest priority number) sits at the top.

**Triage Priority Levels:**
| Level | Label |
|-------|-------|
| 1 | Life-Threatening |
| 2 | Urgent |
| 3 | Stable-Urgent |
| 4 | Semi-Urgent |
| 5 | Non-Urgent |

**Automatic Bed Promotion:** When `Treat()` discharges a patient and the waitlist is non-empty, the highest-priority waiting patient is immediately promoted to the freed bed.

#### clsInPatientManager — Department-Based Ward System

**Data Structure:** `unordered_map<int, stDepartment>` mapping department IDs to fixed-size room/bed grids.

```cpp
struct stDepartment {
    stBedRoom Rooms[MAX_ROOMS][BEDS_PER_ROOM];  // 20 rooms x 2 beds = 40 beds max
    int ActiveRoomCount;
};
```

#### clsOperationManager — Surgery Scheduling with Overlap Detection

**Data Structures:**
- `stSurgeryRoom m_Rooms[5]` — Fixed array of 5 operating rooms
- `set<stOperation, enOperationComparator> m_Schedule` — **Sorted set (BST)** ordered by start time

**Overlap Detection Algorithm:**
```cpp
bool HasOverlap(const stOperation& probe) const {
    // Linear scan of set, filtered by RoomID
    // Early exit: once oStart >= pEnd, no more overlaps possible
}
```

#### clsBloodBankManager — FIFO Blood Bag Inventory

**Data Structure:** `unordered_map<string, queue<stBloodBag>>` — Maps each of 8 blood types to a FIFO queue.

**Expiry Logic:** `clsDateUtils::IsBloodBagExpired` returns true when difference > 7200 minutes (5 days). During `Dispense()`, expired bags at the front are popped and discarded.

#### clsLabManager — Dual-Heap Device Scheduling

**Data Structures:**
- `priority_queue<int, vector<int>, greater<int>> m_AvailableDevices` — **Min-heap** of available device IDs
- `priority_queue<stLabTest, vector, enTestMaxComparator> m_Waitlist` — **Max-heap** of pending tests
- `unordered_map<int, stLabTest> m_BusyDevices` — Maps device IDs to active tests

**Synchronous Transfer Mechanism:**
```
SubmitTest():
  if (devices available) → pop min-heap, assign directly     [O(log k)]
  else                  → push to max-heap waitlist           [O(log W)]

CompleteTest(deviceID):
  remove from busy map                                        [O(1)]
  if (waitlist non-empty) → pop max-heap, assign to freed device
  else                    → push device back to available heap
```

### 9.4 Embedded Testing Framework

**Macro-Based Verification:**
```cpp
#define SANDBOX_VERIFY(cond, msg) do { \
    if (cond) { cout << "[PASS] " << msg; s_PassCount++; } \
    else      { cout << "[FAIL] " << msg; s_FailCount++; } \
} while(0)
```

**Test Categories:**
| Category | Tests | What is Verified |
|----------|-------|-----------------|
| REG-1/2/3 | Registry | Count after register, FindByID, case-insensitive FindByName |
| ER-1/2/3 | Emergency Room | 10 beds occupied, waitlist overflow, heap ordering, treat + auto-promote |
| IP-1/2/3 | In-Patient | Department creation, bed assignment, release |
| OP-1..7 | Operations | Schedule, cancel, concurrent rooms, overlap rejection |
| BL-1/2/3 | Blood Bank | Queue size, expired bag filtering, dispense correctness |
| LB-1/2/3 | Lab | Dual-heap: all devices busy, waitlist, sync transfer |

### 9.5 Algorithmic Complexity Summary

| Module | Data Structure | Insert | Lookup | Delete | Notes |
|--------|---------------|--------|--------|--------|-------|
| Registry | `unordered_map` (x2) | O(1) avg | O(1) avg | O(1) avg | Dual index: by ID and by name |
| ER Beds | `stBedRoom[10]` | O(10) scan | O(10) scan | O(1) | Fixed-size, bounded scan |
| ER Waitlist | `priority_queue` (max-heap) | O(log W) | O(1) top | O(log W) pop | Sorted by priority then arrival |
| In-Patient | `unordered_map<int, Department>` | O(1) | O(R*B) scan | O(1) | Department-level fixed grid |
| Operations | `set<stOperation>` (BST) | O(log S) | O(n) filtered | O(log S) | Sorted by start time |
| Blood Bank | `unordered_map<string, queue>` | O(1) push | O(1) amortized | O(1) amortized | FIFO with lazy expiry filtration |
| Lab Devices | `priority_queue<int, greater>` (min-heap) | O(log k) | O(1) top | O(log k) pop | Smallest device ID first |
| Lab Waitlist | `priority_queue` (max-heap) | O(log W) | O(1) top | O(log W) pop | Sorted by severity then arrival |
| Lab Busy | `unordered_map<int, stLabTest>` | O(1) avg | O(1) avg | O(1) avg | Device-to-test mapping |

**Legend:** W = waitlist size, S = schedule size, k = device count, R = rooms, B = beds per room, n = total operations.

---

# Cross-Cutting Analysis

---

## 10. Shared Patterns & Evolution

### 10.1 Input Validation Patterns

**Common Validation Pattern (All Projects):**
```cpp
while (cin.fail())
{
    cin.clear();
    cin.ignore(numeric_limits<std::streamsize>::max(), '\n');
    cout << "Invalid input. Enter a valid one please.\n";
    value = ReadInput(message);
}
```

**Evolution of Validation:**
| Project | Validation Level |
|---------|-----------------|
| Collection | Basic `cin.fail()` check |
| Order System | `getValidatedInt()` with range bounds |
| Employee System | None |
| Contact System | Triple-layer: type + integer + range |
| Hospital System | Comprehensive: type + domain + range + custom validators |

### 10.2 Dynamic Memory Lifecycle

**All Projects Follow This Pattern:**
```
1. Allocate (new[] or make_unique)
2. Use (read/write through pointer)
3. Resize (if needed: allocate new, copy, delete old)
4. Cleanup (delete[] or smart pointer automatic)
```

**Evolution:**
| Project | Allocation | Deallocation | Safety |
|---------|------------|--------------|--------|
| Order System | `new Product[]` | Manual in destructor | Manual |
| Employee System | `new EMPLOYEE[]` | Manual in `choose_operation()` | Manual |
| Contact System | `make_unique<Contact>()` | Automatic (RAII) | Automatic |
| Hospital System | `new clsPatient()` | Registry destructor | Ownership-based |

### 10.3 Algorithmic Evolution

**QuickSort Implementations:**
| Project | Pivot | Partition | Element Type |
|---------|-------|-----------|--------------|
| Order System | Middle | Two-pointer | Struct values |
| Employee System | Last | Lomuto | Struct values |
| Contact System | Middle | Hoare | Smart pointers |

**Search Algorithms:**
| Project | Algorithm | Complexity | Return Type |
|---------|-----------|------------|-------------|
| Order System | Binary Search | O(log n) | Index |
| Employee System | Binary Search | O(log n) | void (prints) |
| Contact System | Binary Search | O(log n) | Index |
| Hospital System | Hash Lookup | O(1) avg | Pointer |
| Collection | Recursive Linear | O(n) | Index |

### 10.4 Engineering Maturity Progression

**Across All Projects:**

| Stage | Characterization | Projects |
|-------|------------------|----------|
| **Foundational** | Core mechanics, global state | Collection, Value/Reference/Pointers |
| **Applied** | CRUD operations, basic validation | Order System, Unit Converter |
| **Modular** | Separation of concerns, input validation | Employee System, Exam System (A/B/C) |
| **Modern** | RAII, smart pointers, audit trails | Contact System |
| **Enterprise** | Multi-module architecture, testing, complexity analysis | Hospital System |

**Key Lessons Demonstrated Across Projects:**

| Concept | First Appearance | Mature Application |
|---------|------------------|-------------------|
| Dynamic Arrays | Order System | Contact System (RAII) |
| QuickSort | Order System | Contact System (Hoare) |
| Binary Search | Order System | Hospital System (Hash) |
| Input Validation | Exam System (B) | Hospital System |
| Enum-Based State | Collection (Assignment 10) | Hospital System |
| Audit Trail | Order System | Contact System |
| RAII | Contact System | Hospital System (Registry) |
| Testing Framework | — | Hospital System (SANDBOX_VERIFY) |

---

## Appendix A: Complete Project Index

| # | Project | File(s) | Key Concepts |
|---|---------|---------|--------------|
| 1 | Parameter Passing | `value Vs reference Vs pointers/` | Value, Reference, Pointers, Templates |
| 2 | Collection | `Collection/` (11 files) | Functions, Overloading, Templates, Recursion, Macros |
| 3 | Unit Converter | `Unit converter, periodic table/` (3 files) | Modular design, C-strings, Search |
| 4 | Order Management | `Representing orders in an online store/` | Dynamic Arrays, QuickSort, Binary Search, Audit |
| 5 | Employee + Contact | `Company's employee data management/` | Raw→Smart pointers, RAII, Evolution |
| 6 | Exam System | `Student management system/` (3 files) | 3 approaches, Enums, RAII |
| 7 | Hospital System | `Hospital System/` (17+ files) | Multi-module, Heaps, BST, Testing |

## Appendix B: Algorithm Reference

| Algorithm | Complexity | Projects Used |
|-----------|------------|---------------|
| QuickSort | O(n log n) avg | Order, Employee, Contact |
| Binary Search | O(log n) | Order, Employee, Contact |
| Recursive Linear Search | O(n) | Collection |
| Hash Lookup | O(1) avg | Hospital |
| Heap Insert/Pop | O(log n) | Hospital (ER, Lab) |
| BST Insert/Delete | O(log n) | Hospital (Operations) |
| FIFO Queue | O(1) | Hospital (Blood Bank) |

## Appendix C: Data Structure Reference

| Structure | Projects Used | Purpose |
|-----------|---------------|---------|
| Dynamic Array (Raw) | Order, Employee, Exam | Collection management |
| Dynamic Array (Smart) | Contact, Exam (C) | Safe collection management |
| `unordered_map` | Hospital | O(1) key-based lookup |
| `priority_queue` (Max) | Hospital (ER, Lab) | Priority-based scheduling |
| `priority_queue` (Min) | Hospital (Lab) | Device allocation |
| `set` (BST) | Hospital (Operations) | Time-ordered scheduling |
| `queue` (FIFO) | Hospital (Blood Bank) | Inventory management |

---

*Generated from 7 Master Reference Manuals covering 7 distinct C++ projects. All content reflects original work and implementation decisions. No external sources or AI-generated theory were introduced.*

*Total: ~4,800 lines of source code documented across foundational concepts, algorithm implementations, applied systems, and enterprise-grade architecture.*
