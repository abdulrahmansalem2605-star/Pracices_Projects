# Library Management System — Master Reference Manual

**Author:** Abdulrahman  
**Technology:** Java 24 | Maven  
**Architecture:** Console-based OOP with File Persistence  
**Last Updated:** 2026-06-29

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture](#2-architecture)
3. [Package Structure](#3-package-structure)
4. [Model Layer](#4-model-layer)
   - 4.1 Book Entity
   - 4.2 Member Entity
   - 4.3 Library Facade
   - 4.4 Action Enumeration
5. [Persistence Layer](#5-persistence-layer)
   - 5.1 DataStorage Interface
   - 5.2 FileStorage Implementation
6. [Exception Handling](#6-exception-handling)
7. [Application Entry Point](#7-application-entry-point)
8. [Data Flow](#8-data-flow)
9. [File Formats](#9-file-formats)

---

## 1. System Overview

A console-based Library Management System that enables managing books, members, and borrowing transactions. The system persists all data to flat text files, ensuring state survives between execution sessions.

**Core Capabilities:**

- Register and manage library members
- Add and catalog books
- Process book borrow and return transactions
- Enforce borrowing limits (maximum 3 books per member)
- Maintain a transaction log for audit purposes
- Persistent storage via pipe-delimited text files

---

## 2. Architecture

The system follows a three-tier architecture:

```
┌─────────────────────────────────────────────┐
│            Presentation Layer                │
│            (FinaleCode.java)                 │
│         Console UI + Input Handling          │
├─────────────────────────────────────────────┤
│             Business Logic Layer             │
│             (Library.java)                   │
│    Orchestration · Validation · State        │
├─────────────────────────────────────────────┤
│              Model Layer                     │
│     (Book.java · Member.java · enAction)     │
│          Domain Entities + Enums             │
├─────────────────────────────────────────────┤
│            Persistence Layer                 │
│    (DataStorage · FileStorage)               │
│        File I/O · Serialization              │
└─────────────────────────────────────────────┘
         Custom Exceptions (LibraryExceptions)
```

**Design Patterns Applied:**

- **Facade Pattern** — `Library` class exposes a simplified interface over complex internal operations
- **Interface Segregation** — `DataStorage` interface decouples persistence contract from implementation
- **Custom Exception Hierarchy** — Domain-specific exceptions for structured error handling

---

## 3. Package Structure

```
s.finalecode
  └── FinaleCode.java              # Application entry point, console UI

model
  ├── Book.java                    # Book domain entity
  ├── Member.java                  # Member domain entity
  ├── Library.java                 # Business logic facade
  └── enAction.java                # Transaction action enum

persistence
  ├── DataStorage.java             # Persistence contract (interface)
  └── FileStorage.java             # File-based persistence implementation

LibraryExceptions
  ├── BookNotFoundException.java
  ├── BookAlreadyBorrowedException.java
  ├── MemberNotFoundException.java
  ├── MaxBooksLimitException.java
  └── FilePersistenceException.java
```

---

## 4. Model Layer

### 4.1 Book Entity

**File:** `src/main/java/model/Book.java`

Represents a single book within the library catalog.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Unique identifier for the book |
| `title` | `String` | Book title |
| `author` | `String` | Book author |
| `isBorrowed` | `boolean` | Current availability status |
| `borrowedBy` | `String` | Member ID of current borrower (null if available) |

**Constructor:**

```java
public Book(String id, String title, String author)
```

Initializes a book with `isBorrowed = false` and `borrowedBy = null`.

**Key Methods:**

- `isBorrowed()` — Returns current availability status
- `getBorrowedBy()` — Returns the member ID who borrowed the book
- `setBorrowed(boolean)` — Updates availability status
- `setBorrowedBy(String)` — Links/unlinks a member to the book

**Display Format:**

```
title: <title> | Author: <author> | Status: available
title: <title> | Author: <author> | Status: Borrowed By <memberId>
```

---

### 4.2 Member Entity

**File:** `src/main/java/model/Member.java`

Represents a registered library member.

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `memberId` | `String` | Unique member identifier |
| `name` | `String` | Member's full name |
| `borrowedBooksCount` | `int` | Number of books currently borrowed |

**Constraints:**

- `MAX_BOOKS = 3` — Static constant limiting concurrent borrows per member

**Key Methods:**

- `canBorrowMore()` — Returns `true` if `borrowedBooksCount < MAX_BOOKS`
- `borrowBook()` — Increments the borrow counter
- `returnBook()` — Decrements the borrow counter
- `setBorrowedCount(int)` — Directly sets the count (used during data loading)

**Display Format:**

```
Id: <memberId> | Name: <name> | Borrowed Books Count: <count>
```

---

### 4.3 Library Facade

**File:** `src/main/java/model/Library.java`

Central orchestrator managing all library operations and data persistence.

**Internal State:**

```java
private Map<String, Book> books = new HashMap<>();
private Map<String, Member> members = new HashMap<>();
private FileStorage LibraryData = new FileStorage();
```

**Constructor Behavior:**

On instantiation, automatically loads existing data from `books.txt` and `members.txt` via `FileStorage`. Gracefully handles `FilePersistenceException` by printing error messages.

**Core Operations:**

#### `addBook(Book book)`

- Adds book to the `books` HashMap keyed by book ID
- Persists changes to disk immediately
- Confirmation message printed to console

#### `addMember(Member member)`

- Adds member to the `members` HashMap keyed by member ID
- Persists changes to disk immediately
- Confirmation message printed to console

#### `borrowBook(String bookId, String memberId)`

Executes a complete borrow transaction with the following validation sequence:

```
1. Check library is not empty
2. Validate book exists        → throws BookNotFoundException
3. Check book availability     → throws BookAlreadyBorrowedException
4. Validate member exists      → throws MemberNotFoundException
5. Check member borrow limit   → throws MaxBooksLimitException
6. Execute borrow operation:
   - Mark book as borrowed
   - Link book to member
   - Increment member's borrow counter
   - Log transaction to file
   - Persist both book and member data
```

#### `returnBook(String bookId)`

Executes a book return operation:

```
1. Check library is not empty
2. Validate book exists        → throws BookNotFoundException
3. Check if book was borrowed
4. Retrieve borrower's member ID
5. Mark book as available
6. Clear borrowedBy field
7. Decrement member's borrow counter
8. Log transaction to file
9. Persist both book and member data
```

#### Display Methods

- `displayAllBooks()` — Iterates and prints all books with status
- `displayAllMembers()` — Iterates and prints all registered members

**Getters:**

- `getBooks()` — Returns the full books map
- `getMembers()` — Returns the full members map

---

### 4.4 Action Enumeration

**File:** `src/main/java/model/enAction.java`

Defines the two transaction types supported by the system:

```java
public enum enAction {
    BorrowBook,
    ReturnBook;
}
```

Used by the persistence layer when logging transactions to `transactions.txt`.

---

## 5. Persistence Layer

### 5.1 DataStorage Interface

**File:** `src/main/java/persistence/DataStorage.java`

Defines the contract for data persistence operations:

```java
public interface DataStorage {
    void saveBooks(Map<String, Book> books) throws FilePersistenceException;
    void saveMembers(Map<String, Member> members) throws FilePersistenceException;
    Map<String, Book> loadBooks() throws FilePersistenceException;
    Map<String, Member> loadMembers() throws FilePersistenceException;
}
```

This interface enables swapping storage backends (e.g., database, network) without modifying business logic.

---

### 5.2 FileStorage Implementation

**File:** `src/main/java/persistence/FileStorage.java`

Implements `DataStorage` using flat text files with pipe-delimited (`|`) formatting.

**Constants:**

| Constant | Value | Purpose |
|----------|-------|---------|
| `BOOKS_FILE` | `books.txt` | Book data persistence |
| `MEMBERS_FILE` | `members.txt` | Member data persistence |
| `TRANSACTIONS_FILE` | `transactions.txt` | Transaction log |
| `SEPARATOR` | `\|` | Field delimiter |

**Serialization Format — Books:**

```
<id>|<title>|<author>|<isBorrowed>|<borrowedBy>
```

Example:
```
1|C++|Abo-Hadhaud|false|null
```

**Serialization Format — Members:**

```
<memberId>|<name>|<borrowedBooksCount>
```

Example:
```
1|Abdulrahman|0
```

**Serialization Format — Transactions:**

```
<timestamp>|<memberId>|<bookId>|<action>
```

Example:
```
Mon Jun 29 12:00:00 UTC 2026|1|1|BorrowBook
```

**Key Implementation Details:**

- Uses `BufferedWriter` and `BufferedReader` for efficient I/O
- Books and members are fully rewritten on each save (full snapshot)
- Transactions are appended (append mode via `FileWriter(file, true)`)
- All I/O exceptions are wrapped in `FilePersistenceException`
- Data validation during load: only processes lines with expected field count

---

## 6. Exception Handling

All custom exceptions are checked exceptions (extend `Exception`), enforcing explicit handling at call sites.

| Exception | Trigger | Message Pattern |
|-----------|---------|-----------------|
| `BookNotFoundException` | Book ID not found in library | `"Book with ID <id> Doesn't exist in the library."` |
| `BookAlreadyBorrowedException` | Borrowing an already borrowed book | `"Book '<title>' is already borrowed"` |
| `MemberNotFoundException` | Member ID not found in system | `"Member with id <id> not registered in the system"` |
| `MaxBooksLimitException` | Member has 3 concurrent borrows | `"mmeber <name> Reached max book borrows (3 Books)"` |
| `FilePersistenceException` | File read/write failure | Caller-provided message |

---

## 7. Application Entry Point

**File:** `src/main/java/s/finalecode/FinaleCode.java`

Console-based user interface driving the system.

**Menu Options:**

```
=== Library Management System ===
1. Show all books
2. Show all members
3. Borrow a book
4. Return a book
5. Add a new book
6. Add a new member
0. Exit
```

**Input Handling:**

- Uses `Scanner` for console input
- Validates integer input for menu selection; catches `NumberFormatException`
- Book and member input is trimmed for whitespace

**Error Feedback:**

- Borrow/return operations display specific error messages via custom exception handling
- Success operations display confirmation with emoji indicators

**Execution Flow:**

```
main()
  → Create FinaleCode instance
  → Initialize Library (loads persisted data)
  → Enter menu loop (do-while)
    → Display menu
    → Read user choice
    → Execute corresponding operation
    → Handle exceptions
  → Exit on choice 0
```

---

## 8. Data Flow

### Borrow Transaction Flow

```
User Input (bookId, memberId)
        │
        ▼
   FinaleCode.borrowBook()
        │
        ▼
   Library.borrowBook(bookId, memberId)
        │
        ├── Validate book exists in HashMap
        ├── Validate book is available
        ├── Validate member exists in HashMap
        ├── Validate member can borrow more
        │
        ▼
   State Update
        │
        ├── Book.setBorrowed(true)
        ├── Book.setBorrowedBy(memberId)
        ├── Member.borrowBook()  →  counter++
        │
        ▼
   Persistence
        │
        ├── FileStorage.logTransaction()  →  append to transactions.txt
        ├── FileStorage.saveBooks()       →  rewrite books.txt
        └── FileStorage.saveMembers()     →  rewrite members.txt
```

### Return Transaction Flow

```
User Input (bookId)
        │
        ▼
   FinaleCode.returnBook()
        │
        ▼
   Library.returnBook(bookId)
        │
        ├── Validate book exists in HashMap
        ├── Validate book was borrowed
        │
        ▼
   State Update
        │
        ├── Book.setBorrowed(false)
        ├── Book.setBorrowedBy(null)
        ├── Member.returnBook()  →  counter--
        │
        ▼
   Persistence
        │
        ├── FileStorage.logTransaction()  →  append to transactions.txt
        ├── FileStorage.saveBooks()       →  rewrite books.txt
        └── FileStorage.saveMembers()     →  rewrite members.txt
```

### Data Loading Flow (Application Start)

```
Library Constructor
        │
        ▼
   FileStorage.loadBooks()
        │
        ├── Read books.txt line by line
        ├── Parse pipe-delimited fields
        ├── Construct Book objects
        └── Populate HashMap<String, Book>
        │
        ▼
   FileStorage.loadMembers()
        │
        ├── Read members.txt line by line
        ├── Parse pipe-delimited fields
        ├── Construct Member objects
        └── Populate HashMap<String, Member>
```

---

## 9. File Formats

### books.txt

Each line represents one book record:

```
<id>|<title>|<author>|<isBorrowed>|<borrowedBy>
```

| Position | Type | Example | Notes |
|----------|------|---------|-------|
| 1 | String | `1` | Unique book identifier |
| 2 | String | `C++` | Book title |
| 3 | String | `Abo-Hadhaud` | Author name |
| 4 | boolean | `false` | Borrowed status (`true`/`false`) |
| 5 | String | `null` | Borrower member ID or `null` |

### members.txt

Each line represents one member record:

```
<memberId>|<name>|<borrowedBooksCount>
```

| Position | Type | Example | Notes |
|----------|------|---------|-------|
| 1 | String | `1` | Unique member identifier |
| 2 | String | `Abdulrahman` | Member name |
| 3 | int | `0` | Current borrow count (0-3) |

### transactions.txt

Each line represents one transaction event:

```
<timestamp>|<memberId>|<bookId>|<action>
```

| Position | Type | Example | Notes |
|----------|------|---------|-------|
| 1 | String | `Mon Jun 29 12:00:00 UTC 2026` | Java `Date.toString()` format |
| 2 | String | `1` | Member ID |
| 3 | String | `1` | Book ID |
| 4 | String | `BorrowBook` | Action enum name (`BorrowBook`/`ReturnBook`) |

---

## Appendix: Build Configuration

**File:** `pom.xml`

```xml
<groupId>S</groupId>
<artifactId>FinaleCode</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>jar</packaging>

<properties>
    <maven.compiler.release>24</maven.compiler.release>
    <exec.mainClass>s.finalecode.FinaleCode</exec.mainClass>
</properties>
```

**Build Command:**
```bash
mvn clean compile exec:java
```

---

*This document was generated from the source code of the Library Management System project. All architectural descriptions, data flow diagrams, and code references are derived directly from the implementation.*
