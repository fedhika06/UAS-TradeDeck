import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts.js'
import { createProduct, updateProduct, deleteProduct } from '../../api/products.js'
import { useAuth } from '../../context/AuthContext.jsx'

const emptyForm = {
  id: '', name: '', categoryId: '', image: '', supplier: '', location: '',
  verified: false, years: 1, rating: 0, responseRate: 0, unit: '', moq: 1,
  priceTiers: [{ min: 1, max: null, price: 0 }],
}

export default function AdminProducts({ onOpenAuth }) {
  const { user } = useAuth()
  const { products, categories, isLoading, error: loadError } = useProducts()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('idle') // idle | saving | error
  const [errorMsg, setErrorMsg] = useState('')

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-display font-bold text-ink mb-2">Perlu masuk dulu</p>
        <p className="text-sm text-slate mb-4">Halaman admin hanya untuk pengguna yang sudah login.</p>
        <button
          onClick={() => onOpenAuth?.('login')}
          className="bg-amber hover:bg-amber-dark transition-colors text-ink text-sm font-display font-bold py-2 px-4 rounded-sm"
        >
          Masuk
        </button>
      </div>
    )
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleTierChange(index, field, value) {
    setForm((prev) => {
      const tiers = [...prev.priceTiers]
      tiers[index] = { ...tiers[index], [field]: field === 'max' && value === '' ? null : Number(value) }
      return { ...prev, priceTiers: tiers }
    })
  }

  function addTier() {
    setForm((prev) => ({ ...prev, priceTiers: [...prev.priceTiers, { min: 1, max: null, price: 0 }] }))
  }

  function removeTier(index) {
    setForm((prev) => ({ ...prev, priceTiers: prev.priceTiers.filter((_, i) => i !== index) }))
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      id: product.id,
      name: product.name,
      categoryId: product.category?.id || '',
      image: product.image,
      supplier: product.supplier,
      location: product.location,
      verified: product.verified,
      years: product.years,
      rating: product.rating,
      responseRate: product.responseRate,
      unit: product.unit,
      moq: product.moq,
      priceTiers: product.priceTiers.map((t) => ({ min: t.min, max: t.max, price: t.price })),
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
    setStatus('idle')
    setErrorMsg('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')
    try {
      const payload = {
        ...form,
        years: Number(form.years),
        rating: Number(form.rating),
        responseRate: Number(form.responseRate),
        moq: Number(form.moq),
      }
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }
      resetForm()
      window.location.reload() // cara sederhana refresh daftar produk
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.response?.data?.message || 'Gagal menyimpan produk')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus produk ini?')) return
    try {
      await deleteProduct(id)
      window.location.reload()
    } catch (err) {
      alert('Gagal menghapus produk')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8">
      <div>
        <h1 className="font-display font-bold text-xl text-ink mb-4">
          {editingId ? `Edit Produk — ${editingId}` : 'Tambah Produk Baru'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-sm p-5 space-y-3">
          {!editingId && (
            <div>
              <label className="text-xs text-slate block mb-1">ID Produk</label>
              <input required name="id" value={form.id} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
          )}
          <div>
            <label className="text-xs text-slate block mb-1">Nama Produk</label>
            <input required name="name" value={form.name} onChange={handleChange}
              className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
          </div>
          <div>
            <label className="text-xs text-slate block mb-1">Kategori</label>
            <select required name="categoryId" value={form.categoryId} onChange={handleChange}
              className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5">
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate block mb-1">URL Gambar</label>
            <input required name="image" value={form.image} onChange={handleChange}
              className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate block mb-1">Pemasok</label>
              <input required name="supplier" value={form.supplier} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Lokasi</label>
              <input required name="location" value={form.location} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate block mb-1">Tahun</label>
              <input required type="number" name="years" value={form.years} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Rating</label>
              <input required type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">Respons %</label>
              <input required type="number" name="responseRate" value={form.responseRate} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate block mb-1">Satuan</label>
              <input required name="unit" value={form.unit} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
            <div>
              <label className="text-xs text-slate block mb-1">MOQ</label>
              <input required type="number" name="moq" value={form.moq} onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate">
            <input type="checkbox" name="verified" checked={form.verified} onChange={handleChange} />
            Verified
          </label>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate">Tier Harga</label>
              <button type="button" onClick={addTier} className="text-xs text-amber-dark font-semibold">+ Tambah tier</button>
            </div>
            {form.priceTiers.map((tier, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 mb-1">
                <input type="number" placeholder="min" value={tier.min}
                  onChange={(e) => handleTierChange(i, 'min', e.target.value)}
                  className="border border-ink/15 rounded-sm text-xs px-2 py-1" />
                <input type="number" placeholder="max (kosong=+)" value={tier.max ?? ''}
                  onChange={(e) => handleTierChange(i, 'max', e.target.value)}
                  className="border border-ink/15 rounded-sm text-xs px-2 py-1" />
                <input type="number" placeholder="harga" value={tier.price}
                  onChange={(e) => handleTierChange(i, 'price', e.target.value)}
                  className="border border-ink/15 rounded-sm text-xs px-2 py-1" />
                <button type="button" onClick={() => removeTier(i)} className="text-xs text-rust">Hapus</button>
              </div>
            ))}
          </div>

          {status === 'error' && <p className="text-xs text-rust">{errorMsg}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={status === 'saving'}
              className="flex-1 bg-amber hover:bg-amber-dark disabled:opacity-60 transition-colors text-ink text-xs font-display font-bold py-2 rounded-sm">
              {status === 'saving' ? 'Menyimpan…' : editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm}
                className="border border-ink/15 text-ink text-xs font-display font-bold py-2 px-4 rounded-sm">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-display font-bold text-lg text-ink mb-4">Daftar Produk</h2>
        {isLoading ? (
          <p className="text-sm text-slate">Memuat…</p>
        ) : loadError ? (
          <p className="text-sm text-rust">Gagal memuat produk.</p>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-ink/10 rounded-sm p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-slate">{p.id} · {p.supplier}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-xs text-amber-dark font-semibold">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-rust font-semibold">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}