# ICPC 2025 Master Reference Manual

## Table of Contents

1. [Overview](#overview)
2. [Problem-Solving Methodology](#problem-solving-methodology)
3. [Foundational Concepts](#foundational-concepts)
4. [Algorithmic Patterns](#algorithmic-patterns)
5. [Data Structures & Techniques](#data-structures--techniques)
6. [Practice Session Analysis](#practice-session-analysis)
7. [Code Templates & Patterns](#code-templates--patterns)
8. [Skills Progression](#skills-progression)

---

## Overview

This manual documents the journey and technical growth achieved during ICPC 2025 preparation. It covers problem-solving approaches, algorithmic patterns, and implementation techniques developed through intensive practice sessions.

**Key Achievements:**
- Participation in ACPC Kickoff Competition
- Structured practice across multiple algorithmic domains
- Implementation of solutions in both C++ and Python

---

## Problem-Solving Methodology

### General Approach

1. **Problem Analysis**: Read and understand constraints, input/output format
2. **Pattern Recognition**: Identify applicable algorithms and data structures
3. **Edge Case Consideration**: Handle boundary conditions and special cases
4. **Implementation**: Write clean, efficient code with proper I/O optimization
5. **Verification**: Test with provided examples and edge cases

### I/O Optimization Template (C++)

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

This pattern appears consistently across solutions to reduce I/O overhead.

---

## Foundational Concepts

### Basic I/O Operations

**Simple Sum Problem** (`A-game.cpp`, `A.dragon.cpp`):
```cpp
#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
```

**Key Learning**: Proper handling of standard input/output, variable declaration, and return statements.

### Binary Search

**Guess Number Problem** (`B-GuessNumber.cpp`):

The binary search implementation demonstrates interactive problem-solving:

```cpp
int N = 2005;
int maxTry;
cin >> maxTry;

if (maxTry > 30) maxTry = 30;
else if (maxTry <= 0) return -1;

int Try = 0;
while (Try < maxTry) {
    int guess;
    cin >> guess;
    Try++;
    
    if (guess == N) {
        cout << "=" << "\n";
        fflush(stdout);
        cout << guess << "!\n";
        fflush(stdout);
        break;
    }
    else if (guess < N) {
        cout << "<" << "\n";
        fflush(stdout);
    }
    else {
        cout << ">" << "\n";
        fflush(stdout);
    }
}
```

**Key Concepts**:
- Binary search reduces search space logarithmically
- Interactive problems require flushing output after each response
- Maximum attempt constraints must be respected

**Python Implementation** (`B-GuessNumber.py`):
```python
low = 1
high = 10**9
attempts = 0

while low <= high and attempts < 30:
    mid = (low + high) // 2
    print(mid)
    import sys
    sys.stdout.flush()
    
    response = input().strip()
    attempts += 1
    
    if response == '>':
        low = mid + 1
    elif response == '<':
        high = mid - 1
    elif response == '=':
        print(f"! {mid}")
        sys.stdout.flush()
        exit()
```

**Key Learning**: Same algorithmic approach can be implemented across different languages with language-specific I/O handling.

---

## Algorithmic Patterns

### GCD and Modular Arithmetic

**Fair and Square Problem** (`B.FairAndsquare.cpp`):

```cpp
int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    int T;
    cin >> T;
    while (T--) {
        int n, m;
        cin >> n >> m;
        int g = gcd(n, m);
        cout << (long long)n * m / (1LL * g * g) << "\n";
    }
    return 0;
}
```

**Key Concepts**:
- Euclidean algorithm for GCD computation
- Formula: LCM(a,b) = (a × b) / GCD(a,b)
- Long long casting to prevent integer overflow

### Modular Inverse

**Kinan Problem** (`kinan.cpp`):

```cpp
ll modinv(ll a, ll m) {
    ll b = m, u = 1, v = 0;
    while (b) {
        ll t = a / b;
        a -= t * b; swap(a, b);
        u -= t * v; swap(u, v);
    }
    u %= m;
    if (u < 0) u += m;
    return u;
}
```

**Key Concepts**:
- Extended Euclidean algorithm for modular inverse
- Essential for division under modular arithmetic
- Used in probability calculations requiring division

### Sliding Window Technique

**Difference Problem** (`C- Difference.cpp`):

```cpp
long long countPairs(Pair arr[], int n, int d) {
    long long res = 0;
    int j = 0;
    long long windowFreq = 0;
    
    for (int i = 0; i < n; i++) {
        while (j < n && arr[j].x - arr[i].x <= d) {
            windowFreq += arr[j].f;
            j++;
        }
        long long freq_i = arr[i].f;
        long long freq_rest = windowFreq - freq_i;
        res = (res + freq_i * freq_rest) % MOD;
        windowFreq -= freq_i;
    }
    
    if (d >= 0) {
        for (int i = 0; i < n; i++) {
            long long insidePairs = (arr[i].f * (arr[i].f - 1) / 2) % MOD;
            res = (res + insidePairs) % MOD;
        }
    }
    return res % MOD;
}
```

**Key Concepts**:
- Two-pointer sliding window for range queries
- Frequency counting for duplicate elements
- Modular arithmetic for large number handling
- Prefix sum-like accumulation

---

## Data Structures & Techniques

### Bitmask DP

**Woman and Cars Problem** (`C.WomanAndCars.cpp`):

```cpp
const int MOD = 1000000007;
int n;
int reserved[10];
int memo[11][1 << 10];

int dp(int car, int mask) {
    if (car > n) return 1;
    int& res = memo[car][mask];
    if (res != -1) return res;
    res = 0;
    
    for (int spot = 0; spot < n; spot++) {
        if ((mask & (1 << spot)) != 0) continue;
        if (reserved[spot] != 0 && reserved[spot] != car) continue;
        if (spot > 0 && spot < n - 1) {
            bool leftOccupied = (mask & (1 << (spot - 1))) != 0;
            bool rightOccupied = (mask & (1 << (spot + 1))) != 0;
            if (leftOccupied && rightOccupied) continue;
        }
        res += dp(car + 1, mask | (1 << spot));
        if (res >= MOD) res -= MOD;
    }
    return res;
}
```

**Key Concepts**:
- State representation using bitmasks
- Memoization for overlapping subproblems
- Constraint checking (adjacent spots cannot both be occupied)
- Modular addition to prevent overflow

### LCA with Binary Lifting

**IHate Problem** (`IHate.cpp`):

```cpp
const int MAXN = 500005, LOG = 20;
vector<int> adj[MAXN];
int up[MAXN][LOG], depth[MAXN], n, q;

void dfs(int v, int p) {
    up[v][0] = p;
    for (int i = 1; i < LOG; i++)
        up[v][i] = up[up[v][i - 1]][i - 1];
    for (int u : adj[v])
        if (u != p) {
            depth[u] = depth[v] + 1;
            dfs(u, v);
        }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    for (int i = 0; i < LOG; i++)
        if (diff & (1 << i))
            u = up[u][i];
    if (u == v) return u;
    for (int i = LOG - 1; i >= 0; i--)
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    return up[u][0];
}

int dist(int u, int v) {
    int w = lca(u, v);
    return depth[u] + depth[v] - 2 * depth[w];
}
```

**Key Concepts**:
- Binary lifting for efficient ancestor queries
- Preprocessing in O(N log N) for O(log N) queries
- Tree distance calculation using LCA
- Dynamic tree problem handling with point additions

### Subarray OR and MEX

**ORMEX Problem** (`D.ORMEX.cpp`):

```cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        vector<int> p(n);
        for (int i = 0; i < n; i++)
            cin >> p[i];
        
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            int or_val = 0;
            vector<int> freq(n + 2, 0);
            int mex = 0;
            for (int j = i; j < n; j++) {
                or_val |= p[j];
                freq[p[j]]++;
                while (freq[mex] > 0) mex++;
                ans = (ans + (long long)or_val * mex) % MOD;
            }
        }
        cout << ans << "\n";
    }
    return 0;
}
```

**Key Concepts**:
- OR operation properties (monotonically non-decreasing)
- MEX (Minimum Excluded) computation
- Frequency array for O(1) membership checking
- Subarray enumeration with incremental updates

### Bitmask Enumeration

**Olympic Problem** (`olypmic.cpp`):

```cpp
int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int n; cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    
    int total = 1 << n;
    for (int mask = 0; mask < total; mask++) {
        vector<int> group(n);
        bool valid = true;
        
        for (int i = 0; i < n && valid; i++) {
            group[i] = (mask & (1 << i)) ? 1 : 2;
        }
        
        for (int i = 0; i < n && valid; i++) {
            for (int j = i + 1; j < n && valid; j++) {
                if (group[i] == group[j] && gcd(a[i], a[j]) != 1) {
                    valid = false;
                }
            }
        }
        
        if (valid) {
            for (int i = 0; i < n; i++) {
                cout << group[i] << (i == n - 1 ? '\n' : ' ');
            }
            return 0;
        }
    }
    cout << -1 << "\n";
    return 0;
}
```

**Key Concepts**:
- Enumerating all 2^n possible partitions
- Constraint validation (elements in same group must be coprime)
- GCD checking for coprimality
- Early termination on first valid solution

### String Manipulation

**Beauty Problem** (`Beauty.cpp`):

```cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int T; cin >> T;
    while (T--) {
        int n; cin >> n;
        string s; cin >> s;
        
        char c = s[0];
        int prefix_len = 0;
        while (prefix_len < n && s[prefix_len] == c) prefix_len++;
        
        vector<int> suffix_same(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suffix_same[i] = (s[i] == c) ? suffix_same[i + 1] + 1 : 0;
        }
        
        vector<int> maxSuffixFrom(n + 2, 0);
        for (int i = n; i >= 0; i--) {
            maxSuffixFrom[i] = max(maxSuffixFrom[i + 1], suffix_same[i]);
        }
        
        int ans = 0;
        for (int l = 0; l <= prefix_len; l++) {
            int cur = l + maxSuffixFrom[l];
            ans = max(ans, cur);
        }
        
        cout << min(ans, n) << "\n";
    }
    return 0;
}
```

**Key Concepts**:
- Prefix and suffix analysis
- Maximum suffix calculation from each position
- Optimal subsequence selection
- Character frequency optimization

---

## Practice Session Analysis

### Practice Day 25-4

| Problem | Algorithm | Difficulty | Key Takeaway |
|---------|-----------|------------|--------------|
| A-game | Basic I/O | Easy | Input/output fundamentals |
| B-GuessNumber | Binary Search | Medium | Interactive problems, logarithmic search |
| C-Difference | Sliding Window | Hard | Frequency counting, modular arithmetic |

### Constenet Day 26-4

| Problem | Algorithm | Difficulty | Key Takeaway |
|---------|-----------|------------|--------------|
| A.dragon | Basic I/O | Easy | Simple arithmetic operations |
| B.FairAndsquare | GCD/LCM | Medium | Number theory fundamentals |
| Beauty | String Analysis | Medium | Prefix/suffix optimization |
| C.WomanAndCars | Bitmask DP | Hard | State compression, memoization |
| D.ORMEX | Subarray Properties | Hard | OR operations, MEX computation |
| IHate | LCA/Binary Lifting | Hard | Tree algorithms, ancestor queries |
| kinan | DP + Modular Inverse | Hard | Probability, extended Euclidean |
| olypmic | Bitmask Enumeration | Medium | Constraint satisfaction, partitioning |

---

## Code Templates & Patterns

### Fast I/O (C++)
```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

### Modular Arithmetic
```cpp
const int MOD = 1000000007;
// Modular addition
res = (res + value) % MOD;
// Modular multiplication
(ans + (long long)or_val * mex) % MOD
```

### GCD (Euclidean Algorithm)
```cpp
int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}
```

### Binary Lifting Preprocessing
```cpp
void dfs(int v, int p) {
    up[v][0] = p;
    for (int i = 1; i < LOG; i++)
        up[v][i] = up[up[v][i - 1]][i - 1];
    for (int u : adj[v])
        if (u != p) {
            depth[u] = depth[v] + 1;
            dfs(u, v);
        }
}
```

### Bitmask DP
```cpp
int dp(int state, int mask) {
    if (state > n) return 1;
    int& res = memo[state][mask];
    if (res != -1) return res;
    res = 0;
    for (int i = 0; i < n; i++) {
        if ((mask & (1 << i)) != 0) continue;
        // constraint checks
        res += dp(state + 1, mask | (1 << i));
        if (res >= MOD) res -= MOD;
    }
    return res;
}
```

---

## Skills Progression

### Beginner Level
- [x] Basic input/output operations
- [x] Simple arithmetic computations
- [x] Variable declaration and type handling

### Intermediate Level
- [x] Binary search implementation
- [x] Interactive problem handling
- [x] GCD/LCM calculations
- [x] String manipulation

### Advanced Level
- [x] Dynamic programming with memoization
- [x] Bitmask state compression
- [x] Tree algorithms (LCA, Binary Lifting)
- [x] Modular arithmetic and inverse
- [x] Sliding window techniques
- [x] Subarray property analysis

### Expert Level
- [x] Complex constraint satisfaction
- [x] Multi-paradigm problem solving
- [x] Optimized enumeration strategies
- [x] Advanced number theory applications

---

## Appendix: Problem Categories

### Number Theory
- GCD/LCM computation
- Modular inverse
- Coprimality checking

### Dynamic Programming
- Bitmask DP
- State compression
- Memoization patterns

### Data Structures
- Trees (adjacency list representation)
- Binary lifting tables
- Frequency arrays

### Algorithms
- Binary search
- Sliding window
- LCA queries
- Bitmask enumeration    

---

*Last Updated: ICPC 2025 Preparation*
