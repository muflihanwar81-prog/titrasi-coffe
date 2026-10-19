"use client";

import { useEffect } from "react";

export default function PwaRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol === "https:" || window.location.hostname === "localhost") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("PWA Service Worker terdaftar dengan scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("PWA Service Worker gagal didaftarkan:", err);
        });
    }
  }, []);

  return null;
}
