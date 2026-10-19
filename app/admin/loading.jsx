import NavAdmin from "@/components/NavAdmin";

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 py-8 animate-pulse">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="h-8 w-32 rounded-lg bg-permukaan"></div>
        <div className="h-10 w-36 rounded-lg bg-permukaan"></div>
      </div>
      <div className="h-64 rounded-2xl border border-garis bg-permukaan/50"></div>
    </div>
  );
}

