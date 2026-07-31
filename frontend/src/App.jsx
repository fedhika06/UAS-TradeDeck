import { useMemo, useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Header from './components/Header.jsx'
import CategoryNav from './components/CategoryNav.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import CategorySidebar from './components/CategorySidebar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Footer from './components/Footer.jsx'
import RfqModal from './components/RfqModal.jsx'
import AuthModal from './components/AuthModal.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import RfqDashboard from './components/RfqDashboard.jsx'
import AdminProducts from './components/admin/AdminProducts.jsx'
import { useProducts } from './hooks/useProducts.js'
import { useDebounce } from './hooks/useDebounce.js'

export default function App() {
  const [view, setView] = useState('shop') // 'shop' | 'rfq-dashboard' | 'admin'
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('relevance')
  const [rfqProduct, setRfqProduct] = useState(undefined)
  const [authMode, setAuthMode] = useState(null)
  const [detailProductId, setDetailProductId] = useState(null)

  const debouncedSearch = useDebounce(searchTerm, 400)

  const { products, categories, isLoading, error } = useProducts({
    search: debouncedSearch,
    category: activeCategory,
    sort: sortOrder,
  })

  const resultLabel = `${products.length.toLocaleString('id-ID')} produk ditemukan${
    activeCategory ? ` di kategori terpilih` : ''
  }${debouncedSearch ? ` untuk "${debouncedSearch}"` : ''}`

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header
        onSearch={setSearchTerm}
        onOpenAuth={setAuthMode}
        onNavigate={setView}
      />

      {view === 'shop' && (
        <>
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <HeroBanner />
          <TrustBadges />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex gap-6">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              onRequestRfq={setRfqProduct}
            />
            <div className="flex-1 min-w-0">
              <ProductGrid
                products={products}
                isLoading={isLoading}
                error={error}
                resultLabel={resultLabel}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
                onRequestRfq={setRfqProduct}
                onOpenDetail={setDetailProductId}
              />
            </div>
          </main>
        </>
      )}

      {view === 'rfq-dashboard' && <RfqDashboard onOpenAuth={setAuthMode} />}
      {view === 'admin' && <AdminProducts onOpenAuth={setAuthMode} />}

      <Footer />

      {rfqProduct !== undefined && (
        <RfqModal product={rfqProduct} onClose={() => setRfqProduct(undefined)} />
      )}
      {authMode && <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} />}
      {detailProductId && (
        <ProductDetailModal
          productId={detailProductId}
          onClose={() => setDetailProductId(null)}
          onRequestRfq={(product) => {
            setDetailProductId(null)
            setRfqProduct(product)
          }}
        />
      )}
    </div>
  )
}