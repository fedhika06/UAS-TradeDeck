# TradeDeck API — Backend NestJS

Backend untuk **TradeDeck**, marketplace grosir/B2B bergaya Alibaba.
Dibangun agar bentuk datanya **persis sama** dengan yang sudah dipakai
frontend React (`trade-market`), jadi tinggal sambung tanpa ubah komponen.

## Modul

- **products** — daftar produk, filter kategori/kata kunci, sort harga/rating
- **categories** — daftar kategori + jumlah produk
- **rfq** — Request for Quote (dari tombol "Kirim Permintaan" / "Ajukan RFQ" di frontend)

Data saat ini disimpan **in-memory** (lihat `src/common/data/*.seed.ts`) supaya
bisa langsung dites tanpa setup database. Ganti `ProductsService`, `CategoriesService`,
dan `RfqService` dengan query Prisma/TypeORM saat siap ke produksi.

## Instalasi & Menjalankan

```bash
npm install
cp .env.example .env
npm run start:dev
```

API berjalan di `http://localhost:3000/api`.
Dokumentasi Swagger otomatis di `http://localhost:3000/docs`.

## Endpoint

| Method | Path                | Keterangan                                  |
|--------|---------------------|----------------------------------------------|
| GET    | `/api/products`     | List produk. Query: `category`, `q`, `sort` (`relevance`\|`price_asc`\|`rating_desc`) |
| GET    | `/api/products/:id` | Detail satu produk                          |
| GET    | `/api/categories`   | List kategori                               |
| POST   | `/api/rfq`          | Buat RFQ baru                               |
| GET    | `/api/rfq`          | List RFQ (dashboard internal)               |
| GET    | `/api/rfq/:id`      | Detail satu RFQ                             |

Contoh body `POST /api/rfq`:

```json
{
  "productId": "P-10236",
  "productName": "Modul LED Panel Surya 400W Monokristal",
  "buyerName": "Budi Santoso",
  "buyerEmail": "budi@perusahaan.co.id",
  "company": "CV Sumber Terang",
  "quantity": 500,
  "message": "Butuh spesifikasi tahan cuaca tropis."
}
```

## Menyambungkan ke Frontend (trade-market)

Di proyek frontend, ubah `src/api/client.js`:

```javascript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})
```

Lalu di `src/api/products.js`, ganti endpoint dari file JSON statis ke endpoint API:

```javascript
export async function fetchProducts(params) {
  const { data } = await apiClient.get('/products', { params })
  return data
}

export async function fetchCategories() {
  const { data } = await apiClient.get('/categories')
  return data
}
```

Tambahkan juga fungsi untuk mengirim RFQ dari tombol "Kirim Permintaan":

```javascript
export async function submitRfq(payload) {
  const { data } = await apiClient.post('/rfq', payload)
  return data
}
```

Pastikan `CORS_ORIGIN` di `.env` backend cocok dengan alamat dev server frontend
(default Vite: `http://localhost:5173`).

## Langkah Lanjutan yang Disarankan

- **Database**: Prisma + PostgreSQL (`npx prisma init`), pindahkan seed ke `prisma/seed.ts`
- **Auth**: modul `auth` dengan `@nestjs/jwt` + `passport-jwt` untuk tombol "Masuk"/"Daftar Gratis"
- **Pagination**: tambahkan `page`/`limit` di `FindProductsQueryDto` agar tidak kirim semua data sekaligus
- **Upload gambar produk**: `@nestjs/platform-express` + `multer`, simpan ke S3/Cloud Storage
- **Testing**: `@nestjs/testing` untuk unit test service, `supertest` untuk e2e endpoint
