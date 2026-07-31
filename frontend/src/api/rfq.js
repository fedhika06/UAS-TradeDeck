import apiClient from './client.js'

export async function createRfq(payload) {
  const { data } = await apiClient.post('/rfq', payload)
  return data
}

export async function fetchRfqs() {
  const { data } = await apiClient.get('/rfq')
  return data
}