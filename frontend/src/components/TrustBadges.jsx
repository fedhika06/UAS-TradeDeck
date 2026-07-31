const badges = [
  { title: 'Trade Assurance', desc: 'Dana ditahan sampai pesanan diterima' },
  { title: 'Pemasok Terverifikasi', desc: 'Inspeksi pabrik pihak ketiga' },
  { title: 'Perlindungan Pembayaran', desc: 'Refund penuh jika spesifikasi tak sesuai' },
  { title: 'Logistik Terintegrasi', desc: 'Lacak pengiriman dari pabrik ke gudang' },
]

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div key={b.title} className="flex gap-3">
            <span className="mt-0.5 w-2 h-2 rounded-full bg-amber shrink-0" aria-hidden="true" />
            <div>
              <p className="font-display font-bold text-sm text-ink">{b.title}</p>
              <p className="text-xs text-slate mt-0.5">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
