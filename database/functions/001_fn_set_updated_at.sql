-- =====================================================
-- SIIV ERP Management System
-- Script: 001_fn_set_updated_at.sql
-- Purpose: Automatically update the updated_at column
-- =====================================================

BEGIN;

CREATE OR REPLACE FUNCTION system.fn_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

COMMIT;