import { Router } from "express";
import { pool } from "../db.js";

export const projectsRouter = Router();

// GET /api/projects?category=engineering&status=active
projectsRouter.get("/", async (req, res) => {
  const category = (req.query.category as string | undefined) ?? null;
  const status = (req.query.status as string | undefined) ?? null;

  const { rows } = await pool.query(
    `
    SELECT slug, title, summary, tech_stack, repo_url, live_url, category, status
    FROM projects
    WHERE ($1::text IS NULL OR category = $1)
      AND ($2::text IS NULL OR status = $2)
    ORDER BY category, status, slug
    `,
    [category, status]
  );

  res.json({ projects: rows });
});

// GET /api/projects/:slug
projectsRouter.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const { rows } = await pool.query(
    `SELECT * FROM projects WHERE slug = $1 LIMIT 1`,
    [slug]
  );

  const project = rows[0];
  if (!project) return res.status(404).json({ error: "Not found" });

  res.json({ project });
});