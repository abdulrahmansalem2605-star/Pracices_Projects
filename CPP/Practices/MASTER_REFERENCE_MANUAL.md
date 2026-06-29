# C++ Master Reference Manual

## A Comprehensive Engineering Portfolio of Fundamental to Advanced C++ Programming

---

**Author:** Abdulrahman

**Repository:** `Practices_Projects/CPP/Practices`

**Topics Covered:** Foundations, Control Flow, Functions, Recursion, Arrays, Data Structures (Linked Lists, Stacks, Queues, Trees, Hash Tables), Sorting Algorithms, Binary Search, Union-Find, Backtracking, Game Development, and Problem Solving

---

## Table of Contents

- **Part I: Foundations of C++ Programming**
  - 1.1 Conditional Logic and Branching
  - 1.2 Iteration and Looping Constructs
  - 1.3 Functions and Procedural Abstraction
  - 1.4 Arrays: One-Dimensional and Two-Dimensional
  - 1.5 Input Validation and Error Handling

- **Part II: Recursion**
  - 2.1 Classical Recursive Patterns
  - 2.2 Tail Recursion and Divide-and-Conquer
  - 2.3 Recursive Arithmetic Operations
  - 2.4 Recursive Array Traversal

- **Part III: Game Development**
  - 3.1 Tic-Tac-Toe (Recursive Turn-Based Engine)
  - 3.2 Connect Four (2×2 Win Detection System)
  - 3.3 Additional Game Projects

- **Part IV: Linear Data Structures**
  - 4.1 Singly Linked List
  - 4.2 Doubly Linked List
  - 4.3 Circular Singly Linked List
  - 4.4 Stack (LIFO — Linked List Implementation)
  - 4.5 Queue (FIFO — Linked List Implementation)
  - 4.6 Priority Queue

- **Part V: Sorting Algorithms**
  - 5.1 Insertion Sort
  - 5.2 Selection Sort
  - 5.3 Shell Sort

- **Part VI: Search Algorithms**
  - 6.1 Binary Search (Iterative)

- **Part VII: Hash Tables**
  - 7.1 Closed Hashing (Separate Chaining)
  - 7.2 Open Addressing — Double Hashing

- **Part VIII: Trees**
  - 8.1 Binary Search Tree (BST)
  - 8.2 AVL Tree (Self-Balancing BST)
  - 8.3 Generic Binary Tree (Template-Based)

- **Part IX: Union-Find (Disjoint Set Union)**
  - 9.1 Weighted Quick Union with Path Compression
  - 9.2 Social Network Connectivity Application

- **Part X: Backtracking Algorithms**
  - 10.1 N-Queens Problem
  - 10.2 Knight's Tour
  - 10.3 Maze Solving
  - 10.4 Graph Coloring

- **Part XI: Stack Applications**
  - 11.1 Balanced Parentheses Check
  - 11.2 Infix to Postfix Conversion
  - 11.3 Postfix Expression Evaluation

- **Part XII: Capstone Project — ASCII Art Name Printer**
  - 12.1 Function Pointer Dispatch Table
  - 12.2 Letter Rendering Engine

- **Part XIII: Problem Solving and Assignments**
  - 13.1 CodeForces-Style Problems
  - 13.2 LeetCode-Style Data Structure Problems
  - 13.3 University Assignment Submissions

---

# Part I: Foundations of C++ Programming

## 1.1 Conditional Logic and Branching

The foundational exercises established mastery of conditional branching using `if-else` constructs. The following examples demonstrate decision-making with arithmetic and logical conditions.

### Positive/Negative Number Classification

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

### Piecewise Function Evaluation

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

## 1.2 Iteration and Looping Constructs

The curriculum progressed through `for`, `while`, and `do-while` loops, applying each to classic algorithmic problems.

### Factorial Computation (Iterative)

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

### Employee Overtime Pay Calculation

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

### Prime Number Detection (Four Approaches)

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

### Greatest Common Divisor (GCD)

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

### Divisor Enumeration

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

### Batch Input: Maximum and Sum

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

## 1.3 Functions and Procedural Abstraction

### 2D Array Utility Library (Fun-Mat)

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

## 1.4 Arrays: One-Dimensional and Two-Dimensional

### Array Aggregate Operations (4-in-1)

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

### Parallel Arrays: Student Grades

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

### Selection Sort (Custom Implementation)

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

# Part II: Recursion

## 2.1 Classical Recursive Patterns

### Recursive Factorial

The canonical recursive definition: `n! = n × (n-1)!` with base case at `n = 0` or `n = 1`.

```cpp
int factorial(int n) {
    if (n == 1 || n == 0) return 1;  // Base case
    return n * factorial(n - 1);      // Recursive case
}
```

**Source:** `Practices/2/العودية 1/1- Factorial.cpp`

### Recursive Power Computation

