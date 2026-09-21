# Planning Todos — Phase 2 Scaffolding & Implementation Roadmap

> **Prasyarat Phase 1:** `PRD.md`, `design.md`, `architecture.md` ini sudah dibaca. Jangan mulai coding sebelum checklist §0 hijau.
> **Batas demo:** 180 menit. Roadmap diurut agar potongan yang dinilai asesor (form + tabel) hidup sedini mungkin.
> **Aturan:** hanya file di bawah yang dibuat di Phase 2. Phase 1 tidak menyentuh selain `docs/*.md`.

---

## 0. Gate kesiapan (5 menit)

- [ ] `docs/PRD.md`, `design.md`, `architecture.md` dibaca + asumsi harga/tanggal/breakfast disetujui (atau diubah di PRD dulu).
- [ ] `design-references/main-references.png` dibuka berdampingan saat styling.
- [ ] Benchmark `umkm-catering-system` siap dibuka: `frontend/package.json`, `frontend/src/*`, `frontend/components.json`, `docs/architecture.md` (pola Ky + Query + shadcn radix-maia).
- [ ] Toolchain lokal: Node 20+, PHP 8.2+, Composer, SQLite3 extension. Cek: `node -v && php -v && composer -v && sqlite3 --version`.
- [ ] Port 5173 & 8000 bebas.

## 1. Scaffold backend Laravel API (30 menit)

- [ ] `composer create-project laravel/laravel:^12 backend --no-interaction` (atau `laravel new` bila installer ada).
- [ ] `.env`: `DB_CONNECTION=sqlite`, `DB_DATABASE=<abs>/backend/database/database.sqlite`, `FRONTEND_URL=http://localhost:5173`; `touch database/database.sqlite`.
- [ ] `config/cors.php`: paths `api/*`, origins dari `FRONTEND_URL`.
- [ ] Model + migrasi + seeder (lihat architecture §2.2): `RoomType`, `HotelProfile`, `Booking`; `RoomTypeSeeder` (500rb/800rb/1,2jt), `HotelProfileSeeder`.
- [ ] `php artisan migrate --seed` hingga `sqlite3 database/database.sqlite ".tables"` menunjukkan ketiganya.
- [ ] `BookingPriceCalculator` service + `StoreBookingRequest` (regex NIK + pesan verbatim) + `BookingController` + `RoomTypeController` + `HotelProfileController` + `BookingResource`.
- [ ] `routes/api.php` prefix `v1` (6 endpoint architecture §2.5).
- [ ] Verifikasi: `php artisan serve --port=8000` lalu `curl localhost:8000/api/v1/room-types` → 3 baris; POST booking dummy durasi 4 + breakfast → total 2.960.000 untuk Deluxe (cek rumus).
- [ ] Tulis `backend/docs/api-collection.md` (salin tabel architecture + contoh JSON). Opsional: `openapi.json` minimal.

## 2. Scaffold frontend Vite React (25 menit)

- [ ] `npm create vite@latest frontend -- --template react-ts && cd frontend && npm i` (jangan install sebelum langkah ini).
- [ ] Deps inti (kunci dari benchmark): `react-router ky @tanstack/react-query @tanstack/react-form zod zustand gsap @gsap/react date-fns sonner`.
- [ ] Styling: `tailwindcss @tailwindcss/vite clsx tailwind-merge class-variance-authority`; Fontsource `playfair-display` + `plus-jakarta-sans`; Hugeicons `@hugeicons/react`.
- [ ] `components.json` (tirukan benchmark: style `radix-maia`, `cssVariables:true`, base olive, alias `@/*`, ui `@/components/ui`) lalu `npx shadcn@latest init` + add: `button card form input select radio-group checkbox table tabs accordion dialog calendar popover badge avatar sonner`.
- [ ] `vite.config.ts`: plugin tailwind + alias `@` + proxy `/api → :8000` (cadangan bila env salah).
- [ ] `.env.example`: `VITE_API_URL=http://localhost:8000/api/v1`.
- [ ] `src/index.css`: tempel `@theme` forest dari design.md §3 + base cream/ink + grain utility.
- [ ] Struktur folder architecture §3.2 (`router api services hooks store lib types components pages`).
- [ ] Verifikasi: `npm run dev` → :5173 hidup; `npm run typecheck` hijau (abaikan `lint:design` bila `impeccable` belum terinstal).

