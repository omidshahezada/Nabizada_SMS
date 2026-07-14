import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authQueryKeys } from '@/features/auth/hooks/authQueries'
import * as api from '@/features/profile/api/profileApi'

export const profileKey = ['profile']
export const useProfile = () => useQuery({ queryKey: profileKey, queryFn: api.getProfile })

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(profileKey, user)
      queryClient.setQueryData(authQueryKeys.user, user)
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user })
    },
  })
}

export const useUpdatePassword = () => useMutation({ mutationFn: api.updatePassword })

export function useDeleteProfile() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: api.deleteProfile, onSuccess: () => queryClient.clear() })
}
