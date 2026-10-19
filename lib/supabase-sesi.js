import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Klien Supabase berbasis sesi (cookie) untuk admin.
 * Dipakai di Server Component, Server Action, dan Route Handler.
 * Jangan impor dari komponen "use client".
 */
function bersihkanUrl(url) {
  if (!url) return "";
  return url.trim().replace(/^["']|["']$/g, "").replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

function bersihkanKey(key) {
  if (!key) return "";
  return key.trim().replace(/^["']|["']$/g, "");
}

export async function buatSupabaseSesi() {
  const cookieStore = await cookies();

  return createServerClient(
    bersihkanUrl(process.env.SUPABASE_URL),
    bersihkanKey(process.env.SUPABASE_PUBLISHABLE_KEY),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

