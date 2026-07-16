-- =====================================================
-- SIIV ERP Management System
-- Script: 002_create_companies_table.sql
-- Purpose: Create the master.companies table
-- =====================================================

BEGIN;

CREATE TABLE IF NOT EXISTS master.companies
(
    id BIGSERIAL NOT NULL,

CONSTRAINT pk_companies
    PRIMARY KEY (id),

    company_code        VARCHAR(20) NOT NULL,
    company_name        VARCHAR(255) NOT NULL,

    gst_number          VARCHAR(20),
    pan_number          VARCHAR(20),

    email               VARCHAR(255),
    phone               VARCHAR(20),
    website             VARCHAR(255),

    address_line_1      VARCHAR(255),
    address_line_2      VARCHAR(255),
    city                VARCHAR(100),
    state               VARCHAR(100),
    country             VARCHAR(100),
    postal_code         VARCHAR(20),

    logo_path           VARCHAR(500),

    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by          BIGINT,
    updated_by          BIGINT,

    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted          BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at          TIMESTAMPTZ,

    version             INTEGER NOT NULL DEFAULT 1,
    row_status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT uq_companies_company_code
        UNIQUE (company_code),

    CONSTRAINT uq_companies_gst_number
        UNIQUE (gst_number)
);

COMMIT;