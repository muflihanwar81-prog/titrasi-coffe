"use client";

import { useTransition, useState } from "react";
import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import { aksiHapusProduk } from "@/app/admin/actions";

export default function TabelProduk({ daftarProduk = [] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState(null);
  const [errorHapus, setErrorHapus] = useState(null);

  // Periksa apakah kolom stok atau varian tersedia pada setidaknya satu produk
  const adaStok = daftarProduk.some((p) => p.stok !== undefined && p.stok !== null);
  const adaVarian = daftarProduk.some((p) => p.varian);

  function handleHapus(id, nama) {
    const konfirmasi = window.confirm(`Apakah Anda yakin ingin menghapus produk "${nama}"? Aksi ini tidak dapat dibatalkan.`);
    if (!konfirmasi) return;

    setErrorHapus(null);
    setDeletingId(id);
    startTransition(async () => {
      const res = await aksiHapusProduk(id);
      if (res?.error) {
        setErrorHapus(res.error);
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {errorHapus && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorHapus}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-garis">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-permukaan text-teks-lembut">
            <tr>
              <th className="px-4 py-3 font-semibold">Produk</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Harga</th>
              {adaStok && <th className="px-4 py-3 font-semibold">Stok</th>}
              {adaVarian && <th className="px-4 py-3 font-semibold">Varian</th>}
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarProduk.map((produk) => (
              <tr key={produk.id} className="border-t border-garis hover:bg-permukaan/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={produk.foto_url || "/produk/kopi.svg"}
                      alt=""
                      className="h-10 w-10 rounded-md border border-garis bg-permukaan object-cover"
                    />
                    <span className="font-semibold text-teks">{produk.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-teks-lembut">{produk.kategori || "-"}</td>
                <td className="px-4 py-3 font-medium">{formatRupiah(produk.harga)}</td>
                {adaStok && (
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        (produk.stok ?? 0) > 0
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {produk.stok ?? 0}
                    </span>
                  </td>
                )}
                {adaVarian && (
                  <td className="px-4 py-3 text-xs text-teks-lembut max-w-[150px] truncate">
                    {produk.varian || "-"}
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis">
                      Ubah
                    </Tombol>
                    <Tombol
                      type="button"
                      varian="bahaya"
                      disabled={isPending && deletingId === produk.id}
                      onClick={() => handleHapus(produk.id, produk.nama)}
                    >
                      {isPending && deletingId === produk.id ? "Menghapus…" : "Hapus"}
                    </Tombol>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
