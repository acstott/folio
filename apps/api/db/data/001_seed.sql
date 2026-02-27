-- ======================================================
-- 001_seed.sql
-- Portfolio Projects Seed Data
-- Idempotent inserts using ON CONFLICT (slug) DO NOTHING
-- ======================================================

-- ENGINEERING PROJECTS

INSERT INTO projects (
  slug, title, summary, problem, solution,
  tech_stack, repo_url, live_url, category, status
) VALUES

(
  'k8s-identity-platform',
  'Kubernetes Identity Platform (Keycloak + Entra Federation)',
  'Designed and implemented a cloud-native identity and access platform with brokered authentication, claim-to-group mapping, and secure deployment patterns in Kubernetes.',
  'Enterprise identity federation required deterministic claim mapping and secure scope modeling.',
  'Implemented OIDC federation, strict client scope control, deterministic role mapping, and Kubernetes-based deployment with persistent Postgres backing.',
  ARRAY['Kubernetes','Keycloak','Entra ID','OIDC','OAuth2','PostgreSQL','Helm/Helmfile','Terraform','RBAC'],
  NULL,
  NULL,
  'engineering',
  'shipped'
),

(
  'airgapped-rke2-installer',
  'Air-Gapped RKE2 Installer and Mirroring Pipeline',
  'Built an automation-driven, offline Kubernetes installation workflow with artifact mirroring and repeatable provisioning.',
  'Disconnected environments required deterministic artifact bundling and install reproducibility.',
  'Designed an image + chart mirroring pipeline with integrity validation and automated cluster bootstrap.',
  ARRAY['RKE2','Kubernetes','Ansible','Helmfile','Container Registry','Air-gapped','Linux Automation','Supply Chain Integrity'],
  NULL,
  NULL,
  'engineering',
  'active'
),

(
  'aws-cost-analytics',
  'AWS Cost Analytics and Optimization Dashboard',
  'Implemented a cost visibility workflow using AWS cost exports and dashboard aggregation.',
  'Cloud spend required actionable attribution and optimization visibility.',
  'Built ingestion + aggregation workflows with TypeScript analysis and decision-ready dashboards.',
  ARRAY['AWS','Cost & Usage Data','TypeScript','Data Pipelines','Dashboarding','Optimization','S3','FinOps'],
  NULL,
  NULL,
  'engineering',
  'active'
)

ON CONFLICT (slug) DO NOTHING;


-- RESEARCH PROJECTS

INSERT INTO projects (
  slug, title, summary, problem, solution,
  tech_stack, repo_url, live_url, category, status
) VALUES

(
  'doodle-legends-tcg',
  'Doodle Legends (WIP): Deterministic TCG Engine + UI',
  'Developing a deterministic trading-card game engine with state machine modeling.',
  'Complex turn-based logic required deterministic transitions and type-safe modeling.',
  'Implemented explicit phase transitions, Redux state discipline, and typed card abstractions.',
  ARRAY['TypeScript','React','Redux','Game State Machines','Simulation','UI Architecture'],
  NULL,
  NULL,
  'research',
  'active'
),

(
  'minecraft-ai-systems',
  'WIP: Minecraft AI Behavior Experiments',
  'Experimenting with tick-based AI systems and behavior modeling.',
  'Realtime simulation required bounded performance and predictable update loops.',
  'Separated sensing, decision logic, and world mutation into deterministic phases.',
  ARRAY['Simulation','AI Behaviors','Performance','Tick-based Systems','Automation'],
  NULL,
  NULL,
  'research',
  'active'
)

ON CONFLICT (slug) DO NOTHING;


-- WRITING PROJECTS

INSERT INTO projects (
  slug, title, summary, problem, solution,
  tech_stack, repo_url, live_url, category, status
) VALUES

(
  'security-whitepapers',
  'Technical Writing: Enterprise Security Whitepapers',
  'Authored enterprise-grade identity and security documentation.',
  'Security documentation required clarity across technical and executive audiences.',
  'Produced practitioner-focused guidance with architecture-backed explanations.',
  ARRAY['Security Architecture','Identity Systems','Threat Modeling','Cloud-native','Technical Writing'],
  NULL,
  NULL,
  'writing',
  'shipped'
),

(
  'eccouncil-training',
  'Professional Security Training Content',
  'Developed structured cybersecurity training material.',
  'Security education required actionable, real-world examples.',
  'Built modular curriculum with applied identity and cloud security scenarios.',
  ARRAY['Cybersecurity','Training Development','Identity','Cloud Security','Technical Communication'],
  NULL,
  NULL,
  'writing',
  'shipped'
)

ON CONFLICT (slug) DO NOTHING;
