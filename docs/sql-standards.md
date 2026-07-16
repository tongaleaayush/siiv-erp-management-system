# SQL Coding Standards

## General

- Use uppercase SQL keywords.
- Use lowercase snake_case for identifiers.
- Use singular schema names.
- Use plural table names.
- Use singular column names.

---

## File Naming

Examples:

001_create_schemas.sql

002_create_companies_table.sql

003_create_users_table.sql

---

## Transactions

Every SQL script must begin with:

BEGIN;

and end with:

COMMIT;

---

## Constraint Naming

Primary Key

pk\_<table>

Foreign Key

fk*<table>*<referenced_table>

Unique Constraint

uq*<table>*<column>

Check Constraint

chk*<table>*<column>

---

## Index Naming

idx*<table>*<column>

---

## Trigger Naming

trg*<table>*<purpose>

---

## Function Naming

fn\_<purpose>

---

## Comments

Every SQL file must include:

- Script Name
- Purpose
- Author
- Date (optional)
