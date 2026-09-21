# Architecture — BNSP Hotel (Rimba Haven)

> **Benchmark:** `Ahmad-Yu2up-Ar-Raf/umkm-catering-system` — monorepo `frontend/` SPA + `backend/` Laravel, kontrak REST tunggal, Ky client, Sanctum Bearer (admin), `docs/architecture.md` + `api-collection` + `openapi.json`. Hotel mengadopsi pola yang sama, disederhanakan untuk tamu anonim + SQLite file.
> **Batasan Phase 1:** dokumen saja. Tidak ada `npm install`, `composer create`, atau kode.

---

## 1. Topology

```
hotel-bnsp/
├── docs/                    # PRD.md, design.md, architecture.md (ini), planning-todos.md, BNSP-Hotel.md
├── design-references/       # main-references.png (HAVEN)
├── frontend/                # (Phase 2) Vite + React + TS — SPA publik, tanpa login tamu
└── backend/                 # (Phase 2) Laravel 13 API-only + SQLite — owns pricing + bookings
```

Komunikasi: `frontend :5173 --REST /api/v1/*--> backend :8000` via Ky (`src/api/client.ts`). CORS mengizinkan `FRONTEND_URL`. Tidak ada auth tamu; bila perlu anti-spam cukup rate-limit + honeypot (bukan login).

---

## 2. Backend — Laravel 13 API-only + SQLite (mirror benchmark `laravel/framework ^13.8`, PHP `^8.3`)

### 2.1 Keputusan kunci

| Keputusan | Nilai | Alasan |
|---|---|---|
| DB | SQLite file `database/database.sqlite` | Demo 1 file, nol setup MySQL di laptop asesor; Eloquent tetap portabel ke MySQL |
| Auth | Tanpa auth tamu; Sanctum disiapkan tapi tidak wajib untuk booking publik | BNSP tidak minta login; benchmark memakai Bearer hanya untuk admin |
| Kebenaran harga | Server-side snapshot `harga_satuan` + hitung ulang total | Cegah manipulasi harga dari DevTools |
| Format tanggal API | ISO `yyyy-mm-dd`; display `dd/mm/yyyy` di FE | Validasi `date` Laravel andal; mask ID hanya presentasi |
| Breakfast | Konstanta `BOOKING_BREAKFAST_FEE=80000`, `FLAT=true` | Satu switch ke per-malam bila asesor meminta |

### 2.2 Skema DB (SQLite)

```dbml
Table room_types {
  id integer [pk, increment]
  code varchar(16) [unique, not null]  // STANDARD | DELUXE | FAMILY
  name varchar(64) [not null]          // Standard | Deluxe | Family (Executive)
  price_per_night integer [not null]   // IDR, e.g. 500000
  capacity integer [default: 2]
  size_m2 integer
  description text
  photo_url varchar
  video_url varchar
  created_at timestamp
  updated_at timestamp
}

Table hotel_profiles {
  id integer [pk, increment]
  name varchar [not null]              // Rimba Haven
  description text
  address varchar
  phone varchar
  email varchar
  created_at timestamp
  updated_at timestamp
}

Table bookings {
  id integer [pk, increment]
  nama_pemesan varchar(100) [not null]
  jenis_kelamin varchar(1) [not null]  // L | P
  nomor_identitas char(16) [not null]
  room_type_code varchar(16) [not null] // FK logis -> room_types.code
  harga_satuan integer [not null]       // snapshot
  tanggal_pesan date [not null]
  durasi_menginap integer [not null]
  breakfast boolean [default: false]
  total_bayar integer [not null]
  created_at timestamp
  updated_at timestamp
  Indexes { (created_at)  nomor_identitas  tanggal_pesan }
}
```

Seed: 3 `room_types` (§PRD 2.1) + 1 `hotel_profiles`. Tidak ada tabel users untuk MVP tamu.

### 2.3 Rumus (identik PRD §4.2, diimplementasi di Service)

```php
$base = $hargaSatuan * $durasi;
$diskon = $durasi > 3 ? (int) round($base * 0.10) : 0;
$breakfast = $request->boolean('breakfast') ? 80000 : 0;
$total = $base - $diskon + $breakfast;
```

Validasi `StoreBookingRequest`: `nama_pemesan required|min:3|max:100`, `jenis_kelamin in:L,P`, `nomor_identitas regex:/^\d{16}$/` dengan message `isian salah..data harus 16 digit`, `room_type_code in:STANDARD,DELUXE,FAMILY`, `tanggal_pesan date|after_or_equal:today`, `durasi_menginap integer|min:1` dengan message mengandung `harus isi angka`, `breakfast boolean`. Total dari klien **diabaikan** — dihitung ulang; respons 422 mengembalikan error per-field.

