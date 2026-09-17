import { migrate } from "./db";
import { hashPassword, verifyPassword } from "./password";

const SCHEMA = `CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);`;

export async function createUser(email: string, password: string): Promise<string | null> {
  const users = migrate("users", SCHEMA);
  if (users.prepare("SELECT id FROM users WHERE email = ?").get(email)) return null;
  const id = crypto.randomUUID();
  users.prepare("INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)").run(id, email, await hashPassword(password), Date.now());
  return id;
}

export async function authenticate(email: string, password: string): Promise<string | null> {
  const row = migrate("users", SCHEMA).prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email);
  if (!row || !(await verifyPassword(password, String(row.password_hash)))) return null;
  return String(row.id);
}

export function findUser(id: string): { email: string } | null {
  const row = migrate("users", SCHEMA).prepare("SELECT email FROM users WHERE id = ?").get(id);
  return row ? { email: String(row.email) } : null;
}
