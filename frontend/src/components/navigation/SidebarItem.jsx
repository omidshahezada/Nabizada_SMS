import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Icon({ name }) {
  return <i className={`nav-icon fa ${name}`} aria-hidden="true" />
}

export function SidebarItem({ item, user, onNavigate }) {
  const { pathname } = useLocation()
  const active = item.match ? item.match(pathname) : pathname === item.to
  const [manuallyExpanded, setManuallyExpanded] = useState(false)
  const expanded = active || manuallyExpanded

  if (item.children) {
    return (
      <li className={`nav-item has-treeview ${expanded ? 'menu-open' : ''}`}>
        <button
          type="button"
          className={`nav-link sidebar-tree-toggle ${active ? 'active' : ''}`}
          onClick={() => setManuallyExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          <Icon name={item.icon} />
          <p>
            {item.label}
            <i className="fa fa-angle-left right" aria-hidden="true" />
          </p>
        </button>
        {expanded ? (
          <ul className="nav nav-treeview">
            {item.children.filter((child) => !child.allowedRoles || child.allowedRoles.includes(user?.role)).map((child) => (
              <li className="nav-item" key={child.id}>
                <NavLink
                  to={child.to}
                  end={child.to === '/sales'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onNavigate}
                >
                  <Icon name={child.icon} />
                  <p>{child.label}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <li className="nav-item">
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={`nav-link ${active ? 'active' : ''}`}
        onClick={onNavigate}
      >
        <Icon name={item.icon} />
        <p>{item.label}</p>
      </NavLink>
    </li>
  )
}
