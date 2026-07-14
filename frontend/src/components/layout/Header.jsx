import { Link } from 'react-router-dom'
import { paths } from '@/app/routes'

export function Header({ onToggleSidebar, user }) {
  return (
    <nav className="main-header navbar navbar-expand bg-info navbar-dark border-bottom">
      <ul className="navbar-nav">
        <li className="nav-item">
          <button type="button" className="nav-link navbar-action" onClick={onToggleSidebar} aria-label="باز و بسته کردن فهرست">
            <i className="fa fa-bars" aria-hidden="true" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to={paths.home} className="nav-link">خانه</Link>
        </li>
      </ul>
      <ul className="navbar-nav mr-auto header-user">
        <li className="nav-item">
          <Link className="nav-link" to={paths.profile} aria-label={`نمایه ${user.name}`}>
            <i className="fa fa-user-circle" aria-hidden="true" />
            <span className="d-none d-sm-inline mr-2">{user.name}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

