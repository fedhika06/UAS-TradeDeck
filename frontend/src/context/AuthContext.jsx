import { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, register as apiRegister } from '../api/auth.js'

const TOKEN_KEY = 'tradedeck_token'
const USER_KEY = 'tradedeck_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [user])

  async function login(credentials) {
    setIsLoading(true)
    setError(null)
    try {
      const { accessToken, user: loggedInUser } = await apiLogin(credentials)
      localStorage.setItem(TOKEN_KEY, accessToken)
      setUser(loggedInUser)
      return true
    } catch (err) {
      setError(err?.response?.data?.message || 'Email atau password salah')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  async function register(payload) {
    setIsLoading(true)
    setError(null)
    try {
      const { accessToken, user: newUser } = await apiRegister(payload)
      localStorage.setItem(TOKEN_KEY, accessToken)
      setUser(newUser)
      return true
    } catch (err) {
      setError(err?.response?.data?.message || 'Registrasi gagal')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  }
  return ctx
}