### 2.4 Struktur folder backend (Phase 2)

```
backend/
├── routes/api.php              # /api/v1/* (ground truth)
├── app/
│   ├── Http/Controllers/Api/V1/
│   │   ├── RoomTypeController.php   # index, show
│   │   ├── HotelProfileController.php # show
│   │   └── BookingController.php    # index, store, show
│   ├── Http/Requests/StoreBookingRequest.php
│   ├── Http/Resources/BookingResource.php + RoomTypeResource.php
│   ├── Services/BookingPriceCalculator.php  # rumus murni, unit-testable
│   └── Models/RoomType.php, Booking.php, HotelProfile.php
├── database/migrations/*_create_room_types_table.php etc.
├── database/seeders/RoomTypeSeeder.php, HotelProfileSeeder.php
├── database/database.sqlite
├── docs/api-collection.md      # kontrak endpoint (cermin openapi)
└── openapi.json                # opsional, tiru benchmark
```

### 2.5 Tabel API

| Method | Path | Body / Query | Response | Keterangan |
|---|---|---|---|---|
| GET | `/api/v1/room-types` | — | `[{code,name,price_per_night,capacity,photo_url,video_url}]` | Harga FE |
| GET | `/api/v1/room-types/{code}` | — | satu tipe | Detail `/kamar` |
| GET | `/api/v1/hotel-profile` | — | `{name,description,address,phone,email}` | `/tentang` |
| GET | `/api/v1/bookings?limit=20&order=desc` | — | `[{id,nama_pemesan,jenis_kelamin,nomor_identitas,room_type_code,harga_satuan,tanggal_pesan,durasi_menginap,breakfast,total_bayar}]` | Tabel riwayat |
| POST | `/api/v1/bookings` | `{nama_pemesan,jenis_kelamin,nomor_identitas,room_type_code,tanggal_pesan,durasi_menginap,breakfast}` | `201 {data: booking + breakdown{base,discount,breakfast,total}}` | Hitung di server |
| GET | `/api/v1/bookings/{id}` | — | satu booking | Bukti/struk sederhana |

Error: `422 {message, errors:{field:[msg]}}`. NIK salah → `errors.nomor_identitas = ["isian salah..data harus 16 digit"]`. Durasi non-angka → `errors.durasi_menginap` mengandung `harus isi angka`.

---

## 3. Frontend — Vite + React + TS

### 3.1 Keputusan kunci (benchmark `frontend/package.json` + `src/`)

| Keputusan | Nilai | Alasan |
|---|---|---|
| Router | `react-router` v8, 5 route publik | Cermin benchmark `src/router` |
| Server state | `@tanstack/react-query` v5 (GET types/profile/bookings) | Cache + offline fallback |
| Form | `@tanstack/react-form` + `zod` | Validasi identik BE, error verbatim |
| Global UI | `zustand` v5 (tipe terpilih, filter galeri, toast) | Ringan, tanpa Context bloat |
| HTTP | `ky` (`src/api/client.ts`, base `VITE_API_URL`) | Pola benchmark, retry 0 untuk POST |
| Styling | Tailwind v4 (`@tailwindcss/vite`), `components.json` radix-maia/olive→forest, Hugeicons | Konsisten benchmark |
| Motion | `gsap` + `@gsap/react` (hero timeline), `lenis` smooth opsional | Satu orkestrasi |
| Feedback | `sonner` toast; `date-fns` + locale `id` format `dd/MM/yyyy` | — |
| Fonts | Fontsource Playfair Display + Plus Jakarta Sans (self-host) | Tanpa Google Fonts runtime |

### 3.2 Struktur folder frontend (Phase 2)

