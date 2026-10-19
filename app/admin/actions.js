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

export async function aksiTambahProduk(prevState, formData) {
  const supabase = await buatSupabaseSesi();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const nama = formData.get("nama")?.trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.trim() || null;
  const foto_url = formData.get("foto_url")?.trim() || "/produk/kopi.svg";
  const deskripsi = formData.get("deskripsi")?.trim() || null;
  const stokStr = formData.get("stok");
  const varian = formData.get("varian")?.trim() || null;

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka dan minimal 0." };
  }

  const stok = stokStr !== null && stokStr !== "" ? parseInt(stokStr, 10) : 10;
  if (isNaN(stok) || stok < 0) {
    return { error: "Stok harus berupa angka dan minimal 0." };
  }

  // Coba simpan dengan kolom stok dan varian
  const dataInsertLengkap = {
    nama,
    harga,
    kategori,
    foto_url,
    deskripsi,
    stok,
    varian,
  };

  let { error } = await supabase.from("produk").insert(dataInsertLengkap);

  // Jika gagal karena kolom stok/varian belum ditambahkan di database Supabase, fallback ke kolom standar
  if (error && error.message && error.message.includes("column")) {
    const dataInsertStandar = {
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    };
    const hasilFallback = await supabase.from("produk").insert(dataInsertStandar);
    error = hasilFallback.error;
  }

  if (error) {
    return { error: "Gagal menambah produk: " + error.message };
  }

  redirect("/admin");
}

export async function aksiUbahProduk(prevState, formData) {
  const supabase = await buatSupabaseSesi();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const id = formData.get("id");
  const nama = formData.get("nama")?.trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.trim() || null;
  const foto_url = formData.get("foto_url")?.trim() || "/produk/kopi.svg";
  const deskripsi = formData.get("deskripsi")?.trim() || null;
  const stokStr = formData.get("stok");
  const varian = formData.get("varian")?.trim() || null;

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka dan minimal 0." };
  }

  const stok = stokStr !== null && stokStr !== "" ? parseInt(stokStr, 10) : 10;
  if (isNaN(stok) || stok < 0) {
    return { error: "Stok harus berupa angka dan minimal 0." };
  }

  const dataUpdateLengkap = {
    nama,
    harga,
    kategori,
    foto_url,
    deskripsi,
    stok,
    varian,
  };

  let { error } = await supabase.from("produk").update(dataUpdateLengkap).eq("id", id);

  if (error && error.message && error.message.includes("column")) {
    const dataUpdateStandar = {
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    };
    const hasilFallback = await supabase.from("produk").update(dataUpdateStandar).eq("id", id);
    error = hasilFallback.error;
  }

  if (error) {
    return { error: "Gagal mengubah produk: " + error.message };
  }

  redirect("/admin");
}

export async function aksiHapusProduk(id) {
  const supabase = await buatSupabaseSesi();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    return { error: "Gagal menghapus produk: " + error.message };
  }

  redirect("/admin");
}

export async function aksiBuatDeskripsiAI({ nama, kategori }) {
  const supabase = await buatSupabaseSesi();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Akses ditolak: Anda harus login sebagai admin." };
  }

  if (!nama || !nama.trim()) {
    return { error: "Nama produk harus diisi terlebih dahulu untuk membuat deskripsi AI." };
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim().replace(/^["']|["']$/g, "");

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `Anda adalah asisten pembuat deskripsi produk untuk UMKM Indonesia.
Buatkan satu paragraf deskripsi produk (2-3 kalimat, sekitar 30-50 kata) yang menarik, menjual, dan sopan dalam bahasa Indonesia.
Data produk:
- Nama Produk: ${nama}
- Kategori: ${kategori || "Umum"}

Petunjuk:
- Jangan mengarang spesifikasi teknis palsu atau klaim berlebihan.
- Fokus pada kualitas produk, keunggulan, dan kepuasan pelanggan.
- Langsung keluarkan teks deskripsi saja tanpa tanda kutip atau format judul.`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const hasil = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (hasil) {
          return { deskripsi: hasil };
        }
      }
    } catch (err) {
      console.warn("Gagal memanggil Gemini API:", err.message);
    }
  }

  // Fallback deskripsi berbasis template bahasa Indonesia yang kontekstual dan natural
  const kategoriTeks = kategori ? `kategori ${kategori}` : "kualitas pilihan";
  const fallbackDeskripsi = `${nama} merupakan produk unggulan ${kategoriTeks} yang dibuat dengan teliti untuk memberikan pengalaman terbaik bagi Anda. Pilihan tepat untuk kebutuhan sehari-hari dengan cita rasa dan mutu terjamin. Siap dipesan dengan pelayanan cepat dan ramah.`;

  return { deskripsi: fallbackDeskripsi };
}
