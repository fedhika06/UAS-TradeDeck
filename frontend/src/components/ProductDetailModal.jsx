import { useEffect, useState } from 'react'
import { fetchProductById } from '../api/products.js'

function formatUsd(value) {
  return `US$${Number(value).toLocaleString('en-US', {
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

export default function ProductDetailModal({ productId, onClose, onRequestRfq }) {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    fetchProductById(productId)
      .then((data) => {
        if (isMounted) setProduct(data)
      })
      .catch((err) => {
        if (isMounted) setError(err)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [productId])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
      <div className="bg-white rounded-sm w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10 sticky top-0 bg-white">
          <h2 className="font-display font-bold text-ink text-sm">Detail Produk</h2>
          <button
            onClick={onClose}
            className="text-slate hover:text-ink text-lg leading-none"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate">Memuat detail produk…</div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="font-display font-bold text-rust mb-1">Gagal memuat produk</p>
            <p className="text-sm text-slate">Coba tutup dan buka lagi.</p>
          </div>
        ) : (
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <div className="aspect-square bg-sand-dark rounded-sm overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.verified && (
                <span className="absolute top-2 left-2 bg-white/95 border border-verified text-verified text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm -rotate-3 shadow-sm">
                  VERIFIED
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-slate/60 mb-1">{product.id}</span>
              <h3 className="font-display font-bold text-lg text-ink leading-snug mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-slate mb-2">
                {product.supplier} · {product.location}
              </p>

              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="text-amber-dark font-semibold">★ {product.rating}</span>
                <span className="text-slate/70">{product.responseRate}% respons</span>
                <span className="text-slate/70">{product.years} thn pengalaman</span>
              </div>

              <div className="border border-dashed border-ink/15 rounded-sm font-mono text-xs overflow-hidden mb-3">
                {product.priceTiers.map((tier, i) => (
                  <div
                    key={i}
                    className={`flex justify-between px-3 py-1.5 ${
                      i % 2 === 0 ? 'bg-sand' : 'bg-white'
                    }`}
                  >
                    <span className="text-slate">
                      {tier.min}
                      {tier.max ? `–${tier.max}` : '+'} {product.unit}
                    </span>
                    <span className="font-semibold text-ink">{formatUsd(tier.price)}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate mb-4">
                MOQ: <span className="font-semibold text-ink">{product.moq} {product.unit}</span>
              </p>

              <button
                onClick={() => onRequestRfq?.(product)}
                className="mt-auto w-full bg-amber hover:bg-amber-dark transition-colors text-ink text-sm font-display font-bold py-2.5 rounded-sm"
              >
                Kirim Permintaan (RFQ)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}