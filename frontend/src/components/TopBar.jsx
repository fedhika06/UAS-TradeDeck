export default function TopBar() {
  return (
    <div className="bg-ink text-sand/80 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
        <div className="flex items-center gap-4 overflow-hidden">
          <span className="hidden sm:inline text-verified">● Trade Assurance aktif</span>
          <span className="hidden md:inline text-sand/50">|</span>
          <span className="hidden md:inline">Pengiriman ke 190+ negara</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-amber transition-colors">IDR ▾</button>
          <button className="hover:text-amber transition-colors hidden sm:inline">Bahasa ▾</button>
          <button className="hover:text-amber transition-colors">Bantuan</button>
        </div>
      </div>
    </div>
  )
}
