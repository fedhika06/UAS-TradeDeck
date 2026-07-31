# TradeDeck — Frontend E-commerce B2B (Alibaba-style)

Frontend marketplace grosir/B2B bergaya Alibaba, dibangun dengan **React + Vite**,
**axios** untuk pengambilan data, dan **Tailwind CSS** untuk styling.

## Fitur

- Header dengan search bar, tombol "Ajukan RFQ", dan navigasi kategori
- Hero section dengan kartu "Shipment Manifest" (elemen signature)
- Sidebar kategori + navigasi kategori horizontal
- Grid produk dengan kartu bergaya **spec sheet**: tingkatan harga per kuantitas (price break),
  MOQ, badge pemasok terverifikasi, rating, dan response rate
- Loading skeleton, empty state, dan error state
- Pencarian & filter kategori (client-side)
- Data diambil via **axios** dari file JSON statis (`/public/data/*.json`) —
  tinggal ganti `baseURL` di `src/api/client.js` untuk menyambungkannya ke API sungguhan
- Fully responsive (mobile → desktop), fokus keyboard terlihat, menghormati `prefers-reduced-motion`

## Struktur Proyek

```
trade-market/
├── public/
│   └── data/
│       ├── products.json      # data produk contoh
│       └── categories.json    # data kategori contoh
├── src/
│   ├── api/
│   │   ├── client.js          # instance axios
│   │   └── products.js        # fungsi fetch produk & kategori
│   ├── hooks/
│   │   └── useProducts.js     # custom hook (loading/error/data state)
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── Header.jsx
│   │   ├── CategoryNav.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── TrustBadges.jsx
│   │   ├── CategorySidebar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Build untuk produksi:

```bash
npm run build
npm run preview
```

## Menghubungkan ke API sungguhan

Cukup ubah `baseURL` di `src/api/client.js` dan sesuaikan endpoint di
`src/api/products.js`, misalnya:

```js
const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_URL })
```

```js
export async function fetchProducts() {
  const { data } = await apiClient.get('/products')
  return data
}
```

## Desain

Palet warna & tipografi terinspirasi dunia perdagangan/logistik grosir:
navy tinta (`#12233D`), amber/tembaga (`#E8871E`), krem hangat (`#F6F1E7`),
dipasangkan dengan Archivo (display), Inter (body), dan IBM Plex Mono
(harga, SKU, spesifikasi) untuk kesan "manifest pengiriman/spec sheet".
