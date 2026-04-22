# Performance Improvements

Dokumentasi singkat perubahan performa yang sudah diterapkan di project ini.

## Perubahan yang diterapkan

- Mengoptimalkan gambar dengan `next/image` untuk mengaktifkan image optimization bawaan Next.js.
- Menambahkan whitelist domain eksternal di `next.config.js` agar gambar CDN dapat dimuat tanpa error runtime.
- Menerapkan `next/font` untuk memuat font secara optimal dan mengurangi layout shift.
- Menerapkan `dynamic import` pada komponen `Navbar` agar komponen tersebut dimuat secara lazy.
- Menambahkan Google Analytics menggunakan `next/script` dengan strategi `afterInteractive` supaya tidak menghambat render awal.

## Dampak yang diharapkan

- First load lebih ringan karena komponen tertentu tidak langsung dimuat.
- Penggunaan gambar lebih efisien karena sudah melalui pipeline optimasi Next.js.
- Layout lebih stabil karena font dioptimalkan oleh Next.js.

## Lighthouse Screenshot

Tambahkan hasil screenshot Lighthouse di bagian ini setelah menjalankan audit di browser.

![Lighthouse Screenshot](./screenshots/lighthouse-performance.png)

## Catatan

Jika file screenshot belum ada, simpan hasil audit ke:

- `docs/screenshots/lighthouse-performance.png`

Lalu update link di atas agar sesuai dengan file yang sudah disimpan.
