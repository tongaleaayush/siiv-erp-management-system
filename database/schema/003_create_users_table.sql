-- =====================================================
-- SIIV ERP Management System
-- Script: 003_create_users_table.sql
-- Purpose: Create the auth.users table
-- =====================================================

BEGIN;

CREATE TABLE IF NOT EXISTS auth.users
(
    id                      BIGSERIAL NOT NULL,

    company_id              BIGINT NOT NULL,

    username                VARCHAR(100) NOT NULL,
    password_hash           VARCHAR(255) NOT NULL,

    first_name              VARCHAR(100) NOT NULL,
    last_name               VARCHAR(100),

    email                   VARCHAR(255),
    phone                   VARCHAR(20),

    is_email_verified       BOOLEAN NOT NULL DEFAULT FALSE,

    last_login_at           TIMESTAMPTZ,

    created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by              BIGINT,
    updated_by              BIGINT,

    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    is_deleted              BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at              TIMESTAMPTZ,

    version                 INTEGER NOT NULL DEFAULT 1,
    row_status              VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT pk_users
        PRIMARY KEY (id),

    CONSTRAINT fk_users_company
        FOREIGN KEY (company_id)
        REFERENCES master.companies(id),

    CONSTRAINT uq_users_company_username
    UNIQUE (company_id, username),

    CONSTRAINT uq_users_company_email
    UNIQUE (company_id, email)
);

CREATE INDEX IF NOT EXISTS idx_users_company_id
ON auth.users(company_id);

COMMIT;