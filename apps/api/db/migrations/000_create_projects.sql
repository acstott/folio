CREATE TABLE IF NOT EXISTS projects (
  id           BIGSERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,

  title        TEXT NOT NULL,
  summary      TEXT NOT NULL,

  problem      TEXT NOT NULL,
  solution     TEXT NOT NULL,

  tech_stack   TEXT[] NOT NULL DEFAULT '{}',

  repo_url     TEXT NULL,
  live_url     TEXT NULL,

  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);