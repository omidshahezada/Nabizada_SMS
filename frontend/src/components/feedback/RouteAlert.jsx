import { useLocation, useNavigate } from 'react-router-dom'
import { Alert } from '@/components/feedback/Alert'

export function RouteAlert() {
  const location = useLocation()
  const navigate = useNavigate()
  const message = location.state?.message

  if (!message) return null

  function dismiss() {
    navigate(`${location.pathname}${location.search}`, { replace: true, state: null })
  }

  return <Alert variant="success" dismissible onDismiss={dismiss}>{message}</Alert>
}
