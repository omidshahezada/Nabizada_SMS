import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authQueryKeys } from '@/features/auth/hooks/authQueries'
import * as api from '@/features/users/api/usersApi'

export const userKeys = {
  all: ['users'],
  list: (params) => ['users', 'list', params],
  detail: (id) => ['users', 'detail', String(id)],
  roles: ['users', 'roles'],
}

export const useUsers = (params) => useQuery({ queryKey: userKeys.list(params), queryFn: () => api.getUsers(params) })
export const useUser = (id) => useQuery({ queryKey: userKeys.detail(id), queryFn: () => api.getUser(id), enabled: Boolean(id) })
export const useRoles = () => useQuery({ queryKey: userKeys.roles, queryFn: api.getRoles, staleTime: 300_000 })

function useUserMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user })
    },
  })
}

export const useCreateUser = () => useUserMutation(api.createUser)
export const useUpdateUser = () => useUserMutation(api.updateUser)
export const useDeleteUser = () => useUserMutation(api.deleteUser)
