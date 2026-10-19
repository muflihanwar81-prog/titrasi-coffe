import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-garis bg-permukaan/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-utama/50 hover:shadow-2xl hover:shadow-utama/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70" />
        <span className="absolute top-2.5 left-2.5 rounded-full border border-white/10 bg-slate-950/75 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md">
          {produk.kategori}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:p-4">
        <div>
          <h3 className="text-sm font-bold leading-snug text-teks transition-colors group-hover:text-utama sm:text-base">
            {produk.nama}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-teks-lembut">
            {produk.deskripsi}
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-garis/60 pt-3">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-teks-lembut">
              Harga Batam FTZ
            </span>
            <p className="text-sm font-black text-harga sm:text-base">
              {formatRupiah(produk.harga)}
            </p>
          </div>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-garis bg-latar text-xs font-bold text-teks-lembut transition-all group-hover:border-utama group-hover:bg-utama group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
