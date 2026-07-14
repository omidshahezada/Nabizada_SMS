import { Navigate, useOutletContext } from 'react-router-dom'
import { paths } from '@/app/routes'

export function RoleRoute({ allowedRoles, children }) {
  const { user } = useOutletContext()
  return allowedRoles.includes(user.role) ? children : <Navigate to={paths.forbidden} replace />
}

