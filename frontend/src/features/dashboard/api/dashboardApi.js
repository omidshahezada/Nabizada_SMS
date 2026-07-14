import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'

export async function getDashboard() {
  return unwrapResource(await apiClient.get('/api/v1/dashboard'))
}
