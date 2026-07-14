import axios from 'axios'
import { normalizeApiError } from '@/api/errors'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

if (!configuredBaseUrl) {
  throw new Error('VITE_API_BASE_URL is required. Copy .env.example to .env and configure Laravel\'s URL.')
}

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const sessionExpiryListeners = new Set()

export function subscribeToSessionExpiry(listener) {
  sessionExpiryListeners.add(listener)
  return () => sessionExpiryListeners.delete(listener)
}

export function laravelUrl(path = '/') {
  return `${API_BASE_URL}/${String(path).replace(/^\//, '')}`
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error)
    const requestPath = error.config?.url || ''
    const isAuthBootstrapRequest = requestPath.includes('/api/v1/me')
    const isLoginRequest = requestPath.endsWith('/login')

    if ((normalizedError.status === 401 || normalizedError.status === 419)
      && !isAuthBootstrapRequest
      && !isLoginRequest) {
      sessionExpiryListeners.forEach((listener) => listener(normalizedError))
    }

    return Promise.reject(normalizedError)
  },
)

