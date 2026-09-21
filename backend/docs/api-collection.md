# API Collection — Rimba Haven (`/api/v1/*`)

Base URL (dev): `http://localhost:8000/api/v1`. Contract mirrors `docs/architecture.md` §2.5.

## Room types

- `GET /room-types` → `200 { data: [{ code, name, price_per_night, capacity, size_m2, description, photo_url, video_url }] }`
- `GET /room-types/{code}` → `200 { data: {...} }`, `404` when unknown.

## Hotel profile

- `GET /hotel-profile` → `200 { data: { name, description, address, phone, email } }`

## Bookings

- `GET /bookings` → `200 { data: [...], meta: { current_page, last_page, per_page, total } }` (latest first, 20/page)
- `GET /bookings/{id}` → `200 { data: {...} }`, `404` when unknown.
- `POST /bookings` → `201 { data: { ..., breakdown: { base, discount, breakfast, total } } }`

Request body:

```json
{
  "nama_pemesan": "Dina Pratama",
  "jenis_kelamin": "P",
  "nomor_identitas": "3201010101010001",
  "room_type_code": "DELUXE",
  "tanggal_pesan": "2026-10-01",
  "durasi_menginap": 4,
  "breakfast": true
}
```

Validation errors → `422 { message, errors: { field: [msg] } }`:

- `nomor_identitas` → `["isian salah..data harus 16 digit"]`
- `durasi_menginap` → messages containing `harus isi angka`

Pricing (server truth): `base = price × nights`; 10% discount when nights > 3; + Rp80.000 flat when `breakfast` is true. Client-sent totals are ignored.
