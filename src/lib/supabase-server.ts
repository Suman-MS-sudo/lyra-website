/**
 * Minimal server-only client for the Lyra monitoring database (Supabase, shared with lyra-app-v3).
 * Talks to PostgREST directly with the service-role key, so it must never be imported client-side.
 *
 * Env: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.
 */

const url = () => (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const key = () => (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

export function supabaseConfigured(): boolean {
  return Boolean(url() && key());
}

export class SupabaseError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<T> {
  if (!supabaseConfigured()) throw new SupabaseError("Supabase is not configured", 503);
  const { prefer, headers, ...rest } = init;
  const res = await fetch(`${url()}/rest/v1/${path}`, {
    ...rest,
    cache: "no-store",
    headers: {
      apikey: key(),
      Authorization: `Bearer ${key()}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...headers,
    },
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const b = (body ?? {}) as { message?: string; code?: string };
    throw new SupabaseError(b.message || `Supabase ${res.status}`, res.status, b.code);
  }
  return body as T;
}

/** GET rows. `query` is a PostgREST query string, e.g. "select=*&rental_code=eq.X". */
export function select<T>(table: string, query: string): Promise<T[]> {
  return call<T[]>(`${table}?${query}`);
}

/** INSERT rows; with `onConflict`, existing rows are left alone (idempotent). Returns the rows actually inserted. */
export function insert<T>(table: string, rows: object | object[], opts: { onConflict?: string } = {}): Promise<T[]> {
  const q = opts.onConflict ? `?on_conflict=${encodeURIComponent(opts.onConflict)}` : "";
  return call<T[]>(`${table}${q}`, {
    method: "POST",
    body: JSON.stringify(rows),
    prefer: `return=representation${opts.onConflict ? ",resolution=ignore-duplicates" : ""}`,
  });
}

/** PATCH rows matching `query`. */
export function update<T>(table: string, query: string, patch: object): Promise<T[]> {
  return call<T[]>(`${table}?${query}`, { method: "PATCH", body: JSON.stringify(patch), prefer: "return=representation" });
}

/** Call a Postgres function. */
export function rpc<T>(fn: string, args: object): Promise<T> {
  return call<T>(`rpc/${fn}`, { method: "POST", body: JSON.stringify(args) });
}

export const eq = (v: string | number) => `eq.${encodeURIComponent(String(v))}`;
