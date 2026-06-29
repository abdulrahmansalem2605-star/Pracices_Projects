# Java Bank System — Master Reference Manual

> **Author:** Abdulrahman
> **Build System:** Maven (Java 24)
> **Architecture:** Console-based multi-module banking application with file-based persistence

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture & Package Structure](#2-architecture--package-structure)
3. [Data Model](#3-data-model)
4. [File Persistence Layer](#4-file-persistence-layer)
5. [Client Management (CRUD Operations)](#5-client-management-crud-operations)
6. [Financial Transactions Engine](#6-financial-transactions-engine)
7. [User Interface Layer](#7-user-interface-layer)
8. [Input/Output Utility Framework](#8-inputoutput-utility-framework)
9. [Application Entry Point & Lifecycle](#9-application-entry-point--lifecycle)
10. [Design Decisions & Rationale](#10-design-decisions--rationale)

---

## 1. System Overview

This is a console-based banking system that manages client accounts with full CRUD operations and financial transaction capabilities. The system persists all data to a flat text file (`Clients.txt`) using a custom delimiter-based serialization format, enabling data survival across sessions without requiring a database.

**Core Capabilities:**

| Feature | Description |
|---------|-------------|
| Client Management | Create, read, update, delete, and search client records |
| Deposits | Add funds to any client account with confirmation workflow |
| Withdrawals | Remove funds with balance validation and rollback support |
| Balance Reporting | Display individual balances and compute system-wide totals |
| Data Persistence | Flat-file storage with atomic overwrite on mutations |

---

## 2. Architecture & Package Structure

```
BankSystem/
├── pom.xml                                          # Maven build configuration
├── Required Exercise.png                            # Original exercise specification
└── src/main/java/
    ├── s/banksystem/
    │   ├── BankSystem.java                          # Application entry point
    │   ├── BankSystemScreen.java                    # Main & Transactions menu controller
    │   ├── BankTransactionsSystem.java              # Deposit, Withdraw, TotalBalances engine
    │   └── HelperClasses/
    │       ├── InputHelper.java                     # Validated console input utilities
    │       ├── OutputHelper.java                    # Console formatting & display utilities
    │       └── FileUtils.java                       # Generic file I/O operations
    └── BankSystemClients/
        ├── Client.java                              # Data model (entity class)
        ├── ClientsManager.java                      # CRUD operations (Read, Display, Search, Delete, Update)
        └── ClientFileManager.java                   # Client-specific file serialization
```

**Package Responsibilities:**

| Package | Purpose |
|---------|---------|
| `s.banksystem` | Application core — entry point, menu system, transaction engine |
| `s.banksystem.HelperClasses` | Reusable utilities for input validation, output formatting, file I/O |
| `BankSystemClients` | Domain layer — client entity, CRUD operations, file persistence |

---

## 3. Data Model

### 3.1 Client Entity

**File:** `BankSystemClients/Client.java`

The `Client` class is the central domain entity, encapsulating all account holder information as private fields with getter/setter accessors.

```java
public class Client {
    private String _Name = "";
    private String _PhoneNumber = "";
    private String _AccountNumber = "";
    private String _PinCode = "";
    private double _AccountBalance = 0.0;
    private boolean _DeletedClientMark = false;
}
```

**Field Specifications:**

| Field | Type | Purpose | Validation |
|-------|------|---------|------------|
| `_Name` | `String` | Client's full name | Non-empty, allows spaces |
| `_PhoneNumber` | `String` | Contact phone number | Alphanumeric string |
| `_AccountNumber` | `String` | Unique account identifier | Must not duplicate existing records |
| `_PinCode` | `String` | Security PIN | Alphanumeric string |
| `_AccountBalance` | `double` | Current monetary balance | Non-negative (`>= 0`) |
| `_DeletedClientMark` | `boolean` | Soft-delete flag | Internal use; filtered during file writes |

**Constructors:**

- `Client()` — Default no-arg constructor for manual field population
- `Client(String name, String phoneNumber, String accountNumber, String pinCode, double accountBalance)` — Full parameterized constructor

**Design Note:** The `_DeletedClientMark` field implements a soft-delete pattern. Rather than removing entries from the in-memory vector immediately, clients are flagged as deleted and excluded during file persistence via `ClientFileManager.replaceFileContentWithVectorDataAfterDeletedClients()`.

---

## 4. File Persistence Layer

### 4.1 File Format

**Delimiter:** `#//#`

Each client record is serialized as a single line:

```
Name#//#PhoneNumber#//#AccountNumber#//#PinCode#//#AccountBalance
```

Example record:

```
Abdulrahman#//#0551234567#//#A1001#//#1234#//#5000.0
```

### 4.2 ClientFileManager

**File:** `BankSystemClients/ClientFileManager.java`

Responsible for all client-specific file operations.

**Key Methods:**

| Method | Operation | Access Mode |
|--------|-----------|-------------|
| `convertLineToRecord(line, separator)` | Deserialize file line → `Client` object | Read |
| `convertRecordToLine(client, separator)` | Serialize `Client` object → file line | Write |
| `loadDataFromFileToVector(fileName, separator)` | Load all records from file into `Vector<Client>` | Read |
| `copySingleClientToFile(fileName, client, separator)` | Append one client to file | Append |
| `copyClientInformationToFile(fileName, clients, separator)` | Append multiple clients to file | Append |
| `replaceFileContentWithVectorDataAfterDeletedClients(...)` | Rewrite file excluding soft-deleted entries | Overwrite |
| `overwriteWithoutDeleted(clients)` | Convenience wrapper for the above | Overwrite |

**Serialization Flow (Write):**

```
Client object → convertRecordToLine() → "Field1#//#Field2#//#..." → BufferedWriter → Clients.txt
```

**Deserialization Flow (Read):**

```
Clients.txt → BufferedReader → "Field1#//#Field2#//#..." → convertLineToRecord() → Client object
```

**Persistence Strategy:**

- **New records:** Appended via `BufferedWriter` with `append=true`
- **Updates/Deletes:** Full file rewrite excluding deleted-marked entries
- This ensures data consistency after any mutation operation

---

## 5. Client Management (CRUD Operations)

### 5.1 ClientsManager

**File:** `BankSystemClients/ClientsManager.java`

The `ClientsManager` class organizes all client operations into nested inner classes, each handling a specific responsibility.

```
ClientsManager
├── Read        — Create new client records
├── Display     — Render client data in formatted tables
├── Search      — Locate clients by account number
├── Delete      — Soft-delete clients with confirmation
└── Update      — Modify client fields with rollback support
```

**Shared Constant:**

```java
public static final String SEPARATOR = "#//#";
```

---

### 5.2 Read (Create)

**Inner Class:** `ClientsManager.Read`

Handles new client registration with duplicate account number prevention.

**Workflow:**

1. Display the read screen header
2. Prompt for client name (allows spaces)
3. Prompt for phone number
4. Prompt for account number — validates uniqueness against file
5. Prompt for PIN code
6. Prompt for balance (minimum 0)
7. Display client card for confirmation
8. On user approval: append to file and add to in-memory vector

**Key Method — Account Uniqueness Check:**

```java
public static boolean accountExistsInFile(String accountNumber) {
    File file = new File(ClientFileManager.CLIENTS_FILE_NAME);
    // Reads entire file line-by-line, deserializes each record,
    // and checks if any existing account number matches
}
```

This method performs a full sequential scan of `Clients.txt` on every new account entry, ensuring no duplicate account numbers exist in the persisted data.

---

### 5.3 Display (Read All)

**Inner Class:** `ClientsManager.Display`

Renders client data in formatted ASCII table output.

**Table Format:**

```
| Client Name                          | Phone Number  | Account Number  | PIN Code  | Balance   |
----------------------------------------------------------------------------------------------------
| Abdulrahman                          | 0551234567    | A1001           | 1234      | 5000.00   |
| Mohammed                              | 0559876543    | A1002           | 5678      | 3200.50   |
----------------------------------------------------------------------------------------------------
```

**Key Methods:**

| Method | Purpose |
|--------|---------|
| `printClients(clients)` | Refresh data from file, display full table |
| `printClientCard(client)` | Display single client in detailed card format |
| `printClient(client)` | Print labeled field-by-field output |
| `isEmptyResult(clients)` | Check and display empty-state message |

**Data Refresh Pattern:**

```java
clients.clear();
clients.addAll(ClientFileManager.loadDataFromFileToVector(ClientFileManager.CLIENTS_FILE_NAME, SEPARATOR));
```

Every display operation reloads from file, ensuring the UI always reflects the latest persisted state.

---

### 5.4 Search

**Inner Class:** `ClientsManager.Search`

Locates clients by account number using sequential search.

**Key Methods:**

| Method | Return Type | Purpose |
|--------|-------------|---------|
| `returnClientByAccountNumber(clients, accountToFind)` | `Client` | Returns matching client or `null` |
| `searchForClientByAccountNumber(clients, accountToFind, foundClientHolder)` | `boolean` | Uses array-based output parameter pattern |
| `searchForClientsByAccountNumber(clients)` | `void` | Interactive search loop with repeat option |

**Search Algorithm:** Linear scan through the `Vector<Client>` collection, comparing `accountNumber` strings with `equals()`.

---

### 5.5 Delete

**Inner Class:** `ClientsManager.Delete`

Implements soft-delete with user confirmation.

**Workflow:**

1. Display delete screen header
2. Show current client list
3. Prompt for account number to delete
4. Locate client via `Search.returnClientByAccountNumber()`
5. Display client card for confirmation
6. On confirmation: set `deletedClientMark = true`
7. Rewrite file excluding deleted entries
8. Reload in-memory vector from file

**Soft-Delete Mechanism:**

```java
clientToDelete.setDeletedClientMark(true);
// Later, during file write:
if (!client.isDeletedClientMark()) {
    writer.write(convertRecordToLine(client, separator));
}
```

This approach avoids index corruption in the `Vector` and provides a clean file state after deletion.

---

### 5.6 Update

**Inner Class:** `ClientsManager.Update`

Supports field-level and full-record updates with rollback capability.

**Update Types (Enum):**

```java
private enum _UpdateClientType {
    Name, PhoneNumber, PINCode, AccountBalance, AllData
}
```

**Update Workflow:**

1. Display update screen header
2. Show current client list
3. Prompt for account number
4. Locate and display client card
5. Confirm intent to update
6. Select update type (name, phone, PIN, balance, or all)
7. Enter new value
8. Display before/after comparison
9. Confirm or discard changes (rollback to old values)
10. Repeat if user wants additional field changes
11. On final confirmation: persist to file

**Rollback Mechanism:**

```java
Client oldClientData = new Client(
    clientToUpdate.getName(),
    clientToUpdate.getPhoneNumber(),
    clientToUpdate.getAccountNumber(),
    clientToUpdate.getPinCode(),
    clientToUpdate.getAccountBalance()
);

// If user discards:
clientToUpdate.setName(oldClientData.getName());
clientToUpdate.setPhoneNumber(oldClientData.getPhoneNumber());
// ... etc
```

**Change Detection:**

```java
public static boolean clientsEqual(Client oldClient, Client modifiedClient) {
    return oldClient.getName().equals(modifiedClient.getName())
            && oldClient.getPhoneNumber().equals(modifiedClient.getPhoneNumber())
            && oldClient.getAccountNumber().equals(modifiedClient.getAccountNumber())
            && oldClient.getPinCode().equals(modifiedClient.getPinCode())
            && oldClient.getAccountBalance() == modifiedClient.getAccountBalance()
            && oldClient.isDeletedClientMark() == modifiedClient.isDeletedClientMark();
}
```

The update is only persisted if at least one field actually changed.

---

## 6. Financial Transactions Engine

### 6.1 BankTransactionsSystem

**File:** `s/banksystem/BankTransactionsSystem.java`

Contains three inner classes, each implementing a specific financial operation.

```
BankTransactionsSystem
├── Deposit       — Add funds to client accounts
├── Withdraw      — Remove funds with balance validation
└── TotalBalances — Aggregate and display all balances
```

---

### 6.2 Deposit Operation

**Inner Class:** `BankTransactionsSystem.Deposit`

**Workflow:**

1. Show deposit screen
2. Display client list
3. Prompt for target account number
4. Locate client
5. Display client card
6. Confirm deposit intent
7. Enter deposit amount (validated: `>= 1`)
8. Show before/after balance comparison
9. Confirm transaction
10. On confirmation: update balance and persist to file
11. On rejection: rollback balance to pre-deposit value

**Balance Update:**

```java
clientToDeposit.setAccountBalance(clientToDeposit.getAccountBalance() + depositValue);
```

**Rollback on Cancellation:**

```java
clientToDeposit.setAccountBalance(oldClientData.getAccountBalance());
```

---

### 6.3 Withdrawal Operation

**Inner Class:** `BankTransactionsSystem.Withdraw`

**Workflow:**

1. Show withdraw screen
2. Display client list
3. Prompt for source account number
4. Locate client
5. Validate non-zero balance
6. Display client card
7. Confirm withdrawal intent
8. Enter withdrawal amount (validated: `1` to `currentBalance`)
9. Show before/after balance comparison
10. Confirm transaction
11. On confirmation: update balance and persist to file
12. On rejection: rollback balance

**Balance Constraint:**

```java
withdrawValue = -InputHelper.getValidNumber(1, clientToWithdraw.getAccountBalance(), ...);
clientToWithdraw.setAccountBalance(clientToWithdraw.getAccountBalance() + withdrawValue);
```

The withdrawal amount is negated before addition to ensure a subtraction operation. The valid range enforces that the user cannot withdraw more than the available balance.

**Zero-Balance Guard:**

```java
if (clientToWithdraw.getAccountBalance() == 0) {
    System.out.println("\nClient with Account Number (" + accountToWithdraw + ") has no balance!");
}
```

---

### 6.4 Total Balances

**Inner Class:** `BankTransactionsSystem.TotalBalances`

**Workflow:**

1. Reload all clients from file
2. Display formatted balance table (Account Number, Name, Balance)
3. Calculate and display system-wide total

**Balance Table Format:**

```
| Account Number   | Client Name                            | Balance   |
--------------------------------------------------------------------------------
| A1001            | Abdulrahman                            | 5000.00   |
| A1002            | Mohammed                                | 3200.50   |
--------------------------------------------------------------------------------
Total Balances = 8200.50
```

**Aggregation:**

```java
public double calculateTotalBalances(Vector<Client> clientInformations) {
    double total = 0.0;
    for (Client client : clientInformations) {
        total += client.getAccountBalance();
    }
    return total;
}
```

---

## 7. User Interface Layer

### 7.1 BankSystemScreen

**File:** `s/banksystem/BankSystemScreen.java`

The central menu controller managing two hierarchical menu levels.

**Menu Architecture:**

```
Main Menu
├── [1] Show Client List       → ClientsManager.Display.printClients()
├── [2] Add New Client         → ClientsManager.Read.readVectorOfClients()
├── [3] Delete Client          → ClientsManager.Delete.deleteClientsByAccountNumber()
├── [4] Update Client          → ClientsManager.Update.updateClientsByAccountNumber()
├── [5] Find Client            → ClientsManager.Search.searchForClientsByAccountNumber()
├── [6] Transactions           → Transactions Sub-Menu
│   ├── [1] Deposit            → BankTransactionsSystem.Deposit.depositToClients()
│   ├── [2] Withdraw           → BankTransactionsSystem.Withdraw.withdrawClients()
│   ├── [3] Total Balance      → BankTransactionsSystem.TotalBalances.clientTotalBalances()
│   └── [4] Main Menu          → Return to Main Menu
└── [7] Exit                   → Confirmation → Terminate
```

**Navigation Enums:**

```java
public enum MainMenuOptions {
    Show, Add, Delete, Update, Find, Transactions, Exit
}

public enum TransactionsMenuOptions {
    Deposit, Withdraw, TotalBalance, MainMenu
}
```

**Menu Loop Pattern:**

```java
boolean[] wantToExit = {false};
do {
    showMainMenu();
    MainMenuOptions option = getMainMenuOption();
    implementMainMenuOptions(clients, wantToExit, option);
} while (!wantToExit[0]);
```

The exit flag uses a single-element boolean array to allow pass-by-reference semantics for controlling loop termination from within the switch-case handler.

**Navigation Flow:**

- Each operation completes → `goBackToMainMenu()` → clear console → "Press any key" prompt → return to loop
- Exit operations require confirmation via `InputHelper.yesNo()`

---

## 8. Input/Output Utility Framework

### 8.1 InputHelper

**File:** `s/banksystem/HelperClasses/InputHelper.java`

Provides validated, range-checked console input methods.

**Core Input Methods:**

| Method | Input Type | Validation |
|--------|-----------|------------|
| `readDouble(message)` | `double` | Rejects non-numeric input |
| `readString(message)` | `String` | Single-line read |
| `readStringWhiteSpaces(message)` | `String` | Handles spaces; consumes leftover newline |
| `readValidChar(message)` | `char` | Exactly one character |
| `getValidNumber(from, to, message)` | `double` | Range: `[from, to]` |
| `getValidChar(from, to, message, checkAlphabetOnly)` | `char` | Range + optional letter check |
| `getValidLong(from, to, message)` | `long` | Whole number within range |
| `yesNo(message)` | `boolean` | Accepts `0` (No) or `1` (Yes) |

**Input Validation Chain:**

```
Raw input → Type check → Range check → Return validated value
                                    ↓ (on failure)
                              Error message → Retry loop
```

**Newline Handling:**

```java
public static String readStringWhiteSpaces(String message) {
    System.out.print(message);
    scanner.nextLine(); // consume leftover newline from previous input
    return scanner.nextLine();
}
```

This pattern addresses the common Java `Scanner` issue where `nextLine()` reads an empty string after `nextDouble()` or `next()`.

---

### 8.2 OutputHelper

**File:** `s/banksystem/HelperClasses/OutputHelper.java`

Provides console formatting and display utilities.

**Formatting Methods:**

| Method | Character | Example Output |
|--------|-----------|----------------|
| `printBorder(n)` | `=` | `==================================================` |
| `printBar(n)` | `-` | `--------------------------------------------------` |
| `printStar(n)` | `*` | `**************************************************` |
| `printSideBar(n)` | `\|` | `\|\|\|\|` |
| `printUnderScore(n)` | `_` | `____________________` |

**Display Methods:**

| Method | Purpose |
|--------|---------|
| `printVariable(variable, message)` | Generic labeled output (`<message><variable>`) |
| `printTextInBorder(message, n)` | Message enclosed in `=` borders |
| `printTextInBar(message, n)` | Message enclosed in `-` bars |
| `pressAnyKeyToContinue()` | Blocking pause with `Scanner.nextLine()` |
| `clearConsole()` | ANSI escape sequence `\033[H\033[2J` |

**Generic Print:**

```java
public static <T> void printVariable(T variable, String message) {
    System.out.println(message + variable);
}
```

Uses Java generics to handle any type (`String`, `double`, etc.) with a single method.

---

### 8.3 FileUtils

**File:** `s/banksystem/HelperClasses/FileUtils.java`

Generic file I/O utilities (not client-specific).

| Method | Purpose |
|--------|---------|
| `loadDataFileToVector(fileName, vFileContent)` | Read all lines from file into `Vector<String>` |
| `replaceFileContentWithVectorData(fileName, vFileContent)` | Overwrite file with vector contents |
| `splitString(text, delimiter)` | Split string by delimiter, filtering empty parts |

**Pattern:** Uses `Pattern.quote(delimiter)` for safe delimiter matching, preventing regex interpretation of special characters.

---

## 9. Application Entry Point & Lifecycle

### 9.1 BankSystem.java

**File:** `s/banksystem/BankSystem.java`

```java
public class BankSystem {
    public static void main(String[] args) {
        BankSystemScreen MyBankSystem = new BankSystemScreen();
    }
}
```

**Startup Sequence:**

1. `main()` instantiates `BankSystemScreen`
2. Constructor loads all clients from `Clients.txt` into `Vector<Client>`
3. Main menu loop begins
4. User navigates menus → operations execute → data persists to file
5. User selects Exit → confirmation → program terminates

**Data Flow:**

```
Clients.txt → Vector<Client> (in-memory) → User Operations → Vector<Client> → Clients.txt
```

The system maintains a synchronized state between the in-memory vector and the persisted file. After every mutation (add, update, delete, deposit, withdraw), the file is rewritten and the vector is reloaded.

---

## 10. Design Decisions & Rationale

### 10.1 Why `Vector` Instead of `ArrayList`?

The system uses `java.util.Vector` throughout. While `ArrayList` is generally preferred for single-threaded applications, `Vector` provides synchronized methods which may have been chosen for thread-safety or as part of the original exercise requirements.

### 10.2 Why File-Based Persistence Instead of a Database?

The flat-file approach (`Clients.txt`) eliminates external dependencies, making the system self-contained and portable. The `#//#` delimiter was chosen to avoid conflicts with typical name/phone/account data.

### 10.3 Soft-Delete Pattern

Rather than removing entries from the `Vector` (which would require index management), the system flags clients with `deletedClientMark = true` and filters them during file writes. This keeps the in-memory state consistent during the current session.

### 10.4 Nested Inner Classes for Organizational Clarity

`ClientsManager` uses inner classes (`Read`, `Display`, `Search`, `Delete`, `Update`) to group related operations. `BankTransactionsSystem` uses inner classes (`Deposit`, `Withdraw`, `TotalBalances`) similarly. This provides namespace isolation while maintaining access to the parent class's constants and shared state.

### 10.5 Confirmation Workflows

Every destructive or financial operation requires explicit user confirmation via `InputHelper.yesNo()`. This includes:
- Client deletion
- Deposit/withdrawal amount confirmation
- Update confirmation
- Changes discard/keep decisions
- System exit

### 10.6 Rollback Support in Transactions

Both deposit and withdrawal operations save the original state before modification:

```java
Client oldClientData = new Client(
    clientToDeposit.getName(),
    clientToDeposit.getPhoneNumber(),
    clientToDeposit.getAccountNumber(),
    clientToDeposit.getPinCode(),
    clientToDeposit.getAccountBalance()
);
```

If the user cancels, the original balance is restored, ensuring atomicity of the transaction from the user's perspective.

---

## Appendix: File Record Format Reference

| Field | Position | Type | Example |
|-------|----------|------|---------|
| Name | 0 | String | `Abdulrahman` |
| Phone Number | 1 | String | `0551234567` |
| Account Number | 2 | String | `A1001` |
| PIN Code | 3 | String | `1234` |
| Account Balance | 4 | double | `5000.0` |

**Full Record:**

```
Abdulrahman#//#0551234567#//#A1001#//#1234#//#5000.0
```

---

*This manual is derived exclusively from the source code and exercise specification within the BankSystem project.*
