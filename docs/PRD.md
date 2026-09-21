# PRD — BNSP Hotel Booking App ("Rimba Haven")

> **Status:** Phase 1 — Planning only. No code.
> **Source of truth:** `docs/BNSP-Hotel.md` (FR.IA.02 Junior Web Developer, LSP Informatika).
> **Stack:** Frontend Vite + React + TypeScript · Backend Laravel API-only + SQLite.
> **Theme:** Forest Elegant Green, luxury-minimalist, inspired by `design-references/main-references.png` (HAVEN).
> **Timebox konteks asesmen:** 180 menit — PRD ini dirancang agar dapat didemokan end-to-end dalam batas itu.

---

## 1. Ringkasan Produk

Aplikasi pemesanan kamar hotel sederhana, single-tenant, tanpa login pengunjung. Pengunjung melihat produk/kamar, daftar harga, tentang kami, lalu mengisi form pemesanan dengan kalkulasi total otomatis (diskon + breakfast). Data tersimpan di database dan ditampilkan sebagai tabel riwayat pesanan. Setiap tipe kamar dilengkapi foto dan video.

### 1.1 Nama & positioning (dari skill `brandkit`)

- **Nama:** Rimba Haven — Forest Elegant Hotel
- **Filosofi:** "Nature. Comfort. You." — sanctuary where forest meets mindful luxury (diadopsi dari referensi HAVEN, diterjemahkan ke konteks BNSP).
- **Target:** asesi/demo LSP, tamu domestik leisure & business, usia 21–55, memesan via web cepat tanpa akun.
- **Buyer personas:**
  1. **Dina (28, wisatawan):** butuh lihat foto kamar + harga jelas, pesan < 2 menit di HP.
  2. **Budi (41, business traveler):** butuh form valid, struk jelas, durasi 4+ malam (diskon).
  3. **Asesor LSP:** butuh semua field BNSP tervalidasi persis, pesan error persis, tabel hasil persis.
- **Tone of voice:** tenang, presisi, premium-tapi-jelas. Tanpa jargon. Bahasa Indonesia untuk label form (wajib asesmen), Inggris secukupnya untuk hero.

### 1.2 Ruang lingkup asesmen (non-negotiable)

| # | Wajib BNSP | Status PRD |
|---|---|---|
| 1 | Menu Produk: 3 jenis kamar + image | FR-01, FR-06 |
| 2 | Daftar harga dalam tabel | FR-02 |
| 3 | Tentang kami: deskripsi + alamat + telp + email | FR-03 |
| 4 | Form Pesan Kamar persis skenario butir 2a | FR-04 |
| 5 | Validasi NIK 16 digit, pesan `isian salah..data harus 16 digit` | FR-04.3 |
| 6 | Validasi durasi angka, pesan `harus isi angka` | FR-04.7 |
| 7 | Tombol Hitung Total Bayar + aturan diskon 10% (>3 hari) + breakfast 80.000 | FR-04.9 |
| 8 | Simpan ke DB + tampil tabel hasil | FR-05 |
| 9 | Foto + video tiap jenis kamar | FR-06 |

---

## 2. Definisi Tipe Kamar (resolusi inkonsistensi dokumen)

Dokumen BNSP menyebut dua varian penamaan:

- §C.1: "standar, deluxe, executif"
- §C.2a tabel form: "Standar, Deluxe, Family"

**Keputusan (mengikat):** 3 tipe kanonis = `STANDARD`, `DELUXE`, `FAMILY`. Label "Executive" adalah alias display untuk `FAMILY` (suite keluarga). Alasan: validasi form (yang dinilai asesor) memakai Standar/Deluxe/Family; menu Produk tetap memenuhi "3 contoh" apa pun labelnya.

### 2.1 Harga acuan (seed, dapat diubah asesor)

Dokumen asli memotong nilai harga ("Isi nilai tipe kamar : Standar Deluxe Family" tanpa angka). PRD menetapkan seed eksplisit agar kalkulasi dapat diuji:

| Tipe | Harga/malam (IDR) | Kapasitas | Luas |
|---|---|---|---|
| STANDARD | 500.000 | 2 tamu | 24 m² |
| DELUXE | 800.000 | 2 tamu | 36 m² |
| FAMILY (Executive) | 1.200.000 | 4 tamu | 48 m² |

> Harga adalah seed di `room_types` (bukan hardcode frontend). Perubahan harga tidak mengubah rumus.

---

## 3. Navigasi & Halaman

Route publik (React Router, tanpa auth tamu):

| Route | Menu BNSP | Konten |
|---|---|---|
| `/` | Beranda (implisit) | Hero forest + 3 kartu kamar overlap + USP + offer banner + FAQ ringkas + galeri |
| `/kamar` | Produk | Grid 3 kartu kamar + foto + video + CTA Pesan |
| `/harga` | Daftar harga | Tabel harga (tipe, harga/malam, kapasitas, fasilitas) |
| `/tentang` | Tentang kami | Deskripsi, alamat, no. telp, email, peta statis/embed |
| `/pesan` | Pesan kamar | Form BNSP penuh + tabel riwayat di bawahnya |
| `/pesanan` (opsional, digabung ke `/pesan` bila waktu sempit) | Hasil isian | Tabel semua pesanan (sama komponen dengan di `/pesan`) |

