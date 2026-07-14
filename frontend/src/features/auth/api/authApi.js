import { apiClient } from '@/api/client'
import { unwrapResource } from '@/api/response'

export const authEndpoints = {
  csrf: '/sanctum/csrf-cookie',
  login: '/login',
  logout: '/logout',
  me: '/api/v1/me',
}

export async function fetchCsrfCookie() {
  await apiClient.get(authEndpoints.csrf)
}

export async function login(credentials) {
  await fetchCsrfCookie()
  await apiClient.post(authEndpoints.login, credentials)
  return getAuthenticatedUser()
}

export async function logout() {
  return apiClient.post(authEndpoints.logout)
}

export async function getAuthenticatedUser() {
  const response = await apiClient.get(authEndpoints.me)
  return unwrapResource(response)
}

