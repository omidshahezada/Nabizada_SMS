import { apiClient } from '@/api/client'
import { resolveMediaUrl } from '@/utils/media'

const user = (value) => ({ ...value, image_url: resolveMediaUrl(value.image_url) })
const userData = (response) => user(response.data.data)

function userFormData(values, method) {
  const form = new FormData()
  if (method) form.append('_method', method)
  form.append('name', values.name)
  form.append('email', values.email)
  form.append('role_id', values.role_id)
  if (values.password) form.append('password', values.password)
  if (values.profile_image) form.append('profile_image', values.profile_image)
  return form
}

export async function getUsers(params) {
  const response = await apiClient.get('/api/v1/users', { params })
  return { ...response.data, data: response.data.data.map(user) }
}

export async function getUser(id) {
  return userData(await apiClient.get(`/api/v1/users/${id}`))
}

export async function getRoles() {
  const response = await apiClient.get('/api/v1/roles')
  return response.data.data
}

export async function createUser(values) {
  return userData(await apiClient.post('/api/v1/users', userFormData(values)))
}

export async function updateUser({ id, values }) {
  return userData(await apiClient.post(`/api/v1/users/${id}`, userFormData(values, 'PATCH')))
}

export async function deleteUser(id) {
  await apiClient.delete(`/api/v1/users/${id}`)
}
