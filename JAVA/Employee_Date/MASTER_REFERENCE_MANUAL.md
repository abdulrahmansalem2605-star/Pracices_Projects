# Employee Date Management System

## Master Reference Manual

**Author:** Abdulrahman
**Language:** Java 24
**Build System:** Apache Maven
**Package:** `com.mycompany.employee_date`

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture & Design Patterns](#2-architecture--design-patterns)
3. [Project Structure](#3-project-structure)
4. [Core Components](#4-core-components)
   - 4.1 [clsDate — Date Utilities](#41-clsdate--date-utilities)
   - 4.2 [clsEmployee — Employee Entity](#42-clsemployee--employee-entity)
   - 4.3 [EmployeeFileManager — Persistence Layer](#43-employeefilemanager--persistence-layer)
   - 4.4 [EmployeeManager — Business Logic](#44-employeemanager--business-logic)
   - 4.5 [EmployeeSystemScreen — UI Controller](#45-employeesystemscreen--ui-controller)
   - 4.6 [InputHelper — Input Validation](#46-inputhelper--input-validation)
   - 4.7 [OutputHelper — Console Formatting](#47-outputhelper--console-formatting)
5. [Data Model & File Format](#5-data-model--file-format)
6. [CRUD Operations](#6-crud-operations)
7. [Algorithm Reference](#7-algorithm-reference)

---

## 1. System Overview

The Employee Date Management System is a console-based Java application for managing employee records with persistent file storage. It provides full CRUD operations (Create, Read, Update, Delete) on employee data, including automatic date validation, Zeller's Congruence day-of-week calculation, and formatted console output.

**Key capabilities:**
- Employee record management (ID, Name, Salary, Birth Date, Hire Date)
- Persistent storage to flat file (`Employees.txt`)
- Automatic ID generation (sequential, max ID + 1)
- Input validation for numbers, characters, ranges, and dates
- Formatted console display with borders and visual separators
- Date utilities including leap year detection and day-of-week calculation

---

## 2. Architecture & Design Patterns

### Layered Architecture

```
┌─────────────────────────────────────┐
│          Presentation Layer         │
│   EmployeeSystemScreen              │
│   (Menu, Navigation, Flow Control)  │
├─────────────────────────────────────┤
│          Business Logic Layer       │
│   EmployeeManager                   │
│   (Read, Display, Search,           │
│    Delete, Update)                  │
├─────────────────────────────────────┤
│          Domain Model Layer         │
│   clsEmployee, clsDate              │
│   (Entity, Date Utilities)          │
├─────────────────────────────────────┤
│          Persistence Layer          │
│   EmployeeFileManager               │
│   (File I/O, Serialization)         │
├─────────────────────────────────────┤
│          Utility Layer              │
│   InputHelper, OutputHelper         │
│   (Input Validation, Formatting)    │
└─────────────────────────────────────┘
```

### Design Patterns

- **Static Utility Classes:** `InputHelper`, `OutputHelper`, `clsDate` — stateless classes with static methods for reusable operations.
- **Inner Class Modules:** `EmployeeManager.Read`, `EmployeeManager.Display`, `EmployeeManager.Search`, `EmployeeManager.Delete`, `EmployeeManager.Update` — logical grouping of CRUD operations within a single namespace.
- **Factory Method:** `clsEmployee` constructors — two constructor overloads handle interactive creation (prompts for dates) and file-loaded creation (accepts pre-parsed dates).
- **Flat File Persistence:** Custom serialization using `#//#` as a field delimiter, avoiding external database dependencies.

---

## 3. Project Structure

```
Employee_Date/
├── pom.xml                          # Maven build configuration
├── Employees.txt                    # Persistent data store
└── src/main/java/com/mycompany/employee_date/
    ├── clsDate.java                 # Date utilities and parsing
    ├── clsEmployee.java             # Employee entity model
    ├── EmployeeFileManager.java     # File I/O operations
    ├── EmployeeManager.java         # CRUD business logic
    ├── EmployeeSystemScreen.java    # Main menu and UI flow
    ├── Employee_Date.java           # Application entry point
    ├── InputHelper.java             # Input validation utilities
    └── OutputHelper.java            # Console formatting utilities
```

---

## 4. Core Components

### 4.1 clsDate — Date Utilities

**File:** `src/main/java/com/mycompany/employee_date/clsDate.java`

A comprehensive date utility class handling date validation, parsing, formatting, and day-of-week calculation.

#### Enums

| Enum | Values | Purpose |
|------|--------|---------|
| `enDaysOfWeek` | Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday | Day-of-week representation |
| `enMonthsOfYear` | January through December | Month representation |

#### Inner Class

- `clsDateStructure` — Internal date representation with fields: `short Day`, `short Month`, `short Year`

#### Public Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `ReadFullDate` | `static clsDateStructure ReadFullDate(String message)` | Prompts user for year, month, and validated day. Returns a `clsDateStructure`. |
| `GetDateString` | `static String GetDateString(clsDateStructure Date)` | Converts a date structure to `D/M/YYYY` string format. |
| `StringToDate` | `static clsDateStructure StringToDate(String StringDate)` | Parses a `D/M/YYYY` string back into a `clsDateStructure`. |
| `getSystemDate` | `static clsDateStructure getSystemDate()` | Returns the current system date using `java.time.LocalDate`. |

#### Private Methods

| Method | Purpose |
|--------|---------|
| `IsLeapYear(short year)` | Determines leap year using Gregorian calendar rules (divisible by 400, or divisible by 4 but not 100). |
| `GetNumberOfDaysInMonth(enMonthsOfYear, short)` | Returns days in a given month, accounting for leap years in February. |
| `GetValidDayOfMonth(short Year, short Month)` | Validates day input against the month's actual range. |
| `DayOfWeekOrder(short Year, short Month, short Day)` | Computes day of week using Zeller's Congruence algorithm. |
| `GetDayOfWeekNames(enDaysOfWeek)` | Converts enum to display string. |
| `splitString(String text, String delimiter)` | Custom string splitting without reliance on `String.split()`. |
| `GetDateVector(String DateString)` | Splits a date string by `/` delimiter into components. |

#### Date Validation Flow

```
User Input (Year) → Validate 1-2025
User Input (Month) → Validate 1-12
Calculate max days for month → User Input (Day) → Validate 1-MaxDays
```

---

### 4.2 clsEmployee — Employee Entity

**File:** `src/main/java/com/mycompany/employee_date/clsEmployee.java`

Immutable-core employee entity with fields for identification, personal information, and employment dates.

#### Fields

| Field | Type | Access | Description |
|-------|------|--------|-------------|
| `_ID` | `int` | `final` | Unique employee identifier (auto-generated) |
| `_Name` | `String` | `final` | Employee full name |
| `_Salray` | `double` | mutable | Employee salary |
| `_DEPARTMENT_NAME` | `String` | `final` | Default: `"General Department"` |
| `_BirthDate_String` | `String` | mutable | Birth date in `D/M/YYYY` format |
| `_HireDate_String` | `String` | mutable | Hire date in `D/M/YYYY` format |

#### Constructors

| Constructor | Parameters | Behavior |
|-------------|------------|----------|
| Interactive | `(int ID, String Name, double Slaray)` | Auto-sets hire date to system date; prompts user for birth date. |
| File-Loaded | `(int ID, String Name, double Slaray, String BirthDate, String HireDate)` | Directly assigns all fields — used when deserializing from file. |

#### Accessors

- `getID()`, `getName()`, `getDEPARTMENT_NAME()`, `getSalary()`, `getBirthDate()`, `getHireDate()`
- `setSalary(double)` — the only mutator (updates salary in-place)

---

### 4.3 EmployeeFileManager — Persistence Layer

**File:** `src/main/java/com/mycompany/employee_date/EmployeeFileManager.java`

Handles all file I/O operations for employee data persistence.

#### Constants

- `EMPLOYEES_FILE_NAME = "Employees.txt"` — the data store filename

#### Serialization Format

Records are serialized using the `#//#` delimiter:

```
ID#//#Name#//#Salary#//#BirthDate#//#HireDate
```

Example:
```
1#//#Abdulrahman#//#5000.0#//#1/7/2005#//#16/11/2025
```

#### Public Methods

| Method | Description |
|--------|-------------|
| `generateNextEmployeeID()` | Reads all records, finds max ID, returns maxID + 1. |
| `convertLineToRecord(String line, String separator)` | Parses a delimited string into a `clsEmployee` object. Returns `null` if malformed. |
| `convertRecordToLine(clsEmployee emp, String separator)` | Serializes an employee record to a delimited string. |
| `convertVectorDataToLines(Vector<clsEmployee>, String)` | Bulk-serializes a vector of employees to lines. |
| `loadDataFromFileToVector(String fileName, String separator)` | Reads the file line-by-line, parses each into `clsEmployee`, returns populated vector. Handles missing/empty files gracefully. |
| `copySingleEmployeeToFile(String fileName, clsEmployee, String)` | Appends a single record to the file. |
| `copyEmployeeInformationToFile(String fileName, Vector<clsEmployee>, String)` | Appends multiple records to the file. |
| `replaceFileContentWithVectorData(String fileName, Vector<clsEmployee>, String)` | Overwrites entire file with current vector contents. Used after delete/update operations. |
| `overwriteAll(Vector<clsEmployee>)` | Convenience method — calls `replaceFileContentWithVectorData` with the default file and separator. |

#### File I/O Strategy

- **Append mode:** `BufferedWriter(new FileWriter(fileName, true))` — used for new records.
- **Overwrite mode:** `BufferedWriter(new FileWriter(fileName))` — used for bulk updates after delete/update.
- **Read mode:** `BufferedReader(new FileReader(file))` — line-by-line parsing with try-with-resources.

---

### 4.4 EmployeeManager — Business Logic

**File:** `src/main/java/com/mycompany/employee_date/EmployeeManager.java`

Contains all CRUD operations organized as static inner classes.

#### Constants

- `SEPARATOR = "#//#"` — the field delimiter used throughout the system

#### 4.4.1 EmployeeManager.Read

Handles new employee creation.

| Method | Description |
|--------|-------------|
| `showReadScreen()` | Clears console and displays the Read Employee header. |
| `idExistsInFile(int id)` | Checks whether an ID already exists in the data file. |
| `readUniqueEmployeeID(String message)` | Prompts until a unique ID is entered (validates against existing records). |
| `readNewEmployee()` | Generates next ID, reads name and salary, creates employee via interactive constructor. |
| `readVectorOfEmployees(Vector<clsEmployee>)` | Loop for adding multiple employees. Appends each to file immediately on confirmation. |

#### 4.4.2 EmployeeManager.Display

Handles employee list rendering.

| Method | Description |
|--------|-------------|
| `isEmptyResult(Vector<clsEmployee>)` | Checks if vector is empty; prints message if so. |
| `printEmployeeInShape(clsEmployee)` | Formats a single employee as a table row with printf padding. |
| `printEmployees(Vector<clsEmployee>)` | Refreshes vector from file, renders full table with header and borders. |
| `printEmployee(clsEmployee)` | Vertical key-value display of all employee fields. |
| `printEmployeeCard(clsEmployee)` | Decorated card view with star borders. |

#### 4.4.3 EmployeeManager.Search

Handles employee lookup by ID.

| Method | Description |
|--------|-------------|
| `searchForEmployeeByID(Vector<clsEmployee>, int, clsEmployee[])` | Linear search; uses array holder pattern to return found object via side-effect. |
| `searchForEmployeesByID(Vector<clsEmployee>)` | Interactive search loop with repeat option. |
| `returnEmployeeByID(Vector<clsEmployee>, int)` | Returns the matching `clsEmployee` or `null` — used by Delete and Update modules. |

#### 4.4.4 EmployeeManager.Delete

Handles employee removal.

| Method | Description |
|--------|-------------|
| `showDeleteScreen()` | Displays delete header. |
| `deleteEmployeeByID(Vector<clsEmployee>, int, clsEmployee)` | Confirms deletion, removes from vector, returns success flag. |
| `deleteEmployeesByID(Vector<clsEmployee>)` | Interactive delete loop. After each deletion, overwrites file and refreshes vector. |

#### 4.4.5 EmployeeManager.Update

Handles employee record modification.

| Method | Description |
|--------|-------------|
| `chooseUpdateType()` | Presents menu: Name, Salary, Birth Date, or All Data. |
| `changeAllData(clsEmployee)` | Reads all fields except ID and Hire Date, returns new employee object. |
| `changeData(UpdateType, clsEmployee)` | Applies the specific field change based on update type. |
| `employeesEqual(clsEmployee, clsEmployee)` | Compares all fields to detect if changes were made. |
| `updateEmployeeByID(Vector<clsEmployee>, int, clsEmployee)` | Orchestrates the update flow: show card → confirm → edit → compare → save or discard. |
| `updateEmployeesByID(Vector<clsEmployee>)` | Interactive update loop. Persists changes to file on successful update. |

---

### 4.5 EmployeeSystemScreen — UI Controller

**File:** `src/main/java/com/mycompany/employee_date/EmployeeSystemScreen.java`

Top-level application controller managing the main menu and navigation flow.

#### Initialization

Constructor loads all employee data from file into a `Vector<clsEmployee>`, then enters the main menu loop.

#### MainMenuOptions Enum

| Value | Action |
|-------|--------|
| Show | Display employee list |
| Add | Add new employee |
| Delete | Remove employee |
| Update | Modify employee data |
| Find | Search by ID |
| Exit | Terminate application |

#### Methods

| Method | Description |
|--------|-------------|
| `showMainMenu()` | Renders the main menu with 6 options. |
| `getMainMenuOption()` | Reads validated character input (1-6), returns enum. |
| `showMainMenuExitScreen()` | Confirmation prompt before exit. |
| `goBackToMainMenu()` | Pauses for user input before returning to menu. |
| `implementMainMenuOptions(...)` | Dispatches to the appropriate `EmployeeManager` sub-module. |
| `implementMainMenu(...)` | Main event loop — repeats until user confirms exit. |

---

### 4.6 InputHelper — Input Validation

**File:** `src/main/java/com/mycompany/employee_date/InputHelper.java`

Comprehensive input validation utilities with type-safe reading and range checking.

#### Core Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `readNumber()` | `static double readNumber()` | Reads raw double from scanner. |
| `readDouble(String)` | `static double readDouble(String message)` | Prompts with error loop for valid double input. |
| `readString(String)` | `static String readString(String message)` | Reads single-line string. |
| `readStringWhiteSpaces(String)` | `static String readStringWhiteSpaces(String message)` | Consumes leftover newline, then reads full line including spaces. |
| `readChar(String)` | `static char readChar(String message)` | Reads first character of input. |
| `readValidChar(String)` | `static char readValidChar(String message)` | Validates single-character input. |

#### Validation Methods

| Method | Description |
|--------|-------------|
| `getNonNegativeInput(String)` | Ensures input ≥ 0. |
| `getPositiveInput(String)` | Ensures input > 0. |
| `validateNumberInRange(double, double, double)` | Range check: `from ≤ number ≤ to`. |
| `isWholeNumber(double)` | Checks `Math.floor(n) == n`. |
| `getValidLong(long from, long to, String)` | Validates integer input within range (rejects decimals). |
| `validateCharInRange(char, char, char)` | Character range check. |
| `getValidChar(char from, char to, String, boolean checkAlphabetOnly)` | Validated character input with optional alphabet-only filter. |
| `getValidNumber(double from, double to, String)` | Validated double input within range. |
| `yesNo(String)` | Binary choice input (0 or 1) returning boolean. |

---

### 4.7 OutputHelper — Console Formatting

**File:** `src/main/java/com/mycompany/employee_date/OutputHelper.java`

Static utility methods for consistent console output formatting.

#### Formatting Methods

| Method | Character | Description |
|--------|-----------|-------------|
| `printVariable(T, String)` | — | Prints label + variable value. |
| `printSideBar(int)` | `|` | Prints repeated pipe characters. |
| `printBorder(int)` | `=` | Prints double-line border with newlines. |
| `printBar(int)` | `-` | Prints horizontal dash line. |
| `printStar(int)` | `*` | Prints asterisk line. |
| `printUnderScore(int)` | `_` | Prints underscore line. |
| `printTextInBorder(String, int)` | `=` + `|` | Text wrapped in bordered frame. |
| `printTextInBar(String, int)` | `-` + `|` | Text wrapped in bar-delimited frame. |
| `printStringWithSpaceAfterEachChar(String)` | — | Spaced character output. |

#### System Methods

| Method | Description |
|--------|-------------|
| `pressAnyKeyToContinue()` | Pause with asterisk borders and "Press Any Key" prompt. |
| `clearConsole()` | ANSI escape sequence to clear terminal screen. |
| `setConsoleColor(boolean isFailed)` | Sets terminal text color (success/failure). |
| `showSuccessFailedScreen(String, int, boolean)` | Displays a colored status message with pause. |
| `returnDefaultColor()` | Resets terminal color. |
| `pauseScreenReturnDefaultColor()` | Pause + color reset + pause sequence. |

---

## 5. Data Model & File Format

### Employee Record Schema

| Field | Type | Format | Constraints |
|-------|------|--------|-------------|
| ID | `int` | Integer | Auto-generated, sequential, unique |
| Name | `String` | Free text | Supports spaces |
| Salary | `double` | Decimal | ≥ 0 |
| Birth Date | `String` | `D/M/YYYY` | Validated against month/year |
| Hire Date | `String` | `D/M/YYYY` | Auto-set to system date on creation |

### File Format Specification

```
<Record1>\n
<Record2>\n
...
<RecordN>\n
```

Each record:
```
<ID>#//#<Name>#//#<Salary>#//#<BirthDate>#//#<HireDate>
```

**Delimiter:** `#//#` (chosen to avoid conflicts with date `/` separators)

**Example:**
```
1#//#Abdulrahman#//#5000.0#//#1/7/2005#//#16/11/2025
```

---

## 6. CRUD Operations

### Create

```
1. User selects "Add New Employee" from menu
2. System generates next ID (max existing ID + 1)
3. User enters: Name, Salary
4. System auto-sets Hire Date to current system date
5. User enters: Birth Date (validated by month/year)
6. Employee card displayed for confirmation
7. On "Yes": appended to Employees.txt and vector
8. Loop continues until user declines
```

### Read (Display)

```
1. User selects "Show Employee List"
2. Vector refreshed from file (Ensures latest data)
3. Table rendered with columns: ID | Name | Salary | Birth Date | Hire Date
4. Footer shows total record count
5. User presses any key to return to menu
```

### Update

```
1. User selects "Update Employee Information"
2. Employee list displayed for reference
3. User enters Employee ID to modify
4. Current record displayed as card
5. User confirms update intent
6. User selects update type: Name / Salary / Birth Date / All Data
7. New value entered, new card shown alongside original
8. User confirms or discards change
9. Loop allows multiple field updates
10. On final save: file overwritten with updated vector
```

### Delete

```
1. User selects "Delete Employee"
2. Employee list displayed
3. User enters Employee ID
4. Record displayed as card
5. User confirms deletion
6. Record removed from vector
7. File overwritten with remaining records
8. Loop continues until user declines or list is empty
```

### Search (Find)

```
1. User selects "Find Employee"
2. User enters Employee ID
3. Linear search through vector
4. If found: employee card displayed
5. If not found: "Not Found" message
6. Loop continues until user declines
```

---

## 7. Algorithm Reference

### Zeller's Congruence (Day of Week Calculation)

Used in `clsDate.DayOfWeekOrder()` to compute the day of the week for any Gregorian calendar date.

**Formula:**
```
h = (q + (13*(m+1))/5 + K + K/4 + J/4 + 5*J) mod 7
```

Where:
- `q` = day of the month
- `m` = adjusted month (March=3 through February=14 of previous year)
- `K` = year of the century (year % 100)
- `J` = zero-based century (year / 100)
- `h` = result (0=Saturday, 1=Sunday, ..., 6=Friday)

**Adjustment:** If month < 3, add 12 to month and subtract 1 from year.

### Leap Year Detection

```
if (year % 400 == 0) → Leap Year
if (year % 100 == 0) → Not Leap Year
if (year % 4 == 0)   → Leap Year
otherwise             → Not Leap Year
```

### Auto-ID Generation

```
maxID = 0
for each employee in file:
    if employee.ID > maxID:
        maxID = employee.ID
return maxID + 1
```

---

*This document was generated from the source code of the Employee Date Management System. All content reflects the actual implementation by Abdulrahman.*
