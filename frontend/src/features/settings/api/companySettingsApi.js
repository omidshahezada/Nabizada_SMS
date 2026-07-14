import { apiClient } from '@/api/client'
import { resolveMediaUrl } from '@/utils/media'

const settings = (value) => ({ ...value, logo_url: resolveMediaUrl(value.logo_url) })

export async function getCompanySettings() {
  const response = await apiClient.get('/api/v1/settings/company')
  return settings(response.data.data)
}

export async function updateCompanySettings(values) {
  const form = new FormData()
  form.append('_method', 'PATCH')
  for (const field of ['company_name', 'address', 'phone', 'bill_header', 'bill_footer']) {
    form.append(field, values[field] || '')
  }
  if (values.logo) form.append('logo', values.logo)
  const response = await apiClient.post('/api/v1/settings/company', form)
  return settings(response.data.data)
}
