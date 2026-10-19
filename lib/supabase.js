import { createClient } from "@supabase/supabase-js";

/**
 * Klien Supabase untuk dipakai di sisi server saja
 * (Server Component, Server Action, Route Handler).
 * Jangan impor file ini dari komponen "use client".
 */
function bersihkanUrl(url) {
  if (!url) return "";
  return url.trim().replace(/^["']|["']$/g, "").replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

function bersihkanKey(key) {
  if (!key) return "";
  return key.trim().replace(/^["']|["']$/g, "");
}

export function buatSupabaseServer() {
  return createClient(
    bersihkanUrl(process.env.SUPABASE_URL),
    bersihkanKey(process.env.SUPABASE_SECRET_KEY)
  );
}

