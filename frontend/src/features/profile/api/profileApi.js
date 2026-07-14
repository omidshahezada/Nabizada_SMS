import { apiClient } from '@/api/client'
import { resolveMediaUrl } from '@/utils/media'

const profile = (value) => ({ ...value, image_url: resolveMediaUrl(value.image_url) })

export async function getProfile() {
  const response = await apiClient.get('/api/v1/profile')
  return profile(response.data.data)
}

export async function updateProfile(values) {
  const form = new FormData()
  form.append('_method', 'PATCH')
  form.append('name', values.name)
  form.append('email', values.email)
  if (values.image) form.append('image', values.image)
  const response = await apiClient.post('/api/v1/profile', form)
  return profile(response.data.data)
}

export async function updatePassword(values) {
  const response = await apiClient.put('/api/v1/profile/password', values)
  return response.data
}

export async function deleteProfile(password) {
  await apiClient.delete('/api/v1/profile', { data: { password } })
}