```
frontend/
├── components.json            # shadcn radix-maia, baseColor olive, aliases @/*
├── vite.config.ts             # @tailwindcss/vite, @/ alias, proxy /api → :8000
├── index.html
├── public/assets/images/rooms/* public/assets/images/hero-forest.jpg public/assets/videos/* public/assets/logo/*
├── src/
│   ├── main.tsx App.tsx index.css        # @theme tokens forest (lihat design.md §3)
│   ├── router/index.tsx                  # /, /kamar, /harga, /tentang, /pesan
│   ├── api/client.ts                     # ky instance + unwrap
│   ├── services/roomService.ts bookingService.ts profileService.ts
│   ├── hooks/useRoomTypes.ts useBookings.ts useCreateBooking.ts
│   ├── store/bookingDraft.ts ui.ts       # zustand: draft tipe/durasi/totalTerhitung
│   ├── lib/pricing.ts                    # rumus preview (cermin BE) + formatIDR + formatTanggalID
│   ├── lib/validation.ts                 # zod schema BNSP (pesan verbatim)
│   ├── types/index.ts                    # RoomType, Booking, Breakdown
│   ├── components/
│   │   ├── layout/Navbar.tsx Footer.tsx
│   │   ├── home/Hero.tsx RoomCards.tsx OfferBanner.tsx Faq.tsx Gallery.tsx
│   │   ├── rooms/RoomCard.tsx RoomMedia.tsx
│   │   ├── booking/BookingForm.tsx PriceSummary.tsx BookingTable.tsx
│   │   └── ui/…                          # shadcn primitives (button, card, form, table…)
│   └── pages/Home.tsx Rooms.tsx Pricing.tsx About.tsx Booking.tsx
```

### 3.3 Data flow (booking — jalur dinilai asesor)

```
Pilih Tipe (select) ──► harga otomatis (roomTypes map) ──► isi NIK/durasi/tgl
        │ Zod validate inline (pesan verbatim)
        ▼
[Hitung Total Bayar] ──► lib/pricing.preview() ──► Total tampil + zustand.totalTerhitung=true
        ▼
[Simpan] enabled ──► POST /api/v1/bookings ──► 201 → invalidate useBookings
        │                                    ──► 422 → petakan errors ke field
        ▼
Tabel riwayat refetch, toast sukses, tanggal tampil dd/mm/yyyy
```

Aturan keras: **Simpan disabled hingga Hitung ditekan dan valid**; Harga & Total `readOnly`; NIK `inputMode="numeric"` + normalisasi strip spasi; tanggal native `<input type=date>` + fallback parser `dd/mm/yyyy` → ISO sebelum POST:

```ts
// ponytail: satu parser tanggal untuk native ISO + ketikan dd/mm/yyyy
export function toISODate(v: string): string | null { /* yyyy-mm-dd passthrough; dd/mm/yyyy → iso; else null */ }
```

### 3.4 Validasi Zod (pesan verbatim BNSP)

```ts
nomor_identitas: z.string().regex(/^\d{16}$/, "isian salah..data harus 16 digit"),
durasi_menginap: z.preprocess(Number, z.number({ error: "harus isi angka" }).int("harus isi angka").min(1, "harus isi angka")),
```

Jenis kelamin `L|P`, tipe enum, tanggal `refine(toISODate != null)`.

---

## 4. ERD Visual

```
room_types 1──∞ bookings (via room_type_code, snapshot harga_satuan)
hotel_profiles 1──(0) bookings (independen, konten statis)
```

Tidak ada relasi users untuk MVP. Migrasi ke MySQL kelak: ganti `integer` → `unsignedBigInteger` harga bila perlu >2M/malam dalam jumlah besar; logika tidak berubah.

---

## 5. Lingkungan & Port

| Layanan | Dev | Env |
|---|---|---|
| FE Vite | `:5173` | `VITE_API_URL=http://localhost:8000/api/v1` |
| BE Laravel | `:8000` (`php artisan serve`) | `FRONTEND_URL=http://localhost:5173`, `DB_CONNECTION=sqlite` |
| DB | `backend/database/database.sqlite` | File tunggal, di-commit kosong + `.gitkeep` pola benchmark |

CORS: `config/cors.php` paths `api/*`, allowed_origins dari `FRONTEND_URL`.

---

## 6. Keputusan Arsitektur (ADR ringkas)

1. **SQLite > MySQL untuk MVP** — nol instalasi asesor, tetap Eloquent-portabel.
2. **Tanpa auth tamu** — BNSP tidak meminta; mengurangi 30–60 menit scope.
3. **Harga snapshot di bookings** — riwayat tidak rusak saat harga berubah.
4. **Breakfast flat** — sesuai bunyi "tambahan 80.000" + satu flag bila perlu per-malam.
5. **Native date + format ID** — andal di mobile, tetap tampil `dd/mm/yyyy`.
6. **Struktur benchmark dipertahankan** (`api/services/hooks/store/types`, `docs/api-collection`) — agar agen/asesor yang kenal repo catering langsung paham.
