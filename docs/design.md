# Design System — Rimba Haven · Forest Elegant Green

> **Sumber visual:** `design-references/main-references.png` (HAVEN landing) + aset chat bila ada.
> **Prinsip skill:** `brandkit` (brand world) · `high-end-visual-design` (agency bar) · `design-taste-frontend` + `minimalist-ui` (quiet luxury) · `shadcn` (primitives) · `gsap-core` + `gsap-performance` (motion) · `frontend-ui-engineering` (a11y/responsive).
> **Pre-flight decision (design-system-engine gate):** Intent = meyakinkan + memesan dalam 2 menit. Palette = forest/cream/gold (di bawah). Type = serif display + grotesk body. Spacing = Tailwind absolute + `flex gap-*` (tanpa `space-y-*`). Komposisi = shadcn primitives dulu. Motion = satu momen orkestrasi (hero reveal) + micro-hover sisanya. Signature = kartu kamar overlap + banner offer hijau tua. Self-critique = tanpa glassmorphism/gradient murahan, tanpa emoji ikon.

---

## 1. Brand Identity (brandkit · Luxury/Beauty mode)

| Elemen | Keputusan |
|---|---|
| Nama | **Rimba Haven** — Forest Elegant Hotel |
| Tagline | "Nature. Comfort. You." / ID pendamping "Tenang di Tengah Rimba" |
| Metafora inti | Daun + horizon + bingkai jendela kamar (ketenangan yang dibingkai arsitektur) |
| Logo | Wordmark serif `RIMBA HAVEN` + mark monogram `RH` dari negative-space daun (2 daun simetris membentuk H). Versi ikon bulat untuk favicon/nav. Tidak memakai crest palsu/clipart. |
| Audiens | Leisure domestik, business traveler, asesor LSP (butuh kejelasan di atas gaya) |
| Yang dihindari | Neon, gradient ungu-biru AI, crest emas norak, stok foto kantor generik |

### Board yang dipesan saat butuh aset (higgsfield-brandkit prompt)

```
Create premium brand-kit overview for "RIMBA HAVEN forest hotel".
Category: hospitality luxury-minimal. Audience: Indonesian leisure + business.
Metaphor: framed forest calm (leaf + window + horizon).
Logo: RH monogram negative-space leaf, serif wordmark.
Layout: 3x3 on warm ivory canvas, strong gutters, sparse type.
Panels: logo cover, construction, web hero mockup, tagline,
palette, typography, keycard mockup, cinematic forest image, UI chips.
Palette: #2E3B2F forest, #C9A96A gold, #FAF6EF ivory, #1C2420 charcoal.
Style: quiet, expensive, editorial. No lorem, no fake tiny text.
```

---

## 2. Deconstruction Referensi HAVEN (evidence-based)

| Aspek referensi | Observasi | Adopsi Rimba Haven |
|---|---|---|
| Hero | Foto cabin-hutan full-bleed, headline serif 3 baris kiri, CTA pill hijau, tombol play lingkaran kanan | Hero foto rimba + headline "Hutan. Tenang. Kamu." + CTA `Lihat Kamar` + `Pesan Kamar`; play membuka video suasana |
| Kartu overlap | 3 kartu gelap overlap bawah hero (`Peaceful Sanctuaries 01` dst.) | 3 kartu tipe kamar overlap hero: Standard 01 / Deluxe 02 / Family 03, gambar + nomor + panah |
| Section ritme | `Discover True Relaxation` (serif kiri) + kartu booking kecil tengah + foto besar kanan | Tiru: heading serif kiri, kalkulator mini / form ringkas tengah, foto kamar kanan |
| Feature row | 4 kolom ikon garis tipis (Stays, Dining, Spa, Activities) | 4 kolom: Kamar Elegan, Sarapan Hutan, Spa & Wellness, Aktivitas Alam |
| Offer banner | Panel hijau tua rounded-3xl, foto kiri, serif "Stay Longer, Save More" kanan + motif daun | Banner "Menginap Lebih Lama, Hemat 10%" + foto onsen/kamar + CTA — dipakai untuk komunikasikan diskon >3 hari |
| FAQ + galeri | Accordion bernomor + thumbnail kanan; galeri tab All/Nature/Stay/Dining/Wellness | FAQ BNSP (check-in, breakfast, Wi-Fi) + galeri tab Kamar/Alam/Kuliner/Spa |
| Radius/ plen | Kartu `rounded-2xl/3xl`, section `py-24+`, whitespace lega, krim `#FAF7F0` | Wajibkan di token |
| Tipografi | Serif display (seperti Fraunces/Instrument) + sans kecil netral | Playfair Display / Cormorant untuk display, Plus Jakarta Sans untuk UI |

---

## 3. Color Tokens (Tailwind v4 `@theme`)