> Syarat lolos minimal: keempat menu BNSP dapat diakses dari navbar. `/pesanan` boleh berupa anchor `#riwayat` di `/pesan` — tetap memenuhi "tampilan sebagai berikut".

---

## 4. User Stories + Acceptance Criteria

### FR-01 — Produk / Kamar

**US-01:** Sebagai pengunjung, saya melihat 3 kartu kamar agar bisa memilih.

- AC-01.1: Tiga kartu STANDARD / DELUXE / FAMILY, masing-masing ada foto (min. 1), nama, harga/malam, kapasitas, 3 fasilitas unggulan, CTA "Pesan Sekarang" → `/pesan?tipe=DELUXE`.
- AC-01.2: Tiap kartu/tampilan detail memuat 1 video (boleh embed mp4 lokal `public/videos/*.mp4`, autoplay muted loop atau klik-play).
- AC-01.3: Mobile: stack 1 kolom, gambar 16/10, tanpa overlap negatif.
- **Edge:** gambar gagal load → placeholder forest + alt text tipe kamar; video gagal → poster image tetap tampil.

### FR-02 — Daftar Harga

**US-02:** Sebagai pengunjung, saya melihat tabel harga agar transparan.

- AC-02.1: Tabel kolom: Tipe | Harga/Malam | Kapasitas | Breakfast add-on | Aksi (Pesan).
- AC-02.2: Nilai harga = dari API `GET /api/room-types` (bukan konstanta FE), format `Rp 500.000`.
- AC-02.3: Tabel responsif: scroll-x di <640px, header sticky tidak wajib.
- **Edge:** API gagal → tampil seed harga lokal + badge "offline" (tetap bisa hitung).

### FR-03 — Tentang Kami

**US-03:** Sebagai pengunjung, saya membaca profil + kontak hotel.

- AC-03.1: Menampilkan deskripsi (min. 2 paragraf), alamat jalan lengkap, no. telp (format +62), email.
- AC-03.2: Data kontak tunggal dari API `GET /api/hotel-profile` dengan fallback statis bila API mati.
- Seed: Jl. Rimba Hijau No. 88, Bogor, Jawa Barat · +62-251-888-100 · stay@rimbahaven.id (dapat diganti tanpa migrasi).

### FR-04 — Form Pemesanan (inti asesmen)

Field persis dokumen, label Bahasa Indonesia:

| Field | Tipe UI | Aturan validasi | Pesan error (verbatim) |
|---|---|---|---|
| Nama Pemesan | text | required, min 3, max 100 | "Nama pemesan wajib diisi (min. 3 karakter)" |
| Jenis Kelamin | radio Laki-laki / Perempuan | required | "Pilih jenis kelamin" |
| Nomor Identitas | text inputmode numeric | required, `^\d{16}$` | `isian salah..data harus 16 digit` |
| Tipe Kamar | select | required, enum STANDARD/DELUXE/FAMILY | "Pilih tipe kamar" |
| Harga | number readonly + auto | terisi otomatis dari tipe | — |
| Tanggal Pesan | date (lihat §4.1) | required, tidak boleh masa lalu | "Tanggal pesan tidak valid" |
| Durasi Menginap | number/text | required, integer > 0 | `harus isi angka` bila bukan angka |
| Termasuk Breakfast | checkbox | optional, default off | — |
| Total Bayar | number readonly | via tombol Hitung | — |

**US-04:** Sebagai pengunjung, saya mengisi form dan menekan Hitung Total Bayar lalu Simpan.

- AC-04.1: Memilih Tipe → Harga otomatis terisi (dari API/seed, tanpa reload).
- AC-04.2: NIK `123` atau `ABCD...` → error verbatim `isian salah..data harus 16 digit`, blokir hitung & simpan.
- AC-04.3: Durasi `abc` / kosong / `2.5` → error mengandung `harus isi angka`, blokir hitung & simpan.
- AC-04.4: Tombol **Hitung Total Bayar** menghitung dan mengisi Total Bayar (tidak auto-hitung saat mengetik — wajib klik tombol, sesuai skenario).
- AC-04.5: Tombol **Simpan / Pesan** disabled hingga Total Bayar sudah dihitung & valid (mencegah submit tanpa hitung).
- AC-04.6: Sukses simpan → toast + baris baru muncul di tabel riwayat + form reset kecuali tipe.
- AC-04.7: Semua error tampil inline di bawah field (aria-describedby), bukan hanya alert.

#### 4.1 Tanggal: `dd/mm/yyyy` vs native date

Dokumen minta format `dd/mm/yyyy`. Keputusan: gunakan `<input type="date">` (nilai ISO `yyyy-mm-dd`) untuk keandalan mobile & validasi browser, lalu **tampilkan/format** sebagai `dd/mm/yyyy` di tabel riwayat dan kirim ISO ke API. Ini memenuhi maksud (tanggal valid, terbaca Indonesia) tanpa regex rapuh. Jika asesor mengetik manual `31/12/2026`, field teks alternatif dengan mask `dd/mm/yyyy` tetap diparse (didukung sebagai fallback, lihat architecture §6).

