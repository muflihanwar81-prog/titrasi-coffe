"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/format";
import { toko } from "@/lib/toko";

export default function OpsiPesanProduk({ produk }) {
  // Parse varian jika ada (dipisahkan koma)
  const daftarVarian = produk.varian
    ? produk.varian
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

  const [varianDipilih, setVarianDipilih] = useState(daftarVarian[0] || "");
  const [jumlah, setJumlah] = useState(1);

  const adaStok = produk.stok !== undefined && produk.stok !== null;
  const stokTersedia = adaStok ? Number(produk.stok) : 99;
  const habis = adaStok && stokTersedia <= 0;

  function ubahJumlah(nilaiBaru) {
    if (habis) return;
    const angka = parseInt(nilaiBaru, 10);
    if (isNaN(angka) || angka < 1) {
      setJumlah(1);
    } else if (angka > stokTersedia) {
      setJumlah(stokTersedia);
    } else {
      setJumlah(angka);
    }
  }

  const subtotal = (produk.harga || 0) * jumlah;

  // Susun pesan WhatsApp otomatis
  const varianTeks = varianDipilih ? ` (Varian: ${varianDipilih})` : "";
  const pesan = `Halo Showroom ${toko.nama}, saya tertarik dengan unit *${produk.nama}*${varianTeks} seharga ${formatRupiah(subtotal)}. Mohon info ketersediaan unit dan jadwal konsultasi / test drive.`;
  const urlWhatsApp = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-garis bg-permukaan/30 p-5">
      {/* Pilihan varian jika produk memiliki varian */}
      {daftarVarian.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-teks">Pilih Varian:</label>
          <div className="flex flex-wrap gap-2">
            {daftarVarian.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVarianDipilih(v)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  varianDipilih === v
                    ? "bg-utama text-white"
                    : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pilihan jumlah dan stok */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-teks">Jumlah Unit:</label>
          {adaStok && (
            <span
              className={`text-xs font-semibold ${
                habis ? "text-bahaya" : "text-teks-lembut"
              }`}
            >
              {habis ? "Stok habis" : `Tersedia: ${stokTersedia}`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-garis bg-latar">
            <button
              type="button"
              disabled={jumlah <= 1 || habis}
              onClick={() => ubahJumlah(jumlah - 1)}
              className="px-3.5 py-2 font-bold text-teks-lembut hover:text-utama disabled:opacity-30"
              aria-label="Kurangi jumlah"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={stokTersedia}
              value={jumlah}
              disabled={habis}
              onChange={(e) => ubahJumlah(e.target.value)}
              className="w-14 text-center font-semibold text-teks focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              disabled={jumlah >= stokTersedia || habis}
              onClick={() => ubahJumlah(jumlah + 1)}
              className="px-3.5 py-2 font-bold text-teks-lembut hover:text-utama disabled:opacity-30"
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>

          <div className="ml-auto text-right">
            <span className="block text-xs text-teks-lembut">Subtotal:</span>
            <span className="text-lg font-bold text-harga">
              {formatRupiah(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Pesan via WhatsApp */}
      {habis ? (
        <button
          type="button"
          disabled
          className="inline-flex w-full items-center justify-center rounded-lg bg-gray-300 px-5 py-3 font-semibold text-gray-500 cursor-not-allowed"
        >
          Stok Sedang Habis
        </button>
      ) : (
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-utama px-5 py-3.5 font-bold text-white shadow-lg shadow-utama/25 hover:bg-utama-gelap transition-all"
        >
          <span>💬</span>
          <span>Konsultasi &amp; Pesan via WhatsApp</span>
        </a>
      )}
    </div>
  );
}

