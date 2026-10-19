import Link from "next/link";
import { notFound } from "next/navigation";
import OpsiPesanProduk from "@/components/OpsiPesanProduk";
import { formatRupiah } from "@/lib/format";
import { buatSupabaseServer } from "@/lib/supabase";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;

  const supabase = buatSupabaseServer();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !produk) {
    notFound();
  }

  return (
    <article className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-garis bg-slate-950 shadow-2xl">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-slate-950/80 px-3.5 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md">
          {produk.kategori}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-teks-lembut hover:text-utama transition-colors"
        >
          <span>←</span> Kembali ke Showroom
        </Link>

        <div>
          <span className="text-xs font-black uppercase tracking-wider text-utama">
            {produk.kategori}
          </span>
          <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight sm:text-4xl text-teks">
            {produk.nama}
          </h1>
        </div>

        <div className="rounded-xl border border-garis bg-permukaan/50 p-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-teks-lembut">
            Harga On The Road Batam (FTZ Exemption)
          </span>
          <p className="mt-1 text-2xl sm:text-3xl font-black text-harga">
            {formatRupiah(produk.harga)}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teks-lembut mb-2">
            Deskripsi &amp; Spesifikasi Unit
          </h2>
          <p className="max-w-prose text-sm leading-relaxed text-teks-lembut sm:text-base">
            {produk.deskripsi}
          </p>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-2 gap-2 text-xs font-medium text-teks-lembut pt-1">
          <div className="flex items-center gap-2 rounded-lg border border-garis/60 bg-permukaan/30 px-3 py-2">
            <span className="text-utama font-bold">✓</span> Unit Baru / Mulus
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-garis/60 bg-permukaan/30 px-3 py-2">
            <span className="text-utama font-bold">✓</span> Dokumen Lengkap
          </div>
        </div>

        <OpsiPesanProduk produk={produk} />
      </div>
    </article>
  );
}
