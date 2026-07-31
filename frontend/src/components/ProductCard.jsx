function formatUsd(value) {
  return `US$${value.toLocaleString('en-US', { minimumFractionDigits: value < 10 ? 2 : 0, maximumFractionDigits: 2 })}`
}

export default function ProductCard({ product, onRequestRfq }) {
  const bestTier = product.priceTiers[product.priceTiers.length - 1]

  return (
    <article className="group bg-white border border-ink/10 rounded-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-sand-dark">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.verified && (
          <span className="absolute top-2 left-2 bg-white/95 border border-verified text-verified text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm -rotate-3 shadow-sm">
            VERIFIED
          </span>
        )}
        <span className="absolute top-2 right-2 bg-ink/85 text-sand text-[10px] font-mono px-1.5 py-0.5 rounded-sm">
          {product.id}
        </span>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-body font-semibold text-sm text-ink leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <p className="text-xs text-slate mt-1">
          {product.supplier} · {product.location}
        </p>

        <div className="flex items-center gap-1 mt-1.5 text-xs">
          <span className="text-amber-dark font-semibold">★ {product.rating}</span>
          <span className="text-slate/60">· {product.responseRate}% respons</span>
        </div>

        {/* Price tier spec strip — signature element echoed from hero manifest */}
        <div className="mt-3 border border-dashed border-ink/15 rounded-sm font-mono text-[11px] overflow-hidden">
          {product.priceTiers.map((tier, i) => (
            <div
              key={i}
              className={`flex justify-between px-2 py-1 ${
                i % 2 === 0 ? 'bg-sand' : 'bg-white'
              }`}
            >
              <span className="text-slate">
                {tier.min}{tier.max ? `–${tier.max}` : '+'} {product.unit}
              </span>
              <span className="font-semibold text-ink">{formatUsd(tier.price)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate">
            MOQ <span className="font-semibold text-ink">{product.moq} {product.unit}</span>
          </span>
          <span className="text-verified font-medium">mulai {formatUsd(bestTier.price)}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onRequestRfq?.(product)
  }}
  className="mt-3 w-full border border-ink text-ink hover:bg-ink hover:text-sand transition-colors text-xs font-display font-bold py-2 rounded-sm"
>
  Kirim Permintaan
</button>
      </div>
    </article>
  )
}