#### 4.2 Rumus Total (mengikat)

```
base      = harga_per_malam * durasi
discount  = (durasi > 3) ? 10% * base : 0
breakfast = checkbox ? 80000 : 0        // flat per pesanan (bukan per malam)
total     = base - discount + breakfast
```

- AC-04.8: durasi 2, Deluxe 800rb, tanpa breakfast → 1.600.000.
- AC-04.9: durasi 4, Deluxe 800rb, tanpa breakfast → 3.200.000 − 320.000 = 2.880.000.
- AC-04.10: durasi 4 + breakfast → 2.880.000 + 80.000 = 2.960.000.
- AC-04.11: Perhitungan server (Laravel) adalah kebenaran; frontend menghitung ulang untuk preview dan backend memvalidasi ulang (selisih → 422).
- **Asumsi terdokumentasi:** breakfast flat Rp80.000/pesanan. Jika asesor menghendaki per-malam, ubah satu konstanta `BREAKFAST_FLAT=false` (didukung di API, lihat architecture).

### FR-05 — Tabel Riwayat (hasil isian)

**US-05:** Sebagai pengunjung/asesor, saya melihat semua pesanan tersimpan.

- AC-05.1: Kolom: No | Nama | JK | No. Identitas | Tipe | Harga | Tgl Pesan (dd/mm/yyyy) | Durasi | Breakfast (Ya/Tidak) | Total Bayar.
- AC-05.2: Data dari `GET /api/bookings` (terbaru dulu), paginasi sederhana (10/baris, atau scroll bila <30 data).
- AC-05.3: NIK ditampilkan penuh (konteks demo; bukan PII produksi).
- **Edge:** 0 data → empty state "Belum ada pesanan — isi form di atas."; API mati → tabel dari cache React Query terakhir + notice.

### FR-06 — Foto & Video

- AC-06.1: Tiap tipe punya min. 1 foto (JPG/WebP ≤300KB, 1600×1000) dan 1 video (MP4 ≤8MB atau URL embed).
- AC-06.2: Aset lokal di `frontend/public/assets/images/rooms/*`, video di `frontend/public/assets/videos/*`, logo di `frontend/public/assets/logo/*` agar demo offline lolos.
- AC-06.3: `alt` deskriptif, `loading="lazy"` untuk gambar di bawah fold.

---

## 5. Non-Functional Requirements

| ID | Syarat | Target |
|---|---|---|
| NFR-01 | Waktu demo E2E | < 3 menit klik-through; tidak ada login tamu |
| NFR-02 | Performa | LCP < 2.5s di laptop asesor (gambar terkompresi, GSAP transform-only) |
| NFR-03 | Responsif | 375 / 768 / 1280 lolos tanpa scroll horizontal (kecuali tabel harga) |
| NFR-04 | Aksesibilitas | Kontras ≥ 4.5:1 body, focus-visible, label terasosiasi, keyboard-only bisa pesan |
| NFR-05 | Keandalan data | Validasi ganda FE (Zod) + BE (FormRequest); harga dari server |
| NFR-06 | Portabilitas demo | FE `npm run dev` :5173, BE `php artisan serve` :8000, SQLite file tunggal |
| NFR-07 | Bahasa | Label form Bahasa Indonesia persis; pesan error verbatim BNSP tidak diterjemahkan |

## 6. Out of Scope (tegas, agar 180 menit realistis)

- Auth tamu, payment gateway, ketersediaan kamar real-time / kalender occupancy, multi-hotel, admin CMS, i18n penuh, notifikasi SMS/WA. Semua ditolak untuk Phase 2 MVP kecuali diminta asesor.

## 7. Risiko & Mitigasi

| Risiko | Mitigasi di PRD ini |
|---|---|
| Harga tidak tercantum di dokumen | Seed eksplisit §2.1 + harga dari server |
| `dd/mm/yyyy` vs date picker | Native date + format display ID (§4.1) |
| Breakfast flat vs per-malam | Flat default + flag konfigurasi (§4.2) |
| Standar/Deluxe/Executif vs Family | Kanonis 3 tipe + alias (§2) |
| Internet mati saat demo | Aset lokal + fallback seed + SQLite file |

---

## 8. Kriteria Penerimaan Akhir (demo script)

1. Buka `/` → hero forest tampil, klik kamar → `/kamar` ada 3 foto+video.
2. Buka `/harga` → tabel 3 baris + harga Rp.
3. Buka `/tentang` → alamat/telp/email tampil.
4. Buka `/pesan` → pilih Deluxe → harga 800.000 otomatis.
5. Isi NIK 5 digit → error `isian salah..data harus 16 digit`.
6. Isi durasi `abc` → error `harus isi angka`.
7. Durasi 4 + breakfast → Hitung → total 2.960.000 → Simpan → muncul di tabel bawah dengan tanggal `dd/mm/yyyy`.
