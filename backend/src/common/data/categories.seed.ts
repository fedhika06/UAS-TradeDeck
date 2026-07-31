export interface RawCategory {
  id: string;
  name: string;
  count: number;
}

export const CATEGORIES_SEED: RawCategory[] = [
  { id: 'mesin', name: 'Mesin & Peralatan', count: 18420 },
  { id: 'tekstil', name: 'Tekstil & Bahan', count: 25130 },
  { id: 'elektronik', name: 'Elektronik & Energi', count: 31980 },
  { id: 'kemasan', name: 'Kemasan & Cetak', count: 12760 },
  { id: 'agri', name: 'Pertanian & Konstruksi', count: 9450 },
  { id: 'otomotif', name: 'Otomotif & Suku Cadang', count: 21870 },
  { id: 'kesehatan', name: 'Kesehatan & Kecantikan', count: 14320 },
  { id: 'rumah', name: 'Rumah Tangga & Furnitur', count: 27640 },
];
