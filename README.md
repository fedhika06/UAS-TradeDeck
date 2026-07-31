# TradeDeck

Marketplace B2B bergaya Alibaba menggunakan **NestJS + TypeORM + MySQL** (backend) dan **React + Vite + Tailwind CSS** (frontend). Dibuat untuk UAS Pemrograman Web.

## Fitur

| Fitur | Keterangan |
|---|---|
| 🔐 Auth | Register/login, JWT, current user via decorator |
| 📦 Produk | CRUD produk, price tier (harga bertingkat per kuantitas), pencarian & filter |
| 🗂 Kategori | Daftar kategori produk |
| 📩 RFQ (Request for Quotation) | Buat & lihat permintaan penawaran harga ke penjual |
| 👤 Admin Dashboard | Kelola produk & pantau RFQ masuk |
| 📑 Swagger Docs | Dokumentasi API otomatis di `/docs` |

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** NestJS 10, TypeORM, MySQL (mysql2)
- **Auth:** JWT (@nestjs/jwt, passport-jwt), bcrypt
- **Validasi:** class-validator, class-transformer
- **API Docs:** Swagger (@nestjs/swagger)

## Cara Install

### Prasyarat

- Node.js >= 18
- MySQL server

### 1. Clone & Install

```bash
git clone <repo-url>
cd trade-market

cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Environment Variables

Buat file `.env` di folder `backend/` (bisa disalin dari `.env.example`):

```
PORT=3000
CORS_ORIGIN=http://localhost:5173

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=trade_market

# JWT
JWT_SECRET=ubah-secret-ini-di-production
JWT_EXPIRES_IN=1d
```

```bash
cp backend/.env.example backend/.env
```

### 3. Database

Buat database MySQL bernama `trade_market` (TypeORM akan membuat/menyesuaikan tabel otomatis saat backend dijalankan, tergantung konfigurasi `synchronize`).

```bash
mysql -u root -p -e "CREATE DATABASE trade_market"
```

### 4. Jalankan

```bash
# Terminal 1 — Backend (default port 3000)
cd backend
npm run start:dev

# Terminal 2 — Frontend (default port 5173)
cd frontend
npm run dev
```

Buka `http://localhost:5173` untuk aplikasi, dan `http://localhost:3000/docs` untuk dokumentasi Swagger.

## Build Produksi

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

## Struktur Folder

```
trade-market/
├── backend/
│   ├── src/
│   │   ├── auth/           # register, login, JWT guard & strategy
│   │   ├── products/       # produk + price tier
│   │   ├── categories/     # kategori produk
│   │   ├── rfq/            # request for quotation
│   │   ├── users/          # entity & service user
│   │   ├── common/         # data seed, seed service
│   │   ├── app.module.ts
│   │   └── main.ts         # entry point NestJS
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # axios client, auth, products, rfq
│   │   ├── components/     # komponen React (Header, ProductGrid, RfqModal, dll)
│   │   ├── components/admin/ # AdminProducts
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useDebounce, useProducts
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## API Endpoints

Semua endpoint diawali prefix `/api`.

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| POST | `/api/auth/register` | ✗ | Register user |
| POST | `/api/auth/login` | ✗ | Login |
| GET | `/api/auth/me` | ✓ | Profil user saat ini |
| GET | `/api/products` | ✗ | Daftar produk (dengan filter/pencarian) |
| GET | `/api/products/:id` | ✗ | Detail produk |
| POST | `/api/products` | ✓ | Tambah produk |
| PATCH | `/api/products/:id` | ✓ | Update produk |
| DELETE | `/api/products/:id` | ✓ | Hapus produk |
| GET | `/api/categories` | ✗ | Daftar kategori |
| POST | `/api/rfq` | ✓ | Buat request for quotation |
| GET | `/api/rfq` | ✓ | Daftar RFQ |
| GET | `/api/rfq/:id` | ✓ | Detail RFQ |