Computes `base^exponent` via repetitive multiplication, reducing the exponent by one at each call.

```cpp
double power(double base, int exponent) {
    if (exponent == 0) return 1;  // Base case
    return base * power(base, exponent - 1);
}
```

**Source:** `Practices/2/العودية 1/2- Power of number.cpp`

### Fibonacci Series

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

## 2.2 Recursive Array Traversal

### Sum of Array Elements (Recursive)

Recursively sums array elements by reducing the problem size: `sum(arr, n) = arr[n-1] + sum(arr, n-1)`.

```cpp
int sumArray(int arr[], int size) {
    if (size <= 0) return 0;
    return arr[size - 1] + sumArray(arr, size - 1);
}
```

**Source:** `Practices/1/Session 10/1- Sum of array.cpp`

### Print Array in Order (Recursive)

Demonstrates head recursion — the recursive call occurs before the output operation, causing elements to be printed on the return path.

```cpp
void print(int arr[], int size) {
    if (size <= 0) return;
    print(arr, size - 1);
    cout << arr[size - 1] << " ";
}
```

**Source:** `Practices/1/Session 10/2- print array in order.cpp`

### Print Array in Reverse Order (Recursive)

Demonstrates tail recursion — the output occurs before the recursive call, printing elements from last to first.

```cpp
void printReverse(int arr[], int size) {
    if (size <= 0) return;
    cout << arr[size - 1] << " ";
    printReverse(arr, size - 1);
}
```

**Source:** `Practices/1/Session 10/3- Print in reverse order array.cpp`

## 2.3 Recursive Arithmetic Operations

### Division via Repeated Subtraction

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

---

# Part III: Game Development

## 3.1 Tic-Tac-Toe (Recursive Turn-Based Engine)

A complete two-player Tic-Tac-Toe implementation featuring:
- A recursive game loop (`playGame`) that alternates between players
- Recursive input validation (`getPlayerInput`) that re-prompts on invalid moves
- Win detection across rows, columns, and both diagonals
- Draw detection by checking for remaining empty cells

```cpp
const int SIZE = 3;

bool checkWin(char board[SIZE][SIZE], char player) {
    for (int i = 0; i < SIZE; i++) {
        if ((board[i][0] == player && board[i][1] == player && board[i][2] == player) ||
            (board[0][i] == player && board[1][i] == player && board[2][i] == player))
            return true;
    }
    if ((board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
        (board[0][2] == player && board[1][1] == player && board[2][0] == player))
        return true;
    return false;
}

bool checkDraw(char board[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++)
        for (int j = 0; j < SIZE; j++)
            if (board[i][j] == ' ') return false;
    return true;
}

void getPlayerInput(char board[SIZE][SIZE], char currentPlayer) {
    int row, col;
    cout << "\nPlayer " << currentPlayer << ", enter row and column (0-2): ";
    cin >> row >> col;
    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE || board[row][col] != ' ') {
        cout << "\nInvalid input, please try again.\n";
        getPlayerInput(board, currentPlayer);  // Recursive re-prompt
    } else {
        board[row][col] = currentPlayer;
    }
}

void playGame(char board[SIZE][SIZE], char currentPlayer) {
    printBoard(board);
    getPlayerInput(board, currentPlayer);
    if (checkWin(board, currentPlayer)) {
        printBoard(board);
        cout << "\nPlayer " << currentPlayer << " wins!\n";
        return;
    }
    if (checkDraw(board)) {
        printBoard(board);
        cout << "\nIt's a draw!\n";
        return;
    }
    char nextPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    playGame(board, nextPlayer);
}
```

**Source:** `Practices/2/ألعاب/أكس أو (باستخدام العودية).cpp`

## 3.2 Connect Four (2×2 Win Detection System)

A 10×10 grid Connect Four variant where players score points by forming 2×2 blocks of their color. The game runs until a player reaches 10 points.

```cpp
const int SIZE = 10;
char board[SIZE][SIZE];
int scores[2] = {0, 0};

bool checkWin(int player) {
    char color = (player == 0) ? 'R' : 'B';
    for (int i = 0; i < SIZE - 1; ++i)
        for (int j = 0; j < SIZE - 1; ++j)
            if (board[i][j] == color && board[i + 1][j] == color &&
                board[i][j + 1] == color && board[i + 1][j + 1] == color)
                return true;
    return false;
}
```

**Source:** `Practices/2/ألعاب/الأربعة تربح (بيت بيوت).cpp`

## 3.3 Additional Game Projects

The repository includes several additional game implementations:
- **Sudoku Solver** (`سودوكو.cpp`)
- **Word Guessing Game** (`تخمين الكلمات.cpp`)
- **Matching Cards** (`البطاقات المتشابهة.cpp`)
- **Snake Game (excluded)** (`لعبة الدودة (مستبعدة).cpp`)

---

# Part IV: Linear Data Structures

