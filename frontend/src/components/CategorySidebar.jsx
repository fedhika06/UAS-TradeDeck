export default function CategorySidebar({ categories, activeCategory, onSelect, onRequestRfq }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white border border-ink/10 rounded-sm sticky top-4">
        <h2 className="font-display font-bold text-sm px-4 py-3 border-b border-ink/10 text-ink">
          Kategori Produk
        </h2>
        <ul className="py-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                  activeCategory === cat.name
                    ? 'bg-amber/10 text-amber-dark font-semibold'
                    : 'text-slate hover:bg-sand-dark hover:text-ink'
                }`}
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[11px] text-slate/60">
                  {cat.count.toLocaleString('id-ID')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 bg-ink rounded-sm p-4 text-sand">
        <p className="font-display font-bold text-sm mb-1">Butuh sumber khusus?</p>
        <p className="text-xs text-sand/60 mb-3">
          Kirim satu RFQ, terima hingga 5 penawaran dari pemasok terverifikasi dalam 24 jam.
        </p>
        <button
          onClick={() => onRequestRfq?.(null)}
          className="w-full bg-amber hover:bg-amber-dark transition-colors text-ink text-xs font-display font-bold py-2 rounded-sm"
        >
          Buat RFQ Sekarang
        </button>
      </div>
    </aside>
  )
}
