// SQLite through node's built-in driver: persistence with no dependency and no service.
// The file lives in DATA_DIR (default ./.data); mount that path as a volume in production
// or every redeploy starts from an empty database.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

let connection: DatabaseSync | undefined;

export function db(): DatabaseSync {
  if (connection) return connection;
  const dir = process.env.DATA_DIR ?? join(process.cwd(), ".data");
  mkdirSync(dir, { recursive: true });
  connection = new DatabaseSync(join(dir, "app.db"));
  connection.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  return connection;
}

/** Run idempotent schema statements (`CREATE TABLE IF NOT EXISTS ...`) once per process. */
const migrated = new Set<string>();
export function migrate(name: string, sql: string): DatabaseSync {
  const database = db();
  if (!migrated.has(name)) {
    database.exec(sql);
    migrated.add(name);
  }
  return database;
}
