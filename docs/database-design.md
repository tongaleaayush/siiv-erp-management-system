# SIIV ERP Management System

# PostgreSQL Database Design

---

## Database Information

| Item                      | Value                   |
| ------------------------- | ----------------------- |
| Database Name             | siiv_erp                |
| Database Engine           | PostgreSQL              |
| Architecture              | Modular                 |
| Design Standard           | Third Normal Form (3NF) |
| Soft Delete               | Yes                     |
| Audit Logging             | Yes                     |
| UUID Support              | Planned                 |
| Multi Company Support     | Planned                 |
| Future Mobile App Support | Yes                     |

---

# ERP Modules

## Core System

- Authentication
- Users
- Roles
- Permissions
- Company
- Settings
- Audit Logs

---

## Customer Management

- Customers
- Customer Contacts
- Customer Addresses

---

## Product Management

- Products
- Product Categories
- Product Units
- HSN Codes
- Tax Configuration

---

## Invoice Management

- Quotations
- Sales Orders
- Invoices
- Invoice Items
- Payments

---

## Inventory Management

- Warehouses
- Stock
- Stock Transactions
- Purchase Orders
- Suppliers
- Goods Receipt

---

## Staff Management

- Employees
- Departments
- Designations

---

## Attendance

- Attendance
- Leave
- Holidays
- Shift Management

---

## Payroll

- Salary Structure
- Payroll
- Payslips
- Allowances
- Deductions

---

## CRM

- Leads
- Opportunities
- Follow Ups
- Activities

---

## Project Management

- Projects
- Tasks
- Milestones
- Time Tracking

---

## Analytics

- Dashboards
- Reports
- KPI
- Business Intelligence

---

# Common Standards

Every table in the database will contain standard columns for:

- Primary Key
- Created Date
- Updated Date
- Created By
- Updated By
- Is Active
- Is Deleted
- Deleted At

This ensures consistency across every module.

---

# Database Schemas

The SIIV ERP database will be divided into logical schemas instead of placing every table inside the default `public` schema.

## 1. master

Stores all master data.

Tables planned:

- companies
- branches
- customers
- customer_contacts
- customer_addresses
- suppliers
- supplier_contacts
- product_categories
- products
- units
- tax_rates
- hsn_codes

---

## 2. sales

Stores all sales transactions.

Tables planned:

- quotations
- quotation_items
- sales_orders
- sales_order_items
- invoices
- invoice_items
- payments

---

## 3. inventory

Stores inventory information.

Tables planned:

- warehouses
- stock
- stock_transactions
- purchase_orders
- purchase_order_items
- goods_receipts

---

## 4. hr

Stores employee information.

Tables planned:

- employees
- departments
- designations
- attendance
- leave_requests
- holidays
- shifts
- payroll
- payslips

---

## 5. crm

Stores customer relationship management data.

Tables planned:

- leads
- opportunities
- followups
- activities

---

## 6. project

Stores project management data.

Tables planned:

- projects
- milestones
- tasks
- task_comments
- time_entries

---

## 7. auth

Stores authentication and authorization.

Tables planned:

- users
- roles
- permissions
- role_permissions
- user_roles
- sessions

---

## 8. system

Stores ERP configuration.

Tables planned:

- settings
- audit_logs
- notifications
- file_uploads

---

# Common Table Standard

Every business table in the ERP will follow the same column standard.

| Column     | Data Type                | Description                                   |
| ---------- | ------------------------ | --------------------------------------------- |
| id         | BIGSERIAL                | Primary Key                                   |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation time                          |
| updated_at | TIMESTAMP WITH TIME ZONE | Last update time                              |
| created_by | BIGINT                   | User who created the record                   |
| updated_by | BIGINT                   | User who last updated the record              |
| is_active  | BOOLEAN                  | Indicates whether the record is active        |
| is_deleted | BOOLEAN                  | Soft delete flag                              |
| deleted_at | TIMESTAMP WITH TIME ZONE | Time of soft deletion                         |
| version    | INTEGER                  | Record version for future synchronization     |
| row_status | VARCHAR(20)              | Record status (Active, Draft, Archived, etc.) |

