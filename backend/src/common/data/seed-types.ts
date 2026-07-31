// Tipe data mentah untuk seeding, terpisah dari entity TypeORM
// (entity punya relasi/kolom tambahan seperti id, productId, dsb yang
// baru terisi otomatis saat disimpan ke database).

export interface RawPriceTier {
  min: number;
  max: number | null;
  price: number;
}

export interface RawProduct {
  id: string;
  name: string;
  category: string; // nama kategori, dipetakan ke categoryId saat seeding
  image: string;
  supplier: string;
  location: string;
  verified: boolean;
  years: number;
  rating: number;
  responseRate: number;
  unit: string;
  moq: number;
  priceTiers: RawPriceTier[];
}
