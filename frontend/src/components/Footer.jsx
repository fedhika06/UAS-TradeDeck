const columns = [
  {
    title: 'Untuk Pembeli',
    links: ['Cara mengajukan RFQ', 'Trade Assurance', 'Pusat Bantuan', 'Lacak Pesanan'],
  },
  {
    title: 'Untuk Pemasok',
    links: ['Jual di TradeDeck', 'Verifikasi Pabrik', 'Paket Keanggotaan', 'Panduan Ekspor'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Karier', 'Pers', 'Kebijakan Privasi'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-sand mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-sm bg-amber flex items-center justify-center font-display font-black text-ink">
              T
            </span>
            <span className="font-display font-extrabold text-lg">
              Trade<span className="text-amber">Deck</span>
            </span>
          </div>
          <p className="text-sm text-sand/60">
            Menghubungkan pembeli grosir dengan pabrik terverifikasi di seluruh dunia.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-display font-bold text-sm mb-3">{col.title}</p>
            <ul className="space-y-2 text-sm text-sand/60">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-amber transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-sand/40 font-mono flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 TradeDeck. Semua hak dilindungi.</span>
          <span>Manifest render — build lokal via Vite + React + Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
