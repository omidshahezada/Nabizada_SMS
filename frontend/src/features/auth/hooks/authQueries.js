import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAuthenticatedUser, login, logout } from '@/features/auth/api/authApi'

export const authQueryKeys = {
  all: ['auth'],
  user: ['auth', 'user'],
}

export function useAuthenticatedUser() {
  return useQuery({
    queryKey: authQueryKeys.user,
    queryFn: getAuthenticatedUser,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.user, user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

