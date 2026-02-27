import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../src/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const dir = path.resolve(__dirname, "../db/migrations");
  const files = (await fs.readdir(dir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const f of files) {
    const full = path.join(dir, f);
    const sql = await fs.readFile(full, "utf8");
    console.log(`[migrate] apply ${f}`);
    await pool.query(sql);
  }

  console.log("[migrate] done");
  await pool.end();
}

main().catch(async (err) => {
  console.error(err);
  try {
    await pool.end();
  } catch {}
  process.exit(1);
});