```css
@theme {
  --color-forest-950: #1C2420; /* charcoal-green, teks gelap + footer */
  --color-forest-900: #2E3B2F; /* primer — nav, banner offer, footer */
  --color-forest-700: #3E4F3E; /* hover primer */
  --color-forest-500: #5B6B4F; /* ikon, aksen kalem */
  --color-moss-500:   #6B7245; /* CTA olive (EXPLORE STAY) */
  --color-moss-600:   #5B6236; /* CTA hover */
  --color-gold-400:   #C9A96A; /* warm gold — garis, badge, harga */
  --color-gold-500:   #B8935A;
  --color-cream-50:   #FAF6EF; /* background utama */
  --color-cream-100:  #F3EDE2; /* panel galeri/FAQ */
  --color-cream-200:  #E9E0D0; /* border kalem */
  --color-ink-900:    #1A1E1B; /* teks utama */
  --color-ink-500:    #5A615C; /* teks sekunder */
}
```

Kontras (dicek via `antislop-human/contrast-check.py` saat implementasi): cream `#FAF6EF` di atas forest `#2E3B2F` ≈ 12.1:1 (AAA). Body ink `#1A1E1B` di atas cream ≈ 15:1. CTA moss `#5B6236` dengan teks putih ≈ 5.9:1 (AA lolos). Emas hanya untuk aksen besar/dekorasi, bukan teks kecil.

**Pemetaan semantik:** `primary=forest-900`, `accent=moss-500/600`, `highlight=gold-400`, `background=cream-50`, `foreground=ink-900`, `muted=cream-100`, `border=cream-200`.

---

## 4. Typography

| Peran | Font (via Fontsource, self-host) | Skala |
|---|---|---|
| Display / Hero / Section H | `Playfair Display` (600/700) atau `Cormorant Garamond` alternatif; fallback Georgia serif | hero clamp(2.75rem,6vw,5rem), section 2–2.75rem, tracking-tight, leading 1.05 |
| Body / UI / Form | `Plus Jakarta Sans` (400/500/600/700); Inter hanya fallback sistem, bukan utama (patuhi anti-pattern high-end skill) | body 1rem/1.7, label 0.875 medium, eyebrow 0.65rem uppercase tracking 0.2em |
| Angka / Harga / Total | Plus Jakarta Sans 700 tabular-nums; Total Bayar 1.5rem forest-900 | — |

Aturan: headline serif tidak pernah all-caps; eyebrow badge pill kecil di atas H (`RIMBA HAVEN — BOGOR`); tidak ada Inter/Roboto sebagai font utama; ikon = Hugeicons stroke tipis (benchmark) atau Phosphor Light — bukan Lucide tebal/emoji.

---

## 5. Layout, Spacing, Radius, Shadow

- **Grid:** container `max-w-7xl mx-auto px-4 md:px-8`; hero 12-kolom (teks 7 + play 5); kartu kamar 3-kolom overlap `-mt-16` di desktop, stack di mobile (`grid-cols-1`, tanpa overlap/rotasi <768px).
- **Spacing:** section `py-24 md:py-32/40`; antar-kartu `flex gap-6` (dilarang `space-y-*`); padding kartu `p-6 md:p-8`.
- **Radius:** kartu `rounded-[1.75rem]` (28px), banner `rounded-[2rem]`, pill CTA `rounded-full`, input `rounded-xl`.
- **Double-Bezel (high-end skill):** kartu utama = outer shell `bg-white/60 ring-1 ring-black/5 p-1.5 rounded-[2rem]` + inner `bg-white rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]`. Shadow ambient lembut saja: `0 24px 60px -24px rgba(28,36,32,.25)` — tanpa `shadow-md` generik/hitam keras.
- **Noise:** film-grain `opacity-[0.03]` hanya pada pseudo fixed `pointer-events-none`, bukan container scroll.

---

## 6. shadcn/ui Mapping (benchmark: `radix-maia`, base olive, cssVariables)

Base benchmark `frontend/components.json`: style `radix-maia`, `cssVariables:true`, alias `@/components`, `@/lib/utils`, ui di `@/components/ui`. Hotel memakai resep sama dengan baseColor `olive`→forest.

| Kebutuhan | Primitive shadcn | Catatan |
|---|---|---|
| Navbar + mobile menu | `navigation-menu`, `sheet`, `button` | Floating pill `mt-6 rounded-full backdrop-blur` desktop; hamburger morph → overlay `backdrop-blur-3xl` + stagger link |
| Hero CTA | `button` (pill + trailing icon circle) | Button-in-button: panah di `w-8 h-8 rounded-full bg-white/20` |
| Kartu kamar | `card`, `badge`, `aspect-ratio` | Badge tipe + harga gold; nomor 01/02/03 seperti referensi |
| Tabel harga & riwayat | `table`, `badge` | Header cream-100, zebra halus, scroll-x mobile |
| Form pesan | `form` (TanStack Form) + `input`, `select`, `radio-group`, `checkbox`, `calendar`/`popover`, `input-otp` (NIK 16) opsional | Error `form-message` inline; Harga & Total `readOnly` |
| Tanggal | `calendar` + `popover` | Display `dd/MM/yyyy` via date-fns `id` locale |
| Tombol aksi | `button`, `sonner` (toast) | Hitung = `secondary` moss; Simpan = `default` forest |
| Galeri/FAQ | `tabs`, `accordion`, `dialog` (lightbox), `carousel` (embla) | Tab: Semua/Kamar/Alam/Kuliner/Spa |
| Offer banner | `card` + `button` | Forest-900 panel + foto + motif daun SVG low-opacity |
| Proof/testimoni | `avatar`, `card` | Rating 4.9, "Loved by 5,000+ guests" ala referensi |

