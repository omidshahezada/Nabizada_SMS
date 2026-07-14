import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'

export async function getCustomers(params) {
  const response = await apiClient.get('/api/v1/customers', { params })
  return response.data
}

export async function getCustomer(customerId) {
  return unwrapResource(await apiClient.get(`/api/v1/customers/${customerId}`))
}

export async function createCustomer(payload) {
  return unwrapResource(await apiClient.post('/api/v1/customers', payload))
}

export async function updateCustomer({ customerId, payload }) {
  return unwrapResource(await apiClient.put(`/api/v1/customers/${customerId}`, payload))
}

export async function deleteCustomer(customerId) {
  await apiClient.delete(`/api/v1/customers/${customerId}`)
}
