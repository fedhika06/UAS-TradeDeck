import { useEffect, useState } from 'react'
import { fetchRfqs } from '../api/rfq.js'
import { useAuth } from '../context/AuthContext.jsx'

const statusColor = {
  pending: 'text-amber-dark',
  approved: 'text-verified',
  rejected: 'text-rust',
}

export default function RfqDashboard({ onOpenAuth }) {
  const { user } = useAuth()
  const [rfqs, setRfqs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return
    let isMounted = true
    setIsLoading(true)
    setError(null)
    fetchRfqs()
      .then((data) => { if (isMounted) setRfqs(data) })
      .catch((err) => { if (isMounted) setError(err) })
      .finally(() => { if (isMounted) setIsLoading(false) })
    return () => { isMounted = false }
  }, [user])

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-display font-bold text-ink mb-2">Perlu masuk dulu</p>
        <p className="text-sm text-slate mb-4">Dashboard RFQ hanya untuk pengguna yang sudah login.</p>
        <button
          onClick={() => onOpenAuth?.('login')}
          className="bg-amber hover:bg-amber-dark transition-colors text-ink text-sm font-display font-bold py-2 px-4 rounded-sm"
        >
          Masuk
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-xl text-ink mb-4">Dashboard RFQ Masuk</h1>

      {isLoading ? (
        <p className="text-sm text-slate">Memuat daftar RFQ…</p>
      ) : error ? (
        <div className="bg-white border border-rust/30 rounded-sm p-6 text-center">
          <p className="font-display font-bold text-rust mb-1">Gagal memuat RFQ</p>
          <p className="text-sm text-slate">Coba muat ulang halaman.</p>
        </div>
      ) : rfqs.length === 0 ? (
        <p className="text-sm text-slate">Belum ada RFQ masuk.</p>
      ) : (
        <div className="bg-white border border-ink/10 rounded-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate border-b border-ink/10">
                <th className="px-4 py-2">Produk</th>
                <th className="px-4 py-2">Pembeli</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Jumlah</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.map((rfq) => (
                <tr key={rfq.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-4 py-2">{rfq.productName || '-'}</td>
                  <td className="px-4 py-2">{rfq.buyerName}</td>
                  <td className="px-4 py-2">{rfq.buyerEmail}</td>
                  <td className="px-4 py-2">{rfq.quantity}</td>
                  <td className={`px-4 py-2 font-semibold ${statusColor[rfq.status] || ''}`}>
                    {rfq.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}