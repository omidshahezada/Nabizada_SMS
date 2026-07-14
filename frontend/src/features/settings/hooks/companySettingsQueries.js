import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCompanySettings, updateCompanySettings } from '@/features/settings/api/companySettingsApi'

export const companySettingsKey = ['company-settings']

export const useCompanySettings = () => useQuery({ queryKey: companySettingsKey, queryFn: getCompanySettings })

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateCompanySettings,
    onSuccess: (settings) => {
      queryClient.setQueryData(companySettingsKey, settings)
      queryClient.invalidateQueries({ queryKey: ['sales'] })
    },
  })
}
