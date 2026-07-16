-- =====================================================
-- SIIV ERP Management System
-- Script: 001_trg_companies_set_updated_at.sql
-- Purpose: Automatically update updated_at for companies
-- =====================================================

BEGIN;

DROP TRIGGER IF EXISTS trg_companies_set_updated_at
ON master.companies;

CREATE TRIGGER trg_companies_set_updated_at
BEFORE UPDATE
ON master.companies
FOR EACH ROW
EXECUTE FUNCTION system.fn_set_updated_at();

COMMIT;