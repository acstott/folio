ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'engineering';

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);