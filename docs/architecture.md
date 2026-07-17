# SIIV ERP Management System

## Vision

SIIV ERP is a desktop-first Enterprise Resource Planning (ERP) system built for small and medium businesses.

The application is designed using a modular architecture so that new business modules can be added without restructuring the project.

Primary Platform:

- Desktop (Tauri)

Future Platforms:

- Mobile Application
- Web Portal (Optional)

Backend:

- Node.js

Database:

- PostgreSQL

Frontend:

- React
- TypeScript
- Tailwind CSS

---

# Architecture Principles

1. Feature-based architecture
2. Modular business domains
3. Strong TypeScript typing
4. Separation of concerns
5. Reusable UI components
6. Service layer for business logic
7. Backend-independent frontend
8. Scalable permission system

---

# Core Modules

## Foundation

- Authentication
- Company Management
- User Management
- Settings

## Business

- Product Management
- Customer Management
- Supplier Management
- Purchase Management
- Sales & Invoice Management
- Inventory Management

## Finance

- Expenses
- Payments
- Tax
- Reports

## Administration

- Audit Logs
- Backup & Restore
- License
- Activity Monitoring

---

# User Roles

- Super Admin
- Admin

Future:

- Manager
- Sales Executive
- Accountant
- Store Manager

---

# Development Rules

- Business logic must remain inside services.
- Pages orchestrate application flow.
- Components only render UI.
- Every feature owns its own folder.
- UI components must come from SIIV UI whenever possible.
- New modules must follow the established feature structure.

---

# Long-Term Goal

Build a production-ready ERP platform that can support multiple businesses, future mobile applications, and backend services without major architectural changes.
