import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header({ onSearch, onOpenAuth, onNavigate }) {
  const [query, setQuery] = useState('')
  const { user, logout } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 md:gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0" aria-label="TradeDeck beranda">
          <span className="w-9 h-9 rounded-sm bg-amber flex items-center justify-center font-display font-black text-ink text-lg">
            T
          </span>
          <span className="font-display font-extrabold text-xl text-white tracking-tight hidden sm:inline">
            Trade<span className="text-amber">Deck</span>
          </span>
        </a>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex-1 flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, pemasok, atau kata kunci..."
            className="w-full bg-white text-ink placeholder:text-slate/70 text-sm px-4 py-2.5 rounded-l-sm border-2 border-amber focus:outline-none"
          />
          <button
            type="submit"
            className="bg-amber hover:bg-amber-dark transition-colors text-ink font-display font-bold text-sm px-4 sm:px-6 rounded-r-sm"
          >
            Cari
          </button>
        </form>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-5 text-sand shrink-0">
          <button className="flex flex-col items-center text-xs font-medium hover:text-amber transition-colors">
            <span className="font-display font-bold">Ajukan RFQ</span>
            <span className="text-sand/50 text-[10px]">Dapat penawaran cepat</span>
          </button>
          <div className="w-px h-8 bg-ink-soft" />
          {user ? (
            <>
              <button onClick={() => onNavigate?.('rfq-dashboard')} className="text-sm hover:text-amber transition-colors">
                Dashboard RFQ
              </button>
              <button onClick={() => onNavigate?.('admin')} className="text-sm hover:text-amber transition-colors">
                Admin
              </button>
              <span className="text-sm">Hai, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="text-sm hover:text-amber transition-colors">
                Keluar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth?.('login')}
                className="text-sm hover:text-amber transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => onOpenAuth?.('register')}
                className="border border-amber text-amber hover:bg-amber hover:text-ink transition-colors text-sm font-display font-bold px-3 py-1.5 rounded-sm"
              >
                Daftar Gratis
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}