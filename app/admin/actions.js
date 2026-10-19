"use server";

import { redirect } from "next/navigation";
import { buatSupabaseSesi } from "@/lib/supabase-sesi";

export async function aksiLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await buatSupabaseSesi();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function aksiKeluar() {
  const supabase = await buatSupabaseSesi();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function aksiGantiPassword(prevState, formData) {
  const passwordBaru = formData.get("password_baru");
  const konfirmasi = formData.get("konfirmasi_password");

  if (passwordBaru !== konfirmasi) {
    return { error: "Password baru dan konfirmasi tidak cocok." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }

  const supabase = await buatSupabaseSesi();

  // Pastikan admin sudah login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    return { error: "Gagal mengganti password: " + error.message };
  }

  return { sukses: "Password berhasil diganti." };
}
