import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@/features/dashboard/api/dashboardApi'

export const dashboardKeys = {
  all: ['dashboard'],
  summary: () => [...dashboardKeys.all, 'summary'],
}

export function useDashboard() {
  return useQuery({ queryKey: dashboardKeys.summary(), queryFn: getDashboard })
}
