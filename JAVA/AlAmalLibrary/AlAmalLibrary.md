# Al-Amal Library Management System

## Master Reference Manual

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Class Hierarchy and Design](#3-class-hierarchy-and-design)
4. [Core Components](#4-core-components)
5. [Object-Oriented Programming Concepts](#5-object-oriented-programming-concepts)
6. [System Workflow](#6-system-workflow)
7. [Implementation Details](#7-implementation-details)
8. [Technical Specifications](#8-technical-specifications)

---

## 1. Project Overview

**Project Name:** Al-Amal Library Management System  
**Package:** `com.mycompany.alamallibrary`  
**Language:** Java 24  
**Build System:** Apache Maven  

### 1.1 Purpose

The Al-Amal Library Management System is an object-oriented application designed to manage library operations including book categorization, borrowing, returning, and reader management. The system demonstrates fundamental OOP principles through a practical implementation.

### 1.2 Key Features

- Book categorization with four distinct genres
- Staff-based authorization for borrow/return operations
- Reader profile management with borrowing history
- Availability tracking for all library resources

---

## 2. System Architecture

### 2.1 Architectural Overview

The system follows a layered architecture pattern:

```
┌─────────────────────────────────────┐
│         Application Layer           │
│      (AlAmalLibrary.java)           │
├─────────────────────────────────────┤
│         Service Layer               │
│      (Staff.java)                   │
├─────────────────────────────────────┤
│         Entity Layer                │
│  (Book.java, Reader.java)          │
├─────────────────────────────────────┤
│         Domain Layer                │
│  (Book subclasses)                  │
└─────────────────────────────────────┘
```

### 2.2 Component Interaction

```
AlAmalLibrary (Main)
       │
       ├──► Staff (Service)
       │         │
       │         ├──► Book (Entity)
       │         └──► Reader (Entity)
       │
       └──► Book subclasses (Domain)
```

---

## 3. Class Hierarchy and Design

### 3.1 Inheritance Diagram

```
                    Book (Abstract)
                         │
        ┌────────┬───────┼────────┐
        │        │       │        │
  Development  History  Science  Literature
    Book       Book     Book      Book
```

### 3.2 Design Patterns Applied

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| Template Method | `Book.displayInfo()` | Define algorithm skeleton with subclass customization |
| Factory Method | Book instantiation | Create objects without specifying exact class |
| Encapsulation | Private fields | Protect internal state from external access |

---

## 4. Core Components

### 4.1 Abstract Base Class: Book

**File:** `Book.java`

```java
public abstract class Book {
    private String title;
    private String author;
    private boolean isAvailable;
}
```

#### Responsibilities

- Store book metadata (title, author)
- Track availability status
- Define contract for display behavior

#### Methods

| Method | Visibility | Return Type | Description |
|--------|-----------|-------------|-------------|
| `Book(String, String)` | public | constructor | Initialize book with title and author |
| `getTitle()` | public | String | Access book title |
| `isAvailable()` | public | boolean | Check availability status |
| `setAvailable(boolean)` | public | void | Update availability status |
| `displayInfo()` | public | abstract | Display book information (subclasses implement) |
| `displayBasicInfo()` | protected | void | Display title and status |

#### Implementation Details

- New books are created with `isAvailable = true`
- `displayBasicInfo()` formats output as: "Title: {title} | Status: Available/Borrowed"

---

### 4.2 Concrete Book Subclasses

#### 4.2.1 DevelopmentBook

**Category Tag:** `[Development - Inspiration]`

```java
public class DevelopmentBook extends Book {
    public DevelopmentBook(String title, String author) {
        super(title, author);
    }
    
    @Override
    public void displayInfo() {
        System.out.print("[Development - Inspiration] ");
        super.displayBasicInfo();
    }
}
```

#### 4.2.2 HistoryBook

**Category Tag:** `[History - Memory of Nations]`

```java
public class HistoryBook extends Book {
    public HistoryBook(String title, String author) {
        super(title, author);
    }
    
    @Override
    public void displayInfo() {
        System.out.print("[History - Memory of Nations] ");
        super.displayBasicInfo();
    }
}
```

#### 4.2.3 ScienceBook

**Category Tag:** `[Science - Secrets of Universe]`

```java
public class ScienceBook extends Book {
    public ScienceBook(String title, String author) {
        super(title, author);
    }
    
    @Override
    public void displayInfo() {
        System.out.print("[Science - Secrets of Universe] ");
        super.displayBasicInfo();
    }
}
```

#### 4.2.4 LiteratureBook

**Category Tag:** `[Literature - Stories & Tales]`

```java
public class LiteratureBook extends Book {
    public LiteratureBook(String title, String author) {
        super(title, author);
    }
    
    @Override
    public void displayInfo() {
        System.out.print("[Literature - Stories & Tales] ");
        super.displayBasicInfo();
    }
}
```

---

### 4.3 Reader Class

**File:** `Reader.java`

#### Purpose

Manages library member profiles and borrowing history.

#### Data Structure

```java
private String name;
private List<Book> borrowedBooks;
```

#### Methods

| Method | Description |
|--------|-------------|
| `Reader(String)` | Constructor initializing reader name and empty book list |
| `getName()` | Returns reader's name |
| `addToHistory(Book)` | Records a borrowed book |
| `removeFromHistory(Book)` | Removes a returned book |
| `showMyFile()` | Displays complete borrowing profile |

#### Borrowing History Management

```java
public void addToHistory(Book book) {
    borrowedBooks.add(book);
}

public void removeFromHistory(Book book) {
    borrowedBooks.remove(book);
}
```

#### Profile Display

```java
public void showMyFile() {
    System.out.println("\n--- Personal File for " + name + " ---");
    if (borrowedBooks.isEmpty()) {
        System.out.println("No borrowed books.");
    } else {
        for (Book b : borrowedBooks) {
            b.displayInfo();
        }
    }
}
```

---

### 4.4 Staff Class

**File:** `Staff.java`

#### Purpose

Handles library operations with role-based access control.

#### Data Structure

```java
private String childName;
private String responsibility;
```

#### Methods

| Method | Description |
|--------|-------------|
| `Staff(String, String)` | Constructor with name and section responsibility |
| `processBorrow(Reader, Book)` | Validates and executes book borrowing |
| `processReturn(Reader, Book)` | Processes book return and updates records |

#### Borrowing Logic

```java
public void processBorrow(Reader reader, Book book) {
    System.out.println("\n[System Check] " + childName + 
        " (Responsibility: " + responsibility + 
        ") is processing: " + book.getTitle());

    // Authorization check
    if (!book.getClass().getSimpleName().startsWith(responsibility)) {
        System.out.println("Access Denied: " + childName + 
            " can only process " + responsibility + " books.");
        return;
    }

    // Availability check
    if (book.isAvailable()) {
        book.setAvailable(false);
        reader.addToHistory(book);
        System.out.println("Status: Success! " + book.getTitle() + 
            " has been added to " + reader.getName() + "'s file.");
    } else {
        System.out.println("Alert from " + childName + 
            ": The book '" + book.getTitle() + "' is not available!");
    }
}
```

#### Authorization Mechanism

The staff authorization is implemented through class name prefix matching:

```java
if (!book.getClass().getSimpleName().startsWith(responsibility))
```

- Staff member "Omar" with responsibility "Literature" can only process `LiteratureBook` instances
- Staff member "Sara" with responsibility "Science" can only process `ScienceBook` instances

#### Return Processing

```java
public void processReturn(Reader reader, Book book) {
    book.setAvailable(true);
    reader.removeFromHistory(book);
    System.out.println("Update: " + childName + 
        " received the book: " + book.getTitle());
}
```

---

## 5. Object-Oriented Programming Concepts

### 5.1 Encapsulation

**Implementation:** All instance variables are declared `private` with public getter/setter methods.

```java
// Book.java
private String title;
private String author;
private boolean isAvailable;

public String getTitle() { return title; }
public boolean isAvailable() { return isAvailable; }
public void setAvailable(boolean status) { this.isAvailable = status; }
```

**Benefits:**
- Controlled access to internal state
- Flexibility to modify internal implementation
- Protection against invalid state changes

---

### 5.2 Inheritance

**Implementation:** Four concrete classes extend the abstract `Book` class.

```
Book (abstract)
  ├── DevelopmentBook
  ├── HistoryBook
  ├── ScienceBook
  └── LiteratureBook
```

**Code Example:**

```java
public class ScienceBook extends Book {
    public ScienceBook(String title, String author) {
        super(title, author);  // Calls parent constructor
    }
    
    @Override
    public void displayInfo() {
        System.out.print("[Science - Secrets of Universe] ");
        super.displayBasicInfo();  // Calls parent method
    }
}
```

**Key Concepts:**
- `super()` constructor call to initialize parent fields
- Method overriding with `@Override` annotation
- `super.methodName()` to invoke parent implementation

---

### 5.3 Polymorphism

**Implementation:** Abstract method `displayInfo()` with subclass-specific implementations.

```java
// Parent class defines abstract contract
public abstract void displayInfo();

// Each subclass provides unique implementation
@Override
public void displayInfo() {
    System.out.print("[Literature - Stories & Tales] ");
    super.displayBasicInfo();
}
```

**Runtime Polymorphism Example:**

```java
Book b1 = new LiteratureBook("Old Damascus", "Writer A");
Book b2 = new ScienceBook("Quantum Physics", "Scientist B");

// Same method call, different behavior based on actual object type
b1.displayInfo();  // Output: [Literature - Stories & Tales] Title: Old Damascus | Status: Available
b2.displayInfo();  // Output: [Science - Secrets of Universe] Title: Quantum Physics | Status: Available
```

---

### 5.4 Abstraction

**Implementation:** Abstract `Book` class defines the contract without full implementation.

```java
public abstract class Book {
    // Concrete methods provide common functionality
    public String getTitle() { return title; }
    
    // Abstract method forces subclasses to implement
    public abstract void displayInfo();
    
    // Protected helper for subclass use
    protected void displayBasicInfo() { ... }
}
```

**Key Points:**
- Cannot instantiate abstract class directly
- Forces subclasses to implement `displayInfo()`
- Provides reusable `displayBasicInfo()` template

---

### 5.5 Composition

**Implementation:** `Reader` class contains a collection of `Book` objects.

```java
public class Reader {
    private List<Book> borrowedBooks;  // Composition relationship
    
    public void addToHistory(Book book) {
        borrowedBooks.add(book);  // Book is part of Reader's state
    }
}
```

**Relationship:** "has-a" relationship (Reader has Books)

---

## 6. System Workflow

### 6.1 Application Execution Flow

**File:** `AlAmalLibrary.java` (Main Entry Point)

#### Step 1: Book Creation

```java
Book b1 = new LiteratureBook("Old Damascus", "Writer A");
Book b2 = new ScienceBook("Quantum Physics", "Scientist B");
Book b3 = new HistoryBook("Ancient Civilizations", "Historian C");
Book b4 = new DevelopmentBook("New Beginnings", "Author D");
```

#### Step 2: Staff Initialization

```java
Staff omar = new Staff("Omar", "Literature");
Staff sara = new Staff("Sara", "Science");
```

#### Step 3: Reader Registration

```java
Reader salam = new Reader("Salam");
```

#### Step 4: Borrow Operations

| Operation | Staff | Book | Result |
|-----------|-------|------|--------|
| `omar.processBorrow(salam, b1)` | Omar | LiteratureBook | ✅ Success (Literature staff → Literature book) |
| `sara.processBorrow(salam, b2)` | Sara | ScienceBook | ✅ Success (Science staff → Science book) |
| `sara.processBorrow(salam, b1)` | Sara | LiteratureBook | ❌ Access Denied (Science staff → Literature book) |
| `omar.processBorrow(salam, b2)` | Omar | ScienceBook | ❌ Access Denied (Literature staff → Science book) |

#### Step 5: Profile Display

```java
salam.showMyFile();
// Output: Shows successfully borrowed books (b1 and b2)
```

#### Step 6: Return Operations

```java
omar.processReturn(salam, b1);  // Returns LiteratureBook
sara.processReturn(salam, b2);  // Returns ScienceBook
```

#### Step 7: Final Profile

```java
salam.showMyFile();
// Output: No borrowed books
```

---

### 6.2 Execution Output Simulation

```
=== Welcome to Al-Amal Library System ===

[System Check] Omar (Responsibility: Literature) is processing: Old Damascus
Status: Success! Old Damascus has been added to Salam's file.

[System Check] Sara (Responsibility: Science) is processing: Quantum Physics
Status: Success! Quantum Physics has been added to Salam's file.

[System Check] Sara (Responsibility: Science) is processing: Old Damascus
Access Denied: Sara can only process Science books.

[System Check] Omar (Responsibility: Literature) is processing: Quantum Physics
Access Denied: Omar can only process Literature books.

--- Personal File for Salam ---
[Literature - Stories & Tales] Title: Old Damascus | Status: Borrowed
[Science - Secrets of Universe] Title: Quantum Physics | Status: Borrowed

Update: Omar received the book: Old Damascus

--- Personal File for Salam ---
[Science - Secrets of Universe] Title: Quantum Physics | Status: Borrowed

Update: Sara received the book: Quantum Physics

--- Personal File for Salam ---
No borrowed books.
```

---

## 7. Implementation Details

### 7.1 Access Control Mechanism

The system implements role-based access control through class name prefix matching:

```java
if (!book.getClass().getSimpleName().startsWith(responsibility))
```

**How It Works:**

1. `book.getClass().getSimpleName()` returns the simple class name (e.g., "LiteratureBook")
2. `.startsWith(responsibility)` checks if the name begins with the staff's responsibility
3. "Literature" matches "LiteratureBook" → Access granted
4. "Science" does not match "LiteratureBook" → Access denied

**Security Consideration:**

- This mechanism ties authorization to class naming conventions
- Adding new book categories requires corresponding staff responsibility updates

---

### 7.2 State Management

#### Book Availability State

```
┌─────────────┐    processBorrow()    ┌─────────────┐
│  Available   │ ───────────────────► │   Borrowed   │
│ (isAvailable │                      │ (isAvailable │
│   = true)    │ ◄─────────────────── │   = false)   │
└─────────────┘    processReturn()    └─────────────┘
```

#### Reader Borrowing History

```
┌───────────────────────────────────────────┐
│              Reader State                  │
├───────────────────────────────────────────┤
│  name: "Salam"                           │
│  borrowedBooks: [Book, Book, ...]         │
└───────────────────────────────────────────┘
         │                          ▲
         ▼                          │
    addToHistory()            removeFromHistory()
```

---

### 7.3 Data Structures Used

| Component | Data Structure | Justification |
|-----------|---------------|---------------|
| Book metadata | String fields | Fixed-size text data |
| Book availability | boolean flag | Binary state (available/borrowed) |
| Reader history | ArrayList\<Book\> | Dynamic collection, ordered, allows duplicates |

---

## 8. Technical Specifications

### 8.1 Project Configuration (pom.xml)

| Property | Value |
|----------|-------|
| Group ID | `com.mycompany` |
| Artifact ID | `AlAmalLibrary` |
| Version | `1.0-SNAPSHOT` |
| Packaging | JAR |
| Java Version | 24 |
| Source Encoding | UTF-8 |
| Main Class | `com.mycompany.alamallibrary.AlAmalLibrary` |

### 8.2 Package Structure

```
com.mycompany.alamallibrary
├── AlAmalLibrary.java      (Main application)
├── Book.java               (Abstract base class)
├── DevelopmentBook.java    (Book subclass)
├── HistoryBook.java        (Book subclass)
├── ScienceBook.java        (Book subclass)
├── LiteratureBook.java     (Book subclass)
├── Reader.java             (User management)
└── Staff.java              (Service operations)
```

### 8.3 Class Summary

| Class | Type | Extends | Key Responsibilities |
|-------|------|---------|---------------------|
| Book | Abstract | - | Base book functionality |
| DevelopmentBook | Concrete | Book | Development/inspiration books |
| HistoryBook | Concrete | Book | Historical publications |
| ScienceBook | Concrete | Book | Scientific literature |
| LiteratureBook | Concrete | Book | Literary works |
| Reader | Concrete | - | Member management, borrowing history |
| Staff | Concrete | - | Operations, authorization |
| AlAmalLibrary | Concrete | - | Application entry point |

---

## Appendix A: Code Glossary

| Term | Definition |
|------|-----------|
| Abstract Class | Class that cannot be instantiated, defines contract for subclasses |
| Encapsulation | Bundling data with methods, restricting direct access |
| Inheritance | Mechanism for creating new classes from existing ones |
| Polymorphism | Ability of objects to take multiple forms |
| Composition | Relationship where one class contains instances of another |
| Override | Subclass providing specific implementation of parent method |
| Constructor | Special method called when object is created |
| Getter | Method that retrieves field value |
| Setter | Method that modifies field value |
| Instance Variable | Object-level variable |
| Class Variable | Shared across all instances (not used in this project) |

---

## Appendix B: Future Enhancement Recommendations

1. **Persistence Layer:** Add database integration for data persistence
2. **GUI Interface:** Develop graphical user interface for better user experience
3. **Extended Validation:** Implement additional business rules for borrowing
4. **Reporting System:** Generate borrowing statistics and reports
5. **Multi-User Support:** Add concurrent access handling with thread safety

---

**Document Version:** 1.0  
**Last Updated:** 2026-06-29  
**Author:** Abdulrahman  
**Project:** Al-Amal Library Management System