Dilarang membuat komponen styled-div sendiri bila primitive di atas tersedia.

---

## 7. Motion (GSAP, satu momen orkestrasi)

Performa (`gsap-performance`): animasikan hanya `transform`/`opacity`, `will-change` short-lived, blur hanya di nav/overlay fixed, hormati `prefers-reduced-motion`.

| Area | Koreografi |
|---|---|
| **Hero reveal (satu-satunya orkestrasi)** | Timeline GSAP: bg scale 1.08→1 (1.2s expo), headline baris stagger fade-up blur (0.9s), kartu kamar `y:64 opacity:0 blur:8` → in stagger 0.12, CTA magnetic. Trigger on-load, sekali. |
| Scroll section | `whileInView`/`ScrollTrigger` fade-up `y:48→0` 0.8s `cubic-bezier(0.32,0.72,0,1)`; tanpa `scroll` listener manual |
| Hover kartu | lift `translateY(-6px)` + gambar scale 1.04 + panah `translate(2px,-2px)`; active `scale-[0.98]` |
| Tombol | magnetic + inner-circle kinetics (lihat §5 high-end skill) |
| Angka total | count-tween 600ms saat Hitung ditekan |
| Gallery/accordion | height/opacity via Radix state, bukan layout anim |

---

## 8. Halaman-per-halaman (kontrak visual)

1. **Navbar:** logo RH + link (Beranda, Kamar, Harga, Tentang, Pesan) + CTA pill `Pesan Kamar`; mobile sheet.
2. **Hero (`/`):** full-bleed foto rimba 86vh rounded-b giant; headline serif 3 baris; sub 1 kalimat; 2 CTA; play-circle kanan (dialog video); strip nilai Tenang–Asli–Restoratif; 3 kartu kamar overlap.
3. **`/kamar`:** header serif + filter tab (Semua/Standard/Deluxe/Family) + grid kartu (foto 16/10, video badge ▶, fasilitas, harga, CTA).
4. **`/harga`:** tabel + note diskon 10% & breakfast + banner offer reuse.
5. **`/tentang`:** editorial split (teks kiri, foto kanan) + kartu kontak (alamat/telp/email) + jam resepsionis.
6. **`/pesan`:** dua kolom (form kiri bezel-card, ringkasan live kanan: tipe/harga/durasi/total) + tombol Hitung (moss) & Simpan (forest) + tabel riwayat full-width di bawah + empty state.
7. **Footer:** forest-950, kolom link, kontak, copyright LSP.

---

## 9. Aset & Higgsfield Strategy (foto/video/brand)

Aset lokal wajib (offline-demo): `public/assets/images/rooms/standard-*.jpg, deluxe-*.jpg, family-*.jpg` (1600×1000, ≤300KB), `public/assets/videos/standard.mp4, deluxe.mp4, family.mp4` (≤8MB, poster jpg), `public/assets/images/hero-forest.jpg`, `public/assets/images/offer-spa.jpg`, logo `public/assets/logo/rh-mark.svg` + `rimba-haven-word.svg`.

Prompt `higgsfield-generate` (bila perlu render tambahan, bukan stok curian):

```
Cinematic forest hotel room, floor-to-ceiling window to pine forest,
warm oak + linen + brass, morning mist, soft daylight, quiet luxury,
editorial photography, 35mm, shallow depth, palette #2E3B2F #FAF6EF #C9A96A.
No people close-up, no neon, no clutter. Landscape 1600x1000.
```

Video: 10s slow dolly kamar → jendela hutan; audio-free loop. Poster = frame pertama. Lisensi: hanya aset milik sendiri/AI-generated/stok berlisensi; catat sumber di `planning-todos.md` saat Phase 2.

---

## 10. Aksesibilitas & QA Visual

- Semua input berlabel; error `aria-invalid` + `aria-describedby`; fokus cincin gold terlihat; kontras dicek; keyboard penuh bisa pesan; `prefers-reduced-motion` mematikan timeline hero.
- QA: screenshot 375/768/1280 + perbandingan dengan `main-references.png` (hero overlap, kartu 01–03, banner offer, FAQ, galeri tab) sebelum Phase 2 dinyatakan selesai.
