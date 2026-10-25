// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Espresso Doppio",
    harga: 25000,
    deskripsi:
      "Double shot espresso dengan biji Arabika single-origin Gayo yang di-roast medium-dark. Rasa bold dengan aroma cokelat dan sedikit sentuhan caramel di aftertaste.",
    foto_url: "/produk/espresso-doppio.jpg",
    kategori: "Espresso Based",
  },
  {
    id: 2,
    nama: "Caffè Latte",
    harga: 30000,
    deskripsi:
      "Perpaduan harmonis espresso shot dengan steamed milk dan thin layer microfoam. Creamy, lembut, dan cocok untuk penikmat kopi yang menyukai rasa ringan.",
    foto_url: "/produk/caffe-latte.jpg",
    kategori: "Espresso Based",
  },
  {
    id: 3,
    nama: "Cappuccino",
    harga: 30000,
    deskripsi:
      "Komposisi klasik 1/3 espresso, 1/3 steamed milk, dan 1/3 foam tebal. Disajikan dengan latte art dan taburan bubuk cokelat di atasnya.",
    foto_url: "/produk/cappuccino.jpg",
    kategori: "Espresso Based",
  },
  {
    id: 4,
    nama: "V60 Pour Over",
    harga: 35000,
    deskripsi:
      "Manual brew dengan metode Hario V60 menggunakan biji single-origin pilihan. Menyajikan karakter rasa kopi yang bersih, cerah, dan kompleks.",
    foto_url: "/produk/v60-pour-over.jpg",
    kategori: "Manual Brew",
  },
  {
    id: 5,
    nama: "Matcha Latte",
    harga: 32000,
    deskripsi:
      "Bubuk matcha ceremonial grade Uji, Jepang, dipadukan dengan steamed milk. Rasa earthy yang lembut dengan sedikit manis alami dan warna hijau vibrant.",
    foto_url: "/produk/matcha-latte.jpg",
    kategori: "Non-Coffee",
  },
  {
    id: 6,
    nama: "Croissant Butter",
    harga: 28000,
    deskripsi:
      "Croissant renyah berlapis-lapis dengan French butter premium. Dipanggang fresh setiap hari hingga golden brown dan flaky sempurna.",
    foto_url: "/produk/croissant-butter.jpg",
    kategori: "Snack",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