---

## Default Values

- created_at = CURRENT_TIMESTAMP
- updated_at = CURRENT_TIMESTAMP
- is_active = TRUE
- is_deleted = FALSE
- version = 1
- row_status = 'ACTIVE'

---

## Rules

- Every table must have a Primary Key.
- Physical deletion should be avoided for business data.
- Records will normally be soft deleted by setting `is_deleted = TRUE`.
- All timestamps will use the database server time.
- Foreign key columns will use BIGINT unless there is a specific reason to use another type.
- Business tables should include these common columns unless a documented exception exists.

---

# Core Database Relationships

## Company

Company
│
├── Customers
├── Products
├── Warehouses
├── Employees
├── Users
└── Settings

Relationship:

Company (1) --------> (Many) Customers

Company (1) --------> (Many) Products

Company (1) --------> (Many) Employees

Company (1) --------> (Many) Warehouses

---

## Customer

Customer (1)

↓

Customer Contacts (Many)

↓

Customer Addresses (Many)

---

## Product

Category (1)

↓

Products (Many)

↓

Invoice Items (Many)

↓

Stock Transactions (Many)

---

## Invoice

Customer (1)

↓

Invoices (Many)

↓

Invoice Items (Many)

↓

Payments (Many)

---

## User Management

Roles (Many)

↓

Users (Many)

↓

Audit Logs (Many)

---

## Employee

Department (1)

↓

Employees (Many)

↓

Attendance (Many)

↓

Payroll (Many)

---

## Project

Projects (1)

↓

Milestones (Many)

↓

Tasks (Many)

↓

Time Entries (Many)

---

# Relationship Summary

- One Company can have many Customers.
- One Company can have many Products.
- One Customer can have many Contacts.
- One Customer can have many Addresses.
- One Product Category can have many Products.
- One Invoice contains many Invoice Items.
- One Customer can have many Invoices.
- One Invoice can have many Payments.
- One Employee belongs to one Department.
- One Department has many Employees.
- One Project contains many Milestones.
- One Milestone contains many Tasks.
- One Task can have many Time Entries.
- One Role can be assigned to many Users.

---

# Database Indexing Strategy

Indexes will be created only on columns that are frequently searched, filtered, sorted, or used in joins.

## Primary Key Index

Every table will have a Primary Key.

Example:

- id

---

## Foreign Key Indexes

Foreign key columns will also have indexes.

Examples:

- company_id
- customer_id
- product_id
- invoice_id
- employee_id
- role_id

---

## Business Search Indexes

Indexes will be created for commonly searched fields.

Examples:

Customers

- customer_code
- customer_name
- gst_number

Products

- product_code
- product_name
- hsn_code

Invoices

- invoice_number
- invoice_date

Employees

- employee_code
- email

---

## Composite Indexes

Some queries search using multiple columns together.

Examples:

(company_id, customer_name)

(company_id, product_code)

(company_id, invoice_number)

(company_id, invoice_date)

---

## Soft Delete Index

Frequently queried business tables should include an index on:

(is_deleted)

This helps active-record queries perform efficiently.

---

## Unique Indexes

Unique indexes will be used where duplicate values are not allowed.

Examples:

- customer_code
- product_code
- invoice_number
- employee_code
- username
- email

---

## Indexing Rules

- Every Primary Key is indexed.
- Every Foreign Key is indexed.
- Avoid indexing columns that are rarely searched.
- Review indexes periodically as the application grows.

---

# Database Constraints & Data Integrity

The database will enforce data integrity using PostgreSQL constraints.

## Primary Key Constraints

Every table must have a Primary Key.

Example:

- id

---

## Foreign Key Constraints

Foreign Keys ensure that related records always exist.

Examples:

- customer.company_id → companies.id
- invoice.customer_id → customers.id
- invoice_items.invoice_id → invoices.id
- invoice_items.product_id → products.id
- employee.department_id → departments.id

