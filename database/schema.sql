CREATE TABLE IF NOT EXISTS service_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  phone TEXT NOT NULL CHECK (length(trim(phone)) > 0),
  email TEXT NOT NULL CHECK (length(trim(email)) > 0),
  service TEXT NOT NULL CHECK (length(trim(service)) > 0),
  preferred_date DATE,
  preferred_time TIME,
  message TEXT,
  emergency BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS service_requests_created_at_idx
  ON service_requests (created_at);

CREATE INDEX IF NOT EXISTS service_requests_status_idx
  ON service_requests (status);

CREATE INDEX IF NOT EXISTS service_requests_emergency_idx
  ON service_requests (emergency);

CREATE TABLE IF NOT EXISTS administrators (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE administrators ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;