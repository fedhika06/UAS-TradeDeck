import axios from 'axios'

/**
 * Instance axios terpusat.
 * baseURL diarahkan ke root "/" karena data produk disajikan sebagai
 * file JSON statis di folder /public/data (lihat vite "public" convention).
 *
 * Untuk backend sungguhan, cukup ganti baseURL ini, mis:
 * baseURL: import.meta.env.VITE_API_URL
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tradedeck_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[apiClient] request gagal:', error?.message)
    return Promise.reject(error)
  }
)

export default apiClient
