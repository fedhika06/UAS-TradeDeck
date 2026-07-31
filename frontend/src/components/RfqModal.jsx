import { useState } from 'react'
import { createRfq } from '../api/rfq.js'

export default function RfqModal({ product, onClose }) {
  const [form, setForm] = useState({
    buyerName: '',
    buyerEmail: '',
    company: '',
    quantity: product?.moq || 1,
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await createRfq({
        productId: product?.id,
        productName: product?.name,
        buyerName: form.buyerName,
        buyerEmail: form.buyerEmail,
        company: form.company || undefined,
        quantity: Number(form.quantity),
        message: form.message || undefined,
      })
      setStatus('success')
    } catch (err) {
      console.error('[RfqModal] gagal kirim RFQ:', err)
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
      <div className="bg-white rounded-sm w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <h2 className="font-display font-bold text-ink text-sm">
            {product ? `Kirim RFQ — ${product.name}` : 'Kirim Permintaan (RFQ)'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate hover:text-ink text-lg leading-none"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-6 text-center">
            <p className="font-display font-bold text-ink mb-1">RFQ terkirim!</p>
            <p className="text-sm text-slate mb-4">
              Pemasok akan menghubungi Anda melalui email yang diberikan.
            </p>
            <button
              onClick={onClose}
              className="bg-amber hover:bg-amber-dark transition-colors text-ink text-xs font-display font-bold py-2 px-4 rounded-sm"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div>
              <label className="text-xs text-slate block mb-1">Nama Anda</label>
              <input
                required
                name="buyerName"
                value={form.buyerName}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Email</label>
              <input
                required
                type="email"
                name="buyerEmail"
                value={form.buyerEmail}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Perusahaan (opsional)</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">
                Jumlah {product ? `(min. ${product.moq} ${product.unit})` : ''}
              </label>
              <input
                required
                type="number"
                min={1}
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Catatan (opsional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-rust">Gagal mengirim RFQ. Coba lagi.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-amber hover:bg-amber-dark disabled:opacity-60 transition-colors text-ink text-xs font-display font-bold py-2 rounded-sm"
            >
              {status === 'submitting' ? 'Mengirim…' : 'Kirim RFQ'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
