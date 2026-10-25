"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function FilterKatalog({ daftarKategori = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const qAwal = searchParams.get("q") || "";
  const kategoriAwal = searchParams.get("kategori") || "";

  const [q, setQ] = useState(qAwal);
  const [kategori, setKategori] = useState(kategoriAwal);

  const adaFilterAktif = Boolean(qAwal || kategoriAwal);

  function terapkanFilter(queryBaru, kategoriBaru) {
    const params = new URLSearchParams();
    if (queryBaru && queryBaru.trim()) {
      params.set("q", queryBaru.trim());
    }
    if (kategoriBaru && kategoriBaru.trim()) {
      params.set("kategori", kategoriBaru.trim());
    }

    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `/?${queryString}` : "/");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    terapkanFilter(q, kategori);
  }

  function handlePilihKategori(kat) {
    const nilaiBaru = kategori === kat ? "" : kat;
    setKategori(nilaiBaru);
    terapkanFilter(q, nilaiBaru);
  }

  function handleReset() {
    setQ("");
    setKategori("");
    startTransition(() => {
      router.push("/");
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-garis bg-permukaan/40 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-teks-lembut">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari menu (Espresso, Latte, Matcha, dll)..."
            className="w-full rounded-xl border border-garis bg-latar/80 pl-10 pr-3.5 py-2.5 text-sm text-teks placeholder:text-teks-lembut/70 focus:border-utama focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-utama px-4 py-2 text-sm font-semibold text-white hover:bg-utama-gelap disabled:opacity-50 transition-colors"
        >
          {isPending ? "Mencari…" : "Cari"}
        </button>

        {adaFilterAktif && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg border border-garis bg-latar px-3 py-2 text-sm font-semibold text-teks-lembut hover:text-bahaya hover:border-bahaya transition-colors"
          >
            Reset
          </button>
        )}
      </form>

      {daftarKategori.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-teks-lembut mr-1">Kategori:</span>
          <button
            type="button"
            onClick={() => handlePilihKategori("")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              !kategori
                ? "bg-utama text-white"
                : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
            }`}
          >
            Semua
          </button>
          {daftarKategori.map((kat) => (
            <button
              key={kat}
              type="button"
              onClick={() => handlePilihKategori(kat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                kategori === kat
                  ? "bg-utama text-white"
                  : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