## 4.1 Singly Linked List

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

## 4.2 Doubly Linked List

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

## 4.3 Circular Singly Linked List

A singly linked list variant where the last node's `next` pointer circles back to the `head`. The `main` function in the source file contains a `SinglyLinkedList` usage (indicating the circular specialization is structural rather than behavioral in this version).

**Source:** `Practices/9/A/CircularSinglyLinkedList.cpp`

## 4.4 Stack (LIFO — Linked List Implementation)

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

## 4.5 Queue (FIFO — Linked List Implementation)

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

## 4.6 Priority Queue

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

# Part V: Sorting Algorithms

## 5.1 Insertion Sort

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

## 5.2 Selection Sort

Repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

**Worst/Average case:** O(n²). The implementation in `Practices/8/` is accompanied by lecture slides (PDF, PPTX) explaining the algorithm.

**Source:** `Practices/8/2- الترتيب/2- Selection Sorting/`

## 5.3 Shell Sort

An optimization of Insertion Sort that compares elements separated by a gap, reducing the gap sequence until it reaches 1.

**Source:** `Practices/8/2- الترتيب/3- ShellSort/3- ShellSort.cpp`

---

# Part VI: Search Algorithms

## 6.1 Binary Search (Iterative)

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

### Recursive Binary Search

An earlier recursive implementation is also preserved:

```cpp
int binarySearch(int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

**Source:** `Practices/6/Binary Search.cpp`

---

# Part VII: Hash Tables

## 7.1 Closed Hashing (Separate Chaining)

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

## 7.2 Open Addressing — Double Hashing

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

# Part VIII: Trees

## 8.1 Binary Search Tree (BST)

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

## 8.2 AVL Tree (Self-Balancing BST)

A complete self-balancing BST implementation maintaining a height property at each node and performing rotations when the balance factor goes outside [-1, 1].

### Node Structure and Height Management

```cpp
int AVLTree::get_Height(AVLNode* node) {
    return node ? node->height : 0;
}

int AVLTree::get_BF(AVLNode* node) {
    return node ? get_Height(node->left) - get_Height(node->right) : 0;
}
```

### Rotations

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

### Insertion with Rebalancing

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

### Deletion with Rebalancing

Deletion follows the standard BST deletion logic, then triggers the same rebalancing procedure as insertion.

### Visual Tree Display

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

## 8.3 Generic Binary Tree (Template-Based)

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

# Part IX: Union-Find (Disjoint Set Union)

## 9.1 Weighted Quick Union with Path Compression

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

## 9.2 Social Network Connectivity Application

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

# Part X: Backtracking Algorithms

## 10.1 N-Queens Problem

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

## 10.2 Knight's Tour

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

## 10.3 Maze Solving

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

## 10.4 Graph Coloring

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

# Part XI: Stack Applications

## 11.1 Balanced Parentheses Check

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

## 11.2 Infix to Postfix Conversion

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

## 11.3 Postfix Expression Evaluation

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

# Part XII: Capstone Project — ASCII Art Name Printer

## 12.1 Function Pointer Dispatch Table

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

## 12.2 Letter Rendering Engine

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

# Part XIII: Problem Solving and Assignments

## 13.1 CodeForces-Style Problems

The repository contains solutions to 20 CodeForces problems (Dir 7, HW1), demonstrating competitive programming skills across multiple sheets. Problems range from basic I/O to algorithmic challenges. Examples include:

- `1- max and min (sheet #1).cpp` — Three-number min/max
- Various algorithmic challenges on sheets #1 through #10

## 13.2 LeetCode-Style Data Structure Problems

Applied data structure implementations to real coding problems:

| Problem | Solution Location |
|---------|------------------|
| 875. Koko Eating Bananas (Binary Search) | `Practices/8/HW1/2- binary search/` |
| 21. Merge Two Sorted Lists | `Practices/8/HW1/1- stack-queue/` |
| 739. Daily Temperatures | `Practices/8/HW1/1- stack-queue/` |
| Min Stack | `Practices/8/HW2/الوظيفة الأولى/الحل/` |
| Time Needed to Buy Tickets | `Practices/8/HW2/الوظيفة الثانية/الحل/` |
| 3Sum in Logarithmic Time | `Practices/7/HW6/3sum-in-logarithmic-time-cpp/` |

## 13.3 University Assignment Submissions

Three collections of graded assignments (Collections 1–3) with problem statements, solution code, and formal reports (`.docx`, `.pdf`):

- **Collection 1:** Two programming assignments with solutions and formal reports
- **Collection 2:** A compensatory assignment with problem statement and solution
- **Collection 3:** CS lecture notes and homework problems

---

# Appendix: Repository Map

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

---

*This Master Reference Manual was synthesized exclusively from the source code, text files, and assignment descriptions in the repository. No external content or AI-generated theory was introduced.*
