import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-garis/80 bg-permukaan/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-teks-lembut sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-teks text-base">{toko.nama}</span>
            <span className="text-[10px] rounded-full border border-utama/30 bg-utama/10 px-2 py-0.5 font-bold text-utama">
              BATAM
            </span>
          </div>
          <p className="text-xs text-teks-lembut">{toko.alamat}</p>
          <p className="text-xs text-teks-lembut">{toko.jamBuka}</p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link
            href="/admin"
            className="rounded-lg border border-garis px-3 py-1.5 text-xs font-semibold text-teks-lembut hover:border-utama hover:text-utama transition-colors"
          >
            Portal Admin
          </Link>
          <p className="text-[11px] text-teks-lembut/70">
            &copy; {new Date().getFullYear()} {toko.nama}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
