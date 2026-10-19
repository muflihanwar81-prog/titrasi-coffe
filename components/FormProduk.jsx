"use client";

import { useActionState, useState, useTransition } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { aksiBuatDeskripsiAI } from "@/app/admin/actions";

export default function FormProduk({ action, produk = {}, labelTombol = "Simpan produk" }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [loadingAI, startAITransition] = useTransition();
  const [pesanAI, setPesanAI] = useState(null);

  function handleBuatDeskripsiAI() {
    if (!nama.trim()) {
      setPesanAI({ error: "Isi nama produk terlebih dahulu sebelum membuat deskripsi AI." });
      return;
    }

    setPesanAI(null);
    startAITransition(async () => {
      const res = await aksiBuatDeskripsiAI({ nama, kategori });
      if (res?.error) {
        setPesanAI({ error: res.error });
      } else if (res?.deskripsi) {
        setDeskripsi(res.deskripsi);
        setPesanAI({ sukses: "Deskripsi berhasil dibuat dengan AI! Anda dapat menyesuaikannya sebelum menyimpan." });
      }
    });
  }

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Contoh: Kopi Robusta Premium"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Harga (Rp)"
          name="harga"
          type="number"
          min="0"
          defaultValue={produk.harga ?? ""}
          placeholder="Contoh: 35000"
          required
        />
        <Input
          label="Stok produk"
          name="stok"
          type="number"
          min="0"
          defaultValue={produk.stok ?? 10}
          placeholder="Contoh: 10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Kategori"
          name="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          placeholder="Contoh: Minuman, Camilan"
        />
        <Input
          label="Varian produk (pisahkan koma)"
          name="varian"
          defaultValue={produk.varian || ""}
          placeholder="Contoh: Panas, Dingin"
        />
      </div>

      <Input
        label="Link foto"
        name="foto_url"
        placeholder="/produk/kopi.svg atau https://..."
        defaultValue={produk.foto_url || ""}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-teks">Deskripsi</label>
          <button
            type="button"
            disabled={loadingAI}
            onClick={handleBuatDeskripsiAI}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-utama hover:text-utama-gelap disabled:opacity-50"
          >
            {loadingAI ? (
              <span>✨ Sedang menyusun deskripsi…</span>
            ) : (
              <span>✨ Buat deskripsi dengan AI</span>
            )}
          </button>
        </div>

        {pesanAI?.error && (
          <p className="text-xs text-red-600">{pesanAI.error}</p>
        )}
        {pesanAI?.sukses && (
          <p className="text-xs text-emerald-700">{pesanAI.sukses}</p>
        )}

        <textarea
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Jelaskan keunggulan dan spesifikasi produk Anda..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      <div className="mt-2 flex gap-3">
        <Tombol type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
