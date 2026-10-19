import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

function bersihkanUrl(url) {
  if (!url) return "";
  return url.trim().replace(/^["']|["']$/g, "").replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

function bersihkanKey(key) {
  if (!key) return "";
  return key.trim().replace(/^["']|["']$/g, "");
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Biarkan /admin/login lewat tanpa pemeriksaan
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Semua rute /admin lainnya wajib login
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();

    const supabase = createServerClient(
      bersihkanUrl(process.env.SUPABASE_URL),
      bersihkanKey(process.env.SUPABASE_PUBLISHABLE_KEY),
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Gunakan getUser() bukan getSession() untuk keamanan server
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

