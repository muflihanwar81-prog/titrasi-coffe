import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-garis/80 bg-latar/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-utama text-white shadow-lg shadow-utama/25 transition-transform group-hover:scale-105">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 21h18v-2H2v2zm2-4h14l1-7H3l1 7zm15-9H3V6h16v2zm-1-4H4V2h14v2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-teks transition-colors group-hover:text-utama">
              {toko.nama}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-teks-lembut uppercase">
              Specialty Coffee
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${toko.nomorWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-utama/40 bg-utama/10 px-3.5 py-1.5 text-xs font-bold text-utama transition-all hover:bg-utama hover:text-white"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Hubungi Kami</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