## 3. Jalur kritis booking dulu (40 menit — nilai asesmen)

- [ ] `lib/validation.ts` (Zod verbatim), `lib/pricing.ts` (preview + `toISODate` + `formatIDR` + `formatTanggalID`), `types/index.ts`.
- [ ] `api/client.ts` (Ky) + `services/*` + `hooks/useRoomTypes/useBookings/useCreateBooking`.
- [ ] `store/bookingDraft.ts`: `{roomType, durasi, breakfast, total, totalTerhitung}`.
- [ ] `BookingForm.tsx`: semua field PRD §4 + Harga auto + Hitung (preview) + Simpan (disabled hingga hitung) + error inline verbatim.
- [ ] `BookingTable.tsx`: kolom PRD §FR-05 + format `dd/MM/yyyy` + empty state.
- [ ] `pages/Booking.tsx`: form + summary + tabel; route `/pesan`.
- [ ] Demo check: NIK 5 digit → `isian salah..data harus 16 digit`; durasi `abc` → `harus isi angka`; Deluxe×4+breakfast → 2.960.000 → tersimpan & tampil.

## 4. Halaman publik + tema Forest (45 menit)

- [ ] Layout: `Navbar` (floating pill + sheet mobile) + `Footer` forest-950.
- [ ] `Home`: hero forest + headline serif + CTA + play dialog + 3 RoomCards overlap + feature 4 kolom + OfferBanner (diskon 10%) + FAQ + Gallery tabs.
- [ ] `Rooms` + `Pricing` + `About` (tabel harga dari API + fallback seed; kontak dari API + fallback).
- [ ] Aset lokal: kompres foto ≤300KB, video ≤8MB + poster; `alt` + `loading=lazy`.
- [ ] Motion: satu timeline hero GSAP + fade-up section + hover kartu (transform-only); hormati reduced-motion.
- [ ] Kontras: jalankan `python .agents/skills/antislop-human/contrast-check.py` (atau cek manual 4.5:1) untuk body/CTA.

## 5. Integrasi, hardening demo, docs (20 menit)

- [ ] E2E klik-through PRD §8 (7 langkah) di 375/768/1280 tanpa scroll-x.
- [ ] Putus backend sesaat → pastikan fallback seed + cache Query tampil + banner offline (NFR).
- [ ] `npm run build && npm run preview` + `php artisan serve` paralel, uji ulang POST.
- [ ] Catat sumber aset di bawah (lisensi) + update `README` root (struktur folder + cara jalanin 2 server).
- [ ] Commit: `feat: bnsp hotel mvp (frontend+backend+docs)` — di luar Phase 1.

## 6. Urutan eksekusi yang disarankan (bila waktu <180 menit)

1. §1 → §3 (form + tabel hidup = sudah dinilai) → §2 minimal → §4 seperlunya → §5.
2. Potong yang boleh dipotong: galeri tab → grid statis; video → 1 video hero saja (tetap 1 per tipe bila sempat); `openapi.json` → tunda.
3. Jangan dipotong: pesan error verbatim, tombol Hitung, rumus diskon/breakfast, tabel kolom lengkap, 3 foto kamar.

## 7. Risiko Phase 2 + respons cepat

| Gejala | Respons |
|---|---|
| CORS  blocked | Samakan `FRONTEND_URL` + restart `artisan serve` |
| Harga 0 / NaN | `roomTypes` belum load → disable Hitung hingga `isSuccess` atau fallback seed |
| Tanggal invalid | Lewatkan `toISODate`; tampilkan error "Tanggal pesan tidak valid" |
| SQLite locked | Satu proses tulis; jangan buka 2 seeder paralel |
| Port bentrok | `vite --port 5174` + sesuaikan proxy, atau kill proses lama |

---

### Sumber aset (isi saat Phase 2)

| File | Sumber | Lisensi |
|---|---|---|
| `assets/images/hero-forest.jpg` | … | … |
| `assets/images/rooms/standard-1.jpg` dst. | … | … |
| `assets/videos/*.mp4` | … | … |
| `assets/logo/rh-mark.svg` | brandkit monogram (dibuat lokal, bukan stok) | milik sendiri |

### Definition of Done Phase 2

- [ ] 7 langkah PRD §8 lolos di laptop bersih (clone + 2 perintah serve).
- [ ] Tidak ada error console; build produksi hijau.
- [ ] `docs/` tetap sinkron bila ada perubahan rumus/harga.
