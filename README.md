# Rimba Haven — BNSP Hotel Booking Monorepo

Forest Elegant Green hotel booking app. Junior Web Developer certification demo (FR.IA.02 / FR.SKEMA-02-07, LSP Informatika).

## Monorepo structure

```
hotel-bnsp/
├── docs/                    # Phase 1 planning (source of truth)
│   ├── PRD.md               # requirements, user stories, acceptance criteria
│   ├── design.md            # Forest Elegant Green design system (oklch, serif + grotesk)
│   ├── architecture.md      # Laravel API + React SPA blueprint, ERD, endpoint table
│   ├── planning-todos.md    # Phase 2/3 implementation roadmap
│   └── BNSP-Hotel.md        # original certification brief (ID)
├── design-references/       # main-references.png (HAVEN benchmark visual)
├── frontend/                # Vite + React 19 + TS + Tailwind v4 + shadcn/ui (radix-maia, olive, oklch)
│   └── public/assets/       # images/ (HD photo), videos/, logo/ (RH monogram SVG)
├── backend/                 # Laravel 13 API-only + SQLite (structure; scaffold on PHP host)
└── skills-lock.json         # pinned agent skills
```

## Tech stack

| Layer | Choice (mirrors `umkm-catering-system` benchmark) |
|---|---|
| Frontend | Vite 8, React 19, TypeScript, Tailwind v4 (`@tailwindcss/vite`), shadcn/ui `radix-maia` + olive base, Hugeicons, oklch theme tokens |
| Data (Phase 3) | `ky` client, TanStack Query + Form + Store, `zustand`, `react-router`, `zod`, `date-fns`, `sonner`, `gsap` |
| Backend | Laravel 13 (`laravel/framework ^13.8`), PHP `^8.3`, Sanctum, SQLite file DB |
| Assets | HD photography via `image-explorer` (Unsplash/Pexels/Pixabay, attributed in `frontend/public/assets/ATTRIBUTION.md`) |

## Setup

Prerequisites: Node 20+, PHP 8.3+ with sqlite extension, Composer.

```bash
# Frontend
cd frontend
npm install
npm run dev        # :5173

# Backend (on a PHP host; this container has no PHP)
cd backend
composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

Env: frontend `VITE_API_URL=http://localhost:8000/api/v1`; backend `FRONTEND_URL=http://localhost:5173`, `DB_CONNECTION=sqlite`.

## Business rules (from `docs/PRD.md`)

- 3 room types: STANDARD 500rb / DELUXE 800rb / FAMILY 1.2jt per night (seed, server-owned).
- NIK must be exactly 16 digits (`isian salah..data harus 16 digit`); duration must be numeric (`harus isi angka`).
- Total via **Hitung Total Bayar**: `base = price × nights`, 10% off when nights > 3, + Rp80.000 flat when breakfast checked.

## Folder conventions

- Frontend follows `src/{api,services,hooks,store,lib,types,components,pages,router}` (see `docs/architecture.md` §3.2).
- No `space-y-*`/`space-x-*` (use `flex` + `gap-*`); semantic color tokens only (`bg-primary`, never raw hex); oklch everywhere — no HEX/RGB in CSS.
