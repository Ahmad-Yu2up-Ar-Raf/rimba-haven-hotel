export type RoomTypeCode = "STANDARD" | "DELUXE" | "FAMILY";

export interface RoomType {
  code: RoomTypeCode;
  name: string;
  pricePerNight: number;
  capacity: number;
  sizeM2: number;
  description: string;
  photoUrl: string;
  facilities: string[];
}

export interface PriceBreakdown {
  base: number;
  discount: number;
  breakfast: number;
  total: number;
}

export interface BookingPayload {
  namaPemesan: string;
  jenisKelamin: "L" | "P";
  nomorIdentitas: string;
  roomTypeCode: RoomTypeCode;
  tanggalPesan: string;
  durasiMenginap: number;
  breakfast: boolean;
}
