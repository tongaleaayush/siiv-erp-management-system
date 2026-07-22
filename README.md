# SIIV ERP Management System

## Overview

SIIV ERP Management System is a modern, modular, and scalable Enterprise Resource Planning (ERP) application designed primarily as a **Desktop Application** with future support for **Mobile Applications** using the same backend APIs.

The application is being developed with a production-grade architecture that emphasizes modularity, reusability, scalability, and maintainability. Every component and service is designed to be reusable so that new business modules can be added with minimal effort.

---

# Technology Stack

## Desktop Application

- Tauri 2
- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Backend

- Flask
- RESTful APIs
- SQLAlchemy
- Alembic
- JWT Authentication

## Database

- PostgreSQL

---

# Planned Modules

- Authentication
- Dashboard
- Customer Management
- Product Management
- Category Management
- Supplier Management
- Invoice Management
- Inventory Management
- Purchase Management
- Sales Management
- Staff Management
- Attendance
- Payroll
- CRM
- Project Management
- Analytics
- Reports
- Settings

---

# Current Features

## Authentication

- Login Page
- Protected Routes
- Authentication Context
- Role-based architecture (Foundation)

---

## Dashboard

- Responsive Dashboard Layout
- Sidebar Navigation
- Header
- User Profile Section

---

## Customer Management

### Customer Listing

- Customer Table
- Search
- Sorting
- Status Filter
- Pagination
- Customer Status Badges

### Customer Operations

- Add Customer
- Edit Customer
- View Customer
- Delete Customer

### Customer Form

- Form Validation
- Auto Customer Code Generation
- Postal Code Lookup
- Reusable Form Components

---

## Reusable UI Components

- Button
- Input
- Dialog
- Dropdown
- Pagination
- Data Table
- Data Table Toolbar
- Status Badge

---

## Export System

A reusable export architecture has been implemented.

### Supported

- CSV Export

### Planned

- Excel Export
- PDF Export

### Features

- Native Windows Save Dialog
- Reusable Export Service
- Strategy-based Export Architecture
- Dynamic File Name Generation

---

## Native Desktop Features

Implemented using Tauri plugins.

- Native Save Dialog
- Native File System Access
- Desktop File Saving

---

# Project Architecture

```
src
│
├── components
│   ├── common
│   ├── layout
│   └── ui
│
├── contexts
│
├── features
│   ├── auth
│   ├── customers
│   └── dashboard
│
├── hooks
│
├── layouts
│
├── routes
│
├── services
│   ├── export
│   ├── file
│   └── mock
│
├── types
│
└── utils
```

---

# Export Architecture

```
ExportButton
        │
        ▼
Dropdown
        │
        ▼
Export Service
        │
        ▼
CSV Exporter
        │
        ▼
File Save Service
        │
        ▼
Native Windows Save Dialog
```

---

# Design Principles

- Modular Architecture
- Reusable Components
- Production-grade Folder Structure
- Separation of Concerns
- Service Layer Architecture
- Future-proof Design
- Type Safety
- Responsive UI
- Clean Code
- Maintainability
- Scalability

---

# Current Project Status

## Completed

### Foundation

- Project Setup
- Routing
- Authentication Structure
- Main Layout
- Sidebar
- Header

### Customer Module

- Customer CRUD
- Search
- Sorting
- Filtering
- Pagination
- Validation
- Mock Services

### UI Library

- Button
- Input
- Dialog
- Dropdown
- Pagination
- Data Table
- Toolbar

### Export System

- CSV Export
- Native File Saving
- Save Dialog Integration

---

# In Progress

- Backend Development (Flask REST API)
- Database Design
- Authentication APIs

---

# Upcoming Development

- Excel Export
- PDF Export
- Product Management
- Inventory Management
- Invoice Management
- Purchase Module
- Sales Module
- Reports
- Analytics
- Mobile Application

---

# Development Philosophy

This project is being developed incrementally, following production-grade software engineering practices.

Each feature is designed to be:

- Reusable
- Modular
- Testable
- Maintainable
- Scalable

The long-term goal is to build a complete ERP ecosystem capable of serving small and medium-sized businesses while supporting both desktop and mobile platforms through a shared backend API.
