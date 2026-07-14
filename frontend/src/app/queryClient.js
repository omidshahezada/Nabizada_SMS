import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/api/errors'

function shouldRetry(failureCount, error) {
  if (error instanceof ApiError && [401, 403, 404, 419, 422].includes(error.status)) return false
  return failureCount < 1
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
})

