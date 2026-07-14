import { Link } from 'react-router-dom'
import { paths } from '@/app/routes'
import { navigationItems } from '@/components/navigation/navigationConfig'
import { SidebarItem } from '@/components/navigation/SidebarItem'
import { SidebarSection } from '@/components/navigation/SidebarSection'
import { UserPanel } from '@/components/navigation/UserPanel'
import { RoleGate } from '@/components/routing/RoleGate'

export function Sidebar({ user, onLogout, isLoggingOut, onNavigate }) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to={paths.home} className="brand-link" onClick={onNavigate}>
        <img
          src="/vendor/adminlte/dist/img/AdminLTELogo.png"
          alt="نشان میز مدیریت"
          className="brand-image img-circle elevation-3"
        />
        <span className="brand-text font-weight-light">میز مدیریت</span>
      </Link>
      <div className="sidebar">
        <UserPanel user={user} />
        <nav className="mt-2" aria-label="فهرست اصلی">
          <SidebarSection>
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
              {navigationItems.map((item) => (
                <RoleGate key={item.id} user={user} allowedRoles={item.allowedRoles}>
                  <SidebarItem item={item} user={user} onNavigate={onNavigate} />
                </RoleGate>
              ))}
              <li className="nav-item">
                <button type="button" className="nav-link sidebar-logout" onClick={onLogout} disabled={isLoggingOut}>
                  <i className="nav-icon fa fa-sign-out" aria-hidden="true" />
                  <p>{isLoggingOut ? 'در حال خروج...' : 'خروج از سیستم'}</p>
                </button>
              </li>
            </ul>
          </SidebarSection>
        </nav>
      </div>
    </aside>
  )
}
