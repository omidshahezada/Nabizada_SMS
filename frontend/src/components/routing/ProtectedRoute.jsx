import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticationError } from '@/api/errors'
import { paths } from '@/app/routes'
import { ErrorState } from '@/components/feedback/ErrorState'
import { PageLoader } from '@/components/feedback/PageLoader'
import { useAuthenticatedUser } from '@/features/auth/hooks/authQueries'

export function ProtectedRoute() {
  const location = useLocation()
  const userQuery = useAuthenticatedUser()

  if (userQuery.isPending) return <PageLoader fullPage />

  if (userQuery.error && !isAuthenticationError(userQuery.error)) {
    return <ErrorState error={userQuery.error} onRetry={userQuery.refetch} fullPage />
  }

  if (!userQuery.data) {
    const from = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={paths.login} replace state={{ from }} />
  }

  return <Outlet context={{ user: userQuery.data }} />
}

