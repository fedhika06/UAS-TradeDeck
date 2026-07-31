export default function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <nav className="bg-ink-light border-t border-ink-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar text-sm">
          <li>
            <button
              onClick={() => onSelect(null)}
              className={`whitespace-nowrap px-3 py-2.5 font-medium transition-colors border-b-2 ${
                activeCategory === null
                  ? 'text-amber border-amber'
                  : 'text-sand/70 border-transparent hover:text-sand'
              }`}
            >
              Semua Kategori
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelect(cat.name)}
                className={`whitespace-nowrap px-3 py-2.5 font-medium transition-colors border-b-2 ${
                  activeCategory === cat.name
                    ? 'text-amber border-amber'
                    : 'text-sand/70 border-transparent hover:text-sand'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
