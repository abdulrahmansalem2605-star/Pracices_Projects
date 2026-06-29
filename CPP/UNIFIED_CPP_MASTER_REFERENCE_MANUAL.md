# C++ Unified Master Reference Manual

## A Comprehensive Engineering Portfolio — From Foundations to Enterprise Systems

**Author:** Abdulrahman Arfan Salem  
**Institution:** Al-Sham Private University — Faculty of Engineering (ITE)  
**Language:** C++ (C++11 through C++17)  
**Scope:** Complete C++ proficiency demonstrated through 15+ projects spanning foundational concepts, data structures, algorithms, applied systems, and enterprise-grade architecture  
**Total Source Code:** ~8,000+ lines documented

---

## Preface

This manual consolidates a comprehensive C++ learning journey into a unified professional reference. The material progresses from fundamental language constructs through advanced data structures and algorithms, culminating in multi-module enterprise systems. Each section demonstrates specific engineering competencies — from low-level memory management and algorithm design to system architecture and embedded testing frameworks.

The content is organized to reflect a deliberate learning trajectory:

```
Foundations → Memory & Data Structures → Algorithms → Applied Systems → Enterprise
```

All code and implementations reflect original work and engineering decisions. No external content or AI-generated theory was introduced.

---

## Table of Contents

### Part I — Foundations of C++ Programming

