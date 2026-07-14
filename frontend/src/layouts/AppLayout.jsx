import { useCallback, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { paths } from '@/app/routes'
import { Alert } from '@/components/feedback/Alert'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { SessionExpiryListener } from '@/components/routing/SessionExpiryListener'
import { useLogout } from '@/features/auth/hooks/authQueries'

export function AppLayout() {
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const logoutMutation = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  function handleLogout() {
    if (logoutMutation.isPending) return
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate(paths.login, { replace: true }),
    })
  }

  return (
    <div className={`wrapper app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <SessionExpiryListener />
      <Header user={user} onToggleSidebar={() => setSidebarOpen((current) => !current)} />
      <Sidebar
        user={user}
        onLogout={handleLogout}
        isLoggingOut={logoutMutation.isPending}
        onNavigate={closeSidebar}
      />
      {sidebarOpen ? <button type="button" className="sidebar-backdrop" onClick={closeSidebar} aria-label="بستن فهرست" /> : null}
      <div className="content-wrapper">
        {logoutMutation.error ? (
          <div className="container-fluid pt-3">
            <Alert variant="error" dismissible>{logoutMutation.error.message}</Alert>
          </div>
        ) : null}
        <Outlet context={{ user }} />
      </div>
      <Footer />
    </div>
  )
}
