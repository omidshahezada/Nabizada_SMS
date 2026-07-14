import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticationError } from '@/api/errors'
import { paths } from '@/app/routes'
import { ErrorState } from '@/components/feedback/ErrorState'
import { PageLoader } from '@/components/feedback/PageLoader'
import { useAuthenticatedUser } from '@/features/auth/hooks/authQueries'

export function GuestRoute() {
  const userQuery = useAuthenticatedUser()

  if (userQuery.isPending) return <PageLoader fullPage />
  if (userQuery.data) return <Navigate to={paths.home} replace />

  if (userQuery.error && !isAuthenticationError(userQuery.error)) {
    return <ErrorState error={userQuery.error} onRetry={userQuery.refetch} fullPage />
  }

  return <Outlet />
}

