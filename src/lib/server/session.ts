// Signed-cookie sessions with no dependency: an HMAC over the payload, httpOnly, 7 days.
// Import only from server code (Server Components, Server Actions, Route Handlers, proxy.ts).
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type Session = { userId: string; expiresAt: number };

const COOKIE = "session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
// Development without SESSION_SECRET gets a per-process key (sessions end on restart);
// production refuses to start signing without a real one.
const devSecret = randomBytes(32).toString("hex");

function secret(): string {
  const configured = process.env.SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV !== "production") return devSecret;
  throw new Error("SESSION_SECRET is not set (32+ characters). Set it on the deployment and redeploy.");
}

function sign(body: string): string {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

export function encodeSession(session: Session): string {
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string | undefined): Session | null {
  const [body, mac] = token?.split(".") ?? [];
  if (!body || !mac) return null;
  const expected = Buffer.from(sign(body));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const session = JSON.parse(Buffer.from(body, "base64url").toString()) as Session;
  return session.expiresAt > Date.now() ? session : null;
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  (await cookies()).set(COOKIE, encodeSession({ userId, expiresAt }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<Session | null> {
  return decodeSession((await cookies()).get(COOKIE)?.value);
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export const SESSION_COOKIE = COOKIE;
