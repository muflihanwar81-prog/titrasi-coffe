// Service Worker untuk Katalog UMKM (US-13)
const CACHE_NAME = "katalog-umkm-v1";

// Daftar aset publik yang aman di-cache
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Install event: cache aset utama
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: bersihkan cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: tangani permintaan
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // KEAMANAN (PENTING): Jangan pernah cache rute admin atau otorisasi
  // Lindungi data privat dari cache
  if (
    url.pathname.startsWith("/admin") ||
    request.method !== "GET" ||
    url.hostname.includes("supabase.co")
  ) {
    return; // Biarkan browser menangani langsung via jaringan tanpa cache
  }

  // Untuk aset statis (gambar, icons, styles, fonts)
  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/produk/") ||
    url.pathname.includes("_next/static")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Untuk navigasi halaman publik: Network-first dengan fallback ke cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});
