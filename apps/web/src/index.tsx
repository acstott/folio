import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type ProjectListItem = {
  slug: string;
  title: string;
  summary: string;
  tech_stack: string[] | null;
  repo_url: string | null;
  live_url: string | null;
  category: string;
  status: string;
};

type ProjectDetail = ProjectListItem & {
  problem: string;
  solution: string;
};

function App() {
  const [health, setHealth] = React.useState("checking...");
  const [projects, setProjects] = React.useState<ProjectListItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const [detail, setDetail] = React.useState<ProjectDetail | null>(null);
  const [detailLoading, setDetailLoading] = React.useState(false);

  // Track hash changes (#slug)
  React.useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.replace(/^#/, "").trim();
      setSelectedSlug(slug ? slug : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Health + list
  React.useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/health");
        const d: { ok: boolean } = await r.json();
        setHealth(d.ok ? "API OK ✅" : "API not ok ❌");
      } catch {
        setHealth("API unreachable ❌");
      }

      try {
        const r = await fetch("/api/projects");
        const d: { projects: ProjectListItem[] } = await r.json();
        setProjects(d.projects ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Detail fetch
  React.useEffect(() => {
    if (!selectedSlug) {
      setDetail(null);
      return;
    }

    setDetailLoading(true);
    (async () => {
      try {
        const r = await fetch(`/api/projects/${encodeURIComponent(selectedSlug)}`);
        if (!r.ok) {
          setDetail(null);
          return;
        }
        const d: { project: ProjectDetail } = await r.json();
        setDetail(d.project);
      } finally {
        setDetailLoading(false);
      }
    })();
  }, [selectedSlug]);

  // Simple formatting (keeps your $$ blocks readable without adding libs yet)
  const renderBlock = (text: string) =>
    text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));

  const back = () => {
    window.location.hash = "";
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Amanda Stott — Portfolio</h1>
          <p className="sub">React (Webpack) + Express + Postgres</p>
          <p className="sub">Backend health: {health}</p>
        </div>

        {selectedSlug ? (
          <button className="btn" onClick={back}>
            ← Back to projects
          </button>
        ) : null}
      </header>

      <main>
        {!selectedSlug ? (
          loading ? (
            <p>Loading projects…</p>
          ) : (
            <div className="grid">
              {projects.map((p) => (
                <article key={p.slug} className="card">
                  <div className="card-top">
                    <span className="badge">{p.category}</span>
                    <span className="badge">{p.status}</span>
                  </div>

                  <h2 className="card-title">{p.title}</h2>
                  <p className="card-summary">{p.summary}</p>

                  <div className="chips">
                    {(p.tech_stack ?? []).slice(0, 10).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="links">
                    <a className="link" href={`#${p.slug}`}>
                      Details →
                    </a>
                    {p.repo_url ? (
                      <a className="link" href={p.repo_url} target="_blank" rel="noreferrer">
                        Repo
                      </a>
                    ) : null}
                    {p.live_url ? (
                      <a className="link" href={p.live_url} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )
        ) : detailLoading ? (
          <p>Loading project…</p>
        ) : !detail ? (
          <div className="card">
            <h2 className="card-title">Not found</h2>
            <p className="card-summary">No project exists for slug: {selectedSlug}</p>
          </div>
        ) : (
          <article className="detail">
            <div className="detail-top">
              <span className="badge">{detail.category}</span>
              <span className="badge">{detail.status}</span>
            </div>

            <h2 className="detail-title">{detail.title}</h2>
            <p className="detail-summary">{detail.summary}</p>

            <section className="detail-section">
              <h3>Problem / Context</h3>
              <div className="detail-text">{renderBlock(detail.problem)}</div>
            </section>

            <section className="detail-section">
              <h3>Solution</h3>
              <div className="detail-text">{renderBlock(detail.solution)}</div>
            </section>

            <section className="detail-section">
              <h3>Tech stack</h3>
              <div className="chips">
                {(detail.tech_stack ?? []).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </article>
        )}
      </main>
    </div>
  );
}

const el = document.getElementById("root");
if (!el) throw new Error("Root element #root not found");
createRoot(el).render(<App />);