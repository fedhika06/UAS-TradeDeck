import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const { login, register, isLoading, error } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const ok =
      mode === 'login'
        ? await login({ email: form.email, password: form.password })
        : await register(form)
    if (ok) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
      <div className="bg-white rounded-sm w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <div className="flex gap-4 text-sm font-display font-bold">
            <button
              onClick={() => setMode('login')}
              className={mode === 'login' ? 'text-amber-dark' : 'text-slate/50'}
            >
              Masuk
            </button>
            <button
              onClick={() => setMode('register')}
              className={mode === 'register' ? 'text-amber-dark' : 'text-slate/50'}
            >
              Daftar
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-slate hover:text-ink text-lg leading-none"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate block mb-1">Nama Lengkap</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
          )}
          <div>
            <label className="text-xs text-slate block mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
            />
          </div>
          <div>
            <label className="text-xs text-slate block mb-1">Password</label>
            <input
              required
              type="password"
              minLength={6}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
            />
          </div>
          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate block mb-1">Perusahaan (opsional)</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-sm text-sm px-2.5 py-1.5"
              />
            </div>
          )}

          {error && <p className="text-xs text-rust">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber hover:bg-amber-dark disabled:opacity-60 transition-colors text-ink text-xs font-display font-bold py-2 rounded-sm"
          >
            {isLoading ? 'Memproses…' : mode === 'login' ? 'Masuk' : 'Daftar Gratis'}
          </button>
        </form>
      </div>
    </div>
  )
}
