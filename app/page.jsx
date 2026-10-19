import KartuProduk from "@/components/KartuProduk";
import FilterKatalog from "@/components/FilterKatalog";
import { toko } from "@/lib/toko";
import { buatSupabaseServer } from "@/lib/supabase";

export default async function HalamanKatalog({ searchParams }) {
  const { q = "", kategori = "" } = (await searchParams) || {};

  const supabase = buatSupabaseServer();
  const { data: semuaProduk, error } = await supabase
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  // Ekstrak semua kategori unik yang ada di database
  const daftarKategori = Array.from(
    new Set((semuaProduk || []).map((p) => p.kategori).filter(Boolean))
  );

  // Terapkan filter pencarian nama dan filter kategori
  const kataKunci = q.trim().toLowerCase();
  const produkTersaring = (semuaProduk || []).filter((p) => {
    const cocokNama = kataKunci ? p.nama?.toLowerCase().includes(kataKunci) : true;
    const cocokKategori = kategori ? p.kategori === kategori : true;
    return cocokNama && cocokKategori;
  });

  return (
    <>
      {/* Hero Showcase */}
      <section className="relative py-10 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-utama/30 bg-utama/10 px-3 py-1 text-xs font-bold text-utama mb-4">
          <span className="h-2 w-2 rounded-full bg-utama animate-pulse" />
          EXCLUSIVE SUPERCAR SHOWROOM &bull; BATAM
        </div>

        <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl text-teks">
          Koleksi Mobil Sport & <span className="text-utama">Supercar Eksklusif</span> di Batam.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-teks-lembut sm:text-lg">
          {toko.tagline}
        </p>

        {/* Feature Badges */}
        <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-semibold text-teks-lembut">
          <div className="flex items-center gap-2 rounded-xl border border-garis bg-permukaan/50 px-3.5 py-2">
            <span className="text-utama font-bold">✓</span> Unit Terawat &amp; Siap Kirim
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-garis bg-permukaan/50 px-3.5 py-2">
            <span className="text-utama font-bold">✓</span> Harga Khusus FTZ Batam
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-garis bg-permukaan/50 px-3.5 py-2">
            <span className="text-utama font-bold">✓</span> Test Drive &amp; Konsultasi WhatsApp
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-teks-lembut">
          <svg className="h-4 w-4 text-utama" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toko.jamBuka} &bull; {toko.alamat}</span>
        </div>
      </section>

      {/* Catalog Listing */}
      <section aria-labelledby="judul-produk" className="flex flex-col gap-6 pb-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-garis/60 pb-3">
            <div>
              <h2 id="judul-produk" className="text-xl font-black text-teks sm:text-2xl">
                Unit Tersedia di Showroom
              </h2>
              <p className="text-xs text-teks-lembut">Pilihan supercar &amp; mobil sport siap dipesan</p>
            </div>
            <span className="rounded-full border border-garis bg-permukaan/60 px-3 py-1 text-xs font-bold text-teks-lembut">
              {produkTersaring.length} Unit
            </span>
          </div>

          <FilterKatalog daftarKategori={daftarKategori} />
        </div>

        {error ? (
          <p className="rounded-lg bg-red-950/40 border border-red-500/30 px-4 py-3 text-sm text-red-300">
            Gagal memuat produk: {error.message}
          </p>
        ) : semuaProduk?.length === 0 ? (
          <p className="text-teks-lembut">Belum ada unit mobil tersedia.</p>
        ) : produkTersaring.length === 0 ? (
          <div className="rounded-2xl border border-garis bg-permukaan/30 p-10 text-center">
            <p className="font-bold text-teks">Tidak ada unit mobil yang cocok</p>
            <p className="mt-1 text-sm text-teks-lembut">
              Coba gunakan kata kunci pencarian atau kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produkTersaring.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

