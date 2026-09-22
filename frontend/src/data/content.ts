import type { RoomType } from "@/types";

/** Seed mirror of the backend RoomTypeSeeder. Replaced by GET /api/v1/room-types in Phase 3. */
export const ROOM_TYPES: RoomType[] = [
  {
    code: "STANDARD",
    name: "Standard",
    pricePerNight: 500000,
    capacity: 2,
    sizeM2: 24,
    description: "Kamar nyaman 24 m2 untuk 2 tamu dengan pemandangan rimba.",
    photoUrl: "/assets/images/rooms/standard-1.jpg",
    facilities: ["Pemandangan hutan pinus", "AC dan air hangat", "Wi-Fi 50 Mbps"],
  },
  {
    code: "DELUXE",
    name: "Deluxe",
    pricePerNight: 800000,
    capacity: 2,
    sizeM2: 36,
    description: "Kamar deluxe 36 m2 dengan jendela panorama hutan dan bathtub batu.",
    photoUrl: "/assets/images/rooms/deluxe-1.jpg",
    facilities: ["Jendela panorama 180 derajat", "Bathtub batu alam", "Teras pribadi"],
  },
  {
    code: "FAMILY",
    name: "Family (Executive)",
    pricePerNight: 1200000,
    capacity: 4,
    sizeM2: 48,
    description: "Suite keluarga 48 m2 untuk 4 tamu, disebut Executive pada brosur.",
    photoUrl: "/assets/images/rooms/family-1.jpg",
    facilities: ["Ruang keluarga terpisah", "Dapur kecil dan minibar", "2 kamar mandi"],
  },
];

export const HOTEL_PROFILE = {
  name: "Rimba Haven",
  tagline: "Tenang di Tengah Rimba",
  description: [
    "Rimba Haven adalah sanctuary di tengah hutan pinus Bogor tempat alam bertemu kemewahan yang tenang. Kamar-kamar kami membingkai rimba lewat jendela kaca setinggi langit-langit, dengan material kayu hangat, linen premium, dan aksen kuningan.",
    "Setiap menginap mendukung konservasi hutan di sekitar resor dan pemberdayaan masyarakat lokal.",
  ],
  address: "Jl. Rimba Hijau No. 88, Bogor, Jawa Barat",
  phone: "+62-251-888-100",
  email: "stay@rimbahaven.id",
};

export interface Feature {
  title: string;
  text: string;
}

export const FEATURES: Feature[] = [
  { title: "Kamar Elegan", text: "Kamar berbingkai hutan dengan material hangat." },
  { title: "Sarapan Hutan", text: "Bahan lokal segar, dimasak setiap pagi." },
  { title: "Spa dan Wellness", text: "Perawatan tenang untuk tubuh dan pikiran." },
  { title: "Aktivitas Alam", text: "Jalur rimba, kano danau, dan api unggun." },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Jam berapa check-in dan check-out?",
    a: "Check-in mulai pukul 14.00 dan check-out pukul 12.00. Penitipan bagasi tersedia gratis.",
  },
  {
    q: "Apakah sarapan termasuk harga kamar?",
    a: "Sarapan adalah tambahan Rp80.000 per pesanan. Centang opsi breakfast pada form pemesanan.",
  },
  {
    q: "Bagaimana cara mendapat diskon menginap?",
    a: "Menginap lebih dari 3 malam otomatis mendapat diskon 10 persen dari total dasar kamar.",
  },
  {
    q: "Apakah tersedia Wi-Fi di kamar?",
    a: "Ya, Wi-Fi 50 Mbps tersedia gratis di seluruh kamar dan area publik.",
  },
];

export interface GalleryItem {
  src: string;
  alt: string;
  tab: "Kamar" | "Alam" | "Kuliner" | "Spa";
}

export const GALLERY: GalleryItem[] = [
  { src: "/assets/images/hero-forest.jpg", alt: "Kabana di tepi hutan pinus", tab: "Alam" },
  { src: "/assets/images/rooms/standard-1.jpg", alt: "Kamar Standard", tab: "Kamar" },
  { src: "/assets/images/rooms/deluxe-1.jpg", alt: "Kamar Deluxe", tab: "Kamar" },
  { src: "/assets/images/rooms/family-1.jpg", alt: "Suite Family", tab: "Kamar" },
  { src: "/assets/images/dining-1.jpg", alt: "Hidangan sarapan", tab: "Kuliner" },
  { src: "/assets/images/offer-spa.jpg", alt: "Interior kabin yang hangat", tab: "Spa" },
  { src: "/assets/images/rooms/deluxe-2.jpg", alt: "Sudut istirahat kamar Deluxe", tab: "Spa" },
  { src: "/assets/images/rooms/standard-2.jpg", alt: "Detail kamar Standard", tab: "Alam" },
];
