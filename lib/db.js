import { Pool } from "pg";

// Single shared Postgres pool (Supabase connection string). Reused across
// hot reloads in dev to avoid exhausting connections.
const globalForPg = globalThis;

export const pool =
  globalForPg._pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForPg._pgPool = pool;

// Small query helper.
export async function q(text, params) {
  const res = await pool.query(text, params);
  return res.rows;
}

