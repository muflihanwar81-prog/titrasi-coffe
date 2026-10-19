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

  const adaFilter = Boolean(q || kategori);

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="judul-produk" className="text-xl font-bold">
              Produk kami
            </h2>
            <span className="text-xs text-teks-lembut">
              {produkTersaring.length} produk ditampilkan
            </span>
          </div>

          <FilterKatalog daftarKategori={daftarKategori} />
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Gagal memuat produk: {error.message}
          </p>
        ) : semuaProduk?.length === 0 ? (
          <p className="text-teks-lembut">Belum ada produk.</p>
        ) : produkTersaring.length === 0 ? (
          <div className="rounded-2xl border border-garis bg-permukaan/30 p-8 text-center">
            <p className="font-semibold text-teks">Tidak ada produk yang cocok</p>
            <p className="mt-1 text-sm text-teks-lembut">
              Coba gunakan kata kunci pencarian atau kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {produkTersaring.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