1. [Parameter Passing Mechanisms](#part-i--foundations-of-c-programming)
   - 1.1 Call by Value
   - 1.2 Call by Reference
   - 1.3 Call by Pointers
   - 1.4 Comparative Analysis

2. [Core Programming Constructs](#2-core-programming-constructs)
   - 2.1 Function Overloading
   - 2.2 Templates & Generic Programming
   - 2.3 Preprocessor Macros
   - 2.4 Enumerations

3. [Conditional Logic & Branching](#3-conditional-logic--branching)
   - 3.1 Decision-Making with if-else
   - 3.2 Piecewise Function Evaluation

4. [Iteration & Looping Constructs](#4-iteration--looping-constructs)
   - 4.1 Factorial Computation
   - 4.2 Batch Processing Patterns
   - 4.3 Prime Number Detection
   - 4.4 GCD and Divisor Enumeration

5. [Functions & Procedural Abstraction](#5-functions--procedural-abstraction)
   - 5.1 Functional Decomposition
   - 5.2 2D Array Utility Library

6. [Arrays: One-Dimensional and Two-Dimensional](#6-arrays-one-dimensional-and-two-dimensional)
   - 6.1 Aggregate Operations
   - 6.2 Parallel Arrays
   - 6.3 Selection Sort (Custom Implementation)

### Part II — Memory Management & Dynamic Data Structures

7. [Dynamic Memory Management Patterns](#part-ii--memory-management--dynamic-data-structures)
   - 7.1 Manual Dynamic Arrays
   - 7.2 RAII-Based Arrays
   - 7.3 Resizing Strategies

8. [Linked Lists](#8-linked-lists)
   - 8.1 Singly Linked List
   - 8.2 Doubly Linked List
   - 8.3 Circular Singly Linked List
   - 8.4 Evolution: Procedural → OOP

9. [Stacks & Queues](#9-stacks--queues)
   - 9.1 Stack (LIFO — Linked List Implementation)
   - 9.2 Queue (FIFO — Linked List Implementation)
   - 9.3 Priority Queue

10. [Stack Applications](#10-stack-applications)
    - 10.1 Balanced Parentheses Check
    - 10.2 Infix to Postfix Conversion
    - 10.3 Postfix Expression Evaluation

### Part III — Trees & Hash-Based Structures

11. [Hash Tables](#part-iii--trees--hash-based-structures)
    - 11.1 Closed Hashing (Separate Chaining)
    - 11.2 Open Addressing — Double Hashing
    - 11.3 Linear Probing

12. [Trees](#12-trees)
    - 12.1 Binary Search Tree (BST)
    - 12.2 AVL Tree (Self-Balancing BST)
    - 12.3 Generic Binary Tree (Template-Based)

13. [Union-Find (Disjoint Set Union)](#13-union-find-disjoint-set-union)
    - 13.1 Weighted Quick Union with Path Compression
    - 13.2 Social Network Connectivity Application

### Part IV — Algorithms

14. [Recursion](#part-iv--algorithms)
    - 14.1 Classical Recursive Patterns
    - 14.2 Recursive Array Traversal
    - 14.3 Recursive Arithmetic Operations
    - 14.4 Tail Recursion and Head Recursion

15. [Sorting Algorithms](#15-sorting-algorithms)
    - 15.1 Insertion Sort
    - 15.2 Selection Sort
    - 15.3 Shell Sort
    - 15.4 QuickSort (Lomuto & Hoare Partitions)

16. [Search Algorithms](#16-search-algorithms)
    - 16.1 Binary Search (Iterative & Recursive)
    - 16.2 Recursive Linear Search
    - 16.3 Hash-Based Lookup

17. [Backtracking Algorithms](#17-backtracking-algorithms)
    - 17.1 N-Queens Problem
    - 17.2 Knight's Tour
    - 17.3 Maze Solving
    - 17.4 Graph Coloring

### Part V — Applied Systems

18. [Chemistry Computation Toolkit](#part-v--applied-systems)
    - 18.1 Unit Conversion Engine
    - 18.2 Periodic Table Database

19. [Order Management System](#19-order-management-system)
    - 19.1 Architecture & Data Structures
    - 19.2 CRUD Operations
    - 19.3 Audit Trail System

20. [Employee Data Management & Contact Management](#20-employee-data-management--contact-management)
    - 20.1 Volume I: Employee System (Raw Pointers)
    - 20.2 Volume II: Contact System (Smart Pointers)
    - 20.3 Evolution Analysis

21. [Examination Order Management System](#21-examination-order-management-system)
    - 21.1 Three Implementation Approaches
    - 21.2 Comparative Evaluation

### Part VI — Enterprise Systems

22. [Hospital Simulation System](#part-vi--enterprise-systems)
    - 22.1 Architecture Overview
    - 22.2 Data Models
    - 22.3 Core Managers & Algorithms
    - 22.4 Embedded Testing Framework
    - 22.5 Algorithmic Complexity Summary

### Part VII — Capstone & Problem Solving

23. [ASCII Art Name Printer](#part-vii--capstone--problem-solving)
    - 23.1 Function Pointer Dispatch Table
    - 23.2 Letter Rendering Engine

24. [Competitive Programming & Assignments](#24-competitive-programming--assignments)
    - 24.1 CodeForces-Style Problems
    - 24.2 LeetCode-Style Data Structure Problems
    - 24.3 University Assignment Submissions

### Cross-Cutting Analysis

25. [Shared Patterns & Evolution](#cross-cutting-analysis)
    - 25.1 Input Validation Patterns
    - 25.2 Dynamic Memory Lifecycle
    - 25.3 Algorithmic Evolution
    - 25.4 Engineering Maturity Progression
    - 25.5 Algorithm Reference
    - 25.6 Data Structure Reference

---

# Part I — Foundations of C++ Programming

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

### 2.3 Preprocessor Macros

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

### 2.4 Enumerations

**Parity Classification:**
```cpp
enum enEvenOrOdd { Odd = 1, Even = 2 };
```

**Enum-Based Result Pipeline:**
```
ReadVariables → areEqual → Get_areEqual_Statue → Get_areEqual_String → PrintFinaleResult
```

---

## 3. Conditional Logic & Branching

The foundational exercises established mastery of conditional branching using `if-else` constructs.

### 3.1 Positive/Negative Number Classification

A simple branching exercise that classifies an integer input as positive or negative.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x;
    cout << "Enter the number you want to know if it is odd or even number: ";
    cin >> x;

    if (x >= 0)
        cout << x << " is a positive number.";
    else
        cout << x << " is a negative number.";

    return 0;
}
```

**Source:** `Practices/1/Session 4/1- Positive and negative numbers.cpp`

### 3.2 Piecewise Function Evaluation

Evaluates a piecewise linear function based on the sign of the input variable `x`:

```
Y =  2x + 1  if x >= 0
Y = -2x + 1  if x <  0
```

```cpp
#include <iostream>
using namespace std;

int main() {
    double x, Y;
    cout << "Enter the value of x: ";
    cin >> x;

    if (x >= 0)
        Y = 2 * x + 1;
    else
        Y = -2 * x + 1;

    cout << "The value of Y is: " << Y << endl;
    return 0;
}
```

**Source:** `Practices/1/Session 4/3- Computed equation by entered value of x.cpp`

---

## 4. Iteration & Looping Constructs

The curriculum progressed through `for`, `while`, and `do-while` loops, applying each to classic algorithmic problems.

### 4.1 Factorial Computation (Iterative)

Computes `n!` for a non-negative integer using a `for` loop, with input validation to reject negative inputs.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    long long factorial = 1;

    cout << "Enter a number for calculate the factorial: ";
    cin >> n;

    if (n < 0) {
        cout << "Factorial mustn't be a negative number.";
        return 1;
    } else {
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
    }

    cout << "The factorial of " << n << " is " << "' " << factorial << " '";
    return 0;
}
```

**Source:** `Practices/1/Session 5/2- Factorial.cpp`

### 4.2 Employee Overtime Pay Calculation

Demonstrates batch processing of multiple records using a `for` loop. Computes overtime pay for 20 employees given hours worked and an overtime rate.

```cpp
#include <iostream>
using namespace std;

int main() {
    const double overtimeRate = 12.00;
    const int regularHours = 40;
    const int numEmployees = 20;

    for (int i = 1; i <= numEmployees; ++i) {
        double hoursWorked, overtimePay = 0.0;
        cout << "Enter hours worked by employee " << i << ": ";
        cin >> hoursWorked;

        if (hoursWorked > regularHours) {
            double overtimeHours = hoursWorked - regularHours;
            overtimePay = overtimeHours * overtimeRate;
        }

        cout << "Employee " << i << ": Overtime Pay = Rs. " << overtimePay << endl;
    }
    return 0;
}
```

**Source:** `Practices/1/Session 5/1- Employee.cpp`

### 4.3 Prime Number Detection (Four Approaches)

The repository contains four distinct implementations of primality testing, demonstrating iterative refinement from naive to optimized approaches.

**Approach 1 (Naive):** Iterates from `i = 2` to `i < x`, breaking early upon finding a divisor.

```cpp
int x;
cin >> x;
for (int i = 2; i < x; i++) {
    if (x % i == 0) {
        cout << "NO";
        break;
    }
    if (i == x - 1)
        cout << "yes";
}
```

**Source:** `Practices/2/الأسبوع الرابع/تمارين محلولة/العدد الأولي (ط1).cpp`

### 4.4 Greatest Common Divisor (GCD)

Computes the GCD of two integers by iterating from 2 up to the smaller number, tracking the last common divisor found.

```cpp
int x, y;
int res = 1;
cin >> x >> y;
for (int i = 2; i < x && i <= y; i++) {
    if (x % i == 0 && y % i == 0) {
        res = i;
    }
}
cout << res;
```

**Source:** `Practices/2/الأسبوع الرابع/تمارين محلولة/2- القاسم المشترك الأكبر لعددين.cpp`

### 4.5 Divisor Enumeration

Lists all divisors of a given integer by iterating from 1 to `x` and testing divisibility.

```cpp
int x;
cin >> x;
for (int i = 1; i <= x; i++) {
    if (x % i == 0) {
        cout << i << endl;
    }
}
```

**Source:** `Practices/2/الأسبوع الرابع/تمارين محلولة/1- قواسم عدد.cpp`

### 4.6 Batch Input: Maximum and Sum

Reads `N` numbers from the user and computes both the running sum and the maximum value in a single pass.

```cpp
int n, x, sum = 0, max;
cout << "Enter N ";
cin >> n;
for (int i = 0; i < n; i++) {
    cin >> x;
    sum = sum + x;
    if (i == 0)
        max = x;
    if (x > max)
        max = x;
}
cout << "sum=" << sum << endl;
cout << "max=" << max;
```

**Source:** `Practices/2/الأسبوع الرابع/تمارين محلولة/6- إدخال مجموعة من الأعداد و إيجاد أكبر عدد و مجموع الأعداد.cpp`

---

## 5. Functions & Procedural Abstraction

### 5.1 2D Array Utility Library (Fun-Mat)

A suite of functions operating on a 4×3 integer matrix demonstrates functional decomposition: reading, printing, summing elements, transposing, and converting between 2D and 1D representations.

```cpp
void read(int x[][3]) {
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 3; j++)
            cin >> x[i][j];
}

void print(int x[][3]) {
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 3; j++)
            cout << x[i][j] << " ";
        cout << endl;
    }
}

int sum(int x[][3]) {
    int s = 0;
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 3; j++)
            s += x[i][j];
    return s;
}

void trans(int x[4][3], int y[3][4]) {
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 3; j++)
            y[j][i] = x[i][j];
}
```

**Source:** `Practices/2/تمارين (فترة التوقف)/fan mat/Fun-Mat.txt`

Further exercises extended this library to include:
- Converting 1D arrays (length 16) to 4×4 2D arrays
- Checking symmetry of 2D arrays
- Testing if elements above the main diagonal are all positive
- Identifying if the 1D representation forms a symmetric sequence
- Swapping columns in reverse order
- Checking if the matrix is sorted in ascending order

---

## 6. Arrays: One-Dimensional and Two-Dimensional

### 6.1 Array Aggregate Operations (4-in-1)

A single program computes sum, maximum, minimum, average, reversal, and linear search across an array of 10 integers — unifying multiple operations on a single data structure.

```cpp
const int SIZE = 10;
int arr[SIZE], sum = 0, max = 0, min = 0;

// Input and aggregate computation
for (int i = 0; i < SIZE; ++i) {
    cout << "Element " << (i + 1) << ": ";
    cin >> arr[i];
    if (i == 0) { max = arr[i]; min = arr[i]; }
    sum += arr[i];
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
}

double Avg = (float)sum / SIZE;

// Reverse display
for (int i = SIZE - 1; i >= 0; --i)
    cout << arr[i] << " ";

// Linear search
int searchValue;
cin >> searchValue;
bool found = false;
for (int i = 0; i < SIZE; ++i) {
    if (arr[i] == searchValue) { found = true; break; }
}
```

**Source:** `Practices/1/Session 6/6-Arrays (4 in 1).cpp`

### 6.2 Parallel Arrays: Student Grades

Demonstrates parallel array processing — correlating student IDs with their letter grades and filtering for 'A' grades with case normalization.

```cpp
const int SIZE = 10;
string studentIDs[SIZE];
char grades[SIZE];

for (int i = 0; i < SIZE; ++i) {
    cin >> studentIDs[i] >> grades[i];
    if (grades[i] >= 'a' && grades[i] <= 'f')
        grades[i] -= 32;  // Convert to uppercase
    if (grades[i] == 'A') counterOfA++;
}
```

**Source:** `Practices/1/Session 7/1- A grade.cpp`

### 6.3 Selection Sort (Custom Implementation)

A selection-based sorting algorithm that repeatedly extracts the maximum element from the source array into a destination array, then copies back.

```cpp
int ar[10], t[10];
// Read input into ar[]

for (int j = 0; j < 10; j++) {
    int max = ar[0];
    int ind = 0;
    for (int i = 1; i < 10; i++) {
        if (ar[i] > max) { max = ar[i]; ind = i; }
    }
    t[j] = max;
    ar[ind] = -1;
}

// Copy back from temp to original
for (int i = 0; i < 10; i++) ar[i] = t[i];
```

**Source:** `Practices/2/الأسبوع الخامس/SortArray.cpp`

---

# Part II — Memory Management & Dynamic Data Structures

---

## 7. Dynamic Memory Management Patterns

### 7.1 Manual Dynamic Arrays

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

### 7.2 RAII-Based Arrays (Contact System)

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

### 7.3 Resizing Strategies

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

## 8. Linked Lists

### 8.1 Singly Linked List

A linked list implementation encapsulating `Node` structures with operations for insertion and deletion at arbitrary positions. The evolution of this implementation shows clear technical maturation:

**Initial version** (Dir 6) used global pointers (`Node* front`, `Node* rear`) and standalone functions — a procedural approach.

**Later versions** (Dir 8, 9) adopted proper encapsulation with `class LinkedList`, private `head`/`tail` members, and destructors for memory management.

**Source (Class-based, Dir 8):** `Practices/8/1- لينكد ليست - ستاك - كيو/1- لينكد ليست/1- Linked List.cpp`

```cpp
class LinkedList {
private:
    Node* head = nullptr;
    Node* tail = nullptr;

public:
    void addAtBeginning(int val);
    void addAtEnd(int val);
    void addAtPositionition(int val, int Position);
    void deleteFromBeginning();
    void deleteFromEnd();
    void deleteFromPositionition(int Position);
    void printList();

    ~LinkedList() {
        while (head != nullptr) deleteFromBeginning();
    }
};
```

### Insert at Position Logic

```cpp
void addAtPositionition(int val, int Position) {
    if (Position <= 1 || head == nullptr) {
        addAtBeginning(val);
        return;
    }
    Node* temp = head;
    int currentPosition = 1;
    while (temp->next != nullptr && currentPosition < Position - 1) {
        temp = temp->next;
        currentPosition++;
    }
    Node* newNode = new Node;
    newNode->data = val;
    newNode->next = temp->next;
    temp->next = newNode;
}
```

**Source (Encapsulated OOP, Dir 9):** `Practices/9/A/SinglyLinkedList.cpp`

A more mature version using private data members, getters/setters, and cleaner separation of concerns:

```cpp
class Node {
private:
    int data;
    Node* next;
public:
    Node(int data) : data(data), next(nullptr) {}
    int getData() const { return data; }
    Node* getNext() const { return next; }
    void setNext(Node* next) { this->next = next; }
};
```

### 8.2 Doubly Linked List

A bidirectional linked list with `prev` and `next` pointers, enabling O(1) operations at both ends.

```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;

public:
    void push_front(int data);
    void push_back(int data);
    void insertAtPosition(int position, int data);
    void pop_front();
    void pop_back();
    void popAtPosition(int position);
    void display() const;
};
```

The destructor walks the list forward deleting each node, preventing memory leaks. Operations update both `head` and `tail` pointers consistently, with special cases for empty-list and single-element scenarios.

**Source:** `Practices/9/A/DoublyLinkedList.cpp`

### 8.3 Circular Singly Linked List

A singly linked list variant where the last node's `next` pointer circles back to the `head`. The `main` function in the source file contains a `SinglyLinkedList` usage (indicating the circular specialization is structural rather than behavioral in this version).

**Source:** `Practices/9/A/CircularSinglyLinkedList.cpp`

### 8.4 Evolution: Procedural → OOP

| Aspect | Initial (Dir 6) | Intermediate (Dir 8) | Mature (Dir 9) |
|--------|-----------------|----------------------|-----------------|
| **State** | Global pointers | Class with private members | Encapsulated with getters/setters |
| **Functions** | Standalone | Member functions | Member functions with const correctness |
| **Memory** | No cleanup | Destructor | Destructor + RAII |
| **Encapsulation** | None | Partial | Full |

---

## 9. Stacks & Queues

### 9.1 Stack (LIFO — Linked List Implementation)

The stack implementation evolved from:
1. **Global pointer approach** (Dir 6) with standalone `push`/`pop`/`display` functions
2. **Encapsulated class with private `top`** (Dir 8) adding `peek`, `isEmpty`, and a destructor

### Class-based Stack (Dir 8)

```cpp
class Stack {
private:
    Node* top = nullptr;

public:
    void push(int val) {
        Node* newNode = new Node;
        newNode->data = val;
        newNode->next = top;
        top = newNode;
    }

    void pop() {
        if (top == nullptr) {
            cout << "Stack Underflow - stack is empty\n";
            return;
        }
        Node* OldTop = top;
        top = top->next;
        cout << "Popped element: " << OldTop->data << "\n";
        delete OldTop;
    }

    void peek() {
        if (top == nullptr) cout << "Stack is empty\n";
        else cout << "Top element: " << top->data << "\n";
    }

    bool isEmpty() { return top == nullptr; }

    void display() {
        Node* temp = top;
        cout << "Stack elements: ";
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }

    ~Stack() {
        while (top != nullptr) pop();
    }
};
```

**Source:** `Practices/8/1- لينكد ليست - ستاك - كيو/3- ستاك/1- Stack.cpp`

### 9.2 Queue (FIFO — Linked List Implementation)

A class-based queue using `front` and `rear` pointers with full memory management.

```cpp
class Queue {
private:
    Node* front = nullptr;
    Node* rear = nullptr;

public:
    void enqueue(int val) {
        Node* newNode = new Node;
        newNode->data = val;
        newNode->next = nullptr;
        if (rear == nullptr) {
            front = newNode;
            rear = newNode;
            return;
        }
        rear->next = newNode;
        rear = newNode;
    }

    void dequeue() {
        if (front == nullptr) {
            cout << "Queue Underflow - queue is empty\n";
            return;
        }
        Node* oldFront = front;
        front = front->next;
        cout << "Dequeued element: " << oldFront->data << "\n";
        delete oldFront;
        if (front == nullptr) rear = nullptr;
    }

    void peek() {
        if (front == nullptr) cout << "Queue is empty\n";
        else cout << "Front element: " << front->data << "\n";
    }

    bool isEmpty() { return front == nullptr; }

    void display() {
        Node* temp = front;
        cout << "Queue elements: ";
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }

    ~Queue() {
        while (front != nullptr) dequeue();
        rear = nullptr;
    }
};
```

**Source:** `Practices/8/1- لينكد ليست - ستاك - كيو/4- كيو/1- queue.cpp`

### Enhanced Queue with Element Count (Dir 9)

A more sophisticated version adds `count` tracking, a `getSize()` utility, and deleted copy constructor/assignment operator to prevent shallow copies.

**Source:** `Practices/9/MIX/04Queue/Queue By SLL.cpp`

### 9.3 Priority Queue

A priority queue implementation using a sorted singly linked list. Elements are inserted in priority order (lower numeric value = higher priority). The highest-priority element is always at the front.

```cpp
class PriorityQueue {
private:
    Node* front;

public:
    void enqueue(int value, int priority) {
        Node* newNode = new Node(value, priority);
        if (isEmpty() || priority < front->priority) {
            newNode->next = front;
            front = newNode;
        } else {
            Node* current = front;
            while (current->next != nullptr && current->next->priority <= priority)
                current = current->next;
            newNode->next = current->next;
            current->next = newNode;
        }
    }

    void dequeue() {
        if (isEmpty()) return;
        Node* temp = front;
        front = front->next;
        delete temp;
    }

    int peek() { return front->data; }
    int peekPriority() { return front->priority; }
    bool isEmpty() { return front == nullptr; }
};
```

**Source:** `Practices/9/MIX/04Queue/PriorityQueue-SLL.cpp`

---

## 10. Stack Applications

### 10.1 Balanced Parentheses Check

Uses a stack to verify that every opening parenthesis `(` has a matching closing parenthesis `)` in the correct order.

```cpp
bool IsBalancedParentheses(string Expression) {
    stack<char> TestExpresion;
    for (char Parenthere : Expression) {
        if (Parenthere == '(') {
            TestExpresion.push(Parenthere);
        } else if (Parenthere == ')') {
            if (TestExpresion.empty() || TestExpresion.top() != '(')
                return false;
            TestExpresion.pop();
        }
    }
    return TestExpresion.empty();
}
```

**Source:** `Practices/9/B/1_balancedParentheses.cpp`

### 10.2 Infix to Postfix Conversion

Converts standard algebraic notation (infix) to Reverse Polish Notation (postfix) using operator precedence and a stack.

```cpp
int prec(char c) {
    if (c == '^') return 3;
    else if (c == '*' || c == '/') return 2;
    else if (c == '+' || c == '-') return 1;
    else return -1;
}

void infixToPostfix(string s) {
    std::stack<char> st;
    st.push('N');
    string ns;
    for (int i = 0; i < s.length(); i++) {
        if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z'))
            ns += s[i];
        else if (s[i] == '(')
            st.push('(');
        else if (s[i] == ')') {
            while (st.top() != 'N' && st.top() != '(') {
                ns += st.top();
                st.pop();
            }
            if (st.top() == '(') st.pop();
        } else {
            while (st.top() != 'N' && prec(s[i]) <= prec(st.top())) {
                ns += st.top();
                st.pop();
            }
            st.push(s[i]);
        }
    }
    while (st.top() != 'N') {
        ns += st.top();
        st.pop();
    }
    cout << ns << endl;
}
```

**Source:** `Practices/9/MIX/03Stack/Infix to Postfix.cpp`

### 10.3 Postfix Expression Evaluation

Evaluates a postfix expression using a stack. Operands are pushed, and when an operator is encountered, two operands are popped and the result is pushed back.

```cpp
int evaluatePostfix(string expression) {
    stack<int> st;
    for (char c : expression) {
        if (c == ' ') continue;
        if (IsOperator(c)) {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            st.push(calculate(a, b, c));
        } else {
            st.push(c - '0');
        }
    }
    return st.top();
}
```

**Source:** `Practices/9/B/3_PostfixEvaluation.cpp`

---

# Part III — Trees & Hash-Based Structures

---

## 11. Hash Tables

### 11.1 Closed Hashing (Separate Chaining)

A template-based hash table using an array of `std::list` buckets. Collisions are resolved by chaining multiple entries in the same bucket.

```cpp
template <typename T>
class HashTable {
private:
    int capacity;
    list<T>* table;

    int hash(T key) {
        return std::hash<T>{}(key) % capacity;
    }

public:
    HashTable(int cap = 10) {
        capacity = cap;
        table = new list<T>[capacity];
    }

    ~HashTable() { delete[] table; }

    void insert(T key) {
        int index = hash(key);
        for (const auto& item : table[index])
            if (item == key) return;  // Avoid duplicates
        table[index].push_back(key);
    }

    bool search(T key) {
        int index = hash(key);
        for (const auto& item : table[index])
            if (item == key) return true;
        return false;
    }

    void remove(T key) {
        int index = hash(key);
        table[index].remove(key);
    }

    void display() {
        for (int i = 0; i < capacity; ++i) {
            cout << "[" << i << "]: ";
            for (const auto& item : table[i])
                cout << item << " -> ";
            cout << "NULL" << endl;
        }
    }
};
```

**Source:** `Practices/9/MIX/05Hash_Table/Hash_Close.cpp`

### 11.2 Open Addressing — Double Hashing

Uses two hash functions to resolve collisions linearly combined with an increment step. Includes automatic rehashing when the load factor exceeds 0.7.

```cpp
class HashTable {
public:
    vector<string> table;
    int size;
    int numItems;
    double loadFactorThreshold = 0.7;

    int hashFunction1(string key) {
        long long hash = 0;
        for (char c : key) hash = 31 * hash + c;
        return hash % size;
    }

    int hashFunction2(string key) {
        long long hash = 0;
        for (char c : key) hash = 37 * hash + c;
        return hash % (size - 2) + 1;
    }

    void insert(string key) {
        if (loadFactor() >= loadFactorThreshold) rehash();
        int index = hashFunction1(key);
        int i = 0;
        while (i < size && table[(index + i * hashFunction2(key)) % size] != "")
            i++;
        if (i == size) cout << "Error: Table is full\n";
        else {
            table[(index + i * hashFunction2(key)) % size] = key;
            numItems++;
        }
    }

    void rehash() {
        int newSize = size * 2;
        vector<string> newTable(newSize);
        for (string key : table) {
            int index = hashFunction1(key) % newSize;
            int i = 0;
            while (newTable[(index + i * hashFunction2(key)) % newSize] != "") i++;
            newTable[(index + i * hashFunction2(key)) % size] = key;
        }
        table = newTable;
        size = newSize;
    }

    double loadFactor() { return static_cast<double>(numItems) / size; }
};
```

**Source:** `Practices/9/MIX/05Hash_Table/HashTableDouble.cpp`

Additional hash table implementations in the repository include:
- `HashTableLinear.cpp` — Linear probing
- `HashTableOpen1.cpp` / `HashTableOpen2.cpp` — Open addressing variants
- `Hash_Close_CustomerHashTable.cpp` — Domain-specific closed hashing

---

## 12. Trees

### 12.1 Binary Search Tree (BST)

A BST implementation with recursive insertion, search, and in-order traversal, using a header file for declarations.

```cpp
bool BinarySearchTree::isEmpty() {
    return root == nullptr;
}

void BinarySearchTree::insert(int data) {
    if (isEmpty()) {
        root = new Node(data);
        return;
    }
    insert_node(data, root);
}

void BinarySearchTree::insert_node(int data, Node*& currentNode) {
    if (currentNode == nullptr) {
        currentNode = new Node(data);
        return;
    }
    if (currentNode->value >= data)
        insert_node(data, currentNode->left);
    else
        insert_node(data, currentNode->right);
}

bool BinarySearchTree::search(int data, Node* current) {
    if (current == nullptr) return false;
    if (current->value == data) return true;
    if (current->value > data)
        return search(data, current->left);
    else
        return search(data, current->right);
}

void BinarySearchTree::print_tree_in_order(Node* currentNode) {
    if (currentNode == nullptr) return;
    print_tree_in_order(currentNode->left);
    std::cout << currentNode->value << std::endl;
    print_tree_in_order(currentNode->right);
}
```

**Source:** `Practices/9/MIX/06_07Tree/BinarySearchTree.cpp`

### 12.2 AVL Tree (Self-Balancing BST)

A complete self-balancing BST implementation maintaining a height property at each node and performing rotations when the balance factor goes outside [-1, 1].

#### Node Structure and Height Management

```cpp
int AVLTree::get_Height(AVLNode* node) {
    return node ? node->height : 0;
}

int AVLTree::get_BF(AVLNode* node) {
    return node ? get_Height(node->left) - get_Height(node->right) : 0;
}
```

#### Rotations

**Right Rotation (LL Case):**
```cpp
void AVLTree::right_rotate(AVLNode*& y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = std::max(get_Height(y->left), get_Height(y->right)) + 1;
    x->height = std::max(get_Height(x->left), get_Height(x->right)) + 1;
    y = x;
}
```

**Left Rotation (RR Case):**
```cpp
void AVLTree::left_rotate(AVLNode*& x) {
    AVLNode* y = x->right;
    AVLNode* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = std::max(get_Height(x->left), get_Height(x->right)) + 1;
    y->height = std::max(get_Height(y->left), get_Height(y->right)) + 1;
    x = y;
}
```

#### Insertion with Rebalancing

After inserting a new node, the tree updates heights and checks the balance factor at each ancestor, applying one of four rotation cases (LL, RR, LR, RL):

```cpp
void AVLTree::insertNode(AVLNode*& node, int key) {
    if (node == nullptr) { node = new AVLNode(key); return; }
    if (key < node->value) insertNode(node->left, key);
    else if (key > node->value) insertNode(node->right, key);
    else return;

    node->height = 1 + std::max(get_Height(node->left), get_Height(node->right));
    int balance = get_BF(node);

    // LL Case
    if (balance > 1 && get_BF(node->left) >= 0) {
        right_rotate(node); return;
    }
    // RR Case
    if (balance < -1 && get_BF(node->right) <= 0) {
        left_rotate(node); return;
    }
    // LR Case
    if (balance > 1 && get_BF(node->left) < 0) {
        left_rotate(node->left);
        right_rotate(node); return;
    }
    // RL Case
    if (balance < -1 && get_BF(node->right) > 0) {
        right_rotate(node->right);
        left_rotate(node); return;
    }
}
```

#### Deletion with Rebalancing

Deletion follows the standard BST deletion logic, then triggers the same rebalancing procedure as insertion.

#### Visual Tree Display

A recursive function prints the tree structure sideways with slashes indicating child direction:

```cpp
void AVLTree::print_like_tree_test(AVLNode* p, int indent) {
    if (p != nullptr) {
        if (p->right) print_like_tree_test(p->right, indent + 4);
        if (indent) std::cout << std::setw(indent) << ' ';
        if (p->right) std::cout << " /\n" << std::setw(indent) << ' ';
        std::cout << p->value << "\n ";
        if (p->left) {
            std::cout << std::setw(indent) << ' ' << " \\\n";
            print_like_tree_test(p->left, indent + 4);
        }
    }
}
```

**Source:** `Practices/9/MIX/06_07Tree/AVLTree.cpp`

### 12.3 Generic Binary Tree (Template-Based)

A template-based BST supporting any comparable type. Provides in-order, pre-order, and post-order traversals.

```cpp
template<typename T>
class clsBinarySearchTree {
private:
    stNode<T>* root;

    void _insertNode(stNode<T>*& node, T data) { ... }
    void _printInOrder(stNode* node) { ... }
    void _printPreOrder(stNode* node) { ... }
    void _printPostOrder(stNode* node) { ... }

public:
    void insert(int data);
    void printInOrder();
    void printPreOrder();
    void printPostOrder();
};
```

**Source:** `Practices/9/S4_Tree/BinaryTree.cpp`

---

## 13. Union-Find (Disjoint Set Union)

### 13.1 Weighted Quick Union with Path Compression

A union-find implementation that maintains tree balance via size tracking and flattens the tree structure during `find` operations.

```cpp
class QuickWieghtedUnion {
private:
    int* id;     // Parent array
    int* size;   // Component size array
    int count;   // Number of connected components

public:
    QuickWieghtedUnion(int N) {
        count = N;
        id = new int[N];
        size = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i;
            size[i] = 1;
        }
    }

    ~QuickWieghtedUnion() {
        delete[] id;
        delete[] size;
    }

    int find(int i) {
        while (i != id[i]) {
            id[i] = id[id[i]];  // Path compression: grandparent link
            i = id[i];
        }
        return i;
    }

    bool unite(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ) return false;

        // Union by size: attach smaller tree under larger tree
        if (size[rootP] < size[rootQ]) {
            id[rootP] = rootQ;
            size[rootQ] += size[rootP];
        } else {
            id[rootQ] = rootP;
            size[rootP] += size[rootQ];
        }
        count--;
        return true;
    }

    int components() const { return count; }
};
```

**Source:** `Practices/7/HW4/الحل/1- Social network connectivity.cpp`

### 13.2 Social Network Connectivity Application

Determines the earliest timestamp when all members of a social network become connected, processing timestamped friendship log entries.

```cpp
int SocialNetworkConnectivity(int N, int M, int logs[][3]) {
    QuickWieghtedUnion uf(N);

    for (int i = 0; i < M; i++) {
        int timestamp = logs[i][0];
        int member1 = logs[i][1];
        int member2 = logs[i][2];

        if (uf.unite(member1, member2)) {
            if (uf.components() == 1)
                return timestamp;
        }
    }
    return -1;
}
```

**Input format:** Each log entry = `{timestamp, member1, member2}`. The function returns the timestamp at which the network becomes fully connected, or -1 if it never does.

---

# Part IV — Algorithms

---

## 14. Recursion

### 14.1 Classical Recursive Patterns

#### Recursive Factorial

The canonical recursive definition: `n! = n × (n-1)!` with base case at `n = 0` or `n = 1`.

```cpp
int factorial(int n) {
    if (n == 1 || n == 0) return 1;  // Base case
    return n * factorial(n - 1);      // Recursive case
}
```

**Source:** `Practices/2/العودية 1/1- Factorial.cpp`

#### Recursive Power Computation

Computes `base^exponent` via repetitive multiplication, reducing the exponent by one at each call.

```cpp
double power(double base, int exponent) {
    if (exponent == 0) return 1;  // Base case
    return base * power(base, exponent - 1);
}
```

**Source:** `Practices/2/العودية 1/2- Power of number.cpp`

#### Fibonacci Series

Generates the nth Fibonacci number using the two-base-case recursive formulation.

```cpp
int fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1 || n == 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Usage: Printing the first `terms` Fibonacci numbers via iteration calling the recursive function.

**Source:** `Practices/2/العودية 1/6- Fibonacci series.cpp`

### 14.2 Recursive Array Traversal

#### Sum of Array Elements (Recursive)

Recursively sums array elements by reducing the problem size: `sum(arr, n) = arr[n-1] + sum(arr, n-1)`.

```cpp
int sumArray(int arr[], int size) {
    if (size <= 0) return 0;
    return arr[size - 1] + sumArray(arr, size - 1);
}
```

**Source:** `Practices/1/Session 10/1- Sum of array.cpp`

#### Print Array in Order (Recursive)

Demonstrates head recursion — the recursive call occurs before the output operation, causing elements to be printed on the return path.

```cpp
void print(int arr[], int size) {
    if (size <= 0) return;
    print(arr, size - 1);
    cout << arr[size - 1] << " ";
}
```

**Source:** `Practices/1/Session 10/2- print array in order.cpp`

#### Print Array in Reverse Order (Recursive)

Demonstrates tail recursion — the output occurs before the recursive call, printing elements from last to first.

```cpp
void printReverse(int arr[], int size) {
    if (size <= 0) return;
    cout << arr[size - 1] << " ";
    printReverse(arr, size - 1);
}
```

**Source:** `Practices/1/Session 10/3- Print in reverse order array.cpp`

### 14.3 Recursive Arithmetic Operations

#### Division via Repeated Subtraction

Implements integer division `dividend / divisor` as `1 + division(dividend - divisor, divisor)`, counting how many times the divisor can be subtracted before the remainder is smaller than the divisor.

```cpp
int recursiveDivision(int dividend, int divisor) {
    if (dividend < divisor)
        return 0;
    return 1 + recursiveDivision(dividend - divisor, divisor);
}
```

Input validation prevents division by zero by re-querying the user in a `while` loop.

**Source:** `Practices/2/العودية 2 (مو للدكتور خالد)/3- division of two numbers.cpp`

### 14.4 Tail Recursion and Head Recursion

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

---

## 15. Sorting Algorithms

### 15.1 Insertion Sort

Builds the sorted array one element at a time by repeatedly extracting an element (`key`) and shifting larger elements to the right to make room.

```cpp
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

**Best case:** O(n) — already sorted. **Worst case:** O(n²) — reverse sorted.

**Source:** `Practices/8/2- الترتيب/1- InsertionSort/1- InsertionSort.cpp`

### 15.2 Selection Sort

Repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

**Worst/Average case:** O(n²). The implementation in `Practices/8/` is accompanied by lecture slides (PDF, PPTX) explaining the algorithm.

**Source:** `Practices/8/2- الترتيب/2- Selection Sorting/`

### 15.3 Shell Sort

An optimization of Insertion Sort that compares elements separated by a gap, reducing the gap sequence until it reaches 1.

**Source:** `Practices/8/2- الترتيب/3- ShellSort/3- ShellSort.cpp`

### 15.4 QuickSort (Lomuto & Hoare Partitions)

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

---

## 16. Search Algorithms

### 16.1 Binary Search (Iterative)

A classic divide-and-conquer search requiring a sorted array. The search space is halved at each step by comparing the middle element with the target.

```cpp
int binarySearch(int a[], int size, int key) {
    int lo = 0, hi = size - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  // Prevents integer overflow
        if (key < a[mid]) hi = mid - 1;
        else if (key > a[mid]) lo = mid + 1;
        else return mid;
    }
    return -1;
}
```

**Time complexity:** O(log n). **Space complexity:** O(1).

**Source:** `Practices/8/4- باينري سيرش/كود الباينري سيرش المطالب بكتابته/binarySearch.cpp`

### 16.2 Recursive Linear Search

```cpp
unsigned short recursiveSearchInArray(float* arr, unsigned short currentIndex, 
                                      unsigned short size, float key)
{
    if (currentIndex >= size) return -1;
    if (arr[currentIndex] == key) return currentIndex;
    return recursiveSearchInArray(arr, currentIndex + 1, size, key);
}
```

### 16.3 Hash-Based Lookup

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

---

## 17. Backtracking Algorithms

### 17.1 N-Queens Problem

Places N queens on an N×N chessboard such that no two queens attack each other. Uses a recursive backtracking approach: place a queen in the current column, check safety, recurse to the next column, and backtrack if no valid placement exists.

```cpp
#define N 8

bool isSafe(int board[N][N], int row, int col) {
    // Check row on left side
    for (int i = 0; i < col; i++)
        if (board[row][i]) return false;

    // Check upper diagonal on left side
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;

    // Check lower diagonal on left side
    for (int i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j]) return false;

    return true;
}

bool solveNQUtil(int board[N][N], int col) {
    if (col >= N) {
        printSolution(board);
        return true;
    }

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;                 // Place queen
            solveNQUtil(board, col + 1);       // Recurse
            board[i][col] = 0;                 // BACKTRACK
        }
    }
    return false;
}
```

**Source:** `Practices/9/MIX/Backtra/N_Queen1.cpp`

### 17.2 Knight's Tour

A knight moves on an 8×8 chessboard visiting each square exactly once. Uses Warnsdorff-like move arrays and recursion with backtracking.

```cpp
int xMove[8] = { 2, 1, -1, -2, -2, -1, 1, 2 };
int yMove[8] = { 1, 2, 2, 1, -1, -2, -2, -1 };

int solveKTUtil(int x, int y, int movei, int sol[N][N],
                int xMove[N], int yMove[N]) {
    if (movei == N * N) return 1;

    for (int k = 0; k < 8; k++) {
        int next_x = x + xMove[k];
        int next_y = y + yMove[k];
        if (isSafe(next_x, next_y, sol)) {
            sol[next_x][next_y] = movei;
            if (solveKTUtil(next_x, next_y, movei + 1, sol, xMove, yMove) == 1)
                return 1;
            else
                sol[next_x][next_y] = -1;  // BACKTRACK
        }
    }
    return 0;
}
```

**Source:** `Practices/9/MIX/Backtra/Knight_Tour.cpp`

### 17.3 Maze Solving

Finds a path from the start (0,0) to the goal (marked with value 3) in a 4×4 maze. Uses a visited array to prevent revisiting cells and explores in four directions.

```cpp
#define N 4

bool isSafe(int maze[N][N], int Vis[N][N], int x, int y) {
    if (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1 && Vis[x][y] == 0)
        return true;
    return false;
}

bool solveMazeUtil(int maze[N][N], int Vis[N][N], int x, int y, int sol[N][N]) {
    if (maze[x][y] == 3) {  // Goal reached
        sol[x][y] = 1;
        Vis[x][y] = 1;
        return true;
    }

    if (isSafe(maze, Vis, x, y)) {
        sol[x][y] = 1;
        Vis[x][y] = 1;

        if (solveMazeUtil(maze, Vis, x, y + 1, sol)) return true;  // Right
        if (solveMazeUtil(maze, Vis, x, y - 1, sol)) return true;  // Left
        if (solveMazeUtil(maze, Vis, x + 1, y, sol)) return true;  // Down
        if (solveMazeUtil(maze, Vis, x - 1, y, sol)) return true;  // Up

        sol[x][y] = 0;   // BACKTRACK
        Vis[x][y] = 0;
        return false;
    }
    return false;
}
```

**Source:** `Practices/9/MIX/Backtra/Maze.cpp`

### 17.4 Graph Coloring

Assigns colors to vertices of a graph such that no two adjacent vertices share the same color. Uses m=3 colors on a 4-vertex graph represented as an adjacency matrix.

```cpp
#define V 4

bool isSafe(bool graph[V][V], int color[]) {
    for (int i = 0; i < V; i++)
        for (int j = i + 1; j < V; j++)
            if (graph[i][j] && color[j] == color[i])
                return false;
    return true;
}

bool graphColoring(bool graph[V][V], int m, int i, int color[V]) {
    if (i == V) {
        if (isSafe(graph, color)) {
            printSolution(color);
            return true;
        }
        return false;
    }

    for (int j = 1; j <= m; j++) {
        color[i] = j;
        if (graphColoring(graph, m, i + 1, color))
            return true;
        color[i] = 0;  // BACKTRACK
    }
    return false;
}
```

**Source:** `Practices/9/MIX/Backtra/graphColoring.cpp`

---

# Part V — Applied Systems

---

## 18. Chemistry Computation Toolkit

### 18.1 Unit Conversion Engine

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

### 18.2 Periodic Table Database

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

## 19. Order Management System

*Institution: Al-Sham Private University — Spring 2024–2025*  
*Authors: Abdulrahman Arfan Salem & Ahmed Yaser Jamous*

### 19.1 Architecture & Data Structures

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

### 19.2 CRUD Operations

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

### 19.3 Audit Trail System

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

## 20. Employee Data Management & Contact Management

### 20.1 Volume I: Employee System (Raw Pointers)

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

### 20.2 Volume II: Contact System (Smart Pointers)

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

### 20.3 Evolution Analysis

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

## 21. Examination Order Management System

*Course: CS 20252 — Computer Science*  
*Assignment: 1 — Dynamic Arrays with Pointers and Structs*

### 21.1 Three Implementation Approaches

| Solution | File | Paradigm | Lines | Complexity |
|----------|------|----------|-------|------------|
| **A** | `حل بسيط.cpp` | Procedural (global state) | 223 | Foundational |
| **B** | `حل متقدم.cpp` | Modular procedural | 600 | Advanced |
| **C** | `طريقة حل مختلفة.cpp` | Object-Oriented | 254 | Intermediate |

### 21.2 Comparative Evaluation

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

# Part VI — Enterprise Systems

---

## 22. Hospital Simulation System

> A comprehensive, algorithm-annotated C++17 console application simulating core hospital operations.

### 22.1 Architecture Overview

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

### 22.2 Data Models

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

### 22.3 Core Managers & Algorithms

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

### 22.4 Embedded Testing Framework

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

### 22.5 Algorithmic Complexity Summary

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

# Part VII — Capstone & Problem Solving

---

## 23. ASCII Art Name Printer

### 23.1 Function Pointer Dispatch Table

An advanced program that renders a user's name in large ASCII art (7×7 characters per letter). Each letter A–Z is drawn by a dedicated function, and a dispatch table maps characters to functions.

```cpp
const unsigned short H = 7;
const unsigned short W = 7;

string drawA() { /* ... */ }
string drawB() { /* ... */ }
// ... one function per letter (A through Z) ...

string(*drawFunctions[26])() = {
    drawA, drawB, drawC, drawD, drawE, drawF, drawG, drawH, drawI,
    drawJ, drawK, drawL, drawM, drawN, drawO, drawP, drawQ, drawR,
    drawS, drawT, drawU, drawV, drawW, drawX, drawY, drawZ
};
```

### 23.2 Letter Rendering Engine

The main engine reads a name, validates alphabetical input, dispatches each character to its drawing function, and concatenates the letter grids horizontally.

```cpp
void Implement_Program() {
    string Name = ReturnAlphabetString();
    vector<string> letters;

    for (char letter : Name)
        letters.push_back(drawFunctions[toupper(letter) - 'A']());

    for (int row = 0; row < H; ++row) {
        for (const string& letter : letters) {
            for (int col = 0; col < W; ++col)
                cout << letter[row * (W + 1) + col];
            cout << "\t\t";
        }
        cout << endl;
    }
}
```

**Source:** `Practices/DrawNames.cpp`

---

## 24. Competitive Programming & Assignments

### 24.1 CodeForces-Style Problems

The repository contains solutions to 20 CodeForces problems (Dir 7, HW1), demonstrating competitive programming skills across multiple sheets. Problems range from basic I/O to algorithmic challenges. Examples include:

- `1- max and min (sheet #1).cpp` — Three-number min/max
- Various algorithmic challenges on sheets #1 through #10

### 24.2 LeetCode-Style Data Structure Problems

Applied data structure implementations to real coding problems:

| Problem | Solution Location |
|---------|------------------|
| 875. Koko Eating Bananas (Binary Search) | `Practices/8/HW1/2- binary search/` |
| 21. Merge Two Sorted Lists | `Practices/8/HW1/1- stack-queue/` |
| 739. Daily Temperatures | `Practices/8/HW1/1- stack-queue/` |
| Min Stack | `Practices/8/HW2/الوظيفة الأولى/الحل/` |
| Time Needed to Buy Tickets | `Practices/8/HW2/الوظيفة الثانية/الحل/` |
| 3Sum in Logarithmic Time | `Practices/7/HW6/3sum-in-logarithmic-time-cpp/` |

### 24.3 University Assignment Submissions

Three collections of graded assignments (Collections 1–3) with problem statements, solution code, and formal reports (`.docx`, `.pdf`):

- **Collection 1:** Two programming assignments with solutions and formal reports
- **Collection 2:** A compensatory assignment with problem statement and solution
- **Collection 3:** CS lecture notes and homework problems

---

# Cross-Cutting Analysis

---

## 25. Shared Patterns & Evolution

### 25.1 Input Validation Patterns

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

### 25.2 Dynamic Memory Lifecycle

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

### 25.3 Algorithmic Evolution

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

### 25.4 Engineering Maturity Progression

**Across All Projects:**

| Stage | Characterization | Projects |
|-------|------------------|----------|
| **Foundational** | Core mechanics, global state | Collection, Value/Reference/Pointers, Practices 1-2 |
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

### 25.5 Algorithm Reference

| Algorithm | Complexity | Projects Used |
|-----------|------------|---------------|
| QuickSort | O(n log n) avg | Order, Employee, Contact |
| Binary Search | O(log n) | Order, Employee, Contact |
| Recursive Linear Search | O(n) | Collection, Practices |
| Hash Lookup | O(1) avg | Hospital |
| Heap Insert/Pop | O(log n) | Hospital (ER, Lab) |
| BST Insert/Delete | O(log n) | Hospital (Operations) |
| FIFO Queue | O(1) | Hospital (Blood Bank) |
| Insertion Sort | O(n²) | Practices |
| Selection Sort | O(n²) | Practices |
| Shell Sort | O(n log n) | Practices |
| AVL Rotations | O(log n) | Practices |

### 25.6 Data Structure Reference

| Structure | Projects Used | Purpose |
|-----------|---------------|---------|
| Dynamic Array (Raw) | Order, Employee, Exam | Collection management |
| Dynamic Array (Smart) | Contact, Exam (C) | Safe collection management |
| Linked List (Singly) | Practices | Foundation for stacks/queues |
| Linked List (Doubly) | Practices | Bidirectional traversal |
| Stack | Practices | LIFO operations, parentheses |
| Queue | Practices, Hospital | FIFO operations, blood bank |
| Priority Queue | Practices, Hospital | Priority scheduling |
| Hash Table | Practices, Hospital | O(1) key-based lookup |
| BST | Practices, Hospital | Ordered data, scheduling |
| AVL Tree | Practices | Self-balancing BST |
| Union-Find | Practices | Connected components |
| `unordered_map` | Hospital | O(1) key-based lookup |
| `priority_queue` (Max) | Hospital (ER, Lab) | Priority-based scheduling |
| `priority_queue` (Min) | Hospital (Lab) | Device allocation |
| `set` (BST) | Hospital (Operations) | Time-ordered scheduling |

---

# Appendix: Repository Map

## Practices Directory

```
Practices/
├── 1/        → Foundations (conditionals, loops, arrays, recursion basics)
├── 2/        → Functions, recursion I & II, 1D/2D arrays, games
├── 3/        → Loops, arrays, functions, iteration patterns
├── 4/        → Structured CS lectures S1–S8
├── 5/        → Summer Programming 1 assignments
├── 6/        → Data structures (linked list, stack, queue, binary search)
├── 7/        → Advanced HW (CodeForces, Union-Find, timing analysis)
├── 8/        → Sorting, stacks/queues, binary search, time complexity
├── 9/        → Full DSA suite (LL, stacks, queues, hash, BST, AVL, backtracking)
├── Collection 1/ → University assignment 1 (solution + report)
├── Collection 2/ → University compensatory assignment
├── Collection 3/ → CS lecture notes + homework
└── DrawNames.cpp → Capstone ASCII art project
```

## Simple Projects Directory

```
Simple Projects/
├── Collection/                              → 10 Homework Assignments
├── Company's employee data management-Contact managment System/
│   ├── Volume I (Employee)                  → Raw pointer CRUD system
│   └── Volume II (Contact)                  → Smart pointer CRUD system
├── Hospital System/                         → 17+ files, enterprise architecture
├── Representing orders in an online store/  → Dynamic array + audit trail
├── Student management system/               → 3 implementation approaches
├── Unit converter, periodic table/          → Chemistry toolkit
└── value Vs reference Vs pointers/          → Parameter passing study
```

---

*This Unified Master Reference Manual was synthesized exclusively from the source code, text files, and assignment descriptions in the repository. All content reflects original work and implementation decisions. No external sources or AI-generated theory were introduced.*

*Total: ~8,000+ lines of source code documented across foundational concepts, data structures, algorithms, applied systems, and enterprise-grade architecture.*
