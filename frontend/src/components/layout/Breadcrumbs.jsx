import { Link } from 'react-router-dom'
import { paths } from '@/app/routes'

export function Breadcrumbs({ title, items = [] }) {
  return (
    <nav aria-label="مسیر صفحه">
      <ol className="breadcrumb float-sm-left">
        <li className="breadcrumb-item"><Link to={paths.home}>خانه</Link></li>
        {items.map((item) => (
          <li className="breadcrumb-item" key={item.to || item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          </li>
        ))}
        {title ? <li className="breadcrumb-item active" aria-current="page">{title}</li> : null}
      </ol>
    </nav>
  )
}

