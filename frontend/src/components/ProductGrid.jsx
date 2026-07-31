import { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard.jsx'

const PAGE_SIZE = 6

function SkeletonCard() {
  return (
    <div className="bg-white border border-ink/10 rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-sand-dark" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-sand-dark rounded w-5/6" />
        <div className="h-3.5 bg-sand-dark rounded w-2/3" />
        <div className="h-16 bg-sand-dark rounded mt-2" />
        <div className="h-8 bg-sand-dark rounded mt-2" />
      </div>
    </div>
  )
}

export default function ProductGrid({
  products,
  isLoading,
  error,
  resultLabel,
  sortOrder,
  onSortChange,
  onRequestRfq,
  onOpenDetail,
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef(null)

  // Reset pagination tiap kali daftar produk berubah (filter/search baru)
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [products])

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length))
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [products.length])

  if (error) {
    return (
      <div className="bg-white border border-rust/30 rounded-sm p-8 text-center">
        <p className="font-display font-bold text-rust mb-1">Manifest gagal dimuat</p>
        <p className="text-sm text-slate">
          Terjadi kendala saat mengambil data produk. Periksa koneksi lalu muat ulang halaman.
        </p>
      </div>
    )
  }

  const visibleProducts = products.slice(0, visibleCount)
  const hasMore = visibleCount < products.length

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-sm text-slate">
          {isLoading ? 'Memuat manifest produk…' : resultLabel}
        </p>
        <label className="text-xs text-slate flex items-center gap-1.5">
          Urutkan:
          <select
            value={sortOrder}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border border-ink/15 rounded-sm text-xs px-1.5 py-1 bg-white text-ink"
          >
            <option value="relevance">Paling relevan</option>
            <option value="price_asc">Harga terendah</option>
            <option value="rating_desc">Rating tertinggi</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-ink/10 rounded-sm p-10 text-center">
          <p className="font-display font-bold text-ink mb-1">Tidak ada produk cocok</p>
          <p className="text-sm text-slate">Coba kategori lain atau ubah kata kunci pencarian.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {visibleProducts.map((product) => (
              <div key={product.id} onClick={() => onOpenDetail?.(product.id)} className="cursor-pointer">
                <ProductCard product={product} onRequestRfq={(p) => { onRequestRfq?.(p) }} />
              </div>
            ))}
          </div>

          {/* Sentinel untuk infinite scroll */}
          {hasMore && <div ref={sentinelRef} className="h-1" />}

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length))}
                className="border border-ink text-ink hover:bg-ink hover:text-sand transition-colors text-xs font-display font-bold py-2 px-5 rounded-sm"
              >
                Muat Lebih Banyak ({products.length - visibleCount} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}