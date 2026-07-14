import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'
import { resolveMediaUrl } from '@/utils/media'

export async function getSales(params) {
  return (await apiClient.get('/api/v1/sales', { params })).data
}

export async function getTodaySales(params) {
  return unwrapResource(await apiClient.get('/api/v1/sales/today', { params }))
}

export async function getSale(saleId) {
  return unwrapResource(await apiClient.get(`/api/v1/sales/${saleId}`))
}

export async function createSale(payload) {
  return unwrapResource(await apiClient.post('/api/v1/sales', payload))
}

export async function updateSale({ saleId, payload }) {
  return unwrapResource(await apiClient.patch(`/api/v1/sales/${saleId}`, payload))
}

export async function deleteSale(saleId) {
  await apiClient.delete(`/api/v1/sales/${saleId}`)
}

export async function getInvoice(saleId) {
  const invoice = unwrapResource(await apiClient.get(`/api/v1/sales/${saleId}/invoice`))
  return { ...invoice, company: { ...invoice.company, logo_url: resolveMediaUrl(invoice.company.logo_url) } }
}

export async function updateInvoice({ saleId, payload }) {
  const invoice = unwrapResource(await apiClient.patch(`/api/v1/sales/${saleId}/invoice`, payload))
  return { ...invoice, company: { ...invoice.company, logo_url: resolveMediaUrl(invoice.company.logo_url) } }
}

export async function getSaleItems(params) {
  return unwrapResource(await apiClient.get('/api/v1/sale-items', { params }))
}
