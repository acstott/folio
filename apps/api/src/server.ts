import express from "express";
import { projectsRouter } from "./routes/projects.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.type("text").send("API is running. Try GET /api/health");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});