---

## Unique Constraints

The following values must remain unique within a company where applicable:

- customer_code
- product_code
- invoice_number
- employee_code
- username
- email

---

## NOT NULL Constraints

The following columns should normally be mandatory:

Customers

- customer_name
- company_id

Products

- product_name
- unit_id
- category_id

Invoices

- customer_id
- invoice_date

Employees

- employee_name
- department_id

---

## CHECK Constraints

Examples:

Quantity

- Must be greater than 0

Price

- Must be greater than or equal to 0

GST Percentage

- Must be between 0 and 100

Discount Percentage

- Must be between 0 and 100

Email

- Application validation first
- Database validation where practical

---

## DEFAULT Constraints

Examples:

is_active = TRUE

is_deleted = FALSE

created_at = CURRENT_TIMESTAMP

updated_at = CURRENT_TIMESTAMP

version = 1

row_status = 'ACTIVE'

---

## Referential Integrity Rules

Parent records cannot be deleted while dependent business records exist.

Examples:

Customer → Invoices

Product → Invoice Items

Department → Employees

Company → Customers

Instead of deleting business records, the ERP will normally use Soft Delete.

---

# Soft Delete & Audit Strategy

## Soft Delete

Business data should normally never be physically deleted.

Instead, records will be marked as deleted.

Standard columns:

- is_deleted
- deleted_at

Example:

Customer

Before deletion

is_deleted = FALSE

After deletion

is_deleted = TRUE
deleted_at = Current Timestamp

---

## Physical Delete

Physical deletion should only be allowed for:

- Temporary import data
- Test data
- Cache tables
- Development-only records

Business records such as customers, products, invoices, payments, employees, and stock transactions should not be physically deleted.

---

## Audit Logging

The ERP will maintain an audit log for important business operations.

Each audit entry should record:

- Table Name
- Record ID
- Action
- Previous Values
- New Values
- User ID
- Timestamp
- IP Address (future)
- Device Information (future)

---

## Audit Actions

Examples:

CREATE

UPDATE

DELETE (Soft Delete)

RESTORE

LOGIN

LOGOUT

PASSWORD CHANGE

---

## Audit Rules

Audit logs should be immutable.

Users should not edit audit records.

Audit logs should be retained according to business and legal requirements.

---

## Recovery

Soft deleted records can be restored by setting:

is_deleted = FALSE

deleted_at = NULL

This allows accidental deletions to be reversed without losing business data.

---

# Database Naming Conventions

## General Rules

- Use lowercase letters only.
- Use snake_case for names.
- Avoid spaces and special characters.
- Use meaningful names.
- Do not abbreviate unless commonly accepted.

---

## Table Names

Use plural nouns.

Examples:

- companies
- branches
- customers
- customer_contacts
- products
- invoices
- invoice_items
- employees

---

## Column Names

Use snake_case.

Examples:

- company_id
- customer_name
- invoice_number
- created_at
- updated_at
- is_deleted

---

## Primary Keys

Every table uses:

- id

---

## Foreign Keys

Use:

<referenced_table_singular>\_id

Examples:

- company_id
- customer_id
- product_id
- invoice_id
- employee_id
- role_id

---

## Constraint Naming

Primary Key

pk\_<table_name>

Example:

pk_customers

Foreign Key

fk*<table_name>*<referenced_table>

Example:

fk_invoices_customers

Unique Constraint

uq*<table_name>*<column>

Example:

uq_customers_customer_code

Check Constraint

chk*<table_name>*<column>

Example:

chk_products_price

---

## Index Naming

idx*<table_name>*<column>

Examples:

idx_customers_customer_name

idx_products_product_code

idx_invoices_invoice_date

---

## View Naming

vw\_<name>

Example:

vw_sales_summary

---

## Function Naming

fn\_<name>

Example:

fn_calculate_invoice_total

---

## Trigger Naming

trg*<table_name>*<action>

Examples:

trg_customers_audit

trg_products_update_timestamp
