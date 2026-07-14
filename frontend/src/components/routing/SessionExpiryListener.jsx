import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { subscribeToSessionExpiry } from '@/api/client'
import { paths } from '@/app/routes'

export function SessionExpiryListener() {
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => subscribeToSessionExpiry(() => {
    const from = `${location.pathname}${location.search}${location.hash}`
    queryClient.clear()
    navigate(paths.login, { replace: true, state: { from } })
  }), [location, navigate, queryClient])

  return null
}
