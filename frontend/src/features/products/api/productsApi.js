import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'

export async function getProducts(params) {
  const response = await apiClient.get('/api/v1/products', { params })
  return response.data
}

export async function getProduct(productId) {
  return unwrapResource(await apiClient.get(`/api/v1/products/${productId}`))
}

export async function getCategories() {
  return unwrapResource(await apiClient.get('/api/v1/categories'))
}

export async function createProduct(payload) {
  return unwrapResource(await apiClient.post('/api/v1/products', payload))
}

export async function updateProduct({ productId, payload }) {
  return unwrapResource(await apiClient.put(`/api/v1/products/${productId}`, payload))
}

export async function deleteProduct(productId) {
  await apiClient.delete(`/api/v1/products/${productId}`)
}
