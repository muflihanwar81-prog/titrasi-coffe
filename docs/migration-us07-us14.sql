-- ========================================================
-- Migrasi Tambahan untuk US-07 s.d. US-14
-- Cara pakai: Supabase Dashboard > SQL Editor > New query > tempel > Run
-- ========================================================

-- 1. Tambah kolom stok (default 10)
alter table public.produk 
add column if not exists stok integer default 10 check (stok >= 0);

-- 2. Tambah kolom varian (contoh: "Original, Pedas, Extra Pedas" atau "250g, 500g")
alter table public.produk 
add column if not exists varian text default '';

-- 3. Perbarui contoh data awal agar memiliki stok dan varian (opsional)
update public.produk set stok = 25, varian = 'Bubuk Halus, Biji Utuh' where nama like '%Kopi%';
update public.produk set stok = 15, varian = 'Pedas, Manis' where nama like '%Keripik%';
update public.produk set stok = 30, varian = 'Sedang, Sangat Pedas' where nama like '%Sambal%';
update public.produk set stok = 10, varian = 'Toples 250g, Toples 500g' where nama like '%Nastar%';
update public.produk set stok = 8, varian = 'Natural, Cokelat' where nama like '%Tas%';
update public.produk set stok = 12, varian = '2 meter, 2.5 meter' where nama like '%Batik%';
