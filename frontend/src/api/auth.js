import apiClient from './client.js'

export async function login({ email, password }) {
  const { data } = await apiClient.post('/auth/login', { email, password })
  return data // { accessToken, user }
}

export async function register({ name, email, password, company }) {
  const { data } = await apiClient.post('/auth/register', {
    name,
    email,
    password,
    company: company || undefined,
  })
  return data // { accessToken, user }
}

export async function fetchMe() {
  const { data } = await apiClient.get('/auth/me')
  return data
}
