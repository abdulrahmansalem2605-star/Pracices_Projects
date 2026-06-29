# SQL Master Reference Manual
# دليل المرجع الرئيسي لقواعد البيانات

---

## Collection 1 — Commercial Order Management System
## المجموعة الأولى — نظام إدارة طلبات تجارية

---

## Table of Contents | جدول المحتويات

1. [Project Overview](#1-project-overview)
2. [Entity Identification](#2-entity-identification)
3. [Entity Relationship Diagram](#3-entity-relationship-diagram)
4. [Relational Model Design](#4-relational-model-design)
5. [SQL Query Implementation](#5-sql-query-implementation)
6. [Relational Algebra Operations](#6-relational-algebra-operations)
7. [Normalization Analysis](#7-normalization-analysis)

---

## 1. Project Overview | نظرة عامة على المشروع

### Objective | الهدف

**English:** Build an automated system for processing goods orders placed by customers in a commercial company.

**العربية:** بناء نظام مؤتمت لطلب بضائع من قبل زبائن في شركة تجارية.

### System Scope | نطاق النظام

The system manages the complete order lifecycle:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Customer   │────▶│    Order    │◀────│  Employee   │
│   (زبون)    │     │   (طلب)     │     │   (موظف)    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Product   │
                    │   (منتج)    │
                    └─────────────┘
```

---

## 2. Entity Identification | تحديد الكيانات

### 2.1 Customer Entity | كيان الزبون

| Attribute (EN) | Attribute (AR) | Type | Constraint |
|----------------|----------------|------|------------|
| NationalID | رقم وطني | ID | **Primary Key** |
| FirstName | اسم | Text | Required |
| LastName | كنية | Text | Required |
| Address | العنوان | Composite | — |
| ├ Street | شارع | Text | Component |
| ├ City | مدينة | Text | Component |
| └ Governorate | محافظة | Text | Component |
| PhoneNumbers | أرقام الهاتف | Multi-valued | — |

**English Definition:**
```
Customer (
    NationalID       — Primary Key
    FirstName        — Customer first name
    LastName         — Customer last name
    Address.Street   — Street address
    Address.City     — City name
    Address.Governorate — Governorate/State
    PhoneNumbers     — Multiple phone numbers
)
```

### 2.2 Employee Entity | كيان الموظف

| Attribute (EN) | Attribute (AR) | Type | Constraint |
|----------------|----------------|------|------------|
| NationalID | رقم وطني | ID | **Primary Key** |
| FirstName | اسم | Text | Required |
| LastName | كنية | Text | Required |
| PhoneNumbers | أرقام الهاتف | Multi-valued | — |

**English Definition:**
```
Employee (
    NationalID    — Primary Key
    FirstName     — Employee first name
    LastName      — Employee last name
    PhoneNumbers  — Multiple phone numbers
)
```

### 2.3 Product Entity | كيان المنتج

| Attribute (EN) | Attribute (AR) | Type | Constraint |
|----------------|----------------|------|------------|
| ProductID | رقم المنتج | ID | **Primary Key** |
| ProductName | اسم المنتج | Text | Required |
| Price | السعر | Decimal | Required |

**English Definition:**
```
Product (
    ProductID     — Primary Key
    ProductName   — Product description
    Price         — Unit price
)
```

### 2.4 Order Entity | كيان الطلب

| Attribute (EN) | Attribute (AR) | Type | Constraint |
|----------------|----------------|------|------------|
| OrderID | رقم الطلب | ID | **Primary Key** |
| OrderDate | تاريخ الطلب | Date | Required |
| TotalValue | القيمة الكلية | Decimal | Calculated |
| EmployeeID | رقم الموظف المسؤول | ID | **Foreign Key** → Employee |
| CustomerID | رقم الزبون | ID | **Foreign Key** → Customer |

**English Definition:**
```
[Order] (
    OrderID       — Primary Key
    OrderDate     — Transaction date
    TotalValue    — Total order value
    EmployeeID    — Foreign Key → Employee.NationalID
    CustomerID    — Foreign Key → Customer.NationalID
)
```

> **Note:** `Order` is a SQL reserved keyword; brackets `[Order]` are required.

### 2.5 Order_Product Entity | كيان طلب_منتج (العلاقة الوسيطة)

| Attribute (EN) | Attribute (AR) | Type | Constraint |
|----------------|----------------|------|------------|
| OrderID | رقم الطلب | ID | **Composite PK**, FK → Order |
| ProductID | رقم المنتج | ID | **Composite PK**, FK → Product |
| Quantity | الكمية | Integer | Required |

**English Definition:**
```
Order_Product (
    OrderID    — Primary Key (composite), Foreign Key → [Order]
    ProductID  — Primary Key (composite), Foreign Key → Product
    Quantity   — Units ordered per product
)
```

**Purpose:** This associative entity resolves the many-to-many relationship between Orders and Products.

---

## 3. Entity Relationship Diagram | مخطط الكيانات والارتباطات

### ER Diagram Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ENTITY RELATIONSHIP DIAGRAM                        │
│                     مخطط الكيانات والارتباطات                                │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐                           ┌──────────────────┐
    │    CUSTOMER      │                           │    EMPLOYEE      │
    │     (زبون)       │                           │    (موظف)        │
    │──────────────────│                           │──────────────────│
    │ ◉ NationalID     │                           │ ◉ NationalID     │
    │   FirstName      │                           │   FirstName      │
    │   LastName       │                           │   LastName       │
    │   ┌──────────┐   │                           │   PhoneNumbers   │
    │   │ Address  │   │                           └────────┬─────────┘
    │   ├ Street   │   │                                    │
    │   ├ City     │   │                                    │ 1
    │   └ Governor.│   │                                    │
    │   └──────────┘   │                                    │
    │   PhoneNumbers   │                                    │
    └────────┬─────────┘                                    │
             │                                              │
             │ 1                                            │ 1
             │                                              │
             │ places                                       │ processes
             │                                              │
             │ *                                            │ *
    ┌────────┴──────────────────────────────────────────────┴─────────┐
    │                           [ORDER]                               │
    │                            (طلب)                                │
    │─────────────────────────────────────────────────────────────────│
    │ ◉ OrderID                                                         │
    │   OrderDate                                                       │
    │   TotalValue                                                      │
    │   CustomerID (FK)                                                 │
    │   EmployeeID (FK)                                                 │
    └───────────────────────────────┬─────────────────────────────────┘
                                    │
                                    │ 1
                                    │
                                    │ contains
                                    │
                                    │ *
                           ┌────────┴────────┐
                           │  ORDER_PRODUCT  │
                           │   (طلب_منتج)    │
                           │────────────────│
                           │ ◉ OrderID (FK) │
                           │ ◉ ProductID(FK)│
                           │   Quantity     │
                           └────────┬────────┘
                                    │
                                    │ *
                                    │
                                    │ references
                                    │
                                    │ 1
    ┌───────────────────────────────┴─────────────────────────────────┐
    │                          PRODUCT                                │
    │                          (منتج)                                 │
    │─────────────────────────────────────────────────────────────────│
    │ ◉ ProductID                                                     │
    │   ProductName                                                   │
    │   Price                                                         │
    └─────────────────────────────────────────────────────────────────┘

    Legend | مفتاح الرموز:
    ◉ = Primary Key (مفتاح رئيسي)
    FK = Foreign Key (مفتاح خارجي)
    1 = One side (الطرف الواحد)
    * = Many side (الطرف المتعدد)
```

### Relationship Summary | ملخص الارتباطات

| Relationship | Type | Description (EN) | الوصف (AR) |
|--------------|------|------------------|------------|
| Customer → Order | One-to-Many | A customer can place multiple orders | زبون واحد يمكنه تقديم عدة طلبات |
| Employee → Order | One-to-Many | An employee can process multiple orders | موظف واحد يمكنه معالجة عدة طلبات |
| Order ↔ Product | Many-to-Many | Orders contain multiple products; products appear in multiple orders | الطلبية تحتوي على عدة منتجات والمنتج يظهر في عدة طلبات |
| Order_Product | Associative | Junction table resolving M:N with quantity attribute | جدول وسيط يحل العلاقة المتعددة مع صفة الكمية |

---

## 4. Relational Model Design | تصميم النموذج العلائقي

### Table Definitions | تعريفات الجداول

#### Table 1: Customer | جدول الزبائن

```sql
CREATE TABLE Customer (
    NationalID    VARCHAR(20)   PRIMARY KEY,
    FirstName     NVARCHAR(50)  NOT NULL,
    LastName      NVARCHAR(50)  NOT NULL,
    Street        NVARCHAR(100),
    City          NVARCHAR(50),
    Governorate   NVARCHAR(50)
);
```

#### Table 2: Employee | جدول الموظفين

```sql
CREATE TABLE Employee (
    NationalID    VARCHAR(20)   PRIMARY KEY,
    FirstName     NVARCHAR(50)  NOT NULL,
    LastName      NVARCHAR(50)  NOT NULL
);
```

#### Table 3: Product | جدول المنتجات

```sql
CREATE TABLE Product (
    ProductID     INT           PRIMARY KEY,
    ProductName   NVARCHAR(100) NOT NULL,
    Price         DECIMAL(10,2) NOT NULL
);
```

#### Table 4: Order | جدول الطلبات

```sql
CREATE TABLE [Order] (
    OrderID       INT           PRIMARY KEY,
    OrderDate     DATE          NOT NULL,
    TotalValue    DECIMAL(12,2) DEFAULT 0,
    EmployeeID    VARCHAR(20)   FOREIGN KEY REFERENCES Employee(NationalID),
    CustomerID    VARCHAR(20)   FOREIGN KEY REFERENCES Customer(NationalID)
);
```

#### Table 5: Order_Product | جدول طلب_منتج (العلاقة الوسيطة)

```sql
CREATE TABLE Order_Product (
    OrderID       INT           FOREIGN KEY REFERENCES [Order](OrderID),
    ProductID     INT           FOREIGN KEY REFERENCES Product(ProductID),
    Quantity      INT           NOT NULL DEFAULT 1,
    PRIMARY KEY (OrderID, ProductID)
);
```

### Relational Schema Notation | صيغة النموذج العلائقي

```
Customer(NationalID, FirstName, LastName, Street, City, Governorate)
    PK: NationalID

Employee(NationalID, FirstName, LastName)
    PK: NationalID

Product(ProductID, ProductName, Price)
    PK: ProductID

[Order](OrderID, OrderDate, TotalValue, EmployeeID, CustomerID)
    PK: OrderID
    FK: EmployeeID → Employee(NationalID)
    FK: CustomerID → Customer(NationalID)

Order_Product(OrderID, ProductID, Quantity)
    PK: (OrderID, ProductID)
    FK: OrderID → [Order](OrderID)
    FK: ProductID → Product(ProductID)
```

---

## 5. SQL Query Implementation | تنفيذ استعلامات SQL

### 5.1 Data Retrieval Queries | استعلامات استرجاع البيانات

#### Query 1: Retrieve All Orders with Customer Information
#### الاستعلام 1: استرجاع جميع الطلبات مع معلومات الزبون

```sql
-- Retrieve all orders with customer's full name and order date
SELECT 
    o.OrderID,
    o.OrderDate,
    CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName
FROM
    [Order] o
JOIN 
    Customer c ON o.CustomerID = c.NationalID
ORDER BY 
    o.OrderDate ASC;
```

**Technical Notes:**
- `CONCAT()` function combines FirstName and LastName into a single field
- Table aliases (`o`, `c`) improve query readability
- `ORDER BY ASC` sorts results from oldest to newest
- INNER JOIN ensures only orders with valid customer references appear

---

#### Query 2: Retrieve Products for a Specific Order
#### الاستعلام 2: استرجاع المنتجات لطلبية محددة

```sql
-- Retrieve product names for the order with OrderID = 231
SELECT 
    p.ProductName
FROM 
    Order_Product op
JOIN 
    Product p ON op.ProductID = p.ProductID
WHERE 
    op.OrderID = 231;
```

**Technical Notes:**
- Filters results to a specific `OrderID` value (231)
- Returns only product names (projection optimization)
- Demonstrates single-table join for simple lookups

---

#### Query 3: Detailed Order Information (Three-Table Join)
#### الاستعلام 3: معلومات تفصيلية للطلبية (ربط ثلاث جداول)

```sql
-- Show detailed information of products and their quantities in a specific order
SELECT
    o.OrderID,
    p.ProductName,
    op.Quantity
FROM
    Order_Product op
JOIN 
    Product p ON op.ProductID = p.ProductID
JOIN 
    [Order] o ON op.OrderID = o.OrderID
WHERE 
    o.OrderID = 10;
```

**Technical Notes:**
- Chains multiple `JOIN` operations across three tables
- Resolves foreign key references to produce denormalized output
- Combines Order, Product, and Quantity data in one result set

---

#### Query 4: Calculate Total Quantity Per Order
#### الاستعلام 4: حساب الكمية الإجمالية لكل طلبية

```sql
-- Calculate the total quantity of products in a specific order
SELECT
    OrderID,
    SUM(Quantity) AS TotalQuantity
FROM
    Order_Product
WHERE 
    OrderID = 10
GROUP BY 
    OrderID;
```

**Technical Notes:**
- `SUM()` aggregate function totals quantity values
- `GROUP BY` clause groups results by OrderID
- `WHERE` filters before aggregation (pre-group filtering)

---

### 5.2 Data Manipulation Queries | استعلامات تعديل البيانات

#### Query 5: Insert a New Product
#### الاستعلام 5: إدراج منتج جديد

```sql
-- Insert a new product into the Product table
INSERT INTO Product (ProductID, ProductName, Price)
VALUES (101, 'New Product', 50.00);
```

**Technical Notes:**
- Explicitly lists target columns for clarity and safety
- Demonstrates parameterized value insertion

---

#### Query 6: Update Product Price
#### الاستعلام 6: تحديث سعر المنتج

```sql
-- Update the price of a specific product
UPDATE Product
SET Price = 55.00
WHERE ProductID = 101;
```

**Critical Warning:** Always include a `WHERE` clause in UPDATE statements to prevent unintended bulk modifications.

---

#### Query 7: Delete an Order
#### الاستعلام 7: حذف طلبية

```sql
-- Delete an order by its OrderID
DELETE FROM [Order]
WHERE OrderID = 10;
```

**Critical Warning:** Always include a `WHERE` clause in DELETE statements. Consider foreign key constraints—deleting an order may require cascade operations or prior deletion of related Order_Product records.

---

## 6. Relational Algebra Operations | عمليات الجبر العلائقي

### 6.1 Projection Operation (Π) | عملية الإسقاط

**Definition:** Projection extracts specified columns from a relation, eliminating duplicates.

**التعريف:** الإسقاط يستخرج أعمدة محددة من العلاقة مع إزالة التكرارات.

#### Example: Project Column 'c' from Relation S

**Given Relation S:**

| d | c |
|---|---|
| 3 | 2 |
| 1 | 4 |
| 3 | 8 |
| 6 | 9 |

**Operation:** Π_c(S) — Project column c from S

**Result:**

| c |
|---|
| 3 |
| 1 |
| 6 |

> **Note:** The value `8` is removed as a duplicate of `3`.

---

### 6.2 Selection Operation (σ) | عملية الاختيار

**Definition:** Selection extracts rows that satisfy a given predicate condition.

**التعريف:** الاختيار يستخرج الصفوف التي تحقق شرطاً معيناً.

#### Example: Select Rows Where d > 4 from Relation S

**Given Relation S:**

| d | c |
|---|---|
| 3 | 2 |
| 1 | 4 |
| 3 | 8 |
| 6 | 9 |

**Operation:** σ_(d>4)(S) — Select rows where d > 4

**Analysis:**

| d | c | Condition (d > 4) | Included? |
|---|---|-------------------|-----------|
| 3 | 2 | 3 > 4 = FALSE | No |
| 1 | 4 | 1 > 4 = FALSE | No |
| 3 | 8 | 3 > 4 = FALSE | No |
| 6 | 9 | 6 > 4 = TRUE | Yes |

**Result:**

| d | c |
|---|---|
| 6 | 9 |

---

### 6.3 Combined Operations | عمليات مركبة

Relational algebra operations can be composed sequentially:

```
σ_(d>4)(Π_c(S))  — First project column c, then filter rows where d > 4
Π_c(σ_(d>4)(S))  — First filter rows where d > 4, then project column c
```

**Important:** The order of operations affects the result when columns referenced in selection are not present in the projection.

---

## 7. Normalization Analysis | تحليل التطبيع

### 7.1 First Normal Form (1NF) | الشكل النظامي الأول

**Definition:** A relation is in 1NF if:
- All attributes contain atomic (indivisible) values
- No repeating groups exist

**التعريف:** العلاقة في 1NF إذا:
- كانت جميع الصفات ذراتية (لا تتجزأ)
- لم تكن هناك مجموعات مكررة

**Analysis of Our Schema:**
- Customer table: Address is composite (Street, City, Governorate) → violates 1NF
- Solution: Flatten into separate columns or create a separate Address table

---

### 7.2 Second Normal Form (2NF) | الشكل النظامي الثاني

**Definition:** A relation is in 2NF if:
- It is in 1NF
- No partial dependency exists (all non-key attributes depend on the entire primary key)

**التعريف:** العلاقة في 2NF إذا:
- كانت في 1NF
- لم تكن هناك اعتمادية جزئية (جميع الصفات غير المفتاحية تعتمد على المفتاح الأساسي بالكامل)

#### Example Analysis: Book Relation

**Given Relation:**

| BookID | BookTitle | Publisher | BookType | AuthorName |
|--------|-----------|-----------|----------|------------|
| ... | ... | ... | ... | ... |

**Primary Key:** BookID (simple key, not composite)

**Dependencies:**
- BookID → BookTitle ✓
- BookID → Publisher ✓
- BookID → AuthorName ✓
- BookID → BookType (indirect: BookID → Publisher → BookType)

**Test:** Since the primary key is simple (not composite), partial dependency is impossible. All attributes depend on the full key.

**Result:** ✅ The relation IS in 2NF because:
- It uses a simple primary key
- No partial dependencies exist
- All dependencies are on the complete key

---

### 7.3 Third Normal Form (3NF) | الشكل النظامي الثالث

**Definition:** A relation is in 3NF if:
- It is in 2NF
- No transitive dependency exists (non-key attributes depend only on the primary key, not on other non-key attributes)

**التعريف:** العلاقة في 3NF إذا:
- كانت في 2NF
- لم تكن هناك اعتمادية عبرية (الصفات غير المفتاحية تعتمد فقط على المفتاح الأساسي وليس على صفات غير مفتاحية أخرى)

#### Example Analysis: Book Relation

**Transitive Dependency Identified:**

```
BookID → Publisher → BookType
```

- `BookType` depends on `Publisher` (a non-key attribute)
- `Publisher` depends on `BookID` (the primary key)
- Therefore, `BookType` has a **transitive dependency** on `BookID`

**Result:** ❌ The relation is NOT in 3NF due to transitive dependency.

#### Solution: Decomposition to 3NF | الحل: التفكيك إلى 3NF

**Decompose into two relations:**

**Relation 1: Book**

```
Book (BookID, BookTitle, Publisher, AuthorName)
    PK: BookID
    Dependencies: BookID → BookTitle, Publisher, AuthorName
```

**Relation 2: Publisher_Info**

```
Publisher_Info (Publisher, BookType)
    PK: Publisher
    Dependencies: Publisher → BookType
```

**Result:** ✅ Both relations are now in 3NF:
- No transitive dependencies remain
- Each non-key attribute depends only on its primary key

---

### 7.4 Normalization Summary | ملخص التطبيع

| Normal Form | Requirement | Status (Book Example) |
|-------------|-------------|----------------------|
| **1NF** | Atomic values, no repeating groups | ✅ Pass |
| **2NF** | No partial dependencies | ✅ Pass (simple key) |
| **3NF** | No transitive dependencies | ❌ Fail → Decomposed |

**Key Insight:** Normalization progressively eliminates data anomalies by ensuring each fact is stored in exactly one place.

---

## Summary of Concepts Demonstrated | ملخص المفاهيم المعروضة

| Category (EN) | الفئة (AR) | Concepts Covered |
|---------------|------------|------------------|
| **Schema Design** | تصميم المخطط | 5 entities, composite keys, junction tables |
| **ER Modeling** | نمذجة الكيانات | One-to-many, many-to-many relationships |
| **Relational Model** | النموذج العلائقي | Normalized tables, PK/FK constraints |
| **SQL DDL/DML** | تعريف/تعديل البيانات | CREATE, INSERT, UPDATE, DELETE |
| **SQL Queries** | الاستعلامات | SELECT, JOIN, GROUP BY, aggregation |
| **Relational Algebra** | الجبر العلائقي | Projection (Π), Selection (σ) |
| **Normalization** | التطبيع | 1NF, 2NF, 3NF analysis and decomposition |

---

## File References | المراجع

| Source File | Content Extracted |
|-------------|-------------------|
| `SQLQuery1.sql` | All SQL queries (7 statements) |
| `Bait _IIS101_S24_HW.pdf` | Project requirements, entity definitions |
| `السؤال الأول والثاني والثالث.docx` | Relational algebra operations, normalization analysis |
| `Entity Relationship Diagram.png` | ER diagram structure |
| `Relational Model.png` | Relational schema visualization |

---

*Generated from Collection 1 materials — SQL Database Design and Implementation.*
*تم الإنشاء من مواد المجموعة الأولى — تصميم وتنفيذ قاعدة البيانات.*
