# ACM Competitive Programming — Master Reference Manual

> A comprehensive portfolio of problem-solving implementations across algorithmic foundations, mathematical reasoning, greedy strategies, and competitive programming patterns.

---

## Table of Contents

1. [Fundamentals & Language Basics](#1-fundamentals--language-basics)
2. [Core Programming Constructs](#2-core-programming-constructs)
3. [String Processing & Character Manipulation](#3-string-processing--character-manipulation)
4. [Mathematical Foundations](#4-mathematical-foundations)
5. [Combinatorics & Probability](#5-combinatorics--probability)
6. [Simulation & Modeling](#6-simulation--modeling)
7. [Greedy Algorithms](#7-greedy-algorithms)
8. [Prefix Sum](#8-prefix-sum)
9. [STL & Data Structures](#9-stl--data-structures)
10. [Advanced Problem Solutions](#10-advanced-problem-solutions)
11. [Appendix: Problem Index](#11-appendix-problem-index)

---

## 1. Fundamentals & Language Basics

> Foundational C++ concepts: I/O streams, data types, and standard library usage.

### 1.1 Hello World — Say Hello With C++

The most basic I/O program using `getline` for full-line string input.

```cpp
#include <iostream>
#include <string>

using namespace std;

int main(){
    string S;
    getline(cin, S);
    cout << "Hello, " << S << endl;
    return 0;
}
```

**Key Concept:** `getline(cin, S)` reads an entire line including spaces, unlike `cin >> S` which stops at whitespace.

### 1.2 Basic Data Types

Demonstrates the five fundamental C++ data types and their I/O behavior.

```cpp
#include <iostream>
using namespace std;

int main(){
    int a;
    long long b;
    char c;
    float d;
    double e;

    cin >> a >> b >> c >> d >> e;

    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    cout << d << endl;
    cout << e << endl;

    return 0;
}
```

**Key Concept:** Each data type has different size and precision characteristics — `long long` for 64-bit integers, `double` for double-precision floating point.

---

## 2. Core Programming Constructs

> Conditional logic, loops, and arithmetic operations.

### 2.1 Simple Calculator

A conditional operator dispatcher based on character input.

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a, b;
    char op;
    cin >> a >> op >> b;
    if (op == '+')
        cout << a + b << endl;
    else if (op == '-')
        cout << a - b << endl;
    else if (op == '*')
        cout << a * b << endl;
    else if (op == '/')
        cout << a / b << endl;
}
```

### 2.2 Basic Arithmetic Operations — Two Numbers

Computes `floor`, `ceil`, and `round` of a division.

```cpp
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    double a, b;
    cin >> a >> b;
    double result = a / b;
    cout << "floor " << a << " / " << b << " = " << floor(result) << endl;
    cout << "ceil " << a << " / " << b << " = " << ceil(result) << endl;
    cout << "round " << a << " / " << b << " = " << round(result) << endl;
}
```

**Key Concept:** `floor` rounds toward negative infinity, `ceil` rounds toward positive infinity, `round` rounds to nearest integer.

### 2.3 Summation Formula — Sum from 1 to n

Direct application of the Gauss formula: `n(n+1)/2`.

```cpp
#include <iostream>
using namespace std;
int main()
{
    long long unsigned n;
    cin >> n;
    cout << (n) * (n + 1) / 2;
}
```

**Key Concept:** O(1) arithmetic solution replaces O(n) iterative summation. Use `long long` to prevent overflow.

### 2.4 Difference of Products

Computes `(a * b) - (c * d)` with 64-bit integer safety.

```cpp
#include <iostream>
using namespace std;
int main()
{
    long long a, b, c, d;
    cin >> a >> b >> c >> d;
    long long x;
    x = (a * b) - (c * d);
    cout << "Difference = " << x;
}
```

### 2.5 Simple Arithmetic Output

Prints addition, multiplication, and subtraction of two numbers.

```cpp
#include <iostream>
using namespace std;
int main()
{
    long long x, y;
    cin >> x >> y;
    cout << x << " + " << y << " = " << x + y << endl;
    cout << x << " * " << y << " = " << x * y << endl;
    cout << x << " - " << y << " = " << x - y << endl;
}
```

### 2.6 Multiples Check

Determines if one number is a multiple of another.

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n, m;
    cin >> n >> m;
    if (n % m == 0 || m % n == 0)
        cout << "Multiples";
    else
        cout << "No Multiples";
}
```

### 2.7 Conditional Comparison

Basic two-number comparison with binary output.

```cpp
#include <iostream>
#include <cmath>
using namespace std;
int main()
{
    int a, b;
    cin >> a >> b;
    if (a >= b)
        cout << "Yes";
    else
        cout << "No";
}
```

### 2.8 Maximum and Minimum of Three Numbers

Linear scan to find min/max among three values.

```cpp
#include <iostream>
using namespace std;
int main()
{
    double A, B, C;
    cin >> A >> B >> C;
    double minimum = A;
    if (B < minimum) minimum = B;
    if (C < minimum) minimum = C;

    double maximum = A;
    if (B > maximum) maximum = B;
    if (C > maximum) maximum = C;
    cout << minimum << " " << maximum << endl;
}
```

### 2.9 Digit Extraction — First Digit

Extracts the thousands digit via integer division.

```cpp
#include <iostream>
using namespace std;
int main()
{
    int a;
    cin >> a;
    int b = a / 1000;
    if (b % 2 == 0)
        cout << "EVEN";
    else
        cout << "ODD";
}
```

**Key Concept:** Integer division truncates — dividing by powers of 10 isolates specific digit positions.

### 2.10 Digit Summation — Last Digits

Extracts and sums the last digits of two numbers.

```cpp
#include <iostream>
using namespace std;
int main()
{
    long long n, m;
    cin >> n >> m;
    cout << (n % 10) + (m % 10);
}
```

**Key Concept:** `n % 10` yields the last digit of `n` for any positive integer.

### 2.11 Area of a Circle

Floating-point computation with precision control.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;
int main()
{
    double r;
    const double pi = 3.141592653;
    cin >> r;
    double area;
    area = r * r * pi;
    cout << fixed << setprecision(9) << area;
}
```

**Key Concept:** `fixed` and `setprecision(9)` from `<iomanip>` ensure exactly 9 decimal places in output.

---

## 3. String Processing & Character Manipulation

> Character classification, ASCII arithmetic, and string-based logic.

### 3.1 Character Case Toggle

Converts uppercase to lowercase and vice versa using ASCII offset (32).

```cpp
#include <iostream>
using namespace std;
int main()
{
    char a;
    cin >> a;
    if (a >= 'a' && a <= 'z')
        a -= 32;
    else
        a += 32;
    cout << a;
}
```

**Key Concept:** ASCII lowercase letters are 32 positions above their uppercase counterparts.

### 3.2 Character Classification — Capital, Small, or Digit

Classifies a character using ASCII value ranges.

```cpp
#include <iostream>
using namespace std;
int main()
{
    char myChar;
    cin >> myChar;
    if (myChar >= 97 && myChar <= 122)
    {
        cout << "ALPHA" << endl;
        cout << "IS SMALL" << endl;
    }
    else if (myChar >= 65 && myChar <= 90)
    {
        cout << "ALPHA" << endl;
        cout << "IS CAPITAL" << endl;
    }
    else
    {
        cout << "IS DIGIT" << endl;
    }
}
```

**Key Concept:** Direct ASCII comparison — lowercase: 97–122, uppercase: 65–90.

### 3.3 Way Too Long Words — String Abbreviation

Abbreviates words longer than 10 characters: first char + length-2 + last char.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        string word;
        cin >> word;
        int l = word.size();
        if (l > 10)
            cout << word[0] + to_string(l - 2) + word[l - 1] << endl;
        else
            cout << word << endl;
    }
}
```

**Key Concept:** `to_string()` converts integer to string for concatenation. String indexing with `word[0]` accesses individual characters.

### 3.4 The Brothers — String Comparison

Compares last names to determine sibling relationship.

```cpp
#include <iostream>
#include <string>
using namespace std;
int main()
{
    string first1, second1;
    string first2, second2;
    cin >> first1 >> second1;
    cin >> first2 >> second2;
    if (second1 == second2)
        cout << "ARE Brothers";
    else
        cout << "NOT";
}
```

---

## 4. Mathematical Foundations

> Number theory, GCD, logarithms, and modular arithmetic.

### 4.1 GCD — MaratonIME Helps Pablito

Determines if two numbers share a common divisor greater than 1.

```cpp
#include <iostream>
#include <numeric>
#include <cmath>

using namespace std;

bool divisor(long long a, long long b) {
    return gcd(a, b) > 1;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        if (divisor(a, b))
            cout << "Sim" << endl;
        else
            cout << "Nao" << endl;
    }
    return 0;
}
```

**Key Concept:** `std::gcd()` from `<numeric>` (C++17) implements the Euclidean algorithm. Two numbers share a divisor > 1 iff their GCD exceeds 1.

### 4.2 Logarithm — MaratonIME Plays Cirokime

Computes the maximum number of halving operations.

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    int maxDrinks = static_cast<int>(log2(n)) + 1;
    cout << maxDrinks << endl;
    return 0;
}
```

**Key Concept:** The number of times `n` can be halved before reaching 0 is `floor(log2(n)) + 1`. This is a direct application of logarithmic complexity.

### 4.3 Number Decomposition — 977A

Iteratively removes the last digit (if divisible by 10) or subtracts 1.

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, k;
    cin >> n >> k;
    while (k--)
    {
        if (n % 10 == 0) n = n / 10;
        else n = n - 1;
    }
    cout << n;
}
```

**Key Concept:** Modular check for trailing zero enables efficient digit removal via division.

---

## 5. Combinatorics & Probability

> Combinatorial functions, probability calculation, and count-based problems.

### 5.1 Dreamoon and WiFi — Probability with Combinatorics

Computes the probability of reaching a target position given uncertain moves.

```cpp
#include <iostream>
#include <cmath>
using namespace std;

double comb(int n, int k)
{
    if (k < 0 || k > n) return 0;
    double res = 1;
    for (int i = 1; i <= k; ++i)
        res = res * (n - i + 1) / i;
    return res;
}

int main()
{
    string s1, s2;
    cin >> s1 >> s2;

    int ctr1 = 0, ctr2 = 0, q = 0;

    for (int i = 0; i < (int)s1.size(); ++i)
    {
        if (s1[i] == '+') ctr1++;
        else ctr1--;
    }

    for (int i = 0; i < (int)s2.size(); ++i)
    {
        if (s2[i] == '+') ctr2++;
        else if (s2[i] == '-') ctr2--;
        else q++;
    }

    int actual = ctr1 - ctr2;

    if ((q + actual) % 2 != 0 || abs(actual) > q)
    {
        cout << 0 << "\n";
        return 0;
    }

    int k = (q + actual) / 2;
    cout << comb(q, k) / pow(2, q) << "\n";

    return 0;
}
```

**Key Concept:** The problem reduces to: given `q` unknown moves (each `+1` or `-1` with equal probability), what is the probability that exactly `k = (q + actual) / 2` moves are `+1`? This is `C(q, k) / 2^q`.

### 5.2 Bash's Big Day — Prime Factorization with Map

Finds the most frequent prime factor across an array using a frequency map.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    ll n;
    map<ll, ll> mp;

    while (n--)
    {
        cin >> x;
        for (i = 2; i * i <= x; i++)
        {
            if (x % i == 0) mp[i]++;
            while (x % i == 0) x /= i;
        }
        if (x > 1) mp[x]++;
    }

    ll ans = 1;
    for (auto it = mp.begin(); it != mp.end(); it++)
        ans = max(ans, it->second);

    cout << ans << endl;
}
```

**Key Concept:** Trial division with `i * i <= x` achieves O(sqrt(n)) factorization. `std::map` aggregates prime factor counts across all numbers for O(n * sqrt(max)) total complexity.

---

## 6. Simulation & Modeling

> Complex problem modeling with multiple interacting rules.

### 6.1 Chess Board Simulation — Plays Chess

A comprehensive chess simulation that determines if any black piece can capture a target square.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int getColumn(char c) {
    return c - 'a';
}

int getRow(char r) {
    return 8 - (r - '0');
}

bool isValid(int r, int c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}

bool isPathClear(vector<string>& board, int r1, int c1, int r2, int c2) {
    int dr = (r2 > r1) ? 1 : (r2 < r1) ? -1 : 0;
    int dc = (c2 > c1) ? 1 : (c2 < c1) ? -1 : 0;
    int steps = max(abs(r2 - r1), abs(c2 - c1));
    for (int i = 1; i < steps; i++) {
        int r = r1 + i * dr;
        int c = c1 + i * dc;
        if (board[r][c] != '.') return false;
    }
    return true;
}

bool canPawnCapture(vector<string>& board, int r, int c, int tr, int tc) {
    return (r - 1 == tr) && (abs(c - tc) == 1);
}

bool canKnightCapture(vector<string>& board, int r, int c, int tr, int tc) {
    int dr[] = {-2, -2, -1, -1, 1, 1, 2, 2};
    int dc[] = {-1, 1, -2, 2, -2, 2, -1, 1};
    for (int i = 0; i < 8; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];
        if (isValid(nr, nc) && nr == tr && nc == tc) return true;
    }
    return false;
}

bool canRookCapture(vector<string>& board, int r, int c, int tr, int tc) {
    if (r != tr && c != tc) return false;
    return isPathClear(board, r, c, tr, tc);
}

bool canBishopCapture(vector<string>& board, int r, int c, int tr, int tc) {
    if (abs(r - tr) != abs(c - tc)) return false;
    return isPathClear(board, r, c, tr, tc);
}

bool canQueenCapture(vector<string>& board, int r, int c, int tr, int tc) {
    return canRookCapture(board, r, c, tr, tc) || canBishopCapture(board, r, c, tr, tc);
}

bool canKingCapture(vector<string>& board, int r, int c, int tr, int tc) {
    return abs(r - tr) <= 1 && abs(c - tc) <= 1;
}

bool canCapture(vector<string>& board, int tr, int tc) {
    for (int r = 0; r < 8; r++) {
        for (int c = 0; c < 8; c++) {
            char piece = board[r][c];
            if (islower(piece)) {
                bool can = false;
                if (piece == 'p') can = canPawnCapture(board, r, c, tr, tc);
                else if (piece == 'c') can = canKnightCapture(board, r, c, tr, tc);
                else if (piece == 't') can = canRookCapture(board, r, c, tr, tc);
                else if (piece == 'b') can = canBishopCapture(board, r, c, tr, tc);
                else if (piece == 'r') can = canQueenCapture(board, r, c, tr, tc);
                else if (piece == 'k') can = canKingCapture(board, r, c, tr, tc);
                if (can) return true;
            }
        }
    }
    return false;
}

int main() {
    vector<string> board(8);
    for (int i = 0; i < 8; i++)
        cin >> board[i];
    string target;
    cin >> target;
    int tr = getRow(target[1]);
    int tc = getColumn(target[1]);

    if (canCapture(board, tr, tc))
        cout << "Sim" << endl;
    else
        cout << "Nao" << endl;

    return 0;
}
```

**Key Concepts:**
- **Board representation:** 8x8 `vector<string>` with algebraic notation conversion.
- **Path validation:** Directional stepping with obstruction check for sliding pieces (rook, bishop, queen).
- **Knight movement:** 8 L-shaped offsets — only piece that jumps.
- **Pawn capture:** Diagonal-only forward movement.

### 6.2 Nim Game — MaratonPlayNim

Implements a winning strategy for two-pile Nim using the symmetry principle.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x, y;
    cin >> x >> y;

    while (true) {
        if (x != y) {
            if (x > y) {
                cout << 1 << " " << x - y << endl;
                x = y;
            } else {
                cout << 2 << " " << y - x << endl;
                y = x;
            }
        } else {
            if (x == 0 && y == 0) break;
            int i, k;
            cin >> i >> k;
            if (i == 1) x -= k;
            else y -= k;
        }
    }

    return 0;
}
```

**Key Concept:** The winning strategy in Nim is to always leave equal piles. When piles are equal, the opponent must break the symmetry, and you restore it on your next turn. This guarantees a win when starting from unequal piles.

### 6.3 Anton and Danik — Game Result Counter

Counts wins for two players from a result string.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main()
{
    int n;
    cin >> n;
    string results;
    cin >> results;

    int AntonWins = 0;
    int DanikWins = 0;

    for (int i = 0; i < n; i++)
    {
        if (results[i] == 'A')
            AntonWins++;
        else if (results[i] == 'D')
            DanikWins++;
    }

    if (AntonWins > DanikWins)
        cout << "Anton" << endl;
    else if (DanikWins > AntonWins)
        cout << "Danik" << endl;
    else
        cout << "Friendship" << endl;

    return 0;
}
```

### 6.4 Weighted Character Sum — Team Problem

Computes a weighted sum based on character-to-index mapping.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main()
{
    int A[4];
    for (int i = 0; i < 4; i++)
        cin >> A[i];

    string S;
    cin >> S;

    int total = 0;
    for (int i = 0; i < (char)S.size(); i++)
    {
        int Scast = S[i] - 'a';
        total += A[Scast];
    }

    cout << total << endl;
    return 0;
}
```

**Key Concept:** Character-to-index mapping via `S[i] - 'a'` converts lowercase letters to 0-based indices for array lookup.

---

## 7. Greedy Algorithms

> Locally optimal choices leading to global optimality — session topics from S7-S8.

### 7.1 Activity Selection Problem

The canonical greedy algorithm: always select the activity that finishes earliest.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int maxActivities(vector<int>& start, vector<int>& finish) {
    int n = start.size();
    vector<pair<int, int>> activities(n);
    for (int i = 0; i < n; ++i)
        activities[i] = make_pair(start[i], finish[i]);

    sort(activities.begin(), activities.end(),
         [](pair<int, int> a, pair<int, int> b) {
             return a.second < b.second;
         });

    int count = 0;
    int lastFinishTime = -1;

    for (const auto& activity : activities) {
        if (activity.first >= lastFinishTime) {
            count++;
            lastFinishTime = activity.second;
        }
    }

    return count;
}

int main() {
    vector<int> start1 = {1, 3, 0, 5, 8, 5};
    vector<int> finish1 = {2, 4, 6, 7, 9, 9};
    cout << "Maximum number of activities for Example 1: "
         << maxActivities(start1, finish1) << endl;

    vector<int> start2 = {10, 12, 20};
    vector<int> finish2 = {20, 25, 30};
    cout << "Maximum number of activities for Example 2: "
         << maxActivities(start2, finish2) << endl;

    return 0;
}
```

**Algorithm:**
1. Sort activities by finish time.
2. Greedily select the next activity whose start time is ≥ the finish time of the last selected activity.
3. **Proof of optimality:** Selecting the earliest-finishing activity leaves maximum room for remaining activities.

**Time Complexity:** O(n log n) for sorting + O(n) for selection = O(n log n).

### 7.2 Watermelon — Parity Split

Determines if a weight can be split into two even parts.

```cpp
#include <iostream>
using namespace std;
int main() {
    int w;
    cin >> w;
    if (w % 2 == 0 && w >= 4) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
    }
    return 0;
}
```

**Key Concept:** Any even number ≥ 4 can be expressed as `2 + (w-2)`, both even.

### 7.3 Taxi — Group Packing

Optimally packs groups of 1–4 people into minimum taxis (capacity 4 each).

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> count(5, 0);

    for (int i = 0; i < n; ++i) {
        int group_size;
        cin >> group_size;
        count[group_size]++;
    }

    int taxis = 0;

    taxis += count[4];

    int pairs_of_3_and_1 = min(count[3], count[1]);
    taxis += count[3];
    count[1] -= pairs_of_3_and_1;

    taxis += count[2] / 2;
    count[2] %= 2;

    if (count[2] == 1) {
        taxis++;
        count[1] = max(count[1] - 2, 0);
    }

    if (count[1] > 0)
        taxis += (count[1] + 3) / 4;

    cout << taxis << endl;
    return 0;
}
```

**Greedy Strategy:**
1. Groups of 4 fill a taxi alone.
2. Groups of 3 pair with groups of 1.
3. Groups of 2 pair with each other.
4. One remaining group of 2 can share with up to two groups of 1.
5. Leftover groups of 1 fill remaining taxis via ceiling division.

### 7.4 Arrival of the General — Minimum Swaps

Finds minimum adjacent swaps to move the tallest to front and shortest to back.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> heights(n);

    for (int i = 0; i < n; ++i)
        cin >> heights[i];

    int maxHeight = heights[0], minHeight = heights[0];
    int maxIndex = 0, minIndex = 0;

    for (int i = 0; i < n; ++i) {
        if (heights[i] > maxHeight) {
            maxHeight = heights[i];
            maxIndex = i;
        }
    }

    for (int i = 0; i < n; ++i) {
        if (heights[i] <= minHeight) {
            minHeight = heights[i];
            minIndex = i;
        }
    }

    int swaps = maxIndex + (n - 1 - minIndex);

    if (maxIndex > minIndex)
        swaps--;

    cout << swaps << endl;
    return 0;
}
```

**Key Concept:** Swaps for max to front = `maxIndex`. Swaps for min to back = `n - 1 - minIndex`. If max is to the right of min, one swap is saved because moving max past min's original position also moves min one step closer to the back.

---

## 8. Prefix Sum

> Efficient range query technique (covered in S5-S6 lecture material).

**Concept:** Prefix sums precompute cumulative sums to answer range sum queries in O(1) after O(n) preprocessing.

```
prefix[0] = arr[0]
prefix[i] = prefix[i-1] + arr[i]

Range sum [l, r] = prefix[r] - prefix[l-1]  (for l > 0)
Range sum [0, r] = prefix[r]
```

**Applications in this repository:**
- The S1 array summation problems use running sums (a variant of prefix sums).
- The split-sum problem (S1/3.cpp) uses a forward accumulation pattern.

---

## 9. STL & Data Structures

> Standard Template Library usage patterns observed across solutions.

### 9.1 Containers Used

| Container | File | Purpose |
|-----------|------|---------|
| `string` | Multiple | Text processing, character arrays |
| `vector` | Chess, Taxi, Activity Selection | Dynamic arrays |
| `pair` | Activity Selection | Bundled start/finish times |
| `map` | Bash's Big Day | Prime factor frequency counting |

### 9.2 Algorithms Used

| Algorithm | File | Complexity |
|-----------|------|------------|
| `sort` (with lambda) | Activity Selection | O(n log n) |
| `gcd` | MaratonIME helps pablito | O(log(min(a,b))) |
| `min` / `max` | Taxi, Arrival of General | O(1) |

### 9.3 Numeric Functions

| Function | Header | Usage |
|----------|--------|-------|
| `floor()` | `<cmath>` | Round toward -∞ |
| `ceil()` | `<cmath>` | Round toward +∞ |
| `round()` | `<cmath>` | Round to nearest |
| `log2()` | `<cmath>` | Binary logarithm |
| `pow()` | `<cmath>` | Exponentiation |
| `sqrt()` | `<cmath>` | Square root |
| `abs()` | `<cmath>` / `<cstdlib>` | Absolute value |

---

## 10. Advanced Problem Solutions

> Codeforces contest solutions demonstrating competitive programming patterns.

### 10.1 Bit++ (Codeforces 282A)

Simulates increment/decrement operations parsed from string patterns.

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int c = 0;
    while (n--)
    {
        string s;
        cin >> s;
        for (int i = 0; i < s.length(); i++){
            if (s[i] == '+' && s[i+1] == '+')
                c++;
            else if (s[i] == '-' && s[i+1] == '-')
                c--;
        }
    }
    cout << c << "\n";
    return 0;
}
```

### 10.2 Team (Codeforces 231A)

Counts problems solved when at least 2 of 3 team members know the solution.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n, Petya, Vasya, Tonya, number(0);
    cin >> n;
    while (n--)
    {
        cin >> Petya >> Vasya >> Tonya;
        if (Petya + Vasya + Tonya >= 2)
            number += 1;
    }
    cout << number << endl;
    return 0;
}
```

**Key Concept:** Summing binary values — if sum ≥ 2, at least two members are confident.

### 10.3 Next Round (Codeforces 158A)

Counts participants with scores ≥ the k-th place score (non-zero).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int arr[n];
    int answer = 0;
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    int refrence = arr[k - 1];
    for (int i = 0; i < n; i++)
        if (arr[i] >= refrence && arr[i])
            ++answer;
    cout << answer;
    return 0;
}
```

**Key Concept:** The `&& arr[i]` check excludes participants with zero scores, which don't count as advances.

### 10.4 9B — The Bus to Udayland

Finds the bus stop minimizing total travel time (bus + walk).

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve()
{
    int n, b, s;
    cin >> n >> b >> s;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    int fs, fy;
    cin >> fs >> fy;

    double mn = DBL_MAX;
    int ans = -1;
    for (int i = 1; i < n; ++i)
    {
        double t1 = (double)v[i] / b;
        double d = sqrt(pow(fs - v[i], 2) + pow(fy, 2));
        double t2 = d / s;
        double t = t1 + t2;
        if (t < mn - 1e-8)
        {
            ans = i + 1;
            mn = t;
        }
        else if (abs(t - mn) < 1e-8)
        {
            double pre = sqrt(pow(fs - v[ans - 1], 2) + pow(fy, 2));
            if (d < pre)
            {
                ans = i + 1;
                mn = t;
            }
        }
    }
    cout << ans << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    solve();
}
```

**Key Concept:** Brute-force over all candidate bus stops with floating-point comparison using epsilon (`1e-8`). Tie-breaking by minimum walking distance.

---

## 11. Appendix: Problem Index

| # | Problem | Source | Topic | File |
|---|---------|--------|-------|------|
| 1 | Say Hello With C++ | Exercise | Basic I/O | `codeforces problems sloution's/Say Hello With C++.txt` |
| 2 | Basic Data Types | Exercise | Data Types | `codeforces problems sloution's/Basic Data Types.txt` |
| 3 | Calculator | Exercise | Conditionals | `codeforces problems sloution's/Calculator.cpp` |
| 4 | Two Numbers | Exercise | Math Functions | `codeforces problems sloution's/two numbers.cpp` |
| 5 | Sum from 1 to n | Exercise | Gauss Formula | `codeforces problems sloution's/sum from 1 to n.cpp` |
| 6 | Difference | Exercise | Arithmetic | `codeforces problems sloution's/Difference.cpp` |
| 7 | Simple Calculator | Exercise | Arithmetic | `codeforces problems sloution's/Simple Calculator.cpp` |
| 8 | Multiples | Exercise | Modular Arithmetic | `codeforces problems sloution's/Multiples.cpp` |
| 9 | Welcome with Conditions | Exercise | Conditionals | `codeforces problems sloution's/Welcome for you with conditions.cpp` |
| 10 | Max and Min | Exercise | Comparison | `codeforces problems sloution's/max and min.cpp` |
| 11 | First Digit | Exercise | Digit Manipulation | `codeforces problems sloution's/first digit.cpp` |
| 12 | Digit Summation | Exercise | Modular Arithmetic | `codeforces problems sloution's/Digit summation.cpp` |
| 13 | Area of a Circle | Exercise | Floating Point | `codeforces problems sloution's/Area of a circle.cpp` |
| 14 | Character Case Toggle | Exercise | ASCII/Strings | `codeforces problems sloution's/char.cpp` |
| 15 | Capital or Small or Digit | Exercise | Character Classification | `codeforces problems sloution's/Capital or small or digit.cpp` |
| 16 | The Brothers | Exercise | String Comparison | `codeforces problems sloution's/The Brothers.cpp` |
| 17 | Way Too Long Words (71A) | Codeforces | String Processing | `codeforces problems sloution's/71A - Way Too Long Words.cpp` |
| 18 | Bit++ (282A) | Codeforces | Simulation | `codeforces problems sloution's/282 A. Bit++.cpp` |
| 19 | Team (231A) | Codeforces | Logic | `codeforces problems sloution's/231A - Team.cpp` |
| 20 | Next Round (158A) | Codeforces | Arrays | `codeforces problems sloution's/158 A. Next Round.cpp` |
| 21 | 977A | Codeforces | Number Theory | `codeforces problems sloution's/977A.cpp` |
| 22 | 9B — Bus to Udayland | Codeforces | Brute Force/Geometry | `codeforces problems sloution's/9B.cpp` |
| 23 | Bash's Big Day (757B) | Codeforces | Prime Factorization | `codeforces problems sloution's/757B Bash's Big Day.cpp` |
| 24 | Anton and Danik | S1 | Counting | `S1/1.cpp` |
| 25 | Team Weighted Sum | S1 | Array Mapping | `S1/2.cpp` |
| 26 | Split Sum Counter | S1 | Prefix Sum | `S1/3.cpp` |
| 27 | Dreamoon and WiFi | S2 | Combinatorics | `S2/B- Dreamoon and wifi.cpp` |
| 28 | MaratonIME helps pablito | S3 | GCD | `S3/A. MaratonIME helps pablito.cpp` |
| 29 | MaratonIME plays Cirokime | S3 | Logarithm | `S3/B. MaratonIME playe Cirokime.cpp` |
| 30 | Plays Chess | S4 | Simulation | `S4/mPlaysChess1.cpp` |
| 31 | MaratonPlayNim | S4 | Game Theory | `S4/MaratonPlayNim.cpp` |
| 32 | Watermelon | S7-S8 | Parity | `S7-S8/Watermelon.cpp` |
| 33 | Taxi | S7-S8 | Greedy | `S7-S8/Taxi.cpp` |
| 34 | Arrival of the General | S7-S8 | Greedy/Swaps | `S7-S8/ArrivalOfTheGeneral.cpp` |
| 35 | Activity Selection | S7-S8 | Greedy | `S7-S8/ActivitySelection.cpp` |

---

## Lecture Materials Reference

| Session | Topic | Format |
|---------|-------|--------|
| S1 | Contest 1 — Basic Problem Sets | PDF |
| S2 | Contest 1 — Problem Sets | PDF |
| S3 | Contest 2-2 — Problem Sets | PDF |
| S4 | Contest 2-2 & 2-5 — Problem Sets | PDF |
| S5-S6 | Prefix Sum | Lecture PDF |
| S7-S8 | Greedy Algorithms | Lecture PDF |
| S9-S10 | STL — Standard Template Library | Lecture PDF |

---

*This manual documents 35 solved problems spanning fundamental programming concepts through advanced algorithmic strategies, representing a progressive learning path in competitive programming.*
