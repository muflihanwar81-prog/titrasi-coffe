// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Porsche 911 GT3 RS (992)",
    harga: 2100000000,
    deskripsi:
      "Supercar lintasan legendaris dengan mesin 4.0L Flat-6 Naturally Aspirated 525 PS, akselerasi 0-100 km/j dalam 3.2 detik, aero package aktif dengan DRS, dan transmisi 7-speed PDK.",
    foto_url: "/produk/porsche-gt3-rs.jpg",
    kategori: "Supercar",
  },
  {
    id: 2,
    nama: "Ferrari SF90 Stradale Assetto",
    harga: 2050000000,
    deskripsi:
      "PHEV Supercar tercanggih Maranello dengan kombinasi 4.0L V8 Twin-Turbo dan 3 motor listrik bertenaga 1.000 CV. Sistem AWD e-4WD, akselerasi 0-100 km/j hanya 2.5 detik.",
    foto_url: "/produk/ferrari-sf90.jpg",
    kategori: "Hypercar",
  },
  {
    id: 3,
    nama: "Lamborghini Huracán Tecnica V10",
    harga: 1980000000,
    deskripsi:
      "Performa murni mesin 5.2L V10 Naturally Aspirated 640 CV dengan Rear-Wheel Drive dan Rear-Wheel Steering. Suara knalpot buas khas Sant'Agata Bolognese.",
    foto_url: "/produk/lamborghini-huracan.jpg",
    kategori: "Supercar",
  },
  {
    id: 4,
    nama: "McLaren 750S Coupe Carbon",
    harga: 1850000000,
    deskripsi:
      "Monokok serat karbon ultra-ringan dengan mesin 4.0L Twin-Turbo V8 bertenaga 750 PS. Akselerasi 0-100 km/j hanya 2.8 detik dan Proactive Chassis Control III.",
    foto_url: "/produk/mclaren-750s.jpg",
    kategori: "Supercar",
  },
  {
    id: 5,
    nama: "Aston Martin Vantage V8 Coupe",
    harga: 1450000000,
    deskripsi:
      "Grand Tourer performa tinggi dengan siluet aerodinamis khas Inggris. Mesin 4.0L Twin-Turbo V8 bertenaga 665 PS dan interior bespoke hand-stitched leather.",
    foto_url: "/produk/aston-martin-vantage.jpg",
    kategori: "Grand Tourer",
  },
  {
    id: 6,
    nama: "Nissan GT-R Nismo Special Edition",
    harga: 1250000000,
    deskripsi:
      "The legendary Godzilla racikan resmi Nismo. Mesin hand-crafted 3.8L Twin-Turbo V6 VR38DETT 600 PS, carbon fiber clear-coat bonnet, dan rem Brembo karbon keramik.",
    foto_url: "/produk/nissan-gtr-nismo.jpg",
    kategori: "Sport Coupe",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
