# SmartCity — Master Reference Manual

> **Author:** Abdulrahman  
> **Version:** 1.0-SNAPSHOT  
> **Java:** 24 (Maven)  
> **Build Artifact:** `com.mycompany:SmartCity:1.0-SNAPSHOT`  
> **Entry Point:** `com.mycompany.smartcity.SmartCity.main(String[])`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Design Philosophy](#2-architecture--design-philosophy)
3. [Class Hierarchy — UML Reference](#3-class-hierarchy--uml-reference)
4. [Package Reference](#4-package-reference)
   - 4.1 [model](#41-model-package)
   - 4.2 [auth](#42-auth-package)
   - 4.3 [security](#43-security-package)
   - 4.4 [storage](#44-storage-package)
   - 4.5 [job](#45-job-package)
   - 4.6 [robot](#46-robot-package)
   - 4.7 [task](#47-task-package)
   - 4.8 [event](#48-event-package)
   - 4.9 [ui](#49-ui-package)
   - 4.10 [manager](#410-manager-package)
   - 4.11 [search](#411-search-package)
   - 4.12 [session](#412-session-package)
   - 4.13 [system](#413-system-package)
   - 4.14 [audit](#414-audit-package)
   - 4.15 [tools](#415-tools-package)
   - 4.16 [config](#416-config-package)
   - 4.17 [logs](#417-logs-package)
   - 4.18 [Interface](#418-interface-package)
5. [Design Patterns Catalog](#5-design-patterns-catalog)
6. [Data Persistence Architecture](#6-data-persistence-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Application Lifecycle](#8-application-lifecycle)

---

## 1. Project Overview

SmartCity is a comprehensive Java-based smart city management system that orchestrates robot fleets, job scheduling, citizen service requests, user authentication, and real-time system health monitoring through a console-based interface. The system models a complete urban operations platform where administrators, employees, and citizens interact with autonomous robots to deliver city services.

### Core Capabilities

| Domain | Description |
|--------|-------------|
| **Robot Fleet Management** | Four specialized robot types (AI-Powered, Guardian, Service, Innovative) with lifecycle tracking, task execution, and energy management |
| **Job Orchestration** | End-to-end job lifecycle from request through assignment, execution, and history with template-based job creation |
| **Citizen Services** | Robot request submission, service feedback, and request tracking for citizens |
| **Authentication & Authorization** | Role-based access control (RBAC) with 4 roles, 26 permissions, and session management |
| **Encrypted Persistence** | AES-256-GCM encrypted file storage with serialized entity repositories |
| **System Health Monitoring** | CPU, memory, disk, thread monitoring with snapshot-based health validation |
| **Audit Trail** | Timeline-based event recording with filtering, statistics, and report generation |
| **Event-Driven Architecture** | Publish/subscribe event bus for decoupled inter-module communication |

---

## 2. Architecture & Design Philosophy

### Layered Architecture

```
┌──────────────────────────────────────────────────┐
│                  UI Layer                         │
│   LoginUI → SystemConsoleUI → AdminUI            │
│              EmployeeUI → ClientUI               │
│              RobotConsoleUI                      │
│              RobotManagerConsoleUI               │
│              JobManagerConsoleUI                 │
├──────────────────────────────────────────────────┤
│               Manager Layer                       │
│   AdminManager | EmployeeManager | JobManager    │
│   RobotManager | ReportManager | SystemManager   │
│   SessionManager | RobotTaskManager              │
│   RobotRequestManager | SessionManager           │
├──────────────────────────────────────────────────┤
│               Service Layer                       │
│   AuthServices | SmartSearch | UndoManager       │
│   EventBus | LogAggregator | TimelineRecorder    │
├──────────────────────────────────────────────────┤
│               Model Layer                         │
│   User | Robot | Job | Report | TaskRecord       │
│   RobotRequest | Department | Credentials        │
├──────────────────────────────────────────────────┤
│             Persistence Layer                     │
│   EncryptedStorage → AesEncryption               │
│   StorageManager | EncryptedEntityStorage        │
│   StorageRegistry (static registry)              │
├──────────────────────────────────────────────────┤
│              Security Layer                       │
│   AesEncryption | PasswordHasher | TokenGenerator│
│   SessionKeyManager | SecurityManager            │
│   FileIntegrityChecker | JobAccessPolicy         │
├──────────────────────────────────────────────────┤
│             System Layer                          │
│   SystemHealthChecker | CpuMonitor               │
│   DiskUsageChecker | ThreadMonitor               │
│   SystemSnapshot | SystemValidator               │
└──────────────────────────────────────────────────┘
```

### Key Design Principles

- **Encrypted-First Persistence:** All sensitive data (users, robots, jobs, requests) is stored in AES-256-GCM encrypted files.
- **Immutable Value Objects:** Domain entities like `TaskRecord`, `Report`, `Credentials`, and `SystemSnapshot` are immutable.
- **Static Service Layer:** Most managers and utilities are stateless static classes, enabling simple invocation without DI frameworks.
- **Role-Based Access Control:** 26 fine-grained permissions mapped to 4 roles via static configuration with runtime mutability.
- **Audit Trail:** Every significant action is recorded to a timeline sink for post-hoc analysis.
- **Undo Support:** UI operations register undo callbacks via `UndoManager` for reversible actions.

---

## 3. Class Hierarchy — UML Reference

```
+---------------------+        <<entry point>>
|     SmartCity       |
+---------------------+
| +main(String[])     |
+---------------------+
        |
        | uses
        v
+---------------------+        uses         +---------------------+
|  StorageRegistry    |-------------------> | EncryptedStorage    |
+---------------------+                     +---------------------+
| +userStorage        |                     | +write(), +read()   |
| +employeeStorage    |                     +---------------------+
| +reportStorage      |
| +robotStorage       |
| +jobStorage         |
+---------------------+

+---------------------+        uses         +---------------------+
|  AesEncryption      |<--------------------| EncryptedStorage    |
+---------------------+                     +---------------------+
| +encrypt(), +decrypt()                   |
+---------------------+

+---------------------+        uses         +---------------------+
|  PasswordHasher     |-------------------> | AesEncryption       |
+---------------------+                     +---------------------+

+---------------------+        implements   +---------------------+
|     AdminUser       |-------------------> |       User          |
|     ClientUser      |                    +---------------------+
|     EmployeeUser    |                    | +getId(), +getUsername() |
+---------------------+                    +---------------------+

+---------------------+        manages      +---------------------+
|   AdminManager      |-------------------> |   AdminUser         |
|   EmployeeManager   |                    |   EmployeeUser      |
|   JobManager        |                    |   Job               |
|   RobotManager      |                    |   Robot             |
|   ReportManager     |                    |   Report            |
+---------------------+                    +---------------------+

+---------------------+        models       +---------------------+
|   Department        |<--------------------| Employee            |
|   ServiceRequest    |<--------------------| CitizenUser         |
|   Report            |<--------------------| TaskRecord          |
|   Robot             |<--------------------| SmartRobot, GuardianRobot, ... |
+---------------------+                     +---------------------+

+---------------------+        implements   +---------------------+
|   Printable         |<--------------------| Report, User, Robot |
|   Schedulable       |<--------------------| Job, TaskRecord     |
|   Trackable         |<--------------------| Robot, Job          |
+---------------------+                     +---------------------+
```

---

## 4. Package Reference

### 4.1 `model` Package

The foundation layer defining all domain entities, value objects, and base abstractions.

#### Interfaces

| Interface | Method(s) | Purpose |
|-----------|-----------|---------|
| `Identifiable` | `String getId()` | Contract for entities carrying a unique string identifier |
| `Timestamped` | `LocalDateTime getCreatedAt()`, `LocalDateTime getUpdatedAt()` | Mixin interface for time-tracking capability |

#### `BaseEntity` — Abstract Foundation

```java
public abstract class BaseEntity implements Identifiable, Timestamped
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Unique identifier |
| `createdAt` | `LocalDateTime` | Auto-stamped at construction |
| `updatedAt` | `LocalDateTime` | Updated on mutations |

All domain entities (`User`, `Robot`, etc.) extend this base class, inheriting identity and timestamp behavior.

#### `Status` — Enum

| Constant | Meaning |
|----------|---------|
| `AVAILABLE` | Robot is idle and ready for task assignment |
| `BUSY` | Robot is currently executing a task |
| `OFFLINE` | Robot is inactive or shut down |

#### `User` — Abstract Domain Entity

```java
public abstract class User extends BaseEntity
```

| Field | Type | Description |
|-------|------|-------------|
| `username` | `String` | Display name |
| `role` | `Role` | Authorization role (ADMIN, EMPLOYEE, CLIENT, ROBOT_MANAGER) |

#### `Robot` — Abstract Domain Entity

```java
public abstract class Robot extends BaseEntity
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Human-readable name |
| `serialNumber` | `String` | Unique serial identifier |
| `status` | `Status` | Current operational state |
| `taskHistory` | `List<TaskRecord>` | Accumulated task execution log |

Abstract method: `String getType()` — each concrete robot subclass returns its specific type name.

#### `BasicRobot`

```java
public class BasicRobot extends Robot
```

Concrete robot accepting a string status parameter (converted via `Status.valueOf()`). Returns `"BasicRobot"` from `getType()`.

#### `Report` — Immutable Value Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Caller-supplied identifier |
| `title` | `String` | Report headline |
| `content` | `String` | Body text |
| `createdAt` | `LocalDateTime` | Auto-stamped at construction |

#### `TaskRecord` — Immutable Execution Record

| Field | Type | Description |
|-------|------|-------------|
| `taskName` | `String` | Descriptive label |
| `success` | `boolean` | Completion outcome |
| `notes` | `String` | Free-text observation |
| `timestamp` | `LocalDateTime` | Auto-stamped |

Methods: `getTaskName()`, `isSuccess()`, `wasSuccessful()` (semantic alias), `getNotes()`, `getTimestamp()`, `toString()`, `equals()`, `hashCode()`.

#### `RobotRequest` — Mutable Request Entity

Represents a citizen's request for robot service. Supports pipe-delimited serialization for encrypted storage.

| Field | Type | Description |
|-------|------|-------------|
| `requestId` | `String` | Unique identifier |
| `clientId` | `String` | Requesting citizen's ID |
| `robotSerial` | `String` | Target robot serial number |
| `details` | `String` | Service description |
| `handled` | `boolean` | Whether the request has been processed |
| `requestedAt` | `LocalDateTime` | Submission timestamp |

Methods: `serialize()` / `deserialize(String)` for storage, full getter/setter suite, `toString()`.

#### `Department`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Department identifier |
| `name` | `String` | Department name |
| `description` | `String` | Purpose statement |

#### `ContactInfo`

| Field | Type | Description |
|-------|------|-------------|
| `email` | `String` | Email address |
| `phone` | `String` | Phone number |
| `address` | `String` | Physical address |

#### `EnergyProfile`

| Field | Type | Description |
|-------|------|-------------|
| `energyLevel` | `double` | Current energy (0–100) |
| `maxCapacity` | `double` | Maximum energy capacity |
| `consumptionRate` | `double` | Energy cost per task |

#### `ActionLog`

| Field | Type | Description |
|-------|------|-------------|
| `actionId` | `String` | Unique action identifier |
| `userId` | `String` | Actor's identifier |
| `action` | `String` | Action description |
| `timestamp` | `LocalDateTime` | When the action occurred |

#### `AuditMetadata`

| Field | Type | Description |
|-------|------|-------------|
| `lastModifiedBy` | `String` | Who made the last change |
| `lastModifiedAt` | `LocalDateTime` | When the last change occurred |
| `version` | `int` | Monotonic version counter |

#### `PermissionSet`

| Field | Type | Description |
|-------|------|-------------|
| `permissions` | `Set<String>` | Collection of permission strings |

Methods: `add(String)`, `remove(String)`, `has(String)`, `getAll()`.

---

### 4.2 `auth` Package

Complete authentication, authorization, and session management subsystem with 19 classes.

#### User Hierarchy

```
Object
  └── BaseEntity
       └── User (abstract)
            ├── AdminUser     — systemArea, passwordHash, saltBase64
            ├── ClientUser    — email, phone
            ├── EmployeeUser  — department, position
            └── LocalUser     — hashedPassword, salt (byte[])
```

| Subclass | Role | Extra Fields |
|----------|------|--------------|
| `AdminUser` | `ADMIN` (hardcoded) | `systemArea`, `passwordHash`, `saltBase64` |
| `ClientUser` | `CLIENT` (hardcoded) | `email`, `phone` |
| `EmployeeUser` | `EMPLOYEE` (hardcoded) | `department`, `position` |
| `LocalUser` | Any (parameterized) | `hashedPassword`, `salt` (byte[]) |

#### RBAC Enums

**`Role`** — Type-safe enum with parsing utilities:

| Constant | Purpose |
|----------|---------|
| `ADMIN` | System administrator with full access |
| `EMPLOYEE` | City employee (robot operator, technician) |
| `CLIENT` | End-user / citizen |
| `ROBOT_MANAGER` | Robot fleet manager |

Static methods: `isValid(String)`, `fromString(String)`.

**`Permission`** — 26 constants with self-documenting descriptions:

| Domain | Permissions |
|--------|-------------|
| Robot Operations | `EXECUTE_TASK`, `RECHARGE`, `SHUTDOWN`, `REQUEST_TASK` |
| User Management | `VIEW_USERS`, `EDIT_USERS`, `DELETE_USERS`, `MANAGE_USERS` |
| System Control | `CONFIGURE_SYSTEM`, `RUN_DIAGNOSTICS`, `MANAGE_BACKUPS` |
| Analytics & Logs | `VIEW_LOGS`, `VIEW_SESSION_HISTORY`, `ACCESS_ANALYTICS` |
| Personal Access | `VIEW_MY_PROFILE`, `VIEW_MY_HISTORY`, `VIEW_ASSIGNED_JOBS`, `VIEW_MY_REQUESTS` |
| Task Management | `SUBMIT_REQUEST`, `ASSIGN_TASK`, `VIEW_TASKS`, `UPDATE_ROBOT_STATUS`, `VIEW_PENDING_REQUESTS`, `ADD_ROBOT`, `VIEW_ROBOTS`, `VIEW_ROBOT_HISTORY` |
| System Inspection | `VIEW_PERMISSIONS` |
| Job Execution | `EXECUTE_JOB` |
| Feedback | `SUBMIT_FEEDBACK` |

#### Role-Permission Mapping

**`RolePermissionMap`** — Static immutable RBAC policy:

| Role | Permissions | Count |
|------|-------------|-------|
| `ADMIN` | VIEW_USERS, EDIT_USERS, DELETE_USERS, VIEW_LOGS, RUN_DIAGNOSTICS, VIEW_PERMISSIONS, MANAGE_BACKUPS, VIEW_SESSION_HISTORY, MANAGE_USERS, CONFIGURE_SYSTEM, ACCESS_ANALYTICS | 11 |
| `EMPLOYEE` | VIEW_MY_PROFILE, VIEW_ASSIGNED_JOBS, EXECUTE_JOB, VIEW_MY_HISTORY, SUBMIT_FEEDBACK, EXECUTE_TASK, RECHARGE, VIEW_LOGS | 8 |
| `CLIENT` | VIEW_MY_PROFILE, SUBMIT_REQUEST, VIEW_MY_REQUESTS, VIEW_MY_HISTORY, SUBMIT_FEEDBACK, REQUEST_TASK | 6 |
| `ROBOT_MANAGER` | VIEW_ROBOTS, ADD_ROBOT, UPDATE_ROBOT_STATUS, VIEW_PENDING_REQUESTS, ASSIGN_TASK, VIEW_TASKS, VIEW_ROBOT_HISTORY, SUBMIT_FEEDBACK, EXECUTE_TASK, SHUTDOWN, RECHARGE, ACCESS_ANALYTICS | 12 |

**`PermissionManager`** — Runtime-extensible wrapper:

| Method | Description |
|--------|-------------|
| `addPermission(Role, Permission)` | Grants an additional permission at runtime |
| `removePermission(Role, Permission)` | Revokes a permission at runtime |
| `hasPermission(Role, Permission)` | Checks the dynamic permission set |
| `getRolesWithPermission(Permission)` | Reverse-lookup: which roles hold a given permission |
| `getPermissions(Role)` | Returns the full mutable set for a role |

**`PermissionSelector`** — Static RBAC facade:

| Method | Description |
|--------|-------------|
| `hasPermission(Permission)` | Checks current session user's permission |
| `hasPermission(String)` | String-to-enum overload |
| `require(Permission)` | Throws `SecurityException` if permission denied |
| `require(String)` | String overload of require |
| `displayMyPermissions()` | Prints current user's permissions |
| `getPermissionsForRole(Role)` | Delegates to `RolePermissionMap` |
| `getAllPermissions()` | Returns all 26 enum values |
| `getPermissionDescriptions(Role)` | Maps permissions to descriptions |
| `filterPermissionsByPrefix(String)` | Filters by name prefix |
| `groupPermissionsByDomain()` | Groups by domain prefix (before first `_`) |

#### Authentication Infrastructure

**`Credentials`** — Immutable value object with defensive validation:

```java
public class Credentials {
    private final String username;
    private final String password;
    // Constructor rejects null/blank via isBlank()
    // toString() masks password as ********
}
```

**`AuthException`** — Unchecked exception extending `RuntimeException`.

**`Authenticator` (auth package)** — Static authentication service:

| Method | Description |
|--------|-------------|
| `authenticate(String username, String password)` | Iterates user storage, verifies password hash, returns `LocalUser` or null |
| `isAdmin(User)` | Null-safe role check |

**`Authenticator` (security package interface):**

```java
public interface Authenticator {
    User authenticate(Credentials credentials) throws AuthException;
}
```

**`BasicAuthenticator`** — Stub implementation of `security.Authenticator` (always rejects; placeholder for real implementation).

**`AuthServices`** — Facade for login/logout lifecycle:

| Method | Description |
|--------|-------------|
| `login(Credentials)` | Authenticates, creates 30-minute TTL session, stores in `SessionContext` |
| `logout()` | Clears current session and `SessionContext` |
| `isLoggedIn()` | Checks session existence and expiry |
| `getCurrentUser()` | Returns user from session if logged in |

**`AuthManager`** — Audit-aware session manager:

| Method | Description |
|--------|-------------|
| `login(String username, String password)` | Records LOGIN event to timeline sink |
| `isSessionValid(String username)` | Checks expiry against configurable timeout; records SESSION_EXPIRED |
| `logout(String username)` | Removes session, records LOGOUT event |
| `printActiveSessions()` | Displays all active sessions |

Fields: `timeoutSeconds` (int), `activeSessions` (Map<String, Instant>), `sink` (TimelineSink).

#### Session Management

**`Session`** — Immutable TTL session:

| Field | Type | Description |
|-------|------|-------------|
| `user` | `User` | Authenticated user |
| `createdAt` | `long` | Epoch millis at creation |
| `expiresAt` | `long` | Epoch millis when session expires |

Methods: `isExpired()`, `getRemainingTimeMillis()`.

**`SessionContext`** — Static global session holder:

| Method | Description |
|--------|-------------|
| `setCurrentSession(Session)` | Stores the session |
| `getCurrentSession()` | Retrieves it |
| `clear()` | Nulls out (logout) |
| `isAuthenticated()` | True if session exists and not expired |
| `getCurrentUser()` | Extracts user from session |
| `getCurrentRole()` | Extracts role from session |
| `getUsername()` | Returns username or "Unknown" |

**`SessionValidator`** — Guard utility:

| Method | Description |
|--------|-------------|
| `isValid(Session)` | Null-safe expiry check |
| `requireValid(Session)` | Throws `AuthException` if null or expired |
| `requireLoggedIn()` | Convenience: fetches from `SessionContext` and validates |

---

### 4.3 `security` Package

Cryptographic primitives, token management, and access control policies.

#### `AesEncryption` — AES-256-GCM Engine

The most substantial security class. Implements authenticated encryption with associated data.

| Constant | Value | Purpose |
|----------|-------|---------|
| `ALGO` | `"AES"` | Algorithm identifier |
| `TRANSFORMATION` | `"AES/GCM/NoPadding"` | GCM mode for authenticated encryption |
| `GCM_TAG_LENGTH` | `128` bits | Authentication tag size |
| `IV_LENGTH` | `12` bytes | Initialization vector size |

| Constructor | Description |
|-------------|-------------|
| `AesEncryption(String secret)` | Derives 256-bit key from passphrase via SHA-256 |
| `AesEncryption(byte[] rawKey)` | Accepts raw key material (16/24/32 bytes) |

| Method | Description |
|--------|-------------|
| `encrypt(byte[] plaintext)` | Generates random IV, encrypts with GCM, prepends IV to ciphertext |
| `decrypt(byte[] ivPlusCipher)` | Splits IV from ciphertext, decrypts |
| `generateNew()` | Factory: tries 256-bit keygen, falls back to 128-bit |
| `getKey()` | Returns underlying `SecretKey` |

Output format: `[12-byte IV] + [ciphertext + GCM tag]`.

#### `PasswordHasher` — Salted SHA-256 Hashing

| Method | Description |
|--------|-------------|
| `hash(String password, byte[] salt)` | SHA-256 with prepended salt, returns lowercase hex |
| `generateSalt()` | 16 random bytes via `SecureRandom` |
| `verify(String password, String storedHash, byte[] salt)` | Recomputes hash and compares |

#### `Credential` — Password Value Object

| Field | Type | Description |
|-------|------|-------------|
| `hashedPassword` | `String` | SHA-256 hash of password |
| `salt` | `byte[]` | Cryptographic salt |

Methods: `verify(String inputPassword)`, `getHashedPassword()`, `getSalt()`.

#### `TokenGenerator` — Cryptographic Token Factory

| Method | Description |
|--------|-------------|
| `generateToken(int length)` | Fills byte array, encodes as Base64 URL-safe (no padding) |
| `generateDefaultToken()` | 32 bytes (256 bits of entropy) |

Uses `SecureRandom` for cryptographically strong randomness.

#### `SessionKeyManager` — Session Lifecycle

| Field | Type | Description |
|-------|------|-------------|
| `sessionKey` | `String` | 256-bit token |
| `createdAt` | `LocalDateTime` | Creation timestamp |
| `expiresAt` | `LocalDateTime` | Expiry (+2 hours) |

| Method | Description |
|--------|-------------|
| `regenerate()` | Generates new token with 2-hour TTL |
| `isValid()` | Checks current time against expiry |

#### `SecurityManager` — Role-Based Access Registry

Static `HashMap<String, Role>` mapping user IDs to roles.

| Method | Description |
|--------|-------------|
| `registerUser(userId, role)` | Maps user to role |
| `getRole(userId)` | Looks up role; falls back to `Role.SYSTEM` |
| `canAssign(userId)` | True for ADMIN or SUPERVISOR |
| `canExecute(userId)` | True for EMPLOYEE, SUPERVISOR, or ADMIN |

#### `JobAccessPolicy` — Cross-Package Authorization

| Method | Description |
|--------|-------------|
| `canModify(Job, userId)` | True if job's assignedTo equals userId |
| `canView(Job, userId)` | True for ADMIN, SUPERVISOR, or canModify |

#### `FileIntegrityChecker` — SHA-256 File Hashing

| Method | Description |
|--------|-------------|
| `computeSHA256(File file)` | Reads in 4096-byte chunks, returns hex-formatted SHA-256 hash |

Uses try-with-resources for stream safety. Wraps failures in `RuntimeException`.

---

### 4.4 `storage` Package

Encrypted persistence layer with 6 classes providing a complete entity storage framework.

#### Storage Architecture

```
StorageRegistry (static registry)
    ├── userStorage      → EncryptedEntityStorage<User>       → storage/secure/users.txt
    ├── robotStorage     → EncryptedEntityStorage<Robot>      → storage/secure/robots.txt
    ├── jobStorage       → EncryptedEntityStorage<Job>        → storage/secure/jobs.txt
    └── robotRequestStorage → EncryptedEntityStorage<RobotRequest> → storage/secure/robot_requests.txt

EncryptedEntityStorage<T>
    └── StorageManager
         └── EncryptedStorage
              └── AesEncryption (AES-256-GCM)
```

#### `EncryptedStorage` — Low-Level Encrypted File I/O

| Method | Description |
|--------|-------------|
| `write(String plaintext)` | Encrypts and writes to disk; ensures parent dirs exist |
| `read()` | Reads and decrypts; returns null if file absent |
| `delete()` | Removes backing file |
| `exists()` | Checks file existence |
| `asFile()` / `getPath()` | Accessors |

#### `StorageManager` — Checked-Exception Shield

| Method | Description |
|--------|-------------|
| `loadOrInitialize(Supplier<String>)` | Reads if present; otherwise invokes supplier, writes, returns |
| `save(String)` | Writes with IOException → RuntimeException translation |
| `load()` | Reads encrypted content |
| `delete()` | Removes file |
| `readAll()` | Splits content by line breaks, filters blanks |
| `writeAll(List<String>)` | Joins with system line separator, writes |

#### `EncryptedEntityStorage<T>` — Generic Repository

| Method | Description |
|--------|-------------|
| `saveAll(List<T>)` | Serializes every element, joins with newlines, persists |
| `loadAll()` | Reads, deserializes each line, filters nulls |
| `save(T)` | Loads full list, appends, persists entire collection |

Constructor injects serializer/deserializer functions: `Function<T, String>` and `Function<String, T>`.

#### `StorageRegistry` — Static Entity Registry

All fields are `public static`:

| Field | Type | Backing File |
|-------|------|--------------|
| `userStorage` | `EncryptedEntityStorage<User>` | `storage/secure/users.txt` |
| `robotStorage` | `EncryptedEntityStorage<Robot>` | `storage/secure/robots.txt` |
| `jobStorage` | `EncryptedEntityStorage<Job>` | `storage/secure/jobs.txt` |
| `robotRequestStorage` | `EncryptedEntityStorage<RobotRequest>` | `storage/secure/robot_requests.txt` |

#### `ReportStorage` — Report Persistence

Provides `saveReport(Report)` and `loadReports()` methods for report entities, using the encrypted storage layer.

#### `ReportFormatter` — Report Rendering

Formats `Report` objects as human-readable text output for console display.

---

### 4.5 `job` Package

Complete job lifecycle management with 10 classes across 4 subdirectories.

#### Core Entities

**`Job`** — Primary domain entity (139 lines):

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Auto-generated UUID |
| `title` | `String` | Job title |
| `description` | `String` | Detailed description |
| `type` | `JobType` | Category of job |
| `priority` | `JobPriority` | Urgency level |
| `status` | `JobStatus` | Current lifecycle state |
| `assignedTo` | `String` | Assignee's user ID |
| `createdAt` | `Instant` | Creation timestamp |
| `assignedAt` | `Instant` | Assignment timestamp |
| `executedAt` | `Instant` | Execution timestamp |

State transitions:

```
PENDING → ASSIGNED → IN_PROGRESS → EXECUTED
                                     ↓
                                  FAILED
PENDING → CANCELLED
```

| Method | Description |
|--------|-------------|
| `assignTo(assigneeId)` | Sets ASSIGNED status |
| `markInProgress()` | Sets IN_PROGRESS |
| `markExecuted()` | Sets EXECUTED with timestamp |
| `markFailed()` | Sets FAILED |
| `cancel()` | Sets CANCELLED |
| `setCompleted(boolean)` | Bridges to markExecuted or resets |
| `isCompleted()` | Checks `status == EXECUTED` |

#### Enums

**`JobType`**: `MAINTENANCE`, `DELIVERY`, `INSPECTION`, `CLEANING`, `CUSTOM`

**`JobPriority`**: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

**`JobStatus`**: `PENDING`, `ASSIGNED`, `IN_PROGRESS`, `EXECUTED`, `FAILED`, `CANCELLED`

#### Supporting Entities

**`JobTag`** — Normalized tag (trimmed, lowercased in constructor). `toString()` returns `"#name"`.

**`JobTemplate`** — Reusable job blueprint with `toJob()` factory method.

**`JobAssignment`** — Immutable record of assignment (jobId, assigneeId, assignedAt).

**`JobResult`** — Execution outcome (jobId, success boolean, output string, completedAt).

**`JobHistory`** — Append-only list of `HistoryEntry` records (timestamp, status, actor, note).

**`JobRequest`** — Citizen-initiated job request (requesterId, type, details, requestedAt).

**`JobValidator`** — Static validation methods for job requests (type, priority, details, requester).

---

### 4.6 `robot` Package

Specialized robot hierarchy with 5 classes.

#### `SmartRobot` — Abstract Base

```java
public abstract class SmartRobot extends Robot
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | `Status` | Current operational state |
| `taskHistory` | `List<TaskRecord>` | All executed tasks |
| `auditMetadata` | `AuditMetadata` | Change tracking |
| `energyLevel` | `double` | Battery level (0–100) |

| Method | Description |
|--------|-------------|
| `updateStatus(Status, modifier)` | Changes status, logs who did it |
| `executeTask(taskName, success, notes, modifier)` | Logs task, deducts 5 energy, records audit |
| `recharge(amount, modifier)` | Adds energy (max 100), records audit |
| `toJobResult(jobId)` | Wraps state into `JobResult` |

#### Concrete Robot Types

Each subclass extends `SmartRobot` with domain-specific methods that delegate to `executeTask()`:

**`AIPoweredRobot`** — Data analysis and AI operations:

| Method | Description |
|--------|-------------|
| `analyzeData(datasetName, modifier)` | Executes analysis task |
| `generateReport(reportTitle, modifier)` | Generates report |
| `optimizeSystem(systemName, success, modifier)` | Optimization (parameterized success) |
| `predictOutcome(scenario, modifier)` | Prediction task |
| `retrainModel(modelName, success, modifier)` | Model retraining |

**`GuardianRobot`** — Security and monitoring:

| Method | Description |
|--------|-------------|
| `patrolArea(area, modifier)` | Area patrol |
| `respondToIncident(incidentType, resolved, modifier)` | Incident response |
| `monitorTraffic(zone, modifier)` | Traffic monitoring |
| `reportStatus(modifier)` | Status report |
| `emergencyShutdown(reason, modifier)` | Emergency shutdown (sets OFFLINE) |

**`ServiceRobot`** — Citizen-facing services:

| Method | Description |
|--------|-------------|
| `assistHuman(personName, modifier)` | Human assistance |
| `deliverItem(itemName, destination, modifier)` | Item delivery |
| `provideInfo(topic, modifier)` | Information provision |
| `greetVisitor(visitorName, modifier)` | Visitor greeting |
| `logServiceFeedback(feedback, modifier)` | Feedback logging |

**`InnovativeRobot`** — Research and prototyping:

| Method | Description |
|--------|-------------|
| `prototypeIdea(ideaName, modifier)` | Idea prototyping |
| `runExperiment(experimentName, success, modifier)` | Experiment execution |
| `logInnovation(description, modifier)` | Innovation logging |
| `collaborateWith(partnerName, modifier)` | Collaboration |
| `archiveConcept(conceptName, modifier)` | Concept archiving |

---

### 4.7 `task` Package

#### `RobotTask`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Auto-generated UUID (final) |
| `robotId` | `String` | Assigned robot (final) |
| `description` | `String` | Task description (final) |
| `completed` | `boolean` | Completion status (mutable) |

Methods: `getId()`, `getRobotId()`, `getDescription()`, `isCompleted()`, `setCompleted(boolean)`.

---

### 4.8 `event` Package

Publish/subscribe event system with 4 classes.

#### `EventBus` — Thread-Safe Dispatcher

Uses `ConcurrentHashMap<String, CopyOnWriteArrayList<EventListener>>` for concurrent listener management.

| Method | Description |
|--------|-------------|
| `register(eventType, listener)` | Adds listener for event type |
| `unregister(eventType, listener)` | Removes listener |
| `publish(DomainEvent)` | Dispatches to all registered listeners; catches exceptions per-listener |

#### `DomainEvent` — Core Event Payload

| Field | Type | Description |
|-------|------|-------------|
| `eventId` | `String` | Auto-generated UUID |
| `type` | `String` | Event discriminator for routing |
| `source` | `String` | Originating module |
| `occurredAt` | `Instant` | Creation timestamp |
| `payload` | `Object` | Generic data carrier |
| `metadata` | `Map<String, String>` | Supplementary key-value data |

#### `JobEvent` — Job-Specific Event

Standalone class (does not extend `DomainEvent`):

| Field | Type | Description |
|-------|------|-------------|
| `jobId` | `String` | Related job identifier |
| `type` | `String` | Event variant (CREATED, COMPLETED, etc.) |
| `actor` | `String` | Triggering user |
| `description` | `String` | Human-readable summary |
| `timestamp` | `Instant` | Creation time |

#### `EventListener` — Functional Interface

```java
public interface EventListener {
    void onEvent(DomainEvent event);
}
```

---

### 4.9 `ui` Package

Console-based user interface with 10 classes implementing role-based dispatch.

#### Application Entry Flow

```
UserConsoleUI.launch()          ← Top-level entry point
  ├── Client  → ClientUI(clientId)
  ├── Employee → EmployeeUI(employeeId)
  ├── System Admin → SystemConsoleUI.launch()
  │     └── login() → role dispatch:
  │           ├── ADMIN    → AdminUI
  │           ├── EMPLOYEE → EmployeeUI
  │           └── CLIENT   → ClientUI
  └── Exit → ExitReviewUI.showExitSummary()
```

#### `UserConsoleUI` — Front Controller

Static `launch()` method. Offers 4 top-level choices: Client, Employee, System Admin, Exit.

#### `SystemConsoleUI` — Admin Login Gate

| Method | Description |
|--------|-------------|
| `launch()` | Login/Exit loop |
| `login()` | Reads user ID, fetches via `AdminManager.getUserById()`, creates session, dispatches by role |

#### `LoginUI` — Credential Prompt

Static `promptLogin()` — reads credentials via `InputHandler`, delegates to `Authenticator.authenticate()`, starts session through `SessionReview`.

#### `AdminUI` — Administrator Dashboard (136 lines)

8-menu option interface:

| Option | Description |
|--------|-------------|
| Manage Users | Search/filter users via `SmartSearch` |
| Manage Robots | Search/filter robots |
| Manage Jobs | Search/filter jobs |
| Export Users (CSV) | Via `DataExport.exportUsersToCSV()` |
| Export Robots (CSV) | Via `DataExport.exportRobotsToCSV()` |
| Export Jobs (CSV) | Via `DataExport.exportJobsToCSV()` |
| System Backup | Via `BackupManager` |
| View Session Summary | Via `SessionReview` |

Every operation registers an `UndoManager` callback and logs through `SessionReview`.

#### `EmployeeUI` — Employee Dashboard (105 lines)

Constructor takes `employeeId`. Filters jobs by `job.getAssignedTo()`. Search via `SmartSearch`. No export/backup capabilities.

#### `ClientUI` — Citizen Dashboard (113 lines)

Constructor takes `clientId`. Maintains in-memory `List<RobotRequest>`.

| Feature | Description |
|---------|-------------|
| `sendRobotRequest()` | Looks up robot by serial, creates request, registers real undo (removes from list) |
| `viewMyRequests()` | Filters requests by clientId |
| `searchRobots()` | Via `SmartSearch` (no undo registered) |

#### `RobotConsoleUI` — Individual Robot Operations (97 lines)

Takes a `Robot` object. 6 operations:

| Operation | Description |
|-----------|-------------|
| View Details | Displays robot information |
| Task History | Shows `robot.getTaskHistory()` |
| Status Update | Changes status with undo (saves old status) |
| Recharge | Adds energy with undo (saves old energy via `setEnergyLevel()`) |
| Reset | Requires "yes" confirmation; delegates to `RobotManager.resetRobot()` |

#### `RobotManagerConsoleUI` — Fleet Administration (75 lines)

All-static class. Delegates to `RobotManager` static methods: `addNewRobot`, `updateRobotStatus`, `displayAllRobots`, `displayRobotHistory`. Adds search, CSV export, and backup.

#### `JobManagerConsoleUI` — Job Administration (89 lines)

6 operations: view all jobs, search jobs, assign job to robot, export CSV, backup. `assignJob()` reads job ID and robot serial, delegates to `JobManager.assignJobToRobot()`.

#### `ExitReviewUI` — Session Summary on Exit

Displays session summary (username, remaining time, recorded actions) before application termination.

#### `SystemConsoleUI` — System-Level Operations

System info display (JVM memory, timestamp), simulated restart, and exit.

---

### 4.10 `manager` Package

Business logic layer with 10+ manager classes.

#### Core Managers

**`AdminManager`** — User CRUD operations. `getUserById(String)` retrieves from `StorageRegistry.userStorage`.

**`EmployeeManager`** — Employee-specific operations.

**`JobManager`** — Job lifecycle management:
- `getAllJobs()` — Returns all jobs from storage
- `assignJobToRobot(jobId, robotSerial)` — Links job to robot
- `markJobCompleted(jobId)` — Transitions to EXECUTED

**`RobotManager`** — Robot fleet operations:
- `addNewRobot(...)` — Creates and persists robot
- `updateRobotStatus(serial, status)` — Updates operational state
- `displayAllRobots()` — Lists all robots
- `displayRobotHistory(serial)` — Shows task history
- `resetRobot(serial)` — Resets robot to initial state

**`ReportManager`** — Report generation and persistence.

#### Specialized Managers

**`SystemManager`** — Minimal system utilities:

| Method | Description |
|--------|-------------|
| `showMainMenu()` | System info / restart / exit |
| `showSystemInfo()` | JVM memory and timestamp |
| `restartSystem()` | Simulated restart |

**`RobotTaskManager`** — In-memory task tracking:

| Method | Description |
|--------|-------------|
| `assignTaskToRobot(robotId, description)` | Creates `RobotTask`, stores in static list |
| `viewAllTasks()` | Iterates and prints |
| `markTaskCompleted(taskId)` | Sets completed flag |
| `getAllTasks()` | Returns static list |

**`RobotRequestManager`** — Persistent request management:

| Method | Description |
|--------|-------------|
| `submitRequest(clientId, robotSerial, details)` | Creates and persists request |
| `viewPendingRequests()` | Filters by `!isHandled()` |
| `viewMyRequests(clientId)` | Filters by client ID |
| `markRequestHandled(requestId)` | Sets handled, generates report |

Uses `StorageRegistry.robotRequestStorage` for persistence. Auto-generates `Report` via `ReportStorage` on request completion.

**`SessionManager`** — User session state holder:

| Method | Description |
|--------|-------------|
| `login(User)` / `logout()` | Set/clear current user |
| `getCurrentUser()` / `isLoggedIn()` | Query state |
| `isAdmin()` / `isEmployee()` | Role checks |
| `getCurrentUserId()` / `getCurrentUsername()` | Null-safe getters |

---

### 4.11 `search` Package

#### `SmartSearch` — Generic Search Engine

| Method | Description |
|--------|-------------|
| `searchUsers(List<User>, keyword)` | Matches against username, role, department (via `EmployeeUser` instanceof pattern match) |
| `searchRobots(List<Robot>, keyword)` | Delegates to generic `searchByFields()` |
| `searchJobs(List<Job>, keyword)` | Delegates to generic `searchByFields()` |

Private generic helper: `searchByFields(Collection<T>, String keyword, Function<T, List<String>> fieldExtractor)` — applies case-insensitive `contains()` matching against each extracted field. All search calls log through `Logger`.

---

### 4.12 `session` Package

#### `SessionReview` — Central Session Lifecycle Tracker

| Field | Type | Description |
|-------|------|-------------|
| `session` | `Session` | Active session |
| `actions` | `List<String>` | Recorded action log |

| Method | Description |
|--------|-------------|
| `startSession(User)` | Creates 30-minute TTL session |
| `logAction(String)` | Guards against expired session, appends timestamped entry |
| `showSessionSummary()` | Displays username, remaining time, all actions |
| `clearSession()` | Wipes session and actions |
| `getActions()` | Returns defensive copy |

---

### 4.13 `system` Package

System health monitoring and diagnostics with 7 classes.

#### Monitoring Utilities

**`CpuMonitor`** — `getAvailableProcessors()` delegates to `Runtime.getRuntime().availableProcessors()`.

**`DiskUsageChecker`**:
- `getFreeSpaceMB(String path)` — Converts `File.getFreeSpace()` to MB
- `getTotalSpaceMB(String path)` — Converts `File.getTotalSpace()` to MB

**`ThreadMonitor`** — `getThreadCount()` via `ManagementFactory.getThreadMXBean().getThreadCount()`.

**`SystemHealthChecker`** — Heap and non-heap memory diagnostics:
- `printMemoryStats()` — Retrieves `MemoryUsage` for both heap and non-heap, formats in MB, logs via `Logger.info()`

#### Snapshot & Validation

**`SystemSnapshot`** — Immutable point-in-time system state:

| Field | Type | Description |
|-------|------|-------------|
| `heapUsed` | `long` | Current heap consumption (bytes) |
| `threadCount` | `int` | Live thread count |
| `uptime` | `long` | JVM uptime (millis) |
| `osName` | `String` | Operating system identifier |

**`SystemValidator`** — Health determination:

```java
public static boolean isHealthy(SystemSnapshot snapshot) {
    return snapshot.getHeapUsed() < 500_000_000 && snapshot.getThreadCount() < 200;
}
```

**`SystemReporter`** — Formats `SystemSnapshot` as human-readable text using text blocks.

---

### 4.14 `audit` Package

Timeline-based event recording and analysis with 7 classes.

#### Core Recording

**`TimelineEvent`** — Audit event entity:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Unique event identifier |
| `timestamp` | `LocalDateTime` | When the event occurred |
| `actor` | `String` | Who performed the action |
| `action` | `String` | What was done |
| `target` | `String` | What was affected |
| `details` | `String` | Additional information |

**`TimelineEventParser`** — Parses serialized timeline events from string representations.

**`TimelineRecorder`** — Records events to configured sinks:

```java
public class TimelineRecorder {
    private final TimelineSink sink;
    public void record(TimelineEvent event) { sink.write(event); }
}
```

**`TimelineSink`** — Interface for event persistence destinations.

**`InMemoryTimelineSink`** — In-memory implementation of `TimelineSink`.

**`FileTimelineSink`** — File-based implementation of `TimelineSink`.

**`ReadableTimeline`** — Interface for querying recorded events.

#### Listener Infrastructure

**`AuditListener`** — Interface for audit event observation.

---

### 4.15 `tools` Package

Utility and infrastructure classes (14 classes).

#### Console Output

**`Messages`** — User-facing console messages:

| Method | Output |
|--------|--------|
| `success(String)` | Emoji-prefixed success line + Logger |
| `warning(String)` | Emoji-prefixed warning + Logger |
| `info(String)` | Emoji-prefixed info + Logger |
| `error(String)` | Emoji-prefixed error + Logger |
| `header(String)` | Title in `=== ===` caps |
| `divider()` | Dashed separator line |

**`Printer`** — Domain object pretty-printer:

| Method | Formats |
|--------|---------|
| `printUser(User)` | ID/name/role/department |
| `printRobot(Robot)` | ID/type/status |
| `printJob(Job)` | ID/title/assignedTo/completed |
| `printRobotRequest(RobotRequest)` | Multi-line block with handled status |
| `printTask(RobotTask)` | ID/robot/completed/description |
| `printTaskRecord(TaskRecord)` | Timestamp/name/success-fail/notes |

#### Input Handling

**`InputHandler`** — Wraps shared `Scanner(System.in)`:

| Method | Description |
|--------|-------------|
| `readLine(prompt)` | Returns trimmed input |
| `readInt(prompt)` | Loops until valid integer |
| `readPassword(prompt)` | Console password; falls back to scanner |
| `readEnum(Class<T>, String)` | Displays numbered enum options, validates selection |

#### Validation

**`Validator`** — Static validation helpers:

| Method | Rule |
|--------|------|
| `isValidId(String)` | Non-null, non-blank |
| `isValidText(String)` | Length >= 3 |
| `isValidStatus(String)` | Matches "ready"/"busy"/"offline" |
| `isValidRole(String)` | Valid `Role.valueOf()` |

#### Undo Mechanism

**`UndoManager`** — Stack-based undo with inner class `UndoAction`:

| Method | Description |
|--------|-------------|
| `registerUndoAction(label, undoLogic)` | Pushes Runnable onto stack |
| `undoLastAction()` | Pops and executes |
| `clearHistory()` | Empties stack |
| `hasUndo()` | Returns emptiness check |

#### Date & Formatting

**`DateUtils`** — Date formatting and arithmetic:

| Method | Description |
|--------|-------------|
| `format(Instant/LocalDateTime/ZonedDateTime)` | Formats to `"yyyy-MM-dd HH:mm:ss"` |
| `nowFormatted()` | Current time string |
| `isToday(Instant)`, `isBeforeNow(Instant)`, `isAfterNow(Instant)` | Comparisons |
| `minutesBetween()`, `hoursBetween()`, `daysBetween()` | `ChronoUnit` arithmetic |
| `toZonedDateTime(Instant)`, `toLocalDateTime(Instant)` | Conversions |

**`TemplateRenderer`** — Renders `Job` as formatted plain text.

#### File & Crypto Utilities

**`FileUtils`** — File system operations:

| Method | Description |
|--------|-------------|
| `fileExists(path)` | Checks via `new File(path).exists()` |
| `deleteFile(path)` | Removes with feedback |
| `createDirectory(path)` | Calls `mkdirs()` if absent |
| `readFile(path)` | `Files.readAllBytes` → String |
| `writeFile(path, content)` | `FileWriter` in try-with-resources |

**`CryptoUtils`** — Hashing and encoding:

| Method | Description |
|--------|-------------|
| `sha256(String)` / `md5(String)` | Hash via `MessageDigest` |
| `hash(input, algorithm)` | Generic hash → hex |
| `base64Encode(String)` / `base64Decode(String)` | Base64 operations |

**`AesFileDecryptor`** — AES-GCM file decryption:

| Method | Description |
|--------|-------------|
| `AesFileDecryptor(String secret)` | Derives 256-bit key via SHA-256 |
| `decryptLines(String filePath)` | Reads Base64 lines, decrypts each |

**`BackupManager`** — Java serialization backup:

| Method | Description |
|--------|-------------|
| `saveBackup(Object, filename)` | Serializes via `ObjectOutputStream` |
| `loadBackup(String)` | Deserializes via `ObjectInputStream` |
| `backupUsers/Robots/Jobs/Assignments/Results` | Type-specific convenience wrappers |

#### Data Export

**`DataExport`** — CSV export for domain collections:

| Method | Output Columns |
|--------|---------------|
| `exportUsersToCSV` | ID, Username, Role |
| `exportEmployeesToCSV` | ID, Username, Role, Department |
| `exportClientsToCSV` | ID, Username, Role |
| `exportRobotsToCSV` | ID, Type, Status, EnergyLevel |
| `exportJobsToCSV` | ID, Title, AssignedTo, Status |
| `exportJobResultsToCSV` | JobID, Success, Output, CompletedAt |

#### Search

**`SearchHelper`** — Generic collection search:

| Method | Description |
|--------|-------------|
| `findById(Collection<T>, String id, Function<T, String> extractor)` | Iterates and matches via extractor |
| `existsById(...)` | Boolean wrapper around `findById` |

#### Logging

**`Logger`** — Console-only logger with four levels:

```java
public static void info(String message)    { log("INFO", ...); }
public static void debug(String message)   { log("DEBUG", ...); }
public static void warning(String message) { log("WARNING", ...); }
public static void error(String message)   { log("ERROR", ...); }
```

Format: `[timestamp] [LEVEL] [source] message`.

---

### 4.16 `config` Package

#### `ConfigLoader`

Single static method `load(String pathToXml)` — reads Java `Properties` from XML format via `Properties.loadFromXML()`. Returns `SystemConfig` wrapper.

#### `SystemConfig`

Wrapper around `java.util.Properties`:

| Method | Description |
|--------|-------------|
| `get(String key)` | Returns property value |
| `getLogFile()` | `new File(get("log.file.path"))` |
| `getEnvironment()` | Returns `get("env")` |
| `isDebugMode()` | Parses boolean from `get("debug")` |
| `getAuthTimeout()` | Parses int from `get("auth.timeout")` |

---

### 4.17 `logs` Package

Log analysis and reporting (4 classes in `audit.analysis` package).

**`LogAggregator`** — Reads multiple log files, parses via `TimelineEventParser`, returns `List<TimelineEvent>`. Provides `countByAction()` and `countByActor()` frequency maps.

**`TimelineFilters`** — Static stream-based filters:
- `byActor(events, actor)` — Case-insensitive match
- `byAction(events, action)` — Case-insensitive match
- `betweenDates(events, from, to)` — Inclusive range on timestamp

**`TimelineReportGenerator`** — Report formatting:
- `toTextReport(List<TimelineEvent>)` — Newline-joined event strings
- `toJsonReport(List<TimelineEvent>)` — Manual JSON array with id/timestamp/actor/action/target/details

**`TimelineStats`** — Statistical methods:
- `countByActor(events)` — Frequency map
- `countByAction(events)` — Frequency map
- `averageEventsPerDay(events)` — Distinct UTC dates division

---

### 4.18 `Interface` Package

Contract interfaces for cross-cutting concerns.

| Interface | Method | Implemented By |
|-----------|--------|----------------|
| `Printable` | `void print()` | Report, User, Robot |
| `Schedulable` | Schedule-related methods | Job, TaskRecord |
| `Trackable` | Tracking-related methods | Robot, Job |
| `Identifiable` | `String getId()` | Core identity contract (String-based, distinct from `core.Identifiable` which uses UUID) |
| `FeedbackCollector` | `void collectFeedback(String feedback)` | Citizen feedback collection |
| `PermissionInterface` | `boolean hasPermission(String action)` | Permission checking |

---

## 5. Design Patterns Catalog

| Pattern | Implementation | Location |
|---------|---------------|----------|
| **Role-Based Access Control (RBAC)** | `Role`, `Permission`, `RolePermissionMap`, `PermissionManager`, `PermissionSelector` | `auth` |
| **Immutable Value Object** | `TaskRecord`, `Report`, `Credentials`, `SystemSnapshot`, `DomainEvent`, `JobEvent`, `JobAssignment`, `JobResult`, `Credential` | `model`, `auth`, `security`, `system`, `event`, `job` |
| **Abstract Base / Template Method** | `User` → 4 subclasses; `Robot` → `SmartRobot` → 4 robot types | `model`, `auth`, `robot` |
| **Facade** | `AuthServices` (login/logout), `PermissionSelector` (RBAC checks), `EncryptedStorage` (encrypt+I/O) | `auth`, `storage` |
| **Static Service / Utility** | `Authenticator`, `SecurityManager`, `PasswordHasher`, `TokenGenerator`, `SearchHelper`, `Logger`, `Messages`, `Printer` | `auth`, `security`, `tools` |
| **Context Object** | `SessionContext` (global session holder) | `auth` |
| **Guard / Assertion** | `SessionValidator`, `PermissionSelector.require()`, `JobValidator` | `auth`, `job` |
| **Registry / Lookup Table** | `RolePermissionMap` (static RBAC config), `StorageRegistry` (entity stores) | `auth`, `storage` |
| **Repository** | `EncryptedEntityStorage<T>` (generic collection persistence) | `storage` |
| **Adapter** | `EncryptedEntityStorage<T>` bridges typed objects to line-based text via serializer/deserializer lambdas | `storage` |
| **Publish/Subscribe (Observer)** | `EventBus` + `EventListener` + `DomainEvent` | `event` |
| **Strategy** | `security.Authenticator` interface with `BasicAuthenticator` stub | `security`, `auth` |
| **Command (with Undo)** | `UndoManager` with `UndoAction` inner class | `tools` |
| **Stack-Based Undo** | `UndoManager` (push/pop Runnable callbacks) | `tools` |
| **Front Controller** | `UserConsoleUI` routing to role-specific UIs | `ui` |
| **Role-Based Dispatch** | `SystemConsoleUI` dispatching by `Role` enum | `ui` |
| **Factory Method** | `AesEncryption.generateNew()`, `JobTemplate.toJob()` | `security`, `job` |
| **Decorator / Extension** | `PermissionManager` wraps static map with runtime mutability | `auth` |
| **Delegation / Wrapper** | `StorageManager` shields callers from checked `IOException` | `storage` |
| **Defensive Validation** | `Credentials` constructor rejects null/blank | `auth` |
| **Audit Trail** | `AuthManager` + `TimelineSink`, `SessionReview` logging | `auth`, `session` |
| **TTL Session** | `Session` with eager expiry computation and lazy check | `auth` |
| **Thread-Safe Pub/Sub** | `EventBus` uses `ConcurrentHashMap` + `CopyOnWriteArrayList` | `event` |
| **Java Serialization Backup** | `BackupManager` with `ObjectOutputStream`/`ObjectInputStream` | `tools` |
| **Generic Search** | `SmartSearch.searchByFields()` with `Function<T, List<String>>` extractor | `search` |

---

## 6. Data Persistence Architecture

### Storage Pipeline

```
Domain Object
    ↓  (serializer Function<T,String>)
EncryptedEntityStorage<T>
    ↓  (line joining)
StorageManager
    ↓  (string → bytes)
EncryptedStorage
    ↓  (AES-256-GCM encrypt)
AesEncryption
    ↓  (bytes → file)
storage/secure/*.txt
```

### Backing Files

| File | Contents |
|------|----------|
| `storage/secure/users.txt` | AES-encrypted, newline-separated serialized `User` objects |
| `storage/secure/robots.txt` | AES-encrypted, newline-separated serialized `Robot` objects |
| `storage/secure/jobs.txt` | AES-encrypted, newline-separated serialized `Job` objects |
| `storage/secure/robot_requests.txt` | AES-encrypted, newline-separated serialized `RobotRequest` objects |

### Key Properties

- **Encryption:** AES-256-GCM with 12-byte random IV per write operation
- **Key Derivation:** SHA-256 hash of passphrase, truncated to 32 bytes
- **Format:** Each entity serialized to a single line; collection stored as newline-delimited
- **Read Resilience:** Null entries filtered during deserialization
- **Atomicity:** Full collection rewrite on individual save (no append-only)

---

## 7. Security Architecture

### Authentication Flow

```
User enters credentials
    ↓
InputHandler reads username/password
    ↓
Authenticator.authenticate(username, password)
    ↓  iterates StorageRegistry.userStorage
    ↓  matches by case-insensitive username
    ↓  PasswordHasher.verify(password, storedHash, salt)
    ↓
Returns LocalUser or null
    ↓
Session created (30-minute TTL)
    ↓
SessionContext stores session
    ↓
PermissionSelector checks permissions per operation
```

### Encryption Stack

| Layer | Technology |
|-------|-----------|
| Data at Rest | AES-256-GCM (authenticated encryption) |
| Password Storage | SHA-256 with 16-byte random salt |
| Session Keys | 256-bit tokens via `SecureRandom` + Base64 URL-safe |
| File Integrity | SHA-256 hash computation |
| Backup | Java Object Serialization |

### Permission Enforcement

Every protected operation follows this pattern:

```java
PermissionSelector.require(Permission.EXECUTE_JOB);  // throws SecurityException
// ... proceed with operation
SessionReview.logAction("Executed job: " + jobId);
UndoManager.registerUndoAction("Undo job execution", () -> { /* rollback */ });
```

---

## 8. Application Lifecycle

### Startup Sequence

1. `SmartCity.main()` invokes entry point
2. `UserConsoleUI.launch()` displays top-level menu
3. User selects role (Client / Employee / Admin / Exit)
4. For Admin: `SystemConsoleUI` → `LoginUI.promptLogin()` → credential verification
5. Session created via `SessionReview.startSession()`
6. Role-based UI dispatched (`AdminUI` / `EmployeeUI` / `ClientUI`)

### Runtime Operations

```
User Action → UI Menu Selection
    ↓
Permission Check (PermissionSelector.require)
    ↓
Business Logic (Manager classes)
    ↓
Persistence (StorageRegistry → EncryptedEntityStorage → AES encryption)
    ↓
Undo Registration (UndoManager)
    ↓
Session Logging (SessionReview.logAction)
    ↓
Event Publishing (EventBus.publish)
    ↓
Audit Recording (TimelineRecorder → TimelineSink)
```

### Shutdown Sequence

1. User selects Exit
2. `ExitReviewUI.showExitSummary()` displays session summary
3. `SessionReview.clearSession()` wipes session state
4. Application terminates

### System Health Monitoring (Background)

```
CpuMonitor.getAvailableProcessors()
DiskUsageChecker.getFreeSpaceMB(path) / getTotalSpaceMB(path)
ThreadMonitor.getThreadCount()
SystemHealthChecker.printMemoryStats()
    ↓
SystemSnapshot (point-in-time capture)
    ↓
SystemValidator.isHealthy(snapshot) → heap < 500MB && threads < 200
    ↓
SystemReporter.reportAsText(snapshot) → formatted output
```

---

> **Total Source Files:** 142 Java classes  
> **Packages:** 18 (model, auth, security, storage, job, robot, task, event, ui, manager, search, session, system, audit, tools, config, logs, Interface)  
> **Design Patterns:** 25+ distinct patterns cataloged  
> **Encrypted Entities:** User, Robot, Job, RobotRequest  
> **Robot Specializations:** AI-Powered, Guardian, Service, Innovative  
> **Permission Count:** 26 fine-grained permissions across 4 roles  
> **Author:** Abdulrahman
