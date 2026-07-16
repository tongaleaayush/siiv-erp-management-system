-- =====================================================
-- SIIV ERP Management System
-- Script: 001_create_schemas.sql
-- Purpose: Create all application schemas
-- =====================================================

BEGIN;

CREATE SCHEMA IF NOT EXISTS master;
CREATE SCHEMA IF NOT EXISTS sales;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS hr;
CREATE SCHEMA IF NOT EXISTS crm;
CREATE SCHEMA IF NOT EXISTS project;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS system;

COMMIT;